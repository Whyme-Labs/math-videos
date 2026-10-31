import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// Measure after mapping. Two panels: V on the left, W on the right, T
// between them. An arrow v sits in V; a copy flies across to W and lands as
// T(v), which pierces the orange stack ψ there (2.66 sheets). Then ψ's
// sheets are pulled back through T and land in V as the stack T*ψ; the
// original arrow v crosses exactly the same 2.66 sheets.

const T = { a: 1, b: 0.5, c: 0.3, d: 1 }; // columns (a, c), (b, d)
const PSI = { a: 1, b: 0.8 };
const PULL = { a: PSI.a * T.a + PSI.b * T.c, b: PSI.a * T.b + PSI.b * T.d };
const VEC = { x: 1.2, y: 0.9 };
const TV = { x: T.a * VEC.x + T.b * VEC.y, y: T.c * VEC.x + T.d * VEC.y };
const S = 120;
const L = { x: 520, y: 480 };
const R = { x: 1400, y: 480 };
const panel = (c: { x: number; y: number }) => (x: number, y: number) => ({
  x: c.x + x * S,
  y: c.y - y * S,
});

export const Pullback: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("pullback");
  const [c0, c1] = cues;
  const fly = glide(frame, c0 + 30, fps, 30);
  const pull = glide(frame, c1 + 10, fps, 40);
  const count = Math.min(1, springIn(frame, c0 + 64, fps, 10));
  const count2 = Math.min(1, springIn(frame, c1 + 54, fps, 10));
  const lv = panel(L);
  const rv = panel(R);
  const flyTip = {
    x: lerp(lv(VEC.x, VEC.y).x, rv(TV.x, TV.y).x, fly),
    y:
      lerp(lv(VEC.x, VEC.y).y, rv(TV.x, TV.y).y, fly) -
      160 * Math.sin(Math.PI * fly),
  };
  const flyTail = {
    x: lerp(L.x, R.x, fly),
    y: lerp(L.y, R.y, fly) - 160 * Math.sin(Math.PI * fly),
  };
  const reading = (PSI.a * TV.x + PSI.b * TV.y).toFixed(2);

  return (
    <SceneShell id="pullback">
      <Sfx name="pluck1" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="ding" at={c0 + 64} />
      <Sfx name="riser" at={c1 + 10} volume={0.1} />
      <Sfx name="ding" at={c1 + 54} />
      <Sfx name="chime" at={c1 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          {[L, R].map((c, k) => (
            <clipPath key={k} id={`pb${k}`}>
              <rect
                x={c.x - 340}
                y={c.y - 300}
                width={680}
                height={600}
                rx={30}
              />
            </clipPath>
          ))}
        </defs>
        {[L, R].map((c, k) => (
          <rect
            key={k}
            x={c.x - 340}
            y={c.y - 300}
            width={680}
            height={600}
            rx={30}
            fill={alpha(colors.bgMid, 0.55)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={4}
          />
        ))}
        <g clipPath="url(#pb1)">
          <Stack
            a={PSI.a}
            b={PSI.b}
            scr={rv}
            opacity={fadeIn(frame, c0 + 6, 10)}
          />
        </g>
        <g clipPath="url(#pb0)">
          <Stack a={PULL.a} b={PULL.b} scr={lv} opacity={pull} />
        </g>
        {/* the sheets travelling back */}
        <g opacity={pull > 0 && pull < 0.98 ? 1 - pull : 0}>
          {[0, 1, 2].map((k) => {
            const x = lerp(R.x - 200 + k * 140, L.x - 200 + k * 140, pull);
            return (
              <line
                key={k}
                x1={x - 60}
                y1={R.y + 140}
                x2={x + 60}
                y2={R.y - 140}
                stroke={colors.orange}
                strokeWidth={6}
              />
            );
          })}
        </g>
        <Arrow from={L} to={lv(VEC.x, VEC.y)} width={14} />
        <Arrow
          from={flyTail}
          to={flyTip}
          width={14}
          opacity={fly > 0 ? 1 : 0}
        />
        {/* T, between the panels */}
        <path
          d="M 880 220 Q 960 170 1040 220"
          fill="none"
          stroke={colors.text}
          strokeWidth={6}
        />
        <polygon points="1052,232 1026,226 1040,206" fill={colors.text} />
        <text
          x={960}
          y={160}
          fill={colors.text}
          fontSize={56}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          T
        </text>
        <g opacity={pull}>
          <path
            d="M 1040 760 Q 960 810 880 760"
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
          />
          <polygon points="868,748 894,754 880,774" fill={colors.orange} />
        </g>
        {[
          { c: R, s: count, label: "ψ" },
          { c: L, s: count2, label: "T*ψ" },
        ].map((b) => (
          <g
            key={b.label}
            opacity={b.s}
            transform={`translate(${b.c.x + 200} ${b.c.y - 230}) scale(${b.s})`}
          >
            <rect
              x={-110}
              y={-50}
              width={220}
              height={90}
              rx={16}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.orange}
              strokeWidth={4}
            />
            <text
              y={14}
              fill={colors.primary}
              fontSize={50}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {reading}
            </text>
            <text
              y={-70}
              fill={colors.orange}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {b.label}
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 60),
          translate: riseIn(frame, c1 + 60, 16),
        }}
      >
        {tx.sameCount} ✓
      </div>
    </SceneShell>
  );
};
