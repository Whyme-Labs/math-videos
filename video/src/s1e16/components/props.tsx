import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The three worlds of S1E16: a square tile with numbered corners, a clock
// face, and one face of a Rubik's cube.

export const CORNER_COLORS = [
  colors.highlight,
  colors.green,
  colors.orange,
  colors.primary,
];

// a square tile; `rot` in degrees, `flip` 0..1 squashes it through a mirror
// along the axis at `axis` degrees. `labels` shows the corner numbers.
export const Tile: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size?: number;
  readonly rot?: number;
  readonly flip?: number;
  readonly axis?: number;
  readonly labels?: boolean;
  readonly mark?: number; // corner index to ring (tracking a corner)
  readonly opacity?: number;
  readonly outline?: boolean; // draw the fixed outline under it
}> = ({
  x,
  y,
  size = 300,
  rot = 0,
  flip = 0,
  axis = 45,
  labels = true,
  mark,
  opacity = 1,
  outline = false,
}) => {
  const h = size / 2;
  const corners = [
    [-h, h],
    [h, h],
    [h, -h],
    [-h, -h],
  ]; // 1 bottom-left, then counterclockwise on screen
  const squash = Math.cos(Math.PI * flip);
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {outline ? (
        <rect
          x={-h - 10}
          y={-h - 10}
          width={size + 20}
          height={size + 20}
          rx={10}
          fill="none"
          stroke={alpha(colors.muted, 0.6)}
          strokeWidth={4}
          strokeDasharray="14 10"
        />
      ) : null}
      <g
        transform={`rotate(${-rot}) rotate(${-axis}) scale(1 ${squash}) rotate(${axis})`}
      >
        <rect
          x={-h}
          y={-h}
          width={size}
          height={size}
          rx={12}
          fill={squash < 0 ? alpha(colors.paper, 0.85) : colors.paper}
          stroke={colors.ink}
          strokeWidth={6}
        />
        {corners.map(([cx, cy], k) => (
          <g key={k}>
            <circle
              cx={cx * 0.72}
              cy={cy * 0.72}
              r={size * 0.08}
              fill={CORNER_COLORS[k]}
              stroke={colors.ink}
              strokeWidth={3}
            />
            {mark === k ? (
              <circle
                cx={cx * 0.72}
                cy={cy * 0.72}
                r={size * 0.14}
                fill="none"
                stroke={colors.red}
                strokeWidth={6}
              />
            ) : null}
            {labels ? (
              <text
                x={cx * 0.72}
                y={cy * 0.72 + size * 0.035}
                fill={colors.ink}
                fontSize={size * 0.1}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                transform={`scale(1 ${squash < 0 ? -1 : 1})`}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                {k + 1}
              </text>
            ) : null}
          </g>
        ))}
      </g>
    </g>
  );
};

// a clock face with `n` positions; the hand points at `pos` (may be fractional)
export const Clock: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly r?: number;
  readonly n?: number;
  readonly pos: number;
  readonly numbers?: boolean;
}> = ({ x, y, r = 150, n = 12, pos, numbers = true }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle
      cx={0}
      cy={0}
      r={r}
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={6}
    />
    {Array.from({ length: n }).map((_, k) => {
      const a = (k / n) * Math.PI * 2 - Math.PI / 2;
      return (
        <g key={k}>
          <line
            x1={Math.cos(a) * r * 0.86}
            y1={Math.sin(a) * r * 0.86}
            x2={Math.cos(a) * r * 0.96}
            y2={Math.sin(a) * r * 0.96}
            stroke={colors.ink}
            strokeWidth={4}
          />
          {numbers ? (
            <text
              x={Math.cos(a) * r * 0.7}
              y={Math.sin(a) * r * 0.7 + r * 0.07}
              fill={colors.ink}
              fontSize={r * 0.17}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {k === 0 ? n : k}
            </text>
          ) : null}
        </g>
      );
    })}
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={-r * 0.62}
      stroke={colors.red}
      strokeWidth={r * 0.07}
      strokeLinecap="round"
      transform={`rotate(${(pos / n) * 360})`}
    />
    <circle cx={0} cy={0} r={r * 0.07} fill={colors.ink} />
  </g>
);

const CUBE = [
  colors.red,
  colors.highlight,
  colors.green,
  colors.primary,
  colors.orange,
  colors.paper,
];

// one face of a Rubik's cube; `twist` slides the top row by that many cells
export const CubeFace: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
  readonly twist?: number;
}> = ({ x, y, s = 1, twist = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect
      x={-130}
      y={-130}
      width={260}
      height={260}
      rx={18}
      fill={colors.ink}
    />
    <clipPath id="cubeFaceClip">
      <rect x={-126} y={-126} width={252} height={252} rx={14} />
    </clipPath>
    <g clipPath="url(#cubeFaceClip)">
      {Array.from({ length: 9 }).map((_, k) => {
        const r = Math.floor(k / 3);
        const c = k % 3;
        const steps = r === 0 ? Math.floor(twist) : 0;
        const frac = r === 0 ? twist - Math.floor(twist) : 0;
        return (
          <g key={k}>
            {[0, -1].map((d) => (
              <rect
                key={d}
                x={-120 + (c + frac + d * 3) * 82}
                y={-120 + r * 82}
                width={76}
                height={76}
                rx={10}
                fill={CUBE[(r * 2 + c + steps + 6 * 100) % 6]}
                stroke={colors.ink}
                strokeWidth={3}
              />
            ))}
          </g>
        );
      })}
    </g>
  </g>
);
