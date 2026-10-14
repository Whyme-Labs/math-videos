import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { scatter } from "../components/pieces";
import { useStrings } from "../i18n";

// Behind the title: 36 scattered dots drift into 12 blobs (same remainder ÷ 12).
const N = 36;
const blobX = (k: number) => 200 + k * 138;
const BLOB_Y = 920;

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
            {Array.from({ length: N }).map((_, i) => {
              const k = i % 12;
              const r = Math.floor(i / 12);
              const s = scatter(i, { x: 160, y: 820, w: 1600, h: 200 });
              const t = glide(frame, 6 + k * 2, fps, 34);
              const a = (r / 3) * 2 * Math.PI;
              return (
                <circle
                  key={i}
                  cx={lerp(s.x, blobX(k) + 18 * Math.sin(a), t)}
                  cy={lerp(s.y, BLOB_Y - 18 * Math.cos(a), t)}
                  r={9}
                  fill={k === 3 ? colors.highlight : colors.primary}
                />
              );
            })}
            {Array.from({ length: 12 }).map((_, k) => (
              <circle
                key={k}
                cx={blobX(k)}
                cy={BLOB_Y}
                r={44}
                fill={alpha(colors.primary, 0.08)}
                stroke={alpha(colors.primary, 0.5)}
                strokeWidth={2}
                opacity={fadeIn(frame, 40 + k)}
              />
            ))}
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
