import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// One table, three costumes. It flips over like a card each time and comes
// back as sets (∈ / ∉), then sentences (true / false), then programs (halts
// / loops). Each time the diagonal lights and flips, and a name card slides
// in: Russell, the Liar, Turing. For the programs, the flipped diagonal
// becomes one more program, D; a little checker machine tries to predict
// it, sparks and jams.

const N = 5;
const CELL = 100;
const GX = 620;
const GY = 180;
const grid = [
  [1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 1, 1, 0],
  [1, 0, 0, 1, 0],
];

type Skin = {
  rows: string[];
  cols: string[];
  yes: string;
  no: string;
  card: string;
};

export const Costumes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("costumes");
  const [c0, c1, c2] = cues;
  const SKINS: Skin[] = [
    {
      rows: ["a", "b", "c", "d", "e"],
      cols: ["a", "b", "c", "d", "e"],
      yes: "∈",
      no: "∉",
      card: tx.russell,
    },
    {
      rows: ["s₀", "s₁", "s₂", "s₃", "s₄"],
      cols: ["s₀", "s₁", "s₂", "s₃", "s₄"],
      yes: tx.trueWord,
      no: tx.falseWord,
      card: tx.liar,
    },
    {
      rows: ["P₀", "P₁", "P₂", "P₃", "P₄"],
      cols: ["0", "1", "2", "3", "4"],
      yes: tx.halts,
      no: tx.loops,
      card: tx.turing,
    },
  ];
  const skinAt = [c0, c1, c1 + Math.round((c2 - c1) * 0.45)];
  const skin = skinAt.reduce((acc, t, k) => (frame >= t ? k : acc), 0);
  const S = SKINS[skin];
  // the card flip at each costume change: scaleX dips to 0 and back
  // each new costume unfolds from the table's spine like a turned card
  const sx =
    skin === 0
      ? Math.min(1, springIn(frame, c0, fps, 12))
      : Math.max(0.02, Math.min(1, springIn(frame, skinAt[skin], fps, 14)));
  const litAt = (k: number) => skinAt[skin] + 16 + k * 6;
  const flipAt = skinAt[skin] + 16 + N * 6 + 4;
  const flipped = frame >= flipAt;
  const card = springIn(frame, flipAt + 6, fps, 11);
  // the checker jams on program D
  const checker = fadeIn(frame, c2 + 30);
  const jam = frame >= c2 + 60;

  return (
    <SceneShell id="costumes">
      {skinAt.map((t, k) => (
        <Sfx key={`w${k}`} name="whoosh" at={t} volume={0.16} />
      ))}
      {skinAt.map((t, k) =>
        Array.from({ length: N }).map((_, j) => (
          <Sfx
            key={`l${k}-${j}`}
            name={PLUCKS[j]}
            at={t + 16 + j * 6}
            volume={0.12}
          />
        )),
      )}
      {skinAt.map((t, k) => (
        <Sfx key={`c${k}`} name="ding" at={t + 16 + N * 6 + 10} volume={0.18} />
      ))}
      <Sfx name="scratch" at={c2 + 60} />
      <Sfx name="thud" at={c2 + 64} volume={0.3} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${GX + (N * CELL) / 2} 0) scale(${sx} 1) translate(${-(GX + (N * CELL) / 2)} 0)`}
          >
            <rect
              x={GX - 140}
              y={GY - 100}
              width={N * CELL + 180}
              height={(N + 1) * CELL + 140}
              rx={28}
              fill={colors.paper}
            />
            {S.cols.map((c, g) => (
              <text
                key={`col${g}`}
                x={GX + (g + 0.5) * CELL}
                y={GY - 30}
                fill={alpha(colors.ink, 0.6)}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {c}
              </text>
            ))}
            {S.rows.map((r, h) => (
              <text
                key={`row${h}`}
                x={GX - 70}
                y={GY + (h + 0.6) * CELL}
                fill={alpha(colors.ink, 0.6)}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {r}
              </text>
            ))}
            {Array.from({ length: N }).map((_, h) =>
              Array.from({ length: N }).map((__, g) => {
                const diag = g === h;
                const on = diag && frame >= litAt(h);
                const yes = grid[h][g] === 1;
                return (
                  <g key={`${h}-${g}`}>
                    {on ? (
                      <rect
                        x={GX + g * CELL + 6}
                        y={GY + h * CELL + 6}
                        width={CELL - 12}
                        height={CELL - 12}
                        rx={14}
                        fill={alpha(colors.primary, 0.85)}
                      />
                    ) : null}
                    <text
                      x={GX + (g + 0.5) * CELL}
                      y={GY + (h + 0.62) * CELL}
                      fill={yes ? colors.green : colors.red}
                      fontSize={skin === 0 ? 52 : 30}
                      textAnchor="middle"
                      fontFamily={skin === 0 ? fonts.math : fonts.body}
                      fontWeight={700}
                    >
                      {yes ? S.yes : S.no}
                    </text>
                  </g>
                );
              }),
            )}
            {/* the flipped diagonal, as a new row */}
            <g opacity={flipped ? 1 : 0}>
              <rect
                x={GX - 6}
                y={GY + N * CELL + 10}
                width={N * CELL + 12}
                height={CELL - 20}
                rx={16}
                fill={alpha(colors.highlight, 0.3)}
                stroke={colors.highlight}
                strokeWidth={5}
              />
              <text
                x={GX - 70}
                y={GY + (N + 0.55) * CELL}
                fill={colors.highlight}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
              >
                {skin === 0 ? "R" : skin === 1 ? "s*" : "D"}
              </text>
              {Array.from({ length: N }).map((_, g) => {
                const t = ramp(frame, flipAt + g * 3, 10);
                const yes = grid[g][g] !== 1;
                return (
                  <text
                    key={g}
                    x={GX + (g + 0.5) * CELL}
                    y={lerp(GY + (g + 0.62) * CELL, GY + (N + 0.55) * CELL, t)}
                    fill={yes ? colors.green : colors.red}
                    fontSize={skin === 0 ? 52 : 30}
                    textAnchor="middle"
                    fontFamily={skin === 0 ? fonts.math : fonts.body}
                    fontWeight={800}
                  >
                    {yes ? S.yes : S.no}
                  </text>
                );
              })}
            </g>
          </g>
          {/* the name card */}
          <g
            transform={`translate(${lerp(2300, 1560, Math.min(1, card))} 300) rotate(4)`}
          >
            <rect
              x={-200}
              y={-70}
              width={400}
              height={140}
              rx={20}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <text
              x={0}
              y={18}
              fill={colors.ink}
              fontSize={46}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {S.card}
            </text>
          </g>
          {/* the checker machine that jams on D */}
          {skin === 2 ? (
            <g
              opacity={checker}
              transform={`translate(${1560 + (jam ? shake(frame, c2 + 60, 14) : 0)} 640)`}
            >
              <rect
                x={-160}
                y={-110}
                width={320}
                height={220}
                rx={24}
                fill={colors.muted}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <circle cx={-60} cy={-30} r={26} fill={colors.ink} />
              <circle cx={60} cy={-30} r={26} fill={colors.ink} />
              <circle
                cx={-60 + (jam ? 0 : 8 * Math.sin(frame / 6))}
                cy={-30}
                r={10}
                fill={jam ? colors.red : colors.primary}
              />
              <circle
                cx={60 + (jam ? 0 : 8 * Math.sin(frame / 6))}
                cy={-30}
                r={10}
                fill={jam ? colors.red : colors.primary}
              />
              <rect
                x={-90}
                y={40}
                width={180}
                height={34}
                rx={10}
                fill={colors.ink}
              />
              <text
                x={0}
                y={67}
                fill={jam ? colors.red : colors.green}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {jam ? "?!" : "…"}
              </text>
              {jam
                ? Array.from({ length: 8 }).map((_, k) => {
                    const a = (k / 8) * 2 * Math.PI + frame / 6;
                    const d = 150 + 30 * Math.sin(frame / 3 + k);
                    return (
                      <line
                        key={k}
                        x1={Math.cos(a) * 130}
                        y1={Math.sin(a) * 130}
                        x2={Math.cos(a) * d}
                        y2={Math.sin(a) * d}
                        stroke={colors.primary}
                        strokeWidth={6}
                        strokeLinecap="round"
                      />
                    );
                  })
                : null}
            </g>
          ) : null}
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 40,
          color: colors.muted,
          opacity: fadeIn(frame, skinAt[skin] + 4),
        }}
      >
        {[tx.sets, tx.sentences, tx.programs][skin]}
      </div>
    </SceneShell>
  );
};
