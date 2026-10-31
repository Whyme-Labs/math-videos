import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// One grid, two objects. Left: [[2, 1], [1, 2]] as a map: the unit circle
// stretches into an ellipse, the arrow (1, 1) triples and (1, −1) stays.
// Right: the same grid as a form, drawn as its level curves
// 2x² + 2xy + 2y² = c. Then the basis changes to (1, 0), (1, 2): the left
// card's entries churn to P⁻¹AP and its "stretch 3, 1" badge stays green;
// the right card's entries churn to PᵀBP and its badge turns red,
// ≈ 15.2, 0.8.

const S = 70;
const A0 = [2, 1, 1, 2];
const MAPNEW = [1.5, 1.5, 0.5, 2.5];
const FORMNEW = [2, 4, 4, 14];

const Card: React.FC<{
  readonly x: number;
  readonly v: number[];
  readonly c: string;
  readonly label: string;
}> = ({ x, v, c, label }) => (
  <g transform={`translate(${x} 190)`}>
    <text y={-70} fill={c} fontSize={44} textAnchor="middle" fontWeight={800}>
      {label}
    </text>
    <path
      d="M -110 -50 l -18 0 l 0 160 l 18 0 M 110 -50 l 18 0 l 0 160 l -18 0"
      fill="none"
      stroke={colors.text}
      strokeWidth={5}
    />
    {v.map((n, k) => (
      <text
        key={k}
        x={-55 + (k % 2) * 110}
        y={(k < 2 ? 0 : 80) + 10}
        fill={colors.text}
        fontSize={50}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {Math.round(n * 10) / 10}
      </text>
    ))}
  </g>
);

export const TwoObjects: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("twoObjects");
  const [c0, c1] = cues;
  const act = glide(frame, c0 + 30, fps, 30);
  const levels = fadeIn(frame, c0 + 50, 12);
  const change = glide(frame, c1 + 20, fps, 40);
  const L = { x: 500, y: 600 };
  const R = { x: 1420, y: 600 };
  const ls = (x: number, y: number) => ({ x: L.x + x * S, y: L.y - y * S });
  const rs = (x: number, y: number) => ({ x: R.x + x * S, y: R.y - y * S });
  const circle = Array.from({ length: 73 })
    .map((_, i) => {
      const a = (i / 72) * Math.PI * 2;
      const x = Math.cos(a);
      const y = Math.sin(a);
      const p = ls(lerp(x, 2 * x + y, act), lerp(y, x + 2 * y, act));
      return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ");
  // level curves of 2x² + 2xy + 2y² = c: axes along (1, 1) and (1, −1)
  const ellipse = (c: number) => {
    const r1 = Math.sqrt(c / 3);
    const r2 = Math.sqrt(c / 1);
    return Array.from({ length: 73 })
      .map((_, i) => {
        const a = (i / 72) * Math.PI * 2;
        const u = r1 * Math.cos(a);
        const w = r2 * Math.sin(a);
        const p = rs((u + w) / Math.SQRT2, (u - w) / Math.SQRT2);
        return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ");
  };
  const mapVals = A0.map((v, k) => lerp(v, MAPNEW[k], change));
  const formVals = A0.map((v, k) => lerp(v, FORMNEW[k], change));
  const red = change > 0.5;

  return (
    <SceneShell id="twoObjects">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="pluck3" at={c0 + 50} volume={0.14} />
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="ding" at={c1 + 62} />
      <Sfx name="scratch" at={c1 + 66} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[L, R].map((c, k) => (
          <g key={k}>
            <line
              x1={c.x - 280}
              y1={c.y}
              x2={c.x + 280}
              y2={c.y}
              stroke={alpha(colors.paper, 0.35)}
              strokeWidth={3}
            />
            <line
              x1={c.x}
              y1={c.y + 220}
              x2={c.x}
              y2={c.y - 260}
              stroke={alpha(colors.paper, 0.35)}
              strokeWidth={3}
            />
          </g>
        ))}
        {/* the map */}
        <path
          d={circle}
          fill={alpha(colors.primary, 0.12)}
          stroke={colors.primary}
          strokeWidth={5}
        />
        <Arrow from={L} to={ls(lerp(1, 3, act), lerp(1, 3, act))} width={12} />
        <Arrow from={L} to={ls(1, -1)} width={12} color={colors.highlight} />
        {/* the form */}
        <g opacity={levels}>
          {[1, 3, 6, 10].map((c) => (
            <path
              key={c}
              d={ellipse(c)}
              fill="none"
              stroke={colors.orange}
              strokeWidth={5}
            />
          ))}
        </g>
        <Card x={L.x} v={mapVals} c={colors.primary} label={tx.asMap} />
        <Card x={R.x} v={formVals} c={colors.orange} label={tx.asForm} />
      </svg>
      {[
        { left: L.x + 160, ok: true, t: `${tx.stretch} ✓`, at: c0 + 60 },
        {
          left: R.x + 160,
          ok: !red,
          t: red ? "≈ 15.2, 0.8 ✗" : tx.stretch,
          at: c0 + 60,
        },
      ].map((b, k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            top: 170,
            left: b.left,
            padding: "8px 18px",
            borderRadius: 14,
            border: `4px solid ${b.ok ? colors.green : colors.red}`,
            background: alpha(colors.bg, 0.85),
            color: b.ok ? colors.green : colors.red,
            fontSize: 36,
            fontWeight: 800,
            opacity: fadeIn(frame, b.at),
            translate: riseIn(frame, b.at, 12),
          }}
        >
          {b.t}
        </div>
      ))}
    </SceneShell>
  );
};
