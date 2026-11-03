import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { FRACTIONS, NumberLine, cantor } from "../components/line";
import { useStrings } from "../i18n";

// A random number and the Cantor set. A dart hops around [0, 1] and
// stops (c0); P(fraction) = ? (c1). The fractions with denominators up
// to 5, 10, 20, 40 fill the line as ever denser ticks (c2); the answer,
// 0, lands big (c3). Then the Cantor set row by row: middle thirds drop
// away (c4–c5) while the removed length climbs to 1 (c6), with the chip
// "as many points as ℝ". Last: counting ≠ measuring (c7).

const X0 = 200;
const X1 = 1200;
const sx = (x: number) => X0 + (X1 - X0) * x;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, , c6, c7] = cues;
  const part1 = fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const hop = Math.min(10, Math.floor(Math.max(0, frame - c0 - 6) / 6));
  const dart = (Math.sin(hop * 12.9898) * 43758.5453) % 1;
  const dx = Math.abs(dart) * 0.8 + 0.1;
  const qs = [5, 10, 20, 40];
  const qi =
    frame < c2 + 6 ? -1 : Math.min(3, Math.floor((frame - c2 - 6) / 24));
  const qmax = qi < 0 ? 0 : qs[qi];
  const rows = Math.min(7, Math.floor(Math.max(0, frame - c4 - 6) / 20) + 1);
  const removed = 1 - (2 / 3) ** (rows - 1);
  const fill = glide(frame, c6 + 6, fps, 40);
  const shownRemoved = rows >= 7 ? removed + (1 - removed) * fill : removed;

  return (
    <SceneShell id="coldOpen">
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      {qs.map((_, i) => (
        <Sfx key={`q${i}`} name="whoosh" at={c2 + 6 + i * 24} volume={0.06} />
      ))}
      <Sfx name="thud" at={c3 + 6} volume={0.24} />
      {Array.from({ length: 7 }).map((_, i) => (
        <Sfx key={`r${i}`} name="pluck2" at={c4 + 6 + i * 20} volume={0.1} />
      ))}
      <Sfx name="chime" at={c6 + 40} volume={0.3} />
      <Sfx name="pop" at={c7 + 6} volume={0.12} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <NumberLine x0={X0} x1={X1} y={520} />
          {FRACTIONS.filter((f) => f.q <= qmax).map((f) => (
            <line
              key={`${f.p}/${f.q}`}
              x1={sx(f.p / f.q)}
              y1={520 - 120 / Math.sqrt(f.q)}
              x2={sx(f.p / f.q)}
              y2={520}
              stroke={colors.highlight}
              strokeWidth={2.5}
            />
          ))}
          <circle
            cx={sx(dx)}
            cy={500 - ((frame - c0 - 6) % 6) * 0}
            r={16}
            fill={colors.primary}
            opacity={fadeIn(frame, c0 + 6, 6)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1260,
            fontFamily: fonts.math,
            fontSize: 72,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 6),
            translate: riseIn(frame, c1 + 6, 14),
            whiteSpace: "nowrap",
          }}
        >
          {tx.chance} ={" "}
          <span
            style={{ color: frame >= c3 + 6 ? colors.green : colors.highlight }}
          >
            {frame >= c3 + 6 ? "0" : "?"}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            left: X0,
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.highlight,
            opacity: qmax ? 1 : 0,
          }}
        >
          q ≤ {qmax}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: rows }).map((_, k) =>
            cantor(k).map(([a, b], i) => (
              <rect
                key={`${k}-${i}`}
                x={sx(a)}
                y={200 + k * 70}
                width={Math.max(1, (X1 - X0) * (b - a))}
                height={36}
                fill={colors.primary}
              />
            )),
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 1300,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          <div style={{ color: colors.red }}>
            {tx.removed}{" "}
            <span style={{ fontFamily: fonts.mono }}>
              {shownRemoved.toFixed(3)}
            </span>
          </div>
          <div
            style={{
              color: colors.primary,
              opacity: fadeIn(frame, c6 + 40),
              whiteSpace: "nowrap",
            }}
          >
            {tx.left}: |C| = |ℝ|
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 1300,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c7 + 6),
            translate: riseIn(frame, c7 + 6, 12),
            whiteSpace: "nowrap",
          }}
        >
          # ≠ m
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
