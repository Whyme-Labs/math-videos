import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Why ℓ² is complete, as a grid. Each row is one sequence x⁽ⁿ⁾, drawn as
// bars; the rows get closer to one another going down (c0). One column
// lights: coordinate 3 read down the rows, a Cauchy sequence of numbers
// (c1) with its limit ⅓ (c2). The limits of all the columns form a new
// row x in green (c2–c3), with Σ xₖ² read out, finite (c3). Each row's
// distance to x is read out beside it, shrinking (c4).

const ROWS = 5;
const COLS = 12;
const target = (k: number) => 1 / (k + 1);
const row = (n: number) => (k: number) =>
  target(k) + (((k * 7 + n * 3) % 5) - 2) * 0.08 * 0.5 ** n;
const dist = (n: number) =>
  Math.sqrt(
    Array.from({ length: COLS }, (_, k) => (row(n)(k) - target(k)) ** 2).reduce(
      (a, b) => a + b,
      0,
    ),
  );

export const Lp: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("lp");
  const [c0, c1, c2, c3, c4] = cues;
  const BW = 56;
  const X0 = 300;
  const RH = 96;
  const bar = (v: number, x: number, y: number, c: string) => (
    <rect x={x} y={y - v * 70} width={BW - 12} height={v * 70} fill={c} />
  );

  return (
    <SceneShell id="lp">
      {Array.from({ length: ROWS }).map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="ding" at={c3 + 20} volume={0.24} />
      <Sfx name="chime" at={c4 + 40} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={X0 + 2 * BW - 6}
          y={110}
          width={BW}
          height={ROWS * RH + RH + 20}
          rx={10}
          fill={alpha(colors.highlight, 0.12)}
          stroke={colors.highlight}
          strokeWidth={3}
          opacity={fadeIn(frame, c1 + 6, 8)}
        />
        {Array.from({ length: ROWS }).map((_, n) => (
          <g key={n} opacity={fadeIn(frame, c0 + 6 + n * 10, 8)}>
            <line
              x1={X0 - 10}
              y1={190 + n * RH}
              x2={X0 + COLS * BW}
              y2={190 + n * RH}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={2}
            />
            {Array.from({ length: COLS }).map((_, k) =>
              bar(
                row(n)(k),
                X0 + k * BW,
                190 + n * RH,
                k === 2 && frame >= c1 + 6 ? colors.highlight : colors.primary,
              ),
            )}
            <text
              x={X0 - 30}
              y={190 + n * RH - 10}
              fill={colors.muted}
              fontSize={34}
              fontFamily={fonts.math}
              fontWeight={800}
              textAnchor="end"
            >
              x⁽{"¹²³⁴⁵"[n]}⁾
            </text>
            <text
              x={X0 + COLS * BW + 40}
              y={190 + n * RH - 10}
              fill={colors.orange}
              fontSize={34}
              fontFamily={fonts.mono}
              fontWeight={800}
              opacity={fadeIn(frame, c4 + 6 + n * 8, 6)}
            >
              {dist(n).toFixed(3)}
            </text>
          </g>
        ))}
        <g opacity={fadeIn(frame, c2 + 10, 10)}>
          <line
            x1={X0 - 10}
            y1={190 + ROWS * RH + 20}
            x2={X0 + COLS * BW}
            y2={190 + ROWS * RH + 20}
            stroke={colors.green}
            strokeWidth={3}
          />
          {Array.from({ length: COLS }).map((_, k) =>
            bar(target(k), X0 + k * BW, 190 + ROWS * RH + 20, colors.green),
          )}
          <text
            x={X0 - 30}
            y={190 + ROWS * RH + 10}
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
          >
            x
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontSize: 44,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 6),
            whiteSpace: "nowrap",
          }}
        >
          {tx.coordinate} 3<br />
          <span style={{ fontFamily: fonts.mono }}>
            {Array.from({ length: 4 }, (_, n) => row(n)(2).toFixed(2)).join(
              ", ",
            )}
            , …
          </span>
        </div>
        <div
          style={{
            color: colors.green,
            opacity: fadeIn(frame, c2 + 10),
            whiteSpace: "nowrap",
          }}
        >
          → ⅓ · {tx.limit}
        </div>
        <div
          style={{
            color: colors.green,
            fontFamily: fonts.math,
            opacity: fadeIn(frame, c3 + 20),
            translate: riseIn(frame, c3 + 20, 12),
            whiteSpace: "nowrap",
          }}
        >
          Σ xₖ² = π²/6 &lt; ∞
        </div>
        <div
          style={{
            color: colors.orange,
            fontFamily: fonts.math,
            opacity: fadeIn(frame, c4 + 40),
            whiteSpace: "nowrap",
          }}
        >
          ‖x⁽ⁿ⁾ − x‖ → 0
        </div>
      </div>
    </SceneShell>
  );
};
