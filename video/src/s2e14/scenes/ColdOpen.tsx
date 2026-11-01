import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Göttingen, 1908: Schmidt at a blackboard writing the length of
// an infinite list, x₁² + x₂² + x₃² + …. Then the question: are 1 and x
// perpendicular? Two arrows, and three protractor cards drop in one by one,
// reading 90°, 90° and (in red) 30°, the arrows swinging to match each
// card. Last, the grid under the arrows fades away, leaving only a "?".

const CARDS = [
  { label: "coeffs", deg: 90 },
  { label: "∫₋₁¹", deg: 90 },
  { label: "∫₀¹", deg: 30 },
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const cardAt = [c1 + 20, c1 + 70, c2 + 10];
  const card = (k: number) => Math.min(1, springIn(frame, cardAt[k], fps, 10));
  const swing = glide(frame, c2 + 10, fps, 30);
  const angle = 90 - 60 * swing;
  const gridFade = fadeOut(frame, c3 + 20, 30);
  const O = { x: 560, y: 680 };
  const a = (angle * Math.PI) / 180;

  return (
    <SceneShell id="coldOpen">
      {Array.from({ length: 5 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 30 + k * 10} volume={0.1} />
      ))}
      {Array.from({ length: 9 }).map((_, k) => (
        <Sfx
          key={`sq${k}`}
          name={PLUCKS[k % PLUCKS.length]}
          at={c0 + 50 + k * 14}
          volume={0.1}
        />
      ))}
      <Sfx name="pop" at={c1 + 20} volume={0.16} />
      <Sfx name="pop" at={c1 + 70} volume={0.16} />
      <Sfx name="thud" at={c2 + 10} volume={0.3} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.12} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={360}
            y={160}
            width={1200}
            height={360}
            rx={14}
            fill={alpha(colors.ink, 0.9)}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <text
            x={420}
            y={370}
            fill={colors.paper}
            fontSize={84}
            fontFamily={fonts.math}
            fontWeight={700}
          >
            {typed("‖x‖² = x₁² + x₂² + x₃² + …", frame, c0 + 30, fps, 14)}
          </text>
          {/* the terms as squares, each smaller than the last, piling up */}
          {Array.from({ length: 9 }).map((_, k) => {
            const side = 150 / (1 + k * 0.45);
            const x0 =
              380 +
              Array.from({ length: k }).reduce<number>(
                (acc, _u, j) => acc + 150 / (1 + j * 0.45) + 24,
                0,
              );
            const s0 = Math.min(1, springIn(frame, c0 + 50 + k * 14, fps, 12));
            return (
              <rect
                key={k}
                x={x0}
                y={760 - side * s0}
                width={side}
                height={side * s0}
                rx={6}
                fill={alpha(colors.primary, 0.75 - k * 0.05)}
                opacity={s0}
              />
            );
          })}
          <Person
            x={1660}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={-1}
            glasses
          />
          <text
            x={1660}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.schmidt}
          </text>
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
          {tx.gottingen}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g opacity={gridFade}>
            {Array.from({ length: 9 }).map((_, k) => (
              <g key={k} stroke={alpha(colors.paper, 0.12)} strokeWidth={2}>
                <line
                  x1={O.x - 200 + k * 80}
                  y1={200}
                  x2={O.x - 200 + k * 80}
                  y2={820}
                />
                <line
                  x1={O.x - 260}
                  y1={220 + k * 70}
                  x2={O.x + 460}
                  y2={220 + k * 70}
                />
              </g>
            ))}
          </g>
          <Arrow from={O} to={{ x: O.x + 380, y: O.y }} width={14} />
          <Arrow
            from={O}
            to={{ x: O.x + 380 * Math.cos(a), y: O.y - 380 * Math.sin(a) }}
            width={14}
            color={colors.highlight}
          />
          <text
            x={O.x + 400}
            y={O.y + 14}
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1
          </text>
          <text
            x={O.x + 400 * Math.cos(a) - 20}
            y={O.y - 400 * Math.sin(a)}
            fill={colors.highlight}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x
          </text>
          <path
            d={`M ${O.x + 90} ${O.y} A 90 90 0 0 0 ${O.x + 90 * Math.cos(a)} ${O.y - 90 * Math.sin(a)}`}
            fill="none"
            stroke={colors.text}
            strokeWidth={5}
          />
          {CARDS.map((c, k) => {
            const s = card(k);
            const red = c.deg !== 90;
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(1260 ${250 + k * 170}) scale(${s})`}
              >
                <rect
                  x={-200}
                  y={-60}
                  width={400}
                  height={120}
                  rx={18}
                  fill={alpha(colors.bg, 0.9)}
                  stroke={red ? colors.red : colors.green}
                  strokeWidth={5}
                />
                <text
                  x={-170}
                  y={14}
                  fill={colors.text}
                  fontSize={c.label === "coeffs" ? 34 : 44}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {c.label === "coeffs" ? tx.coeffs : c.label}
                </text>
                <text
                  x={170}
                  y={18}
                  fill={red ? colors.red : colors.green}
                  fontSize={56}
                  textAnchor="end"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {c.deg}°
                </text>
              </g>
            );
          })}
          <text
            x={O.x + 160}
            y={O.y - 420}
            fill={colors.highlight}
            fontSize={140}
            fontWeight={900}
            opacity={fadeIn(frame, c3 + 40)}
          >
            ?
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
