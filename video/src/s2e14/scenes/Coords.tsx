import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq } from "../../shared/components/Eq";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { useStrings } from "../i18n";

// Dotting coordinates is not a ruler. Two fixed arrows: b₁ = (1, 0) along
// the floor and b₂ = (1, 1) tilted up, 45° apart. The grid behind them
// bends into the basis b₁, b₂, so their coordinates become (1, 0) and
// (0, 1); the coordinate dot product, worked as a formula, is 0 and a
// right-angle mark appears. A protractor arc then reads the true 45°.
// Last the grid keeps changing basis while the arrows never move, and the
// "coordinates · coordinates" readout wanders with every basis.

const O = { x: 700, y: 600 };
const S = 210;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const B: Mat2 = [1, 1, 0, 1]; // columns b₁ = (1, 0), b₂ = (1, 1)
const TOUR: Mat2[] = [
  B,
  [1, 0.3, 0, 1.3],
  [2, 1, 0, 1],
  [1, -0.6, 0.4, 1.2],
  B,
];
const u = { x: 1, y: 0 };
const w = { x: 1, y: 1 };
const inv = ([a, b, c, d]: Mat2): Mat2 => {
  const det = a * d - b * c;
  return [d / det, -b / det, -c / det, a / det];
};

export const Coords: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coords");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const bend = glide(frame, c2 + 6, fps, 36);
  let P = lerpMat(IDENTITY, B, bend);
  if (frame >= c5) {
    const seg = 34;
    const k = Math.min(TOUR.length - 2, Math.floor((frame - c5 - 10) / seg));
    if (k >= 0)
      P = lerpMat(
        TOUR[k],
        TOUR[k + 1],
        glide(frame, c5 + 10 + k * seg, fps, 24),
      );
  }
  const Pi = inv(P);
  const cu = linear(Pi)(u.x, u.y);
  const cw = linear(Pi)(w.x, w.y);
  const dot = cu.x * cw.x + cu.y * cw.y;
  const arc = fadeIn(frame, c4 + 6, 10);
  const fmt = (n: number) =>
    (Math.round(n * 100) / 100).toFixed(2).replace("-", "−");
  const c = (n: number) =>
    Math.abs(n) < 0.005
      ? "0"
      : (Math.round(n * 10) / 10).toString().replace("-", "−");

  return (
    <SceneShell id="coords">
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="ding" at={c3 + 20} volume={0.4} />
      <Sfx name="scratch" at={c4 + 10} volume={0.2} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="whoosh" at={c5 + 10 + k * 34} volume={0.08} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e14coords">
            <rect x={150} y={100} width={1150} height={730} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#e14coords)" opacity={fadeIn(frame, c0 + 4)}>
          <Plane map={linear(P)} scr={scr} range={10} />
        </g>
        <g opacity={fadeIn(frame, c1 + 6)}>
          <Arrow from={O} to={scr(u.x, u.y)} width={16} />
          <Arrow
            from={O}
            to={scr(w.x, w.y)}
            width={16}
            color={colors.highlight}
          />
          <text
            x={scr(1, 0).x + 10}
            y={O.y + 60}
            fill={colors.primary}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            b₁ ({c(cu.x)}, {c(cu.y)})
          </text>
          <text
            x={scr(1, 1).x + 20}
            y={scr(1, 1).y}
            fill={colors.highlight}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            b₂ ({c(cw.x)}, {c(cw.y)})
          </text>
        </g>
        {/* the claimed right angle, then the true 45° */}
        <path
          d={`M ${O.x + 46} ${O.y} L ${O.x + 46} ${O.y - 46} L ${O.x} ${O.y - 46}`}
          fill="none"
          stroke={colors.green}
          strokeWidth={6}
          opacity={fadeIn(frame, c3 + 20) * (1 - arc)}
        />
        <g opacity={arc}>
          <path
            d={`M ${O.x + 120} ${O.y} A 120 120 0 0 0 ${O.x + 120 * Math.SQRT1_2} ${O.y - 120 * Math.SQRT1_2}`}
            fill="none"
            stroke={colors.red}
            strokeWidth={7}
          />
          <text
            x={O.x + 140}
            y={O.y - 30}
            fill={colors.red}
            fontSize={52}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            45°
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeOut(frame, c5, 10),
        }}
      >
        <Eq
          steps={[
            [
              { id: "a", t: "(1, 0)" },
              { id: "d", t: " · " },
              { id: "b", t: "(0, 1)" },
            ],
            [
              { id: "a", t: "(1, 0)" },
              { id: "d", t: " · " },
              { id: "b", t: "(0, 1)" },
              { id: "e", t: " = 0", color: colors.green },
            ],
          ]}
          at={[c3 - 4, c3 + 20]}
          x={1600}
          y={190}
          size={58}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 1360,
          width: 480,
          padding: "16px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${Math.abs(dot) < 0.01 ? colors.green : colors.red}`,
          opacity: fadeIn(frame, c3 + 30),
          translate: riseIn(frame, c3 + 30, 12),
        }}
      >
        <div style={{ fontSize: 30, color: colors.muted, fontWeight: 700 }}>
          {tx.coordDot}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 92,
            fontWeight: 800,
            color: Math.abs(dot) < 0.01 ? colors.green : colors.red,
          }}
        >
          {fmt(dot)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 610,
          left: 1360,
          width: 480,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
          opacity: arc,
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        {tx.protractor}: 45°
      </div>
    </SceneShell>
  );
};
