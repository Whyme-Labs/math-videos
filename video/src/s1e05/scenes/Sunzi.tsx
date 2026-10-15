import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, scatter } from "../../shared/components/pieces";
import { useStrings } from "../i18n";

// Chinese edition only: 《孙子算经》卷下 "物不知数". 23 things counted in
// threes leave 2, in fives leave 3, in sevens leave 2. Then the unknown
// number sits in three classes at once (a Venn diagram of the classes up
// to 23), and the answer is 23.

const COUNT = 23;
const GROUPS = [
  { d: 3, r: 2 },
  { d: 5, r: 3 },
  { d: 7, r: 2 },
];
const FX = 220;
const FY = 300;
const STEP_X = 56;
const STEP_Y = 50;

// Position of thing i when counted in groups of d (full groups as columns,
// the remainder in a row after them).
const grouped = (i: number, d: number) => {
  const q = Math.floor(COUNT / d);
  const g = Math.floor(i / d);
  const j = i % d;
  if (g < q) return { x: FX + g * STEP_X, y: FY + j * STEP_Y, rem: false };
  return { x: FX + q * STEP_X + 40 + j * STEP_X, y: FY, rem: true };
};

// Venn diagram of [2]₃, [3]₅, [2]₇ within 0…23.
const CIRCLES = [
  { x: 840, y: 380, label: { x: 560, y: 170 } },
  { x: 1080, y: 380, label: { x: 1360, y: 170 } },
  { x: 960, y: 590, label: { x: 1250, y: 760 } },
];
const CIRCLE_R = 200;
const CENTER = { x: 960, y: 450 };
const MEMBERS: { n: number; x: number; y: number }[] = [
  { n: 5, x: 690, y: 290 },
  { n: 11, x: 780, y: 230 },
  { n: 14, x: 650, y: 390 },
  { n: 17, x: 740, y: 370 },
  { n: 20, x: 850, y: 250 },
  { n: 3, x: 1120, y: 240 },
  { n: 13, x: 1210, y: 310 },
  { n: 18, x: 1240, y: 410 },
  { n: 9, x: 890, y: 720 },
  { n: 16, x: 1030, y: 730 },
  { n: 8, x: 960, y: 290 },
  { n: 2, x: 830, y: 520 },
];

