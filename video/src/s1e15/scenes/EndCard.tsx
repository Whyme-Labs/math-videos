import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Rulebook } from "../components/world";
import { useStrings } from "../i18n";

// A shelf of rulebooks, each a different choice of axioms. She walks along
// the shelf and takes one down. Then the teaser for E16: a square of paper
// that turns a quarter and flips, a clock hand that jumps five hours, and a
// Rubik's cube face whose top row twists, all moving to the same beat.

const BOOKS = ["ZFC", "ZFC + CH", "ZFC + ¬CH", "ZF + ¬AC"];
const bookX = (k: number) => 560 + k * 300;
const SHELF_Y = 560;
const CUBE = [
  colors.red,
  colors.highlight,
  colors.green,
  colors.primary,
  colors.orange,
  colors.paper,
];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const walk = glide(frame, c0 + 10, fps, 50);
  const take = glide(frame, c0 + 64, fps, 16);
  const part1 = fadeOut(frame, c1, 10);
  // the teaser moves, one every 20 frames
  const beat = (k: number) => glide(frame, c1 + 20 + k * 20, fps, 12);
  const turns = [0, 1, 2, 3].reduce((a, k) => a + beat(k), 0);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      <Sfx name="pop" at={c0 + 64} volume={0.2} />
      <Sfx name="chime" at={c0 + 80} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="clink" at={c1 + 20 + k * 20} volume={0.18} />
      ))}
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={360}
            y={SHELF_Y}
            width={1300}
            height={30}
            rx={6}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={4}
          />
          {BOOKS.map((b, k) => {
            const chosen = k === 2;
            const p = chosen
              ? hop(take, bookX(k), SHELF_Y, 1180, 380, 80)
              : { x: bookX(k), y: SHELF_Y };
            return (
              <Rulebook
                key={b}
                x={p.x}
                y={p.y}
                pages={3 + k}
                title={b}
                s={chosen ? lerp(1, 1.3, take) : 1}
                color={chosen ? colors.green : colors.violet}
              />
            );
          })}
          <Person
            x={lerp(260, 1000, walk)}
            y={830}
            color={colors.highlight}
            size={2}
            bob={walk > 0 && walk < 1 ? frame / 3 : 0}
            facing={1}
          />
        </svg>
      </AbsoluteFill>

      {/* the teaser: three things, one set of rules */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          {/* the square of paper: quarter turns, then a flip */}
          <g
            transform={`translate(1000 560) rotate(${90 * (beat(0) + beat(1) + beat(3))}) scale(${Math.cos(Math.PI * beat(2))} 1)`}
          >
            <rect
              x={-130}
              y={-130}
              width={260}
              height={260}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={6}
            />
            {[
              [-90, -90, "1"],
              [90, -90, "2"],
              [90, 90, "3"],
              [-90, 90, "4"],
            ].map(([x, y, l]) => (
              <text
                key={l}
                x={x}
                y={Number(y) + 14}
                fill={colors.ink}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
              >
                {l}
              </text>
            ))}
          </g>
          {/* the clock: +5 hours each beat */}
          <g transform="translate(1400 560)">
            <circle
              cx={0}
              cy={0}
              r={140}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={6}
            />
            {Array.from({ length: 12 }).map((_, k) => (
              <line
                key={k}
                x1={0}
                y1={-120}
                x2={0}
                y2={-104}
                stroke={colors.ink}
                strokeWidth={5}
                transform={`rotate(${k * 30})`}
              />
            ))}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-90}
              stroke={colors.red}
              strokeWidth={10}
              strokeLinecap="round"
              transform={`rotate(${150 * turns})`}
            />
            <circle cx={0} cy={0} r={12} fill={colors.ink} />
          </g>
          {/* the cube face: top row twists */}
          <g transform="translate(1720 560)">
            {Array.from({ length: 9 }).map((_, k) => {
              const r = Math.floor(k / 3);
              const c = k % 3;
              const shift = r === 0 ? Math.floor(turns) % 6 : 0;
              return (
                <rect
                  key={k}
                  x={-120 + c * 80}
                  y={-120 + r * 80}
                  width={74}
                  height={74}
                  rx={10}
                  fill={CUBE[(r * 2 + c + shift) % 6]}
                  stroke={colors.ink}
                  strokeWidth={4}
                  transform={
                    r === 0 ? `translate(${(turns % 1) * 80} 0)` : undefined
                  }
                />
              );
            })}
          </g>
        </svg>
        <AbsoluteFill
          style={{ top: 140, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 60),
              translate: riseIn(frame, c1 + 60),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
