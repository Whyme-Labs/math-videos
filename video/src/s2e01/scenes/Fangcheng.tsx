import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《九章算术·方程》, problem 1: three grades of grain.
// The counting board holds three columns, read right to left as in the
// book: 右行 3 2 1 | 39, 中行 2 3 1 | 34, 左行 1 2 3 | 26. Then 遍乘直除: the
// middle column is multiplied through by 3 (6 9 3 | 102), and the right
// column is taken away from it twice, leaving 0 5 1 | 24. Scaling a whole
// column and subtracting a whole column: the two moves of a vector space.
// The answer: 上禾 one bundle, 9¼ 斗.

const COLS = [
  [3, 2, 1, 39], // 右行
  [2, 3, 1, 34], // 中行
  [1, 2, 3, 26], // 左行
];
const COL_X = [1240, 960, 680]; // right to left
const ROW_Y = [300, 420, 540, 700];

export const Fangcheng: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fangcheng");
  const [c0, c1, c2] = cues;
  const colAt = (k: number) => c0 + 30 + k * 20;
  const times3 = glide(frame, c1 + 30, fps, 16);
  const minus1 = glide(frame, c1 + 80, fps, 16);
  const minus2 = glide(frame, c1 + 120, fps, 16);
  const answer = Math.min(1, springIn(frame, c2 + 60, fps, 10));

  // the middle column as it changes
  const mid = COLS[1].map((v, i) => {
    const scaled = v * 3;
    const r = COLS[0][i];
    if (minus2 > 0.5) return scaled - 2 * r;
    if (minus1 > 0.5) return scaled - r;
    if (times3 > 0.5) return scaled;
    return v;
  });

  return (
    <SceneShell id="fangcheng">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {COLS.map((_, k) => (
        <Sfx key={k} name="clink" at={colAt(k)} volume={0.14} />
      ))}
      <Sfx name={PLUCKS[2]} at={c1 + 30} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 80} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 120} volume={0.14} />
      <Sfx name="ding" at={c1 + 136} />
      <Sfx name="chime" at={c2 + 60} />

      <AbsoluteFill>
        <svg width={1920} height={1080}>
          {/* the counting board */}
          <rect
            x={480}
            y={200}
            width={960}
            height={600}
            rx={20}
            fill={alpha(colors.wood, 0.3)}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <line
            x1={500}
            y1={620}
            x2={1420}
            y2={620}
            stroke={colors.wood}
            strokeWidth={6}
          />
          {/* row names, on the left */}
          {tx.rows.map((r, i) => (
            <text
              key={r}
              x={420}
              y={ROW_Y[i] + 18}
              fill={colors.muted}
              fontSize={44}
              textAnchor="end"
              fontFamily={fonts.title}
              fontWeight={800}
              opacity={fadeIn(frame, c0 + 20)}
            >
              {r}
            </text>
          ))}
          {COLS.map((col, k) => {
            const s = Math.min(1, springIn(frame, colAt(k), fps, 10));
            const values = k === 1 ? mid : col;
            const isMid = k === 1;
            const lit = isMid && times3 > 0;
            const isRight = k === 0;
            const flash =
              isRight &&
              ((minus1 > 0 && minus1 < 1) || (minus2 > 0 && minus2 < 1));
            // the right column slides across onto the middle while subtracting
            const slideX = isRight
              ? lerp(
                  0,
                  COL_X[1] - COL_X[0],
                  Math.sin(
                    Math.PI *
                      Math.max(
                        minus1 < 1 ? minus1 : 0,
                        minus2 < 1 ? minus2 : 0,
                      ),
                  ) * 0.6,
                )
              : 0;
            return (
              <g key={k} opacity={s} transform={`translate(${slideX} 0)`}>
                <rect
                  x={COL_X[k] - 90}
                  y={230}
                  width={180}
                  height={540}
                  rx={16}
                  fill={lit ? alpha(colors.primary, 0.18) : "none"}
                  stroke={
                    flash
                      ? colors.orange
                      : lit
                        ? colors.primary
                        : alpha(colors.paper, 0.3)
                  }
                  strokeWidth={lit || flash ? 5 : 3}
                />
                {values.map((v, i) => (
                  <text
                    key={i}
                    x={COL_X[k]}
                    y={ROW_Y[i] + 22}
                    fill={v === 0 ? colors.green : colors.text}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    {v}
                  </text>
                ))}
              </g>
            );
          })}
          {/* the moves */}
          {[
            { t: "× 3", at: c1 + 30, x: COL_X[1], c: colors.primary },
            { t: "− 右行", at: c1 + 80, x: COL_X[1], c: colors.orange },
            { t: "− 右行", at: c1 + 120, x: COL_X[1], c: colors.orange },
          ].map((m, k) => (
            <text
              key={k}
              x={m.x}
              y={180}
              fill={m.c}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
              opacity={
                fadeIn(frame, m.at, 6) *
                (k < 2 ? 1 - fadeIn(frame, [c1 + 80, c1 + 120][k], 6) : 1)
              }
            >
              {m.t}
            </text>
          ))}
          <g
            opacity={answer}
            transform={`translate(1680 500) scale(${answer})`}
          >
            <rect
              x={-200}
              y={-70}
              width={400}
              height={130}
              rx={24}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              y={20}
              fill={colors.ink}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.answer}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 6),
            translate: riseIn(frame, c0 + 6, 16),
          }}
        >
          {tx.jiuzhang}
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 120,
            fontFamily: fonts.title,
            fontSize: 64,
            fontWeight: 900,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 16),
          }}
        >
          {tx.method}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
