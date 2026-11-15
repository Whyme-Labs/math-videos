import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the chain D ⊂ L² ⊂ D′ with δ in the outer ring (c0). The season's
// thirty-three episodes as a row of dots lighting up (c1). Teaser for
// Season 3: ℚ(√2) as a plane, with basis arrows 1 and √2 (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const lit = Math.min(33, Math.max(0, Math.floor((frame - c1 - 6) / 2)));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="riser" at={c1 + 6} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 80,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: colors.green }}>D</span> ⊂{" "}
          <span style={{ color: colors.primary }}>L²</span> ⊂{" "}
          <span style={{ color: colors.orange }}>D′</span>
          <span style={{ color: colors.highlight }}> ∋ δ</span>
        </div>
        <svg width={1920} height={1080}>
          {Array.from({ length: 33 }, (_, k) => (
            <circle
              key={k}
              cx={320 + k * 40}
              cy={560}
              r={k < lit ? 13 : 9}
              fill={k < lit ? colors.primary : alpha(colors.paper, 0.25)}
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
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <line
            x1={1250}
            y1={780}
            x2={1250}
            y2={220}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <line
            x1={1250}
            y1={620}
            x2={1450}
            y2={620}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <line
            x1={1250}
            y1={620}
            x2={1250}
            y2={337}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <circle cx={1450 + 0.5 * 0} cy={337} r={12} fill={colors.green} />
          <text
            x={1440}
            y={670}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1
          </text>
          <text
            x={1270}
            y={330}
            fill={colors.orange}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            √2
          </text>
          <text
            x={1470}
            y={330}
            fill={colors.green}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1 + √2
          </text>
          <text
            x={1500}
            y={760}
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℚ(√2)
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
