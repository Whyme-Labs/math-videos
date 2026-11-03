import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  FloorGrid,
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The key lemma in 3D. An eigen-arrow v, upright (c0). The disc of
// everything perpendicular to it, with a ring of arrows w lying in it
// (c1). A symmetric map acts: v stretches along itself, the disc stretches
// into an ellipse but stays flat in its plane, and every w stays in it
// (c2). The reason as a formula: ⟨Aw, v⟩ = ⟨w, Av⟩ = λ⟨w, v⟩ = 0 (c3).
// Reset, and a shear acts instead: v doesn't move, but the disc tips out
// of its plane and the arrows lift with it, in red (c4). Back to the
// symmetric map: the leftover plane is its own world (c5).

type M3 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
const ap = (m: M3, p: V3): V3 => [
  m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
  m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
  m[6] * p[0] + m[7] * p[1] + m[8] * p[2],
];
const lm = (a: M3, b: M3, t: number): M3 =>
  a.map((x, i) => lerp(x, b[i], t)) as unknown as M3;
const I3: M3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const c = Math.cos(0.5);
const s = Math.sin(0.5);
// in the plane: 1.5 along (c, s), 0.6 across; 1.3 along v = z
const SYM: M3 = [
  1.5 * c * c + 0.6 * s * s,
  (1.5 - 0.6) * c * s,
  0,
  (1.5 - 0.6) * c * s,
  1.5 * s * s + 0.6 * c * c,
  0,
  0,
  0,
  1.3,
];
const SHEAR: M3 = [1, 0, 0, 0, 1, 0, 1.3, 0, 1];
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Invariant: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("invariant");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const symT =
    glide(frame, c2 + 10, fps, 40) * (1 - glide(frame, c4, fps, 16)) +
    glide(frame, c5 + 6, fps, 30);
  const shT = glide(frame, c4 + 20, fps, 40) * (1 - glide(frame, c5, fps, 12));
  const mat =
    frame >= c4 && frame < c5 + 6 ? lm(I3, SHEAR, shT) : lm(I3, SYM, symT);
  const shearing = frame >= c4 + 10 && frame < c5;
  const v = ap(mat, [0, 0, 1]);
  const disc = fadeIn(frame, c1 + 4, 12);
  const ring = fadeIn(frame, c1 + 20, 10);
  const azimuth = -0.6 + (frame - c0) * 0.0016;
  const col = shearing ? colors.red : colors.green;
  const steps: Tok[][] = [
    [
      tok("l", "⟨Aw, v⟩"),
      tok("e1", " = "),
      tok("m", "⟨w, Av⟩"),
      tok("e2", " = "),
      tok("r", "λ⟨w, v⟩"),
      tok("e3", " = "),
      tok("z", "0", colors.green),
    ],
  ];

  return (
    <SceneShell id="invariant">
      <Sfx name="pop" at={c0 + 6} volume={0.14} />
      <Sfx name="riser" at={c1 + 4} volume={0.08} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 50} volume={0.14} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 20} volume={0.12} />
      <Sfx name="thud" at={c4 + 60} volume={0.22} />
      <Sfx name="whoosh" at={c5 + 6} volume={0.1} />
      <Sfx name="chime" at={c5 + 40} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.4}
        distance={6}
        target={[0, 0, 0.3]}
        style={{ left: -300, top: 0 }}
      >
        <FloorGrid n={2} color={colors.paper} opacity={0.1} />
        <Tube
          points={Array.from(
            { length: 49 },
            (_, i) =>
              [
                1.25 * Math.cos((i / 48) * Math.PI * 2),
                1.25 * Math.sin((i / 48) * Math.PI * 2),
                0,
              ] as V3,
          )}
          radius={0.012}
          color={colors.paper}
          opacity={0.6 * (shearing ? 1 : 0)}
          closed
        />
        <ParamSurface
          p={(a, b) =>
            ap(mat, [
              1.25 * a * Math.cos(b * Math.PI * 2),
              1.25 * a * Math.sin(b * Math.PI * 2),
              0,
            ])
          }
          res={32}
          color={col}
          opacity={0.3 * disc}
        />
        {Array.from({ length: 8 }).map((_, k) => {
          const a = (k / 8) * Math.PI * 2;
          const w = ap(mat, [1.15 * Math.cos(a), 1.15 * Math.sin(a), 0]);
          return (
            <Arrow3
              key={k}
              from={[0, 0, 0]}
              to={w}
              color={shearing ? colors.red : colors.primary}
              radius={0.022}
              opacity={ring}
            />
          );
        })}
        <Arrow3
          from={[0, 0, 0]}
          to={[v[0] * 1.2, v[1] * 1.2, v[2] * 1.2]}
          color={colors.highlight}
          radius={0.035}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1120,
          fontSize: 48,
          fontWeight: 800,
          color: shearing ? colors.red : colors.green,
          opacity: fadeIn(frame, c2 + 10),
        }}
      >
        {shearing ? tx.shearMap : tx.symMap}
        <span style={{ color: colors.muted, fontSize: 40, marginLeft: 18 }}>
          · {shearing ? tx.tips : tx.stays}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 1120,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.green,
          opacity: disc,
        }}
      >
        <span style={{ color: colors.highlight }}>v</span>
        <span style={{ marginLeft: 30 }}>{tx.plane}</span>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Eq steps={steps} at={[c3 + 6]} x={1400} y={640} size={54} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1120,
          width: 680,
          fontSize: 40,
          color: colors.muted,
          opacity: fadeIn(frame, c3 + 20) * fadeOut(frame, c4, 10),
          translate: riseIn(frame, c3 + 20, 10),
          fontFamily: fonts.math,
        }}
      >
        w ⊥ v ⇒ Aw ⊥ v
      </div>
    </SceneShell>
  );
};
