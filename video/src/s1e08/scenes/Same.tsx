import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Build or describe? Two lines: one made of cuts (shaded left rays), one of
// classes of sequences (blobs). What √2 "is" differs in each. Threads join
// matching points; then the lines slide together into one line labelled
// "the complete ordered field", and the scaffolding falls away.

const X0 = 260;
const X1 = 1660;
const LO = -0.5;
const HI = 3.5;
const px = (v: number) => X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
const TOP = 300;
const BOT = 600;
const MID = 450;
const MARKS = [
  { v: 0, l: "0" },
  { v: 1, l: "1" },
  { v: Math.SQRT2, l: "√2" },
  { v: 2, l: "2" },
  { v: Math.E, l: "e" },
  { v: Math.PI, l: "π" },
];

export const Same: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("same");
  const [c0, c1, c2] = cues;
  const threadAt = (k: number) => c1 + 10 + k * 8;
  const merge = glide(frame, c2 + 6, fps, 26);
  const topY = lerp(TOP, MID, merge);
  const botY = lerp(BOT, MID, merge);
  const scaffold = fadeOut(frame, c2 + 40, 16);

  return (
    <SceneShell id="same">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="pop" at={c0 + 16} volume={0.3} />
      {MARKS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={threadAt(k)} volume={0.2} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.16} />
      <Sfx name="sparkle" at={c2 + 32} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* threads between matching points */}
          {MARKS.map((m, k) => (
            <line
              key={`t${k}`}
              x1={px(m.v)}
              y1={topY + 14}
              x2={px(m.v)}
              y2={lerp(topY + 14, botY - 14, ramp(frame, threadAt(k), 10))}
              stroke={alpha(colors.highlight, 0.7)}
              strokeWidth={3}
              strokeDasharray="8 6"
              opacity={fadeIn(frame, threadAt(k)) * (1 - merge)}
            />
          ))}
          {/* top: cuts. Each point carries a faint left ray (its cut). */}
          <g opacity={fadeIn(frame, c0 + 6)}>
            <line
              x1={X0 - 60}
              y1={topY}
              x2={X1 + 60}
              y2={topY}
              stroke={colors.primary}
              strokeWidth={4}
            />
            {MARKS.map((m, k) => (
              <g key={`c${k}`}>
                <rect
                  x={X0 - 60}
                  y={topY - 26 - k * 4}
                  width={px(m.v) - X0 + 60}
                  height={6}
                  rx={3}
                  fill={alpha(colors.primary, 0.35)}
                  opacity={scaffold}
                />
                <circle cx={px(m.v)} cy={topY} r={10} fill={colors.primary} />
              </g>
            ))}
          </g>
          {/* bottom: classes of sequences. Each point carries a faint swarm. */}
          <g opacity={fadeIn(frame, c0 + 16)}>
            <line
              x1={X0 - 60}
              y1={botY}
              x2={X1 + 60}
              y2={botY}
              stroke={colors.orange}
              strokeWidth={4}
            />
            {MARKS.map((m, k) => (
              <g key={`s${k}`}>
                {[-3, -2, -1, 1, 2, 3].map((j) => (
                  <circle
                    key={j}
                    cx={px(m.v) + j * (10 + 3 * Math.sin(frame / 9 + k + j))}
                    cy={botY + 26 + Math.abs(j) * 3}
                    r={3.5}
                    fill={alpha(colors.orange, 0.7)}
                    opacity={scaffold}
                  />
                ))}
                <circle cx={px(m.v)} cy={botY} r={10} fill={colors.orange} />
              </g>
            ))}
          </g>
          {/* labels under the merged line */}
          {MARKS.map((m) => (
            <text
              key={`l${m.l}`}
              x={px(m.v)}
              y={botY + (merge > 0.5 ? 56 : 80)}
              fill={colors.text}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 20)}
            >
              {m.l}
            </text>
          ))}
          {/* the merged line */}
          <line
            x1={X0 - 60}
            y1={MID}
            x2={X1 + 60}
            y2={MID}
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={merge}
          />
        </svg>
        {/* what √2 is on each line */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: TOP - 120,
            fontSize: 34,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 10) * (1 - merge),
          }}
        >
          {tx.cutsLine}: √2 ={" "}
          <span style={{ fontFamily: fonts.math }}>
            {"{ q : q < 0 or q² < 2 }"}
          </span>{" "}
          <span style={{ color: colors.muted }}>({tx.setOfFractions})</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 100,
            top: BOT + 110,
            fontSize: 34,
            color: colors.orange,
            opacity: fadeIn(frame, c0 + 20) * (1 - merge),
          }}
        >
          {tx.cauchyLine}: √2 ={" "}
          <span style={{ fontFamily: fonts.math }}>[(1, 1.4, 1.41, …)]</span>{" "}
          <span style={{ color: colors.muted }}>({tx.classOfSequences})</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 120,
            top: MID - 26,
            fontFamily: fonts.math,
            fontSize: 52,
            color: colors.highlight,
            opacity: fadeIn(frame, threadAt(MARKS.length)) * (1 - merge),
          }}
        >
          ≅
        </div>
        <div
          style={{
            position: "absolute",
            top: MID - 180,
            width: "100%",
            textAlign: "center",
            opacity: fadeIn(frame, c2 + 30),
            translate: riseIn(frame, c2 + 30, 20),
          }}
        >
          <span
            style={{
              fontFamily: fonts.math,
              fontSize: 72,
              color: colors.highlight,
              marginRight: 24,
            }}
          >
            ℝ
          </span>
          <span
            style={{
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.highlight,
            }}
          >
            = {tx.cof}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 700,
            width: "100%",
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c2, 10),
          }}
        >
          {["+ − × ÷", "<", "sup"].map((t, k) => (
            <span
              key={t}
              style={{
                fontFamily: fonts.math,
                opacity: Math.min(
                  1,
                  springIn(frame, c1 + 10 + k * 10, fps, 11),
                ),
              }}
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
