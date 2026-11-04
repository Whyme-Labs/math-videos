import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Picard's iteration for y′ = y, y(0) = 1. The equation (c0) turns into
// y = 1 + ∫₀ᵗ y (c1). The iterates 1, 1 + t, 1 + t + t²/2, … are drawn
// one by one, the newest in lemon (c2), and eᵗ appears dashed beneath
// them: the cold open's polynomials again (c3). PageRank: four pages
// pass rank along their links, the bars settling to the fixed point (c4).

const PX = 160;
const PW = 820;
const PY = 760;
const PH = 210;
const sx = (x: number) => PX + PW * x;
const sy = (y: number) => PY - PH * y;
const fact = [1, 1, 2, 6, 24, 120, 720];
const taylor = (n: number) => (x: number) => {
  let s = 0;
  for (let k = 0; k <= n; k++) s += x ** k / fact[k];
  return s;
};
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });
// PageRank on four pages, damping 0.85
const LINKS = [[1, 2], [2], [0], [0, 2]];
const ranks = (it: number) => {
  let r = [0.25, 0.25, 0.25, 0.25];
  for (let s = 0; s < it; s++) {
    const nr = [0, 0, 0, 0].map(() => 0.15 / 4);
    LINKS.forEach((out, i) =>
      out.forEach((j) => (nr[j] += (0.85 * r[i]) / out.length)),
    );
    r = nr;
  }
  return r;
};

export const Picard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("picard");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const n = Math.min(6, Math.max(0, Math.floor((frame - c2 - 6) / 16)));
  const path = (f: (x: number) => number) =>
    Array.from(
      { length: 101 },
      (_, i) =>
        `${i ? "L" : "M"} ${sx(i / 100).toFixed(1)} ${sy(f(i / 100)).toFixed(1)}`,
    ).join(" ");
  const it = Math.min(20, Math.floor(Math.max(0, frame - c4 - 10) / 5));
  const r = ranks(it);
  const steps: Tok[][] = [
    [tok("a", "y′ = y"), tok("b", ", y(0) = 1")],
    [tok("y", "y"), tok("eq", " = 1 + "), tok("i", "∫₀ᵗ y")],
  ];
  const NODES = [
    { x: 400, y: 300 },
    { x: 700, y: 300 },
    { x: 700, y: 600 },
    { x: 400, y: 600 },
  ];

  return (
    <SceneShell id="picard">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      {Array.from({ length: 7 }).map((_, i) => (
        <Sfx
          key={i}
          name={i % 2 ? "pluck3" : "pluck1"}
          at={c2 + 6 + i * 16}
          volume={0.1}
        />
      ))}
      <Sfx name="ding" at={c3 + 10} volume={0.26} />
      <Sfx name="riser" at={c4 + 10} volume={0.08} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <Eq steps={steps} at={[c0 + 6, c1 + 6]} x={1420} y={150} size={64} />
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
          {frame >= c2 + 6
            ? Array.from({ length: n + 1 }).map((_, k) => (
                <path
                  key={k}
                  d={path(taylor(k))}
                  fill="none"
                  stroke={
                    k === n ? colors.primary : alpha(colors.primary, 0.25)
                  }
                  strokeWidth={k === n ? 6 : 3}
                />
              ))
            : null}
          <path
            d={path(Math.exp)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
            opacity={fadeIn(frame, c3 + 10, 10)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 320,
            left: 1120,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 6),
            whiteSpace: "nowrap",
          }}
        >
          y{["₀", "₁", "₂", "₃", "₄", "₅", "₆"][n]} ={" "}
          {
            [
              "1",
              "1 + t",
              "1 + t + t²/2",
              "… + t³/6",
              "… + t⁴/24",
              "… + t⁵/120",
              "… + t⁶/720",
            ][n]
          }
        </div>
        <div
          style={{
            position: "absolute",
            top: 420,
            left: 1120,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 10),
            translate: riseIn(frame, c3 + 10, 12),
          }}
        >
          → eᵗ
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {LINKS.flatMap((out, i) =>
            out.map((j) => {
              const a = NODES[i];
              const b = NODES[j];
              return (
                <line
                  key={`${i}-${j}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={alpha(colors.paper, 0.4)}
                  strokeWidth={4}
                />
              );
            }),
          )}
          {NODES.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={30 + 120 * r[i]}
                fill={alpha(colors.primary, 0.3)}
                stroke={colors.primary}
                strokeWidth={4}
              />
              <text
                x={p.x}
                y={p.y + 14}
                fill={colors.text}
                fontSize={40}
                fontFamily={fonts.mono}
                fontWeight={800}
                textAnchor="middle"
              >
                {r[i].toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 1100,
            fontSize: 52,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {tx.pagerank}
        </div>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 1100,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ‖Gx − Gy‖₁ ≤ 0.85 ‖x − y‖₁
        </div>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1100,
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.muted,
          }}
        >
          n = {it}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
