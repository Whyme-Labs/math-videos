import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  Sheet,
  Stage3D,
  ParamSurface,
  Tube,
  type V3,
} from "../../shared/components/three3d";

// The unit ellipse, in 3D. The bowl rises with its G-card (c0); a glass
// sheet comes down to height 1 (c1); the rim lights up and drops to the
// floor as the ellipse (c2); G changes and everything follows (c3); then a
// G-perpendicular pair of arrows with its right-angle mark appears and
// keeps turning, still perpendicular for G (c4).
// Earlier notes: many unit circles, in 3D. An inner product G is drawn as the bowl
// z = xᵀGx over the plane: it rises out of the floor (positive: every
// nonzero arrow gets a positive height), then a glass sheet comes down to
// height 1 and the rim where it cuts the bowl lights up. That rim, dropped
// onto the floor, is G's unit circle, an ellipse, with a pair of arrows
// that are perpendicular for G. Then G morphs through other choices; the
// bowl tips and stretches, the rim and the pair follow, and the camera
// keeps circling. A G-card on the right shows the entries.

const GS = [
  [1, 0, 1],
  [1, 0.6, 1.4],
  [2.2, -0.8, 0.8],
  [0.6, 0.3, 2],
];
const Z = 0.6; // height scale: the sheet sits at z = Z (xᵀGx = 1)
const R = 1.4; // the bowl is cut off where xᵀGx = R²

export const Ellipse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("ellipse");
  const [c0, c1, c2, c3, c4] = cues;
  let g = GS[0];
  [c3 + 6, c3 + 70, c4 + 60].forEach((at, k) => {
    const t = glide(frame, at, fps, 36);
    g = g.map((v, i) => lerp(v, GS[k + 1][i], t));
  });
  const [a, b, c] = g;
  const rise = glide(frame, c0 + 6, fps, 30);
  const drop = glide(frame, c1 + 6, fps, 24);
  const rim = fadeIn(frame, c2 + 4, 10);
  const pair = fadeIn(frame, c4 + 4, 10);
  const q = (x: number, y: number) => a * x * x + 2 * b * x * y + c * y * y;
  const len = (x: number, y: number) => Math.sqrt(q(x, y));
  // the bowl in G-polar coordinates: radius r along direction t, so the
  // rim sits at one height whatever G is
  const bowl = (uu: number, vv: number): V3 => {
    const t = vv * Math.PI * 2;
    const l = len(Math.cos(t), Math.sin(t));
    const r = uu * R;
    return [(r * Math.cos(t)) / l, (r * Math.sin(t)) / l, Z * rise * r * r];
  };
  const ellipse = (z: number): V3[] =>
    Array.from({ length: 73 }, (_, i) => {
      const t = (i / 72) * Math.PI * 2;
      const l = len(Math.cos(t), Math.sin(t));
      return [Math.cos(t) / l, Math.sin(t) / l, z];
    });
  // a G-orthonormal pair: u turning slowly, v ⟂_G u
  const th = 0.4 + (frame - c0) * 0.01;
  const u0 = { x: Math.cos(th), y: Math.sin(th) };
  const u = { x: u0.x / len(u0.x, u0.y), y: u0.y / len(u0.x, u0.y) };
  const gu = { x: a * u.x + b * u.y, y: b * u.x + c * u.y };
  const v0 = { x: -gu.y, y: gu.x };
  const v = { x: v0.x / len(v0.x, v0.y), y: v0.y / len(v0.x, v0.y) };
  const m = 0.18;
  const azimuth = -1.75 + (frame - c0) * 0.004;

  return (
    <SceneShell id="ellipse">
      <Sfx name="riser" at={c0 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="chime" at={c2 + 6} volume={0.35} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 70} volume={0.1} />
      <Sfx name="pop" at={c4 + 4} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 60} volume={0.1} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.42}
        distance={8.4}
        target={[0, 0, 0.5]}
        style={{ left: -260, top: -60 }}
      >
        <ParamSurface p={bowl} color={colors.green} opacity={0.38} />
        <Sheet
          size={4.2}
          z={lerp(2.4, Z, drop)}
          color={colors.paper}
          opacity={0.14 * drop}
        />
        <Tube
          points={ellipse(Z)}
          radius={0.035}
          color={colors.primary}
          opacity={rim}
          closed
        />
        <Tube
          points={ellipse(0)}
          radius={0.03}
          color={colors.primary}
          opacity={rim}
          closed
        />
        <Arrow3
          from={[0, 0, 0]}
          to={[u.x, u.y, 0]}
          color={colors.orange}
          radius={0.045}
          opacity={pair}
        />
        <Arrow3
          from={[0, 0, 0]}
          to={[v.x, v.y, 0]}
          color={colors.highlight}
          radius={0.045}
          opacity={pair}
        />
        <Tube
          points={[
            [u.x * m, u.y * m, 0],
            [(u.x + v.x) * m, (u.y + v.y) * m, 0],
            [v.x * m, v.y * m, 0],
          ]}
          radius={0.015}
          color={colors.green}
          opacity={pair}
        />
      </Stage3D>

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform="translate(1560 420)" opacity={fadeIn(frame, c0 + 10)}>
          <text
            y={-130}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            G
          </text>
          <rect
            x={-170}
            y={-100}
            width={340}
            height={200}
            rx={16}
            fill={alpha(colors.bg, 0.6)}
          />
          <path
            d="M -110 -90 l -20 0 l 0 180 l 20 0 M 110 -90 l 20 0 l 0 180 l -20 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          {[a, b, b, c].map((n, k) => (
            <text
              key={k}
              x={-55 + (k % 2) * 110}
              y={-14 + Math.floor(k / 2) * 90}
              fill={colors.text}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {(Math.round(n * 10) / 10).toFixed(1).replace("-", "−")}
            </text>
          ))}
        </g>
      </svg>
    </SceneShell>
  );
};
