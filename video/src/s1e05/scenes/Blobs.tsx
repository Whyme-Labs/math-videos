import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, ClockFace, clockPos, scatter } from "../components/pieces";
import { useStrings } from "../i18n";

// The key visual of the series' quotients: numbers coloured by class drift
// into blobs, and each blob shrinks to one point. Same remainder ÷ 12 gives
// the 12 points of a clock. The class of 3 is pink throughout.

const N = 36;
const C = { x: 960, y: 470 };
const R = 290;
const BLOB_R = 62;
const member = (n: number) => {
  const k = n % 12;
  const r = Math.floor(n / 12);
  const p = clockPos(k, C.x, C.y, R);
  const a = (r / 3) * 2 * Math.PI + 0.3;
  return { x: p.x + 30 * Math.sin(a), y: p.y - 30 * Math.cos(a) };
};
const THREE = clockPos(3, C.x, C.y, R);

export const Blobs: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("blobs");
  const [c0, c1, c2, c3, c4] = cues;
  const gather = (k: number) => glide(frame, c1 + 6 + k * 3, fps, 26);
  const shrink = glide(frame, c2 + 6, fps, 20);
  const fly = glide(frame, c3 + 10, fps, 20);
  const sweep = ramp(frame, c4 + 10, 50);

  return (
    <SceneShell id="blobs">
      {[0, 6, 12, 18, 24, 30].map((i) => (
        <Sfx key={i} name="tick" at={c0 + 4 + i} volume={0.18} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.16} />
      <Sfx name="chime" at={c1 + 44} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.14} />
      <Sfx name="scratch" at={c2 + 24} volume={0.2} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="ding" at={c3 + 30} />
      <Sfx name="sparkle" at={c4 + 20} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 44,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c2, 12),
          }}
        >
          {tx.mod12}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* blobs */}
          {Array.from({ length: 12 }).map((_, k) => {
            const p = clockPos(k, C.x, C.y, R);
            return (
              <circle
                key={k}
                cx={p.x}
                cy={p.y}
                r={lerp(BLOB_R, 16, shrink)}
                fill={alpha(k === 3 ? colors.highlight : colors.primary, 0.1)}
                stroke={k === 3 ? colors.highlight : alpha(colors.primary, 0.6)}
                strokeWidth={2.5}
                opacity={fadeIn(frame, c1 + 40 + k) * (1 - shrink)}
              />
            );
          })}
          {/* the clock the blobs become */}
          <g opacity={shrink}>
            <ClockFace
              cx={C.x}
              cy={C.y}
              r={R}
              draw={ramp(frame, c2 + 24, 20)}
              points={shrink}
              labels={fadeIn(frame, c2 + 34)}
              lit={frame >= c3 ? { 3: colors.highlight } : {}}
              dot={16}
            />
            {/* a hand that sweeps once around in the last line */}
            <line
              x1={C.x}
              y1={C.y}
              x2={C.x + 170 * Math.sin(((3 + 12 * sweep) / 12) * 2 * Math.PI)}
              y2={C.y - 170 * Math.cos(((3 + 12 * sweep) / 12) * 2 * Math.PI)}
              stroke={colors.primary}
              strokeWidth={8}
              strokeLinecap="round"
              opacity={fadeIn(frame, c2 + 40)}
            />
            <circle
              cx={C.x}
              cy={C.y}
              r={10}
              fill={colors.primary}
              opacity={fadeIn(frame, c2 + 40)}
            />
          </g>
          {/* the numbers */}
          {Array.from({ length: N }).map((_, n) => {
            const k = n % 12;
            const s = scatter(n, { x: 220, y: 200, w: 1480, h: 560 });
            const m = member(n);
            const t = gather(k);
            const pop = Math.min(1, springIn(frame, c0 + 4 + n, fps, 11));
            return (
              <Chip
                key={n}
                cx={lerp(s.x, m.x, t)}
                cy={lerp(s.y, m.y, t)}
                label={n}
                r={22}
                color={k === 3 ? colors.highlight : colors.primary}
                scale={pop * (1 - shrink)}
                opacity={1 - shrink}
              />
            );
          })}
          {/* 15 and 3 fly into the same point */}
          {[
            { n: 15, x: 1620, y: 300 },
            { n: 3, x: 1620, y: 640 },
          ].map((c, i) => (
            <Chip
              key={c.n}
              cx={lerp(c.x, THREE.x, fly)}
              cy={lerp(c.y, THREE.y, fly)}
              label={c.n}
              r={30}
              color={colors.highlight}
              scale={Math.min(1, springIn(frame, c3 + 2 + i * 4, fps, 11))}
              opacity={fly < 1 ? 1 : fadeOut(frame, c3 + 30, 8)}
            />
          ))}
        </svg>

        {/* labels */}
        <div
          style={{
            position: "absolute",
            left: THREE.x + 90,
            top: THREE.y - 70,
            fontSize: 36,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 56) * fadeOut(frame, c2, 10),
            translate: riseIn(frame, c1 + 56, 16),
          }}
        >
          <div style={{ fontFamily: fonts.title, fontSize: 40 }}>
            {tx.eqClass}
          </div>
          <div style={{ fontFamily: fonts.math, marginTop: 6 }}>
            [3] = {"{3, 15, 27, …}"}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: THREE.x + 90,
            top: THREE.y - 30,
            fontSize: 48,
            fontFamily: fonts.math,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 34),
            translate: riseIn(frame, c3 + 34, 16),
          }}
        >
          [15] = [3]
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 250,
            opacity: fadeIn(frame, c4 + 6),
            translate: riseIn(frame, c4 + 6, 20),
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 48,
              color: colors.primary,
            }}
          >
            {tx.quotient}
          </div>
          <div style={{ fontFamily: fonts.math, fontSize: 60, marginTop: 4 }}>
            ℕ / ~
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 560,
            fontFamily: fonts.math,
            fontSize: 44,
            opacity: fadeIn(frame, c4 + 24),
            translate: riseIn(frame, c4 + 24, 16),
          }}
        >
          [a] = [b] ⇔ a ~ b
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
