import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// Two systems that fail the rules. First, the whole numbers as a path of
// stepping stones ending in a cliff at 0. She hops +3, from 1 to 4. Undo it
// from 1 instead (−3) and she jumps off the edge; then the path grows to the
// left (episode 6) and she lands on −2. Second, subtraction as piles of
// blocks: (5 − 3) − 1 leaves one block, 5 − (3 − 1) leaves three.

const LINE_Y = 600;
const ZERO_X = 560;
const STEP = 130;
const at = (n: number) => ZERO_X + n * STEP;

const Pile: React.FC<{
  readonly x: number;
  readonly n: number;
  readonly gone: number;
  readonly color: string;
}> = ({ x, n, gone, color }) => (
  <g>
    {Array.from({ length: n }).map((_, k) => {
      const out = k >= n - gone;
      return (
        <rect
          key={k}
          x={x - 50}
          y={760 - (k + 1) * 64}
          width={100}
          height={58}
          rx={10}
          fill={out ? alpha(color, 0.15) : color}
          stroke={out ? alpha(colors.ink, 0.3) : colors.ink}
          strokeWidth={4}
          strokeDasharray={out ? "10 8" : undefined}
        />
      );
    })}
  </g>
);

export const Fails: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fails");
  const [c0, c1] = cues;
  // the hops: 1 → 4, back to 1, then 1 → −2 (falls), then the path grows
  const h1 = glide(frame, c0 + 10, fps, 16);
  const h2 = glide(frame, c0 + 36, fps, 16);
  const h3 = glide(frame, c0 + 62, fps, 18);
  const grow = glide(frame, c0 + 110, fps, 24);
  const fall =
    frame >= c0 + 80 && grow < 1 ? Math.min(1, (frame - c0 - 80) / 20) : 0;
  const rescued = glide(frame, c0 + 130, fps, 14);
  let pos = { x: at(1), y: LINE_Y };
  if (frame < c0 + 36) pos = hop(h1, at(1), LINE_Y, at(4), LINE_Y, 120);
  else if (frame < c0 + 62) pos = hop(h2, at(4), LINE_Y, at(1), LINE_Y, 120);
  else pos = hop(h3, at(1), LINE_Y, at(-2), LINE_Y, 120);
  const fallY = lerp(0, 500, fall * fall) * (1 - rescued);
  const part1 = fadeOut(frame, c1, 10);
  // subtraction
  const sub = (k: number) => glide(frame, c1 + 20 + k * 22, fps, 12);

  return (
    <SceneShell id="fails">
      <Sfx name="pluck1" at={c0 + 10} volume={0.14} />
      <Sfx name="pluck3" at={c0 + 36} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 62} volume={0.16} />
      <Sfx name="scratch" at={c0 + 82} volume={0.3} />
      <Sfx name="pop" at={c0 + 110} volume={0.16} />
      <Sfx name="ding" at={c0 + 134} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="clink" at={c1 + 20 + k * 22} volume={0.16} />
      ))}
      <Sfx name="thud" at={c1 + 120} volume={0.3} />

      {/* the whole numbers, a path ending in a cliff */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* the ground: from 0 rightwards, then growing to the left */}
          <rect
            x={lerp(ZERO_X - 60, at(-4) - 60, grow)}
            y={LINE_Y}
            width={1920}
            height={400}
            fill={alpha(colors.violet, 0.7)}
          />
          <line
            x1={lerp(ZERO_X - 60, at(-4) - 60, grow)}
            y1={LINE_Y}
            x2={1920}
            y2={LINE_Y}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {Array.from({ length: 15 }).map((_, k) => {
            const n = k - 4;
            const show =
              n >= 0 ? 1 : glide(frame, c0 + 110 + (-n - 1) * 4, fps, 10);
            return (
              <g key={n} opacity={show}>
                <rect
                  x={at(n) - 46}
                  y={LINE_Y - 10}
                  width={92}
                  height={20}
                  rx={8}
                  fill={n < 0 ? colors.green : colors.primary}
                />
                <text
                  x={at(n)}
                  y={LINE_Y + 70}
                  fill={n < 0 ? colors.green : colors.text}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {n < 0 ? `−${-n}` : n}
                </text>
              </g>
            );
          })}
          {/* hop labels */}
          <text
            x={at(2.5)}
            y={LINE_Y - 230}
            fill={colors.text}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 10) * fadeOut(frame, c0 + 60, 8)}
          >
            + 3
          </text>
          <text
            x={at(-0.5)}
            y={LINE_Y - 230}
            fill={colors.red}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 62) * fadeOut(frame, c0 + 130, 8)}
          >
            − 3
          </text>
          <Person
            x={pos.x}
            y={pos.y + fallY}
            color={colors.highlight}
            size={1.1}
            bob={frame / 3}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c0 + 84) * fadeOut(frame, c0 + 112, 8),
          }}
        >
          {tx.noNegatives}
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 120),
            translate: riseIn(frame, c0 + 120, 16),
          }}
        >
          {tx.integers}
        </div>
      </AbsoluteFill>

      {/* subtraction: grouping changes the answer */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* (5 − 3) − 1 */}
          <Pile
            x={560}
            n={5}
            gone={Math.round(3 * sub(0)) + Math.round(sub(1))}
            color={colors.primary}
          />
          <text
            x={560}
            y={300 - 80}
            fill={colors.text}
            fontSize={60}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
          >
            (5 − 3) − 1
          </text>
          {/* 5 − (3 − 1) */}
          <Pile
            x={1360}
            n={5}
            gone={sub(3) >= 0.5 ? 2 : 0}
            color={colors.orange}
          />
          <g opacity={fadeIn(frame, c1 + 60, 6) * fadeOut(frame, c1 + 92, 6)}>
            <Pile
              x={1560}
              n={3}
              gone={Math.round(sub(2))}
              color={colors.green}
            />
          </g>
          <text
            x={1360}
            y={300 - 80}
            fill={colors.text}
            fontSize={60}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
          >
            5 − (3 − 1)
          </text>
          {/* the results */}
          <g opacity={fadeIn(frame, c1 + 110)}>
            <text
              x={960}
              y={560}
              fill={colors.red}
              fontSize={140}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
              transform={`scale(${Math.min(1, springIn(frame, c1 + 120, fps, 9))})`}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              ≠
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
