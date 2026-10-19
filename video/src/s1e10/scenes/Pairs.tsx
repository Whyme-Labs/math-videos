import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Grid, px, type View } from "../components/plane";
import { useStrings } from "../i18n";

// ℂ as pairs of reals. Lattice points light up as pairs (a, b); the two
// rules arrive, the multiplication rule marked as the odd one. Then the real
// axis lights up as the pairs (a, 0), the point (0, 1) is named i, and
// i · i is computed and lands on (−1, 0).

const V: View = { cx: 560, cy: 470, unit: 120 };
const SAMPLES = [
  { re: 2, im: 1 },
  { re: -1, im: 2 },
  { re: 1.5, im: -1.5 },
  { re: -2, im: -1 },
];

export const Pairs: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("pairs");
  const [c0, c1, c2] = cues;
  const sampleAt = (k: number) => c0 + 30 + k * 10;
  const realAxis = ramp(frame, c2 + 6, 20);
  const iPop = springIn(frame, c2 + 34, fps, 10);
  const calcAt = c2 + 50;
  const travel = glide(frame, calcAt + 40, fps, 26);
  const theta = (Math.PI / 2) * (1 + travel);
  const dot = px(V, { re: Math.cos(theta), im: Math.sin(theta) });
  const o = px(V, { re: 0, im: 0 });

  return (
    <SceneShell id="pairs">
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      {SAMPLES.map((_, k) => (
        <Sfx key={k} name="pop" at={sampleAt(k)} volume={0.2} />
      ))}
      <Sfx name="page" at={c1 + 6} />
      <Sfx name="ding" at={c1 + 40} volume={0.22} />
      <Sfx name="scratch" at={c2 + 6} volume={0.2} />
      <Sfx name="pop" at={c2 + 34} />
      <Sfx name={PLUCKS[2]} at={calcAt} volume={0.24} />
      <Sfx name="whoosh" at={calcAt + 40} volume={0.14} />
      <Sfx name="chime" at={calcAt + 66} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Grid view={V} n={3} opacity={fadeIn(frame, c0 + 10)} />
          {SAMPLES.map((z, k) => {
            const p = px(V, z);
            const s = Math.min(1, springIn(frame, sampleAt(k), fps, 12));
            return (
              <g key={k} opacity={s * lerp(1, 0.35, realAxis)}>
                <circle cx={p.x} cy={p.y} r={10} fill={colors.text} />
                <text
                  x={p.x + 16}
                  y={p.y - 14}
                  fill={colors.text}
                  fontSize={30}
                  fontFamily={fonts.math}
                >
                  ({z.re}, {z.im})
                </text>
              </g>
            );
          })}
          {/* the reals: the pairs (a, 0) */}
          <line
            x1={px(V, { re: -3, im: 0 }).x}
            y1={o.y}
            x2={lerp(
              px(V, { re: -3, im: 0 }).x,
              px(V, { re: 3, im: 0 }).x,
              realAxis,
            )}
            y2={o.y}
            stroke={colors.primary}
            strokeWidth={8}
            strokeLinecap="round"
            opacity={realAxis > 0 ? 1 : 0}
          />
          {/* i, and i · i landing on −1 */}
          <g opacity={Math.min(1, iPop)}>
            <path
              d={`M ${px(V, { re: 0, im: 1 }).x} ${px(V, { re: 0, im: 1 }).y} A ${V.unit} ${V.unit} 0 0 0 ${dot.x} ${dot.y}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
              strokeDasharray="10 8"
              opacity={travel > 0 ? 1 : 0}
            />
            <circle
              cx={px(V, { re: 0, im: 1 }).x}
              cy={px(V, { re: 0, im: 1 }).y}
              r={14}
              fill={colors.highlight}
            />
            <text
              x={px(V, { re: 0, im: 1 }).x + 22}
              y={px(V, { re: 0, im: 1 }).y - 18}
              fill={colors.highlight}
              fontSize={44}
              fontFamily={fonts.math}
            >
              i = (0, 1)
            </text>
            <circle
              cx={dot.x}
              cy={dot.y}
              r={12}
              fill={colors.orange}
              opacity={travel > 0 ? 1 : 0}
            />
            <text
              x={px(V, { re: -1, im: 0 }).x}
              y={o.y + 56}
              fill={colors.orange}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, calcAt + 62)}
            >
              −1
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 130,
            fontSize: 40,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 10),
          }}
        >
          {tx.pairsOfReals}{" "}
          <span style={{ fontFamily: fonts.math, color: colors.text }}>
            (a, b)
          </span>
        </div>
        {/* the two rules */}
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 220,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            fontFamily: fonts.math,
            fontSize: 44,
          }}
        >
          {[
            {
              l: tx.add,
              t: "(a, b) + (c, d) = (a + c, b + d)",
              c: colors.text,
              at: c1 + 6,
            },
            {
              l: tx.multiply,
              t: "(a, b) · (c, d) = (ac − bd, ad + bc)",
              c: colors.orange,
              at: c1 + 30,
            },
          ].map((r) => (
            <div
              key={r.l}
              style={{
                opacity: fadeIn(frame, r.at),
                translate: riseIn(frame, r.at, 16),
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 30,
                  color: colors.muted,
                }}
              >
                {r.l}
              </div>
              <div
                style={{
                  color: r.c,
                  padding: "8px 18px",
                  borderRadius: 14,
                  backgroundColor:
                    r.c === colors.orange
                      ? alpha(colors.orange, 0.12)
                      : "transparent",
                  border:
                    r.c === colors.orange
                      ? `2px solid ${alpha(colors.orange, 0.6)}`
                      : "none",
                }}
              >
                {r.t}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 520,
            fontSize: 38,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 10),
          }}
        >
          {tx.realsInside}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 600,
            fontFamily: fonts.math,
            fontSize: 42,
            lineHeight: 1.45,
            opacity: fadeIn(frame, calcAt),
            translate: riseIn(frame, calcAt, 16),
          }}
        >
          <div>(0, 1) · (0, 1)</div>
          <div style={{ color: colors.muted }}>= (0·0 − 1·1, 0·1 + 1·0)</div>
          <div
            style={{
              color: colors.orange,
              opacity: fadeIn(frame, calcAt + 62),
            }}
          >
            = (−1, 0) = −1
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
