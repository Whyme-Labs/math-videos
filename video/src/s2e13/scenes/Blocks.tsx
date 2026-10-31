import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Jordan blocks. A 5 × 5 grid: a 3 × 3 block for λ = 2 and a 2 × 2 block
// for λ = 5, each tinted, eigenvalues down the diagonal, and the ones on
// the superdiagonal glowing orange ("the nudge"). Then each block becomes
// a ladder of rungs: pressing the nudge moves every rung down one step and
// the bottom rung falls off to 0, until the ladder is empty.

const BLOCKS = [
  { start: 0, size: 3, l: "2", c: colors.primary },
  { start: 3, size: 2, l: "5", c: colors.highlight },
];
const CELL = 100;
const X0 = 400;
const Y0 = 200;

export const Blocks: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("blocks");
  const [c0, c1] = cues;
  const blk = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 30, fps, 10));
  const nudge = fadeIn(frame, c0 + 90, 10);
  const part1 = fadeOut(frame, c1, 10);
  const press = (k: number) => glide(frame, c1 + 30 + k * 30, fps, 16);
  const presses = [0, 1, 2].reduce((t, k) => t + press(k), 0);

  return (
    <SceneShell id="blocks">
      <Sfx name="pop" at={c0 + 20} volume={0.16} />
      <Sfx name="pop" at={c0 + 50} volume={0.16} />
      <Sfx name="ding" at={c0 + 90} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="thud" at={c1 + 30 + k * 30} volume={0.22} />
      ))}

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {BLOCKS.map((b, k) => (
            <rect
              key={k}
              x={X0 + b.start * CELL - 6}
              y={Y0 + b.start * CELL - 6}
              width={b.size * CELL + 12}
              height={b.size * CELL + 12}
              rx={18}
              fill={alpha(b.c, 0.15)}
              stroke={b.c}
              strokeWidth={5}
              opacity={blk(k)}
            />
          ))}
          {Array.from({ length: 25 }).map((_, n) => {
            const i = Math.floor(n / 5);
            const j = n % 5;
            const b = BLOCKS.find((q) => i >= q.start && i < q.start + q.size);
            const inBlock = b && j >= b.start && j < b.start + b.size;
            const diag = i === j;
            const sup = inBlock && j === i + 1;
            const v = diag ? (b?.l ?? "0") : sup ? "1" : "0";
            return (
              <text
                key={n}
                x={X0 + j * CELL + CELL / 2}
                y={Y0 + i * CELL + CELL / 2 + 20}
                fill={
                  sup
                    ? colors.orange
                    : diag
                      ? (b?.c ?? colors.text)
                      : alpha(colors.text, 0.25)
                }
                fontSize={sup ? 64 : 56}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={sup ? nudge : 1}
              >
                {v}
              </text>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1040,
            fontSize: 52,
            fontWeight: 800,
            color: colors.orange,
            opacity: nudge,
            translate: riseIn(frame, c0 + 90, 12),
          }}
        >
          ↖ {tx.nudge}
        </div>
      </AbsoluteFill>

      {/* the ladders */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {BLOCKS.map((b, k) => {
            const x = 620 + k * 560;
            return (
              <g key={k}>
                <line
                  x1={x}
                  y1={220}
                  x2={x}
                  y2={720}
                  stroke={colors.wood}
                  strokeWidth={10}
                />
                <line
                  x1={x + 260}
                  y1={220}
                  x2={x + 260}
                  y2={720}
                  stroke={colors.wood}
                  strokeWidth={10}
                />
                {Array.from({ length: b.size }).map((_, r) => {
                  // rung r starts at the top and moves down one step per press
                  const level = r + presses;
                  const y = 280 + level * 140;
                  const fall = Math.max(0, Math.min(1, level - (b.size - 1)));
                  return (
                    <g key={r} opacity={1 - fall}>
                      <line
                        x1={x}
                        y1={Math.min(y, 760)}
                        x2={x + 260}
                        y2={Math.min(y, 760)}
                        stroke={b.c}
                        strokeWidth={14}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
                <text
                  x={x + 130}
                  y={800}
                  fill={colors.red}
                  fontSize={48}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  0
                </text>
                <text
                  x={x + 130}
                  y={190}
                  fill={b.c}
                  fontSize={52}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  λ = {b.l}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
