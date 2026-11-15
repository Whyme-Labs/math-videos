import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path, poly } from "../components/draw";
import { bump } from "../components/fns";
import { useStrings } from "../i18n";

// The weak form of Poisson's equation on [0, 1]. A load f and the sagging
// string u it produces (c0). A test bump v in green rides along under u;
// the weak equation (c1). Chip: a(u, v) is an inner product on H¹₀ (c2).
// Riesz: the functional v ↦ ∫ f v becomes the vector u (c3). Hat
// functions on a mesh of 6 cells, and the piecewise-linear u_h built from
// them, against the exact u (c4). The error is perpendicular to the hats:
// a plane V_h, u above it, u_h its foot, a right angle (c5).

const X = (t: number) => 200 + 900 * t;
const Y = (v: number) => 360 + 1600 * v;
const fl = (x: number) => 1 + 0.8 * Math.sin(3 * x);
// u solves −u″ = f, u(0) = u(1) = 0, by quadrature with the string's G
const G = (x: number, y: number) => Math.min(x, y) * (1 - Math.max(x, y));
const u = (x: number) => {
  let s = 0;
  for (let i = 0; i < 200; i++) {
    const y = (i + 0.5) / 200;
    s += (G(x, y) * fl(y)) / 200;
  }
  return s;
};
const MESH = 6;

export const Weak: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("weak");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c5, 10);
  const partB = fadeIn(frame, c5 + 4, 10);
  const vc = 0.5 + 0.3 * Math.sin(Math.max(0, frame - c1 - 10) * 0.05);
  const formula = [
    "−u″ = f,  u(0) = u(1) = 0",
    "∫ u′ v′ = ∫ f v,  ∀ v",
    "a(u, v) = ∫ u′ v′",
    "ℓ(v) = ∫ f v = a(u, v)",
    "u_h ∈ V_h = span(hats)",
  ];
  const mode =
    frame < c1 ? 0 : frame < c2 ? 1 : frame < c3 ? 2 : frame < c4 ? 3 : 4;

  return (
    <SceneShell id="weak">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 8} volume={0.1} />
      {Array.from({ length: MESH - 1 }, (_, i) => (
        <Sfx key={i} name="tick" at={c4 + 8 + i * 6} volume={0.06} />
      ))}
      <Sfx name="chime" at={c5 + 30} volume={0.28} />

      <AbsoluteFill style={{ opacity: partA }}>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          {mode === 4 ? (
            <>
              u<sub style={{ fontSize: 32 }}>h</sub> ∈ V
              <sub style={{ fontSize: 32 }}>h</sub> = span({tx.hats})
            </>
          ) : (
            formula[mode]
          )}
        </div>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          {Array.from({ length: 13 }, (_, i) => {
            const x = (i + 0.5) / 13;
            return (
              <line
                key={i}
                x1={X(x)}
                y1={Y(0) - 20 - 60 * fl(x)}
                x2={X(x)}
                y2={Y(0) - 20}
                stroke={colors.orange}
                strokeWidth={4}
                opacity={0.7 * fadeIn(frame, c0 + 6, 8)}
              />
            );
          })}
          <path
            d={path(u, 0, 1, X, Y, 200)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            opacity={fadeIn(frame, c0 + 16, 8)}
          />
          <path
            d={path((x) => 0.09 * bump(x, vc, 0.18), 0, 1, X, Y, 300)}
            fill={alpha(colors.green, 0.25)}
            stroke={colors.green}
            strokeWidth={4}
            opacity={fadeIn(frame, c1 + 8, 8) * fadeOut(frame, c4, 8)}
          />
          <g opacity={fadeIn(frame, c4 + 4, 8)}>
            {Array.from({ length: MESH - 1 }, (_, i) => {
              const k = i + 1;
              return (
                <path
                  key={k}
                  d={poly([
                    [X((k - 1) / MESH), Y(0)],
                    [X(k / MESH), Y(0) + 70],
                    [X((k + 1) / MESH), Y(0)],
                  ])}
                  fill="none"
                  stroke={colors.green}
                  strokeWidth={3}
                  opacity={fadeIn(frame, c4 + 8 + i * 6, 6)}
                />
              );
            })}
            <path
              d={poly(
                Array.from({ length: MESH + 1 }, (_, k) => [
                  X(k / MESH),
                  Y(u(k / MESH)),
                ]),
              )}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
              opacity={fadeIn(frame, c4 + 50, 8)}
            />
          </g>
        </svg>
        <Chip
          frame={frame}
          at={c2 + 14}
          x={1260}
          y={300}
          color={colors.green}
          size={40}
        >
          H¹₀ · {tx.innerProduct}
        </Chip>
        <Chip
          frame={frame}
          at={c3 + 20}
          x={1260}
          y={420}
          color={colors.primary}
          size={40}
        >
          Riesz ⟹ ∃! u
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <path
            d="M 420 640 L 1080 560 L 1500 700 L 840 780 Z"
            fill={alpha(colors.green, 0.18)}
            stroke={colors.green}
            strokeWidth={4}
          />
          <line
            x1={960}
            y1={670}
            x2={960}
            y2={260}
            stroke={colors.orange}
            strokeWidth={5}
            strokeDasharray="12 8"
          />
          <line
            x1={560}
            y1={690}
            x2={960}
            y2={260}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <line
            x1={560}
            y1={690}
            x2={960}
            y2={670}
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <path
            d="M 960 640 L 988 642 L 988 672"
            fill="none"
            stroke={colors.paper}
            strokeWidth={3}
          />
          <circle cx={960} cy={260} r={12} fill={colors.primary} />
          <circle cx={960} cy={670} r={12} fill={colors.highlight} />
          <text
            x={985}
            y={250}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            u
          </text>
          <text
            x={1000}
            y={720}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            u
            <tspan fontSize={28} dy={8}>
              h
            </tspan>
          </text>
          <text
            x={1300}
            y={760}
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            V
            <tspan fontSize={26} dy={8}>
              h
            </tspan>
          </text>
          <text
            x={990}
            y={460}
            fill={colors.orange}
            fontSize={36}
            fontFamily={fonts.body}
            fontWeight={800}
          >
            {tx.error} ⟂ V
            <tspan fontSize={24} dy={8}>
              h
            </tspan>
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
