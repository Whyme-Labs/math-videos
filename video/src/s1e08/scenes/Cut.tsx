import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { rationalsIn } from "../../shared/components/rationals";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Dedekind's cut for √2: every fraction below 0 or with q² < 2. A knife
// comes down at the hole; the left side lights up as one set. A marker
// climbs 1 → 4/3 → 7/5 → 24/17 → 41/29 without reaching the knife. A
// zoom shows no fraction at the edge. Then the cut of a fraction r = 1.

const X0 = 200;
const X1 = 1720;
const Y = 420;
const LO = -0.5;
const HI = 2.5;
const SQRT2 = Math.SQRT2;
const CLIMB = [
  { p: 1, q: 1 },
  { p: 4, q: 3 },
  { p: 7, q: 5 },
  { p: 24, q: 17 },
  { p: 41, q: 29 },
];

export const Cut: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("cut");
  const [c0, c1, c2, c3] = cues;
  // zoom towards the knife on the third line, back out on the fourth
  const z = glide(frame, c2 + 6, fps, 30) - glide(frame, c3 + 2, fps, 24);
  const scale = lerp(1, 40, z);
  const px = (v: number) => {
    const base = X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
    const pivot = X0 + ((SQRT2 - LO) / (HI - LO)) * (X1 - X0);
    return lerp(base, 960 + (base - pivot) * scale, z);
  };
  const half = (HI - LO) / 2 / scale;
  const center = lerp((LO + HI) / 2, SQRT2, z);
  const { dots } = rationalsIn(center - half * 1.1, center + half * 1.1, 200);
  const knife = springIn(frame, c0 + 20, fps, 12);
  const light = ramp(frame, c0 + 40, 24);
  const climbAt = (k: number) => c1 + 10 + k * 20;
  const r1 = fadeIn(frame, c3 + 30);

  let mx = px(1);
  let my = Y;
  for (let k = 0; k < CLIMB.length - 1; k++) {
    const t = ramp(frame, climbAt(k), 14);
    if (t > 0) {
      const a = CLIMB[k];
      const b = CLIMB[k + 1];
      const p = hop(t, px(a.p / a.q), Y, px(b.p / b.q), Y, 70);
      mx = p.x;
      my = p.y;
    }
  }

  return (
    <SceneShell id="cut">
      <Sfx name="scratch" at={c0 + 20} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      {CLIMB.slice(1).map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={climbAt(k) + 14} volume={0.26} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.16} />
      <Sfx name="chime" at={c2 + 44} />
      <Sfx name="whoosh" at={c3 + 2} volume={0.12} />
      <Sfx name="scratch" at={c3 + 30} volume={0.22} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={0}
            y1={Y}
            x2={1920}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {dots.map((d) => {
            const left = d.v < SQRT2;
            const x = px(d.v);
            if (x < -10 || x > 1930) return null;
            return (
              <circle
                key={d.v}
                cx={x}
                cy={Y}
                r={d.q <= 2 ? 6 : 4}
                fill={
                  left
                    ? light > 0
                      ? colors.primary
                      : colors.muted
                    : alpha(colors.orange, 0.5 + 0.5 * light)
                }
                opacity={left ? 0.5 + 0.5 * light : 0.4 + 0.6 * light}
              />
            );
          })}
          {/* the set lifted as a band */}
          <rect
            x={-10}
            y={Y - 16}
            width={Math.max(0, px(SQRT2) + 10)}
            height={32}
            rx={10}
            fill={alpha(colors.primary, 0.14 * light)}
            stroke={alpha(colors.primary, 0.5 * light)}
            strokeWidth={2}
          />
          {[0, 1, 2].map((v) => (
            <text
              key={v}
              x={px(v)}
              y={Y + 60}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 4) * (1 - z)}
            >
              {v}
            </text>
          ))}
          {/* the knife at √2 */}
          <g opacity={Math.min(1, knife) * fadeOut(frame, c3 + 20, 10)}>
            <line
              x1={px(SQRT2)}
              y1={Y - 170}
              x2={px(SQRT2)}
              y2={lerp(Y - 170, Y + 40, Math.min(1, knife))}
              stroke={colors.highlight}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <polygon
              points={`${px(SQRT2) - 16},${Y - 220} ${px(SQRT2) + 16},${Y - 220} ${px(SQRT2)},${Y - 170}`}
              fill={colors.highlight}
            />
          </g>
          {/* the climbing marker */}
          <circle
            cx={mx}
            cy={my}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c1 + 4) * fadeOut(frame, c2, 8)}
          />
          {CLIMB.map((c, k) => (
            <text
              key={c.p}
              x={px(c.p / c.q)}
              y={Y + 60 + (k % 2) * 36}
              fill={colors.green}
              fontSize={28}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={
                (k === 0
                  ? fadeIn(frame, c1 + 4)
                  : fadeIn(frame, climbAt(k - 1) + 14)) * fadeOut(frame, c2, 8)
              }
            >
              {c.q === 1 ? c.p : `${c.p}/${c.q}`}
            </text>
          ))}
          {/* the cut of r = 1: everything below 1, with 1 itself left out */}
          <g opacity={r1}>
            <rect
              x={px(-0.5)}
              y={Y + 120}
              width={px(1) - px(-0.5)}
              height={26}
              rx={8}
              fill={alpha(colors.orange, 0.3)}
              stroke={colors.orange}
              strokeWidth={3}
            />
            <circle
              cx={px(1)}
              cy={Y + 133}
              r={12}
              fill={colors.bg}
              stroke={colors.orange}
              strokeWidth={4}
            />
            <text
              x={px(1) + 26}
              y={Y + 143}
              fill={colors.orange}
              fontSize={34}
              fontFamily={fonts.math}
            >
              1* = {"{ q : q < 1 }"}
            </text>
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: 200,
            top: 140,
            fontFamily: fonts.math,
            fontSize: 46,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 30) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c0 + 30, 20),
          }}
        >
          A = {"{ q ∈ ℚ : q < 0 or q² < 2 }"}
        </div>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 220,
            fontSize: 38,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 70) * fadeOut(frame, c2, 10),
          }}
        >
          {tx.noMax} · q → (2q + 2)/(q + 2)
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            opacity: fadeIn(frame, c2 + 36) * fadeOut(frame, c3, 10),
          }}
        >
          <div style={{ fontSize: 36, color: colors.muted }}>{tx.noEdge}</div>
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.highlight,
              marginTop: 10,
              scale: 0.8 + 0.2 * Math.min(1, springIn(frame, c2 + 44, fps, 10)),
            }}
          >
            {tx.isRoot2}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 660,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.orange,
            opacity: fadeIn(frame, c3 + 40),
            translate: riseIn(frame, c3 + 40, 16),
          }}
        >
          r* = {tx.rationalCut}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
