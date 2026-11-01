import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Unitary maps. Two complex planes, one per coordinate of v = (z₁, z₂),
// each with a dot (c1). The simplest unitary map turns each dot round its
// own circle at its own rate, trails behind (c2); a stacked bar of
// |z₁|² + |z₂|² never changes height (c3). Then the matrix of the map is
// drawn with every entry as a little arrow (a complex number): first
// diagonal, the two arrows turning; a change of basis fills all four
// cells with turning arrows of other lengths (c4), while the two circles
// on the left keep exactly the same turning (c5).

type C = { re: number; im: number };
const mul = (a: C, b: C): C => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const add = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im });
const conj = (a: C): C => ({ re: a.re, im: -a.im });
const cis = (t: number): C => ({ re: Math.cos(t), im: Math.sin(t) });
// a fixed unitary change of basis P = [[c, −is], [−is, c]]
const PC = Math.cos(0.7);
const PS = Math.sin(0.7);
const P: C[][] = [
  [
    { re: PC, im: 0 },
    { re: 0, im: -PS },
  ],
  [
    { re: 0, im: -PS },
    { re: PC, im: 0 },
  ],
];

export const Unitary: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("unitary");
  const [, c1, c2, c3, c4, c5] = cues;
  const t = Math.max(0, frame - c2 - 6);
  const angles = [0.6 + t * 0.045, 2.2 - t * 0.03];
  const radii = [0.8, 0.6];
  const fill = glide(frame, c4 + 10, fps, 30);
  // D = diag(e^{iα}, e^{iβ}); U' = P D P*
  const D: C[][] = [
    [cis(angles[0]), { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, cis(angles[1])],
  ];
  const Ps = [
    [conj(P[0][0]), conj(P[1][0])],
    [conj(P[0][1]), conj(P[1][1])],
  ];
  const prod = (A: C[][], B: C[][]) =>
    A.map((row) =>
      B[0].map((_, j) => add(mul(row[0], B[0][j]), mul(row[1], B[1][j]))),
    ) as C[][];
  const Up = prod(prod(P, D), Ps);
  const cell = (i: number, j: number): C => ({
    re: D[i][j].re + (Up[i][j].re - D[i][j].re) * fill,
    im: D[i][j].im + (Up[i][j].im - D[i][j].im) * fill,
  });
  const PLx = [360, 760];
  const R = 160;

  return (
    <SceneShell id="unitary">
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.12} />
      <Sfx name="chime" at={c5 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {PLx.map((x, k) => {
          const cy = 450;
          const r = radii[k] * R;
          const a = angles[k];
          return (
            <g key={k} opacity={fadeIn(frame, c1 + 4 + k * 6)}>
              <line
                x1={x - 200}
                y1={cy}
                x2={x + 200}
                y2={cy}
                stroke={alpha(colors.paper, 0.3)}
                strokeWidth={3}
              />
              <line
                x1={x}
                y1={cy - 200}
                x2={x}
                y2={cy + 200}
                stroke={alpha(colors.paper, 0.3)}
                strokeWidth={3}
              />
              <circle
                cx={x}
                cy={cy}
                r={r}
                fill="none"
                stroke={alpha(k ? colors.highlight : colors.primary, 0.5)}
                strokeWidth={4}
                strokeDasharray="8 8"
              />
              {Array.from({ length: 10 }).map((_, j) => {
                const b = a - (k ? -1 : 1) * j * 0.08 * (frame > c2 ? 1 : 0);
                return (
                  <circle
                    key={j}
                    cx={x + r * Math.cos(b)}
                    cy={cy - r * Math.sin(b)}
                    r={9}
                    fill={k ? colors.highlight : colors.primary}
                    opacity={(1 - j / 10) * 0.6}
                  />
                );
              })}
              <line
                x1={x}
                y1={cy}
                x2={x + r * Math.cos(a)}
                y2={cy - r * Math.sin(a)}
                stroke={k ? colors.highlight : colors.primary}
                strokeWidth={7}
                strokeLinecap="round"
              />
              <circle
                cx={x + r * Math.cos(a)}
                cy={cy - r * Math.sin(a)}
                r={16}
                fill={k ? colors.highlight : colors.primary}
              />
              <text
                x={x}
                y={cy - 230}
                fill={colors.muted}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
              >
                {tx.coord} {k + 1}
              </text>
            </g>
          );
        })}
        {/* |z₁|² + |z₂|² as one stacked bar that never moves */}
        <g transform="translate(1060 650)" opacity={fadeIn(frame, c3 + 6)}>
          <rect
            x={-40}
            y={-(radii[0] ** 2) * 300}
            width={80}
            height={radii[0] ** 2 * 300}
            fill={colors.primary}
          />
          <rect
            x={-40}
            y={-(radii[0] ** 2 + radii[1] ** 2) * 300}
            width={80}
            height={radii[1] ** 2 * 300}
            fill={colors.highlight}
          />
          <line
            x1={-70}
            y1={0}
            x2={70}
            y2={0}
            stroke={colors.text}
            strokeWidth={4}
          />
          <text
            y={52}
            fill={colors.green}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ‖v‖²
          </text>
        </g>
        {/* the matrix, each entry an arrow */}
        <g transform="translate(1520 420)" opacity={fadeIn(frame, c4 + 4)}>
          <path
            d="M -190 -190 l -24 0 l 0 380 l 24 0 M 190 -190 l 24 0 l 0 380 l -24 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          {[0, 1].map((i) =>
            [0, 1].map((j) => {
              const v = cell(i, j);
              const cx = -90 + j * 180;
              const cy = -90 + i * 180;
              const L = 70;
              return (
                <g key={`${i}${j}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={L}
                    fill={alpha(colors.paper, 0.05)}
                    stroke={alpha(colors.paper, 0.2)}
                    strokeWidth={2}
                  />
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + v.re * L}
                    y2={cy - v.im * L}
                    stroke={colors.orange}
                    strokeWidth={8}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={cx + v.re * L}
                    cy={cy - v.im * L}
                    r={8}
                    fill={colors.orange}
                  />
                </g>
              );
            }),
          )}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 1320,
          width: 400,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c5 + 10),
          translate: riseIn(frame, c5 + 10, 12),
        }}
      >
        U*U = I
      </div>
    </SceneShell>
  );
};
