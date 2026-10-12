import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { type Pt, Token, tokenPosition } from "../../shared/components/graph";
import {
  MERGE,
  MERGE_BACK,
  MERGE_FORWARD,
  World,
} from "../../shared/components/worlds";
import { useStrings } from "../i18n";
import { RuleCard } from "./Addition";

// Cancellation needs P4: in the merge world from E02, 1 + 1 and 1 + 3 both
// end on 2, so "+ c" can't be undone.
const WX = 1330;
const WY = 430;
const WS = 1.3;
const at = (p: Pt): Pt => ({ x: WX + p.x * WS, y: WY + p.y * WS });
const STEP = 16;

export const Cancel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("cancel");
  const [c0, c1] = cues;
  const aStart = c1 + 8; // 1 + 1: one step, 1 → 2
  const bStart = c1 + 36; // 1 + 3: three steps, 1 → 2 → 3 → 2
  const bNodes = [1, 2, 3, 2];
  const bDone = bStart + 3 * STEP;
  const clash = bDone + 6;
  const stamp = springIn(frame, clash + 10, fps, 9, 240);

  const tokenA = tokenPosition(frame, aStart, STEP, (k) =>
    at(MERGE[k === 0 ? 1 : 2]),
  );
  const tokenB = tokenPosition(
    frame,
    bStart,
    STEP,
    (k) => at(MERGE[bNodes[Math.min(k, 3)]]),
    (k) => (k === 1 ? at(MERGE_FORWARD) : k === 2 ? at(MERGE_BACK) : undefined),
  );

  return (
    <SceneShell id="cancel">
      <Sfx name="page" at={c0 + 2} />
      <Sfx name="pop" at={c0 + 20} />
      <Sfx name="tick" at={aStart + STEP - 2} volume={0.25} />
      {[1, 2, 3].map((k) => (
        <Sfx key={k} name="tick" at={bStart + k * STEP - 2} volume={0.25} />
      ))}
      <Sfx name="thud" at={clash} />
      <Sfx name="thud" at={clash + 10} volume={0.3} />
      <QuestionTray />

      <AbsoluteFill>
        <RuleCard
          tag="P4"
          formula="a + c = b + c  ⇒  a = b"
          x={110}
          y={170}
          at={c0 + 2}
          frame={frame}
          color={colors.orange}
        />
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 270,
            fontFamily: fonts.math,
            fontSize: 34,
            color: colors.muted,
            lineHeight: 1.6,
            opacity: fadeIn(frame, c0 + 24),
            translate: riseIn(frame, c0 + 24, 16),
          }}
        >
          S(a + c) = S(b + c)
          <br />⇒ a + c = b + c{" "}
          <span style={{ color: colors.orange }}>(P4)</span>
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <World
            kind="merge"
            x={WX}
            y={WY}
            scale={WS}
            title={tx.mergeWorld}
            frame={frame}
            opacity={fadeIn(frame, c0 + 20)}
            emphasis={frame >= c1 ? 1 : 0}
          />
          {frame >= aStart ? <Token p={tokenA} /> : null}
          {frame >= bStart ? <Token p={tokenB} color={colors.orange} /> : null}
        </svg>

        {/* The two sums, and the clash */}
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 450,
            fontFamily: fonts.math,
            fontSize: 52,
            lineHeight: 1.5,
          }}
        >
          <div
            style={{
              color: colors.primary,
              opacity: fadeIn(frame, aStart + STEP),
            }}
          >
            1 + 1 = 2
          </div>
          <div style={{ color: colors.orange, opacity: fadeIn(frame, bDone) }}>
            1 + 3 = 2
          </div>
          <div
            style={{
              color: colors.red,
              fontSize: 44,
              opacity: fadeIn(frame, clash),
              translate: `${shake(frame, clash)}px 0px`,
            }}
          >
            ⇒ 1 = 3 ✗
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: WX - 170,
            top: WY + 250,
            padding: "8px 22px",
            borderRadius: 14,
            border: `5px solid ${colors.red}`,
            color: colors.red,
            fontFamily: fonts.title,
            fontWeight: 700,
            fontSize: 40,
            rotate: "-8deg",
            opacity: Math.min(1, stamp),
            scale: interpolate(stamp, [0, 1], [1.7, 1]),
          }}
        >
          {tx.p4Needed}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
