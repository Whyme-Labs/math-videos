import type React from "react";
import { alpha, colors } from "../theme";

// The rational number line, drawn as dots. Inside any window [lo, hi] we
// draw the fractions p/q (lowest terms) with q up to a cap chosen so that
// about `target` dots are visible, so the line looks equally full at every
// zoom level.

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export const rationalsIn = (lo: number, hi: number, target = 160) => {
  const width = Math.max(hi - lo, 1e-9);
  const qMax = Math.max(
    2,
    Math.min(4000, Math.round(Math.sqrt(target / (0.6 * width)))),
  );
  const out: { v: number; q: number }[] = [];
  for (let q = 1; q <= qMax; q++) {
    const p0 = Math.ceil(lo * q);
    const p1 = Math.floor(hi * q);
    for (let p = p0; p <= p1; p++)
      if (gcd(Math.abs(p), q) === 1) out.push({ v: p / q, q });
  }
  return { dots: out, qMax };
};

export type Window = {
  readonly lo: number;
  readonly hi: number;
  readonly x0: number;
  readonly x1: number;
  readonly y: number;
};

export const toX = (w: Window, v: number) =>
  w.x0 + ((v - w.lo) / (w.hi - w.lo)) * (w.x1 - w.x0);

export const RationalDots: React.FC<{
  readonly w: Window;
  readonly target?: number;
  readonly r?: number;
  readonly opacity?: number;
  readonly color?: string;
}> = ({ w, target = 160, r = 4, opacity = 1, color = colors.primary }) => {
  const { dots, qMax } = rationalsIn(w.lo, w.hi, target);
  return (
    <g opacity={opacity}>
      <line
        x1={w.x0 - 40}
        y1={w.y}
        x2={w.x1 + 40}
        y2={w.y}
        stroke={alpha(colors.muted, 0.6)}
        strokeWidth={3}
      />
      {dots.map((d) => (
        <circle
          key={`${d.v}`}
          cx={toX(w, d.v)}
          cy={w.y}
          // simpler fractions are drawn bigger
          r={r * (d.q * 4 <= qMax ? 1.6 : d.q * 2 <= qMax ? 1.2 : 0.8)}
          fill={color}
        />
      ))}
    </g>
  );
};

// A gap marker: an empty ring on the line.
export const Gap: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s: number;
  readonly r?: number;
}> = ({ x, y, s, r = 14 }) => (
  <circle
    cx={x}
    cy={y}
    r={r * s}
    fill={colors.bg}
    stroke={colors.highlight}
    strokeWidth={4}
    opacity={Math.min(1, s)}
  />
);
