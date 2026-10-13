import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { BuildChain } from "../components/sets";
import { useStrings } from "../i18n";

// "What is 2?" Then build it: an empty box, a box holding it, a box holding both.
const Y = 470;
const XS = [420, 760, 1260];
const LABELS = ["0", "1", "2"];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  const buildAt = [c1 + 8, c2 + 6, c3 + 6];
  // In the last line the row pulls back and a "rules?" frame appears around it.
  const back = glide(frame, c4 + 4, fps, 22);
  const scale = lerp(2.3, 1.7, back);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="chime" at={c0 + 6} />
      <Sfx name="pop" at={buildAt[0]} />
      {[1, 2].map((n) => (
        <Sfx key={n} name="whoosh" at={buildAt[n]} volume={0.14} />
      ))}
      {[1, 2].map((n) => (
        <Sfx
          key={`c${n}`}
          name={PLUCKS[n + 1]}
          at={buildAt[n] + 20}
          volume={0.3}
        />
      ))}
      <Sfx name="page" at={c4 + 20} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 180,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1 - 2, 10),
            scale: springIn(frame, c0 + 4, fps, 10),
          }}
        >
          {tx.whatIsTwo}
        </div>

        {/* An empty box draws itself around the "?" — a hint of what's coming. */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <rect
            x={1010}
            y={330}
            width={170}
            height={220}
            rx={24}
            fill="none"
            stroke={colors.muted}
            strokeWidth={5}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - ramp(frame, c0 + 36, 24)}
            opacity={fadeOut(frame, c1 - 2, 10)}
          />
          <text
            x={XS[0] + 110}
            y={Y + 16}
            fill={colors.muted}
            fontSize={56}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c1 + 40) * fadeOut(frame, c2, 8)}
          >
            = ∅
          </text>
        </svg>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g
            transform={`translate(960 ${Y}) scale(${scale / 2.3}) translate(-960 ${-Y})`}
          >
            <BuildChain
              kind="vn"
              xs={XS}
              y={Y}
              scale={2.3}
              buildAt={buildAt}
              frame={frame}
              fps={fps}
              ease={(f, s) => glide(f, s, fps, 18)}
              grow={(f, s) => springIn(f, s, fps, 11)}
            />
            {LABELS.map((l, n) => (
              <text
                key={l}
                x={XS[n]}
                y={Y + 200}
                fill={colors.text}
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, buildAt[n] + (n === 0 ? 6 : 22))}
              >
                {l}
              </text>
            ))}
          </g>
          {/* Which boxes are allowed? A dashed frame of rules, still empty. */}
          <rect
            x={240}
            y={230}
            width={1440}
            height={430}
            rx={30}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="14 12"
            opacity={fadeIn(frame, c4 + 20)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 170,
            width: "100%",
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 24),
            translate: riseIn(frame, c4 + 24, 16),
          }}
        >
          ?
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
