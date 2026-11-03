import type React from "react";
import { alpha, colors } from "../../shared/theme";
import { useStrings } from "../i18n";

// The ledger of losses that stays on the right through the episode: five
// lines, each crossed in red once its failure has been shown (`crossed`
// lines), the current one highlighted (`active`), and, when `repairs` is
// on, each line pointing to the episode that repairs it.

export const Ledger: React.FC<{
  readonly crossed: number;
  readonly active?: number;
  readonly repairs?: number;
  readonly x?: number;
  readonly y?: number;
  readonly scale?: number;
  readonly opacity?: number;
  readonly compact?: boolean;
}> = ({
  crossed,
  active = -1,
  repairs = 0,
  x = 1280,
  y = 150,
  scale = 1,
  opacity = 1,
  compact = false,
}) => {
  const tx = useStrings();
  if (compact) {
    // a column of five numbered discs at the right edge: crossed ones in
    // red, the current one lit
    return (
      <div
        style={{
          position: "absolute",
          left: 1770,
          top: 200,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          opacity,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const c = Math.min(1, Math.max(0, crossed - i));
          const on = i === active;
          return (
            <div
              key={i}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 800,
                color: c > 0.5 || on ? colors.bg : colors.muted,
                background:
                  c > 0.5
                    ? colors.red
                    : on
                      ? colors.primary
                      : alpha(colors.bg, 0.8),
                border: `4px solid ${c > 0.5 ? colors.red : on ? colors.primary : alpha(colors.paper, 0.3)}`,
              }}
            >
              {c > 0.5 ? "✗" : i + 1}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 600,
        padding: "18px 24px",
        borderRadius: 18,
        background: alpha(colors.bg, 0.88),
        border: `4px solid ${alpha(colors.paper, 0.3)}`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: colors.primary,
          marginBottom: 12,
        }}
      >
        {tx.ledger}
      </div>
      {tx.losses.map((l, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            whiteSpace: "nowrap",
            fontWeight: 700,
            lineHeight: 1.7,
            color:
              i === active
                ? colors.text
                : i < crossed
                  ? colors.muted
                  : alpha(colors.paper, 0.35),
          }}
        >
          <span style={{ position: "relative" }}>
            {i + 1}. {l}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "52%",
                height: 4,
                width: `${Math.min(1, Math.max(0, crossed - i)) * 100}%`,
                background: colors.red,
                borderRadius: 2,
              }}
            />
          </span>
          <span
            style={{
              color: colors.green,
              fontSize: 26,
              opacity: Math.min(1, Math.max(0, repairs - i)),
            }}
          >
            → {tx.repairs[i]}
          </span>
        </div>
      ))}
    </div>
  );
};
