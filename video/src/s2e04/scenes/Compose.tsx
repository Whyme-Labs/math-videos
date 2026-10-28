import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Composition forces row × column. Two machines in a row: A turns a
// quarter turn, then B flattens onto the floor. e₁ goes in, comes out of A
// pointing up, goes into B and is flattened to nothing. Then the matrices:
// B · A = ?, and the four entries of the answer are found one at a time, a
// row of B lit against a column of A each time.

const A = [
  [0, -1],
  [1, 0],
];
const B = [
  [1, 0],
  [0, 0],
];
const BA = [
  [0, -1],
  [0, 0],
];

const fmt = (v: number) => (v < 0 ? `−${-v}` : `${v}`);

const Mat: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly m: number[][];
  readonly label?: string;
  readonly row?: number;
  readonly col?: number;
  readonly shown?: boolean[][];
}> = ({ x, y, m, label, row, col, shown }) => (
  <g transform={`translate(${x} ${y})`}>
    {row !== undefined ? (
      <rect
        x={-120}
        y={-100 + row * 110}
        width={240}
        height={90}
        rx={16}
        fill={alpha(colors.primary, 0.25)}
      />
    ) : null}
    {col !== undefined ? (
      <rect
        x={-110 + col * 120}
        y={-110}
        width={100}
        height={220}
        rx={16}
        fill={alpha(colors.orange, 0.3)}
      />
    ) : null}
    <path
      d="M -110 -110 l -24 0 l 0 220 l 24 0 M 110 -110 l 24 0 l 0 220 l -24 0"
      fill="none"
      stroke={colors.text}
      strokeWidth={6}
    />
    {m.map((r, i) =>
      r.map((v, j) => (
        <text
          key={`${i}${j}`}
          x={-60 + j * 120}
          y={-36 + i * 110}
          fill={colors.text}
          fontSize={60}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={shown ? (shown[i][j] ? 1 : 0) : 1}
        >
          {fmt(v)}
        </text>
      )),
    )}
    {label ? (
      <text
        y={190}
        fill={colors.muted}
        fontSize={56}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {label}
      </text>
    ) : null}
  </g>
);

export const Compose: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("compose");
  const [c0, c1] = cues;
  const go = glide(frame, c0 + 20, fps, 120);
  const part1 = fadeOut(frame, c1, 10);
  const entryAt = (k: number) => c1 + 30 + k * 40;
  const k = [0, 1, 2, 3].filter((i) => frame >= entryAt(i)).length - 1;
  const shown = [
    [k >= 0, k >= 1],
    [k >= 2, k >= 3],
  ];
  const r = k >= 0 && k < 4 ? Math.floor(k / 2) : undefined;
  const c = k >= 0 && k < 4 ? k % 2 : undefined;
  const lit = frame < entryAt(3) + 30;

  // e₁'s trip: in → A (turned to point up) → B (flattened to a dot)
  const stage = go * 3;
  const x = lerp(360, 1560, go);
  const vec =
    stage < 1
      ? { x: 120, y: 0 }
      : stage < 2
        ? { x: 0, y: -120 }
        : { x: 0, y: -120 * (1 - Math.min(1, (stage - 2) * 2)) };

  return (
    <SceneShell id="compose">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="pluck2" at={c0 + 40} volume={0.16} />
      <Sfx name="thud" at={c0 + 66} volume={0.26} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name={PLUCKS[i]} at={entryAt(i)} volume={0.14} />
      ))}
      <Sfx name="chime" at={entryAt(3) + 20} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[
            { x: 760, l: "A" },
            { x: 1160, l: "B" },
          ].map((m) => (
            <g key={m.l}>
              <rect
                x={m.x - 110}
                y={330}
                width={220}
                height={220}
                rx={26}
                fill={colors.wood}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <text
                x={m.x}
                y={470}
                fill={colors.ink}
                fontSize={96}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={900}
              >
                {m.l}
              </text>
            </g>
          ))}
          <text
            x={960}
            y={460}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.thenWord}
          </text>
          {vec.y !== 0 || vec.x !== 0 ? (
            <Arrow
              from={{ x, y: 440 }}
              to={{ x: x + vec.x, y: 440 + vec.y }}
              color={colors.orange}
              width={12}
            />
          ) : null}
          <circle cx={x} cy={440} r={14} fill={colors.orange} />
          <text
            x={360}
            y={620}
            fill={colors.orange}
            fontSize={50}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 6)}
          >
            e₁
          </text>
          <text
            x={1560}
            y={620}
            fill={colors.orange}
            fontSize={50}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 80)}
          >
            BA e₁ = 0
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Mat x={480} y={440} m={B} label="B" row={lit ? r : undefined} />
          <text
            x={700}
            y={460}
            fill={colors.text}
            fontSize={70}
            textAnchor="middle"
            fontWeight={800}
          >
            ·
          </text>
          <Mat x={920} y={440} m={A} label="A" col={lit ? c : undefined} />
          <text
            x={1160}
            y={460}
            fill={colors.text}
            fontSize={70}
            textAnchor="middle"
            fontWeight={800}
          >
            =
          </text>
          <Mat x={1420} y={440} m={BA} label="BA" shown={shown} />
          <text
            x={960}
            y={180}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={Math.min(1, springIn(frame, entryAt(3) + 20, fps, 10))}
          >
            {tx.rowCol}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
