import { rnd } from "./draw";

// The stirred cup. Cream drops in polar coordinates (r from 0 to 1 of the
// cup's radius) turned by a twist: a drop at radius r goes round at speed
// ω(r), faster near the middle. The twist keeps every area, and spreads a
// blob of cream into thinner and thinner filaments round the cup.

export const omega = (r: number) => 2.6 * (1 - r) + 0.3;

export type Drop = { r: number; a: number };

// a blob of cream: N drops around radius 0.5, angle 0
export const blob = (n: number): Drop[] =>
  Array.from({ length: n }, (_, i) => {
    const rr = 0.12 * Math.sqrt(rnd(2 * i + 1));
    const t = 2 * Math.PI * rnd(2 * i + 2);
    const x = 0.5 + rr * Math.cos(t);
    const y = rr * Math.sin(t);
    return { r: Math.hypot(x, y), a: Math.atan2(y, x) };
  });

export const stir = (d: Drop, t: number): Drop => ({
  r: d.r,
  a: d.a + omega(d.r) * t,
});

export const toXY = (d: Drop, cx: number, cy: number, R: number) =>
  [cx + R * d.r * Math.cos(d.a), cy - R * d.r * Math.sin(d.a)] as const;
