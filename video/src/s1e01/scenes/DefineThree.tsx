import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../components/anim";
import { SceneShell, useCues } from "../components/SceneShell";
import { QuestionTray } from "../components/QuestionTray";
import { colors, fonts } from "../theme";

const Hand: React.FC<{ readonly style?: React.CSSProperties }> = ({ style }) => (
  <svg width={300} height={420} viewBox="0 0 300 420" style={style}>
    {[40, 110, 180].map((x, i) => (
      <rect key={x} x={x} y={i === 1 ? 10 : 40} width={60} height={220} rx={30} fill="#e8b996" />
    ))}
    <rect x={30} y={200} width={250} height={200} rx={70} fill="#e8b996" />
  </svg>
);

const ATTEMPTS = [
  { claim: "“3 is the symbol 3.”", flaw: "III, three, trois: a symbol is just a name." },
  { claim: "“3 is what all trios have in common.”", flaw: "Circular: spotting a trio already needs 3." },
  { claim: "“3 is a point on the number line.”", flaw: "Where did the line come from?" },
  { claim: "“3 is 2 + 1.”", flaw: "Then what are 2, 1 and + ?" },
];

export const DefineThree: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("defineThree");
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
  const phase2 = progress(frame, cues[2] - 10, 25);

  return (
    <SceneShell id="defineThree">
      <QuestionTray />
      {/* Phase 1: three fingers and an empty dictionary entry. */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 140,
          opacity: 1 - phase2,
        }}
      >
        <Hand style={{ opacity: fadeIn(frame, 5), translate: riseIn(frame, 5, 60) }} />
        <div
          style={{
            width: 760,
            padding: 48,
            borderRadius: 20,
            backgroundColor: colors.paper,
            color: colors.ink,
            fontFamily: fonts.math,
            opacity: fadeIn(frame, cues[1]),
            translate: riseIn(frame, cues[1]),
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 600 }}>
            three <span style={{ fontSize: 40, fontStyle: "italic", color: colors.brandPurple }}>(n.)</span>
          </div>
          <div style={{ fontSize: 44, marginTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
            1. <span style={{ display: "inline-block", width: 3, height: 50, backgroundColor: colors.ink, opacity: blink }} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 2: four attempts, each struck through with its flaw. */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: phase2 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 34, width: 1500 }}>
          {ATTEMPTS.map((a, i) => {
            const start = cues[2 + i];
            const strike = progress(frame, start + 45, 20);
            return (
              <div
                key={a.claim}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 40,
                  opacity: fadeIn(frame, start),
                  translate: riseIn(frame, start),
                }}
              >
                <div style={{ fontFamily: fonts.title, fontSize: 46, width: 900, whiteSpace: "nowrap" }}>
                  <span style={{ position: "relative", display: "inline-block" }}>
                    {a.claim}
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "52%",
                        height: 6,
                        borderRadius: 3,
                        width: `${strike * 100}%`,
                        backgroundColor: colors.red,
                      }}
                    />
                  </span>
                </div>
                <div style={{ fontSize: 34, color: colors.muted, width: 560, opacity: fadeIn(frame, start + 50) }}>{a.flaw}</div>
              </div>
            );
          })}
          <div
            style={{
              marginTop: 30,
              fontSize: 44,
              color: colors.highlight,
              textAlign: "center",
              opacity: fadeIn(frame, cues[6]),
              scale: interpolate(fadeIn(frame, cues[6]), [0, 1], [0.95, 1]),
            }}
          >
            Each returns later. None is a definition yet.
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
