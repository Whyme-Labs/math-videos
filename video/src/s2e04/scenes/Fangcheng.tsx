import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 刘徽's commentary on 《九章算术》: "并列为行，故谓之
// 方程" — the rows set side by side are why it's called 方程. The quotation
// types out; then a counting board fills column by column with rods (the
// numbers of 方程 problem 1), and a pair of square brackets closes round
// it: a matrix, two thousand years early. Then the brackets glow and a
// faint light throws its shadow forward, waiting for the 19th century.

const BOARD = [
  [3, 2, 1, 39],
  [2, 3, 1, 34],
  [1, 2, 3, 26],
];

// a counting-rod numeral for 1–9 (vertical form): 1–5 as upright rods, 6–9
// as a crossbar plus uprights
const Rods: React.FC<{
  readonly n: number;
  readonly x: number;
  readonly y: number;
}> = ({ n, x, y }) => {
  const top = n > 5;
  const k = top ? n - 5 : n;
  return (
    <g>
      {top ? (
        <line
          x1={x - 26}
          y1={y - 28}
          x2={x + 26}
          y2={y - 28}
          stroke={colors.paper}
          strokeWidth={7}
          strokeLinecap="round"
        />
      ) : null}
      {Array.from({ length: k }).map((_, i) => (
        <line
          key={i}
          x1={x - (k - 1) * 9 + i * 18}
          y1={y - 18}
          x2={x - (k - 1) * 9 + i * 18}
          y2={y + 26}
          stroke={colors.paper}
          strokeWidth={7}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
};

export const Fangcheng: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fangcheng");
  const [c0, c1, c2] = cues;
  const colAt = (k: number) => c1 + 10 + k * 24;
  const brackets = glide(frame, c1 + 90, fps, 18);
  const glow = fadeIn(frame, c2 + 20, 20);

  return (
    <SceneShell id="fangcheng">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {BOARD.map((_, k) => (
        <Sfx key={k} name="clink" at={colAt(k)} volume={0.14} />
      ))}
      <Sfx name="thud" at={c1 + 100} volume={0.3} />
      <Sfx name="sparkle" at={c2 + 20} />

      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 96,
            color: colors.text,
          }}
        >
          {typed(tx.quote, frame, c0 + 20, fps, 8)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 480,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 60),
            translate: riseIn(frame, c0 + 60, 16),
          }}
        >
          {tx.liuhui}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={560}
            y={180}
            width={800}
            height={560}
            rx={20}
            fill={alpha(colors.wood, 0.25)}
            stroke={colors.wood}
            strokeWidth={8}
          />
          {/* columns right to left, as on the board */}
          {BOARD.map((col, k) => {
            const x = 1180 - k * 220;
            const s = Math.min(1, springIn(frame, colAt(k), fps, 10));
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(0 ${lerp(-40, 0, s)})`}
              >
                {col.slice(0, 3).map((n, r) => (
                  <Rods key={r} n={n} x={x} y={270 + r * 120} />
                ))}
                <text
                  x={x}
                  y={680}
                  fill={colors.primary}
                  fontSize={56}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {col[3]}
                </text>
              </g>
            );
          })}
          <line
            x1={600}
            y1={620}
            x2={1320}
            y2={620}
            stroke={colors.wood}
            strokeWidth={5}
          />
          {/* the brackets: a matrix */}
          <g
            opacity={brackets}
            stroke={glow > 0 ? colors.primary : colors.text}
            strokeWidth={10}
            fill="none"
          >
            <path
              d={`M ${lerp(460, 680, brackets)} 200 l -40 0 l 0 520 l 40 0`}
            />
            <path
              d={`M ${lerp(1460, 1240, brackets)} 200 l 40 0 l 0 520 l -40 0`}
            />
          </g>
          {/* the shadow it will one day be */}
          <polygon
            points="1300,200 1820,120 1820,820 1300,720"
            fill={alpha(colors.primary, 0.12 * glow)}
          />
          <text
            x={1640}
            y={480}
            fill={colors.primary}
            fontSize={72}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={glow}
          >
            十九世纪
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
