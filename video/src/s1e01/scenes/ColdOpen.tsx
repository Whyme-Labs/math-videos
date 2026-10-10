import type React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, progress, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

const Card: React.FC<{
  readonly index: number;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ index, title, children, style }) => (
  <div
    style={{
      width: 500,
      height: 520,
      borderRadius: 24,
      backgroundColor: colors.panel,
      border: `2px solid ${colors.panelEdge}`,
      padding: 36,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style,
    }}
  >
    <div style={{ fontSize: 30, color: colors.gold, letterSpacing: 4 }}>QUESTION {index}</div>
    <div style={{ fontFamily: fonts.math, fontSize: 54, marginTop: 18, textAlign: "center" }}>{title}</div>
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </div>
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("coldOpen");
  const { fps } = useVideoConfig();
  // In the final line, all three cards shrink toward the top-right tray.
  const toTray = progress(frame, cues[5] + 60, 40);
  const nines = Math.min(12, Math.max(0, Math.floor((frame - cues[1]) / 6)));
  const diagonal = progress(frame, cues[3] + 20, 30);
  const sqrtDigits = "1.41421356237309504880";
  const shownDigits = Math.min(sqrtDigits.length, Math.max(0, Math.floor((frame - cues[3] - 50) / 3)));

  return (
    <SceneShell id="coldOpen">
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 56,
          scale: interpolate(toTray, [0, 1], [1, 0.35]),
          translate: `${interpolate(toTray, [0, 1], [0, 640])}px ${interpolate(toTray, [0, 1], [0, -380])}px`,
          opacity: interpolate(toTray, [0, 0.8, 1], [1, 1, 0]),
        }}
      >
        <Card
          index={1}
          title="0.999… = 1 ?"
          style={{ opacity: fadeIn(frame, cues[1]), translate: riseIn(frame, cues[1]) }}
        >
          <div style={{ fontFamily: fonts.mono, fontSize: 40, color: colors.blue, wordBreak: "break-all", textAlign: "center" }}>
            0.{"9".repeat(nines)}
            <span style={{ color: colors.muted }}>…</span>
          </div>
        </Card>
        <Card
          index={2}
          title="Is √2 a number?"
          style={{ opacity: fadeIn(frame, cues[3]), translate: riseIn(frame, cues[3]) }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg width={220} height={220} viewBox="-10 -10 220 220">
              <rect x={0} y={0} width={200} height={200} fill="none" stroke={colors.text} strokeWidth={4} />
              <line
                x1={0}
                y1={200}
                x2={200 * diagonal}
                y2={200 - 200 * diagonal}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <text x={100} y={225} fill={colors.muted} fontSize={24} textAnchor="middle">1</text>
            </svg>
            <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.orange, height: 34 }}>
              {sqrtDigits.slice(0, shownDigits)}
              {shownDigits > 0 ? "…" : ""}
            </div>
          </div>
        </Card>
        <Card
          index={3}
          title="More fractions?"
          style={{ opacity: fadeIn(frame, cues[4]), translate: riseIn(frame, cues[4]) }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
            <div style={{ fontSize: 30, color: colors.muted, marginBottom: 6 }}>than whole numbers?</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 34, color: colors.blue }}>1 2 3 4 5 …</div>
            <div style={{ fontSize: 34, color: colors.muted }}>vs</div>
            <div style={{ fontFamily: fonts.math, fontSize: 34, color: colors.orange, textAlign: "center", lineHeight: 1.5 }}>
              ½ ⅓ ⅔ ¼ ¾ ⅕ ⅖ ⅗ ⅘ …
            </div>
          </div>
        </Card>
      </AbsoluteFill>
      <Sequence name="Question tray" from={cues[5] + 85} premountFor={fps}>
        <QuestionTray />
      </Sequence>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 84,
            opacity: Math.min(fadeIn(frame, 10), 1 - fadeIn(frame, cues[1] - 15)),
          }}
        >
          Three easy questions.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
