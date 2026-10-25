import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Clock } from "../components/props";
import { useStrings } from "../i18n";

// Counting as one move. A single card, "+1", and she hops along the integer
// line: three hops right (3), then the card flips to "−1" and she hops back
// three past zero (−3). Then two worlds side by side: on a 12-hour clock the
// hand takes twelve steps and is home again; on the integer line she keeps
// hopping right and the line keeps coming, she never gets back.

const LINE_Y = 640;
const ZERO = 960;
const STEP = 140;

export const Counting: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("counting");
  const [c0, c1] = cues;
  // hops: k = 0..2 forward from c0+16, k = 3..8 back from c0+70
  const hopAt = (k: number) =>
    k < 3 ? c0 + 16 + k * 14 : c0 + 70 + (k - 3) * 12;
  let n = 0;
  let p = { x: ZERO, y: LINE_Y };
  for (let k = 0; k < 9; k++) {
    const t = glide(frame, hopAt(k), fps, 10);
    if (t <= 0) break;
    const d = k < 3 ? 1 : -1;
    p = hop(t, ZERO + n * STEP, LINE_Y, ZERO + (n + d) * STEP, LINE_Y, 60);
    if (t >= 1) n += d;
    else break;
  }
  const back = frame >= c0 + 66;
  const part1 = fadeOut(frame, c1, 10);
  // part 2: the clock comes home, the line never does
  const steps = Math.max(0, Math.min(12, (frame - c1 - 10) / 6));
  const march = Math.max(0, (frame - c1 - 10) / 6);
  const pan = march * 90;

  return (
    <SceneShell id="counting">
      {Array.from({ length: 9 }).map((_, k) => (
        <Sfx
          key={k}
          name={k < 3 ? "pluck2" : "pluck5"}
          at={hopAt(k)}
          volume={0.12}
        />
      ))}
      <Sfx name="whoosh" at={c0 + 64} volume={0.14} />
      {Array.from({ length: 12 }).map((_, k) => (
        <Sfx key={`c${k}`} name="tick" at={c1 + 10 + k * 6} volume={0.1} />
      ))}
      <Sfx name="ding" at={c1 + 84} />

      {/* part 1: one move, done and undone */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={0}
            y1={LINE_Y}
            x2={1920}
            y2={LINE_Y}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {Array.from({ length: 15 }).map((_, k) => {
            const v = k - 7;
            return (
              <g key={v}>
                <line
                  x1={ZERO + v * STEP}
                  y1={LINE_Y - 14}
                  x2={ZERO + v * STEP}
                  y2={LINE_Y + 14}
                  stroke={colors.primary}
                  strokeWidth={4}
                />
                <text
                  x={ZERO + v * STEP}
                  y={LINE_Y + 70}
                  fill={v < 0 ? colors.green : colors.text}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {v < 0 ? `−${-v}` : v}
                </text>
              </g>
            );
          })}
          <Person x={p.x} y={p.y} color={colors.highlight} size={1.2} bob={0} />
          {/* the one move card */}
          <g
            transform={`translate(960 230) scale(${Math.abs(Math.cos(Math.PI * glide(frame, c0 + 60, fps, 10)))} 1)`}
          >
            <rect
              x={-110}
              y={-60}
              width={220}
              height={120}
              rx={22}
              fill={back ? colors.green : colors.highlight}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              x={0}
              y={24}
              fill={colors.ink}
              fontSize={70}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {back ? "−1" : "+1"}
            </text>
          </g>
          <text
            x={1500}
            y={260}
            fill={colors.text}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 16)}
          >
            {n}
          </text>
        </svg>
      </AbsoluteFill>

      {/* part 2: the clock comes home, the integers never do */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <svg width={1920} height={1080}>
          <Clock x={420} y={470} r={220} pos={steps} />
          <text
            x={420}
            y={790}
            fill={steps >= 12 ? colors.green : colors.muted}
            fontSize={52}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 84)}
          >
            {tx.home} ✓
          </text>
          {/* the integer line, panning with her */}
          <g>
            <clipPath id="countLine">
              <rect x={760} y={200} width={1160} height={700} />
            </clipPath>
            <g clipPath="url(#countLine)">
              <line
                x1={760}
                y1={LINE_Y}
                x2={1920}
                y2={LINE_Y}
                stroke={colors.primary}
                strokeWidth={5}
              />
              {Array.from({ length: 40 }).map((_, k) => {
                const x = 900 + k * 90 - pan;
                if (x < 700 || x > 2000) return null;
                return (
                  <g key={k}>
                    <line
                      x1={x}
                      y1={LINE_Y - 12}
                      x2={x}
                      y2={LINE_Y + 12}
                      stroke={colors.primary}
                      strokeWidth={4}
                    />
                    <text
                      x={x}
                      y={LINE_Y + 60}
                      fill={colors.text}
                      fontSize={36}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                    >
                      {k}
                    </text>
                  </g>
                );
              })}
              <Person
                x={900 + march * 90 - pan + 300 * Math.min(1, march / 3)}
                y={LINE_Y}
                color={colors.highlight}
                size={1}
                bob={frame / 3}
              />
              <rect
                x={760}
                y={200}
                width={80}
                height={700}
                fill={alpha(colors.bg, 0.6)}
              />
            </g>
          </g>
          <text
            x={1340}
            y={300}
            fill={colors.red}
            fontSize={52}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 90)}
          >
            {tx.never} →
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 700,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 4),
            translate: riseIn(frame, c1 + 4, 16),
          }}
        >
          ℤ/12
        </div>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 1240,
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 700,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 4),
            translate: riseIn(frame, c1 + 4, 16),
          }}
        >
          ℤ
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
