import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The quotient. The plane is drawn as its horizontal lines (the cosets of
// the x axis), each in its own tint. Each line squeezes to a single dot;
// the column of dots slides right and becomes a new line, ℝ² / x-axis,
// one dot per height. Then the lines come back faintly on the left and
// two pairs of arrows are added: picked from the same two lines, each pair
// lands on the same third line, and that line's dot on the right pulses.

const O = { x: 620, y: 600 };
const S = 90;
const HS = [-2, -1, 0, 1, 2, 3];
const COL_X = 1500;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Quotient: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("quotient");
  const [c0, c1, c2] = cues;
  const run = ramp(frame, c0 + 20, 60);
  const squeeze = glide(frame, c0 + 80, fps, 40);
  const slide = glide(frame, c1 + 6, fps, 30);
  const back = fadeIn(frame, c2, 12);
  const tint = (h: number) =>
    [
      colors.highlight,
      colors.orange,
      colors.text,
      colors.primary,
      colors.green,
      colors.highlight,
    ][h + 2];
  // two picks from the lines y = 1 and y = 2: both sums land on y = 3
  const picks = [
    { v: { x: -3, y: 1 }, w: { x: 1, y: 2 }, at: c2 + 16, c: colors.primary },
    { v: { x: 2, y: 1 }, w: { x: -0.5, y: 2 }, at: c2 + 66, c: colors.orange },
  ];
  const label = (k: number) => fadeIn(frame, c1 + 40 + k * 8, 6);
  const pulse = Math.min(1, springIn(frame, c2 + 50, fps, 10));
  const pulse2 = Math.min(1, springIn(frame, c2 + 100, fps, 10));

  return (
    <SceneShell id="quotient">
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c0 + 80} volume={0.14} />
      <Sfx name="ding" at={c0 + 116} volume={0.16} />
      {HS.map((h, k) => (
        <Sfx key={`l${h}`} name="tick" at={c1 + 40 + k * 8} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="chime" at={c1 + 40} />
      {picks.map((p, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={p.at} volume={0.14} />
      ))}
      <Sfx name="ding" at={c2 + 50} />
      <Sfx name="ding" at={c2 + 100} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the cosets: horizontal lines that squeeze into dots */}
        {HS.map((h, k) => {
          const half = lerp(700, 0, squeeze);
          const cx = lerp(O.x, COL_X, slide);
          const y = scr(0, h).y;
          return (
            <g key={h} opacity={fadeIn(frame, c0 + k * 5, 10)}>
              <line
                x1={cx - half}
                y1={y}
                x2={cx + half}
                y2={y}
                stroke={tint(h)}
                strokeWidth={h === 0 ? 10 : 6}
                strokeLinecap="round"
                opacity={h === 0 ? 1 : 0.8}
              />
              <circle cx={cx} cy={y} r={18 * squeeze} fill={tint(h)} />
              {/* points sliding along their line: same coset */}
              {[-1, 1].map((s) => (
                <circle
                  key={s}
                  cx={cx + s * half * (0.15 + 0.7 * run)}
                  cy={y}
                  r={11}
                  fill={tint(h)}
                  opacity={run > 0 ? 1 - squeeze : 0}
                />
              ))}
              <text
                x={cx - 50}
                y={y + 14}
                fill={tint(h)}
                fontSize={38}
                textAnchor="end"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={label(k)}
              >
                {h < 0 ? `−${-h}` : h}
              </text>
            </g>
          );
        })}
        {/* the quotient: a line of dots */}
        <line
          x1={COL_X}
          y1={scr(0, -2.6).y}
          x2={COL_X}
          y2={scr(0, 3.6).y}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
          opacity={slide}
        />
        <circle
          cx={COL_X}
          cy={scr(0, 3).y}
          r={14 + 16 * Math.max(pulse, pulse2) * (frame > c2 + 50 ? 1 : 0)}
          fill="none"
          stroke={colors.primary}
          strokeWidth={5}
          opacity={frame > c2 + 50 ? 1 : 0}
        />
        <text
          x={COL_X + 50}
          y={scr(0, 3.6).y + 10}
          fill={colors.primary}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c1 + 30)}
        >
          {tx.quotientLabel}
        </text>
        {/* back on the left: the lines again, faint, and two additions */}
        <g opacity={back}>
          {HS.map((h) => (
            <line
              key={h}
              x1={O.x - 480}
              y1={scr(0, h).y}
              x2={O.x + 480}
              y2={scr(0, h).y}
              stroke={alpha(tint(h), h === 3 ? 0.9 : 0.3)}
              strokeWidth={h === 3 ? 8 : 4}
            />
          ))}
          {picks.map((p, k) => {
            const t1 = glide(frame, p.at, fps, 14);
            const t2 = glide(frame, p.at + 14, fps, 14);
            const t3 = fadeIn(frame, p.at + 30, 8);
            const tv = scr(p.v.x * t1, p.v.y * t1);
            const tsum = scr(p.v.x + p.w.x * t2, p.v.y + p.w.y * t2);
            return (
              <g key={k}>
                <Arrow
                  from={O}
                  to={tv}
                  color={p.c}
                  width={10}
                  opacity={t1 > 0 ? 1 : 0}
                />
                <Arrow
                  from={scr(p.v.x, p.v.y)}
                  to={tsum}
                  color={p.c}
                  width={10}
                  opacity={t2 > 0 ? 0.8 : 0}
                />
                <circle
                  cx={scr(p.v.x + p.w.x, 3).x}
                  cy={scr(0, 3).y}
                  r={16}
                  fill={p.c}
                  opacity={t3}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 140,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 104),
          translate: riseIn(frame, c2 + 104, 16),
        }}
      >
        {tx.sameLine} ✓
      </div>
    </SceneShell>
  );
};
