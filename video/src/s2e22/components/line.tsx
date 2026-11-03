import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A number line for [lo, hi] at screen x0…x1, height y, with end labels.
export const NumberLine: React.FC<{
  readonly x0: number;
  readonly x1: number;
  readonly y: number;
  readonly lo?: string;
  readonly hi?: string;
  readonly opacity?: number;
}> = ({ x0, x1, y, lo = "0", hi = "1", opacity = 1 }) => (
  <g opacity={opacity}>
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={colors.paper} strokeWidth={5} />
    {[x0, x1].map((x) => (
      <line
        key={x}
        x1={x}
        y1={y - 16}
        x2={x}
        y2={y + 16}
        stroke={colors.paper}
        strokeWidth={5}
      />
    ))}
    <text
      x={x0}
      y={y + 56}
      fill={alpha(colors.paper, 0.7)}
      fontSize={36}
      fontFamily={fonts.mono}
      textAnchor="middle"
    >
      {lo}
    </text>
    <text
      x={x1}
      y={y + 56}
      fill={alpha(colors.paper, 0.7)}
      fontSize={36}
      fontFamily={fonts.mono}
      textAnchor="middle"
    >
      {hi}
    </text>
  </g>
);

// The Cantor intervals after k steps.
export const cantor = (k: number): [number, number][] => {
  let iv: [number, number][] = [[0, 1]];
  for (let i = 0; i < k; i++)
    iv = iv.flatMap(
      ([a, b]) =>
        [
          [a, a + (b - a) / 3],
          [b - (b - a) / 3, b],
        ] as [number, number][],
    );
  return iv;
};

// Fractions in (0, 1) listed by denominator: ½, ⅓, ⅔, ¼, ¾, ⅕, …
export const FRACTIONS: { p: number; q: number }[] = (() => {
  const out: { p: number; q: number }[] = [];
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  for (let q = 2; q <= 40; q++)
    for (let p = 1; p < q; p++) if (gcd(p, q) === 1) out.push({ p, q });
  return out;
})();
