import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the 2 × 2 grid of basis products beside the 𝔽₈ cube (c0); the
// three slogans, degrees multiply, |F| = pⁿ, N = det (c1). Teaser for
// modules: the integer lattice ℤ², where an arrow can be doubled but not
// halved (c2).

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
            ["1", "√3"],
            ["√2", "√6"],
          ].map((row, i) =>
            row.map((c, j) => (
              <g key={c}>
                <rect
                  x={300 + j * 200}
                  y={280 + i * 160}
                  width={180}
                  height={130}
                  rx={16}
                  fill={alpha(colors.paper, 0.08)}
                  stroke={colors.paper}
                  strokeWidth={3}
                />
                <text
                  x={390 + j * 200}
                  y={362 + i * 160}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={48}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {c}
                </text>
              </g>
            )),
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
          <span style={{ color: colors.primary }}>
            [M : K] = [M : L] · [L : K]
          </span>
          <span style={{ color: colors.green }}>|F| = pⁿ</span>
          <span style={{ color: colors.orange }}>
            N(α) = det m<sub style={{ fontSize: 30 }}>α</sub>
          </span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }, (_, i) =>
            Array.from({ length: 6 }, (_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={1180 + i * 90}
                cy={260 + j * 90}
                r={9}
                fill={alpha(colors.paper, 0.6)}
              />
            )),
          )}
          <line
            x1={1360}
            y1={530}
            x2={1540}
            y2={350}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={1360}
            y1={530}
            x2={1720}
            y2={170}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={5}
            strokeDasharray="10 8"
          />
          <circle
            cx={1450}
            cy={440}
            r={14}
            fill="none"
            stroke={colors.red}
            strokeWidth={4}
          />
          <text
            x={1470}
            y={470}
            fill={colors.red}
            fontSize={34}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ½ ?
          </text>
          <text
            x={1180}
            y={800}
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℤ²
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
