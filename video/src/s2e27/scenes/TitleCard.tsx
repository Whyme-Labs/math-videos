import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: bumps drifting off to the right over rows of little
// sensors that stay at zero.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} volume={0.35} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((r) => {
            const y = 260 + r * 300;
            const x = ((frame * (4 + r) + r * 700) % 2400) - 240;
            return (
              <g key={r}>
                <line
                  x1={0}
                  y1={y}
                  x2={1920}
                  y2={y}
                  stroke={colors.paper}
                  strokeWidth={3}
                />
                <path
                  d={`M ${x - 80} ${y} Q ${x} ${y - 180} ${x + 80} ${y}`}
                  fill="none"
                  stroke={r % 2 ? colors.primary : colors.paper}
                  strokeWidth={6}
                />
                {[200, 600, 1000, 1400, 1800].map((sx) => (
                  <rect
                    key={sx}
                    x={sx - 8}
                    y={y + 8}
                    width={16}
                    height={34}
                    rx={4}
                    fill={colors.orange}
                  />
                ))}
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
            fontSize: 84,
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
