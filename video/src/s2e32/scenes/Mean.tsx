import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly } from "../components/draw";
import { useStrings } from "../i18n";

// The mean ergodic theorem as a projection. The invariant line I drawn
// green; a vector f; its iterates Uⁿf circle round the tip of Pf, because
// U fixes the I part and turns the rest (c0). f split into Pf on I and a
// part w = Ug − g (c1). Pf glows: averaging leaves it alone (c2). On the
// right, bars of ‖A_N w‖ shrinking like 2‖g‖/N, the telescoping bound
// dashed above them (c3). The averages A_N f trace a spiral into the tip
// of Pf; chip: time average = space average (c4).

const O = { x: 260, y: 600 };
const SC = 120;
const P = [4.2, 0];
const W = [0.9, 1.6];
const TH = 1.1;
const scr = (v: number[]) => [O.x + SC * v[0], O.y - SC * v[1]] as const;
// U on the w part: a turn by TH in an ellipse drawn round the tip of Pf
const uw = (n: number) => [
  W[0] * Math.cos(n * TH) - (W[1] / 1.6) * 0.9 * Math.sin(n * TH) * 0.6,
  W[1] * Math.cos(n * TH) + W[0] * 1.6 * Math.sin(n * TH) * 0.6,
];
const avg = (N: number) => {
  let x = 0;
  let y = 0;
  for (let n = 0; n < N; n++) {
    const v = uw(n);
    x += v[0];
    y += v[1];
  }
  return [x / N, y / N];
};

export const Mean: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("mean");
  const [c0, c1, c2, c3, c4] = cues;
  const iters = Math.min(12, Math.max(0, Math.floor((frame - c0 - 10) / 8)));
  const Nmax = Math.min(40, Math.max(1, Math.floor((frame - c4 - 6) / 3)));
  const bars = Math.min(30, Math.max(0, Math.floor((frame - c3 - 6) / 3)));
  const tip = (v: number[]) => scr([P[0] + v[0], P[1] + v[1]]);
  const [fx, fy] = tip(W);
  const [px, py] = scr(P);

  return (
    <SceneShell id="mean">
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 10 + i * 8} volume={0.05} />
      ))}
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="riser" at={c4 + 6} volume={0.12} />
      <Sfx name="chime" at={c4 + 120} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        A<sub style={{ fontSize: 32 }}>N</sub> f = (f + Uf + … + U
        <sup style={{ fontSize: 32 }}>N−1</sup>f) / N
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={160}
          y1={O.y}
          x2={1060}
          y2={O.y}
          stroke={colors.green}
          strokeWidth={5}
          opacity={fadeIn(frame, c0 + 2, 8)}
        />
        <text
          x={1040}
          y={O.y + 50}
          textAnchor="end"
          fill={colors.green}
          fontSize={36}
          fontFamily={fonts.body}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 2, 8)}
        >
          I = {tx.invariant}
        </text>
        <line
          x1={O.x}
          y1={O.y}
          x2={fx}
          y2={fy}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
        <text
          x={fx + 14}
          y={fy - 10}
          fill={colors.primary}
          fontSize={40}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 6, 8)}
        >
          f
        </text>
        <g opacity={fadeOut(frame, c4, 10)}>
          {Array.from({ length: iters }, (_, n) => {
            const [x, y] = tip(uw(n + 1));
            return (
              <circle
                key={n}
                cx={x}
                cy={y}
                r={8}
                fill={alpha(colors.primary, 0.7)}
              />
            );
          })}
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <line
            x1={O.x}
            y1={O.y}
            x2={px}
            y2={py}
            stroke={colors.green}
            strokeWidth={12}
            opacity={0.5 + 0.5 * fadeIn(frame, c2 + 6, 8)}
          />
          <line
            x1={px}
            y1={py}
            x2={fx}
            y2={fy}
            stroke={colors.orange}
            strokeWidth={6}
            strokeDasharray="12 8"
          />
          <text
            x={px - 10}
            y={py + 50}
            textAnchor="middle"
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            Pf
          </text>
          <text
            x={(px + fx) / 2 + 30}
            y={(py + fy) / 2}
            fill={colors.orange}
            fontSize={34}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            Ug − g
          </text>
        </g>
        <g opacity={fadeIn(frame, c4 + 4, 8)}>
          <path
            d={poly(
              Array.from({ length: Nmax }, (_, N) => {
                const [x, y] = tip(avg(N + 1));
                return [x, y];
              }),
            )}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
          />
          <circle
            cx={tip(avg(Nmax))[0]}
            cy={tip(avg(Nmax))[1]}
            r={12}
            fill={colors.highlight}
          />
        </g>
        <g opacity={fadeIn(frame, c3 + 4, 8)}>
          <line
            x1={1200}
            y1={720}
            x2={1780}
            y2={720}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={poly(
              Array.from({ length: 30 }, (_, k) => [
                1210 + k * 19 + 6,
                720 - 380 / (k + 1),
              ]),
            )}
            fill="none"
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          {Array.from({ length: bars }, (_, k) => {
            const a = avg(k + 1);
            const h = 190 * Math.hypot(a[0], a[1]);
            return (
              <rect
                key={k}
                x={1210 + k * 19}
                y={720 - h}
                width={12}
                height={h}
                fill={colors.orange}
              />
            );
          })}
          <text
            x={1200}
            y={300}
            fill={colors.orange}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ‖A
            <tspan fontSize={24} dy={8}>
              N
            </tspan>
            <tspan dy={-8}>(Ug − g)‖ ≤ 2‖g‖ / N</tspan>
          </text>
        </g>
      </svg>
      <Chip
        frame={frame}
        at={c4 + 90}
        x={1200}
        y={760}
        color={colors.highlight}
        size={40}
        math
      >
        A<sub>N</sub> f → Pf
      </Chip>
    </SceneShell>
  );
};
