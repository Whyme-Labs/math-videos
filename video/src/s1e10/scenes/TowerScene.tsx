import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, ramp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { Tower } from "../../shared/components/Tower";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The ℂ floor is built: the last floor. Beside it the real line swings out
// into a plane (wider, not taller). Then the ledger of the whole tower, one
// row per floor, gained and lost; the last row is ℝ → ℂ: every root, order.

const LEFT = 180;
const TOP = 150;
const PLANE = { cx: 1290, cy: 450, half: 290 };
const LEDGER_X = 900;

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const [c0, c1] = cues;
  const built = ramp(frame, c0 + 8, 16);
  const swing = glide(frame, c0 + 30, fps, 40);
  const rowAt = (k: number) => c1 + 4 + k * 10;
  const lines = 13;

  return (
    <SceneShell id="tower">
      <Sfx name="whoosh" at={c0 + 8} volume={0.14} />
      <Sfx name="sparkle" at={c0 + 24} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.16} />
      {tx.ledger.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={rowAt(k)} volume={0.2} />
      ))}
      <Sfx name="chime" at={rowAt(4) + 10} />
      <QuestionTray />

      <AbsoluteFill>
        <Tower
          appear={[1, 1, 1, 1, 1]}
          built={[1, 1, 1, 1, built]}
          question={[0, 0, 0, 0, 1 - built]}
          style={{ position: "absolute", left: LEFT, top: TOP }}
        />
        {/* the real line swings out into a plane */}
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: fadeOut(frame, c1, 10) }}
        >
          {Array.from({ length: lines }).map((_, k) => {
            const off =
              ((k - (lines - 1) / 2) / ((lines - 1) / 2)) * PLANE.half;
            return (
              <g key={k} opacity={fadeIn(frame, c0 + 2)}>
                <line
                  x1={PLANE.cx - PLANE.half}
                  y1={PLANE.cy + off * swing}
                  x2={PLANE.cx + PLANE.half}
                  y2={PLANE.cy + off * swing}
                  stroke={
                    k === (lines - 1) / 2
                      ? colors.primary
                      : alpha(colors.muted, 0.5)
                  }
                  strokeWidth={k === (lines - 1) / 2 ? 6 : 2}
                />
                <line
                  x1={PLANE.cx + off}
                  y1={PLANE.cy - PLANE.half * swing}
                  x2={PLANE.cx + off}
                  y2={PLANE.cy + PLANE.half * swing}
                  stroke={
                    k === (lines - 1) / 2
                      ? colors.highlight
                      : alpha(colors.muted, 0.5)
                  }
                  strokeWidth={k === (lines - 1) / 2 ? 5 : 2}
                />
              </g>
            );
          })}
          {/* a number turning on the new plane */}
          {(() => {
            const a = Math.max(0, frame - (c0 + 70)) / 40;
            const tip = {
              x: PLANE.cx + 200 * Math.cos(a),
              y: PLANE.cy - 200 * Math.sin(a),
            };
            return (
              <g opacity={fadeIn(frame, c0 + 70)}>
                <line
                  x1={PLANE.cx}
                  y1={PLANE.cy}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={colors.orange}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <circle cx={tip.x} cy={tip.y} r={12} fill={colors.orange} />
              </g>
            );
          })()}
          <text
            x={PLANE.cx + PLANE.half + 20}
            y={PLANE.cy + 14}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 4)}
          >
            ℝ
          </text>
          <text
            x={PLANE.cx + 20}
            y={PLANE.cy - PLANE.half - 16}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 60)}
          >
            ℂ
          </text>
        </svg>
        {/* the ledger */}
        <div
          style={{
            position: "absolute",
            left: LEDGER_X,
            top: 170,
            display: "grid",
            gridTemplateColumns: "190px 330px 330px",
            rowGap: 18,
            fontSize: 38,
            alignItems: "baseline",
          }}
        >
          {[tx.gained, tx.lost].map((h, k) => (
            <div
              key={h}
              style={{
                gridColumn: k + 2,
                gridRow: 1,
                fontFamily: fonts.title,
                fontSize: 40,
                color: k === 0 ? colors.green : colors.highlight,
                opacity: fadeIn(frame, c1 + 2),
              }}
            >
              {h}
            </div>
          ))}
          {tx.ledger.flatMap((r, k) => {
            const last = k === tx.ledger.length - 1;
            const style = {
              gridRow: k + 2,
              opacity: fadeIn(frame, rowAt(k)),
              translate: riseIn(frame, rowAt(k), 14),
              color: last ? colors.text : colors.muted,
            };
            return [
              <div
                key={`s${k}`}
                style={{ ...style, fontFamily: fonts.math, gridColumn: 1 }}
              >
                {r.step}
              </div>,
              <div
                key={`g${k}`}
                style={{
                  ...style,
                  gridColumn: 2,
                  color: last ? colors.green : style.color,
                }}
              >
                {r.gain}
              </div>,
              <div
                key={`l${k}`}
                style={{
                  ...style,
                  gridColumn: 3,
                  color: last ? colors.highlight : style.color,
                  textDecoration: "line-through",
                }}
              >
                {r.loss}
              </div>,
            ];
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: LEDGER_X,
            top: 600,
            fontFamily: fonts.title,
            fontSize: 46,
            color: colors.primary,
            opacity: fadeIn(frame, rowAt(4) + 10),
            translate: riseIn(frame, rowAt(4) + 10, 16),
          }}
        >
          {tx.algebraDone}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
