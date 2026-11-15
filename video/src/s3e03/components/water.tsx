import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A water molecule, its three vibrations, and the C₂ᵥ character table.

const HALF = (104.5 / 2) * (Math.PI / 180);

// mode: 0 = symmetric stretch, 1 = bend, 2 = asymmetric stretch;
// t is the phase in radians, amp the size of the motion.
export const Molecule: React.FC<{
  x: number;
  y: number;
  s?: number;
  mode?: number;
  t?: number;
  amp?: number;
  jiggle?: number;
  opacity?: number;
}> = ({
  x,
  y,
  s = 1,
  mode = -1,
  t = 0,
  amp = 0.18,
  jiggle = 0,
  opacity = 1,
}) => {
  const L = 120 * s;
  const w = Math.sin(t) * amp;
  // bond lengths and half-angle for each mode
  let l1 = L;
  let l2 = L;
  let a = HALF;
  if (mode === 0) {
    l1 = L * (1 + w);
    l2 = L * (1 + w);
  } else if (mode === 1) {
    a = HALF * (1 + 0.9 * w);
  } else if (mode === 2) {
    l1 = L * (1 + w);
    l2 = L * (1 - w);
  }
  const j = (k: number) => jiggle * Math.sin(t * (1.3 + k * 0.7) + k * 2);
  // the oxygen recoils a little so the centre of mass stays put
  const oy = y - 20 * s - (mode === 0 || mode === 1 ? 6 * s * w : 0) + j(1);
  const ox = x + (mode === 2 ? -8 * s * w : 0) + j(2);
  const h1 = [ox - l1 * Math.sin(a) + j(3), oy + l1 * Math.cos(a) + j(4)];
  const h2 = [ox + l2 * Math.sin(a) + j(5), oy + l2 * Math.cos(a) + j(6)];
  return (
    <g opacity={opacity}>
      {[h1, h2].map((h, i) => (
        <line
          key={i}
          x1={ox}
          y1={oy}
          x2={h[0]}
          y2={h[1]}
          stroke={alpha(colors.paper, 0.7)}
          strokeWidth={10 * s}
          strokeLinecap="round"
        />
      ))}
      <circle cx={ox} cy={oy} r={44 * s} fill={colors.red} />
      {[h1, h2].map((h, i) => (
        <circle key={i} cx={h[0]} cy={h[1]} r={28 * s} fill={colors.paper} />
      ))}
    </g>
  );
};

// rows A₁, A₂, B₁, B₂ over the operations E, C₂, σ (the molecule's own
// plane) and σ′
export const C2V = [
  [1, 1, 1, 1],
  [1, 1, -1, -1],
  [1, -1, 1, -1],
  [1, -1, -1, 1],
];

export const Table: React.FC<{
  x: number;
  y: number;
  ops: string[];
  rows: string[];
  cw?: number;
  rh?: number;
  size?: number;
  rowColor?: (i: number) => string | undefined;
  appear?: (i: number) => number;
  opacity?: number;
}> = ({
  x,
  y,
  ops,
  rows,
  cw = 130,
  rh = 70,
  size = 42,
  rowColor,
  appear,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {ops.map((o, j) => (
      <text
        key={o}
        x={x + cw * (j + 1.5)}
        y={y + size * 0.4}
        textAnchor="middle"
        fill={colors.muted}
        fontSize={size}
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {o}
      </text>
    ))}
    <line
      x1={x}
      y1={y + rh * 0.5}
      x2={x + cw * (ops.length + 1)}
      y2={y + rh * 0.5}
      stroke={alpha(colors.paper, 0.35)}
      strokeWidth={2}
    />
    {C2V.map((r, i) => (
      <g key={i} opacity={appear ? appear(i) : 1}>
        <text
          x={x + cw * 0.5}
          y={y + rh * (i + 1) + size * 0.4}
          textAnchor="middle"
          fill={rowColor?.(i) ?? colors.text}
          fontSize={size}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {rows[i]}
        </text>
        {r.map((v, j) => (
          <text
            key={j}
            x={x + cw * (j + 1.5)}
            y={y + rh * (i + 1) + size * 0.4}
            textAnchor="middle"
            fill={rowColor?.(i) ?? (v > 0 ? colors.primary : colors.orange)}
            fontSize={size}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {v > 0 ? "1" : "−1"}
          </text>
        ))}
      </g>
    ))}
  </g>
);
