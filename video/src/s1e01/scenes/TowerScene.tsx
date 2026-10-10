import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { FLOORS, Tower } from "../components/Tower";
import { colors, fonts } from "../theme";

// The equation each floor cannot solve, and the floor that repairs it.
const DEFECTS = [
  { eq: "x + 5 = 3", fix: "ℤ" },
  { eq: "2x = 3", fix: "ℚ" },
  { eq: "x² = 2", fix: "ℝ" },
  { eq: "x² = −1", fix: "ℂ" },
];

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("tower");
  const appear = FLOORS.map((_, i) => fadeIn(frame, 15 + i * 12, 20));
  const question = FLOORS.map((_, i) => fadeIn(frame, cues[7] + i * 8));

  return (
    <SceneShell id="tower">
      <QuestionTray />
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 70 }}>
        {/* "What did we lose?" ledger, left of the tower. */}
        <div
          style={{
            width: 380,
            height: 460,
            borderRadius: 16,
            backgroundColor: "#f4ecd8",
            color: "#2b2b2b",
            padding: 30,
            opacity: fadeIn(frame, cues[6]),
            translate: riseIn(frame, cues[6]),
          }}
        >
          <div style={{ fontFamily: fonts.title, fontSize: 40, fontWeight: 700 }}>What did we lose?</div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ borderBottom: "2px solid #c9bc9c", height: 70 }} />
          ))}
        </div>
        <Tower appear={appear} built={[0, 0, 0, 0, 0]} question={question} />
        {/* Placards: each floor's unsolvable equation, beside that floor. */}
        <div style={{ position: "relative", width: 560, height: 630 }}>
          {DEFECTS.map((d, i) => {
            const start = cues[2 + i];
            const y = 630 - (i + 1) * 126 + 18;
            return (
              <div
                key={d.eq}
                style={{
                  position: "absolute",
                  top: y,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  fontSize: 38,
                  opacity: fadeIn(frame, start),
                  translate: riseIn(frame, start, 20),
                }}
              >
                <span style={{ color: colors.red, fontSize: 40 }}>✗</span>
                <span style={{ fontFamily: fonts.math, fontSize: 46 }}>{d.eq}</span>
                <span style={{ color: colors.muted, opacity: fadeIn(frame, start + 50) }}>
                  ↑ needs <span style={{ fontFamily: fonts.math, color: colors.blue }}>{d.fix}</span>
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 80,
          fontSize: 34,
          color: colors.muted,
          opacity: fadeIn(frame, cues[1]),
        }}
      >
        extend to repair a defect
      </div>
    </SceneShell>
  );
};
