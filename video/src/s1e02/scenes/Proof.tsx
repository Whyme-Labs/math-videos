import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  ramp,
  shake,
  springIn,
  typed,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { NextArrow, NumberNode } from "../components/graph";
import { useStrings } from "../i18n";

const N = 8;
const Y = 400;
const GHOST_Y = 680;
const x = (i: number) => 260 + i * 200;
const gx = (i: number) => 260 + i * 200;

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("proof");
  const [c0, c1, c2, c3, c4] = cues;

  // Node i joins A at join(i): 0 by the base case, the rest one step at a time.
  const join = (i: number) => (i === 0 ? c2 + 6 : c2 + 24 + (i - 1) * 12);
  const joined = (i: number) => frame >= join(i);
  // A's right edge follows the last node that joined, then takes in "…".
  let last = -1;
  for (let i = 0; i < N; i++) if (joined(i)) last = i;
  const edgeTarget = last < 0 ? x(0) + 60 : x(last) + 60;
  const toEnd = glide(frame, c3 + 2, fps, 18);
  const rightEdge = interpolate(toEnd, [0, 1], [edgeTarget, 1840]);
  const aIn = springIn(frame, c1 + 4, fps, 12);
  const ghostIn = fadeIn(frame, c4 + 4, 14);
  const qed = springIn(frame, c3 + 10, fps, 9);

  return (
    <SceneShell id="proof">
      <Sfx name="scratch" at={c0 + 4} />
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={`n${i}`} name="tick" at={c0 + 30 + i * 5} volume={0.12} />
      ))}
      <Sfx name="pop" at={c1 + 4} />
      <Sfx name="ding" at={join(0)} volume={0.25} />
      {Array.from({ length: N - 1 }).map((_, k) => (
        <Sfx
          key={`j${k}`}
          name={k < 6 ? PLUCKS[k] : "tick"}
          at={join(k + 1)}
          volume={0.28}
        />
      ))}
      <Sfx name="sparkle" at={c3 + 10} />
      <Sfx name="pop" at={c4 + 6} volume={0.25} />
      <Sfx name="thud" at={c4 + 34} />
      <QuestionTray />

      <AbsoluteFill>
        {/* The claim, typed out. */}
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.text,
            minHeight: 60,
          }}
        >
          {typed(tx.claim, frame, c0 + 2, fps, 34)}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* The set A, growing to the right as numbers join. */}
          <g opacity={Math.min(1, aIn)}>
            <rect
              x={200}
              y={Y - 90}
              width={Math.max(0, (rightEdge - 200) * Math.min(1, aIn))}
              height={180}
              rx={40}
              fill={alpha(colors.primary, 0.1)}
              stroke={colors.primary}
              strokeWidth={3}
              strokeDasharray="14 10"
            />
            <text
              x={214}
              y={Y - 106}
              fill={colors.primary}
              fontSize={44}
              fontFamily={fonts.math}
            >
              A
            </text>
          </g>
          <text
            x={1690}
            y={Y - 106}
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.math}
            textAnchor="end"
            opacity={fadeIn(frame, c1 + 14)}
          >
            A = {"{0}"} ∪ {"{ S(m) }"}
          </text>

          {Array.from({ length: N }).map((_, i) => {
            const s = springIn(frame, c0 + 30 + i * 5, fps, 12);
            // A little bump as the node joins A.
            const bump = 0.2 * Math.sin(Math.PI * ramp(frame, join(i), 10));
            return (
              <g key={i}>
                {i > 0 ? (
                  <NextArrow
                    a={{ x: x(i - 1), y: Y }}
                    b={{ x: x(i), y: Y }}
                    progress={Math.min(1, s)}
                    color={joined(i) ? colors.green : colors.highlight}
                    width={joined(i) ? 6 : 4}
                  />
                ) : null}
                <NumberNode
                  x={x(i)}
                  y={Y}
                  label={String(i)}
                  scale={Math.min(1, s) * (1 + bump)}
                  color={joined(i) ? colors.green : colors.primary}
                />
              </g>
            );
          })}
          <text
            x={x(N - 1) + 70}
            y={Y + 12}
            fill={colors.muted}
            fontSize={40}
            opacity={fadeIn(frame, c0 + 70)}
          >
            …
          </text>

          {/* Base case and step, as labels under the chain. */}
          <text
            x={x(0)}
            y={Y + 140}
            fill={colors.green}
            fontSize={34}
            fontFamily={fonts.math}
            textAnchor="middle"
            opacity={fadeIn(frame, join(0) + 4)}
          >
            0 ∈ A
          </text>
          <text
            x={(x(2) + x(4)) / 2}
            y={Y + 140}
            fill={colors.green}
            fontSize={34}
            fontFamily={fonts.math}
            textAnchor="middle"
            opacity={fadeIn(frame, join(1) + 4)}
          >
            n ∈ A ⇒ S(n) ∈ A
          </text>

          {/* The ghost chain: 0′ is outside A, and nothing points to it. */}
          <g opacity={ghostIn}>
            {[0, 1, 2, 3, 4].map((i) => (
              <g
                key={i}
                transform={
                  i === 0 ? `translate(${shake(frame, c4 + 34)} 0)` : undefined
                }
              >
                {i > 0 ? (
                  <NextArrow
                    a={{ x: gx(i - 1), y: GHOST_Y }}
                    b={{ x: gx(i), y: GHOST_Y }}
                    color={colors.muted}
                    dashed
                  />
                ) : null}
                <NumberNode
                  x={gx(i)}
                  y={GHOST_Y}
                  label={`${i}′`}
                  color={colors.muted}
                  ring={
                    i === 0
                      ? alpha(colors.red, ramp(frame, c4 + 30, 8))
                      : undefined
                  }
                />
              </g>
            ))}
            <text
              x={gx(4) + 70}
              y={GHOST_Y + 12}
              fill={colors.muted}
              fontSize={40}
            >
              …
            </text>
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: Y + 170,
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            color: colors.primary,
            opacity: Math.min(1, qed) * (1 - ghostIn * 0.7),
            scale: qed,
          }}
        >
          {tx.allNumbers}
        </div>
        <div
          style={{
            position: "absolute",
            left: gx(0) + 260,
            top: GHOST_Y + 50,
            fontSize: 32,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 36),
            translate: riseIn(frame, c4 + 36, 16),
          }}
        >
          ✗ {tx.ghostNote}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
