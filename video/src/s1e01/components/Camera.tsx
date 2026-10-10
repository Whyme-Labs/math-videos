import type React from "react";
import { AbsoluteFill } from "remotion";

// Moves the whole stage: `zoom` around the focus point (`x`, `y` in px from
// the stage centre). Scenes compute these per frame for push-ins and pans.
export const Camera: React.FC<{
  readonly zoom?: number;
  readonly x?: number;
  readonly y?: number;
  readonly children: React.ReactNode;
}> = ({ zoom = 1, x = 0, y = 0, children }) => (
  <AbsoluteFill
    style={{ scale: zoom, translate: `${-x * zoom}px ${-y * zoom}px` }}
  >
    {children}
  </AbsoluteFill>
);
