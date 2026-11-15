import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The degree. [L : K] = dim_K L across the top (c0). The complex plane
// with basis arrows 1 and i (c1). The ℚ(√2) plane with basis 1 and √2 and
// the point 1 + √2 (c2); its inverse −1 + √2 marked in the same plane
// (c3). For α = ∛2: powers α⁰ … α⁵ listed, each reduced by α³ = 2 back to
// the three basis slots 1, α, α² (c4, c5).

const P = { x: 620, y: 560 };
const U = 140;

const Plane: React.FC<{ b1: string; b2: string }> = ({ b1, b2 }) => (
  <g>
    <line
      x1={P.x - 3 * U}
      y1={P.y}
      x2={P.x + 3 * U}
      y2={P.y}
      stroke={alpha(colors.paper, 0.4)}
      strokeWidth={2}
    />
    <line
      x1={P.x}
      y1={P.y + 2 * U}
      x2={P.x}
      y2={P.y - 2.6 * U}
      stroke={alpha(colors.paper, 0.4)}
      strokeWidth={2}
    />
    <line
      x1={P.x}
      y1={P.y}
      x2={P.x + U}
      y2={P.y}
      stroke={colors.primary}
      strokeWidth={8}
    />
    <line
      x1={P.x}
      y1={P.y}
      x2={P.x}
      y2={P.y - U}
      stroke={colors.orange}
      strokeWidth={8}
    />
    <text
      x={P.x + U - 10}
      y={P.y + 46}
      fill={colors.primary}
      fontSize={40}
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {b1}
    </text>
    <text
      x={P.x - 60}
      y={P.y - U + 10}
      fill={colors.orange}
      fontSize={40}
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {b2}
    </text>
  </g>
);

export const Degree: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("degree");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const pC = fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c2, 8);
  const pQ = fadeIn(frame, c2 + 4, 8) * fadeOut(frame, c4, 10);
  const pA = fadeIn(frame, c4 + 4, 10);
  const rows = [
    ["α⁰", "1", ""],
    ["α¹", "α", ""],
    ["α²", "α²", ""],
    ["α³", "2", "= 2·1"],
    ["α⁴", "2α", "= 2·α"],
    ["α⁵", "2α²", "= 2·α²"],
  ];
  const shown = Math.min(
    6,
    Math.max(0, Math.floor((frame - c4 - 10) / 10) + 1),
  );

  return (
    <SceneShell id="degree">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 8} volume={0.12} />
      <Sfx name="ding" at={c3 + 16} volume={0.18} />
      {rows.map((_, i) => (
        <Sfx key={i} name="tick" at={c4 + 10 + i * 10} volume={0.06} />
      ))}
      <Sfx name="chime" at={c5 + 30} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        [L : K] = dim<sub style={{ fontSize: 34 }}>K</sub> L
      </div>
      <AbsoluteFill style={{ opacity: pC }}>
        <svg width={1920} height={1080}>
          <Plane b1="1" b2="i" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 1200,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.highlight,
          }}
        >
          [ℂ : ℝ] = 2
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: pQ }}>
        <svg width={1920} height={1080}>
          <Plane b1="1" b2="√2" />
          <circle cx={P.x + U} cy={P.y - U} r={14} fill={colors.text} />
          <text
            x={P.x + U + 20}
            y={P.y - U - 16}
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1 + √2
          </text>
          <g opacity={fadeIn(frame, c3 + 10, 8)}>
            <circle cx={P.x - U} cy={P.y - U} r={14} fill={colors.highlight} />
            <text
              x={P.x - U - 20}
              y={P.y - U - 16}
              textAnchor="end"
              fill={colors.highlight}
              fontSize={36}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              −1 + √2
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 1200,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          a + b√2, a, b ∈ ℚ
        </div>
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 1200,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c3 + 10),
          }}
        >
          1/(1 + √2) = −1 + √2
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: pA }}>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 300,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          α = ∛2, α³ = 2
        </div>
        <svg width={1920} height={1080}>
          {["1", "α", "α²"].map((b, j) => (
            <g key={b}>
              <rect
                x={1000 + j * 220}
                y={300}
                width={180}
                height={420}
                rx={20}
                fill={alpha(colors.violet, 0.3)}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={3}
              />
              <text
                x={1090 + j * 220}
                y={280}
                textAnchor="middle"
                fill={colors.primary}
                fontSize={44}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {b}
              </text>
            </g>
          ))}
          {rows.slice(0, shown).map(([p, v, note], i) => {
            const slot = i % 3;
            const y = 360 + Math.floor(i / 3) * 70 + slot * 0;
            return (
              <g key={p}>
                <text
                  x={300}
                  y={340 + i * 66}
                  fill={colors.text}
                  fontSize={44}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {p} = {v}
                </text>
                <text
                  x={560}
                  y={340 + i * 66}
                  fill={colors.muted}
                  fontSize={36}
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {note}
                </text>
                <circle
                  cx={1090 + slot * 220}
                  cy={y + Math.floor(i / 3) * 90}
                  r={22}
                  fill={i >= 3 ? colors.orange : colors.primary}
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 740,
            left: 1000,
            width: 620,
            textAlign: "center",
            fontSize: 38,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c5 + 16),
            whiteSpace: "nowrap",
          }}
        >
          [ℚ(∛2) : ℚ] = 3 · {tx.remainder}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
