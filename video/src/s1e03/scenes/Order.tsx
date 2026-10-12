import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// a ≤ b means some c gets you from a to b. On a number line: a jump of c.
const LINE_Y = 560;
const x = (n: number) => 260 + n * 200;

// A jump arc from m to n, drawn in up to `p` (0..1).
const Jump: React.FC<{
  readonly from: number;
  readonly to: number;
  readonly p: number;
  readonly color: string;
  readonly height?: number;
  readonly dashed?: boolean;
}> = ({ from, to, p, color, height = 170, dashed = false }) => {
  if (p <= 0) return null;
  const a = x(from);
  const b = x(to);
  const mid = (a + b) / 2;
  const d = `M ${a} ${LINE_Y - 20} Q ${mid} ${LINE_Y - 20 - height * 2} ${b} ${LINE_Y - 20}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={6}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={dashed ? "0.03 0.03" : "1 1"}
      strokeDashoffset={dashed ? 0 : 1 - p}
      opacity={dashed ? p : 1}
    />
  );
};

export const Order: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("order");
  const [c0, c1, c2] = cues;
  const tryAt = (k: number) => c2 + 8 + k * 14; // tries c = 0, 1, 2 from 5
  const fail = tryAt(3);

  return (
    <SceneShell id="order">
      <Sfx name="page" at={c0 + 4} />
      {Array.from({ length: 7 }).map((_, k) => (
        <Sfx
          key={`c${k}`}
          name="tick"
          at={c0 + 30 + (k + 1) * 8}
          volume={0.12}
        />
      ))}
      <Sfx name="whoosh" at={c1 + 8} volume={0.18} />
      <Sfx name="ding" at={c1 + 30} volume={0.3} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={tryAt(k) + 10} volume={0.2} />
      ))}
      <Sfx name="thud" at={fail} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4),
          }}
        >
          a ≤ b &nbsp;⇔&nbsp; a + c = b{" "}
          <span style={{ color: colors.muted, fontSize: 40 }}>(c ∈ ℕ)</span>
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={x(0) - 60}
            y1={LINE_Y}
            x2={x(0) - 60 + (x(7) - x(0) + 160) * ramp(frame, c0 + 6, 18)}
            y2={LINE_Y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {Array.from({ length: 8 }).map((_, n) => (
            <g key={n} opacity={fadeIn(frame, c0 + 8 + n * 2)}>
              <line
                x1={x(n)}
                y1={LINE_Y - 14}
                x2={x(n)}
                y2={LINE_Y + 14}
                stroke={colors.muted}
                strokeWidth={3}
              />
              <text
                x={x(n)}
                y={LINE_Y + 62}
                fill={colors.text}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {n}
              </text>
            </g>
          ))}

          {/* Counting along: each "+ 1" moves one step right. */}
          {frame >= c0 + 30 && frame < c1
            ? (() => {
                const k = Math.min(7, Math.floor((frame - c0 - 30) / 8));
                const t = ramp(frame, c0 + 30 + k * 8, 6);
                const px = k === 0 ? x(0) : x(k - 1) + (x(k) - x(k - 1)) * t;
                const py =
                  LINE_Y - 40 - (k === 0 ? 0 : 60 * Math.sin(Math.PI * t));
                return (
                  <g
                    opacity={
                      fadeIn(frame, c0 + 30, 6) * (1 - ramp(frame, c1 - 8, 8))
                    }
                  >
                    <circle
                      cx={px}
                      cy={py}
                      r={24}
                      fill={alpha(colors.primary, 0.25)}
                    />
                    <circle cx={px} cy={py} r={11} fill={colors.primary} />
                  </g>
                );
              })()
            : null}
          {/* 2 ≤ 5: a jump of 3 */}
          <circle
            cx={x(2)}
            cy={LINE_Y}
            r={20 * springIn(frame, c1 + 2, fps, 10)}
            fill={colors.primary}
          />
          <circle
            cx={x(5)}
            cy={LINE_Y}
            r={20 * springIn(frame, c1 + 4, fps, 10)}
            fill={colors.primary}
          />
          <Jump
            from={2}
            to={5}
            p={ramp(frame, c1 + 8, 20)}
            color={colors.orange}
          />
          <text
            x={(x(2) + x(5)) / 2}
            y={LINE_Y - 190}
            fill={colors.orange}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c1 + 24)}
          >
            + 3
          </text>

          {/* 5 ≤ 2? Every jump from 5 lands at 5 or further right. */}
          {[0, 1, 2].map((k) =>
            k === 0 ? null : (
              <Jump
                key={k}
                from={5}
                to={5 + k}
                p={ramp(frame, tryAt(k), 12)}
                color={colors.muted}
                height={60 + k * 20}
                dashed
              />
            ),
          )}
          <g
            transform={`translate(${shake(frame, fail)} 0)`}
            opacity={fadeIn(frame, fail)}
          >
            <text
              x={x(2)}
              y={LINE_Y + 140}
              fill={colors.red}
              fontSize={64}
              textAnchor="middle"
              fontWeight={700}
            >
              ✗
            </text>
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: x(2) - 200,
            width: 400,
            top: 260,
            textAlign: "center",
            fontSize: 38,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 30) * (frame < c2 ? 1 : 0.4),
          }}
        >
          ✓ 2 ≤ 5 &nbsp;(c = 3)
        </div>
        <div
          style={{
            position: "absolute",
            left: x(5) - 120,
            width: 520,
            top: 260,
            textAlign: "center",
            fontSize: 38,
            color: colors.muted,
            opacity: fadeIn(frame, tryAt(0)),
          }}
        >
          5 + c = 2 ?
        </div>
        <div
          style={{
            position: "absolute",
            left: x(2) - 220,
            width: 440,
            top: LINE_Y + 170,
            textAlign: "center",
            fontSize: 36,
            color: colors.red,
            opacity: fadeIn(frame, fail + 4),
          }}
        >
          {tx.noJump}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
