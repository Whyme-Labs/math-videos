import type React from "react";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { alpha, colors, fonts } from "../../shared/theme";

// Small drawing helpers shared by this episode's scenes.

export type Pt = [number, number];

export const poly = (pts: Pt[], close = false) =>
  pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ") +
  (close ? " Z" : "");

// the ℓᵖ unit circle of radius R centred at (cx, cy), in screen coordinates
export const ballPath = (p: number, cx: number, cy: number, R: number) =>
  poly(
    Array.from({ length: 161 }, (_, k) => {
      const t = (2 * Math.PI * k) / 160;
      const c = Math.cos(t);
      const s = Math.sin(t);
      const r = 1 / (Math.abs(c) ** p + Math.abs(s) ** p) ** (1 / p);
      return [cx + R * r * c, cy - R * r * s] as Pt;
    }),
    true,
  );

// a long line through (x, y) in direction (dx, dy)
export const longLine = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  L = 2000,
) => {
  const n = Math.hypot(dx, dy);
  return `M ${x - (L * dx) / n} ${y - (L * dy) / n} L ${x + (L * dx) / n} ${y + (L * dy) / n}`;
};

// a rounded chip of text that rises in at frame `at`
export const Chip: React.FC<{
  frame: number;
  at: number;
  x: number;
  y: number;
  color?: string;
  size?: number;
  math?: boolean;
  children: React.ReactNode;
}> = ({
  frame,
  at,
  x,
  y,
  color = colors.primary,
  size = 44,
  math,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: x,
      padding: "10px 26px",
      borderRadius: 16,
      border: `5px solid ${color}`,
      background: alpha(colors.bg, 0.85),
      fontFamily: math ? fonts.math : fonts.body,
      fontSize: size,
      fontWeight: 800,
      color,
      opacity: fadeIn(frame, at),
      translate: riseIn(frame, at, 12),
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

// a pseudo-random number in [0, 1) from an integer seed
export const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// an SVG path of y = f(x) for x in [x0, x1], in screen coordinates
export const path = (
  f: (x: number) => number,
  x0: number,
  x1: number,
  X: (x: number) => number,
  Y: (y: number) => number,
  n = 400,
) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return `${i ? "L" : "M"} ${X(x)} ${Y(f(x))}`;
  }).join(" ");
