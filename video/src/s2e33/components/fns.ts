// Shared curves for this episode.

// the standard smooth bump, centred at c with half-width w
export const bump = (x: number, c = 0, w = 1) => {
  const t = (x - c) / w;
  return Math.abs(t) < 1 ? Math.exp(1 - 1 / (1 - t * t)) : 0;
};

// a test function φ used across scenes: smooth, nonzero at 0
export const phi = (x: number) =>
  bump(x, 0.1, 1.3) * (0.75 + 0.25 * Math.cos(2.2 * x));

// a narrow spike of area 1 and width w
export const spike = (x: number, w: number) =>
  Math.exp(-((x / w) ** 2)) / (w * Math.sqrt(Math.PI));
