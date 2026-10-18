import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { stepCenter, Stairs, STEPS, ST } from "../components/stairs";
import { useStrings } from "../i18n";

// The definition: a decimal names the least upper bound (sup) of its
// truncations. Then a ceiling comes down onto the staircase and stops at
// the lowest height still above every step: 1.

export const Ceiling: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ceiling");
  const [c0, c1] = cues;
  const termAt = (k: number) => c0 + 24 + k * 12;
  const drop = glide(frame, c1 + 10, fps, 28);
  const landed = frame >= c1 + 34;
  const ceilY = lerp(-40, ST.top - 10, drop);
  const checkAt = (k: number) => c1 + 60 + k * 9;

  return (
    <SceneShell id="ceiling">
      <Sfx name="page" at={c0 + 6} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k + 1]} at={termAt(k)} volume={0.22} />
      ))}
      <Sfx name="chime" at={c0 + 80} volume={0.24} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.16} />
      <Sfx name="thud" at={c1 + 34} />
      <Sfx name="sparkle" at={c1 + 50} />
      {Array.from({ length: STEPS }).map((_, k) => (
        <Sfx key={`c${k}`} name="tick" at={c1 + 60 + k * 9} volume={0.16} />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Stairs
            zoom={1}
            opacity={lerp(0.25, 1, glide(frame, c1, fps, 14))}
            labels={1}
            rise={(n) => springIn(frame, c0 + 40 + n * 12, fps, 14)}
          />
          {/* every step checked: below the ceiling */}
          {Array.from({ length: STEPS }).map((_, k) => (
            <text
              key={k}
              x={stepCenter(k + 1)}
              y={ST.top + 110}
              fill={colors.ink}
              fontSize={44}
              fontWeight={700}
              textAnchor="middle"
              opacity={fadeIn(frame, checkAt(k), 6)}
            >
              ✓
            </text>
          ))}
          {/* the ceiling */}
          <g opacity={fadeIn(frame, c1 + 8, 6)}>
            <rect
              x={ST.x0 - 60}
              y={ceilY - 10}
              width={ST.x1 - ST.x0 + 120}
              height={20}
              rx={8}
              fill={colors.highlight}
            />
            {Array.from({ length: 12 }).map((_, k) => (
              <line
                key={k}
                x1={ST.x0 - 40 + k * 100}
                y1={ceilY - 10}
                x2={ST.x0 - 10 + k * 100}
                y2={ceilY - 40}
                stroke={alpha(colors.highlight, 0.6)}
                strokeWidth={4}
              />
            ))}
          </g>
        </svg>
        {/* the definition card */}
        <div
          style={{
            position: "absolute",
            top: 250,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 10),
            translate: riseIn(frame, c0 + 6, 20),
          }}
        >
          <div style={{ fontSize: 40, color: colors.text }}>
            {tx.definition}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 64,
              color: colors.primary,
              padding: "20px 40px",
              borderRadius: 24,
              backgroundColor: alpha(colors.bg, 0.8),
              border: `3px solid ${alpha(colors.primary, 0.6)}`,
            }}
          >
            0.999… = sup {"{ "}
            {["0.9", "0.99", "0.999"].map((t, k) => (
              <span key={t} style={{ opacity: fadeIn(frame, termAt(k), 8) }}>
                {t},{" "}
              </span>
            ))}
            <span style={{ opacity: fadeIn(frame, termAt(3), 8) }}>
              …{" }"}
            </span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: colors.green,
              opacity: fadeIn(frame, c0 + 80),
              scale: lerp(
                0.8,
                1,
                Math.min(1, springIn(frame, c0 + 80, fps, 12)),
              ),
            }}
          >
            ✓ {tx.completeness}
          </div>
        </div>
        {/* where it stops */}
        <div
          style={{
            position: "absolute",
            left: ST.x1 + 80,
            top: ST.top - 40,
            fontFamily: fonts.math,
            fontSize: 56,
            color: colors.highlight,
            opacity: landed ? fadeIn(frame, c1 + 46) : 0,
            translate: riseIn(frame, c1 + 46, 14),
          }}
        >
          sup = 1
        </div>
        <div
          style={{
            position: "absolute",
            top: ST.top + ST.h + 40,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 50),
          }}
        >
          {tx.ceiling}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
