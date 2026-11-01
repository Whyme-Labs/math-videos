import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Where Riesz runs out. The measurement p ↦ p(0) on polynomials with
// ⟨p, q⟩ = ∫₀¹ p q (c0). On degree ≤ 1 its arrow is q₁ = 4 − 6x, drawn
// on [0, 1] (c1); degree 2 gives q₂ = 9 − 36x + 30x², taller and sharper
// at 0 (c2); then q₃, q₄, q₅, each spiking higher, while a bar of their
// lengths ‖qₙ‖ = n + 1 climbs 2, 3, 4, 5, 6 (c3). On all polynomials the
// bar runs off the top of the screen: no arrow exists (c4).
// qₙ(x) = Σₖ (2k + 1)(−1)ᵏ P̃ₖ(x) with P̃ₖ the shifted Legendre polynomials,
// so qₙ(0) = (n + 1)² = ‖qₙ‖².

// shifted Legendre P̃ₖ(x) on [0, 1] by the three-term recurrence
const legendre = (k: number, x: number) => {
  const t = 2 * x - 1;
  let p0 = 1;
  let p1 = t;
  if (k === 0) return p0;
  for (let n = 1; n < k; n++) {
    const p2 = ((2 * n + 1) * t * p1 - n * p0) / (n + 1);
    p0 = p1;
    p1 = p2;
  }
  return p1;
};
const q = (n: number, x: number) => {
  let s = 0;
  for (let k = 0; k <= n; k++)
    s += (2 * k + 1) * (k % 2 ? -1 : 1) * legendre(k, x);
  return s;
};

const G = { x: 220, y: 600, w: 820, h: 13 };
const gp = (x: number, y: number) => ({
  x: G.x + x * G.w,
  y: G.y - Math.max(-30, Math.min(40, y)) * G.h,
});

export const Delta: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("delta");
  const [c0, c1, c2, c3, c4] = cues;
  const shownAt = [c1 + 6, c2 + 6, c3 + 6, c3 + 40, c3 + 74];
  const latest = shownAt.filter((a) => frame >= a).length;
  const curve = (n: number) =>
    Array.from({ length: 121 }, (_, i) => {
      const x = i / 120;
      const p = gp(x, q(n, x));
      return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }).join(" ");
  const barTarget = latest + 1;
  const runaway = glide(frame, c4 + 10, fps, 50) * 20;
  const bar = (latest ? barTarget : 0) + runaway;
  const B = { x: 1500, y: 780, u: 70 };

  return (
    <SceneShell id="delta">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {shownAt.map((a, k) => (
        <Sfx key={k} name="pluck2" at={a} volume={0.12} />
      ))}
      <Sfx name="riser" at={c4 + 10} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16delta">
            <rect x={140} y={80} width={1000} height={720} />
          </clipPath>
        </defs>
        <line
          x1={G.x}
          y1={G.y}
          x2={G.x + G.w + 40}
          y2={G.y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <line
          x1={G.x}
          y1={G.y + 220}
          x2={G.x}
          y2={G.y - 500}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <text
          x={G.x - 20}
          y={G.y + 50}
          fill={colors.muted}
          fontSize={36}
          fontFamily={fonts.mono}
        >
          0
        </text>
        <text
          x={G.x + G.w - 10}
          y={G.y + 50}
          fill={colors.muted}
          fontSize={36}
          fontFamily={fonts.mono}
        >
          1
        </text>
        <g clipPath="url(#e16delta)">
          {[1, 2, 3, 4, 5].map((n, k) => (
            <path
              key={n}
              d={curve(n)}
              fill="none"
              stroke={
                k === latest - 1 ? colors.orange : alpha(colors.orange, 0.3)
              }
              strokeWidth={k === latest - 1 ? 7 : 4}
              opacity={fadeIn(frame, shownAt[k], 8)}
            />
          ))}
        </g>
        {/* the bar of lengths */}
        <g opacity={fadeIn(frame, c1 + 10)}>
          <rect
            x={B.x - 50}
            y={B.y - bar * B.u}
            width={100}
            height={bar * B.u}
            rx={8}
            fill={runaway > 0.5 ? colors.red : colors.primary}
          />
          <line
            x1={B.x - 80}
            y1={B.y}
            x2={B.x + 80}
            y2={B.y}
            stroke={colors.text}
            strokeWidth={4}
          />
          <text
            x={B.x}
            y={B.y + 46}
            fill={colors.muted}
            fontSize={36}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.length}
          </text>
          <text
            x={B.x + 80}
            y={Math.max(120, B.y - bar * B.u + 20)}
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            {runaway > 0.5 ? "∞" : bar.toFixed(0)}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 140,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 6),
          translate: riseIn(frame, c0 + 6, 14),
        }}
      >
        {tx.valueAt0}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 640,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: latest > 0 ? 1 : 0,
        }}
      >
        {tx.degree} ≤ {Math.max(1, latest)}
      </div>
    </SceneShell>
  );
};
