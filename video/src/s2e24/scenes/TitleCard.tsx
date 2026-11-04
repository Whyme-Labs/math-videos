import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: gauge dials drifting by, their needles swaying a
// little at a time, the way a continuous measurement does.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} volume={0.35} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3, 4, 5].map((n) => {
            const cx = ((n * 420 + frame * 3) % 2400) - 240;
            const cy = 220 + (n % 3) * 300;
            const a = (frame + n * 30) * 0.03;
            return (
              <g key={n} transform={`translate(${cx} ${cy})`}>
                <path
                  d="M -130 0 A 130 130 0 0 1 130 0"
                  fill="none"
                  stroke={colors.paper}
                  strokeWidth={6}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={-110 * Math.cos(1.57 + 0.6 * Math.sin(a))}
                  y2={-110 * Math.sin(1.57 + 0.6 * Math.sin(a))}
                  stroke={n % 2 ? colors.primary : colors.orange}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <circle r={10} fill={colors.paper} />
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
