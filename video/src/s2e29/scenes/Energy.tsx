import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { leftover, path, square, squareSum } from "../components/waves";
import { useStrings } from "../i18n";

// Convergence in energy. The square wave and its projection Sₙ f, with N
// stepping 1, 3, 5, 9 (c0); bars of the energy left over, 0.19, 0.10,
// 0.07, 0.04 (c1); N runs on to 99 and the bars shrink towards 0 (c2).
// Parseval: a tank holding ‖f‖² = 1 fills exactly with the tones'
// energies |cₙ|² (c3). The Fourier map: the graph on the left, the
// lollipops of |cₙ| on the right, an arrow between, the same energy on
// both sides (c4). The square-wave sum 1 + 1/9 + 1/25 + … counting up to
// π²/8 (c5), and Σ 1/n² to π²/6 (c6).

const STEPS = [1, 3, 5, 9];
const X = (t: number) => 160 + (900 * (t + Math.PI)) / (2 * Math.PI);
const Y = (v: number) => 420 - 170 * v;

export const Energy: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("energy");
  const [c0, c1, c2, c3, c4, c5, c6] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const part3 = fadeIn(frame, c5 + 4, 10);
  const k = Math.min(
    STEPS.length - 1,
    Math.max(0, Math.floor((frame - c0 - 6) / 45)),
  );
  const N =
    frame < c2
      ? STEPS[k]
      : Math.min(99, 9 + 2 * Math.floor((frame - c2 - 6) / 3));
  const tank = Math.min(12, Math.max(0, Math.floor((frame - c3 - 6) / 6)));
  const odd = Math.min(
    4000,
    Math.max(0, Math.floor(((frame - c5 - 10) / 3) ** 2.2)),
  );
  let s8 = 0;
  for (let j = 0; j < odd; j++) s8 += 1 / (2 * j + 1) ** 2;
  const all = Math.min(
    20000,
    Math.max(0, Math.floor(((frame - c6 - 10) / 3) ** 2.4)),
  );
  let s6 = 0;
  for (let j = 1; j <= all; j++) s6 += 1 / (j * j);

  return (
    <SceneShell id="energy">
      {STEPS.map((_, i) => (
        <Sfx key={i} name="pluck2" at={c0 + 6 + i * 45} volume={0.1} />
      ))}
      {STEPS.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 8} volume={0.07} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="pluck1" at={c3 + 6 + i * 6} volume={0.06} />
      ))}
      <Sfx name="ding" at={c3 + 80} volume={0.2} />
      <Sfx name="pluck3" at={c4 + 8} volume={0.12} />
      <Sfx name="ding" at={c5 + 70} volume={0.2} />
      <Sfx name="chime" at={c6 + 70} volume={0.28} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={420}
            x2={1060}
            y2={420}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={path(square, -Math.PI + 0.001, Math.PI - 0.001, X, Y, 600)}
            fill="none"
            stroke={alpha(colors.paper, 0.45)}
            strokeWidth={6}
          />
          <path
            d={path((x) => squareSum(x, N), -Math.PI, Math.PI, X, Y, 900)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <g opacity={fadeIn(frame, c1 + 4, 8)}>
            <line
              x1={1200}
              y1={760}
              x2={1780}
              y2={760}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            {STEPS.map((n, i) => (
              <g key={n} opacity={fadeIn(frame, c1 + 6 + i * 8, 6)}>
                <rect
                  x={1220 + i * 140}
                  y={760 - 2200 * leftover(n)}
                  width={90}
                  height={2200 * leftover(n)}
                  rx={8}
                  fill={colors.red}
                />
                <text
                  x={1265 + i * 140}
                  y={760 - 2200 * leftover(n) - 16}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={32}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {leftover(n).toFixed(2)}
                </text>
                <text
                  x={1265 + i * 140}
                  y={805}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={30}
                  fontFamily={fonts.mono}
                >
                  N={n}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          N = {N} · {tx.leftover} {leftover(N).toFixed(3)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 20),
            whiteSpace: "nowrap",
          }}
        >
          ‖f − Sₙ f‖ → 0
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <g opacity={1 - fadeIn(frame, c4, 8)}>
            <rect
              x={800}
              y={240}
              width={160}
              height={480}
              rx={12}
              fill="none"
              stroke={colors.paper}
              strokeWidth={4}
            />
            {Array.from({ length: tank }, (_, j) => {
              const n = 2 * j + 1;
              let below = 0;
              for (let m = 1; m < n; m += 2)
                below += 8 / (Math.PI * Math.PI * m * m);
              const e = 8 / (Math.PI * Math.PI * n * n);
              return (
                <rect
                  key={j}
                  x={804}
                  y={716 - 472 * (below + e)}
                  width={152}
                  height={472 * e}
                  fill={alpha(j % 2 ? colors.orange : colors.primary, 0.85)}
                />
              );
            })}
            <line
              x1={780}
              y1={244}
              x2={980}
              y2={244}
              stroke={colors.green}
              strokeWidth={5}
              strokeDasharray="10 7"
            />
          </g>
          <g opacity={fadeIn(frame, c4 + 4, 8)}>
            <path
              d={path(
                square,
                -Math.PI + 0.001,
                Math.PI - 0.001,
                (t) => 200 + (560 * (t + Math.PI)) / (2 * Math.PI),
                (v) => 480 - 150 * v,
                300,
              )}
              fill="none"
              stroke={colors.primary}
              strokeWidth={6}
            />
            <path
              d="M 820 480 Q 960 400 1100 480"
              fill="none"
              stroke={colors.paper}
              strokeWidth={5}
            />
            <path
              d="M 1084 466 L 1102 482 L 1080 490"
              fill="none"
              stroke={colors.paper}
              strokeWidth={5}
            />
            <line
              x1={1160}
              y1={620}
              x2={1760}
              y2={620}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            {Array.from({ length: 13 }, (_, j) => {
              const n = j - 6;
              const a = n % 2 ? 2 / (Math.PI * Math.abs(n)) : 0;
              return (
                <g key={j}>
                  <line
                    x1={1190 + j * 45}
                    y1={620}
                    x2={1190 + j * 45}
                    y2={620 - 400 * a}
                    stroke={colors.orange}
                    strokeWidth={5}
                  />
                  {a > 0 && (
                    <circle
                      cx={1190 + j * 45}
                      cy={620 - 400 * a}
                      r={10}
                      fill={colors.orange}
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ‖f‖² = Σ |cₙ|²
        </div>
        <div
          style={{
            position: "absolute",
            top: 740,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c4 + 20),
            whiteSpace: "nowrap",
          }}
        >
          L² → ℓ² · {tx.energy} 1 = 1
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part3 }}>
        <div
          style={{
            position: "absolute",
            top: 200,
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
          1 = (8/π²)(1 + 1/9 + 1/25 + …)
        </div>
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 60,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          1 + 1/9 + 1/25 + … = {s8.toFixed(4)} → π²/8
        </div>
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 60,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c6 + 6),
            whiteSpace: "nowrap",
          }}
        >
          Σ 1/n² = {s6.toFixed(4)} → π²/6
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
