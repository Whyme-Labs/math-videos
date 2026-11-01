import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";

// Why "steepest", and why it depends on the ruler. The stack df = (4, 1)
// at P, and every step of length 1: with the dot product they fill a
// circle (c0–c1). A step sweeps round the circle with a live climb readout
// df(step); the sheet it reaches glows; the best step is where the circle
// just touches the highest sheet (c2), and it points along (4, 1) (c3).
// The ruler changes to G = diag(4, 1): the length-1 steps now fill an
// ellipse (c4), the sweep runs again, and the best step points along
// (1, 1) = G⁻¹df (c5).

const O = { x: 680, y: 500 };
const R = 230; // pixels per unit step
const DF = { x: 4, y: 1 };

export const Steepest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("steepest");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const m = glide(frame, c4 + 6, fps, 30); // circle → ellipse
  const unit = (t: number) => ({
    x: lerp(Math.cos(t), Math.cos(t) / 2, m),
    y: Math.sin(t),
  });
  // the best step on the current unit curve
  let best = 0;
  let bestVal = -1e9;
  for (let i = 0; i < 720; i++) {
    const t = (i / 720) * Math.PI * 2;
    const u = unit(t);
    const val = DF.x * u.x + DF.y * u.y;
    if (val > bestVal) {
      bestVal = val;
      best = t;
    }
  }
  const sweeping =
    (frame >= c1 + 6 && frame < c3) || (frame >= c4 + 40 && frame < c5);
  const sweepStart = frame >= c4 + 40 ? c4 + 40 : c1 + 6;
  const tNow = sweeping
    ? best +
      2.6 *
        Math.sin((frame - sweepStart) * 0.05) *
        Math.exp(-(frame - sweepStart) / 140)
    : best;
  const step = unit(tNow);
  const climb = DF.x * step.x + DF.y * step.y;
  const curve = Array.from({ length: 121 }, (_, i) => {
    const u = unit((i / 120) * Math.PI * 2);
    return `${i ? "L" : "M"} ${(O.x + u.x * R).toFixed(1)} ${(O.y - u.y * R).toFixed(1)}`;
  }).join(" ");
  const scr = (x: number, y: number) => ({ x: O.x + x * R, y: O.y - y * R });
  const nd = Math.hypot(DF.x, DF.y);
  // the sheet df·v = climb (and the highest one, df·v = bestVal)
  const sheet = (val: number) => {
    const c = { x: (DF.x * val) / (nd * nd), y: (DF.y * val) / (nd * nd) };
    const d = { x: -DF.y / nd, y: DF.x / nd };
    return {
      a: scr(c.x - 2 * d.x, c.y - 2 * d.y),
      b: scr(c.x + 2 * d.x, c.y + 2 * d.y),
    };
  };
  const hi = sheet(bestVal);
  const cur = sheet(climb);
  const bestDir = unit(best);
  const won =
    fadeIn(frame, c3 + 4, 8) * (1 - fadeIn(frame, c4 + 6, 8)) +
    fadeIn(frame, c5 + 70, 8);

  return (
    <SceneShell id="steepest">
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.08} />
      <Sfx name="ding" at={c3 + 4} volume={0.3} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="ding" at={c5 + 70} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16steep">
            <circle cx={O.x} cy={O.y} r={360} />
          </clipPath>
        </defs>
        <g clipPath="url(#e16steep)" opacity={fadeIn(frame, c0 + 6) * 0.6}>
          <Stack a={DF.x / 4} b={DF.y / 4} scr={scr} range={10} />
        </g>
        <g clipPath="url(#e16steep)">
          <line
            x1={cur.a.x}
            y1={cur.a.y}
            x2={cur.b.x}
            y2={cur.b.y}
            stroke={colors.orange}
            strokeWidth={6}
            opacity={fadeIn(frame, c2 + 6)}
          />
          <line
            x1={hi.a.x}
            y1={hi.a.y}
            x2={hi.b.x}
            y2={hi.b.y}
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c2 + 30)}
          />
        </g>
        <path
          d={curve}
          fill={alpha(colors.primary, 0.08)}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c1 + 4)}
        />
        <g opacity={fadeIn(frame, c1 + 6)}>
          <Arrow
            from={O}
            to={scr(step.x, step.y)}
            width={14}
            color={colors.green}
          />
        </g>
        <g opacity={won}>
          <Arrow
            from={O}
            to={scr(bestDir.x * 1.35, bestDir.y * 1.35)}
            width={18}
          />
        </g>
        <circle cx={O.x} cy={O.y} r={12} fill={colors.text} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 1300,
          width: 460,
          padding: "14px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${colors.orange}`,
          opacity: fadeIn(frame, c1 + 10),
        }}
      >
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.muted,
            fontWeight: 800,
          }}
        >
          df(step)
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 88,
            fontWeight: 800,
            color: colors.orange,
          }}
        >
          {climb.toFixed(2).replace("-", "−")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 440,
          left: 1300,
          width: 460,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.primary,
          opacity: won,
          translate: riseIn(frame, frame >= c5 ? c5 + 70 : c3 + 4, 12),
        }}
      >
        {frame >= c4 ? "∥ (1, 1)" : "∥ (4, 1)"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1300,
          width: 460,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c4 + 10),
        }}
      >
        G = diag(4, 1)
      </div>
    </SceneShell>
  );
};
