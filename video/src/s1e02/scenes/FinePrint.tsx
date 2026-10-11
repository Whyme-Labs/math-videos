import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  NextArrow,
  NumberNode,
  Token,
  tokenPosition,
} from "../components/graph";
import { useStrings } from "../i18n";

// Each row is a set of numbers: dot k is lit when k is in the set.
const ROWS = 9;
const COLS = 14;
const rowY = (r: number) => 220 + r * 50;
const colX = (c: number) => 540 + c * 66;
const PRIMES = new Set([2, 3, 5, 7, 11, 13]);
// Rows a formula describes, and which formula.
const FORMULA_ROWS: Record<number, (n: number) => boolean> = {
  0: (n) => n % 2 === 0,
  3: (n) => PRIMES.has(n),
  6: (n) => n > 5,
};
const FORMULA_INDEX: Record<number, number> = { 0: 0, 3: 1, 6: 2 };
// The other rows: arbitrary sets with no pattern (fixed pseudo-random bits).
const member = (r: number, n: number) =>
  FORMULA_ROWS[r]
    ? FORMULA_ROWS[r](n)
    : ((r * 7919 + n * 104729 + ((r * n) % 13) * 31) % 97) % 3 === 0;

const standard = (i: number) => ({ x: 180 + i * 150, y: 420 });
const zchain = (i: number) => ({ x: 1060 + i * 150, y: 420 });
const Z_LABELS = ["c−2", "c−1", "c", "c+1", "c+2"];

