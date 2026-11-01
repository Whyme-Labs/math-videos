import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Cauchy–Schwarz, proved on screen. Left: u, v, and the arrow u − tv from
// the point tv on v's line to the tip of u, with tv as an orange shadow. t
// slides back and forth. Right: the parabola p(t) = ‖u − tv‖², a dot riding
// it in step with the slider; the region below zero is shaded red and
// never visited (positivity). The slider then settles at the bottom, where
// u − tv meets v at a right angle. "Never below zero" becomes
// ⟨u, v⟩² ≤ ‖u‖²‖v‖² with the numbers 5.48 ≤ 9.01. Last u swings onto v's
// line: the parabola sinks until it just touches zero, and the two sides
// become equal.

const O = { x: 420, y: 560 };
const S = 200;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const P = { x: 1160, y: 640, sx: 280, sy: 70 };
const pl = (t: number, p: number) => ({
  x: P.x + (t + 0.2) * P.sx,
  y: P.y - p * P.sy,
});
const V = { x: 1.6, y: 0.3 };
const U0 = { x: 1.2, y: 1.4 };

export const Cauchy: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("cauchy");
  const [c0, c1, c2, c3, c4, c5, c6] = cues;
  // u swings onto the line of v in the last beat
  const along = glide(frame, c6 + 6, fps, 40);
  const a0 = Math.atan2(U0.y, U0.x);
  const av = Math.atan2(V.y, V.x);
  const r0 = Math.hypot(U0.x, U0.y);
  const ua = lerp(a0, av, along);
  const u = { x: r0 * Math.cos(ua), y: r0 * Math.sin(ua) };
  const uu = u.x * u.x + u.y * u.y;
  const uv = u.x * V.x + u.y * V.y;
  const vv = V.x * V.x + V.y * V.y;
  const p = (t: number) => uu - 2 * t * uv + t * t * vv;
  const t0 = uv / vv;
  const slide = 0.8 + 0.75 * Math.sin(Math.max(0, frame - c1 - 10) * 0.07);
  const settle = glide(frame, c4 + 4, fps, 24);
  const t = frame < c1 + 10 ? 0 : lerp(slide, t0, settle);
  const tv = { x: t * V.x, y: t * V.y };
  const curve = Array.from({ length: 61 }, (_, i) => {
    const s = -0.2 + (i / 60) * 2.2;
    const q = pl(s, p(s));
    return `${i ? "L" : "M"} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }).join(" ");
  const plot = fadeIn(frame, c2 + 6, 10);
  const right = settle > 0.95;
  // right-angle mark between v's line and u − tv at the bottom
  const d = { x: u.x - tv.x, y: u.y - tv.y };
  const dn = Math.hypot(d.x, d.y) || 1;
  const vn = Math.hypot(V.x, V.y);
  const k = 0.13;
  const m1 = { x: tv.x + (V.x / vn) * k, y: tv.y + (V.y / vn) * k };
  const m2 = { x: m1.x + (d.x / dn) * k, y: m1.y + (d.y / dn) * k };
  const m3 = { x: tv.x + (d.x / dn) * k, y: tv.y + (d.y / dn) * k };

  return (
    <SceneShell id="cauchy">
      <Sfx name="pop" at={c0 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.1} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="thud" at={c3 + 10} volume={0.2} />
      <Sfx name="ding" at={c4 + 28} volume={0.4} />
      <Sfx name="pop" at={c5 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c6 + 6} volume={0.1} />
      <Sfx name="chime" at={c6 + 50} volume={0.35} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* left: the arrows */}
        <line
          x1={scr(-0.6, -0.6 * (V.y / V.x)).x}
          y1={scr(-0.6, -0.6 * (V.y / V.x)).y}
          x2={scr(2.6, 2.6 * (V.y / V.x)).x}
          y2={scr(2.6, 2.6 * (V.y / V.x)).y}
          stroke={alpha(colors.primary, 0.35)}
          strokeWidth={4}
        />
        <g opacity={fadeIn(frame, c0 + 6)}>
          <Arrow from={O} to={scr(V.x, V.y)} width={14} />
          <Arrow
            from={O}
            to={scr(u.x, u.y)}
            width={14}
            color={colors.highlight}
          />
          <text
            x={scr(V.x, V.y).x + 10}
            y={scr(V.x, V.y).y + 50}
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v
          </text>
          <text
            x={scr(u.x, u.y).x + 12}
            y={scr(u.x, u.y).y - 10}
            fill={colors.highlight}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            u
          </text>
        </g>
        <g opacity={fadeIn(frame, c1 + 10)}>
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(tv.x, tv.y).x}
            y2={scr(tv.x, tv.y).y}
            stroke={colors.orange}
            strokeWidth={10}
            strokeLinecap="round"
          />
          {dn > 0.03 ? (
            <Arrow
              from={scr(tv.x, tv.y)}
              to={scr(u.x, u.y)}
              width={12}
              color={colors.green}
            />
          ) : null}
          <circle
            cx={scr(tv.x, tv.y).x}
            cy={scr(tv.x, tv.y).y}
            r={11}
            fill={colors.orange}
          />
          <text
            x={scr(tv.x, tv.y).x - 10}
            y={scr(tv.x, tv.y).y + 52}
            fill={colors.orange}
            fontSize={42}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={1 - along}
          >
            tv
          </text>
          <path
            d={`M ${scr(m1.x, m1.y).x} ${scr(m1.x, m1.y).y} L ${scr(m2.x, m2.y).x} ${scr(m2.x, m2.y).y} L ${scr(m3.x, m3.y).x} ${scr(m3.x, m3.y).y}`}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
            opacity={right && dn > 0.05 ? 1 : 0}
          />
        </g>
        {/* right: the parabola */}
        <g opacity={plot}>
          <rect
            x={pl(-0.2, 0).x}
            y={P.y}
            width={2.2 * P.sx}
            height={110}
            fill={alpha(colors.red, 0.18 * fadeIn(frame, c3 + 6, 12))}
          />
          <line
            x1={pl(-0.2, 0).x}
            y1={P.y}
            x2={pl(2, 0).x}
            y2={P.y}
            stroke={
              fadeIn(frame, c3 + 6) > 0.5
                ? colors.green
                : alpha(colors.paper, 0.5)
            }
            strokeWidth={5}
          />
          <line
            x1={pl(0, 0).x}
            y1={P.y + 100}
            x2={pl(0, 0).x}
            y2={pl(0, 5.2).y}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          <path d={curve} fill="none" stroke={colors.green} strokeWidth={6} />
          <circle
            cx={pl(t, p(t)).x}
            cy={pl(t, p(t)).y}
            r={15}
            fill={colors.orange}
          />
          <line
            x1={pl(t, 0).x}
            y1={P.y}
            x2={pl(t, p(t)).x}
            y2={pl(t, p(t)).y}
            stroke={colors.orange}
            strokeWidth={3}
            strokeDasharray="6 6"
          />
          <text
            x={pl(2, 0).x + 10}
            y={P.y + 14}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            t
          </text>
          <text
            x={pl(0, 5.2).x + 16}
            y={pl(0, 5.2).y + 10}
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ‖u − tv‖²
          </text>
        </g>
      </svg>
      <Eq
        steps={[
          [
            { id: "a", t: "⟨u, v⟩²" },
            { id: "r", t: " ≤ " },
            { id: "b", t: "‖u‖² ‖v‖²" },
          ],
          [
            { id: "a", t: (uv * uv).toFixed(2), color: colors.orange },
            { id: "r", t: " ≤ " },
            { id: "b", t: (uu * vv).toFixed(2), color: colors.primary },
          ],
        ]}
        at={[c5 + 6, c5 + 60]}
        x={1460}
        y={110}
        size={60}
      />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 120,
          width: 1000,
          textAlign: "left",
          fontSize: 32,
          fontWeight: 700,
          color: colors.muted,
          opacity: fadeIn(frame, c6 + 50),
          translate: riseIn(frame, c6 + 50, 10),
        }}
      >
        {tx.cauchyNames}
      </div>
    </SceneShell>
  );
};
