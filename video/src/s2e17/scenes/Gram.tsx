import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  FloorGrid,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { RightAngle, norm, unit } from "../components/stage";
import { useStrings } from "../i18n";

// Gram–Schmidt in 3D. Three lemon arrows a₁, a₂, a₃ (c0). a₁ shrinks or
// stretches to length 1 and turns green: q₁ (c1). a₂ drops a dashed line
// onto q₁'s line and its shadow appears in orange (c2); then a₂'s tip
// slides back by that shadow, leaving w₂ perpendicular to q₁, which
// scales to q₂ (c3). The plane of q₁ and q₂ lights up; a₃'s shadow on it
// appears in orange and is peeled off the same way, leaving q₃ upright
// (c4). On the right, the triangle R fills in entry by entry: lengths on
// the diagonal, peeled amounts above it, zeros below, and A = QR (c5).

const A1: V3 = [1.5, 0.35, 0];
const A2: V3 = [0.8, 1.3, 0];
const A3: V3 = [0.5, 0.7, 1.3];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sc = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mix = (a: V3, b: V3, t: number): V3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];
const Q1 = unit(A1);
const R12 = dot(A2, Q1);
const W2 = add(A2, sc(Q1, -R12));
const Q2 = unit(W2);
const R13 = dot(A3, Q1);
const R23 = dot(A3, Q2);
const S3 = add(sc(Q1, R13), sc(Q2, R23));
const W3 = add(A3, sc(S3, -1));
const Q3 = unit(W3);
const R = [
  [norm(A1), R12, R13],
  [0, norm(W2), R23],
  [0, 0, norm(W3)],
];

export const Gram: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("gram");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const s1 = glide(frame, c1 + 10, fps, 24);
  const sh2 = fadeIn(frame, c2 + 10, 10);
  const peel2 = glide(frame, c3 + 6, fps, 24);
  const s2 = glide(frame, c3 + 40, fps, 20);
  const plane = fadeIn(frame, c4 + 4, 10);
  const sh3 = fadeIn(frame, c4 + 20, 10);
  const peel3 = glide(frame, c4 + 50, fps, 24);
  const s3 = glide(frame, c4 + 84, fps, 20);
  const shadow2 = sc(Q1, R12);
  const v1 = sc(Q1, lerp(norm(A1), 1, s1));
  const v2 = mix(mix(A2, W2, peel2), Q2, s2);
  const v3 = mix(mix(A3, W3, peel3), Q3, s3);
  const azimuth = -0.75 + (frame - c0) * 0.002;
  const matrix = fadeIn(frame, c5 + 4, 10);

  return (
    <SceneShell id="gram">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pop" at={c0 + 12} volume={0.12} />
      <Sfx name="pop" at={c0 + 18} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 10} volume={0.14} />
      <Sfx name="pluck2" at={c2 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c3 + 40} volume={0.14} />
      <Sfx name="pluck4" at={c4 + 20} volume={0.14} />
      <Sfx name="whoosh" at={c4 + 50} volume={0.1} />
      <Sfx name="pluck5" at={c4 + 84} volume={0.14} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={k} name="tick" at={c5 + 10 + k * 6} volume={0.1} />
      ))}
      <Sfx name="chime" at={c5 + 50} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.45}
        distance={5.6}
        target={[0.5, 0.5, 0.45]}
        style={{ left: -260, top: -60 }}
      >
        <FloorGrid n={2} color={colors.paper} opacity={0.18} />
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial
            color={colors.violet}
            transparent
            opacity={0.45 * plane}
            depthWrite={false}
          />
        </mesh>
        {/* q₁ line and a₂'s shadow on it */}
        <Tube
          points={[sc(Q1, -0.8), sc(Q1, 2.2)]}
          radius={0.007}
          color={colors.green}
          opacity={0.5 * sh2 * fadeOut(frame, c4, 10)}
        />
        <Tube
          points={[A2, shadow2]}
          radius={0.008}
          color={colors.paper}
          opacity={sh2 * (1 - peel2)}
        />
        <Arrow3
          from={[0, 0, 0.004]}
          to={[shadow2[0], shadow2[1], 0.004]}
          color={colors.orange}
          radius={0.028}
          opacity={sh2 * fadeOut(frame, c3 + 30, 10)}
        />
        {/* a₃'s shadow on the plane */}
        <Tube
          points={[A3, S3]}
          radius={0.008}
          color={colors.paper}
          opacity={sh3 * (1 - peel3)}
        />
        <Arrow3
          from={[0, 0, 0.004]}
          to={[S3[0], S3[1], 0.004]}
          color={colors.orange}
          radius={0.028}
          opacity={sh3 * fadeOut(frame, c4 + 74, 10)}
        />
        <Arrow3
          from={[0, 0, 0]}
          to={v1}
          color={s1 > 0.5 ? colors.green : colors.primary}
          radius={0.034}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
        <Arrow3
          from={[0, 0, 0]}
          to={v2}
          color={s2 > 0.5 ? colors.green : colors.primary}
          radius={0.034}
          opacity={fadeIn(frame, c0 + 12, 8)}
        />
        <Arrow3
          from={[0, 0, 0]}
          to={v3}
          color={s3 > 0.5 ? colors.green : colors.primary}
          radius={0.034}
          opacity={fadeIn(frame, c0 + 18, 8)}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={Q1}
          v={Q2}
          s={0.2}
          opacity={fadeIn(frame, c3 + 30, 8)}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={Q2}
          v={Q3}
          s={0.2}
          opacity={fadeIn(frame, c4 + 74, 8)}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={Q1}
          v={Q3}
          s={0.2}
          opacity={fadeIn(frame, c4 + 74, 8)}
        />
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1180,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, c5, 10),
          translate: riseIn(frame, c2 + 10, 14),
        }}
      >
        {tx.peel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 166,
          left: 1180,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 10) * fadeOut(frame, c5, 10),
          translate: riseIn(frame, c1 + 10, 14),
        }}
      >
        {tx.scale}
      </div>
      {/* R, filling in */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1200,
          opacity: matrix,
          display: "grid",
          gridTemplateColumns: "repeat(3, 170px)",
          gap: 14,
          padding: 20,
          borderLeft: `6px solid ${colors.text}`,
          borderRight: `6px solid ${colors.text}`,
          borderRadius: 12,
        }}
      >
        {[0, 1, 2].flatMap((i) =>
          [0, 1, 2].map((j) => {
            const order = j < i ? 6 : [0, 3, 5][i] + (j - i);
            const v = R[i][j];
            return (
              <div
                key={`${i}${j}`}
                style={{
                  height: 100,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.mono,
                  fontSize: 46,
                  fontWeight: 800,
                  color:
                    j < i
                      ? colors.muted
                      : i === j
                        ? colors.green
                        : colors.orange,
                  background:
                    j < i
                      ? "transparent"
                      : alpha(i === j ? colors.green : colors.orange, 0.15),
                  opacity: fadeIn(frame, c5 + 10 + order * 6, 6),
                }}
              >
                {j < i ? "0" : v.toFixed(2)}
              </div>
            );
          }),
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1180,
          width: 640,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 96,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c5 + 50),
          translate: riseIn(frame, c5 + 50, 14),
        }}
      >
        A = QR
      </div>
    </SceneShell>
  );
};
