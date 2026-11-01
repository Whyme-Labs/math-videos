import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake } from "../../shared/components/motion";
import { Eq, type Tok } from "../../shared/components/Eq";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Berlin, 1932: von Neumann beside his book, the state (1, i)
// on it, and its two entries as arrows on little complex dials turning
// together. Then the test, worked in front of you: 1·1 + i·i becomes
// 1 + (−1) and collapses to 0, while a length² gauge rises and falls with
// it. (1, 2i) goes 1 + (−4) to −3 and the gauge drops below zero. Last,
// (1, i) comes back and an orange bar drops onto the first i: the fix,
// not yet explained.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c1, 10);
  // the gauge follows the algebra: 1 + (−1) lands on 0, 1 + (−4) on −3,
  // and it empties again when (1, i) comes back for the bar
  const up1 = glide(frame, c1 + 48, fps, 12);
  const fall = glide(frame, c1 + 70, fps, 14);
  const up2 = glide(frame, c2 + 26, fps, 12);
  const neg = glide(frame, c2 + 40, fps, 20);
  const reset = glide(frame, c3 + 20, fps, 14);
  const val = (up1 - fall + up2 - 4 * neg) * (1 - reset);
  const G = { x: 1500, y: 470 };
  const U = 80;
  const jolt = shake(frame, c2 + 50, 12);
  const red = colors.red;
  const steps: Tok[][] = [
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "c", t: "·i" },
    ],
    [
      { id: "a", t: "1" },
      { id: "p", t: " + " },
      { id: "b", t: "(−1)", color: red },
    ],
    [{ id: "z", t: "0", color: red }],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "2i" },
      { id: "c", t: "·2i" },
    ],
    [
      { id: "a", t: "1" },
      { id: "p", t: " + " },
      { id: "b", t: "(−4)", color: red },
    ],
    [{ id: "z", t: "−3", color: red }],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "c", t: "·i" },
    ],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i", bar: true },
      { id: "c", t: "·i" },
    ],
  ];
  const at = [
    c1 + 20,
    c1 + 48,
    c1 + 70,
    c2 + 10,
    c2 + 26,
    c2 + 40,
    c3 + 20,
    c3 + 40,
  ];
  // the two entries of the state as arrows on little complex dials, turning together
  const phase = Math.max(0, frame - c0 - 40) * 0.05;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 20} volume={0.2} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.1} />
      <Sfx name="pop" at={c1 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 48} volume={0.1} />
      <Sfx name="thud" at={c1 + 70} volume={0.26} />
      <Sfx name="pop" at={c2 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 26} volume={0.1} />
      <Sfx name="scratch" at={c2 + 40} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />
      <Sfx name="pop" at={c3 + 40} volume={0.12} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(560 ${560 + lerp(30, 0, glide(frame, c0 + 20, fps, 20))})`}
            opacity={fadeIn(frame, c0 + 20)}
          >
            <rect
              x={-260}
              y={-200}
              width={520}
              height={380}
              rx={14}
              fill={alpha(colors.paper, 0.92)}
              stroke={colors.wood}
              strokeWidth={10}
            />
            <line
              x1={-200}
              y1={-110}
              x2={200}
              y2={-110}
              stroke={alpha(colors.ink, 0.4)}
              strokeWidth={4}
            />
            <text
              x={0}
              y={60}
              fill={colors.ink}
              fontSize={88}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              (1, i)
            </text>
          </g>
          {[0, 1].map((k) => {
            const a = (k * Math.PI) / 2 + phase;
            return (
              <g
                key={k}
                transform={`translate(1000 ${420 + k * 220})`}
                opacity={fadeIn(frame, c0 + 36 + k * 6)}
              >
                <circle
                  r={80}
                  fill="none"
                  stroke={alpha(colors.primary, 0.5)}
                  strokeWidth={4}
                />
                <line
                  x1={-100}
                  y1={0}
                  x2={100}
                  y2={0}
                  stroke={alpha(colors.paper, 0.3)}
                  strokeWidth={3}
                />
                <line
                  x1={0}
                  y1={-100}
                  x2={0}
                  y2={100}
                  stroke={alpha(colors.paper, 0.3)}
                  strokeWidth={3}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={80 * Math.cos(a)}
                  y2={-80 * Math.sin(a)}
                  stroke={colors.orange}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <circle
                  cx={80 * Math.cos(a)}
                  cy={-80 * Math.sin(a)}
                  r={12}
                  fill={colors.orange}
                />
              </g>
            );
          })}
          <Person
            x={1400}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={-1}
          />
          <text
            x={1400}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.vonNeumann}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 320,
            width: 480,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            color: colors.ink,
            opacity: fadeIn(frame, c0 + 30),
          }}
        >
          {tx.book}
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.berlin}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <Eq steps={steps} at={at} x={640} y={400} size={110} />
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <g transform={`translate(${G.x + jolt} ${G.y})`}>
            <rect
              x={-90}
              y={-4 * U}
              width={180}
              height={8 * U}
              rx={20}
              fill={alpha(colors.bg, 0.8)}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            <line
              x1={-110}
              y1={0}
              x2={110}
              y2={0}
              stroke={colors.text}
              strokeWidth={5}
            />
            <rect
              x={-60}
              y={val > 0 ? -val * U : 0}
              width={120}
              height={Math.abs(val) * U}
              rx={8}
              fill={val > 0.3 ? colors.green : colors.red}
            />
            <text
              x={0}
              y={-4 * U - 30}
              fill={colors.muted}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.lengthSq}
            </text>
            <text
              x={130}
              y={14}
              fill={colors.text}
              fontSize={40}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              0
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
