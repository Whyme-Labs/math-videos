import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { FLOORS, Tower } from "../components/Tower";
import { colors } from "../theme";

const STEPS = [
  { title: "Count", detail: "zero and “next”", eps: "E02" },
  { title: "Calculate", detail: "+ and × from scratch", eps: "E03" },
  { title: "Ground", detail: "numbers from sets", eps: "E04" },
  { title: "Repair", detail: "one master tool, floor by floor", eps: "E05–E10" },
];

export const Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("roadmap");
  // ℕ is built by E02–E04; ℤ, ℚ, ℝ, ℂ light up during the "repair" line.
  const built = [
    progress(frame, cues[2] + 20, 25),
    progress(frame, cues[3] + 30, 25),
    progress(frame, cues[3] + 55, 25),
    progress(frame, cues[3] + 80, 25),
    progress(frame, cues[3] + 105, 25),
  ];
  const question = FLOORS.map((_, i) => 1 - progress(frame, cues[4] + 10 + i * 10, 15));
  const trayGone = 1 - progress(frame, cues[4] + 60, 30);

  return (
    <SceneShell id="roadmap">
      <QuestionTray style={{ opacity: trayGone }} />
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 90 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 34, width: 900 }}>
          {STEPS.map((s, i) => {
            const active = frame >= cues[i] && (i === STEPS.length - 1 ? frame < cues[4] : frame < cues[i + 1]);
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
                <span style={{ fontSize: 34, color: colors.highlight, width: 40 }}>{i + 1}</span>
                <span style={{ fontSize: 54, fontWeight: 700, width: 270 }}>{s.title}</span>
                <span style={{ fontSize: 32, color: colors.muted, flex: 1, whiteSpace: "nowrap" }}>{s.detail}</span>
                <span style={{ fontSize: 30, color: colors.primary, whiteSpace: "nowrap" }}>{s.eps}</span>
              </div>
            );
          })}
        </div>
        <Tower appear={[1, 1, 1, 1, 1]} built={built} question={question} />
      </AbsoluteFill>
    </SceneShell>
  );
};
