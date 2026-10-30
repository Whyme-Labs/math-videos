import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: horizontal lines drifting by, sliding together into dots and apart again.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 9 }).map((_, n) => {
            const y = 140 + n * 100;
            const x = ((n * 260 + frame * 4) % 2400) - 240;
            const squeeze = 0.5 + 0.5 * Math.cos(frame * 0.04 + n);
            const half = 40 + 160 * squeeze;
            return (
              <g key={n}>
                <line
                  x1={x - half}
                  y1={y}
                  x2={x + half}
                  y2={y}
                  stroke={n % 3 ? colors.primary : colors.orange}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={12}
                  fill={n % 3 ? colors.primary : colors.orange}
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
