import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Bombelli, 1572: x³ = 15x + 4 has the plain root 4 (the graph crosses the
// axis there). Cardano's formula asks for √−121, which glows red. Bombelli
// computes anyway: (2 + i)³ = 2 + 11i, the ±i cancel, and 4 drops out.

const G = {
  x0: 1160,
  x1: 1760,
  y0: 170,
  y1: 650,
  lo: -5,
  hi: 5,
  ylo: -40,
  yhi: 40,
};
const gx = (x: number) => G.x0 + ((x - G.lo) / (G.hi - G.lo)) * (G.x1 - G.x0);
const gy = (y: number) =>
  G.y1 - ((y - G.ylo) / (G.yhi - G.ylo)) * (G.y1 - G.y0);
const cubic = (x: number) => x ** 3 - 15 * x - 4;
const STEPS = ["√−121 = 11i", "(2 + i)³ = 2 + 11i", "(2 − i)³ = 2 − 11i"];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2] = cues;
  const draw = ramp(frame, c0 + 20, 40);
  const xs = Array.from({ length: 121 }).map((_, k) => G.lo + (k / 120) * 10);
  const visible = xs.filter((_, k) => k / 120 <= draw);
  const path = visible
    .map((x, k) => {
      const y = Math.max(G.ylo, Math.min(G.yhi, cubic(x)));
      return `${k === 0 ? "M" : "L"} ${gx(x)} ${gy(y)}`;
    })
    .join(" ");
  const rootPop = springIn(frame, c0 + 64, fps, 10);
  // a point rides the curve and settles on the root
  const tracerX = lerp(-4.6, 4, ramp(frame, c0 + 70, 70));
  const tracerY = Math.max(G.ylo, Math.min(G.yhi, cubic(tracerX)));
  const tryAt = (k: number) => c1 + 50 + k * 30;
  const stepAt = (k: number) => c2 + 8 + k * 18;
  const sumAt = stepAt(STEPS.length) + 6;
  const cancel = ramp(frame, sumAt + 24, 14);
  const four = springIn(frame, sumAt + 40, fps, 10);
  const glow = 0.6 + 0.4 * Math.sin(frame / 5);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 4} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 64} volume={0.24} />
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="thud" at={c1 + 34} volume={0.3} />
      <Sfx name="tick" at={c1 + 50} volume={0.2} />
      <Sfx name="tick" at={c1 + 80} volume={0.2} />
      {STEPS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={stepAt(k)} volume={0.24} />
      ))}
      <Sfx name="pluck4" at={sumAt} volume={0.24} />
      <Sfx name="scratch" at={sumAt + 24} volume={0.24} />
      <Sfx name="chime" at={sumAt + 40} />
      <QuestionTray />

      <AbsoluteFill>
        {/* the cubic and its graph */}
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 150,
            fontFamily: fonts.math,
            fontSize: 72,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 20),
          }}
        >
          x³ = 15x + 4
          <span
            style={{
              marginLeft: 30,
              fontSize: 40,
              color: colors.muted,
              fontFamily: fonts.body,
            }}
          >
            1572
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 260,
            fontFamily: fonts.math,
            fontSize: 46,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 64) * fadeOut(frame, c1, 10),
          }}
        >
          x = 4: 64 = 60 + 4 ✓{" "}
          <span style={{ fontFamily: fonts.body, fontSize: 34 }}>
            {tx.plain}
          </span>
        </div>
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: fadeIn(frame, c0 + 16) }}
        >
          <line
            x1={G.x0}
            y1={gy(0)}
            x2={G.x1}
            y2={gy(0)}
            stroke={colors.muted}
            strokeWidth={3}
          />
          <line
            x1={gx(0)}
            y1={G.y0}
            x2={gx(0)}
            y2={G.y1}
            stroke={alpha(colors.muted, 0.5)}
            strokeWidth={2}
          />
          <path d={path} fill="none" stroke={colors.primary} strokeWidth={5} />
          <circle
            cx={gx(tracerX)}
            cy={gy(tracerY)}
            r={10}
            fill={colors.text}
            opacity={fadeIn(frame, c0 + 70) * fadeOut(frame, c0 + 140, 10)}
          />
          <circle
            cx={gx(4)}
            cy={gy(0)}
            r={14 * Math.min(1, rootPop)}
            fill={colors.green}
          />
          <text
            x={gx(4)}
            y={gy(0) + 50}
            fill={colors.green}
            fontSize={36}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={Math.min(1, rootPop)}
          >
            4
          </text>
        </svg>
        {/* Cardano's formula */}
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 280,
            opacity: fadeIn(frame, c1 + 6),
            translate: `${shake(frame, c1 + 34, 10)}px 0px`,
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted }}>{tx.cardano}</div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 54,
              marginTop: 12,
              opacity: lerp(1, 0.35, ramp(frame, c2, 12)),
            }}
          >
            x = ∛(2 +{" "}
            <span
              style={{
                color: colors.red,
                textShadow: `0 0 ${24 * glow}px ${alpha(colors.red, 0.8)}`,
              }}
            >
              √−121
            </span>
            ) + ∛(2 −{" "}
            <span
              style={{
                color: colors.red,
                textShadow: `0 0 ${24 * glow}px ${alpha(colors.red, 0.8)}`,
              }}
            >
              √−121
            </span>
            )
          </div>
          <div
            style={{
              fontSize: 40,
              color: colors.red,
              marginTop: 10,
              opacity: fadeIn(frame, c1 + 34) * fadeOut(frame, c2, 10),
            }}
          >
            {tx.impossible}
          </div>
        </div>
        {/* nothing real squares to −121 */}
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 500,
            fontFamily: fonts.math,
            fontSize: 44,
            lineHeight: 1.5,
            opacity: fadeOut(frame, c2, 8),
          }}
        >
          {["11² = 121", "(−11)² = 121"].map((t, k) => (
            <div
              key={t}
              style={{
                opacity: fadeIn(frame, tryAt(k)),
                translate: riseIn(frame, tryAt(k), 14),
              }}
            >
              {t} <span style={{ color: colors.red }}>≠ −121 ✗</span>
            </div>
          ))}
        </div>
        {/* Bombelli plays along */}
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 470,
            fontFamily: fonts.math,
            fontSize: 46,
            lineHeight: 1.5,
          }}
        >
          {STEPS.map((t, k) => (
            <div
              key={t}
              style={{
                opacity: fadeIn(frame, stepAt(k)),
                translate: riseIn(frame, stepAt(k), 14),
              }}
            >
              {t}
            </div>
          ))}
          <div
            style={{
              opacity: fadeIn(frame, sumAt),
              translate: riseIn(frame, sumAt, 14),
            }}
          >
            x = (2{" "}
            <span
              style={{
                color: colors.red,
                opacity: 1 - 0.75 * cancel,
                textDecoration: cancel > 0.5 ? "line-through" : "none",
              }}
            >
              + i
            </span>
            ) + (2{" "}
            <span
              style={{
                color: colors.red,
                opacity: 1 - 0.75 * cancel,
                textDecoration: cancel > 0.5 ? "line-through" : "none",
              }}
            >
              − i
            </span>
            ) ={" "}
            <span
              style={{
                display: "inline-block",
                color: colors.green,
                fontSize: 64,
                opacity: Math.min(1, four),
                scale: lerp(0.5, 1, Math.min(1, four)),
              }}
            >
              4
            </span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 760,
            fontSize: 36,
            color: colors.green,
            opacity: fadeIn(frame, sumAt + 44),
          }}
        >
          {tx.cancel}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
