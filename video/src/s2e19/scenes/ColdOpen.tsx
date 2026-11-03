import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { Arrow } from "../../s2e01/components/vec";
import { Mat } from "../../s2e18/components/mat";
import { svd2 } from "../components/svd";
import { useStrings } from "../i18n";

// Any matrix turns a circle into an ellipse. Four numbers roll in a
// matrix and settle (c0). The grid and a unit circle with colored radii
// bend through it (c1): an ellipse, whose long and short axes appear with
// a right angle (c2). The matrix changes, to a shear, a flip, a squash,
// and the axes are recomputed live: always perpendicular (c3–c4). The
// perpendicular pair on the circle that lands on them appears, dashed,
// with arrows to its images (c5). Three chips light in turn: turn,
// stretch, turn (c6). A = UΣVᵀ (c7).

const O = { x: 720, y: 470 };
const S = 185;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const MS: Mat2[] = [
  [1.2, 0.8, -0.3, 1.0],
  [1, 1.2, 0, 1],
  [-0.8, 0.6, 0.9, 0.7],
  [1.4, 0.2, 0.5, 0.35],
];
const roll = (frame: number, k: number) => {
  const v = Math.sin(frame * 1.7 + k * 3.1) * 43758.5453;
  return Math.round((v - Math.floor(v)) * 18 - 9) / 10;
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const apply = glide(frame, c1 + 6, fps, 30);
  // later matrices, one every 55 frames from c3
  const k = Math.min(3, Math.max(0, Math.floor((frame - c3 - 6) / 55) + 1));
  const kt = k === 0 ? 1 : glide(frame, c3 + 6 + (k - 1) * 55, fps, 26);
  const prev = MS[Math.max(0, k - 1)];
  const m: Mat2 =
    k === 0 ? lerpMat(IDENTITY, MS[0], apply) : lerpMat(prev, MS[k], kt);
  const f = linear(m);
  const { s1, s2, v1, v2, Av1, Av2 } = svd2(m);
  const axes = fadeIn(frame, c2 + 6, 10);
  const pre = fadeIn(frame, c5 + 6, 10) * fadeOut(frame, c7, 10);
  const shown: (number | string)[] =
    frame < c0 + 40
      ? [0, 1, 2, 3].map((i) => roll(Math.floor(frame / 3), i))
      : [...m];
  const circ = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const p = f(Math.cos(t), Math.sin(t));
    const s = scr(p.x, p.y);
    return `${i ? "L" : "M"} ${s.x.toFixed(1)} ${s.y.toFixed(1)}`;
  }).join(" ");
  const RADII = [0, 1, 2, 3, 4, 5].map((i) => (i * Math.PI) / 3);
  const radCol = [
    colors.primary,
    colors.orange,
    colors.highlight,
    colors.green,
    colors.text,
    colors.wood,
  ];
  const u1 = { x: Av1.x / s1, y: Av1.y / s1 };
  const u2 =
    s2 > 1e-3 ? { x: Av2.x / s2, y: Av2.y / s2 } : { x: -u1.y, y: u1.x };
  const r = 0.14;
  const mark = `M ${scr(r * u1.x, r * u1.y).x} ${scr(r * u1.x, r * u1.y).y} L ${scr(r * (u1.x + u2.x), r * (u1.y + u2.y)).x} ${scr(r * (u1.x + u2.x), r * (u1.y + u2.y)).y} L ${scr(r * u2.x, r * u2.y).x} ${scr(r * u2.x, r * u2.y).y}`;
  const chips = [tx.turn, tx.stretch, tx.turn];

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="clink" at={c0 + 40} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`m${i}`} name="whoosh" at={c3 + 6 + i * 55} volume={0.1} />
      ))}
      <Sfx name="clink" at={c4 + 6} volume={0.16} />
      <Sfx name="pluck5" at={c5 + 6} volume={0.14} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`c${i}`} name="pop" at={c6 + 8 + i * 22} volume={0.12} />
      ))}
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="coc">
            <rect x={140} y={90} width={1160} height={740} rx={20} />
          </clipPath>
        </defs>
        <g clipPath="url(#coc)">
          <Plane
            map={f}
            scr={scr}
            range={8}
            opacity={fadeIn(frame, c0 + 2, 10)}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 2, 8)}>
          <path
            d={circ}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={7}
          />
          {RADII.map((a, i) => {
            const p = f(Math.cos(a), Math.sin(a));
            return (
              <line
                key={i}
                x1={O.x}
                y1={O.y}
                x2={scr(p.x, p.y).x}
                y2={scr(p.x, p.y).y}
                stroke={radCol[i]}
                strokeWidth={4}
                opacity={0.7 * (1 - axes)}
              />
            );
          })}
        </g>
        <g opacity={axes}>
          <Arrow
            from={O}
            to={scr(Av1.x, Av1.y)}
            width={14}
            color={colors.green}
          />
          {s2 > 0.05 ? (
            <Arrow
              from={O}
              to={scr(Av2.x, Av2.y)}
              width={14}
              color={colors.highlight}
            />
          ) : null}
          <path d={mark} fill="none" stroke={colors.text} strokeWidth={4} />
        </g>
        <g opacity={pre}>
          <circle
            cx={O.x}
            cy={O.y}
            r={S}
            fill="none"
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
            strokeDasharray="12 10"
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(v1.x, v1.y).x}
            y2={scr(v1.x, v1.y).y}
            stroke={colors.green}
            strokeWidth={6}
            strokeDasharray="12 8"
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(v2.x, v2.y).x}
            y2={scr(v2.x, v2.y).y}
            stroke={colors.highlight}
            strokeWidth={6}
            strokeDasharray="12 8"
          />
        </g>
      </svg>
      <Mat
        m={shown}
        x={1580}
        y={330}
        cell={130}
        opacity={fadeIn(frame, c0 + 4, 8) * fadeOut(frame, c7, 10)}
      />
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1280,
          width: 600,
          whiteSpace: "nowrap",
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c6, 10),
        }}
      >
        {tx.anyMatrix}
        <span
          style={{ fontFamily: fonts.mono, marginLeft: 16, color: colors.text }}
        >
          σ = {s1.toFixed(2)}, {s2.toFixed(2)}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1360,
          width: 440,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {chips.map((c, i) => (
          <div
            key={i}
            style={{
              padding: "8px 22px",
              borderRadius: 14,
              border: `4px solid ${i === 1 ? colors.green : colors.primary}`,
              background: alpha(colors.bg, 0.85),
              fontSize: 42,
              fontWeight: 800,
              color: i === 1 ? colors.green : colors.primary,
              opacity: fadeIn(frame, c6 + 8 + i * 22, 8),
              translate: riseIn(frame, c6 + 8 + i * 22, 12),
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1360,
          width: 440,
          textAlign: "center",
          fontFamily: fonts.body,
          fontSize: 84,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c7 + 6),
          translate: riseIn(frame, c7 + 6, 16),
        }}
      >
        A = UΣVᵀ
      </div>
    </SceneShell>
  );
};
