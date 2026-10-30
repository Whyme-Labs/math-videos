import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The Lagrange basis. Nodes 0, 1, 2. The three partner parabolas draw in
// one at a time, each in its own colour, with a big dot at height 1 over
// its own node and small dots at 0 over the other two. Then the weights
// slide from 1 to 2, 4, 12 while the vertical scale zooms out, and the
// dashed sum assembles into the parabola through (0, 2), (1, 4), (2, 12).

const L = [
  (x: number) => ((x - 1) * (x - 2)) / 2,
  (x: number) => -x * (x - 2),
  (x: number) => (x * (x - 1)) / 2,
];
const W = [2, 4, 12];
const TINT = () => [colors.orange, colors.highlight, colors.green];

export const Lagrange: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lagrange");
  const [c0, c1] = cues;
  const show = (k: number) => fadeIn(frame, c0 + 16 + k * 22, 10);
  const mix = glide(frame, c1 + 20, fps, 60);
  const sumIn = fadeIn(frame, c1 + 40, 12);
  const ys = lerp(260, 36, mix);
  const plot = (x: number, y: number) => ({
    x: 520 + x * 380,
    y: 640 - y * ys,
  });
  const w = W.map((v) => lerp(1, v, mix));
  const tint = TINT();

  return (
    <SceneShell id="lagrange">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={c0 + 16 + k * 22} volume={0.16} />
      ))}
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="chime" at={c1 + 80} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="lagStage">
            <rect x={120} y={90} width={1680} height={740} />
          </clipPath>
        </defs>
        <line
          x1={plot(-0.4, 0).x}
          y1={plot(0, 0).y}
          x2={plot(2.5, 0).x}
          y2={plot(0, 0).y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        {[0, 1, 2].map((n) => (
          <text
            key={n}
            x={plot(n, 0).x}
            y={plot(0, 0).y + 56}
            fill={colors.text}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {n}
          </text>
        ))}
        <g clipPath="url(#lagStage)">
          {L.map((f, k) => (
            <g key={k} opacity={show(k) * (1 - 0.5 * sumIn)}>
              <path
                d={curve((x) => w[k] * f(x), -0.3, 2.2, plot)}
                fill="none"
                stroke={tint[k]}
                strokeWidth={6}
              />
              {[0, 1, 2].map((n) => (
                <circle
                  key={n}
                  cx={plot(n, 0).x}
                  cy={plot(n, w[k] * f(n)).y}
                  r={n === k ? 16 : 10}
                  fill={tint[k]}
                />
              ))}
            </g>
          ))}
          <path
            d={curve(
              (x) => L.reduce((s, f, k) => s + w[k] * f(x), 0),
              -0.3,
              2.2,
              plot,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={9}
            strokeDasharray="18 10"
            opacity={sumIn}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1420,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: fadeIn(frame, c0 + 10),
          translate: riseIn(frame, c0 + 10, 16),
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, color: colors.muted }}>
          {tx.partners}
        </div>
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: show(k),
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 52,
                fontWeight: 800,
                color: colors.primary,
                minWidth: 90,
                textAlign: "right",
              }}
            >
              {Math.round(w[k])}
            </span>
            <span
              style={{
                fontFamily: fonts.math,
                fontSize: 52,
                fontWeight: 800,
                color: tint[k],
              }}
            >
              × L{["₀", "₁", "₂"][k]}
            </span>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
