import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: parallelograms drifting by, each spun by its two edges.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3, 4].map((n) => {
            const cx = ((n * 460 + frame * 3) % 2400) - 240;
            const cy = 200 + (n % 3) * 300;
            const a = frame * 0.02 * (n % 2 ? 1 : -1) + n;
            const u = { x: 150 * Math.cos(a), y: 150 * Math.sin(a) };
            const v = {
              x: 110 * Math.cos(a + 1.1),
              y: 110 * Math.sin(a + 1.1),
            };
            return (
              <polygon
                key={n}
                points={`${cx},${cy} ${cx + u.x},${cy + u.y} ${cx + u.x + v.x},${cy + u.y + v.y} ${cx + v.x},${cy + v.y}`}
                fill={alpha(n % 2 ? colors.primary : colors.orange, 0.35)}
                stroke={n % 2 ? colors.primary : colors.orange}
                strokeWidth={6}
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
            fontSize: 76,
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
