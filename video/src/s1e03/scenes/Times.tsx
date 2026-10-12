import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";
import { RuleCard } from "./Addition";

// 2 · 3 as three rows of two dots, built one row (one "+ 2") at a time.
// Turning the rectangle a quarter turn gives two rows of three: 3 · 2.
const CX = 900;
const CY = 520;
const GAP = 110;

export const Times: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("times");
  const [c0, c1, c2, c3] = cues;
  // Row 1 arrives during the rules (2 · 1 = 2 · 0 + 2); rows 2–3 on "three rows of two".
  const rowAt = (r: number) => (r === 0 ? c0 + 56 : c1 + 6 + (r - 1) * 12);
  const turn = glide(frame, c2 + 6, fps, 24);
  const turned = turn > 0.5;

  return (
    <SceneShell id="times">
      <Sfx name="page" at={c0 + 2} />
      <Sfx name="page" at={c0 + 14} />
      <Sfx name="pop" at={c0 + 24} volume={0.2} />
      {[0, 1, 2].map((r) => (
        <Sfx key={r} name={PLUCKS[r]} at={rowAt(r)} volume={0.3} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.2} />
      <Sfx name="ding" at={c2 + 32} />
      <Sfx name="tick" at={c3 + 4} volume={0.2} />
      <QuestionTray />

      <AbsoluteFill>
        <RuleCard
          tag="M1"
          formula="a · 0 = 0"
          x={110}
          y={150}
          at={c0 + 2}
          frame={frame}
        />
        <RuleCard
          tag="M2"
          formula="a · S(b) = a · b + a"
          x={110}
          y={240}
          at={c0 + 14}
          frame={frame}
        />

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g transform={`rotate(${90 * turn} ${CX} ${CY})`}>
            {/* 2 · 0: an empty frame, waiting for rows */}
            <rect
              x={CX - GAP / 2 - 70}
              y={CY - 1.5 * GAP - 20}
              width={GAP + 140}
              height={3 * GAP + 40}
              rx={30}
              fill="none"
              stroke={colors.panelEdge}
              strokeWidth={3}
              strokeDasharray="12 12"
              opacity={fadeIn(frame, c0 + 24) * fadeOut(frame, c2, 10)}
            />
            {[0, 1, 2].map((r) => {
              const s = springIn(frame, rowAt(r), fps, 10);
              return (
                <g key={r} opacity={Math.min(1, s)}>
                  <rect
                    x={CX - GAP / 2 - 50}
                    y={CY + (r - 1) * GAP - 46}
                    width={GAP + 100}
                    height={92}
                    rx={46}
                    fill={alpha(colors.primary, 0.08)}
                    stroke={alpha(colors.primary, 0.35)}
                    strokeWidth={2}
                  />
                  {[0, 1].map((c) => (
                    <circle
                      key={c}
                      cx={CX + (c - 0.5) * GAP}
                      cy={CY + (r - 1) * GAP}
                      r={30 * Math.min(1.15, s)}
                      fill={colors.primary}
                    />
                  ))}
                </g>
              );
            })}
          </g>
          {/* "+ 2" beside each new row, before the turn */}
          {[0, 1, 2].map((r) => (
            <text
              key={r}
              x={CX + GAP + 40}
              y={CY + (r - 1) * GAP + 14}
              fill={colors.orange}
              fontSize={40}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, rowAt(r) + 4) * fadeOut(frame, c2, 8)}
            >
              + 2
            </text>
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 400,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.muted,
            lineHeight: 1.5,
            opacity: fadeIn(frame, c0 + 24) * fadeOut(frame, c1 + 24, 8),
          }}
        >
          <div>2 · 0 = 0</div>
          <div style={{ opacity: fadeIn(frame, rowAt(0)) }}>
            2 · 1 = 2 · 0 + 2
          </div>
        </div>
        {/* What we're looking at, before and after the turn */}
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 400,
            fontSize: 40,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 30),
          }}
        >
          {turned ? tx.rowsOf(2, 3) : tx.rowsOf(3, 2)}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 460,
            fontFamily: fonts.math,
            fontSize: 72,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 34),
            translate: riseIn(frame, c1 + 34, 20),
          }}
        >
          {turned ? "3 · 2 = 6" : "2 · 3 = 6"}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 560,
            fontSize: 40,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 32),
          }}
        >
          ✓ 2 · 3 = 3 · 2
        </div>
        <div
          style={{
            position: "absolute",
            top: 770,
            width: "100%",
            textAlign: "center",
            fontSize: 38,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 4),
            translate: riseIn(frame, c3 + 4, 16),
          }}
        >
          {tx.hint}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
