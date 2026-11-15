import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Clock, Mat } from "../components/draw";
import { useStrings } from "../i18n";

// The Smith normal form of the relation matrix from the lesson's Example 2.
// The matrix, rows labelled by the generators a, b, c and columns by the
// relations (c0). A row move tints a row blue, a column move tints a
// column orange (c1). The remaining moves run to diag(2, 6, 12) (c2). The
// diagonal glows with 2 | 6 | 12 (c3). Three clocks of 2, 6 and 12 (c4).
// The 12-clock splits into a 4-clock and a 3-clock (c5).

type Step = { m: number[][]; label: string; row?: number[]; col?: number[] };
const STEPS: Step[] = [
  {
    m: [
      [2, 4, 4],
      [-6, 6, 12],
      [10, -4, -16],
    ],
    label: "",
  },
  {
    m: [
      [2, 4, 4],
      [0, 18, 24],
      [0, -24, -36],
    ],
    label: "R₂ + 3R₁, R₃ − 5R₁",
    row: [1, 2],
  },
  {
    m: [
      [2, 0, 0],
      [0, 18, 24],
      [0, -24, -36],
    ],
    label: "C₂ − 2C₁, C₃ − 2C₁",
    col: [1, 2],
  },
  {
    m: [
      [2, 0, 0],
      [0, 18, 24],
      [0, -6, -12],
    ],
    label: "R₃ + R₂",
    row: [2],
  },
  {
    m: [
      [2, 0, 0],
      [0, -6, -12],
      [0, 0, -12],
    ],
    label: "R₂ ↔ R₃, R₃ + 3R₂",
    row: [1, 2],
  },
  {
    m: [
      [2, 0, 0],
      [0, 6, 0],
      [0, 0, 12],
    ],
    label: "C₃ − 2C₂, −R₂, −R₃",
    col: [2],
    row: [1, 2],
  },
];
const MX = 620;
const MY = 240;
const CW = 170;
const RH = 120;

