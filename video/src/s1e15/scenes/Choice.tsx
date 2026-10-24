import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Shoe } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// Russell's shoes and socks. A row of pairs of shoes running off to the
// right: every left shoe hops up at once, there's a rule. A row of pairs of
// socks: the two in each pair are identical, question marks bob over them.
// The card "axiom of choice" stamps down and one sock from every pair lifts.
// Then Banach–Tarski: one ball breaks into five pieces that tumble, turn,
// and come back together as two balls, each as big as the first.

const PAIRS = 7;
const pairX = (k: number) => 260 + k * 230;
const SHOE_Y = 380;
const SOCK_Y = 700;

const Sock: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s?: number;
  readonly flip?: boolean;
}> = ({ x, y, s = 1, flip = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path
      d="M -16 -110 L 16 -110 L 16 -30 Q 50 -26 50 -6 Q 50 8 30 8 L -14 8 Q -24 8 -24 -6 Z"
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <rect x={-16} y={-110} width={32} height={18} fill={colors.primary} />
  </g>
);

// one of five pieces of the ball: a wedge with a jagged rim
const piece = (k: number, r: number) => {
  const a0 = (k / 5) * Math.PI * 2;
  const a1 = ((k + 1) / 5) * Math.PI * 2;
  const pts = [`0,0`];
  for (let i = 0; i <= 6; i++) {
    const a = lerp(a0, a1, i / 6);
    const rr = r * (i % 2 ? 0.92 : 1);
    pts.push(
      `${(rr * Math.cos(a)).toFixed(1)},${(rr * Math.sin(a)).toFixed(1)}`,
    );
  }
  return pts.join(" ");
};
const PIECE_COLORS = [
  colors.primary,
  colors.orange,
  colors.highlight,
  colors.green,
  colors.violet,
];

export const Choice: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("choice");
  const [c0, c1] = cues;
  const left = glide(frame, c0 + 24, fps, 12);
  const stamp = Math.min(1, springIn(frame, c0 + 100, fps, 9));
  const lift = glide(frame, c0 + 112, fps, 14);
  const part1 = fadeOut(frame, c1, 10);
  // the ball
  const burst = glide(frame, c1 + 16, fps, 20);
  const regroup = glide(frame, c1 + 60, fps, 30);
  const R = 200;

  return (
    <SceneShell id="choice">
      <Sfx name="whoosh" at={c0 + 24} volume={0.14} />
      <Sfx name="ding" at={c0 + 36} volume={0.2} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={c0 + 60 + k * 10} volume={0.12} />
      ))}
      <Sfx name="thud" at={c0 + 100} volume={0.4} />
      <Sfx name="sparkle" at={c0 + 112} volume={0.3} />
      <Sfx name="scratch" at={c1 + 16} volume={0.3} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.16} />
      <Sfx name="thud" at={c1 + 90} volume={0.35} />
      <Sfx name="chime" at={c1 + 96} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* shoes: take every left one */}
          {Array.from({ length: PAIRS }).map((_, k) => (
            <g key={k}>
              <g transform={`translate(0 ${-50 * left})`}>
                <g
                  transform={`translate(${pairX(k) - 40} ${SHOE_Y}) scale(-1 1)`}
                >
                  <Shoe x={0} y={0} s={1} />
                </g>
                <circle
                  cx={pairX(k) - 40}
                  cy={SHOE_Y + 30}
                  r={8}
                  fill={colors.highlight}
                  opacity={left}
                />
              </g>
              <Shoe x={pairX(k) + 40} y={SHOE_Y} s={1} />
            </g>
          ))}
          {/* socks: no rule */}
          {Array.from({ length: PAIRS }).map((_, k) => {
            const which = (k * 7) % 2; // the choice the axiom makes
            return (
              <g key={`s${k}`}>
                {[0, 1].map((j) => (
                  <g
                    key={j}
                    transform={`translate(0 ${j === which ? -50 * lift : 0})`}
                  >
                    <Sock x={pairX(k) + (j ? 34 : -34)} y={SOCK_Y} />
                  </g>
                ))}
                <text
                  x={pairX(k)}
                  y={SOCK_Y - 150 + 8 * Math.sin(frame / 6 + k)}
                  fill={colors.highlight}
                  fontSize={52}
                  textAnchor="middle"
                  fontWeight={800}
                  opacity={
                    fadeIn(frame, c0 + 60 + Math.min(k, 2) * 10) * (1 - lift)
                  }
                >
                  ?
                </text>
              </g>
            );
          })}
          <text
            x={120}
            y={SHOE_Y - 150}
            fill={colors.text}
            fontSize={44}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 30)}
          >
            {tx.shoes}
          </text>
          <text
            x={120}
            y={SOCK_Y - 210}
            fill={colors.text}
            fontSize={44}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 56)}
          >
            {tx.socks}
          </text>
          {/* the axiom stamps down */}
          <g
            opacity={stamp}
            transform={`translate(1480 ${SOCK_Y - 240}) rotate(-8) scale(${lerp(1.8, 1, stamp)})`}
          >
            <rect
              x={-220}
              y={-50}
              width={440}
              height={100}
              rx={16}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <text
              x={0}
              y={18}
              fill={colors.ink}
              fontSize={50}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.ac}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* Banach–Tarski: one ball, five pieces, two balls */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 5 }).map((_, k) => {
            const a = ((k + 0.5) / 5) * Math.PI * 2;
            const out = {
              x: 960 + 330 * Math.cos(a),
              y: 480 + 260 * Math.sin(a),
            };
            const target = k < 3 ? { x: 560, y: 480 } : { x: 1360, y: 480 };
            const p = hop(
              regroup,
              lerp(960, out.x, burst),
              lerp(480, out.y, burst),
              target.x,
              target.y,
              120,
            );
            const spin =
              burst * 40 * (k % 2 ? 1 : -1) +
              regroup * (k < 3 ? 72 * k : 120 * (k - 3));
            return (
              <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${spin})`}>
                <polygon
                  points={piece(k, R)}
                  fill={PIECE_COLORS[k]}
                  stroke={colors.ink}
                  strokeWidth={5}
                  strokeLinejoin="round"
                  opacity={1 - fadeIn(frame, c1 + 86, 10)}
                />
              </g>
            );
          })}
          {/* the two balls they become */}
          {[560, 1360].map((x) => (
            <circle
              key={x}
              cx={x}
              cy={480}
              r={R}
              fill={colors.primary}
              stroke={colors.ink}
              strokeWidth={6}
              opacity={fadeIn(frame, c1 + 86, 8)}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 80,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 92),
            translate: riseIn(frame, c1 + 92, 16),
          }}
        >
          {tx.bt}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
