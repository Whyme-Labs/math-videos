import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Finite fields have pⁿ elements. Counting 1, 1 + 1, … round a circle
// that closes after 5 steps: the prime p = 5 (c0, c1). A 5 × 5 grid of
// coordinates, a field of 25 as 𝔽₅² (c2). The sizes pⁿ marked on a number
// line from 2 to 32 (c3); 6 marked in red (c4). 𝔽₈ as a cube of 8 points
// with their coordinates over 𝔽₂ (c5).

const P = 5;
const PP = new Set([
  2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 19, 23, 25, 27, 29, 31, 32,
]);

export const Finite: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("finite");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const partB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  const steps = Math.min(P, Math.max(0, Math.floor((frame - c0 - 10) / 18)));
  const grid = Math.min(25, Math.max(0, Math.floor((frame - c2 - 6) / 2)));
  const tilt = progress(frame, c5 + 6, 30);

  return (
    <SceneShell id="finite">
      {Array.from({ length: P }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 10 + i * 18} volume={0.07} />
      ))}
      <Sfx name="ding" at={c1 + 10} volume={0.18} />
      <Sfx name="sparkle" at={c2 + 10} volume={0.2} />
      <Sfx name="pop" at={c3 + 8} volume={0.12} />
      <Sfx name="thud" at={c4 + 10} volume={0.18} />
      <Sfx name="chime" at={c5 + 40} volume={0.26} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <circle
            cx={700}
            cy={500}
            r={240}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          {Array.from({ length: P }, (_, k) => {
            const a = Math.PI / 2 - (2 * Math.PI * k) / P;
            const on = k <= steps;
            return (
              <g key={k}>
                <circle
                  cx={700 + 240 * Math.cos(a)}
                  cy={500 - 240 * Math.sin(a)}
                  r={on ? 26 : 16}
                  fill={on ? colors.primary : alpha(colors.paper, 0.3)}
                />
                <text
                  x={700 + 300 * Math.cos(a)}
                  y={500 - 300 * Math.sin(a) + 14}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={40}
                  fontFamily={fonts.mono}
                  fontWeight={800}
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
            top: 380,
            left: 1120,
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          {Array.from({ length: Math.min(P, steps) }, () => "1").join(" + ") ||
            "0"}{" "}
          = {steps % P}
        </div>
        <Chip
          frame={frame}
          at={c1 + 10}
          x={1120}
          y={500}
          color={colors.green}
          size={44}
          math
        >
          𝔽₅ ⊂ F
        </Chip>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: grid }, (_, k) => {
            const i = k % 5;
            const j = Math.floor(k / 5);
            return (
              <circle
                key={k}
                cx={300 + i * 80}
                cy={600 - j * 80}
                r={16}
                fill={colors.primary}
              />
            );
          })}
          <g opacity={fadeIn(frame, c3 + 4, 8)}>
            <line
              x1={860}
              y1={520}
              x2={1800}
              y2={520}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            {Array.from({ length: 31 }, (_, k) => {
              const n = k + 2;
              const x = 870 + k * 30.5;
              const bad = n === 6;
              return (
                <g key={n}>
                  <circle
                    cx={x}
                    cy={520}
                    r={PP.has(n) ? 11 : 6}
                    fill={
                      bad && frame >= c4 + 6
                        ? colors.red
                        : PP.has(n)
                          ? colors.green
                          : alpha(colors.paper, 0.4)
                    }
                  />
                  {(PP.has(n) && n < 10) || bad ? (
                    <text
                      x={x}
                      y={575}
                      textAnchor="middle"
                      fill={bad ? colors.red : colors.text}
                      fontSize={30}
                      fontFamily={fonts.mono}
                      fontWeight={800}
                    >
                      {n}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 300,
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          |F| = p<sup style={{ fontSize: 34 }}>n</sup>
          <span style={{ color: colors.primary, fontSize: 44 }}>
            {"   "}5 × 5 = 25
          </span>
        </div>
        <Chip
          frame={frame}
          at={c3 + 20}
          x={860}
          y={380}
          color={colors.green}
          size={40}
        >
          {tx.primePowers}
        </Chip>
        <Chip
          frame={frame}
          at={c4 + 14}
          x={860}
          y={630}
          color={colors.red}
          size={40}
        >
          6 = 2 · 3 · {tx.noSix}
        </Chip>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 8 }, (_, k) =>
            [1, 2, 4]
              .filter((m) => (k & m) === 0)
              .map((m) => {
                const pos = (q: number) => {
                  const a = (q >> 2) & 1;
                  const b = (q >> 1) & 1;
                  const c = q & 1;
                  return [
                    780 + 260 * a + 150 * c * (0.4 + 0.6 * tilt),
                    640 - 260 * b - 110 * c * (0.4 + 0.6 * tilt),
                  ];
                };
                const [x1, y1] = pos(k);
                const [x2, y2] = pos(k | m);
                return (
                  <line
                    key={`${k}-${m}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={alpha(colors.paper, 0.45)}
                    strokeWidth={3}
                  />
                );
              }),
          )}
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k >> 2) & 1;
            const b = (k >> 1) & 1;
            const c = k & 1;
            const x = 780 + 260 * a + 150 * c * (0.4 + 0.6 * tilt);
            const y = 640 - 260 * b - 110 * c * (0.4 + 0.6 * tilt);
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={20} fill={colors.primary} />
                <text
                  x={x + 26}
                  y={y - 18}
                  fill={colors.text}
                  fontSize={28}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {a}
                  {b}
                  {c}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          𝔽₈ ≅ 𝔽₂³ · 2³ = 8
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
