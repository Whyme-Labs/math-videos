import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Pie } from "../components/pieces";
import { useStrings } from "../i18n";

// 1/2 and 2/4: the same amount, different pairs. Then 15:00 and 3 o'clock.
// Last line: both shrink to the sides of a big "~": declared the same.
const PIE_Y = 400;
const PIE_R = 130;
const PIES = [
  { x: 660, parts: 2, shaded: 1, frac: "1/2", pair: "(1, 2)" },
  { x: 1260, parts: 4, shaded: 2, frac: "2/4", pair: "(2, 4)" },
];
const CLOCK = { x: 1260, y: 410, r: 170 };
const DIGITAL = { x: 620, y: 410 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  const fill = ramp(frame, c0 + 24, 18);
  // 2/4 slides over 1/2 and back
  const over = glide(frame, c1 + 6, fps, 24) - glide(frame, c1 + 70, fps, 22);
  const asPairs = frame >= c2 + 6;
  const hand = glide(frame, c3 + 22, fps, 22);
  // Last line: the pies come back on the left, the clock moves right.
  const side = glide(frame, c4 + 2, fps, 22);
  const pieOpacity =
    frame < c4 ? fadeOut(frame, c3 - 2, 10) : fadeIn(frame, c4 + 4);
  const pieScale = frame < c4 ? 1 : 0.7;
  const pieShift = frame < c4 ? 0 : -450;
  const clockScale = lerp(1, 0.62, side);
  const clockShift = lerp(0, 330, side);
  const tilde = springIn(frame, c4 + 16, fps, 10);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="pop" at={c0 + 14} volume={0.3} />
      <Sfx name="scratch" at={c0 + 24} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.16} />
      <Sfx name="ding" at={c1 + 30} />
      <Sfx name="whoosh" at={c1 + 70} volume={0.12} />
      <Sfx name="page" at={c2 + 6} />
      <Sfx name="pop" at={c2 + 20} />
      <Sfx name="pop" at={c3 + 4} />
      <Sfx name="pop" at={c3 + 12} volume={0.3} />
      <Sfx name="tick" at={c3 + 40} />
      <Sfx name="whoosh" at={c4 + 2} volume={0.16} />
      <Sfx name="sparkle" at={c4 + 18} />
      <QuestionTray />

      <AbsoluteFill>
        {/* Pies */}
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: pieOpacity }}
        >
          <g
            transform={`translate(${pieShift} 0) translate(960 ${PIE_Y}) scale(${pieScale}) translate(-960 ${-PIE_Y})`}
          >
            {PIES.map((p, i) => {
              const s = springIn(frame, c0 + 6 + i * 8, fps, 11);
              const x = i === 1 ? lerp(p.x, PIES[0].x, over) : p.x;
              return (
                <g
                  key={p.frac}
                  opacity={Math.min(1, s) * (i === 1 ? 1 - 0.35 * over : 1)}
                  transform={`translate(${x} ${PIE_Y}) scale(${Math.min(1, s)}) translate(${-x} ${-PIE_Y})`}
                >
                  <Pie
                    cx={x}
                    cy={PIE_Y}
                    r={PIE_R}
                    parts={p.parts}
                    shaded={p.shaded}
                    fill={fill}
                    color={i === 0 ? colors.primary : colors.orange}
                  />
                  <text
                    x={x}
                    y={PIE_Y - PIE_R - 50}
                    fill={colors.text}
                    fontSize={84}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={
                      (asPairs && frame < c4 ? fadeIn(frame, c2 + 6) : 1) *
                      (i === 1 ? 1 - over : 1)
                    }
                  >
                    {asPairs && frame < c4 ? p.pair : p.frac}
                  </text>
                </g>
              );
            })}
            <text
              x={960}
              y={PIE_Y - PIE_R - 50}
              fill={colors.highlight}
              fontSize={96}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={
                frame < c4 ? Math.min(1, springIn(frame, c2 + 20, fps, 10)) : 0
              }
            >
              ≠
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: PIE_Y + PIE_R + 40,
            left: PIES[0].x - 300,
            width: 600,
            textAlign: "center",
            fontSize: 40,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 30) * fadeOut(frame, c1 + 70, 12),
            translate: riseIn(frame, c1 + 30, 16),
          }}
        >
          ✓ {tx.asAmounts}
        </div>
        <div
          style={{
            position: "absolute",
            top: PIE_Y + PIE_R + 40,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 28) * fadeOut(frame, c3 - 2, 10),
            translate: riseIn(frame, c2 + 28, 16),
          }}
        >
          {tx.asWritten}
        </div>

        {/* 15:00 and 3 o'clock */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: fadeIn(frame, c3 + 2),
            scale: clockScale,
            translate: `${clockShift}px 0px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: DIGITAL.x - 220,
              top: DIGITAL.y - 90,
              width: 440,
              height: 180,
              borderRadius: 28,
              backgroundColor: alpha(colors.ink, 0.8),
              border: `3px solid ${colors.panelEdge}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.mono,
              fontSize: 120,
              color: colors.primary,
              scale: Math.min(1, springIn(frame, c3 + 4, fps, 11)),
              opacity: fadeOut(frame, c4, 10),
            }}
          >
            15:00
          </div>
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            <g opacity={Math.min(1, springIn(frame, c3 + 12, fps, 11))}>
              <circle
                cx={CLOCK.x}
                cy={CLOCK.y}
                r={CLOCK.r}
                fill={alpha(colors.paper, 0.06)}
                stroke={colors.text}
                strokeWidth={5}
              />
              {Array.from({ length: 12 }).map((_, k) => {
                const a = (k / 12) * 2 * Math.PI;
                const r0 = CLOCK.r - (k % 3 === 0 ? 30 : 18);
                return (
                  <line
                    key={k}
                    x1={CLOCK.x + r0 * Math.sin(a)}
                    y1={CLOCK.y - r0 * Math.cos(a)}
                    x2={CLOCK.x + (CLOCK.r - 6) * Math.sin(a)}
                    y2={CLOCK.y - (CLOCK.r - 6) * Math.cos(a)}
                    stroke={colors.text}
                    strokeWidth={k % 3 === 0 ? 6 : 3}
                  />
                );
              })}
              {/* hour hand: 12 → 3 */}
              <line
                x1={CLOCK.x}
                y1={CLOCK.y}
                x2={CLOCK.x + 100 * Math.sin((hand * Math.PI) / 2)}
                y2={CLOCK.y - 100 * Math.cos((hand * Math.PI) / 2)}
                stroke={colors.primary}
                strokeWidth={12}
                strokeLinecap="round"
              />
              <line
                x1={CLOCK.x}
                y1={CLOCK.y}
                x2={CLOCK.x}
                y2={CLOCK.y - 140}
                stroke={colors.text}
                strokeWidth={6}
                strokeLinecap="round"
              />
              <circle cx={CLOCK.x} cy={CLOCK.y} r={12} fill={colors.primary} />
            </g>
            {/* 15:00 → 3 */}
            <path
              d={`M ${DIGITAL.x + 240} ${DIGITAL.y} C ${DIGITAL.x + 330} ${DIGITAL.y - 120}, ${CLOCK.x - 280} ${CLOCK.y - 120}, ${CLOCK.x - CLOCK.r - 30} ${CLOCK.y - 20}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, c3 + 26, 18)}
              opacity={fadeOut(frame, c4, 10)}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: CLOCK.x - 200,
              width: 400,
              top: CLOCK.y + CLOCK.r + 30,
              textAlign: "center",
              fontSize: 44,
              color: colors.primary,
              opacity: fadeIn(frame, c3 + 44),
              translate: riseIn(frame, c3 + 44, 16),
            }}
          >
            {tx.oclock}
          </div>
        </div>

        {/* Both pairs tied to the ~ */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {[
            `M 560 300 Q 700 200 850 330`,
            `M 1370 300 Q 1220 200 1070 330`,
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, c4 + 34 + i * 8, 16)}
            />
          ))}
        </svg>
        {/* Declared the same */}
        <div
          style={{
            position: "absolute",
            top: 260,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 200,
            color: colors.highlight,
            opacity: Math.min(1, tilde),
            scale: 0.6 + 0.4 * Math.min(1, tilde),
          }}
        >
          ~
        </div>
        <div
          style={{
            position: "absolute",
            top: 560,
            width: "100%",
            textAlign: "center",
            fontSize: 48,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 26),
            translate: riseIn(frame, c4 + 26, 20),
          }}
        >
          {tx.declared}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
