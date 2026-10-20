import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The hotel, seen from the side: one long corridor of numbered doors that
// goes on forever to the right. Scenes put it inside a Camera and travel
// along it. Guests are small round characters that walk, wait and carry
// suitcases.

export const FLOOR_Y = 820;
export const DOOR_W = 150;
export const DOOR_H = 270;
export const SPACING = 230;
export const X0 = 260;
export const doorX = (n: number) => X0 + n * SPACING;
export const doorCenter = (n: number) => doorX(n) + DOOR_W / 2;

export const GUEST_COLORS = [
  colors.primary,
  colors.orange,
  colors.highlight,
  colors.green,
  colors.paper,
  colors.red,
];
export const guestColor = (n: number) =>
  GUEST_COLORS[
    ((n % GUEST_COLORS.length) + GUEST_COLORS.length) % GUEST_COLORS.length
  ];

// The corridor from room `from` to room `to` (inclusive). `open(n)` is how
// far door n stands open (0..1); `lit(n)` how bright its transom is (0..1);
// `plate(n)` overrides the number on the door.
export const Corridor: React.FC<{
  readonly from: number;
  readonly to: number;
  readonly open?: (n: number) => number;
  readonly lit?: (n: number) => number;
  readonly mark?: (n: number) => string | undefined;
  readonly plate?: (n: number) => string;
}> = ({
  from,
  to,
  open = () => 0,
  lit = () => 1,
  mark = () => undefined,
  plate = (n) => String(n),
}) => {
  const left = doorX(from) - SPACING;
  const right = doorX(to) + SPACING * 2;
  const doors = [];
  for (let n = Math.max(0, from); n <= to; n++) {
    const x = doorX(n);
    const o = open(n);
    const l = lit(n);
    const m = mark(n);
    doors.push(
      <g key={n}>
        {/* the wall lamp to the left of the door */}
        <circle
          cx={x - 40}
          cy={FLOOR_Y - DOOR_H - 40}
          r={60}
          fill={alpha(colors.primary, 0.08)}
        />
        <rect
          x={x - 48}
          y={FLOOR_Y - DOOR_H - 50}
          width={16}
          height={22}
          rx={6}
          fill={alpha(colors.primary, 0.85)}
        />
        {/* transom light above the door: the room is occupied */}
        <rect
          x={x + 10}
          y={FLOOR_Y - DOOR_H - 34}
          width={DOOR_W - 20}
          height={22}
          rx={6}
          fill={alpha(colors.primary, 0.15 + 0.75 * l)}
        />
        {/* the doorway, dark inside */}
        <rect
          x={x}
          y={FLOOR_Y - DOOR_H}
          width={DOOR_W}
          height={DOOR_H}
          rx={8}
          fill={colors.ink}
        />
        {/* the door, hinged on the left */}
        <g transform={`translate(${x} 0) scale(${1 - 0.82 * o} 1)`}>
          <rect
            x={0}
            y={FLOOR_Y - DOOR_H}
            width={DOOR_W}
            height={DOOR_H}
            rx={8}
            fill={colors.wood}
            stroke={alpha(colors.ink, 0.8)}
            strokeWidth={4}
          />
          <rect
            x={18}
            y={FLOOR_Y - DOOR_H + 24}
            width={DOOR_W - 36}
            height={90}
            rx={6}
            fill="none"
            stroke={alpha(colors.ink, 0.35)}
            strokeWidth={3}
          />
          <rect
            x={18}
            y={FLOOR_Y - DOOR_H + 134}
            width={DOOR_W - 36}
            height={110}
            rx={6}
            fill="none"
            stroke={alpha(colors.ink, 0.35)}
            strokeWidth={3}
          />
          <circle
            cx={DOOR_W - 22}
            cy={FLOOR_Y - DOOR_H / 2}
            r={9}
            fill={colors.primary}
          />
        </g>
        {/* the number plate */}
        <rect
          x={x + DOOR_W / 2 - 44}
          y={FLOOR_Y - DOOR_H - 92}
          width={88}
          height={48}
          rx={10}
          fill={colors.paper}
        />
        <text
          x={x + DOOR_W / 2}
          y={FLOOR_Y - DOOR_H - 56}
          fill={colors.ink}
          fontSize={34}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={700}
        >
          {plate(n)}
        </text>
        {m ? (
          <text
            x={x + DOOR_W / 2}
            y={FLOOR_Y - DOOR_H / 2 + 14}
            fill={colors.green}
            fontSize={36}
            textAnchor="middle"
            fontWeight={700}
          >
            {m}
          </text>
        ) : null}
      </g>,
    );
  }
  return (
    <g>
      {/* wall, wainscot and carpet */}
      <rect
        x={left}
        y={-1500}
        width={right - left}
        height={FLOOR_Y + 1500}
        fill={alpha(colors.violet, 0.28)}
      />
      <rect
        x={left}
        y={FLOOR_Y - 120}
        width={right - left}
        height={120}
        fill={alpha(colors.ink, 0.35)}
      />
      <rect
        x={left}
        y={FLOOR_Y}
        width={right - left}
        height={1500}
        fill={alpha(colors.red, 0.35)}
      />
      <rect
        x={left}
        y={FLOOR_Y + 36}
        width={right - left}
        height={10}
        fill={alpha(colors.primary, 0.35)}
      />
      {doors}
    </g>
  );
};

