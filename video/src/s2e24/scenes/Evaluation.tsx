import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Is "the value at a" continuous? Three panels, each with a probe at a
// (c0). Peak norm: the band ±‖f‖∞ hugs the curve and the probe stays
// inside it, |f(a)| ≤ ‖f‖∞, tick (c1). Area norm: a tent at a narrows,
// its area readout falls while f(a) stays 1, cross (c2). L¹: the curve
// is changed at the single point a, the dot jumps up and down while the
// area under it doesn't move, "not defined" (c3).

const W = 500;
const H = 360;
const TOP = 250;
const LEFT = [120, 710, 1300];
const f = (x: number) => 0.5 + 0.25 * Math.sin(5 * x + 1) + 0.1 * x;
const A = 0.45;
const AREA =
  Array.from({ length: 400 }, (_, k) => f((k + 0.5) / 400)).reduce(
    (a, b) => a + b,
    0,
  ) / 400;

const Panel: React.FC<{
  i: number;
  head: string;
  show: number;
  children: React.ReactNode;
}> = ({ i, head, show, children }) => (
  <g transform={`translate(${LEFT[i]} ${TOP})`} opacity={show}>
    <rect
      x={-20}
      y={-90}
      width={W + 40}
      height={H + 150}
      rx={24}
      fill={alpha(colors.paper, 0.05)}
      stroke={alpha(colors.paper, 0.25)}
      strokeWidth={3}
    />
    <text
      x={W / 2}
      y={-40}
      textAnchor="middle"
      fill={colors.muted}
      fontSize={40}
      fontFamily={fonts.body}
      fontWeight={700}
    >
      {head}
    </text>
    <line
      x1={0}
      y1={H}
      x2={W}
      y2={H}
      stroke={alpha(colors.paper, 0.5)}
      strokeWidth={3}
    />
    {children}
  </g>
);

const curve = (g: (x: number) => number) =>
  Array.from(
    { length: 121 },
    (_, k) => `${k ? "L" : "M"} ${(W * k) / 120} ${H - H * g(k / 120)}`,
  ).join(" ");

export const Evaluation: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("evaluation");
  const [c0, c1, c2, c3] = cues;
  const ax = W * A;

  // Panel 1: the peak band
  const peak = Math.max(...Array.from({ length: 121 }, (_, k) => f(k / 120)));
  const band = glide(frame, c1 + 6, fps, 30);
  const bandY = H - H * lerp(1.05, peak, band);

  // Panel 2: a tent at a, narrowing
  const narrow = glide(frame, c2 + 10, fps, 80);
  const tw = lerp(0.2, 0.01, narrow);
  const shk = shake(frame, c2 + 90, 10);

  // Panel 3: change f at a single point
  const jump = frame >= c3 + 10 ? Math.sin((frame - c3 - 10) * 0.12) : 0;
  const fa3 = f(A) + 0.35 * jump;

  return (
    <SceneShell id="evaluation">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 8} volume={0.12} />
      ))}
      <Sfx name="ding" at={c1 + 40} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.1} />
      <Sfx name="thud" at={c2 + 90} volume={0.22} />
      <Sfx name="scratch" at={c3 + 10} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Panel i={0} head={tx.peak} show={fadeIn(frame, c0 + 6, 8)}>
          <rect
            x={0}
            y={bandY}
            width={W}
            height={H - bandY}
            fill={alpha(colors.green, 0.12 * band)}
          />
          <line
            x1={0}
            y1={bandY}
            x2={W}
            y2={bandY}
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 8"
            opacity={band}
          />
          <path
            d={curve(f)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <line
            x1={ax}
            y1={H}
            x2={ax}
            y2={H - H * f(A)}
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="8 6"
          />
          <circle cx={ax} cy={H - H * f(A)} r={13} fill={colors.highlight} />
          <text
            x={W - 10}
            y={bandY - 14}
            textAnchor="end"
            fill={colors.green}
            fontSize={34}
            fontFamily={fonts.math}
            opacity={band}
          >
            ‖f‖∞
          </text>
        </Panel>
        <Panel i={1} head={tx.areaNorm} show={fadeIn(frame, c0 + 14, 8)}>
          <g transform={`translate(${shk} 0)`}>
            <path
              d={`M ${ax - W * tw} ${H} L ${ax} ${H - H * 0.8} L ${ax + W * tw} ${H} Z`}
              fill={alpha(colors.primary, 0.3)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <circle
              cx={ax}
              cy={H - H * 0.8}
              r={13}
              fill={frame >= c2 + 90 ? colors.red : colors.highlight}
            />
          </g>
        </Panel>
        <Panel i={2} head="L¹" show={fadeIn(frame, c0 + 22, 8)}>
          <path
            d={`${curve(f)} L ${W} ${H} L 0 ${H} Z`}
            fill={alpha(colors.orange, 0.2 * fadeIn(frame, c3 + 4, 8))}
          />
          <path
            d={curve(f)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <circle
            cx={ax}
            cy={H - H * f(A)}
            r={9}
            fill={colors.bg}
            stroke={colors.primary}
            strokeWidth={4}
            opacity={fadeIn(frame, c3 + 10, 4)}
          />
          <circle cx={ax} cy={H - H * fa3} r={13} fill={colors.highlight} />
        </Panel>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 690,
          left: LEFT[0],
          width: W,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 42,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 30),
          translate: riseIn(frame, c1 + 30),
          whiteSpace: "nowrap",
        }}
      >
        |f(a)| ≤ ‖f‖∞ ✓
      </div>
      <div
        style={{
          position: "absolute",
          top: 690,
          left: LEFT[1],
          width: W,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 30,
          fontWeight: 800,
          color: frame >= c2 + 90 ? colors.red : colors.text,
          opacity: fadeIn(frame, c2 + 10),
          whiteSpace: "nowrap",
        }}
      >
        ∫ = {(tw * 0.8).toFixed(3)} · f(a) = 0.80 {frame >= c2 + 90 ? "✗" : ""}
      </div>
      <div
        style={{
          position: "absolute",
          top: 690,
          left: LEFT[2],
          width: W,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 30,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 10),
          whiteSpace: "nowrap",
        }}
      >
        ∫ = {AREA.toFixed(2)} · f(a) ={" "}
        <span style={{ color: colors.highlight }}>{fa3.toFixed(2)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 750,
          left: LEFT[2],
          width: W,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c3 + 40),
          translate: riseIn(frame, c3 + 40),
          whiteSpace: "nowrap",
        }}
      >
        f(a): {tx.undefined}
      </div>
    </SceneShell>
  );
};
