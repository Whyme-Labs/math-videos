import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《大戴礼记·明堂》: "二九四，七五三，六一八", the 洛书.
// Three bamboo slips, then the nine numbers drop into a 3×3 grid. Rows,
// columns and diagonals light up one at a time, each summing to 15. Then the
// grid turns and flips like the tile, and eight copies fan out around it,
// every one still a magic square: the square's eight moves, again.

const GRID = [
  [2, 9, 4],
  [7, 5, 3],
  [6, 1, 8],
];
const LINES: [number, number][][] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
const MOVES = [
  { rot: 0, flip: 0, axis: 0 },
  { rot: 90, flip: 0, axis: 0 },
  { rot: 180, flip: 0, axis: 0 },
  { rot: 270, flip: 0, axis: 0 },
  { rot: 0, flip: 1, axis: 0 },
  { rot: 0, flip: 1, axis: 90 },
  { rot: 0, flip: 1, axis: 45 },
  { rot: 0, flip: 1, axis: -45 },
];

const Square: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly cell: number;
  readonly rot?: number;
  readonly flip?: number;
  readonly axis?: number;
  readonly lit?: [number, number][];
  readonly shown?: (r: number, c: number) => number;
}> = ({
  x,
  y,
  cell,
  rot = 0,
  flip = 0,
  axis = 0,
  lit = [],
  shown = () => 1,
}) => {
  const sq = Math.cos(Math.PI * flip);
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${-rot}) rotate(${-axis}) scale(1 ${sq}) rotate(${axis})`}
    >
      {GRID.map((row, r) =>
        row.map((v, c) => {
          const on = lit.some(([a, b]) => a === r && b === c);
          return (
            <g key={`${r}${c}`} opacity={shown(r, c)}>
              <rect
                x={(c - 1.5) * cell}
                y={(r - 1.5) * cell}
                width={cell}
                height={cell}
                fill={on ? colors.highlight : colors.paper}
                stroke={colors.ink}
                strokeWidth={Math.max(2, cell / 30)}
              />
              <g
                transform={`translate(${(c - 1) * cell} ${(r - 1) * cell}) rotate(${-axis}) scale(1 ${sq < 0 ? -1 : 1}) rotate(${axis}) rotate(${rot})`}
              >
                <text
                  x={0}
                  y={cell * 0.2}
                  fill={colors.ink}
                  fontSize={cell * 0.55}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {v}
                </text>
              </g>
            </g>
          );
        }),
      )}
    </g>
  );
};

export const Luoshu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("luoshu");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 6 + i * 10;
  const numAt = (r: number, c: number) => c0 + 46 + (r * 3 + c) * 4;
  const lineAt = (k: number) => c1 + 6 + k * 9;
  const litK = Math.floor((frame - c1 - 6) / 9);
  const lit = frame >= c1 + 6 && litK < 8 ? LINES[litK] : [];
  const turn = glide(frame, c2 + 6, fps, 16);
  const flip = glide(frame, c2 + 26, fps, 16);
  const fan = (k: number) =>
    Math.min(1, springIn(frame, c2 + 50 + k * 5, fps, 10));
  const slips = fadeOut(frame, c0 + 50, 12);
  const quote = tx.luoshuQuote.split("，");

  return (
    <SceneShell id="luoshu">
      {quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      {GRID.flat().map((_, k) => (
        <Sfx key={`n${k}`} name="tick" at={c0 + 46 + k * 4} volume={0.08} />
      ))}
      {LINES.map((_, k) => (
        <Sfx key={`l${k}`} name={PLUCKS[k % 6]} at={lineAt(k)} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 26} volume={0.14} />
      <Sfx name="chime" at={c2 + 90} />

      {/* the slips, each one row of the square */}
      <AbsoluteFill style={{ opacity: slips }}>
        <svg width={1920} height={1080}>
          {quote.map((q, i) => {
            const t = glide(frame, slipAt(i), fps, 14);
            const x = 1100 - i * 160;
            return (
              <g
                key={q}
                opacity={t}
                transform={`translate(0 ${lerp(-60, 0, t)})`}
              >
                <rect
                  x={x}
                  y={160}
                  width={120}
                  height={520}
                  rx={14}
                  fill={colors.wood}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                {[...q].map((ch, j) => (
                  <text
                    key={j}
                    x={x + 60}
                    y={290 + j * 120}
                    fill={colors.ink}
                    fontSize={80}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                  >
                    {ch}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
        }}
      >
        {tx.luoshuSource}
      </div>

      {/* the square */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c0 + 40, 10) }}>
        <svg width={1920} height={1080}>
          <Square
            x={960}
            y={480}
            cell={lerp(150, 110, fan(0))}
            rot={90 * turn}
            flip={flip}
            axis={45}
            lit={lit}
            shown={(r, c) => fadeIn(frame, numAt(r, c), 6)}
          />
          {/* the sum, as each line lights */}
          {frame >= c1 + 6 && litK < 8 ? (
            <text
              x={1380}
              y={500}
              fill={colors.highlight}
              fontSize={90}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, lineAt(litK), 4)}
            >
              = 15
            </text>
          ) : null}
          {/* eight copies, every one still magic */}
          {MOVES.map((m, k) => {
            const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
            const s = fan(k);
            return (
              <g key={k} opacity={s}>
                <Square
                  x={960 + 600 * Math.cos(a) * s}
                  y={480 + 300 * Math.sin(a) * s}
                  cell={34}
                  rot={m.rot}
                  flip={m.flip}
                  axis={m.axis}
                />
                <text
                  x={960 + 600 * Math.cos(a) * s + 70}
                  y={480 + 300 * Math.sin(a) * s - 40}
                  fill={colors.green}
                  fontSize={36}
                  fontWeight={800}
                >
                  ✓
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
