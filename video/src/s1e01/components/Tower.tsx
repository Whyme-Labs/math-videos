import type React from "react";
import { alpha, colors, fonts } from "../theme";

export type Floor = {
  readonly symbol: string;
  readonly name: string;
};

export const FLOORS: Floor[] = [
  { symbol: "ℕ", name: "natural numbers" },
  { symbol: "ℤ", name: "integers" },
  { symbol: "ℚ", name: "rationals" },
  { symbol: "ℝ", name: "reals" },
  { symbol: "ℂ", name: "complex numbers" },
];

const FLOOR_W = 520;
const FLOOR_H = 112;
const GAP = 14;
export const TOWER_HEIGHT = FLOORS.length * (FLOOR_H + GAP);

// The number tower, bottom floor first. Each floor's appearance (0..1),
// "built" glow (0..1) and question mark (0..1) are controlled by the scene.
export const Tower: React.FC<{
  readonly appear: number[];
  readonly built: number[];
  readonly question: number[];
  readonly style?: React.CSSProperties;
}> = ({ appear, built, question, style }) => {
  return (
    <div style={{ position: "relative", width: FLOOR_W, height: TOWER_HEIGHT, ...style }}>
      {FLOORS.map((floor, i) => {
        const y = TOWER_HEIGHT - (i + 1) * (FLOOR_H + GAP);
        const b = built[i] ?? 0;
        return (
          <div
            key={floor.symbol}
            style={{
              position: "absolute",
              left: 0,
              top: y,
              width: FLOOR_W,
              height: FLOOR_H,
              opacity: appear[i] ?? 0,
              translate: `0px ${(1 - (appear[i] ?? 0)) * 40}px`,
              borderRadius: 14,
              border: `3px ${b > 0.5 ? "solid" : "dashed"} ${b > 0.5 ? colors.primary : colors.panelEdge}`,
              backgroundColor: alpha(colors.primary, 0.04 + 0.16 * b),
              boxShadow: b > 0 ? `0 0 ${40 * b}px ${alpha(colors.orange, 0.5 * b)}` : "none",
              display: "flex",
              alignItems: "center",
              padding: "0 28px",
              gap: 26,
            }}
          >
            <span style={{ fontFamily: fonts.math, fontSize: 72, lineHeight: 1 }}>{floor.symbol}</span>
            <span style={{ fontSize: 34, color: colors.muted }}>{floor.name}</span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: fonts.title,
                fontSize: 60,
                color: colors.highlight,
                opacity: question[i] ?? 0,
              }}
            >
              ?
            </span>
          </div>
        );
      })}
    </div>
  );
};
