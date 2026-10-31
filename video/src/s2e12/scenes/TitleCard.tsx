import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Behind the title: lines drifting by, each with an arrow that only stretches along it.

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
            const a = n * 0.9;
            const len = 80 + 70 * (0.5 + 0.5 * Math.sin(frame * 0.06 + n));
            return (
              <g key={n}>
                <line
                  x1={cx - 260 * Math.cos(a)}
                  y1={cy - 260 * Math.sin(a)}
                  x2={cx + 260 * Math.cos(a)}
                  y2={cy + 260 * Math.sin(a)}
                  stroke={alpha(colors.green, 0.6)}
                  strokeWidth={6}
                />
                <Arrow
                  from={{ x: cx, y: cy }}
                  to={{ x: cx + len * Math.cos(a), y: cy + len * Math.sin(a) }}
                  width={10}
                />
              </g>
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