// A guest: a round body with eyes looking the way they walk. `bob` is a
// phase for the walking bounce (0 = standing still).
export const Guest: React.FC<{
  readonly x: number;
  readonly y?: number;
  readonly color: string;
  readonly bob?: number;
  readonly facing?: 1 | -1;
  readonly suitcase?: boolean;
  readonly size?: number;
  readonly label?: string;
  readonly opacity?: number;
}> = ({
  x,
  y = FLOOR_Y,
  color,
  bob = 0,
  facing = 1,
  suitcase = false,
  size = 1,
  label,
  opacity = 1,
}) => {
  const lift = Math.abs(Math.sin(bob)) * 10;
  return (
    <g
      transform={`translate(${x} ${y - lift}) scale(${size})`}
      opacity={opacity}
    >
      <ellipse
        cx={0}
        cy={lift / size}
        rx={34}
        ry={8}
        fill={alpha(colors.bg, 0.55)}
      />
      <rect
        x={-26}
        y={-92}
        width={52}
        height={70}
        rx={24}
        fill={color}
        stroke={colors.ink}
        strokeWidth={4}
      />
      <rect
        x={-16}
        y={-26}
        width={10}
        height={26}
        rx={4}
        fill={colors.ink}
        transform={`rotate(${12 * Math.sin(bob)} -11 -26)`}
      />
      <rect
        x={6}
        y={-26}
        width={10}
        height={26}
        rx={4}
        fill={colors.ink}
        transform={`rotate(${-12 * Math.sin(bob)} 11 -26)`}
      />
      <circle
        cx={0}
        cy={-118}
        r={30}
        fill={color}
        stroke={colors.ink}
        strokeWidth={4}
      />
      <circle cx={10 * facing - 6} cy={-122} r={5} fill={colors.ink} />
      <circle cx={10 * facing + 8} cy={-122} r={5} fill={colors.ink} />
      {suitcase ? (
        <g transform={`translate(${30 * facing} -54)`}>
          <rect
            x={-4}
            y={-10}
            width={8}
            height={12}
            rx={3}
            fill="none"
            stroke={colors.ink}
            strokeWidth={4}
          />
          <rect
            x={-22}
            y={0}
            width={44}
            height={36}
            rx={6}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={4}
          />
        </g>
      ) : null}
      {label !== undefined ? (
        <text
          x={0}
          y={-160}
          fill={colors.text}
          fontSize={30}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={700}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

// Rain over the whole frame, deterministic per frame.
export const Rain: React.FC<{
  readonly frame: number;
  readonly opacity?: number;
}> = ({ frame, opacity = 1 }) => (
  <g opacity={opacity}>
    {Array.from({ length: 90 }).map((_, k) => {
      const x = ((k * 97.3 + frame * 3) % 2000) - 40;
      const y = ((k * 211.7 + frame * 38) % 1200) - 100;
      return (
        <line
          key={k}
          x1={x}
          y1={y}
          x2={x - 10}
          y2={y + 46}
          stroke={alpha(colors.muted, 0.45)}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    })}
  </g>
);

// Where a walker is: linear from a to b between frames t0 and t1.
export const walk = (
  frame: number,
  t0: number,
  t1: number,
  a: number,
  b: number,
) => {
  const t = Math.max(0, Math.min(1, (frame - t0) / Math.max(1, t1 - t0)));
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  return { x: a + (b - a) * eased, moving: t > 0 && t < 1, t };
};
