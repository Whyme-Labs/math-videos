import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The two lemmas as one moving formula, with a picture under it. The
// rule ⟨Au, v⟩ = ⟨u, Av⟩ (c0). Two eigen-arrows: u with stretch λ = 2 in
// lemon and v with μ = ½ in coral (c1). Moving A across turns the formula
// into λ⟨u, v⟩ = μ⟨u, v⟩; under it v swings around and two bars show the
// two sides, λ⟨u, v⟩ and μ⟨u, v⟩: they differ at every angle except 90°,
// where both are 0 (c2–c3). The formula ends at (λ − μ)⟨u, v⟩ = 0 as v
// settles perpendicular. Then the same trick with v = u over ℂ: λ⟨v, v⟩ =
// λ̄⟨v, v⟩, so λ = λ̄ (c4).

const O = { x: 520, y: 620 };
const R = 300;
const tok = (id: string, t: string, color?: string, bar?: boolean): Tok => ({
  id,
  t,
  color,
  bar,
});

export const Lemmas: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lemmas");
  const [c0, c1, c2, c3, c4] = cues;
  const L = colors.primary;
  const M = colors.highlight;
  const settle = glide(frame, c3 + 20, fps, 30);
  const sw = Math.max(0, frame - c2 - 50) * 0.045;
  const phi = lerp(Math.PI / 2 + 1.1 * Math.sin(sw), Math.PI / 2, settle);
  const ua = 0.35;
  const u = { x: Math.cos(ua), y: Math.sin(ua) };
  const va = ua + phi;
  const v = { x: Math.cos(va), y: Math.sin(va) };
  const ip = Math.cos(phi);
  const lhs = 2 * ip;
  const rhs = 0.5 * ip;
  const eq = Math.abs(lhs - rhs) < 0.02;
  const bars = fadeIn(frame, c2 + 50, 10);
  const pic = fadeIn(frame, c1 + 6, 10);
  const steps: Tok[][] = [
    [
      tok("l", "⟨"),
      tok("A1", "A"),
      tok("u", "u"),
      tok("c1", ", "),
      tok("v", "v"),
      tok("r", "⟩"),
      tok("eq", " = "),
      tok("l2", "⟨"),
      tok("u2", "u"),
      tok("c2", ", "),
      tok("A2", "A"),
      tok("v2", "v"),
      tok("r2", "⟩"),
    ],
    [
      tok("l", "⟨"),
      tok("A1", "λ", L),
      tok("u", "u"),
      tok("c1", ", "),
      tok("v", "v"),
      tok("r", "⟩"),
      tok("eq", " = "),
      tok("l2", "⟨"),
      tok("u2", "u"),
      tok("c2", ", "),
      tok("A2", "μ", M),
      tok("v2", "v"),
      tok("r2", "⟩"),
    ],
    [
      tok("A1", "λ", L),
      tok("l", "⟨"),
      tok("u", "u"),
      tok("c1", ", "),
      tok("v", "v"),
      tok("r", "⟩"),
      tok("eq", " = "),
      tok("A2", "μ", M),
      tok("l2", "⟨"),
      tok("u2", "u"),
      tok("c2", ", "),
      tok("v2", "v"),
      tok("r2", "⟩"),
    ],
    [
      tok("(", "("),
      tok("A1", "λ", L),
      tok("m", " − "),
      tok("A2", "μ", M),
      tok(")", ")"),
      tok("l", "⟨"),
      tok("u", "u"),
      tok("c1", ", "),
      tok("v", "v"),
      tok("r", "⟩"),
      tok("eq", " = "),
      tok("z", "0", colors.green),
    ],
    [
      tok("A1", "λ", L),
      tok("l", "⟨"),
      tok("u", "v"),
      tok("c1", ", "),
      tok("v", "v"),
      tok("r", "⟩"),
      tok("eq", " = "),
      tok("A2", "λ", L, true),
      tok("l2", "⟨"),
      tok("u2", "v"),
      tok("c2", ", "),
      tok("v2", "v"),
      tok("r2", "⟩"),
    ],
    [tok("A1", "λ", L), tok("eq", " = "), tok("A2", "λ", L, true)],
  ];
  const bar = (x: number, val: number, c: string, label: string) => (
    <g>
      <rect
        x={x - 50}
        y={val > 0 ? 640 - val * 75 : 640}
        width={100}
        height={Math.abs(val) * 75}
        rx={8}
        fill={eq ? colors.green : c}
      />
      <text
        x={x}
        y={450}
        fill={c}
        fontSize={44}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {label}
      </text>
    </g>
  );

  return (
    <SceneShell id="lemmas">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 16} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 50} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="ding" at={c3 + 50} volume={0.28} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="chime" at={c4 + 60} volume={0.3} />

      <Eq
        steps={steps}
        at={[c0 + 6, c2 + 6, c2 + 50, c3 + 6, c4 + 6, c4 + 60]}
        x={960}
        y={110}
        size={84}
      />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={pic}>
          <circle
            cx={O.x}
            cy={O.y}
            r={R}
            fill="none"
            stroke={alpha(colors.paper, 0.15)}
            strokeWidth={3}
          />
          <Arrow
            from={O}
            to={{ x: O.x + R * u.x, y: O.y - R * u.y }}
            width={16}
            color={L}
          />
          <Arrow
            from={O}
            to={{ x: O.x + R * v.x, y: O.y - R * v.y }}
            width={16}
            color={M}
          />
          <text
            x={O.x + R * u.x * 1.15}
            y={O.y - R * u.y * 1.15 - 24}
            textAnchor="middle"
            fill={L}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            u · λ = 2
          </text>
          <text
            x={O.x + R * v.x * 1.15}
            y={O.y - R * v.y * 1.15 - 24}
            fill={M}
            fontSize={46}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            v · μ = ½
          </text>
          {settle > 0.9 ? (
            <path
              d={`M ${O.x + 40 * u.x} ${O.y - 40 * u.y} L ${O.x + 40 * (u.x + v.x)} ${O.y - 40 * (u.y + v.y)} L ${O.x + 40 * v.x} ${O.y - 40 * v.y}`}
              fill="none"
              stroke={colors.text}
              strokeWidth={4}
            />
          ) : null}
        </g>
        <g opacity={bars}>
          <line
            x1={1180}
            y1={640}
            x2={1720}
            y2={640}
            stroke={colors.text}
            strokeWidth={4}
          />
          {bar(1320, lhs, L, "λ⟨u, v⟩")}
          {bar(1580, rhs, M, "μ⟨u, v⟩")}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 1180,
          width: 540,
          textAlign: "center",
          whiteSpace: "nowrap",
          fontSize: 38,
          fontWeight: 800,
          color: eq ? colors.green : colors.muted,
          opacity: bars,
          translate: riseIn(frame, c2 + 50, 12),
        }}
      >
        {tx.angle}:{" "}
        <span style={{ fontFamily: fonts.mono }}>
          {Math.round((phi * 180) / Math.PI)}°
        </span>{" "}
        · {tx.equal}
      </div>
    </SceneShell>
  );
};
