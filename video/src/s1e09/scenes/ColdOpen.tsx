import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The argument: "=" and "≠" bubbles stream past the equation. Then the two
// sides: a ball that slows before a wall at 1, and the two tricks. Then a
// line of nines that never stops being typed: what does it name?

const BUBBLES = Array.from({ length: 14 }).map((_, k) => ({
  x: k % 2 === 0 ? 120 + ((k * 97) % 300) : 1500 + ((k * 131) % 280),
  t: k * 9,
  yes: k % 3 !== 1,
}));
const WALL = 820;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2] = cues;
  const eq = springIn(frame, c0 + 4, fps, 11);
  const sides = fadeIn(frame, c1 + 4) * fadeOut(frame, c2, 12);
  // the ball halves its distance to the wall every 14 frames
  const tBall = Math.max(0, frame - (c1 + 10)) / 14;
  const ballX = lerp(180, WALL - 26, 1 - 0.5 ** tBall);
  const trickAt = (k: number) => c1 + 40 + k * 26;
  const ninesShown = Math.max(0, Math.floor((frame - (c2 + 10)) / 2.2));
  const streamX = Math.min(0, 1100 - 40 - ninesShown * 41);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 4} />
      {BUBBLES.map((b, k) =>
        k % 3 === 0 ? (
          <Sfx key={k} name="tick" at={c0 + 14 + b.t} volume={0.14} />
        ) : null,
      )}
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      <Sfx name="thud" at={c1 + 70} volume={0.2} />
      {[0, 1].map((k) => (
        <Sfx key={`t${k}`} name={PLUCKS[k * 2]} at={trickAt(k)} volume={0.26} />
      ))}
      <Sfx name="riser" at={c2 + 10} volume={0.18} />
      <Sfx name="ding" at={c2 + 70} volume={0.22} />
      <QuestionTray />

      <AbsoluteFill>
        {/* the argument, scrolling past */}
        {BUBBLES.map((b, k) => {
          const age = frame - (c0 + 14 + b.t);
          if (age < 0) return null;
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: b.x,
                top: 760 - age * 4.2,
                fontFamily: fonts.math,
                fontSize: 48,
                width: 84,
                height: 84,
                borderRadius: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: b.yes ? colors.primary : colors.highlight,
                border: `3px solid ${b.yes ? colors.primary : colors.highlight}`,
                backgroundColor: alpha(
                  b.yes ? colors.primary : colors.highlight,
                  0.12,
                ),
                opacity: Math.min(1, age / 8) * fadeOut(frame, c1, 10) * 0.9,
              }}
            >
              {b.yes ? "=" : "≠"}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            top: lerp(300, 90, glide(frame, c1, fps, 18)),
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: lerp(170, 110, glide(frame, c1, fps, 18)),
            opacity: Math.min(1, eq) * fadeOut(frame, c2, 10),
            scale: lerp(0.6, 1, Math.min(1, eq)),
            translate: `${shake(frame, c0 + 40, 10)}px 0px`,
          }}
        >
          0.999… = 1<span style={{ color: colors.highlight }}> ?</span>
        </div>

        {/* side one: closer and closer */}
        <div style={{ opacity: sides }}>
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            <line
              x1={140}
              y1={560}
              x2={WALL}
              y2={560}
              stroke={colors.muted}
              strokeWidth={3}
            />
            <rect
              x={WALL}
              y={430}
              width={14}
              height={150}
              rx={4}
              fill={colors.highlight}
            />
            <text
              x={WALL + 7}
              y={415}
              fill={colors.highlight}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              1
            </text>
            <circle cx={ballX} cy={534} r={26} fill={colors.primary} />
            <text
              x={ballX + 26}
              y={480}
              fill={colors.primary}
              fontSize={34}
              textAnchor="end"
              fontFamily={fonts.mono}
            >
              0.{"9".repeat(Math.min(9, 1 + Math.floor(tBall)))}
            </text>
          </svg>
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 620,
              fontSize: 36,
              color: colors.muted,
            }}
          >
            {tx.neverArrives}
          </div>
          {/* side two: the tricks */}
          <div
            style={{
              position: "absolute",
              left: 1060,
              top: 400,
              fontFamily: fonts.math,
              fontSize: 50,
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 34,
                color: colors.muted,
              }}
            >
              {tx.tricks}
            </div>
            {["3 × 0.333… = 0.999…", "10x − x = 9  ⇒  x = 1"].map((t, k) => (
              <div
                key={t}
                style={{
                  color: colors.primary,
                  opacity: fadeIn(frame, trickAt(k)),
                  translate: riseIn(frame, trickAt(k), 16),
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* nines without end */}
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 160,
            right: 160,
            overflow: "hidden",
            height: 140,
            opacity: fadeIn(frame, c2 + 8),
            maskImage: "linear-gradient(90deg, black 75%, transparent 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: streamX,
              whiteSpace: "nowrap",
              fontFamily: fonts.mono,
              fontSize: 68,
              color: colors.primary,
            }}
          >
            0.{"9".repeat(ninesShown)}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 500,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 64,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 70),
            translate: riseIn(frame, c2 + 70, 20),
          }}
        >
          {tx.whatNames}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
