import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// A menagerie of measurements. A curve f; three orange probes attach one at
// a time: a pin at x = 0 reading the value, a tangent gauge at x = 1
// reading the slope, and the shaded area reading its size. Each reading
// pops up in its own badge. Then a second curve g, and f + g: three area
// bars on the right, and the bar for g lifts onto the bar for f and lands
// exactly level with the bar for f + g.

const X0 = 220;
const XS = 560;
const Y0 = 720;
const YS = 230;
const plot = (x: number, y: number) => ({ x: X0 + x * XS, y: Y0 - y * YS });
const f = (x: number) => 0.4 + 1.2 * x - 0.5 * x * x;
const g = (x: number) => 0.3 + 0.2 * x;
const area = (h: (x: number) => number) => {
  let s = 0;
  for (let i = 0; i < 300; i++) s += h((i + 0.5) * 0.005) * 0.005;
  return s;
};

export const Probes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("probes");
  const [c0, c1] = cues;
  const probe = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 30, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const lift = glide(frame, c1 + 60, fps, 30);
  const aF = area(f);
  const aG = area(g);
  const BAR = 220;
  const readings = [
    { t: tx.value, v: f(0).toFixed(1) },
    { t: tx.slope, v: (1.2 - 1).toFixed(1) },
    { t: tx.area, v: aF.toFixed(2) },
  ];

  return (
    <SceneShell id="probes">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="clink" at={c0 + 20 + k * 30} volume={0.18} />
      ))}
      <Sfx name="pop" at={c1 + 20} volume={0.14} />
      <Sfx name="pop" at={c1 + 36} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.12} />
      <Sfx name="ding" at={c1 + 90} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={plot(-0.05, 0).x}
          y1={Y0}
          x2={plot(1.6, 0).x}
          y2={Y0}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        <line
          x1={X0}
          y1={plot(0, -0.1).y}
          x2={X0}
          y2={plot(0, 2.4).y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        {/* area under f */}
        <path
          d={`${curve(f, 0, 1.5, plot)} L ${plot(1.5, 0).x} ${Y0} L ${X0} ${Y0} Z`}
          fill={alpha(colors.orange, 0.3 * probe(2) * part1)}
        />
        <path
          d={curve(f, 0, 1.5, plot)}
          fill="none"
          stroke={colors.primary}
          strokeWidth={7}
        />
        <text
          x={plot(1.5, f(1.5)).x + 20}
          y={plot(1.5, f(1.5)).y}
          fill={colors.primary}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          f
        </text>
        {/* g and f + g */}
        <g opacity={fadeIn(frame, c1 + 20, 8)}>
          <path
            d={curve(g, 0, 1.5, plot)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <text
            x={plot(1.5, g(1.5)).x + 20}
            y={plot(1.5, g(1.5)).y + 10}
            fill={colors.highlight}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            g
          </text>
        </g>
        <g opacity={fadeIn(frame, c1 + 36, 8)}>
          <path
            d={curve((x) => f(x) + g(x), 0, 1.5, plot)}
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <text
            x={plot(1.5, f(1.5) + g(1.5)).x + 20}
            y={plot(1.5, f(1.5) + g(1.5)).y}
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            f + g
          </text>
        </g>
        {/* the value pin and the slope gauge */}
        <g opacity={probe(0) * part1}>
          <line
            x1={X0}
            y1={plot(0, f(0)).y - 140}
            x2={X0}
            y2={plot(0, f(0)).y}
            stroke={colors.orange}
            strokeWidth={6}
          />
          <circle cx={X0} cy={plot(0, f(0)).y} r={16} fill={colors.orange} />
        </g>
        <g opacity={probe(1) * part1}>
          <line
            x1={plot(0.6, f(1) - 0.4 * 0.2).x}
            y1={plot(0.6, f(1) - 0.4 * 0.2).y}
            x2={plot(1.4, f(1) + 0.4 * 0.2).x}
            y2={plot(1.4, f(1) + 0.4 * 0.2).y}
            stroke={colors.orange}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <circle
            cx={plot(1, f(1)).x}
            cy={plot(1, f(1)).y}
            r={14}
            fill={colors.orange}
          />
        </g>
        {/* area bars: f, g, f + g */}
        <g opacity={fadeIn(frame, c1 + 40, 8)}>
          {[
            { x: 1300, h: aF, c: colors.primary, l: "f" },
            { x: 1440, h: aG, c: colors.highlight, l: "g" },
            { x: 1620, h: aF + aG, c: colors.text, l: "f + g" },
          ].map((b, k) => {
            const lifted = k === 1;
            const x = lifted ? lerp(b.x, 1300, lift) : b.x;
            const base = lifted ? lerp(Y0, Y0 - aF * BAR, lift) : Y0;
            return (
              <g key={b.l}>
                <rect
                  x={x - 50}
                  y={base - b.h * BAR}
                  width={100}
                  height={b.h * BAR}
                  fill={alpha(b.c, 0.7)}
                  stroke={b.c}
                  strokeWidth={4}
                />
                <text
                  x={b.x}
                  y={Y0 + 56}
                  fill={b.c}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {b.l}
                </text>
              </g>
            );
          })}
          <line
            x1={1240}
            y1={Y0 - (aF + aG) * BAR}
            x2={1680}
            y2={Y0 - (aF + aG) * BAR}
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="10 8"
            opacity={fadeIn(frame, c1 + 90, 6)}
          />
        </g>
      </svg>
      {/* the readings */}
      <AbsoluteFill style={{ opacity: part1 }}>
        {readings.map((r, k) => (
          <div
            key={r.t}
            style={{
              position: "absolute",
              top: 140 + k * 150,
              left: 1320,
              width: 400,
              padding: "12px 20px",
              borderRadius: 16,
              background: alpha(colors.bg, 0.85),
              border: `4px solid ${colors.orange}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: probe(k),
              scale: String(probe(k)),
            }}
          >
            <span
              style={{ fontSize: 34, color: colors.orange, fontWeight: 800 }}
            >
              {r.t}
            </span>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 54,
                color: colors.primary,
                fontWeight: 800,
              }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
