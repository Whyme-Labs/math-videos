import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

const SLOT = 190;
const slotX = (i: number) => 960 + (i - 1.5) * (SLOT + 40);
const ROW_Y = 340;

// The toolbox so far: 0 and next. Two empty slots wait for + and ×.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const spin = interpolate(frame, [0, 150], [0, 360]);
  const tryOp = (i: number) => c1 + 10 + i * 18; // + then × try to appear

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 14} />
      {[0, 1].map((i) => (
        <Sfx key={i} name="thud" at={tryOp(i) + 10} volume={0.3} />
      ))}
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        {[0, 1, 2, 3].map((i) => {
          const filled = i < 2;
          const s = springIn(
            frame,
            filled ? c0 + 4 + i * 10 : c0 + 24 + i * 6,
            fps,
            11,
          );
          const op = i - 2; // 0: +, 1: ×
          const attempt = filled ? 0 : springIn(frame, tryOp(op), fps, 9);
          const failed = !filled && frame >= tryOp(op) + 10;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: slotX(i) - SLOT / 2,
                top: ROW_Y - SLOT / 2,
                width: SLOT,
                height: SLOT,
                borderRadius: 32,
                border: `4px ${filled ? "solid" : "dashed"} ${filled ? colors.primary : colors.panelEdge}`,
                backgroundColor: filled
                  ? alpha(colors.primary, 0.1)
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: Math.min(1.2, s),
                opacity: Math.min(1, s),
                translate: filled
                  ? undefined
                  : `${shake(frame, tryOp(op) + 10, 12)}px 0px`,
              }}
            >
              {i === 0 ? (
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 110,
                    color: colors.primary,
                  }}
                >
                  0
                </span>
              ) : null}
              {i === 1 ? (
                <svg
                  width={120}
                  height={120}
                  viewBox="0 0 130 130"
                  style={{ rotate: `${spin}deg` }}
                >
                  <path
                    d="M 65 15 A 50 50 0 1 1 20 45"
                    fill="none"
                    stroke={colors.highlight}
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <polygon points="65,0 65,30 90,15" fill={colors.highlight} />
                </svg>
              ) : null}
              {!filled ? (
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 110,
                    color: failed ? colors.highlight : colors.text,
                    opacity: Math.min(1, attempt),
                    scale: attempt,
                  }}
                >
                  {failed ? "?" : op === 0 ? "+" : "×"}
                </span>
              ) : null}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: slotX(1) - SLOT / 2,
            width: SLOT,
            top: ROW_Y + SLOT / 2 + 16,
            textAlign: "center",
            fontSize: 30,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 16),
          }}
        >
          {tx.nextWord}
        </div>

        <AbsoluteFill style={{ top: 580, alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontSize: 40,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
