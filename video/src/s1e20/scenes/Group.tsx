import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Ladder } from "../components/ladder";
import { useStrings } from "../i18n";

// The group. The three roots of x³ = 2 sit on a circle: ∛2 and its two
// complex partners. Every one cubes to 2, so a shuffle can't tell them
// apart: the triangle turns a third, then flips. Six shuffles, shown as
// six little triangles: its group. Then three ladders, for degrees 2, 3, 4:
// a climber drops rung by rung (each step a root sign) and reaches {e}.

const C = { x: 620, y: 460, r: 210 };
const ROOT_COLORS = [colors.primary, colors.highlight, colors.green];
// the six shuffles of three, as slot orders
const PERMS = [
  [0, 1, 2],
  [1, 2, 0],
  [2, 0, 1],
  [0, 2, 1],
  [2, 1, 0],
  [1, 0, 2],
];

const LADDERS = [
  { rungs: ["2", "1"], steps: ["√"] },
  { rungs: ["6", "3", "1"], steps: ["√", "∛"] },
  { rungs: ["24", "12", "4", "1"], steps: ["√", "∛", "√ √"] },
];

export const Group: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("group");
  const [c0, c1] = cues;
  const turn = glide(frame, c0 + 30, fps, 22);
  const flip = glide(frame, c0 + 76, fps, 22);
  const cardAt = (k: number) => c0 + 110 + k * 8;
  const part1 = fadeOut(frame, c1, 10);
  const ladderAt = (k: number) => c1 + 20 + k * 34;

  // root i sits at angle 120·i, turned by the rotation, mirrored by the flip
  const rootAt = (i: number) => {
    const a = ((i * 120 + 120 * turn) * Math.PI) / 180;
    const y = Math.sin(a) * lerp(1, -1, flip);
    return { x: C.x + C.r * Math.cos(a), y: C.y - C.r * y };
  };

  return (
    <SceneShell id="group">
      <Sfx name="whoosh" at={c0 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 76} volume={0.14} />
      {PERMS.map((_, k) => (
        <Sfx key={k} name="tick" at={cardAt(k)} volume={0.1} />
      ))}
      <Sfx name="ding" at={cardAt(5) + 16} />
      {LADDERS.map((l, k) =>
        l.steps.map((_, i) => (
          <Sfx
            key={`${k}${i}`}
            name={PLUCKS[(k + i) % PLUCKS.length]}
            at={ladderAt(k) + 10 + i * 16}
            volume={0.14}
          />
        )),
      )}
      <Sfx name="chime" at={ladderAt(2) + 70} />

      {/* the roots of x³ = 2, and their shuffles */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={C.x}
            cy={C.y}
            r={C.r}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={4}
            strokeDasharray="10 12"
          />
          <line
            x1={C.x - C.r - 60}
            y1={C.y}
            x2={C.x + C.r + 60}
            y2={C.y}
            stroke={alpha(colors.muted, 0.5)}
            strokeWidth={3}
          />
          <polygon
            points={[0, 1, 2]
              .map((i) => `${rootAt(i).x},${rootAt(i).y}`)
              .join(" ")}
            fill={alpha(colors.violet, 0.5)}
            stroke={colors.primary}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 10)}
          />
          {[0, 1, 2].map((i) => {
            const p = rootAt(i);
            const s = Math.min(1, springIn(frame, c0 + 6 + i * 6, fps, 10));
            return (
              <g key={i} transform={`translate(${p.x} ${p.y}) scale(${s})`}>
                <circle
                  r={34}
                  fill={ROOT_COLORS[i]}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
              </g>
            );
          })}
          <text
            x={C.x}
            y={C.y - C.r - 70}
            fill={colors.text}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 6)}
          >
            r³ = 2
          </text>
          {/* the six shuffles */}
          {PERMS.map((perm, k) => {
            const s = Math.min(1, springIn(frame, cardAt(k), fps, 10));
            const x = 1180 + (k % 3) * 190;
            const y = 330 + Math.floor(k / 3) * 200;
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(${x} ${y}) scale(${s})`}
              >
                <rect
                  x={-80}
                  y={-80}
                  width={160}
                  height={160}
                  rx={20}
                  fill={alpha(colors.violet, 0.8)}
                  stroke={colors.primary}
                  strokeWidth={3}
                />
                {perm.map((root, slot) => {
                  const a = (slot * 120 * Math.PI) / 180;
                  return (
                    <circle
                      key={slot}
                      cx={46 * Math.cos(a)}
                      cy={-46 * Math.sin(a)}
                      r={18}
                      fill={ROOT_COLORS[root]}
                      stroke={colors.ink}
                      strokeWidth={3}
                    />
                  );
                })}
              </g>
            );
          })}
          <text
            x={1370}
            y={210}
            fill={colors.primary}
            fontSize={60}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, cardAt(5) + 16)}
          >
            {tx.groupWord}
          </text>
        </svg>
      </AbsoluteFill>

      {/* degrees 2, 3, 4: the ladder reaches the bottom */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {LADDERS.map((l, k) => {
            const steps = l.steps.length;
            const down = l.steps.reduce(
              (a, _, i) => a + glide(frame, ladderAt(k) + 10 + i * 16, fps, 12),
              0,
            );
            return (
              <Ladder
                key={k}
                x={520 + k * 460}
                top={220}
                bottom={660}
                rungs={l.rungs}
                steps={l.steps}
                down={down}
                label={tx.ladderLabels[k]}
                ok={
                  down >= steps - 0.01
                    ? fadeIn(frame, ladderAt(k) + 10 + steps * 16, 6)
                    : 0
                }
                opacity={fadeIn(frame, ladderAt(k) - 10, 8)}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
