import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《授时历》(1280, 郭守敬, 王恂 and others) and its
// 招差术, the method of differences. A row of cubes 0 1 8 27 64; below it
// the differences 1 7 19 37, then 6 12 18, then 6 6: equal at last. Then
// the other way: from the constant 6, add back up one row at a time, 24,
// 61, and the next cube, 125, arrives without multiplying anything.

const ROWS = [
  [0, 1, 8, 27, 64],
  [1, 7, 19, 37],
  [6, 12, 18],
  [6, 6],
];
const NEXT = [125, 61, 24, 6];
const X0 = 420;
const DX = 230;
const Y0 = 300;
const DY = 130;
const xOf = (row: number, i: number) => X0 + i * DX + row * (DX / 2);

export const Zhaocha: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zhaocha");
  const [c0, c1, c2] = cues;
  const rowAt = (r: number) => (r === 0 ? c0 + 40 : c1 + 10 + (r - 1) * 34);
  const backAt = (r: number) => c2 + 10 + (3 - r) * 20;

  return (
    <SceneShell id="zhaocha">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {[0, 1, 2, 3].map((r) => (
        <Sfx key={r} name={PLUCKS[r]} at={rowAt(r)} volume={0.14} />
      ))}
      {[3, 2, 1, 0].map((r) => (
        <Sfx key={`b${r}`} name="clink" at={backAt(r)} volume={0.16} />
      ))}
      <Sfx name="chime" at={backAt(0) + 10} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {ROWS.map((row, r) =>
          row.map((v, i) => {
            const s = Math.min(1, springIn(frame, rowAt(r) + i * 4, fps, 10));
            const eq = r === 3;
            return (
              <g key={`${r}-${i}`} opacity={s}>
                <rect
                  x={xOf(r, i) - 80}
                  y={Y0 + r * DY - 50}
                  width={160}
                  height={92}
                  rx={18}
                  fill={alpha(r === 0 ? colors.violet : colors.ink, 0.85)}
                  stroke={eq ? colors.green : colors.primary}
                  strokeWidth={eq ? 6 : 3}
                />
                <text
                  x={xOf(r, i)}
                  y={Y0 + r * DY + 18}
                  fill={eq ? colors.green : colors.text}
                  fontSize={54}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {v}
                </text>
              </g>
            );
          }),
        )}
        {/* adding back up: the next entry of every row */}
        {NEXT.map((v, r) => {
          const t = glide(frame, backAt(r), fps, 12);
          const i = ROWS[r].length;
          return (
            <g key={`n${r}`} opacity={t}>
              <rect
                x={xOf(r, i) - 80}
                y={Y0 + r * DY - 50}
                width={160}
                height={92}
                rx={18}
                fill={alpha(colors.orange, 0.9)}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                x={xOf(r, i)}
                y={Y0 + r * DY + 18}
                fill={colors.ink}
                fontSize={54}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={900}
              >
                {v}
              </text>
            </g>
          );
        })}
        <text
          x={xOf(3, 0) - 260}
          y={Y0 + 3 * DY + 18}
          fill={colors.green}
          fontSize={52}
          textAnchor="middle"
          fontWeight={900}
          opacity={fadeIn(frame, rowAt(3) + 10)}
        >
          =
        </text>
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
        {tx.shoushi}
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
          opacity: fadeIn(frame, c0 + 20),
          translate: riseIn(frame, c0 + 20, 16),
        }}
      >
        {tx.zhaocha}
      </div>
    </SceneShell>
  );
};
