import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A 2 × 2 matrix in brackets. `flip` (0 → 1) swaps the two off-diagonal
// entries across the diagonal, arcing each over a dashed diagonal line:
// for a symmetric matrix nothing visibly changes. `hot` lights entries.

export const Mat: React.FC<{
  readonly m: readonly (number | string)[];
  readonly x: number;
  readonly y: number;
  readonly cell?: number;
  readonly flip?: number;
  readonly diag?: number;
  readonly opacity?: number;
  readonly color?: string;
  readonly offColor?: string;
}> = ({
  m,
  x,
  y,
  cell = 130,
  flip = 0,
  diag = 0,
  opacity = 1,
  color = colors.text,
  offColor = colors.orange,
}) => {
  const fmt = (v: number | string) =>
    typeof v === "number"
      ? Math.abs(v - Math.round(v)) < 0.005
        ? String(Math.round(v)).replace("-", "−")
        : v.toFixed(2).replace("-", "−")
      : v;
  const pos = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];
  const W = 2 * cell;
  const arc = Math.sin(Math.PI * flip) * cell * 0.5;
  return (
    <div
      style={{
        position: "absolute",
        left: x - W / 2 - 24,
        top: y - cell,
        width: W + 48,
        height: 2 * cell,
        opacity,
      }}
    >
      <svg width={W + 48} height={2 * cell} style={{ position: "absolute" }}>
        <path
          d={`M 18 4 L 4 4 L 4 ${2 * cell - 4} L 18 ${2 * cell - 4}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
        />
        <path
          d={`M ${W + 30} 4 L ${W + 44} 4 L ${W + 44} ${2 * cell - 4} L ${W + 30} ${2 * cell - 4}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
        />
        <line
          x1={24}
          y1={10}
          x2={W + 24}
          y2={2 * cell - 10}
          stroke={alpha(colors.green, 0.8)}
          strokeWidth={4}
          strokeDasharray="12 10"
          opacity={diag}
        />
      </svg>
      {m.map((v, i) => {
        const off = i === 1 || i === 2;
        const from = pos[i];
        const to = off ? pos[3 - i] : from;
        const px = from.x + (to.x - from.x) * flip;
        const py = from.y + (to.y - from.y) * flip;
        const lift = off ? (i === 1 ? -arc : arc) : 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 24 + px * cell,
              top: py * cell + lift,
              width: cell,
              height: cell,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.mono,
              fontSize: cell * (m.some((v) => fmt(v).length > 2) ? 0.3 : 0.42),
              fontWeight: 800,
              color: off ? offColor : color,
            }}
          >
            {fmt(v)}
          </div>
        );
      })}
    </div>
  );
};
