import type React from "react";
import { alpha, colors } from "../../shared/theme";

// Isometric drawing helpers for S2E11: a point of 3-space projected to the
// screen, and the box (parallelepiped) spanned by three edge vectors, with
// its three visible faces shaded.

export type V3 = readonly [number, number, number];

export const isoAt = (cx: number, cy: number, s: number) => (p: V3) => ({
  x: cx + (p[0] - p[1]) * 0.866 * s,
  y: cy - p[2] * s + (p[0] + p[1]) * 0.5 * s,
});

const add = (...vs: V3[]): V3 => [
  vs.reduce((t, v) => t + v[0], 0),
  vs.reduce((t, v) => t + v[1], 0),
  vs.reduce((t, v) => t + v[2], 0),
];

export const Box: React.FC<{
  readonly a: V3;
  readonly b: V3;
  readonly c: V3;
  readonly to: (p: V3) => { x: number; y: number };
  readonly color?: string;
  readonly flipped?: boolean;
}> = ({ a, b, c, to, color = colors.primary, flipped = false }) => {
  const o: V3 = [0, 0, 0];
  const faces: V3[][] = [
    [o, a, add(a, b), b],
    [o, b, add(b, c), c],
    [o, c, add(c, a), a],
    [c, add(c, a), add(a, b, c), add(b, c)],
    [a, add(a, b), add(a, b, c), add(a, c)],
    [b, add(b, c), add(a, b, c), add(a, b)],
  ];
  const fill = flipped ? colors.red : color;
  return (
    <g>
      {faces.map((f, k) => (
        <polygon
          key={k}
          points={f.map((p) => `${to(p).x},${to(p).y}`).join(" ")}
          fill={alpha(fill, k < 3 ? 0.08 : 0.2)}
          stroke={fill}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
};
