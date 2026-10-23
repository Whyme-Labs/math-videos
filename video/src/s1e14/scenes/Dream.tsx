import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Bag,
  Cup,
  Desk,
  DESK_Y,
  Letter,
  Person,
  Saucer,
  Shoe,
  Star,
} from "../components/study";
import { useStrings } from "../i18n";

// Frege's dream. He tosses away a book of number axioms and keeps only the
// symbols of logic. Then the matching from episode 11: five cups hop onto
// five saucers, none left over: as many, and nobody counted. The camera
// pulls back: pairs of everything (cups, shoes, stars, people, letters) fly
// into one enormous bag, and the bag is the number 2.

const SAUCER_X = (k: number) => 640 + k * 170;
const LOGIC = ["∀", "∃", "¬", "⇒", "∧", "∨"];

type Pair = {
  el: (x: number, y: number) => React.ReactNode;
  from: [number, number];
  to: [number, number];
};
const PAIRS: Pair[] = [
  {
    el: (x, y) => <Cup x={x} y={y} s={0.8} />,
    from: [-200, 300],
    to: [820, 760],
  },
  {
    el: (x, y) => <Shoe x={x} y={y} s={0.8} />,
    from: [2100, 260],
    to: [1120, 760],
  },
  {
    el: (x, y) => <Star x={x} y={y} s={0.9} />,
    from: [960, -200],
    to: [960, 620],
  },
  {
    el: (x, y) => <Person x={x} y={y} color={colors.green} size={0.5} />,
    from: [-200, 900],
    to: [760, 600],
  },
  {
    el: (x, y) => <Letter x={x} y={y - 30} scale={0.35} />,
    from: [2100, 900],
    to: [1180, 600],
  },
  {
    el: (x, y) => <Saucer x={x} y={y} s={0.8} />,
    from: [2100, -100],
    to: [960, 820],
  },
];

export const Dream: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("dream");
  const [c0, c1, c2] = cues;
  // part 1: away with the book, keep the logic
  const toss = glide(frame, c0 + 16, fps, 24);
  const book = hop(toss, 520, 600, 2200, 200, 360);
  const part1 = fadeOut(frame, c1, 10);
  // part 2: cups onto saucers
  const cupAt = (k: number) => c1 + 10 + k * 10;
  const matched = frame >= cupAt(4) + 14;
  // part 3: every pair into one bag
  const pull = glide(frame, c2, fps, 30);
  const pairAt = (k: number) => c2 + 16 + k * 9;
  const swell =
    1 + 0.04 * PAIRS.filter((_, k) => frame >= pairAt(k) + 16).length;

  return (
    <SceneShell id="dream">
      <Sfx name="whoosh" at={c0 + 16} volume={0.18} />
      {LOGIC.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={c0 + 40 + k * 5} volume={0.12} />
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={`c${k}`} name="clink" at={cupAt(k) + 12} volume={0.2} />
      ))}
      <Sfx name="ding" at={cupAt(4) + 16} />
      <Sfx name="whoosh" at={c2} volume={0.16} />
      {PAIRS.map((_, k) => (
        <Sfx key={`p${k}`} name="pop" at={pairAt(k) + 14} volume={0.14} />
      ))}
      <Sfx name="chime" at={pairAt(5) + 24} />

      {/* part 1: only logic */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Person
            x={420}
            color={colors.orange}
            beard
            size={1.5}
            bob={toss > 0 && toss < 1 ? frame / 3 : 0}
          />
          <g transform={`translate(${book.x} ${book.y}) rotate(${toss * 540})`}>
            <rect
              x={-90}
              y={-120}
              width={180}
              height={240}
              rx={12}
              fill={colors.violet}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <text
              x={0}
              y={-30}
              fill={colors.primary}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              1, 2, 3
            </text>
            <text
              x={0}
              y={30}
              fill={colors.paper}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              axioms
            </text>
          </g>
          {LOGIC.map((l, k) => {
            const a = Math.PI * (0.15 + (0.7 * k) / (LOGIC.length - 1));
            const s = Math.min(1, springIn(frame, c0 + 40 + k * 5, fps, 10));
            return (
              <text
                key={l}
                x={1150 - 430 * Math.cos(a) * s}
                y={760 - 420 * Math.sin(a) * s}
                fill={colors.primary}
                fontSize={110}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
                opacity={s}
              >
                {l}
              </text>
            );
          })}
          <text
            x={1150}
            y={720}
            fill={colors.text}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 70)}
          >
            {tx.onlyLogic}
          </text>
        </svg>
      </AbsoluteFill>

      {/* parts 2 and 3: the table, then the bag of all pairs */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <Camera
          zoom={lerp(1.15, 0.62, pull)}
          x={lerp(0, 0, pull)}
          y={lerp(-40, 160, pull)}
        >
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <g opacity={fadeOut(frame, c2, 12)}>
              <Desk x={480} w={1000} />
              {[0, 1, 2, 3, 4].map((k) => (
                <Saucer key={k} x={SAUCER_X(k)} y={DESK_Y} />
              ))}
              {[0, 1, 2, 3, 4].map((k) => {
                const t = glide(frame, cupAt(k), fps, 12);
                const p = hop(
                  t,
                  240 + k * 40,
                  900,
                  SAUCER_X(k),
                  DESK_Y - 6,
                  220,
                );
                return (
                  <Cup
                    key={k}
                    x={p.x}
                    y={p.y}
                    color={matched ? alpha(colors.green, 0.9) : colors.paper}
                  />
                );
              })}
              {/* matched: one line per pair, nothing left over */}
              {[0, 1, 2, 3, 4].map((k) => (
                <line
                  key={`m${k}`}
                  x1={SAUCER_X(k)}
                  y1={DESK_Y + 20}
                  x2={SAUCER_X(k)}
                  y2={DESK_Y + 70}
                  stroke={colors.green}
                  strokeWidth={6}
                  opacity={matched ? fadeIn(frame, cupAt(4) + 14, 8) : 0}
                />
              ))}
              <text
                x={960}
                y={DESK_Y + 150}
                fill={colors.green}
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={800}
                opacity={
                  matched
                    ? fadeIn(frame, cupAt(4) + 16) * fadeOut(frame, c2, 10)
                    : 0
                }
              >
                {tx.asMany}
              </text>
            </g>
            {/* the bag that is the number 2 */}
            <g opacity={fadeIn(frame, c2 + 6, 12)}>
              <Bag
                x={960}
                y={1020}
                w={900 * swell}
                h={620 * swell}
                label="2"
                color={colors.violet}
              />
            </g>
            {PAIRS.map((p, k) => {
              const t = glide(frame, pairAt(k), fps, 16);
              const x = lerp(p.from[0], p.to[0], t);
              const y = lerp(p.from[1], p.to[1], t);
              return (
                <g key={k} opacity={fadeIn(frame, pairAt(k), 4)}>
                  {p.el(x - 50, y)}
                  {p.el(x + 50, y)}
                </g>
              );
            })}
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 80,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 72,
            fontWeight: 700,
            color: colors.primary,
            opacity: fadeIn(frame, pairAt(5) + 20),
            translate: riseIn(frame, pairAt(5) + 20, 16),
          }}
        >
          2 = {"{"} {tx.everyPair} {"}"}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
