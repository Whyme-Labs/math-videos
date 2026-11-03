import type { Mat2 } from "../../shared/components/Plane";

// The SVD of a 2 × 2 matrix A = U Σ Vᵀ, with U and V written as angles
// (rotations; U picks up a reflection when det A < 0, kept as `flip`).
export const svd2 = (m: Mat2) => {
  const [a, b, c, d] = m;
  // AᵀA = [p q; q r]
  const p = a * a + c * c;
  const q = a * b + c * d;
  const r = b * b + d * d;
  const tv = 0.5 * Math.atan2(2 * q, p - r);
  const mean = (p + r) / 2;
  const rad = Math.hypot((p - r) / 2, q);
  const s1 = Math.sqrt(mean + rad);
  const s2 = Math.sqrt(Math.max(0, mean - rad));
  const v1 = { x: Math.cos(tv), y: Math.sin(tv) };
  const v2 = { x: -Math.sin(tv), y: Math.cos(tv) };
  const Av1 = { x: a * v1.x + b * v1.y, y: c * v1.x + d * v1.y };
  const Av2 = { x: a * v2.x + b * v2.y, y: c * v2.x + d * v2.y };
  return { s1, s2, v1, v2, Av1, Av2, tv };
};

export const fmt = (v: number) => v.toFixed(1).replace("-", "−");
