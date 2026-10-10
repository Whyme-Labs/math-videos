import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { hop, ramp, springIn } from "../components/motion";
import { QuestionTray } from "../components/QuestionTray";
import { PLUCKS, Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const CELL = 84;
const BOARD = 5;
const BX = 1180; // board left
const BY = 200; // board top
const cell = (c: number, r: number) => ({
  x: BX + (c + 0.5) * CELL,
  y: BY + (r + 0.5) * CELL,
});
// All eight knight moves from the centre square.
const MOVES = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

export const BuildDescribe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("buildDescribe");
  const split = interpolate(frame, [cues[5] - 8, cues[5] + 4], [1, 0], clamp);

  // Build: three chisel strikes carve the knight out of a block.
  const strikes = [cues[1] + 8, cues[1] + 22, cues[1] + 36];
  const carved = strikes.filter((s) => frame >= s).length / strikes.length;
  // Describe: the eight legal moves light up, then the piece makes one.
  const movesLit = (k: number) =>
    springIn(frame, cues[2] + 10 + k * 4, fps, 10);
  // The knight jumps (2, 2) → (4, 1); later a bottle cap does the same jumps.
  const jump = (start: number, a: [number, number], b: [number, number]) => {
    const t = ramp(frame, start, 18);
    const p = hop(
      t,
      cell(a[0], a[1]).x,
      cell(a[0], a[1]).y,
      cell(b[0], b[1]).x,
      cell(b[0], b[1]).y,
      110,
    );
    const squash =
      t >= 1
        ? 1 -
          0.25 *
            Math.exp(-(frame - start - 18) / 3) *
            Math.cos((frame - start - 18) / 2)
        : 1;
    return { ...p, squash, t };
  };
  const knightJump = jump(cues[3] + 20, [2, 2], [4, 1]);
  const capIn = springIn(frame, cues[4], fps, 10);
  const cap1 = jump(cues[4] + 22, [2, 2], [4, 1]);
  const cap2 = jump(cues[4] + 52, [4, 1], [3, 3]);
  const capPos = frame < cues[4] + 52 ? cap1 : cap2;

  // Numbers: Peano chain (describe) vs nested sets (build).
  const n0 = cues[5] + 14;
  const chain = ["0", "S(0)", "S(S(0))", "S(S(S(0)))"];
  const doll = (k: number) => springIn(frame, n0 + 6 + k * 18, fps, 12);
  const verdict = springIn(frame, cues[6], fps, 12);

  return (
    <SceneShell id="buildDescribe">
      <Sfx name="whoosh" at={4} volume={0.18} />
      {strikes.map((s) => (
        <Sfx key={s} name="thud" at={s} volume={0.35} />
      ))}
      <Sfx name="page" at={cues[2]} />
      {[0, 2, 4, 6].map((k) => (
        <Sfx key={k} name="tick" at={cues[2] + 10 + k * 4} />
      ))}
      <Sfx name="whoosh" at={cues[3] + 20} volume={0.16} />
      <Sfx name="clink" at={cues[3] + 38} volume={0.25} />
      <Sfx name="pop" at={cues[4]} />
      <Sfx name="clink" at={cues[4] + 40} volume={0.25} />
      <Sfx name="clink" at={cues[4] + 70} volume={0.25} />
      {chain.map((c, i) => (
        <Sfx key={c} name={PLUCKS[i + 1]} at={n0 + i * 18} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="page" at={n0 + 6 + k * 18} volume={0.25} />
      ))}
      <Sfx name="chime" at={cues[6]} />
      <QuestionTray />

      {/* Opening: the two words collide, then split the stage. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(
            frame,
            [cues[1] - 6, cues[1] + 6],
            [1, 0],
            clamp,
          ),
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 40,
            fontFamily: fonts.title,
            fontSize: 110,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              color: colors.wood,
              translate: `${(1 - springIn(frame, 2, fps, 11)) * -900}px 0px`,
            }}
          >
            BUILD
          </span>
          <span style={{ color: colors.muted, opacity: ramp(frame, 14, 8) }}>
            or
          </span>
          <span
            style={{
              color: colors.primary,
              translate: `${(1 - springIn(frame, 2, fps, 11)) * 900}px 0px`,
            }}
          >
            DESCRIBE
          </span>
        </div>
      </AbsoluteFill>

      {/* Chess: build (carve) on the left, describe (moves) on the right. */}
      <AbsoluteFill
        style={{ opacity: Math.min(ramp(frame, cues[1] - 4, 10), split) }}
      >
        <div
          style={{
            position: "absolute",
            left: 300,
            top: 112,
            fontSize: 48,
            fontWeight: 700,
            color: colors.wood,
            letterSpacing: 4,
          }}
        >
          BUILD
        </div>
        <div
          style={{
            position: "absolute",
            left: 230,
            top: 175,
            fontSize: 32,
            color: colors.muted,
          }}
        >
          what it’s made of
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* The block, shrinking with each strike; the knight shows through. */}
          <text
            x={430}
            y={560}
            fill={colors.wood}
            fontSize={300}
            textAnchor="middle"
            fontFamily='"DejaVu Sans", serif'
          >
            ♞
          </text>
          <rect
            x={300 - 20 * (1 - carved)}
            y={280 - 20 * (1 - carved)}
            width={260 + 40 * (1 - carved)}
            height={320 + 40 * (1 - carved)}
            rx={20}
            fill={colors.wood}
            opacity={1 - carved}
          />
          {strikes.map((s, k) =>
            Array.from({ length: 6 }, (_, c) => {
              const t = ramp(frame, s, 16);
              if (t <= 0 || t >= 1) return null;
              const a = (c / 6) * Math.PI * 2 + k;
              return (
                <rect
                  key={`${k}-${c}`}
                  x={430 + Math.cos(a) * 200 * t}
                  y={440 + Math.sin(a) * 160 * t + 200 * t * t}
                  width={14}
                  height={9}
                  fill={colors.wood}
                  opacity={1 - t}
                  rotate={`${t * 360}deg`}
                />
              );
            }),
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 1290,
            top: 112,
            fontSize: 48,
            fontWeight: 700,
            color: colors.primary,
            letterSpacing: 4,
            opacity: ramp(frame, cues[2], 8),
          }}
        >
          DESCRIBE
        </div>
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: ramp(frame, cues[2], 10) }}
        >
          {Array.from({ length: BOARD * BOARD }, (_, k) => {
            const c = k % BOARD;
            const r = Math.floor(k / BOARD);
            return (
              <rect
                key={k}
                x={BX + c * CELL}
                y={BY + r * CELL}
                width={CELL}
                height={CELL}
                fill={(c + r) % 2 ? "#4b1f86" : "#ffe9a8"}
              />
            );
          })}
          {MOVES.map(([dc, dr], k) => {
            const p = cell(2 + dc, 2 + dr);
            const s = movesLit(k);
            return (
              <g key={k}>
                <line
                  x1={cell(2, 2).x}
                  y1={cell(2, 2).y}
                  x2={cell(2, 2).x + (p.x - cell(2, 2).x) * Math.min(1, s)}
                  y2={cell(2, 2).y + (p.y - cell(2, 2).y) * Math.min(1, s)}
                  stroke={alpha(colors.orange, 0.7)}
                  strokeWidth={4}
                />
                <circle cx={p.x} cy={p.y} r={14 * s} fill={colors.orange} />
              </g>
            );
          })}
          {/* The wooden knight jumps; then a bottle cap jumps exactly the same way. */}
          {frame < cues[4] ? (
            <text
              x={knightJump.x}
              y={knightJump.y + 26}
              fill={colors.wood}
              fontSize={70}
              textAnchor="middle"
              fontFamily='"DejaVu Sans", serif'
              opacity={ramp(frame, cues[2] + 4, 8)}
              style={{
                transformOrigin: `${knightJump.x}px ${knightJump.y + 30}px`,
                scale: `1 ${knightJump.squash}`,
              }}
            >
              ♞
            </text>
          ) : (
            <g
              style={{
                transformOrigin: `${capPos.x}px ${capPos.y + 28}px`,
                scale: `${(2 - capPos.squash) * capIn} ${capPos.squash * capIn}`,
              }}
            >
              <circle
                cx={capPos.x}
                cy={capPos.y}
                r={30}
                fill="#c0392b"
                stroke="#ecf0f1"
                strokeWidth={4}
                strokeDasharray="5 4"
              />
            </g>
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            left: BX,
            width: CELL * BOARD,
            top: BY + CELL * BOARD + 20,
            textAlign: "center",
            fontSize: 32,
            color: colors.highlight,
            opacity: ramp(frame, cues[4] + 30, 10),
          }}
        >
          still a knight
        </div>
      </AbsoluteFill>

      {/* Numbers: describe = a chain of "next"; build = sets nested like dolls. */}
      <AbsoluteFill style={{ opacity: 1 - split }}>
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 110,
            fontSize: 44,
            fontWeight: 700,
            color: colors.primary,
            letterSpacing: 4,
          }}
        >
          DESCRIBE ℕ
        </div>
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 170,
            fontSize: 30,
            color: colors.muted,
          }}
        >
          zero, and “next” (Peano · E02)
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {chain.map((c, i) => {
            const s = springIn(frame, n0 + i * 18, fps, 11);
            const x = 200 + i * 175;
            return (
              <g key={c} opacity={Math.min(1, s)}>
                {i > 0 ? (
                  <line
                    x1={x - 120}
                    y1={360}
                    x2={x - 120 + 70 * Math.min(1, s)}
                    y2={360}
                    stroke={colors.highlight}
                    strokeWidth={4}
                  />
                ) : null}
                <circle
                  cx={x}
                  cy={360}
                  r={34 * s}
                  fill={alpha(colors.primary, 0.2)}
                  stroke={colors.primary}
                  strokeWidth={3}
                />
                <text
                  x={x}
                  y={374}
                  fill={colors.primary}
                  fontSize={36}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {i}
                </text>
                <text
                  x={x}
                  y={440}
                  fill={colors.muted}
                  fontSize={22}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {c}
                </text>
              </g>
            );
          })}
          <text
            x={200 + 4 * 175 - 60}
            y={374}
            fill={colors.highlight}
            fontSize={40}
            opacity={ramp(frame, n0 + 70, 8)}
          >
            → …
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 1080,
            top: 110,
            fontSize: 44,
            fontWeight: 700,
            color: colors.wood,
            letterSpacing: 4,
          }}
        >
          BUILD ℕ
        </div>
        <div
          style={{
            position: "absolute",
            left: 1080,
            top: 170,
            fontSize: 30,
            color: colors.muted,
          }}
        >
          from the empty set (von Neumann · E04)
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* 0 = ∅, 1 = {∅}, 2 = {∅, {∅}}: each new box holds all the earlier ones. */}
          {[0, 1, 2].map((k) => {
            const s = doll(k);
            const cx = 1150 + k * 210;
            return (
              <g
                key={k}
                opacity={Math.min(1, s)}
                transform={`translate(${cx} 360) scale(${s})`}
              >
                {k === 0 ? (
                  <text
                    x={0}
                    y={18}
                    fill={colors.wood}
                    fontSize={56}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    ∅
                  </text>
                ) : (
                  <>
                    <rect
                      x={-80}
                      y={-80}
                      width={160}
                      height={160}
                      rx={18}
                      fill="none"
                      stroke={colors.wood}
                      strokeWidth={4}
                    />
                    <text
                      x={k === 1 ? 0 : -36}
                      y={18}
                      fill={colors.wood}
                      fontSize={k === 1 ? 52 : 40}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                    >
                      ∅
                    </text>
                    {k === 2 ? (
                      <rect
                        x={-6}
                        y={-36}
                        width={72}
                        height={72}
                        rx={10}
                        fill="none"
                        stroke={colors.wood}
                        strokeWidth={3}
                      />
                    ) : null}
                    {k === 2 ? (
                      <text
                        x={30}
                        y={14}
                        fill={colors.wood}
                        fontSize={30}
                        textAnchor="middle"
                        fontFamily={fonts.math}
                      >
                        ∅
                      </text>
                    ) : null}
                  </>
                )}
                <text
                  x={0}
                  y={140}
                  fill={colors.text}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {k}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 600,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 68,
            color: colors.highlight,
            opacity: Math.min(1, verdict),
            scale: interpolate(Math.min(1.1, verdict), [0, 1], [0.8, 1]),
          }}
        >
          A number is anything that behaves like one.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
