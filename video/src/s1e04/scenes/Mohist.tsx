import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only: 《墨子·经下》 "以言为尽悖，悖。说在其言。"
// Saying "every statement is false" defeats itself, because it is a
// statement too. Shown as bamboo slips, then a speech bubble whose arrow
// loops back into itself.

const SLATS = 3;
const SLAT_W = 110;
const SLAT_X = (i: number) => 520 - i * (SLAT_W + 18); // read right to left
const SLAT_Y = 170;
const SLAT_H = 520;
const BUBBLE = { x: 1000, y: 280, w: 640, h: 150 };

export const Mohist: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("mohist");
  const [c0, c1] = cues;
  const slatAt = (i: number) => c0 + 6 + i * 10;
  const loop = ramp(frame, c1 + 18, 22);
  const stampAt = c1 + 44;
  const stamp = springIn(frame, stampAt, fps, 9, 240);

  return (
    <SceneShell id="mohist">
      {Array.from({ length: SLATS }).map((_, i) => (
        <Sfx key={i} name="page" at={slatAt(i)} volume={0.2} />
      ))}
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="scratch" at={c1 + 18} volume={0.25} />
      <Sfx name="thud" at={stampAt} />

      <AbsoluteFill>
        {/* Bamboo slips */}
        {tx.mohistText.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLAT_X(i),
              top: SLAT_Y,
              width: SLAT_W,
              height: SLAT_H,
              borderRadius: 14,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 30,
              opacity: fadeIn(frame, slatAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slatAt(i), fps, 12))) * -60}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 64,
                letterSpacing: 12,
                color: i === 1 ? colors.highlight : colors.paper,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLAT_X(SLATS - 1) - 40,
            width: SLAT_X(0) + SLAT_W - SLAT_X(SLATS - 1) + 80,
            top: SLAT_Y + SLAT_H + 24,
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, slatAt(SLATS - 1) + 6),
          }}
        >
          {tx.mohistSource}
        </div>

        {/* The statement that points at itself */}
        <div
          style={{
            position: "absolute",
            left: BUBBLE.x,
            top: BUBBLE.y,
            width: BUBBLE.w,
            height: BUBBLE.h,
            borderRadius: 40,
            backgroundColor: alpha(colors.text, 0.92),
            color: colors.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c1 + 6),
            scale: springIn(frame, c1 + 6, fps, 11),
            translate: `${frame >= stampAt ? shake(frame, stampAt, 12) : 0}px 0px`,
          }}
        >
          {tx.allFalse}
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Arrow from under the bubble, round, and back into it */}
          <path
            d={`M ${BUBBLE.x + BUBBLE.w / 2} ${BUBBLE.y + BUBBLE.h + 10} C ${BUBBLE.x + BUBBLE.w / 2} ${BUBBLE.y + BUBBLE.h + 220}, ${BUBBLE.x + BUBBLE.w + 160} ${BUBBLE.y + BUBBLE.h + 160}, ${BUBBLE.x + BUBBLE.w + 20} ${BUBBLE.y + BUBBLE.h / 2}`}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - loop}
          />
          <polygon
            points={`${BUBBLE.x + BUBBLE.w + 6},${BUBBLE.y + BUBBLE.h / 2} ${BUBBLE.x + BUBBLE.w + 34},${BUBBLE.y + BUBBLE.h / 2 - 16} ${BUBBLE.x + BUBBLE.w + 34},${BUBBLE.y + BUBBLE.h / 2 + 16}`}
            fill={colors.highlight}
            opacity={loop >= 1 ? 1 : 0}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: BUBBLE.x + BUBBLE.w / 2 - 110,
            top: BUBBLE.y + BUBBLE.h + 120,
            width: 220,
            height: 160,
            borderRadius: 24,
            border: `8px solid ${colors.red}`,
            color: colors.red,
            fontFamily: fonts.title,
            fontWeight: 700,
            fontSize: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            rotate: "-10deg",
            opacity: Math.min(1, stamp),
            scale: interpolate(stamp, [0, 1], [1.8, 1]),
          }}
        >
          {tx.selfDefeating}
        </div>
        <div
          style={{
            position: "absolute",
            left: BUBBLE.x,
            width: BUBBLE.w,
            top: 140,
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 20),
            translate: riseIn(frame, c0 + 20, 16),
          }}
        >
          ↩ R ∈ R ⇔ R ∉ R
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
