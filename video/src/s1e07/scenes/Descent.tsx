import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
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

// √2 is irrational, by descent. The top and bottom of a/b are bars; both
// turn out even, so halving them gives the same fraction with a smaller
// bottom. Ghost steps keep halving down to a floor: ℕ can't descend forever.

const PANEL_X = 150;
const BAR_X = 1000;
const A = 560;
const B = A / Math.SQRT2;
const ROW = (i: number) => 230 + i * 70;

const Bar: React.FC<{
  readonly y: number;
  readonly w: number;
  readonly t: number;
  readonly color: string;
  readonly label: string;
  readonly split?: number;
}> = ({ y, w, t, color, label, split = 0 }) => (
  <g opacity={Math.min(1, t)}>
    <rect
      x={BAR_X}
      y={y - 18}
      width={w * Math.min(1, t)}
      height={36}
      rx={8}
      fill={alpha(color, 0.35)}
      stroke={color}
      strokeWidth={3}
    />
    <line
      x1={BAR_X + w / 2}
      y1={y - 30}
      x2={BAR_X + w / 2}
      y2={lerp(y - 30, y + 30, split)}
      stroke={colors.text}
      strokeWidth={4}
      opacity={split > 0 ? 1 : 0}
    />
    <text
      x={BAR_X - 24}
      y={y + 12}
      fill={color}
      fontSize={36}
      textAnchor="end"
      fontFamily={fonts.math}
    >
      {label}
    </text>
  </g>
);

export const Descent: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("descent");
  const [c0, c1, c2, c3] = cues;
  const barsOut = fadeOut(frame, c3, 12);
  const failAt = c2 + 60;
  const ghostAt = (k: number) => c2 + 30 + k * 8;

  const row = (
    text: React.ReactNode,
    start: number,
    i: number,
    color: string = colors.text,
    size = 44,
  ) => (
    <div
      style={{
        position: "absolute",
        left: PANEL_X,
        top: ROW(i) - 30,
        fontFamily: fonts.math,
        fontSize: size,
        color,
        opacity: fadeIn(frame, start) * barsOut,
        translate: riseIn(frame, start, 16),
      }}
    >
      {text}
    </div>
  );

  return (
    <SceneShell id="descent">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="pop" at={c0 + 14} volume={0.3} />
      <Sfx name="page" at={c0 + 30} />
      <Sfx name="tick" at={c1 + 6} />
      <Sfx name="scratch" at={c1 + 30} volume={0.2} />
      <Sfx name="scratch" at={c2 + 6} volume={0.2} />
      <Sfx name="pop" at={c2 + 20} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={ghostAt(k)} volume={0.16} />
      ))}
      <Sfx name="thud" at={failAt} />
      <Sfx name="sparkle" at={c3 + 10} />
      <QuestionTray />

      <AbsoluteFill>
        {row(
          <>
            a/b = √2,{" "}
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 34,
                color: colors.muted,
              }}
            >
              {tx.smallest}
            </span>
          </>,
          c0 + 6,
          0,
        )}
        {row("a² = 2b²", c0 + 30, 1, colors.primary)}
        {row(
          <>
            a² {tx.even} ⇒ a {tx.even}
          </>,
          c1 + 6,
          2,
        )}
        {row("(2k + 1)² = 4k² + 4k + 1", c1 + 18, 3, colors.muted, 34)}
        {row("a = 2c ⇒ b² = 2c²", c1 + 30, 4, colors.primary)}
        {row("b = 2d ⇒ a/b = c/d", c2 + 6, 5)}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: ROW(6) - 20,
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.red,
            opacity: fadeIn(frame, failAt) * barsOut,
            translate: `${shake(frame, failAt, 12)}px 0px`,
          }}
        >
          ✗ {tx.contradiction}
        </div>

        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: barsOut }}
        >
          <Bar
            y={260}
            w={A}
            t={springIn(frame, c0 + 6, fps, 14)}
            color={colors.primary}
            label="a"
            split={glide(frame, c1 + 30, fps, 12)}
          />
          <Bar
            y={330}
            w={B}
            t={springIn(frame, c0 + 14, fps, 14)}
            color={colors.orange}
            label="b"
            split={glide(frame, c2 + 6, fps, 12)}
          />
          {/* the same fraction, smaller: c and d */}
          <Bar
            y={440}
            w={A / 2}
            t={springIn(frame, c2 + 20, fps, 14)}
            color={colors.primary}
            label="c"
          />
          <Bar
            y={510}
            w={B / 2}
            t={springIn(frame, c2 + 24, fps, 14)}
            color={colors.highlight}
            label="d"
          />
          <text
            x={BAR_X + B / 2 + 24}
            y={522}
            fill={colors.highlight}
            fontSize={30}
            opacity={fadeIn(frame, c2 + 30)}
          >
            {tx.smaller}
          </text>
          {/* ghost steps: halve again and again, until ℕ runs out */}
          {[0, 1, 2].map((k) => {
            const w = A / 4 / 2 ** k;
            const y = 590 + k * 44;
            return (
              <g key={k} opacity={fadeIn(frame, ghostAt(k)) * 0.6}>
                <rect
                  x={BAR_X}
                  y={y - 10}
                  width={w}
                  height={20}
                  rx={5}
                  fill="none"
                  stroke={colors.muted}
                  strokeWidth={2}
                  strokeDasharray="6 5"
                />
                <rect
                  x={BAR_X}
                  y={y + 12}
                  width={w / Math.SQRT2}
                  height={14}
                  rx={4}
                  fill="none"
                  stroke={colors.muted}
                  strokeWidth={2}
                  strokeDasharray="6 5"
                />
              </g>
            );
          })}
          <line
            x1={BAR_X - 40}
            y1={736}
            x2={lerp(BAR_X - 40, BAR_X + A, ramp(frame, failAt - 10, 12))}
            y2={736}
            stroke={colors.red}
            strokeWidth={5}
          />
          <text
            x={BAR_X + A / 2}
            y={780}
            fill={colors.red}
            fontSize={30}
            textAnchor="middle"
            opacity={fadeIn(frame, failAt)}
          >
            {tx.floor}
          </text>
        </svg>

        <div
          style={{
            position: "absolute",
            top: 340,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 64,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 10),
            scale: 0.85 + 0.15 * Math.min(1, springIn(frame, c3 + 10, fps, 10)),
          }}
        >
          {tx.noFraction}
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 56,
              marginTop: 20,
              color: colors.text,
            }}
          >
            √2 ∉ ℚ
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
