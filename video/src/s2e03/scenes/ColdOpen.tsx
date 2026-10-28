import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Desk, DESK_Y, Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. London, 1821: Babbage and Herschel at a desk with an open book
// of tables. Errors flash red in the columns, one after another. Babbage
// jumps up with a bubble: "by steam!" Then an engine of stacked number
// wheels and a crank rises where the book was; the crank turns and the
// wheels tick on, adding.

const BOOK = { x: 780, y: 170, w: 920, h: 460 };
const ROWS = 8;
const ERRORS = [2, 5, 7, 3, 6];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const errAt = (k: number) => c0 + 40 + k * 22;
  const jump = glide(frame, c1 + 4, fps, 12);
  const bubble = Math.min(1, springIn(frame, c1 + 14, fps, 10));
  const part1 = fadeOut(frame, c2, 12);
  const engine = glide(frame, c2 + 10, fps, 24);
  const crank = ramp(frame, c2 + 50, 200) * 720;
  const word = Math.min(1, springIn(frame, c3 + 20, fps, 10));

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.16} />
      {ERRORS.map((_, k) => (
        <Sfx key={k} name="scratch" at={errAt(k)} volume={0.16} />
      ))}
      <Sfx name="thud" at={c1 + 4} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.14} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`c${k}`} name="clink" at={c2 + 50 + k * 25} volume={0.1} />
      ))}
      <Sfx name="chime" at={c3 + 20} />

      <Camera zoom={lerp(1, 1.06, ramp(frame, c0, c3 - c0 + 120))}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <Desk x={100} w={620} />
          <Person
            x={300}
            y={860 - 60 * jump}
            color={colors.orange}
            size={2.1}
            facing={1}
          />
          <Person x={560} y={860} color={colors.paper} size={1.9} facing={-1} />
          <text
            x={300}
            y={320 - 60 * jump}
            fill={colors.orange}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * part1}
          >
            {tx.babbage}
          </text>
          <text
            x={560}
            y={360}
            fill={colors.paper}
            fontSize={36}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 26) * part1}
          >
            {tx.herschel}
          </text>
          {/* the book of tables */}
          <g opacity={part1}>
            <rect
              x={BOOK.x}
              y={BOOK.y}
              width={BOOK.w}
              height={BOOK.h}
              rx={10}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <line
              x1={BOOK.x + BOOK.w / 2}
              y1={BOOK.y}
              x2={BOOK.x + BOOK.w / 2}
              y2={BOOK.y + BOOK.h}
              stroke={alpha(colors.ink, 0.4)}
              strokeWidth={4}
            />
            {Array.from({ length: ROWS * 2 }).map((_, i) => {
              const col = Math.floor(i / ROWS);
              const row = i % ROWS;
              const err = ERRORS.findIndex((e) => e === row && e % 2 === col);
              const bad = err >= 0 && frame >= errAt(err);
              return (
                <text
                  key={i}
                  x={BOOK.x + 60 + col * (BOOK.w / 2)}
                  y={BOOK.y + 70 + row * 50}
                  fill={bad ? colors.red : colors.ink}
                  fontSize={32}
                  fontFamily={fonts.mono}
                  fontWeight={700}
                  transform={
                    bad
                      ? `translate(${shake(frame, errAt(err), 6)} 0)`
                      : undefined
                  }
                >
                  {String(((i * 7919 + 1234) % 90000) + 10000).replace(
                    /(\d{2})(\d{3})/,
                    "$1.$2",
                  )}
                  {"  "}
                  {String(((i * 104729) % 9000) + 1000)}
                </text>
              );
            })}
            {ERRORS.map((e, k) => (
              <circle
                key={k}
                cx={BOOK.x + 160 + (e % 2) * (BOOK.w / 2)}
                cy={BOOK.y + 60 + e * 50}
                transform={`translate(0 ${-10})`}
                r={46}
                fill="none"
                stroke={colors.red}
                strokeWidth={6}
                opacity={fadeIn(frame, errAt(k), 4)}
              />
            ))}
          </g>
          {/* by steam! */}
          <g
            opacity={bubble * part1}
            transform={`translate(420 ${260 - 60 * jump}) scale(${bubble})`}
          >
            <ellipse
              rx={190}
              ry={70}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={16}
              fill={colors.ink}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.steam}
            </text>
          </g>
          {/* the engine: columns of number wheels and a crank */}
          <g
            opacity={engine}
            transform={`translate(0 ${lerp(200, 0, engine)})`}
          >
            <rect
              x={860}
              y={200}
              width={760}
              height={440}
              rx={20}
              fill={alpha(colors.wood, 0.25)}
              stroke={colors.wood}
              strokeWidth={8}
            />
            {[0, 1, 2].map((c) =>
              [0, 1, 2, 3].map((r) => {
                const digit = Math.floor((crank / 90 + c * 3 + r * 7) % 10);
                return (
                  <g key={`${c}${r}`}>
                    <rect
                      x={940 + c * 220}
                      y={240 + r * 96}
                      width={140}
                      height={76}
                      rx={14}
                      fill={colors.paper}
                      stroke={colors.ink}
                      strokeWidth={4}
                    />
                    <text
                      x={1010 + c * 220}
                      y={292 + r * 96}
                      fill={colors.ink}
                      fontSize={48}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                      fontWeight={800}
                    >
                      {digit}
                    </text>
                  </g>
                );
              }),
            )}
            <g transform={`translate(1680 420) rotate(${crank})`}>
              <line
                x1={0}
                y1={0}
                x2={90}
                y2={0}
                stroke={colors.muted}
                strokeWidth={14}
                strokeLinecap="round"
              />
              <circle cx={90} cy={0} r={18} fill={colors.primary} />
              <circle r={16} fill={colors.ink} />
            </g>
          </g>
          <g
            opacity={word}
            transform={`translate(1240 ${DESK_Y + 120}) scale(${word})`}
          >
            <text
              y={0}
              fill={colors.primary}
              fontSize={84}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              T(u + v) = Tu + Tv
            </text>
          </g>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.london}
      </div>
    </SceneShell>
  );
};
