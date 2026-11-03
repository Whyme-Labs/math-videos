import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, shake } from "../../shared/components/motion";
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
import { useStrings } from "../i18n";

// What can go wrong with eigenvectors. A general map bends the whole
// grid; two green arrows on dashed lines stay on their lines and only
// stretch, a white one turns away (c0). A rotation turns every arrow, the
// green ones included; then a shear, under which only the arrow on the
// x-axis stays put (c1). Then the eigenbasis (1, 0), (100, 1): two long
// arrows almost on top of each other, the angle between them read out
// (c2), and the price: (0, 1) takes coefficients −100 and 1, with the
// picture shaking (c3). Last a perpendicular frame snaps in (c4).

const O = { x: 960, y: 470 };
const S = 110;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const M: Mat2 = [2, 1, 0, 1.4];
const ROT = (a: number): Mat2 => [
  Math.cos(a),
  -Math.sin(a),
  Math.sin(a),
  Math.cos(a),
];
const SHEAR: Mat2 = [1, 1, 0, 1];
// M's eigenvectors: (1, 0) for 2 and (1, −0.6) for 1.4
const E1 = { x: 1, y: 0 };
const E2 = { x: 1 / Math.hypot(1, 0.6), y: -0.6 / Math.hypot(1, 0.6) };

export const Skewed: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("skewed");
  const [c0, c1, c2, c3, c4] = cues;
  const g = glide(frame, c0 + 20, fps, 30) * (1 - glide(frame, c1, fps, 12));
  const r =
    glide(frame, c1 + 14, fps, 30) * (1 - glide(frame, c1 + 70, fps, 12));
  const sh = glide(frame, c1 + 84, fps, 30);
  const part1 = fadeOut(frame, c2, 10);
  const mat: Mat2 =
    frame < c1 + 6
      ? lerpMat(IDENTITY, M, g)
      : frame < c1 + 80
        ? ROT(r * 1.1)
        : lerpMat(IDENTITY, SHEAR, sh);
  const f = linear(mat);
  const showE = frame < c1 + 80 ? 1 : 0;
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c4, 10);
  const L = 7;
  const n = Math.hypot(100, 1);
  const shk = shake(frame, c3 + 30, 14);
  const label =
    frame < c1 + 6 ? tx.general : frame < c1 + 80 ? tx.rotation : tx.shear;

  const arrows = [
    { v: E1, c: colors.green, eig: true },
    { v: { x: 0, y: 1 }, c: colors.text, eig: false },
    { v: E2, c: colors.green, eig: true },
  ];

  return (
    <SceneShell id="skewed">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="pluck2" at={c0 + 52} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 14} volume={0.1} />
      <Sfx name="thud" at={c1 + 46} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 84} volume={0.1} />
      <Sfx name="pop" at={c2 + 10} volume={0.14} />
      <Sfx name="thud" at={c3 + 30} volume={0.24} />
      <Sfx name="chime" at={c4 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="skclip">
            <rect x={140} y={90} width={1640} height={740} rx={20} />
          </clipPath>
        </defs>
        <g clipPath="url(#skclip)" opacity={part1}>
          <Plane map={f} scr={scr} range={10} />
          {showE ? (
            [E1, E2].map((e, i) => (
              <line
                key={i}
                x1={scr(-8 * e.x, -8 * e.y).x}
                y1={scr(-8 * e.x, -8 * e.y).y}
                x2={scr(8 * e.x, 8 * e.y).x}
                y2={scr(8 * e.x, 8 * e.y).y}
                stroke={alpha(colors.green, 0.5)}
                strokeWidth={4}
                strokeDasharray="14 12"
              />
            ))
          ) : (
            <line
              x1={scr(-8, 0).x}
              y1={O.y}
              x2={scr(8, 0).x}
              y2={O.y}
              stroke={alpha(colors.green, 0.5)}
              strokeWidth={4}
              strokeDasharray="14 12"
            />
          )}
          {arrows.map(({ v, c, eig }, i) => {
            if (!showE && i === 2) return null;
            const w = f(2 * v.x, 2 * v.y);
            const on = eig && Math.abs(w.x * v.y - w.y * v.x) < 0.05;
            const shearOk = !showE && i === 0;
            return (
              <Arrow
                key={i}
                from={O}
                to={scr(w.x, w.y)}
                width={16}
                color={on || shearOk ? colors.green : eig ? colors.red : c}
              />
            );
          })}
        </g>
        <g opacity={part2} transform={`translate(${shk} 0)`}>
          <Arrow
            from={scr(-4, -1)}
            to={scr(-4 + L, -1)}
            width={14}
            color={colors.primary}
          />
          <Arrow
            from={scr(-4, -1)}
            to={scr(-4 + (L * 100) / n, -1 + L / n)}
            width={14}
            color={colors.highlight}
          />
          <text
            x={scr(-4 + L, -1).x + 20}
            y={scr(0, -1).y + 50}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            (1, 0)
          </text>
          <text
            x={scr(-4 + L, -1).x + 20}
            y={scr(0, -1).y - 30}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            (100, 1)
          </text>
          <g transform="translate(1500 250)">
            <circle
              r={110}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.text}
              strokeWidth={4}
            />
            <line
              x1={-100}
              y1={30}
              x2={100}
              y2={30}
              stroke={colors.primary}
              strokeWidth={10}
            />
            <line
              x1={-100}
              y1={30}
              x2={95}
              y2={30 - 195 * Math.tan((30 * 0.573 * Math.PI) / 180)}
              stroke={colors.highlight}
              strokeWidth={10}
            />
            <text
              x={0}
              y={150}
              fill={colors.muted}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              × 30
            </text>
          </g>
          <text
            x={scr(-4, 0).x}
            y={scr(0, -1).y - 120}
            fill={colors.text}
            fontSize={52}
            fontWeight={800}
          >
            {tx.angle}: <tspan fontFamily={fonts.mono}>0.57°</tspan>
          </text>
          <text
            x={scr(-4, 0).x}
            y={scr(0, -1).y + 160}
            fill={colors.red}
            fontSize={48}
            fontFamily={fonts.mono}
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 6, 10)}
          >
            {tx.coeffs}
          </text>
        </g>
        <g opacity={fadeIn(frame, c4 + 10, 10)}>
          <Arrow from={O} to={scr(2.2, 1.1)} width={16} color={colors.green} />
          <Arrow from={O} to={scr(-1.1, 2.2)} width={16} color={colors.green} />
          <path
            d={`M ${scr(0.36, 0.18).x} ${scr(0.36, 0.18).y} L ${scr(0.18, 0.54).x} ${scr(0.18, 0.54).y} L ${scr(-0.18, 0.36).x} ${scr(-0.18, 0.36).y}`}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
          />
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
          opacity: part1 * fadeIn(frame, c0 + 6),
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 180,
          padding: "8px 24px",
          borderRadius: 14,
          background: alpha(colors.bg, 0.85),
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 10),
          translate: riseIn(frame, c4 + 10, 14),
        }}
      >
        {tx.want}
      </div>
    </SceneShell>
  );
};
