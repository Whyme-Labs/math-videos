import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 苏蕙's 璇玑图: a 29 × 29 weave of 841 characters,
// drawn here as small woven cells. The grid weaves itself in, row by row.
// A lemon band reads along one row (横读), then a pink band reads down one
// column (竖读). Last, the grid, striped by row, flips across its diagonal
// and the stripes turn upright: rows read as columns.

const N = 29;
const CELL = 22;
const X0 = 960 - (N * CELL) / 2;
const Y0 = 470 - (N * CELL) / 2;

export const Xuanji: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("xuanji");
  const [c0, c1, c2] = cues;
  const weave = ramp(frame, c0 + 10, 60);
  const rowBand = ramp(frame, c1 + 10, 40);
  const colBand = ramp(frame, c1 + 60, 40);
  const flip = glide(frame, c2 + 20, fps, 50);
  const tint = (k: number) =>
    [
      colors.primary,
      colors.orange,
      colors.highlight,
      colors.green,
      colors.paper,
    ][k % 5];

  return (
    <SceneShell id="xuanji">
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 10 + k * 10} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.12} />
      <Sfx name="riser" at={c2 + 20} volume={0.1} />
      <Sfx name="chime" at={c2 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={X0 - 20}
          y={Y0 - 20}
          width={N * CELL + 40}
          height={N * CELL + 40}
          rx={10}
          fill={alpha(colors.wood, 0.25)}
          stroke={colors.wood}
          strokeWidth={6}
        />
        {Array.from({ length: N * N }).map((_, k) => {
          const i = Math.floor(k / N);
          const j = k % N;
          if (i / N > weave) return null;
          // striped by row; after the flip the stripe follows the column
          const x = X0 + (j + (i - j) * flip) * CELL;
          const y = Y0 + (i + (j - i) * flip) * CELL;
          return (
            <rect
              key={k}
              x={x + 3}
              y={y + 3}
              width={CELL - 6}
              height={CELL - 6}
              rx={3}
              fill={alpha(tint(i), 0.55)}
            />
          );
        })}
        {/* reading bands */}
        <rect
          x={X0 - 10}
          y={Y0 + 14 * CELL}
          width={(N * CELL + 20) * rowBand}
          height={CELL}
          fill="none"
          stroke={colors.primary}
          strokeWidth={5}
          opacity={rowBand > 0 ? 1 - flip : 0}
        />
        <rect
          x={X0 + 14 * CELL}
          y={Y0 - 10}
          width={CELL}
          height={(N * CELL + 20) * colBand}
          fill="none"
          stroke={colors.highlight}
          strokeWidth={5}
          opacity={colBand > 0 ? 1 - flip : 0}
        />
        <text
          x={X0 - 40}
          y={Y0 + 14 * CELL + 18}
          fill={colors.primary}
          fontSize={44}
          textAnchor="end"
          fontWeight={800}
          opacity={fadeIn(frame, c1 + 10) * (1 - flip)}
        >
          {tx.byRows}
        </text>
        <text
          x={X0 + 14 * CELL + 11}
          y={Y0 - 36}
          fill={colors.highlight}
          fontSize={44}
          textAnchor="middle"
          fontWeight={800}
          opacity={fadeIn(frame, c1 + 60) * (1 - flip)}
        >
          {tx.byCols}
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.xuanjiTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1360,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 50),
        }}
      >
        {tx.xuanjiCount}
      </div>
    </SceneShell>
  );
};
