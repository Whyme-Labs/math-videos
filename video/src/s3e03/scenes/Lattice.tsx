import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Mat } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. 李诫《营造法式》 (1103): a lattice door panel in the
// 四斜毬文 pattern, overlapping circles on a diagonal grid (c0). The panel
// turns a quarter turn, then flips; the pattern lands on itself, only the
// marked corner moves (c1). The eight symmetries as tiles, D₄ (c2). The
// quarter turn as a matrix: the same representation as before (c3).

const C = { x: 620, y: 470 };
const H = 260; // half the window's side
const D = 92; // grid spacing

export const Lattice: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("lattice");
  const [c0, c1, c2, c3] = cues;
  const turn = 90 * progress(frame, c1 + 10, 30);
  const fl = 1 - 2 * progress(frame, c1 + 60, 30);
  const tiles = fadeIn(frame, c2 + 4, 10);

  const circles = [];
  for (let i = -5; i <= 5; i++)
    for (let j = -5; j <= 5; j++) {
      // a diagonal grid: rotate the square grid by 45°
      const x = ((i - j) * D) / Math.SQRT2;
      const y = ((i + j) * D) / Math.SQRT2;
      if (Math.abs(x) < H + D && Math.abs(y) < H + D)
        circles.push(
          <circle
            key={`${i}-${j}`}
            cx={x}
            cy={y}
            r={D / Math.SQRT2}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
          />,
        );
    }

  return (
    <SceneShell id="lattice">
      <Sfx name="page" at={c0 + 4} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 8 + i * 5} volume={0.05} />
      ))}
      <Sfx name="chime" at={c3 + 20} volume={0.22} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1000,
          fontSize: 42,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.lzTitle}
        <div style={{ color: colors.text, marginTop: 14, fontSize: 40 }}>
          {tx.lzName}
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="lz-win">
            <rect x={-H} y={-H} width={2 * H} height={2 * H} />
          </clipPath>
        </defs>
        <g
          opacity={fadeIn(frame, c0 + 10, 12)}
          transform={`translate(${C.x} ${C.y})`}
        >
          <rect
            x={-H - 22}
            y={-H - 22}
            width={2 * H + 44}
            height={2 * H + 44}
            rx={8}
            fill={alpha(colors.ink, 0.6)}
            stroke={colors.wood}
            strokeWidth={12}
          />
          <g transform={`rotate(${turn}) scale(${fl} 1)`}>
            <g clipPath="url(#lz-win)">{circles}</g>
            <circle
              cx={-H + 10}
              cy={-H + 10}
              r={16}
              fill={colors.highlight}
              opacity={fadeIn(frame, c1 + 4, 8)}
            />
          </g>
        </g>
        <g opacity={tiles}>
          {Array.from({ length: 8 }, (_, i) => {
            const k = i % 4;
            const f = i >= 4 ? -1 : 1;
            const cx = 1060 + k * 170;
            const cy = 360 + Math.floor(i / 4) * 170;
            return (
              <g
                key={i}
                opacity={fadeIn(frame, c2 + 8 + i * 5, 6)}
                transform={`translate(${cx} ${cy}) rotate(${90 * k}) scale(${f} 1)`}
              >
                <rect
                  x={-50}
                  y={-50}
                  width={100}
                  height={100}
                  fill={alpha(colors.orange, 0.12)}
                  stroke={colors.orange}
                  strokeWidth={4}
                />
                <circle cx={-38} cy={-38} r={9} fill={colors.highlight} />
              </g>
            );
          })}
          <text
            x={1315}
            y={640}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.lzD4}
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 8, 10)}>
          <text
            x={1040}
            y={760}
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            r =
          </text>
          <Mat
            x={1160}
            y={700}
            rows={[
              [0, -1],
              [1, 0],
            ]}
            cw={100}
            rh={56}
            size={44}
          />
        </g>
      </svg>
    </SceneShell>
  );
};
