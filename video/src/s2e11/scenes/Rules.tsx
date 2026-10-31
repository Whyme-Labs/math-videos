import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The wish list for a signed area. A parallelogram on u (lemon) and v
// (pink), with a counter. u stretches ×2 and the counter doubles; v slides
// along u and the counter holds. Reset. Then the order is swapped: the
// orientation arc reverses and the counter goes negative (red). Last, v
// swings until it lies along u and the counter drops to 0.

const O = { x: 720, y: 640 };
const S = 110;
const U = { x: 2, y: 0.4 };
const V = { x: 0.8, y: 2 };
const scr = (p: { x: number; y: number }) => ({
  x: O.x + p.x * S,
  y: O.y - p.y * S,
});

export const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rules");
  const [c0, c1] = cues;
  const back = glide(frame, c1 + 4, fps, 20);
  const s = lerp(lerp(1, 2, glide(frame, c0 + 40, fps, 24)), 1, back);
  const k = lerp(lerp(0, 0.6, glide(frame, c0 + 90, fps, 24)), 0, back);
  const swap = glide(frame, c1 + 30, fps, 20);
  const par = glide(frame, c1 + 80, fps, 30);
  const u = { x: U.x * s, y: U.y * s };
  const v0 = { x: V.x + k * u.x, y: V.y + k * u.y };
  const v = { x: lerp(v0.x, 0.6 * U.x, par), y: lerp(v0.y, 0.6 * U.y, par) };
  const det = u.x * v.y - u.y * v.x;
  const signed = swap > 0.5 ? -det : det;
  const neg = signed < -0.005;
  const P = [
    scr({ x: 0, y: 0 }),
    scr(u),
    scr({ x: u.x + v.x, y: u.y + v.y }),
    scr(v),
  ];
  // the orientation arc, from the first arrow towards the second
  const a1 = Math.atan2(-(swap > 0.5 ? v.y : u.y), swap > 0.5 ? v.x : u.x);
  const a2 = Math.atan2(-(swap > 0.5 ? u.y : v.y), swap > 0.5 ? u.x : v.x);
  const R = 90;
  const arc = `M ${O.x + R * Math.cos(a1)} ${O.y + R * Math.sin(a1)} A ${R} ${R} 0 0 ${swap > 0.5 ? 1 : 0} ${O.x + R * Math.cos(a2)} ${O.y + R * Math.sin(a2)}`;

  return (
    <SceneShell id="rules">
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="ding" at={c0 + 64} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 90} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.08} />
      <Sfx name="pop" at={c1 + 30} volume={0.16} />
      <Sfx name="thud" at={c1 + 100} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <polygon
          points={P.map((p) => `${p.x},${p.y}`).join(" ")}
          fill={alpha(neg ? colors.red : colors.primary, 0.25)}
          stroke={neg ? colors.red : colors.primary}
          strokeWidth={4}
        />
        <path
          d={arc}
          fill="none"
          stroke={colors.text}
          strokeWidth={6}
          opacity={par < 0.9 ? 1 : 0}
        />
        <Arrow
          from={O}
          to={scr(u)}
          width={14}
          color={swap > 0.5 ? colors.highlight : colors.primary}
        />
        <Arrow
          from={O}
          to={scr(v)}
          width={14}
          color={swap > 0.5 ? colors.primary : colors.highlight}
        />
        {[
          { p: scr(u), t: swap > 0.5 ? "2" : "1" },
          { p: scr(v), t: swap > 0.5 ? "1" : "2" },
        ].map((l) => (
          <text
            key={l.t}
            x={l.p.x + 20}
            y={l.p.y - 16}
            fill={colors.text}
            stroke={colors.bg}
            strokeWidth={8}
            paintOrder="stroke"
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            {l.t}
          </text>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1360,
          width: 400,
          padding: "16px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${neg ? colors.red : colors.primary}`,
          opacity: fadeIn(frame, c0 + 10),
          translate: riseIn(frame, c0 + 10, 16),
        }}
      >
        <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
          {tx.area}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 96,
            fontWeight: 800,
            color: neg ? colors.red : colors.primary,
          }}
        >
          {(Math.abs(signed) < 0.005 ? 0 : signed).toFixed(2).replace("-", "−")}
        </div>
      </div>
    </SceneShell>
  );
};
