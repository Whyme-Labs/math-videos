import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Pure vs not. Left: a 3 × 3 grid that is visibly a column times a row (the
// column and row sit on its edges, and its shading is their product): rank
// 1. Right: the identity grid; it tries to factor, shakes, and splits into
// three separate one-cell layers instead: rank 3. Then two qubit circles,
// each with its own arrow (a product state); for the entangled state the
// arrows fade and one glowing link joins the two circles.

const COL = [1, 2, 3];
const ROW = [1, 0, 2];
const C = 80;

const Heat: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly v: (i: number, j: number) => number;
  readonly max: number;
  readonly s?: number;
}> = ({ x, y, v, max, s = 1 }) => (
  <g opacity={s}>
    {[0, 1, 2].map((i) =>
      [0, 1, 2].map((j) => (
        <rect
          key={`${i}${j}`}
          x={x + j * C}
          y={y + i * C}
          width={C - 8}
          height={C - 8}
          rx={10}
          fill={alpha(colors.orange, 0.08 + (0.8 * v(i, j)) / max)}
          stroke={alpha(colors.orange, 0.6)}
          strokeWidth={3}
        />
      )),
    )}
  </g>
);

export const Pure: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("pure");
  const [c0, c1] = cues;
  const left = Math.min(1, springIn(frame, c0 + 10, fps, 10));
  const factor = fadeIn(frame, c0 + 30, 10);
  const right = Math.min(1, springIn(frame, c0 + 60, fps, 10));
  const split = glide(frame, c0 + 100, fps, 24);
  const part1 = fadeOut(frame, c1, 10);
  const ent = glide(frame, c1 + 60, fps, 30);
  const Q = [
    { x: 700, y: 460 },
    { x: 1220, y: 460 },
  ];

  return (
    <SceneShell id="pure">
      <Sfx name="pop" at={c0 + 10} volume={0.16} />
      <Sfx name="ding" at={c0 + 40} />
      <Sfx name="pop" at={c0 + 60} volume={0.16} />
      <Sfx name="scratch" at={c0 + 90} volume={0.2} />
      <Sfx name="whoosh" at={c0 + 100} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 14} volume={0.14} />
      <Sfx name="riser" at={c1 + 60} volume={0.1} />
      <Sfx name="chime" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* a column times a row */}
          <g opacity={left}>
            <Heat x={400} y={360} v={(i, j) => COL[i] * ROW[j]} max={6} />
            <g opacity={factor}>
              {COL.map((n, i) => (
                <text
                  key={i}
                  x={360}
                  y={360 + i * C + 48}
                  fill={colors.primary}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {n}
                </text>
              ))}
              {ROW.map((n, j) => (
                <text
                  key={j}
                  x={400 + j * C + 36}
                  y={330}
                  fill={colors.highlight}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {n}
                </text>
              ))}
            </g>
            <text
              x={520}
              y={680}
              fill={colors.green}
              fontSize={52}
              textAnchor="middle"
              fontWeight={900}
              opacity={factor}
            >
              {tx.pure} ✓
            </text>
          </g>
          {/* the identity, which won't factor */}
          <g opacity={right}>
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${(k - 1) * 290 * split} 0)`}>
                <Heat
                  x={1180}
                  y={360}
                  v={(i, j) => (i === j && i === k ? 1 : 0)}
                  max={1}
                />
              </g>
            ))}
            <text
              x={1300}
              y={680}
              fill={colors.red}
              fontSize={52}
              textAnchor="middle"
              fontWeight={900}
              opacity={fadeIn(frame, c0 + 110)}
            >
              {tx.notPure}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={Q[0].x}
            y1={Q[0].y}
            x2={Q[1].x}
            y2={Q[1].y}
            stroke={colors.primary}
            strokeWidth={8 + 6 * Math.sin(frame * 0.15)}
            opacity={ent}
          />
          {Q.map((q, k) => (
            <g key={k}>
              <circle
                cx={q.x}
                cy={q.y}
                r={150}
                fill={alpha(colors.bgMid, 0.9)}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={5}
              />
              <ellipse
                cx={q.x}
                cy={q.y}
                rx={150}
                ry={40}
                fill="none"
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={3}
              />
              <Arrow
                from={q}
                to={{ x: q.x + (k ? -70 : 80), y: q.y - (k ? 110 : 100) }}
                width={12}
                opacity={1 - ent}
              />
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 680,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontSize: 52,
            fontWeight: 900,
            color: ent > 0.5 ? colors.primary : colors.muted,
            opacity: fadeIn(frame, c1 + 14),
            translate: riseIn(frame, c1 + 14, 12),
          }}
        >
          {ent > 0.5 ? tx.entangled : tx.product}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
