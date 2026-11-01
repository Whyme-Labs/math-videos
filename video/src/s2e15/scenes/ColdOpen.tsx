import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The story, worked on screen. Berlin, 1932: von Neumann and his book.
// The state (1, i) appears as two little complex planes, one per entry,
// a lemon dot at 1 in the first and a pink dot at i in the second, and a
// length² gauge on the right. "Multiply matching entries and add" is
// worked as a formula: 1·1 + i·i → 1 + (−1) → 0, the gauge rising to 1 and
// falling back to 0. Dashed circles show each entry really has size 1.
// The second dot slides out to 2i: 1·1 + 2i·2i → 1 + (−4) → −3 and the
// gauge drops below zero. Last (1, i) comes back and a bar drops onto the
// second i.

const PL = [
  { x: 560, y: 520 },
  { x: 1040, y: 520 },
];
const R = 140;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const part0 = fadeOut(frame, c1, 10);
  const planes = fadeIn(frame, c1 + 4, 10);
  const out =
    glide(frame, c6 + 4, fps, 20) * (1 - glide(frame, c7 + 4, fps, 20));
  const z2 = { x: 0, y: lerp(1, 2, out) };
  // the gauge follows the algebra
  const up1 = glide(frame, c4 + 6, fps, 12);
  const fall = glide(frame, c4 + 40, fps, 14);
  const up2 = glide(frame, c6 + 40, fps, 12);
  const neg = glide(frame, c6 + 70, fps, 20);
  const reset = glide(frame, c7 + 4, fps, 14);
  const val = (up1 - fall + up2 - 4 * neg) * (1 - reset);
  const G = { x: 1580, y: 500 };
  const U = 70;
  const jolt = shake(frame, c6 + 80, 12);
  const red = colors.red;
  const steps: Tok[][] = [
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "d", t: "·" },
      { id: "c", t: "i" },
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
      { id: "d", t: "·" },
      { id: "c", t: "2i" },
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
      { id: "d", t: "·" },
      { id: "c", t: "i" },
    ],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "d", t: "·" },
      { id: "c", t: "i", bar: true },
    ],
  ];
  const at = [
    c3 + 10,
    c4 + 6,
    c4 + 40,
    c6 + 10,
    c6 + 40,
    c6 + 70,
    c7 + 4,
    c7 + 30,
  ];
  const sizes = fadeIn(frame, c5 + 6, 10) * (1 - out);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 20} volume={0.2} />
      <Sfx name="pop" at={c1 + 4} volume={0.12} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="pop" at={c3 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="thud" at={c4 + 40} volume={0.24} />
      <Sfx name="whoosh" at={c6 + 4} volume={0.1} />
      <Sfx name="scratch" at={c6 + 70} volume={0.18} />
      <Sfx name="pop" at={c7 + 30} volume={0.12} />

      <AbsoluteFill style={{ opacity: part0 }}>
        <svg width={1920} height={1080}>
          <g transform="translate(620 520)" opacity={fadeIn(frame, c0 + 16)}>
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
              y1={-90}
              x2={200}
              y2={-90}
              stroke={alpha(colors.ink, 0.4)}
              strokeWidth={4}
            />
            {[0, 1, 2, 3].map((k) => (
              <line
                key={k}
                x1={-200}
                y1={-30 + k * 50}
                x2={k === 3 ? 60 : 200}
                y2={-30 + k * 50}
                stroke={alpha(colors.ink, 0.25)}
                strokeWidth={8}
              />
            ))}
          </g>
          <Person
            x={1420}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={-1}
          />
          <text
            x={1420}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 16)}
          >
            {tx.vonNeumann}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 380,
            width: 480,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            color: colors.ink,
            opacity: fadeIn(frame, c0 + 24),
          }}
        >
          {tx.book}
        </div>
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
          {tx.berlin}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: planes }}>
        <svg width={1920} height={1080}>
          {PL.map((p, k) => {
            const z = k === 0 ? { x: 1, y: 0 } : z2;
            const col = k === 0 ? colors.primary : colors.highlight;
            const r = Math.hypot(z.x, z.y) * R;
            return (
              <g key={k}>
                <line
                  x1={p.x - 200}
                  y1={p.y}
                  x2={p.x + 200}
                  y2={p.y}
                  stroke={alpha(colors.paper, 0.35)}
                  strokeWidth={3}
                />
                <line
                  x1={p.x}
                  y1={p.y - 250}
                  x2={p.x}
                  y2={p.y + 200}
                  stroke={alpha(colors.paper, 0.35)}
                  strokeWidth={3}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="none"
                  stroke={col}
                  strokeWidth={4}
                  strokeDasharray="10 8"
                  opacity={sizes}
                />
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={p.x + z.x * R}
                  y2={p.y - z.y * R}
                  stroke={col}
                  strokeWidth={6}
                />
                <circle
                  cx={p.x + z.x * R}
                  cy={p.y - z.y * R}
                  r={18}
                  fill={col}
                />
                <text
                  x={p.x + z.x * R + 24}
                  y={p.y - z.y * R - 16}
                  fill={col}
                  fontSize={52}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {k === 0 ? "1" : out > 0.5 ? "2i" : "i"}
                </text>
                <text
                  x={p.x}
                  y={p.y + 260}
                  fill={colors.muted}
                  fontSize={36}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {tx.entry} {k + 1}
                </text>
                <text
                  x={p.x - 150}
                  y={p.y + 150}
                  fill={col}
                  fontSize={38}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  opacity={sizes}
                >
                  {k === 0 ? "|1| = 1" : "|i| = 1"}
                </text>
              </g>
            );
          })}
          <g
            transform={`translate(${G.x + jolt} ${G.y})`}
            opacity={fadeIn(frame, c2 + 6)}
          >
            <rect
              x={-80}
              y={-4 * U}
              width={160}
              height={8 * U}
              rx={20}
              fill={alpha(colors.bg, 0.8)}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            <line
              x1={-100}
              y1={0}
              x2={100}
              y2={0}
              stroke={colors.text}
              strokeWidth={5}
            />
            <rect
              x={-54}
              y={val > 0 ? -val * U : 0}
              width={108}
              height={Math.abs(val) * U}
              rx={8}
              fill={val > 0.3 ? colors.green : colors.red}
            />
            <text
              y={-4 * U - 26}
              fill={colors.muted}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.lengthSq}
            </text>
            <text
              x={118}
              y={14}
              fill={colors.text}
              fontSize={38}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              0
            </text>
          </g>
        </svg>
        <Eq steps={steps} at={at} x={800} y={90} size={96} />
      </AbsoluteFill>
    </SceneShell>
  );
};
