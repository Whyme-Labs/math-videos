import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../../shared/components/anim";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { FLOORS, Tower } from "../../shared/components/Tower";
import { colors } from "../../shared/theme";
import { useStrings } from "../i18n";

export const Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("roadmap");
  // ℕ is built by E02–E04; ℤ, ℚ, ℝ, ℂ light up during the "repair" line.
  const built = [
    progress(frame, cues[2] + 20, 25),
    progress(frame, cues[3] + 30, 25),
    progress(frame, cues[3] + 55, 25),
    progress(frame, cues[3] + 80, 25),
    progress(frame, cues[3] + 105, 25),
  ];
  const question = FLOORS.map(
    (_, i) => 1 - progress(frame, cues[4] + 10 + i * 10, 15),
  );
  const trayGone = 1 - progress(frame, cues[4] + 60, 30);

  return (
    <SceneShell id="roadmap">
      {tx.steps.map((s, i) => (
        <Sfx key={s.title} name="tick" at={cues[i]} />
      ))}
      <Sfx name="pluck2" at={cues[2] + 20} />
      {[30, 55, 80, 105].map((d, i) => (
        <Sfx key={d} name={PLUCKS[i + 2]} at={cues[3] + d} />
      ))}
      <Sfx name="sparkle" at={cues[4] + 10} />

      <QuestionTray style={{ opacity: trayGone }} />
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 34,
            width: 900,
          }}
        >
          {tx.steps.map((s, i) => {
            const active =
              frame >= cues[i] &&
              (i === tx.steps.length - 1
                ? frame < cues[4]
                : frame < cues[i + 1]);
            return (
              <div
                key={s.title}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 24,
                  opacity: fadeIn(frame, cues[i]) * (active ? 1 : 0.55),
                  translate: riseIn(frame, cues[i]),
                }}
              >
                <span
                  style={{ fontSize: 34, color: colors.highlight, width: 40 }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 54, fontWeight: 700, width: 270 }}>
                  {s.title}
                </span>
                <span
                  style={{
                    fontSize: 32,
                    color: colors.muted,
                    flex: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.detail}
                </span>
                <span
                  style={{
                    fontSize: 30,
                    color: colors.primary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.eps}
                </span>
              </div>
            );
          })}
        </div>
        <Tower
          appear={[1, 1, 1, 1, 1]}
          built={built}
          question={question}
          style={{
            scale:
              1 +
              0.05 *
                Math.max(
                  ...built.map((b) => Math.sin(Math.min(1, b) * Math.PI)),
                ),
          }}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
