import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
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
import { I3, ap3, diag3, mul3, rot3, type M3 } from "../components/m3";
import { useStrings } from "../i18n";

// Rotate–stretch–rotate in 3D. A unit sphere with three marked
// perpendicular axes v₁, v₂, v₃ and the great circles across them. Vᵀ
// turns the sphere until the marked axes sit on x, y, z (c0). Σ stretches
// along the axes by 1.7, 1 and 0.45 (c1). U turns the result into its
// final place (c2). The semi-axes σᵢuᵢ light up with their lengths (c3).
// Last the whole map A again, straight from sphere to ellipsoid in one
// move, while the three steps are listed (c4).

const AV: V3 = [1, 1, 0.5];
const TV = 0.9;
const AU: V3 = [0.3, -1, 1];
const TU = 1.1;
const SIG = [1.7, 1, 0.45];
const V = rot3(AV, TV);
const U = rot3(AU, TU);
const A = mul3(mul3(U, diag3(SIG[0], SIG[1], SIG[2])), rot3(AV, -TV));
const col = () => [colors.green, colors.highlight, colors.primary];
const E: V3[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const lerpM = (a: M3, b: M3, t: number): M3 =>
  a.map((x, i) => lerp(x, b[i], t));

export const Rsr: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rsr");
  const [c0, c1, c2, c3, c4] = cues;
  const t1 = glide(frame, c0 + 10, fps, 40);
  const t2 = glide(frame, c1 + 6, fps, 40);
  const t3 = glide(frame, c2 + 6, fps, 40);
  const replay = frame >= c4;
  const tr = glide(frame, c4 + 30, fps, 50);
  // the map applied to the sphere so far
  const staged = mul3(
    mul3(
      rot3(AU, TU * t3),
      diag3(lerp(1, SIG[0], t2), lerp(1, SIG[1], t2), lerp(1, SIG[2], t2)),
    ),
    mul3(rot3(AV, -TV * t1), V),
  );
  // the sphere is drawn as V·(unit sphere) so its marked axes start at v_i
  const M = replay ? mul3(lerpM(I3, A, tr), V) : staged;
  const c = col();
  const sphere = (u: number, v: number): V3 =>
    ap3(M, [
      Math.sin(u * Math.PI) * Math.cos(v * Math.PI * 2),
      Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 2),
      Math.cos(u * Math.PI),
    ]);
  const great = (k: number): V3[] =>
    Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      const p: V3 =
        k === 0
          ? [0, Math.cos(a), Math.sin(a)]
          : k === 1
            ? [Math.cos(a), 0, Math.sin(a)]
            : [Math.cos(a), Math.sin(a), 0];
      return ap3(M, p);
    });
  const semi = fadeIn(frame, c3 + 6, 10);
  const azimuth = -0.6 + (frame - c0) * 0.0015;
  const step = frame < c1 ? 0 : frame < c2 ? 1 : 2;
  const labels = ["U", "Σ", "Vᵀ"];

  return (
    <SceneShell id="rsr">
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c3 + 6} volume={0.14} />
      <Sfx name="riser" at={c4 + 10} volume={0.08} />
      <Sfx name="chime" at={c4 + 80} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.35}
        distance={6.4}
        target={[0, 0, 0]}
        style={{ left: -260, top: -20 }}
      >
        <Tube
          points={[
            [-2.2, 0, 0],
            [2.2, 0, 0],
          ]}
          radius={0.006}
          color={colors.paper}
          opacity={0.3}
        />
        <Tube
          points={[
            [0, -2.2, 0],
            [0, 2.2, 0],
          ]}
          radius={0.006}
          color={colors.paper}
          opacity={0.3}
        />
        <Tube
          points={[
            [0, 0, -1.6],
            [0, 0, 1.6],
          ]}
          radius={0.006}
          color={colors.paper}
          opacity={0.3}
        />
        <ParamSurface
          p={sphere}
          res={40}
          color={colors.violet}
          opacity={0.35}
        />
        {[0, 1, 2].map((k) => (
          <Tube
            key={k}
            points={great(k)}
            radius={0.012}
            color={c[k]}
            opacity={0.7}
            closed
          />
        ))}
        {E.map((e, k) => (
          <Arrow3
            key={k}
            from={[0, 0, 0]}
            to={ap3(M, e)}
            color={c[k]}
            radius={0.032 + 0.012 * semi}
          />
        ))}
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1240,
          display: "flex",
          gap: 22,
        }}
      >
        {labels.map((l, i) => {
          const on = replay || i === 2 - step;
          const done = replay || i >= 2 - step;
          return (
            <div
              key={l}
              style={{
                width: 150,
                padding: "10px 0",
                textAlign: "center",
                borderRadius: 16,
                border: `5px solid ${on ? colors.primary : alpha(colors.paper, 0.3)}`,
                background: alpha(colors.bg, 0.85),
                fontFamily: fonts.body,
                fontSize: 60,
                fontWeight: 800,
                color: done || on ? colors.text : colors.muted,
                opacity: fadeIn(frame, c0 + 4, 8),
              }}
            >
              {l}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1240,
          width: 520,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 4, 8),
        }}
      >
        {[tx.turn, tx.stretch, tx.turn][step]}
      </div>
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: semi,
        }}
      >
        {SIG.map((s, k) => (
          <div
            key={k}
            style={{
              width: 420,
              padding: "8px 24px",
              borderRadius: 14,
              border: `4px solid ${c[k]}`,
              background: alpha(colors.bg, 0.85),
              fontFamily: fonts.math,
              fontSize: 46,
              fontWeight: 800,
              color: c[k],
              translate: riseIn(frame, c3 + 6 + k * 6, 12),
            }}
          >
            σ{["₁", "₂", "₃"][k]} ={" "}
            <span style={{ fontFamily: fonts.mono }}>{s}</span>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
