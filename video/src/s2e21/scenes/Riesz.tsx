import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { ModelPlane } from "../../s2e17/components/stage";
import { useStrings } from "../i18n";

// Riesz's lemma, built step by step in 3D. A first unit vector x₁ and
// the line through it (c0). A unit vector x₂ off that line, its distance
// to the line marked ≥ ½ (c1). The plane of x₁ and x₂ lights, and x₃
// stands off it, again ≥ ½ away (c2). In infinite dimensions this never
// stops: a fan of unit vectors keeps growing, the closest pair ≥ ½ apart
// read out (c3). A chip: compact unit ball ⇔ finite dimension (c4).

const X1: V3 = [1, 0, 0];
const X2: V3 = [0.3, 0.95, 0];
const X3: V3 = [0.2, 0.3, 0.93];

export const Riesz: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("riesz");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const g2 = glide(frame, c1 + 6, fps, 20);
  const g3 = glide(frame, c2 + 20, fps, 20);
  const fanN = Math.min(14, Math.floor(Math.max(0, frame - c3 - 6) / 7) + 1);
  const C = { x: 700, y: 470 };

  return (
    <SceneShell id="riesz">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="riser" at={c2 + 6} volume={0.08} />
      <Sfx name="pluck4" at={c2 + 20} volume={0.14} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 7} volume={0.08} />
      ))}
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <Stage3D
          azimuth={-0.7 + (frame - c0) * 0.0018}
          elevation={0.4}
          distance={5.2}
          target={[0.3, 0.3, 0.3]}
          style={{ left: -200, top: -20 }}
        >
          <Tube
            points={[
              [-1.8, 0, 0],
              [1.8, 0, 0],
            ]}
            radius={0.012}
            color={colors.primary}
            opacity={
              0.6 * fadeIn(frame, c0 + 10, 8) * (1 - fadeIn(frame, c2 + 6, 8))
            }
          />
          <group visible={frame >= c2}>
            <ModelPlane size={1.6} opacity={fadeIn(frame, c2 + 6, 10)} />
          </group>
          <Arrow3
            from={[0, 0, 0]}
            to={X1}
            color={colors.primary}
            radius={0.035}
            opacity={fadeIn(frame, c0 + 6, 8)}
          />
          {g2 > 0.02 ? (
            <Arrow3
              from={[0, 0, 0]}
              to={[X2[0] * g2, X2[1] * g2, 0]}
              color={colors.green}
              radius={0.035}
            />
          ) : null}
          <Tube
            points={[X2, [X2[0], 0, 0]]}
            radius={0.01}
            color={colors.paper}
            opacity={fadeIn(frame, c1 + 26, 8) * (1 - fadeIn(frame, c2 + 6, 8))}
          />
          {g3 > 0.02 ? (
            <Arrow3
              from={[0, 0, 0]}
              to={[X3[0] * g3, X3[1] * g3, X3[2] * g3]}
              color={colors.highlight}
              radius={0.035}
            />
          ) : null}
          <Tube
            points={[X3, [X3[0], X3[1], 0]]}
            radius={0.01}
            color={colors.paper}
            opacity={fadeIn(frame, c2 + 40, 8)}
          />
        </Stage3D>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1240,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          <div
            style={{ color: colors.primary, opacity: fadeIn(frame, c0 + 6) }}
          >
            x₁
          </div>
          <div style={{ color: colors.green, opacity: fadeIn(frame, c1 + 26) }}>
            x₂ · {tx.far}
          </div>
          <div
            style={{ color: colors.highlight, opacity: fadeIn(frame, c2 + 40) }}
          >
            x₃ · {tx.far}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: fanN }).map((_, k) => {
            const a = 0.3 + k * 0.47;
            const d = 1 / (1 + k * 0.06);
            const tip = {
              x: C.x + 300 * d * Math.cos(a),
              y: C.y - 260 * d * Math.sin(a),
            };
            return (
              <g key={k} opacity={d}>
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={
                    [colors.primary, colors.green, colors.highlight][k % 3]
                  }
                  strokeWidth={6 * d}
                  strokeLinecap="round"
                />
                <circle cx={tip.x} cy={tip.y} r={10 * d} fill={colors.text} />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1240,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ‖xₙ − xₘ‖ ≥ ½{" "}
          <span style={{ fontFamily: fonts.mono, color: colors.muted }}>
            ({fanN})
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 1240,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.highlight}`,
            background: alpha(colors.bg, 0.85),
            fontFamily: fonts.body,
            fontSize: 44,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 6),
            translate: riseIn(frame, c4 + 6, 12),
            whiteSpace: "nowrap",
          }}
        >
          {tx.compact} ⇔ dim &lt; ∞
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
