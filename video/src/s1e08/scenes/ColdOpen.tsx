import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import {
  Gap,
  RationalDots,
  toX,
  type Window,
} from "../../shared/components/rationals";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The E07 zoom into the hole at √2, reprised. Then names get patched into
// gaps one at a time while new gaps keep appearing. Then the two answers of
// 1872 side by side: a knife (Dedekind) and a swarm (Cantor).

const Y = 420;
const PATCHES = [
  { v: Math.SQRT2, name: "√2" },
  { v: Math.sqrt(3), name: "√3" },
  { v: Math.PI / 2, name: "π/2" },
  { v: Math.E - 1, name: "e − 1" },
];
const MORE = [1.08, 1.27, 1.52, 1.63, 1.79, 1.88, 1.95, 1.12, 1.36, 1.69];
const KNIFE = { x: 620, y: 470 };
const SWARM = { x: 1300, y: 470 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2] = cues;
  // zoom into √2 and back out
  const z = interpolate(frame, [c0 + 6, c0 + 80, c0 + 120, c1], [0, 2, 2, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const half = 0.5 * 10 ** -z;
  const center = lerp(1.5, Math.SQRT2, Math.min(1, z));
  const w: Window = {
    lo: center - half,
    hi: center + half,
    x0: 260,
    x1: 1660,
    y: Y,
  };
  const lineOut = fadeOut(frame, c2, 12);
  const patchAt = (i: number) => c1 + 10 + i * 22;
  const moreAt = (i: number) => c1 + 30 + i * 8;
  const cut = ramp(frame, c2 + 30, 14);
  const swarm = ramp(frame, c2 + 30, 70);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 6} volume={0.16} />
      <Sfx name="riser" at={c0 + 50} volume={0.18} />
      <Sfx name="whoosh" at={c0 + 120} volume={0.12} />
      {PATCHES.map((_, i) => (
        <Sfx key={i} name="clink" at={patchAt(i) + 14} volume={0.24} />
      ))}
      {MORE.map((_, i) =>
        i % 2 === 0 ? (
          <Sfx key={`m${i}`} name="tick" at={moreAt(i)} volume={0.14} />
        ) : null,
      )}
      <Sfx name="chime" at={c2 + 10} />
      <Sfx name="scratch" at={c2 + 30} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx
          key={`s${k}`}
          name={PLUCKS[k]}
          at={c2 + 40 + k * 12}
          volume={0.2}
        />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c0 + 2) * lineOut}>
            <RationalDots w={w} target={180} r={4} />
            <Gap
              x={toX(w, Math.SQRT2)}
              y={Y}
              s={springIn(frame, c0 + 70, fps, 10)}
              r={16}
            />
            {/* patches dropped into gaps, while more gaps appear */}
            {PATCHES.map((p, i) => {
              const t = springIn(frame, patchAt(i), fps, 12);
              const x = toX(w, p.v);
              return (
                <g key={p.name} opacity={fadeIn(frame, patchAt(i))}>
                  <rect
                    x={x - 36}
                    y={lerp(Y - 180, Y - 70, Math.min(1, t))}
                    width={72}
                    height={44}
                    rx={10}
                    fill={colors.primary}
                  />
                  <text
                    x={x}
                    y={lerp(Y - 180, Y - 70, Math.min(1, t)) + 32}
                    fill={colors.ink}
                    fontSize={28}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
            {frame >= c1
              ? [...PATCHES.slice(1).map((p) => p.v), ...MORE].map((v, i) => (
                  <Gap
                    key={i}
                    x={toX(w, v)}
                    y={Y}
                    s={springIn(
                      frame,
                      i < 3 ? patchAt(i + 1) : moreAt(i - 3),
                      fps,
                      10,
                    )}
                    r={11}
                  />
                ))
              : null}
          </g>
          {/* Dedekind's knife */}
          <g opacity={fadeIn(frame, c2 + 6)}>
            <line
              x1={KNIFE.x - 230}
              y1={KNIFE.y}
              x2={KNIFE.x}
              y2={KNIFE.y}
              stroke={colors.primary}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <line
              x1={KNIFE.x}
              y1={KNIFE.y}
              x2={KNIFE.x + 230}
              y2={KNIFE.y}
              stroke={alpha(colors.orange, 0.8)}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <line
              x1={KNIFE.x}
              y1={KNIFE.y - 130}
              x2={KNIFE.x}
              y2={lerp(KNIFE.y - 130, KNIFE.y + 60, cut)}
              stroke={colors.highlight}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <polygon
              points={`${KNIFE.x - 20},${KNIFE.y - 196} ${KNIFE.x + 20},${KNIFE.y - 196} ${KNIFE.x},${KNIFE.y - 130}`}
              fill={colors.highlight}
            />
          </g>
          {/* Cantor's swarm */}
          <g opacity={fadeIn(frame, c2 + 10)}>
            <line
              x1={SWARM.x - 230}
              y1={SWARM.y}
              x2={SWARM.x + 230}
              y2={SWARM.y}
              stroke={colors.muted}
              strokeWidth={4}
            />
            {Array.from({ length: 14 }).map((_, k) => {
              const side = k % 2 === 0 ? -1 : 1;
              const d0 = 220 / (1 + Math.floor(k / 2) * 0.6);
              const d = d0 * (1 - 0.92 * swarm);
              const lift = ((k * 37) % 50) - 25;
              return (
                <circle
                  key={k}
                  cx={SWARM.x + side * d}
                  cy={SWARM.y + lift * (1 - swarm)}
                  r={9}
                  fill={k % 2 === 0 ? colors.primary : colors.orange}
                />
              );
            })}
          </g>
        </svg>
        {[
          { x: KNIFE.x, name: "Dedekind · 1872", label: tx.knife },
          { x: SWARM.x, name: "Cantor · 1872", label: tx.swarm },
        ].map((m, i) => (
          <div
            key={m.name}
            style={{
              position: "absolute",
              left: m.x - 260,
              width: 520,
              top: KNIFE.y + 90,
              textAlign: "center",
              opacity: fadeIn(frame, c2 + 14 + i * 10),
              translate: riseIn(frame, c2 + 14 + i * 10, 16),
            }}
          >
            <div
              style={{
                fontFamily: fonts.title,
                fontSize: 48,
                color: colors.primary,
              }}
            >
              {m.label}
            </div>
            <div style={{ fontSize: 32, color: colors.muted, marginTop: 8 }}>
              {m.name}
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 600,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 70) * lineOut,
            translate: riseIn(frame, c1 + 70, 16),
          }}
        >
          {tx.newHoles}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
