import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { useStrings } from "../i18n";

// The view from inside. G's unit ellipse, a pair of arrows perpendicular
// for G (orange and pink, meeting at about 100° on screen) and, dashed, an
// ordinary right-angle pair. The whole plane stretches by G^½: the grid
// bends, the ellipse becomes the round circle, and the G-pair's live angle
// readout climbs to exactly 90° (orthonormal basis theorem). Then the
// stretch rocks back and forth: in each geometry a different pair is the
// perpendicular one.

const O = { x: 760, y: 470 };
const S = 230;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const Gm: Mat2 = [1.6, 0.6, 0.6, 0.9];
// symmetric square root of a 2 × 2 positive definite matrix
const sqrtm = ([a, b, , d]: Mat2): Mat2 => {
  const s = Math.sqrt(a * d - b * b);
  const t = Math.sqrt(a + d + 2 * s);
  return [(a + s) / t, b / t, b / t, (d + s) / t];
};
const H = sqrtm(Gm);
const q = (x: number, y: number) =>
  Gm[0] * x * x + 2 * Gm[1] * x * y + Gm[3] * y * y;
const unit = (x: number, y: number) => {
  const l = Math.sqrt(q(x, y));
  return { x: x / l, y: y / l };
};
const U = unit(1, 0.25);
const gu = { x: Gm[0] * U.x + Gm[1] * U.y, y: Gm[2] * U.x + Gm[3] * U.y };
const V = unit(-gu.y, gu.x);

export const Inside: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("inside");
  const [c0, c1, c2, c3, c4] = cues;
  const rock =
    frame > c4 + 10 ? 0.5 + 0.5 * Math.cos((frame - c4 - 10) * 0.06) : 1;
  const s = glide(frame, c1 + 6, fps, 50) * rock;
  const M = lerpMat(IDENTITY, H, s);
  const f = linear(M);
  const ell = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const p = unit(Math.cos(t), Math.sin(t));
    const m = f(p.x, p.y);
    return `${i ? "L" : "M"} ${scr(m.x, m.y).x.toFixed(1)} ${scr(m.x, m.y).y.toFixed(1)}`;
  }).join(" ");
  const mu = f(U.x, U.y);
  const mv = f(V.x, V.y);
  const ang = (p: { x: number; y: number }, r: { x: number; y: number }) =>
    (Math.acos(
      (p.x * r.x + p.y * r.y) / (Math.hypot(p.x, p.y) * Math.hypot(r.x, r.y)),
    ) *
      180) /
    Math.PI;
  const degG = ang(mu, mv);
  // the ordinary right-angle pair (dashed), carried along by the stretch
  const e1 = f(0.8, 0.8);
  const e2 = f(-0.8, 0.8);
  const degE = ang(e1, e2);
  const mark = (
    p: { x: number; y: number },
    r: { x: number; y: number },
    color: string,
    op: number,
  ) => {
    const k = 0.16;
    const a = {
      x: (p.x / Math.hypot(p.x, p.y)) * k,
      y: (p.y / Math.hypot(p.x, p.y)) * k,
    };
    const b = {
      x: (r.x / Math.hypot(r.x, r.y)) * k,
      y: (r.y / Math.hypot(r.x, r.y)) * k,
    };
    return (
      <path
        d={`M ${scr(a.x, a.y).x} ${scr(a.x, a.y).y} L ${scr(a.x + b.x, a.y + b.y).x} ${scr(a.x + b.x, a.y + b.y).y} L ${scr(b.x, b.y).x} ${scr(b.x, b.y).y}`}
        fill="none"
        stroke={color}
        strokeWidth={5}
        opacity={op}
      />
    );
  };
  const dashed = fadeIn(frame, c4 + 4, 10);

  return (
    <SceneShell id="inside">
      <Sfx name="pop" at={c0 + 10} volume={0.12} />
      <Sfx name="riser" at={c1 + 6} volume={0.1} />
      <Sfx name="chime" at={c2 + 4} volume={0.35} />
      <Sfx name="pop" at={c4 + 4} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e14inside">
            <rect x={150} y={90} width={1220} height={740} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#e14inside)">
          <Plane map={f} scr={scr} range={8} step={0.5} />
        </g>
        <path
          d={ell}
          fill={alpha(colors.primary, 0.1)}
          stroke={colors.primary}
          strokeWidth={7}
          opacity={fadeIn(frame, c0 + 4)}
        />
        <g opacity={fadeIn(frame, c0 + 10)}>
          <Arrow
            from={O}
            to={scr(mu.x, mu.y)}
            width={15}
            color={colors.orange}
          />
          <Arrow
            from={O}
            to={scr(mv.x, mv.y)}
            width={15}
            color={colors.highlight}
          />
          {mark(mu, mv, colors.green, Math.abs(degG - 90) < 1 ? 1 : 0.35)}
        </g>
        <g opacity={dashed}>
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(e1.x, e1.y).x}
            y2={scr(e1.x, e1.y).y}
            stroke={colors.paper}
            strokeWidth={5}
            strokeDasharray="12 10"
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(e2.x, e2.y).x}
            y2={scr(e2.x, e2.y).y}
            stroke={colors.paper}
            strokeWidth={5}
            strokeDasharray="12 10"
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 1420,
          width: 400,
          padding: "14px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${Math.abs(degG - 90) < 1 ? colors.green : colors.orange}`,
          opacity: fadeIn(frame, c0 + 14),
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 80,
            fontWeight: 800,
            color: Math.abs(degG - 90) < 1 ? colors.green : colors.orange,
          }}
        >
          {Math.round(degG)}°
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 330,
          left: 1420,
          width: 400,
          padding: "10px 0",
          borderRadius: 20,
          textAlign: "center",
          border: `4px dashed ${alpha(colors.paper, 0.6)}`,
          opacity: dashed,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 64,
            fontWeight: 800,
            color: colors.paper,
          }}
        >
          {Math.round(degE)}°
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 500,
          left: 1380,
          width: 480,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
        }}
      >
        {tx.fromInside}
      </div>
    </SceneShell>
  );
};
