import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story, worked on screen. Göttingen, 1908: Schmidt at a blackboard
// where two function curves add up into a third (functions are arrows).
// Then "are 1 and x perpendicular?", answered three ways, with an angle
// inset on the right that swings to each answer and a card per answer:
// 1. coefficients: 1 = (1, 0) and x = (0, 1) on the axes, 90°;
// 2. overlap on [−1, 1]: the graphs of 1 and x, and the product's area
//    swept out left to right in red then green, a running total going
//    −½ and back to 0: 90°;
// 3. overlap on [0, 1]: the sweep starts at 0, nothing cancels, the total
//    climbs to ½, and the inset swings to 30° (cos θ = ½ / √(1·⅓)).
// Then the three cards shake against each other, and fade to a "?".

const G = { x: 600, y: 440, sx: 330, sy: 200 };
const gp = (x: number, y: number) => ({ x: G.x + x * G.sx, y: G.y - y * G.sy });
const CARDS = [
  { label: "coeffs", deg: 90 },
  { label: "∫₋₁¹", deg: 90 },
  { label: "∫₀¹", deg: 30 },
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7, c8] = cues;

  // part A: the blackboard, curves adding
  const partA = fadeOut(frame, c1, 10);
  const add = glide(frame, c0 + 50, fps, 40);
  const f = (x: number) => 0.45 * Math.sin(2.4 * x);
  const g = (x: number) => 0.35 * x;
  const curve = (h: (x: number) => number) =>
    Array.from({ length: 81 }, (_, i) => {
      const x = -1.5 + (i / 80) * 3;
      return `${i ? "L" : "M"} ${(960 + x * 300).toFixed(1)} ${(360 - h(x) * 260).toFixed(1)}`;
    }).join(" ");

  // part B: coefficients (c2), then the graphs (c3 on)
  const coeff = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const graphs = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c8, 12);
  const onHalf = frame >= c5; // [0, 1] instead of [−1, 1]
  const sweepA = ramp(frame, c3 + 30, 90);
  const sweepB = ramp(frame, c5 + 20, 70);
  const lo = onHalf ? 0 : -1;
  const xs = onHalf ? sweepB : lerp(-1, 1, sweepA);
  const total = onHalf ? (xs * xs) / 2 : (xs * xs - 1) / 2;
  const area = (from: number, to: number) => {
    if (to <= from) return "";
    const pts = Array.from({ length: 31 }, (_, i) => {
      const x = from + ((to - from) * i) / 30;
      return gp(x, x);
    });
    const a = gp(from, 0);
    const b = gp(to, 0);
    return `M ${a.x} ${a.y} ${pts.map((p) => `L ${p.x} ${p.y}`).join(" ")} L ${b.x} ${b.y} Z`;
  };

  // the angle inset: 90 for the first two answers, 30 for the third
  const toThirty = glide(frame, c6 + 10, fps, 30);
  const ang = lerp(90, 30, toThirty);
  const I = { x: 1180, y: 600 };
  const a = (ang * Math.PI) / 180;
  const cardAt = [c2 + 30, c4 + 10, c6 + 30];
  const card = (k: number) => Math.min(1, springIn(frame, cardAt[k], fps, 10));
  const fight = shake(frame, c7 + 6, 16);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="riser" at={c0 + 50} volume={0.08} />
      <Sfx name="pop" at={c2 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 30} volume={0.1} />
      <Sfx name="pop" at={c4 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c5 + 20} volume={0.1} />
      <Sfx name="thud" at={c6 + 30} volume={0.24} />
      <Sfx name="scratch" at={c7 + 6} volume={0.2} />
      <Sfx name="whoosh" at={c8 + 4} volume={0.1} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <rect
            x={420}
            y={130}
            width={1080}
            height={480}
            rx={14}
            fill={alpha(colors.ink, 0.92)}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <path
            d={curve(f)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            opacity={fadeIn(frame, c0 + 14)}
          />
          <path
            d={curve(g)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={fadeIn(frame, c0 + 24)}
          />
          <path
            d={curve((x) => f(x) + add * g(x))}
            fill="none"
            stroke={colors.primary}
            strokeWidth={8}
            opacity={fadeIn(frame, c0 + 50)}
          />
          <text
            x={1440}
            y={200}
            fill={colors.paper}
            fontSize={60}
            textAnchor="end"
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 50)}
          >
            f + g
          </text>
          <Person
            x={1680}
            y={820}
            color={colors.highlight}
            size={1.7}
            facing={-1}
            glasses
          />
          <text
            x={1680}
            y={560}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.schmidt}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.gottingen}
        </div>
      </AbsoluteFill>

      {/* the question */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          width: 1240,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 84,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 4) * fadeOut(frame, c8, 10),
          translate: riseIn(frame, c1 + 4, 16),
        }}
      >
        1 <span style={{ color: colors.highlight }}>⟂</span> x{" "}
        <span style={{ color: colors.highlight }}>?</span>
      </div>

      {/* answer 1: coefficients */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", opacity: coeff }}
      >
        <line
          x1={300}
          y1={600}
          x2={1000}
          y2={600}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <line
          x1={600}
          y1={250}
          x2={600}
          y2={760}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <Arrow from={{ x: 600, y: 600 }} to={{ x: 860, y: 600 }} width={14} />
        <Arrow
          from={{ x: 600, y: 600 }}
          to={{ x: 600, y: 340 }}
          width={14}
          color={colors.highlight}
        />
        <text
          x={880}
          y={650}
          fill={colors.primary}
          fontSize={50}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          1 = (1, 0)
        </text>
        <text
          x={630}
          y={330}
          fill={colors.highlight}
          fontSize={50}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          x = (0, 1)
        </text>
        <path
          d="M 640 600 L 640 560 L 600 560"
          fill="none"
          stroke={colors.green}
          strokeWidth={6}
        />
      </svg>

      {/* answers 2 and 3: the graphs and the swept overlap */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", opacity: graphs }}
      >
        <line
          x1={gp(-1.25, 0).x}
          y1={G.y}
          x2={gp(1.25, 0).x}
          y2={G.y}
          stroke={alpha(colors.paper, 0.45)}
          strokeWidth={3}
        />
        <line
          x1={G.x}
          y1={gp(0, -1.2).y}
          x2={G.x}
          y2={gp(0, 1.4).y}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        {[-1, 1].map((k) => (
          <text
            key={k}
            x={gp(k, 0).x}
            y={G.y + 44}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            {k < 0 ? "−1" : "1"}
          </text>
        ))}
        {/* the interval being used */}
        <rect
          x={gp(onHalf ? 0 : -1, 0).x}
          y={gp(0, 1.35).y}
          width={(onHalf ? 1 : 2) * G.sx}
          height={2.55 * G.sy}
          fill={alpha(colors.primary, 0.05)}
        />
        <path d={area(lo, Math.min(xs, 0))} fill={alpha(colors.red, 0.55)} />
        <path
          d={area(Math.max(lo, 0), Math.max(xs, 0))}
          fill={alpha(colors.green, 0.55)}
        />
        <line
          x1={gp(-1.2, 1).x}
          y1={gp(0, 1).y}
          x2={gp(1.2, 1).x}
          y2={gp(0, 1).y}
          stroke={colors.primary}
          strokeWidth={6}
        />
        <line
          x1={gp(-1.2, -1.2).x}
          y1={gp(0, -1.2).y}
          x2={gp(1.2, 1.2).x}
          y2={gp(0, 1.2).y}
          stroke={colors.highlight}
          strokeWidth={6}
        />
        <text
          x={gp(1.2, 1).x + 14}
          y={gp(0, 1).y + 16}
          fill={colors.primary}
          fontSize={46}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          1
        </text>
        <text
          x={gp(1.2, 1.2).x + 10}
          y={gp(0, 1.2).y + 16}
          fill={colors.highlight}
          fontSize={46}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          x
        </text>
        <line
          x1={gp(xs, 0).x}
          y1={gp(0, -1.2).y}
          x2={gp(xs, 0).x}
          y2={gp(0, 1.35).y}
          stroke={colors.orange}
          strokeWidth={3}
          strokeDasharray="8 8"
          opacity={
            (onHalf ? sweepB : sweepA) > 0 && (onHalf ? sweepB : sweepA) < 1
              ? 1
              : 0
          }
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 300,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 50,
          fontWeight: 800,
          color:
            Math.abs(total) < 0.005
              ? colors.green
              : total < 0
                ? colors.red
                : colors.green,
          opacity: graphs * fadeIn(frame, c3 + 30),
        }}
      >
        {tx.overlap} ={" "}
        {(Math.round(total * 100) / 100).toFixed(2).replace("-", "−")}
      </div>

      {/* the angle inset and the three answer cards */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          opacity: fadeIn(frame, c2 + 20) * fadeOut(frame, c8, 12),
        }}
      >
        <Arrow from={I} to={{ x: I.x + 220, y: I.y }} width={12} />
        <Arrow
          from={I}
          to={{ x: I.x + 220 * Math.cos(a), y: I.y - 220 * Math.sin(a) }}
          width={12}
          color={colors.highlight}
        />
        <path
          d={`M ${I.x + 70} ${I.y} A 70 70 0 0 0 ${I.x + 70 * Math.cos(a)} ${I.y - 70 * Math.sin(a)}`}
          fill="none"
          stroke={colors.text}
          strokeWidth={4}
        />
        <text
          x={I.x + 20}
          y={I.y + 70}
          fill={ang < 89 ? colors.red : colors.green}
          fontSize={48}
          fontFamily={fonts.mono}
          fontWeight={800}
        >
          {Math.round(ang)}°
        </text>
        {CARDS.map((c, k) => {
          const s = card(k);
          const red = c.deg !== 90;
          return (
            <g
              key={k}
              opacity={s}
              transform={`translate(${1610 + (k === 2 ? fight : -fight)} ${200 + k * 140}) scale(${s})`}
            >
              <rect
                x={-170}
                y={-52}
                width={340}
                height={104}
                rx={16}
                fill={alpha(colors.bg, 0.9)}
                stroke={red ? colors.red : colors.green}
                strokeWidth={5}
              />
              <text
                x={-145}
                y={14}
                fill={colors.text}
                fontSize={c.label === "coeffs" ? 30 : 42}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {c.label === "coeffs" ? tx.coeffs : c.label}
              </text>
              <text
                x={145}
                y={18}
                fill={red ? colors.red : colors.green}
                fontSize={52}
                textAnchor="end"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {c.deg}°
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 200,
          fontWeight: 900,
          color: colors.highlight,
          opacity: fadeIn(frame, c8 + 16),
          scale: `${Math.min(1, springIn(frame, c8 + 16, fps, 9))}`,
        }}
      >
        ?
      </div>
    </SceneShell>
  );
};
