import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: arrows drifting by, each dropping a dashed upright
// line onto the floor line below it and casting its shadow there.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} volume={0.35} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3, 4].map((n) => {
            const cx = ((n * 460 + frame * 3) % 2400) - 240;
            const cy = 300 + (n % 3) * 260;
            const a = 0.5 + 0.3 * Math.sin(frame * 0.02 + n);
            const tip = { x: 170 * Math.cos(a), y: -170 * Math.sin(a) };
            return (
              <g key={n} transform={`translate(${cx} ${cy})`}>
                <line
                  x1={-60}
                  y1={0}
                  x2={260}
                  y2={0}
                  stroke={colors.paper}
                  strokeWidth={4}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={tip.x}
                  y2={0}
                  stroke={colors.orange}
                  strokeWidth={10}
                />
                <line
                  x1={tip.x}
                  y1={tip.y}
                  x2={tip.x}
                  y2={0}
                  stroke={colors.green}
                  strokeWidth={5}
                  strokeDasharray="10 8"
                />
                <line
                  x1={0}
                  y1={0}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={colors.primary}
                  strokeWidth={8}
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
