import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Mat } from "../../s2e18/components/mat";
import { useStrings } from "../i18n";

// The proof on A = [3 0; 4 5]. Input panel left, output panel right, the
// working in the middle. AᵀA = [25 20; 20 25] (c0). Its perpendicular
// eigen-axes v₁ = (1, 1)/√2 and v₂ = (−1, 1)/√2 on the input circle, with
// λ = 45 and 5 (c1). Why the λ's can't be negative: ⟨AᵀAv, v⟩ = ‖Av‖² ≥ 0
// (c2). The v's go through A: on the right, Av₁ and Av₂ grow out,
// perpendicular, right angle marked (c3). Their lengths read √45 and √5;
// each shrinks to unit length, the u's (c4). The formula AV = UΣ turns
// into A = UΣVᵀ (c5).

const IN = { x: 380, y: 520 };
const OUT = { x: 1500, y: 540 };
const SI = 150;
const SO = 42;
const sIn = (x: number, y: number) => ({ x: IN.x + x * SI, y: IN.y - y * SI });
const sOut = (x: number, y: number) => ({
  x: OUT.x + x * SO,
  y: OUT.y - y * SO,
});
const R2 = Math.SQRT1_2;
const V1 = { x: R2, y: R2 };
const V2 = { x: -R2, y: R2 };
const AV1 = { x: 3 * R2, y: 9 * R2 };
const AV2 = { x: -3 * R2, y: 1 * R2 };
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("proof");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const grow = glide(frame, c3 + 10, fps, 30);
  const shrink = glide(frame, c4 + 40, fps, 24);
  const len1 = lerp(1, 2 / Math.sqrt(45), shrink) * grow;
  const len2 = lerp(1, 2 / Math.sqrt(5), shrink) * grow;
  const u1 = Math.hypot(AV1.x, AV1.y);
  const u2 = Math.hypot(AV2.x, AV2.y);
  const e1 = { x: (AV1.x / u1) * 0.18, y: (AV1.y / u1) * 0.18 };
  const e2 = { x: (AV2.x / u2) * 0.18, y: (AV2.y / u2) * 0.18 };
  const steps: Tok[][] = [
    [
      tok("l", "⟨AᵀAv, v⟩"),
      tok("eq", " = "),
      tok("r", "‖Av‖²"),
      tok("g", " ≥ 0", colors.green),
    ],
    [tok("AV", "AV"), tok("eq", " = "), tok("U", "U"), tok("S", "Σ")],
    [
      tok("AV", "A"),
      tok("eq", " = "),
      tok("U", "U"),
      tok("S", "Σ"),
      tok("V", "Vᵀ"),
    ],
  ];

  return (
    <SceneShell id="proof">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 18} volume={0.14} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="clink" at={c3 + 44} volume={0.18} />
      <Sfx name="whoosh" at={c4 + 40} volume={0.1} />
      <Sfx name="whoosh" at={c5 + 6} volume={0.1} />
      <Sfx name="chime" at={c5 + 50} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={IN.x}
          cy={IN.y}
          r={SI}
          fill={alpha(colors.paper, 0.06)}
          stroke={colors.paper}
          strokeWidth={5}
          opacity={fadeIn(frame, c0 + 2, 8)}
        />
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <Arrow
            from={IN}
            to={sIn(V1.x, V1.y)}
            width={14}
            color={colors.green}
          />
          <Arrow
            from={IN}
            to={sIn(V2.x, V2.y)}
            width={14}
            color={colors.highlight}
          />
          <text
            x={sIn(V1.x, V1.y).x + 14}
            y={sIn(V1.x, V1.y).y - 10}
            fill={colors.green}
            fontSize={42}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v₁ · 45
          </text>
          <text
            x={sIn(V2.x, V2.y).x - 14}
            y={sIn(V2.x, V2.y).y - 10}
            fill={colors.highlight}
            fontSize={42}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
          >
            5 · v₂
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <path
            d={Array.from({ length: 73 }, (_, i) => {
              const t = (i / 72) * Math.PI * 2;
              const p = sOut(
                3 * Math.cos(t),
                4 * Math.cos(t) + 5 * Math.sin(t),
              );
              return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
            }).join(" ")}
            fill={alpha(colors.primary, 0.06)}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={4}
          />
          {grow > 0.02 ? (
            <>
              <Arrow
                from={OUT}
                to={sOut(AV1.x * len1, AV1.y * len1)}
                width={14}
                color={colors.green}
              />
              <Arrow
                from={OUT}
                to={sOut(AV2.x * len2, AV2.y * len2)}
                width={14}
                color={colors.highlight}
              />
            </>
          ) : null}
          <path
            d={`M ${sOut(e1.x * 5, e1.y * 5).x} ${sOut(e1.x * 5, e1.y * 5).y} L ${sOut((e1.x + e2.x) * 5, (e1.y + e2.y) * 5).x} ${sOut((e1.x + e2.x) * 5, (e1.y + e2.y) * 5).y} L ${sOut(e2.x * 5, e2.y * 5).x} ${sOut(e2.x * 5, e2.y * 5).y}`}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
            opacity={fadeIn(frame, c3 + 44, 8)}
          />
        </g>
        <g opacity={fadeIn(frame, c4 + 6, 8)}>
          <text
            x={sOut(AV1.x, AV1.y).x + 16}
            y={sOut(AV1.x, AV1.y).y + 10}
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={1 - shrink}
          >
            √45
          </text>
          <text
            x={sOut(AV2.x, AV2.y).x - 16}
            y={sOut(AV2.x, AV2.y).y - 16}
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
            opacity={1 - shrink}
          >
            √5
          </text>
          <text
            x={sOut(AV1.x * len1, AV1.y * len1).x + 16}
            y={sOut(AV1.x * len1, AV1.y * len1).y}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={shrink}
          >
            u₁
          </text>
          <text
            x={sOut(AV2.x * len2, AV2.y * len2).x - 16}
            y={sOut(AV2.x * len2, AV2.y * len2).y - 10}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
            opacity={shrink}
          >
            u₂
          </text>
        </g>
        <text
          x={IN.x}
          y={290}
          fill={colors.muted}
          fontSize={40}
          fontWeight={800}
          textAnchor="middle"
        >
          {tx.input}
        </text>
        <text
          x={OUT.x}
          y={200}
          fill={colors.muted}
          fontSize={40}
          fontWeight={800}
          textAnchor="middle"
        >
          {tx.output}
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: fadeIn(frame, c0 + 6, 10) * fadeOut(frame, c2, 10),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 760,
            width: 400,
            textAlign: "center",
            fontFamily: fonts.body,
            fontSize: 56,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          AᵀA =
        </div>
        <Mat m={[25, 20, 20, 25]} x={960} y={330} cell={100} />
      </div>
      <div style={{ opacity: fadeOut(frame, c5, 8) }}>
        <Eq
          steps={[steps[0]]}
          at={[c2 + 6]}
          x={960}
          y={140}
          size={60}
          family={fonts.body}
        />
      </div>
      <Eq
        steps={[steps[1], steps[2]]}
        at={[c5 + 6, c5 + 46]}
        x={960}
        y={140}
        size={84}
        family={fonts.body}
      />
    </SceneShell>
  );
};
