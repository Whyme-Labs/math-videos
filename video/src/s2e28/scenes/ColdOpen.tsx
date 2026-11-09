import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// The closest-point puzzle. A point above a slanted line (c0); the
// perpendicular drops and a right-angle mark appears (c1). A space with a
// hole: arrows from the point to c₁, c₂, … get shorter while their ends
// close in on a hollow dot that isn't there (c2). Three cards: a sound
// clip, a temperature curve, a wave packet (c3), labelled (c4). x² on
// [0, 1] with lines a + bx sweeping across it (c5), settling on x − 1/6
// with the gap shaded (c6). Chip: angles + completeness = Hilbert (c7).

const A: Pt = [300, 620];
const B: Pt = [900, 420];
const X: Pt = [520, 260];
const foot = (() => {
  const d = [B[0] - A[0], B[1] - A[1]];
  const t =
    ((X[0] - A[0]) * d[0] + (X[1] - A[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2);
  return [A[0] + t * d[0], A[1] + t * d[1]] as Pt;
})();
const HOLE: Pt = [1460, 560];
const PX = 300;
const PW = 760;
const PY = 760;
const PH = 520;
const px = (x: number) => PX + PW * x;
const py = (y: number) => PY - PH * y;

const Card: React.FC<{
  x: number;
  at: number;
  frame: number;
  label: string;
  g: (t: number) => number;
}> = ({ x, at, frame, label, g }) => (
  <div
    style={{
      position: "absolute",
      top: 300,
      left: x,
      width: 440,
      height: 300,
      borderRadius: 20,
      background: alpha(colors.paper, 0.06),
      border: `3px solid ${alpha(colors.paper, 0.3)}`,
      opacity: fadeIn(frame, at),
      translate: riseIn(frame, at),
    }}
  >
    <svg width={440} height={300}>
      <path
        d={Array.from(
          { length: 201 },
          (_, i) => `${i ? "L" : "M"} ${20 + 2 * i} ${150 - 100 * g(i / 200)}`,
        ).join(" ")}
        fill="none"
        stroke={colors.primary}
        strokeWidth={4}
      />
    </svg>
    <div
      style={{
        position: "absolute",
        bottom: -60,
        width: 440,
        textAlign: "center",
        fontSize: 38,
        fontWeight: 700,
        color: colors.text,
      }}
    >
      {label}
    </div>
  </div>
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  const drop = glide(frame, c1 + 6, fps, 20);
  const k = Math.min(8, Math.max(0, Math.floor((frame - c2 - 6) / 10)));
  const sweep = frame < c6 ? Math.sin((frame - c5) * 0.06) : 0;
  const settle = glide(frame, c6 + 6, fps, 24);
  const a = lerp(-1 / 6 + 0.25 * sweep, -1 / 6, frame < c6 ? 0 : settle);
  const b = lerp(1 + 0.5 * sweep, 1, frame < c6 ? 0 : settle);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="ding" at={c1 + 26} volume={0.18} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 10} volume={0.06} />
      ))}
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c3 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c5 + 6} volume={0.1} />
      <Sfx name="ding" at={c6 + 30} volume={0.2} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={A[0] - 100}
            y1={A[1] + 33}
            x2={B[0] + 100}
            y2={B[1] - 33}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <circle cx={X[0]} cy={X[1]} r={14} fill={colors.highlight} />
          <line
            x1={X[0]}
            y1={X[1]}
            x2={lerp(X[0], foot[0], drop)}
            y2={lerp(X[1], foot[1], drop)}
            stroke={colors.red}
            strokeWidth={5}
          />
          <circle
            cx={foot[0]}
            cy={foot[1]}
            r={10}
            fill={colors.green}
            opacity={drop}
          />
          <g
            opacity={fadeIn(frame, c1 + 24, 6)}
            transform={`translate(${foot[0]} ${foot[1]}) rotate(${(Math.atan2(B[1] - A[1], B[0] - A[0]) * 180) / Math.PI})`}
          >
            <path
              d="M 24 0 L 24 -24 L 0 -24"
              fill="none"
              stroke={colors.paper}
              strokeWidth={4}
            />
          </g>
          <g opacity={fadeIn(frame, c2 + 4, 8)}>
            <path
              d="M 1150 680 Q 1460 520 1760 680"
              fill="none"
              stroke={alpha(colors.paper, 0.6)}
              strokeWidth={5}
              strokeDasharray="10 8"
            />
            <circle cx={1460} cy={300} r={14} fill={colors.highlight} />
            {Array.from({ length: k }, (_, i) => {
              const s = (i % 2 ? 1 : -1) * 220 * 0.6 ** i;
              const pt: Pt = [HOLE[0] + s, HOLE[1] + Math.abs(s) * 0.45];
              return (
                <line
                  key={i}
                  x1={1460}
                  y1={300}
                  x2={pt[0]}
                  y2={pt[1]}
                  stroke={alpha(colors.orange, 0.4 + 0.07 * i)}
                  strokeWidth={4}
                />
              );
            })}
            <circle
              cx={HOLE[0]}
              cy={HOLE[1]}
              r={14}
              fill={colors.bg}
              stroke={colors.red}
              strokeWidth={5}
              opacity={fadeIn(frame, c2 + 60, 6)}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 760,
            left: 1260,
            width: 400,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c2 + 60),
          }}
        >
          {tx.noClosest}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <Card
          x={160}
          at={c3 + 6}
          frame={frame}
          label={tx.sound}
          g={(t) => 0.8 * Math.sin(60 * t) * Math.sin(3 * t) * Math.exp(-t)}
        />
        <Card
          x={740}
          at={c3 + 16}
          frame={frame}
          label={tx.temperature}
          g={(t) =>
            0.5 * Math.sin(2 * Math.PI * t - 1.5) + 0.15 * Math.sin(20 * t)
          }
        />
        <Card
          x={1320}
          at={c3 + 26}
          frame={frame}
          label={tx.wave}
          g={(t) => Math.exp(-(((t - 0.5) / 0.15) ** 2)) * Math.cos(50 * t)}
        />
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c4 + 6),
          }}
        >
          L²[0, 1] : ∫ |f|² &lt; ∞
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="co28-plot">
              <rect
                x={PX - 10}
                y={py(1.1)}
                width={PW + 20}
                height={PH * 1.1 + 40}
              />
            </clipPath>
          </defs>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={PX}
            y1={PY}
            x2={PX}
            y2={py(1.05)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={`${poly(Array.from({ length: 101 }, (_, i) => [px(i / 100), py((i / 100) ** 2)] as Pt))} ${poly(Array.from({ length: 101 }, (_, i) => [px(1 - i / 100), py(a + b * (1 - i / 100))] as Pt)).replace("M", "L")} Z`}
            fill={alpha(colors.red, 0.25 * fadeIn(frame, c6 + 30, 8))}
          />
          <path
            d={poly(
              Array.from(
                { length: 101 },
                (_, i) => [px(i / 100), py((i / 100) ** 2)] as Pt,
              ),
            )}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <line
            clipPath="url(#co28-plot)"
            x1={px(0)}
            y1={py(a)}
            x2={px(1)}
            y2={py(a + b)}
            stroke={colors.primary}
            strokeWidth={6}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1160,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: colors.highlight }}>f(x) = x²</div>
          <div style={{ color: colors.primary }}>
            a + b·x ={" "}
            <span style={{ fontFamily: fonts.mono }}>
              {a.toFixed(2)} + {b.toFixed(2)}x
            </span>
          </div>
          <div style={{ color: colors.red, opacity: fadeIn(frame, c6 + 30) }}>
            ? ⟂
          </div>
        </div>
        <Chip
          frame={frame}
          at={c7 + 6}
          x={1100}
          y={460}
          color={colors.green}
          size={44}
        >
          {tx.hilbert}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
