import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The complex plane: a grid, the two axes, and arrows from 0. A View says
// where 0 sits on screen and how many pixels one unit is; y goes up.

export type C = { readonly re: number; readonly im: number };
export type View = {
  readonly cx: number;
  readonly cy: number;
  readonly unit: number;
};

export const mul = (a: C, b: C): C => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
export const polar = (r: number, theta: number): C => ({
  re: r * Math.cos(theta),
  im: r * Math.sin(theta),
});
export const abs = (z: C) => Math.hypot(z.re, z.im);
export const px = (v: View, z: C) => ({
  x: v.cx + z.re * v.unit,
  y: v.cy - z.im * v.unit,
});

// Grid lines from −n to n, every line mapped through `map` (the identity by
// default), so a multiplication can turn and stretch the whole grid.
export const Grid: React.FC<{
  readonly view: View;
  readonly n: number;
  readonly map?: (z: C) => C;
  readonly opacity?: number;
  readonly axes?: boolean;
}> = ({ view, n, map = (z) => z, opacity = 1, axes = true }) => {
  const seg = (a: C, b: C, k: string, axis: boolean) => {
    const p = px(view, map(a));
    const q = px(view, map(b));
    return (
      <line
        key={k}
        x1={p.x}
        y1={p.y}
        x2={q.x}
        y2={q.y}
        stroke={axis ? colors.muted : alpha(colors.muted, 0.22)}
        strokeWidth={axis ? 3 : 1.5}
      />
    );
  };
  const lines = [];
  for (let k = -n; k <= n; k++) {
    if (k === 0 && !axes) continue;
    lines.push(seg({ re: k, im: -n }, { re: k, im: n }, `v${k}`, k === 0));
    lines.push(seg({ re: -n, im: k }, { re: n, im: k }, `h${k}`, k === 0));
  }
  return <g opacity={opacity}>{lines}</g>;
};

export const Arrow: React.FC<{
  readonly view: View;
  readonly z: C;
  readonly color: string;
  readonly width?: number;
  readonly label?: string;
  readonly labelOffset?: { x: number; y: number };
  readonly opacity?: number;
}> = ({
  view,
  z,
  color,
  width = 6,
  label,
  labelOffset = { x: 18, y: -18 },
  opacity = 1,
}) => {
  const o = px(view, { re: 0, im: 0 });
  const p = px(view, z);
  const len = Math.hypot(p.x - o.x, p.y - o.y);
  const ux = len > 0 ? (p.x - o.x) / len : 0;
  const uy = len > 0 ? (p.y - o.y) / len : 0;
  const head = Math.min(22, len * 0.4);
  const bx = p.x - ux * head;
  const by = p.y - uy * head;
  return (
    <g opacity={opacity}>
      <line
        x1={o.x}
        y1={o.y}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${p.x},${p.y} ${bx - uy * head * 0.55},${by + ux * head * 0.55} ${bx + uy * head * 0.55},${by - ux * head * 0.55}`}
        fill={color}
      />
      {label ? (
        <text
          x={p.x + labelOffset.x}
          y={p.y + labelOffset.y}
          fill={color}
          fontSize={38}
          fontFamily={fonts.math}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};
