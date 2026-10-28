import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Order matters. Two copies of one rectangle on a floor line. Left: turned
// a quarter turn, then flattened: a short flat shadow. Right: flattened,
// then turned: a tall thin one. "AB ≠ BA" drops between them. Then socks
// and shoes: sock then shoe goes on fine; shoe then sock leaves the sock
// stuck outside, red.

const W = 240;
const H = 150;
const rect = (
  x: number,
  y: number,
  turn: number,
  flat: number,
  order: "turnFirst" | "flatFirst",
) =>
  [
    [0, 0],
    [W, 0],
    [W, -H],
    [0, -H],
  ]
    .map(([px, py]) => {
      const r = (p: number[]) => {
        const a = (-Math.PI / 2) * turn;
        return [
          p[0] * Math.cos(a) - p[1] * Math.sin(a),
          p[0] * Math.sin(a) + p[1] * Math.cos(a),
        ];
      };
      const f = (p: number[]) => [p[0], p[1] * (1 - 0.97 * flat)];
      const q = order === "turnFirst" ? f(r([px, py])) : r(f([px, py]));
      return `${x + q[0]},${y + q[1]}`;
    })
    .join(" ");

const Sock: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly color: string;
}> = ({ x, y, color }) => (
  <path
    d={`M ${x} ${y} l 0 -120 l 50 0 l 0 90 l 60 0 a 24 24 0 0 1 0 48 l -110 0 Z`}
    fill={color}
    stroke={colors.ink}
    strokeWidth={4}
  />
);
const Shoe: React.FC<{ readonly x: number; readonly y: number }> = ({
  x,
  y,
}) => (
  <path
    d={`M ${x - 10} ${y + 10} l 0 -70 l 70 0 l 10 30 l 70 10 a 22 22 0 0 1 0 30 Z`}
    fill={colors.wood}
    stroke={colors.ink}
    strokeWidth={4}
  />
);

export const Order: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("order");
  const [c0, c1] = cues;
  const s1 = glide(frame, c0 + 30, fps, 22);
  const s2 = glide(frame, c0 + 80, fps, 22);
  const neq = Math.min(1, springIn(frame, c0 + 120, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const good = glide(frame, c1 + 30, fps, 18);
  const bad = glide(frame, c1 + 70, fps, 18);
  const FLOOR = 640;

  return (
    <SceneShell id="order">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="thud" at={c0 + 80} volume={0.26} />
      <Sfx name="ding" at={c0 + 120} />
      <Sfx name="pop" at={c1 + 30} volume={0.16} />
      <Sfx name="scratch" at={c1 + 70} volume={0.24} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={FLOOR}
            x2={1720}
            y2={FLOOR}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <polygon
            points={rect(520, FLOOR, s1, s2, "turnFirst")}
            fill={alpha(colors.primary, 0.35)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <polygon
            points={rect(1280, FLOOR, s2, s1, "flatFirst")}
            fill={alpha(colors.orange, 0.35)}
            stroke={colors.orange}
            strokeWidth={6}
          />
          {[
            { x: 460, t: tx.turnFlat },
            { x: 1300, t: tx.flatTurn },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={760}
              fill={colors.text}
              fontSize={46}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, c0 + 10)}
            >
              {l.t}
            </text>
          ))}
          <g opacity={neq} transform={`translate(960 260) scale(${neq})`}>
            <text
              fill={colors.highlight}
              fontSize={110}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.abNotBa}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* socks, then shoes */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* sock then shoe: fine */}
          <g transform="translate(560 0)">
            <rect
              x={-40}
              y={300}
              width={80}
              height={300}
              rx={30}
              fill={alpha(colors.paper, 0.2)}
            />
            <Sock
              x={-25}
              y={lerp(380, 600, Math.min(1, good * 1.6))}
              color={colors.highlight}
            />
            <g opacity={good}>
              <Shoe x={-25} y={lerp(420, 600, good)} />
            </g>
            <text
              x={20}
              y={720}
              fill={colors.green}
              fontSize={80}
              textAnchor="middle"
              fontWeight={900}
              opacity={fadeIn(frame, c1 + 50)}
            >
              ✓
            </text>
          </g>
          {/* shoe then sock: the sock ends up outside */}
          <g transform="translate(1360 0)">
            <rect
              x={-40}
              y={300}
              width={80}
              height={300}
              rx={30}
              fill={alpha(colors.paper, 0.2)}
            />
            <Shoe x={-25} y={lerp(420, 600, Math.min(1, bad * 1.6))} />
            <g opacity={bad}>
              <Sock x={-25} y={lerp(380, 520, bad)} color={colors.highlight} />
            </g>
            <text
              x={20}
              y={720}
              fill={colors.red}
              fontSize={80}
              textAnchor="middle"
              fontWeight={900}
              opacity={fadeIn(frame, c1 + 90)}
            >
              ✗
            </text>
          </g>
          <text
            x={960}
            y={220}
            fill={colors.highlight}
            fontSize={90}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {tx.abNotBa}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
