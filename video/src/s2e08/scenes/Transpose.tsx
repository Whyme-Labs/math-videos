import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";

// The matrix of T* is the transpose. A 2 × 3 grid, labelled with the
// lemon arrow V → W of T, flips across its diagonal, cell by cell, into a
// 3 × 2 grid labelled with the orange arrow W* → V* of T*, which points the
// other way. Then a chain V → W → X (B, then A) in lemon, and under it the
// chain of duals in orange running backwards: a token runs forwards along
// the top and another runs backwards along the bottom, and (AB)ᵀ = BᵀAᵀ
// lands underneath.

const GRID = [
  [2, 0, 1],
  [1, 3, -1],
];

export const Transpose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("transpose");
  const [c0, c1] = cues;
  const flip = glide(frame, c0 + 40, fps, 40);
  const part1 = fadeOut(frame, c1, 10);
  const top = ramp(frame, c1 + 20, 40);
  const bottom = ramp(frame, c1 + 70, 40);
  const NODES = [520, 960, 1400];

  return (
    <SceneShell id="transpose">
      <Sfx name="whoosh" at={c0 + 40} volume={0.14} />
      <Sfx name="ding" at={c0 + 80} />
      <Sfx name="pluck1" at={c1 + 20} volume={0.14} />
      <Sfx name="pluck3" at={c1 + 40} volume={0.14} />
      <Sfx name="pluck5" at={c1 + 70} volume={0.14} />
      <Sfx name="pluck3" at={c1 + 90} volume={0.14} />
      <Sfx name="chime" at={c1 + 120} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={700}
            y1={240}
            x2={1260}
            y2={800}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={4}
            strokeDasharray="14 10"
          />
          {GRID.map((row, i) =>
            row.map((v, j) => {
              const x = 820 + lerp(j, i, flip) * 150;
              const y = 360 + lerp(i, j, flip) * 150;
              return (
                <g key={`${i}${j}`}>
                  <rect
                    x={x - 60}
                    y={y - 60}
                    width={120}
                    height={120}
                    rx={16}
                    fill={alpha(
                      flip > 0.5 ? colors.orange : colors.primary,
                      0.18,
                    )}
                    stroke={flip > 0.5 ? colors.orange : colors.primary}
                    strokeWidth={5}
                  />
                  <text
                    x={x}
                    y={y + 22}
                    fill={colors.text}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    {v < 0 ? `−${-v}` : v}
                  </text>
                </g>
              );
            }),
          )}
          {/* T: V → W, then T*: W* → V* */}
          <g opacity={1 - flip}>
            <text
              x={420}
              y={420}
              fill={colors.primary}
              fontSize={60}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              T
            </text>
            <text
              x={420}
              y={500}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              V → W
            </text>
          </g>
          <g opacity={flip}>
            <text
              x={1500}
              y={480}
              fill={colors.orange}
              fontSize={60}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              T*
            </text>
            <text
              x={1500}
              y={560}
              fill={colors.orange}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              V* ← W*
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {["V", "W", "X"].map((n, k) => (
            <g key={n}>
              <circle
                cx={NODES[k]}
                cy={300}
                r={70}
                fill={alpha(colors.bgMid, 0.9)}
                stroke={colors.primary}
                strokeWidth={6}
              />
              <text
                x={NODES[k]}
                y={322}
                fill={colors.primary}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {n}
              </text>
              <circle
                cx={NODES[k]}
                cy={600}
                r={70}
                fill={alpha(colors.bgMid, 0.9)}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <text
                x={NODES[k]}
                y={622}
                fill={colors.orange}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {n}*
              </text>
            </g>
          ))}
          {[0, 1].map((k) => (
            <g key={k}>
              <line
                x1={NODES[k] + 80}
                y1={300}
                x2={NODES[k + 1] - 90}
                y2={300}
                stroke={colors.primary}
                strokeWidth={6}
              />
              <polygon
                points={`${NODES[k + 1] - 76},300 ${NODES[k + 1] - 100},286 ${NODES[k + 1] - 100},314`}
                fill={colors.primary}
              />
              <text
                x={(NODES[k] + NODES[k + 1]) / 2}
                y={270}
                fill={colors.primary}
                fontSize={48}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {["B", "A"][k]}
              </text>
              <line
                x1={NODES[k] + 90}
                y1={600}
                x2={NODES[k + 1] - 80}
                y2={600}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <polygon
                points={`${NODES[k] + 76},600 ${NODES[k] + 100},586 ${NODES[k] + 100},614`}
                fill={colors.orange}
              />
              <text
                x={(NODES[k] + NODES[k + 1]) / 2}
                y={660}
                fill={colors.orange}
                fontSize={48}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {["B", "A"][k]}
                <tspan dy={-22} fontSize={30}>
                  T
                </tspan>
              </text>
            </g>
          ))}
          <circle
            cx={lerp(NODES[0], NODES[2], top)}
            cy={300}
            r={18}
            fill={colors.text}
            opacity={top > 0 && top < 1 ? 1 : 0}
          />
          <circle
            cx={lerp(NODES[2], NODES[0], bottom)}
            cy={600}
            r={18}
            fill={colors.text}
            opacity={bottom > 0 && bottom < 1 ? 1 : 0}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 720,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 116),
            translate: riseIn(frame, c1 + 116, 16),
          }}
        >
          (AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
