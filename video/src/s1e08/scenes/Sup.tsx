import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Cuts as left rays. First two rays: the shorter one slides inside the
// longer. Then a pile of rays (the climbing fractions); their union is
// drawn as one outline that reaches √2: the least upper bound. Last line:
// a check mark for "no holes", and the four sign cases for ×.

const X0 = 200;
const X1 = 1700;
const LO = -0.5;
const HI = 2.2;
const px = (v: number) => X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
const SQRT2 = Math.SQRT2;
const RAY_H = 26;
const PILE = [1, 4 / 3, 7 / 5, 24 / 17, 41 / 29, 1.414];
const pileY = (k: number) => 250 + k * 46;
const SIGNS = ["+ · +", "+ · −", "− · +", "− · −"];

const Ray: React.FC<{
  readonly v: number;
  readonly y: number;
  readonly t: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ v, y, t, color, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect
      x={X0 - 40}
      y={y - RAY_H / 2}
      width={Math.max(0, (px(v) - X0 + 40) * t)}
      height={RAY_H}
      rx={8}
      fill={alpha(color, 0.3)}
      stroke={color}
      strokeWidth={3}
    />
  </g>
);

export const Sup: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("sup");
  const [c0, c1, c2] = cues;
  const slide = glide(frame, c0 + 40, fps, 22);
  const pairOut = fadeOut(frame, c1, 10);
  const pileAt = (k: number) => c1 + 6 + k * 8;
  const union = glide(frame, c1 + 66, fps, 24);

  return (
    <SceneShell id="sup">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="pop" at={c0 + 14} volume={0.3} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="ding" at={c0 + 62} volume={0.24} />
      {PILE.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k % 6]} at={pileAt(k)} volume={0.2} />
      ))}
      <Sfx name="chime" at={c1 + 70} />
      <Sfx name="sparkle" at={c2 + 6} />
      <Sfx name="whoosh" at={c1 + 100} volume={0.12} />
      <Sfx name="ding" at={c1 + 130} volume={0.2} />
      {SIGNS.map((_, k) => (
        <Sfx key={`s${k}`} name="tick" at={c2 + 30 + k * 18} volume={0.18} />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* axis */}
          <line
            x1={X0 - 60}
            y1={620}
            x2={X1 + 40}
            y2={620}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {[0, 1, 2].map((v) => (
            <text
              key={v}
              x={px(v)}
              y={664}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 2)}
            >
              {v}
            </text>
          ))}
          {/* two cuts: 1* slides into √2's cut */}
          <g opacity={pairOut}>
            <Ray
              v={SQRT2}
              y={360}
              t={Math.min(1, springIn(frame, c0 + 6, fps, 14))}
              color={colors.primary}
            />
            <Ray
              v={1}
              y={lerp(470, 360, slide)}
              t={Math.min(1, springIn(frame, c0 + 14, fps, 14))}
              color={colors.orange}
            />
            <text
              x={px(SQRT2) + 20}
              y={370}
              fill={colors.primary}
              fontSize={34}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 10)}
            >
              √2
            </text>
            <text
              x={px(1) + 20}
              y={lerp(480, 420, slide)}
              fill={colors.orange}
              fontSize={34}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 18)}
            >
              1
            </text>
            <text
              x={960}
              y={250}
              fill={colors.text}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 62)}
            >
              1* ⊆ √2{" "}
              <tspan fill={colors.muted} fontSize={34} fontFamily={fonts.body}>
                {" "}
                ({tx.inside})
              </tspan>
            </text>
          </g>
          {/* a pile of cuts, then their union */}
          <g opacity={fadeIn(frame, c1 + 4)}>
            {PILE.map((v, k) => (
              <Ray
                key={k}
                v={v}
                y={lerp(pileY(k), 520, union)}
                t={Math.min(1, springIn(frame, pileAt(k), fps, 14))}
                color={colors.primary}
                opacity={lerp(1, 0.25, union)}
              />
            ))}
            <Ray v={SQRT2} y={520} t={union} color={colors.highlight} />
            {/* any upper bound slides down, and stops at √2 */}
            {(() => {
              const t = glide(frame, c1 + 100, fps, 30);
              const v = lerp(2.0, SQRT2 + 0.02, t);
              return (
                <g
                  opacity={fadeIn(frame, c1 + 96) * fadeOut(frame, c2 + 20, 10)}
                >
                  <line
                    x1={px(v)}
                    y1={560}
                    x2={px(v)}
                    y2={640}
                    stroke={colors.orange}
                    strokeWidth={5}
                  />
                  <text
                    x={px(v) + 14}
                    y={600}
                    fill={colors.orange}
                    fontSize={30}
                  >
                    {"≥ ⋃"}
                  </text>
                </g>
              );
            })()}
            <line
              x1={px(SQRT2)}
              y1={480}
              x2={px(SQRT2)}
              y2={640}
              stroke={colors.highlight}
              strokeWidth={4}
              strokeDasharray="8 6"
              opacity={union}
            />
            <text
              x={px(SQRT2) + 20}
              y={490}
              fill={colors.highlight}
              fontSize={36}
              fontFamily={fonts.math}
              opacity={union}
            >
              sup = ⋃ = √2
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 120,
            fontSize: 42,
            color: colors.highlight,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c1 + 70),
            translate: riseIn(frame, c1 + 70, 20),
          }}
        >
          {tx.union}
        </div>
        <div
          style={{
            position: "absolute",
            right: 200,
            top: 120,
            fontSize: 42,
            color: colors.green,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c2 + 6),
            translate: riseIn(frame, c2 + 6, 20),
          }}
        >
          ✓ {tx.complete}
        </div>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 700,
            display: "flex",
            gap: 24,
            alignItems: "baseline",
            opacity: fadeIn(frame, c2 + 24),
          }}
        >
          <span style={{ fontSize: 34, color: colors.muted }}>{tx.signs}</span>
          {SIGNS.map((s, k) => (
            <span
              key={s}
              style={{
                fontFamily: fonts.math,
                fontSize: 38,
                padding: "4px 14px",
                borderRadius: 12,
                border: `2px solid ${colors.orange}`,
                color: colors.orange,
                opacity: fadeIn(frame, c2 + 30 + k * 18),
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
