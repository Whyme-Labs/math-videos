import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Compact operators. The definition (c0). The unit ball, drawn as a
// circle beside a row of axis bars all of height 1, is squashed by
// diag(1, ½, ⅓, …): the circle becomes an ellipse and the bars shrink to
// 1/n (c1–c2). The identity: unit vectors e₁ … e₆ as spokes, every pair
// √2 apart, nothing clusters (c3). Finite-rank versions: bars past N cut
// off, and the error ‖D − D_N‖ = 1/(N+1) drops (c4). Te₁, Te₂, … as a row
// of shrinking bars: Teₙ → 0 (c5).

const K = 12;

export const Compact: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("compact");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const squash = glide(frame, c1 + 10, fps, 40);
  const part1 = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const part3 = fadeIn(frame, c4 + 4, 10);
  const N = Math.min(10, 1 + Math.max(0, Math.floor((frame - c4 - 10) / 14)));

  return (
    <SceneShell id="compact">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.1} />
      <Sfx name="pluck2" at={c2 + 8} volume={0.12} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 6} volume={0.06} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="pluck1" at={c4 + 10 + i * 14} volume={0.06} />
      ))}
      <Sfx name="chime" at={c5 + 10} volume={0.26} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <ellipse
            cx={500}
            cy={500}
            rx={240}
            ry={lerp(240, 120, squash)}
            fill={alpha(colors.primary, 0.18)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <line
            x1={260}
            y1={500}
            x2={740}
            y2={500}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={500}
            y1={260}
            x2={500}
            y2={740}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={960}
            y1={720}
            x2={1780}
            y2={720}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: K }, (_, k) => {
            const h = 380 * lerp(1, 1 / (k + 1), squash);
            return (
              <rect
                key={k}
                x={980 + k * 66}
                y={720 - h}
                width={44}
                height={h}
                rx={6}
                fill={k < 2 ? colors.primary : colors.orange}
                opacity={fadeIn(frame, c1 + 4 + k * 2, 6)}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 960,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 10),
            whiteSpace: "nowrap",
          }}
        >
          D = diag(1, ½, ⅓, …) · {tx.axes}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 6 }, (_, k) => {
            const a = (2 * Math.PI * k) / 6 + 0.3;
            return (
              <g key={k} opacity={fadeIn(frame, c3 + 6 + k * 6, 6)}>
                <line
                  x1={760}
                  y1={480}
                  x2={760 + 280 * Math.cos(a)}
                  y2={480 - 280 * Math.sin(a)}
                  stroke={colors.primary}
                  strokeWidth={6}
                />
                <circle
                  cx={760 + 280 * Math.cos(a)}
                  cy={480 - 280 * Math.sin(a)}
                  r={14}
                  fill={colors.highlight}
                />
              </g>
            );
          })}
          <path
            d={Array.from({ length: 7 }, (_, k) => {
              const a = (2 * Math.PI * k) / 6 + 0.3;
              return `${k ? "L" : "M"} ${760 + 280 * Math.cos(a)} ${480 - 280 * Math.sin(a)}`;
            }).join(" ")}
            fill="none"
            stroke={colors.red}
            strokeWidth={3}
            strokeDasharray="10 7"
            opacity={fadeIn(frame, c3 + 50, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1200,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.red,
            whiteSpace: "nowrap",
          }}
        >
          I: ‖eₙ − eₘ‖ = √2
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={420}
            x2={1020}
            y2={420}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: K }, (_, k) => (
            <rect
              key={k}
              x={220 + k * 66}
              y={420 - 260 / (k + 1)}
              width={44}
              height={260 / (k + 1)}
              rx={6}
              fill={k < N ? colors.green : alpha(colors.paper, 0.15)}
            />
          ))}
          <g opacity={fadeIn(frame, c5 + 4, 8)}>
            <line
              x1={200}
              y1={760}
              x2={1020}
              y2={760}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            {Array.from({ length: K }, (_, k) => (
              <circle
                key={k}
                cx={242 + k * 66}
                cy={760 - 220 / (k + 1)}
                r={12}
                fill={colors.highlight}
                opacity={fadeIn(frame, c5 + 6 + k * 3, 4)}
              />
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1120,
            fontFamily: fonts.mono,
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
          }}
        >
          N = {N} · ‖D − Dₙ‖ = 1/{N + 1}
        </div>
        <div
          style={{
            position: "absolute",
            top: 560,
            left: 1120,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c5 + 20),
            whiteSpace: "nowrap",
          }}
        >
          ‖Deₙ‖ = 1/n → 0
        </div>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut(frame, c1, 8) }}>
        <Chip
          frame={frame}
          at={c0 + 6}
          x={360}
          y={420}
          color={colors.text}
          size={48}
        >
          {tx.defn}
        </Chip>
      </div>
    </SceneShell>
  );
};
