import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The gradient. Contours of f = x²y, and the point P = (1, 2) where
// df = (4, 1): near P an orange local stack, the tangent sheets 4x + y = k.
// Then the arrow for df: with the dot product it's (4, 1), the textbook
// gradient; with the ruler G = diag(4, 1) it's G⁻¹df = (1, 1). The arrow
// swings between the two rulers, while a fixed small step h = (0.1, 0.2)
// keeps its climb df(h) = 0.6 the whole time.

const U = 170;
const scr = (x: number, y: number) => ({
  x: 620 + (x - 1) * U,
  y: 460 - (y - 2) * U,
});
const P = scr(1, 2);
const LEVELS = [0.5, 1, 2, 3, 4.5, 6.5];

export const Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("gradient");
  const [c0, c1] = cues;
  const flip =
    frame < c1 + 40
      ? 0
      : glide(frame, c1 + 40, fps, 30) -
        glide(frame, c1 + 120, fps, 30) +
        glide(frame, c1 + 170, fps, 30);
  const g = { x: lerp(4, 1, flip), y: 1 };
  const n = Math.hypot(g.x, g.y);
  const tip = { x: P.x + (260 * g.x) / n, y: P.y - (260 * g.y) / n };
  const H = { x: 0.1, y: 0.2 };
  const hTip = scr(1 + H.x * 4, 2 + H.y * 4);
  const curve = (c: number) =>
    Array.from({ length: 60 }, (_, i) => {
      const x = 0.3 + (i / 59) * 3.2;
      const p = scr(x, Math.min(c / (x * x), 4.6));
      return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }).join(" ");

  return (
    <SceneShell id="gradient">
      <Sfx name="pop" at={c0 + 30} volume={0.14} />
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 120} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 170} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16grad">
            <rect x={160} y={80} width={980} height={740} rx={30} />
          </clipPath>
          <clipPath id="e16local">
            <circle cx={P.x} cy={P.y} r={130} />
          </clipPath>
        </defs>
        <g clipPath="url(#e16grad)" opacity={fadeIn(frame, c0 + 6)}>
          {LEVELS.map((c) => (
            <path
              key={c}
              d={curve(c)}
              fill="none"
              stroke={c === 2 ? colors.orange : alpha(colors.orange, 0.4)}
              strokeWidth={c === 2 ? 6 : 4}
            />
          ))}
        </g>
        <g clipPath="url(#e16local)" opacity={fadeIn(frame, c0 + 30)}>
          {[-3, -2, -1, 0, 1, 2, 3].map((k) => {
            const d = k * 0.18;
            const c = {
              x: 1 + (4 * d) / Math.sqrt(17),
              y: 2 + d / Math.sqrt(17),
            };
            const t = { x: 1 / Math.sqrt(17), y: -4 / Math.sqrt(17) };
            const a = scr(c.x - t.x, c.y - t.y);
            const b = scr(c.x + t.x, c.y + t.y);
            return (
              <line
                key={k}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={colors.orange}
                strokeWidth={k === 0 ? 8 : 5}
              />
            );
          })}
        </g>
        <g opacity={fadeIn(frame, c1 + 10)}>
          <Arrow from={P} to={hTip} width={10} color={colors.green} />
          <Arrow from={P} to={tip} width={16} />
          <text
            x={tip.x + 16}
            y={tip.y - 14}
            fill={colors.primary}
            fontSize={40}
            fontWeight={800}
          >
            {tx.steepest}
          </text>
        </g>
        <circle cx={P.x} cy={P.y} r={14} fill={colors.text} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1260,
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 30),
          translate: riseIn(frame, c0 + 30, 14),
        }}
      >
        df = (4, 1)
      </div>
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 1260,
          width: 520,
          padding: "12px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 10),
        }}
      >
        {flip > 0.5 ? tx.otherRuler : tx.dotRuler}
        <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
          ({flip > 0.5 ? "1, 1" : "4, 1"})
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1260,
          width: 520,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 60),
          translate: riseIn(frame, c1 + 60, 12),
        }}
      >
        {tx.climb}: <span style={{ fontFamily: fonts.mono }}>0.6</span>
      </div>
    </SceneShell>
  );
};
