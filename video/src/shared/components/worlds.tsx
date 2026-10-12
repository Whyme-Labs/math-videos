import type React from "react";
import { alpha, colors, fonts } from "../theme";
import { NextArrow, NumberNode, type Pt, Token, tokenPosition } from "./graph";

// The three broken worlds of "zero and next": a loop, a merge (ρ), and a
// ghost chain. Coordinates are relative to the world's centre.

export type WorldKind = "loop" | "merge" | "ghosts";

const R = 30;
const FONT = 28;

const LOOP: Pt[] = [
  { x: -120, y: 70 },
  { x: 0, y: -90 },
  { x: 120, y: 70 },
];
export const MERGE: Pt[] = [
  { x: -200, y: 60 },
  { x: -85, y: 60 },
  { x: 30, y: 60 },
  { x: 150, y: -60 },
];
export const MERGE_FORWARD = { x: 130, y: 60 }; // bend of 2 → 3
export const MERGE_BACK = { x: 40, y: -70 }; // bend of 3 → 2
const realNode = (i: number): Pt => ({ x: -205 + i * 98, y: 75 });
const ghostNode = (i: number): Pt => ({ x: -205 + i * 98, y: -70 });

const mergeIndex = (k: number) => (k < 2 ? k : k % 2 === 0 ? 2 : 3);

// Where a counting token is after `frame - start` frames in each world.
export const worldToken = (
  kind: WorldKind,
  frame: number,
  start: number,
  stepFrames = 14,
) => {
  if (kind === "loop")
    return tokenPosition(frame, start, stepFrames, (k) => LOOP[k % 3]);
  if (kind === "merge")
    return tokenPosition(
      frame,
      start,
      stepFrames,
      (k) => MERGE[mergeIndex(k)],
      (k) =>
        mergeIndex(k) === 3
          ? MERGE_BACK
          : mergeIndex(k) === 2 && k >= 2
            ? MERGE_FORWARD
            : undefined,
    );
  // Ghosts: walk the real chain up to the edge of the panel; the ghost chain is never reached.
  return tokenPosition(frame, start, stepFrames, (k) =>
    realNode(Math.min(k, 4)),
  );
};

export const World: React.FC<{
  readonly kind: WorldKind;
  readonly x: number;
  readonly y: number;
  readonly title: string;
  readonly frame: number;
  readonly scale?: number;
  readonly opacity?: number;
  readonly emphasis?: number; // 0..1: lights the panel
  readonly tokenStart?: number; // frame the counting token starts walking
  readonly tokenOpacity?: number;
  readonly broken?: number; // 0..1: the bad arrow (or the ghost chain) falls away
  readonly verdict?: number; // 0..1: shows a red ✗ (after breaking)
  readonly ghostRing?: number; // 0..1: ring around 0′
}> = ({
  kind,
  x,
  y,
  title,
  frame,
  scale = 1,
  opacity = 1,
  emphasis = 0,
  tokenStart,
  tokenOpacity = 1,
  broken = 0,
  verdict = 0,
  ghostRing = 0,
}) => {
  const fall = `translate(0 ${broken * 90}) rotate(${broken * 25})`;
  const badColor = broken > 0 ? colors.red : colors.highlight;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <rect
        x={-270}
        y={-170}
        width={540}
        height={330}
        rx={24}
        fill={alpha(colors.primary, 0.03 + 0.06 * emphasis)}
        stroke={emphasis > 0.5 ? colors.primary : colors.panelEdge}
        strokeWidth={2 + 2 * emphasis}
      />
      <text
        x={-245}
        y={-128}
        fill={emphasis > 0.5 ? colors.primary : colors.muted}
        fontSize={30}
        fontFamily={fonts.title}
        letterSpacing={2}
      >
        {title}
      </text>

      {kind === "loop" ? (
        <>
          <NextArrow a={LOOP[0]} b={LOOP[1]} r={R} />
          <NextArrow a={LOOP[1]} b={LOOP[2]} r={R} />
          <g transform={fall} opacity={1 - broken}>
            <NextArrow a={LOOP[2]} b={LOOP[0]} r={R} color={badColor} />
          </g>
          {LOOP.map((p, i) => (
            <NumberNode
              key={i}
              x={p.x}
              y={p.y}
              label={String(i)}
              r={R}
              fontSize={FONT}
            />
          ))}
        </>
      ) : null}

      {kind === "merge" ? (
        <>
          <NextArrow a={MERGE[0]} b={MERGE[1]} r={R} />
          <NextArrow a={MERGE[1]} b={MERGE[2]} r={R} />
          <NextArrow a={MERGE[2]} b={MERGE[3]} ctrl={MERGE_FORWARD} r={R} />
          <g transform={fall} opacity={1 - broken}>
            <NextArrow
              a={MERGE[3]}
              b={MERGE[2]}
              ctrl={MERGE_BACK}
              r={R}
              color={badColor}
            />
          </g>
          {MERGE.map((p, i) => (
            <NumberNode
              key={i}
              x={p.x}
              y={p.y}
              label={String(i)}
              r={R}
              fontSize={FONT}
            />
          ))}
        </>
      ) : null}

      {kind === "ghosts" ? (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              {i > 0 ? (
                <NextArrow a={realNode(i - 1)} b={realNode(i)} r={R} />
              ) : null}
              <NumberNode
                x={realNode(i).x}
                y={realNode(i).y}
                label={String(i)}
                r={R}
                fontSize={FONT}
              />
            </g>
          ))}
          <text
            x={realNode(4).x + 50}
            y={realNode(4).y + 10}
            fill={colors.muted}
            fontSize={30}
          >
            …
          </text>
          {/* The ghost chain: translucent, bobbing slowly, never reached. */}
          <g
            opacity={(0.55 + 0.45 * emphasis) * (1 - broken)}
            transform={`translate(0 ${Math.sin(frame / 40) * 5 - broken * 120})`}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                {i > 0 ? (
                  <NextArrow
                    a={ghostNode(i - 1)}
                    b={ghostNode(i)}
                    r={R}
                    color={colors.muted}
                    dashed
                  />
                ) : null}
                <NumberNode
                  x={ghostNode(i).x}
                  y={ghostNode(i).y}
                  label={`${i}′`}
                  r={R}
                  fontSize={FONT}
                  color={colors.muted}
                  ring={
                    i === 0 && ghostRing > 0
                      ? alpha(colors.red, ghostRing)
                      : undefined
                  }
                />
              </g>
            ))}
            <text
              x={ghostNode(4).x + 50}
              y={ghostNode(4).y + 10}
              fill={colors.muted}
              fontSize={30}
            >
              …
            </text>
          </g>
        </>
      ) : null}

      {tokenStart !== undefined && frame >= tokenStart ? (
        <Token p={worldToken(kind, frame, tokenStart)} opacity={tokenOpacity} />
      ) : null}

      {verdict > 0 ? (
        <text
          x={230}
          y={-110}
          fill={colors.red}
          fontSize={64}
          fontWeight={700}
          textAnchor="middle"
          opacity={Math.min(1, verdict)}
          transform={`translate(230 -130) scale(${verdict}) translate(-230 130)`}
        >
          ✗
        </text>
      ) : null}
    </g>
  );
};
