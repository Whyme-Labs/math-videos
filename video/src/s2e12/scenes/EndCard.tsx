import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: the two eigen-lines, with an arrow on each breathing in and out
// (stretching only), and the card diag(5, 2). Teaser: a deck of cards
// shears sideways; its bottom edge glows (the one eigen-direction) and a
// question mark hangs where the second should be.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const breathe = 0.5 + 0.5 * Math.sin((frame - c0) * 0.08);
  const shear = glide(frame, c1 + 20, fps, 40);
  const q = Math.min(1, springIn(frame, c1 + 60, fps, 10));
  const O = { x: 760, y: 500 };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[
            { a: -Math.PI / 4, c: colors.primary, s: 5 },
            { a: Math.atan2(2, 1), c: colors.highlight, s: 2 },
          ].map((l, k) => (
            <g key={k}>
              <line
                x1={O.x - 380 * Math.cos(l.a)}
                y1={O.y - 380 * Math.sin(l.a)}
                x2={O.x + 380 * Math.cos(l.a)}
                y2={O.y + 380 * Math.sin(l.a)}
                stroke={alpha(l.c, 0.5)}
                strokeWidth={6}
              />
              <Arrow
                from={O}
                to={{
                  x: O.x + (60 + l.s * 40 * breathe) * Math.cos(l.a),
                  y: O.y + (60 + l.s * 40 * breathe) * Math.sin(l.a),
                }}
                width={14}
                color={l.c}
              />
            </g>
          ))}
          <g transform="translate(1420 470)">
            <path
              d="M -110 -90 l -20 0 l 0 180 l 20 0 M 110 -90 l 20 0 l 0 180 l -20 0"
              fill="none"
              stroke={colors.green}
              strokeWidth={6}
            />
            {["5", "0", "0", "2"].map((n, k) => (
              <text
                key={k}
                x={-55 + (k % 2) * 110}
                y={-14 + Math.floor(k / 2) * 90}
                fill={
                  k === 1 || k === 2 ? alpha(colors.text, 0.4) : colors.text
                }
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {n}
              </text>
            ))}
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 12 }).map((_, k) => (
            <rect
              key={k}
              x={1180 + k * 22 * shear}
              y={680 - k * 24}
              width={360}
              height={20}
              rx={4}
              fill={k % 2 ? colors.paper : alpha(colors.paper, 0.8)}
              stroke={colors.ink}
              strokeWidth={2}
            />
          ))}
          <line
            x1={1100}
            y1={700}
            x2={1700}
            y2={700}
            stroke={colors.primary}
            strokeWidth={8}
            opacity={shear}
          />
          <g opacity={q} transform={`translate(1660 360) scale(${q})`}>
            <text
              fill={colors.highlight}
              fontSize={140}
              textAnchor="middle"
              fontWeight={900}
            >
              ?
            </text>
          </g>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
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