export const Sunzi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("sunzi");
  const [c0, c1, c2] = cues;
  const groupAt = (g: number) => c0 + 50 + g * 60;
  const g = (k: number) => glide(frame, groupAt(k), fps, 22);
  const collapse = glide(frame, c1 + 4, fps, 20);
  const reveal = springIn(frame, c2 + 6, fps, 9);

  const thingPos = (i: number) => {
    const s = scatter(i, { x: FX, y: FY - 40, w: 480, h: 360 });
    let p = { x: s.x, y: s.y };
    let rem = false;
    GROUPS.forEach(({ d }, k) => {
      const t = g(k);
      if (t > 0) {
        const q = grouped(i, d);
        p = { x: lerp(p.x, q.x, t), y: lerp(p.y, q.y, t) };
        rem = t > 0.5 ? q.rem : rem;
      }
    });
    return {
      x: lerp(p.x, CENTER.x, collapse),
      y: lerp(p.y, CENTER.y, collapse),
      rem,
    };
  };

  return (
    <SceneShell id="sunzi">
      <Sfx name="page" at={c0 + 4} />
      {[0, 5, 10, 15, 20].map((i) => (
        <Sfx key={i} name="tick" at={c0 + 14 + i} volume={0.16} />
      ))}
      {GROUPS.map((_, k) => (
        <Sfx key={`g${k}`} name={PLUCKS[k]} at={groupAt(k) + 18} volume={0.3} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="scratch" at={c1 + 14} volume={0.2} />
      {MEMBERS.map((_, i) =>
        i % 3 === 0 ? (
          <Sfx key={`m${i}`} name="tick" at={c1 + 34 + i * 3} volume={0.16} />
        ) : null,
      )}
      <Sfx name="ding" at={c2 + 6} />
      <Sfx name="sparkle" at={c2 + 30} />
      {[0, 1, 2].map((i) => (
        <Sfx
          key={`c${i}`}
          name={PLUCKS[i + 2]}
          at={c2 + 40 + i * 12}
          volume={0.22}
        />
      ))}

      <AbsoluteFill>
        {/* Source */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 120,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 10),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          <span
            style={{
              fontFamily: fonts.title,
              fontSize: 52,
              color: colors.primary,
            }}
          >
            {tx.sunziTitle}
          </span>
          <span style={{ fontSize: 32, color: colors.muted, marginLeft: 24 }}>
            {tx.sunziSource}
          </span>
        </div>
        {/* the three counts */}
        {GROUPS.map(({ d, r }, k) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: 1000,
              top: 300 + k * 100,
              fontSize: 44,
              color:
                k === GROUPS.length - 1 || frame < groupAt(k + 1)
                  ? colors.text
                  : colors.muted,
              opacity: fadeIn(frame, groupAt(k) + 18) * fadeOut(frame, c1, 10),
              translate: riseIn(frame, groupAt(k) + 18, 16),
            }}
          >
            {tx.sunziRem(d, r)}
          </div>
        ))}

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Venn diagram of the three classes */}
          {CIRCLES.map((c, k) => {
            const { d, r } = GROUPS[k];
            return (
              <g key={k}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={CIRCLE_R}
                  fill={alpha(colors.primary, 0.05 * fadeIn(frame, c1 + 20))}
                  stroke={colors.primary}
                  strokeWidth={3}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - ramp(frame, c1 + 10 + k * 6, 18)}
                  opacity={0.8}
                />
                <text
                  x={c.label.x}
                  y={c.label.y}
                  fill={colors.primary}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={fadeIn(frame, c1 + 20 + k * 6)}
                >
                  [{r}]
                  <tspan baselineShift="sub" fontSize={24}>
                    {d}
                  </tspan>
                </text>
              </g>
            );
          })}
          {MEMBERS.map((m, i) => (
            <Chip
              key={m.n}
              cx={m.x}
              cy={m.y}
              label={m.n}
              r={26}
              scale={Math.min(1, springIn(frame, c1 + 34 + i * 3, fps, 12))}
              opacity={frame >= c2 ? lerp(1, 0.45, ramp(frame, c2, 12)) : 1}
            />
          ))}
          {/* the things being counted */}
          {Array.from({ length: COUNT }).map((_, i) => {
            const p = thingPos(i);
            const s = Math.min(1, springIn(frame, c0 + 14 + i, fps, 11));
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={16 * s}
                fill={p.rem && frame < c1 ? colors.highlight : colors.primary}
                opacity={1 - collapse}
              />
            );
          })}
          {/* the unknown number, then 23 */}
          <Chip
            cx={CENTER.x}
            cy={CENTER.y}
            label={frame >= c2 + 6 ? 23 : "?"}
            r={36}
            color={colors.highlight}
            scale={
              Math.min(1, springIn(frame, c1 + 14, fps, 11)) *
              (frame >= c2 + 6 ? 1 + 0.4 * Math.min(1, reveal) : 1)
            }
          />
        </svg>
        {/* 23 checked against each count */}
        {[
          [3, 7, 2],
          [5, 4, 3],
          [7, 3, 2],
        ].map(([d, q, r], i) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: 1400,
              top: 360 + i * 70,
              fontFamily: fonts.math,
              fontSize: 40,
              color: colors.text,
              opacity: fadeIn(frame, c2 + 40 + i * 12),
              translate: riseIn(frame, c2 + 40 + i * 12, 16),
            }}
          >
            23 = {d}·{q} + <span style={{ color: colors.highlight }}>{r}</span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 30),
            translate: riseIn(frame, c2 + 30, 16),
          }}
        >
          {tx.crt}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
