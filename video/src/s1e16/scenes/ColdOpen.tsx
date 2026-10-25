import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Clock, CubeFace, Tile } from "../components/props";
import { useStrings } from "../i18n";

// The game. A square tile sits in its outline on the table; she stands on
// one side, her friend on the other. Her eyes close (the frame goes dark
// from top and bottom), the friend lifts the tile, turns it, drops it back.
// Eyes open: it looks exactly the same. Around it, ghost tiles show the
// candidates: four turns, then four flips, eight in all. Then the tile
// slides aside for a clock jumping five hours and a Rubik's face twisting,
// and the three of them point at one question.

const TILE = { x: 960, y: 470 };
// the eight moves: rotations by 0/90/180/270, flips across four axes
const MOVES = [
  { rot: 90 },
  { rot: 180 },
  { rot: 270 },
  { rot: 0 },
  { axis: 45 },
  { axis: -45 },
  { axis: 0 },
  { axis: 90 },
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  // eyes close, the friend acts, eyes open
  const lids = glide(frame, c0 + 26, fps, 10) * (1 - glide(frame, c1, fps, 10));
  const reach =
    glide(frame, c0 + 30, fps, 14) * (1 - glide(frame, c0 + 80, fps, 14));
  const lift =
    glide(frame, c0 + 44, fps, 10) * (1 - glide(frame, c0 + 74, fps, 8));
  const turn = glide(frame, c0 + 54, fps, 16);
  // ghosts: rotations from c1, flips from c2; each loops its move
  const ghostAt = (k: number) =>
    k < 4 ? c1 + 20 + k * 8 : c2 + 10 + (k - 4) * 8;
  const loopT = (k: number) => {
    const t = (frame - ghostAt(k) - 10) / 40;
    return t < 0 ? 0 : Math.min(1, (t % 1.5) * 1.4);
  };
  const ring = (k: number) => {
    const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
    return { x: TILE.x + 560 * Math.cos(a), y: TILE.y + 290 * Math.sin(a) };
  };
  const ghosts = fadeOut(frame, c3, 10);
  // other worlds
  const aside = glide(frame, c3 + 4, fps, 20);
  const clockPos = 2 + 5 * Math.min(3, Math.max(0, frame - c3 - 30) / 20);
  const twist = Math.max(0, (frame - c3 - 40) / 14);
  const count = typed(tx.scrambles, frame, c3 + 50, fps, 40);
  const ask = Math.min(1, springIn(frame, c4 + 10, fps, 10));
  const camZoom = lerp(lerp(1.1, 1, glide(frame, c0, fps, 40)), 1, aside);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 26} volume={0.14} />
      <Sfx name="pluck2" at={c0 + 54} volume={0.12} />
      <Sfx name="thud" at={c0 + 76} volume={0.25} />
      <Sfx name="whoosh" at={c1} volume={0.12} />
      {MOVES.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k % 6]} at={ghostAt(k)} volume={0.12} />
      ))}
      <Sfx name="ding" at={c2 + 50} volume={0.2} />
      <Sfx name="whoosh" at={c3 + 4} volume={0.14} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`c${k}`} name="tick" at={c3 + 30 + k * 20} volume={0.16} />
      ))}
      <Sfx name="pop" at={c4 + 10} volume={0.2} />
      <Sfx name="chime" at={c4 + 30} />

      <Camera zoom={camZoom} x={0} y={0}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the table and the two players */}
          <g opacity={1 - aside}>
            <rect
              x={600}
              y={200}
              width={720}
              height={540}
              rx={30}
              fill={alpha(colors.wood, 0.55)}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <Person
              x={330}
              y={830}
              opacity={1 - fadeIn(frame, c1 + 10, 10)}
              color={colors.highlight}
              size={2.2}
              facing={1}
              bob={frame / 20}
            />
            <Person
              x={lerp(1640, 1420, reach)}
              y={830}
              opacity={1 - fadeIn(frame, c1 + 10, 10)}
              color={colors.orange}
              size={2.2}
              facing={-1}
              bob={reach > 0 && reach < 1 ? frame / 3 : frame / 20 + 1}
            />
          </g>
          {/* the tile, lifted, turned and put back */}
          {(() => {
            const p = hop(aside, TILE.x, TILE.y, 420, 470, 60);
            return (
              <Tile
                x={p.x}
                y={p.y - 40 * lift}
                size={lerp(340, 260, aside)}
                rot={
                  90 * turn +
                  90 * Math.min(1, Math.max(0, (frame - c3 - 30) / 12))
                }
                labels={false}
                outline={aside < 0.5}
              />
            );
          })()}
          {/* the eight candidates */}
          <g opacity={ghosts}>
            {MOVES.map((m, k) => {
              const p = ring(k);
              const s = Math.min(1, springIn(frame, ghostAt(k), fps, 10));
              const t = loopT(k);
              return (
                <g key={k} opacity={s}>
                  <Tile
                    x={p.x}
                    y={p.y}
                    size={130 * s}
                    rot={(m.rot ?? 0) * t}
                    flip={m.axis !== undefined ? t : 0}
                    axis={m.axis ?? 45}
                    labels
                  />
                </g>
              );
            })}
          </g>
          {/* other worlds with the same game */}
          <g opacity={fadeIn(frame, c3 + 10, 12)}>
            <Clock x={960} y={470} pos={clockPos} r={170} />
            <text
              x={960}
              y={700}
              fill={colors.text}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
              opacity={fadeIn(frame, c3 + 30)}
            >
              + 5
            </text>
            <CubeFace x={1500} y={470} s={1.1} twist={twist} />
            <text
              x={1500}
              y={700}
              fill={colors.text}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              {count}
            </text>
          </g>
          {/* one question for all three */}
          <g opacity={ask}>
            {[420, 960, 1500].map((x) => (
              <line
                key={x}
                x1={x}
                y1={260}
                x2={lerp(x, 960, 0.75)}
                y2={170}
                stroke={colors.primary}
                strokeWidth={6}
                strokeLinecap="round"
              />
            ))}
            <g transform={`translate(960 130) scale(${ask})`}>
              <rect
                x={-240}
                y={-50}
                width={480}
                height={100}
                rx={22}
                fill={colors.highlight}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <text
                x={0}
                y={18}
                fill={colors.ink}
                fontSize={52}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={800}
              >
                {tx.sameRules}
              </text>
            </g>
          </g>
        </svg>
      </Camera>

      {/* eyelids */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 560 * lids,
            backgroundColor: colors.ink,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 560 * lids,
            backgroundColor: colors.ink,
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 10) * fadeOut(frame, c2 + 40, 10),
          translate: riseIn(frame, c1 + 10, 16),
        }}
      >
        {tx.which}
      </div>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 50) * fadeOut(frame, c3, 10),
          scale: lerp(1.3, 1, Math.min(1, springIn(frame, c2 + 50, fps, 10))),
        }}
      >
        {tx.eight}
      </div>
    </SceneShell>
  );
};
