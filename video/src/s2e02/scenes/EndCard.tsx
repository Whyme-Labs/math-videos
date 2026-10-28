import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: the four words light up in turn on four cards. Teaser for linear
// maps: a box (the machine) with an arrow going in on the left and coming
// out on the right turned a quarter turn; a second arrow goes in, and its
// output is turned too.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const cardAt = (k: number) => c0 + 10 + k * 18;
  const part1 = fadeOut(frame, c1, 10);
  const feed = (k: number) => glide(frame, c1 + 20 + k * 40, fps, 24);
  const BOX = { x: 1160, y: 470 };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {tx.recap.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={cardAt(k)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 110} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {tx.recap.map((w, k) => {
            const s = Math.min(1, springIn(frame, cardAt(k), fps, 10));
            return (
              <g
                key={w}
                opacity={s}
                transform={`translate(${300 + k * 440} 470) scale(${s})`}
              >
                <rect
                  x={-190}
                  y={-90}
                  width={380}
                  height={180}
                  rx={26}
                  fill={alpha(colors.violet, 0.9)}
                  stroke={colors.primary}
                  strokeWidth={5}
                />
                <text
                  y={22}
                  fill={colors.text}
                  fontSize={k === 1 ? 48 : 60}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={900}
                >
                  {w}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the teaser: a machine that turns arrows */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={BOX.x - 150}
            y={BOX.y - 130}
            width={300}
            height={260}
            rx={30}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={6}
          />
          <text
            x={BOX.x}
            y={BOX.y + 30}
            fill={colors.ink}
            fontSize={100}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={900}
          >
            T
          </text>
          {[0, 1].map((k) => {
            const t = feed(k);
            const inLen = [170, 120][k];
            const ang = [-0.35, -1.0][k];
            const ox = lerp(BOX.x - 620, BOX.x - 380, t);
            const oy = BOX.y + 40 - k * 120;
            const out = t >= 0.999;
            return (
              <g key={k}>
                <Arrow
                  from={{ x: ox, y: oy }}
                  to={{
                    x: ox + inLen * Math.cos(ang),
                    y: oy + inLen * Math.sin(ang),
                  }}
                  color={k ? colors.orange : colors.primary}
                  opacity={1 - 0.6 * (out ? 1 : 0)}
                />
                <Arrow
                  from={{ x: BOX.x + 220, y: oy }}
                  to={{
                    x: BOX.x + 220 + inLen * Math.cos(ang - Math.PI / 2),
                    y: oy + inLen * Math.sin(ang - Math.PI / 2),
                  }}
                  color={k ? colors.orange : colors.primary}
                  opacity={out ? fadeIn(frame, c1 + 44 + k * 40, 6) : 0}
                />
              </g>
            );
          })}
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 100),
              translate: riseIn(frame, c1 + 100),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 120) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
