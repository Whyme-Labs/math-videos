import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { cantor } from "../components/line";
import { useStrings } from "../i18n";

// Recap: the Cantor set's rows beside the fractions' tiny covers, both
// of size 0 (c0–c1). Teaser for completeness: a sequence of points closing
// in on a hole in a line, and the hole filling (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const fill = glide(frame, c2 + 60, fps, 20);
  const k = Math.min(10, Math.floor(Math.max(0, frame - c2 - 6) / 5));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 6 }).map((_, r) =>
            cantor(r).map(([a, b], i) => (
              <rect
                key={`${r}-${i}`}
                x={300 + 600 * a}
                y={260 + r * 60}
                width={Math.max(1, 600 * (b - a))}
                height={30}
                fill={colors.primary}
                opacity={fadeIn(frame, c0 + 6 + r * 6, 6)}
              />
            )),
          )}
          <line
            x1={1100}
            y1={440}
            x2={1700}
            y2={440}
            stroke={colors.paper}
            strokeWidth={5}
            opacity={fadeIn(frame, c1 + 6, 8)}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={1100 + 600 * ((i * 0.618) % 1) - 30 / 2 ** i}
              y={425}
              width={60 / 2 ** i + 1}
              height={30}
              fill={alpha(colors.orange, 0.6)}
              opacity={fadeIn(frame, c1 + 6 + i * 3, 6)}
            />
          ))}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1120}
            y1={440}
            x2={1760}
            y2={440}
            stroke={colors.paper}
            strokeWidth={6}
          />
          <circle
            cx={1500}
            cy={440}
            r={16}
            fill={fill > 0.5 ? colors.green : colors.bg}
            stroke={fill > 0.5 ? colors.green : colors.paper}
            strokeWidth={5}
          />
          {Array.from({ length: k }).map((_, i) => (
            <circle
              key={i}
              cx={lerp(1160, 1500, 1 - 0.6 ** (i + 1))}
              cy={440}
              r={9}
              fill={colors.primary}
            />
          ))}
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
