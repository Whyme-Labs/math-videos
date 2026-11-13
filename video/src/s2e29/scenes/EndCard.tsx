import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path, squareSum } from "../components/waves";
import { useStrings } from "../i18n";

// Recap: a square wave beside its recipe bars (c0), and d/dx turning into
// "× in" over a tone (c1). Teaser for compact operators: a column of
// eigenvalue bars shrinking towards 0 (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const bars = Math.min(14, Math.max(0, Math.floor((frame - c2 - 6) / 4)));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pluck2" at={c0 + 6} volume={0.12} />
      <Sfx name="ding" at={c1 + 10} volume={0.2} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <path
            d={path(
              (x) => squareSum(x, 15),
              -Math.PI,
              Math.PI,
              (x) => 200 + (700 * (x + Math.PI)) / (2 * Math.PI),
              (v) => 420 - 140 * v,
              600,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          {Array.from({ length: 8 }, (_, j) => (
            <rect
              key={j}
              x={1060 + j * 80}
              y={560 - 300 / (2 * j + 1)}
              width={50}
              height={300 / (2 * j + 1)}
              rx={6}
              fill={colors.orange}
              opacity={fadeIn(frame, c0 + 10 + j * 4, 6)}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 660,
            left: 200,
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 8),
            translate: riseIn(frame, c1 + 8),
            whiteSpace: "nowrap",
          }}
        >
          d/dx ⟶ × in
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1100}
            y1={760}
            x2={1800}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: bars }, (_, j) => (
            <rect
              key={j}
              x={1110 + j * 48}
              y={760 - 400 * 0.75 ** j}
              width={32}
              height={400 * 0.75 ** j}
              rx={5}
              fill={colors.green}
            />
          ))}
          <text
            x={1800}
            y={800}
            textAnchor="end"
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λₙ → 0
          </text>
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
