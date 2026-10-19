import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Arrow, Grid, polar, type View } from "../components/plane";
import { splitMath } from "../../thumbnails/math-chars";
import { useStrings } from "../i18n";

// Behind the title: the complex plane, and an arrow from 1 turning a quarter
// turn to i.
const V: View = { cx: 230, cy: 960, unit: 170 };

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const turn = glide(frame, 20, fps, 30);

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={20} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.35 }}>
        <svg width={1920} height={1080}>
          <Grid view={V} n={6} opacity={fadeIn(frame, 0)} />
          <Arrow
            view={V}
            z={polar(1.6, (Math.PI / 2) * turn)}
            color={colors.primary}
            width={8}
          />
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
          {splitMath(tx.title).map((part, k) => (
            <span
              key={k}
              style={part.math ? { fontFamily: fonts.math } : undefined}
            >
              {part.text}
            </span>
          ))}
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
