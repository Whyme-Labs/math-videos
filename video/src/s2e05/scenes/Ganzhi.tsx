import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. The sixty-year 干支 cycle as gluing. A ring of the
// sixty names (甲子, 乙丑, …), reading outward. A pointer runs round once
// while a year counter climbs from 1984 to 2044; both years stick to the
// same slot, 甲子. Then an oracle bone with a grid of signs slides in: the
// complete 干支 table carved in the Shang dynasty. Last line: the ring
// slides aside and the quotient picture (lines squeezing into dots) takes
// its place: today we glue vectors.

const STEMS = "甲乙丙丁戊己庚辛壬癸";
const BRANCHES = "子丑寅卯辰巳午未申酉戌亥";
const NAMES = Array.from(
  { length: 60 },
  (_, i) => STEMS[i % 10] + BRANCHES[i % 12],
);
const C = { x: 760, y: 470 };
const R = 330;

export const Ganzhi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ganzhi");
  const [c0, c1, c2] = cues;
  const run = ramp(frame, c0 + 30, 70);
  const year = Math.round(lerp(1984, 2044, run));
  const ang = (i: number) => -Math.PI / 2 + (i / 60) * Math.PI * 2;
  const pointer = ang(run * 60);
  const stick1 = Math.min(1, springIn(frame, c0 + 32, fps, 10));
  const stick2 = Math.min(1, springIn(frame, c1 + 4, fps, 10));
  const bone = glide(frame, c1 + 50, fps, 24);
  const aside = glide(frame, c2 + 6, fps, 24);
  const squeeze = glide(frame, c2 + 30, fps, 30);

  return (
    <SceneShell id="ganzhi">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      {Array.from({ length: 12 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 30 + k * 6} volume={0.1} />
      ))}
      <Sfx name="pop" at={c0 + 32} volume={0.16} />
      <Sfx name="ding" at={c1 + 4} />
      <Sfx name="thud" at={c1 + 50} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="chime" at={c2 + 40} />

      <AbsoluteFill
        style={{
          opacity: 1 - 0.75 * aside,
          translate: `${-360 * aside}px 0px`,
          scale: String(1 - 0.35 * aside),
        }}
      >
        <svg width={1920} height={1080}>
          <circle
            cx={C.x}
            cy={C.y}
            r={R + 60}
            fill={alpha(colors.bgGlow, 0.35)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          {NAMES.map((n, i) => {
            const a = ang(i);
            const hit = i === 0;
            return (
              <text
                key={n}
                x={C.x + R * Math.cos(a)}
                y={C.y + R * Math.sin(a)}
                fill={hit ? colors.primary : alpha(colors.text, 0.75)}
                fontSize={hit ? 30 : 24}
                fontWeight={hit ? 900 : 600}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${(a * 180) / Math.PI} ${C.x + R * Math.cos(a)} ${C.y + R * Math.sin(a)})`}
                opacity={fadeIn(frame, c0 + (i % 12), 10)}
              >
                {n}
              </text>
            );
          })}
          {/* the pointer running round once */}
          <line
            x1={C.x}
            y1={C.y}
            x2={C.x + (R - 50) * Math.cos(pointer)}
            y2={C.y + (R - 50) * Math.sin(pointer)}
            stroke={colors.orange}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={fadeIn(frame, c0 + 20)}
          />
          <circle cx={C.x} cy={C.y} r={18} fill={colors.orange} />
          {/* the two years, stuck to the same slot */}
          {[
            { y: "1984", s: stick1, dx: -110 },
            { y: "2044", s: stick2, dx: 110 },
          ].map((b) => (
            <g
              key={b.y}
              opacity={b.s}
              transform={`translate(${C.x + b.dx} ${C.y - 110}) scale(${b.s})`}
            >
              <rect
                x={-90}
                y={-38}
                width={180}
                height={64}
                rx={14}
                fill={colors.primary}
              />
              <text
                y={12}
                fill={colors.ink}
                fontSize={42}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {b.y}
              </text>
            </g>
          ))}
          <text
            x={C.x}
            y={C.y + 24}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(frame, c1 + 10)}
          >
            {tx.jiazi}
          </text>
          <text
            x={C.x}
            y={C.y + 120}
            fill={colors.muted}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.mono}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 26) * fadeOut(frame, c1 + 40, 10)}
          >
            {year}
          </text>
        </svg>
      </AbsoluteFill>

      {/* the oracle bone with its table of signs */}
      <AbsoluteFill
        style={{
          opacity: bone * (1 - aside),
          translate: `${lerp(400, 0, bone)}px 0px`,
        }}
      >
        <svg width={1920} height={1080}>
          <path
            d="M 1300 180 Q 1500 140 1700 200 Q 1760 420 1720 640 Q 1600 760 1440 740 Q 1300 700 1280 520 Q 1250 340 1300 180 Z"
            fill={colors.paper}
            stroke={colors.wood}
            strokeWidth={6}
          />
          {/* six columns of ten names, read top to bottom, right to left */}
          {NAMES.map((n, i) => {
            const col = Math.floor(i / 10);
            const row = i % 10;
            return [0, 1].map((j) => (
              <text
                key={`${i}${j}`}
                x={1640 - col * 58}
                y={236 + row * 50 + j * 22}
                fill={alpha(colors.ink, 0.75)}
                fontSize={21}
                textAnchor="middle"
                fontWeight={700}
              >
                {n[j]}
              </text>
            ));
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 770,
            left: 1240,
            width: 520,
            textAlign: "center",
            fontSize: 34,
            fontWeight: 800,
            color: colors.paper,
          }}
        >
          {tx.oracle}
        </div>
      </AbsoluteFill>

      {/* today: gluing vectors */}
      <AbsoluteFill style={{ opacity: aside }}>
        <svg width={1920} height={1080}>
          {[-2, -1, 0, 1, 2].map((h) => {
            const half = lerp(380, 0, squeeze);
            const y = 470 - h * 90;
            return (
              <g key={h}>
                <line
                  x1={1240 - half}
                  y1={y}
                  x2={1240 + half}
                  y2={y}
                  stroke={h === 0 ? colors.orange : colors.primary}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <circle
                  cx={1240}
                  cy={y}
                  r={14 * squeeze}
                  fill={colors.primary}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * (1 - aside),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.ganzhiTitle}
      </div>
    </SceneShell>
  );
};
