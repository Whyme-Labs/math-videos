import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: points drifting by, each dropping a perpendicular
// onto its own line, with a right-angle mark at the foot.

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
            const cy = 240 + (n % 3) * 290;
            const d = 50 + 40 * Math.sin((frame + n * 20) * 0.05);
            return (
              <g key={n} transform={`translate(${cx} ${cy}) rotate(${n * 25})`}>
                <line
                  x1={-130}
                  y1={0}
                  x2={130}
                  y2={0}
                  stroke={n % 2 ? colors.primary : colors.paper}
                  strokeWidth={5}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={-d}
                  stroke={colors.highlight}
                  strokeWidth={4}
                />
                <circle cx={0} cy={-d} r={8} fill={colors.highlight} />
                <path
                  d="M 14 0 L 14 -14 L 0 -14"
                  fill="none"
                  stroke={colors.paper}
                  strokeWidth={3}
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
