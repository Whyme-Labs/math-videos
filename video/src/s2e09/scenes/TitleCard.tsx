import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: ellipses and hyperbolas drifting by, slowly turning.

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
            const rot = frame * (n % 2 ? 0.4 : -0.4) + n * 40;
            return (
              <g key={n} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
                {n % 2
                  ? [40, 80, 120].map((r) => (
                      <ellipse
                        key={r}
                        rx={r * 1.6}
                        ry={r}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth={6}
                      />
                    ))
                  : [30, 70].map((a) => (
                      <g key={a}>
                        {[-1, 1].map((s) => (
                          <path
                            key={s}
                            d={`M ${s * a} 0 Q ${s * (a + 90)} -120 ${s * (a + 200)} -200 M ${s * a} 0 Q ${s * (a + 90)} 120 ${s * (a + 200)} 200`}
                            fill="none"
                            stroke={colors.orange}
                            strokeWidth={6}
                          />
                        ))}
                      </g>
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
