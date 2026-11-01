import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  Stage3D,
  Surface,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { useStrings } from "../i18n";

// The gradient, in 3D. The hill f = x²y as a surface over the floor, its
// contour lines both on the hill and dropped onto the floor, and the
// point P = (1, 2) where df = (4, 1). Around P on the floor an orange local
// stack grows: the tangent sheets 4x + y = k, which count contours crossed.
// Then the arrow for df on the floor: with the dot product it's (4, 1), the
// textbook gradient; with the ruler G = diag(4, 1) it's G⁻¹df = (1, 1). The
// arrow swings between the two rulers while a fixed step h = (0.25, 0.5),
// in green, climbs the same 1.5 up the tangent plane every time. The camera
// circles the hill throughout.

const K = 0.2; // height scale
const f = (x: number, y: number) => x * x * y;
const LEVELS = [0.5, 1, 2, 3, 4.5, 6];
const X0 = 0.45;
const X1 = 1.65;
const Y0 = 0.7;
const Y1 = 3.1;
const contour = (c: number, z: number): V3[] => {
  const pts: V3[] = [];
  for (let i = 0; i <= 50; i++) {
    const x = X0 + (i / 50) * (X1 - X0);
    const y = c / (x * x);
    if (y >= Y0 && y <= Y1) pts.push([x, y, z]);
  }
  return pts;
};
const H = { x: 0.25, y: 0.5 };

export const Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("gradient");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const flip =
    frame < c3 + 10
      ? 0
      : glide(frame, c3 + 10, fps, 30) -
        glide(frame, c4 + 20, fps, 30) +
        glide(frame, c4 + 90, fps, 30) -
        glide(frame, c5 + 20, fps, 30);
  const g = { x: lerp(4, 1, flip), y: 1 };
  const n = Math.hypot(g.x, g.y);
  const rise = glide(frame, c0 + 4, fps, 30);
  const stack = fadeIn(frame, c1 + 6, 12);
  const arrows = fadeIn(frame, c2 + 10, 10);
  const climbOp = fadeIn(frame, c4 + 6, 10);
  const azimuth = -0.95 + (frame - c0) * 0.002;
  const P0: V3 = [1, 2, 0];
  const Ps: V3 = [1, 2, K * rise * f(1, 2)];
  // the tangent direction of the contour through P, and the local sheets
  const t = { x: 1 / Math.sqrt(17), y: -4 / Math.sqrt(17) };

  return (
    <SceneShell id="gradient">
      <Sfx name="riser" at={c0 + 4} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c4 + 90} volume={0.1} />
      <Sfx name="whoosh" at={c5 + 20} volume={0.1} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.5}
        distance={5.4}
        target={[1.05, 1.9, 0.55]}
        style={{ left: -230, top: -90 }}
      >
        {/* the floor the contours are dropped onto */}
        <mesh position={[(X0 + X1) / 2, (Y0 + Y1) / 2, -0.002]}>
          <planeGeometry args={[X1 - X0, Y1 - Y0]} />
          <meshStandardMaterial
            color={colors.paper}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
        {(
          [
            [X0, Y0, X1, Y0],
            [X1, Y0, X1, Y1],
            [X1, Y1, X0, Y1],
            [X0, Y1, X0, Y0],
          ] as const
        ).map(([a, b, c, d], k) => (
          <Tube
            key={k}
            points={[
              [a, b, 0],
              [c, d, 0],
            ]}
            radius={0.006}
            color={colors.paper}
            opacity={0.35}
          />
        ))}
        <Surface
          f={(x, y) => K * rise * f(x, y)}
          range={[X0, X1, Y0, Y1]}
          color={colors.green}
          opacity={0.4}
        />
        {LEVELS.map((c) => (
          <group key={c}>
            <Tube
              points={contour(c, 0)}
              radius={c === 2 ? 0.024 : 0.014}
              color={colors.orange}
              opacity={c === 2 ? 1 : 0.6}
            />
            <Tube
              points={contour(c, K * rise * c)}
              radius={0.012}
              color={colors.orange}
              opacity={0.35 * rise}
            />
          </group>
        ))}
        {[-3, -2, -1, 1, 2, 3].map((k) => {
          const d = k * 0.11;
          const cx = 1 + (4 * d) / Math.sqrt(17);
          const cy = 2 + d / Math.sqrt(17);
          return (
            <Tube
              key={k}
              points={[
                [cx - 0.35 * t.x, cy - 0.35 * t.y, 0.005],
                [cx + 0.35 * t.x, cy + 0.35 * t.y, 0.005],
              ]}
              radius={0.016}
              color={colors.orange}
              opacity={stack}
            />
          );
        })}
        <Tube
          points={[P0, Ps]}
          radius={0.008}
          color={colors.paper}
          opacity={0.6}
        />
        <mesh position={[...Ps]}>
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshStandardMaterial color={colors.text} />
        </mesh>
        <mesh position={[...P0]}>
          <sphereGeometry args={[0.05, 20, 20]} />
          <meshStandardMaterial color={colors.text} />
        </mesh>
        <Arrow3
          from={P0}
          to={[1 + (0.95 * g.x) / n, 2 + (0.95 * g.y) / n, 0.01]}
          color={colors.primary}
          radius={0.035}
          opacity={arrows}
        />
        <Arrow3
          from={P0}
          to={[1 + H.x, 2 + H.y, 0.01]}
          color={colors.green}
          radius={0.025}
          opacity={climbOp}
        />
        <Arrow3
          from={Ps}
          to={[1 + H.x, 2 + H.y, Ps[2] + K * (4 * H.x + H.y)]}
          color={colors.green}
          radius={0.025}
          opacity={climbOp}
        />
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1300,
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 10),
          translate: riseIn(frame, c1 + 10, 14),
        }}
      >
        df = (4, 1)
      </div>
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 1300,
          width: 520,
          padding: "12px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 10),
        }}
      >
        {flip > 0.5 ? tx.otherRuler : tx.dotRuler}
        <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
          ({flip > 0.5 ? "1, 1" : "4, 1"})
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: climbOp,
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        {tx.climb}: <span style={{ fontFamily: fonts.mono }}>1.5</span>
      </div>
    </SceneShell>
  );
};
