import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Clock, Young } from "../components/draw";
import { useStrings } from "../i18n";

// The structure theorem, read over ℤ. A blob labelled M breaks into cyclic
// pieces (c0). A chain of clocks 2, 4, 12, each dividing the next (c1).
// 144 = 2⁴ · 3²: the 5 partitions of 4 and the 2 partitions of 2 as Young
// diagrams (c2). The 5 × 2 grid of all ten groups, each named by its
// invariant factors; ℤ/144, ℤ/12 ⊕ ℤ/12 and the Smith example light up (c3).

const P4 = [[4], [3, 1], [2, 2], [2, 1, 1], [1, 1, 1, 1]];
const P2 = [[2], [1, 1]];
// invariant factors from a 2-partition and a 3-partition (largest last)
const factors = (a: number[], b: number[]) => {
  const n = Math.max(a.length, b.length);
  const d = Array.from(
    { length: n },
    (_, i) => 2 ** (a[i] ?? 0) * 3 ** (b[i] ?? 0),
  );
  return d.reverse();
};
const HOT = ["144", "12, 12", "2, 6, 12"];

export const Count: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("count");
  const [c0, c1, c2, c3] = cues;
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const brk = progress(frame, c0 + 30, 40);
  const grid = fadeIn(frame, c2 + 4, 10);
  const cells = fadeIn(frame, c3 + 4, 10);
  const GX = 440;
  const GW = 260;
  const GY = 360;
  const GH = 200;

  return (
    <SceneShell id="count">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck3" at={c1 + 10 + i * 16} volume={0.1} />
      ))}
      {P4.map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 10 + i * 8} volume={0.06} />
      ))}
      <Sfx name="sparkle" at={c3 + 20} volume={0.2} />
      <Sfx name="chime" at={c3 + 60} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={partA * fadeOut(frame, c1, 10)}>
          {[
            [700, 2],
            [960, 6],
            [1220, 12],
          ].map(([x, n], i) => (
            <g key={n} transform={`translate(${(960 - x) * (1 - brk)} 0)`}>
              <Clock
                cx={x}
                cy={430}
                r={60 + 30 * i}
                n={n}
                dot={12}
                opacity={brk}
              />
            </g>
          ))}
          <circle
            cx={960}
            cy={430}
            r={170}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={4}
            opacity={1 - brk}
          />
          <text
            x={960}
            y={450}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={64}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={1 - brk}
          >
            M
          </text>
        </g>
        <g opacity={fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10)}>
          {[
            [560, 2],
            [960, 4],
            [1360, 12],
          ].map(([x, n], i) => (
            <g key={n} opacity={fadeIn(frame, c1 + 10 + i * 16, 8)}>
              <Clock cx={x} cy={430} r={70 + 25 * i} n={n} dot={12} />
              <text
                x={x}
                y={650}
                textAnchor="middle"
                fill={colors.text}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                R/({n})
              </text>
            </g>
          ))}
          {[760, 1160].map((x, i) => (
            <text
              key={x}
              x={x}
              y={450}
              textAnchor="middle"
              fill={colors.green}
              fontSize={72}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, c1 + 30 + i * 16, 8)}
            >
              |
            </text>
          ))}
        </g>
        <g opacity={grid}>
          <text
            x={GX - 40}
            y={250}
            textAnchor="end"
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            2⁴
          </text>
          {P4.map((p, i) => (
            <Young
              key={i}
              x={GX + i * GW + 40}
              y={170}
              parts={p}
              s={26}
              opacity={fadeIn(frame, c2 + 10 + i * 8, 8)}
            />
          ))}
          <text
            x={GX - 40}
            y={GY + 30}
            textAnchor="end"
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            3²
          </text>
          {P2.map((p, j) => (
            <Young
              key={j}
              x={GX - 140}
              y={GY + 60 + j * GH}
              parts={p}
              s={26}
              color={colors.green}
              opacity={fadeIn(frame, c2 + 50 + j * 8, 8)}
            />
          ))}
          {P2.map((b, j) =>
            P4.map((a, i) => {
              const d = factors(a, b).join(", ");
              const hot = HOT.includes(d);
              return (
                <g
                  key={`${i}-${j}`}
                  opacity={cells * fadeIn(frame, c3 + 4 + (i + j * 5) * 3, 6)}
                >
                  <rect
                    x={GX + i * GW}
                    y={GY + 40 + j * GH}
                    width={GW - 20}
                    height={GH - 30}
                    rx={18}
                    fill={alpha(
                      hot ? colors.primary : colors.paper,
                      hot ? 0.18 : 0.05,
                    )}
                    stroke={hot ? colors.primary : alpha(colors.paper, 0.3)}
                    strokeWidth={hot ? 5 : 2}
                  />
                  <text
                    x={GX + i * GW + (GW - 20) / 2}
                    y={GY + 40 + j * GH + (GH - 30) / 2 + 12}
                    textAnchor="middle"
                    fill={hot ? colors.primary : colors.text}
                    fontSize={d.length > 10 ? 30 : 36}
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    ({d})
                  </text>
                </g>
              );
            }),
          )}
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c1, 10) }}>
        <Chip frame={frame} at={c0 + 50} x={760} y={680} size={40}>
          {tx.splits}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 50}
          x={760}
          y={150}
          size={40}
          color={colors.green}
        >
          {tx.divides}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip frame={frame} at={c2 + 20} x={120} y={110} size={40} math>
          144 = 2⁴ · 3²
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c3 + 60}
        x={120}
        y={110}
        size={44}
        math
        color={colors.primary}
      >
        5 × 2 = 10
      </Chip>
    </SceneShell>
  );
};
