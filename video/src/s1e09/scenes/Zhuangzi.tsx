import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only: 《庄子·天下》records the debaters' saying
// "一尺之棰，日取其半，万世不竭". A one-chi stick; each day half of what is
// left is taken and drops to the row below. What is left is never zero
// (the steps); what is taken climbs 0.1₂, 0.11₂, 0.111₂, … and its least
// upper bound is the whole stick: 0.111…₂ = 1.

const X0 = 160;
const L = 1200;
const TOP = 330;
const LOW = 560;
const H = 44;
const DAYS = 6;
const SLIP_W = 92;
const SLIP_X = (i: number) => 1760 - i * (SLIP_W + 14);
const SLIP_Y = 160;
const SLIP_H = 380;

export const Zhuangzi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zhuangzi");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 6 + i * 10;
  const dayAt = (k: number) => c1 + 4 + k * 22;
  const day = Array.from({ length: DAYS }).reduce<number>(
    (acc, _, k) => (frame >= dayAt(k) ? k + 1 : acc),
    0,
  );
  const sumAt = (k: number) => c2 + 10 + k * 14;
  const sumStep = [0, 1, 2, 3].reduce(
    (acc, k) => (frame >= sumAt(k) ? k : acc),
    0,
  );
  const whole = springIn(frame, sumAt(4), fps, 11);
  const leftStart = X0 + (1 - 2 ** -day) * L;
  // at the end the halves taken close up into one whole stick
  const merge = glide(frame, sumAt(4) + 30, fps, 20);

  return (
    <SceneShell id="zhuangzi">
      {tx.quote.map((_, i) => (
        <Sfx key={`q${i}`} name="page" at={slipAt(i)} volume={0.18} />
      ))}
      {Array.from({ length: DAYS }).map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={dayAt(k)} volume={0.24} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`s${k}`} name="tick" at={sumAt(k)} volume={0.18} />
      ))}
      <Sfx name="chime" at={sumAt(4)} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* what is left, on top */}
          <rect
            x={leftStart}
            y={TOP}
            width={X0 + L - leftStart}
            height={H}
            rx={Math.min(10, (X0 + L - leftStart) / 2)}
            fill={colors.wood}
            opacity={fadeIn(frame, c0 + 10)}
          />
          {/* the halves taken, each dropping to the row below */}
          {Array.from({ length: DAYS }).map((_, k) => {
            const a = X0 + (1 - 2 ** -k) * L;
            const b = X0 + (1 - 2 ** -(k + 1)) * L;
            const t = glide(frame, dayAt(k), fps, 16);
            if (frame < dayAt(k)) return null;
            return (
              <rect
                key={k}
                x={a + 3 * (1 - merge)}
                y={lerp(TOP, LOW, t)}
                width={Math.max(1, b - a - 6 * (1 - merge))}
                height={H}
                rx={Math.min(10, (b - a - 6) / 2)}
                fill={
                  merge > 0.5
                    ? colors.primary
                    : k % 2 === 0
                      ? colors.primary
                      : colors.orange
                }
              />
            );
          })}
          {/* one chi */}
          <g opacity={fadeIn(frame, c0 + 20)}>
            <line
              x1={X0}
              y1={TOP - 60}
              x2={X0 + L}
              y2={TOP - 60}
              stroke={colors.muted}
              strokeWidth={2}
            />
            {[X0, X0 + L].map((x) => (
              <line
                key={x}
                x1={x}
                y1={TOP - 72}
                x2={x}
                y2={TOP - 48}
                stroke={colors.muted}
                strokeWidth={2}
              />
            ))}
            <text
              x={X0 + L / 2}
              y={TOP - 76}
              fill={colors.muted}
              fontSize={32}
              textAnchor="middle"
            >
              一尺
            </text>
          </g>
          <line
            x1={X0 + L}
            y1={LOW - 30}
            x2={X0 + L}
            y2={LOW + H + 30}
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="8 6"
            opacity={fadeIn(frame, c2 + 6)}
          />
        </svg>
        {day > 0 ? (
          <div
            style={{
              position: "absolute",
              left: X0,
              top: TOP + H + 18,
              width: L,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 34,
            }}
          >
            <span style={{ color: colors.muted }}>{tx.day(day)}</span>
            <span style={{ color: colors.wood, fontFamily: fonts.math }}>
              {tx.left} 1/{2 ** day}
            </span>
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            left: X0,
            top: LOW + H + 26,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.primary,
            opacity: fadeIn(frame, sumAt(0)),
          }}
        >
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 34,
              color: colors.muted,
            }}
          >
            {tx.taken}
            {"  "}
          </span>
          {["0.1", "0.11", "0.111", "0.111…"][sumStep]}
          <sub style={{ fontSize: 26 }}>2</sub>
          <span
            style={{
              color: colors.highlight,
              marginLeft: 16,
              opacity: Math.min(1, whole),
              display: "inline-block",
              scale: lerp(0.6, 1, Math.min(1, whole)),
            }}
          >
            = 1
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: X0,
            width: L,
            top: LOW + H + 110,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            color: colors.text,
            opacity: fadeIn(frame, sumAt(4) + 40),
            translate: riseIn(frame, sumAt(4) + 40, 18),
          }}
        >
          1/2 + 1/4 + 1/8 + … = 1
        </div>
        {/* the quote on bamboo slips */}
        {tx.quote.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 12,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 24,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -50}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 50,
                letterSpacing: 10,
                color: colors.paper,
              }}
            >
              {[...t].map((ch, j) => (
                <span
                  key={j}
                  style={{
                    color:
                      Math.floor((frame - (c0 + 34)) / 7) === i * 4 + j
                        ? colors.primary
                        : colors.paper,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(2) - 30,
            width: SLIP_X(0) + SLIP_W - SLIP_X(2) + 60,
            top: SLIP_Y + SLIP_H + 18,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(2) + 6),
            translate: riseIn(frame, slipAt(2) + 6, 14),
          }}
        >
          {tx.zhuangziSource}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
