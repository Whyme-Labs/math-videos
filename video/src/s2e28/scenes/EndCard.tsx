import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: a point drops a perpendicular onto a line, right angle marked
// (c0); beside it an arrow and a stack of level lines fuse, H = H* (c1).
// Teaser for Fourier: sine waves added one by one build a square wave
// (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const drop = glide(frame, c0 + 10, fps, 20);
  const terms = Math.min(12, Math.max(1, Math.floor((frame - c2 - 6) / 8)));
  const sq = (t: number) => {
    let s = 0;
    for (let k = 0; k < terms; k++)
      s += ((4 / Math.PI) * Math.sin((2 * k + 1) * t)) / (2 * k + 1);
    return s;
  };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pluck2" at={c0 + 10} volume={0.14} />
      <Sfx name="ding" at={c1 + 10} volume={0.2} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={700}
            x2={900}
            y2={500}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <circle cx={520} cy={300} r={14} fill={colors.highlight} />
          <line
            x1={520}
            y1={300}
            x2={520 + (626 - 520) * drop}
            y2={300 + (571 - 300) * drop}
            stroke={colors.red}
            strokeWidth={5}
          />
          <g opacity={fadeIn(frame, c1 + 4, 8)}>
            {[-2, -1, 0, 1, 2].map((k) => (
              <line
                key={k}
                x1={1150 + k * 70}
                y1={260}
                x2={1350 + k * 70}
                y2={760}
                stroke={alpha(colors.orange, 0.6)}
                strokeWidth={4}
              />
            ))}
            <line
              x1={1250}
              y1={510}
              x2={1250 + 186 * glide(frame, c1 + 10, fps, 20)}
              y2={510 - 74 * glide(frame, c1 + 10, fps, 20)}
              stroke={colors.primary}
              strokeWidth={9}
            />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1060}
            y1={600}
            x2={1820}
            y2={600}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 401 },
              (_, i) =>
                `${i ? "L" : "M"} ${1060 + 1.9 * i} ${600 - 120 * sq((4 * Math.PI * i) / 400)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 820,
              opacity: fadeIn(frame, c2 + 60),
              translate: riseIn(frame, c2 + 60),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 80) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
