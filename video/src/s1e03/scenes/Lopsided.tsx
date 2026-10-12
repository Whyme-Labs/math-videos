import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { PeelMachine, peelTimes } from "../components/nested";
import { useStrings } from "../i18n";

// Two machines: 3 + 0 finishes at once, 0 + 3 needs three peels.
const LX = 480;
const RX = 1440;
const Y = 470;
const SPACING = 250;
const SCALE = 0.9;

const Header: React.FC<{
  readonly frame: number;
  readonly x: number;
  readonly text: string;
  readonly at: number;
}> = ({ frame, x, text, at }) => (
  <div
    style={{
      position: "absolute",
      left: x - 300,
      width: 600,
      top: 150,
      textAlign: "center",
      fontFamily: fonts.math,
      fontSize: 72,
      opacity: fadeIn(frame, at),
      translate: riseIn(frame, at, 30),
    }}
  >
    {text}
  </div>
);

const Verdict: React.FC<{
  readonly frame: number;
  readonly x: number;
  readonly text: string;
  readonly at: number;
}> = ({ frame, x, text, at }) => (
  <div
    style={{
      position: "absolute",
      left: x - 300,
      width: 600,
      top: 680,
      textAlign: "center",
      fontSize: 40,
      color: colors.green,
      opacity: fadeIn(frame, at),
      translate: riseIn(frame, at, 16),
    }}
  >
    ✓ {text}
  </div>
);

export const Lopsided: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lopsided");
  const [c0, c1, c2, c3] = cues;
  const left = peelTimes(c1 + 6, 0, 26);
  const right = peelTimes(c2 + 4, 3, 24);
  const same = springIn(frame, c3 + 4, fps, 10);

  return (
    <SceneShell id="lopsided">
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 12} />
      <Sfx name="ding" at={left.done} />
      {[0, 1, 2].map((i) => (
        <Sfx
          key={i}
          name={PLUCKS[i + 1]}
          at={right.peel(i) + 14}
          volume={0.3}
        />
      ))}
      <Sfx name="ding" at={right.done} />
      <Sfx name="chime" at={c3 + 4} />
      <QuestionTray />

      <AbsoluteFill>
        <Header frame={frame} x={LX} text="3 + 0" at={c0 + 4} />
        <Header frame={frame} x={RX} text="0 + 3" at={c0 + 12} />
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={960}
            y1={140}
            x2={960}
            y2={740}
            stroke={colors.panelEdge}
            strokeWidth={2}
            strokeDasharray="8 12"
            opacity={fadeIn(frame, c0)}
          />
          <g opacity={fadeIn(frame, c0 + 4)}>
            <PeelMachine
              frame={frame}
              fps={fps}
              x={LX}
              y={Y}
              a={3}
              b={0}
              start={left.move}
              gap={26}
              spacing={SPACING}
              scale={SCALE}
            />
          </g>
          <g opacity={fadeIn(frame, c0 + 12)}>
            <PeelMachine
              frame={frame}
              fps={fps}
              x={RX}
              y={Y}
              a={0}
              b={3}
              start={right.move}
              gap={24}
              spacing={SPACING}
              scale={SCALE}
            />
          </g>
        </svg>
        <Verdict frame={frame} x={LX} text={tx.oneStep} at={left.done + 4} />
        <Verdict
          frame={frame}
          x={RX}
          text={tx.threeSteps}
          at={right.done + 4}
        />
        <div
          style={{
            position: "absolute",
            top: 770,
            width: "100%",
            textAlign: "center",
            fontSize: 48,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: Math.min(1, same),
            scale: 0.85 + 0.15 * Math.min(1, same),
          }}
        >
          {tx.sameAnswer}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
