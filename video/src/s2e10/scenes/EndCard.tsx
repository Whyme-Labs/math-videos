import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: the ⊗ funnel feeding a one-slot linear machine, with a tensor node
// beside it showing off its lemon and orange legs. Teaser for exterior
// algebra: two arrows span a shaded parallelogram with a curved orientation
// arrow; the arrows swap places, the orientation flips and the shading
// turns from lemon to red: swap the inputs, the sign flips.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const funnel = Math.min(1, springIn(frame, c0 + 10, fps, 10));
  const node = Math.min(1, springIn(frame, c0 + 40, fps, 10));
  const swap = glide(frame, c1 + 40, fps, 30);
  const O = { x: 1300, y: 640 };
  const u = { x: lerp(260, 80, swap), y: lerp(-60, -240, swap) };
  const v = { x: lerp(80, 260, swap), y: lerp(-240, -60, swap) };
  const neg = swap > 0.5;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} volume={0.16} />
      <Sfx name="pop" at={c0 + 40} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 80} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g opacity={funnel} transform={`translate(700 420) scale(${funnel})`}>
            <path
              d="M -200 -160 L 200 -160 L 50 60 L 50 160 L -50 160 L -50 60 Z"
              fill={alpha(colors.primary, 0.15)}
              stroke={colors.primary}
              strokeWidth={8}
            />
            <text
              y={-30}
              fill={colors.primary}
              fontSize={100}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              ⊗
            </text>
          </g>
          <g opacity={node} transform={`translate(1240 420) scale(${node})`}>
            {[-2.2, -0.9, 1.6].map((a, k) => (
              <line
                key={k}
                x1={0}
                y1={0}
                x2={160 * Math.cos(a + frame * 0.01)}
                y2={160 * Math.sin(a + frame * 0.01)}
                stroke={k < 2 ? colors.primary : colors.orange}
                strokeWidth={14}
                strokeLinecap="round"
              />
            ))}
            <circle r={40} fill={colors.primary} />
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <polygon
            points={`${O.x},${O.y} ${O.x + u.x},${O.y + u.y} ${O.x + u.x + v.x},${O.y + u.y + v.y} ${O.x + v.x},${O.y + v.y}`}
            fill={alpha(neg ? colors.red : colors.primary, 0.3)}
            stroke={neg ? colors.red : colors.primary}
            strokeWidth={4}
          />
          <Arrow from={O} to={{ x: O.x + u.x, y: O.y + u.y }} width={12} />
          <Arrow
            from={O}
            to={{ x: O.x + v.x, y: O.y + v.y }}
            width={12}
            color={colors.highlight}
          />
          <path
            d={
              neg
                ? `M ${O.x + 90} ${O.y - 150} A 90 90 0 0 1 ${O.x + 150} ${O.y - 70}`
                : `M ${O.x + 150} ${O.y - 70} A 90 90 0 0 0 ${O.x + 90} ${O.y - 150}`
            }
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          <text
            x={O.x + 400}
            y={O.y - 120}
            fill={neg ? colors.red : colors.primary}
            fontSize={90}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            {neg ? "−" : "+"}
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
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
