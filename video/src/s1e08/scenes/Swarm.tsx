import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Cantor: two swarms close in on √2 from either side, decimals (lemon) from
// below and the Babylonian terms (orange) from above. A tether between the
// newest pair shrinks. Then the swarms blur into one blob (the E05 motif),
// which shrinks to a point: one real number. Last line: squares term by term.

const X0 = 200;
const X1 = 1720;
const Y = 420;
const LO = 0.95;
const HI = 1.55;
const SQRT2 = Math.SQRT2;
const DEC = [1, 1.4, 1.41, 1.414, 1.4142, 1.41421];
const BAB = [
  { v: 3 / 2, l: "3/2", sq: "9/4", err: "1/4" },
  { v: 17 / 12, l: "17/12", sq: "289/144", err: "1/144" },
  { v: 577 / 408, l: "577/408", sq: "332929/166464", err: "1/166464" },
];

export const Swarm: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("swarm");
  const [c0, c1, c2, c3] = cues;
  // zoom in around √2 as the swarms tighten
  const z = glide(frame, c1 + 60, fps, 40);
  const scale = lerp(1, 10, z);
  const px = (v: number) => {
    const base = X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
    const pivot = X0 + ((SQRT2 - LO) / (HI - LO)) * (X1 - X0);
    return lerp(base, 960 + (base - pivot) * scale, z);
  };
  const decAt = (k: number) => c0 + 10 + k * 12;
  const babAt = (k: number) => c1 + 10 + k * 16;
  const blob = glide(frame, c2 + 40, fps, 26);
  const point = glide(frame, c2 + 80, fps, 20);
  const nDec = DEC.filter((_, k) => frame >= decAt(k)).length;
  const nBab = BAB.filter((_, k) => frame >= babAt(k)).length;
  const lastDec = DEC[Math.max(0, nDec - 1)];
  const lastBab = nBab > 0 ? BAB[nBab - 1].v : HI;
  const tether = lastBab - lastDec;

  return (
    <SceneShell id="swarm">
      {DEC.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={decAt(k)} volume={0.22} />
      ))}
      {BAB.map((_, k) => (
        <Sfx key={`b${k}`} name={PLUCKS[5 - k]} at={babAt(k)} volume={0.22} />
      ))}
      <Sfx name="whoosh" at={c1 + 60} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 40} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 80} />
      {BAB.map((_, k) => (
        <Sfx key={`q${k}`} name="tick" at={c3 + 20 + k * 12} volume={0.18} />
      ))}
      <Sfx name="ding" at={c3 + 64} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={0}
            y1={Y}
            x2={1920}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {[1, 1.5].map((v) => (
            <text
              key={v}
              x={px(v)}
              y={Y + 110}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 2) * (1 - z)}
            >
              {v}
            </text>
          ))}
          {/* the two swarms, which blur into one blob */}
          <g opacity={1 - point}>
            {DEC.map((v, k) => {
              const s = Math.min(1, springIn(frame, decAt(k), fps, 12));
              return (
                <g
                  key={v}
                  transform={`translate(${lerp(0, px(SQRT2) - px(v), blob * 0.9)} 0)`}
                >
                  <circle cx={px(v)} cy={Y} r={10 * s} fill={colors.primary} />
                  <text
                    x={px(v)}
                    y={Y - 30 - (k % 2) * 34}
                    fill={colors.primary}
                    fontSize={28}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                    opacity={s * (1 - blob)}
                  >
                    {v}
                  </text>
                </g>
              );
            })}
            {BAB.map((b, k) => {
              const s = Math.min(1, springIn(frame, babAt(k), fps, 12));
              return (
                <g
                  key={b.l}
                  transform={`translate(${lerp(0, px(SQRT2) - px(b.v), blob * 0.9)} 0)`}
                >
                  <circle cx={px(b.v)} cy={Y} r={10 * s} fill={colors.orange} />
                  <text
                    x={px(b.v)}
                    y={Y + 46 + (k % 2) * 34}
                    fill={colors.orange}
                    fontSize={28}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={s * (1 - blob)}
                  >
                    {b.l}
                  </text>
                </g>
              );
            })}
            <ellipse
              cx={px(SQRT2)}
              cy={Y}
              rx={90 * blob}
              ry={60 * blob}
              fill={alpha(colors.primary, 0.12)}
              stroke={colors.primary}
              strokeWidth={3}
              opacity={blob}
            />
          </g>
          {/* the tether between the newest pair */}
          <g opacity={fadeIn(frame, c1 + 20) * fadeOut(frame, c2 + 40, 10)}>
            <line
              x1={px(lastDec)}
              y1={Y - 90}
              x2={px(lastBab)}
              y2={Y - 90}
              stroke={colors.highlight}
              strokeWidth={4}
            />
            {[lastDec, lastBab].map((v, i) => (
              <line
                key={i}
                x1={px(v)}
                y1={Y - 104}
                x2={px(v)}
                y2={Y - 76}
                stroke={colors.highlight}
                strokeWidth={4}
              />
            ))}
            <text
              x={(px(lastDec) + px(lastBab)) / 2}
              y={Y - 110}
              fill={colors.highlight}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              {tx.gap} {tether.toFixed(tether < 0.001 ? 6 : 4)}
            </text>
          </g>
          {/* one point: √2 */}
          <circle
            cx={px(SQRT2)}
            cy={Y}
            r={16 * point}
            fill={colors.highlight}
          />
          <text
            x={px(SQRT2)}
            y={Y - 40}
            fill={colors.highlight}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={point}
          >
            √2
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 130,
            display: "flex",
            gap: 40,
            fontSize: 36,
            opacity: fadeOut(frame, c3, 10),
          }}
        >
          <span
            style={{ color: colors.primary, opacity: fadeIn(frame, c0 + 6) }}
          >
            ● {tx.decimals}
          </span>
          <span
            style={{ color: colors.orange, opacity: fadeIn(frame, c1 + 6) }}
          >
            ● {tx.babylonian}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 44,
            opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c2 + 6, 16),
          }}
        >
          (aₙ) ~ (bₙ) ⇔ aₙ − bₙ → 0
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 34,
              color: colors.primary,
              marginTop: 10,
              opacity: fadeIn(frame, c2 + 40),
            }}
          >
            {tx.glue} · ↩ E05
          </div>
        </div>
        {/* squares term by term */}
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 130,
            fontFamily: fonts.math,
            fontSize: 36,
            opacity: fadeIn(frame, c3 + 10),
            translate: riseIn(frame, c3 + 10, 16),
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 32,
              color: colors.muted,
              marginBottom: 8,
            }}
          >
            {tx.termwise}
          </div>
          {BAB.map((b, k) => (
            <div
              key={b.l}
              style={{
                opacity: fadeIn(frame, c3 + 20 + k * 12),
                marginBottom: 6,
              }}
            >
              ({b.l})² = 2 +{" "}
              <span style={{ color: colors.orange }}>{b.err}</span>
            </div>
          ))}
          <div
            style={{
              color: colors.highlight,
              fontSize: 48,
              marginTop: 10,
              opacity: fadeIn(frame, c3 + 64),
            }}
          >
            √2 · √2 = 2
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
