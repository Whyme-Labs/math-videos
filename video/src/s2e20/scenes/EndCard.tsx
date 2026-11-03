import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Boxes } from "../components/boxes";
import { useStrings } from "../i18n";

// Recap: the endless row of boxes sliding right, a 0 dropping in at the
// front each time (c0). Teaser: three unit balls side by side, diamond,
// disc and square, three rulers for the same plane (c1–c2), then the
// next-episode line.

const V = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9].map(String);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const cyc = ((frame - c0) % 40) / 40;
  const k = Math.floor((frame - c0) / 40);
  const vals = [...Array(k).fill("0"), ...V];
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c1, 10);
  const balls = glide(frame, c1 + 6, fps, 20);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Boxes
            x={160}
            y={440}
            n={16}
            values={vals}
            offset={Math.min(1, cyc * 2) - k}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((i) => {
            const cx = 1180 + i * 240;
            const r = 90 * balls;
            return (
              <g key={i} transform={`translate(${cx} 440)`}>
                {i === 0 ? (
                  <polygon
                    points={`0,${-r} ${r},0 0,${r} ${-r},0`}
                    fill={alpha(colors.primary, 0.15)}
                    stroke={colors.primary}
                    strokeWidth={6}
                  />
                ) : null}
                {i === 1 ? (
                  <circle
                    r={r}
                    fill={alpha(colors.green, 0.15)}
                    stroke={colors.green}
                    strokeWidth={6}
                  />
                ) : null}
                {i === 2 ? (
                  <rect
                    x={-r}
                    y={-r}
                    width={2 * r}
                    height={2 * r}
                    fill={alpha(colors.highlight, 0.15)}
                    stroke={colors.highlight}
                    strokeWidth={6}
                  />
                ) : null}
              </g>
            );
          })}
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
