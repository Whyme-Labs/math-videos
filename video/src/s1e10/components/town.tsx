import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";
import { px, type C, type View } from "./plane";

// A small town drawn on the complex plane, so that multiplying by a number
// visibly moves real things: the two axes are roads, and houses, trees and a
// pond sit on the grid. Every point goes through `map`, so a rotation turns
// the whole town, roofs and all.

const HOUSES: { c: C; tint: string }[] = [
  { c: { re: 2, im: 1 }, tint: colors.primary },
  { c: { re: -2, im: 2 }, tint: colors.orange },
  { c: { re: 1.2, im: -2 }, tint: colors.highlight },
  { c: { re: -2.6, im: -1.4 }, tint: colors.green },
  { c: { re: 3.2, im: 2.6 }, tint: colors.paper },
];
const TREES: C[] = [
  { re: 0.8, im: 2.4 },
  { re: -1, im: 3 },
  { re: 3.3, im: -0.9 },
  { re: -3.2, im: 0.6 },
  { re: 2.4, im: -2.9 },
  { re: -0.9, im: -2.7 },
  { re: -3.4, im: 2.9 },
];

export const HOME = HOUSES[0].c;

const poly = (view: View, map: (z: C) => C, pts: C[]) =>
  pts
    .map((z) => px(view, map(z)))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

export const Town: React.FC<{
  readonly view: View;
  readonly map?: (z: C) => C;
  readonly scale?: number; // how much `map` stretches lengths
  readonly opacity?: number;
  readonly highlight?: number; // index of a house to ring
}> = ({ view, map = (z) => z, scale = 1, opacity = 1, highlight }) => {
  const n = 4;
  const lines = [];
  for (let k = -n; k <= n; k++) {
    if (k === 0) continue;
    for (const [a, b] of [
      [
        { re: k, im: -n },
        { re: k, im: n },
      ],
      [
        { re: -n, im: k },
        { re: n, im: k },
      ],
    ] as C[][]) {
      const p = px(view, map(a));
      const q = px(view, map(b));
      lines.push(
        <line
          key={`${k}-${a.re}-${a.im}`}
          x1={p.x}
          y1={p.y}
          x2={q.x}
          y2={q.y}
          stroke={alpha(colors.muted, 0.16)}
          strokeWidth={2}
        />,
      );
    }
  }
  const road = (a: C, b: C, key: string) => {
    const p = px(view, map(a));
    const q = px(view, map(b));
    return (
      <g key={key}>
        <line
          x1={p.x}
          y1={p.y}
          x2={q.x}
          y2={q.y}
          stroke={alpha(colors.ink, 0.95)}
          strokeWidth={34 * scale}
          strokeLinecap="round"
        />
        <line
          x1={p.x}
          y1={p.y}
          x2={q.x}
          y2={q.y}
          stroke={alpha(colors.paper, 0.55)}
          strokeWidth={3}
          strokeDasharray="18 16"
        />
      </g>
    );
  };
  const pond = Array.from({ length: 24 }).map((_, k) => {
    const a = (k / 24) * 2 * Math.PI;
    return { re: -1.7 + 0.8 * Math.cos(a), im: 0.9 + 0.5 * Math.sin(a) };
  });
  return (
    <g opacity={opacity}>
      {lines}
      <polygon
        points={poly(view, map, pond)}
        fill={alpha(colors.violet, 0.8)}
        stroke={alpha(colors.highlight, 0.5)}
        strokeWidth={3}
      />
      {road({ re: -n - 0.5, im: 0 }, { re: n + 0.5, im: 0 }, "ew")}
      {road({ re: 0, im: -n - 0.5 }, { re: 0, im: n + 0.5 }, "ns")}
      {TREES.map((t, k) => {
        const p = px(view, map(t));
        return (
          <g key={`t${k}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={26 * scale}
              fill={alpha(colors.green, 0.8)}
            />
            <circle
              cx={p.x - 6 * scale}
              cy={p.y - 6 * scale}
              r={10 * scale}
              fill={alpha(colors.paper, 0.25)}
            />
          </g>
        );
      })}
      {HOUSES.map((h, k) => {
        const s = 0.32;
        const body: C[] = [
          { re: h.c.re - s, im: h.c.im - s },
          { re: h.c.re + s, im: h.c.im - s },
          { re: h.c.re + s, im: h.c.im + s * 0.6 },
          { re: h.c.re - s, im: h.c.im + s * 0.6 },
        ];
        const roof: C[] = [
          { re: h.c.re - s * 1.3, im: h.c.im + s * 0.6 },
          { re: h.c.re + s * 1.3, im: h.c.im + s * 0.6 },
          { re: h.c.re, im: h.c.im + s * 1.6 },
        ];
        const door: C[] = [
          { re: h.c.re - s * 0.25, im: h.c.im - s },
          { re: h.c.re + s * 0.25, im: h.c.im - s },
          { re: h.c.re + s * 0.25, im: h.c.im - s * 0.2 },
          { re: h.c.re - s * 0.25, im: h.c.im - s * 0.2 },
        ];
        const c = px(view, map(h.c));
        return (
          <g key={`h${k}`}>
            {highlight === k ? (
              <circle
                cx={c.x}
                cy={c.y}
                r={62 * scale}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={5}
                strokeDasharray="10 8"
              />
            ) : null}
            <polygon
              points={poly(view, map, body)}
              fill={h.tint}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <polygon
              points={poly(view, map, roof)}
              fill={colors.red}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <polygon points={poly(view, map, door)} fill={colors.ink} />
          </g>
        );
      })}
      {/* 0 is where the roads cross */}
      {(() => {
        const o = px(view, map({ re: 0, im: 0 }));
        return (
          <text
            x={o.x + 26}
            y={o.y + 44}
            fill={colors.paper}
            fontSize={34}
            fontFamily={fonts.math}
          >
            0
          </text>
        );
      })()}
    </g>
  );
};

// A little walker: a round body that leans in the direction it moves.
export const Walker: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly dir?: number; // radians, screen space
  readonly bob?: number;
  readonly color?: string;
  readonly size?: number;
}> = ({ x, y, dir = 0, bob = 0, color = colors.primary, size = 1 }) => (
  <g
    transform={`translate(${x} ${y - 30 * size - Math.abs(Math.sin(bob)) * 8 * size}) scale(${size})`}
  >
    <ellipse cx={0} cy={36} rx={20} ry={6} fill={alpha(colors.bg, 0.6)} />
    <circle
      cx={0}
      cy={0}
      r={26}
      fill={color}
      stroke={colors.ink}
      strokeWidth={4}
    />
    <circle
      cx={8 * Math.cos(dir) - 6}
      cy={-6 + 8 * Math.sin(dir)}
      r={4.5}
      fill={colors.ink}
    />
    <circle
      cx={8 * Math.cos(dir) + 6}
      cy={-6 + 8 * Math.sin(dir)}
      r={4.5}
      fill={colors.ink}
    />
  </g>
);
