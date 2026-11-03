import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A row of boxes holding numbers. `values[i]` sits in box i; `offset`
// (in boxes, fractional while sliding) moves the numbers along the row;
// `n` boxes are drawn, the last ones fading if `fade` so the row reads
// as going on forever.

export const BOX = 96;

export const Boxes: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly n: number;
  readonly values: readonly (number | string)[];
  readonly offset?: number;
  readonly fade?: boolean;
  readonly hot?: number;
  readonly color?: string;
  readonly opacity?: number;
}> = ({
  x,
  y,
  n,
  values,
  offset = 0,
  fade = true,
  hot = -1,
  color = colors.text,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {Array.from({ length: n }).map((_, i) => {
      const o = fade ? Math.max(0, Math.min(1, (n - i) / 4)) : 1;
      return (
        <rect
          key={i}
          x={x + i * BOX}
          y={y}
          width={BOX - 8}
          height={BOX - 8}
          rx={10}
          fill={i === hot ? alpha(colors.red, 0.25) : alpha(colors.paper, 0.06)}
          stroke={i === hot ? colors.red : alpha(colors.paper, 0.5)}
          strokeWidth={4}
          opacity={o}
        />
      );
    })}
    {values.map((v, i) => {
      const pos = i + offset;
      if (pos < -0.6 || pos > n - 0.4) return null;
      const o = fade ? Math.max(0, Math.min(1, (n - pos) / 4)) : 1;
      return (
        <text
          key={i}
          x={x + pos * BOX + (BOX - 8) / 2}
          y={y + BOX / 2 + 12}
          fill={color}
          fontSize={40}
          fontFamily={fonts.mono}
          fontWeight={800}
          textAnchor="middle"
          opacity={o}
        >
          {v}
        </text>
      );
    })}
  </g>
);
