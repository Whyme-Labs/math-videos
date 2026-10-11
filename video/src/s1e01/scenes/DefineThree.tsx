import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glide, ramp, springIn, typed } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Each attempt (tx.attempts) is typed into the dictionary, acted out on the right, then struck out.
const STAGE_X = 900;
const STAGE_W = 900;

const Finger: React.FC<{
  readonly x: number;
  readonly up: number;
  readonly tall: boolean;
}> = ({ x, up, tall }) => (
  <rect
    x={x}
    y={tall ? 10 : 40}
    width={60}
    height={220}
    rx={30}
    fill="#e8b996"
    style={{
      transformOrigin: `${x + 30}px 250px`,
      scale: `1 ${0.25 + 0.75 * up}`,
    }}
  />
);

export const DefineThree: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("defineThree");
  const fingerAt = [10, 24, 38];
  const handPhase = interpolate(
    frame,
    [cues[1] - 6, cues[1] + 14],
    [0, 1],
    clamp,
  );
  const strikeAt = (k: number) => cues[2 + k] + 70;
  const stageOpacity = (k: number) =>
    interpolate(
      frame,
      [cues[2 + k], cues[2 + k] + 8, cues[3 + k] - 8, cues[3 + k]],
      [0, 1, 1, 0],
      clamp,
    );
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Attempt 1: the glyph changes; the three dots under it don't.
  const glyphs = ["3", "III", "three", "三", "trois"];
  const glyphIdx = Math.min(
    glyphs.length - 1,
    Math.max(0, Math.floor((frame - cues[2] - 14) / 14)),
  );
  // Attempt 3: the line draws, then dissolves.
  const lineDraw = ramp(frame, cues[4] + 6, 20);
  const lineGone = ramp(frame, cues[4] + 50, 24);
  // Attempt 4: unpacking 3 = 2 + 1 keeps asking for more.
  const chain = ["3 = 2 + 1", "2 = 1 + 1", "1 = ?", "+ = ?"];

  return (
    <SceneShell id="defineThree">
      {fingerAt.map((f, i) => (
        <Sfx key={f} name={PLUCKS[i + 2]} at={f} />
      ))}
      <Sfx name="page" at={cues[1]} />
      {tx.attempts.map((a, k) => (
        <Sfx key={a} name="scratch" at={strikeAt(k)} />
      ))}
      {[1, 2, 3, 4].map((g) => (
        <Sfx key={g} name="tick" at={cues[2] + 14 + g * 14} />
      ))}
      {[0, 1, 2].map((g) => (
        <Sfx key={g} name="pop" at={cues[3] + 8 + g * 10} />
      ))}
      <Sfx name="whoosh" at={cues[4] + 50} volume={0.16} />
      {chain.map((c, i) => (
        <Sfx key={c} name="tick" at={cues[5] + 8 + i * 14} />
      ))}
      <Sfx name="chime" at={cues[6]} volume={0.25} />
      <QuestionTray />

      {/* Opening: a hand counts to three, then shrinks aside for the dictionary. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity:
            1 - interpolate(frame, [cues[2] - 10, cues[2]], [0, 1], clamp),
        }}
      >
        <svg
          width={300}
          height={420}
          viewBox="0 0 300 420"
          style={{
            position: "absolute",
            left: interpolate(handPhase, [0, 1], [810, 1250]),
            top: interpolate(handPhase, [0, 1], [180, 230]),
            scale: interpolate(handPhase, [0, 1], [1.2, 0.9]),
          }}
        >
          {[40, 110, 180].map((x, i) => (
            <Finger
              key={x}
              x={x}
              up={springIn(frame, fingerAt[i], fps, 10)}
              tall={i === 1}
            />
          ))}
          <rect
            x={30}
            y={200}
            width={250}
            height={200}
            rx={70}
            fill="#e8b996"
          />
        </svg>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left:
                interpolate(handPhase, [0, 1], [810, 1250]) +
                [70, 140, 210][i] -
                20,
              top: interpolate(handPhase, [0, 1], [110, 170]),
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.primary,
              scale: springIn(frame, fingerAt[i] + 4, fps, 9),
            }}
          >
            {i + 1}
          </div>
        ))}
      </AbsoluteFill>

      {/* The dictionary: every attempt is typed in, then crossed out. */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 150,
          width: 720,
          minHeight: 470,
          padding: "36px 44px",
          borderRadius: 20,
          backgroundColor: colors.paper,
          color: colors.ink,
          fontFamily: fonts.math,
          translate: `${(1 - Math.min(1, springIn(frame, cues[1], fps, 13))) * -900}px 0px`,
          rotate: `${interpolate(springIn(frame, cues[1], fps, 13), [0, 1], [-6, -1])}deg`,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600 }}>
          {tx.headword}{" "}
          <span
            style={{
              fontSize: 38,
              fontStyle: "italic",
              color: colors.brandPurple,
            }}
          >
            {tx.pos}
          </span>
        </div>
        {tx.attempts.map((a, k) => {
          const start = cues[2 + k] + 2;
          if (frame < start) return null;
          const text = typed(a, frame, start, fps, 24);
          const strike = glide(frame, strikeAt(k), fps, 10);
          return (
            <div
              key={a}
              style={{
                fontSize: 40,
                marginTop: 18,
                display: "flex",
                gap: 14,
                color: frame >= strikeAt(k) ? "#8a7aa8" : colors.ink,
              }}
            >
              <span>{k + 1}.</span>
              <span style={{ position: "relative" }}>
                {text}
                {text.length < a.length ? (
                  <span style={{ opacity: blink }}>▌</span>
                ) : null}
                <span
                  style={{
                    position: "absolute",
                    left: -4,
                    right: -4,
                    top: "54%",
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: colors.red,
                    scale: `${strike} 1`,
                    transformOrigin: "left",
                  }}
                />
              </span>
            </div>
          );
        })}
        {frame < cues[2] ? (
          <div style={{ fontSize: 40, marginTop: 18 }}>
            1. <span style={{ opacity: blink }}>▌</span>
          </div>
        ) : null}
      </div>

      {/* Attempt 1: the symbol changes, the amount doesn't. */}
      <AbsoluteFill style={{ opacity: stageOpacity(0) }}>
        <div
          style={{
            position: "absolute",
            left: STAGE_X,
            width: STAGE_W,
            top: 150,
            textAlign: "center",
          }}
        >
          <div
            key={glyphIdx}
            style={{
              fontFamily: fonts.math,
              fontSize: 150,
              color: colors.text,
              scale: springIn(frame, cues[2] + 14 + glyphIdx * 14, fps, 10),
              height: 200,
            }}
          >
            {glyphs[glyphIdx]}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 30,
              marginTop: 40,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.primary,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 34, color: colors.muted, marginTop: 24 }}>
            {tx.symbolNote}
          </div>
        </div>
      </AbsoluteFill>

      {/* Attempt 2: groups of three point back to "three": circular. */}
      <AbsoluteFill style={{ opacity: stageOpacity(1) }}>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {[
            { cx: STAGE_X + 170, shape: "apple" },
            { cx: STAGE_X + 450, shape: "star" },
            { cx: STAGE_X + 730, shape: "dot" },
          ].map((g, gi) => {
            const s = springIn(frame, cues[3] + 8 + gi * 10, fps, 11);
            return (
              <g key={g.shape} transform={`translate(${g.cx} 290) scale(${s})`}>
                <ellipse
                  rx={120}
                  ry={80}
                  fill="none"
                  stroke={colors.highlight}
                  strokeWidth={3}
                  strokeDasharray="10 8"
                />
                {[-55, 0, 55].map((dx) =>
                  g.shape === "star" ? (
                    <text
                      key={dx}
                      x={dx}
                      y={16}
                      fill={colors.primary}
                      fontSize={50}
                      textAnchor="middle"
                    >
                      ★
                    </text>
                  ) : g.shape === "apple" ? (
                    <circle key={dx} cx={dx} cy={0} r={20} fill={colors.red} />
                  ) : (
                    <rect
                      key={dx}
                      x={dx - 18}
                      y={-18}
                      width={36}
                      height={36}
                      rx={6}
                      fill={colors.orange}
                    />
                  ),
                )}
              </g>
            );
          })}
          <g
            opacity={ramp(frame, cues[3] + 50, 10)}
            transform={`rotate(${(frame - cues[3]) * 3} ${STAGE_X + 450} 560)`}
          >
            <path
              d={`M ${STAGE_X + 450 + 90} 560 A 90 90 0 1 1 ${STAGE_X + 450 + 60} ${560 - 67}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={6}
            />
            <polygon
              points={`${STAGE_X + 450 + 60},${560 - 95} ${STAGE_X + 450 + 82},${560 - 58} ${STAGE_X + 450 + 40},${560 - 55}`}
              fill={colors.highlight}
            />
          </g>
          <text
            x={STAGE_X + 450}
            y={575}
            fill={colors.text}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={ramp(frame, cues[3] + 50, 10)}
          >
            3?
          </text>
          <text
            x={STAGE_X + 450}
            y={720}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            opacity={ramp(frame, cues[3] + 60, 10)}
          >
            {tx.trioNote}
          </text>
        </svg>
      </AbsoluteFill>

      {/* Attempt 3: the number line draws, then dissolves: where did it come from? */}
      <AbsoluteFill style={{ opacity: stageOpacity(2) }}>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={1 - lineGone * 0.85}>
            <line
              x1={STAGE_X + 40}
              y1={380}
              x2={STAGE_X + 40 + 820 * lineDraw}
              y2={380}
              stroke={colors.muted}
              strokeWidth={5}
              strokeDasharray={
                lineGone > 0
                  ? `${20 - 16 * lineGone} ${8 + 30 * lineGone}`
                  : undefined
              }
            />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k} opacity={ramp(frame, cues[4] + 6 + k * 3, 6)}>
                <line
                  x1={STAGE_X + 80 + k * 150}
                  y1={366}
                  x2={STAGE_X + 80 + k * 150}
                  y2={394}
                  stroke={colors.text}
                  strokeWidth={3}
                />
                <text
                  x={STAGE_X + 80 + k * 150}
                  y={436}
                  fill={colors.text}
                  fontSize={32}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k}
                </text>
              </g>
            ))}
          </g>
          <circle
            cx={STAGE_X + 80 + 3 * 150}
            cy={380}
            r={18 + 4 * Math.sin(frame / 5)}
            fill={colors.primary}
            opacity={ramp(frame, cues[4] + 26, 8)}
          />
          <text
            x={STAGE_X + 450}
            y={560}
            fill={colors.highlight}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={lineGone}
          >
            {tx.lineQuestion}
          </text>
        </svg>
      </AbsoluteFill>

      {/* Attempt 4: 3 = 2 + 1 just pushes the question down. */}
      <AbsoluteFill style={{ opacity: stageOpacity(3) }}>
        {chain.map((c, i) => (
          <div
            key={c}
            style={{
              position: "absolute",
              left: STAGE_X + 200 + i * 60,
              top: 170 + i * 110,
              fontFamily: fonts.math,
              fontSize: 62,
              color: c.includes("?") ? colors.highlight : colors.text,
              opacity: ramp(frame, cues[5] + 8 + i * 14, 6),
              translate: `0px ${(1 - Math.min(1, springIn(frame, cues[5] + 8 + i * 14, fps, 11))) * -40}px`,
            }}
          >
            {c}
          </div>
        ))}
      </AbsoluteFill>

      {/* Verdict: each idea comes back later, done properly. */}
      <AbsoluteFill style={{ opacity: ramp(frame, cues[6] - 4, 10) }}>
        {tx.later.map((l, i) => (
          <div
            key={l}
            style={{
              position: "absolute",
              left: STAGE_X + 60,
              top: 180 + i * 100,
              fontSize: 36,
              padding: "12px 26px",
              borderRadius: 999,
              border: `2px solid ${colors.primary}`,
              color: colors.primary,
              translate: `${(1 - Math.min(1, springIn(frame, cues[6] + i * 6, fps, 12))) * 700}px 0px`,
            }}
          >
            {i + 1}. {l}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
