import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { World, type WorldKind } from "../components/worlds";
import { useStrings } from "../i18n";

const KINDS: WorldKind[] = ["loop", "merge", "ghosts"];
const XS = [360, 960, 1560];
const Y = 420;
const STEP = 14;

export const Broken: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("broken");
  const end = cues[3] + 200;

  // Each world takes the spotlight on its line; the others dim.
  const emphasis = (i: number) => {
    const on = cues[i + 1];
    const off = i < 2 ? cues[i + 2] : end;
    return Math.min(ramp(frame, on - 4, 8), 1 - ramp(frame, off - 4, 8));
  };
  const anyOn = Math.max(...KINDS.map((_, i) => emphasis(i)));

  return (
    <SceneShell id="broken">
      {KINDS.map((k, i) => (
        <Sfx key={k} name="pop" at={cues[0] + 6 + i * 8} />
      ))}
      {/* A soft tick each time the token lands on a node. */}
      {KINDS.map((k, i) =>
        Array.from({ length: 6 }).map((_, s) => (
          <Sfx
            key={`${k}-${s}`}
            name="tick"
            at={cues[i + 1] + 10 + (s + 1) * STEP - 2}
            volume={0.18}
          />
        )),
      )}
      <Sfx name="thud" at={cues[2] + 10 + 5 * STEP} volume={0.3} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {KINDS.map((kind, i) => {
            const drop = springIn(frame, cues[0] + 4 + i * 8, fps, 12);
            const e = emphasis(i);
            return (
              <World
                key={kind}
                kind={kind}
                x={XS[i]}
                y={interpolate(drop, [0, 1], [Y - 400, Y])}
                title={tx.worlds[i]}
                frame={frame}
                opacity={Math.min(1, drop) * (1 - 0.6 * anyOn + 0.6 * e)}
                emphasis={e}
                scale={1 + 0.04 * e}
                tokenStart={cues[i + 1] + 10}
                tokenOpacity={e}
                ghostRing={0}
              />
            );
          })}
        </svg>
        {/* The merge gets stuck bouncing between 2 and 3. */}
        <div
          style={{
            position: "absolute",
            left: XS[1] + 40,
            top: Y - 200,
            fontSize: 34,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, cues[2] + 10 + 5 * STEP) * emphasis(1),
          }}
        >
          ↻ {tx.stuck}
        </div>
        {/* Chinese edition: the sexagenary cycle is a loop too. */}
        {tx.loopNote ? (
          <div
            style={{
              position: "absolute",
              left: XS[0] - 270,
              width: 540,
              top: Y + 190,
              textAlign: "center",
              fontSize: 32,
              fontFamily: fonts.title,
              color: colors.highlight,
              opacity: fadeIn(frame, cues[1] + 24) * emphasis(0),
              translate: riseIn(frame, cues[1] + 24, 16),
            }}
          >
            {tx.loopNote}
          </div>
        ) : null}
        {/* The ghosts are never reached. */}
        <div
          style={{
            position: "absolute",
            left: XS[2] + 200,
            top: Y - 150,
            fontSize: 64,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, cues[3] + 50) * emphasis(2),
          }}
        >
          ?
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
