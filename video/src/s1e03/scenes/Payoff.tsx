import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { Tower, TOWER_HEIGHT } from "../../shared/components/Tower";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The number tower's ground floor gets its plaque: every law of school
// arithmetic, now a theorem. What it still lacks: 3 + x = 0.
const LAWS = [
  "a + b = b + a",
  "(a + b) + c = a + (b + c)",
  "a · b = b · a",
  "a · (b + c) = a · b + a · c",
  "a ≤ b  ⇒  a + c ≤ b + c",
];
const TOWER_TOP = 890 - TOWER_HEIGHT - 40;

export const Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("payoff");
  const [c0, c1, c2] = cues;
  const lawAt = (i: number) => c0 + 12 + i * 9;
  const zFloor = glide(frame, c2 + 4, fps, 22);

  return (
    <SceneShell id="payoff">
      <Sfx name="pop" at={c0 + 4} />
      {LAWS.map((_, i) => (
        <Sfx key={i} name="tick" at={lawAt(i)} volume={0.22} />
      ))}
      <Sfx name="sparkle" at={lawAt(LAWS.length - 1) + 8} />
      <Sfx name="thud" at={c1 + 8} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.2} />
      <Sfx name="chime" at={c2 + 26} />
      <QuestionTray />

      <AbsoluteFill>
        <Tower
          appear={[springIn(frame, c0, fps, 12), zFloor]}
          built={[ramp(frame, lawAt(LAWS.length - 1), 12), 0]}
          question={[0, fadeIn(frame, c2 + 20)]}
          style={{ position: "absolute", left: 130, top: TOWER_TOP }}
        />
        <div
          style={{
            position: "absolute",
            left: 800,
            top: 700,
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 26),
            translate: riseIn(frame, c2 + 26, 16),
          }}
        >
          {tx.callback6}
        </div>

        {/* The plaque */}
        <div
          style={{
            position: "absolute",
            left: 800,
            top: 130,
            width: 960,
            padding: "26px 36px",
            borderRadius: 22,
            border: `3px solid ${colors.primary}`,
            backgroundColor: alpha(colors.primary, 0.06),
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 30),
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: colors.primary,
              letterSpacing: 2,
            }}
          >
            ℕ · {tx.allTheorems}
          </div>
          {LAWS.map((law, i) => (
            <div
              key={law}
              style={{
                marginTop: 14,
                fontFamily: fonts.math,
                fontSize: 40,
                display: "flex",
                gap: 18,
                opacity: fadeIn(frame, lawAt(i)),
                translate: riseIn(frame, lawAt(i), 14),
              }}
            >
              <span style={{ color: colors.green }}>✓</span>
              {law}
            </div>
          ))}
        </div>

        {/* What's missing */}
        <div
          style={{
            position: "absolute",
            left: 800,
            top: 610,
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            opacity: fadeIn(frame, c1 + 6),
            translate: riseIn(frame, c1 + 6, 20),
          }}
        >
          <span style={{ fontSize: 36, color: colors.muted }}>
            {tx.missing}
          </span>
          <span
            style={{
              fontFamily: fonts.math,
              fontSize: 64,
              color: colors.highlight,
            }}
          >
            3 + x = 0 ?
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
