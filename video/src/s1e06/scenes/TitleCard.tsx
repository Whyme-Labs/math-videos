import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Behind the title: the integers appear outward from 0, then a fraction between each pair.
const UNIT = 130;
const LINE_Y = 930;

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ bottom: -190, zIndex: -1 }}>
        <svg width={1920} height={1080}>
          <g opacity={0.45}>
            <line
              x1={960 - 7 * UNIT}
              y1={LINE_Y}
              x2={960 + 7 * UNIT}
              y2={LINE_Y}
              stroke={colors.muted}
              strokeWidth={3}
              opacity={fadeIn(frame, 2)}
            />
            {Array.from({ length: 13 }).map((_, i) => {
              const n = i - 6;
              const s = Math.min(
                1,
                springIn(frame, 6 + Math.abs(n) * 3, fps, 11),
              );
              return (
                <g key={n}>
                  <circle
                    cx={960 + n * UNIT}
                    cy={LINE_Y}
                    r={12 * s}
                    fill={n < 0 ? colors.highlight : colors.primary}
                  />
                  <text
                    x={960 + n * UNIT}
                    y={LINE_Y - 30}
                    fill={colors.text}
                    fontSize={30}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={s}
                  >
                    {n < 0 ? `−${-n}` : n}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 960 + (i - 6 + 0.5) * UNIT;
              return (
                <circle
                  key={`h${i}`}
                  cx={x}
                  cy={LINE_Y}
                  r={6 * Math.min(1, springIn(frame, 36 + i * 2, fps, 11))}
                  fill={alpha(colors.orange, 0.9)}
                />
              );
            })}
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", bottom: -130 }}
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
