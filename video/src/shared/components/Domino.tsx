import type React from "react";
import { alpha, colors, fonts } from "../theme";

// A domino standing on a table at y = `floor`, tipping over to the right
// around its bottom-right corner as `angle` goes from 0 to 90.
// `rise` (0..1) grows it up from the table; `ghost` draws a dashed outline.
export const DOMINO_W = 44;
export const DOMINO_H = 160;
const W = DOMINO_W;
const H = DOMINO_H;

export const Domino: React.FC<{
  readonly x: number;
  readonly floor: number;
  readonly label: string;
  readonly angle: number;
  readonly rise?: number;
  readonly ghost?: boolean;
}> = ({ x, floor, label, angle, rise = 1, ghost = false }) => (
  <g
    transform={`rotate(${angle} ${x + W / 2} ${floor}) translate(${x - W / 2} ${floor - H * rise}) scale(1 ${rise})`}
  >
    <rect
      width={W}
      height={H}
      rx={7}
      fill={ghost ? alpha(colors.muted, 0.08) : colors.primary}
      stroke={ghost ? colors.muted : alpha(colors.orange, 0.8)}
      strokeWidth={3}
      strokeDasharray={ghost ? "8 8" : undefined}
    />
    <text
      x={W / 2}
      y={44}
      fill={ghost ? colors.muted : colors.ink}
      fontSize={28}
      fontFamily={fonts.math}
      textAnchor="middle"
    >
      {label}
    </text>
  </g>
);
