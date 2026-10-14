import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// Drawings shared by the S1E05 scenes: pies for fractions, number chips,
// and the 12-point clock that the blobs of "same remainder ÷ 12" become.

// A wedge from angle a0 to a1 (radians, 0 = up, clockwise).
export const wedge = (
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
) => {
  const p = (a: number) => `${cx + r * Math.sin(a)} ${cy - r * Math.cos(a)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${large} 1 ${p(a1)} Z`;
};

// A pie cut into `parts`, with `shaded` parts filled (`fill` 0…1 sweeps them in).
export const Pie: React.FC<{
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly parts: number;
  readonly shaded: number;
  readonly fill: number;
  readonly color?: string;
}> = ({ cx, cy, r, parts, shaded, fill, color = colors.primary }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={alpha(color, 0.05)}
      stroke={color}
      strokeWidth={3}
    />
    {fill > 0
      ? Array.from({ length: shaded }).map((_, k) => {
          const a0 = (k / parts) * 2 * Math.PI;
          const a1 = a0 + (fill * 2 * Math.PI) / parts;
          return (
            <path
              key={k}
              d={wedge(cx, cy, r, a0, a1)}
              fill={alpha(color, 0.7)}
            />
          );
        })
      : null}
    {Array.from({ length: parts }).map((_, k) => {
      const a = (k / parts) * 2 * Math.PI;
      return (
        <line
          key={k}
          x1={cx}
          y1={cy}
          x2={cx + r * Math.sin(a)}
          y2={cy - r * Math.cos(a)}
          stroke={color}
          strokeWidth={3}
        />
      );
    })}
  </g>
);

// A number in a small disc.
export const Chip: React.FC<{
  readonly cx: number;
  readonly cy: number;
  readonly label: string | number;
  readonly color?: string;
  readonly r?: number;
  readonly opacity?: number;
  readonly scale?: number;
}> = ({
  cx,
  cy,
  label,
  color = colors.primary,
  r = 26,
  opacity = 1,
  scale = 1,
}) => {
  const text = String(label);
  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle
        r={r}
        fill={alpha(color, 0.18)}
        stroke={color}
        strokeWidth={2.5}
      />
      <text
        y={r * 0.36}
        fill={colors.text}
        fontSize={text.length > 2 ? r * 0.72 : r}
        textAnchor="middle"
        fontFamily={fonts.mono}
      >
        {text}
      </text>
    </g>
  );
};

// Position k (0…11) on a clock of radius r, 0 at the top, clockwise.
export const clockPos = (k: number, cx: number, cy: number, r: number) => {
  const a = (k / 12) * 2 * Math.PI;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
};

// The quotient ℕ/~ for "same remainder ÷ 12": a ring with 12 points.
// `draw` (0…1) draws the ring, `points` (0…1) brings the points in,
// `lit` gives a colour to some points.
export const ClockFace: React.FC<{
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly draw?: number;
  readonly points?: number;
  readonly labels?: number;
  readonly lit?: Partial<Record<number, string>>;
  readonly dot?: number;
}> = ({ cx, cy, r, draw = 1, points = 1, labels = 1, lit = {}, dot = 14 }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={alpha(colors.muted, 0.6)}
      strokeWidth={3}
      pathLength={1}
      strokeDasharray="1 1"
      strokeDashoffset={1 - draw}
      transform={`rotate(-90 ${cx} ${cy})`}
    />
    {Array.from({ length: 12 }).map((_, k) => {
      const p = clockPos(k, cx, cy, r);
      const l = clockPos(k, cx, cy, r + dot + 26);
      const c = lit[k] ?? colors.primary;
      return (
        <g key={k}>
          <circle
            cx={p.x}
            cy={p.y}
            r={dot * Math.min(1, points)}
            fill={c}
            opacity={lit[k] ? 1 : 0.85}
          />
          <text
            x={l.x}
            y={l.y + dot * 0.6}
            fill={lit[k] ?? colors.muted}
            fontSize={dot * 1.9}
            textAnchor="middle"
            fontFamily={fonts.mono}
            opacity={labels}
          >
            {k}
          </text>
        </g>
      );
    })}
  </g>
);

// Deterministic scatter in a box, so every render puts the same thing in the same place.
export const scatter = (
  i: number,
  box: { x: number; y: number; w: number; h: number },
) => {
  const h = (n: number) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  return { x: box.x + h(i + 1) * box.w, y: box.y + h(i + 101) * box.h };
};
