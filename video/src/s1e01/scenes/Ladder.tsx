import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

// Base-2 conversion of 45 by repeated division (checked: 45 = 101101₂).
const STEPS: { n: number; q: number; r: number }[] = [];
for (let n = 45; n > 0; n = Math.floor(n / 2)) STEPS.push({ n, q: Math.floor(n / 2), r: n % 2 });

const ROW_H = 74;

export const Ladder: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("ladder");
  const stepEvery = 22;
  const readUp = progress(frame, cues[2], 60);
  const digits = STEPS.map((s) => s.r).reverse().join("");
  const shown = Math.round(readUp * digits.length);
  const theorem = fadeIn(frame, cues[3]);

  return (
    <SceneShell id="ladder">
      <QuestionTray />
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 120 }}>
        <div style={{ position: "relative", width: 640, height: STEPS.length * ROW_H }}>
          {STEPS.map((s, i) => {
            const start = cues[1] + i * stepEvery;
            const lit = readUp > 0 && STEPS.length - 1 - i < shown;
            return (
              <div
                key={s.n}
                style={{
                  position: "absolute",
                  top: i * ROW_H,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 26,
                  fontFamily: fonts.mono,
                  fontSize: 46,
                  opacity: fadeIn(frame, i === 0 ? cues[0] + 30 : start),
                  translate: riseIn(frame, i === 0 ? cues[0] + 30 : start, 20),
                }}
              >
                <span style={{ width: 90, textAlign: "right" }}>{s.n}</span>
                <span style={{ color: colors.muted }}>=</span>
                <span style={{ width: 70, textAlign: "right" }}>{s.q}</span>
                <span style={{ color: colors.muted }}>× 2 +</span>
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `3px solid ${colors.orange}`,
                    color: colors.orange,
                    backgroundColor: lit ? "rgba(240,136,62,0.3)" : "transparent",
                  }}
                >
                  {s.r}
                </span>
              </div>
            );
          })}
          {/* Arrow reading the remainders bottom to top. */}
          <svg
            width={60}
            height={STEPS.length * ROW_H}
            style={{ position: "absolute", left: 650, top: 0, opacity: fadeIn(frame, cues[2]) }}
          >
            <line
              x1={30}
              y1={STEPS.length * ROW_H - 20}
              x2={30}
              y2={STEPS.length * ROW_H - 20 - readUp * (STEPS.length * ROW_H - 50)}
              stroke={colors.orange}
              strokeWidth={5}
            />
            <polygon
              points={`18,${STEPS.length * ROW_H - 20 - readUp * (STEPS.length * ROW_H - 50)} 42,${
                STEPS.length * ROW_H - 20 - readUp * (STEPS.length * ROW_H - 50)
              } 30,${STEPS.length * ROW_H - 44 - readUp * (STEPS.length * ROW_H - 50)}`}
              fill={colors.orange}
            />
          </svg>
        </div>

        <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ fontFamily: fonts.math, fontSize: 96, opacity: fadeIn(frame, cues[2]) }}>
            45 = <span style={{ color: colors.orange }}>{digits.slice(0, shown)}</span>
            <span style={{ fontSize: 52, color: colors.orange }}>{shown === digits.length ? "₂" : ""}</span>
          </div>
          <div
            style={{
              opacity: theorem,
              translate: riseIn(frame, cues[3]),
              borderLeft: `6px solid ${colors.blue}`,
              backgroundColor: colors.panel,
              padding: "26px 32px",
              borderRadius: 12,
              fontSize: 36,
              lineHeight: 1.45,
            }}
          >
            <b style={{ color: colors.blue }}>Theorem.</b> For any base b ≥ 2, every whole number n ≥ 1 has
            <b> exactly one</b> base-b numeral.
          </div>
          <div style={{ display: "flex", gap: 16, opacity: fadeIn(frame, cues[4]), translate: riseIn(frame, cues[4]) }}>
            {["division algorithm", "induction"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 30,
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: `2px solid ${colors.gold}`,
                  color: colors.gold,
                }}
              >
                uses: {t}
              </span>
            ))}
            <span style={{ fontSize: 30, padding: "10px 0", color: colors.muted }}>→ earned in E02, E03</span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
