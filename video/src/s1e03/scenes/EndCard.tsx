import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The toolbox is full now: 0, next, +, ×, ≤. Then the next question: what
// is "next" itself made of? (E04 answers with sets: S(n) = n ∪ {n}.)
const SLOT = 150;
const TOOLS = ["0", "next", "+", "×", "≤"];
const slotX = (i: number) => 960 + (i - 2) * (SLOT + 34);
const ROW_Y = 250;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const spin = interpolate(frame, [0, 150], [0, 360]);
  const toolAt = (i: number) => c0 + 4 + i * 8;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {TOOLS.map((t, i) => (
        <Sfx key={t} name={PLUCKS[i]} at={toolAt(i)} volume={0.28} />
      ))}
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="scratch" at={c1 + 30} volume={0.2} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        {TOOLS.map((t, i) => {
          const s = springIn(frame, toolAt(i), fps, 11);
          const isNext = t === "next";
          const pulled = isNext ? springIn(frame, c1 + 6, fps, 10) : 0;
          return (
            <div
              key={t}
              style={{
                position: "absolute",
                left: slotX(i) - SLOT / 2,
                top: ROW_Y - SLOT / 2 - 40 * pulled,
                width: SLOT,
                height: SLOT,
                borderRadius: 28,
                border: `4px solid ${isNext && pulled > 0.5 ? colors.highlight : colors.primary}`,
                backgroundColor: alpha(colors.primary, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: Math.min(1.2, s) * (1 + 0.12 * pulled),
                opacity: Math.min(1, s),
              }}
            >
              {isNext ? (
                <svg
                  width={96}
                  height={96}
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
              ) : (
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 90,
                    color: colors.primary,
                  }}
                >
                  {t}
                </span>
              )}
            </div>
          );
        })}

        {/* What is "next" made of? A peek at E04: S(n) = n ∪ {n}. */}
        <div
          style={{
            position: "absolute",
            left: slotX(1) - 240,
            width: 480,
            top: ROW_Y + 100,
            textAlign: "center",
            fontSize: 40,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 14),
            translate: riseIn(frame, c1 + 14, 16),
          }}
        >
          {tx.madeOf}
        </div>
        <div
          style={{
            position: "absolute",
            top: ROW_Y + 170,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            color: colors.muted,
            minHeight: 60,
          }}
        >
          {typed("S(n) = n ∪ {n}", frame, c1 + 30, fps, 18)}
        </div>

        <AbsoluteFill style={{ top: 560, alignItems: "center", gap: 10 }}>
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
