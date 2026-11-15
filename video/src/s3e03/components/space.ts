// A little 3D toolkit for ℝ³ pictures: rotations and an orthographic camera.

export type V3 = [number, number, number];

// rotation of p about the unit axis n by angle a (Rodrigues)
export const rotate = (p: V3, n: V3, a: number): V3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const d = n[0] * p[0] + n[1] * p[1] + n[2] * p[2];
  const x = [
    n[1] * p[2] - n[2] * p[1],
    n[2] * p[0] - n[0] * p[2],
    n[0] * p[1] - n[1] * p[0],
  ];
  return [0, 1, 2].map((i) => p[i] * c + x[i] * s + n[i] * d * (1 - c)) as V3;
};

export const DIAG: V3 = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];

// orthographic camera: turn by yaw about z, tip by pitch, z up on screen
export const camera =
  (cx: number, cy: number, S: number, yaw = -1.3, pitch = 0.7) =>
  (p: V3): [number, number] => {
    const x1 = p[0] * Math.cos(yaw) - p[1] * Math.sin(yaw);
    const y1 = p[0] * Math.sin(yaw) + p[1] * Math.cos(yaw);
    const z2 = y1 * Math.sin(pitch) + p[2] * Math.cos(pitch);
    return [cx + S * x1, cy - S * z2];
  };

// points of the circle of radius r in the plane through 0 perpendicular to
// the diagonal (1, 1, 1)
export const diagPlane = (r: number, n = 48): V3[] => {
  const u: V3 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
  const w: V3 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
  return Array.from({ length: n + 1 }, (_, k) => {
    const a = (2 * Math.PI * k) / n;
    return [0, 1, 2].map(
      (i) => r * (Math.cos(a) * u[i] + Math.sin(a) * w[i]),
    ) as V3;
  });
};

// polyline path through projected points
export const path3 = (
  pts: V3[],
  P: (p: V3) => [number, number],
  close = false,
) =>
  pts
    .map((p, i) => {
      const [x, y] = P(p);
      return `${i ? "L" : "M"} ${x} ${y}`;
    })
    .join(" ") + (close ? " Z" : "");
