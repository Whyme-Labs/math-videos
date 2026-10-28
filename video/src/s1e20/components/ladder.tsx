import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// A ladder of subgroups, top rung the whole group, bottom rung {e}. A
// climber climbs down `down` rungs (fractional while moving). The steps
// between rungs carry the root sign each one costs. A rung past `jamAt`
// is drawn broken, and the climber can't pass it.

export const Ladder: React.FC<{
  readonly x: number;
  readonly top: number;
  readonly bottom: number;
  readonly rungs: string[];
  readonly steps: string[];
  readonly down: number;
  readonly label?: string;
  readonly jamAt?: number;
  readonly ok?: number;
  readonly opacity?: number;
}> = ({
  x,
  top,
  bottom,
  rungs,
  steps,
  down,
  label,
  jamAt,
  ok = 0,
  opacity = 1,
}) => {
  const n = rungs.length;
  const yOf = (i: number) =>
    n === 1 ? top : top + ((bottom - top) * i) / (n - 1);
  const climberY = yOf(Math.min(n - 1, down)) - 34;
  return (
    <g opacity={opacity}>
      {[-90, 90].map((dx) => (
        <line
          key={dx}
          x1={x + dx}
          y1={top - 40}
          x2={x + dx}
          y2={bottom + 40}
          stroke={colors.wood}
          strokeWidth={12}
          strokeLinecap="round"
        />
      ))}
      {rungs.map((r, i) => {
        const broken = jamAt !== undefined && i > jamAt;
        return (
          <g key={i}>
            {broken ? (
              <path
                d={`M ${x - 90} ${yOf(i)} L ${x - 10} ${yOf(i) + 14} M ${x + 10} ${yOf(i) - 10} L ${x + 90} ${yOf(i)}`}
                stroke={colors.red}
                strokeWidth={10}
                strokeLinecap="round"
              />
            ) : (
              <line
                x1={x - 90}
                y1={yOf(i)}
                x2={x + 90}
                y2={yOf(i)}
                stroke={colors.wood}
                strokeWidth={10}
              />
            )}
            <text
              x={x - 120}
              y={yOf(i) + 14}
              fill={broken ? colors.red : colors.text}
              fontSize={40}
              textAnchor="end"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {r}
            </text>
          </g>
        );
      })}
      {steps.map((s, i) => (
        <text
          key={i}
          x={x + 120}
          y={(yOf(i) + yOf(i + 1)) / 2 + 14}
          fill={colors.primary}
          fontSize={42}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={down > i + 0.5 ? 1 : 0.25}
        >
          {s}
        </text>
      ))}
      {/* the climber */}
      <circle
        cx={x}
        cy={climberY}
        r={26}
        fill={colors.highlight}
        stroke={colors.ink}
        strokeWidth={4}
      />
      {label ? (
        <text
          x={x}
          y={top - 80}
          fill={colors.muted}
          fontSize={44}
          textAnchor="middle"
          fontWeight={800}
        >
          {label}
        </text>
      ) : null}
      <text
        x={x}
        y={bottom + 100}
        fill={colors.green}
        fontSize={70}
        textAnchor="middle"
        fontWeight={900}
        opacity={ok}
      >
        ✓
      </text>
      <rect
        x={x - 100}
        y={bottom - 6}
        width={200}
        height={12}
        fill={alpha(colors.green, 0.6 * ok)}
      />
    </g>
  );
};
