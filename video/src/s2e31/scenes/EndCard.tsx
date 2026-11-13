import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: three spectra side by side, the shift's disk, the band [0, 1] of
// multiplication by x, and a row of isolated dots (c0). The dots light up:
// eigenvalues, the discrete special case (c1). Teaser for measure-
// preserving systems: points on a circle turning by a fixed angle and
// filling it evenly (c2).

const PANELS = [360, 960, 1560];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const lit = fadeIn(frame, c1 + 6, 10);
  const steps = Math.min(240, Math.max(0, Math.floor((frame - c2 - 6) / 1.2)));
  const turn = 2 * Math.PI * ((Math.sqrt(5) - 1) / 2);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {PANELS.map((_, i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="ding" at={c1 + 8} volume={0.2} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {PANELS.map((cx, i) => (
            <g key={cx} opacity={fadeIn(frame, c0 + 6 + i * 10, 8)}>
              <line
                x1={cx - 230}
                y1={420}
                x2={cx + 230}
                y2={420}
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={2}
              />
              <line
                x1={cx}
                y1={200}
                x2={cx}
                y2={640}
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={2}
              />
              {i === 0 && (
                <circle
                  cx={cx}
                  cy={420}
                  r={170}
                  fill={alpha(colors.orange, 0.55)}
                  stroke={colors.orange}
                  strokeWidth={4}
                />
              )}
              {i === 1 && (
                <rect
                  x={cx}
                  y={406}
                  width={190}
                  height={28}
                  rx={14}
                  fill={colors.green}
                />
              )}
              {i === 2 &&
                [-0.8, -0.3, 0.2, 0.55, 0.85].map((t) => (
                  <circle
                    key={t}
                    cx={cx + 200 * t}
                    cy={420}
                    r={13 + 6 * lit}
                    fill={lit > 0.5 ? colors.highlight : colors.red}
                  />
                ))}
              <text
                x={cx}
                y={720}
                textAnchor="middle"
                fill={i === 2 ? colors.highlight : colors.muted}
                fontSize={40}
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={i === 2 ? lit : 1}
              >
                {["σ(S)", "σ(Mₓ)", "σₚ"][i]}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <circle
            cx={1440}
            cy={440}
            r={240}
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: steps }, (_, j) => (
            <circle
              key={j}
              cx={1440 + 240 * Math.cos(j * turn)}
              cy={440 - 240 * Math.sin(j * turn)}
              r={j === steps - 1 ? 14 : 7}
              fill={j === steps - 1 ? colors.highlight : colors.primary}
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
