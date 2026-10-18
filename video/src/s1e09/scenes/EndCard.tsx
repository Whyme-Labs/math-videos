import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Two name tags, one point, no room between them. Then the teaser for
// E10: the arrow to 1 turns a quarter turn and lands on i.

const C = { x: 960, y: 340 };
const R = 200;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const tag = (k: number) => glide(frame, c0 + 10 + k * 14, fps, 18);
  const part1 = fadeOut(frame, c1, 10);
  const turn = glide(frame, c1 + 24, fps, 30);
  const a = (-Math.PI / 2) * turn;
  const tip = { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} />
      <Sfx name="pop" at={c0 + 24} volume={0.3} />
      <Sfx name="chime" at={c0 + 50} />
      <Sfx name="whoosh" at={c1 + 24} volume={0.16} />
      <Sfx name="ding" at={c1 + 54} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* part one: one point, two names */}
          <g opacity={fadeIn(frame, c0 + 2) * part1}>
            <line
              x1={C.x - 520}
              y1={C.y}
              x2={C.x + 520}
              y2={C.y}
              stroke={colors.muted}
              strokeWidth={4}
            />
            <circle cx={C.x} cy={C.y} r={18} fill={colors.highlight} />
            {[
              { l: "0.999…", w: 170, dx: -200, c: colors.primary },
              { l: "1", w: 70, dx: 40, c: colors.highlight },
            ].map((m, k) => {
              const t = tag(k);
              const x = C.x + m.dx;
              return (
                <g key={m.l} opacity={t}>
                  <line
                    x1={x + m.w / 2}
                    y1={C.y - 96 + 54}
                    x2={C.x}
                    y2={C.y - 18}
                    stroke={m.c}
                    strokeWidth={3}
                  />
                  <rect
                    x={x}
                    y={lerp(C.y - 220, C.y - 96, t)}
                    width={m.w}
                    height={54}
                    rx={12}
                    fill={alpha(m.c, 0.18)}
                    stroke={m.c}
                    strokeWidth={3}
                  />
                  <text
                    x={x + m.w / 2}
                    y={lerp(C.y - 220, C.y - 96, t) + 40}
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
          </g>
          {/* part two: a quarter turn from 1 to i */}
          <g opacity={fadeIn(frame, c1 + 6)}>
            <line
              x1={C.x - 300}
              y1={C.y}
              x2={C.x + 300}
              y2={C.y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            <line
              x1={C.x}
              y1={C.y + 240}
              x2={C.x}
              y2={C.y - 260}
              stroke={alpha(colors.muted, 0.5)}
              strokeWidth={3}
            />
            <path
              d={`M ${C.x + R * 0.45} ${C.y} A ${R * 0.45} ${R * 0.45} 0 0 0 ${C.x + R * 0.45 * Math.cos(a)} ${C.y + R * 0.45 * Math.sin(a)}`}
              fill="none"
              stroke={colors.orange}
              strokeWidth={4}
            />
            <line
              x1={C.x}
              y1={C.y}
              x2={tip.x}
              y2={tip.y}
              stroke={colors.primary}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <circle cx={tip.x} cy={tip.y} r={14} fill={colors.primary} />
            <text
              x={C.x + R}
              y={C.y + 50}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              1
            </text>
            <text
              x={C.x + 40}
              y={C.y - R + 10}
              fill={colors.highlight}
              fontSize={48}
              fontFamily={fonts.math}
              opacity={Math.min(1, springIn(frame, c1 + 54, fps, 10))}
            >
              i
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 440,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: part1,
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.text,
              opacity: fadeIn(frame, c0 + 40),
              translate: riseIn(frame, c0 + 40, 16),
            }}
          >
            {tx.isName}
          </div>
          <div
            style={{
              fontSize: 40,
              color: colors.highlight,
              opacity: fadeIn(frame, c0 + 56),
              translate: riseIn(frame, c0 + 56, 16),
            }}
          >
            {tx.noRoom}
          </div>
        </div>

        <AbsoluteFill style={{ top: 640, alignItems: "center", gap: 10 }}>
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
