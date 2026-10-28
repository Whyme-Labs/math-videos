import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Ladder } from "../components/ladder";
import { useStrings } from "../i18n";

// The payoff. The ladder for five roots: 120, then one square root down to
// 60, and the next rung snaps: the climber is stuck. Beside it, five beads
// a–e show why: the 3-cycles (a b d) and (a c e), undone, then done, leave
// (a b c) behind, so a 3-cycle survives every orderly step. Then
// x⁵ − 4x + 2: its five roots on the plane, a stack of root signs reaching
// up towards them that falls short and tumbles. No formula.

const LADDER_X = 380;
const PENT = { x: 1300, y: 470, r: 210 };
const NAMES = ["a", "b", "c", "d", "e"];
// x⁵ − 4x + 2 = 0: three real roots, two complex
const ROOTS = [
  { re: -1.5185, im: 0 },
  { re: 0.5085, im: 0 },
  { re: 1.2436, im: 0 },
  { re: -0.1168, im: 1.4385 },
  { re: -0.1168, im: -1.4385 },
];
const PLANE = { x: 1300, y: 480, s: 170 };
// (a b c) = (a b d)(a c e)(a b d)⁻¹(a c e)⁻¹, read right to left: so in
// time order (a e c), then (a d b), then (a c e), then (a b d)
const CYCLES = [
  [0, 4, 2],
  [0, 3, 1],
  [0, 2, 4],
  [0, 1, 3],
];

