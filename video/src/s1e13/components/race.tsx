import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The race: a side-on track with a finish line. Runner n crosses at a time
// that bunches up (each a little quicker than the last), so infinitely many
// runners finish in finite time, and then one more can come after them all.

export const TRACK_Y = 760;
export const FINISH_X = 1320;

// a runner: round body, bib number, legs that swing while running
export const Runner: React.FC<{
  readonly x: number;
  readonly y?: number;
  readonly color: string;
  readonly bib?: string;
  readonly phase?: number; // running phase; undefined = standing
  readonly size?: number;
  readonly opacity?: number;
}> = ({ x, y = TRACK_Y, color, bib, phase, size = 1, opacity = 1 }) => {
  const run = phase !== undefined;
  const swing = run ? 26 * Math.sin(phase) : 0;
  const lift = run ? Math.abs(Math.sin(phase)) * 10 : 0;
  return (
    <g
      transform={`translate(${x} ${y - lift * size}) scale(${size})`}
      opacity={opacity}
    >
      <ellipse cx={0} cy={lift} rx={34} ry={8} fill={alpha(colors.bg, 0.5)} />
      <rect
        x={-8}
        y={-40}
        width={12}
        height={40}
        rx={5}
        fill={colors.ink}
        transform={`rotate(${swing} -2 -40)`}
      />
      <rect
        x={-4}
        y={-40}
        width={12}
        height={40}
        rx={5}
        fill={colors.ink}
        transform={`rotate(${-swing} 2 -40)`}
      />
      <rect
        x={-28}
        y={-112}
        width={56}
        height={76}
        rx={24}
        fill={color}
        stroke={colors.ink}
        strokeWidth={4}
        transform={run ? "rotate(8 0 -74)" : undefined}
      />
      <circle
        cx={run ? 8 : 0}
        cy={-138}
        r={28}
        fill={color}
        stroke={colors.ink}
        strokeWidth={4}
      />
      <circle cx={run ? 18 : 8} cy={-142} r={4.5} fill={colors.ink} />
      {bib !== undefined ? (
        <g transform={run ? "rotate(8 0 -74)" : undefined}>
          <rect
            x={-22}
            y={-98}
            width={44}
            height={34}
            rx={6}
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={2}
          />
          <text
            x={0}
            y={-72}
            fill={colors.ink}
            fontSize={bib.length > 2 ? 16 : 24}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {bib}
          </text>
        </g>
      ) : null}
    </g>
  );
};

// the stadium: stands, track lanes and the finish line
export const Track: React.FC<{ readonly opacity?: number }> = ({
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {/* stands with a crowd */}
    <rect
      x={-400}
      y={180}
      width={3800}
      height={360}
      fill={alpha(colors.ink, 0.55)}
    />
    {Array.from({ length: 220 }).map((_, k) => (
      <circle
        key={k}
        cx={-380 + (k % 55) * 70 + (Math.floor(k / 55) % 2) * 35}
        cy={230 + Math.floor(k / 55) * 80}
        r={20}
        fill={alpha(
          [
            colors.primary,
            colors.orange,
            colors.highlight,
            colors.green,
            colors.paper,
          ][k % 5],
          0.35,
        )}
      />
    ))}
    {/* the track */}
    <rect
      x={-400}
      y={TRACK_Y - 160}
      width={3800}
      height={320}
      fill={alpha(colors.red, 0.45)}
    />
    {[0, 1, 2, 3].map((k) => (
      <line
        key={k}
        x1={-400}
        y1={TRACK_Y - 160 + k * 106}
        x2={3400}
        y2={TRACK_Y - 160 + k * 106}
        stroke={alpha(colors.paper, 0.6)}
        strokeWidth={4}
      />
    ))}
    {/* finish line, chequered */}
    {Array.from({ length: 16 }).map((_, k) => (
      <rect
        key={`f${k}`}
        x={FINISH_X + (k % 2) * 20}
        y={TRACK_Y - 160 + k * 20}
        width={20}
        height={20}
        fill={k % 2 ? colors.paper : colors.ink}
      />
    ))}
    <rect
      x={FINISH_X - 6}
      y={TRACK_Y - 360}
      width={12}
      height={200}
      fill={colors.paper}
    />
    <rect
      x={FINISH_X + 34}
      y={TRACK_Y - 360}
      width={12}
      height={200}
      fill={colors.paper}
    />
    <rect
      x={FINISH_X - 30}
      y={TRACK_Y - 400}
      width={100}
      height={50}
      rx={8}
      fill={colors.primary}
    />
    <text
      x={FINISH_X + 20}
      y={TRACK_Y - 364}
      fill={colors.ink}
      fontSize={26}
      textAnchor="middle"
      fontWeight={800}
    >
      FINISH
    </text>
  </g>
);

// when runner n crosses: bunched up so all of them finish before `end`
export const crossAt = (start: number, span: number, n: number) =>
  start + span * (1 - 0.8 ** n);
