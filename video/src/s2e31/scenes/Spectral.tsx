import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { useStrings } from "../i18n";

// The spectral theorem as multiplication. UAU⁻¹ = M_g over a graph of a
// state ψ(ω) and the real function g(ω) (c0); the product gψ appears,
// pointwise; chip (c1). The discrete case: a diagonal matrix beside a stem
// plot of g on {1, …, 5} (c2). Position: g(x) = x as a line, ψ and xψ
// (c3). Momentum: a wave packet e^(ikx) on the left, the Fourier arrow,
// and on the right its transform, a peak at k, with P ↦ ħk (c4).

const X = (t: number) => 160 + 1500 * t;
const Y = (v: number) => 560 - 160 * v;
const psi = (w: number) => Math.exp(-(((w - 0.45) / 0.18) ** 2));
const g = (w: number) => 0.5 + 1.2 * Math.sin(4 * w);
const LAMS = [1.6, -0.7, 0.9, 2.1, 0.3];

export const Spectral: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("spectral");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const partB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const partC = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const partD = fadeIn(frame, c4 + 4, 10);
  const k0 = 6 + 2 * Math.sin(Math.max(0, frame - c4 - 30) * 0.04);
  const Lx = (t: number) => 160 + 700 * t;
  const Rx = (t: number) => 1060 + 700 * t;

  return (
    <SceneShell id="spectral">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="ding" at={c1 + 40} volume={0.18} />
      {LAMS.map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 10 + i * 6} volume={0.06} />
      ))}
      <Sfx name="pluck2" at={c3 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 20} volume={0.1} />
      <Sfx name="chime" at={c4 + 50} volume={0.26} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(g, 0, 1, X, Y, 300)}
            fill="none"
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 8"
          />
          <path
            d={path(psi, 0, 1, X, Y, 300)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={path((w) => g(w) * psi(w), 0, 1, X, Y, 300)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            opacity={fadeIn(frame, c1 + 6, 10)}
          />
          {[
            ["ψ", colors.primary, 0.66, 0.55],
            ["g", colors.green, 0.02, 1.0],
            ["gψ", colors.orange, 0.38, 1.85],
          ].map(([t, c, w, v], i) => (
            <text
              key={t as string}
              x={X(w as number)}
              y={Y(v as number)}
              fill={c as string}
              fontSize={40}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={i === 2 ? fadeIn(frame, c1 + 10) : 1}
            >
              {t}
            </text>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          U A U⁻¹ = M<sub style={{ fontSize: 34 }}>g</sub>
        </div>
        <Chip
          frame={frame}
          at={c1 + 30}
          x={900}
          y={120}
          color={colors.green}
          size={42}
        >
          {tx.rightCoords}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <path
            d="M 240 200 L 220 200 L 220 680 L 240 680 M 760 200 L 780 200 L 780 680 L 760 680"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          {LAMS.map((_, r) =>
            LAMS.map((l, c) => (
              <text
                key={`${r}-${c}`}
                x={290 + c * 100}
                y={262 + r * 96}
                textAnchor="middle"
                fill={r === c ? colors.orange : alpha(colors.paper, 0.3)}
                fontSize={r === c ? 36 : 30}
                fontFamily={fonts.mono}
                fontWeight={800}
                opacity={fadeIn(frame, c2 + 6 + r * 6, 6)}
              >
                {r === c ? l.toFixed(1) : "0"}
              </text>
            )),
          )}
          <line
            x1={1000}
            y1={500}
            x2={1700}
            y2={500}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {LAMS.map((l, i) => (
            <g key={i} opacity={fadeIn(frame, c2 + 10 + i * 6, 6)}>
              <line
                x1={1080 + i * 140}
                y1={500}
                x2={1080 + i * 140}
                y2={500 - 120 * l}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <circle
                cx={1080 + i * 140}
                cy={500 - 120 * l}
                r={12}
                fill={colors.orange}
              />
              <text
                x={1080 + i * 140}
                y={l < 0 ? 470 : 550}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={30}
                fontFamily={fonts.mono}
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path((w) => 2.4 * (w - 0.3), 0, 1, X, Y, 10)}
            fill="none"
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 8"
          />
          <path
            d={path(psi, 0, 1, X, Y, 300)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={path((w) => 2.4 * (w - 0.3) * psi(w), 0, 1, X, Y, 300)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            opacity={fadeIn(frame, c3 + 16, 10)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          (Xψ)(x) = <span style={{ color: colors.green }}>x</span> · ψ(x)
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partD }}>
        <svg width={1920} height={1080}>
          <line
            x1={Lx(0)}
            y1={480}
            x2={Lx(1)}
            y2={480}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(
              (t) =>
                Math.cos(k0 * 2 * Math.PI * t - frame * 0.15) *
                Math.exp(-(((t - 0.5) / 0.25) ** 2)),
              0,
              1,
              Lx,
              (v) => 480 - 150 * v,
              500,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d="M 890 420 Q 960 360 1030 420"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 20, 8)}
          />
          <path
            d="M 1012 404 L 1032 422 L 1006 428"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 20, 8)}
          />
          <text
            x={960}
            y={350}
            textAnchor="middle"
            fill={colors.paper}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c4 + 20, 8)}
          >
            ℱ
          </text>
          <g opacity={fadeIn(frame, c4 + 26, 8)}>
            <line
              x1={Rx(0)}
              y1={620}
              x2={Rx(1)}
              y2={620}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={2}
            />
            <path
              d={path(
                (k) => Math.exp(-(((k - k0) / 1.3) ** 2)),
                0,
                12,
                (k) => Rx(k / 12),
                (v) => 620 - 300 * v,
                300,
              )}
              fill={alpha(colors.orange, 0.35)}
              stroke={colors.orange}
              strokeWidth={5}
            />
            <text
              x={Rx(k0 / 12)}
              y={670}
              textAnchor="middle"
              fill={colors.orange}
              fontSize={38}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              k
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c4 + 40),
          }}
        >
          −iħ d/dx <span style={{ color: colors.muted }}>⟶</span>{" "}
          <span style={{ color: colors.orange }}>ħk</span> ·
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
