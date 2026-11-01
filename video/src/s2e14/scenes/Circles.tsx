import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";

// Many unit circles. The unit circle xᵀGx = 1 of an inner product G, drawn
// with a pair of arrows that are perpendicular for G (with a right-angle
// mark in G's sense). G morphs through several positive-definite choices,
// from round to tilted ellipses; the circle and the pair follow, and a
// small G-card on the right churns its entries.

const O = { x: 760, y: 480 };
const S = 230;
const GS = [
  [1, 0, 1],
  [1, 0.6, 1.4],
  [2.2, -0.8, 0.8],
  [0.6, 0.3, 2],
];

export const Circles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("circles");
  const [c0, c1] = cues;
  let g = GS[0];
  [c0 + 40, c1 + 10, c1 + 70].forEach((at, k) => {
    const t = glide(frame, at, fps, 36);
    g = g.map((v, i) => lerp(v, GS[k + 1][i], t));
  });
  const [a, b, c] = g;
  const len = (x: number, y: number) =>
    Math.sqrt(a * x * x + 2 * b * x * y + c * y * y);
  const ellipse = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const x = Math.cos(t);
    const y = Math.sin(t);
    const l = len(x, y);
    return `${i ? "L" : "M"} ${(O.x + (x / l) * S).toFixed(1)} ${(O.y - (y / l) * S).toFixed(1)}`;
  }).join(" ");
  // a G-orthonormal pair: u along a slowly turning direction, v ⟂_G u
  const th = 0.4 + (frame - c0) * 0.01;
  const u0 = { x: Math.cos(th), y: Math.sin(th) };
  const u = { x: u0.x / len(u0.x, u0.y), y: u0.y / len(u0.x, u0.y) };
  const gu = { x: a * u.x + b * u.y, y: b * u.x + c * u.y };
  const v0 = { x: -gu.y, y: gu.x };
  const v = { x: v0.x / len(v0.x, v0.y), y: v0.y / len(v0.x, v0.y) };
  const p = (q: { x: number; y: number }, k = 1) => ({
    x: O.x + q.x * S * k,
    y: O.y - q.y * S * k,
  });
  const corner = { x: (u.x + v.x) * 0.18, y: (u.y + v.y) * 0.18 };

  return (
    <SceneShell id="circles">
      <Sfx name="whoosh" at={c0 + 40} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 70} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <path
          d={ellipse}
          fill={alpha(colors.primary, 0.1)}
          stroke={colors.primary}
          strokeWidth={7}
        />
        <Arrow from={O} to={p(u)} width={14} color={colors.orange} />
        <Arrow from={O} to={p(v)} width={14} color={colors.highlight} />
        <path
          d={`M ${p(u, 0.18).x} ${p(u, 0.18).y} L ${p(corner).x} ${p(corner).y} L ${p(v, 0.18).x} ${p(v, 0.18).y}`}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
        />
        <g transform="translate(1520 420)" opacity={fadeIn(frame, c0 + 10)}>
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
