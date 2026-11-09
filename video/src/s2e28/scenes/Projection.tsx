import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// The projection theorem. A convex blob C and a point x outside (c0).
// Points c₁, c₂, … in C close in on the best distance, alternating sides
// (c1). For two of them, the triangle x, cₙ, cₘ and its midpoint, which
// is in C; the parallelogram bound appears (c2). More points, all
// crowding to one point p, which glows (c3). Then a subspace M through
// the origin: x, its foot p, the perpendicular error and a right-angle
// mark (c4). The line M⊥ appears and x splits along both (c5).

const E = { x: 640, y: 540, rx: 280, ry: 190 };
const X: Pt = [1240, 250];
const onE = (t: number): Pt => [
  E.x + E.rx * Math.cos(t),
  E.y + E.ry * Math.sin(t),
];
const TP = (() => {
  let best = 0;
  let bd = 1e9;
  for (let i = 0; i < 2000; i++) {
    const t = (2 * Math.PI * i) / 2000;
    const p = onE(t);
    const d = Math.hypot(p[0] - X[0], p[1] - X[1]);
    if (d < bd) {
      bd = d;
      best = t;
    }
  }
  return best;
})();
const P = onE(TP);
const c = (n: number): Pt => {
  const p = onE(TP + (n % 2 ? 1 : -1) * 0.9 * 0.62 ** n);
  return [lerp(E.x, p[0], 0.96), lerp(E.y, p[1], 0.96)];
};
const O: Pt = [560, 640];
const DIR: Pt = [1, -0.32];
const XS: Pt = [960, 230];
const footM = (() => {
  const n = Math.hypot(DIR[0], DIR[1]);
  const u = [DIR[0] / n, DIR[1] / n];
  const t = (XS[0] - O[0]) * u[0] + (XS[1] - O[1]) * u[1];
  return [O[0] + t * u[0], O[1] + t * u[1]] as Pt;
})();

export const Projection: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("projection");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const n =
    frame < c3
      ? Math.min(4, Math.max(0, Math.floor((frame - c1 - 6) / 16)))
      : Math.min(12, 4 + Math.floor((frame - c3 - 6) / 8));
  const drop = glide(frame, c4 + 14, fps, 20);
  const split = glide(frame, c5 + 10, fps, 20);
  const c1p = c(1);
  const c2p = c(2);
  const mid: Pt = [(c1p[0] + c2p[0]) / 2, (c1p[1] + c2p[1]) / 2];
  const ang = (Math.atan2(DIR[1], DIR[0]) * 180) / Math.PI;

  return (
    <SceneShell id="projection">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 4 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 16} volume={0.07} />
      ))}
      <Sfx name="pluck2" at={c2 + 8} volume={0.14} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 8} volume={0.06} />
      ))}
      <Sfx name="ding" at={c3 + 70} volume={0.22} />
      <Sfx name="pluck3" at={c4 + 14} volume={0.12} />
      <Sfx name="chime" at={c5 + 10} volume={0.26} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <ellipse
            cx={E.x}
            cy={E.y}
            rx={E.rx}
            ry={E.ry}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <text
            x={E.x - 40}
            y={E.y + 16}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            C
          </text>
          <circle cx={X[0]} cy={X[1]} r={14} fill={colors.highlight} />
          <text
            x={X[0] + 24}
            y={X[1] - 10}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x
          </text>
          {Array.from({ length: n }, (_, i) => {
            const p = c(i + 1);
            return (
              <g key={i}>
                <line
                  x1={X[0]}
                  y1={X[1]}
                  x2={p[0]}
                  y2={p[1]}
                  stroke={alpha(colors.orange, 0.35)}
                  strokeWidth={3}
                />
                <circle cx={p[0]} cy={p[1]} r={9} fill={colors.orange} />
              </g>
            );
          })}
          <g opacity={fadeIn(frame, c2 + 6, 8) * fadeOut(frame, c3, 8)}>
            <path
              d={`M ${X[0]} ${X[1]} L ${c1p[0]} ${c1p[1]} L ${c2p[0]} ${c2p[1]} Z`}
              fill={alpha(colors.paper, 0.08)}
              stroke={colors.paper}
              strokeWidth={3}
            />
            <line
              x1={X[0]}
              y1={X[1]}
              x2={mid[0]}
              y2={mid[1]}
              stroke={colors.green}
              strokeWidth={4}
              strokeDasharray="10 7"
            />
            <circle cx={mid[0]} cy={mid[1]} r={10} fill={colors.green} />
          </g>
          <circle
            cx={P[0]}
            cy={P[1]}
            r={16 + 4 * Math.sin(frame * 0.2)}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c3 + 70, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 1180,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c2 + 20),
            whiteSpace: "nowrap",
          }}
        >
          ‖cₘ − cₙ‖² ≤ 2/n + 2/m
        </div>
        <div
          style={{
            position: "absolute",
            top: 610,
            left: 1180,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 70),
            whiteSpace: "nowrap",
          }}
        >
          {tx.cauchy}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <path
            d={`M ${O[0] - 260} ${O[1] + 83} L ${O[0] + 700} ${O[1] - 224}`}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <line
            x1={O[0] + 0.3 * 100}
            y1={O[1] + 100}
            x2={O[0] - 0.3 * 400}
            y2={O[1] - 400}
            stroke={alpha(colors.orange, 0.8)}
            strokeWidth={5}
            opacity={fadeIn(frame, c5 + 4, 8)}
          />
          <line
            x1={O[0]}
            y1={O[1]}
            x2={XS[0]}
            y2={XS[1]}
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <circle cx={XS[0]} cy={XS[1]} r={12} fill={colors.highlight} />
          <line
            x1={XS[0]}
            y1={XS[1]}
            x2={lerp(XS[0], footM[0], drop)}
            y2={lerp(XS[1], footM[1], drop)}
            stroke={colors.red}
            strokeWidth={5}
          />
          <circle
            cx={footM[0]}
            cy={footM[1]}
            r={10}
            fill={colors.green}
            opacity={drop}
          />
          <g
            opacity={fadeIn(frame, c4 + 34, 6)}
            transform={`translate(${footM[0]} ${footM[1]}) rotate(${ang})`}
          >
            <path
              d="M -24 0 L -24 -24 L 0 -24"
              fill="none"
              stroke={colors.paper}
              strokeWidth={4}
            />
          </g>
          <g opacity={split}>
            <line
              x1={O[0]}
              y1={O[1]}
              x2={footM[0]}
              y2={footM[1]}
              stroke={colors.green}
              strokeWidth={8}
            />
            <line
              x1={O[0]}
              y1={O[1]}
              x2={O[0] + (XS[0] - footM[0])}
              y2={O[1] + (XS[1] - footM[1])}
              stroke={colors.red}
              strokeWidth={8}
            />
          </g>
          <text
            x={O[0] + 640}
            y={O[1] - 230}
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            M
          </text>
          <text
            x={O[0] - 150}
            y={O[1] - 360}
            fill={colors.orange}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 4, 8)}
          >
            M⊥
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1240,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 40),
            whiteSpace: "nowrap",
          }}
        >
          x − p ⟂ M
        </div>
      </AbsoluteFill>
      <Chip
        frame={frame}
        at={c5 + 20}
        x={1240}
        y={260}
        color={colors.green}
        math
        size={52}
      >
        H = M ⊕ M⊥
      </Chip>
    </SceneShell>
  );
};
