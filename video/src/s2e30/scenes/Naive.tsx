import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Why the finite proof fails. The unit circle coloured by ⟨Tx, x⟩ for a
// 2 × 2 symmetric T, a point sliding round it to the maximum (c0); an
// arrow there is the top eigenvector, and the perpendicular line is what's
// left (c1). Then L²[0, 1] and multiplication by x (c2): bumps √n on
// [1 − 1/n, 1] squeeze against x = 1 while ⟨Mf, f⟩ = 1 − 1/(2n) climbs
// (c3). A hollow ring at the top: nothing reaches 1 (c4).

const C = { x: 620, y: 470, r: 260 };
const q = (t: number) =>
  1.6 * Math.cos(t - 0.5) ** 2 + 0.4 * Math.sin(t - 0.5) ** 2;

export const Naive: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("naive");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10);
  const slide = glide(frame, c0 + 20, fps, 60);
  const t = 2.6 + (0.5 - 2.6) * slide;
  const n = Math.min(
    60,
    1 + Math.max(0, Math.floor(((frame - c3 - 6) / 6) ** 1.3)),
  );
  const X = (x: number) => 260 + 900 * x;
  const Y = (v: number) => 760 - 70 * v;

  return (
    <SceneShell id="naive">
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="ding" at={c0 + 80} volume={0.18} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 10} volume={0.06} />
      ))}
      <Sfx name="thud" at={c4 + 10} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 90 }, (_, i) => {
            const a0 = (2 * Math.PI * i) / 90;
            const a1 = (2 * Math.PI * (i + 1)) / 90;
            const v = (q((a0 + a1) / 2) - 0.4) / 1.2;
            return (
              <path
                key={i}
                d={`M ${C.x + C.r * Math.cos(a0)} ${C.y - C.r * Math.sin(a0)} A ${C.r} ${C.r} 0 0 0 ${C.x + C.r * Math.cos(a1)} ${C.y - C.r * Math.sin(a1)}`}
                stroke={alpha(colors.primary, 0.15 + 0.85 * v)}
                strokeWidth={22}
                fill="none"
              />
            );
          })}
          <circle
            cx={C.x + C.r * Math.cos(t)}
            cy={C.y - C.r * Math.sin(t)}
            r={18}
            fill={colors.highlight}
          />
          <g opacity={fadeIn(frame, c1 + 6, 8)}>
            <line
              x1={C.x}
              y1={C.y}
              x2={C.x + C.r * Math.cos(0.5)}
              y2={C.y - C.r * Math.sin(0.5)}
              stroke={colors.orange}
              strokeWidth={8}
            />
            <line
              x1={C.x - 380 * Math.sin(0.5)}
              y1={C.y - 380 * Math.cos(0.5)}
              x2={C.x + 380 * Math.sin(0.5)}
              y2={C.y + 380 * Math.cos(0.5)}
              stroke={colors.green}
              strokeWidth={4}
              strokeDasharray="12 8"
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1100,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          max ⟨Tx, x⟩ on ‖x‖ = 1
        </div>
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 1100,
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
          }}
        >
          ⟨Tx, x⟩ = {q(t).toFixed(3)}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {frame >= c3 && (
            <path
              d={`M ${X(1 - 1 / n)} ${Y(0)} L ${X(1 - 1 / n)} ${Math.max(140, Y(Math.sqrt(n)))} L ${X(1)} ${Math.max(140, Y(Math.sqrt(n)))} L ${X(1)} ${Y(0)} Z`}
              fill={alpha(colors.primary, 0.4)}
              stroke={colors.primary}
              strokeWidth={4}
            />
          )}
          <circle
            cx={X(1)}
            cy={Y(0) - 0}
            r={22}
            fill="none"
            stroke={colors.red}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 8, 6)}
          />
          <text
            x={X(0)}
            y={Y(0) + 46}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            0
          </text>
          <text
            x={X(1)}
            y={Y(0) + 46}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            1
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1240,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          (Mf)(x) = x·f(x)
        </div>
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 1240,
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c3 + 6),
            whiteSpace: "nowrap",
          }}
        >
          ⟨Mf, f⟩ = {(1 - 1 / (2 * n)).toFixed(3)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 1240,
            fontSize: 46,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 10),
            whiteSpace: "nowrap",
          }}
        >
          {tx.noMax}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
