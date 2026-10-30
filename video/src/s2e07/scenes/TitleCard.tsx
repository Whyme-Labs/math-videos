import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Behind the title: curves drifting by, each with a few orange probes pinned to it.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3].map((n) => {
            const y0 = 180 + n * 240;
            const shift = frame * (n % 2 ? 3 : -3) + n * 300;
            const f = (x: number) => y0 + 60 * Math.sin((x + shift) / 140 + n);
            return (
              <g key={n}>
                <path
                  d={curve(f, -40, 1960, (x, y) => ({ x, y }), 80)}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={6}
                />
                {[0, 1, 2].map((k) => {
                  const x =
                    (((k * 640 + n * 200 + frame * 2) % 2000) + 2000) % 2000;
                  return (
                    <circle
                      key={k}
                      cx={x}
                      cy={f(x)}
                      r={16}
                      fill={colors.orange}
                    />
                  );
                })}
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
