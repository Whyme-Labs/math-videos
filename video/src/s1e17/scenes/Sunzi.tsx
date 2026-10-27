import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// Chinese edition only. 《孙子算经》: "今有物不知其数，三三数之剩二，五五数之
// 剩三，七七数之剩二，问物几何？" Five slips, then a heap of 23 beads is
// counted out three ways: in threes (two left), fives (three left), sevens
// (two left), and three clocks of 3, 5 and 7 hours each keep only that
// remainder. Then the three clocks feed one big answer: 23.

const SLIP_W = 100;
const SLIP_X = (i: number) => 1620 - i * (SLIP_W + 30);
const CLOCKS = [
  { n: 3, rem: 2, x: 420 },
  { n: 5, rem: 3, x: 960 },
  { n: 7, rem: 2, x: 1500 },
];

export const Sunzi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("sunzi");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 6 + i * 8;
  const slips = fadeOut(frame, c1, 10);
  const sweep = (k: number) => glide(frame, c1 + 20 + k * 20, fps, 20);
  const merge = glide(frame, c2 + 10, fps, 24);
  const answer = Math.min(1, springIn(frame, c2 + 36, fps, 10));

  return (
    <SceneShell id="sunzi">
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.14} />
      ))}
      {CLOCKS.map((_, k) => (
        <Sfx key={`c${k}`} name="tick" at={c1 + 20 + k * 20} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c2 + 10} volume={0.16} />
      <Sfx name="chime" at={c2 + 36} />

      <AbsoluteFill style={{ opacity: slips }}>
        <svg width={1920} height={1080}>
          {tx.quote.map((q, i) => {
            const t = glide(frame, slipAt(i), fps, 14);
            return (
              <g
                key={q}
                opacity={t}
                transform={`translate(0 ${lerp(-60, 0, t)})`}
              >
                <rect
                  x={SLIP_X(i)}
                  y={120}
                  width={SLIP_W}
                  height={680}
                  rx={12}
                  fill={colors.wood}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                {[...q].map((ch, j) => (
                  <text
                    key={j}
                    x={SLIP_X(i) + SLIP_W / 2}
                    y={200 + j * 88}
                    fill={colors.ink}
                    fontSize={58}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                  >
                    {ch}
                  </text>
                ))}
              </g>
            );
          })}
          <text
            x={200}
            y={300}
            fill={colors.primary}
            fontSize={60}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 4)}
          >
            {tx.sunziSource}
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {CLOCKS.map((c, k) => {
            const p = hop(merge, c.x, 460, 960, 460, 0);
            return (
              <g
                key={c.n}
                opacity={1 - merge}
                transform={`translate(${p.x - c.x} 0)`}
              >
                <Clock x={c.x} y={460} r={170} n={c.n} pos={c.rem * sweep(k)} />
                <text
                  x={c.x}
                  y={720}
                  fill={colors.highlight}
                  fontSize={52}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={800}
                  opacity={fadeIn(frame, c1 + 34 + k * 20)}
                >
                  {["剩二", "剩三", "剩二"][k]}
                </text>
                <text
                  x={c.x}
                  y={240}
                  fill={colors.muted}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={700}
                >
                  {["三三数之", "五五数之", "七七数之"][k]}
                </text>
              </g>
            );
          })}
          <g opacity={answer} transform={`translate(960 470) scale(${answer})`}>
            <circle
              cx={0}
              cy={0}
              r={200}
              fill={alpha(colors.highlight, 0.25)}
              stroke={colors.highlight}
              strokeWidth={8}
            />
            <text
              x={0}
              y={60}
              fill={colors.highlight}
              fontSize={170}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.answer}
            </text>
          </g>
          {["23 ÷ 3 … 2", "23 ÷ 5 … 3", "23 ÷ 7 … 2"].map((t, n) => (
            <text
              key={t}
              x={560 + n * 400}
              y={760}
              fill={colors.text}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c2 + 50 + n * 8)}
            >
              {t}
            </text>
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
