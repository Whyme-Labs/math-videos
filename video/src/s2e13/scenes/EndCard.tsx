import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: a 3 × 3 Jordan block, λ down the diagonal in lemon and the nudge
// ones above it in orange, pulsing. Teaser for inner products: two arrows
// from one point with a ruler laid along one of them and a right-angle
// mark that swings as the second arrow turns to meet it.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const pulse = 0.6 + 0.4 * Math.sin((frame - c0) * 0.12);
  const turn = glide(frame, c1 + 20, fps, 40);
  const O = { x: 1200, y: 640 };
  const a2 = lerp(-1.1, -Math.PI / 2, turn);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g transform="translate(960 470)">
            <path
              d="M -200 -170 l -24 0 l 0 340 l 24 0 M 200 -170 l 24 0 l 0 340 l -24 0"
              fill="none"
              stroke={colors.text}
              strokeWidth={6}
            />
            {Array.from({ length: 9 }).map((_, n) => {
              const i = Math.floor(n / 3);
              const j = n % 3;
              const diag = i === j;
              const sup = j === i + 1;
              return (
                <text
                  key={n}
                  x={-120 + j * 120}
                  y={-90 + i * 110}
                  fill={
                    diag
                      ? colors.primary
                      : sup
                        ? colors.orange
                        : alpha(colors.text, 0.25)
                  }
                  fontSize={72}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={sup ? pulse : 1}
                >
                  {diag ? "λ" : sup ? "1" : "0"}
                </text>
              );
            })}
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* a ruler along the first arrow */}
          <rect
            x={O.x}
            y={O.y + 14}
            width={420}
            height={44}
            rx={6}
            fill={alpha(colors.wood, 0.7)}
            stroke={colors.ink}
            strokeWidth={3}
          />
          {Array.from({ length: 11 }).map((_, k) => (
            <line
              key={k}
              x1={O.x + 20 + k * 38}
              y1={O.y + 14}
              x2={O.x + 20 + k * 38}
              y2={O.y + (k % 5 === 0 ? 46 : 34)}
              stroke={colors.ink}
              strokeWidth={3}
            />
          ))}
          <Arrow from={O} to={{ x: O.x + 380, y: O.y }} width={14} />
          <Arrow
            from={O}
            to={{ x: O.x + 320 * Math.cos(a2), y: O.y + 320 * Math.sin(a2) }}
            width={14}
            color={colors.highlight}
          />
          <path
            d={`M ${O.x + 50} ${O.y} L ${O.x + 50} ${O.y - 50} L ${O.x} ${O.y - 50}`}
            fill="none"
            stroke={colors.green}
            strokeWidth={6}
            opacity={turn > 0.95 ? 1 : 0}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
              opacity: fadeIn(frame, c1 + 80),
              translate: riseIn(frame, c1 + 80),
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
