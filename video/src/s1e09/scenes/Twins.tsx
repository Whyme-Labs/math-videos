import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Two names, one point: 1 and 0.999… on one dot, 0.2 and 0.1999… on
// another. Every terminating decimal has a twin; 1/3 has only one name.

const Y = 300;
const X0 = 260;
const X1 = 1660;
const px = (v: number) => X0 + (v / 1.2) * (X1 - X0);
const POINTS = [
  { v: 1, up: "1", down: "0.999…" },
  { v: 0.2, up: "0.2", down: "0.1999…" },
];
const MORE = [
  { a: "0.5", b: "0.4999…" },
  { a: "0.25", b: "0.24999…" },
  { a: "3.7", b: "3.6999…" },
];

export const Twins: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("twins");
  const [c0, c1] = cues;
  const pointAt = (k: number) => c0 + 10 + k * 40;
  const moreAt = (k: number) => c1 + 6 + k * 14;
  const thirdAt = moreAt(MORE.length) + 10;

  return (
    <SceneShell id="twins">
      {POINTS.map((_, k) => (
        <Sfx key={k} name="pop" at={pointAt(k)} />
      ))}
      {POINTS.map((_, k) => (
        <Sfx key={`d${k}`} name="clink" at={pointAt(k) + 16} volume={0.24} />
      ))}
      {MORE.map((_, k) => (
        <Sfx key={`m${k}`} name={PLUCKS[k + 2]} at={moreAt(k)} volume={0.22} />
      ))}
      <Sfx name="ding" at={thirdAt} volume={0.22} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={X0 - 80}
            y1={Y}
            x2={X1 + 80}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {[0, 0.5].map((v) => (
            <text
              key={v}
              x={px(v)}
              y={Y + 50}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 4)}
            >
              {v}
            </text>
          ))}
          {POINTS.map((p, k) => {
            const s = Math.min(1, springIn(frame, pointAt(k), fps, 10));
            const d = glide(frame, pointAt(k) + 16, fps, 16);
            return (
              <g key={p.v}>
                {/* the nines name's truncations, streaming into the point */}
                {Array.from({ length: 6 }).map((_, j) => {
                  const phase = (Math.max(0, frame - pointAt(k) - 16) / 24) % 1;
                  const d = 220 * 0.45 ** (j + phase);
                  return (
                    <circle
                      key={j}
                      cx={px(p.v) - d}
                      cy={Y}
                      r={7}
                      fill={colors.primary}
                      opacity={0.2 + (0.8 * d) / 220}
                      visibility={
                        frame >= pointAt(k) + 16 ? "visible" : "hidden"
                      }
                    />
                  );
                })}
                <circle
                  cx={px(p.v)}
                  cy={Y}
                  r={16 * s}
                  fill={colors.highlight}
                />
                <text
                  x={px(p.v)}
                  y={Y - 40}
                  fill={colors.text}
                  fontSize={46}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={s}
                >
                  {p.up}
                </text>
                <text
                  x={px(p.v)}
                  y={lerp(Y + 170, Y + 76, d)}
                  fill={colors.primary}
                  fontSize={46}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={d}
                >
                  {p.down}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 54,
            color: colors.highlight,
            opacity: fadeIn(frame, pointAt(1) + 30),
            translate: riseIn(frame, pointAt(1) + 30, 16),
          }}
        >
          {tx.twins}
        </div>
        <div
          style={{
            position: "absolute",
            top: 500,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 40,
            fontFamily: fonts.math,
            fontSize: 44,
          }}
        >
          {MORE.map((m, k) => (
            <div
              key={m.a}
              style={{
                padding: "18px 30px",
                borderRadius: 20,
                border: `2px solid ${alpha(colors.primary, 0.6)}`,
                backgroundColor: alpha(colors.primary, 0.08),
                opacity: fadeIn(frame, moreAt(k)),
                translate: riseIn(frame, moreAt(k), 16),
              }}
            >
              {m.a} <span style={{ color: colors.muted }}>=</span>{" "}
              <span style={{ color: colors.primary }}>{m.b}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 30,
            opacity: fadeIn(frame, thirdAt),
            scale: lerp(0.8, 1, Math.min(1, springIn(frame, thirdAt, fps, 12))),
          }}
        >
          <span style={{ fontFamily: fonts.math, fontSize: 50 }}>
            1/3 = <span style={{ color: colors.green }}>0.333…</span>
          </span>
          <span style={{ fontSize: 36, color: colors.green }}>
            {tx.oneName}
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
