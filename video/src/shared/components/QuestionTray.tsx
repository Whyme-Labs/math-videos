import type React from "react";
import { useCurrentFrame } from "remotion";
import { useSeries } from "../locale";
import { alpha, colors, fonts } from "../theme";
import { fadeIn } from "./anim";

// The season-long "open questions" tray (top-right), introduced in the cold open.

export const QuestionTray: React.FC<{
  readonly style?: React.CSSProperties;
}> = ({ style }) => {
  const frame = useCurrentFrame();
  const tx = useSeries();
  return (
    <div
      style={{
        position: "absolute",
        top: 32,
        right: 80,
        display: "flex",
        gap: 12,
        opacity: fadeIn(frame, 0, 20),
        ...style,
      }}
    >
      {tx.tray.map((q) => (
        <div
          key={q}
          style={{
            fontFamily: fonts.math,
            fontSize: 24,
            padding: "8px 16px",
            borderRadius: 999,
            border: `2px solid ${colors.highlight}`,
            color: colors.highlight,
            backgroundColor: alpha(colors.highlight, 0.1),
            opacity: 0.9,
          }}
        >
          {q}
        </div>
      ))}
    </div>
  );
};
