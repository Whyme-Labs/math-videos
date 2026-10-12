import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { NextArrow, NumberNode } from "../../shared/components/graph";
import { useStrings } from "../i18n";

// Chinese edition only: the Qin-dynasty multiplication table from Liye
// (里耶秦简, written on a wooden tablet, starting 九九八十一). Its lines appear
// column by column, read right to left, then shrink aside for the question:
// can all of this come from "next" alone?

const BOARD = { x: 560, y: 120, w: 800, h: 560 };

export const Jiujiu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("jiujiu");
  const [c0, c1] = cues;
  const colAt = (i: number) => c0 + 10 + i * 8;
  const aside = glide(frame, c1 - 2, fps, 22);
  const cols = tx.jiujiu.length;

  return (
    <SceneShell id="jiujiu">
      <Sfx name="page" at={c0 + 4} />
      {tx.jiujiu.map((_, i) => (
        <Sfx key={i} name="scratch" at={colAt(i)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 - 2} volume={0.18} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={`n${i}`} name="tick" at={c1 + 20 + i * 8} volume={0.18} />
      ))}
      <Sfx name="chime" at={c1 + 56} />

      <AbsoluteFill>
        {/* The tablet: dark wood, text in vertical columns, right to left. */}
        <div
          style={{
            position: "absolute",
            left: lerp(BOARD.x, 120, aside),
            top: lerp(BOARD.y, 180, aside),
            width: BOARD.w,
            height: BOARD.h,
            scale: lerp(1, 0.62, aside),
            transformOrigin: "0 0",
            borderRadius: 18,
            backgroundColor: alpha(colors.wood, 0.28),
            border: `3px solid ${alpha(colors.wood, 0.8)}`,
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            padding: "36px 30px",
            opacity: fadeIn(frame, c0 + 2),
            translate: riseIn(frame, c0 + 2, 40),
          }}
        >
          {tx.jiujiu.map((line, i) => (
            <div
              key={line}
              style={{
                writingMode: "vertical-rl",
                fontSize: 58,
                fontFamily: fonts.title,
                letterSpacing: 10,
                color: i === 0 ? colors.primary : colors.paper,
                opacity: fadeIn(frame, colAt(i), 10),
                translate: `0px ${(1 - Math.min(1, springIn(frame, colAt(i), fps, 12))) * -30}px`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: lerp(BOARD.x, 120, aside),
            width: lerp(BOARD.w, BOARD.w * 0.62, aside),
            top: lerp(BOARD.y + BOARD.h + 24, 180 + BOARD.h * 0.62 + 20, aside),
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, colAt(cols - 1)),
          }}
        >
          {tx.liyeSource}
        </div>

        {/* The question: can 0 → next → next … give all of it? */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {[0, 1, 2, 3].map((i) => {
            const s = springIn(frame, c1 + 20 + i * 8, fps, 11);
            const p = { x: 760 + i * 230, y: 300 };
            return (
              <g key={i}>
                {i > 0 ? (
                  <NextArrow
                    a={{ x: p.x - 230, y: p.y }}
                    b={p}
                    progress={Math.min(1, s)}
                  />
                ) : null}
                <NumberNode
                  x={p.x}
                  y={p.y}
                  label={String(i)}
                  scale={Math.min(1, s)}
                  opacity={Math.min(1, s * 2)}
                />
              </g>
            );
          })}
          <text
            x={760 + 3 * 230 + 80}
            y={312}
            fill={colors.muted}
            fontSize={40}
            opacity={fadeIn(frame, c1 + 50)}
          >
            …
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 640,
            right: 80,
            top: 440,
            textAlign: "center",
            fontSize: 60,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 56),
            translate: riseIn(frame, c1 + 56),
          }}
        >
          {tx.fromNext}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
