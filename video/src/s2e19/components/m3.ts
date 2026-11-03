import type { V3 } from "../../shared/components/three3d";

// 3 × 3 matrices as row-major arrays, and rotations about an axis.
export type M3 = readonly number[];
export const I3: M3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export const mul3 = (a: M3, b: M3): M3 =>
  [0, 1, 2].flatMap((i) =>
    [0, 1, 2].map(
      (j) =>
        a[3 * i] * b[j] + a[3 * i + 1] * b[3 + j] + a[3 * i + 2] * b[6 + j],
    ),
  );
export const ap3 = (m: M3, p: V3): V3 => [
  m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
  m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
  m[6] * p[0] + m[7] * p[1] + m[8] * p[2],
];
export const rot3 = (axis: V3, a: number): M3 => {
  const n = Math.hypot(...axis);
  const [x, y, z] = axis.map((v) => v / n);
  const c = Math.cos(a);
  const s = Math.sin(a);
  const t = 1 - c;
  return [
    t * x * x + c,
    t * x * y - s * z,
    t * x * z + s * y,
    t * x * y + s * z,
    t * y * y + c,
    t * y * z - s * x,
    t * x * z - s * y,
    t * y * z + s * x,
    t * z * z + c,
  ];
};
export const diag3 = (a: number, b: number, c: number): M3 => [
  a,
  0,
  0,
  0,
  b,
  0,
  0,
  0,
  c,
];
