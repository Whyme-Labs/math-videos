import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Polynomials crowding towards a hole. The Taylor polynomials of eˣ drawn
// one after another on [0, 1], each new one in lemon and the older ones as
// ghosts, the formula for the newest written above (c0–c1). A magnifier on
// x = 1 shows the newest two only a hairline apart, the gap read out (c2).
// eˣ appears dashed (c3), stamped "not a polynomial" (c4); the space of
// polynomials drawn as a sheet with a hole where eˣ should be, the curves'
// endpoints crowding to its rim (c5). Then Season 1's 1.4, 1.41, 1.414 on
// a number line crowding towards the hole at √2 (c6) and a closing chip
// (c7).

const PX = 160;
const PW = 820;
const PY = 760;
const PH = 210;
const sx = (x: number) => PX + PW * x;
const sy = (y: number) => PY - PH * y;
const fact = [1, 1, 2, 6, 24, 120, 720, 5040];
const taylor = (n: number) => (x: number) => {
  let s = 0;
  for (let k = 0; k <= n; k++) s += x ** k / fact[k];
  return s;
};
const TERMS = [
  "1",
  " + x",
  " + x²/2",
  " + x³/6",
  " + x⁴/24",
  " + x⁵/120",
  " + x⁶/720",
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, , c2, c3, c4, c5, c6, c7] = cues;
  const n = Math.min(6, Math.max(0, Math.floor((frame - c0 - 6) / 22)));
  const part1 = fadeOut(frame, c6, 10);
  const part2 = fadeIn(frame, c6 + 4, 10);
  const path = (f: (x: number) => number) =>
    Array.from(
      { length: 101 },
      (_, i) =>
        `${i ? "L" : "M"} ${sx(i / 100).toFixed(1)} ${sy(f(i / 100)).toFixed(1)}`,
    ).join(" ");
  const gap = taylor(n)(1) - taylor(Math.max(0, n - 1))(1);
  const decimals = ["1.4", "1.41", "1.414", "1.4142", "1.41421"];
  const di = Math.min(4, Math.floor(Math.max(0, frame - c6 - 6) / 14));
  // the line zooms in on √2 as each decimal arrives
  const half = 0.12 / 4 ** (glide(frame, c6 + 6 + di * 14, fps, 12) * 0 + di);
  const L0 = Math.SQRT2 - half;
  const L1 = Math.SQRT2 + half;
  const lx = (v: number) => 260 + ((v - L0) / (L1 - L0)) * 1300;
  const zoom = glide(frame, c2 + 6, fps, 20);

  return (
    <SceneShell id="coldOpen">
      {TERMS.map((_, i) => (
        <Sfx
          key={i}
          name={i % 2 ? "pluck2" : "pluck4"}
          at={c0 + 6 + i * 22}
          volume={0.1}
        />
      ))}
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="thud" at={c4 + 10} volume={0.22} />
      <Sfx name="riser" at={c5 + 6} volume={0.08} />
      {decimals.map((_, i) => (
        <Sfx key={`d${i}`} name="tick" at={c6 + 6 + i * 14} volume={0.1} />
      ))}
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={PX}
            y1={PY}
            x2={PX}
            y2={sy(2.9)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          {Array.from({ length: n + 1 }).map((_, k) => (
            <path
              key={k}
              d={path(taylor(k))}
              fill="none"
              stroke={k === n ? colors.primary : alpha(colors.primary, 0.25)}
              strokeWidth={k === n ? 6 : 3}
            />
          ))}
          <path
            d={path(Math.exp)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
            opacity={fadeIn(frame, c3 + 6, 10)}
          />
          {/* the magnifier at x = 1 */}
          <g opacity={fadeIn(frame, c2 + 6, 8) * fadeOut(frame, c5, 10)}>
            <circle
              cx={sx(1)}
              cy={sy(taylor(n)(1))}
              r={40 * zoom}
              fill="none"
              stroke={colors.text}
              strokeWidth={3}
            />
            <line
              x1={sx(1) + 28}
              y1={sy(taylor(n)(1)) + 28}
              x2={1120}
              y2={560}
              stroke={colors.text}
              strokeWidth={3}
            />
            <circle
              cx={1220}
              cy={560}
              r={110}
              fill={alpha(colors.bg, 0.95)}
              stroke={colors.text}
              strokeWidth={4}
            />
            <line
              x1={1120}
              y1={560 - 18}
              x2={1320}
              y2={560 - 18}
              stroke={alpha(colors.primary, 0.4)}
              strokeWidth={6}
            />
            <line
              x1={1120}
              y1={560 - 18 + Math.min(80, gap * 400)}
              x2={1320}
              y2={560 - 18 + Math.min(80, gap * 400)}
              stroke={colors.primary}
              strokeWidth={6}
            />
          </g>
          {/* the hole in the space of polynomials */}
          <g opacity={fadeIn(frame, c5 + 6, 10)}>
            <circle
              cx={sx(1)}
              cy={sy(Math.E)}
              r={22}
              fill={colors.bg}
              stroke={colors.red}
              strokeWidth={5}
              strokeDasharray="8 6"
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          {TERMS.slice(0, n + 1).join("")}
          {n < 6 ? "" : " + …"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 1100,
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c5, 10),
          }}
        >
          Δ = {gap.toFixed(4)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 1100,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 6),
            translate: riseIn(frame, c3 + 6, 12),
          }}
        >
          eˣ
        </div>
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 1100,
            padding: "8px 24px",
            borderRadius: 14,
            border: `5px solid ${colors.red}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 44,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 10),
            translate: riseIn(frame, c4 + 10, 12),
          }}
        >
          {tx.notPoly}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={240}
            y1={520}
            x2={1580}
            y2={520}
            stroke={colors.paper}
            strokeWidth={5}
          />
          {decimals.slice(0, di + 1).map((d, i) => (
            <g key={d}>
              <circle
                cx={lx(parseFloat(d))}
                cy={520}
                r={10}
                fill={colors.primary}
              />
              <text
                x={lx(parseFloat(d))}
                y={470}
                fill={colors.primary}
                opacity={i === di ? 1 : 0}
                fontSize={34}
                fontFamily={fonts.mono}
                fontWeight={800}
                textAnchor="middle"
              >
                {d}
              </text>
            </g>
          ))}
          <circle
            cx={lx(Math.SQRT2)}
            cy={520}
            r={18}
            fill={colors.bg}
            stroke={colors.red}
            strokeWidth={5}
            strokeDasharray="6 5"
          />
          <text
            x={lx(Math.SQRT2)}
            y={590}
            fill={colors.red}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            √2 ∉ ℚ
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 680,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c7 + 6),
            translate: riseIn(frame, c7 + 6, 12),
          }}
        >
          ℚ → ℝ · ? → ?
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
