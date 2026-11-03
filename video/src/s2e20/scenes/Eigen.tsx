import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// Loss five. Over ℂ, det(A − λI) = 0 always has a root (c0). A function f
// on [0, 1] and the formula x·f = λf → (x − λ)f = 0 (c1). f is squeezed
// to 0 everywhere but λ, then the last point drops too: f = 0 (c2).
// Sampled at n points, M is a diagonal matrix with a spike for each
// eigenvector (c3); n doubles, 6, 12, 24, 48, and the spikes thin away
// (c4). A tent at 0.3 narrows, n = 10, 100, 1000, its miss ‖(M − 0.3)f‖ =
// 1/(4n) read out; the fifth ledger line is crossed (c5).

const PX = 160;
const PW = 960;
const PY = 640;
const PH = 360;
const sx = (x: number) => PX + PW * x;
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Eigen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("eigen");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const part3 = fadeIn(frame, c5 + 4, 10);
  const squeeze = glide(frame, c2 + 6, fps, 30);
  const dropDot = glide(frame, c2 + 50, fps, 16);
  const L = 0.5;
  const f = (x: number) => 0.6 + 0.3 * Math.sin(6 * x);
  // f squeezed to 0 outside a window round λ that shrinks to nothing
  const win = lerp(0.6, 0.004, squeeze);
  const fs = (x: number) =>
    f(x) * Math.min(1, Math.max(0, (win - Math.abs(x - L)) / 0.02));
  const ns = [6, 12, 24, 48];
  const ni =
    frame < c4 + 6 ? 0 : Math.min(3, Math.floor((frame - c4 - 6) / 30) + 1);
  const n = ns[ni];
  const tn = [10, 100, 1000];
  const ti = Math.min(2, Math.floor(Math.max(0, frame - c5 - 10) / 40));
  const w =
    1 /
    lerp(
      tn[Math.max(0, ti - 1)],
      tn[ti],
      glide(frame, c5 + 10 + ti * 40, fps, 20),
    );
  const tent = (x: number) => Math.max(0, 1 - Math.abs(x - 0.3) / w);
  const steps: Tok[][] = [
    [tok("x", "x · f"), tok("eq", " = "), tok("l", "λf")],
    [tok("(", "(x − λ)"), tok("f", " f"), tok("eq", " = "), tok("z", "0")],
  ];
  const crossed = 4 + glide(frame, c5 + 110, fps, 20);
  const path = (g: (x: number) => number, k: number, y0: number) =>
    Array.from({ length: 601 }, (_, i) => {
      const x = i / 600;
      return `${i ? "L" : "M"} ${sx(x).toFixed(1)} ${(y0 - k * g(x)).toFixed(1)}`;
    }).join(" ");

  return (
    <SceneShell id="eigen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="thud" at={c2 + 56} volume={0.2} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      {[1, 2, 3].map((i) => (
        <Sfx key={i} name="tick" at={c4 + 6 + (i - 1) * 30} volume={0.12} />
      ))}
      {[0, 1, 2].map((i) => (
        <Sfx key={`t${i}`} name="whoosh" at={c5 + 10 + i * 40} volume={0.08} />
      ))}
      <Sfx name="scratch" at={c5 + 110} volume={0.2} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.body,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 8),
        }}
      >
        ℂⁿ: det(A − λI) = 0 ✓
      </div>

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={path(fs, PH, PY)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={7}
            opacity={squeeze > 0.97 ? 0 : 1}
          />
          <path
            d={path((x) => x * fs(x), PH, PY)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            strokeDasharray="12 8"
            opacity={(1 - squeeze) * fadeIn(frame, c1 + 30, 8)}
          />
          <line
            x1={sx(L)}
            y1={PY + 20}
            x2={sx(L)}
            y2={PY - 360}
            stroke={alpha(colors.highlight, 0.5)}
            strokeWidth={3}
            strokeDasharray="8 8"
            opacity={fadeIn(frame, c1 + 50, 8)}
          />
          <circle
            cx={sx(L)}
            cy={lerp(PY - PH * f(L), PY, dropDot)}
            r={13}
            fill={colors.primary}
            opacity={squeeze > 0.97 ? 1 : 0}
          />
          <text
            x={sx(L)}
            y={PY + 50}
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            λ
          </text>
        </svg>
        <Eq steps={steps} at={[c1 + 6, c1 + 50]} x={640} y={110} size={64} />
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c2 + 66),
            translate: riseIn(frame, c2 + 66, 12),
          }}
        >
          f = 0
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {/* the diagonal matrix */}
          {Array.from({ length: n }).map((_, i) => {
            const cs = 360 / n;
            return (
              <rect
                key={i}
                x={160 + i * cs}
                y={140 + i * cs}
                width={cs - 1}
                height={cs - 1}
                fill={alpha(colors.primary, 0.2 + 0.8 * ((i + 0.5) / n))}
              />
            );
          })}
          <rect
            x={160}
            y={140}
            width={360}
            height={360}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
          />
          {/* three of its eigenvectors, as spikes */}
          {[0.2, 0.5, 0.8].map((p, j) => {
            const i = Math.floor(p * n);
            const bw = 520 / n;
            return (
              <g key={j} transform={`translate(${600} ${200 + j * 200})`}>
                <line
                  x1={0}
                  y1={130}
                  x2={520}
                  y2={130}
                  stroke={alpha(colors.paper, 0.5)}
                  strokeWidth={3}
                />
                <rect
                  x={i * bw}
                  y={10}
                  width={Math.max(2, bw - 2)}
                  height={120}
                  fill={colors.green}
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 160,
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          n = {n}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={path(tent, PH, PY)}
            fill={alpha(colors.green, 0.2)}
            stroke={colors.green}
            strokeWidth={6}
          />
          <text
            x={sx(0.3)}
            y={PY + 50}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.mono}
            textAnchor="middle"
          >
            0.3
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 160,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: fonts.mono }}>n = {tn[ti]}</span>
          <span style={{ color: colors.highlight, marginLeft: 36 }}>
            {tx.miss}{" "}
            <span style={{ fontFamily: fonts.mono }}>
              1/(4n) = {(1 / (4 * tn[ti])).toFixed(5)}
            </span>
          </span>
        </div>
      </AbsoluteFill>
      <Ledger crossed={crossed} active={4} compact />
    </SceneShell>
  );
};
