import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Box, isoAt } from "../components/iso";
import { useStrings } from "../i18n";

// The story. Edo, 1683: Seki at a low desk with a soroban and a scroll.
// Then the screen splits: Hanover, 1693, Leibniz writing a letter; a dashed
// line between the two cities and a question mark (neither knew of the
// other). Then the counters: 3 × 3 → 6 terms, 4 × 4 → 24, 10 × 10 →
// 3,628,800, while little terms rain down and bury the bottom of the
// screen. Last, a unit cube leans into a slanted box, and then turns inside
// out (red): how much volume, and which way round?

const TERMS = ["aei", "bfg", "cdh", "−ceg", "−bdi", "−afh"];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const split = glide(frame, c1 + 6, fps, 24);
  const part12 = fadeOut(frame, c2, 10);
  const count = (k: number) =>
    Math.min(1, springIn(frame, c2 + 10 + k * 26, fps, 10));
  const rain = ramp(frame, c2 + 60, 70);
  const part3 = fadeOut(frame, c3, 10);
  const lean = glide(frame, c3 + 20, fps, 30);
  const flip = glide(frame, c3 + 70, fps, 24);
  const to = isoAt(900, 430, 110);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pluck2" at={c0 + 20} volume={0.12} />
      <Sfx name="pluck4" at={c0 + 30} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="page" at={c1 + 40} volume={0.16} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pop" at={c2 + 10 + k * 26} volume={0.16} />
      ))}
      <Sfx name="riser" at={c2 + 60} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.12} />
      <Sfx name="thud" at={c3 + 70} volume={0.3} />

      {/* Edo and Hanover */}
      <AbsoluteFill style={{ opacity: part12 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${lerp(0, -440, split)} 0)`}>
            <rect x={760} y={640} width={420} height={40} fill={colors.wood} />
            {/* the soroban */}
            <rect
              x={790}
              y={590}
              width={180}
              height={50}
              rx={6}
              fill={colors.ink}
              stroke={colors.wood}
              strokeWidth={4}
            />
            {Array.from({ length: 7 }).map((_, k) => (
              <circle
                key={k}
                cx={810 + k * 24}
                cy={615 + (Math.floor(frame / 12 + k) % 2) * 8 - 4}
                r={8}
                fill={colors.paper}
              />
            ))}
            {/* the scroll */}
            <rect
              x={1000}
              y={560}
              width={150}
              height={80}
              rx={6}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <Person
              x={970}
              y={780}
              color={colors.highlight}
              size={1.6}
              facing={1}
            />
            <text
              x={970}
              y={480}
              fill={colors.highlight}
              fontSize={38}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, c0 + 20)}
            >
              {tx.seki}
            </text>
            <text
              x={970}
              y={200}
              fill={colors.primary}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
              opacity={fadeIn(frame, c0 + 4)}
            >
              {tx.edo}
            </text>
          </g>
          <g opacity={split} transform={`translate(${lerp(400, 0, split)} 0)`}>
            <rect x={1200} y={640} width={420} height={40} fill={colors.wood} />
            <rect
              x={1420}
              y={570}
              width={160}
              height={70}
              rx={4}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <Person
              x={1360}
              y={780}
              color={colors.orange}
              size={1.6}
              facing={1}
              beard
            />
            <text
              x={1400}
              y={480}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.leibniz}
            </text>
            <text
              x={1400}
              y={200}
              fill={colors.primary}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.hanover}
            </text>
          </g>
          <g opacity={fadeIn(frame, c1 + 50, 10)}>
            <line
              x1={700}
              y1={300}
              x2={1220}
              y2={300}
              stroke={alpha(colors.paper, 0.6)}
              strokeWidth={5}
              strokeDasharray="16 14"
            />
            <text
              x={960}
              y={330}
              fill={colors.highlight}
              fontSize={90}
              textAnchor="middle"
              fontWeight={900}
            >
              ?
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* the pile of terms */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) * part3 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 90 }).map((_, k) => {
            const x = 140 + ((k * 197) % 1640);
            const fall = Math.max(0, Math.min(1, rain * 1.6 - (k % 30) / 30));
            const y = lerp(-40, 560 + ((k * 53) % 260), fall);
            return (
              <text
                key={k}
                x={x}
                y={y}
                fill={alpha(k % 2 ? colors.orange : colors.primary, 0.75)}
                fontSize={34}
                fontFamily={fonts.math}
                fontWeight={700}
                opacity={fall > 0 ? 1 : 0}
              >
                {TERMS[k % 6]}
              </text>
            );
          })}
          {[
            { n: "3 × 3", t: "6" },
            { n: "4 × 4", t: "24" },
            { n: "10 × 10", t: "3,628,800" },
          ].map((r, k) => (
            <g
              key={r.n}
              opacity={count(k)}
              transform={`translate(960 ${200 + k * 110}) scale(${count(k)})`}
            >
              <rect
                x={-420}
                y={-60}
                width={840}
                height={90}
                rx={18}
                fill={alpha(colors.bg, 0.9)}
                stroke={alpha(colors.paper, 0.3)}
                strokeWidth={3}
              />
              <text
                x={-380}
                y={4}
                fill={colors.text}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {r.n}
              </text>
              <text
                x={380}
                y={4}
                fill={k === 2 ? colors.red : colors.primary}
                fontSize={56}
                textAnchor="end"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {r.t} {tx.terms}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      {/* a cube, leaning, then turned inside out */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Box
            a={[1.4, lerp(0, 0.3, lean), 0]}
            b={[lerp(0, 0.6, lean), 1.4, 0]}
            c={[lerp(0, 0.5, lean), 0, lerp(1.4, 1.6, lean) * (1 - 2 * flip)]}
            to={to}
            flipped={flip > 0.5}
          />
          <text
            x={1400}
            y={420}
            fill={flip > 0.5 ? colors.red : colors.primary}
            fontSize={110}
            fontFamily={fonts.mono}
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 40)}
          >
            {flip > 0.5 ? "−?" : "×?"}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
