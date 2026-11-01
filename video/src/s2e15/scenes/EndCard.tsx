import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// Recap: the unit circle in the complex plane, a point turning on it, its
// conjugate mirroring it, and the green dot at 1 where their product sits.
// Teaser for vectors and covectors: an orange stack of sheets, and a lemon
// arrow growing out of it, perpendicular to the sheets.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const O = { x: 960, y: 470 };
  const R = 260;
  const a = 0.4 + (frame - c0) * 0.03;
  const grow = glide(frame, c1 + 40, fps, 24);
  const T = { x: 1300, y: 420 };
  const scr = (x: number, y: number) => ({ x: T.x + x * 90, y: T.y - y * 90 });

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 50} volume={0.7} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={O.x - 360}
            y1={O.y}
            x2={O.x + 360}
            y2={O.y}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          <line
            x1={O.x}
            y1={O.y - 340}
            x2={O.x}
            y2={O.y + 340}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          <circle
            cx={O.x}
            cy={O.y}
            r={R}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + R * Math.cos(a)}
            y2={O.y + R * Math.sin(a)}
            stroke={colors.orange}
            strokeWidth={6}
            strokeDasharray="12 10"
          />
          <Arrow
            from={O}
            to={{ x: O.x + R * Math.cos(a), y: O.y - R * Math.sin(a) }}
            width={14}
            color={colors.orange}
          />
          <circle
            cx={O.x + R}
            cy={O.y}
            r={20}
            fill={colors.green}
            opacity={fadeIn(frame, c0 + 20)}
          />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e15stack">
              <circle cx={T.x} cy={T.y} r={300} />
            </clipPath>
          </defs>
          <g clipPath="url(#e15stack)">
            <Stack a={0.8} b={0.6} scr={scr} range={8} />
          </g>
          <g opacity={grow > 0.05 ? 1 : 0}>
            <Arrow
              from={T}
              to={{ x: T.x + 260 * 0.8 * grow, y: T.y - 260 * 0.6 * grow }}
              width={16}
            />
          </g>
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 800,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
