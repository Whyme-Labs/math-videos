import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { PLUCKS, Sfx } from "../components/Sfx";
import { springIn } from "../components/motion";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

const N = 6;
const SPACING = 200;
const X0 = 960 - ((N - 1) * SPACING) / 2;

const Cup: React.FC = () => (
  <svg width={110} height={100} viewBox="0 0 110 100">
    <path d="M10 20 L90 20 L80 88 Q50 98 20 88 Z" fill={colors.orange} />
    <path
      d="M88 35 Q110 40 104 58 Q98 72 82 70"
      fill="none"
      stroke={colors.orange}
      strokeWidth={8}
    />
  </svg>
);

const Saucer: React.FC = () => (
  <svg width={160} height={50} viewBox="0 0 160 50">
    <ellipse cx={80} cy={25} rx={76} ry={20} fill="#b38cff" />
    <ellipse cx={80} cy={21} rx={44} ry={9} fill="#7c4ddb" />
  </svg>
);

export const Matching: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("matching");
  const words = ["one", "two", "three", "four", "five", "six"];

  return (
    <SceneShell id="matching">
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={i} name="clink" at={cues[1] + i * 14 + 10} />
      ))}
      <Sfx name="ding" at={cues[1] + N * 14 + 25} />
      {words.map((w, i) => (
        <Sfx
          key={w}
          name={PLUCKS[i]}
          at={cues[2] + 20 + i * 12}
          volume={0.25}
        />
      ))}

      <QuestionTray />
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 60,
            opacity: fadeIn(frame, 0),
          }}
        >
          Same number,{" "}
          <span style={{ color: colors.highlight }}>without counting</span>?
        </div>
        {Array.from({ length: N }).map((_, i) => {
          // Cup i drops onto saucer i, one after another.
          const drop = springIn(frame, cues[1] + i * 14, fps, 7, 220);
          return (
            <div key={i}>
              <div
                style={{
                  position: "absolute",
                  left: X0 + i * SPACING - 80,
                  top: 560,
                  opacity: fadeIn(frame, 20 + i * 5),
                }}
              >
                <Saucer />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: X0 + i * SPACING - 55,
                  top: interpolate(drop, [0, 1], [180, 482]),
                  opacity: fadeIn(frame, 30 + i * 5),
                }}
              >
                <Cup />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: X0 + i * SPACING - 80,
                  width: 160,
                  top: 640,
                  textAlign: "center",
                  fontSize: 38,
                  fontFamily: fonts.title,
                  color: colors.highlight,
                  opacity: fadeIn(frame, cues[2] + 20 + i * 12),
                  translate: riseIn(frame, cues[2] + 20 + i * 12, 15),
                }}
              >
                {words[i]}
              </div>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            top: 210,
            width: "100%",
            textAlign: "center",
            fontSize: 44,
            color: colors.green,
            opacity: fadeIn(frame, cues[1] + N * 14 + 25),
          }}
        >
          ✓ nothing left over: equally many
        </div>
        <div
          style={{
            position: "absolute",
            top: 740,
            width: "100%",
            textAlign: "center",
            fontSize: 36,
            color: colors.muted,
            opacity: fadeIn(frame, cues[2] + 110),
          }}
        >
          counting = matching with number words · ↪ E11, E14
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
