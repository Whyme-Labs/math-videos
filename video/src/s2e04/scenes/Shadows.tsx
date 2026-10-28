import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// One map, many shadows. The map M = [[2, 1], [1, 2]] is fixed. The basis
// (the light) turns from the usual axes towards the diagonals, and the
// matrix beside it updates live, Pᵀ M P for the turned basis: at 45° it is
// diag(3, 1). Then the map acts on a circle: it stretches into an ellipse,
// 3 along one diagonal and 1 along the other, the same picture whatever the
// matrix said.

const O = { x: 720, y: 520 };
const S = 120;

export const Shadows: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("shadows");
  const [c0, c1] = cues;
  const turn = glide(frame, c0 + 30, fps, 150) * (Math.PI / 4);
  const act = glide(frame, c1 + 40, fps, 40);
  const snap = Math.min(1, springIn(frame, c1 + 90, fps, 10));
  // the matrix in the turned basis: Pᵀ M P with P = rotation by `turn`
  const c = Math.cos(turn);
  const s = Math.sin(turn);
  const m11 = 2 + 2 * c * s; // 2c² + 2cs + 2s² = 2 + 2cs
  const m22 = 2 - 2 * c * s;
  const m12 = c * c - s * s;
  const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  // the circle, mapped by M (lerped from the identity)
  const circle = Array.from({ length: 73 })
    .map((_, i) => {
      const a = (i / 72) * Math.PI * 2;
      const x = Math.cos(a);
      const y = Math.sin(a);
      const mx = lerp(x, 2 * x + y, act);
      const my = lerp(y, x + 2 * y, act);
      const p = scr(mx, my);
      return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ");
  const fmt = (v: number) => {
    const r = Math.round(v * 10) / 10;
    return Math.abs(r) < 0.05 ? "0" : r < 0 ? `−${-r}` : `${r}`;
  };

  return (
    <SceneShell id="shadows">
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="ding" at={c0 + 120} />
      <Sfx name="riser" at={c1 + 40} volume={0.1} />
      <Sfx name="chime" at={c1 + 90} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the turning basis: the light */}
        {[-3, -2, -1, 1, 2, 3].map((k) => (
          <g key={k} opacity={0.5}>
            <line
              x1={scr(k * c - -3.2 * s, k * s + -3.2 * c).x}
              y1={scr(k * c - -3.2 * s, k * s + -3.2 * c).y}
              x2={scr(k * c - 3.2 * s, k * s + 3.2 * c).x}
              y2={scr(k * c - 3.2 * s, k * s + 3.2 * c).y}
              stroke={alpha(colors.paper, 0.2)}
              strokeWidth={2}
            />
            <line
              x1={scr(-3.2 * c - k * s, -3.2 * s + k * c).x}
              y1={scr(-3.2 * c - k * s, -3.2 * s + k * c).y}
              x2={scr(3.2 * c - k * s, 3.2 * s + k * c).x}
              y2={scr(3.2 * c - k * s, 3.2 * s + k * c).y}
              stroke={alpha(colors.paper, 0.2)}
              strokeWidth={2}
            />
          </g>
        ))}
        <Arrow from={O} to={scr(c, s)} color={colors.orange} width={10} />
        <Arrow from={O} to={scr(-s, c)} color={colors.orange} width={10} />
        {/* the map, acting on a circle */}
        <path
          d={circle}
          fill={alpha(colors.primary, 0.15)}
          stroke={colors.primary}
          strokeWidth={6}
        />
        {/* the shadow: the matrix in this basis */}
        <g transform="translate(1460 440)">
          <path
            d="M -130 -120 l -26 0 l 0 240 l 26 0 M 130 -120 l 26 0 l 0 240 l -26 0"
            fill="none"
            stroke={turn > 0.78 ? colors.green : colors.text}
            strokeWidth={6}
          />
          {[
            [m11, m12],
            [m12, m22],
          ].map((row, i) =>
            row.map((v, j) => (
              <text
                key={`${i}${j}`}
                x={-65 + j * 130}
                y={-30 + i * 120}
                fill={
                  i !== j && Math.abs(v) < 0.05
                    ? alpha(colors.text, 0.4)
                    : colors.text
                }
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {fmt(v)}
              </text>
            )),
          )}
        </g>
        <g opacity={snap}>
          {[
            { d: { x: 1, y: 1 }, l: "× 3" },
            { d: { x: -1, y: 1 }, l: "× 1" },
          ].map((a) => {
            const k = a.l === "× 3" ? 3 : 1;
            const tip = scr((a.d.x * k) / Math.SQRT2, (a.d.y * k) / Math.SQRT2);
            return (
              <g key={a.l}>
                <Arrow from={O} to={tip} color={colors.highlight} width={12} />
                <text
                  x={tip.x + 20 * a.d.x}
                  y={tip.y - 20}
                  fill={colors.highlight}
                  fontSize={52}
                  textAnchor={a.d.x > 0 ? "start" : "end"}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {a.l}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1160,
          width: 600,
          textAlign: "center",
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 20),
          translate: riseIn(frame, c0 + 20, 16),
        }}
      >
        {tx.sameMap}
      </div>
    </SceneShell>
  );
};
