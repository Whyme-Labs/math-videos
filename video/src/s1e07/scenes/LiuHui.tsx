import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only: 《九章算术》少广章 "若开之不尽者，为不可开，当以面命之",
// and Liu Hui's commentary: approximations come out 微少 or 微多, "其数不可得
// 而定". Two rows of approximations close in on a slot they never reach; the
// side of the square of area 2 is named instead.

const SQ = { x: 200, y: 260, s: 300 };
const SLIP_W = 100;
const SLIP_X = (i: number) => 1640 - i * (SLIP_W + 20);
const SLIP_Y = 200;
const SLIP_H = 470;
const ROW_X = 620;
const SMALL = ["1.4", "1.41", "1.414"];
const BIG = ["1.5", "1.42", "1.415"];

export const LiuHui: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liuHui");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 30 + i * 12;
  const stepAt = (k: number) => c1 + 10 + k * 16;
  const sideGlow = glide(frame, c2 + 10, fps, 16);

  return (
    <SceneShell id="liuHui">
      <Sfx name="scratch" at={c0 + 6} volume={0.2} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.22} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`s${k}`} name={PLUCKS[k]} at={stepAt(k)} volume={0.22} />
      ))}
      <Sfx name="chime" at={c1 + 64} />
      <Sfx name="sparkle" at={c2 + 14} />

      <AbsoluteFill>
        {/* the square of area 2, and its side 面 */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <rect
            x={SQ.x}
            y={SQ.y}
            width={SQ.s}
            height={SQ.s}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 6)}
          />
          <line
            x1={SQ.x}
            y1={SQ.y + SQ.s}
            x2={SQ.x + SQ.s}
            y2={SQ.y + SQ.s}
            stroke={colors.highlight}
            strokeWidth={lerp(4, 10, sideGlow)}
            strokeLinecap="round"
            opacity={fadeIn(frame, c0 + 6)}
          />
          <text
            x={SQ.x + SQ.s / 2}
            y={SQ.y + SQ.s / 2 + 16}
            fill={colors.text}
            fontSize={44}
            textAnchor="middle"
            opacity={fadeIn(frame, c0 + 14)}
          >
            {tx.areaTwo}
          </text>
          <text
            x={SQ.x + SQ.s / 2}
            y={SQ.y + SQ.s + 80}
            fill={colors.highlight}
            fontSize={lerp(48, 72, sideGlow)}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 50)}
          >
            {tx.sideName}
          </text>
        </svg>

        {/* approximations: 微少 from below, 微多 from above */}
        {[
          { name: tx.tooSmall, vals: SMALL, color: colors.primary, top: 300 },
          { name: tx.tooBig, vals: BIG, color: colors.orange, top: 450 },
        ].map((r) => (
          <div
            key={r.name}
            style={{
              position: "absolute",
              left: ROW_X,
              top: r.top,
              display: "flex",
              alignItems: "baseline",
              gap: 26,
              opacity: fadeIn(frame, c1 + 4),
            }}
          >
            <span
              style={{
                fontFamily: fonts.title,
                fontSize: 46,
                color: r.color,
                width: 110,
              }}
            >
              {r.name}
            </span>
            {r.vals.map((v, k) => (
              <span
                key={v}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 40,
                  color: k === r.vals.length - 1 ? r.color : colors.text,
                  opacity: fadeIn(frame, stepAt(k)),
                  translate: riseIn(frame, stepAt(k), 14),
                }}
              >
                {v}
              </span>
            ))}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: ROW_X + 136,
            top: 376,
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 64),
            scale: Math.min(1, springIn(frame, c1 + 64, fps, 10)),
          }}
        >
          ？ “{tx.undetermined}”
        </div>
        <div
          style={{
            position: "absolute",
            left: ROW_X,
            top: 560,
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 70),
          }}
        >
          {tx.liuHui}
        </div>

        {/* the text, on bamboo slips */}
        {tx.quote.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 14,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 26,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -60}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 54,
                letterSpacing: 8,
                color:
                  i === 2 && frame >= c2 + 10 ? colors.highlight : colors.paper,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(2) - 40,
            width: SLIP_X(0) + SLIP_W - SLIP_X(2) + 80,
            top: SLIP_Y + SLIP_H + 20,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(2) + 6),
          }}
        >
          {tx.shaoguang}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
