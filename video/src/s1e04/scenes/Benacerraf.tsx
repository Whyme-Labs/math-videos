import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { NextArrow, NumberNode } from "../../shared/components/graph";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { BOTTOM_Y, ROW_SCALE, ROW_XS, SetBox, TOP_Y } from "../components/sets";
import { useStrings } from "../i18n";

// Which is the real 3? Threads match the two chains (Dedekind), the rows
// slide together and become plain positions 0 → 1 → 2 → 3 → 4.
const MID = 455;
const CHAIN_XS = [...ROW_XS, 1430];

const Row: React.FC<{
  readonly kind: "vn" | "z";
  readonly y0: number;
  readonly merge: number;
  readonly plain: number;
}> = ({ kind, y0, merge, plain }) => (
  <g opacity={1 - plain}>
    {ROW_XS.map((x, n) => {
      const y = lerp(y0, MID, merge);
      return (
        <g
          key={n}
          transform={`translate(${x} ${y}) scale(${ROW_SCALE}) translate(${-x} ${-y})`}
        >
          <SetBox n={n} kind={kind} cx={x} cy={y} />
        </g>
      );
    })}
  </g>
);

export const Benacerraf: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("benacerraf");
  const [c0, c1, c2] = cues;
  const threadAt = (n: number) => c1 + 6 + n * 9;
  const mergeAt = c1 + 48;
  const merge = glide(frame, mergeAt, fps, 22);
  const plain = ramp(frame, mergeAt + 16, 12); // boxes → plain nodes
  const four = springIn(frame, c2 + 6, fps, 10);

  return (
    <SceneShell id="benacerraf">
      <Sfx name="chime" at={c0 + 6} />
      {ROW_XS.map((_, n) => (
        <Sfx key={n} name={PLUCKS[n]} at={threadAt(n) + 6} volume={0.26} />
      ))}
      <Sfx name="whoosh" at={mergeAt} volume={0.2} />
      <Sfx name="ding" at={mergeAt + 24} />
      <Sfx name="pop" at={c2 + 6} />
      <Sfx name="sparkle" at={c2 + 20} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 52,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, mergeAt + 20, 10),
            translate: riseIn(frame, c0 + 4),
          }}
        >
          {tx.realThree}
        </div>
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 14) * fadeOut(frame, mergeAt + 20, 10),
          }}
        >
          {tx.benacerrafTag}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Threads: n ↔ n */}
          {ROW_XS.map((x, n) => {
            const t = ramp(frame, threadAt(n), 10);
            const top = lerp(TOP_Y + 70, MID, merge);
            const bottom = lerp(BOTTOM_Y - 70, MID, merge);
            return t > 0 ? (
              <line
                key={n}
                x1={x}
                y1={top}
                x2={x}
                y2={lerp(top, bottom, t)}
                stroke={colors.highlight}
                strokeWidth={4}
                strokeDasharray="6 8"
                opacity={1 - plain}
              />
            ) : null;
          })}
          <Row kind="vn" y0={TOP_Y} merge={merge} plain={plain} />
          <Row kind="z" y0={BOTTOM_Y} merge={merge} plain={plain} />

          {/* What's left: positions in a chain */}
          <g opacity={plain}>
            {CHAIN_XS.map((x, n) => {
              const show = n < 4 ? 1 : Math.min(1, four);
              const isThree = n === 3 && frame >= c2 + 20;
              return (
                <g key={n} opacity={show}>
                  {n > 0 ? (
                    <NextArrow
                      a={{ x: CHAIN_XS[n - 1], y: MID }}
                      b={{ x, y: MID }}
                      r={44}
                      progress={n < 4 ? 1 : Math.min(1, four)}
                    />
                  ) : null}
                  <NumberNode
                    x={x}
                    y={MID}
                    label={String(n)}
                    r={44}
                    fontSize={44}
                    scale={n < 4 ? 1 : Math.min(1, four)}
                    ring={isThree ? colors.highlight : undefined}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            top: MID + 100,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.green,
            opacity: fadeIn(frame, mergeAt + 24) * fadeOut(frame, c2 + 16, 8),
          }}
        >
          ✓ {tx.sameArithmetic}
        </div>
        <div
          style={{
            position: "absolute",
            left: CHAIN_XS[3] - 250,
            width: 500,
            top: MID + 100,
            textAlign: "center",
            fontSize: 40,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 22),
            translate: riseIn(frame, c2 + 22, 16),
          }}
        >
          {tx.position}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
