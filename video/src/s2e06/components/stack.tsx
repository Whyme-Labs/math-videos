import type React from "react";
import { colors } from "../../shared/theme";

// A covector drawn as a stack of sheets: the level lines a·x + b·y = k for
// whole numbers k, in plane coordinates mapped to the screen by `scr`.
// The sheet through the origin (k = 0) is drawn a little heavier. Clip the
// result with a clipPath to keep it inside the stage.

export const Stack: React.FC<{
  readonly a: number;
  readonly b: number;
  readonly scr: (x: number, y: number) => { x: number; y: number };
  readonly range?: number;
  readonly color?: string;
  readonly width?: number;
  readonly opacity?: number;
}> = ({
  a,
  b,
  scr,
  range = 12,
  color = colors.orange,
  width = 6,
  opacity = 1,
}) => {
  const n2 = a * a + b * b;
  if (n2 < 1e-9) return null;
  const ks = Array.from({ length: 2 * range + 1 }, (_, i) => i - range);
  return (
    <g opacity={opacity}>
      {ks.map((k) => {
        const p0 = { x: (k * a) / n2, y: (k * b) / n2 };
        const d = { x: -b / Math.sqrt(n2), y: a / Math.sqrt(n2) };
        const p = scr(p0.x - 30 * d.x, p0.y - 30 * d.y);
        const q = scr(p0.x + 30 * d.x, p0.y + 30 * d.y);
        return (
          <line
            key={k}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={color}
            strokeWidth={k === 0 ? width * 1.6 : width}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};