export const Quintic: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("quintic");
  const [c0, c1] = cues;
  const step1 = glide(frame, c0 + 20, fps, 14);
  const jamAt = c0 + 44;
  const jam = frame >= jamAt;
  const cycleAt = (k: number) => c0 + 60 + k * 26;
  const result = Math.min(1, springIn(frame, cycleAt(3) + 30, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const roots = (k: number) =>
    Math.min(1, springIn(frame, c1 + 20 + k * 6, fps, 10));
  const stackAt = (k: number) => c1 + 70 + k * 10;
  const fall = glide(frame, c1 + 130, fps, 22);

  // where each bead sits: positions after the cycles so far
  const slot = (i: number) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return {
      x: PENT.x + PENT.r * Math.cos(a),
      y: PENT.y + PENT.r * Math.sin(a),
    };
  };
  const slotOf = [0, 1, 2, 3, 4];
  let live: { cyc: number[]; t: number } | null = null;
  CYCLES.forEach((cyc, k) => {
    const t = glide(frame, cycleAt(k), fps, 16);
    if (t >= 0.999) {
      const moved = slotOf.map((s) => {
        const j = cyc.indexOf(s);
        return j < 0 ? s : cyc[(j + 1) % 3];
      });
      moved.forEach((s, i) => (slotOf[i] = s));
    } else if (t > 0) live = { cyc, t };
  });
  const beadPos = slotOf.map((s) => {
    const l = live as { cyc: number[]; t: number } | null;
    const j = l ? l.cyc.indexOf(s) : -1;
    if (!l || j < 0) return slot(s);
    const from = slot(s);
    const to = slot(l.cyc[(j + 1) % 3]);
    return { x: lerp(from.x, to.x, l.t), y: lerp(from.y, to.y, l.t) };
  });
  const beadColors = [
    colors.primary,
    colors.highlight,
    colors.green,
    colors.orange,
    colors.paper,
  ];

  return (
    <SceneShell id="quintic">
      <Sfx name="pluck2" at={c0 + 20} volume={0.16} />
      <Sfx name="thud" at={jamAt} volume={0.5} />
      <Sfx name="scratch" at={jamAt} volume={0.3} />
      {CYCLES.map((_, k) => (
        <Sfx key={k} name="tick" at={cycleAt(k)} volume={0.12} />
      ))}
      <Sfx name="ding" at={cycleAt(3) + 30} />
      {ROOTS.map((_, k) => (
        <Sfx key={`r${k}`} name="pop" at={c1 + 20 + k * 6} volume={0.12} />
      ))}
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={`s${k}`} name="clink" at={stackAt(k)} volume={0.12} />
      ))}
      <Sfx name="thud" at={c1 + 140} volume={0.45} />

      {/* the ladder for five roots, jammed */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          transform={`translate(${jam ? shake(frame, jamAt, 14) : 0} 0)`}
          opacity={fadeIn(frame, c0 + 4)}
        >
          <Ladder
            x={LADDER_X}
            top={220}
            bottom={680}
            rungs={["120", "60", "…", "1"]}
            steps={["√", "", ""]}
            down={step1}
            jamAt={jam ? 1 : undefined}
          />
          <text
            x={LADDER_X}
            y={150}
            fill={colors.red}
            fontSize={50}
            textAnchor="middle"
            fontWeight={900}
            opacity={jam ? fadeIn(frame, jamAt, 6) : 0}
          >
            {tx.jam}
          </text>
        </g>
      </svg>

      {/* why: a 3-cycle that never goes away */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {beadPos.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle
                r={40}
                fill={beadColors[i]}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <text
                y={14}
                fill={colors.ink}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {NAMES[i]}
              </text>
            </g>
          ))}
          {/* what's left: a → b → c */}
          <path
            d={`M ${slot(0).x} ${slot(0).y} L ${slot(1).x} ${slot(1).y} L ${slot(2).x} ${slot(2).y} Z`}
            fill={alpha(colors.highlight, 0.15)}
            stroke={colors.highlight}
            strokeWidth={8}
            strokeDasharray="16 10"
            opacity={result}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 760,
            width: 1100,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, cycleAt(0)),
            translate: riseIn(frame, cycleAt(0), 16),
          }}
        >
          {tx.commutator}
        </div>
      </AbsoluteFill>

      {/* x⁵ − 4x + 2: its roots, out of reach */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={PLANE.x - 2 * PLANE.s}
            y1={PLANE.y}
            x2={PLANE.x + 2 * PLANE.s}
            y2={PLANE.y}
            stroke={alpha(colors.muted, 0.6)}
            strokeWidth={3}
          />
          <line
            x1={PLANE.x}
            y1={PLANE.y - 1.8 * PLANE.s}
            x2={PLANE.x}
            y2={PLANE.y + 1.8 * PLANE.s}
            stroke={alpha(colors.muted, 0.6)}
            strokeWidth={3}
          />
          {ROOTS.map((r, k) => (
            <circle
              key={k}
              cx={PLANE.x + r.re * PLANE.s}
              cy={PLANE.y - r.im * PLANE.s}
              r={26 * roots(k)}
              fill={beadColors[k]}
              stroke={colors.ink}
              strokeWidth={4}
            />
          ))}
          {/* a stack of root signs, reaching up, falling short */}
          {Array.from({ length: 6 }).map((_, k) => {
            const s = Math.min(1, springIn(frame, stackAt(k), fps, 10));
            const x0 = 860;
            const y0 = 700 - k * 62;
            const fx = x0 + fall * (k - 2.5) * 70;
            const fy = lerp(y0, 760, fall);
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(${fx} ${fy}) rotate(${fall * k * 18}) scale(${s})`}
              >
                <rect
                  x={-60}
                  y={-28}
                  width={120}
                  height={56}
                  rx={10}
                  fill={alpha(colors.violet, 0.95)}
                  stroke={colors.primary}
                  strokeWidth={3}
                />
                <text
                  y={16}
                  fill={colors.primary}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {k % 2 ? "∛" : "√"}
                </text>
              </g>
            );
          })}
          <g
            opacity={Math.min(1, springIn(frame, c1 + 40, fps, 10))}
            transform={`translate(1620 250) rotate(-4)`}
          >
            <rect
              x={-170}
              y={-50}
              width={340}
              height={96}
              rx={22}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              y={16}
              fill={colors.ink}
              fontSize={46}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.shuffles}
            </text>
          </g>
          <text
            x={860}
            y={330}
            fill={colors.red}
            fontSize={72}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c1 + 146)}
          >
            ✗ {tx.noFormula}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 760,
            width: 1100,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 76,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 16),
          }}
        >
          {tx.poly}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
