import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Domino } from "../../shared/components/Domino";
import { Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Three inductions as three lines of dominoes. The theorem's line can only
// fall after both lemmas' lines are down.
const N = 10;
const SCALE = 0.7;
const ROW_X = 700;
const FLOORS = [300, 480, 660];
const FORMULAS = ["0 + a = a", "S(a) + b = S(a + b)", "a + b = b + a"];
const fallEase = Easing.bezier(0.5, 0, 0.8, 1);

export const Commute: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("commute");
  const [c0, , , , c4] = cues;
  const labels = [tx.lemma1, tx.lemma2, tx.theorem];
  const fallStart = (r: number, i: number) => cues[r + 1] + 12 + i * 5;
  const angle = (r: number, i: number) =>
    interpolate(
      frame,
      [fallStart(r, i), fallStart(r, i) + 9],
      [0, i === N - 1 ? 90 : 68],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: fallEase,
      },
    );
  const allDown = (r: number) => frame >= fallStart(r, N - 1) + 9;
  const qed = springIn(frame, c4 + 4, fps, 9);

  return (
    <SceneShell id="commute">
      {[0, 1, 2].map((r) => (
        <Sfx key={`r${r}`} name="pop" at={c0 + 6 + r * 8} volume={0.25} />
      ))}
      {[0, 1, 2].map((r) =>
        Array.from({ length: N }).map((_, i) => (
          <Sfx
            key={`f${r}-${i}`}
            name="clink"
            at={fallStart(r, i) + 8}
            volume={0.12}
          />
        )),
      )}
      {[0, 1, 2].map((r) => (
        <Sfx
          key={`d${r}`}
          name="ding"
          at={fallStart(r, N - 1) + 12}
          volume={0.25}
        />
      ))}
      <Sfx name="sparkle" at={c4 + 4} />
      <QuestionTray />

      <AbsoluteFill>
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* "needs": both lemmas feed the theorem */}
          {[0, 1].map((r) => (
            <path
              key={r}
              d={`M 110 ${FLOORS[r] - 40} C 60 ${FLOORS[r] + 40}, 60 ${FLOORS[2] - 120}, 110 ${FLOORS[2] - 50}`}
              fill="none"
              stroke={allDown(r) ? colors.green : colors.panelEdge}
              strokeWidth={3}
              strokeDasharray="8 8"
              opacity={fadeIn(frame, cues[3] - 4)}
            />
          ))}
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect
                x={ROW_X - 30}
                y={FLOORS[r]}
                width={N * 105 + 60}
                height={10}
                rx={5}
                fill={colors.wood}
                opacity={0.8 * fadeIn(frame, c0 + r * 8)}
              />
              <g transform={`translate(${ROW_X} ${FLOORS[r]}) scale(${SCALE})`}>
                {Array.from({ length: N }).map((_, i) => (
                  <Domino
                    key={i}
                    x={i * 150}
                    floor={0}
                    label=""
                    angle={angle(r, i)}
                    rise={springIn(frame, c0 + 4 + r * 8 + i * 2, fps, 12)}
                  />
                ))}
              </g>
            </g>
          ))}
        </svg>

        {/* Row labels: which statement each line of dominoes proves */}
        {[0, 1, 2].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: 130,
              top: FLOORS[r] - 96,
              width: 540,
              opacity: fadeIn(frame, c0 + 6 + r * 8),
              translate: riseIn(frame, c0 + 6 + r * 8, 16),
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 2,
                color: allDown(r)
                  ? colors.green
                  : r === 2
                    ? colors.highlight
                    : colors.muted,
              }}
            >
              {allDown(r) ? "✓ " : ""}
              {labels[r]}
            </div>
            <div style={{ fontFamily: fonts.math, fontSize: 42, marginTop: 4 }}>
              {FORMULAS[r]}
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 30,
            top: (FLOORS[1] + FLOORS[2]) / 2 - 40,
            fontSize: 24,
            color: colors.muted,
            opacity: fadeIn(frame, cues[3]),
          }}
        >
          {tx.needs}
        </div>

        {/* The payoff */}
        <div
          style={{
            position: "absolute",
            top: 96,
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 30,
            opacity: Math.min(1, qed),
            scale: 0.8 + 0.2 * Math.min(1, qed),
          }}
        >
          <span
            style={{
              fontFamily: fonts.math,
              fontSize: 64,
              color: colors.primary,
            }}
          >
            3 + 5 = 5 + 3
          </span>
          <span
            style={{
              fontSize: 30,
              color: colors.green,
              padding: "4px 16px",
              borderRadius: 12,
              backgroundColor: alpha(colors.green, 0.12),
            }}
          >
            ✓ {tx.everyPair} ∎
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
