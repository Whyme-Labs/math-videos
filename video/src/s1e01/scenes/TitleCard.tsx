import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../components/anim";
import { SceneShell } from "../components/SceneShell";
import { colors, fonts } from "../theme";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell id="title" showCaptions={false}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", bottom: -190 }}>
        <div
          style={{
            fontSize: 36,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: colors.gold,
            opacity: fadeIn(frame, 5),
            translate: riseIn(frame, 5),
          }}
        >
          Season 1 · Episode 1
        </div>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 132,
            fontWeight: 700,
            marginTop: 24,
            opacity: fadeIn(frame, 15),
            translate: riseIn(frame, 15),
          }}
        >
          What Is a Number?
        </div>
        <div
          style={{
            fontSize: 48,
            color: colors.muted,
            marginTop: 28,
            opacity: fadeIn(frame, 35),
            translate: riseIn(frame, 35),
          }}
        >
          What do we mean by “number”?
        </div>
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 64,
            marginTop: 70,
            letterSpacing: 6,
            color: colors.blue,
            opacity: fadeIn(frame, 55, 25),
          }}
        >
          ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
