import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glide, hop, lerp, ramp, springIn } from "../components/motion";
import { QuestionTray } from "../components/QuestionTray";
import { PLUCKS, Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";
import { useStrings } from "../i18n";

// Halving 45 for real: pair the dots up, the odd one out is the remainder,
// each pair becomes one dot, repeat. Remainders read upward give 101101.
const COUNTS = [45, 22, 11, 5, 2, 1];
const AX = 150; // arena left
const AY = 380; // arena top row
const SP = 38;
const ROW_X = 1090;
const ROW_Y = 90;
const ROW_H = 66;
const BOX_X = ROW_X + 400;
const RESULT_Y = 590;

const pairPos = (j: number) => ({
  x: AX + Math.floor(j / 2) * SP,
  y: AY + (j % 2) * SP,
});
const pilePos = (j: number) => {
  const a = j * 2.39996;
  const r = 17 * Math.sqrt(j + 0.5);
  return { x: 560 + r * Math.cos(a) * 1.5, y: AY + 20 + r * Math.sin(a) };
};
const boxCenter = (k: number) => ({ x: BOX_X + 32, y: ROW_Y + k * ROW_H + 32 });

export const Ladder: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ladder");
  // Step 0 is slow (it's the demonstration); the rest follow quickly.
  const stepStart = [
    cues[0] + 18,
    ...[0, 1, 2, 3, 4].map((k) => cues[1] + 4 + k * 26),
  ];
  const stepLen = [64, 26, 26, 26, 26, 26];
  let k = 0;
  for (let s = 0; s < COUNTS.length; s++) if (frame >= stepStart[s]) k = s;
  const tau = ramp(frame, stepStart[k], stepLen[k]);
  const n = COUNTS[k];
  const odd = n % 2 === 1;

  // Each remainder lands in its box at this frame.
  const landAt = (s: number) => stepStart[s] + stepLen[s] * 0.6;
  const remainder = (s: number) => COUNTS[s] % 2;

  // Reading the remainders bottom-up into the result.
  const digitFrames = COUNTS.map((_, d) => cues[2] + 6 + d * 9);
  const theorem = springIn(frame, cues[3], fps, 14);

  const dots: React.ReactNode[] = [];
  if (frame < stepStart[COUNTS.length - 1] + stepLen[COUNTS.length - 1]) {
    for (let j = 0; j < n; j++) {
      const from = k === 0 ? pilePos(j) : { x: AX + j * SP, y: AY };
      const pair = pairPos(j);
      const arrange =
        k === 0
          ? glide(frame, stepStart[0], fps, 22)
          : glide(frame, stepStart[k], fps, 8);
      let x = lerp(from.x, pair.x, arrange);
      let y = lerp(from.y, pair.y, arrange);
      let r = 14;
      let opacity = 1;
      const isLeftover = odd && j === n - 1;
      if (isLeftover && tau > 0.35) {
        const p = hop(
          Math.min(1, (tau - 0.35) / 0.25),
          pair.x,
          pair.y,
          boxCenter(k).x,
          boxCenter(k).y,
          160,
        );
        x = p.x;
        y = p.y;
        if (tau >= 0.6) opacity = 0;
      } else if (j % 2 === 1 && tau > 0.6) {
        // Pairs merge: the partner slides onto its mate.
        const m = Math.min(1, (tau - 0.6) / 0.25);
        y = lerp(pair.y, pair.y - SP, m);
        opacity = 1 - m;
      } else if (j % 2 === 0 && tau > 0.6) {
        r = 14 + 3 * Math.sin(Math.min(1, (tau - 0.6) / 0.25) * Math.PI);
      }
      dots.push(
        <circle
          key={j}
          cx={x}
          cy={y}
          r={r}
          fill={isLeftover && tau > 0.35 ? colors.orange : colors.primary}
          opacity={opacity}
        />,
      );
    }
  }

  return (
    <SceneShell id="ladder">
      {COUNTS.map((c, s) => (
        <Sfx key={c} name={remainder(s) ? "pop" : "tick"} at={landAt(s)} />
      ))}
      {digitFrames.map((f, i) => (
        <Sfx key={f} name={PLUCKS[i]} at={f} />
      ))}
      <Sfx name="chime" at={cues[3]} />
      <Sfx name="pop" at={cues[4]} />
      <QuestionTray />
      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Pair brackets while the dots are paired up. */}
          {frame < stepStart[5] + 26 && tau > 0.2 && tau < 0.7
            ? Array.from({ length: Math.floor(n / 2) }, (_, c) => (
                <rect
                  key={c}
                  x={AX + c * SP - 18}
                  y={AY - 18}
                  width={36}
                  height={SP + 36}
                  rx={16}
                  fill="none"
                  stroke={alpha(colors.highlight, 0.7)}
                  strokeWidth={2}
                  opacity={interpolate(tau, [0.2, 0.3, 0.6, 0.7], [0, 1, 1, 0])}
                />
              ))
            : null}
          {dots}
          {/* Count of dots in the arena. */}
          {frame < stepStart[5] + 26 ? (
            <text
              x={AX}
              y={AY - 60}
              fill={colors.text}
              fontSize={56}
              fontFamily={fonts.mono}
            >
              {n}
              <tspan fill={colors.muted} fontSize={30}>
                {tau < 0.6 ? tx.pairUp : tx.pairs(Math.floor(n / 2))}
              </tspan>
            </text>
          ) : null}
          {/* The division rows build up on the right. */}
          {COUNTS.map((c, s) => {
            const show = springIn(frame, stepStart[s], fps, 14);
            const filled = frame >= landAt(s);
            const read = frame >= digitFrames[COUNTS.length - 1 - s];
            return (
              <g
                key={c}
                opacity={Math.min(1, show)}
                transform={`translate(${(1 - Math.min(1, show)) * 60} 0)`}
              >
                <text
                  x={ROW_X}
                  y={ROW_Y + s * ROW_H + 46}
                  fill={colors.text}
                  fontSize={40}
                  fontFamily={fonts.mono}
                >
                  {`${String(c).padStart(2, " ")} = ${String(Math.floor(c / 2)).padStart(2, " ")} × 2 +`}
                </text>
                <rect
                  x={BOX_X}
                  y={ROW_Y + s * ROW_H}
                  width={64}
                  height={64}
                  rx={12}
                  fill={read ? alpha(colors.orange, 0.35) : "transparent"}
                  stroke={colors.orange}
                  strokeWidth={3}
                />
                {filled ? (
                  <text
                    x={BOX_X + 32}
                    y={ROW_Y + s * ROW_H + 46}
                    fill={colors.orange}
                    fontSize={44}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                  >
                    {remainder(s)}
                  </text>
                ) : null}
              </g>
            );
          })}
          {/* Remainders fly down into the result, last one first. */}
          <text
            x={ROW_X}
            y={RESULT_Y + 60}
            fill={colors.text}
            fontSize={84}
            fontFamily={fonts.math}
            opacity={ramp(frame, cues[2], 8)}
          >
            45 =
          </text>
          {COUNTS.map((_, d) => {
            const s = COUNTS.length - 1 - d; // bottom row first
            const t = glide(frame, digitFrames[d], fps, 14);
            const from = boxCenter(s);
            const to = { x: ROW_X + 210 + d * 52, y: RESULT_Y + 58 };
            if (frame < digitFrames[d]) return null;
            return (
              <text
                key={d}
                x={lerp(from.x, to.x, t)}
                y={lerp(from.y + 14, to.y, t)}
                fill={colors.orange}
                fontSize={lerp(44, 84, t)}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {remainder(s)}
              </text>
            );
          })}
          <text
            x={ROW_X + 210 + 6 * 52 - 22}
            y={RESULT_Y + 70}
            fill={colors.orange}
            fontSize={44}
            fontFamily={fonts.math}
            opacity={ramp(frame, digitFrames[5] + 10, 8)}
          >
            ₂
          </text>
        </svg>
        {/* Theorem and its cost, once the dots are used up. */}
        <div
          style={{
            position: "absolute",
            left: AX,
            top: 250,
            width: 760,
            opacity: Math.min(1, theorem),
            translate: `${(1 - Math.min(1, theorem)) * -80}px 0px`,
            borderLeft: `6px solid ${colors.primary}`,
            backgroundColor: colors.panel,
            padding: "26px 32px",
            borderRadius: 12,
            fontSize: 38,
            lineHeight: 1.4,
          }}
        >
          {tx.theorem[0]}
          <b style={{ color: colors.primary }}>{tx.theorem[1]}</b>
          {tx.theorem[2]}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 22,
              opacity: ramp(frame, cues[4], 10),
            }}
          >
            {tx.needs.map((t, i) => (
              <span
                key={t}
                style={{
                  fontSize: 28,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `2px solid ${colors.highlight}`,
                  color: colors.highlight,
                  scale: springIn(frame, cues[4] + i * 6, fps, 10),
                }}
              >
                {t}
              </span>
            ))}
            <span
              style={{ fontSize: 28, color: colors.muted, padding: "8px 0" }}
            >
              {tx.provedIn}
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
