import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  FloorGrid,
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { useStrings } from "../i18n";

// Rectangular maps. A 3 × 2 matrix B = [1 1; 0 1; 1 0]: the disc on the
// left (c0) lands in 3D as a flat ellipse in a tilted plane, its axes √3
// and 1, with the leftover output direction u₃ dashed (c1). Then the 2 × 3
// matrix Bᵀ: a ball in 3D squashes down onto an ellipse in the floor
// (c2), and the direction (−1, 1, 1) shrinks to nothing on the way: σ = 0,
// the kernel (c3).

const B = (x: number, y: number): V3 => [x + y, y, x];
const BT = (p: V3): V3 => [p[0] + p[2], p[0] + p[1], 0];
const K: V3 = [-1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
const U3: V3 = [-1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];

export const Rect: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rect");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10);
  const lift = glide(frame, c1 + 6, fps, 30);
  const crush =
    glide(frame, c2 + 40, fps, 40) * (1 - glide(frame, c3 + 4, fps, 16)) +
    glide(frame, c3 + 40, fps, 40);
  const mix = (p: V3): V3 => {
    const q = BT(p);
    return [
      lerp(p[0], q[0], crush),
      lerp(p[1], q[1], crush),
      lerp(p[2], q[2], crush),
    ];
  };
  const ball = (u: number, v: number): V3 =>
    mix([
      Math.sin(u * Math.PI) * Math.cos(v * Math.PI * 2),
      Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 2),
      Math.cos(u * Math.PI),
    ]);
  const azimuth = -0.6 + (frame - c0) * 0.0015;

  return (
    <SceneShell id="rect">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 40} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 40} volume={0.12} />
      <Sfx name="thud" at={c2 + 80} volume={0.22} />
      <Sfx name="ding" at={c3 + 20} volume={0.26} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={360}
            cy={480}
            r={150}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <text
            x={360}
            y={720}
            fill={colors.muted}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            ℝ²
          </text>
          <text
            x={1300}
            y={790}
            fill={colors.muted}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            ℝ³
          </text>
        </svg>
        <Stage3D
          azimuth={azimuth}
          elevation={0.4}
          distance={6.4}
          target={[0.4, 0.2, 0.4]}
          style={{ left: 380, top: -40 }}
        >
          <FloorGrid n={2} color={colors.paper} opacity={0.12} />
          <ParamSurface
            p={(a, b) => {
              const q = B(
                a * Math.cos(b * Math.PI * 2),
                a * Math.sin(b * Math.PI * 2),
              );
              return [q[0] * lift, q[1] * lift, q[2] * lift];
            }}
            res={32}
            color={colors.primary}
            opacity={0.45}
          />
          <Arrow3
            from={[0, 0, 0]}
            to={B(0.707 * lift, 0.707 * lift)}
            color={colors.green}
            radius={0.03}
            opacity={fadeIn(frame, c1 + 40, 8)}
          />
          <Arrow3
            from={[0, 0, 0]}
            to={B(0.707 * lift, -0.707 * lift)}
            color={colors.orange}
            radius={0.03}
            opacity={fadeIn(frame, c1 + 40, 8)}
          />
          <Tube
            points={[
              [0, 0, 0],
              [U3[0] * 1.2, U3[1] * 1.2, U3[2] * 1.2],
            ]}
            radius={0.014}
            color={colors.highlight}
            opacity={fadeIn(frame, c1 + 50, 8)}
          />
        </Stage3D>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120,
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 4),
          }}
        >
          3 × 2
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <Stage3D
          azimuth={azimuth}
          elevation={0.45}
          distance={7}
          target={[0.3, 0.3, 0]}
          style={{ left: -100, top: -40 }}
        >
          <FloorGrid n={2} color={colors.paper} opacity={0.18} />
          <ParamSurface p={ball} res={40} color={colors.violet} opacity={0.5} />
          <Tube
            points={[
              [0, 0, 0],
              [K[0] * 1.3, K[1] * 1.3, K[2] * 1.3],
            ]}
            radius={0.012}
            color={colors.red}
            opacity={0.5 * fadeIn(frame, c3 + 14, 8)}
          />
          <Arrow3
            from={[0, 0, 0]}
            to={mix([K[0] * 1.3, K[1] * 1.3, K[2] * 1.3])}
            color={colors.red}
            radius={0.035}
            opacity={fadeIn(frame, c3 + 14, 8)}
          />
        </Stage3D>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120,
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          2 × 3
        </div>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1280,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.red}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 48,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c3 + 20),
            translate: riseIn(frame, c3 + 20, 14),
          }}
        >
          σ = 0 · {tx.kernel}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
