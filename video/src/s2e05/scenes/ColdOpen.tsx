import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. An exam hall: rows of desks, a question on the board. The
// student writes "x²" on the answer sheet; the teacher walks over and
// circles it in red, "+ C". Then the family x² + C fans out on a plot, one
// curve at a time; the curves slide together into one and shrink into a
// single glowing point. Around it, Season 1's glued things pop in: ℤ, ℚ and
// the clock, with the callback stamp.

const CS = [-2, -1, 0, 1, 2, 3];
const O = { x: 960, y: 690 };
const SX = 150;
const SY = 55;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const exam = fadeOut(frame, c1, 12);
  const teacher = glide(frame, c0 + 40, fps, 40);
  const circle = ramp(frame, c0 + 90, 14);
  const plusC = Math.min(1, springIn(frame, c0 + 106, fps, 10));
  const fanAt = (k: number) => c1 + 10 + k * 10;
  const merge = glide(frame, c2 + 10, fps, 30);
  const slopeX = lerp(
    -1.8,
    1.8,
    ramp(frame, c1 + 50, Math.max(30, c2 - c1 - 60)),
  );
  const slopes = fadeIn(frame, c1 + 45, 8) * fadeOut(frame, c2, 8);
  const shrink = glide(frame, c2 + 50, fps, 24);
  const dot = Math.min(1, springIn(frame, c2 + 66, fps, 10));
  const glued = (k: number) =>
    Math.min(1, springIn(frame, c3 + 20 + k * 14, fps, 10));
  const scr = (x: number, y: number) => ({ x: O.x + x * SX, y: O.y - y * SY });

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.2} />
      <Sfx name="scratch" at={c0 + 90} volume={0.24} />
      <Sfx name="thud" at={c0 + 106} volume={0.34} />
      {CS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={fanAt(k)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c2 + 10} volume={0.14} />
      <Sfx name="ding" at={c2 + 66} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`g${k}`} name="pop" at={c3 + 20 + k * 14} volume={0.16} />
      ))}
      <Sfx name="chime" at={c3 + 70} />

      {/* the exam hall */}
      <AbsoluteFill style={{ opacity: exam }}>
        <svg width={1920} height={1080}>
          <rect
            x={560}
            y={110}
            width={800}
            height={170}
            rx={12}
            fill={alpha(colors.ink, 0.9)}
            stroke={colors.wood}
            strokeWidth={8}
          />
          <text
            x={960}
            y={222}
            fill={colors.paper}
            fontSize={72}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
          >
            {tx.question}
          </text>
          {/* rows of desks with students, in the back */}
          {[0, 1, 2, 3].map((k) => (
            <g key={k} opacity={0.35}>
              <Person
                x={250 + k * 140}
                y={560}
                color={colors.muted}
                size={0.9}
                facing={1}
              />
              <rect
                x={210 + k * 140}
                y={520}
                width={100}
                height={14}
                fill={colors.wood}
              />
            </g>
          ))}
          {/* the student, the desk and the answer sheet */}
          <Person
            x={700}
            y={780}
            color={colors.primary}
            size={1.6}
            facing={1}
          />
          <rect x={640} y={640} width={560} height={22} fill={colors.wood} />
          <rect x={700} y={662} width={16} height={120} fill={colors.wood} />
          <rect x={1120} y={662} width={16} height={120} fill={colors.wood} />
          <g transform="translate(980 560) rotate(-4)">
            <rect
              x={-200}
              y={-150}
              width={400}
              height={220}
              rx={8}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={-160}
              y={-40}
              fill={colors.ink}
              fontSize={64}
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {typed(`= ${tx.answer}`, frame, c0 + 14, fps, 8)}
            </text>
            <ellipse
              cx={-40}
              cy={-62}
              rx={90}
              ry={56}
              fill="none"
              stroke={colors.red}
              strokeWidth={7}
              strokeDasharray={600}
              strokeDashoffset={600 * (1 - circle)}
            />
            <g
              opacity={plusC}
              transform={`translate(120 -40) scale(${plusC}) rotate(-8)`}
            >
              <text
                fill={colors.red}
                fontSize={76}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {tx.plusC}
              </text>
            </g>
          </g>
          {/* the teacher walks over */}
          <Person
            x={lerp(1900, 1420, teacher)}
            y={780}
            color={colors.orange}
            size={1.7}
            facing={-1}
            bob={teacher < 1 ? frame / 4 : 0}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.exam}
        </div>
      </AbsoluteFill>

      {/* the family x² + C, which glues into one point */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g opacity={1 - shrink}>
            <line
              x1={scr(-3, 0).x}
              y1={O.y}
              x2={scr(3, 0).x}
              y2={O.y}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            <line
              x1={O.x}
              y1={scr(0, -2.4).y}
              x2={O.x}
              y2={scr(0, 8.6).y}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
          </g>
          <g
            transform={`translate(${O.x} ${scr(0, 1).y}) scale(${1 - shrink}) translate(${-O.x} ${-scr(0, 1).y})`}
          >
            {CS.map((c, k) => {
              const cNow = lerp(c, 1, merge);
              return (
                <path
                  key={k}
                  d={curve((x) => x * x + cNow, -2.3, 2.3, scr)}
                  fill="none"
                  stroke={c === 0 ? colors.primary : colors.orange}
                  strokeWidth={7}
                  opacity={fadeIn(frame, fanAt(k), 6) * (0.55 + 0.45 * merge)}
                />
              );
            })}
          </g>
          {/* the same slope on every curve: tangents sliding together */}
          <g opacity={slopes}>
            {CS.map((c) => {
              const p = scr(slopeX, slopeX * slopeX + c);
              const dx = 0.45;
              const a = scr(slopeX - dx, slopeX * slopeX + c - 2 * slopeX * dx);
              const b = scr(slopeX + dx, slopeX * slopeX + c + 2 * slopeX * dx);
              return (
                <g key={c}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={colors.highlight}
                    strokeWidth={6}
                    strokeLinecap="round"
                  />
                  <circle cx={p.x} cy={p.y} r={9} fill={colors.highlight} />
                </g>
              );
            })}
            <text
              x={scr(slopeX, 0).x}
              y={O.y + 70}
              fill={colors.highlight}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              d/dx = 2x
            </text>
          </g>
          {/* the glued point */}
          <g opacity={dot} transform={`translate(${O.x} ${scr(0, 1).y})`}>
            <circle r={70 * dot} fill={alpha(colors.primary, 0.25)} />
            {[0, 1].map((k) => {
              const t = ((((frame - c2 - 66 + k * 30) % 60) + 60) % 60) / 60;
              return (
                <circle
                  key={k}
                  r={40 + 110 * t}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={4}
                  opacity={frame > c2 + 66 ? 0.5 * (1 - t) : 0}
                />
              );
            })}
            <circle r={26 * dot} fill={colors.primary} />
            <text
              y={-100}
              fill={colors.primary}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              x² + C
            </text>
          </g>
          {/* Season 1's glued things */}
          {["ℤ", "ℚ", "ℤ/12"].map((t, k) => {
            const p = [
              { x: 520, y: 360 },
              { x: 1400, y: 360 },
              { x: 960, y: 760 },
            ][k];
            const g = glued(k);
            return (
              <g
                key={t}
                opacity={g}
                transform={`translate(${p.x} ${p.y}) scale(${g})`}
              >
                <circle
                  r={84}
                  fill={alpha(colors.violet, 0.6)}
                  stroke={colors.muted}
                  strokeWidth={4}
                />
                <text
                  y={24}
                  fill={colors.text}
                  fontSize={k === 2 ? 56 : 72}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {t}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 140,
            padding: "10px 24px",
            borderRadius: 12,
            border: `4px solid ${colors.highlight}`,
            color: colors.highlight,
            fontSize: 40,
            fontWeight: 800,
            opacity: fadeIn(frame, c3 + 70, 8),
            rotate: "-6deg",
          }}
        >
          {tx.callback}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
