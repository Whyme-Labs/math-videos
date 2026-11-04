import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { ballPath, longLine } from "../components/draw";
import { useStrings } from "../i18n";

// Recap: a supporting line rocking on the corner of the ℓ¹ diamond
// (extension), a vector with its norming tangent on a disc, and a line
// slid between a convex blob and a point (c0–c1). Teaser for the Big
// Three: three pillars rise, labelled (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const rock = Math.sin((frame - c0) * 0.06);
  const slide = glide(frame, c1 + 8, fps, 24);
  const pillars = [0, 1, 2].map((i) => glide(frame, c2 + 10 + i * 10, fps, 20));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.14} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="thud" at={c2 + 14 + i * 10} volume={0.14} />
      ))}
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="ec-a">
              <rect x={160} y={200} width={480} height={480} rx={20} />
            </clipPath>
            <clipPath id="ec-b">
              <rect x={720} y={200} width={480} height={480} rx={20} />
            </clipPath>
            <clipPath id="ec-c">
              <rect x={1280} y={200} width={480} height={480} rx={20} />
            </clipPath>
          </defs>
          {[160, 720, 1280].map((x) => (
            <rect
              key={x}
              x={x}
              y={200}
              width={480}
              height={480}
              rx={20}
              fill={alpha(colors.paper, 0.05)}
              stroke={alpha(colors.paper, 0.25)}
              strokeWidth={3}
            />
          ))}
          <path
            d={ballPath(1, 400, 440, 150)}
            fill={alpha(colors.primary, 0.2)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={longLine(550, 440, -rock, -1)}
            stroke={colors.green}
            strokeWidth={6}
            clipPath="url(#ec-a)"
          />
          <g opacity={fadeIn(frame, c0 + 10, 8)}>
            <circle
              cx={960}
              cy={440}
              r={150}
              fill={alpha(colors.primary, 0.2)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <line
              x1={960}
              y1={440}
              x2={960 + 106}
              y2={440 - 106}
              stroke={colors.highlight}
              strokeWidth={7}
            />
            <path
              d={longLine(1066, 334, 1, 1)}
              stroke={colors.orange}
              strokeWidth={6}
              clipPath="url(#ec-b)"
            />
          </g>
          <g opacity={fadeIn(frame, c1 + 4, 8)}>
            <ellipse
              cx={1450}
              cy={480}
              rx={110}
              ry={80}
              fill={alpha(colors.primary, 0.3)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <circle cx={1660} cy={330} r={14} fill={colors.highlight} />
            <path
              d={longLine(lerp(1760, 1580, slide), 400, 1, 1.4)}
              stroke={colors.orange}
              strokeWidth={6}
              clipPath="url(#ec-c)"
            />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1040}
            y1={720}
            x2={1780}
            y2={720}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={6}
          />
          {pillars.map((g, i) => (
            <rect
              key={i}
              x={1080 + i * 240}
              y={720 - 380 * g}
              width={170}
              height={380 * g}
              rx={10}
              fill={[colors.primary, colors.orange, colors.green][i]}
              opacity={0.85}
            />
          ))}
        </svg>
        {tx.bigThree.map((label, i) => (
          <div
            key={label}
            style={{
              position: "absolute",
              top: 740,
              left: 1040 + i * 240,
              width: 250,
              textAlign: "center",
              fontSize: 30,
              fontWeight: 700,
              color: colors.text,
              opacity: fadeIn(frame, c2 + 30 + i * 10),
            }}
          >
            {label}
          </div>
        ))}
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 820,
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
