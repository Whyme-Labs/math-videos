import { Easing, interpolate } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Opacity ramp that starts at `start` and lasts `duration` frames.
export const fadeIn = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing: ease });

export const fadeOut = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [1, 0], { ...clamp, easing: ease });

// Visible between two cue frames, with soft edges.
export const window = (frame: number, start: number, end: number, duration = 12) =>
  Math.min(fadeIn(frame, start, duration), fadeOut(frame, end - duration, duration));

// Eased 0 → 1 progress over a frame range.
export const progress = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing: ease });

// Slide up while fading in, as a CSS translate value.
export const riseIn = (frame: number, start: number, distance = 30, duration = 18) =>
  `0px ${interpolate(frame, [start, start + duration], [distance, 0], { ...clamp, easing: ease })}px`;
