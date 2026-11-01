import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import {
  Plane,
  IDENTITY,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { useStrings } from "../i18n";

// Schur, then the spectral theorem. A 3 × 3 matrix of stars with λ₁, λ₂,
// λ₃ on the diagonal. An eigenvector arrow appears on the plane at the
// right and becomes the first basis arrow; the first column below the
// diagonal drains to 0 (c1). Repeating on what's left drains the second
// column: a staircase of zeros (c2). A badge, "commutes with its
// conjugate transpose" (c3); the stars above the diagonal drain too:
// diagonal (c4). Last the plane stretches along two perpendicular
// eigen-axes, each by its own amount (c5).

const Q = 0.5;
const c = Math.cos(Q);
const s = Math.sin(Q);
// Q · diag(1.8, 0.6) · Qᵀ: perpendicular eigen-axes at angles Q and Q + 90°
const N: Mat2 = [
  1.8 * c * c + 0.6 * s * s,
  (1.8 - 0.6) * c * s,
  (1.8 - 0.6) * c * s,
  1.8 * s * s + 0.6 * c * c,
];

export const Spectral: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("spectral");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const col1 = glide(frame, c1 + 30, fps, 24);
  const col2 = glide(frame, c2 + 20, fps, 24);
  const upper = glide(frame, c4 + 6, fps, 30);
  const stretch = glide(frame, c5 + 6, fps, 40);
  const drained = (i: number, j: number) =>
    i > j ? (j === 0 ? col1 : col2) : upper;
  const O = { x: 1420, y: 470 };
  const S = 140;
  const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const M = lerpMat(IDENTITY, N, stretch);
  const e1 = linear(M)(c, s);
  const e2 = linear(M)(-s, c);

  return (
    <SceneShell id="spectral">
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="chime" at={c4 + 40} volume={0.3} />
      <Sfx name="riser" at={c5 + 6} volume={0.08} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform="translate(600 470)">
          <path
            d="M -300 -250 l -26 0 l 0 500 l 26 0 M 300 -250 l 26 0 l 0 500 l -26 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={7}
          />
          {Array.from({ length: 9 }).map((_, n) => {
            const i = Math.floor(n / 3);
            const j = n % 3;
            const x = -190 + j * 190;
            const y = -150 + i * 160;
            if (i === j)
              return (
                <text
                  key={n}
                  x={x}
                  y={y + 24}
                  fill={colors.orange}
                  fontSize={76}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  λ
                  <tspan dy={16} fontSize={44}>
                    {i + 1}
                  </tspan>
                </text>
              );
            const t = drained(i, j);
            return (
              <g key={n}>
                <text
                  x={x}
                  y={y + 34}
                  fill={colors.text}
                  fontSize={96}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={1 - t}
                >
                  ∗
                </text>
                <text
                  x={x}
                  y={y + 26}
                  fill={colors.green}
                  fontSize={72}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={t}
                >
                  0
                </text>
              </g>
            );
          })}
          {/* the staircase outline under the diagonal */}
          <path
            d="M -285 -70 L -95 -70 L -95 90 L 95 90 L 95 240"
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            strokeDasharray="12 10"
            opacity={col2 * (1 - upper)}
          />
        </g>
        {/* the plane on the right */}
        <defs>
          <clipPath id="e15spec">
            <circle cx={O.x} cy={O.y} r={300} />
          </clipPath>
        </defs>
        <g clipPath="url(#e15spec)" opacity={fadeIn(frame, c1 + 4)}>
          <Plane map={linear(M)} scr={scr} range={6} step={0.5} />
        </g>
        <g opacity={fadeIn(frame, c1 + 4)}>
          <Arrow
            from={O}
            to={scr(e1.x, e1.y)}
            width={14}
            color={colors.orange}
          />
        </g>
        <g opacity={fadeIn(frame, c5 + 4)} clipPath="url(#e15spec)">
          <Arrow
            from={O}
            to={scr(e2.x, e2.y)}
            width={14}
            color={colors.highlight}
          />
          <line
            x1={scr(-3 * c, -3 * s).x}
            y1={scr(-3 * c, -3 * s).y}
            x2={scr(3 * c, 3 * s).x}
            y2={scr(3 * c, 3 * s).y}
            stroke={alpha(colors.orange, 0.5)}
            strokeWidth={4}
          />
          <line
            x1={scr(3 * s, -3 * c).x}
            y1={scr(3 * s, -3 * c).y}
            x2={scr(-3 * s, 3 * c).x}
            y2={scr(-3 * s, 3 * c).y}
            stroke={alpha(colors.highlight, 0.5)}
            strokeWidth={4}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.schur}
      </div>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 370,
          width: 460,
          textAlign: "center",
          padding: "10px 0",
          borderRadius: 16,
          border: `4px solid ${colors.highlight}`,
          fontSize: 52,
          fontFamily: fonts.math,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
        }}
      >
        N N* = N* N
      </div>
    </SceneShell>
  );
};
