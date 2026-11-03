import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { RightAngle } from "../../s2e17/components/stage";
import { useStrings } from "../i18n";

// The proof by peeling, on the ellipsoid a symmetric map makes from the
// unit sphere. A probe arrow roams over the ellipsoid and settles on its
// longest direction: the first eigen-arrow (c0). The plane perpendicular
// to it lights up, the ellipsoid gives way to its slice there, an ellipse
// (c1). The probe roams the slice and settles on its long axis: the
// second (c2). Only one direction is left: the third (c3). The frame
// stands complete, right angles marked, the ellipsoid faint around it,
// and chips list the stretches 1.6, 1, 0.55 (c4).

const rot = (a: number, b: number, g: number) => {
  const [ca, sa, cb, sb, cg, sg] = [
    Math.cos(a),
    Math.sin(a),
    Math.cos(b),
    Math.sin(b),
    Math.cos(g),
    Math.sin(g),
  ];
  // R = Rz(g) Ry(b) Rx(a), columns are the axes
  return [
    [cg * cb, sg * cb, -sb],
    [cg * sb * sa - sg * ca, sg * sb * sa + cg * ca, cb * sa],
    [cg * sb * ca + sg * sa, sg * sb * ca - cg * sa, cb * ca],
  ] as V3[];
};
const AXES = rot(0.4, 0.3, 0.6);
const LAM = [1.6, 1.0, 0.55];
const sc = (v: V3, k: number): V3 => [v[0] * k, v[1] * k, v[2] * k];
const add = (...vs: V3[]): V3 =>
  vs.reduce((s, v) => [s[0] + v[0], s[1] + v[1], s[2] + v[2]], [0, 0, 0] as V3);
// a point of the ellipsoid from sphere coordinates in the eigenframe
const ell = (x: number, y: number, z: number): V3 =>
  add(
    sc(AXES[0], LAM[0] * x),
    sc(AXES[1], LAM[1] * y),
    sc(AXES[2], LAM[2] * z),
  );

export const Peel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("peel");
  const [c0, c1, c2, c3, c4] = cues;
  const t = Math.max(0, frame - c0 - 10) * 0.06;
  // probe 1 roams the sphere and settles on (1, 0, 0)
  const set1 = glide(frame, c0 + 90, fps, 30);
  const th = lerp(1.1 + 0.5 * Math.sin(t), Math.PI / 2, set1);
  const ph = lerp(t * 0.9, 0, set1);
  const p1 = ell(
    Math.sin(th) * Math.cos(ph),
    Math.sin(th) * Math.sin(ph),
    Math.cos(th),
  );
  // probe 2 roams the slice and settles on (0, 1, 0)
  const t2 = Math.max(0, frame - c2 - 6) * 0.07;
  const set2 = glide(frame, c2 + 80, fps, 30);
  const a2 = lerp(0.9 + 1.3 * Math.sin(t2), Math.PI / 2, set2);
  const p2 = ell(0, Math.sin(a2), Math.cos(a2));
  const solid =
    fadeIn(frame, c0 + 2, 10) * (1 - 0.8 * fadeIn(frame, c1 + 6, 12));
  const slice = fadeIn(frame, c1 + 10, 12);
  const e1 = frame >= c0 + 116;
  const e2 = frame >= c2 + 106;
  const e3 = fadeIn(frame, c3 + 10, 10);
  const marks = fadeIn(frame, c4 + 6, 10);
  const azimuth = -0.5 + (frame - c0) * 0.0018;
  const sliceCurve: V3[] = Array.from({ length: 65 }, (_, i) => {
    const a = (i / 64) * Math.PI * 2;
    return ell(0, Math.cos(a), Math.sin(a));
  });
  const step = frame < c2 ? 1 : frame < c3 ? 2 : 3;

  return (
    <SceneShell id="peel">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="ding" at={c0 + 116} volume={0.26} />
      <Sfx name="riser" at={c1 + 6} volume={0.08} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="ding" at={c2 + 106} volume={0.26} />
      <Sfx name="ding" at={c3 + 10} volume={0.26} />
      <Sfx name="clink" at={c4 + 6} volume={0.18} />
      <Sfx name="chime" at={c4 + 30} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.4}
        distance={6.2}
        target={[0, 0, 0]}
        style={{ left: -260, top: -20 }}
      >
        <ParamSurface
          p={(u, v) =>
            ell(
              Math.sin(u * Math.PI) * Math.cos(v * Math.PI * 2),
              Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 2),
              Math.cos(u * Math.PI),
            )
          }
          res={40}
          color={colors.violet}
          opacity={0.3 * solid}
        />
        {/* the plane perpendicular to the first axis */}
        <ParamSurface
          p={(u, v) =>
            add(sc(AXES[1], (u - 0.5) * 3.6), sc(AXES[2], (v - 0.5) * 3.6))
          }
          res={2}
          color={colors.green}
          opacity={0.14 * slice * (1 - marks)}
        />
        <Tube
          points={sliceCurve}
          radius={0.016}
          color={colors.primary}
          opacity={slice}
          closed
        />
        {!e1 ? (
          <Arrow3
            from={[0, 0, 0]}
            to={p1}
            color={colors.text}
            radius={0.028}
            opacity={fadeIn(frame, c0 + 10, 8)}
          />
        ) : null}
        {e1 ? (
          <Arrow3
            from={[0, 0, 0]}
            to={sc(AXES[0], LAM[0])}
            color={colors.green}
            radius={0.036}
          />
        ) : null}
        {frame >= c2 + 6 && !e2 ? (
          <Arrow3 from={[0, 0, 0]} to={p2} color={colors.text} radius={0.028} />
        ) : null}
        {e2 ? (
          <Arrow3
            from={[0, 0, 0]}
            to={sc(AXES[1], LAM[1])}
            color={colors.green}
            radius={0.036}
          />
        ) : null}
        <Arrow3
          from={[0, 0, 0]}
          to={sc(AXES[2], LAM[2] * 1.6)}
          color={colors.green}
          radius={0.036}
          opacity={e3}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={AXES[0]}
          v={AXES[1]}
          s={0.22}
          opacity={marks}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={AXES[1]}
          v={AXES[2]}
          s={0.22}
          opacity={marks}
        />
        <RightAngle
          at={[0, 0, 0]}
          u={AXES[0]}
          v={AXES[2]}
          s={0.22}
          opacity={marks}
        />
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1200,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c4, 10),
        }}
      >
        {tx.step === "step" ? `step ${step} / 3` : `第 ${step} / 3 步`}
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1200,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {LAM.map((l, k) => {
          const at = [c0 + 116, c2 + 106, c3 + 10][k];
          return (
            <div
              key={k}
              style={{
                width: 420,
                padding: "10px 24px",
                borderRadius: 14,
                border: `4px solid ${colors.green}`,
                background: alpha(colors.bg, 0.85),
                fontFamily: fonts.math,
                fontSize: 48,
                fontWeight: 800,
                color: colors.green,
                opacity: fadeIn(frame, at, 8),
                translate: riseIn(frame, at, 12),
              }}
            >
              q{["₁", "₂", "₃"][k]}{" "}
              <span
                style={{
                  color: colors.muted,
                  fontFamily: fonts.body,
                  fontSize: 40,
                }}
              >
                · {tx.stretch}
              </span>{" "}
              <span style={{ fontFamily: fonts.mono }}>{l}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
