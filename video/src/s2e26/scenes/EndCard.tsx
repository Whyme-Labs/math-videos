import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: three pillars rise from a base labelled completeness (c0), each
// lighting in turn (c1). Teaser for weak convergence: unit vectors eₙ
// fanning out in new directions, while the reading f(eₙ) of one fixed
// measurement shrinks to 0 (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const lit = Math.floor((frame - c1 - 6) / 14);
  const fan = Math.min(10, Math.max(0, Math.floor((frame - c2 - 6) / 6)));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="thud" at={c0 + 10 + i * 10} volume={0.14} />
      ))}
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c1 + 6 + i * 14} volume={0.1} />
      ))}
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={460}
            y={700}
            width={1000}
            height={70}
            rx={14}
            fill={alpha(colors.green, 0.3)}
            stroke={colors.green}
            strokeWidth={4}
          />
          {[0, 1, 2].map((i) => {
            const g = glide(frame, c0 + 10 + i * 10, fps, 20);
            const on = lit >= i;
            return (
              <rect
                key={i}
                x={560 + i * 300}
                y={700 - 420 * g}
                width={200}
                height={420 * g}
                rx={12}
                fill={
                  on
                    ? [colors.primary, colors.orange, colors.highlight][i]
                    : alpha(colors.paper, 0.25)
                }
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 716,
            left: 460,
            width: 1000,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          {tx.completeness}
        </div>
        {tx.pillars.map((p, i) => (
          <div
            key={p}
            style={{
              position: "absolute",
              top: 160,
              left: 520 + i * 300,
              width: 280,
              textAlign: "center",
              fontSize: 32,
              fontWeight: 800,
              color: colors.text,
              opacity: fadeIn(frame, c0 + 30 + i * 10),
            }}
          >
            {p}
          </div>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: fan }, (_, k) => {
            const a = -1.2 + k * 0.26;
            return (
              <line
                key={k}
                x1={1250}
                y1={560}
                x2={1250 + 260 * Math.cos(a)}
                y2={560 + 260 * Math.sin(a)}
                stroke={alpha(colors.primary, 0.4 + 0.06 * k)}
                strokeWidth={5}
              />
            );
          })}
          <line
            x1={1100}
            y1={820}
            x2={1780}
            y2={820}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: fan }, (_, k) => (
            <rect
              key={k}
              x={1110 + k * 66}
              y={820 - 160 / (k + 1)}
              width={40}
              height={160 / (k + 1)}
              fill={colors.orange}
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
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 1140,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c2 + 30),
            whiteSpace: "nowrap",
          }}
        >
          f(eₙ) → 0
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
