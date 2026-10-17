import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import {
  Gap,
  RationalDots,
  toX,
  type Window,
} from "../../shared/components/rationals";
import { useStrings } from "../i18n";

// The key visual: zoom into the rational line near 1.414. It looks equally
// full at every level; then the dots shrink to dust and the gap at √2
// shows. Zooming back out, gaps appear at √3, √5 and everywhere else.

const X0 = 260;
const X1 = 1660;
const Y = 470;
const HOLES: { v: number; name?: string }[] = [
  { v: Math.cbrt(2), name: "∛2" },
  { v: 1 + Math.SQRT2 / 4 },
  { v: Math.PI / 2, name: "π/2" },
  { v: (1 + Math.sqrt(5)) / 2, name: "φ" },
  { v: Math.sqrt(7) - 1 },
  { v: Math.sqrt(3), name: "√3" },
  { v: Math.sqrt(10) - 1 },
  { v: Math.sqrt(5), name: "√5" },
  { v: Math.sqrt(6), name: "√6" },
];
const ease = Easing.inOut(Easing.cubic);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Hole: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("hole");
  const [c0, c1, c2] = cues;
  // zoom level z: window half-width is 0.75 · 10^(−z)
  const z = interpolate(
    frame,
    [c0 + 10, c0 + 110, c1 + 10, c1 + 60, c2 + 6, c2 + 46],
    [0, 2, 2, 2.4, 2.4, 0],
    { ...clamp, easing: ease },
  );
  const out = interpolate(frame, [c2 + 6, c2 + 46], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const center = lerp(Math.SQRT2, 1.75, out);
  const half = 0.75 * 10 ** -z;
  const w: Window = {
    lo: center - half,
    hi: center + half,
    x0: X0,
    x1: X1,
    y: Y,
  };
  // x-ray: dots shrink to dust on the second line
  const dust =
    interpolate(frame, [c1 + 4, c1 + 24], [1, 0.6], clamp) *
    interpolate(frame, [c2 + 6, c2 + 30], [1, 1 / 0.6], clamp);
  const gap = springIn(frame, c1 + 28, fps, 10);
  const holeAt = (i: number) => c2 + 50 + i * 6;
  const decimals = Math.max(1, Math.ceil(z) + 2);

  return (
    <SceneShell id="hole">
      <Sfx name="whoosh" at={c0 + 10} volume={0.16} />
      <Sfx name="tick" at={c0 + 60} volume={0.2} />
      <Sfx name="tick" at={c0 + 100} volume={0.2} />
      <Sfx name="riser" at={c1 + 2} volume={0.2} />
      <Sfx name="chime" at={c1 + 28} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.16} />
      {HOLES.map((_, i) =>
        i % 2 === 0 ? (
          <Sfx key={i} name={PLUCKS[(i / 2) % 6]} at={holeAt(i)} volume={0.2} />
        ) : null,
      )}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <RationalDots
            w={w}
            target={190}
            r={5 * dust}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {/* the ends of the window */}
          {[w.lo, w.hi].map((v, i) => (
            <text
              key={i}
              x={i === 0 ? X0 : X1}
              y={Y + 60}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 4)}
            >
              {v.toFixed(decimals)}
            </text>
          ))}
          {/* the gap at √2 */}
          <Gap x={toX(w, Math.SQRT2)} y={Y} s={gap} r={16} />
          <text
            x={toX(w, Math.SQRT2)}
            y={Y - 50}
            fill={colors.highlight}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={Math.min(1, gap)}
          >
            √2
          </text>
          <text
            x={toX(w, Math.SQRT2)}
            y={Y + 70}
            fill={colors.highlight}
            fontSize={32}
            textAnchor="middle"
            opacity={fadeIn(frame, c1 + 40) * (1 - out)}
          >
            {tx.gap}
          </text>
          {/* more gaps, once we zoom out */}
          {HOLES.map((h, i) => {
            const s = springIn(frame, holeAt(i), fps, 10);
            return (
              <g key={i}>
                <Gap x={toX(w, h.v)} y={Y} s={s} r={12} />
                {h.name ? (
                  <text
                    x={toX(w, h.v)}
                    y={Y - 40 - (i % 2) * 34}
                    fill={colors.highlight}
                    fontSize={34}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={Math.min(1, s)}
                  >
                    {h.name}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 44,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 10),
            translate: riseIn(frame, c0 + 10, 16),
          }}
        >
          {tx.zoom} ×{Math.round(10 ** z)}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
