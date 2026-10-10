import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Camera } from "../components/Camera";
import { glide, ramp, springIn } from "../components/motion";
import { QuestionTray } from "../components/QuestionTray";
import { Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";
import { useStrings } from "../i18n";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const CARD_W = 500;
const GAP = 56;
const offset = (i: number) => (i - 1) * (CARD_W + GAP);

const Card: React.FC<{
  readonly index: number;
  readonly label: string;
  readonly title: string;
  readonly enter: number;
  readonly lit: number;
  readonly children: React.ReactNode;
}> = ({ index, label, title, enter, lit, children }) => (
  <div
    style={{
      width: CARD_W,
      height: 540,
      borderRadius: 28,
      backgroundColor: alpha(colors.bgGlow, 0.55),
      border: `3px solid ${lit > 0.5 ? colors.highlight : colors.panelEdge}`,
      boxShadow:
        lit > 0
          ? `0 0 ${60 * lit}px ${alpha(colors.highlight, 0.35 * lit)}`
          : "none",
      padding: 36,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      opacity: Math.min(1, enter),
      translate: `0px ${(1 - Math.min(1, enter)) * 300}px`,
      rotate: `${(1 - Math.min(1, enter)) * (index - 2) * 12}deg`,
    }}
  >
    <div style={{ fontSize: 28, color: colors.highlight, letterSpacing: 4 }}>
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.math,
        fontSize: 50,
        marginTop: 14,
        textAlign: "center",
      }}
    >
      {title}
    </div>
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const enter = [1, 3, 4].map((c) => springIn(frame, cues[c], fps, 13));
  // Which card the camera is looking at: 0, 1, 2, or -1 for the wide shot.
  const focus =
    frame < cues[1]
      ? -1
      : frame < cues[3]
        ? 0
        : frame < cues[4]
          ? 1
          : frame < cues[5]
            ? 2
            : -1;
  const focusX = (i: number) => (i < 0 ? 0 : offset(i));
  // Smoothly blend the camera between targets at each cue.
  const targets = [cues[1], cues[3], cues[4], cues[5]];
  const xs = [focusX(0), focusX(1), focusX(2), 0];
  const zooms = [1.35, 1.35, 1.35, 1];
  let camX = 0;
  let camZ = 1;
  targets.forEach((t, k) => {
    const g = glide(frame, t, fps, 24);
    camX = camX + (xs[k] - camX) * g;
    camZ = camZ + (zooms[k] - camZ) * g;
  });
  const toTray = glide(frame, cues[5] + 8, fps, 26);

  // Q1: nines keep coming; the crowd argues yes / no.
  const nines = Math.max(0, Math.floor((frame - cues[1] - 6) / 4));
  const argue = Math.floor((frame - cues[2]) / 12) % 2;
  // Q2: the diagonal and its endless digits.
  const diag = ramp(frame, cues[3] + 10, 22);
  const digits = "1.41421356237309504880168872420969807856967";
  const shown = Math.max(0, Math.floor((frame - cues[3] - 30) / 2));
  // Q3: fractions pile up between 0 and 1.
  const fr: { v: number; t: number }[] = [];
  for (let q = 2; q <= 16; q++)
    for (let p = 1; p < q; p++)
      fr.push({ v: p / q, t: cues[4] + 8 + (q - 2) * 4 + p });

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={6} volume={0.3} />
      <Sfx name="whoosh" at={cues[1]} volume={0.18} />
      <Sfx name="pop" at={cues[1] + 4} />
      <Sfx name="tick" at={cues[2]} />
      <Sfx name="tick" at={cues[2] + 12} />
      <Sfx name="whoosh" at={cues[3]} volume={0.18} />
      <Sfx name="pop" at={cues[3] + 4} />
      <Sfx name="scratch" at={cues[3] + 10} volume={0.15} />
      <Sfx name="whoosh" at={cues[4]} volume={0.18} />
      <Sfx name="pop" at={cues[4] + 4} />
      <Sfx name="whoosh" at={cues[5] + 8} />
      <Sequence name="Question tray" from={cues[5] + 30} premountFor={fps}>
        <QuestionTray />
      </Sequence>

      <Camera
        zoom={camZ * interpolate(toTray, [0, 1], [1, 0.3])}
        x={camX + toTray * -2100}
        y={toTray * 1300}
      >
        <AbsoluteFill
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: GAP,
            opacity: 1 - ramp(frame, cues[5] + 26, 8),
          }}
        >
          <Card
            index={1}
            label={tx.question(1)}
            title="0.999… = 1 ?"
            enter={enter[0]}
            lit={focus === 0 ? 1 : 0}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 30,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 34,
                  color: colors.primary,
                  width: 420,
                  wordBreak: "break-all",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                0.{"9".repeat(Math.min(nines, 40))}…
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  opacity: ramp(frame, cues[2], 8),
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    padding: "8px 20px",
                    borderRadius: 14,
                    border: `2px solid ${colors.green}`,
                    color: colors.green,
                    scale: argue === 0 ? 1.15 : 0.9,
                  }}
                >
                  {tx.sayYes}
                </div>
                <div
                  style={{
                    fontSize: 34,
                    padding: "8px 20px",
                    borderRadius: 14,
                    border: `2px solid ${colors.red}`,
                    color: colors.red,
                    scale: argue === 1 ? 1.15 : 0.9,
                  }}
                >
                  {tx.sayNo}
                </div>
              </div>
            </div>
          </Card>
          <Card
            index={2}
            label={tx.question(2)}
            title={tx.q2}
            enter={enter[1]}
            lit={focus === 1 ? 1 : 0}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
              }}
            >
              <svg width={220} height={220} viewBox="-10 -10 220 220">
                <rect
                  x={0}
                  y={0}
                  width={200}
                  height={200}
                  fill="none"
                  stroke={colors.text}
                  strokeWidth={4}
                />
                <line
                  x1={0}
                  y1={200}
                  x2={200 * diag}
                  y2={200 - 200 * diag}
                  stroke={colors.orange}
                  strokeWidth={7}
                />
              </svg>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 24,
                  color: colors.orange,
                  width: 420,
                  wordBreak: "break-all",
                  textAlign: "center",
                }}
              >
                {digits.slice(0, shown)}
                {shown > 0 ? "…" : ""}
              </div>
            </div>
          </Card>
          <Card
            index={3}
            label={tx.question(3)}
            title={tx.q3}
            enter={enter[2]}
            lit={focus === 2 ? 1 : 0}
          >
            <svg width={430} height={200}>
              <line
                x1={15}
                y1={110}
                x2={415}
                y2={110}
                stroke={colors.muted}
                strokeWidth={3}
              />
              {fr.map((f) => (
                <line
                  key={`${f.v}-${f.t}`}
                  x1={15 + 400 * f.v}
                  y1={110 - 16}
                  x2={15 + 400 * f.v}
                  y2={110 + 16}
                  stroke={colors.orange}
                  strokeWidth={2}
                  opacity={ramp(frame, f.t, 4) * 0.8}
                />
              ))}
              <text
                x={15}
                y={160}
                fill={colors.text}
                fontSize={26}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                0
              </text>
              <text
                x={415}
                y={160}
                fill={colors.text}
                fontSize={26}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                1
              </text>
              <text
                x={215}
                y={50}
                fill={colors.primary}
                fontSize={28}
                textAnchor="middle"
              >
                {tx.vsWhole}
              </text>
            </svg>
          </Card>
        </AbsoluteFill>
      </Camera>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 96,
            opacity: interpolate(
              frame,
              [4, 12, cues[1] - 10, cues[1]],
              [0, 1, 1, 0],
              clamp,
            ),
            scale: interpolate(frame, [0, cues[1]], [0.9, 1.1], clamp),
          }}
        >
          {tx.threeQuestions}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
