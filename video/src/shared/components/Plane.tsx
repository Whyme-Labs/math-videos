import type React from "react";
import { alpha, colors } from "../theme";

// A whole plane you can bend. Draws the integer grid lines of the plane
// pushed through `map` (any function of (x, y), linear or not), so a basis
// change, a shear or a rotation becomes one continuous motion of the whole
// grid instead of a swap between pictures. The axes are drawn heavier, and
// `basis` adds the images of e₁ and e₂ as thick lemon and pink strokes.
//
// `scr` takes plane coordinates to the screen. Clip the result with a
// clipPath when the grid should stay inside a stage.

export type Pt = { x: number; y: number };
export type Map2 = (x: number, y: number) => Pt;
export type Mat2 = readonly [number, number, number, number]; // [a b; c d]

export const linear =
  ([a, b, c, d]: Mat2): Map2 =>
  (x, y) => ({ x: a * x + b * y, y: c * x + d * y });

export const lerpMat = (m: Mat2, n: Mat2, t: number): Mat2 => [
  m[0] + (n[0] - m[0]) * t,
  m[1] + (n[1] - m[1]) * t,
  m[2] + (n[2] - m[2]) * t,
  m[3] + (n[3] - m[3]) * t,
];

export const IDENTITY: Mat2 = [1, 0, 0, 1];

export const Plane: React.FC<{
  readonly map: Map2;
  readonly scr: (x: number, y: number) => Pt;
  readonly range?: number;
  readonly step?: number;
  readonly color?: string;
  readonly opacity?: number;
  readonly basis?: boolean;
  readonly samples?: number;
}> = ({
  map,
  scr,
  range = 8,
  step = 1,
  color = colors.paper,
  opacity = 1,
  basis = false,
  samples = 2,
}) => {
  const n = Math.round(range / step);
  const path = (pts: Pt[]) =>
    pts
      .map((p, i) => {
        const s = scr(p.x, p.y);
        return `${i ? "L" : "M"} ${s.x.toFixed(1)} ${s.y.toFixed(1)}`;
      })
      .join(" ");
  const line = (fixed: number, vertical: boolean) =>
    path(
      Array.from({ length: samples + 1 }, (_, i) => {
        const t = -range + (2 * range * i) / samples;
        return vertical ? map(fixed, t) : map(t, fixed);
      }),
    );
  const o = scr(map(0, 0).x, map(0, 0).y);
  const e1 = map(1, 0);
  const e2 = map(0, 1);
  return (
    <g opacity={opacity}>
      {Array.from({ length: 2 * n + 1 }, (_, i) => {
        const k = (i - n) * step;
        const axis = Math.abs(k) < 1e-9;
        return (
          <g
            key={i}
            stroke={axis ? alpha(color, 0.55) : alpha(color, 0.16)}
            strokeWidth={axis ? 4 : 2}
            fill="none"
          >
            <path d={line(k, true)} />
            <path d={line(k, false)} />
          </g>
        );
      })}
      {basis ? (
        <g strokeWidth={10} strokeLinecap="round">
          <line
            x1={o.x}
            y1={o.y}
            x2={scr(e1.x, e1.y).x}
            y2={scr(e1.x, e1.y).y}
            stroke={colors.primary}
          />
          <line
            x1={o.x}
            y1={o.y}
            x2={scr(e2.x, e2.y).x}
            y2={scr(e2.x, e2.y).y}
            stroke={colors.highlight}
          />
        </g>
      ) : null}
    </g>
  );
};
