import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";

// The zoo on sequences. Three nested regions, ℓ¹ inside ℓ² inside ℓ∞
// (c0), with the chain peak ≤ energy ≤ total (c1). The sequence (1, ½, ⅓, …)
// as a little bar chart drops in and lands in the ℓ² ring, outside ℓ¹
// (c2); (1, 1, 1, …) lands in the ℓ∞ ring, outside ℓ² (c3).

const C = { x: 720, y: 480 };
const RINGS = [
  { r: 150, l: "ℓ¹", c: () => colors.primary },
  { r: 260, l: "ℓ²", c: () => colors.green },
  { r: 360, l: "ℓ∞", c: () => colors.highlight },
];

const Bars: React.FC<{
  x: number;
  y: number;
  vals: number[];
  color: string;
}> = ({ x, y, vals, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      x={-80}
      y={-70}
      width={160}
      height={90}
      rx={10}
      fill={alpha(colors.bg, 0.9)}
      stroke={color}
      strokeWidth={3}
    />
    {vals.map((v, i) => (
      <rect
        key={i}
        x={-70 + i * 14}
        y={10 - 60 * v}
        width={10}
        height={60 * v}
        fill={color}
      />
    ))}
  </g>
);

export const Zoo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("zoo");
  const [c0, c1, c2, c3] = cues;
  const d1 = glide(frame, c2 + 10, fps, 30);
  const d2 = glide(frame, c3 + 10, fps, 30);
  const harm = Array.from({ length: 10 }, (_, i) => 1 / (i + 1));
  const ones = Array.from({ length: 10 }, () => 1);

  return (
    <SceneShell id="zoo">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 8} volume={0.12} />
      ))}
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.1} />
      <Sfx name="thud" at={c2 + 40} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="thud" at={c3 + 40} volume={0.18} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[...RINGS].reverse().map((g, j) => {
          const i = 2 - j;
          return (
            <g key={g.l} opacity={fadeIn(frame, c0 + 6 + i * 8, 8)}>
              <ellipse
                cx={C.x}
                cy={C.y}
                rx={g.r * 1.45}
                ry={g.r}
                fill={alpha(g.c(), 0.08)}
                stroke={g.c()}
                strokeWidth={5}
              />
              <text
                x={C.x - g.r * 1.45 + 30}
                y={C.y + 14}
                fill={g.c()}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {g.l}
              </text>
            </g>
          );
        })}
        <g opacity={fadeIn(frame, c2 + 6, 8)}>
          <Bars
            x={lerp(1500, C.x + 280, d1)}
            y={lerp(160, C.y - 140, d1)}
            vals={harm}
            color={colors.green}
          />
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <Bars
            x={lerp(1500, C.x + 380, d2)}
            y={lerp(160, C.y + 230, d2)}
            vals={ones}
            color={colors.highlight}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1260,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          translate: riseIn(frame, c1 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        ‖x‖<sub>∞</sub> ≤ ‖x‖<sub>2</sub> ≤ ‖x‖<sub>1</sub>
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1460,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 40),
        }}
      >
        (1, ½, ⅓, …)
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1460,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c3 + 40),
        }}
      >
        (1, 1, 1, …)
      </div>
    </SceneShell>
  );
};
