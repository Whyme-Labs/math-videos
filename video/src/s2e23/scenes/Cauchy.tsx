import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Cauchy sequences. Fractions 1, 3/2, 7/5, 17/12, 41/29, 99/70 hop along a
// number line, each landing closer to the last (c0). A band of width ε
// slides in; past some N every later term sits inside it, and the band
// narrows while the N counter moves on (c1). A convergent sequence's
// target glows: crowding round a point is Cauchy (c2). In ℚ the point the
// fractions crowd round is a hole; completeness fills it in green (c3).
// The definition chip: complete normed space = Banach space (c4).

const F = [
  [1, 1],
  [3, 2],
  [7, 5],
  [17, 12],
  [41, 29],
  [99, 70],
  [239, 169],
];
const X0 = 240;
const X1 = 1680;
const lo = 0.95;
const hi = 1.55;
const sx = (v: number) => X0 + ((v - lo) / (hi - lo)) * (X1 - X0);

export const Cauchy: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("cauchy");
  const [c0, c1, c2, c3, c4] = cues;
  const n = Math.min(
    F.length,
    Math.floor(Math.max(0, frame - c0 - 6) / 14) + 1,
  );
  const band = glide(frame, c1 + 6, fps, 20);
  const shrink = glide(frame, c1 + 40, fps, 60);
  const eps = lerp(0.12, 0.012, shrink);
  const N = eps > 0.05 ? 2 : eps > 0.02 ? 4 : 5;
  const fill = glide(frame, c3 + 30, fps, 16);

  return (
    <SceneShell id="cauchy">
      {F.map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 14} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c3 + 30} volume={0.3} />
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={X0}
          y1={520}
          x2={X1}
          y2={520}
          stroke={colors.paper}
          strokeWidth={5}
        />
        <rect
          x={sx(Math.SQRT2 - eps)}
          y={430}
          width={sx(Math.SQRT2 + eps) - sx(Math.SQRT2 - eps)}
          height={180}
          fill={alpha(colors.green, 0.15 * band)}
          stroke={colors.green}
          strokeWidth={3}
          opacity={band}
        />
        {F.slice(0, n).map(([p, q], i) => {
          const v = p / q;
          const inside = band > 0.5 && i >= N;
          return (
            <g key={i}>
              <circle
                cx={sx(v)}
                cy={520}
                r={13}
                fill={inside ? colors.green : colors.primary}
              />
              {i < 3 ? (
                <text
                  x={sx(v)}
                  y={i % 2 ? 690 : 400}
                  fill={colors.primary}
                  fontSize={36}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  textAnchor="middle"
                >
                  {p}/{q}
                </text>
              ) : null}
            </g>
          );
        })}
        <circle
          cx={sx(Math.SQRT2)}
          cy={520}
          r={20}
          fill={fill > 0.5 ? colors.green : "none"}
          stroke={
            frame >= c3 + 6
              ? fill > 0.5
                ? colors.green
                : colors.red
              : colors.text
          }
          strokeWidth={5}
          strokeDasharray={fill > 0.5 ? undefined : "6 5"}
          opacity={fadeIn(frame, c2 + 6, 8)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.green,
          opacity: band,
          whiteSpace: "nowrap",
        }}
      >
        m, n ≥ N ⇒ |xₘ − xₙ| &lt; ε
        <span
          style={{
            fontFamily: fonts.mono,
            color: colors.text,
            marginLeft: 30,
            fontSize: 42,
          }}
        >
          ε = {eps.toFixed(3)} · N = {N}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: fill > 0.5 ? colors.green : colors.red,
          opacity: fadeIn(frame, c3 + 6),
        }}
      >
        {fill > 0.5 ? "√2 ∈ ℝ" : "√2 ∉ ℚ"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 160,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c4 + 6),
          translate: riseIn(frame, c4 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        {tx.banach}
      </div>
    </SceneShell>
  );
};
