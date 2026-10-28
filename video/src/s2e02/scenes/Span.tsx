import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Span. Two arrows u and v from one corner. Mixes a·u + b·v light up as
// dots, spreading outward until they tile the whole plane: the span. Then a
// third arrow w arrives; a dashed path u-then-v lands on its tip (w = u + v),
// w greys out and takes a "redundant" tag. The plane doesn't get any bigger.

const O = { x: 900, y: 560 };
const U = { x: 170, y: -40 };
const V = { x: 50, y: -150 };
const at = (a: number, b: number) => ({
  x: O.x + a * U.x + b * V.x,
  y: O.y + a * U.y + b * V.y,
});

export const Span: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("span");
  const [c0, c1] = cues;
  const u = glide(frame, c0 + 8, fps, 16);
  const v = glide(frame, c0 + 22, fps, 16);
  const fill = ramp(frame, c0 + 40, 110);
  const w = glide(frame, c1 + 10, fps, 16);
  const path = glide(frame, c1 + 50, fps, 30);
  const tag = Math.min(1, springIn(frame, c1 + 90, fps, 10));
  const grow = lerp(1, 1.08, ramp(frame, c0 + 40, 140));

  const dots: { a: number; b: number; d: number }[] = [];
  for (let a = -6; a <= 6; a++)
    for (let b = -4; b <= 4; b++) {
      const p = at(a, b);
      if (p.x < 120 || p.x > 1800 || p.y < 100 || p.y > 820) continue;
      dots.push({ a, b, d: Math.hypot(a, b) / 7 });
    }
  const tip = at(1, 1);

  return (
    <SceneShell id="span">
      <Sfx name="pluck1" at={c0 + 8} volume={0.16} />
      <Sfx name="pluck3" at={c0 + 22} volume={0.16} />
      <Sfx name="riser" at={c0 + 40} volume={0.1} />
      <Sfx name="pluck5" at={c1 + 10} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.12} />
      <Sfx name="thud" at={c1 + 90} volume={0.28} />

      <Camera zoom={grow}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {/* every mix a·u + b·v */}
          {dots.map(({ a, b, d }) => {
            const s = Math.max(0, Math.min(1, (fill - d) * 6));
            const p = at(a, b);
            return (
              <circle
                key={`${a},${b}`}
                cx={p.x}
                cy={p.y}
                r={9 * s}
                fill={alpha(colors.primary, 0.55)}
              />
            );
          })}
          {/* the lattice lines, once the span has filled */}
          {[-6, -4, -2, 2, 4, 6].map((k) => (
            <g key={k} opacity={0.18 * fadeIn(frame, c0 + 120, 20)}>
              <line
                x1={at(k, -6).x}
                y1={at(k, -6).y}
                x2={at(k, 6).x}
                y2={at(k, 6).y}
                stroke={colors.paper}
                strokeWidth={2}
              />
              <line
                x1={at(-8, k).x}
                y1={at(-8, k).y}
                x2={at(8, k).x}
                y2={at(8, k).y}
                stroke={colors.paper}
                strokeWidth={2}
              />
            </g>
          ))}
          <Arrow from={O} to={{ x: O.x + U.x * u, y: O.y + U.y * u }} />
          <Arrow
            from={O}
            to={{ x: O.x + V.x * v, y: O.y + V.y * v }}
            color={colors.orange}
          />
          {[
            { l: "u", p: at(1.15, -0.25), c: colors.primary, s: u },
            { l: "v", p: at(-0.3, 1.1), c: colors.orange, s: v },
          ].map((t) => (
            <text
              key={t.l}
              x={t.p.x}
              y={t.p.y}
              fill={t.c}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={t.s}
            >
              {t.l}
            </text>
          ))}
          {/* the third arrow, and the mix that makes it */}
          <Arrow
            from={O}
            to={{ x: O.x + (tip.x - O.x) * w, y: O.y + (tip.y - O.y) * w }}
            color={tag > 0.5 ? alpha(colors.highlight, 0.45) : colors.highlight}
          />
          <path
            d={`M ${O.x} ${O.y} L ${O.x + U.x * Math.min(1, path * 2)} ${O.y + U.y * Math.min(1, path * 2)} ${path > 0.5 ? `L ${O.x + U.x + V.x * (path * 2 - 1)} ${O.y + U.y + V.y * (path * 2 - 1)}` : ""}`}
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
            strokeDasharray="12 10"
            opacity={path > 0 ? 1 : 0}
          />
          <g
            opacity={tag}
            transform={`translate(${tip.x + 150} ${tip.y - 40}) rotate(-6) scale(${tag})`}
          >
            <rect
              x={-130}
              y={-42}
              width={260}
              height={76}
              rx={16}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={12}
              fill={colors.ink}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.redundant}
            </text>
          </g>
          <text
            x={260}
            y={200}
            fill={colors.primary}
            fontSize={72}
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c0 + 120)}
          >
            {tx.span}
          </text>
        </svg>
      </Camera>
    </SceneShell>
  );
};
