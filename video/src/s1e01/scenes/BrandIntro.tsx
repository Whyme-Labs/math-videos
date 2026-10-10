import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useStrings } from "../i18n";
import { BrandMark, BrandWordmark } from "../components/Brand";
import { fadeIn, fadeOut, riseIn } from "../components/anim";
import { Sfx } from "../components/Sfx";
import { SceneShell } from "../components/SceneShell";
import { alpha, colors } from "../theme";

// Whyme Labs sting: the mark blooms out of a lemon glow, then the wordmark rises.
export const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps, durationInFrames } = useVideoConfig();
  const out = fadeOut(frame, durationInFrames - 20, 20);

  return (
    <SceneShell id="brand" showCaptions={false} showWatermark={false}>
      <Sfx name="sparkle" at={2} />
      <Sfx name="chime" at={1.5 * fps} volume={0.25} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          bottom: -190,
          opacity: out,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: 450,
            background: `radial-gradient(circle, ${alpha(colors.primary, 0.35)} 0%, ${alpha(colors.orange, 0.15)} 35%, transparent 70%)`,
            scale: interpolate(frame, [0, 1.5 * fps], [0.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            opacity: fadeIn(frame, 0, 20),
          }}
        />
        <BrandMark
          height={300}
          style={{
            scale: interpolate(frame, [0, 1.2 * fps], [0.6, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 14 }),
              output: "perceptual-scale",
            }),
            opacity: fadeIn(frame, 0, 18),
          }}
        />
        <BrandWordmark
          height={64}
          style={{
            marginTop: 56,
            opacity: fadeIn(frame, 0.8 * fps),
            translate: riseIn(frame, 0.8 * fps),
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: colors.primary,
            opacity: fadeIn(frame, 1.5 * fps),
          }}
        >
          {tx.presents}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
