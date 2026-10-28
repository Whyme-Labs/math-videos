import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Desk, DESK_Y, Person } from "../../s1e14/components/study";
import { Arrow } from "../components/vec";
import { useStrings } from "../i18n";

// The story. Stettin, 1844: Grassmann at the blackboard of his school. He
// chalks two arrows and their sum, and his book drops onto the desk. Then
// three things that all add and stretch fly out of it: arrows, forces on a
// weight, points. Nobody reads it: Möbius frowns over a copy, a university
// door swings shut, and a Rigveda label appears beside Grassmann. Then
// Peano, 1888: the rules shrink to a short list, stamped "vector space".

const BOARD = { x: 780, y: 110, w: 1000, h: 520 };
const O = { x: 980, y: 520 };
const U = { x: 300, y: -60 };
const V = { x: 120, y: -260 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;

  const u = glide(frame, c0 + 30, fps, 18);
  const v = glide(frame, c0 + 56, fps, 18);
  const sum = glide(frame, c0 + 84, fps, 18);
  const book = glide(frame, c0 + 110, fps, 16);
  const part1 = fadeOut(frame, c1, 10);
  const kinds = [0, 1, 2].map((k) => glide(frame, c1 + 14 + k * 30, fps, 22));
  const part2 = fadeOut(frame, c2, 10);
  const mobius = glide(frame, c2 + 6, fps, 18);
  const door = glide(frame, c2 + 70, fps, 12);
  const veda = Math.min(1, springIn(frame, c2 + 110, fps, 10));
  const part3 = fadeOut(frame, c3, 10);
  const listAt = (k: number) => c3 + 30 + k * 6;
  const stamp = glide(frame, c3 + 100, fps, 8);
  const bookPos = hop(book, 520, 120, 560, DESK_Y - 40, 120);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="scratch" at={c0 + 30} volume={0.18} />
      <Sfx name="scratch" at={c0 + 56} volume={0.18} />
      <Sfx name="ding" at={c0 + 100} volume={0.16} />
      <Sfx name="thud" at={c0 + 124} volume={0.3} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={c1 + 14 + k * 30} volume={0.16} />
      ))}
      <Sfx name="page" at={c2 + 6} volume={0.18} />
      <Sfx name="thud" at={c2 + 80} volume={0.4} />
      <Sfx name="pop" at={c2 + 110} volume={0.16} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`l${k}`} name="tick" at={listAt(k)} volume={0.08} />
      ))}
      <Sfx name="thud" at={c3 + 108} volume={0.45} />

      <Camera zoom={lerp(1, 1.05, ramp(frame, c0, c3 - c0 + 150))}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the classroom: board, desk, the teacher */}
          <rect
            x={BOARD.x}
            y={BOARD.y}
            width={BOARD.w}
            height={BOARD.h}
            rx={12}
            fill={alpha(colors.green, 0.22)}
            stroke={colors.wood}
            strokeWidth={14}
            opacity={1 - 0.75 * fadeIn(frame, c2, 10) * (1 - fadeIn(frame, c3, 10))}
          />
          <Desk x={120} w={620} />
          <Person
            x={360}
            y={860}
            color={colors.orange}
            size={2.2}
            beard
            facing={1}
            bob={frame < c1 ? frame / 7 : 0}
          />
          <text
            x={360}
            y={330}
            fill={colors.orange}
            fontSize={42}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.grassmann}
          </text>
          {/* the book */}
          <g
            opacity={book > 0 ? 1 : 0}
            transform={`translate(${bookPos.x} ${bookPos.y}) rotate(${lerp(-30, -4, book)})`}
          >
            <rect
              x={-160}
              y={-46}
              width={320}
              height={72}
              rx={6}
              fill={colors.violet}
              stroke={colors.primary}
              strokeWidth={4}
            />
            <text
              x={0}
              y={4}
              fill={colors.primary}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.book}
            </text>
          </g>

          {/* beat 1: two arrows and their sum, chalked */}
          <g opacity={part1}>
            <Arrow from={O} to={{ x: O.x + U.x * u, y: O.y + U.y * u }} />
            <Arrow
              from={{ x: O.x + U.x, y: O.y + U.y }}
              to={{ x: O.x + U.x + V.x * v, y: O.y + U.y + V.y * v }}
              opacity={v > 0 ? 1 : 0}
            />
            <Arrow
              from={O}
              to={{ x: O.x + (U.x + V.x) * sum, y: O.y + (U.y + V.y) * sum }}
              color={colors.highlight}
            />
          </g>

          {/* beat 2: anything that adds and stretches */}
          <g opacity={part2}>
            {/* arrows */}
            <g
              opacity={kinds[0]}
              transform={`translate(950 ${lerp(500, 380, kinds[0])})`}
            >
              <Arrow from={{ x: -80, y: 60 }} to={{ x: 40, y: -40 }} />
              <Arrow
                from={{ x: -80, y: 60 }}
                to={{ x: 160, y: -140 }}
                color={colors.orange}
                width={8}
                dashed
              />
            </g>
            {/* forces on a weight */}
            <g
              opacity={kinds[1]}
              transform={`translate(1280 ${lerp(500, 400, kinds[1])})`}
            >
              <rect
                x={-50}
                y={-50}
                width={100}
                height={100}
                rx={10}
                fill={colors.wood}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <Arrow
                from={{ x: 0, y: 0 }}
                to={{ x: -110, y: -160 }}
                color={colors.green}
              />
              <Arrow
                from={{ x: 0, y: 0 }}
                to={{ x: 130, y: -140 }}
                color={colors.green}
              />
            </g>
            {/* points, and a point between them */}
            <g
              opacity={kinds[2]}
              transform={`translate(1580 ${lerp(500, 400, kinds[2])})`}
            >
              {[
                { x: -70, y: 40 },
                { x: 70, y: -80 },
              ].map((p, k) => (
                <circle
                  key={k}
                  cx={p.x}
                  cy={p.y}
                  r={18}
                  fill={colors.highlight}
                />
              ))}
              <circle cx={0} cy={-20} r={14} fill={colors.primary} />
            </g>
          </g>

          {/* beat 3: nobody reads it */}
          <g opacity={part3}>
            <g
              opacity={mobius * part3}
              transform={`translate(${lerp(1900, 1480, mobius)} 0)`}
            >
              <Person x={0} y={860} color={colors.paper} size={2} facing={-1} />
              <text
                x={-110}
                y={420}
                fill={colors.highlight}
                fontSize={110}
                textAnchor="middle"
                fontWeight={900}
                opacity={fadeIn(frame, c2 + 30)}
              >
                ?
              </text>
              <text
                x={0}
                y={330}
                fill={colors.paper}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
                opacity={fadeIn(frame, c2 + 20)}
              >
                {tx.mobius}
              </text>
            </g>
            {/* the university door, swinging shut */}
            <g
              opacity={fadeIn(frame, c2 + 50) * part3}
              transform={`translate(${door >= 1 ? shake(frame, c2 + 80, 10) : 0} 0)`}
            >
              <rect
                x={960}
                y={200}
                width={260}
                height={400}
                rx={6}
                fill={alpha(colors.ink, 0.6)}
                stroke={colors.wood}
                strokeWidth={10}
              />
              <rect
                x={970}
                y={210}
                width={240 * lerp(0.25, 1, door)}
                height={380}
                fill={colors.wood}
              />
              <text
                x={1090}
                y={180}
                fill={colors.muted}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
              >
                {tx.university}
              </text>
            </g>
            <g
              opacity={veda * part3}
              transform={`translate(560 ${DESK_Y - 170}) scale(${veda})`}
            >
              <rect
                x={-150}
                y={-46}
                width={300}
                height={80}
                rx={16}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                y={8}
                fill={colors.ink}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={800}
              >
                {tx.sanskrit}
              </text>
            </g>
          </g>

          {/* beat 4: Peano's short list */}
          <g opacity={fadeIn(frame, c3 + 4, 10)}>
            <rect
              x={1000}
              y={150}
              width={560}
              height={460}
              rx={20}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={5}
            />
            {Array.from({ length: 8 }).map((_, k) => {
              const t = glide(frame, listAt(k), fps, 8);
              return (
                <g key={k}>
                  <text
                    x={1050}
                    y={222 + k * 50}
                    fill={colors.ink}
                    fontSize={34}
                    fontFamily={fonts.math}
                    fontWeight={800}
                    opacity={t}
                  >
                    {k + 1}.
                  </text>
                  <line
                    x1={1100}
                    y1={210 + k * 50}
                    x2={1100 + (300 + ((k * 53) % 100)) * t}
                    y2={210 + k * 50}
                    stroke={alpha(colors.ink, 0.6)}
                    strokeWidth={8}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
            <g
              opacity={stamp}
              transform={`translate(1280 ${lerp(250, 400, stamp)}) rotate(-8) scale(${lerp(1.8, 1, stamp)})`}
            >
              <rect
                x={-250}
                y={-60}
                width={500}
                height={110}
                rx={18}
                fill={alpha(colors.bg, 0.7)}
                stroke={colors.primary}
                strokeWidth={8}
              />
              <text
                y={18}
                fill={colors.primary}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={900}
              >
                {tx.vectorSpace}
              </text>
            </g>
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
        {tx.stettin}
      </div>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c3 + 4),
          translate: riseIn(frame, c3 + 4, 16),
        }}
      >
        {tx.peano}
      </div>
    </SceneShell>
  );
};
