import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The contraction mapping theorem on x = cos x. A title (c0). Two points
// on a line and their images under a contraction, the gap read out shrink
// by the factor q each time (c1). The graphs of y = cos x and y = x on
// [0, 1], and the cobweb from x₀ = 1 bouncing between them (c2); the step
// sizes as bars shrinking geometrically (c3). The cobweb closes on the
// crossing 0.739…, which glows (c4). The bound qⁿ/(1 − q) · d(x₁, x₀) (c5).

const PX = 160;
const PW = 640;
const PY = 780;
const PH = 560;
const sx = (x: number) => PX + PW * x;
const sy = (y: number) => PY - PH * y;
const IT = (() => {
  const xs = [1];
  for (let i = 0; i < 14; i++) xs.push(Math.cos(xs[xs.length - 1]));
  return xs;
})();

export const Contraction: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("contraction");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const k = Math.min(14, Math.floor(Math.max(0, frame - c2 - 10) / 8));
  const web: string[] = [];
  for (let i = 0; i < k; i++) {
    const x = IT[i];
    const y = IT[i + 1];
    web.push(
      `M ${sx(x)} ${sy(i === 0 ? 0 : x)} L ${sx(x)} ${sy(y)} L ${sx(y)} ${sy(y)}`,
    );
  }
  const q = Math.sin(1);
  const gapSteps = Math.min(4, Math.floor(Math.max(0, frame - c1 - 6) / 14));

  return (
    <SceneShell id="contraction">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 6 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 14} volume={0.1} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <Sfx key={`w${i}`} name="pluck2" at={c2 + 10 + i * 8} volume={0.06} />
      ))}
      <Sfx name="chime" at={c4 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c2 + 4, 10)}>
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
            y2={sy(1)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={sx(0)}
            y1={sy(0)}
            x2={sx(1)}
            y2={sy(1)}
            stroke={alpha(colors.paper, 0.7)}
            strokeWidth={4}
          />
          <path
            d={Array.from(
              { length: 51 },
              (_, i) =>
                `${i ? "L" : "M"} ${sx(i / 50)} ${sy(Math.cos(i / 50))}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path
            d={web.join(" ")}
            fill="none"
            stroke={colors.orange}
            strokeWidth={3}
          />
          <circle
            cx={sx(0.739085)}
            cy={sy(0.739085)}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c4 + 10, 8)}
          />
        </g>
        {/* the step sizes, shrinking */}
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <line
            x1={960}
            y1={760}
            x2={1760}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: Math.min(k, 13) }).map((_, i) => {
            const h = Math.abs(IT[i + 1] - IT[i]) * 600;
            return (
              <rect
                key={i}
                x={980 + i * 58}
                y={760 - h}
                width={44}
                height={h}
                rx={4}
                fill={colors.orange}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 960,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        d(Tx, Ty) ≤ q · d(x, y){" "}
        <span
          style={{
            fontFamily: fonts.mono,
            color: colors.primary,
            fontSize: 40,
          }}
        >
          q = sin 1 ≈ 0.84
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 960,
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {Array.from({ length: gapSteps + 1 }, (_, i) =>
          (q ** i).toFixed(2),
        ).join(" → ")}
      </div>
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 960,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 10),
          translate: riseIn(frame, c4 + 10, 12),
          whiteSpace: "nowrap",
        }}
      >
        {tx.fixed}:{" "}
        <span style={{ fontFamily: fonts.mono }}>
          x* = {IT[Math.max(0, k)].toFixed(4)}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 960,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c5 + 6),
          translate: riseIn(frame, c5 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        d(xₙ, x*) ≤ qⁿ/(1 − q) · d(x₁, x₀)
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        Banach · 1922
      </div>
    </SceneShell>
  );
};
