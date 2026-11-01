import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Schur, then the spectral theorem. A 3 × 3 matrix of stars with λ₁, λ₂, λ₃
// on the diagonal. An orthonormal frame on the right turns, and the stars
// below the diagonal drain to 0: triangular. Then a badge (commutes with its
// adjoint) and the stars above drain too: diagonal. Last, a small complex
// plane: three eigenvalue dots slide onto the real line (Hermitian), then
// onto the unit circle (unitary).

const EIG = [
  { x: 0.9, y: 0.7 },
  { x: -0.6, y: 0.4 },
  { x: 0.2, y: -0.9 },
];
const REAL = [1.2, -0.7, 0.3];
const CIRC = [0.7, 2.6, -1.4];

export const Spectral: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("spectral");
  const [c0, c1] = cues;
  const turn = glide(frame, c0 + 30, fps, 50);
  const lower = glide(frame, c0 + 50, fps, 30);
  const upper = glide(frame, c1 + 40, fps, 30);
  const herm = glide(frame, c1 + 80, fps, 24);
  const unit = glide(frame, c1 + 140, fps, 24);
  const F = { x: 1500, y: 300 };
  const fa = -0.2 + turn * 1.1;
  const P = { x: 1500, y: 640 };
  const S = 130;

  return (
    <SceneShell id="spectral">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="chime" at={c0 + 80} volume={0.6} />
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      <Sfx name="chime" at={c1 + 70} volume={0.6} />
      <Sfx name="pluck2" at={c1 + 80} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 140} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform="translate(640 470)">
          <path
            d="M -280 -230 l -24 0 l 0 460 l 24 0 M 280 -230 l 24 0 l 0 460 l -24 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          {Array.from({ length: 9 }).map((_, n) => {
            const i = Math.floor(n / 3);
            const j = n % 3;
            const x = -180 + j * 180;
            const y = -120 + i * 150;
            if (i === j)
              return (
                <text
                  key={n}
                  x={x}
                  y={y + 20}
                  fill={colors.orange}
                  fontSize={68}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  λ
                  <tspan dy={14} fontSize={40}>
                    {i + 1}
                  </tspan>
                </text>
              );
            const t = i > j ? lower : upper;
            return (
              <g key={n}>
                <text
                  x={x}
                  y={y + 30}
                  fill={colors.text}
                  fontSize={84}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={1 - t}
                >
                  ∗
                </text>
                <text
                  x={x}
                  y={y + 22}
                  fill={alpha(colors.green, 0.8)}
                  fontSize={64}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={t}
                >
                  0
                </text>
              </g>
            );
          })}
        </g>
        {/* the orthonormal frame */}
        <g opacity={fadeIn(frame, c0 + 20) * (1 - fadeIn(frame, c1 + 70))}>
          <Arrow
            from={F}
            to={{ x: F.x + 150 * Math.cos(fa), y: F.y - 150 * Math.sin(fa) }}
            width={12}
          />
          <Arrow
            from={F}
            to={{ x: F.x - 150 * Math.sin(fa), y: F.y - 150 * Math.cos(fa) }}
            width={12}
          />
        </g>
        {/* the eigenvalue plane */}
        <g opacity={fadeIn(frame, c1 + 70)}>
          <line
            x1={P.x - 260}
            y1={P.y}
            x2={P.x + 260}
            y2={P.y}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <line
            x1={P.x}
            y1={P.y - 180}
            x2={P.x}
            y2={P.y + 180}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <circle
            cx={P.x}
            cy={P.y}
            r={S}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={unit}
          />
          {EIG.map((e, i) => {
            const x = lerp(lerp(e.x, REAL[i], herm), Math.cos(CIRC[i]), unit);
            const y = lerp(lerp(e.y, 0, herm), Math.sin(CIRC[i]), unit);
            return (
              <circle
                key={i}
                cx={P.x + x * S}
                cy={P.y - y * S}
                r={16}
                fill={colors.orange}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.schur}
      </div>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1260,
          width: 480,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 16,
          border: `5px solid ${colors.highlight}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 36,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 10) * (1 - fadeIn(frame, c1 + 70)),
          translate: riseIn(frame, c1 + 10, 12),
        }}
      >
        {tx.normal}
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 1260,
          width: 480,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: unit > 0.5 ? colors.primary : colors.green,
          opacity: fadeIn(frame, c1 + 80),
        }}
      >
        {unit > 0.5 ? tx.unitaryEig : tx.hermitian}
      </div>
    </SceneShell>
  );
};
