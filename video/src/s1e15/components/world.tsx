import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The world of S1E15: the rulebook of axioms, the proving machine that reads
// it and prints theorems, and the statement cards it prints (or can't).

// a box robot with an antenna and a printer slot; `work` makes it judder
export const Robot: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
  readonly work?: number;
  readonly eye?: string;
  readonly look?: number; // -1 … 1, where the eyes point
}> = ({ x, y, s = 1, work = 0, eye = colors.primary, look = 0 }) => (
  <g transform={`translate(${x + Math.sin(work) * 3} ${y}) scale(${s})`}>
    <line
      x1={0}
      y1={-250}
      x2={0}
      y2={-290}
      stroke={colors.ink}
      strokeWidth={6}
    />
    <circle cx={0} cy={-296} r={12} fill={colors.red} />
    <rect
      x={-90}
      y={-250}
      width={180}
      height={130}
      rx={24}
      fill={colors.violet}
      stroke={colors.ink}
      strokeWidth={6}
    />
    <circle cx={-36 + look * 10} cy={-186} r={18} fill={eye} />
    <circle cx={36 + look * 10} cy={-186} r={18} fill={eye} />
    <rect
      x={-110}
      y={-120}
      width={220}
      height={120}
      rx={16}
      fill={alpha(colors.violet, 0.85)}
      stroke={colors.ink}
      strokeWidth={6}
    />
    <rect x={-70} y={-80} width={140} height={14} rx={4} fill={colors.ink} />
    <rect x={-90} y={0} width={40} height={24} fill={colors.ink} />
    <rect x={50} y={0} width={40} height={24} fill={colors.ink} />
  </g>
);

// the rulebook: a closed book whose thickness grows with `pages`
export const Rulebook: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly pages?: number;
  readonly title?: string;
  readonly s?: number;
  readonly color?: string;
}> = ({ x, y, pages = 1, title, s = 1, color = colors.violet }) => {
  const t = 40 + pages * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect
        x={-110}
        y={-t}
        width={220}
        height={t}
        rx={6}
        fill={colors.paper}
        stroke={colors.ink}
        strokeWidth={4}
      />
      {Array.from({ length: Math.floor(pages) + 2 }).map((_, k) => (
        <line
          key={k}
          x1={-104}
          y1={-t + 8 + k * 14}
          x2={104}
          y2={-t + 8 + k * 14}
          stroke={alpha(colors.ink, 0.2)}
          strokeWidth={2}
        />
      ))}
      <rect
        x={-120}
        y={-t - 26}
        width={240}
        height={30}
        rx={6}
        fill={color}
        stroke={colors.ink}
        strokeWidth={4}
      />
      {title !== undefined ? (
        <text
          x={0}
          y={-t - 4}
          fill={colors.primary}
          fontSize={22}
          textAnchor="middle"
          fontFamily={fonts.title}
          fontWeight={800}
        >
          {title}
        </text>
      ) : null}
    </g>
  );
};

// a statement card
export const Card: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly text: string;
  readonly w?: number;
  readonly s?: number;
  readonly color?: string;
  readonly ink?: string;
  readonly rot?: number;
  readonly opacity?: number;
  readonly glow?: number;
}> = ({
  x,
  y,
  text,
  w = 300,
  s = 1,
  color = colors.paper,
  ink = colors.ink,
  rot = 0,
  opacity = 1,
  glow = 0,
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
    opacity={opacity}
  >
    {glow > 0 ? (
      <rect
        x={-w / 2 - 18}
        y={-58}
        width={w + 36}
        height={116}
        rx={22}
        fill={alpha(colors.highlight, 0.35 * glow)}
      />
    ) : null}
    <rect
      x={-w / 2}
      y={-40}
      width={w}
      height={80}
      rx={12}
      fill={color}
      stroke={colors.ink}
      strokeWidth={4}
    />
    <text
      x={0}
      y={12}
      fill={ink}
      fontSize={34}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={700}
    >
      {text}
    </text>
  </g>
);
