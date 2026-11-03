import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: a circle breathing into an ellipse and back along two
// perpendicular axes that slowly turn (c0); the axes peel off one by
// one, lighting in turn (c1). Teaser for the SVD: a circle with a marked
// radius goes through turn, stretch, turn, and comes out an ellipse whose
// marked radius is no longer on an axis (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const br = 0.5 + 0.5 * Math.sin((frame - c0) * 0.06);
  const rot = 20 + (frame - c0) * 0.3;
  const a = lerp(220, 320, br);
  const b = lerp(220, 130, br);
  const lit = (k: number) => (frame >= c1 + 10 + k * 30 ? 1 : 0.35);
  const C = { x: 960, y: 450 };
  // SVD teaser: three stages
  const s1 = glide(frame, c2 + 20, fps, 24);
  const s2 = glide(frame, c2 + 50, fps, 24);
  const s3 = glide(frame, c2 + 80, fps, 24);
  const T = { x: 1520, y: 420 };
  const ang1 = -40 * s1;
  const sx = lerp(1, 1.5, s2);
  const sy = lerp(1, 0.55, s2);
  const ang2 = 65 * s3;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck1" at={c1 + 10} volume={0.14} />
      <Sfx name="pluck3" at={c1 + 40} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 50} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 80} volume={0.1} />
      <Sfx name="sparkle" at={c2 + 110} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${C.x} ${C.y}) rotate(${-rot})`}>
            <circle
              r={220}
              fill="none"
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={4}
              strokeDasharray="12 10"
            />
            <ellipse
              rx={a}
              ry={b}
              fill={alpha(colors.primary, 0.08)}
              stroke={colors.primary}
              strokeWidth={7}
            />
            <line
              x1={0}
              y1={0}
              x2={a}
              y2={0}
              stroke={colors.green}
              strokeWidth={10}
              opacity={lit(0)}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-b}
              stroke={colors.highlight}
              strokeWidth={10}
              opacity={lit(1)}
              strokeLinecap="round"
            />
            <path
              d="M 36 0 L 36 -36 L 0 -36"
              fill="none"
              stroke={colors.text}
              strokeWidth={4}
            />
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${T.x} ${T.y}) rotate(${-ang2}) scale(${sx} ${sy}) rotate(${-ang1})`}
          >
            <circle
              r={170}
              fill={alpha(colors.primary, 0.08)}
              stroke={colors.primary}
              strokeWidth={6 / Math.sqrt(sx * sy)}
            />
            <line
              x1={0}
              y1={0}
              x2={170}
              y2={0}
              stroke={colors.highlight}
              strokeWidth={8}
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
