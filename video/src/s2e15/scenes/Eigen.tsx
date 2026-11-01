import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Eigenvalues of a unitary map sit on the unit circle, proved on screen.
// A complex plane with the unit circle and a candidate λ wandering off it
// (c0). The proof works itself out in one formula row: Uv = λv and
// ‖Uv‖² = ‖v‖² (c1); ⟨λv, λv⟩ becomes λ·λ̄·⟨v, v⟩, the bar landing on
// the second λ, then |λ|²⟨v, v⟩ (c2); |λ|² = 1 and the dot slides onto the
// circle with a ring (c3). Without the bar (c4): λ·λ in red, and on the
// plane λ² keeps turning while λ̄λ stays put at 1.

const O = { x: 560, y: 520 };
const R = 220;

export const Eigen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("eigen");
  const [c0, c1, c2, c3, c4] = cues;
  const settle = glide(frame, c3 + 6, fps, 24);
  const wander = 1.35 + 0.15 * Math.sin((frame - c0) * 0.05);
  const r = lerp(wander, 1, settle);
  const ph = 0.7 + (frame - c0) * 0.02;
  const lam = { x: r * Math.cos(ph), y: r * Math.sin(ph) };
  const ring = fadeIn(frame, c3 + 30, 6) * (1 - fadeIn(frame, c3 + 50, 10));
  const nobar = fadeIn(frame, c4 + 10, 10);
  const red = colors.red;
  const steps: Tok[][] = [
    [{ id: "u", t: "Uv = λv" }],
    [{ id: "u", t: "‖Uv‖² = ‖v‖²" }],
    [
      { id: "a", t: "⟨λv, λv⟩" },
      { id: "e", t: " = " },
      { id: "v", t: "⟨v, v⟩" },
    ],
    [
      { id: "l1", t: "λ" },
      { id: "dot", t: " · " },
      { id: "l2", t: "λ", bar: true },
      { id: "w", t: " ⟨v, v⟩" },
      { id: "e", t: " = " },
      { id: "v", t: "⟨v, v⟩" },
    ],
    [
      { id: "l1", t: "|λ|²", color: colors.orange },
      { id: "w", t: " ⟨v, v⟩" },
      { id: "e", t: " = " },
      { id: "v", t: "⟨v, v⟩" },
    ],
    [
      { id: "l1", t: "|λ|²", color: colors.green },
      { id: "e", t: " = " },
      { id: "one", t: "1", color: colors.green },
    ],
    [
      { id: "l1", t: "λ", color: red },
      { id: "dot", t: " · " },
      { id: "l2", t: "λ", color: red },
      { id: "w", t: " ⟨v, v⟩" },
      { id: "e", t: " = " },
      { id: "v", t: "⟨v, v⟩" },
      { id: "q", t: " ?", color: red },
    ],
  ];
  const at = [c1 + 6, c1 + 50, c2 + 6, c2 + 40, c2 + 90, c3 + 6, c4 + 6];
  const sq = { x: Math.cos(2 * ph), y: Math.sin(2 * ph) };

  return (
    <SceneShell id="eigen">
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.08} />
      <Sfx name="pop" at={c2 + 40} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 90} volume={0.08} />
      <Sfx name="ding" at={c3 + 30} volume={0.3} />
      <Sfx name="thud" at={c4 + 6} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 340}
          y1={O.y}
          x2={O.x + 340}
          y2={O.y}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={O.y - 340}
          x2={O.x}
          y2={O.y + 290}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <circle
          cx={O.x}
          cy={O.y}
          r={R}
          fill="none"
          stroke={colors.primary}
          strokeWidth={6}
        />
        <text
          x={O.x + R * 0.75}
          y={O.y + R * 0.9}
          fill={colors.primary}
          fontSize={36}
          fontWeight={800}
        >
          {tx.unitCircle}
        </text>
        <g opacity={1 - nobar * 0.7}>
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + lam.x * R}
            y2={O.y - lam.y * R}
            stroke={colors.orange}
            strokeWidth={6}
          />
          <circle
            cx={O.x + lam.x * R}
            cy={O.y - lam.y * R}
            r={18}
            fill={colors.orange}
          />
          <circle
            cx={O.x + lam.x * R}
            cy={O.y - lam.y * R}
            r={18 + 40 * fadeIn(frame, c3 + 30, 20)}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={ring}
          />
          <text
            x={O.x + lam.x * R + 24}
            y={O.y - lam.y * R - 18}
            fill={colors.orange}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λ{settle < 0.5 ? " ?" : ""}
          </text>
        </g>
        <g opacity={nobar}>
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + sq.x * R}
            y2={O.y - sq.y * R}
            stroke={red}
            strokeWidth={6}
          />
          <circle cx={O.x + sq.x * R} cy={O.y - sq.y * R} r={16} fill={red} />
          <text
            x={O.x + sq.x * R + 20}
            y={O.y - sq.y * R - 16}
            fill={red}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λ²
          </text>
          <circle cx={O.x + R} cy={O.y} r={18} fill={colors.green} />
          <text
            x={O.x + R + 26}
            y={O.y + 56}
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            <tspan textDecoration="overline">λ</tspan>λ
          </text>
        </g>
      </svg>
      <Eq steps={steps} at={at} x={1340} y={420} size={70} />
    </SceneShell>
  );
};
