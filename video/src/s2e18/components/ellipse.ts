// The episode's ellipse 5x² + 4xy + 2y² = 1: A = [5 2; 2 2], eigenvalues
// 6 and 1 along (2, 1)/√5 and (1, −2)/√5.
export const A = [5, 2, 2, 2] as const;
export const V1 = { x: 2 / Math.sqrt(5), y: 1 / Math.sqrt(5) };
export const V2 = { x: 1 / Math.sqrt(5), y: -2 / Math.sqrt(5) };
export const L1 = 6;
export const L2 = 1;
// a point of the ellipse at parameter t
export const onEllipse = (t: number) => {
  const a = Math.cos(t) / Math.sqrt(L1);
  const b = Math.sin(t) / Math.sqrt(L2);
  return { x: a * V1.x + b * V2.x, y: a * V1.y + b * V2.y };
};
export const ellipsePath = (
  scr: (x: number, y: number) => { x: number; y: number },
  t1 = Math.PI * 2,
) =>
  Array.from({ length: 97 }, (_, i) => {
    const p = onEllipse((t1 * i) / 96);
    const s = scr(p.x, p.y);
    return `${i ? "L" : "M"} ${s.x.toFixed(1)} ${s.y.toFixed(1)}`;
  }).join(" ");
