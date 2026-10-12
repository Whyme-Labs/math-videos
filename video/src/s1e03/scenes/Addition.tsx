import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { layerHalf, PeelMachine, peelTimes } from "../components/nested";
import { useStrings } from "../i18n";

const MX = 960;
const MY = 560;
const SPACING = 300;
const SCALE = 1.35;

// A rule card: tag, then the formula.
export const RuleCard: React.FC<{
  readonly tag: string;
  readonly formula: string;
  readonly x: number;
  readonly y: number;
  readonly at: number;
  readonly frame: number;
  readonly color?: string;
  // Optional: fly in from this point (e.g. out of the number the rule is about).
  readonly from?: { readonly x: number; readonly y: number };
  readonly fps?: number;
}> = ({
  tag,
  formula,
  x,
  y,
  at,
  frame,
  color = colors.primary,
  from,
  fps = 30,
}) => {
  const fly = from ? glide(frame, at, fps, 20) : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: from ? lerp(from.x, x, fly) : x,
        top: from ? lerp(from.y, y, fly) : y,
        scale: from ? lerp(0.3, 1, fly) : 1,
        transformOrigin: "0 50%",
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "10px 24px",
        borderRadius: 16,
        border: `3px solid ${color}`,
        backgroundColor: alpha(color, 0.08),
        opacity: fadeIn(frame, at),
        translate: from ? undefined : riseIn(frame, at, 20),
      }}
    >
      <span
        style={{
          fontFamily: fonts.title,
          fontWeight: 700,
          fontSize: 36,
          color,
        }}
      >
        {tag}
      </span>
      <span style={{ fontFamily: fonts.math, fontSize: 40 }}>{formula}</span>
    </div>
  );
};

export const Addition: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("addition");
  const [c0, c1, c2, c3, c4] = cues;
  const t = peelTimes(c3 + 6, 2, 30);

  // The written-out computation, one rewrite per step.
  const steps = [
    { at: c0 + 4, text: "2 + 2", tag: "" },
    { at: t.peel(0) + 16, text: "S(2 + 1)", tag: "A2" },
    { at: t.peel(1) + 16, text: "S(S(2 + 0))", tag: "A2" },
    { at: c4 + 4, text: "S(S(2))", tag: "A1" },
    { at: c4 + 28, text: "4", tag: "" },
  ];
  let cur = 0;
  steps.forEach((s, i) => {
    if (frame >= s.at) cur = i;
  });
  const result = springIn(frame, c4 + 28, fps, 10);

  return (
    <SceneShell id="addition">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="page" at={c1 + 2} />
      <Sfx name="page" at={c2 + 2} />
      <Sfx name="whoosh" at={t.move} volume={0.15} />
      {[0, 1].map((i) => (
        <Sfx key={i} name={PLUCKS[i + 2]} at={t.peel(i) + 14} volume={0.3} />
      ))}
      <Sfx name="tick" at={c4 + 4} volume={0.25} />
      <Sfx name="ding" at={c4 + 28} />
      <QuestionTray />

      <AbsoluteFill>
        {/* The computation so far, rewritten one rule at a time. */}
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 26,
          }}
        >
          <span
            key={cur}
            style={{
              fontFamily: fonts.math,
              fontSize: 76,
              color: cur === steps.length - 1 ? colors.primary : colors.text,
              opacity: fadeIn(frame, steps[cur].at, 8),
              scale:
                cur === steps.length - 1 ? 0.8 + 0.2 * Math.min(1, result) : 1,
            }}
          >
            {steps[cur].text}
          </span>
          {steps[cur].tag ? (
            <span
              key={`t${cur}`}
              style={{
                fontFamily: fonts.title,
                fontWeight: 700,
                fontSize: 34,
                color: colors.orange,
                padding: "4px 14px",
                borderRadius: 10,
                border: `2px solid ${colors.orange}`,
                opacity: fadeIn(frame, steps[cur].at, 8),
              }}
            >
              {steps[cur].tag}
            </span>
          ) : null}
        </div>

        <RuleCard
          tag="A1"
          formula="a + 0 = a"
          x={120}
          y={250}
          at={c1 + 2}
          frame={frame}
          from={{ x: MX - 60, y: MY }}
          fps={fps}
        />
        <RuleCard
          tag="A2"
          formula="a + S(b) = S(a + b)"
          x={120}
          y={340}
          at={c2 + 2}
          frame={frame}
          from={{ x: MX - 60, y: MY }}
          fps={fps}
        />

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c0 + 4)}>
            <PeelMachine
              frame={frame}
              fps={fps}
              x={MX}
              y={MY}
              a={2}
              b={2}
              start={t.move}
              gap={30}
              spacing={SPACING}
              scale={SCALE}
              showResult={false}
            />
          </g>
          <text
            x={MX + SPACING * SCALE}
            y={MY + layerHalf(4) * SCALE + 80}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={700}
            opacity={Math.min(1, result)}
          >
            = 4
          </text>
          {/* "the next of b": B's outer layer lifts while rule two is read */}
          <rect
            x={MX - layerHalf(2) * SCALE}
            y={
              MY -
              layerHalf(2) * SCALE -
              70 * Math.sin(Math.PI * ramp(frame, c2 + 12, 40))
            }
            width={2 * layerHalf(2) * SCALE}
            height={2 * layerHalf(2) * SCALE}
            rx={layerHalf(2) * SCALE * 0.28}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={frame >= c2 + 12 && frame < c2 + 52 ? 1 : 0}
          />
          {/* The rules only look at the second number: mark it. */}
          <rect
            x={MX - 110}
            y={MY - 110}
            width={220}
            height={220}
            rx={40}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c0 + 14) * (1 - fadeIn(frame, c3, 10))}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: MX - 200,
            width: 400,
            top: MY - 200,
            textAlign: "center",
            fontSize: 34,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 14) * (1 - fadeIn(frame, c3, 10)),
            translate: riseIn(frame, c0 + 14, 20),
          }}
        >
          {tx.secondNumber} ↓
        </div>
        {/* "peel one S" under the second argument while it's being peeled */}
        <div
          style={{
            position: "absolute",
            left: MX - 150,
            width: 300,
            top: MY + 100,
            textAlign: "center",
            fontSize: 30,
            color: colors.orange,
            opacity: fadeIn(frame, t.peel(0)) * (frame < t.done ? 1 : 0),
          }}
        >
          {tx.peel}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
