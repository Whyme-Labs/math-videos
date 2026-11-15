import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { bump, phi } from "../components/fns";
import { useStrings } from "../i18n";

// Distributions. Smooth bumps of several widths, each zero outside its
// box (c0). A machine: φ goes in on the left, T in the middle, a number
// comes out (c1). A function f as a machine: f and φ drawn, their product
// shaded, and the number ∫ f φ (c2). The delta's machine just reads φ at
// 0, a dot on φ (c3). Point masses: stems of different heights (c4).
// Three nested boxes, D inside L² inside D′, with δ sitting in the outer
// ring only (c5).

const BUMPS = [
  { c: -0.72, w: 0.3, col: colors.green },
  { c: -0.02, w: 0.42, col: colors.primary },
  { c: 0.75, w: 0.22, col: colors.orange },
];
const X = (t: number) => 560 + 340 * t;
const Y = (v: number) => 470 - 170 * v;
const f = (x: number) => 0.4 + 0.35 * Math.sin(2.4 * x + 0.5);

export const Distributions: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("distributions");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c1, 10);
  const partB = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  let ifp = 0;
  for (let i = 0; i < 1000; i++) {
    const x = -1.4 + (2.8 * (i + 0.5)) / 1000;
    ifp += (f(x) * phi(x) * 2.8) / 1000;
  }
  const mode = frame < c2 ? 0 : frame < c3 ? 1 : frame < c4 ? 2 : 3;
  const out =
    mode === 1
      ? ifp.toFixed(3)
      : mode === 2
        ? phi(0).toFixed(3)
        : mode === 3
          ? (0.5 * phi(-0.6) + 0.8 * phi(0.3) + 0.3 * phi(0.9)).toFixed(3)
          : "?";
  const label = ["T", "f", "δ", "μ"][mode];

  return (
    <SceneShell id="distributions">
      {BUMPS.map((_, i) => (
        <Sfx key={i} name="pop" at={c0 + 8 + i * 8} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c2 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="pluck4" at={c4 + 8} volume={0.12} />
      <Sfx name="chime" at={c5 + 30} volume={0.28} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={300}
            y1={600}
            x2={1620}
            y2={600}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {BUMPS.map((b, i) => (
            <g key={i} opacity={fadeIn(frame, c0 + 8 + i * 8, 8)}>
              <rect
                x={960 + 560 * (b.c - b.w)}
                y={250}
                width={1120 * b.w}
                height={350}
                fill="none"
                stroke={alpha(colors.paper, 0.3)}
                strokeWidth={2}
                strokeDasharray="8 6"
              />
              <path
                d={path(
                  (x) => bump(x, b.c, b.w),
                  -1.15,
                  1.15,
                  (t) => 960 + 560 * t,
                  (v) => 600 - 300 * v,
                  600,
                )}
                fill="none"
                stroke={b.col}
                strokeWidth={6}
              />
            </g>
          ))}
        </svg>
        <Chip
          frame={frame}
          at={c0 + 30}
          x={300}
          y={140}
          color={colors.green}
          size={42}
        >
          {tx.testFns} · C<sup>∞</sup>
          <sub>c</sub>
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-1.2)}
            y1={Y(0)}
            x2={X(1.2)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(phi, -1.2, 1.2, X, Y, 300)}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
          />
          <g opacity={mode === 1 ? 1 : 0}>
            <path
              d={path(f, -1.2, 1.2, X, Y, 200)}
              fill="none"
              stroke={colors.primary}
              strokeWidth={4}
            />
            <path
              d={`${path((x) => f(x) * phi(x), -1.2, 1.2, X, Y, 300)} Z`}
              fill={alpha(colors.primary, 0.3)}
            />
          </g>
          {mode === 2 && (
            <circle
              cx={X(0)}
              cy={Y(phi(0))}
              r={18}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
            />
          )}
          {mode === 3 &&
            [
              [-0.6, 0.5],
              [0.3, 0.8],
              [0.9, 0.3],
            ].map(([x, m]) => (
              <g key={x}>
                <line
                  x1={X(x)}
                  y1={Y(0)}
                  x2={X(x)}
                  y2={Y(m * 1.6)}
                  stroke={colors.orange}
                  strokeWidth={6}
                />
                <circle cx={X(x)} cy={Y(m * 1.6)} r={10} fill={colors.orange} />
              </g>
            ))}
          <rect
            x={1100}
            y={330}
            width={240}
            height={200}
            rx={24}
            fill={alpha(colors.paper, 0.08)}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <path
            d="M 980 430 L 1090 430 M 1072 414 L 1092 430 L 1072 446"
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
          />
          <path
            d="M 1350 430 L 1460 430 M 1442 414 L 1462 430 L 1442 446"
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
          />
          <text
            x={1220}
            y={452}
            textAnchor="middle"
            fill={colors.text}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {label}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 1480,
            fontFamily: fonts.mono,
            fontSize: 50,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
          }}
        >
          {out}
        </div>
        <div
          style={{
            position: "absolute",
            top: 560,
            left: 1100,
            width: 520,
            fontSize: 36,
            fontWeight: 700,
            color: colors.muted,
            textAlign: "center",
          }}
        >
          φ ↦ {tx.number}
        </div>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          {
            [
              "T : D → ℂ, linear, continuous",
              "f(φ) = ∫ f φ",
              "δ(φ) = φ(0)",
              `μ(φ) = ∫ φ dμ · ${tx.measures}`,
            ][mode]
          }
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          {[
            { r: 330, label: "D′", col: colors.orange },
            { r: 220, label: "L²", col: colors.primary },
            { r: 110, label: "D", col: colors.green },
          ].map((b, i) => (
            <g key={b.label} opacity={fadeIn(frame, c5 + 6 + i * 10, 8)}>
              <rect
                x={960 - 1.6 * b.r}
                y={470 - b.r}
                width={3.2 * b.r}
                height={2 * b.r}
                rx={40}
                fill={alpha(b.col, 0.1)}
                stroke={b.col}
                strokeWidth={5}
              />
              <text
                x={960 - 1.6 * b.r + 30}
                y={470 - b.r + 56}
                fill={b.col}
                fontSize={44}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {b.label}
              </text>
            </g>
          ))}
          <text
            x={1380}
            y={720}
            fill={colors.highlight}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 50, 8)}
          >
            δ
          </text>
          <text
            x={960}
            y={490}
            textAnchor="middle"
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 50, 8)}
          >
            φ
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
