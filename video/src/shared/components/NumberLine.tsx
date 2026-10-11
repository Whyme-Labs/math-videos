import type React from "react";
import { colors, fonts } from "../theme";

export type Tick = {
  readonly value: number;
  readonly label?: string;
  readonly major?: boolean;
  readonly opacity?: number;
};
export type Point = {
  readonly value: number;
  readonly color: string;
  readonly r?: number;
  readonly label?: string;
  readonly hollow?: boolean;
  readonly opacity?: number;
  readonly dy?: number;
};

// A number line showing the window [lo, hi]. Zoom by animating lo/hi.
export const NumberLine: React.FC<{
  readonly width: number;
  readonly lo: number;
  readonly hi: number;
  readonly ticks?: Tick[];
  readonly points?: Point[];
  readonly lineOpacity?: number;
  readonly lineColor?: string;
  readonly labelSize?: number;
  readonly style?: React.CSSProperties;
}> = ({
  width,
  lo,
  hi,
  ticks = [],
  points = [],
  lineOpacity = 1,
  lineColor = colors.muted,
  labelSize = 30,
  style,
}) => {
  const height = 180;
  const y = 80;
  const x = (v: number) => ((v - lo) / (hi - lo)) * width;
  const inView = (v: number) =>
    v >= lo - (hi - lo) * 0.05 && v <= hi + (hi - lo) * 0.05;
  return (
    <svg
      width={width}
      height={height}
      style={{ overflow: "visible", ...style }}
    >
      <line
        x1={-40}
        y1={y}
        x2={width + 40}
        y2={y}
        stroke={lineColor}
        strokeWidth={4}
        opacity={lineOpacity}
      />
      {ticks
        .filter((t) => inView(t.value))
        .map((t) => (
          <g key={`t${t.value}`} opacity={t.opacity ?? 1}>
            <line
              x1={x(t.value)}
              y1={y - (t.major ? 18 : 10)}
              x2={x(t.value)}
              y2={y + (t.major ? 18 : 10)}
              stroke={colors.text}
              strokeWidth={t.major ? 3 : 2}
            />
            {t.label ? (
              <text
                x={x(t.value)}
                y={y + 56}
                fill={colors.text}
                fontSize={labelSize}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {t.label}
              </text>
            ) : null}
          </g>
        ))}
      {points
        .filter((p) => inView(p.value))
        .map((p, i) => (
          <g key={`p${i}`} opacity={p.opacity ?? 1}>
            <circle
              cx={x(p.value)}
              cy={y + (p.dy ?? 0)}
              r={p.r ?? 12}
              fill={p.hollow ? "none" : p.color}
              stroke={p.color}
              strokeWidth={p.hollow ? 4 : 0}
            />
            {p.label ? (
              <text
                x={x(p.value)}
                y={y - 34 + (p.dy ?? 0)}
                fill={p.color}
                fontSize={labelSize}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
    </svg>
  );
};
