import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The data plot shared by the Naive and Normal scenes: t from 0 to 3, y
// from 0 to 5, the four points (0, 1), (1, 3), (2, 4), (3, 4).

export const PTS = [
  { t: 0, y: 1 },
  { t: 1, y: 3 },
  { t: 2, y: 4 },
  { t: 3, y: 4 },
];
export const PO = { x: 300, y: 740 };
export const PT = 170; // pixels per unit of t
export const PY = 105; // pixels per unit of y
export const ps = (t: number, y: number) => ({
  x: PO.x + t * PT,
  y: PO.y - y * PY,
});

export const Axes: React.FC<{ readonly opacity?: number }> = ({
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {[1, 2, 3, 4, 5].map((y) => (
      <g key={y}>
        <line
          x1={PO.x - 40}
          y1={ps(0, y).y}
          x2={ps(3.6, 0).x}
          y2={ps(0, y).y}
          stroke={alpha(colors.paper, 0.1)}
          strokeWidth={2}
        />
        <text
          x={PO.x - 56}
          y={ps(0, y).y + 12}
          fill={colors.muted}
          fontSize={34}
          textAnchor="end"
          fontFamily={fonts.mono}
        >
          {y}
        </text>
      </g>
    ))}
    {[1, 2, 3].map((t) => (
      <text
        key={t}
        x={ps(t, 0).x}
        y={PO.y + 50}
        fill={colors.muted}
        fontSize={34}
        textAnchor="middle"
        fontFamily={fonts.mono}
      >
        {t}
      </text>
    ))}
    <line
      x1={PO.x - 40}
      y1={PO.y}
      x2={ps(3.6, 0).x}
      y2={PO.y}
      stroke={alpha(colors.paper, 0.5)}
      strokeWidth={4}
    />
    <line
      x1={PO.x}
      y1={PO.y + 30}
      x2={PO.x}
      y2={ps(0, 5.4).y}
      stroke={alpha(colors.paper, 0.5)}
      strokeWidth={4}
    />
    <text
      x={ps(3.6, 0).x + 14}
      y={PO.y + 12}
      fill={colors.muted}
      fontSize={38}
      fontFamily={fonts.math}
      fontStyle="italic"
    >
      t
    </text>
  </g>
);

// Clip for anything drawn inside the plot (lines that would run off it).
export const PlotClip: React.FC = () => (
  <defs>
    <clipPath id="plotclip">
      <rect
        x={PO.x - 40}
        y={ps(0, 5.5).y}
        width={ps(3.6, 0).x - PO.x + 40}
        height={5.5 * PY + 30}
      />
    </clipPath>
  </defs>
);
