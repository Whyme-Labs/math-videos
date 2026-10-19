import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// No order on ℂ. On a line: 0, then 1 > 0 (1 = 1²), so −1 < 0. Then i tries
// both sides. If i > 0, then i · i > 0, but i · i = −1. If i < 0, then
// −i > 0 and (−i)(−i) > 0, but that is −1 again. The line cracks at 0.

const Y = 420;
const X0 = 960;
const U = 260;

export const NoOrder: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("noOrder");
  const [c0, c1] = cues;
  const tryR = c1 + 8;
  const tryL = c1 + 62;
  const crackAt = c1 + 112;
  const side =
    frame < tryL
      ? glide(frame, tryR, fps, 16)
      : lerp(1, -1, glide(frame, tryL, fps, 18));
  const crack = ramp(frame, crackAt, 16);
  const tilt = 9 * crack;
  // two squares hop to the positive side
  const SQ = [
    { x: -0.6, at: c0 + 60, l: "(−0.6)² = 0.36", dy: -50 },
    { x: 0.8, at: c0 + 96, l: "0.8² = 0.64", dy: 110 },
  ];

  return (
    <SceneShell id="noOrder">
      <Sfx name="pop" at={c0 + 10} />
      <Sfx name="pop" at={c0 + 24} volume={0.3} />
      <Sfx name="ding" at={c0 + 50} volume={0.22} />
      <Sfx name="pluck2" at={c0 + 88} volume={0.2} />
      <Sfx name="pluck4" at={c0 + 124} volume={0.2} />
      <Sfx name="whoosh" at={tryR} volume={0.14} />
      <Sfx name="thud" at={tryR + 30} volume={0.32} />
      <Sfx name="whoosh" at={tryL} volume={0.14} />
      <Sfx name="thud" at={tryL + 30} volume={0.32} />
      <Sfx name="scratch" at={crackAt} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 130,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 10),
            translate: riseIn(frame, c0 + 6, 16),
          }}
        >
          <span style={{ color: colors.muted }}>{tx.squaresPositive}: </span>
          <span style={{ fontFamily: fonts.math, color: colors.primary }}>
            x ≠ 0 ⇒ x² {">"} 0
          </span>
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* the line, in two halves that crack apart at 0 */}
          {[-1, 1].map((s) => (
            <g
              key={s}
              transform={`translate(${s * 30 * crack + shake(frame, crackAt, 14)} ${18 * crack}) rotate(${s * tilt} ${X0} ${Y})`}
              opacity={fadeIn(frame, c0 + 2)}
            >
              <line
                x1={X0}
                y1={Y}
                x2={X0 + s * 2.4 * U}
                y2={Y}
                stroke={crack > 0 ? colors.red : colors.text}
                strokeWidth={5}
              />
              <circle
                cx={X0 + s * U}
                cy={Y}
                r={
                  13 *
                  Math.min(
                    1,
                    springIn(frame, s > 0 ? c0 + 10 : c0 + 24, fps, 10),
                  )
                }
                fill={s > 0 ? colors.primary : colors.orange}
              />
              <text
                x={X0 + s * U}
                y={Y + 60}
                fill={s > 0 ? colors.primary : colors.orange}
                fontSize={44}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, s > 0 ? c0 + 10 : c0 + 24)}
              >
                {s > 0 ? "1 = 1² > 0" : "−1 < 0"}
              </text>
            </g>
          ))}
          <circle
            cx={X0}
            cy={Y}
            r={10}
            fill={colors.text}
            opacity={fadeIn(frame, c0 + 2)}
          />
          <text
            x={X0}
            y={Y + 60}
            fill={colors.text}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 2) * (1 - crack)}
          >
            0
          </text>
          {SQ.map((q) => {
            const t = ramp(frame, q.at + 10, 18);
            const p = hop(t, X0 + q.x * U, Y, X0 + q.x * q.x * U, Y, 120);
            return (
              <g
                key={q.l}
                opacity={fadeIn(frame, q.at) * fadeOut(frame, c1, 8)}
              >
                <circle cx={p.x} cy={p.y} r={11} fill={colors.green} />
                <text
                  x={X0 + q.x * q.x * U}
                  y={Y + q.dy}
                  fill={colors.green}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={fadeIn(frame, q.at + 28)}
                >
                  {q.l}
                </text>
              </g>
            );
          })}
          {/* i looking for a side */}
          <g opacity={fadeIn(frame, c1 + 2) * fadeOut(frame, crackAt, 10)}>
            <circle
              cx={X0 + side * 0.6 * U}
              cy={Y - 110}
              r={16}
              fill={colors.highlight}
            />
            <text
              x={X0 + side * 0.6 * U}
              y={Y - 140}
              fill={colors.highlight}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              i
            </text>
          </g>
        </svg>
        {[
          {
            t: "i > 0 ⇒ i · i > 0",
            bad: "i · i = −1 < 0 ✗",
            at: tryR + 14,
            out: tryL,
          },
          {
            t: "i < 0 ⇒ (−i)(−i) > 0",
            bad: "(−i)(−i) = −1 < 0 ✗",
            at: tryL + 16,
            out: crackAt,
          },
        ].map((r) => (
          <div
            key={r.t}
            style={{
              position: "absolute",
              top: 560,
              width: "100%",
              textAlign: "center",
              fontFamily: fonts.math,
              fontSize: 46,
              lineHeight: 1.5,
              opacity: fadeIn(frame, r.at) * fadeOut(frame, r.out, 8),
            }}
          >
            <div>{r.t}</div>
            <div
              style={{ color: colors.red, opacity: fadeIn(frame, r.at + 16) }}
            >
              {r.bad}
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 600,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 64,
            color: colors.red,
            opacity: fadeIn(frame, crackAt + 10),
            scale: lerp(
              0.7,
              1,
              Math.min(1, springIn(frame, crackAt + 10, fps, 11)),
            ),
          }}
        >
          {tx.contradiction}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
