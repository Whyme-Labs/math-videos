import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the 4 × 4 DFT matrix as clock hands (c0); the three slogans,
// characters are homomorphisms, the transform is a measurement, and
// G ≅ (Ĝ)ˆ (c1). Teaser for manifolds: a turning globe with a tangent plane
// touching it at one point (c2).

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
          {Array.from({ length: 4 }, (_, j) =>
            Array.from({ length: 4 }, (_, k) => {
              const a = -(Math.PI / 2) * j * k;
              const cx = 260 + j * 110;
              const cy = 300 + k * 110;
              return (
                <g key={`${j}-${k}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={42}
                    fill="none"
                    stroke={alpha(colors.highlight, 0.6)}
                    strokeWidth={3}
                  />
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + 36 * Math.cos(a)}
                    y2={cy - 36 * Math.sin(a)}
                    stroke={colors.highlight}
                    strokeWidth={5}
                    strokeLinecap="round"
                  />
                </g>
              );
            }),
          )}
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
          <span style={{ color: colors.primary }}>χ(x + y) = χ(x) χ(y)</span>
          <span style={{ color: colors.green }}>f̂(χ) = Σ f(g) χ̄(g)</span>
          <span style={{ color: colors.highlight }}>G ≅ (Ĝ)ˆ</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }, (_, i) => {
            const lat = -Math.PI / 2 + ((i + 1) * Math.PI) / 8;
            return (
              <ellipse
                key={`a${i}`}
                cx={1450}
                cy={420 - 190 * Math.sin(lat)}
                rx={190 * Math.cos(lat)}
                ry={40 * Math.cos(lat)}
                fill="none"
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={2}
              />
            );
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const lon = (i * Math.PI) / 6 + frame * 0.01;
            return (
              <ellipse
                key={`o${i}`}
                cx={1450}
                cy={420}
                rx={Math.abs(190 * Math.cos(lon))}
                ry={190}
                fill="none"
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={2}
              />
            );
          })}
          <path
            d="M 1330 250 L 1640 220 L 1700 330 L 1390 360 Z"
            fill={alpha(colors.primary, 0.2)}
            stroke={colors.primary}
            strokeWidth={4}
          />
          <circle cx={1515} cy={290} r={10} fill={colors.primary} />
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
