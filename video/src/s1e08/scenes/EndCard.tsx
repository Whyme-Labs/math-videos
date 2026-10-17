import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// A knife and a swarm both fill the hole at √2. Then the teaser for E09:
// the labels "0.999…" and "1" drop onto the same point.

const Y = 340;
const X = 960;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const cut = ramp(frame, c0 + 10, 14);
  const swarm = ramp(frame, c0 + 10, 50);
  const fill = springIn(frame, c0 + 60, fps, 10);
  const drop = (k: number) => glide(frame, c1 + 10 + k * 14, fps, 20);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="scratch" at={c0 + 10} />
      <Sfx name="ding" at={c0 + 60} />
      <Sfx name="pop" at={c1 + 28} />
      <Sfx name="pop" at={c1 + 42} volume={0.3} />
      <Sfx name="chime" at={c1 + 50} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={X - 500}
            y1={Y}
            x2={X + 500}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {/* knife and swarm on the √2 hole */}
          <g opacity={fadeOut(frame, c1, 10)}>
            <line
              x1={X}
              y1={Y - 150}
              x2={X}
              y2={lerp(Y - 150, Y + 30, cut)}
              stroke={colors.highlight}
              strokeWidth={6}
              strokeLinecap="round"
            />
            <polygon
              points={`${X - 18},${Y - 206} ${X + 18},${Y - 206} ${X},${Y - 150}`}
              fill={colors.highlight}
            />
            {Array.from({ length: 10 }).map((_, k) => {
              const side = k % 2 === 0 ? -1 : 1;
              const d = (300 / (1 + Math.floor(k / 2))) * (1 - 0.9 * swarm);
              return (
                <circle
                  key={k}
                  cx={X + side * d}
                  cy={Y}
                  r={8}
                  fill={k % 2 === 0 ? colors.primary : colors.orange}
                />
              );
            })}
            <circle
              cx={X}
              cy={Y}
              r={16 * Math.min(1, fill)}
              fill={colors.highlight}
            />
            <text
              x={X}
              y={Y + 70}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={Math.min(1, fill)}
            >
              √2
            </text>
          </g>
          {/* 0.999… and 1, one point */}
          <g opacity={fadeIn(frame, c1 + 6)}>
            <circle cx={X} cy={Y} r={14} fill={colors.primary} />
            {[
              { l: "0.999…", x0: X - 360 },
              { l: "1", x0: X + 360 },
            ].map((m, k) => {
              const t = drop(k);
              return (
                <g key={m.l}>
                  <rect
                    x={lerp(m.x0, X + (k === 0 ? -150 : 30), t) - 10}
                    y={lerp(Y - 200, Y - 86, t)}
                    width={k === 0 ? 140 : 60}
                    height={54}
                    rx={12}
                    fill={alpha(
                      k === 0 ? colors.highlight : colors.primary,
                      0.18,
                    )}
                    stroke={k === 0 ? colors.highlight : colors.primary}
                    strokeWidth={3}
                  />
                  <text
                    x={
                      lerp(m.x0, X + (k === 0 ? -150 : 30), t) +
                      (k === 0 ? 60 : 20)
                    }
                    y={lerp(Y - 200, Y - 86, t) + 40}
                    fill={colors.text}
                    fontSize={36}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {m.l}
                  </text>
                </g>
              );
            })}
            <text
              x={X}
              y={Y - 140}
              fill={colors.highlight}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c1 + 50)}
            >
              =
            </text>
          </g>
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
