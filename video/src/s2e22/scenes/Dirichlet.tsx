import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { FRACTIONS } from "../components/line";
import { useStrings } from "../i18n";

// Riemann against Dirichlet. f = x² cut into vertical strips (c0).
// Dirichlet's function: a dense row of dots at height 1 over the
// fractions and at 0 over the rest (c1). Strips again, 4, 8, 16, 32: every
// strip's top box is height 1 and its bottom box 0; the upper and lower
// sums read 1 and 0 at every size (c2). Spikes at the first n fractions,
// n growing, each function with integral 0, heading to Dirichlet's
// function (c3). A chip: Riemann can't take limits (c4).

const PX = 180;
const PW = 960;
const PY = 720;
const PH = 420;
const sx = (x: number) => PX + PW * x;

export const Dirichlet: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("dirichlet");
  const [c0, c1, c2, c3, c4] = cues;
  const part0 = fadeOut(frame, c1, 10);
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const ns = [4, 8, 16, 32];
  const ni = Math.min(3, Math.floor(Math.max(0, frame - c2 - 6) / 26));
  const strips = frame < c2 + 6 ? 0 : ns[ni];
  const k = Math.min(
    FRACTIONS.length,
    Math.floor(Math.max(0, frame - c3 - 6) * 1.2),
  );

  return (
    <SceneShell id="dirichlet">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 6} volume={0.25} />
      {ns.map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 26} volume={0.12} />
      ))}
      <Sfx name="riser" at={c3 + 6} volume={0.08} />
      <Sfx name="thud" at={c4 + 6} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={PX}
          y1={PY}
          x2={PX + PW}
          y2={PY}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <g opacity={part0}>
          {Array.from({ length: 10 }).map((_, i) => {
            const x = (i + 0.5) / 10;
            return (
              <rect
                key={i}
                x={sx(i / 10) + 2}
                y={PY - PH * x * x}
                width={PW / 10 - 4}
                height={PH * x * x}
                fill={alpha(colors.primary, 0.3)}
                stroke={colors.primary}
                strokeWidth={2}
              />
            );
          })}
          <path
            d={Array.from(
              { length: 101 },
              (_, i) =>
                `${i ? "L" : "M"} ${sx(i / 100)} ${PY - PH * (i / 100) ** 2}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
        </g>
        <g opacity={part1}>
          {Array.from({ length: strips }).map((_, i) => (
            <g key={i}>
              <rect
                x={sx(i / strips) + 1}
                y={PY - PH}
                width={PW / strips - 2}
                height={PH}
                fill={alpha(colors.orange, 0.18)}
                stroke={colors.orange}
                strokeWidth={2}
              />
            </g>
          ))}
          {FRACTIONS.slice(0, 300).map((f) => (
            <circle
              key={`${f.p}/${f.q}`}
              cx={sx(f.p / f.q)}
              cy={PY - PH}
              r={3.5}
              fill={colors.highlight}
            />
          ))}
          {Array.from({ length: 300 }).map((_, i) => (
            <circle
              key={i}
              cx={sx((i * 0.6180339887) % 1)}
              cy={PY}
              r={3.5}
              fill={colors.text}
            />
          ))}
        </g>
        <g opacity={part2}>
          {FRACTIONS.slice(0, k).map((f) => (
            <line
              key={`${f.p}/${f.q}`}
              x1={sx(f.p / f.q)}
              y1={PY}
              x2={sx(f.p / f.q)}
              y2={PY - PH}
              stroke={alpha(colors.highlight, 0.8)}
              strokeWidth={2}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 180,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.highlight,
          opacity: part1,
          whiteSpace: "nowrap",
        }}
      >
        1<sub style={{ fontSize: 32 }}>ℚ</sub>(x)
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1260,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          fontSize: 48,
          fontWeight: 800,
          opacity: part1 * fadeIn(frame, c2 + 6),
        }}
      >
        <div style={{ color: colors.orange }}>
          {tx.upper} <span style={{ fontFamily: fonts.mono }}>1</span>
        </div>
        <div style={{ color: colors.text }}>
          {tx.lower} <span style={{ fontFamily: fonts.mono }}>0</span>
        </div>
        <div style={{ fontFamily: fonts.mono, color: colors.muted }}>
          n = {strips}
        </div>
      </div>
      <AbsoluteFill style={{ opacity: part2 }}>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 180,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ∫ fₙ = 0{" "}
          <span
            style={{
              fontFamily: fonts.mono,
              color: colors.muted,
              marginLeft: 24,
            }}
          >
            n = {k}
          </span>
          <span style={{ color: colors.highlight, marginLeft: 24 }}>
            → 1<sub style={{ fontSize: 32 }}>ℚ</sub>
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1260,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.red}`,
            background: alpha(colors.bg, 0.85),
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 6),
            translate: riseIn(frame, c4 + 6, 12),
            whiteSpace: "nowrap",
          }}
        >
          ∫ 1<sub style={{ fontSize: 30 }}>ℚ</sub> = ?
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
