import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Unique factorization breaks, and the ideals fix it. 6 sits at the top
// of two trees: 2 × 3 on the left, (1 + √−5)(1 − √−5) on the right. Each of
// the four leaves tries to sprout two smaller branches; they snap back with
// a red ✗. Then four ideal blobs, P, P, Q, Q′, appear underneath and pair
// up two ways: PP and QQ′ under 2 and 3, PQ and PQ′ under the other two.
// The same four pieces, regrouped: unique again.

const TOP = { x: 960, y: 210 };
const LEAVES = [
  { x: 420, l: "2", ideal: ["P", "P"] },
  { x: 740, l: "3", ideal: ["Q", "Q′"] },
  { x: 1180, l: "1 + √−5", ideal: ["P", "Q"] },
  { x: 1560, l: "1 − √−5", ideal: ["P", "Q′"] },
];
const LEAF_Y = 470;
const IDEAL_COLORS: Record<string, string> = {
  P: colors.highlight,
  Q: colors.green,
  "Q′": colors.orange,
};

const Node: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly l: string;
  readonly s?: number;
  readonly color?: string;
  readonly w?: number;
}> = ({ x, y, l, s = 1, color = colors.paper, w }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect
      x={-(w ?? 60 + l.length * 22) / 2}
      y={-44}
      width={w ?? 60 + l.length * 22}
      height={88}
      rx={44}
      fill={color}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      x={0}
      y={16}
      fill={colors.ink}
      fontSize={46}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {l}
    </text>
  </g>
);

export const Breaks: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("breaks");
  const [c0, c1, c2] = cues;
  // the left tree as "2 times 3" is read, the right one on "and also"
  const branchAt = (k: number) => c0 + [50, 60, 120, 130][k];
  const branch = (k: number) => glide(frame, branchAt(k), fps, 14);
  const tryAt = (k: number) => c1 + 10 + k * 16;
  const idealAt = (k: number) => c2 + 30 + k * 14;
  const pair = glide(frame, c2 + 110, fps, 24);

  return (
    <SceneShell id="breaks">
      <Sfx name="pop" at={c0 + 6} volume={0.18} />
      {LEAVES.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={branchAt(k)} volume={0.14} />
      ))}
      {LEAVES.map((_, k) => (
        <Sfx key={`t${k}`} name="scratch" at={tryAt(k) + 10} volume={0.18} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`i${k}`} name="pop" at={idealAt(k)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c2 + 110} volume={0.16} />
      <Sfx name="chime" at={c2 + 136} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={960}
          y1={140}
          x2={960}
          y2={800}
          stroke={alpha(colors.muted, 0.35)}
          strokeWidth={3}
          strokeDasharray="12 10"
          opacity={fadeIn(frame, c0 + 50)}
        />
        {/* the two trees */}
        {LEAVES.map((lf, k) => {
          const t = branch(k);
          // a failed attempt to split further: two twigs grow and snap back
          const tryT =
            Math.max(0, Math.min(1, (frame - tryAt(k)) / 10)) *
            (frame < tryAt(k) + 20 ? 1 : 0);
          const failed = frame >= tryAt(k) + 10;
          return (
            <g key={k}>
              <line
                x1={TOP.x}
                y1={TOP.y + 44}
                x2={lerp(TOP.x, lf.x, t)}
                y2={lerp(TOP.y + 44, LEAF_Y - 44, t)}
                stroke={colors.primary}
                strokeWidth={6}
              />
              {[-1, 1].map((d) => (
                <line
                  key={d}
                  x1={lf.x}
                  y1={LEAF_Y + 44}
                  x2={lf.x + d * 60 * tryT}
                  y2={LEAF_Y + 44 + 70 * tryT}
                  stroke={colors.red}
                  strokeWidth={5}
                />
              ))}
              <g
                transform={`translate(${failed && frame < tryAt(k) + 30 ? shake(frame, tryAt(k) + 10, 8) : 0} 0)`}
                opacity={t}
              >
                <Node x={lf.x} y={LEAF_Y} l={lf.l} />
              </g>
              <text
                x={lf.x}
                y={LEAF_Y + 120}
                fill={colors.red}
                fontSize={50}
                textAnchor="middle"
                fontWeight={800}
                opacity={
                  failed ? fadeIn(frame, tryAt(k) + 10, 6) * (1 - pair) : 0
                }
              >
                ✗
              </text>
            </g>
          );
        })}
        <Node
          x={TOP.x}
          y={TOP.y}
          l="6"
          color={colors.highlight}
          s={Math.min(1, springIn(frame, c0 + 6, fps, 10))}
        />
        {/* the ideals: four pieces, paired two ways */}
        {LEAVES.map((lf, k) =>
          lf.ideal.map((name, j) => {
            const order = ["P", "P", "Q", "Q′"];
            const slot =
              k < 2
                ? k * 2 + j
                : order.indexOf(name) + (name === "P" && k === 3 ? 1 : 0);
            const start = { x: 560 + slot * 260, y: 760 };
            const end = { x: lf.x + (j ? 56 : -56), y: LEAF_Y + 160 };
            const s = Math.min(1, springIn(frame, idealAt(slot), fps, 10));
            return (
              <g key={`${k}${j}`} opacity={s}>
                <circle
                  cx={lerp(start.x, end.x, pair)}
                  cy={lerp(start.y, end.y, pair)}
                  r={lerp(56, 46, pair)}
                  fill={IDEAL_COLORS[name]}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <text
                  x={lerp(start.x, end.x, pair)}
                  y={lerp(start.y, end.y, pair) + 14}
                  fill={colors.ink}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {name}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 700,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 64,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, tryAt(3) + 16) * (1 - fadeIn(frame, c2, 10)),
          translate: riseIn(frame, tryAt(3) + 16, 16),
        }}
      >
        {tx.cantSplit}
      </div>
      <div
        style={{
          position: "absolute",
          top: 730,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 64,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 136),
          translate: riseIn(frame, c2 + 136, 16),
        }}
      >
        {tx.ideals}
      </div>
    </SceneShell>
  );
};
