import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: eigenvalue dots marching to 0 beside a vibrating string (c0) and
// a few modes (c1). Teaser for the spectrum: a line with isolated dots on
// one side and a solid band [0, 1] on the other, the spectrum of
// multiplication by x (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const band = Math.max(0, Math.min(1, (frame - c2 - 10) / 40));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pluck1" at={c0 + 6} volume={0.14} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={260}
            y1={300}
            x2={1660}
            y2={300}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: 20 }, (_, k) => (
            <circle
              key={k}
              cx={960 + (k % 2 ? -1 : 1) * 650 * 0.8 ** k}
              cy={300}
              r={Math.max(5, 13 - k * 0.4)}
              fill={colors.orange}
            />
          ))}
          {[1, 2, 3].map((n, i) => (
            <path
              key={n}
              d={Array.from(
                { length: 121 },
                (_, j) =>
                  `${j ? "L" : "M"} ${460 + 1000 * (j / 120)} ${480 + i * 120 - 40 * Math.sin((n * Math.PI * j) / 120) * Math.cos(n * frame * 0.2)}`,
              ).join(" ")}
              fill="none"
              stroke={colors.primary}
              strokeWidth={4}
              opacity={fadeIn(frame, c1 + 6 + i * 8, 6)}
            />
          ))}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1100}
            y1={620}
            x2={1800}
            y2={620}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {[0, 1, 2, 3].map((k) => (
            <circle
              key={k}
              cx={1130 + k * 60}
              cy={620}
              r={11}
              fill={colors.orange}
            />
          ))}
          <rect
            x={1420}
            y={606}
            width={340 * band}
            height={28}
            rx={14}
            fill={colors.green}
          />
          <text
            x={1590}
            y={690}
            textAnchor="middle"
            fill={colors.green}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={band}
          >
            σ(Mₓ) = [0, 1]
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 860,
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
