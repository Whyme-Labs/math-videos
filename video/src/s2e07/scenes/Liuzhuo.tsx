import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Chinese edition only. 刘焯's 皇极历 (600 CE) and equal-interval quadratic
// interpolation. A night sky: the sun's position against a time axis, with
// observations at three equally spaced moments marked as dots. A parabola
// draws through the three dots, and a probe slides between them reading
// off a position nobody observed. Last, the three Lagrange partners fade
// in faintly under the curve: the same three readings, the same basis.

const T = [0, 1, 2];
const pos = (t: number) => 1 + 1.6 * t - 0.35 * t * t;
const plot = (t: number, y: number) => ({ x: 560 + t * 420, y: 700 - y * 170 });

export const Liuzhuo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liuzhuo");
  const [c0, c1, c2] = cues;
  const obs = (k: number) => fadeIn(frame, c0 + 30 + k * 18, 8);
  const draw = ramp(frame, c1 + 10, 40);
  const probeT = lerp(0.2, 1.6, glide(frame, c1 + 60, fps, 60));
  const partners = fadeIn(frame, c2 + 20, 12);
  const L = [
    (x: number) => ((x - 1) * (x - 2)) / 2,
    (x: number) => -x * (x - 2),
    (x: number) => (x * (x - 1)) / 2,
  ];

  return (
    <SceneShell id="liuzhuo">
      {T.map((t, k) => (
        <Sfx key={t} name={PLUCKS[k]} at={c0 + 30 + k * 18} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="ding" at={c1 + 120} />
      <Sfx name="chime" at={c2 + 30} />

      <AbsoluteFill>
        <svg width={1920} height={1080}>
          {/* stars */}
          {Array.from({ length: 40 }).map((_, k) => (
            <circle
              key={k}
              cx={((k * 397) % 1800) + 60}
              cy={((k * 211) % 500) + 100}
              r={2 + (k % 3)}
              fill={alpha(colors.paper, 0.5)}
            />
          ))}
          {/* the time axis */}
          <line
            x1={plot(-0.3, 0).x}
            y1={plot(0, 0).y}
            x2={plot(2.4, 0).x}
            y2={plot(0, 0).y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          {/* the fitted parabola */}
          <path
            d={curve(pos, -0.1, -0.1 + 2.2 * draw, plot)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={7}
            opacity={draw > 0 ? 1 : 0}
          />
          {/* the three partners, faintly */}
          <g opacity={partners * 0.8}>
            {L.map((f, k) => (
              <path
                key={k}
                d={curve((t) => f(t) * pos(k), -0.1, 2.1, plot)}
                fill="none"
                stroke={[colors.orange, colors.highlight, colors.green][k]}
                strokeWidth={4}
                strokeDasharray="10 8"
              />
            ))}
          </g>
          {/* the observations: the sun at three equally spaced times */}
          {T.map((t, k) => (
            <g key={t} opacity={obs(k)}>
              <line
                x1={plot(t, 0).x}
                y1={plot(0, 0).y}
                x2={plot(t, 0).x}
                y2={plot(t, pos(t)).y}
                stroke={alpha(colors.orange, 0.6)}
                strokeWidth={4}
                strokeDasharray="8 8"
              />
              <circle
                cx={plot(t, pos(t)).x}
                cy={plot(t, pos(t)).y}
                r={26}
                fill={colors.orange}
              />
              <text
                x={plot(t, pos(t)).x}
                y={plot(t, pos(t)).y + 12}
                fill={colors.ink}
                fontSize={32}
                textAnchor="middle"
                fontWeight={900}
              >
                {tx.sun}
              </text>
            </g>
          ))}
          {/* the probe between observations */}
          <g opacity={fadeIn(frame, c1 + 56, 8)}>
            <line
              x1={plot(probeT, 0).x}
              y1={plot(0, 0).y}
              x2={plot(probeT, 0).x}
              y2={plot(probeT, pos(probeT)).y}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <circle
              cx={plot(probeT, pos(probeT)).x}
              cy={plot(probeT, pos(probeT)).y}
              r={16}
              fill={colors.primary}
            />
            <text
              x={plot(probeT, pos(probeT)).x + 30}
              y={plot(probeT, pos(probeT)).y - 26}
              fill={colors.primary}
              fontSize={44}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {pos(probeT).toFixed(2)}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.liuzhuo}
      </div>
    </SceneShell>
  );
};
