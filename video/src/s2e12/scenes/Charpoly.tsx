import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The characteristic polynomial. det(A − λ) = λ² − 7λ + 10 drawn over λ;
// a slider λ sweeps from 0 to 7, a readout tracks det(A − λ), and where it
// hits zero (λ = 2, λ = 5) the root dot pops and rings. Then two badges:
// trace 7 = 5 + 2 and det 10 = 5 × 2.

const X0 = 260;
const XS = 140;
const Y0 = 560;
const YS = 36;
const plot = (x: number, y: number) => ({ x: X0 + x * XS, y: Y0 - y * YS });
const p = (l: number) => l * l - 7 * l + 10;

export const Charpoly: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("charpoly");
  const [c0, c1] = cues;
  const sweep = ramp(frame, c0 + 20, 150);
  const l = lerp(0, 7, sweep);
  const draw = curve(p, 0, Math.max(0.01, l), plot);
  const root = (r: number) =>
    Math.min(1, springIn(frame, c0 + 20 + Math.round((r / 7) * 150), fps, 10));
  const badge = (k: number) =>
    Math.min(1, springIn(frame, c1 + 20 + k * 30, fps, 10));

  return (
    <SceneShell id="charpoly">
      <Sfx name="riser" at={c0 + 20} volume={0.1} />
      <Sfx name="ding" at={c0 + 20 + Math.round((2 / 7) * 150)} />
      <Sfx name="ding" at={c0 + 20 + Math.round((5 / 7) * 150)} />
      <Sfx name="pop" at={c1 + 20} volume={0.16} />
      <Sfx name="pop" at={c1 + 50} volume={0.16} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={plot(-0.2, 0).x}
          y1={Y0}
          x2={plot(7.4, 0).x}
          y2={Y0}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
          <text
            key={k}
            x={plot(k, 0).x}
            y={Y0 + 50}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            {k}
          </text>
        ))}
        <path d={draw} fill="none" stroke={colors.orange} strokeWidth={7} />
        <line
          x1={plot(l, 0).x}
          y1={Y0 - 300}
          x2={plot(l, 0).x}
          y2={Y0 + 20}
          stroke={colors.primary}
          strokeWidth={4}
          strokeDasharray="10 8"
          opacity={sweep > 0 && sweep < 1 ? 1 : 0}
        />
        <circle
          cx={plot(l, p(l)).x}
          cy={plot(l, p(l)).y}
          r={14}
          fill={colors.orange}
          opacity={sweep > 0 && sweep < 1 ? 1 : 0}
        />
        {[2, 5].map((r) => (
          <g key={r} opacity={root(r)}>
            <circle
              cx={plot(r, 0).x}
              cy={Y0}
              r={22 * root(r)}
              fill={colors.green}
            />
            <circle
              cx={plot(r, 0).x}
              cy={Y0}
              r={44}
              fill="none"
              stroke={colors.green}
              strokeWidth={4}
              opacity={1 - root(r) * 0.5}
            />
            <text
              x={plot(r, 0).x}
              y={Y0 - 50}
              fill={colors.green}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              λ = {r}
            </text>
          </g>
        ))}
        <text
          x={1360}
          y={220}
          fill={colors.text}
          fontSize={44}
          fontFamily={fonts.math}
          fontWeight={700}
          opacity={fadeIn(frame, c0 + 10)}
        >
          det(A − λ) = {p(l).toFixed(2).replace("-", "−")}
        </text>
      </svg>
      {[
        { t: tx.traceLabel, top: 360 },
        { t: tx.detLabel, top: 480 },
      ].map((b, k) => (
        <div
          key={b.t}
          style={{
            position: "absolute",
            top: b.top,
            left: 1360,
            padding: "10px 24px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 44,
            fontWeight: 800,
            color: colors.green,
            opacity: badge(k),
            translate: riseIn(frame, c1 + 20 + k * 30, 12),
          }}
        >
          {b.t}
        </div>
      ))}
    </SceneShell>
  );
};
