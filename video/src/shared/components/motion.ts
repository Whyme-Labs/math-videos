import { interpolate, spring } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Springy 0 → 1 (with a little overshoot) starting at `start`.
export const springIn = (
  frame: number,
  start: number,
  fps: number,
  damping = 12,
  stiffness = 170,
) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping, stiffness, mass: 0.7 },
  });

// Same, but settles without overshoot (for positions that must not wobble past a target).
export const glide = (
  frame: number,
  start: number,
  fps: number,
  durationInFrames = 20,
) =>
  spring({
    frame: frame - start,
    fps,
    durationInFrames,
    config: { damping: 200 },
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Progress through [start, start + duration], clamped to 0..1, linear.
export const ramp = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], clamp);

// Typewriter: the visible prefix of `text`.
export const typed = (
  text: string,
  frame: number,
  start: number,
  fps: number,
  charsPerSecond = 28,
) =>
  text.slice(
    0,
    Math.max(0, Math.floor(((frame - start) / fps) * charsPerSecond)),
  );

// Point along a hop from (x0, y0) to (x1, y1) with a parabolic arc of `height`.
export const hop = (
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  height: number,
) => ({
  x: lerp(x0, x1, t),
  y: lerp(y0, y1, t) - 4 * height * t * (1 - t),
});

// Horizontal shake that dies out: "no, that doesn't work".
export const shake = (frame: number, start: number, amplitude = 14) => {
  const t = frame - start;
  if (t < 0 || t > 18) return 0;
  return amplitude * Math.sin(t * 1.9) * Math.exp(-t / 6);
};
