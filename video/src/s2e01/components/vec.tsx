import type React from "react";
import { colors } from "../../shared/theme";

// Season 2's basic pieces: an arrow (a vector, in lemon by default) and a
// plotted curve.

export type P = { readonly x: number; readonly y: number };

export const Arrow: React.FC<{
  readonly from: P;
  readonly to: P;
  readonly color?: string;
  readonly width?: number;
  readonly opacity?: number;
  readonly dashed?: boolean;
}> = ({
  from,
  to,
  color = colors.primary,
  width = 12,
  opacity = 1,
  dashed,
}) => {
  const a = Math.atan2(to.y - from.y, to.x - from.x);
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  if (len < 4) return null;
  const head = Math.min(40, len * 0.5);
  return (
    <g opacity={opacity}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x - head * 0.7 * Math.cos(a)}
        y2={to.y - head * 0.7 * Math.sin(a)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "16 12" : undefined}
      />
      <polygon
        points={`${to.x},${to.y} ${to.x - head * Math.cos(a) + head * 0.55 * Math.sin(a)},${to.y - head * Math.sin(a) - head * 0.55 * Math.cos(a)} ${to.x - head * Math.cos(a) - head * 0.55 * Math.sin(a)},${to.y - head * Math.sin(a) + head * 0.55 * Math.cos(a)}`}
        fill={color}
      />
    </g>
  );
};

// the path of y = f(x) for x in [x0, x1], mapped to the screen by `toScreen`
export const curve = (
  f: (x: number) => number,
  x0: number,
  x1: number,
  toScreen: (x: number, y: number) => P,
  steps = 120,
) =>
  Array.from({ length: steps + 1 })
    .map((_, i) => {
      const x = x0 + ((x1 - x0) * i) / steps;
      const p = toScreen(x, f(x));
      return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ");
