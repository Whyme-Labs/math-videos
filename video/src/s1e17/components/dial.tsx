import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The third toy: the four numbers 1, i, −1, −i on the unit circle, with a
// marker on the current one. Multiplying by i moves it a quarter turn.

const LABELS = ["1", "i", "−1", "−i"];

export const IDial: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly r?: number;
  readonly pos: number; // 0..4 (fractional while moving)
  readonly labels?: boolean;
}> = ({ x, y, r = 140, pos, labels = true }) => {
  const a = (pos * Math.PI) / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <line
        x1={-r - 30}
        y1={0}
        x2={r + 30}
        y2={0}
        stroke={alpha(colors.muted, 0.6)}
        strokeWidth={3}
      />
      <line
        x1={0}
        y1={-r - 30}
        x2={0}
        y2={r + 30}
        stroke={alpha(colors.muted, 0.6)}
        strokeWidth={3}
      />
      <circle
        cx={0}
        cy={0}
        r={r}
        fill="none"
        stroke={colors.primary}
        strokeWidth={5}
      />
      {LABELS.map((l, k) => {
        const b = (k * Math.PI) / 2;
        return (
          <g key={l}>
            <circle
              cx={r * Math.cos(b)}
              cy={-r * Math.sin(b)}
              r={10}
              fill={colors.primary}
            />
            {labels ? (
              <text
                x={(r + 46) * Math.cos(b)}
                y={-(r + 46) * Math.sin(b) + 14}
                fill={colors.text}
                fontSize={r * 0.26}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
              >
                {l}
              </text>
            ) : null}
          </g>
        );
      })}
      <circle
        cx={r * Math.cos(a)}
        cy={-r * Math.sin(a)}
        r={24}
        fill={colors.highlight}
        stroke={colors.ink}
        strokeWidth={4}
      />
    </g>
  );
};
