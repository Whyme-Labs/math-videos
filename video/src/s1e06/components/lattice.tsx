import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A grid of lattice points for pairs: (a, b) ∈ ℕ × ℕ for the integers,
// (p, q) ∈ ℤ × ℤ for the rationals. The first number runs left to right,
// the second bottom to top.

export type Lattice = {
  readonly ox: number; // screen position of (0, 0)
  readonly oy: number;
  readonly cell: number;
  readonly min: number; // smallest coordinate shown
  readonly max: number; // largest coordinate shown
};

export const at = (l: Lattice, a: number, b: number) => ({
  x: l.ox + a * l.cell,
  y: l.oy - b * l.cell,
});

export const LatticeGrid: React.FC<{
  readonly l: Lattice;
  readonly opacity?: number;
  readonly labels?: [string, string];
  readonly dot?: (a: number, b: number) => string | undefined;
  readonly dotOpacity?: (a: number, b: number) => number;
}> = ({ l, opacity = 1, labels = ["a", "b"], dot, dotOpacity }) => {
  const lo = at(l, l.min, l.min);
  const hi = at(l, l.max, l.max);
  const pad = l.cell * 0.6;
  const range = Array.from({ length: l.max - l.min + 1 }, (_, k) => l.min + k);
  return (
    <g opacity={opacity}>
      {/* axes through (0, 0) */}
      <line
        x1={lo.x - pad}
        y1={l.oy}
        x2={hi.x + pad}
        y2={l.oy}
        stroke={alpha(colors.muted, 0.6)}
        strokeWidth={2.5}
      />
      <line
        x1={l.ox}
        y1={lo.y + pad}
        x2={l.ox}
        y2={hi.y - pad}
        stroke={alpha(colors.muted, 0.6)}
        strokeWidth={2.5}
      />
      <text
        x={hi.x + pad + 26}
        y={l.oy + 10}
        fill={colors.muted}
        fontSize={34}
        fontFamily={fonts.math}
      >
        {labels[0]}
      </text>
      <text
        x={l.ox}
        y={hi.y - pad - 18}
        fill={colors.muted}
        fontSize={34}
        textAnchor="middle"
        fontFamily={fonts.math}
      >
        {labels[1]}
      </text>
      {range.map((k) =>
        k === 0 ? null : (
          <g key={k}>
            <text
              x={at(l, k, 0).x}
              y={l.oy + 34}
              fill={alpha(colors.muted, 0.8)}
              fontSize={22}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              {k}
            </text>
            <text
              x={l.ox - 24}
              y={at(l, 0, k).y + 8}
              fill={alpha(colors.muted, 0.8)}
              fontSize={22}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              {k}
            </text>
          </g>
        ),
      )}
      {range.map((a) =>
        range.map((b) => {
          const p = at(l, a, b);
          const c = dot?.(a, b);
          return (
            <circle
              key={`${a},${b}`}
              cx={p.x}
              cy={p.y}
              r={c ? 9 : 5}
              fill={c ?? alpha(colors.muted, 0.45)}
              opacity={dotOpacity?.(a, b) ?? 1}
            />
          );
        }),
      )}
    </g>
  );
};
