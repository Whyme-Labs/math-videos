import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Pie } from "../components/pieces";
import { useStrings } from "../i18n";

// 1/2 and 2/4 slide into one blob: one fraction. Then the teaser for E06:
// 3 − 5 has no answer in ℕ, and the pair (3, 5) lights up.
const Y = 300;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const join = glide(frame, c0 + 20, fps, 22);
  const blob = springIn(frame, c0 + 38, fps, 11);
  const pair = springIn(frame, c1 + 40, fps, 10);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 10} volume={0.3} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 40} />
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="chime" at={c1 + 40} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeOut(frame, c1 - 2, 10)}>
            <circle
              cx={960}
              cy={Y}
              r={190 * Math.min(1, blob)}
              fill={alpha(colors.primary, 0.08)}
              stroke={colors.primary}
              strokeWidth={3}
              opacity={Math.min(1, blob)}
            />
            {[
              {
                x: 700,
                parts: 2,
                shaded: 1,
                at: c0 + 4,
                color: colors.primary,
              },
              {
                x: 1220,
                parts: 4,
                shaded: 2,
                at: c0 + 10,
                color: colors.orange,
              },
            ].map((p, i) => {
              const s = Math.min(1, springIn(frame, p.at, fps, 11));
              const x = lerp(p.x, 960 + (i === 0 ? -70 : 70), join);
              return (
                <g
                  key={p.x}
                  opacity={s}
                  transform={`translate(${x} ${Y}) scale(${s * lerp(1, 0.6, join)})`}
                >
                  <Pie
                    cx={0}
                    cy={0}
                    r={100}
                    parts={p.parts}
                    shaded={p.shaded}
                    fill={1}
                    color={p.color}
                  />
                </g>
              );
            })}
            <text
              x={960}
              y={Y + 160}
              fill={colors.primary}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 44)}
            >
              ½
            </text>
          </g>

          {/* 3 − 5 = ? in ℕ, then the pair (3, 5) */}
          <g opacity={fadeIn(frame, c1 + 6)}>
            <text
              x={760}
              y={Y + 30}
              fill={colors.text}
              fontSize={110}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              3 − 5 = ?
            </text>
            <text
              x={760}
              y={Y + 100}
              fill={colors.muted}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              {tx.inN}
            </text>
          </g>
          <text
            x={1300}
            y={Y + 30}
            fill={colors.highlight}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={Math.min(1, pair)}
            transform={`translate(1300 ${Y}) scale(${0.6 + 0.4 * Math.min(1, pair)}) translate(-1300 ${-Y})`}
          >
            (3, 5)
          </text>
        </svg>

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
