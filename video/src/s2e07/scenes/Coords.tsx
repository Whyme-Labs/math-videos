import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Probes as coordinates. The parabola p(x) = 2 − x + 3x² stays fixed.
// Three pin probes drop onto it at x = 0, 1, 2 and their readings fill a
// column: (2, 4, 12). Then the probes slide together to x = 0 and turn into
// a pin, a tangent gauge and a curvature arc, and the column re-reads
// (2, −1, 3), while the curve itself never moves.

const plot = (x: number, y: number) => ({ x: 420 + x * 330, y: 720 - y * 36 });
const p = (x: number) => 2 - x + 3 * x * x;

export const Coords: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coords");
  const [c0, c1] = cues;
  const drop = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 16, fps, 10));
  const swap = glide(frame, c1 + 20, fps, 30);
  const gauges = fadeIn(frame, c1 + 50, 10);
  const nodes = [0, 1, 2];
  const vals = [
    ["2", "4", "12"],
    ["2", "−1", "3"],
  ];

  return (
    <SceneShell id="coords">
      {nodes.map((n, k) => (
        <Sfx key={n} name={PLUCKS[k]} at={c0 + 20 + k * 16} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="ding" at={c1 + 56} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={plot(-0.5, 0).x}
          y1={plot(0, 0).y}
          x2={plot(2.4, 0).x}
          y2={plot(0, 0).y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        <line
          x1={plot(0, 0).x}
          y1={plot(0, -0.5).y}
          x2={plot(0, 0).x}
          y2={plot(0, 15).y}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <path
          d={curve(p, -0.4, 2.22, plot)}
          fill="none"
          stroke={colors.primary}
          strokeWidth={8}
        />
        {/* the value probes, sliding to 0 */}
        {nodes.map((n, k) => {
          const x = lerp(n, 0, swap);
          const pt = plot(x, p(x));
          const d = drop(k);
          return (
            <g key={n} opacity={d * (k === 0 ? 1 : 1 - swap)}>
              <line
                x1={pt.x}
                y1={pt.y - lerp(260, 120, d)}
                x2={pt.x}
                y2={pt.y}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <circle cx={pt.x} cy={pt.y} r={16} fill={colors.orange} />
              <text
                x={pt.x}
                y={plot(0, 0).y + 54}
                fill={colors.orange}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={1 - swap}
              >
                {n}
              </text>
            </g>
          );
        })}
        {/* the Taylor probes at 0: tangent gauge and curvature arc */}
        <g opacity={gauges}>
          <line
            x1={plot(-0.45, p(0) + 0.45).x}
            y1={plot(-0.45, p(0) + 0.45).y}
            x2={plot(0.6, p(0) - 0.6).x}
            y2={plot(0.6, p(0) - 0.6).y}
            stroke={colors.orange}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d={curve((x) => p(x) + 0.6, -0.25, 0.4, plot, 30)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={7}
            strokeDasharray="10 8"
          />
        </g>
      </svg>
      {/* the coordinates column */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 1360,
          width: 420,
          textAlign: "center",
          opacity: fadeIn(frame, c0 + 20),
          translate: riseIn(frame, c0 + 20, 16),
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: colors.orange,
            minHeight: 100,
          }}
        >
          {swap > 0.5 ? tx.taylorProbes : tx.valueProbes}
        </div>
        <div
          style={{
            margin: "20px auto 0",
            width: 200,
            borderLeft: `6px solid ${colors.orange}`,
            borderRight: `6px solid ${colors.orange}`,
            padding: "10px 0",
          }}
        >
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              style={{
                fontFamily: fonts.mono,
                fontSize: 72,
                fontWeight: 800,
                color: colors.primary,
                opacity: drop(k),
              }}
            >
              {vals[swap > 0.5 ? 1 : 0][k]}
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
