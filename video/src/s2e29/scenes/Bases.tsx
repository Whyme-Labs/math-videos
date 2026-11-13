import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { path } from "../components/waves";
import { useStrings } from "../i18n";

// Other orthonormal bases, in a 2 × 2 grid. Fourier's sines fill the
// first panel (c0). Legendre polynomials 1, x, x² − ⅓, x³ − 3x/5 (c1).
// Hermite functions, bumps with more and more wiggles (c2). Haar
// wavelets, blocks halving in width (c3). Under each panel, the operator
// it diagonalises; chip (c4).

const PANELS = [
  { x: 160, y: 140 },
  { x: 980, y: 140 },
  { x: 160, y: 480 },
  { x: 980, y: 480 },
];
const PW = 780;
const PH = 300;
const COLS = [colors.primary, colors.orange, colors.highlight, colors.green];
const herm = (n: number) => (x: number) => {
  const H = [1, 2 * x, 4 * x * x - 2, 8 * x ** 3 - 12 * x][n];
  const c = [1, 0.7, 0.35, 0.13][n];
  return c * H * Math.exp(-(x * x) / 2);
};
const legendre = [
  () => 1,
  (x: number) => x,
  (x: number) => 1.5 * x * x - 0.5,
  (x: number) => 2.5 * x ** 3 - 1.5 * x,
];

export const Bases: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("bases");
  const [c0, c1, c2, c3, c4] = cues;
  const ats = [c0, c1, c2, c3];
  const heads = [tx.title, tx.legendre, tx.hermite, tx.haar];
  const ops = ["d/dx", "((1 − x²) y′)′", "−y″ + x² y", "x ↦ 2x"];

  return (
    <SceneShell id="bases">
      {ats.map((a, i) => (
        <Sfx key={i} name="pop" at={a + 6} volume={0.12} />
      ))}
      <Sfx name="chime" at={c4 + 8} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {PANELS.map((p, i) => {
          const X = (u: number) => p.x + 20 + (PW - 40) * u;
          const Y = (v: number) => p.y + PH / 2 + 10 - 90 * v;
          return (
            <g key={i} opacity={fadeIn(frame, ats[i] + 4, 10)}>
              <rect
                x={p.x}
                y={p.y}
                width={PW}
                height={PH}
                rx={20}
                fill={alpha(colors.paper, 0.05)}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={3}
              />
              <line
                x1={X(0)}
                y1={Y(0)}
                x2={X(1)}
                y2={Y(0)}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={2}
              />
              {[0, 1, 2, 3].map((k) => {
                let d = "";
                if (i === 0)
                  d = path(
                    (u) => Math.sin((k + 1) * 2 * Math.PI * u),
                    0,
                    1,
                    X,
                    Y,
                    300,
                  );
                if (i === 1)
                  d = path((u) => legendre[k](2 * u - 1), 0, 1, X, Y, 200);
                if (i === 2)
                  d = path((u) => herm(k)(8 * u - 4), 0, 1, X, Y, 300);
                if (i === 3) {
                  const w = 1 / 2 ** k;
                  const s = 0.5 * w;
                  d =
                    k === 0
                      ? `M ${X(0)} ${Y(0.6)} L ${X(1)} ${Y(0.6)}`
                      : `M ${X(0.1)} ${Y(0)} L ${X(0.1)} ${Y(0.9 - 0.2 * k)} L ${X(0.1 + s)} ${Y(0.9 - 0.2 * k)} L ${X(0.1 + s)} ${Y(-0.9 + 0.2 * k)} L ${X(0.1 + w)} ${Y(-0.9 + 0.2 * k)} L ${X(0.1 + w)} ${Y(0)}`;
                }
                return (
                  <path
                    key={k}
                    d={d}
                    fill="none"
                    stroke={COLS[k]}
                    strokeWidth={4}
                    opacity={fadeIn(frame, ats[i] + 8 + k * 8, 6)}
                  />
                );
              })}
              <text
                x={p.x + 20}
                y={p.y + 46}
                fill={colors.text}
                fontSize={38}
                fontFamily={fonts.body}
                fontWeight={800}
              >
                {heads[i]}
              </text>
              <text
                x={p.x + PW - 20}
                y={p.y + PH - 20}
                textAnchor="end"
                fill={colors.green}
                fontSize={34}
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={fadeIn(frame, c4 + 6 + i * 6, 6)}
              >
                {ops[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <Chip
        frame={frame}
        at={c4 + 30}
        x={560}
        y={60}
        color={colors.green}
        size={36}
      >
        {tx.diagonalises}
      </Chip>
    </SceneShell>
  );
};