export const Smith: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("smith");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const at = [c0, c1 + 20, c1 + 80, c2 + 20, c2 + 60, c2 + 100];
  let k = 0;
  for (let i = 0; i < at.length; i++) if (frame >= at[i]) k = i;
  const st = STEPS[k];
  const flash = k > 0 ? 1 - progress(frame, at[k], 40) : 0;
  const glow = fadeIn(frame, c3 + 6, 10);
  const matOn = fadeIn(frame, c0 + 4, 10) * fadeOut(frame, c4, 12);
  const split = progress(frame, c5 + 10, 30);

  return (
    <SceneShell id="smith">
      <Sfx name="page" at={c0 + 4} volume={0.12} />
      {at.slice(1).map((f, i) => (
        <Sfx key={i} name="pluck2" at={f} volume={0.1} />
      ))}
      <Sfx name="chime" at={c3 + 8} volume={0.24} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c4 + 10 + i * 10} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c5 + 10} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={matOn}>
          {/* row and column tints for the move that just happened */}
          {(st.row ?? []).map((r) => (
            <rect
              key={`r${r}`}
              x={MX - 20}
              y={MY + r * RH + 6}
              width={3 * CW + 40}
              height={RH - 12}
              rx={14}
              fill={alpha(colors.highlight, 0.35 * flash)}
            />
          ))}
          {(st.col ?? []).map((c) => (
            <rect
              key={`c${c}`}
              x={MX + c * CW + 8}
              y={MY - 20}
              width={CW - 16}
              height={3 * RH + 40}
              rx={14}
              fill={alpha(colors.orange, 0.35 * flash)}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <rect
              key={`d${i}`}
              x={MX + i * CW + 20}
              y={MY + i * RH + 14}
              width={CW - 40}
              height={RH - 28}
              rx={16}
              fill="none"
              stroke={colors.green}
              strokeWidth={5}
              opacity={glow}
            />
          ))}
          <Mat
            x={MX}
            y={MY}
            rows={st.m}
            cw={CW}
            rh={RH}
            size={60}
            cell={(i, j) => (glow > 0 && i === j ? colors.green : undefined)}
          />
          {["a", "b", "c"].map((g, i) => (
            <text
              key={g}
              x={MX - 70}
              y={MY + i * RH + RH / 2 + 16}
              textAnchor="middle"
              fill={colors.highlight}
              fontSize={44}
              fontFamily={fonts.math}
              fontStyle="italic"
              fontWeight={700}
              opacity={fadeIn(frame, c0 + 20, 10)}
            >
              {g}
            </text>
          ))}
          {[1, 2, 3].map((r, j) => (
            <text
              key={r}
              x={MX + j * CW + CW / 2}
              y={MY - 40}
              textAnchor="middle"
              fill={colors.orange}
              fontSize={34}
              fontFamily={fonts.mono}
              fontWeight={700}
              opacity={fadeIn(frame, c0 + 30, 10)}
            >
              #{r}
            </text>
          ))}
        </g>
        {/* c4, c5: the group as three clocks; 12 = 4 · 3 */}
        <g opacity={fadeIn(frame, c4 + 6, 10)}>
          <Clock
            cx={360}
            cy={420}
            r={90}
            n={2}
            dot={16}
            opacity={fadeIn(frame, c4 + 10, 8)}
          />
          <Clock
            cx={780}
            cy={420}
            r={140}
            n={6}
            dot={16}
            opacity={fadeIn(frame, c4 + 20, 8)}
          />
          <g opacity={(1 - split) * fadeIn(frame, c4 + 30, 8)}>
            <Clock cx={1340 - 160 * split} cy={420} r={190} n={12} dot={16} />
          </g>
          <g opacity={split}>
            <Clock
              cx={1210}
              cy={420}
              r={110}
              n={4}
              dot={16}
              color={colors.highlight}
            />
            <Clock
              cx={1560}
              cy={420}
              r={110}
              n={3}
              dot={16}
              color={colors.green}
            />
          </g>
          {[
            [360, "ℤ/2"],
            [780, "ℤ/6"],
          ].map(([x, t]) => (
            <text
              key={t}
              x={x}
              y={690}
              textAnchor="middle"
              fill={colors.text}
              fontSize={48}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {t}
            </text>
          ))}
          <text
            x={1340}
            y={690}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={1 - split}
          >
            ℤ/12
          </text>
          <text
            x={1210}
            y={690}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={split}
          >
            ℤ/4
          </text>
          <text
            x={1560}
            y={690}
            textAnchor="middle"
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={split}
          >
            ℤ/3
          </text>
          <text
            x={570}
            y={430}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={56}
            fontFamily={fonts.math}
          >
            ⊕
          </text>
          <text
            x={1035}
            y={430}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={56}
            fontFamily={fonts.math}
          >
            ⊕
          </text>
          <text
            x={1385}
            y={430}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={56}
            fontFamily={fonts.math}
            opacity={split}
          >
            ⊕
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 680,
          left: MX,
          width: 3 * CW,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 700,
          color: st.col && !st.row ? colors.orange : colors.highlight,
          opacity: (k > 0 ? 1 : 0) * matOn * fadeOut(frame, c3, 10),
        }}
      >
        {st.label}
      </div>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={1260}
          y={300}
          size={38}
          color={colors.highlight}
        >
          {tx.rowMove} = {tx.gens}
        </Chip>
        <Chip
          frame={frame}
          at={c1 + 80}
          x={1260}
          y={400}
          size={38}
          color={colors.orange}
        >
          {tx.colMove} = {tx.rels}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 10}
          x={1260}
          y={330}
          size={52}
          math
          color={colors.green}
        >
          2 | 6 | 12
        </Chip>
        <Chip frame={frame} at={c3 + 30} x={1260} y={450} size={40}>
          {tx.snf}
        </Chip>
      </div>
      <Chip frame={frame} at={c4 + 40} x={760} y={130} size={40} math>
        |G| = 2 · 6 · 12 = 144
      </Chip>
    </SceneShell>
  );
};
