import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Mat } from "../components/draw";
import { useStrings } from "../i18n";

// Symmetries become matrices. A square on the plane's grid, corners
// numbered, with its 8 symmetries as small tiles (c0). A quarter turn
// carries the grid with it; its matrix r (c1). A flip across the x-axis;
// its matrix s (c2). The turn, then the flip, done in a row: the product
// s·r (c3). ρ(gh) = ρ(g)ρ(h) (c4).

type M2 = [number, number, number, number]; // a b c d = [a b; c d]
const mul = (p: M2, q: M2): M2 => [
  p[0] * q[0] + p[1] * q[2],
  p[0] * q[1] + p[1] * q[3],
  p[2] * q[0] + p[3] * q[2],
  p[2] * q[1] + p[3] * q[3],
];
const rot = (a: number): M2 => [
  Math.cos(a),
  -Math.sin(a),
  Math.sin(a),
  Math.cos(a),
];
const flip = (f: number): M2 => [1, 0, 0, f];
const O = { x: 620, y: 450 };
const U = 70;
const CORNERS: [number, number][] = [
  [2, 2],
  [-2, 2],
  [-2, -2],
  [2, -2],
];

export const Matrices: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("matrices");
  const [c0, c1, c2, c3, c4] = cues;
  // the current symmetry, rebuilt from identity at each line
  let M: M2 = [1, 0, 0, 1];
  if (frame >= c1 && frame < c2)
    M = rot((Math.PI / 2) * progress(frame, c1 + 10, 30));
  if (frame >= c2 && frame < c3) M = flip(1 - 2 * progress(frame, c2 + 10, 30));
  if (frame >= c3) {
    const p1 = progress(frame, c3 + 10, 30);
    const p2 = progress(frame, c3 + 50, 30);
    M = mul(flip(1 - 2 * p2), rot((Math.PI / 2) * p1));
  }
  const P = (x: number, y: number) =>
    [O.x + U * (M[0] * x + M[1] * y), O.y - U * (M[2] * x + M[3] * y)] as const;
  const tiles = fadeIn(frame, c0 + 20, 10) * fadeOut(frame, c1, 10);

  return (
    <SceneShell id="matrices">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 20 + i * 5} volume={0.05} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 50} volume={0.1} />
      <Sfx name="chime" at={c4 + 10} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="mx-clip">
            <rect x={240} y={150} width={760} height={620} rx={20} />
          </clipPath>
        </defs>
        <g clipPath="url(#mx-clip)" opacity={fadeIn(frame, c0 + 2, 10)}>
          {Array.from({ length: 13 }, (_, k) => {
            const v = k - 6;
            const [x1, y1] = P(v, -6);
            const [x2, y2] = P(v, 6);
            const [x3, y3] = P(-6, v);
            const [x4, y4] = P(6, v);
            const s = alpha(colors.paper, v === 0 ? 0.5 : 0.15);
            return (
              <g key={k}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={s}
                  strokeWidth={2}
                />
                <line
                  x1={x3}
                  y1={y3}
                  x2={x4}
                  y2={y4}
                  stroke={s}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <path
            d={
              CORNERS.map(
                (c, i) => `${i ? "L" : "M"} ${P(...c)[0]} ${P(...c)[1]}`,
              ).join(" ") + " Z"
            }
            fill={alpha(colors.primary, 0.14)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          {CORNERS.map((c, i) => {
            const [x, y] = P(c[0] * 0.78, c[1] * 0.78);
            return (
              <text
                key={i}
                x={x}
                y={y + 14}
                textAnchor="middle"
                fill={colors.highlight}
                fontSize={40}
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {i + 1}
              </text>
            );
          })}
        </g>
        {/* the 8 symmetries as tiles: a square with a marked corner */}
        <g opacity={tiles}>
          {Array.from({ length: 8 }, (_, i) => {
            const k = i % 4;
            const fl = i >= 4;
            const tm: M2 = fl
              ? mul(flip(-1), rot((Math.PI / 2) * k))
              : rot((Math.PI / 2) * k);
            const cx = 1180 + (i % 4) * 160;
            const cy = 340 + Math.floor(i / 4) * 200;
            const q = (x: number, y: number) => [
              cx + 26 * (tm[0] * x + tm[1] * y),
              cy - 26 * (tm[2] * x + tm[3] * y),
            ];
            const d =
              CORNERS.map(
                (c, j) => `${j ? "L" : "M"} ${q(...c)[0]} ${q(...c)[1]}`,
              ).join(" ") + " Z";
            const [mx, my] = q(1.4, 1.4);
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 20 + i * 5, 6)}>
                <path
                  d={d}
                  fill={alpha(colors.primary, 0.12)}
                  stroke={colors.primary}
                  strokeWidth={4}
                />
                <circle cx={mx} cy={my} r={9} fill={colors.highlight} />
              </g>
            );
          })}
        </g>
        <g opacity={fadeIn(frame, c1 + 30, 10) * fadeOut(frame, c3, 10)}>
          <text
            x={1150}
            y={300}
            fill={colors.text}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            r =
          </text>
          <Mat
            x={1290}
            y={240}
            rows={[
              [0, -1],
              [1, 0],
            ]}
            cw={110}
            rh={70}
            size={52}
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 30, 10) * fadeOut(frame, c3, 10)}>
          <text
            x={1150}
            y={520}
            fill={colors.text}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            s =
          </text>
          <Mat
            x={1290}
            y={460}
            rows={[
              [1, 0],
              [0, -1],
            ]}
            cw={110}
            rh={70}
            size={52}
          />
        </g>
        <g opacity={fadeIn(frame, c3 + 80, 10)}>
          <text
            x={1110}
            y={410}
            fill={colors.green}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            s · r =
          </text>
          <Mat
            x={1330}
            y={350}
            rows={[
              [0, -1],
              [-1, 0],
            ]}
            cw={110}
            rh={70}
            size={52}
            color={colors.green}
          />
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c1, 10) }}>
        <Chip frame={frame} at={c0 + 50} x={1320} y={600} size={40}>
          {tx.eight}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c4 + 6}
        x={1120}
        y={600}
        size={44}
        math
        color={colors.highlight}
      >
        ρ(gh) = ρ(g) ρ(h)
      </Chip>
    </SceneShell>
  );
};
