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

// "Close to" (differ by less than 1) on a number line: 0 ~ 0.6 ~ 1.2, but
// 0 and 1.2 are not close. A ruler one unit long shows the small steps add up.

const X0 = 360;
const UNIT = 600;
const LINE_Y = 500;
const POINTS = [0, 0.6, 1.2];
const px = (v: number) => X0 + v * UNIT;

const Arc: React.FC<{
  readonly from: number;
  readonly to: number;
  readonly lift: number;
  readonly t: number;
  readonly color: string;
  readonly dashed?: boolean;
}> = ({ from, to, lift, t, color, dashed }) => (
  <path
    d={`M ${px(from)} ${LINE_Y - 20} Q ${(px(from) + px(to)) / 2} ${LINE_Y - lift} ${px(to)} ${LINE_Y - 20}`}
    fill="none"
    stroke={color}
    strokeWidth={5}
    strokeLinecap="round"
    pathLength={dashed ? undefined : 1}
    strokeDasharray={dashed ? "14 12" : "1 1"}
    strokeDashoffset={dashed ? undefined : 1 - t}
    opacity={dashed ? t : 1}
  />
);

export const CloseTo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("closeTo");
  const [c0, c1, c2] = cues;
  const pointAt = (i: number) => c0 + 30 + i * 6;
  const linkAt = [c1 + 6, c1 + 28];
  const failAt = c1 + 56;
  const failShake = shake(frame, failAt + 14, 12);
  const ruler = glide(frame, c2 + 4, fps, 22);

  return (
    <SceneShell id="closeTo">
      <Sfx name="scratch" at={c0 + 4} volume={0.2} />
      {POINTS.map((_, i) => (
        <Sfx key={i} name={PLUCKS[i]} at={pointAt(i)} volume={0.25} />
      ))}
      {linkAt.map((at, i) => (
        <Sfx key={`l${i}`} name="ding" at={at + 12} volume={0.22} />
      ))}
      <Sfx name="thud" at={failAt + 14} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.14} />
      <Sfx name="pop" at={c2 + 26} />
      <Sfx name="thud" at={c2 + 46} volume={0.35} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 140,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            opacity: fadeIn(frame, c0 + 8),
            translate: riseIn(frame, c0 + 8),
          }}
        >
          <span style={{ color: colors.highlight }}>{tx.close}</span>
          {"  ⇔  |x − y| < 1"}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* number line */}
          <line
            x1={X0 - 120}
            y1={LINE_Y}
            x2={lerp(X0 - 120, px(2) + 120, ramp(frame, c0 + 4, 16))}
            y2={LINE_Y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {[0, 1, 2].map((v) => (
            <g key={v} opacity={fadeIn(frame, c0 + 10 + v * 4)}>
              <line
                x1={px(v)}
                y1={LINE_Y - 14}
                x2={px(v)}
                y2={LINE_Y + 14}
                stroke={colors.muted}
                strokeWidth={4}
              />
              <text
                x={px(v)}
                y={LINE_Y + 110}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {v}
              </text>
            </g>
          ))}
          {/* links */}
          <Arc
            from={0}
            to={0.6}
            lift={140}
            t={ramp(frame, linkAt[0], 12)}
            color={colors.green}
          />
          <Arc
            from={0.6}
            to={1.2}
            lift={140}
            t={ramp(frame, linkAt[1], 12)}
            color={colors.green}
          />
          <g transform={`translate(${failShake} 0)`}>
            <Arc
              from={0}
              to={1.2}
              lift={420}
              t={fadeIn(frame, failAt, 14)}
              color={colors.red}
              dashed
            />
            <text
              x={px(0.6)}
              y={LINE_Y - 250}
              fill={colors.red}
              fontSize={44}
              textAnchor="middle"
              opacity={fadeIn(frame, failAt + 14)}
            >
              ✗ {tx.notClose}
            </text>
          </g>
          {[0, 1].map((k) => (
            <text
              key={k}
              x={px(0.3 + k * 0.6)}
              y={LINE_Y - 100}
              fill={colors.green}
              fontSize={34}
              textAnchor="middle"
              opacity={fadeIn(frame, linkAt[k] + 12)}
            >
              ✓ {tx.close}
            </text>
          ))}
          {/* points */}
          {POINTS.map((v, i) => {
            const s = Math.min(1, springIn(frame, pointAt(i), fps, 10));
            return (
              <g key={v}>
                <circle
                  cx={px(v)}
                  cy={LINE_Y}
                  r={16 * s}
                  fill={colors.primary}
                />
                <text
                  x={px(v)}
                  y={LINE_Y + 60}
                  fill={colors.primary}
                  fontSize={38}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  opacity={s}
                >
                  {v}
                </text>
              </g>
            );
          })}
          {/* a ruler one unit long, from 0 */}
          <g opacity={fadeIn(frame, c2 + 4)}>
            <rect
              x={px(0)}
              y={LINE_Y + 150}
              width={UNIT * ruler}
              height={26}
              rx={6}
              fill={alpha(colors.orange, 0.5)}
              stroke={colors.orange}
              strokeWidth={3}
            />
            <line
              x1={px(1.2)}
              y1={LINE_Y + 30}
              x2={px(1.2)}
              y2={LINE_Y + 190}
              stroke={colors.red}
              strokeWidth={3}
              strokeDasharray="8 6"
              opacity={fadeIn(frame, c2 + 26)}
            />
            <text
              x={px(0.5)}
              y={LINE_Y + 230}
              fill={colors.orange}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c2 + 26)}
            >
              0.6 + 0.6 = 1.2 &gt; 1
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            right: 140,
            top: 600,
            fontSize: 48,
            fontFamily: fonts.title,
            color: colors.red,
            opacity: fadeIn(frame, c2 + 46),
            translate: `${shake(frame, c2 + 46, 10)}px 0px`,
          }}
        >
          ✗ {tx.notTransitive}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
