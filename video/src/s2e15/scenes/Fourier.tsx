import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff. On the left a signal in time, the sum of three tones, drawn
// left to right. An arrow carries it to the right, where three frequency
// spikes grow (heights 1, 0.6, 0.4). Then an energy bar under each panel:
// the same height on both sides, joined by a green "=". Last the arrow
// runs back (labelled: back = conjugate transpose) and the wave redraws
// from the spikes.

const TONES = [
  { f: 2, a: 1 },
  { f: 5, a: 0.6 },
  { f: 9, a: 0.4 },
];
const L = { x: 140, y: 380, w: 720 };
const RP = { x: 1060, y: 380, w: 720 };
const wave = (t: number) =>
  TONES.reduce((s, k) => s + k.a * Math.sin(k.f * t * Math.PI * 2), 0);

export const Fourier: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fourier");
  const [c0, c1] = cues;
  const draw = glide(frame, c0 + 10, fps, 40);
  const spikes = glide(frame, c0 + 70, fps, 24);
  const energy = glide(frame, c1 + 10, fps, 24);
  const redraw = glide(frame, c1 + 76, fps, 36);
  const back = frame >= c1 + 70;
  const shown = back ? redraw : draw;
  const N = 240;
  const path = Array.from(
    { length: Math.max(2, Math.round(N * shown)) },
    (_, i) => {
      const t = i / N;
      return `${i ? "L" : "M"} ${(L.x + t * L.w).toFixed(1)} ${(L.y - wave(t) * 90).toFixed(1)}`;
    },
  ).join(" ");
  const E = 1 + 0.36 + 0.16;

  return (
    <SceneShell id="fourier">
      <Sfx name="whoosh" at={c0 + 60} volume={0.12} />
      {TONES.map((_, k) => (
        <Sfx
          key={k}
          name={(["pluck1", "pluck3", "pluck5"] as const)[k]}
          at={c0 + 70 + k * 6}
          volume={0.14}
        />
      ))}
      <Sfx name="ding" at={c1 + 36} volume={0.45} />
      <Sfx name="whoosh" at={c1 + 70} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 126} volume={0.5} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={L.x}
          y1={L.y}
          x2={L.x + L.w}
          y2={L.y}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <path
          d={path}
          fill="none"
          stroke={colors.primary}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <line
          x1={RP.x}
          y1={L.y + 120}
          x2={RP.x + RP.w}
          y2={L.y + 120}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        {TONES.map((k, i) => (
          <rect
            key={i}
            x={RP.x + (k.f / 10) * RP.w - 18}
            y={L.y + 120 - k.a * 250 * spikes}
            width={36}
            height={k.a * 250 * spikes}
            rx={6}
            fill={colors.orange}
          />
        ))}
        <g opacity={fadeIn(frame, c0 + 60)}>
          {back ? (
            <Arrow
              from={{ x: 1020, y: 220 }}
              to={{ x: 900, y: 220 }}
              width={12}
              color={colors.green}
            />
          ) : (
            <Arrow
              from={{ x: 900, y: 220 }}
              to={{ x: 1020, y: 220 }}
              width={12}
              color={colors.orange}
            />
          )}
        </g>
        {/* energy */}
        <g opacity={fadeIn(frame, c1 + 6)}>
          <rect
            x={L.x + L.w / 2 - 60}
            y={760 - E * 80 * energy}
            width={120}
            height={E * 80 * energy}
            rx={8}
            fill={colors.green}
          />
          <rect
            x={RP.x + RP.w / 2 - 60}
            y={760 - E * 80 * energy}
            width={120}
            height={E * 80 * energy}
            rx={8}
            fill={colors.green}
          />
          <line
            x1={L.x + L.w / 2 + 80}
            y1={760 - E * 80}
            x2={RP.x + RP.w / 2 - 80}
            y2={760 - E * 80}
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c1 + 36)}
          />
          <text
            x={960}
            y={760 - E * 40 + 30}
            fill={colors.green}
            fontSize={90}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 36)}
          >
            =
          </text>
          <text
            x={960}
            y={800}
            fill={colors.muted}
            fontSize={36}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.energy}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: L.x,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        {tx.time}
      </div>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: RP.x + RP.w - 300,
          width: 300,
          textAlign: "right",
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 70),
        }}
      >
        {tx.freq}
      </div>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 560,
          width: 800,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 76),
          translate: riseIn(frame, c1 + 76, 12),
        }}
      >
        {tx.back}
      </div>
    </SceneShell>
  );
};
