import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Gram–Schmidt on functions, ⟨f, g⟩ = ∫ f g over [−1, 1]. The four
// monomials 1, x, x², x³ draw themselves (c0). Peeling: x² slides down by
// its shadow ⅓ on the constant, x³ loses its shadow (3/5)x on x; what's
// left is perpendicular to everything before (c1). Each is rescaled so it
// ends at 1 when x = 1: the Legendre polynomials P₀…P₃, their zeros
// marked: 0, 1, 2, 3 crossings (c2). Last, only x² and the flat line ⅓,
// its best approximation by lines; the gap between them is shaded and
// drawn on its own below: (2/3)P₂ (c3).

const O = { x: 640, y: 470 };
const SX = 330;
const SY = 190;
const scr = (x: number, y: number) => ({ x: O.x + x * SX, y: O.y - y * SY });
const MONO = [
  () => 1,
  (x: number) => x,
  (x: number) => x * x,
  (x: number) => x * x * x,
];
const PEEL = [() => 0, () => 0, () => 1 / 3, (x: number) => (3 / 5) * x];
const SCALE = [1, 1, 1.5, 2.5];
const ROOTS = [
  [],
  [0],
  [-1 / Math.sqrt(3), 1 / Math.sqrt(3)],
  [-Math.sqrt(3 / 5), 0, Math.sqrt(3 / 5)],
];
const COL = () => [
  colors.text,
  colors.primary,
  colors.orange,
  colors.highlight,
];
const NAMES = ["1", "x", "x²", "x³"];
const PN = ["P₀", "P₁", "P₂", "P₃"];

const path = (f: (x: number) => number, x0 = -1, x1 = 1) =>
  Array.from({ length: 81 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / 80;
    const p = scr(x, f(x));
    return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

export const Legendre: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("legendre");
  const [c0, c1, c2, c3] = cues;
  const peel = glide(frame, c1 + 10, fps, 30);
  const scale = glide(frame, c2 + 6, fps, 24);
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 6, 10);
  const colors4 = COL();
  const curve = (k: number) => (x: number) =>
    (MONO[k](x) - peel * PEEL[k](x)) * lerp(1, SCALE[k], scale);
  const best = glide(frame, c3 + 20, fps, 24);
  const err = fadeIn(frame, c3 + 50, 10);

  return (
    <SceneShell id="legendre">
      {[0, 1, 2, 3].map((k) => (
        <Sfx
          key={k}
          name={(["pluck1", "pluck2", "pluck3", "pluck4"] as const)[k]}
          at={c0 + 8 + k * 14}
          volume={0.14}
        />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="sparkle" at={c2 + 34} volume={0.3} />
      <Sfx name="pop" at={c3 + 20} volume={0.12} />
      <Sfx name="chime" at={c3 + 50} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="leg">
            <rect
              x={O.x - SX - 20}
              y={O.y - 1.7 * SY}
              width={2 * SX + 40}
              height={3.4 * SY}
            />
          </clipPath>
        </defs>
        <line
          x1={O.x - SX - 40}
          y1={O.y}
          x2={O.x + SX + 40}
          y2={O.y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={O.y - 1.7 * SY}
          x2={O.x}
          y2={O.y + 1.7 * SY}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        {[-1, 1].map((x) => (
          <g key={x}>
            <line
              x1={scr(x, 0).x}
              y1={O.y - 10}
              x2={scr(x, 0).x}
              y2={O.y + 10}
              stroke={colors.paper}
              strokeWidth={3}
            />
            <text
              x={scr(x, 0).x}
              y={O.y + 50}
              fill={colors.muted}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              {x}
            </text>
          </g>
        ))}
        <g clipPath="url(#leg)" opacity={part1}>
          {[0, 1, 2, 3].map((k) => {
            const len = glide(frame, c0 + 8 + k * 14, fps, 20);
            return (
              <g key={k}>
                <path
                  d={path(curve(k), -1, lerp(-1, 1, len))}
                  fill="none"
                  stroke={colors4[k]}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
                {ROOTS[k].map((r) => (
                  <circle
                    key={r}
                    cx={scr(r, 0).x}
                    cy={O.y}
                    r={12}
                    fill={colors4[k]}
                    opacity={fadeIn(frame, c2 + 34, 8)}
                  />
                ))}
              </g>
            );
          })}
        </g>
        <g clipPath="url(#leg)" opacity={part2}>
          <path
            d={`${path((x) => x * x)} L ${scr(1, lerp(0, 1 / 3, best)).x} ${scr(1, lerp(0, 1 / 3, best)).y} L ${scr(-1, lerp(0, 1 / 3, best)).x} ${scr(-1, lerp(0, 1 / 3, best)).y} Z`}
            fill={alpha(colors.red, 0.25 * err)}
          />
          <path
            d={path((x) => x * x)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={7}
          />
          <line
            x1={scr(-1, 0).x}
            y1={scr(0, lerp(0, 1 / 3, best)).y}
            x2={scr(1, 0).x}
            y2={scr(0, lerp(0, 1 / 3, best)).y}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <path
            d={path((x) => x * x - 1 / 3)}
            fill="none"
            stroke={colors.red}
            strokeWidth={6}
            strokeDasharray="14 10"
            opacity={err}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4),
        }}
      >
        ⟨f, g⟩ = ∫ f g
      </div>
      {/* the names, monomials then Legendre */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          opacity: part1,
        }}
      >
        {[0, 1, 2, 3].map((k) => (
          <div
            key={k}
            style={{
              fontFamily: fonts.math,
              fontSize: 58,
              fontWeight: 800,
              color: colors4[k],
              opacity: fadeIn(frame, c0 + 8 + k * 14, 8),
              translate: riseIn(frame, c0 + 8 + k * 14, 12),
            }}
          >
            {scale > 0.5 ? PN[k] : NAMES[k]}
            {k >= 2 ? (
              <span
                style={{
                  color: colors.muted,
                  fontSize: 44,
                  marginLeft: 20,
                  opacity: peel * (1 - scale),
                }}
              >
                {k === 2 ? "− ⅓" : "− ⅗ x"}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          fontSize: 52,
          fontWeight: 800,
          opacity: part2,
        }}
      >
        <div
          style={{
            color: colors.primary,
            translate: riseIn(frame, c3 + 20, 12),
          }}
        >
          {tx.bestLine}
        </div>
        <div
          style={{ color: colors.red, fontFamily: fonts.math, opacity: err }}
        >
          x² − ⅓ = ⅔ P₂
        </div>
      </div>
    </SceneShell>
  );
};
