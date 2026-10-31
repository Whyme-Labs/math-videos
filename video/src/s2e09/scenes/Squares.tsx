import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Completing squares, and Sylvester's law. The level curves of
// x² + 4xy + y² are tilted hyperbolas; the plane shears (u = x + 2y) and
// they straighten into u² − 3v² = c, with a lemon "+" on the u axis and a
// red "−" on the v axis. Then the basis keeps changing, three times: the
// curves twist and the 2 × 2 card of the form churns through new entries,
// while the signature badge (+, −) never moves.

const S = 90;
const O = { x: 760, y: 470 };
// display matrices M (q canonical → p shown) for the basis changes
const MS = [
  [1, 0, 0, 1],
  [1.2, 0.5, -0.3, 0.9],
  [0.8, -0.6, 0.4, 1.1],
  [1.1, 0.3, 0.2, 0.9],
];

export const Squares: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("squares");
  const [c0, c1] = cues;
  const shear = glide(frame, c0 + 40, fps, 50);
  let m = MS[0];
  [1, 2, 3].forEach((k) => {
    const t = glide(frame, c1 + 10 + (k - 1) * 40, fps, 24);
    m = m.map((v, i) => lerp(v, MS[k][i], t));
  });
  const show = (u: number, v: number) => {
    const X0 = u - 2 * v * (1 - shear);
    const Y0 = v;
    const X = m[0] * X0 + m[1] * Y0;
    const Y = m[2] * X0 + m[3] * Y0;
    return { x: O.x + X * S, y: O.y - Y * S };
  };
  const branch = (c: number, sign: number) =>
    Array.from({ length: 41 })
      .map((_, i) => {
        const t = -1.8 + (3.6 * i) / 40;
        const q =
          c > 0
            ? {
                u: sign * Math.sqrt(c) * Math.cosh(t),
                v: Math.sqrt(c / 3) * Math.sinh(t),
              }
            : {
                u: Math.sqrt(-c) * Math.sinh(t),
                v: sign * Math.sqrt(-c / 3) * Math.cosh(t),
              };
        const p = show(q.u, q.v);
        return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ");
  // the form in the displayed coordinates: M⁻ᵀ · diag(1, −3) · M⁻¹ (after the shear)
  const det = m[0] * m[3] - m[1] * m[2];
  const inv = [m[3] / det, -m[1] / det, -m[2] / det, m[0] / det];
  const D = [1, -3];
  const B = [
    D[0] * inv[0] * inv[0] + D[1] * inv[2] * inv[2],
    D[0] * inv[0] * inv[1] + D[1] * inv[2] * inv[3],
    D[0] * inv[0] * inv[1] + D[1] * inv[2] * inv[3],
    D[0] * inv[1] * inv[1] + D[1] * inv[3] * inv[3],
  ];
  const card = fadeIn(frame, c1 + 6, 8);

  return (
    <SceneShell id="squares">
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="ding" at={c0 + 90} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="whoosh" at={c1 + 10 + k * 40} volume={0.1} />
      ))}
      <Sfx name="chime" at={c1 + 110} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="sqStage">
            <rect x={160} y={110} width={1220} height={720} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#sqStage)">
          <line
            x1={show(-6, 0).x}
            y1={show(-6, 0).y}
            x2={show(6, 0).x}
            y2={show(6, 0).y}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
          />
          <line
            x1={show(0, -4).x}
            y1={show(0, -4).y}
            x2={show(0, 4).x}
            y2={show(0, 4).y}
            stroke={alpha(colors.red, 0.5)}
            strokeWidth={4}
          />
          {[1, 4, -1, -4].map((c) =>
            [-1, 1].map((s) => (
              <path
                key={`${c}${s}`}
                d={branch(c, s)}
                fill="none"
                stroke={c > 0 ? colors.orange : colors.highlight}
                strokeWidth={5}
              />
            )),
          )}
        </g>
        <g opacity={fadeIn(frame, c0 + 90, 8)}>
          <text
            x={show(4.2, 0).x}
            y={show(4.2, 0).y - 20}
            fill={colors.primary}
            fontSize={64}
            fontWeight={900}
          >
            +
          </text>
          <text
            x={show(0, 3).x + 20}
            y={show(0, 3).y}
            fill={colors.red}
            fontSize={64}
            fontWeight={900}
          >
            −
          </text>
        </g>
        {/* the form's grid in the current basis */}
        <g opacity={card} transform="translate(1600 340)">
          <path
            d="M -110 -60 l -18 0 l 0 170 l 18 0 M 110 -60 l 18 0 l 0 170 l -18 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={5}
          />
          {B.map((n, k) => (
            <text
              key={k}
              x={-55 + (k % 2) * 110}
              y={(k < 2 ? 0 : 85) + 6}
              fill={colors.text}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {(Math.round(n * 10) / 10).toFixed(1).replace("-", "−")}
            </text>
          ))}
        </g>
        <g opacity={card} transform="translate(1600 600)">
          <rect
            x={-130}
            y={-50}
            width={260}
            height={90}
            rx={16}
            fill={alpha(colors.bg, 0.9)}
            stroke={colors.green}
            strokeWidth={5}
          />
          <text
            y={16}
            fill={colors.green}
            fontSize={52}
            textAnchor="middle"
            fontWeight={900}
          >
            (+, −)
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1400,
          width: 420,
          textAlign: "center",
          fontSize: 34,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c1 + 20),
          translate: riseIn(frame, c1 + 20, 12),
        }}
      >
        {tx.sylvester}
      </div>
    </SceneShell>
  );
};
