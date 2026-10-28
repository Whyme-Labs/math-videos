import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Letter } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The letter, and what came of it: Galois's letter lies on the table; in
// 1846 Liouville's journal drops onto it and opens. Then the teaser for
// Season 2: two lemon arrows add tip to tail, the sum stretches to twice
// its length, and "Season 2" arrives.

const O = { x: 1060, y: 640 };
const U = { x: 260, y: -60 };
const V = { x: 90, y: -220 };

const Arrow: React.FC<{
  readonly from: { x: number; y: number };
  readonly to: { x: number; y: number };
  readonly color: string;
  readonly opacity?: number;
}> = ({ from, to, color, opacity = 1 }) => {
  const a = Math.atan2(to.y - from.y, to.x - from.x);
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  if (len < 2) return null;
  return (
    <g opacity={opacity}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x - 30 * Math.cos(a)}
        y2={to.y - 30 * Math.sin(a)}
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <polygon
        points={`${to.x},${to.y} ${to.x - 40 * Math.cos(a) + 22 * Math.sin(a)},${to.y - 40 * Math.sin(a) - 22 * Math.cos(a)} ${to.x - 40 * Math.cos(a) - 22 * Math.sin(a)},${to.y - 40 * Math.sin(a) + 22 * Math.cos(a)}`}
        fill={color}
      />
    </g>
  );
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const journal = glide(frame, c0 + 50, fps, 16);
  const open = glide(frame, c0 + 90, fps, 14);
  const part1 = fadeOut(frame, c1, 10);
  const u = glide(frame, c1 + 14, fps, 16);
  const v = glide(frame, c1 + 34, fps, 16);
  const sum = glide(frame, c1 + 58, fps, 16);
  const scale = lerp(1, 1.6, glide(frame, c1 + 84, fps, 18));
  const tipU = { x: O.x + U.x * u, y: O.y + U.y * u };
  const tipUV = { x: O.x + U.x + V.x * v, y: O.y + U.y + V.y * v };
  const S = { x: (U.x + V.x) * scale, y: (U.y + V.y) * scale };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="page" at={c0 + 10} volume={0.16} />
      <Sfx name="thud" at={c0 + 64} volume={0.3} />
      <Sfx name="page" at={c0 + 90} volume={0.18} />
      <Sfx name="pluck1" at={c1 + 14} volume={0.16} />
      <Sfx name="pluck3" at={c1 + 34} volume={0.16} />
      <Sfx name="ding" at={c1 + 58} />
      <Sfx name="whoosh" at={c1 + 84} volume={0.14} />
      <Sfx name="sparkle" at={c1 + 120} />

      {/* the letter, and the journal that printed it */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g opacity={fadeIn(frame, c0 + 4)}>
            <Letter x={760} y={500} rot={-6} scale={1.8} open={1} />
          </g>
          <g
            opacity={journal}
            transform={`translate(${lerp(1500, 1120, journal)} ${lerp(200, 470, journal)}) rotate(${lerp(20, 4, journal)})`}
          >
            <rect
              x={-210 - 200 * open}
              y={-270}
              width={420 + 200 * open}
              height={540}
              rx={12}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <rect
              x={-170}
              y={-220}
              width={340}
              height={120}
              fill={alpha(colors.wood, 0.85)}
            />
            <text
              x={0}
              y={-150}
              fill={colors.paper}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              1846
            </text>
            {Array.from({ length: 6 }).map((_, k) => (
              <line
                key={k}
                x1={-170}
                y1={-40 + k * 50}
                x2={170 - (k % 2) * 60}
                y2={-40 + k * 50}
                stroke={alpha(colors.ink, 0.5)}
                strokeWidth={6}
                strokeLinecap="round"
              />
            ))}
            <text
              x={0}
              y={250}
              fill={colors.ink}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={700}
            >
              GALOIS
            </text>
          </g>
          <text
            x={960}
            y={150}
            fill={colors.primary}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 70)}
          >
            {tx.journal}
          </text>
        </svg>
      </AbsoluteFill>

      {/* Season 2: add and scale */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <circle cx={O.x} cy={O.y} r={12} fill={colors.paper} />
          <Arrow
            from={O}
            to={tipU}
            color={colors.primary}
            opacity={1 - 0.5 * sum}
          />
          <Arrow
            from={{ x: O.x + U.x, y: O.y + U.y }}
            to={tipUV}
            color={colors.primary}
            opacity={v > 0 ? 1 - 0.5 * sum : 0}
          />
          <Arrow
            from={O}
            to={{ x: O.x + S.x * sum, y: O.y + S.y * sum }}
            color={colors.orange}
          />
          <text
            x={O.x + S.x + 40}
            y={O.y + S.y}
            fill={colors.orange}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 90)}
          >
            × 1.6
          </text>
          <text
            x={1440}
            y={760}
            fill={colors.primary}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={Math.min(1, springIn(frame, c1 + 110, fps, 10))}
          >
            {tx.seasonTwo}
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 48,
              color: colors.muted,
              maxWidth: 760,
              opacity: fadeIn(frame, c1 + 110),
              translate: riseIn(frame, c1 + 110),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 130) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
