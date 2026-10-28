import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The tools of the game: a compass (two legs hinged at the top, needle at
// the centre, pencil on the circle) and an unmarked straightedge. Plus the
// two pieces the episode builds with: arcs drawn so far, and floors of the
// degree tower.

// a compass with its needle at (cx, cy), pencil at radius r and angle `deg`
// (degrees, counter-clockwise from the +x axis, screen y pointing down)
export const Compass: React.FC<{
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly deg: number;
  readonly opacity?: number;
}> = ({ cx, cy, r, deg, opacity = 1 }) => {
  const a = (deg * Math.PI) / 180;
  const px = cx + r * Math.cos(a);
  const py = cy - r * Math.sin(a);
  // the hinge sits above the midpoint, so the legs make a tall triangle
  const hx = (cx + px) / 2;
  const hy = Math.min(cy, py) - Math.max(120, r * 0.6);
  return (
    <g opacity={opacity}>
      <line
        x1={hx}
        y1={hy}
        x2={cx}
        y2={cy}
        stroke={colors.muted}
        strokeWidth={9}
        strokeLinecap="round"
      />
      <line
        x1={hx}
        y1={hy}
        x2={px}
        y2={py}
        stroke={colors.muted}
        strokeWidth={9}
        strokeLinecap="round"
      />
      <circle cx={px} cy={py} r={9} fill={colors.highlight} />
      <circle cx={cx} cy={cy} r={6} fill={colors.ink} />
      <circle
        cx={hx}
        cy={hy}
        r={14}
        fill={colors.primary}
        stroke={colors.ink}
        strokeWidth={3}
      />
    </g>
  );
};

// an arc of a circle centred (cx, cy), from angle a0 to a1 (degrees,
// counter-clockwise, screen y down), drawn as far as `t` (0..1)
export const arcPath = (
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  t = 1,
) => {
  const end = a0 + (a1 - a0) * t;
  const p = (d: number) => {
    const a = (d * Math.PI) / 180;
    return `${cx + r * Math.cos(a)} ${cy - r * Math.sin(a)}`;
  };
  const large = Math.abs(end - a0) > 180 ? 1 : 0;
  const sweep = end > a0 ? 0 : 1;
  return `M ${p(a0)} A ${r} ${r} 0 ${large} ${sweep} ${p(end)}`;
};

// an unmarked straightedge lying along the segment (x1, y1)–(x2, y2)
export const Straightedge: React.FC<{
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly opacity?: number;
}> = ({ x1, y1, x2, y2, opacity = 1 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g opacity={opacity} transform={`translate(${x1} ${y1}) rotate(${deg})`}>
      <rect
        x={-30}
        y={4}
        width={len + 60}
        height={34}
        rx={6}
        fill={alpha(colors.wood, 0.9)}
        stroke={colors.ink}
        strokeWidth={3}
      />
    </g>
  );
};

// one floor of the degree tower
export const Floor: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly label: string;
  readonly color?: string;
  readonly opacity?: number;
}> = ({ x, y, w, label, color = colors.violet, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect
      x={x - w / 2}
      y={y - 42}
      width={w}
      height={84}
      rx={14}
      fill={color}
      stroke={colors.primary}
      strokeWidth={4}
    />
    <text
      x={x}
      y={y + 18}
      fill={colors.text}
      fontSize={52}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);
