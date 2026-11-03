import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { Arrow } from "../../s2e01/components/vec";
import { Mat } from "../components/mat";
import { useStrings } from "../i18n";

// Why an orthonormal eigenbasis forces symmetry. A perpendicular unit
// frame q₁, q₂ at 30° (c0). The view turns until the frame is the axes,
// and the map acts: the grid only stretches, by 2 and 0.6; the matrix
// reads diag(2, 0.6) (c1). The view turns back to the usual axes: the
// same map now bends the grid at a slant and its matrix fills in, 1.65,
// 0.61, 0.61, 0.95, with A = QDQᵀ under it (c2). The matrix flips across
// its diagonal and nothing changes: Aᵀ = A (c3). Two chips: necessary ✓,
// enough? (c4).

const O = { x: 640, y: 470 };
const SC = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * SC, y: O.y - y * SC });
const TH = Math.PI / 6;
const ROT = (a: number): Mat2 => [
  Math.cos(a),
  -Math.sin(a),
  Math.sin(a),
  Math.cos(a),
];
const mul = (p: Mat2, q: Mat2): Mat2 => [
  p[0] * q[0] + p[1] * q[2],
  p[0] * q[1] + p[1] * q[3],
  p[2] * q[0] + p[3] * q[2],
  p[2] * q[1] + p[3] * q[3],
];
const D: Mat2 = [2, 0, 0, 0.6];
const SYM = mul(mul(ROT(TH), D), ROT(-TH));

export const Necessary: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("necessary");
  const [c0, c1, c2, c3, c4] = cues;
  const turn =
    glide(frame, c1 + 4, fps, 24) * (1 - glide(frame, c2 + 4, fps, 30));
  const act = glide(frame, c1 + 34, fps, 30);
  const view = ROT(-TH * turn);
  const map = mul(view, lerpMat(IDENTITY, SYM, act));
  const f = linear(map);
  const q1 = f(Math.cos(TH), Math.sin(TH));
  const q2 = f(-Math.sin(TH), Math.cos(TH));
  const flip = glide(frame, c3 + 20, fps, 30);
  const m1 = fadeIn(frame, c1 + 34, 10) * fadeOut(frame, c2 + 20, 12);
  const m2 = fadeIn(frame, c2 + 26, 12);

  return (
    <SceneShell id="necessary">
      <Sfx name="pop" at={c0 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 34} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.1} />
      <Sfx name="pluck4" at={c2 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />
      <Sfx name="ding" at={c3 + 54} volume={0.28} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />
      <Sfx name="pop" at={c4 + 30} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="ncl">
            <rect x={140} y={90} width={1000} height={740} rx={20} />
          </clipPath>
        </defs>
        <g clipPath="url(#ncl)">
          <Plane map={f} scr={scr} range={8} />
          <g opacity={fadeIn(frame, c0 + 6, 8)}>
            <Arrow
              from={O}
              to={scr(q1.x * 1.6, q1.y * 1.6)}
              width={16}
              color={colors.green}
            />
            <Arrow
              from={O}
              to={scr(q2.x * 1.6, q2.y * 1.6)}
              width={16}
              color={colors.highlight}
            />
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 180,
          padding: "8px 24px",
          borderRadius: 14,
          background: alpha(colors.bg, 0.85),
          fontSize: 44,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 4),
        }}
      >
        {frame < c2 + 4 ? tx.inBasis : tx.usual}
      </div>
      <Mat m={D} x={1500} y={400} cell={150} opacity={m1} />
      <Mat
        m={SYM}
        x={1500}
        y={400}
        cell={150}
        opacity={m2}
        flip={flip}
        diag={fadeIn(frame, c3 + 10, 8)}
      />
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1200,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.body,
          fontSize: 64,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 40) * fadeOut(frame, c3 + 50, 10),
        }}
      >
        A = QDQᵀ
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1200,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.body,
          fontSize: 64,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 54),
        }}
      >
        Aᵀ = A
      </div>
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 1200,
          width: 600,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          fontSize: 44,
          fontWeight: 800,
        }}
      >
        {[
          { t: tx.necessary, c: colors.green, at: c4 + 6 },
          { t: tx.enough, c: colors.highlight, at: c4 + 30 },
        ].map(({ t, c, at }) => (
          <div
            key={t}
            style={{
              padding: "8px 24px",
              borderRadius: 14,
              border: `4px solid ${c}`,
              color: c,
              background: alpha(colors.bg, 0.85),
              whiteSpace: "nowrap",
              opacity: fadeIn(frame, at, 8),
              translate: riseIn(frame, at, 12),
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
