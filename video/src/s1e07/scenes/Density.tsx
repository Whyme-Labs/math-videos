import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Density: between 0 and 1 the average 1/2 appears, then midpoints of
// midpoints cascade until the segment looks solid.

const X0 = 360;
const X1 = 1560;
const Y = 470;
const px = (v: number) => X0 + v * (X1 - X0);
const LEVELS = 7;

export const Density: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("density");
  const [c0, c1] = cues;
  const levelAt = (k: number) => (k === 1 ? c0 + 24 : c1 + 4 + (k - 2) * 12);

  return (
    <SceneShell id="density">
      <Sfx name="pop" at={c0 + 6} volume={0.3} />
      <Sfx name="ding" at={c0 + 30} />
      {Array.from({ length: LEVELS - 1 }).map((_, i) => (
        <Sfx key={i} name={PLUCKS[i]} at={levelAt(i + 2)} volume={0.22} />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={X0 - 60}
            y1={Y}
            x2={X1 + 60}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {/* the average of 0 and 1, with arcs from both ends */}
          {[0, 1].map((e) => (
            <path
              key={e}
              d={`M ${px(e)} ${Y - 20} Q ${(px(e) + px(0.5)) / 2} ${Y - 160} ${px(0.5)} ${Y - 30}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, c0 + 12, 14)}
              opacity={1 - ramp(frame, c1, 12)}
            />
          ))}
          <text
            x={px(0.5)}
            y={Y - 170}
            fill={colors.highlight}
            fontSize={36}
            textAnchor="middle"
            opacity={fadeIn(frame, c0 + 30) * (1 - ramp(frame, c1, 12))}
          >
            {tx.average}
          </text>
          {/* level k: the odd multiples of 1/2^k */}
          {Array.from({ length: LEVELS + 1 }).map((_, k) => {
            const n = 2 ** k;
            return Array.from({ length: n + 1 }).map((__, i) => {
              if (k > 0 && i % 2 === 0) return null;
              const at = k === 0 ? c0 + 6 : levelAt(k);
              const s = Math.min(
                1,
                springIn(frame, at + (k > 2 ? i % 7 : 0), fps, 12),
              );
              const r = k === 0 ? 14 : Math.max(3, 12 - k * 1.4);
              const showLabel = k <= 3;
              return (
                <g key={`${k}-${i}`}>
                  <circle
                    cx={px(i / n)}
                    cy={Y}
                    r={r * s}
                    fill={colors.primary}
                  />
                  {showLabel ? (
                    <text
                      x={px(i / n)}
                      y={Y + 52 + (k === 3 ? 34 : 0)}
                      fill={colors.text}
                      fontSize={k <= 1 ? 40 : 28}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                      opacity={s}
                    >
                      {k === 0 ? i : `${i}/${n}`}
                    </text>
                  ) : null}
                </g>
              );
            });
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 170,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 56,
            opacity: fadeIn(frame, c0 + 30),
            translate: riseIn(frame, c0 + 30, 20),
          }}
        >
          x &lt; <span style={{ color: colors.highlight }}>(x + y)/2</span> &lt;
          y
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            color: colors.primary,
            opacity: fadeIn(frame, levelAt(LEVELS) + 6),
            translate: riseIn(frame, levelAt(LEVELS) + 6, 20),
          }}
        >
          ∞
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
