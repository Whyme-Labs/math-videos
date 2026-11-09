import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The uniform boundedness principle. A grid of points, each with its own
// bound supₐ‖Tₐx‖ (c0). Points light up level by level: F₁, then F₂, …,
// each Fₙ the points whose bound is at most n (c1). Every point is lit, so
// some F_N holds a whole ball: a disc drops onto it (c2). A vector z of
// length < r swings round the ball's centre; ‖Tz‖ ≤ 2N, so every ‖T‖ ≤
// 2N / r (c3). Contrapositive: bars of ‖Tₙ‖ climbing, and a red point x
// whose readings climb with them (c4).

const GX = 260;
const GY = 170;
const CELL = 50;
const NC = 16;
const NR = 12;
const bound = (i: number, j: number) =>
  1 +
  2.6 *
    (1 +
      Math.sin(0.42 * i + 0.25 * j + 0.6) *
        Math.cos(0.33 * j - 0.27 * i + 0.4)) +
  0.6 * Math.abs(Math.sin(i * 7.1 + j * 3.3));
const LEVEL = (i: number, j: number) => Math.ceil(bound(i, j));
const N = 3;
// the biggest disc of cells all at level ≤ N
const BALL = (() => {
  let best = { i: 0, j: 0, r: 0 };
  for (let i = 0; i < NC; i++)
    for (let j = 0; j < NR; j++)
      for (let r = 1; r < 6; r++) {
        let ok = i - r >= 0 && j - r >= 0 && i + r < NC && j + r < NR;
        for (let a = -r; a <= r && ok; a++)
          for (let b = -r; b <= r && ok; b++)
            if (a * a + b * b <= r * r && LEVEL(i + a, j + b) > N) ok = false;
        if (ok && r > best.r) best = { i, j, r };
      }
  return best;
})();
const LEVEL_COLORS = [
  colors.green,
  colors.primary,
  colors.orange,
  colors.highlight,
  colors.red,
  colors.paper,
  colors.paper,
  colors.paper,
];

export const Ubp: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ubp");
  const [c0, c1, c2, c3, c4] = cues;
  const lit =
    frame < c1 ? 0 : Math.min(8, 1 + Math.floor((frame - c1 - 6) / 18));
  const drop = glide(frame, c2 + 20, fps, 20);
  const cx = GX + (BALL.i + 0.5) * CELL;
  const cy = GY + (BALL.j + 0.5) * CELL;
  const R = BALL.r * CELL;
  const ang = (frame - c3) * 0.06;
  const part2 = fadeIn(frame, c4 + 4, 10);
  const bars = Math.min(10, Math.max(0, Math.floor((frame - c4 - 8) / 6)));

  return (
    <SceneShell id="ubp">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 6 }, (_, k) => (
        <Sfx
          key={k}
          name="pluck1"
          at={c1 + 6 + k * 18}
          volume={0.07 + 0.01 * k}
        />
      ))}
      <Sfx name="thud" at={c2 + 40} volume={0.2} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="ding" at={c3 + 50} volume={0.2} />
      {Array.from({ length: 10 }, (_, k) => (
        <Sfx key={k} name="tick" at={c4 + 8 + k * 6} volume={0.06} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8) * (1 - 0.7 * part2)}>
          {Array.from({ length: NC }, (_, i) =>
            Array.from({ length: NR }, (_, j) => {
              const L = LEVEL(i, j);
              const on = L <= lit;
              return (
                <rect
                  key={`${i}-${j}`}
                  x={GX + i * CELL + 3}
                  y={GY + j * CELL + 3}
                  width={CELL - 6}
                  height={CELL - 6}
                  rx={8}
                  fill={
                    on
                      ? alpha(LEVEL_COLORS[L - 1], 0.75)
                      : alpha(colors.paper, 0.08)
                  }
                />
              );
            }),
          )}
          <circle
            cx={cx}
            cy={cy - 260 * (1 - drop)}
            r={R}
            fill="none"
            stroke={colors.paper}
            strokeWidth={7}
            opacity={fadeIn(frame, c2 + 20, 6)}
          />
          <g opacity={fadeIn(frame, c3 + 6, 8)}>
            <circle cx={cx} cy={cy} r={9} fill={colors.paper} />
            <line
              x1={cx}
              y1={cy}
              x2={cx + 0.9 * R * Math.cos(ang)}
              y2={cy + 0.9 * R * Math.sin(ang)}
              stroke={colors.paper}
              strokeWidth={6}
            />
          </g>
        </g>
        <g opacity={part2}>
          <line
            x1={1220}
            y1={760}
            x2={1780}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: bars }, (_, k) => (
            <rect
              key={k}
              x={1232 + k * 54}
              y={760 - 40 * (k + 1)}
              width={36}
              height={40 * (k + 1)}
              fill={colors.red}
              opacity={0.85}
            />
          ))}
          <circle
            cx={GX + 13.5 * CELL}
            cy={GY + 2.5 * CELL}
            r={18}
            fill={colors.red}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1160,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c4, 8),
        }}
      >
        {Array.from({ length: Math.min(lit, 6) }, (_, k) => (
          <div key={k} style={{ color: LEVEL_COLORS[k] }}>
            F{"₁₂₃₄₅₆"[k]} : ‖Tx‖ ≤ {k + 1}
          </div>
        ))}
      </div>
      <Chip frame={frame} at={c2 + 44} x={1500} y={160} color={colors.paper}>
        F₃ ⊇ {tx.ball}
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 46) * fadeOut(frame, c4, 8),
          whiteSpace: "nowrap",
        }}
      >
        ‖T‖ ≤ 2N / r
      </div>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1220,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 10),
          whiteSpace: "nowrap",
        }}
      >
        ‖Tₙ‖ → ∞
      </div>
      <Chip frame={frame} at={c4 + 60} x={1220} y={240} color={colors.red}>
        {tx.someX}
      </Chip>
    </SceneShell>
  );
};
