import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Tower, TOWER_HEIGHT } from "../../shared/components/Tower";
import { useStrings } from "../i18n";

// The season, closed. The number tower from S1E01 drops in with its
// question marks. Floor by floor the "?" pops off, the floor lights up, and
// a tag slides out beside it naming what it does: counting, a ring, a
// field, complete, closed. Then the tower glows whole and the season's
// answer lands across the frame.

const TOP = 150;
const LEFT = 300;
const FLOOR = TOWER_HEIGHT / 5;

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const [c0, c1] = cues;
  const appear = [0, 1, 2, 3, 4].map((i) =>
    glide(frame, c0 + 4 + i * 5, fps, 14),
  );
  const floorAt = (i: number) => c0 + 40 + i * 36;
  const built = [0, 1, 2, 3, 4].map((i) => glide(frame, floorAt(i), fps, 10));
  const question = built.map((b) => 1 - b);
  const answer = Math.min(1, springIn(frame, c1 + 40, fps, 10));
  const slide = glide(frame, c1 + 4, fps, 24);

  return (
    <SceneShell id="tower">
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={i} name={PLUCKS[i]} at={floorAt(i)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="riser" at={c1 + 10} volume={0.12} />
      <Sfx name="chime" at={c1 + 40} />
      <Sfx name="sparkle" at={c1 + 60} />

      <AbsoluteFill
        style={{
          translate: `${lerp(0, -120, slide)}px ${lerp(0, 40, slide)}px`,
          scale: lerp(1, 0.86, slide),
        }}
      >
        <Tower
          appear={appear}
          built={built}
          question={question}
          style={{ position: "absolute", left: LEFT, top: TOP }}
        />
        {tx.floors.map((f, i) => {
          const s = Math.min(1, springIn(frame, floorAt(i) + 6, fps, 10));
          return (
            <div
              key={f}
              style={{
                position: "absolute",
                left: LEFT + 560,
                top: TOP + TOWER_HEIGHT - (i + 1) * FLOOR + 22,
                padding: "10px 28px",
                borderRadius: 18,
                backgroundColor: alpha(colors.violet, 0.9),
                border: `4px solid ${colors.primary}`,
                fontSize: 46,
                fontWeight: 800,
                color: colors.primary,
                opacity: s,
                translate: `${lerp(-80, 0, s)}px 0px`,
              }}
            >
              {f}
            </div>
          );
        })}
      </AbsoluteFill>

      {/* the season's answer */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 120,
          bottom: 180,
        }}
      >
        <div
          style={{
            width: 720,
            textAlign: "right",
            fontFamily: fonts.title,
            fontSize: 84,
            lineHeight: 1.15,
            fontWeight: 900,
            color: colors.text,
            opacity: answer,
            scale: lerp(1.3, 1, answer),
            translate: riseIn(frame, c1 + 40, 20),
            textShadow: `0 0 ${40 * fadeIn(frame, c1 + 60, 20)}px ${alpha(colors.orange, 0.6)}`,
          }}
        >
          {tx.answerLine}
        </div>
        <div
          style={{
            width: 720,
            height: 10,
            marginTop: 30,
            borderRadius: 5,
            backgroundColor: colors.primary,
            scale: `${fadeIn(frame, c1 + 60, 20)} 1`,
            transformOrigin: "right",
            opacity: fadeOut(frame, c1 + 400, 10),
          }}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
