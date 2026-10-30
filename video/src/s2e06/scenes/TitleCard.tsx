import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Behind the title: stacks of orange sheets drifting by, with arrows passing through them.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 14 }).map((_, n) => {
            const x = ((n * 170 + frame * 3) % 2400) - 240;
            return (
              <line
                key={n}
                x1={x - 160}
                y1={1080}
                x2={x + 160}
                y2={0}
                stroke={colors.orange}
                strokeWidth={8}
                strokeLinecap="round"
              />
            );
          })}
          {[0, 1, 2].map((n) => {
            const x = ((n * 800 + frame * 6) % 2600) - 400;
            const y = 220 + n * 320;
            return (
              <Arrow
                key={n}
                from={{ x, y }}
                to={{ x: x + 260, y: y - 40 }}
                width={10}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", bottom: 80 }}
      >
        <BrandMark
          height={90}
          style={{ marginBottom: 36, opacity: fadeIn(frame, 0) }}
        />
        <div
          style={{
            fontSize: 36,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: colors.highlight,
            opacity: fadeIn(frame, 5),
            translate: riseIn(frame, 5),
          }}
        >
          {tx.season}
        </div>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 104,
            fontWeight: 700,
            marginTop: 24,
            opacity: fadeIn(frame, 15),
            translate: riseIn(frame, 15),
          }}
        >
          {tx.title}
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
          {tx.subtitle}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
