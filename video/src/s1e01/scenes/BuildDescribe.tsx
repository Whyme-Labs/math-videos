import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

const CELL = 76;
const BOARD = 5;

// Knight path: from the centre square, two right then one up (an L).
const pathPoint = (t: number) => {
  const start = { x: 2, y: 2 };
  if (t < 0.66) return { x: start.x + 2 * (t / 0.66), y: start.y };
  return { x: start.x + 2, y: start.y - (t - 0.66) / 0.34 };
};

const Board: React.FC<{ readonly t: number; readonly arrow: number; readonly cap: number }> = ({ t, arrow, cap }) => {
  const p = pathPoint(t);
  return (
    <svg width={CELL * BOARD} height={CELL * BOARD}>
      {Array.from({ length: BOARD * BOARD }).map((_, k) => {
        const x = k % BOARD;
        const y = Math.floor(k / BOARD);
        return <rect key={k} x={x * CELL} y={y * CELL} width={CELL} height={CELL} fill={(x + y) % 2 ? "#4b1f86" : "#ffe9a8"} />;
      })}
      <path
        d={`M ${2.5 * CELL} ${2.5 * CELL} L ${4.5 * CELL} ${2.5 * CELL} L ${4.5 * CELL} ${1.5 * CELL}`}
        fill="none"
        stroke={colors.orange}
        strokeWidth={8}
        strokeDasharray={600}
        strokeDashoffset={600 * (1 - arrow)}
        strokeLinecap="round"
      />
      <g opacity={cap}>
        <circle cx={(p.x + 0.5) * CELL} cy={(p.y + 0.5) * CELL} r={28} fill="#c0392b" stroke="#ecf0f1" strokeWidth={4} strokeDasharray="5 4" />
      </g>
    </svg>
  );
};

export const BuildDescribe: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("buildDescribe");
  const arrow = progress(frame, cues[2] + 20, 40);
  const capIn = fadeIn(frame, cues[4]);
  const capMove = progress(frame, cues[4] + 40, 60);

  return (
    <SceneShell id="buildDescribe">
      <QuestionTray />
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 0, opacity: 1 - fadeIn(frame, cues[5] - 10, 20) }}>
        <div style={{ width: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: fadeIn(frame, cues[1]), translate: riseIn(frame, cues[1]) }}>
          <div style={{ fontSize: 46, fontWeight: 700, color: colors.wood, letterSpacing: 4 }}>BUILD</div>
          <div style={{ fontSize: 34, color: colors.muted }}>what it’s made of</div>
          <div style={{ fontSize: 240, lineHeight: 1, color: colors.wood, fontFamily: '"DejaVu Sans", serif' }}>♞</div>
          <div style={{ fontSize: 30, color: colors.muted }}>carved wood shaped like a horse</div>
        </div>
        <div style={{ width: 2, height: 600, backgroundColor: colors.panelEdge, opacity: fadeIn(frame, cues[1]) }} />
        <div style={{ width: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: fadeIn(frame, cues[2]), translate: riseIn(frame, cues[2]) }}>
          <div style={{ fontSize: 46, fontWeight: 700, color: colors.primary, letterSpacing: 4 }}>DESCRIBE</div>
          <div style={{ fontSize: 34, color: colors.muted }}>what it does</div>
          <Board t={capMove} arrow={arrow} cap={capIn} />
          <div style={{ fontSize: 30, color: colors.muted, opacity: 1 - capIn }}>moves in an L</div>
          <div style={{ fontSize: 30, color: colors.highlight, opacity: capIn, marginTop: -64 }}>a bottle cap is a perfectly good knight</div>
        </div>
      </AbsoluteFill>
      {/* Numbers get both treatments, then the verdict. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 34,
          opacity: fadeIn(frame, cues[5] - 10, 20),
        }}
      >
        <div style={{ display: "flex", gap: 30, alignItems: "center", fontSize: 40, opacity: fadeIn(frame, cues[5] + 10), translate: riseIn(frame, cues[5] + 10) }}>
          <span style={{ color: colors.primary, fontWeight: 700, width: 240 }}>DESCRIBE</span>
          <span style={{ fontFamily: fonts.math }}>ℕ = zero + “next” (Peano)</span>
          <span style={{ color: colors.muted }}>→ E02</span>
        </div>
        <div style={{ display: "flex", gap: 30, alignItems: "center", fontSize: 40, opacity: fadeIn(frame, cues[5] + 70), translate: riseIn(frame, cues[5] + 70) }}>
          <span style={{ color: colors.wood, fontWeight: 700, width: 240 }}>BUILD</span>
          <span style={{ fontFamily: fonts.math }}>0 = ∅, 1 = {"{∅}"}, 2 = {"{∅, {∅}}"}</span>
          <span style={{ color: colors.muted }}>→ E04</span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontFamily: fonts.title,
            fontSize: 70,
            color: colors.highlight,
            opacity: fadeIn(frame, cues[6]),
            scale: interpolate(fadeIn(frame, cues[6]), [0, 1], [0.9, 1]),
          }}
        >
          A number is anything that behaves like one.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: fonts.title, fontSize: 72, opacity: Math.min(fadeIn(frame, 5), 1 - fadeIn(frame, cues[1] - 10)) }}>
          Two ways to say what something <i>is</i>.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
