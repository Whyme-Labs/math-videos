import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The payoff: Babbage's engine. First the table of squares 0 1 4 9 16, its
// differences 1 3 5 7 and second differences 2 2 2. Then the engine: three
// columns of wheels holding 16, 9 and 2. Each crank turn adds the third
// column into the second and the second into the first, and the first
// column's wheels roll on to 25, 36, 49; each new square drops onto a
// growing tape on the right.

const SQUARES = [0, 1, 4, 9, 16];
const COL_X = [700, 960, 1220];

export const Engine: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("engine");
  const [c0, c1] = cues;
  const rowAt = (r: number) => c0 + 20 + r * 40;
  const part1 = fadeOut(frame, c1, 10);
  const turnAt = (k: number) => c1 + 40 + k * 50;
  const turns = [0, 1, 2].filter((k) => frame >= turnAt(k) + 12).length;
  const spin = [0, 1, 2].reduce(
    (a, k) => a + glide(frame, turnAt(k), fps, 12),
    0,
  );
  // engine state after `turns` turns
  const state = (() => {
    let a = 16;
    let b = 9;
    for (let k = 0; k < turns; k++) {
      b += 2;
      a += b;
    }
    return [a, b, 2];
  })();
  const out = [25, 36, 49].slice(0, turns);

  return (
    <SceneShell id="engine">
      {[0, 1, 2].map((r) => (
        <Sfx key={r} name="tick" at={rowAt(r)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.12} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`t${k}`} name="clink" at={turnAt(k) + 12} volume={0.22} />
      ))}
      <Sfx name="chime" at={turnAt(2) + 30} />

      {/* the table of differences */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[SQUARES, [1, 3, 5, 7], [2, 2, 2]].map((row, r) =>
            row.map((v, i) => {
              const s = Math.min(1, springIn(frame, rowAt(r) + i * 5, fps, 10));
              return (
                <g key={`${r}${i}`} opacity={s}>
                  <rect
                    x={480 + i * 220 + r * 110 - 80}
                    y={260 + r * 160 - 56}
                    width={160}
                    height={104}
                    rx={20}
                    fill={alpha(
                      r === 2 ? colors.green : colors.violet,
                      r === 2 ? 0.3 : 0.9,
                    )}
                    stroke={r === 2 ? colors.green : colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={480 + i * 220 + r * 110}
                    y={260 + r * 160 + 20}
                    fill={colors.text}
                    fontSize={60}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    {v}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
      </AbsoluteFill>

      {/* the engine */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={520}
            y={180}
            width={880}
            height={520}
            rx={26}
            fill={alpha(colors.wood, 0.2)}
            stroke={colors.wood}
            strokeWidth={8}
          />
          {COL_X.map((x, c) => (
            <g key={c}>
              {[0, 1, 2].map((r) => {
                const digits = String(state[c]).padStart(3, "0");
                return (
                  <g key={r} transform={`translate(${x} ${270 + r * 140})`}>
                    <ellipse
                      rx={92}
                      ry={56}
                      fill={colors.paper}
                      stroke={colors.ink}
                      strokeWidth={5}
                    />
                    <text
                      y={22}
                      fill={colors.ink}
                      fontSize={64}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                      fontWeight={800}
                    >
                      {digits[r]}
                    </text>
                  </g>
                );
              })}
              <text
                x={x}
                y={770}
                fill={c === 2 ? colors.green : colors.primary}
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={900}
              >
                {state[c]}
              </text>
              {c > 0 ? (
                <path
                  d={`M ${x - 110} 640 Q ${x - 130} 670 ${COL_X[c - 1] + 110} 640`}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={6}
                  strokeDasharray="12 10"
                  opacity={0.4 + 0.6 * (spin % 1 > 0 ? 1 : 0)}
                />
              ) : null}
            </g>
          ))}
          {/* the crank */}
          <g transform={`translate(1480 440) rotate(${spin * 360})`}>
            <line
              x1={0}
              y1={0}
              x2={110}
              y2={0}
              stroke={colors.muted}
              strokeWidth={16}
              strokeLinecap="round"
            />
            <circle cx={110} cy={0} r={22} fill={colors.primary} />
            <circle r={20} fill={colors.ink} />
          </g>
          {/* the tape of new squares */}
          {out.map((v, k) => (
            <g
              key={v}
              opacity={fadeIn(frame, turnAt(k) + 12, 6)}
              transform={`translate(${1660} ${lerp(160, 300 + k * 130, glide(frame, turnAt(k) + 12, fps, 12))})`}
            >
              <rect
                x={-90}
                y={-50}
                width={180}
                height={100}
                rx={18}
                fill={colors.primary}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <text
                y={22}
                fill={colors.ink}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={900}
              >
                {v}
              </text>
            </g>
          ))}
          <text
            x={960}
            y={150}
            fill={colors.wood}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c1 + 10)}
          >
            {tx.engine}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
