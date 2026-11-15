import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Mat } from "../components/draw";
import { useStrings } from "../i18n";

// Recap: the character table of S₃ above the quarter-turn matrix (c0);
// the three slogans, ρ(gh) = ρ(g)ρ(h), V = V₁ ⊕ V₂ ⊕ ⋯ and χ = tr ρ (c1).
// Teaser for Fourier: a point going round the circle, and the waves
// e^(inθ) for n = 1, 2, 3 (c2).

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
          {[
            [1, 1, 1],
            [1, -1, 1],
            [2, 0, -1],
          ].map((r, i) =>
            r.map((v, j) => (
              <text
                key={`${i}-${j}`}
                x={260 + j * 150}
                y={330 + i * 100}
                textAnchor="middle"
                fill={[colors.primary, colors.orange, colors.highlight][i]}
                fontSize={56}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {String(v).replace("-", "−")}
              </text>
            )),
          )}
          <Mat
            x={180}
            y={600}
            rows={[
              [0, -1],
              [1, 0],
            ]}
            cw={100}
            rh={64}
            size={44}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 900,
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
          <span style={{ color: colors.primary }}>ρ(gh) = ρ(g) ρ(h)</span>
          <span style={{ color: colors.green }}>V = V₁ ⊕ V₂ ⊕ ⋯</span>
          <span style={{ color: colors.highlight }}>χ(g) = tr ρ(g)</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <circle
            cx={1450}
            cy={380}
            r={150}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <circle
            cx={1450 + 150 * Math.cos(frame * 0.05)}
            cy={380 - 150 * Math.sin(frame * 0.05)}
            r={16}
            fill={colors.primary}
          />
          {[1, 2, 3].map((k) => (
            <path
              key={k}
              d={Array.from({ length: 121 }, (_, i) => {
                const x = 1200 + (500 * i) / 120;
                const y =
                  640 +
                  40 * Math.sin((k * 2 * Math.PI * i) / 120 - frame * 0.05 * k);
                return `${i ? "L" : "M"} ${x} ${y}`;
              }).join(" ")}
              fill="none"
              stroke={[colors.primary, colors.highlight, colors.green][k - 1]}
              strokeWidth={4}
              opacity={0.8}
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
