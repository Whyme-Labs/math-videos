import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../components/vec";
import { useStrings } from "../i18n";

// Recap: an arrow, then a second one added tip to tail, then the sum
// stretched: the two moves. Teaser for dimension: an arrow on a grid
// reads (3, 2); the grid turns under it and the two numbers change, but
// there are still two of them.

const O = { x: 1300, y: 600 };
const VEC = { x: 3, y: 2 };
const STEP = 90;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const v2 = glide(frame, c0 + 30, fps, 18);
  const stretch = lerp(1, 1.5, glide(frame, c0 + 70, fps, 18));
  const part1 = fadeOut(frame, c1, 10);
  const turn = glide(frame, c1 + 40, fps, 40) * 30; // degrees
  const th = (turn * Math.PI) / 180;
  // coordinates of VEC in the turned grid
  const cx = VEC.x * Math.cos(th) + VEC.y * Math.sin(th);
  const cy = -VEC.x * Math.sin(th) + VEC.y * Math.cos(th);
  const tip = { x: O.x + VEC.x * STEP, y: O.y - VEC.y * STEP };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pluck1" at={c0 + 10} volume={0.16} />
      <Sfx name="pluck3" at={c0 + 30} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 70} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.14} />
      <Sfx name="ding" at={c1 + 84} />
      <Sfx name="sparkle" at={c1 + 110} />

      {/* the two moves */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {(() => {
            const o = { x: 700, y: 640 };
            const u = { x: 260 * stretch, y: -40 * stretch };
            const v = { x: 100 * stretch, y: -200 * stretch };
            return (
              <g opacity={fadeIn(frame, c0 + 6)}>
                <Arrow from={o} to={{ x: o.x + u.x, y: o.y + u.y }} />
                <Arrow
                  from={{ x: o.x + u.x, y: o.y + u.y }}
                  to={{ x: o.x + u.x + v.x * v2, y: o.y + u.y + v.y * v2 }}
                  opacity={v2 > 0 ? 1 : 0}
                />
                <Arrow
                  from={o}
                  to={{ x: o.x + u.x + v.x, y: o.y + u.y + v.y }}
                  color={colors.orange}
                  opacity={fadeIn(frame, c0 + 50)}
                />
              </g>
            );
          })()}
          {[
            { t: "+", at: c0 + 30, x: 1360 },
            { t: "×", at: c0 + 70, x: 1520 },
          ].map((m) => {
            const s = Math.min(1, springIn(frame, m.at, fps, 10));
            return (
              <g
                key={m.t}
                opacity={s}
                transform={`translate(${m.x} 380) scale(${s})`}
              >
                <circle
                  r={70}
                  fill={colors.primary}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
                <text
                  y={34}
                  fill={colors.ink}
                  fontSize={100}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={900}
                >
                  {m.t}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the teaser: same arrow, turning grid, still two numbers */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="gridclip">
              <circle cx={O.x + 100} cy={O.y - 120} r={380} />
            </clipPath>
          </defs>
          <g clipPath="url(#gridclip)">
            <g transform={`rotate(${-turn} ${O.x} ${O.y})`}>
              {Array.from({ length: 13 }).map((_, i) => (
                <g key={i}>
                  <line
                    x1={O.x + (i - 6) * STEP}
                    y1={O.y - 600}
                    x2={O.x + (i - 6) * STEP}
                    y2={O.y + 600}
                    stroke={alpha(colors.paper, i === 6 ? 0.5 : 0.15)}
                    strokeWidth={i === 6 ? 4 : 2}
                  />
                  <line
                    x1={O.x - 600}
                    y1={O.y + (i - 6) * STEP}
                    x2={O.x + 600}
                    y2={O.y + (i - 6) * STEP}
                    stroke={alpha(colors.paper, i === 6 ? 0.5 : 0.15)}
                    strokeWidth={i === 6 ? 4 : 2}
                  />
                </g>
              ))}
            </g>
          </g>
          <Arrow from={O} to={tip} />
          <text
            x={tip.x + 30}
            y={tip.y - 20}
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ({cx.toFixed(turn > 0.01 ? 1 : 0)},{" "}
            {cy.toFixed(turn > 0.01 ? 1 : 0)})
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 84),
              translate: riseIn(frame, c1 + 84),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 110) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
