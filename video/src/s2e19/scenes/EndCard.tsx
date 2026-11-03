import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: a circle with a marked radius turns, stretches and turns, over
// and over (c0); two σ bars beside it, the only numbers that survive
// (c1). Teaser for Part B: a fan of axes that keeps adding arms (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const cyc = ((frame - c0) % 90) / 90;
  const t1 = Math.min(1, cyc * 3);
  const t2 = Math.min(1, Math.max(0, cyc * 3 - 1));
  const t3 = Math.min(1, Math.max(0, cyc * 3 - 2));
  const C = { x: 760, y: 450 };
  const fan = Math.min(30, Math.floor(Math.max(0, frame - c2 - 6) / 4) + 1);
  const bars = glide(frame, c1 + 6, fps, 20);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="riser" at={c2 + 6} volume={0.1} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${C.x} ${C.y}) rotate(${-50 * t3}) scale(${lerp(1, 1.5, t2)} ${lerp(1, 0.55, t2)}) rotate(${30 * t1})`}
          >
            <circle
              r={190}
              fill={alpha(colors.primary, 0.1)}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <line
              x1={0}
              y1={0}
              x2={190}
              y2={0}
              stroke={colors.highlight}
              strokeWidth={8}
            />
          </g>
          <rect
            x={1300}
            y={640 - 300 * bars}
            width={90}
            height={300 * bars}
            rx={8}
            fill={colors.green}
          />
          <rect
            x={1440}
            y={640 - 110 * bars}
            width={90}
            height={110 * bars}
            rx={8}
            fill={colors.highlight}
          />
          <line
            x1={1260}
            y1={640}
            x2={1570}
            y2={640}
            stroke={colors.text}
            strokeWidth={4}
          />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: fan }).map((_, k) => {
            const a = 0.4 + k * 0.42;
            const d = 1 / (1 + k * 0.08);
            return (
              <line
                key={k}
                x1={1480}
                y1={430}
                x2={1480 + 260 * d * Math.cos(a)}
                y2={430 - 220 * d * Math.sin(a)}
                stroke={k % 2 ? colors.primary : colors.green}
                strokeWidth={6 * d}
                opacity={d}
                strokeLinecap="round"
              />
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
              maxWidth: 1000,
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
