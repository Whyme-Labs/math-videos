import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { stageSwell } from "../music";
import { useEpisode } from "../episode";
import { useLocale } from "../locale";
import { alpha, colors, fonts } from "../theme";
import { Watermark } from "./Brand";
import { fadeIn } from "./anim";

// Start frames of each narration line in this scene.
export const useCues = (id: string) =>
  useEpisode().sceneTiming(id, useLocale()).starts;

// Background, safe-area content slot, and narration captions for one scene.
export const SceneShell: React.FC<{
  readonly id: string;
  readonly children: React.ReactNode;
  readonly showCaptions?: boolean;
  readonly showWatermark?: boolean;
}> = ({ id, children, showCaptions = true, showWatermark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const locale = useLocale();
  const episode = useEpisode();
  const { start, starts, durationInFrames } = episode.sceneTiming(id, locale);
  const lines = episode.narration[locale][id];
  // Lights breathe gently with the bar (no per-beat flashing: it read as flicker).
  const swell = stageSwell((start + frame) / fps);
  let current = 0;
  for (let i = 0; i < starts.length; i++) if (frame >= starts[i]) current = i;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        // Violet stage lit by a warm lemon/orange column, as in the brand mood board.
        backgroundImage: [
          `radial-gradient(ellipse 38% 60% at 50% 105%, ${alpha(colors.orange, 0.28)}, transparent 70%)`,
          `linear-gradient(90deg, transparent 38%, ${alpha(colors.primary, 0.05)} 50%, transparent 62%)`,
          `radial-gradient(circle at 50% 30%, ${colors.bgGlow} 0%, ${colors.bgMid} 45%, ${colors.bg} 100%)`,
        ].join(", "),
        color: colors.text,
        fontFamily: fonts.body,
      }}
    >
      {/* Soft light pillars at the edges of the stage. */}
      {[0.06, 0.94].map((x) => (
        <div
          key={x}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${x * 100}%`,
            width: 70,
            marginLeft: -35,
            background: `linear-gradient(180deg, ${alpha(colors.highlight, 0.24 + 0.05 * swell)}, ${alpha(colors.orange, 0.14 + 0.04 * swell)} 60%, transparent)`,
            filter: "blur(6px)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 38% 45% at 50% 108%, ${alpha(colors.primary, 0.22)}, transparent 70%)`,
          opacity: 0.55 + 0.12 * swell,
        }}
      />
      {showWatermark ? <Watermark /> : null}
      {/* Slow camera drift so no scene ever sits still. */}
      <AbsoluteFill
        style={{
          bottom: 190,
          scale: interpolate(frame, [0, durationInFrames], [1, 1.04]),
          translate: `${interpolate(frame, [0, durationInFrames], [-8, 8])}px 0px`,
        }}
      >
        {children}
      </AbsoluteFill>
      {showCaptions ? (
        <div
          style={{
            position: "absolute",
            left: 160,
            right: 160,
            bottom: 56,
            minHeight: 110,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            key={current}
            style={{
              opacity: fadeIn(frame, starts[current], 8),
              backgroundColor: alpha(colors.bg, 0.72),
              border: `1px solid ${alpha(colors.primary, 0.35)}`,
              borderRadius: 16,
              padding: "18px 32px",
              fontSize: 38,
              lineHeight: 1.35,
              textAlign: "center",
              maxWidth: 1500,
            }}
          >
            {lines[current]}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
