import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Camera } from "../components/Camera";
import { glide, lerp, springIn } from "../components/motion";
import { QuestionTray } from "../components/QuestionTray";
import { Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";
import { useStrings } from "../i18n";

// One pile of 45 dots, regrouped four ways. The pile never changes; only the
// grouping (and so the name) does.
const N = 45;
const CX = 960;
const CY = 420;
const S = 36; // dot spacing
type P = { x: number; y: number };

const scatter: P[] = Array.from({ length: N }, (_, i) => {
  const a = i * 2.39996; // golden angle
  const r = 26 * Math.sqrt(i + 0.5);
  return { x: CX + r * Math.cos(a) * 1.6, y: CY + r * Math.sin(a) };
});

// Base ten: 4 columns of ten, then 5 ones.
const baseTen: P[] = Array.from({ length: N }, (_, i) =>
  i < 40
    ? { x: CX - 260 + Math.floor(i / 10) * 52, y: CY - 170 + (i % 10) * S }
    : { x: CX + 60, y: CY - 170 + (i - 40) * S },
);

// Base two: blocks of 32, (16), 8, 4, (2), 1 laid out left to right.
const BIN = [
  { value: 32, cols: 4, rows: 8, digit: "1" },
  { value: 16, cols: 4, rows: 4, digit: "0" },
  { value: 8, cols: 2, rows: 4, digit: "1" },
  { value: 4, cols: 2, rows: 2, digit: "1" },
  { value: 2, cols: 2, rows: 1, digit: "0" },
  { value: 1, cols: 1, rows: 1, digit: "1" },
];
const BIN_GAP = 64;
const binX: number[] = [];
{
  const total =
    BIN.reduce((w, b) => w + b.cols * S, 0) + BIN_GAP * (BIN.length - 1);
  let x = CX - total / 2;
  for (const b of BIN) {
    binX.push(x);
    x += b.cols * S + BIN_GAP;
  }
}
const BIN_BOTTOM = CY + 150;
const baseTwo: P[] = [];
{
  let i = 0;
  BIN.forEach((b, g) => {
    if (b.digit === "0") return;
    for (let k = 0; k < b.value; k++, i++) {
      baseTwo.push({
        x: binX[g] + (k % b.cols) * S + S / 2,
        y: BIN_BOTTOM - (Math.floor(k / b.cols) + 0.5) * S,
      });
    }
  });
}

// Base seven: six "flowers" of seven, then three ones.
const baseSeven: P[] = Array.from({ length: N }, (_, i) => {
  if (i >= 42) return { x: CX + 330, y: CY - 50 + (i - 42) * S };
  const f = Math.floor(i / 7);
  const k = i % 7;
  const fx = CX - 300 + (f % 3) * 160;
  const fy = CY - 80 + Math.floor(f / 3) * 170;
  if (k === 0) return { x: fx, y: fy };
  const a = (k / 6) * Math.PI * 2;
  return { x: fx + 38 * Math.cos(a), y: fy + 38 * Math.sin(a) };
});

// Roman XLV: "L" is a box of fifty with one ten missing (XL = 50 − 10), then V = 5.
const romanSlotX = (slot: number) => CX - 330 + slot * 52;
const roman: P[] = Array.from({ length: N }, (_, i) =>
  i < 40
    ? { x: romanSlotX(1 + Math.floor(i / 10)), y: CY - 170 + (i % 10) * S }
    : { x: CX + 120, y: CY - 170 + (i - 40) * S },
);

// Final pile, compact, so the names can orbit it.
const pile: P[] = Array.from({ length: N }, (_, i) => {
  const a = i * 2.39996;
  const r = 15 * Math.sqrt(i + 0.5);
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
});

export const Numerals: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("numerals");
  // When each grouping starts (scene frames).
  const at = [
    0,
    cues[1] + 6,
    cues[2] + 4,
    cues[2] + 60,
    cues[2] + 118,
    cues[3] + 4,
  ];
  const layouts = [scatter, baseTen, baseTwo, baseSeven, roman, pile];
  let stage = 0;
  for (let s = 0; s < at.length; s++) if (frame >= at[s]) stage = s;
  // The big name changes once the dots have mostly arrived in the new grouping.
  let labelStage = 0;
  for (let s = 0; s < at.length; s++) if (frame >= at[s] + 16) labelStage = s;

  const dotPos = (i: number): P => {
    const from = layouts[Math.max(0, stage - 1)][i];
    const to = layouts[stage][i];
    const t = stage === 0 ? 1 : glide(frame, at[stage] + i * 0.35, fps, 22);
    return { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
  };
  const inStage = (s: number) =>
    stage === s ? springIn(frame, at[s] + 10, fps, 14) : 0;
  const appear = springIn(frame, 4, fps, 13);
  const pulse = (s: number) =>
    interpolate(springIn(frame, at[s] + 16, fps, 9, 260), [0, 1], [0.6, 1]);

  return (
    <SceneShell id="numerals">
      <Sfx name="pop" at={4} />
      {at.slice(1).map((f, s) => (
        <Sfx
          key={f}
          name={s === 4 ? "chime" : "whoosh"}
          at={f}
          volume={s === 4 ? 0.3 : 0.16}
        />
      ))}
      <QuestionTray />
      <Camera
        zoom={interpolate(frame, [at[5], at[5] + 30], [1, 1.12], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
        y={0}
      >
        <AbsoluteFill>
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            {/* Group annotations for each layout. */}
            <g opacity={inStage(1)}>
              <text
                x={CX - 182}
                y={CY + 230}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
              >
                {tx.fourTens}
              </text>
              <text
                x={CX + 60}
                y={CY + 60}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
              >
                {tx.fiveOnes}
              </text>
            </g>
            <g opacity={inStage(2)}>
              {BIN.map((b, g) => (
                <g key={b.value}>
                  {b.digit === "0" ? (
                    <rect
                      x={binX[g]}
                      y={BIN_BOTTOM - b.rows * S}
                      width={b.cols * S}
                      height={b.rows * S}
                      rx={8}
                      fill="none"
                      stroke={alpha(colors.muted, 0.6)}
                      strokeWidth={3}
                      strokeDasharray="8 8"
                    />
                  ) : null}
                  <text
                    x={binX[g] + (b.cols * S) / 2}
                    y={BIN_BOTTOM - b.rows * S - 18}
                    fill={colors.muted}
                    fontSize={26}
                    textAnchor="middle"
                  >
                    {b.value}
                  </text>
                  <text
                    x={binX[g] + (b.cols * S) / 2}
                    y={BIN_BOTTOM + 70}
                    fill={b.digit === "1" ? colors.primary : colors.muted}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                  >
                    {b.digit}
                  </text>
                </g>
              ))}
            </g>
            <g opacity={inStage(3)}>
              <text
                x={CX - 140}
                y={CY + 230}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
              >
                {tx.sixSevens}
              </text>
              <text
                x={CX + 330}
                y={CY + 100}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
              >
                {tx.threeOnes}
              </text>
            </g>
            <g opacity={inStage(4)}>
              <rect
                x={romanSlotX(0) - 24}
                y={CY - 194}
                width={5 * 52}
                height={10 * S + 12}
                rx={12}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={3}
              />
              <rect
                x={romanSlotX(0) - 18}
                y={CY - 188}
                width={36}
                height={10 * S}
                rx={8}
                fill={alpha(colors.red, 0.15)}
                stroke={colors.red}
                strokeWidth={3}
                strokeDasharray="8 6"
              />
              <text
                x={romanSlotX(2)}
                y={CY - 214}
                fill={colors.highlight}
                fontSize={44}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                L = 50
              </text>
              <text
                x={romanSlotX(0)}
                y={CY + 236}
                fill={colors.red}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                − X
              </text>
              <text
                x={CX + 120}
                y={CY - 214}
                fill={colors.highlight}
                fontSize={44}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                V
              </text>
            </g>
            {/* The dots themselves. */}
            {Array.from({ length: N }, (_, i) => {
              const p = dotPos(i);
              return (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={13 * appear}
                  fill={colors.primary}
                />
              );
            })}
            {/* Final: every name points at the same pile. */}
            {tx.names.map((name, k) => {
              const t = springIn(frame, at[5] + 16 + k * 5, fps, 12);
              const a = (-90 + k * 72) * (Math.PI / 180);
              const x = CX + 330 * Math.cos(a) * t;
              const y = CY + 250 * Math.sin(a) * t;
              return (
                <g key={name} opacity={stage === 5 ? Math.min(1, t) : 0}>
                  <line
                    x1={CX + 120 * Math.cos(a)}
                    y1={CY + 110 * Math.sin(a)}
                    x2={x}
                    y2={y}
                    stroke={colors.highlight}
                    strokeWidth={3}
                    strokeDasharray="8 8"
                  />
                  <rect
                    x={x - 120}
                    y={y - 36}
                    width={240}
                    height={72}
                    rx={36}
                    fill={colors.bgMid}
                    stroke={colors.highlight}
                    strokeWidth={2}
                  />
                  <text
                    x={x}
                    y={y + 14}
                    fill={colors.text}
                    fontSize={40}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>
          {/* The current name, big, top centre. */}
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                position: "absolute",
                top: 40,
                width: "100%",
                textAlign: "center",
                fontFamily: fonts.math,
                fontSize: 96,
                color: colors.text,
                opacity: labelStage === s ? 1 : 0,
                scale: pulse(s),
              }}
            >
              {tx.names[s - 1]}
            </div>
          ))}
        </AbsoluteFill>
      </Camera>
    </SceneShell>
  );
};
