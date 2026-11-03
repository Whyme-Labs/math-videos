import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { Eq, type Tok } from "../../shared/components/Eq";
import { B, Ball, ModelPlane, P, RightAngle } from "../components/stage";
import { useStrings } from "../i18n";

// The projector P as a map of the whole space. A cloud of points floats
// above and below the plane; P drops every one of them straight onto it,
// leaving dashed tracks (c0). "Project again": a second pulse runs
// through the flattened cloud and nothing moves; a counter reads P² = P
// (c1). The cloud lifts back, and I − P sends every point sideways onto
// the upright line through 0 instead: what P throws away (c2). One b
// splits into its two parts, Pb on the plane in orange and (I − P)b
// upright in green, closing a rectangle with a right angle (c3). The
// formula P = A(AᵀA)⁻¹Aᵀ (c4).

const CLOUD: V3[] = Array.from({ length: 27 }, (_, k) => {
  const r = (n: number) => {
    const v = Math.sin(k * 91.7 + n * 47.3) * 9631.17;
    return v - Math.floor(v);
  };
  return [-1.6 + 3.2 * r(1), -1.6 + 3.2 * r(2), -1.1 + 2.2 * r(3)];
});

const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Projector: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("projector");
  const [c0, c1, c2, c3, c4] = cues;
  const flat =
    glide(frame, c0 + 20, fps, 30) * (1 - glide(frame, c2 + 4, fps, 20));
  const pulse =
    frame > c1 + 10 && frame < c1 + 50 ? (frame - c1 - 10) / 40 : -1;
  const side = glide(frame, c2 + 30, fps, 30) * (1 - glide(frame, c3, fps, 14));
  const cloud = fadeIn(frame, c0 + 4, 10) * fadeOut(frame, c3, 10);
  const split = fadeIn(frame, c3 + 10, 10);
  const pb = glide(frame, c3 + 16, fps, 20);
  const azimuth = -0.4 + (frame - c0) * 0.001;
  const steps: Tok[][] = [[tok("P", "P²"), tok("eq", " = "), tok("P2", "P")]];
  const steps2: Tok[][] = [
    [
      tok("P", "P"),
      tok("eq", " = "),
      tok("A", "A"),
      tok("(", "("),
      tok("AA", "AᵀA"),
      tok(")", ")⁻¹"),
      tok("At", "Aᵀ"),
    ],
  ];

  return (
    <SceneShell id="projector">
      <Sfx name="pop" at={c0 + 4} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="thud" at={c0 + 44} volume={0.2} />
      <Sfx name="riser" at={c1 + 10} volume={0.08} />
      <Sfx name="ding" at={c1 + 52} volume={0.25} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 30} volume={0.1} />
      <Sfx name="pluck2" at={c3 + 16} volume={0.14} />
      <Sfx name="pluck5" at={c3 + 30} volume={0.14} />
      <Sfx name="chime" at={c4 + 10} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.38}
        distance={7}
        target={[0, 0, 0.1]}
        style={{ left: -220, top: -40 }}
      >
        <ModelPlane />
        <Tube
          points={[
            [0, 0, -1.4],
            [0, 0, 1.5],
          ]}
          radius={0.012}
          color={colors.green}
          opacity={0.3 + 0.7 * side}
        />
        {CLOUD.map((q, k) => {
          const at: V3 = [
            lerp(q[0], 0, side),
            lerp(q[1], 0, side),
            lerp(q[2], 0, flat),
          ];
          return (
            <group key={k}>
              <Tube
                points={[q, [q[0], q[1], 0]]}
                radius={0.006}
                color={colors.paper}
                opacity={0.35 * cloud * flat}
              />
              <Ball
                at={at}
                r={0.05}
                color={
                  side > 0.5
                    ? colors.green
                    : flat > 0.5
                      ? colors.orange
                      : colors.text
                }
                opacity={cloud}
              />
            </group>
          );
        })}
        {pulse >= 0 ? (
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[pulse * 2.2, pulse * 2.2 + 0.06, 64]} />
            <meshBasicMaterial
              color={colors.primary}
              transparent
              opacity={1 - pulse}
            />
          </mesh>
        ) : null}
        <group>
          <Arrow3
            from={[0, 0, 0]}
            to={B}
            color={colors.text}
            radius={0.032}
            opacity={split}
          />
          {pb > 0.02 ? (
            <>
              <Arrow3
                from={[0, 0, 0.005]}
                to={[P[0] * pb, P[1] * pb, 0.005]}
                color={colors.orange}
                radius={0.032}
                opacity={split}
              />
              <Arrow3
                from={[0, 0, 0]}
                to={[0, 0, B[2] * pb]}
                color={colors.green}
                radius={0.032}
                opacity={split}
              />
              <Tube
                points={[[0, 0, B[2]], B]}
                radius={0.008}
                color={colors.paper}
                opacity={0.5 * split * pb}
              />
              <Tube
                points={[P, B]}
                radius={0.008}
                color={colors.paper}
                opacity={0.5 * split * pb}
              />
            </>
          ) : null}
          <RightAngle
            at={[0, 0, 0]}
            u={[0, 0, 1]}
            v={[0.874, 0.486, 0]}
            opacity={fadeIn(frame, c3 + 40, 8)}
          />
        </group>
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 80,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c4, 10),
          translate: riseIn(frame, c0 + 4, 14),
        }}
      >
        P
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1180,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c2, 10),
        }}
      >
        {tx.again}
      </div>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Eq steps={steps} at={[c1 + 52]} x={1420} y={300} size={84} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 20) * fadeOut(frame, c3, 10),
        }}
      >
        I − P
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          opacity: split * fadeOut(frame, c4, 10),
        }}
      >
        <div style={{ color: colors.text }}>b =</div>
        <div style={{ color: colors.orange }}>
          Pb{" "}
          <span style={{ fontFamily: fonts.body, fontSize: 40 }}>
            · {tx.fit}
          </span>
        </div>
        <div style={{ color: colors.green }}>
          + (I − P)b{" "}
          <span style={{ fontFamily: fonts.body, fontSize: 40 }}>
            · {tx.error}
          </span>
        </div>
      </div>
      <Eq
        steps={steps2}
        at={[c4 + 10]}
        x={1500}
        y={300}
        size={80}
        family={fonts.body}
      />
    </SceneShell>
  );
};
