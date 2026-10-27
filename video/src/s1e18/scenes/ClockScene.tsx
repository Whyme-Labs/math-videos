import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// Zero divisors and partners. On a six-hour clock the hand takes three
// strides of 2 (2 × 3) and lands on 0, which flashes red: two things that
// aren't nothing make nothing. On a seven-hour clock every number gets a
// partner, linked by a chord: 1–1, 2–4, 3–5, 6–6, each pair multiplying to 1.

const PAIRS: [number, number][] = [
  [1, 1],
  [2, 4],
  [3, 5],
  [6, 6],
];

export const ClockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("clock");
  const [c0, c1] = cues;
  const strides = [0, 1, 2].reduce(
    (a, k) => a + glide(frame, c0 + 16 + k * 22, fps, 14),
    0,
  );
  const zero = frame >= c0 + 76;
  const part1 = fadeOut(frame, c1, 10);
  const pairAt = (k: number) => c1 + 30 + k * 18;
  const R = 220;
  const C7 = { x: 760, y: 500 };
  const pos7 = (n: number) => {
    const a = (n / 7) * Math.PI * 2 - Math.PI / 2;
    return { x: C7.x + R * 0.7 * Math.cos(a), y: C7.y + R * 0.7 * Math.sin(a) };
  };

  return (
    <SceneShell id="clock">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={c0 + 16 + k * 22} volume={0.14} />
      ))}
      <Sfx name="thud" at={c0 + 76} volume={0.4} />
      {PAIRS.map((_, k) => (
        <Sfx key={`p${k}`} name="ding" at={pairAt(k)} volume={0.14} />
      ))}

      {/* six hours: 2 × 3 = 0 */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${zero ? shake(frame, c0 + 76, 10) : 0} 0)`}>
            <Clock x={700} y={500} r={260} n={6} pos={2 * strides} zeroTop />
          </g>
          {/* the strides, as arcs around the rim */}
          {[0, 1, 2].map((k) => {
            const t = glide(frame, c0 + 16 + k * 22, fps, 14);
            const a0 = ((2 * k) / 6) * Math.PI * 2 - Math.PI / 2;
            const a1 = a0 + (2 / 6) * Math.PI * 2 * t;
            const r = 320;
            return t > 0 ? (
              <path
                key={k}
                d={`M ${700 + r * Math.cos(a0)} ${500 + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${700 + r * Math.cos(a1)} ${500 + r * Math.sin(a1)}`}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={10}
                strokeLinecap="round"
              />
            ) : null;
          })}
          <circle
            cx={700}
            cy={500 - 260 * 0.7}
            r={60}
            fill="none"
            stroke={colors.red}
            strokeWidth={10}
            opacity={zero ? fadeIn(frame, c0 + 76, 4) : 0}
          />
          <text
            x={1420}
            y={520}
            fill={zero ? colors.red : colors.text}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.zeroDivisor}
          </text>
        </svg>
      </AbsoluteFill>

      {/* seven hours: every number has a partner */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Clock x={C7.x} y={C7.y} r={R} n={7} pos={0} zeroTop />
          {PAIRS.map(([a, b], k) => {
            const t = glide(frame, pairAt(k), fps, 14);
            const p = pos7(a);
            const q = pos7(b);
            return (
              <g key={k} opacity={t}>
                {a === b ? (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={38}
                    fill="none"
                    stroke={colors.green}
                    strokeWidth={7}
                  />
                ) : (
                  <path
                    d={`M ${p.x} ${p.y} Q ${C7.x} ${C7.y} ${lerp(p.x, q.x, t)} ${lerp(p.y, q.y, t)}`}
                    fill="none"
                    stroke={colors.green}
                    strokeWidth={7}
                  />
                )}
                <text
                  x={1340}
                  y={300 + k * 120}
                  fill={colors.text}
                  fontSize={60}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {a} × {b} = {a * b}
                  <tspan fill={colors.green}>{a * b === 1 ? "" : ` → 1`}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 1340,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, pairAt(3) + 16),
            translate: riseIn(frame, pairAt(3) + 16, 16),
            scale: lerp(
              1.2,
              1,
              Math.min(1, springIn(frame, pairAt(3) + 16, fps, 10)),
            ),
          }}
        >
          {tx.partners}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
