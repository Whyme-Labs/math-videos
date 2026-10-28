import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Floor } from "../components/tools";
import { useStrings } from "../i18n";

// The tower law. Three rows of basis tiles: ℚ has 1; ℚ(√2) has 1 and √2;
// adding √3 splits every tile in two, giving 1, √2, √3, √6 (each tile of
// the row below times 1 or √3). 2 × 2 = 4. Then the picture slides left
// and a tower of compass steps rises beside it, each floor at most doubling
// the degree: 1, 2, 4, 8, 16.

const ROWS = [
  { y: 700, name: "ℚ", tiles: ["1"] },
  { y: 520, name: "ℚ(√2)", tiles: ["1", "√2"] },
  { y: 340, name: "ℚ(√2, √3)", tiles: ["1", "√2", "√3", "√6"] },
];
const TILE = 150;
const FLOORS = ["1", "2", "4", "8", "16"];

export const Tower: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const [c0, c1] = cues;
  const rowAt = [c0 + 4, c0 + 12, c0 + 36];
  const tileAt = (r: number, k: number) => rowAt[r] + (r === 2 ? k * 12 : 0);
  const slide = glide(frame, c1 + 4, fps, 24);
  const floorAt = (k: number) => c1 + 30 + k * 22;

  return (
    <SceneShell id="tower">
      {ROWS[2].tiles.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={tileAt(2, k)} volume={0.14} />
      ))}
      <Sfx name="ding" at={c0 + 120} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      {FLOORS.map((_, k) => (
        <Sfx key={`f${k}`} name="clink" at={floorAt(k) + 10} volume={0.16} />
      ))}
      <Sfx name="chime" at={floorAt(4) + 30} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the basis rows, sliding left and shrinking for the tower */}
        <g
          transform={`translate(${lerp(0, -160, slide)} ${lerp(0, 60, slide)}) scale(${lerp(1, 0.8, slide)})`}
        >
          {ROWS.map((row, r) => {
            const n = row.tiles.length;
            return (
              <g key={r}>
                <text
                  x={960 - (2 * TILE + 60)}
                  y={row.y + 18}
                  fill={colors.muted}
                  fontSize={48}
                  textAnchor="end"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={fadeIn(frame, rowAt[r])}
                >
                  {row.name}
                </text>
                {row.tiles.map((t, k) => {
                  const s = Math.min(1, springIn(frame, tileAt(r, k), fps, 10));
                  // each tile grows out of its parent in the row below
                  const x = 960 + (k - (n - 1) / 2) * (TILE + 10);
                  const parent =
                    r === 0
                      ? x
                      : 960 +
                        ((k % ROWS[r - 1].tiles.length) -
                          (ROWS[r - 1].tiles.length - 1) / 2) *
                          (TILE + 10);
                  const cx = lerp(parent, x, s);
                  const cy = lerp(row.y + 180, row.y, s);
                  return (
                    <g key={k} opacity={s > 0 ? 1 : 0}>
                      <rect
                        x={cx - TILE / 2}
                        y={cy - 60}
                        width={TILE}
                        height={120}
                        rx={16}
                        fill={
                          k >= n / 2 && r === 2
                            ? alpha(colors.orange, 0.9)
                            : alpha(colors.violet, 0.9)
                        }
                        stroke={colors.primary}
                        strokeWidth={4}
                      />
                      <text
                        x={cx}
                        y={cy + 20}
                        fill={colors.text}
                        fontSize={58}
                        textAnchor="middle"
                        fontFamily={fonts.math}
                        fontWeight={800}
                      >
                        {t}
                      </text>
                    </g>
                  );
                })}
                {r > 0 ? (
                  <text
                    x={960 + 2 * TILE + 80}
                    y={row.y + 108}
                    fill={colors.green}
                    fontSize={52}
                    fontFamily={fonts.math}
                    fontWeight={800}
                    opacity={fadeIn(frame, rowAt[r] + 10)}
                  >
                    × 2
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>

        {/* every construction: a tower of floors, degree at most doubling */}
        {FLOORS.map((l, k) => {
          const t = glide(frame, floorAt(k), fps, 12);
          return (
            <g
              key={l}
              opacity={t}
              transform={`translate(0 ${lerp(-200, 0, t)})`}
            >
              <Floor
                x={1420}
                y={740 - k * 110}
                w={380}
                label={l}
                color={k === 4 ? alpha(colors.orange, 0.9) : colors.violet}
              />
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 80,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c0 + 120) * (1 - fadeIn(frame, c1, 10)),
          translate: riseIn(frame, c0 + 120, 16),
        }}
      >
        {tx.twoTimesTwo}
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 80,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, floorAt(4) + 30),
          translate: riseIn(frame, floorAt(4) + 30, 16),
        }}
      >
        {tx.powersOfTwo}
      </div>
    </SceneShell>
  );
};
