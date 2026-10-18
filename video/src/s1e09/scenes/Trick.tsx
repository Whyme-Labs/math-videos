import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The 10x − x trick, on 0.999… (fine: x is a real number) and on
// 1 + 2 + 4 + 8 + … (it "proves" S = −1, while the partial sums run off
// the screen). A trick is a shortcut, not a proof that the number exists.

const LEFT = ["x = 0.999…", "10x = 9.999…", "10x − x = 9", "x = 1"];
const RIGHT = [
  "S = 1 + 2 + 4 + 8 + …",
  "2S = 2 + 4 + 8 + …",
  "2S − S = −1",
  "S = −1",
];
const SUMS = [1, 3, 7, 15, 31, 63];

export const Trick: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("trick");
  const [c0, c1, c2] = cues;
  const leftAt = (k: number) => c0 + 30 + k * 16;
  const rightAt = (k: number) => c1 + 6 + k * 14;
  const wrongAt = rightAt(3) + 10;
  const sumAt = (k: number) => wrongAt + 20 + k * 9;
  const dim = lerp(1, 0.25, glide(frame, c2 + 4, fps, 16));
  const col = (k: number, at: number, last: boolean, ok: boolean) => ({
    opacity: fadeIn(frame, at),
    translate: riseIn(frame, at, 14),
    color: last ? (ok ? colors.green : colors.red) : colors.text,
    fontWeight: last ? 700 : 400,
    key: k,
  });

  return (
    <SceneShell id="trick">
      <Sfx name="ding" at={c0 + 8} volume={0.22} />
      {LEFT.map((_, k) => (
        <Sfx key={`l${k}`} name={PLUCKS[k]} at={leftAt(k)} volume={0.2} />
      ))}
      {RIGHT.map((_, k) => (
        <Sfx key={`r${k}`} name="tick" at={rightAt(k)} volume={0.2} />
      ))}
      <Sfx name="thud" at={wrongAt} volume={0.4} />
      {SUMS.map((_, k) => (
        <Sfx key={`s${k}`} name={PLUCKS[k]} at={sumAt(k)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c2 + 4} volume={0.14} />
      <Sfx name="chime" at={c2 + 20} volume={0.24} />
      <QuestionTray />

      <AbsoluteFill style={{ opacity: dim }}>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 150,
            fontSize: 36,
            color: colors.green,
            padding: "10px 24px",
            borderRadius: 999,
            border: `2px solid ${colors.green}`,
            backgroundColor: alpha(colors.green, 0.1),
            opacity: fadeIn(frame, c0 + 8),
            scale: lerp(0.8, 1, Math.min(1, springIn(frame, c0 + 8, fps, 12))),
          }}
        >
          ✓ {tx.realFirst}
        </div>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 260,
            fontFamily: fonts.math,
            fontSize: 52,
            lineHeight: 1.55,
          }}
        >
          {LEFT.map((t, k) => {
            const { key, ...s } = col(k, leftAt(k), k === 3, true);
            return (
              <div key={key} style={s}>
                {t} {k === 3 ? "✓" : ""}
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1000,
            top: 150,
            fontFamily: fonts.math,
            fontSize: 46,
            lineHeight: 1.5,
            translate: `${shake(frame, wrongAt, 16)}px 0px`,
          }}
        >
          {RIGHT.map((t, k) => {
            const { key, ...s } = col(k, rightAt(k), k === 3, false);
            return (
              <div key={key} style={s}>
                {t} {k === 3 ? "✗" : ""}
              </div>
            );
          })}
        </div>
        {/* the partial sums run off the screen */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {SUMS.map((s, k) => (
            <g key={s} opacity={fadeIn(frame, sumAt(k), 6)}>
              <rect
                x={1000}
                y={480 + k * 44}
                width={22 * s * ramp(frame, sumAt(k), 10)}
                height={30}
                rx={6}
                fill={k % 2 === 0 ? colors.orange : colors.primary}
              />
              <text
                x={980}
                y={480 + k * 44 + 25}
                fill={colors.muted}
                fontSize={28}
                textAnchor="end"
                fontFamily={fonts.mono}
              >
                {s}
              </text>
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 1000,
            top: 760,
            fontSize: 36,
            color: colors.orange,
            opacity: fadeIn(frame, sumAt(SUMS.length - 1) + 10),
          }}
        >
          {tx.sumBlowsUp}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          bottom: 120,
        }}
      >
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 72,
            color: colors.highlight,
            padding: "24px 56px",
            borderRadius: 28,
            backgroundColor: alpha(colors.bg, 0.85),
            opacity: fadeIn(frame, c2 + 20),
            scale: lerp(0.7, 1, Math.min(1, springIn(frame, c2 + 20, fps, 11))),
          }}
        >
          {tx.shortcut}
        </div>
        <div
          style={{
            display: "flex",
            gap: 60,
            fontFamily: fonts.math,
            fontSize: 46,
            opacity: fadeIn(frame, c2 + 50),
            translate: riseIn(frame, c2 + 50, 16),
          }}
        >
          <span style={{ color: colors.green }}>0.999… ∈ ℝ ✓</span>
          <span style={{ color: colors.red }}>1 + 2 + 4 + … → ∞ ✗</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
