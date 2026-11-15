import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import {
  camera,
  DIAG,
  diagPlane,
  path3,
  rotate,
  type V3,
} from "../components/space";
import { useStrings } from "../i18n";

// Maschke's averaging. A triangle's 6 symmetries act on the plane; a
// lopsided ellipse is the unit ball of some inner product (c0). Its six
// images under the symmetries (c1). The average of the six inner products
// has a round unit ball, which every symmetry keeps (c2). In ℝ³ with S₃:
// the fixed diagonal and the plane at right angles to it, both carried to
// themselves as the group turns (c3). V = W ⊕ W⊥ (c4).

const A = 1.7;
const B = 0.65;
const TH = (25 * Math.PI) / 180;
// the six images of the ellipse: angles after rotation or reflection
const ANGLES = [0, 1, 2].flatMap((k) => [
  TH + (2 * Math.PI * k) / 3,
  2 * (Math.PI / 2 + (2 * Math.PI * k) / 3) - TH,
]);
const C = { x: 960, y: 450 };
const U = 150;

// unit ball of the form (1 − t)·Q₀ + t·Q̄, as an SVG path
const ball = (theta: number, t: number) => {
  const qbar = (1 / (A * A) + 1 / (B * B)) / 2;
  return (
    Array.from({ length: 121 }, (_, k) => {
      const f = (2 * Math.PI * k) / 120;
      const u = Math.cos(f - theta);
      const v = Math.sin(f - theta);
      const q = (1 - t) * ((u * u) / (A * A) + (v * v) / (B * B)) + t * qbar;
      const r = 1 / Math.sqrt(q);
      return `${k ? "L" : "M"} ${C.x + U * r * Math.cos(f)} ${C.y - U * r * Math.sin(f)}`;
    }).join(" ") + " Z"
  );
};

const P3 = camera(960, 460, 230);

export const Maschke: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("maschke");
  const [c0, c1, c2, c3, c4] = cues;
  const flat = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c3, 12);
  const avg = progress(frame, c2 + 6, 40);
  const copies = fadeIn(frame, c1 + 4, 8) * (1 - avg);
  const space = fadeIn(frame, c3 + 8, 12);
  const ang =
    ((2 * Math.PI) / 3) *
    (progress(frame, c3 + 30, 40) + progress(frame, c4 + 20, 40));
  const R = (p: V3) => rotate(p, DIAG, ang);
  const o = P3([0, 0, 0]);
  const tri = [0, 1, 2].map((k) => {
    const a = Math.PI / 2 + (2 * Math.PI * k) / 3;
    return [C.x + 2.2 * U * Math.cos(a), C.y - 2.2 * U * Math.sin(a)];
  });

  return (
    <SceneShell id="maschke">
      <Sfx name="pop" at={c0 + 8} volume={0.12} />
      {ANGLES.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 10 + i * 8} volume={0.06} />
      ))}
      <Sfx name="riser" at={c2 + 6} volume={0.12} />
      <Sfx name="chime" at={c2 + 46} volume={0.22} />
      <Sfx name="whoosh" at={c3 + 30} volume={0.1} />
      <Sfx name="ding" at={c4 + 8} volume={0.16} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={flat}>
          <path
            d={
              tri.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ") +
              " Z"
            }
            fill="none"
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          {ANGLES.map((a, i) => (
            <path
              key={i}
              d={ball(a, 0)}
              fill="none"
              stroke={i % 2 ? colors.orange : colors.highlight}
              strokeWidth={3}
              opacity={copies * fadeIn(frame, c1 + 10 + i * 8, 6) * 0.8}
            />
          ))}
          <path
            d={ball(TH, avg)}
            fill={alpha(avg > 0.95 ? colors.green : colors.primary, 0.14)}
            stroke={avg > 0.95 ? colors.green : colors.primary}
            strokeWidth={6}
          />
          <circle cx={C.x} cy={C.y} r={8} fill={colors.text} />
        </g>
        <g opacity={space}>
          <path
            d={path3(diagPlane(1.4).map(R), P3, true)}
            fill={alpha(colors.highlight, 0.12)}
            stroke={colors.highlight}
            strokeWidth={4}
          />
          <circle
            cx={P3(R(diagPlane(1.4, 4)[0]))[0]}
            cy={P3(R(diagPlane(1.4, 4)[0]))[1]}
            r={12}
            fill={colors.highlight}
          />
          <path
            d={path3(
              [
                [-0.9, -0.9, -0.9],
                [1, 1, 1],
              ] as V3[],
              P3,
            )}
            stroke={colors.green}
            strokeWidth={7}
          />
          {[0, 1, 2].map((i) => {
            const e: V3 = [0, 0, 0];
            e[i] = 1;
            const [x, y] = P3(R(e));
            return (
              <line
                key={i}
                x1={o[0]}
                y1={o[1]}
                x2={x}
                y2={y}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={4}
              />
            );
          })}
          <text
            x={P3([1, 1, 1])[0] + 20}
            y={P3([1, 1, 1])[1]}
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            W
          </text>
          <text
            x={P3(diagPlane(1.4, 4)[1])[0] + 30}
            y={P3(diagPlane(1.4, 4)[1])[1] + 10}
            fill={colors.highlight}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            W⊥
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 46}
          x={1380}
          y={300}
          size={40}
          color={colors.green}
        >
          {tx.average}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c3 + 40}
        x={130}
        y={140}
        size={40}
        color={colors.highlight}
      >
        {tx.invariant}
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 8}
        x={1300}
        y={620}
        size={44}
        math
        color={colors.primary}
      >
        V = W ⊕ W⊥
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 20}
        x={1300}
        y={520}
        size={40}
        color={colors.green}
      >
        {tx.maschke}
      </Chip>
    </SceneShell>
  );
};
