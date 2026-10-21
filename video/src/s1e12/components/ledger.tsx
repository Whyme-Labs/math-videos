import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";

// The clerk's ledger: an infinite table, one row per room, one column per
// digit after the point. Scenes light up the diagonal, flip it into a new
// name, and shuffle the rows.

export const ROWS = 8;
export const COLS = 8;

// Deterministic digits for row `id` (so a row keeps its digits when the rows
// are shuffled). Row 1 is 0.5…, so the 4/5 rule visibly picks a 4 somewhere.
export const digitOf = (id: number, col: number) => {
  if (id === 1 && col === 1) return 5;
  if (id === 4 && col === 4) return 5;
  const h = Math.sin(id * 127.1 + col * 311.7 + 4.3) * 43758.5453;
  return Math.floor((h - Math.floor(h)) * 10);
};
export const flip = (d: number) => (d === 5 ? 4 : 5);
export const nameOf = (id: number, n = 6) =>
  `0.${Array.from({ length: n })
    .map((_, c) => digitOf(id, c))
    .join("")}…`;

export type Layout = {
  readonly x: number; // left edge of the digit grid
  readonly y: number; // top edge of row 0
  readonly cw: number; // column width
  readonly rh: number; // row height
};

export const cellCenter = (L: Layout, row: number, col: number) => ({
  x: L.x + (col + 0.5) * L.cw,
  y: L.y + (row + 0.5) * L.rh,
});

// The table itself. `order[k]` is which row id sits in slot k; `slotY(k)`
// can animate row positions for a shuffle. `lit(k)` (0..1) lights the
// diagonal cell of slot k; `mismatch(k)` rings it in red.
export const Ledger: React.FC<{
  readonly L: Layout;
  readonly order?: number[];
  readonly slotOf?: (id: number) => number; // fractional slot while moving
  readonly lit?: (slot: number) => number;
  readonly mismatch?: (slot: number) => number;
  readonly rowLabel?: (id: number, slot: number) => string;
  readonly cell?: (id: number, col: number) => string;
  readonly reveal?: (slot: number) => number; // 0..1 how much of the row is written
  readonly opacity?: number;
  readonly fontSize?: number;
}> = ({
  L,
  order = Array.from({ length: ROWS }).map((_, k) => k),
  slotOf,
  lit = () => 0,
  mismatch = () => 0,
  rowLabel = (_, slot) => String(slot),
  cell = (id, col) => String(digitOf(id, col)),
  reveal = () => 1,
  opacity = 1,
  fontSize = 44,
}) => (
  <g opacity={opacity}>
    {/* the paper */}
    <rect
      x={L.x - 150}
      y={L.y - 70}
      width={COLS * L.cw + 260}
      height={ROWS * L.rh + 150}
      rx={24}
      fill={colors.paper}
    />
    {Array.from({ length: COLS }).map((_, c) => (
      <text
        key={`h${c}`}
        x={L.x + (c + 0.5) * L.cw}
        y={L.y - 22}
        fill={alpha(colors.ink, 0.45)}
        fontSize={24}
        textAnchor="middle"
        fontFamily={fonts.mono}
      >
        {c}
      </text>
    ))}
    {order.map((id, k) => {
      const slot = slotOf ? slotOf(id) : k;
      const y = L.y + slot * L.rh;
      const shown = reveal(k);
      return (
        <g key={id}>
          <line
            x1={L.x - 130}
            y1={y + L.rh}
            x2={L.x + COLS * L.cw + 90}
            y2={y + L.rh}
            stroke={alpha(colors.ink, 0.12)}
            strokeWidth={2}
          />
          <text
            x={L.x - 70}
            y={y + L.rh * 0.68}
            fill={alpha(colors.ink, 0.6)}
            fontSize={fontSize * 0.7}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            {rowLabel(id, k)}
          </text>
          {Array.from({ length: COLS }).map((_, c) => {
            if (c / COLS >= shown) return null;
            const diag = c === k;
            const l = diag ? lit(k) : 0;
            const m = diag ? mismatch(k) : 0;
            const ctr = { x: L.x + (c + 0.5) * L.cw, y: y + L.rh / 2 };
            return (
              <g key={c}>
                {l > 0 ? (
                  <rect
                    x={ctr.x - L.cw * 0.45}
                    y={ctr.y - L.rh * 0.45}
                    width={L.cw * 0.9}
                    height={L.rh * 0.9}
                    rx={10}
                    fill={alpha(colors.primary, 0.85 * l)}
                  />
                ) : null}
                {m > 0 ? (
                  <rect
                    x={ctr.x - L.cw * 0.47}
                    y={ctr.y - L.rh * 0.47}
                    width={L.cw * 0.94}
                    height={L.rh * 0.94}
                    rx={10}
                    fill="none"
                    stroke={colors.red}
                    strokeWidth={6}
                    opacity={m}
                  />
                ) : null}
                <text
                  x={ctr.x}
                  y={ctr.y + fontSize * 0.36}
                  fill={colors.ink}
                  fontSize={fontSize}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={diag && l > 0 ? 700 : 400}
                >
                  {cell(id, c)}
                </text>
              </g>
            );
          })}
          <text
            x={L.x + COLS * L.cw + 40}
            y={y + L.rh * 0.68}
            fill={alpha(colors.ink, 0.5)}
            fontSize={fontSize}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            …
          </text>
        </g>
      );
    })}
    <text
      x={L.x + (COLS * L.cw) / 2}
      y={L.y + ROWS * L.rh + 50}
      fill={alpha(colors.ink, 0.5)}
      fontSize={fontSize}
      textAnchor="middle"
      fontFamily={fonts.mono}
    >
      ⋮
    </text>
  </g>
);

// The challenger's name tag: digits fill in as they are flipped.
export const Badge: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly digits: number[];
  readonly shown: number; // how many digits are written
  readonly scale?: number;
  readonly color?: string;
}> = ({ x, y, digits, shown, scale = 1, color = colors.highlight }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect
      x={-190}
      y={-48}
      width={380}
      height={96}
      rx={20}
      fill={color}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      x={0}
      y={16}
      fill={colors.ink}
      fontSize={46}
      textAnchor="middle"
      fontFamily={fonts.mono}
      fontWeight={700}
    >
      0.{digits.slice(0, shown).join("")}
      {shown >= digits.length ? "…" : ""}
    </text>
  </g>
);
