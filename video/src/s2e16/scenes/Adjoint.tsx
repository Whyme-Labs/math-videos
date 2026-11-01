import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// The adjoint as a round trip. Two planes, V on the left and W on the
// right, with A = [1 2; 0 1] carrying V to W. A stack β = (0.6, 0.3) on W
// is pulled back through A to the stack Aᵀβ = (0.6, 1.5) on V, which the
// ruler turns into an arrow. Then a card: with the dot product that round
// trip is the transpose [1 0; 2 1]; with the ruler G = diag(1, 4) on both
// sides it's G⁻¹AᵀG = [1 0; 0.5 1], and the arrow on V swings to match.

const V = { x: 520, y: 400 };
const W = { x: 1400, y: 400 };
const U = 90;
const sV = (x: number, y: number) => ({ x: V.x + x * U, y: V.y - y * U });
const sW = (x: number, y: number) => ({ x: W.x + x * U, y: W.y - y * U });
const BETA = { a: 0.6, b: 0.3 };
const PB = { a: 0.6, b: 1.5 };
const T1 = ["1", "0", "2", "1"];
const T2 = ["1", "0", "0.5", "1"];

export const Adjoint: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("adjoint");
  const [c0, c1] = cues;
  const ruler = glide(frame, c1 + 50, fps, 30);
  const arr = { x: PB.a, y: lerp(PB.b, PB.b / 4, ruler) };
  const K = 1.4;

  return (
    <SceneShell id="adjoint">
      <Sfx name="pop" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="pop" at={c0 + 56} volume={0.14} />
      <Sfx name="chime" at={c0 + 90} volume={0.6} />
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16V">
            <circle cx={V.x} cy={V.y} r={240} />
          </clipPath>
          <clipPath id="e16W">
            <circle cx={W.x} cy={W.y} r={240} />
          </clipPath>
        </defs>
        {[V, W].map((c, k) => (
          <circle
            key={k}
            cx={c.x}
            cy={c.y}
            r={240}
            fill={alpha(colors.paper, 0.05)}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={4}
          />
        ))}
        <text
          x={V.x - 200}
          y={V.y - 200}
          fill={colors.muted}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          V
        </text>
        <text
          x={W.x + 170}
          y={W.y - 200}
          fill={colors.muted}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          W
        </text>
        <path
          d="M 800 250 Q 960 180 1110 250"
          fill="none"
          stroke={colors.text}
          strokeWidth={6}
        />
        <polygon points="1130,262 1096,262 1112,236" fill={colors.text} />
        <text
          x={960}
          y={170}
          fill={colors.text}
          fontSize={52}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          A
        </text>
        <g clipPath="url(#e16W)" opacity={fadeIn(frame, c0 + 10)}>
          <Stack a={BETA.a} b={BETA.b} scr={sW} range={6} />
        </g>
        <g opacity={fadeIn(frame, c0 + 40)}>
          <path
            d="M 1120 540 Q 960 610 810 540"
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <polygon points="790,528 824,526 810,552" fill={colors.orange} />
          <text
            x={960}
            y={510}
            fill={colors.orange}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.pullBack}
          </text>
        </g>
        <g clipPath="url(#e16V)" opacity={fadeIn(frame, c0 + 56)}>
          <Stack a={PB.a} b={PB.b} scr={sV} range={10} opacity={0.8} />
        </g>
        <g opacity={fadeIn(frame, c0 + 90)}>
          <Arrow from={V} to={sV(arr.x * K, arr.y * K)} width={16} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 300,
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 90),
          translate: riseIn(frame, c0 + 90, 12),
        }}
      >
        {tx.toArrow}
      </div>
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 760,
          width: 400,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: fadeIn(frame, c1 + 10),
          translate: riseIn(frame, c1 + 10, 12),
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: ruler > 0.5 ? colors.highlight : colors.muted,
            width: 170,
            textAlign: "right",
          }}
        >
          {ruler > 0.5 ? tx.otherRuler : tx.transpose}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 80px)",
            rowGap: 4,
            padding: "6px 18px",
            borderLeft: `5px solid ${colors.text}`,
            borderRight: `5px solid ${colors.text}`,
            borderRadius: 10,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            textAlign: "center",
          }}
        >
          {T1.map((t, k) => (
            <span
              key={k}
              style={{
                color:
                  T2[k] !== t && ruler > 0.5 ? colors.highlight : colors.text,
              }}
            >
              {ruler > 0.5 ? T2[k] : t}
            </span>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
