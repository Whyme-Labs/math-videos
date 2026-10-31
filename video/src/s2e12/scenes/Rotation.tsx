import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// A rotation has no real eigenvector. A fan of arrows and their faint
// lines; the plane turns by 50° and every arrow leaves its line. Then the
// complex picture: a unit circle in ℂ with the two eigenvalues e^{±iθ} as
// two dots, spinning in opposite directions.

const O = { x: 760, y: 470 };

export const Rotation: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rotation");
  const [c0, c1] = cues;
  const turn = (glide(frame, c0 + 20, fps, 40) * (50 * Math.PI)) / 180;
  const part1 = fadeOut(frame, c1, 10);
  const dots = Math.min(1, springIn(frame, c1 + 20, fps, 10));
  const spin = (frame - c1) * 0.03;
  const C = { x: 960, y: 470 };
  const R = 260;

  return (
    <SceneShell id="rotation">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="scratch" at={c0 + 60} volume={0.2} />
      <Sfx name="pop" at={c1 + 20} volume={0.16} />
      <Sfx name="chime" at={c1 + 40} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI;
            return (
              <g key={k}>
                <line
                  x1={O.x - 340 * Math.cos(a)}
                  y1={O.y - 340 * Math.sin(a)}
                  x2={O.x + 340 * Math.cos(a)}
                  y2={O.y + 340 * Math.sin(a)}
                  stroke={alpha(colors.paper, 0.15)}
                  strokeWidth={3}
                />
                <Arrow
                  from={O}
                  to={{
                    x: O.x + 220 * Math.cos(a - turn),
                    y: O.y + 220 * Math.sin(a - turn),
                  }}
                  width={9}
                  color={k % 2 ? colors.highlight : colors.primary}
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1240,
            fontSize: 52,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c0 + 60),
            translate: riseIn(frame, c0 + 60, 12),
          }}
        >
          {tx.noReal} ✗
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={C.x - 360}
            y1={C.y}
            x2={C.x + 360}
            y2={C.y}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={C.x}
            y1={C.y - 330}
            x2={C.x}
            y2={C.y + 330}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <circle
            cx={C.x}
            cy={C.y}
            r={R}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
          />
          <text
            x={C.x + 330}
            y={C.y - 16}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.math}
          >
            ℝ
          </text>
          <text
            x={C.x + 16}
            y={C.y - 300}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.math}
          >
            i
          </text>
          {[1, -1].map((s) => {
            const a = s * (0.87 + spin);
            const p = { x: C.x + R * Math.cos(a), y: C.y - R * Math.sin(a) };
            return (
              <g key={s} opacity={dots}>
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={p.x}
                  y2={p.y}
                  stroke={alpha(colors.primary, 0.6)}
                  strokeWidth={4}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={22 * dots}
                  fill={s > 0 ? colors.primary : colors.highlight}
                />
                <text
                  x={p.x + 30}
                  y={p.y + (s > 0 ? -20 : 50)}
                  fill={s > 0 ? colors.primary : colors.highlight}
                  fontSize={52}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  e
                  <tspan dy={-22} fontSize={34}>
                    {s > 0 ? "+iθ" : "−iθ"}
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1340,
            fontSize: 52,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 40),
            translate: riseIn(frame, c1 + 40, 12),
          }}
        >
          {tx.complex} ✓
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
