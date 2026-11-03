import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Plane } from "../../shared/components/Plane";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Mat } from "../components/mat";
import { A, L1, L2, V1, V2, ellipsePath } from "../components/ellipse";

// The worked example. The tilted ellipse and its matrix (c0). The two
// eigen-arrows, (2, 1) with stretch 6 and (1, −2) with stretch 1 (c1),
// and their right angle (c2). The whole picture turns until the arrows
// are the axes, and the formula turns from 5x² + 4xy + 2y² = 1 into
// 6X² + Y² = 1 (c3). Semi-axis lengths 1/√6 and 1 are marked (c4). Last
// the unit circle and the grid, squeezed along the axes into the ellipse:
// a circle seen through a symmetric map (c5).

const O = { x: 700, y: 470 };
const S = 330;
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Ellipse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("ellipse");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const turn = glide(frame, c3 + 6, fps, 40);
  const ang = -Math.atan2(V1.y, V1.x) * turn;
  const scr = (x: number, y: number) => {
    const X = x * Math.cos(ang) - y * Math.sin(ang);
    const Y = x * Math.sin(ang) + y * Math.cos(ang);
    return { x: O.x + X * S, y: O.y - Y * S };
  };
  const squeeze = glide(frame, c5 + 20, fps, 40);
  // the map that takes the circle to the ellipse, A^(−1/2), mixed in
  const k1 = lerp(1, 1 / Math.sqrt(L1), squeeze);
  const k2 = lerp(1, 1 / Math.sqrt(L2), squeeze);
  const sq = (x: number, y: number) => {
    const a = (x * V1.x + y * V1.y) * k1;
    const b = (x * V2.x + y * V2.y) * k2;
    return { x: a * V1.x + b * V2.x, y: a * V1.y + b * V2.y };
  };
  const part5 = fadeIn(frame, c5 + 6, 10);
  const circle = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const p = sq(Math.cos(t), Math.sin(t));
    const s2 = scr(p.x, p.y);
    return `${i ? "L" : "M"} ${s2.x} ${s2.y}`;
  }).join(" ");
  const steps: Tok[][] = [
    [
      tok("a", "5x²"),
      tok("p1", " + "),
      tok("b", "4xy"),
      tok("p2", " + "),
      tok("c", "2y²"),
      tok("eq", " = 1"),
    ],
    [
      tok("a", "6X²", colors.green),
      tok("p2", " + "),
      tok("c", "Y²", colors.highlight),
      tok("eq", " = 1"),
    ],
  ];
  const r = 0.09;
  const mark = `M ${scr(r * V1.x, r * V1.y).x} ${scr(r * V1.x, r * V1.y).y} L ${scr(r * (V1.x + V2.x), r * (V1.y + V2.y)).x} ${scr(r * (V1.x + V2.x), r * (V1.y + V2.y)).y} L ${scr(r * V2.x, r * V2.y).x} ${scr(r * V2.x, r * V2.y).y}`;
  const sA = 1 / Math.sqrt(L1);

  return (
    <SceneShell id="ellipse">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 20} volume={0.14} />
      <Sfx name="clink" at={c2 + 6} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.12} />
      <Sfx name="ding" at={c3 + 50} volume={0.28} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c5 + 20} volume={0.12} />
      <Sfx name="chime" at={c5 + 64} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="elc">
            <rect x={140} y={90} width={1120} height={740} rx={20} />
          </clipPath>
        </defs>
        <g clipPath="url(#elc)">
          <g opacity={part5}>
            <Plane map={(x, y) => sq(x * 0.5, y * 0.5)} scr={scr} range={8} />
          </g>
          <line
            x1={scr(-1.4, 0).x}
            y1={scr(-1.4, 0).y}
            x2={scr(1.4, 0).x}
            y2={scr(1.4, 0).y}
            stroke={alpha(colors.paper, 0.3 * (1 - part5))}
            strokeWidth={3}
          />
          <line
            x1={scr(0, -1.2).x}
            y1={scr(0, -1.2).y}
            x2={scr(0, 1.2).x}
            y2={scr(0, 1.2).y}
            stroke={alpha(colors.paper, 0.3 * (1 - part5))}
            strokeWidth={3}
          />
        </g>
        <path
          d={ellipsePath(scr)}
          fill={alpha(colors.primary, 0.08)}
          stroke={colors.primary}
          strokeWidth={7}
          opacity={fadeIn(frame, c0 + 4, 10)}
        />
        <path
          d={circle}
          fill="none"
          stroke={colors.text}
          strokeWidth={5}
          strokeDasharray="14 10"
          opacity={part5}
        />
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <Arrow
            from={O}
            to={scr(V1.x, V1.y)}
            width={16}
            color={colors.green}
          />
          <text
            x={scr(V1.x, V1.y).x + 16}
            y={scr(V1.x, V1.y).y - 12}
            fill={colors.green}
            fontSize={46}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            ×6
          </text>
        </g>
        <g opacity={fadeIn(frame, c1 + 20, 8)}>
          <Arrow
            from={O}
            to={scr(V2.x, V2.y)}
            width={16}
            color={colors.highlight}
          />
          <text
            x={scr(V2.x, V2.y).x + 20}
            y={scr(V2.x, V2.y).y + 20}
            fill={colors.highlight}
            fontSize={46}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            ×1
          </text>
        </g>
        <path
          d={mark}
          fill="none"
          stroke={colors.text}
          strokeWidth={4}
          opacity={fadeIn(frame, c2 + 6, 8)}
        />
        <g opacity={fadeIn(frame, c4 + 6, 10) * fadeOut(frame, c5, 10)}>
          <text
            x={scr(sA * V1.x * 0.5, sA * V1.y * 0.5).x}
            y={scr(sA * V1.x * 0.5, sA * V1.y * 0.5).y + 60}
            fill={colors.green}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            1/√6
          </text>
          <text
            x={scr(V2.x * 0.5, V2.y * 0.5).x - 60}
            y={scr(V2.x * 0.5, V2.y * 0.5).y}
            fill={colors.highlight}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
          >
            1
          </text>
        </g>
      </svg>
      <Mat
        m={A}
        x={1560}
        y={400}
        opacity={fadeIn(frame, c0 + 10, 10) * fadeOut(frame, c3, 10)}
      />
      <Eq steps={steps} at={[c0 + 6, c3 + 30]} x={1560} y={620} size={64} />
    </SceneShell>
  );
};
