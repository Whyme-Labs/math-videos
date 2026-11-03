import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { A, L1, L2, V1, V2 } from "../components/ellipse";
import { useStrings } from "../i18n";

// A as a sum of stretched shadows. The two eigen-lines of the ellipse's
// matrix and an arrow b swinging slowly (c0). b drops its shadows onto
// both lines; each shadow is stretched by its λ, 6 and 1, and the two are
// added tip to tail. The sum lands exactly on Ab, drawn faintly from the
// matrix itself, which turns green (c1). The formula A = 6P₁ + 1P₂ (c2).
// The stretches change to √6 and 1 and the same recipe builds √A b; the
// formula becomes √A = √6 P₁ + P₂ (c3). Last, for a unit state ψ, the two
// squared shadow lengths are the chances of the outcomes 6 and 1, two
// bars that always add to 1 (c4).

const O = { x: 520, y: 600 };
const S = 80;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const Decomp: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("decomp");
  const [c0, c1, c2, c3, c4] = cues;
  const th = 1.3 + 0.4 * Math.sin((frame - c0) * 0.025);
  const b = { x: 1.3 * Math.cos(th), y: 1.3 * Math.sin(th) };
  const p1 = b.x * V1.x + b.y * V1.y;
  const p2 = b.x * V2.x + b.y * V2.y;
  const shadows = fadeIn(frame, c1 + 6, 10);
  const grow = glide(frame, c1 + 30, fps, 24);
  const toRoot = glide(frame, c3 + 10, fps, 30);
  const l1 = lerp(1, lerp(L1, Math.sqrt(L1), toRoot), grow);
  const l2 = lerp(1, L2, grow);
  const s1 = { x: p1 * l1 * V1.x, y: p1 * l1 * V1.y };
  const s2 = { x: p2 * l2 * V2.x, y: p2 * l2 * V2.y };
  const sum = { x: s1.x + s2.x, y: s1.y + s2.y };
  const Ab = { x: A[0] * b.x + A[1] * b.y, y: A[2] * b.x + A[3] * b.y };
  const match = grow > 0.98 && toRoot < 0.02;
  const q = fadeIn(frame, c4 + 6, 10);
  const n = Math.hypot(b.x, b.y);
  const pr1 = (p1 / n) ** 2;
  const pr2 = (p2 / n) ** 2;
  const steps: Tok[][] = [
    [
      tok("A", "A"),
      tok("eq", " = "),
      tok("l1", "6", colors.orange),
      tok("P1", " P₁"),
      tok("p", " + "),
      tok("l2", "1", colors.highlight),
      tok("P2", " P₂"),
    ],
    [
      tok("A", "√A"),
      tok("eq", " = "),
      tok("l1", "√6", colors.orange),
      tok("P1", " P₁"),
      tok("p", " + "),
      tok("P2", "P₂"),
    ],
  ];

  return (
    <SceneShell id="decomp">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="ding" at={c1 + 60} volume={0.28} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="pluck4" at={c3 + 40} volume={0.14} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[V1, V2].map((v, i) => (
          <line
            key={i}
            x1={scr(-3 * v.x, -3 * v.y).x}
            y1={scr(-3 * v.x, -3 * v.y).y}
            x2={scr(8 * v.x, 8 * v.y).x}
            y2={scr(8 * v.x, 8 * v.y).y}
            stroke={alpha(i ? colors.highlight : colors.orange, 0.45)}
            strokeWidth={4}
            strokeDasharray="14 12"
          />
        ))}
        <g opacity={shadows}>
          <line
            x1={scr(b.x, b.y).x}
            y1={scr(b.x, b.y).y}
            x2={scr(p1 * V1.x, p1 * V1.y).x}
            y2={scr(p1 * V1.x, p1 * V1.y).y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <line
            x1={scr(b.x, b.y).x}
            y1={scr(b.x, b.y).y}
            x2={scr(p2 * V2.x, p2 * V2.y).x}
            y2={scr(p2 * V2.x, p2 * V2.y).y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <Arrow
            from={O}
            to={scr(s1.x, s1.y)}
            width={16}
            color={colors.orange}
          />
          <Arrow
            from={scr(s1.x, s1.y)}
            to={scr(sum.x, sum.y)}
            width={14}
            color={colors.highlight}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 50, 10)}>
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(Ab.x, Ab.y).x}
            y2={scr(Ab.x, Ab.y).y}
            stroke={alpha(match ? colors.green : colors.paper, 0.6)}
            strokeWidth={22}
            strokeLinecap="round"
            opacity={toRoot < 0.5 ? 1 : 0}
          />
          <Arrow
            from={O}
            to={scr(sum.x, sum.y)}
            width={12}
            color={match ? colors.green : colors.primary}
          />
        </g>
        <Arrow from={O} to={scr(b.x, b.y)} width={14} color={colors.text} />
        <text
          x={scr(b.x, b.y).x - 40}
          y={scr(b.x, b.y).y - 10}
          fill={colors.text}
          fontSize={46}
          fontFamily={fonts.math}
          fontWeight={800}
          textAnchor="end"
        >
          {frame >= c4 ? "ψ" : "b"}
        </text>
        {/* outcome chances */}
        <g opacity={q}>
          <line
            x1={1250}
            y1={760}
            x2={1700}
            y2={760}
            stroke={colors.text}
            strokeWidth={4}
          />
          {[
            { p: pr1, c: colors.orange, l: "6", x: 1360 },
            { p: pr2, c: colors.highlight, l: "1", x: 1590 },
          ].map(({ p, c, l, x }) => (
            <g key={l}>
              <rect
                x={x - 55}
                y={760 - p * 300}
                width={110}
                height={p * 300}
                rx={8}
                fill={c}
              />
              <text
                x={x}
                y={750 - p * 300 - 14}
                fill={c}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {(p * 100).toFixed(0)}%
              </text>
              <text
                x={x}
                y={810}
                fill={colors.muted}
                fontSize={38}
                textAnchor="middle"
                fontWeight={800}
              >
                {tx.outcome} {l}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <Eq steps={steps} at={[c2 + 6, c3 + 40]} x={1470} y={170} size={80} />
    </SceneShell>
  );
};
