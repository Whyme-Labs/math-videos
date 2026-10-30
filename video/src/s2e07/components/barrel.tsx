import type React from "react";
import { alpha, colors } from "../../shared/theme";

// A wine barrel lying on its side: a bulging profile with hoops and a bung
// hole on top. (cx, cy) is its centre, `len` its length, `rEnd` and `rMid`
// the half-heights at the ends and in the middle.

export const barrelTop = (
  t: number,
  cx: number,
  cy: number,
  len: number,
  rEnd: number,
  rMid: number,
) => ({
  x: cx - len / 2 + t * len,
  y: cy - (rEnd + (rMid - rEnd) * Math.sin(Math.PI * t)),
});

export const Barrel: React.FC<{
  readonly cx: number;
  readonly cy: number;
  readonly len?: number;
  readonly rEnd?: number;
  readonly rMid?: number;
  readonly opacity?: number;
}> = ({ cx, cy, len = 640, rEnd = 150, rMid = 210, opacity = 1 }) => {
  const top = (t: number) => barrelTop(t, cx, cy, len, rEnd, rMid);
  const pts = Array.from({ length: 41 }, (_, i) => top(i / 40));
  const d = `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")} L ${pts
    .slice()
    .reverse()
    .map((p) => `${p.x.toFixed(1)} ${(2 * cy - p.y).toFixed(1)}`)
    .join(" L ")} Z`;
  return (
    <g opacity={opacity}>
      <path
        d={d}
        fill={alpha(colors.wood, 0.55)}
        stroke={colors.ink}
        strokeWidth={6}
      />
      {[0.12, 0.3, 0.7, 0.88].map((t) => (
        <line
          key={t}
          x1={top(t).x}
          y1={top(t).y}
          x2={top(t).x}
          y2={2 * cy - top(t).y}
          stroke={alpha(colors.ink, 0.6)}
          strokeWidth={10}
        />
      ))}
      <ellipse cx={cx} cy={top(0.5).y + 4} rx={22} ry={8} fill={colors.ink} />
    </g>
  );
};
