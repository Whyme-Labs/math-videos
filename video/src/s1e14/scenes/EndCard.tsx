import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  shake,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../../s1e11/components/hotel";
import { Person } from "../components/study";
import { useStrings } from "../i18n";

// Russell's floors today: a code editor. `1 + "two"` gets a red squiggle and
// a type error; then a Lean line, `example : 1 + 1 = 2 := rfl`, gets a green
// tick. Then the teaser for E15: Königsberg, 1930, a lecture hall in rows,
// and a quiet young man with round glasses stands up.

const LINE1 = '1 + "two"';
const LINE2 = "example : 1 + 1 = 2 := rfl";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const l1 = typed(LINE1, frame, c0 + 8, fps, 20);
  const err = frame >= c0 + 40;
  const l2 = typed(LINE2, frame, c0 + 70, fps, 30);
  const ok = frame >= c0 + 70 + Math.ceil((LINE2.length / 30) * fps) + 4;
  const okAt = c0 + 70 + Math.ceil((LINE2.length / 30) * fps) + 4;
  const part1 = fadeOut(frame, c1, 10);
  // he stands up
  const stand = glide(frame, c1 + 36, fps, 16);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 8 + k * 3} volume={0.1} />
      ))}
      <Sfx name="scratch" at={c0 + 40} volume={0.25} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`b${k}`} name="tick" at={c0 + 70 + k * 3} volume={0.1} />
      ))}
      <Sfx name="ding" at={okAt} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="pop" at={c1 + 36} volume={0.2} />
      <Sfx name="chime" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      {/* the editor */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 160,
            width: 1400,
            height: 560,
            borderRadius: 24,
            backgroundColor: colors.ink,
            border: `4px solid ${alpha(colors.primary, 0.6)}`,
            padding: "90px 60px",
            fontFamily: fonts.mono,
            fontSize: 64,
            color: colors.paper,
            boxSizing: "border-box",
            scale: lerp(0.9, 1, glide(frame, c0, fps, 14)),
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 30,
              display: "flex",
              gap: 14,
            }}
          >
            {[colors.red, colors.highlight, colors.green].map((c) => (
              <div
                key={c}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              translate: `${err ? shake(frame, c0 + 40, 12) : 0}px 0`,
            }}
          >
            <span
              style={{
                textDecoration: err ? "underline wavy" : "none",
                textDecorationColor: colors.red,
                textUnderlineOffset: 14,
                textDecorationThickness: 4,
              }}
            >
              {l1}
            </span>
            <span
              style={{
                fontSize: 40,
                color: colors.red,
                opacity: fadeIn(frame, c0 + 40, 6),
                fontFamily: fonts.body,
                fontWeight: 700,
              }}
            >
              ✗ {tx.typeError}
            </span>
          </div>
          <div
            style={{
              marginTop: 90,
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
          >
            <span>{l2}</span>
            <span
              style={{
                fontSize: 40,
                color: colors.green,
                opacity: ok ? fadeIn(frame, okAt, 6) : 0,
                fontFamily: fonts.body,
                fontWeight: 700,
                scale: lerp(
                  1.5,
                  1,
                  Math.min(1, springIn(frame, okAt, fps, 10)),
                ),
              }}
            >
              ✓ {tx.checked}
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Königsberg, 1930 */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <Camera
          zoom={lerp(1, 1.12, glide(frame, c1 + 30, fps, 40))}
          x={lerp(0, 180, glide(frame, c1 + 30, fps, 40))}
          y={0}
        >
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {/* the blackboard */}
            <rect
              x={1080}
              y={120}
              width={700}
              height={300}
              rx={10}
              fill={alpha(colors.green, 0.25)}
              stroke={colors.wood}
              strokeWidth={12}
            />
            {[0, 1, 2].map((r) => (
              <line
                key={r}
                x1={1130}
                y1={190 + r * 80}
                x2={1600 - r * 90}
                y2={190 + r * 80}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={5}
              />
            ))}
            {/* rows of listeners, back to front */}
            {[0, 1, 2].map((row) =>
              Array.from({ length: 7 }).map((_, k) => {
                const x = 220 + k * 230 + (row % 2) * 110;
                const y = 560 + row * 130;
                const him = row === 1 && k === 3;
                return (
                  <g key={`${row}-${k}`}>
                    {him ? (
                      <Person
                        x={x}
                        y={y - 80 * stand}
                        color={colors.highlight}
                        size={0.95}
                        glasses
                        facing={1}
                      />
                    ) : (
                      <Person
                        x={x}
                        y={y}
                        color={guestColor(row * 7 + k)}
                        size={0.9}
                        facing={1}
                        opacity={0.9}
                      />
                    )}
                    <rect
                      x={x - 90}
                      y={y - 40}
                      width={180}
                      height={40}
                      rx={6}
                      fill={colors.wood}
                      stroke={colors.ink}
                      strokeWidth={3}
                    />
                  </g>
                );
              }),
            )}
            {/* what he says */}
            <g
              opacity={fadeIn(frame, c1 + 50)}
              transform={`translate(${220 + 3 * 230 + 110} ${560 + 130 - 330})`}
            >
              <rect
                x={-80}
                y={-60}
                width={160}
                height={90}
                rx={30}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <path
                d="M -10 30 L 0 60 L 20 30 Z"
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                x={0}
                y={2}
                fill={colors.ink}
                fontSize={52}
                textAnchor="middle"
                fontWeight={800}
              >
                …
              </text>
            </g>
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 64,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 8),
            translate: riseIn(frame, c1 + 8, 16),
          }}
        >
          {tx.konigsberg}
        </div>
        <AbsoluteFill
          style={{ top: 190, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
