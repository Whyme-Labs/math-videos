import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: one map (a lemon blob in the middle) and two lights, each casting
// a matrix on its wall: [[2, 1], [1, 2]] on the left, diag(3, 1) on the
// right. Teaser for quotients: a sheet of parallel lines; each line slides
// together into a single dot, and the dots line up on a new line: gluing.

const MatCard: React.FC<{
  readonly x: number;
  readonly m: string[][];
  readonly s: number;
}> = ({ x, m, s }) => (
  <g opacity={s} transform={`translate(${x} 470) scale(${s})`}>
    <rect
      x={-170}
      y={-150}
      width={340}
      height={300}
      rx={24}
      fill={alpha(colors.violet, 0.9)}
      stroke={colors.primary}
      strokeWidth={5}
    />
    <path
      d="M -110 -100 l -20 0 l 0 200 l 20 0 M 110 -100 l 20 0 l 0 200 l -20 0"
      fill="none"
      stroke={colors.text}
      strokeWidth={5}
    />
    {m.map((r, i) =>
      r.map((v, j) => (
        <text
          key={`${i}${j}`}
          x={-50 + j * 100}
          y={-22 + i * 96}
          fill={colors.text}
          fontSize={56}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {v}
        </text>
      )),
    )}
  </g>
);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const left = Math.min(1, springIn(frame, c0 + 30, fps, 10));
  const right = Math.min(1, springIn(frame, c0 + 60, fps, 10));
  const glue = glide(frame, c1 + 20, fps, 40);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 30} volume={0.16} />
      <Sfx name="pop" at={c0 + 60} volume={0.16} />
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="sparkle" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* beams from the object to each wall */}
          <polygon
            points="960,470 660,330 660,610"
            fill={alpha(colors.primary, 0.12 * left)}
          />
          <polygon
            points="960,470 1260,330 1260,610"
            fill={alpha(colors.primary, 0.12 * right)}
          />
          <path
            d="M 900 420 Q 960 360 1030 430 Q 1060 500 990 540 Q 920 560 890 500 Q 870 450 900 420 Z"
            fill={colors.primary}
            stroke={colors.ink}
            strokeWidth={5}
            transform={`rotate(${frame * 0.8} 960 470)`}
          />
          <MatCard
            x={460}
            m={[
              ["2", "1"],
              ["1", "2"],
            ]}
            s={left}
          />
          <MatCard
            x={1460}
            m={[
              ["3", "0"],
              ["0", "1"],
            ]}
            s={right}
          />
        </svg>
      </AbsoluteFill>

      {/* teaser: gluing lines into points */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }).map((_, k) => {
            const x = 1060 + k * 100;
            return (
              <g key={k}>
                <line
                  x1={x - 120 * (1 - glue)}
                  y1={lerp(260, 470, glue)}
                  x2={x + 120 * (1 - glue)}
                  y2={lerp(680, 470, glue)}
                  stroke={k % 2 ? colors.orange : colors.primary}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <circle
                  cx={x}
                  cy={470}
                  r={14 * glue}
                  fill={k % 2 ? colors.orange : colors.primary}
                />
              </g>
            );
          })}
          <line
            x1={1000}
            y1={470}
            x2={1720}
            y2={470}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
            opacity={glue}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 80),
              translate: riseIn(frame, c1 + 80),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
