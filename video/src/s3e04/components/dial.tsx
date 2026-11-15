import type React from "react";
import { alpha, colors } from "../../shared/theme";

// A little clock face whose hand points at angle `angle` (radians,
// counter-clockwise from 3 o'clock): one complex number on the unit circle.
export const Dial: React.FC<{
  cx: number;
  cy: number;
  r: number;
  angle: number;
  lit?: boolean;
  color?: string;
  opacity?: number;
}> = ({ cx, cy, r, angle, lit, color, opacity = 1 }) => {
  const c = color ?? (lit ? colors.primary : colors.highlight);
  return (
    <g opacity={opacity}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={alpha(c, lit ? 0.25 : 0.06)}
        stroke={alpha(c, 0.7)}
        strokeWidth={2.5}
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * 0.85 * Math.cos(angle)}
        y2={cy - r * 0.85 * Math.sin(angle)}
        stroke={c}
        strokeWidth={Math.max(2.5, r * 0.12)}
        strokeLinecap="round"
      />
    </g>
  );
};
