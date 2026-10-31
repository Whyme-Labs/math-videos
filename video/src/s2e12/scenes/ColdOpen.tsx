import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Pisa, 1202: Leonardo at a desk with his book; beside him a
// meadow where pairs of rabbits appear month by month, a counter under
// each month: 1, 1, 2, 3, 5, 8, 13. Then Binet's formula (1843) arrives,
// full of √5, with a readout whose irrational digits churn and then snap
// to exactly 55. Last, a grid with two glowing lines and a question mark.

const FIB = [1, 1, 2, 3, 5, 8, 13];

const Rabbit: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly c: string;
}> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={18} ry={13} fill={c} />
    <circle cx={14} cy={-10} r={9} fill={c} />
    <ellipse cx={12} cy={-26} rx={3.5} ry={10} fill={c} />
    <ellipse cx={19} cy={-25} rx={3.5} ry={10} fill={c} />
  </g>
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const monthAt = (k: number) => c0 + 30 + k * 14;
  const part1 = fadeOut(frame, c2, 10);
  const snap = ramp(frame, c2 + 50, 50);
  const noise = Math.sin(frame * 1.7) * 3 + Math.cos(frame * 2.3) * 2;
  const value = 55 + noise * (1 - snap) * (frame > c2 + 50 ? 1 : 0);
  const exact = snap >= 1;
  const part2 = fadeOut(frame, c3, 10);
  const lines = glide(frame, c3 + 20, fps, 30);
  const q = Math.min(1, springIn(frame, c3 + 60, fps, 10));

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.16} />
      {FIB.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k % 6]} at={monthAt(k)} volume={0.12} />
      ))}
      <Sfx name="pop" at={c2 + 10} volume={0.16} />
      <Sfx name="riser" at={c2 + 50} volume={0.1} />
      <Sfx name="ding" at={c2 + 100} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.12} />
      <Sfx name="chime" at={c3 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect x={160} y={600} width={380} height={24} fill={colors.wood} />
          <rect
            x={300}
            y={540}
            width={140}
            height={60}
            rx={6}
            fill={colors.violet}
            stroke={colors.paper}
            strokeWidth={3}
          />
          <Person
            x={260}
            y={780}
            color={colors.highlight}
            size={1.6}
            facing={1}
          />
          <text
            x={300}
            y={470}
            fill={colors.highlight}
            fontSize={36}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.leonardo}
          </text>
          {/* the meadow, month by month */}
          <rect
            x={620}
            y={180}
            width={1180}
            height={560}
            rx={30}
            fill={alpha(colors.green, 0.12)}
            stroke={alpha(colors.green, 0.4)}
            strokeWidth={4}
          />
          {FIB.map((n, k) => {
            const x = 700 + k * 160;
            const s = Math.min(1, springIn(frame, monthAt(k), fps, 10));
            return (
              <g key={k} opacity={s}>
                {Array.from({ length: n }).map((_, j) => (
                  <Rabbit
                    key={j}
                    x={x + (j % 2) * 44}
                    y={660 - Math.floor(j / 2) * 60}
                    c={j < (FIB[k - 1] ?? 0) ? colors.paper : colors.primary}
                  />
                ))}
                <text
                  x={x + 22}
                  y={720}
                  fill={colors.text}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  opacity={fadeIn(frame, c1 + k * 4)}
                >
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.pisa}
        </div>
      </AbsoluteFill>

      {/* Binet's formula */}
      <AbsoluteFill
        style={{
          opacity: fadeIn(frame, c2 + 4, 10) * part2,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          bottom: 120,
        }}
      >
        <div style={{ fontSize: 40, color: colors.muted, fontWeight: 800 }}>
          {tx.binet}
        </div>
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 84,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          F<sub>n</sub> = (φ<sup>n</sup> − ψ<sup>n</sup>) / √5
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 110,
            fontWeight: 800,
            color: exact ? colors.green : colors.primary,
            opacity: fadeIn(frame, c2 + 40),
          }}
        >
          F<sub style={{ fontSize: 60 }}>10</sub> ={" "}
          {exact ? "55" : value.toFixed(5)}
        </div>
      </AbsoluteFill>

      {/* two glowing lines */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 11 }).map((_, k) => (
            <g key={k}>
              <line
                x1={460 + k * 100}
                y1={140}
                x2={460 + k * 100}
                y2={800}
                stroke={alpha(colors.paper, 0.1)}
                strokeWidth={2}
              />
              <line
                x1={460}
                y1={140 + k * 66}
                x2={1460}
                y2={140 + k * 66}
                stroke={alpha(colors.paper, 0.1)}
                strokeWidth={2}
              />
            </g>
          ))}
          {[
            { a: -0.55, c: colors.primary },
            { a: 0.6, c: colors.highlight },
          ].map((l, k) => (
            <line
              key={k}
              x1={960 - 520 * Math.cos(l.a) * lines}
              y1={470 - 520 * Math.sin(l.a) * lines}
              x2={960 + 520 * Math.cos(l.a) * lines}
              y2={470 + 520 * Math.sin(l.a) * lines}
              stroke={l.c}
              strokeWidth={10}
              strokeLinecap="round"
            />
          ))}
          <g opacity={q} transform={`translate(1600 520) scale(${q})`}>
            <text
              fill={colors.highlight}
              fontSize={200}
              textAnchor="middle"
              fontWeight={900}
            >
              ?
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
