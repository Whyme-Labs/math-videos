import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 秦九韶《数书九章》(1247), the problem 遥度圆城: a round
// walled city with four gates, a tree 3 li north of the north gate; walk
// out of the south gate and 9 li east and the tree just comes into view; the answer comes from a
// tenth-degree equation, x¹⁰ + 15x⁸ + 72x⁶ − 864x⁴ − 11664x² − 34992 = 0,
// whose root x = 3 gives 城径九里 (x² = 9). His 正负开方术 finds it one digit
// at a time: an odometer of digits rolls and settles. Then the contrast:
// 数值 ✓ versus 公式 ?.

const CITY = { x: 700, y: 480, r: 200 };
const TREE = { x: 700, y: 140 };

export const Qin: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("qin");
  const [c0, c1, c2] = cues;
  const walls = glide(frame, c0 + 10, fps, 24);
  const sight = glide(frame, c0 + 50, fps, 20);
  const badge = Math.min(1, springIn(frame, c0 + 90, fps, 10));
  // digits rolling: tens of tries, then the settled root
  const roll = Math.min(1, Math.max(0, (frame - (c1 + 10)) / 70));
  const digits = roll < 1 ? Math.floor(frame / 3) % 10 : 3;
  const settled = roll >= 1;
  const answer = Math.min(1, springIn(frame, c1 + 90, fps, 10));
  const contrast = glide(frame, c2 + 10, fps, 20);

  return (
    <SceneShell id="qin">
      <Sfx name="page" at={c0 + 10} volume={0.16} />
      <Sfx name="scratch" at={c0 + 50} volume={0.16} />
      <Sfx name="scratch" at={c0 + 70} volume={0.14} />
      <Sfx name="pop" at={c0 + 90} volume={0.18} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 10 + k * 9} volume={0.1} />
      ))}
      <Sfx name="ding" at={c1 + 80} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.14} />
      <Sfx name="thud" at={c2 + 40} volume={0.24} />

      <AbsoluteFill style={{ opacity: fadeOut(frame, c2, 10) }}>
        <svg width={1920} height={1080}>
          {/* the round city, its four gates, the tree */}
          <circle
            cx={CITY.x}
            cy={CITY.y}
            r={CITY.r}
            fill={alpha(colors.wood, 0.25)}
            stroke={colors.wood}
            strokeWidth={22}
            strokeDasharray={`${1257 * walls} 1257`}
            transform={`rotate(-90 ${CITY.x} ${CITY.y})`}
          />
          {[0, 90, 180, 270].map((d) => {
            const a = (d * Math.PI) / 180;
            return (
              <rect
                key={d}
                x={CITY.x + CITY.r * Math.cos(a) - 24}
                y={CITY.y + CITY.r * Math.sin(a) - 24}
                width={48}
                height={48}
                rx={6}
                fill={colors.primary}
                stroke={colors.ink}
                strokeWidth={4}
                opacity={walls}
              />
            );
          })}
          <g opacity={fadeIn(frame, c0 + 30)}>
            <rect
              x={TREE.x - 8}
              y={TREE.y}
              width={16}
              height={50}
              fill={colors.wood}
            />
            <circle cx={TREE.x} cy={TREE.y - 10} r={40} fill={colors.green} />
          </g>
          {/* out of the south gate, nine li east, then the tree comes into
              view: the sightline grazes the wall */}
          <line
            x1={CITY.x}
            y1={CITY.y + CITY.r}
            x2={lerp(CITY.x, CITY.x + 2 * CITY.r, sight)}
            y2={CITY.y + CITY.r}
            stroke={colors.green}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <line
            x1={CITY.x + 2 * CITY.r}
            y1={CITY.y + CITY.r}
            x2={lerp(
              CITY.x + 2 * CITY.r,
              TREE.x,
              glide(frame, c0 + 70, fps, 20),
            )}
            y2={lerp(CITY.y + CITY.r, TREE.y, glide(frame, c0 + 70, fps, 20))}
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
            opacity={frame >= c0 + 70 ? 1 : 0}
          />
          <text
            x={CITY.x}
            y={CITY.y + 20}
            fill={colors.text}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.qinProblem}
          </text>
          <g
            opacity={badge}
            transform={`translate(1360 300) rotate(-4) scale(${badge})`}
          >
            <rect
              x={-220}
              y={-64}
              width={440}
              height={120}
              rx={24}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              x={0}
              y={20}
              fill={colors.ink}
              fontSize={62}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.tenth}
            </text>
          </g>
          {/* 正负开方术: digits roll and settle */}
          <g opacity={fadeIn(frame, c1 + 4)}>
            <rect
              x={1240}
              y={440}
              width={240}
              height={180}
              rx={20}
              fill={alpha(colors.ink, 0.6)}
              stroke={settled ? colors.green : colors.primary}
              strokeWidth={6}
            />
            <text
              x={1360}
              y={570}
              fill={settled ? colors.green : colors.text}
              fontSize={140}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {digits}
            </text>
            <text
              x={1180}
              y={570}
              fill={colors.text}
              fontSize={100}
              textAnchor="end"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              x =
            </text>
          </g>
          <text
            x={1360}
            y={740}
            fill={colors.green}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={answer}
          >
            {tx.answer}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 44,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 6),
            translate: riseIn(frame, c0 + 6, 16),
          }}
        >
          {tx.qinBook}
        </div>
      </AbsoluteFill>

      {/* numbers, yes; a formula, unknown */}
      <AbsoluteFill
        style={{
          opacity: contrast,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 160,
          bottom: 120,
        }}
      >
        {[
          { t: tx.numeric, c: colors.green, at: c2 + 10 },
          { t: tx.formula, c: colors.highlight, at: c2 + 40 },
        ].map((b) => (
          <div
            key={b.t}
            style={{
              fontFamily: fonts.title,
              fontSize: 110,
              fontWeight: 900,
              color: b.c,
              padding: "30px 60px",
              border: `6px solid ${b.c}`,
              borderRadius: 30,
              scale: lerp(1.4, 1, Math.min(1, springIn(frame, b.at, fps, 10))),
              opacity: fadeIn(frame, b.at, 6),
            }}
          >
            {b.t}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
