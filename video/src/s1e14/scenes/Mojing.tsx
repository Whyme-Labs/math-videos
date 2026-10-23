import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Bag, Person } from "../components/study";
import { useStrings } from "../i18n";

// Chinese edition only. 《墨子·经下》: "以言为尽悖，悖。说在其言。" The line
// arrives on bamboo slips. Then a man on a crate holds up a sign, 所有的话
// 都是错的; an arrow curls from the sign back onto itself, the green tick
// turns into a red cross and the sign is stamped 悖. Last, the sign becomes
// the bag R with the same arrow looping back onto itself.

const SLIP_W = 120;
const SLIP_X = (i: number) => 1540 - i * (SLIP_W + 40);
const SLIP_Y = 140;
const SLIP_H = 600;

export const Mojing: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("mojing");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 8 + i * 12;
  const slips = fadeOut(frame, c1, 10);
  const arrow = glide(frame, c1 + 30, fps, 24);
  const flip = frame >= c1 + 60;
  const stamp = springIn(frame, c1 + 70, fps, 9);
  const toBag = glide(frame, c2 + 4, fps, 24);

  return (
    <SceneShell id="mojing">
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="pop" at={c1 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.16} />
      <Sfx name="scratch" at={c1 + 60} volume={0.2} />
      <Sfx name="thud" at={c1 + 70} volume={0.4} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.14} />
      <Sfx name="chime" at={c2 + 40} />

      {/* the slips, right to left */}
      <AbsoluteFill style={{ opacity: slips }}>
        <svg width={1920} height={1080}>
          {tx.quote.map((q, i) => {
            const t = glide(frame, slipAt(i), fps, 16);
            return (
              <g
                key={q}
                opacity={t}
                transform={`translate(0 ${lerp(-60, 0, t)})`}
              >
                <rect
                  x={SLIP_X(i)}
                  y={SLIP_Y}
                  width={SLIP_W}
                  height={SLIP_H}
                  rx={14}
                  fill={colors.wood}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                {[0.1, 0.9].map((f) => (
                  <line
                    key={f}
                    x1={SLIP_X(i) - 10}
                    y1={SLIP_Y + SLIP_H * f}
                    x2={SLIP_X(i) + SLIP_W + 10}
                    y2={SLIP_Y + SLIP_H * f}
                    stroke={colors.ink}
                    strokeWidth={5}
                  />
                ))}
                {[...q].map((ch, j) => (
                  <text
                    key={j}
                    x={SLIP_X(i) + SLIP_W / 2}
                    y={SLIP_Y + 120 + j * 80}
                    fill={colors.ink}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                  >
                    {ch}
                  </text>
                ))}
              </g>
            );
          })}
          <text
            x={300}
            y={300}
            fill={colors.primary}
            fontSize={60}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 4)}
          >
            {tx.mojingSource}
          </text>
        </svg>
      </AbsoluteFill>

      {/* the man and his sign, then the bag R */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <Camera zoom={lerp(1, 1.1, arrow)} x={lerp(0, 100, toBag)} y={0}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <g opacity={1 - toBag}>
              <rect
                x={260}
                y={780}
                width={260}
                height={60}
                rx={6}
                fill={colors.wood}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <Person
                x={390}
                y={780}
                color={colors.orange}
                size={2.2}
                bob={frame < c1 + 30 ? frame / 4 : 0}
              />
              {/* the sign */}
              <g
                transform={`translate(${520 + (flip ? shake(frame, c1 + 60, 12) : 0)} 330)`}
              >
                <rect
                  x={0}
                  y={-20}
                  width={14}
                  height={340}
                  fill={colors.wood}
                />
                <rect
                  x={-20}
                  y={-120}
                  width={720}
                  height={150}
                  rx={14}
                  fill={colors.paper}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
                <text
                  x={340}
                  y={-22}
                  fill={colors.ink}
                  fontSize={64}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={700}
                >
                  {tx.sign}
                </text>
                <text
                  x={760}
                  y={-10}
                  fill={flip ? colors.red : colors.green}
                  fontSize={110}
                  fontWeight={800}
                  opacity={fadeIn(frame, c1 + 14)}
                >
                  {flip ? "✗" : "✓"}
                </text>
              </g>
            </g>
            {/* the arrow that curls back onto the sign (and later onto R) */}
            <path
              d="M 1180 360 C 1460 360 1460 700 1100 700 C 820 700 760 520 860 390"
              fill="none"
              stroke={colors.primary}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={1400}
              strokeDashoffset={1400 * (1 - arrow)}
              opacity={1 - toBag}
            />
            <polygon
              points="0,-22 34,0 0,22"
              fill={colors.primary}
              transform="translate(860 390) rotate(-52)"
              opacity={(arrow >= 1 ? 1 : 0) * (1 - toBag)}
            />
            {/* stamped 悖 */}
            <g
              opacity={Math.min(1, stamp) * (1 - toBag)}
              transform={`translate(1300 620) rotate(-12) scale(${lerp(1.8, 1, Math.min(1, stamp))})`}
            >
              <rect
                x={-90}
                y={-90}
                width={180}
                height={180}
                rx={16}
                fill={alpha(colors.bg, 0.6)}
                stroke={colors.red}
                strokeWidth={10}
              />
              <text
                x={0}
                y={40}
                fill={colors.red}
                fontSize={120}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={900}
              >
                {tx.bei}
              </text>
            </g>
            {/* the bag R, pointing at itself the same way */}
            <g opacity={toBag}>
              <Bag
                x={900}
                y={820}
                w={520}
                h={400}
                label="R"
                color={colors.violet}
              >
                <text
                  x={0}
                  y={-140}
                  fill={colors.highlight}
                  fontSize={180}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  R
                </text>
              </Bag>
              <path
                d="M 1150 460 C 1450 400 1500 760 1180 760"
                fill="none"
                stroke={colors.primary}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={900}
                strokeDashoffset={900 * (1 - glide(frame, c2 + 20, fps, 20))}
              />
              <text
                x={1460}
                y={420}
                fill={colors.highlight}
                fontSize={72}
                fontFamily={fonts.title}
                fontWeight={800}
                opacity={fadeIn(frame, c2 + 40)}
              >
                {tx.self}
              </text>
            </g>
          </svg>
        </Camera>
      </AbsoluteFill>
    </SceneShell>
  );
};
