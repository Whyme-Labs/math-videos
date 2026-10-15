import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn, typed } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// (−1)·(−1) = 1, first from the pair formula, then forced by the
// distributive law. Below, an arrow for −1 is multiplied by −1 and swings
// round to +1.

const LINE_Y = 790;
const UNIT = 150;
const nx = (n: number) => 960 + n * UNIT;
const STEPS = [
  "0 = (−1)·0",
  "  = (−1)·(1 + (−1))",
  "  = (−1)·1 + (−1)·(−1)",
  "  = −1 + (−1)·(−1)",
];

export const MinusTimes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("minusTimes");
  const [c0, c1, c2] = cues;
  const calc = "[0, 1]·[0, 1] = [0·0 + 1·1, 0·1 + 1·0] = [1, 0] = 1";
  const swing = glide(frame, c0 + 70, fps, 26);
  const stepAt = (i: number) => c1 + 6 + i * 12;
  const answer = springIn(frame, c2 + 8, fps, 10);
  const ang = Math.PI * swing; // 0: pointing to −1, π: to +1

  return (
    <SceneShell id="minusTimes">
      <Sfx name="page" at={c0 + 4} />
      <Sfx name="scratch" at={c0 + 22} volume={0.2} />
      <Sfx name="whoosh" at={c0 + 70} volume={0.14} />
      <Sfx name="ding" at={c0 + 96} />
      {STEPS.map((_, i) => (
        <Sfx key={i} name={PLUCKS[i]} at={stepAt(i)} volume={0.26} />
      ))}
      <Sfx name="pop" at={stepAt(2) + 10} volume={0.25} />
      <Sfx name="sparkle" at={c2 + 8} />
      <Sfx name="whoosh" at={c2 + 40} volume={0.12} />
      <Sfx name="ding" at={c2 + 66} volume={0.22} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 48,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 20),
          }}
        >
          [a, b]·[c, d] = [ac + bd, ad + bc]
        </div>
        <div
          style={{
            position: "absolute",
            top: 200,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.primary,
            minHeight: 50,
          }}
        >
          {typed(calc, frame, c0 + 22, fps, 40)}
        </div>

        {/* the forced derivation */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 290,
            fontFamily: fonts.math,
            fontSize: 44,
            whiteSpace: "pre",
            lineHeight: 1.45,
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                opacity: fadeIn(frame, stepAt(i)),
                translate: riseIn(frame, stepAt(i), 16),
              }}
            >
              {s}
              {i === 2 ? (
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 30,
                    color: colors.orange,
                    marginLeft: 30,
                    opacity: fadeIn(frame, stepAt(2) + 10),
                  }}
                >
                  ← {tx.distributive}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1300,
            width: 400,
            textAlign: "center",
            top: 560,
            padding: "10px 0",
            borderRadius: 20,
            border: `4px solid ${colors.highlight}`,
            backgroundColor: alpha(colors.highlight, 0.12),
            fontFamily: fonts.math,
            fontSize: 56,
            color: colors.highlight,
            opacity: Math.min(1, answer),
            scale: 0.7 + 0.3 * Math.min(1, answer),
          }}
        >
          (−1)·(−1) = 1
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 32,
              textAlign: "center",
              marginTop: 6,
            }}
          >
            {tx.forced}
          </div>
        </div>

        {/* −1, multiplied by −1, swings round to +1 */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c0 + 50)}>
            <line
              x1={nx(-3)}
              y1={LINE_Y}
              x2={nx(3)}
              y2={LINE_Y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {[-2, -1, 0, 1, 2].map((n) => (
              <g key={n}>
                <line
                  x1={nx(n)}
                  y1={LINE_Y - 10}
                  x2={nx(n)}
                  y2={LINE_Y + 10}
                  stroke={colors.muted}
                  strokeWidth={3}
                />
                <text
                  x={nx(n)}
                  y={LINE_Y + 46}
                  fill={colors.muted}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {n < 0 ? `−${-n}` : n}
                </text>
              </g>
            ))}
            <line
              x1={nx(0)}
              y1={LINE_Y}
              x2={nx(0) - UNIT * Math.cos(ang)}
              y2={LINE_Y - UNIT * Math.sin(ang)}
              stroke={swing > 0.5 ? colors.primary : colors.highlight}
              strokeWidth={9}
              strokeLinecap="round"
            />
            <circle
              cx={nx(0) - UNIT * Math.cos(ang)}
              cy={LINE_Y - UNIT * Math.sin(ang)}
              r={13}
              fill={swing > 0.5 ? colors.primary : colors.highlight}
            />
            {/* −2 also swings to +2 in the last line */}
            {(() => {
              const sw = glide(frame, c2 + 40, fps, 26);
              const a2 = Math.PI * sw;
              return (
                <g opacity={fadeIn(frame, c2 + 30)}>
                  <line
                    x1={nx(0)}
                    y1={LINE_Y}
                    x2={nx(0) - 2 * UNIT * Math.cos(a2)}
                    y2={LINE_Y - 2 * UNIT * Math.sin(a2)}
                    stroke={colors.orange}
                    strokeWidth={6}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={nx(0) - 2 * UNIT * Math.cos(a2)}
                    cy={LINE_Y - 2 * UNIT * Math.sin(a2)}
                    r={11}
                    fill={colors.orange}
                  />
                </g>
              );
            })()}
            <text
              x={nx(-2.4)}
              y={LINE_Y - 60}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 64)}
            >
              × (−1)
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
