import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The impossible trisection. A compass draws a circle and a line meets
// it: each new point solves a degree-1 or degree-2 equation (c0). A
// staircase of floors with ×2 on every step: degrees 1, 2, 4, 8, 16 (c1).
// The 60° angle with the 20° ray dashed, and cos 20°'s cubic (c2). 3 set
// against 1, 2, 4, 8, 16, struck out each time (c3). Chip: Season 1's
// miracles, Season 2's dimensions (c4).

export const Construct: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("construct");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const partB = fadeIn(frame, c2 + 4, 10);
  const sweep = progress(frame, c0 + 10, 40);
  const steps = Math.min(5, Math.max(0, Math.floor((frame - c1 - 6) / 12) + 1));

  return (
    <SceneShell id="construct">
      <Sfx name="scratch" at={c0 + 10} volume={0.12} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={i} name="pop" at={c1 + 6 + i * 12} volume={0.08} />
      ))}
      <Sfx name="pluck3" at={c2 + 8} volume={0.12} />
      <Sfx name="thud" at={c3 + 30} volume={0.18} />
      <Sfx name="chime" at={c4 + 20} volume={0.28} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <path
            d={Array.from({ length: 61 }, (_, i) => {
              const a = 2 * Math.PI * sweep * (i / 60);
              return `${i ? "L" : "M"} ${520 + 200 * Math.cos(a)} ${480 - 200 * Math.sin(a)}`;
            }).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <line
            x1={240}
            y1={600}
            x2={840}
            y2={360}
            stroke={colors.orange}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 40, 8)}
          />
          <circle cx={520} cy={480} r={8} fill={colors.paper} />
          {steps > 0 &&
            Array.from({ length: steps }, (_, k) => (
              <g key={k}>
                <rect
                  x={1100}
                  y={720 - k * 110}
                  width={460}
                  height={90}
                  rx={14}
                  fill={alpha(colors.violet, 0.3 + k * 0.1)}
                  stroke={colors.highlight}
                  strokeWidth={3}
                />
                <text
                  x={1330}
                  y={778 - k * 110}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={42}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {2 ** k}
                </text>
                {k > 0 && (
                  <text
                    x={1590}
                    y={800 - k * 110}
                    fill={colors.orange}
                    fontSize={34}
                    fontFamily={fonts.mono}
                    fontWeight={800}
                  >
                    ×2
                  </text>
                )}
              </g>
            ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          [K<sub style={{ fontSize: 30 }}>i+1</sub> : K
          <sub style={{ fontSize: 30 }}>i</sub>] ∈ {"{"}1, 2{"}"}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={300}
            y1={640}
            x2={900}
            y2={640}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <line
            x1={300}
            y1={640}
            x2={300 + 600 * Math.cos(Math.PI / 3)}
            y2={640 - 600 * Math.sin(Math.PI / 3)}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <line
            x1={300}
            y1={640}
            x2={300 + 600 * Math.cos(Math.PI / 9)}
            y2={640 - 600 * Math.sin(Math.PI / 9)}
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <text
            x={440}
            y={600}
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            60°
          </text>
          <text
            x={820}
            y={410}
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            20°?
          </text>
          <g opacity={fadeIn(frame, c3 + 6, 8)}>
            {[1, 2, 4, 8, 16].map((d, i) => (
              <g key={d}>
                <text
                  x={1080 + i * 130}
                  y={520}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={50}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {d}
                </text>
                <text
                  x={1080 + i * 130}
                  y={600}
                  textAnchor="middle"
                  fill={colors.red}
                  fontSize={40}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  opacity={fadeIn(frame, c3 + 16 + i * 6, 4)}
                >
                  3 ∤
                </text>
              </g>
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          8x³ − 6x − 1 = 0, x = cos 20°
        </div>
        <Chip
          frame={frame}
          at={c3 + 50}
          x={1080}
          y={660}
          color={colors.red}
          size={44}
        >
          {tx.impossible}
        </Chip>
        <Chip
          frame={frame}
          at={c4 + 16}
          x={1080}
          y={300}
          color={colors.primary}
          size={38}
        >
          S1 → S2 · [ℚ(cos 20°) : ℚ] = 3
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
