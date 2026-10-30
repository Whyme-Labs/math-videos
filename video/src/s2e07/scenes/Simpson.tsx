import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff: why Kepler's weights are exact for cubics. Two meters on the
// right: the area, and the probes' weighted sum (1/6, 4/6, 1/6, drawn as
// probe sizes). Line 1: a parabola; both meters read 0.500. Line 2: the
// pure cubic 2.4(x − ½)³ alone, its two lobes shaded lemon and red; the
// area meter reads 0, the probes read −0.3, 0, +0.3 and their sum is 0.
// Line 3: the cubic is added to the parabola; the curve bends, both meters
// still agree, and "both blind" stamps over the cubic direction.

const X0 = 300;
const XS = 900;
const Y0 = 600;
const YS = 420;
const plot = (x: number, y: number) => ({ x: X0 + x * XS, y: Y0 - y * YS });
const par = (x: number) => 0.2 + 1.2 * x - 0.9 * x * x;
const cub = (x: number) => 2.4 * (x - 0.5) ** 3;
const NODES = [
  { x: 0, w: 1 / 6, r: 14 },
  { x: 0.5, w: 4 / 6, r: 30 },
  { x: 1, w: 1 / 6, r: 14 },
];
const integrate = (f: (x: number) => number) => {
  let s = 0;
  for (let i = 0; i < 400; i++) s += f((i + 0.5) / 400) / 400;
  return s;
};

export const Simpson: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("simpson");
  const [c0, c1, c2] = cues;
  // a: weight of the parabola, b: weight of the cubic
  const toCubic = glide(frame, c1 + 6, fps, 24);
  const back = glide(frame, c2 + 6, fps, 30);
  const a = 1 - toCubic + back;
  const b = lerp(0, 1, glide(frame, c1 + 30, fps, 20));
  const f = (x: number) => a * par(x) + b * cub(x);
  const areaV = integrate(f);
  const probeV = NODES.reduce((s, n) => s + n.w * f(n.x), 0);
  const meters = fadeIn(frame, c0 + 40, 10);
  const stamp = Math.min(1, springIn(frame, c2 + 50, fps, 10));
  const lobes = fadeIn(frame, c1 + 40, 8) * fadeOut(frame, c2 + 6, 10);
  const fmt = (v: number) => {
    const r = Math.abs(v) < 0.0005 ? 0 : v;
    return `${r < 0 ? "−" : ""}${Math.abs(r).toFixed(3)}`;
  };

  return (
    <SceneShell id="simpson">
      {NODES.map((n, k) => (
        <Sfx key={k} name="clink" at={c0 + 14 + k * 10} volume={0.16} />
      ))}
      <Sfx name="ding" at={c0 + 60} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c1 + 60} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="thud" at={c2 + 50} volume={0.3} />
      <Sfx name="chime" at={c2 + 60} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={plot(-0.05, 0).x}
          y1={Y0}
          x2={plot(1.05, 0).x}
          y2={Y0}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        {/* area under the curve, split into the cubic's two lobes when alone */}
        <path
          d={`${curve(f, 0, 1, plot)} L ${plot(1, 0).x} ${Y0} L ${X0} ${Y0} Z`}
          fill={alpha(colors.primary, 0.18 * (1 - lobes))}
        />
        <g opacity={lobes}>
          <path
            d={`${curve(f, 0, 0.5, plot)} L ${plot(0.5, 0).x} ${Y0} L ${X0} ${Y0} Z`}
            fill={alpha(colors.red, 0.4)}
          />
          <path
            d={`${curve(f, 0.5, 1, plot)} L ${plot(1, 0).x} ${Y0} L ${plot(0.5, 0).x} ${Y0} Z`}
            fill={alpha(colors.primary, 0.4)}
          />
        </g>
        <path
          d={curve(f, 0, 1, plot)}
          fill="none"
          stroke={b > 0.5 && a < 0.5 ? colors.highlight : colors.primary}
          strokeWidth={8}
        />
        {/* the three probes */}
        {NODES.map((n, k) => {
          const pt = plot(n.x, f(n.x));
          const s = Math.min(1, springIn(frame, c0 + 14 + k * 10, fps, 10));
          return (
            <g key={k} opacity={s}>
              <line
                x1={pt.x}
                y1={pt.y - 120}
                x2={pt.x}
                y2={pt.y - n.r}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <circle cx={pt.x} cy={pt.y} r={n.r * s} fill={colors.orange} />
              <text
                x={pt.x}
                y={pt.y - 136}
                fill={colors.orange}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {["1/6", "4/6", "1/6"][k]}
              </text>
            </g>
          );
        })}
        <g
          opacity={stamp}
          transform={`translate(${plot(0.5, 0).x} 760) rotate(-5) scale(${stamp})`}
        >
          <rect
            x={-190}
            y={-44}
            width={380}
            height={80}
            rx={14}
            fill={alpha(colors.bg, 0.85)}
            stroke={colors.green}
            strokeWidth={6}
          />
          <text
            y={14}
            fill={colors.green}
            fontSize={42}
            textAnchor="middle"
            fontWeight={900}
          >
            {tx.blind} · x³
          </text>
        </g>
      </svg>
      <AbsoluteFill style={{ opacity: meters }}>
        {[
          { t: tx.areaMeter, v: areaV, c: colors.primary, top: 180 },
          { t: tx.probesSum, v: probeV, c: colors.orange, top: 440 },
        ].map((m) => (
          <div
            key={m.t}
            style={{
              position: "absolute",
              top: m.top,
              left: 1390,
              width: 380,
              padding: "16px 0",
              borderRadius: 20,
              textAlign: "center",
              background: alpha(colors.bg, 0.85),
              border: `4px solid ${m.c}`,
            }}
          >
            <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
              {m.t}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 84,
                fontWeight: 800,
                color: m.c,
              }}
            >
              {fmt(m.v)}
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 362,
            left: 1390,
            width: 380,
            textAlign: "center",
            fontSize: 56,
            fontWeight: 900,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 60, 6),
          }}
        >
          =
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
