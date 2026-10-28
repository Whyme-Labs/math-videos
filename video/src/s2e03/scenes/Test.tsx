import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The linearity test, acted out. Left: u and v are added, then the sum is
// turned a quarter turn. Right: u and v are each turned, then added. Both
// tips land on the same spot, and a ✓ pops. Then five machine cards: turn,
// shadow, d/dx and shift each get a ✓; square gets a red ✗ with
// (1 + 1)² = 4 ≠ 2.

const U = { x: 150, y: -40 };
const V = { x: 40, y: -130 };
const rot = (p: { x: number; y: number }, t: number) => {
  const a = (-Math.PI / 2) * t; // screen y is down, so −90° turns anticlockwise
  return {
    x: p.x * Math.cos(a) - p.y * Math.sin(a),
    y: p.x * Math.sin(a) + p.y * Math.cos(a),
  };
};

export const Test: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("test");
  const [c0, c1] = cues;
  const addL = glide(frame, c0 + 20, fps, 16);
  const turnL = glide(frame, c0 + 50, fps, 24);
  const turnR = glide(frame, c0 + 90, fps, 24);
  const addR = glide(frame, c0 + 126, fps, 16);
  const same = Math.min(1, springIn(frame, c0 + 150, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const cardAt = (k: number) => c1 + 16 + k * 22;
  const fail = frame >= cardAt(4) + 14;

  const L = { x: 560, y: 560 };
  const R = { x: 1360, y: 560 };
  const sum = { x: U.x + V.x, y: U.y + V.y };
  const sumL = rot({ x: sum.x * addL, y: sum.y * addL }, turnL);
  const uR = rot(U, turnR);
  const vR = rot(V, turnR);

  return (
    <SceneShell id="test">
      <Sfx name="pluck1" at={c0 + 20} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 50} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 90} volume={0.12} />
      <Sfx name="pluck3" at={c0 + 126} volume={0.14} />
      <Sfx name="ding" at={c0 + 150} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name={PLUCKS[k]} at={cardAt(k) + 14} volume={0.14} />
      ))}
      <Sfx name="thud" at={cardAt(4) + 14} volume={0.34} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* add, then turn */}
          <g opacity={1 - 0.7 * turnL}>
            <Arrow from={L} to={{ x: L.x + U.x, y: L.y + U.y }} width={10} />
            <Arrow
              from={{ x: L.x + U.x, y: L.y + U.y }}
              to={{ x: L.x + sum.x, y: L.y + sum.y }}
              color={colors.orange}
              width={10}
            />
          </g>
          <Arrow
            from={L}
            to={{ x: L.x + sumL.x, y: L.y + sumL.y }}
            color={colors.highlight}
            width={14}
          />
          {/* turn, then add */}
          <Arrow from={R} to={{ x: R.x + uR.x, y: R.y + uR.y }} width={10} />
          <Arrow
            from={{ x: R.x + uR.x * addR, y: R.y + uR.y * addR }}
            to={{ x: R.x + uR.x * addR + vR.x, y: R.y + uR.y * addR + vR.y }}
            color={colors.orange}
            width={10}
          />
          <Arrow
            from={R}
            to={{
              x: R.x + rot(sum, 1).x * addR,
              y: R.y + rot(sum, 1).y * addR,
            }}
            color={colors.highlight}
            width={14}
            opacity={addR}
          />
          {[
            { x: L.x, t: tx.addThenTurn },
            { x: R.x, t: tx.turnThenAdd },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={760}
              fill={colors.text}
              fontSize={46}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, c0 + 10)}
            >
              {l.t}
            </text>
          ))}
          <g opacity={same} transform={`translate(960 330) scale(${same})`}>
            <text
              y={30}
              fill={colors.green}
              fontSize={120}
              textAnchor="middle"
              fontWeight={900}
            >
              =
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* five machines */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {tx.machines.map((m, k) => {
            const s = Math.min(1, springIn(frame, cardAt(k), fps, 10));
            const bad = k === 4;
            const x = 300 + k * 330;
            return (
              <g
                key={m}
                opacity={s}
                transform={`translate(${x + (bad && fail ? shake(frame, cardAt(4) + 14, 12) : 0)} 440) scale(${s})`}
              >
                <rect
                  x={-140}
                  y={-120}
                  width={280}
                  height={240}
                  rx={26}
                  fill={colors.wood}
                  stroke={bad && fail ? colors.red : colors.ink}
                  strokeWidth={6}
                />
                <text
                  y={-20}
                  fill={colors.ink}
                  fontSize={k === 2 ? 64 : 48}
                  textAnchor="middle"
                  fontFamily={k === 2 ? fonts.math : fonts.title}
                  fontWeight={900}
                >
                  {m}
                </text>
                <text
                  y={80}
                  fill={bad ? colors.red : colors.green}
                  fontSize={84}
                  textAnchor="middle"
                  fontWeight={900}
                  opacity={fadeIn(frame, cardAt(k) + 14, 6)}
                >
                  {bad ? "✗" : "✓"}
                </text>
              </g>
            );
          })}
          <text
            x={1620}
            y={680}
            fill={colors.red}
            fontSize={50}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fail ? fadeIn(frame, cardAt(4) + 20) : 0}
          >
            (1 + 1)² = 4 ≠ 2
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
