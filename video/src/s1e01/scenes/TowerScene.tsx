import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glide, hop, ramp, shake, springIn } from "../components/motion";
import { QuestionTray } from "../components/QuestionTray";
import { Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { FLOORS, Tower } from "../components/Tower";
import { colors, fonts } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Demo stage, right of the tower.
const SX = 820;
const SW = 980;
const LY = 430;

type Demo = { lo: number; hi: number };
const X = (d: Demo, v: number) => SX + ((v - d.lo) / (d.hi - d.lo)) * SW;

const Arrow: React.FC<{
  x0: number;
  x1: number;
  y: number;
  t: number;
  color: string;
  height?: number;
}> = ({ x0, x1, y, t, color, height = 120 }) => {
  if (t <= 0) return null;
  const pts = Array.from({ length: 24 }, (_, i) =>
    hop((i / 23) * t, x0, y, x1, y, height),
  );
  const end = pts[pts.length - 1];
  return (
    <g>
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={end.x} cy={end.y} r={9} fill={color} />
    </g>
  );
};

const Check: React.FC<{ x: number; y: number; ok: boolean; s: number }> = ({
  x,
  y,
  ok,
  s,
}) =>
  s > 0 ? (
    <text
      x={x}
      y={y}
      fill={ok ? colors.green : colors.red}
      fontSize={64 * Math.min(1.2, s)}
      textAnchor="middle"
      fontWeight={700}
    >
      {ok ? "✓" : "✗"}
    </text>
  ) : null;

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const drop = FLOORS.map((_, i) => springIn(frame, 8 + i * 9, fps, 11, 140));
  const active = [2, 3, 4, 5].findIndex(
    (c, k) => frame >= cues[c] && frame < (cues[c + 1] ?? 1e9) && k >= 0,
  );
  // Highlight the floor whose equation is being acted out (floor index = active).
  const highlight = FLOORS.map((_, i) => (i === active ? 1 : 0));
  const question = FLOORS.map((_, i) =>
    springIn(frame, cues[7] + i * 6, fps, 10),
  );
  const demoOpacity = (c: number) =>
    interpolate(
      frame,
      [cues[c] - 4, cues[c] + 8, cues[c + 1] - 8, cues[c + 1]],
      [0, 1, 1, 0],
      clamp,
    );

  // ---- 1. ℕ: x + 5 = 3 ----
  const d1: Demo = { lo: -6, hi: 9 };
  const a = cues[2];
  const tryZero = ramp(frame, a + 18, 22);
  const negs = (k: number) => springIn(frame, a + 62 + k * 4, fps, 12);
  const fix1 = ramp(frame, a + 96, 22);

  // ---- 2. ℤ: 2x = 3 ----
  const d2: Demo = { lo: -1.5, hi: 4.5 };
  const b = cues[3];
  // x tries 1, then 2, then (after halves appear) 1.5.
  const xVal = interpolate(
    frame,
    [b + 14, b + 30, b + 46, b + 62, b + 92, b + 110],
    [0, 1, 1, 2, 2, 1.5],
    { ...clamp, easing: (t) => t * t * (3 - 2 * t) },
  );
  const halves = (k: number) => ramp(frame, b + 72 + k * 3, 8);

  // ---- 3. ℚ: x² = 2 ----
  const d3: Demo = { lo: 1.3, hi: 1.55 };
  const c = cues[4];
  const sweep = interpolate(frame, [c + 20, c + 80], [1.32, 1.53], {
    ...clamp,
    easing: (t) => t * t * (3 - 2 * t),
  });
  const fill3 = ramp(frame, c + 92, 18);
  const ratTicks: number[] = [];
  for (let q = 2; q <= 40; q++)
    for (let p = Math.ceil(1.3 * q); p <= Math.floor(1.55 * q); p++)
      ratTicks.push(p / q);

  // ---- 4. ℝ: x² = −1 ----
  const d4: Demo = { lo: -3, hi: 3 };
  const e = cues[5];
  const sweep4 = interpolate(frame, [e + 14, e + 50, e + 74], [-2, 2, 0], {
    ...clamp,
    easing: (t) => t * t * (3 - 2 * t),
  });
  const plane = glide(frame, e + 82, fps, 22);
  const rot = glide(frame, e + 100, fps, 24);

  const eq = (text: string, cue: number, color = colors.text) => (
    <div
      style={{
        position: "absolute",
        left: SX,
        width: SW,
        top: 110,
        textAlign: "center",
        fontFamily: fonts.math,
        fontSize: 72,
        color,
        scale: springIn(frame, cue, fps, 12),
      }}
    >
      {text}
    </div>
  );

  return (
    <SceneShell id="tower">
      {FLOORS.map((f, i) => (
        <Sfx key={f.symbol} name="thud" at={8 + i * 9 + 5} />
      ))}
      <Sfx name="whoosh" at={a + 18} volume={0.16} />
      <Sfx name="scratch" at={a + 42} volume={0.25} />
      <Sfx name="pop" at={a + 62} />
      <Sfx name="ding" at={a + 120} volume={0.3} />
      <Sfx name="tick" at={b + 30} />
      <Sfx name="scratch" at={b + 32} volume={0.2} />
      <Sfx name="tick" at={b + 62} />
      <Sfx name="scratch" at={b + 64} volume={0.2} />
      <Sfx name="pop" at={b + 72} />
      <Sfx name="ding" at={b + 112} volume={0.3} />
      <Sfx name="whoosh" at={c + 20} volume={0.14} />
      <Sfx name="sparkle" at={c + 92} volume={0.25} />
      <Sfx name="whoosh" at={e + 14} volume={0.14} />
      <Sfx name="whoosh" at={e + 82} />
      <Sfx name="chime" at={e + 118} volume={0.3} />
      <Sfx name="page" at={cues[6]} />
      {FLOORS.map((f, i) => (
        <Sfx key={f.name} name="tick" at={cues[7] + i * 6} />
      ))}
      <QuestionTray />
      <AbsoluteFill>
        <Tower
          appear={drop}
          built={highlight}
          question={question}
          style={{
            position: "absolute",
            left: 110,
            top: 130,
            scale: 0.78,
            transformOrigin: "top left",
          }}
        />

        {/* Intro text before the demos. */}
        <div
          style={{
            position: "absolute",
            left: SX,
            width: SW,
            top: 330,
            textAlign: "center",
            fontSize: 46,
            color: colors.muted,
            opacity: interpolate(
              frame,
              [cues[1], cues[1] + 10, cues[2] - 6, cues[2]],
              [0, 1, 1, 0],
              clamp,
            ),
          }}
        >
          each floor fixes an equation
          <br />
          the floor below <span style={{ color: colors.red }}>can’t solve</span>
        </div>

        {/* Demo 1: x + 5 = 3 in ℕ, then in ℤ. */}
        <AbsoluteFill style={{ opacity: demoOpacity(2) }}>
          {eq("x + 5 = 3", a)}
          <svg
            width={1920}
            height={890}
            style={{
              position: "absolute",
              translate: `${shake(frame, a + 42)}px 0px`,
            }}
          >
            <line
              x1={X(d1, 0) - fix1 * 0 - negs(0) * (X(d1, 0) - X(d1, -6))}
              y1={LY}
              x2={X(d1, 9)}
              y2={LY}
              stroke={colors.muted}
              strokeWidth={4}
            />
            {Array.from({ length: 10 }, (_, k) => (
              <g key={k}>
                <circle cx={X(d1, k)} cy={LY} r={10} fill={colors.primary} />
                <text
                  x={X(d1, k)}
                  y={LY + 50}
                  fill={colors.text}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k}
                </text>
              </g>
            ))}
            {[1, 2, 3, 4, 5].map((k) => (
              <g
                key={k}
                opacity={Math.min(1, negs(k))}
                transform={`translate(${(1 - Math.min(1, negs(k))) * -80} 0)`}
              >
                <circle cx={X(d1, -k)} cy={LY} r={10} fill={colors.orange} />
                <text
                  x={X(d1, -k)}
                  y={LY + 50}
                  fill={colors.orange}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  −{k}
                </text>
              </g>
            ))}
            <circle
              cx={X(d1, 3)}
              cy={LY}
              r={22}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
            />
            <text
              x={X(d1, 3)}
              y={LY - 36}
              fill={colors.highlight}
              fontSize={30}
              textAnchor="middle"
            >
              target
            </text>
            <g opacity={1 - fix1}>
              <Arrow
                x0={X(d1, 0)}
                x1={X(d1, 5)}
                y={LY}
                t={tryZero}
                color={colors.red}
              />
            </g>
            <text
              x={X(d1, 2.5)}
              y={LY - 150}
              fill={colors.red}
              fontSize={34}
              textAnchor="middle"
              opacity={tryZero * (1 - fix1)}
            >
              smallest x = 0 already overshoots
            </text>
            <Arrow
              x0={X(d1, -2)}
              x1={X(d1, 3)}
              y={LY}
              t={fix1}
              color={colors.green}
            />
            <text
              x={X(d1, -2)}
              y={LY + 100}
              fill={colors.green}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fix1}
            >
              x = −2
            </text>
            <Check
              x={X(d1, 3) + 60}
              y={LY - 70}
              ok
              s={springIn(frame, a + 118, fps, 9)}
            />
            <text
              x={SX + SW / 2}
              y={LY + 210}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              opacity={Math.min(1, negs(1))}
            >
              ℤ adds the negatives
            </text>
          </svg>
        </AbsoluteFill>

        {/* Demo 2: 2x = 3 in ℤ, then in ℚ. */}
        <AbsoluteFill style={{ opacity: demoOpacity(3) }}>
          {eq("2x = 3", b)}
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            <line
              x1={X(d2, -1.5)}
              y1={LY}
              x2={X(d2, 4.5)}
              y2={LY}
              stroke={colors.muted}
              strokeWidth={4}
            />
            {[-1, 0, 1, 2, 3, 4].map((k) => (
              <g key={k}>
                <circle cx={X(d2, k)} cy={LY} r={10} fill={colors.primary} />
                <text
                  x={X(d2, k)}
                  y={LY + 50}
                  fill={colors.text}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k}
                </text>
              </g>
            ))}
            {[-0.5, 0.5, 1.5, 2.5, 3.5].map((h, k) => (
              <g key={h} opacity={halves(k)}>
                <circle cx={X(d2, h)} cy={LY} r={8} fill={colors.orange} />
                <text
                  x={X(d2, h)}
                  y={LY + 50}
                  fill={colors.orange}
                  fontSize={24}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >{`${Math.round(h * 2)}/2`}</text>
              </g>
            ))}
            <circle
              cx={X(d2, 3)}
              cy={LY}
              r={22}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
            />
            {/* x and 2x markers. */}
            <g
              transform={`translate(${X(d2, xVal)} ${LY - 110})`}
              opacity={ramp(frame, b + 10, 8)}
            >
              <polygon points="-16,0 16,0 0,26" fill={colors.primary} />
              <text
                y={-14}
                fill={colors.primary}
                fontSize={34}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                x = {xVal.toFixed(xVal % 1 ? 1 : 0)}
              </text>
            </g>
            <g
              transform={`translate(${X(d2, 2 * xVal)} ${LY + 110})`}
              opacity={ramp(frame, b + 10, 8)}
            >
              <polygon points="-16,0 16,0 0,-26" fill={colors.orange} />
              <text
                y={50}
                fill={colors.orange}
                fontSize={34}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                2x = {(2 * xVal).toFixed(0)}
              </text>
            </g>
            <Check
              x={X(d2, 2) + 60}
              y={LY - 170}
              ok={false}
              s={springIn(frame, b + 32, fps, 9) * (frame < b + 46 ? 1 : 0)}
            />
            <Check
              x={X(d2, 4) + 60}
              y={LY - 170}
              ok={false}
              s={springIn(frame, b + 64, fps, 9) * (frame < b + 92 ? 1 : 0)}
            />
            <Check
              x={X(d2, 3) + 70}
              y={LY - 170}
              ok
              s={springIn(frame, b + 112, fps, 9)}
            />
            <text
              x={SX + SW / 2}
              y={LY + 250}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              opacity={halves(0)}
            >
              ℚ fills in the fractions
            </text>
          </svg>
        </AbsoluteFill>

        {/* Demo 3: x² = 2 in ℚ has a hole; ℝ fills it. */}
        <AbsoluteFill style={{ opacity: demoOpacity(4) }}>
          {eq("x² = 2", c)}
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            <line
              x1={X(d3, 1.3)}
              y1={LY}
              x2={X(d3, 1.55)}
              y2={LY}
              stroke={colors.muted}
              strokeWidth={4}
              opacity={0.5}
            />
            <rect
              x={X(d3, 1.3)}
              y={LY - 5}
              width={(X(d3, 1.55) - X(d3, 1.3)) * fill3}
              height={10}
              rx={5}
              fill={colors.primary}
            />
            {ratTicks.map((v, i) => (
              <line
                key={i}
                x1={X(d3, v)}
                y1={LY - 14}
                x2={X(d3, v)}
                y2={LY + 14}
                stroke={colors.text}
                strokeWidth={2}
                opacity={ramp(frame, c + 6 + (i % 30), 6) * (1 - fill3 * 0.6)}
              />
            ))}
            {[1.3, 1.4, 1.5].map((v) => (
              <text
                key={v}
                x={X(d3, v)}
                y={LY + 56}
                fill={colors.text}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {v.toFixed(1)}
              </text>
            ))}
            <circle
              cx={X(d3, Math.SQRT2)}
              cy={LY}
              r={16}
              fill={fill3 > 0.9 ? colors.primary : colors.bg}
              stroke={colors.orange}
              strokeWidth={4}
            />
            <text
              x={X(d3, Math.SQRT2)}
              y={LY - 40}
              fill={colors.orange}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              {fill3 > 0.9 ? "√2" : "hole"}
            </text>
            <g
              transform={`translate(${X(d3, sweep)} ${LY - 120})`}
              opacity={ramp(frame, c + 16, 8) * (1 - fill3)}
            >
              <polygon points="-16,0 16,0 0,26" fill={colors.primary} />
              <text
                y={-14}
                fill={colors.primary}
                fontSize={32}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                x² = {(sweep * sweep).toFixed(3)}
              </text>
            </g>
            <text
              x={SX + SW / 2}
              y={LY + 150}
              fill={colors.muted}
              fontSize={34}
              textAnchor="middle"
              opacity={ramp(frame, c + 60, 10) * (1 - fill3)}
            >
              fractions everywhere, but none squares to 2
            </text>
            <text
              x={SX + SW / 2}
              y={LY + 210}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              opacity={fill3}
            >
              ℝ fills every hole
            </text>
          </svg>
        </AbsoluteFill>

        {/* Demo 4: x² = −1 has no real answer; rotate into the plane to find i. */}
        <AbsoluteFill style={{ opacity: demoOpacity(5) }}>
          {eq("x² = −1", e)}
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            <line
              x1={X(d4, -3)}
              y1={LY}
              x2={X(d4, 3)}
              y2={LY}
              stroke={colors.muted}
              strokeWidth={4}
            />
            {[-2, -1, 0, 1, 2].map((k) => (
              <text
                key={k}
                x={X(d4, k)}
                y={LY + 50}
                fill={colors.text}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {k}
              </text>
            ))}
            <circle
              cx={X(d4, -1)}
              cy={LY}
              r={22}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
            />
            <g opacity={ramp(frame, e + 10, 8) * (1 - plane)}>
              <circle cx={X(d4, sweep4)} cy={LY} r={12} fill={colors.primary} />
              <circle
                cx={X(d4, Math.min(3, sweep4 * sweep4))}
                cy={LY}
                r={12}
                fill={colors.orange}
              />
              <text
                x={X(d4, Math.min(3, sweep4 * sweep4))}
                y={LY - 30}
                fill={colors.orange}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                x²
              </text>
              <text
                x={SX + SW / 2}
                y={LY + 150}
                fill={colors.muted}
                fontSize={34}
                textAnchor="middle"
              >
                x² never goes below 0
              </text>
            </g>
            {/* The plane: a vertical axis, and multiplying by i turns 1 a quarter turn to i. */}
            <line
              x1={X(d4, 0)}
              y1={LY + 220 * plane}
              x2={X(d4, 0)}
              y2={LY - 220 * plane}
              stroke={colors.muted}
              strokeWidth={4}
            />
            <g opacity={plane}>
              <path
                d={`M ${X(d4, 1)} ${LY} A ${X(d4, 1) - X(d4, 0)} ${X(d4, 1) - X(d4, 0)} 0 0 0 ${X(d4, 0) + (X(d4, 1) - X(d4, 0)) * Math.cos((rot * Math.PI) / 2)} ${LY - (X(d4, 1) - X(d4, 0)) * Math.sin((rot * Math.PI) / 2)}`}
                fill="none"
                stroke={colors.primary}
                strokeWidth={5}
              />
              <circle
                cx={
                  X(d4, 0) +
                  (X(d4, 1) - X(d4, 0)) * Math.cos((rot * Math.PI) / 2)
                }
                cy={LY - (X(d4, 1) - X(d4, 0)) * Math.sin((rot * Math.PI) / 2)}
                r={14}
                fill={colors.primary}
              />
              <text
                x={X(d4, 0) + 30}
                y={LY - (X(d4, 1) - X(d4, 0)) - 20}
                fill={colors.primary}
                fontSize={44}
                fontFamily={fonts.math}
                opacity={rot}
              >
                i
              </text>
              <text
                x={SX + SW / 2 + 260}
                y={LY - 120}
                fill={colors.text}
                fontSize={40}
                fontFamily={fonts.math}
                opacity={rot}
              >
                i² = −1
              </text>
              <text
                x={SX + SW / 2}
                y={LY + 270}
                fill={colors.orange}
                fontSize={38}
                textAnchor="middle"
                opacity={rot}
              >
                ℂ adds a second direction
              </text>
            </g>
          </svg>
        </AbsoluteFill>

        {/* Ledger: what each floor costs. */}
        <div
          style={{
            position: "absolute",
            left: SX + 180,
            top: 150,
            width: 620,
            height: 470,
            borderRadius: 18,
            backgroundColor: colors.paper,
            color: colors.ink,
            padding: 34,
            opacity: frame < cues[6] ? 0 : 1,
            rotate: `${interpolate(springIn(frame, cues[6], fps, 12), [0, 1], [12, -2])}deg`,
            translate: `${(1 - Math.min(1, springIn(frame, cues[6], fps, 12))) * 900}px 0px`,
          }}
        >
          <div
            style={{ fontFamily: fonts.title, fontSize: 48, fontWeight: 700 }}
          >
            What did we lose?
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ borderBottom: "2px solid #e2cf8f", height: 76 }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
