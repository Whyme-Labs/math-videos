// Shared curves for this episode.
export const square = (x: number) => {
  const t = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return t < Math.PI ? 1 : -1;
};
// partial Fourier sum of the square wave with odd harmonics up to N
export const squareSum = (x: number, N: number) => {
  let s = 0;
  for (let n = 1; n <= N; n += 2) s += ((4 / Math.PI) * Math.sin(n * x)) / n;
  return s;
};
// energy left over after projecting the square wave onto harmonics ≤ N
export const leftover = (N: number) => {
  let s = 0;
  for (let n = 1; n <= N; n += 2) s += 8 / (Math.PI * Math.PI * n * n);
  return 1 - s;
};
export const path = (
  f: (x: number) => number,
  x0: number,
  x1: number,
  X: (x: number) => number,
  Y: (y: number) => number,
  n = 400,
) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return `${i ? "L" : "M"} ${X(x)} ${Y(f(x))}`;
  }).join(" ");