export const FinePrint: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("finePrint");
  const [c0, c1, c2, c3, c4] = cues;

  const SWEEP = 46;
  const sweep = ramp(frame, c1 + 6, SWEEP);
  const bandY = interpolate(sweep, [0, 1], [rowY(0) - 40, rowY(ROWS - 1) + 40]);
  // Frame the spotlight passes row r.
  const passAt = (r: number) =>
    c1 +
    6 +
    Math.round(
      ((rowY(r) - rowY(0) + 40) / (rowY(ROWS - 1) - rowY(0) + 80)) * SWEEP,
    );
  const lit = (r: number) => (FORMULA_ROWS[r] ? ramp(frame, passAt(r), 6) : 0);
  const gridOut = fadeOut(frame, c3 - 2, 12);
  const zIn = glide(frame, c3 + 20, fps, 24);
  const upStart = c3 + 30;
  const backStart = c3 + 56;

  return (
    <SceneShell id="finePrint">
      <Sfx name="page" at={c0 + 4} />
      {Array.from({ length: ROWS }).map((_, r) => (
        <Sfx key={r} name="tick" at={c0 + 10 + r * 4} volume={0.1} />
      ))}
      <Sfx name="riser" at={c1 + 2} volume={0.18} />
      {[0, 3, 6].map((r) => (
        <Sfx key={`f${r}`} name="chime" at={passAt(r) + 2} volume={0.2} />
      ))}
      <Sfx name="pop" at={c2 + 6} volume={0.25} />
      <Sfx name="pop" at={c2 + 20} volume={0.25} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={`s${i}`} name="tick" at={c3 + 4 + i * 4} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c3 + 20} />
      <Sfx name="page" at={c4 + 4} volume={0.2} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 2) * gridOut,
            translate: riseIn(frame, c0 + 2),
          }}
        >
          {tx.everySet}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={gridOut}>
            {/* The spotlight sweeping down the rows. */}
            <rect
              x={140}
              y={bandY - 32}
              width={1440}
              height={64}
              rx={32}
              fill={alpha(colors.primary, 0.12)}
              opacity={sweep > 0 && sweep < 1 ? 1 : 0}
            />
            <text
              x={1600}
              y={bandY + 10}
              fill={colors.primary}
              fontSize={30}
              opacity={sweep > 0 && sweep < 1 ? 1 : 0}
            >
              {tx.formulas}
            </text>
            {Array.from({ length: ROWS }).map((_, r) => {
              const enter = springIn(frame, c0 + 10 + r * 4, fps, 13);
              const l = lit(r);
              const isFormula = Boolean(FORMULA_ROWS[r]);
              return (
                <g
                  key={r}
                  transform={`translate(${(1 - Math.min(1, enter)) * 600} 0)`}
                  opacity={
                    Math.min(1, enter) *
                    (frame >= c1 + 6
                      ? isFormula
                        ? 0.4 + 0.6 * l
                        : 0.35
                      : 0.75)
                  }
                >
                  {Array.from({ length: COLS }).map((__, n) => (
                    <circle
                      key={n}
                      cx={colX(n)}
                      cy={rowY(r)}
                      r={member(r, n) ? 12 : 6}
                      fill={
                        member(r, n)
                          ? l > 0.5
                            ? colors.primary
                            : colors.text
                          : "none"
                      }
                      stroke={member(r, n) ? "none" : alpha(colors.muted, 0.6)}
                      strokeWidth={2}
                    />
                  ))}
                  <text
                    x={colX(COLS - 1) + 40}
                    y={rowY(r) + 8}
                    fill={colors.muted}
                    fontSize={26}
                  >
                    …
                  </text>
                  {!isFormula ? (
                    <text
                      x={colX(COLS - 1) + 90}
                      y={rowY(r) + 10}
                      fill={colors.orange}
                      fontSize={30}
                      opacity={fadeIn(frame, c2 + 20)}
                    >
                      ?
                    </text>
                  ) : null}
                </g>
              );
            })}
            {/* Formula labels next to the rows they describe. */}
            {[0, 3, 6].map((r) => (
              <text
                key={r}
                x={500}
                y={rowY(r) + 10}
                fill={colors.primary}
                fontSize={30}
                textAnchor="end"
                fontFamily={fonts.body}
                opacity={lit(r)}
              >
                {tx.formulaRows[FORMULA_INDEX[r]]}
              </text>
            ))}
            {/* Column numbers. */}
            {Array.from({ length: COLS }).map((_, n) => (
              <text
                key={n}
                x={colX(n)}
                y={rowY(0) - 34}
                fill={colors.muted}
                fontSize={22}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, c0 + 10)}
              >
                {n}
              </text>
            ))}
          </g>

          {/* A non-standard model: ℕ, then a chain with no first and no last element. */}
          <g opacity={fadeIn(frame, c3 + 2, 12)}>
            {[0, 1, 2, 3, 4].map((i) => {
              const s = springIn(frame, c3 + 4 + i * 4, fps, 12);
              return (
                <g key={i}>
                  {i > 0 ? (
                    <NextArrow
                      a={standard(i - 1)}
                      b={standard(i)}
                      progress={Math.min(1, s)}
                    />
                  ) : null}
                  <NumberNode
                    x={standard(i).x}
                    y={standard(i).y}
                    label={String(i)}
                    scale={Math.min(1, s)}
                  />
                </g>
              );
            })}
            <text
              x={standard(4).x + 70}
              y={432}
              fill={colors.muted}
              fontSize={40}
            >
              …
            </text>
          </g>
          <g
            transform={`translate(${(1 - zIn) * 900} 0)`}
            opacity={Math.min(1, zIn * 1.5)}
          >
            <NextArrow
              a={{ x: zchain(0).x - 150, y: 420 }}
              b={zchain(0)}
              color={colors.orange}
              dashed
              dashOffset={-frame * 1.2}
            />
            {Z_LABELS.map((label, i) => (
              <g key={label}>
                {i > 0 ? (
                  <NextArrow
                    a={zchain(i - 1)}
                    b={zchain(i)}
                    color={colors.orange}
                  />
                ) : null}
                <NumberNode
                  x={zchain(i).x}
                  y={zchain(i).y}
                  label={label}
                  color={colors.orange}
                  fontSize={24}
                />
              </g>
            ))}
            <NextArrow
              a={zchain(4)}
              b={{ x: zchain(4).x + 150, y: 420 }}
              color={colors.orange}
              dashed
              dashOffset={-frame * 1.2}
            />
            <text
              x={zchain(0).x - 200}
              y={432}
              fill={colors.orange}
              fontSize={40}
              textAnchor="end"
            >
              …
            </text>
            <text
              x={zchain(4).x + 170}
              y={432}
              fill={colors.orange}
              fontSize={40}
            >
              …
            </text>
            {/* Walking back from c never finds a first element: the token
                fades into the "…" and starts again from c. */}
            {frame >= backStart ? (
              <Token
                p={tokenPosition(frame, backStart, 16, (k) => ({
                  x: zchain(2).x - 150 * (k % 4),
                  y: 420 - 58,
                }))}
                color={colors.orange}
                opacity={
                  fadeIn(
                    frame,
                    backStart + Math.floor((frame - backStart) / 64) * 64,
                    6,
                  ) *
                  (1 -
                    ramp(
                      frame,
                      backStart +
                        Math.floor((frame - backStart) / 64) * 64 +
                        44,
                      16,
                    ))
                }
              />
            ) : null}
          </g>
          {/* Counting up from 0 stops at "…": it never reaches c. */}
          {frame >= upStart ? (
            <Token
              p={tokenPosition(frame, upStart, 10, (k) => ({
                x: standard(Math.min(k, 4)).x,
                y: 420 - 58,
              }))}
            />
          ) : null}
        </svg>

        {/* Formulas can be listed; sets can't. */}
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 180,
            fontSize: 34,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 6) * gridOut,
            translate: riseIn(frame, c2 + 6, 16),
          }}
        >
          {tx.formulaCount}
        </div>
        <div
          style={{
            position: "absolute",
            top: 700,
            right: 180,
            fontSize: 34,
            color: colors.orange,
            opacity: fadeIn(frame, c2 + 20) * gridOut,
            translate: riseIn(frame, c2 + 20, 16),
          }}
        >
          {tx.setCount}
        </div>

        <div
          style={{
            position: "absolute",
            top: 500,
            left: zchain(0).x - 60,
            width: zchain(4).x - zchain(0).x + 120,
            textAlign: "center",
            fontSize: 38,
            color: colors.orange,
            opacity: fadeIn(frame, c3 + 46),
            translate: riseIn(frame, c3 + 46, 16),
          }}
        >
          {tx.noEnds}
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c4 + 4),
            translate: riseIn(frame, c4 + 4, 16),
          }}
        >
          {tx.callback13}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
