import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { useStrings } from "../i18n";
import { fadeIn, riseIn } from "../components/anim";
import { BrandMark } from "../components/Brand";
import { Sfx } from "../components/Sfx";
import { springIn } from "../components/motion";
import { SceneShell } from "../components/SceneShell";
import { colors, fonts } from "../theme";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", bottom: -190 }}
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
      {/* ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ as rings, each holding the one before. */}
      <AbsoluteFill style={{ bottom: -190, zIndex: -1 }}>
        <svg width={1920} height={1080}>
          {["ℕ", "ℤ", "ℚ", "ℝ", "ℂ"].map((s, i) => {
            const t = springIn(frame, 6 + i * 7, fps, 12);
            const rx = (180 + i * 150) * t;
            const ry = (110 + i * 95) * t;
            return (
              <g key={s} opacity={0.18 + (0.1 * (4 - i)) / 4}>
                <ellipse
                  cx={960}
                  cy={560}
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={3}
                />
                <text
                  x={960 + rx * 0.72}
                  y={560 - ry * 0.72}
                  fill={colors.primary}
                  fontSize={44}
                  fontFamily={fonts.math}
                >
                  {s}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
