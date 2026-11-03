import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the three judges' cards, each with its own verdict on the same
// spikes (c0–c1). Teaser for measure: the Cantor set built row by row,
// middle thirds falling away (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const rows = Math.min(6, Math.floor(Math.max(0, frame - c2 - 6) / 12) + 1);
  const cantor = (k: number): [number, number][] => {
    let iv: [number, number][] = [[0, 1]];
    for (let i = 0; i < k; i++)
      iv = iv.flatMap(
        ([a, b]) =>
          [
            [a, a + (b - a) / 3],
            [b - (b - a) / 3, b],
          ] as [number, number][],
      );
    return iv;
  };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      {Array.from({ length: 6 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 12} volume={0.1} />
      ))}
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill
        style={{
          opacity: part1,
          top: 220,
          left: 0,
          alignItems: "center",
          gap: 24,
        }}
      >
        {tx.judges.map((j, i) => (
          <div
            key={j}
            style={{
              width: 640,
              padding: "16px 28px",
              borderRadius: 18,
              border: `5px solid ${[colors.green, colors.primary, colors.red][i]}`,
              background: alpha(colors.bg, 0.88),
              display: "flex",
              justifyContent: "space-between",
              fontSize: 48,
              fontWeight: 800,
              opacity: fadeIn(frame, c0 + 6 + i * 8, 8),
              scale: `${glide(frame, c1 + 6 + i * 6, fps, 10) * 0.08 + 1}`,
            }}
          >
            <span style={{ color: colors.text }}>{j}</span>
            <span
              style={{ color: [colors.green, colors.primary, colors.red][i] }}
            >
              {tx.verdicts[i]}
            </span>
          </div>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: rows }).map((_, k) =>
            cantor(k).map(([a, b], i) => (
              <rect
                key={`${k}-${i}`}
                x={1180 + 600 * a}
                y={300 + k * 50}
                width={Math.max(1, 600 * (b - a))}
                height={26}
                fill={colors.primary}
              />
            )),
          )}
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
              opacity: fadeIn(frame, c2 + 70),
              translate: riseIn(frame, c2 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
