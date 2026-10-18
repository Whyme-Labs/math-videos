import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The staircase of truncations 0.9, 0.99, 0.999, … drawn as bars rising
// towards a dashed line at 1. `zoom` magnifies the strip just below 1:
// at zoom Z the bottom of the chart is 1 − 1/Z, so every ×10 brings the
// next step into view and the picture looks the same again.

export const ST = { x0: 420, x1: 1500, top: 220, h: 500 } as const;
export const STEPS = 7;

const stepW = (ST.x1 - ST.x0) / STEPS;
// pixel y of the value 1 − gap at the given zoom (clamped to the chart)
export const yOfGap = (gap: number, zoom: number) =>
  ST.top + Math.min(1, gap * zoom) * ST.h;
export const stepX = (n: number) => ST.x0 + (n - 1) * stepW;
export const stepCenter = (n: number) => stepX(n) + stepW / 2;
export const nines = (n: number) => `0.${"9".repeat(n)}`;
const bottomLabel = (zoom: number) =>
  zoom <= 1 ? "0" : (1 - 1 / zoom).toFixed(Math.round(Math.log10(zoom)));

export const Stairs: React.FC<{
  readonly zoom: number;
  // 0..1 per step n = 1..STEPS: how far it has risen
  readonly rise: (n: number) => number;
  readonly fill?: (n: number) => string;
  readonly labels?: number;
  readonly opacity?: number;
}> = ({ zoom, rise, fill = () => colors.primary, labels = 4, opacity = 1 }) => {
  const base = ST.top + ST.h;
  return (
    <g opacity={opacity}>
      <line
        x1={ST.x0 - 40}
        y1={base}
        x2={ST.x1 + 40}
        y2={base}
        stroke={colors.muted}
        strokeWidth={3}
      />
      <line
        x1={ST.x0 - 40}
        y1={ST.top}
        x2={ST.x1 + 40}
        y2={ST.top}
        stroke={colors.highlight}
        strokeWidth={3}
        strokeDasharray="12 10"
      />
      <text
        x={ST.x0 - 60}
        y={ST.top + 12}
        fill={colors.highlight}
        fontSize={36}
        textAnchor="end"
        fontFamily={fonts.math}
      >
        1
      </text>
      <text
        x={ST.x0 - 60}
        y={base + 12}
        fill={colors.muted}
        fontSize={32}
        textAnchor="end"
        fontFamily={fonts.mono}
      >
        {bottomLabel(zoom)}
      </text>
      {Array.from({ length: STEPS }).map((_, k) => {
        const n = k + 1;
        const r = Math.max(0, rise(n));
        const y = yOfGap(10 ** -n, zoom);
        const top = base - (base - y) * Math.min(1, r);
        const visible = base - y > 6;
        return (
          <g key={n} opacity={r > 0 ? 1 : 0}>
            <rect
              x={stepX(n) + 6}
              y={top}
              width={stepW - 12}
              height={base - top}
              rx={8}
              fill={alpha(fill(n), 0.85)}
            />
            {n <= labels && visible ? (
              <text
                x={stepCenter(n)}
                y={top - 18}
                fill={colors.text}
                fontSize={n <= 3 ? 34 : 28}
                textAnchor="middle"
                fontFamily={fonts.mono}
                opacity={Math.min(1, r)}
              >
                {nines(n)}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};
