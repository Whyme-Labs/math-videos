import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { hop, ramp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// 3 − 5: a token counts down from 3, reaches 0 and falls off the end of ℕ.
// The old fix (an invented "−2" with rules) is struck out; the pair (3, 5)
// is what we build with. Then the same for 3 ÷ 2.

const X0 = 560;
const UNIT = 130;
const LINE_Y = 520;
const nx = (n: number) => X0 + n * UNIT;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const hopAt = (i: number) => c0 + 24 + i * 14;
  const fallAt = hopAt(3);

  // Token position: hops 3 → 2 → 1 → 0, then drops off the left end.
  let tok = { x: nx(3), y: LINE_Y - 34 };
  for (let i = 0; i < 3; i++) {
    const t = ramp(frame, hopAt(i), 12);
    if (t > 0) tok = hop(t, nx(3 - i), LINE_Y - 34, nx(2 - i), LINE_Y - 34, 60);
  }
  const fall = ramp(frame, fallAt, 16);
  if (fall > 0)
    tok = { x: nx(0) - 90 * fall, y: LINE_Y - 34 + 260 * fall * fall };
  const lineOut = fadeOut(frame, c1 - 2, 10);
  const strike = ramp(frame, c2 + 6, 12);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="chime" at={c0 + 4} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name={PLUCKS[2 - i]} at={hopAt(i) + 12} volume={0.28} />
      ))}
      <Sfx name="thud" at={fallAt + 14} />
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="page" at={c1 + 22} />
      <Sfx name="page" at={c1 + 44} volume={0.2} />
      <Sfx name="page" at={c1 + 62} volume={0.2} />
      <Sfx name="tick" at={fallAt + 30} volume={0.2} />
      <Sfx name="tick" at={fallAt + 44} volume={0.2} />
      <Sfx name="tick" at={c2 + 44} volume={0.2} />
      <Sfx name="scratch" at={c2 + 6} />
      <Sfx name="sparkle" at={c2 + 24} />
      <Sfx name="pop" at={c3 + 6} />
      <Sfx name="ding" at={c3 + 26} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 150,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 110,
            opacity: fadeIn(frame, c0 + 4) * lineOut,
            scale: Math.min(1, springIn(frame, c0 + 4, fps, 11)),
          }}
        >
          3 − 5 = ?
        </div>
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: lineOut }}
        >
          <line
            x1={nx(0)}
            y1={LINE_Y}
            x2={nx(6) + 60}
            y2={LINE_Y}
            stroke={colors.muted}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 8)}
          />
          {Array.from({ length: 7 }).map((_, n) => (
            <g key={n} opacity={fadeIn(frame, c0 + 8 + n * 2)}>
              <circle cx={nx(n)} cy={LINE_Y} r={10} fill={colors.primary} />
              <text
                x={nx(n)}
                y={LINE_Y + 56}
                fill={colors.text}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {n}
              </text>
            </g>
          ))}
          {[0, 1].map((k) => (
            <g key={k} opacity={fadeIn(frame, fallAt + 30 + k * 14)}>
              <path
                d={`M ${nx(-k)} ${LINE_Y - 20} Q ${nx(-k - 0.5)} ${LINE_Y - 90} ${nx(-k - 1)} ${LINE_Y - 20}`}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={4}
                strokeDasharray="10 8"
              />
              <text
                x={nx(-k - 1)}
                y={LINE_Y + 10}
                fill={colors.highlight}
                fontSize={48}
                textAnchor="middle"
                fontFamily={fonts.title}
              >
                ?
              </text>
            </g>
          ))}
          <circle
            cx={tok.x}
            cy={tok.y}
            r={20}
            fill={colors.highlight}
            opacity={fadeIn(frame, c0 + 14) * (1 - fall)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: nx(0) - 300,
            width: 600,
            top: LINE_Y + 110,
            textAlign: "center",
            fontSize: 44,
            color: colors.red,
            opacity: fadeIn(frame, fallAt + 14) * lineOut,
            translate: `${shake(frame, fallAt + 14, 12)}px 0px`,
          }}
        >
          ✗ {tx.noAnswer}
        </div>

        {/* invented vs built */}
        <div
          style={{
            position: "absolute",
            left: 420,
            top: 250,
            width: 460,
            textAlign: "center",
            opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c3 - 2, 10),
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
              fontFamily: fonts.math,
              fontSize: 150,
              color: colors.muted,
              padding: "0 30px",
              border: `4px dashed ${colors.panelEdge}`,
              borderRadius: 30,
              scale: Math.min(1, springIn(frame, c1 + 6, fps, 11)),
            }}
          >
            −2
            <div
              style={{
                position: "absolute",
                left: -20,
                top: "50%",
                height: 10,
                width: `${115 * strike}%`,
                backgroundColor: colors.red,
                borderRadius: 5,
                rotate: "-12deg",
              }}
            />
          </div>
          <div style={{ fontSize: 36, color: colors.muted, marginTop: 20 }}>
            {tx.invented}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 44,
              marginTop: 24,
              opacity: fadeIn(frame, c1 + 22),
              translate: riseIn(frame, c1 + 22, 16),
            }}
          >
            (−)·(−) = +{" "}
            <span style={{ color: colors.highlight, fontFamily: fonts.title }}>
              ?
            </span>
          </div>
          {["−(−a) = a", "a − b = a + (−b)"].map((r, i) => (
            <div
              key={r}
              style={{
                fontFamily: fonts.math,
                fontSize: 40,
                marginTop: 12,
                color: colors.muted,
                opacity: fadeIn(frame, c1 + 44 + i * 18),
                translate: riseIn(frame, c1 + 44 + i * 18, 16),
              }}
            >
              {r}{" "}
              <span
                style={{ color: colors.highlight, fontFamily: fonts.title }}
              >
                ?
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1060,
            top: 270,
            width: 460,
            textAlign: "center",
            opacity: fadeIn(frame, c2 + 20),
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: fonts.math,
              fontSize: 120,
              color: colors.primary,
              padding: "6px 34px",
              border: `4px solid ${colors.primary}`,
              borderRadius: 30,
              backgroundColor: alpha(colors.primary, 0.1),
              scale: Math.min(1, springIn(frame, c2 + 20, fps, 10)),
            }}
          >
            (3, 5)
          </div>
          <div style={{ fontSize: 36, color: colors.primary, marginTop: 20 }}>
            {tx.built}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 40,
              color: colors.muted,
              marginTop: 18,
              opacity: fadeIn(frame, c2 + 44) * fadeOut(frame, c3 - 2, 10),
              translate: riseIn(frame, c2 + 44, 16),
            }}
          >
            ℕ × ℕ ∋ (3, 5)
          </div>
        </div>
        {/* and division */}
        <div
          style={{
            position: "absolute",
            left: 420,
            top: 300,
            width: 460,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 110,
            opacity: fadeIn(frame, c3 + 6),
            scale: Math.min(1, springIn(frame, c3 + 6, fps, 11)),
          }}
        >
          3 ÷ 2
        </div>
        <div
          style={{
            position: "absolute",
            left: 1060,
            top: 520,
            width: 460,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 90,
            color: colors.orange,
            opacity: fadeIn(frame, c3 + 24),
            translate: riseIn(frame, c3 + 24, 20),
          }}
        >
          (3, 2)
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
