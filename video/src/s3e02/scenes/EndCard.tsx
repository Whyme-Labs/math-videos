import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  fadeIn,
  fadeOut,
  progress,
  riseIn,
} from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock, Mat } from "../components/draw";
import { useStrings } from "../i18n";

// Recap: the clocks of ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12 above a Jordan block (c0); the
// three slogans, torsion, d₁ | d₂ | ⋯ | dₖ and p ↔ x − λ (c1). Teaser for
// representations: a square turning a quarter turn above its matrix (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Clock cx={300} cy={330} r={60} n={2} dot={12} />
          <Clock cx={500} cy={330} r={80} n={6} dot={12} />
          <Clock cx={730} cy={330} r={100} n={12} dot={12} />
          <Mat
            x={360}
            y={520}
            rows={[
              [2, 1, 0],
              [0, 2, 1],
              [0, 0, 2],
            ]}
            cw={90}
            rh={70}
            size={44}
            cell={(i, j) =>
              i === j ? colors.green : j === i + 1 ? colors.orange : undefined
            }
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 980,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c1 + 6),
          }}
        >
          <span style={{ color: colors.red }}>2 · 1 = 0 in ℤ/2</span>
          <span style={{ color: colors.green }}>d₁ | d₂ | ⋯ | dₖ</span>
          <span style={{ color: colors.highlight }}>p ↔ x − λ</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g
            transform={`rotate(${-90 * progress(frame, c2 + 20, 40)} 1450 380)`}
          >
            <rect
              x={1310}
              y={240}
              width={280}
              height={280}
              fill={alpha(colors.primary, 0.12)}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <circle cx={1310} cy={240} r={16} fill={colors.highlight} />
          </g>
          <Mat
            x={1340}
            y={600}
            rows={[
              [0, -1],
              [1, 0],
            ]}
            cw={110}
            rh={70}
            size={46}
          />
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
