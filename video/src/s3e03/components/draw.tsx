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

// a bracketed matrix drawn in SVG, its top-left corner at (x, y)
export const Mat: React.FC<{
  x: number;
  y: number;
  rows: (string | number)[][];
  cw?: number;
  rh?: number;
  size?: number;
  color?: string;
  cell?: (i: number, j: number) => string | undefined;
  opacity?: number;
}> = ({
  x,
  y,
  rows,
  cw = 110,
  rh = 80,
  size = 48,
  color,
  cell,
  opacity = 1,
}) => {
  const n = rows.length;
  const m = rows[0].length;
  const W = m * cw;
  const H = n * rh;
  const ink = color ?? colors.text;
  const br = (side: 0 | 1) => {
    const bx = side ? x + W + 10 : x - 10;
    const d = side ? -16 : 16;
    return `M ${bx + d} ${y - 6} L ${bx} ${y - 6} L ${bx} ${y + H + 6} L ${bx + d} ${y + H + 6}`;
  };
  return (
    <g opacity={opacity}>
      <path d={br(0)} fill="none" stroke={ink} strokeWidth={4} />
      <path d={br(1)} fill="none" stroke={ink} strokeWidth={4} />
      {rows.map((r, i) =>
        r.map((v, j) => (
          <text
            key={`${i}-${j}`}
            x={x + cw * (j + 0.5)}
            y={y + rh * (i + 0.5) + size * 0.35}
            textAnchor="middle"
            fill={cell?.(i, j) ?? ink}
            fontSize={size}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {typeof v === "number" ? String(v).replace("-", "−") : v}
          </text>
        )),
      )}
    </g>
  );
};

// n dots round a circle: the clock ℤ/n. `lit` dots are drawn bright.
export const Clock: React.FC<{
  cx: number;
  cy: number;
  r: number;
  n: number;
  color?: string;
  dot?: number;
  lit?: (k: number) => boolean;
  spin?: number;
  opacity?: number;
}> = ({
  cx,
  cy,
  r,
  n,
  color = colors.primary,
  dot,
  lit,
  spin = 0,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={alpha(colors.paper, 0.25)}
      strokeWidth={3}
    />
    {Array.from({ length: n }, (_, k) => {
      const a = Math.PI / 2 - (2 * Math.PI * k) / n - spin;
      return (
        <circle
          key={k}
          cx={cx + r * Math.cos(a)}
          cy={cy - r * Math.sin(a)}
          r={dot ?? Math.max(4, Math.min(14, (r * 2.4) / n))}
          fill={!lit || lit(k) ? color : alpha(colors.paper, 0.3)}
        />
      );
    })}
  </g>
);

// a Young diagram of a partition, rows of boxes, top-left corner at (x, y)
export const Young: React.FC<{
  x: number;
  y: number;
  parts: number[];
  s?: number;
  color?: string;
  opacity?: number;
}> = ({ x, y, parts, s = 30, color = colors.primary, opacity = 1 }) => (
  <g opacity={opacity}>
    {parts.map((p, i) =>
      Array.from({ length: p }, (_, j) => (
        <rect
          key={`${i}-${j}`}
          x={x + j * s}
          y={y + i * s}
          width={s - 4}
          height={s - 4}
          rx={4}
          fill={alpha(color, 0.25)}
          stroke={color}
          strokeWidth={2.5}
        />
      )),
    )}
  </g>
);
