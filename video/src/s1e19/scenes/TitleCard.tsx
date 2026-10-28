import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: compass arcs sweeping and straightedge lines drifting by.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }).map((_, n) => {
            const x = ((n * 340 + frame * 4) % 2400) - 240;
            const y = 180 + ((n * 131) % 5) * 170;
            const r = 90 + (n % 3) * 40;
            const sweep = ((frame * 3 + n * 50) % 360) * (Math.PI / 180);
            return (
              <g key={n}>
                <path
                  d={`M ${x + r} ${y} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x + r * Math.cos(sweep)} ${y + r * Math.sin(sweep)}`}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={5}
                />
                <line
                  x1={x - r * 1.4}
                  y1={y + 40}
                  x2={x + r * 1.4}
                  y2={y - 40}
                  stroke={colors.paper}
                  strokeWidth={3}
                />
                <circle cx={x} cy={y} r={7} fill={colors.highlight} />
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
            fontSize: 132,
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
