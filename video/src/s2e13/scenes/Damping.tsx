import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff: critical damping. On the left a mass on a spring; on the
// right the graph of its position over time. First the underdamped curve
// (it swings) and then the overdamped one (it creeps) draw in, with the
// mass following each. Then the damping dial lands exactly on balance: the
// two eigenvalues merge, and the third curve, (1 + t)e^(−t), draws in
// lemon, labelled with its new term t·e^(−t).

const X0 = 760;
const XS = 120;
const Y0 = 470;
const YS = 230;
const plot = (t: number, x: number) => ({ x: X0 + t * XS, y: Y0 - x * YS });
const under = (t: number) =>
  Math.exp(-0.35 * t) * (Math.cos(2 * t) + 0.175 * Math.sin(2 * t));
const over = (t: number) => {
  const r1 = -0.27;
  const r2 = -3.73;
  return (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
};
const critical = (t: number) => (1 + t) * Math.exp(-t);

export const Damping: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("damping");
  const [c0, c1] = cues;
  const d1 = ramp(frame, c0 + 20, 60);
  const d2 = ramp(frame, c0 + 90, 60);
  const d3 = ramp(frame, c1 + 30, 60);
  const merge = glide(frame, c1 + 6, fps, 24);
  const T = 8;
  // the mass follows whichever curve is drawing
  const live =
    frame >= c1 + 30
      ? critical(d3 * T)
      : frame >= c0 + 90
        ? over(d2 * T)
        : under(d1 * T);
  const massY = 470 - live * 180;

  return (
    <SceneShell id="damping">
      <Sfx name="pluck2" at={c0 + 20} volume={0.12} />
      <Sfx name="pluck5" at={c0 + 90} volume={0.12} />
      <Sfx name="clink" at={c1 + 6} volume={0.18} />
      <Sfx name="riser" at={c1 + 30} volume={0.08} />
      <Sfx name="chime" at={c1 + 90} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the spring and the mass */}
        <rect x={300} y={140} width={240} height={20} fill={colors.wood} />
        <path
          d={Array.from(
            { length: 13 },
            (_, k) =>
              `${k ? "L" : "M"} ${420 + (k % 2 ? 40 : -40) * (k > 0 && k < 12 ? 1 : 0)} ${160 + ((massY - 60 - 160) * k) / 12}`,
          ).join(" ")}
          fill="none"
          stroke={colors.paper}
          strokeWidth={5}
        />
        <rect
          x={360}
          y={massY - 60}
          width={120}
          height={120}
          rx={14}
          fill={colors.orange}
          stroke={colors.ink}
          strokeWidth={4}
        />
        <line
          x1={280}
          y1={470}
          x2={560}
          y2={470}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
          strokeDasharray="10 8"
        />
        {/* the graph */}
        <line
          x1={X0}
          y1={Y0}
          x2={plot(T + 0.3, 0).x}
          y2={Y0}
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={3}
        />
        <line
          x1={X0}
          y1={plot(0, -1).y}
          x2={X0}
          y2={plot(0, 1.2).y}
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={3}
        />
        <path
          d={curve(under, 0, Math.max(0.01, d1 * T), plot)}
          fill="none"
          stroke={alpha(colors.highlight, frame > c1 ? 0.4 : 1)}
          strokeWidth={6}
        />
        <path
          d={curve(over, 0, Math.max(0.01, d2 * T), plot)}
          fill="none"
          stroke={alpha(colors.green, frame > c1 ? 0.4 : 1)}
          strokeWidth={6}
          opacity={d2 > 0 ? 1 : 0}
        />
        <path
          d={curve(critical, 0, Math.max(0.01, d3 * T), plot)}
          fill="none"
          stroke={colors.primary}
          strokeWidth={9}
          opacity={d3 > 0 ? 1 : 0}
        />
        {[
          { t: tx.under, c: colors.highlight, at: c0 + 30, y: 200 },
          { t: tx.over, c: colors.green, at: c0 + 100, y: 260 },
          { t: tx.critical, c: colors.primary, at: c1 + 40, y: 320 },
        ].map((l) => (
          <text
            key={l.t}
            x={1500}
            y={l.y}
            fill={l.c}
            fontSize={44}
            fontWeight={800}
            opacity={fadeIn(frame, l.at)}
          >
            {l.t}
          </text>
        ))}
        {/* two eigenvalues merging into one */}
        <g opacity={fadeIn(frame, c1 + 4, 8)} transform="translate(1100 760)">
          <line
            x1={-200}
            y1={0}
            x2={200}
            y2={0}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {[-1, 1].map((s) => (
            <circle
              key={s}
              cx={s * 120 * (1 - merge)}
              cy={0}
              r={16}
              fill={colors.orange}
            />
          ))}
          <text
            x={240}
            y={14}
            fill={colors.orange}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λ
          </text>
        </g>
        <text
          x={plot(2.2, critical(2.2)).x + 30}
          y={plot(2.2, critical(2.2)).y - 30}
          fill={colors.primary}
          fontSize={56}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c1 + 80)}
        >
          t · e
          <tspan dy={-24} fontSize={36}>
            −t
          </tspan>
        </text>
      </svg>
    </SceneShell>
  );
};
