import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest } from "../../s1e11/components/hotel";

// The world of S1E14: Frege's study in Jena (desk, manuscript, letters) and
// the things that get collected into sets: cups, saucers, shoes, stars, and
// the bags (sets) that hold them.

export const DESK_Y = 640;

// a person: the hotel guest with an optional beard (Frege) or glasses (Gödel)
export const Person: React.FC<{
  readonly x: number;
  readonly y?: number;
  readonly color: string;
  readonly bob?: number;
  readonly facing?: 1 | -1;
  readonly size?: number;
  readonly beard?: boolean;
  readonly glasses?: boolean;
  readonly opacity?: number;
}> = ({
  x,
  y = 900,
  color,
  bob = 0,
  facing = 1,
  size = 1,
  beard = false,
  glasses = false,
  opacity = 1,
}) => {
  const lift = Math.abs(Math.sin(bob)) * 10;
  return (
    <g opacity={opacity}>
      <Guest x={x} y={y} color={color} bob={bob} facing={facing} size={size} />
      <g transform={`translate(${x} ${y - lift}) scale(${size})`}>
        {beard ? (
          <path
            d={`M -26 -108 Q -30 -62 ${4 * facing} -56 Q 34 -62 28 -108 Q 10 -94 0 -96 Q -12 -94 -26 -108 Z`}
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={3}
          />
        ) : null}
        {glasses ? (
          <g fill="none" stroke={colors.ink} strokeWidth={3}>
            <circle cx={10 * facing - 6} cy={-122} r={10} />
            <circle cx={10 * facing + 14} cy={-122} r={10} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

// the desk with legs, top surface at DESK_Y
export const Desk: React.FC<{ readonly x?: number; readonly w?: number }> = ({
  x = 360,
  w = 1200,
}) => (
  <g>
    <rect
      x={x}
      y={DESK_Y}
      width={w}
      height={40}
      rx={8}
      fill={colors.wood}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <rect
      x={x + 60}
      y={DESK_Y + 40}
      width={30}
      height={240}
      fill={colors.wood}
    />
    <rect
      x={x + w - 90}
      y={DESK_Y + 40}
      width={30}
      height={240}
      fill={colors.wood}
    />
  </g>
);

// a stack of manuscript sheets, `n` high, tilting by `tilt` degrees
export const Stack: React.FC<{
  readonly x: number;
  readonly n: number;
  readonly tilt?: number;
  readonly fall?: number;
}> = ({ x, n, tilt = 0, fall = 0 }) => (
  <g transform={`rotate(${tilt} ${x} ${DESK_Y})`}>
    {Array.from({ length: Math.floor(n) }).map((_, k) => {
      // the top sheets slide off as `fall` goes 0 → 1
      const top = Math.max(0, k - (n - 6));
      const slide = fall * top * 40;
      return (
        <rect
          key={k}
          x={x - 150 + ((k * 37) % 21) - 10 + slide}
          y={DESK_Y - 20 - k * 18 + fall * top * top * 6}
          width={300}
          height={18}
          rx={3}
          fill={k % 3 ? colors.paper : alpha(colors.paper, 0.85)}
          stroke={colors.ink}
          strokeWidth={2}
          transform={`rotate(${fall * top * 7} ${x} ${DESK_Y - k * 18})`}
        />
      );
    })}
  </g>
);

// an envelope (closed) or an open letter
export const Letter: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly rot?: number;
  readonly scale?: number;
  readonly open?: number;
}> = ({ x, y, rot = 0, scale = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect
      x={-110}
      y={-70}
      width={220}
      height={140}
      rx={8}
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={4}
    />
    <path
      d={`M -110 -70 L 0 ${10 - open * 150} L 110 -70`}
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={4}
    />
    <circle cx={0} cy={14} r={16} fill={colors.red} opacity={1 - open} />
    <rect
      x={60}
      y={-58}
      width={36}
      height={44}
      fill={alpha(colors.green, 0.8)}
      stroke={colors.ink}
      strokeWidth={2}
    />
  </g>
);

export const Cup: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
  readonly color?: string;
}> = ({ x, y, s = 1, color = colors.paper }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M -30 -60 L 30 -60 L 22 0 L -22 0 Z"
      fill={color}
      stroke={colors.ink}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M 28 -48 Q 50 -40 26 -18"
      fill="none"
      stroke={colors.ink}
      strokeWidth={5}
    />
  </g>
);

export const Saucer: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
}> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse
      cx={0}
      cy={4}
      rx={56}
      ry={14}
      fill={colors.primary}
      stroke={colors.ink}
      strokeWidth={4}
    />
  </g>
);

export const Shoe: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
}> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M -40 0 L -40 -40 L -10 -40 Q 0 -18 40 -14 Q 52 -10 50 0 Z"
      fill={colors.red}
      stroke={colors.ink}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  </g>
);

export const Star: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
}> = ({ x, y, s = 1 }) => {
  const pts = Array.from({ length: 10 })
    .map((_, k) => {
      const r = k % 2 ? 14 : 34;
      const a = (Math.PI / 5) * k - Math.PI / 2;
      return `${r * Math.cos(a)},${r * Math.sin(a) - 30}`;
    })
    .join(" ");
  return (
    <polygon
      points={pts}
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={colors.highlight}
      stroke={colors.ink}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  );
};

// a bag (a set): a sack with a tag; children are drawn inside it
export const Bag: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w?: number;
  readonly h?: number;
  readonly label?: string;
  readonly color?: string;
  readonly s?: number;
  readonly opacity?: number;
  readonly children?: React.ReactNode;
}> = ({
  x,
  y,
  w = 200,
  h = 160,
  label,
  color = colors.wood,
  s = 1,
  opacity = 1,
  children,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <path
      d={`M ${-w / 2} ${-h} Q ${-w / 2 - 20} 0 ${-w / 2 + 20} 0 L ${w / 2 - 20} 0 Q ${w / 2 + 20} 0 ${w / 2} ${-h} Q 0 ${-h + 24} ${-w / 2} ${-h} Z`}
      fill={alpha(color, 0.85)}
      stroke={colors.ink}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    <path
      d={`M ${-w / 2 + 10} ${-h + 4} Q 0 ${-h - 30} ${w / 2 - 10} ${-h + 4}`}
      fill="none"
      stroke={colors.ink}
      strokeWidth={5}
    />
    {children}
    {label !== undefined ? (
      <g transform={`translate(${w / 2 - 6} ${-h + 10}) rotate(14)`}>
        <rect
          x={0}
          y={0}
          width={Math.max(56, label.length * 22 + 24)}
          height={48}
          rx={8}
          fill={colors.paper}
          stroke={colors.ink}
          strokeWidth={3}
        />
        <text
          x={Math.max(56, label.length * 22 + 24) / 2}
          y={36}
          fill={colors.ink}
          fontSize={32}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {label}
        </text>
      </g>
    ) : null}
  </g>
);
