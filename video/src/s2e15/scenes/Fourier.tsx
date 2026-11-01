import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff. A signal in time, three tones added, drawn left to right
// (c0). The 4 × 4 DFT matrix appears at the top, every entry an arrow
// ω^{jk} with ω = e^{−2πi/4}, and the frequency spikes grow on the right
// (c1). Dividing by √n shrinks every arrow to half length: now the columns
// are orthonormal, the matrix unitary (c2). Energy bars under each panel
// stand at the same height (c3). Running it backwards, each arrow flips to
// its conjugate and the matrix transposes; the wave redraws from the
// spikes (c4). Last the spikes pulse like a live equaliser (c5).

const TONES = [
  { f: 2, a: 1 },
  { f: 5, a: 0.6 },
  { f: 9, a: 0.4 },
];
const L = { x: 140, y: 470, w: 720 };
const RP = { x: 1060, w: 720 };
const wave = (t: number) =>
  TONES.reduce((s, k) => s + k.a * Math.sin(k.f * t * Math.PI * 2), 0);

export const Fourier: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fourier");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const draw = glide(frame, c0 + 10, fps, 50);
  const spikes = glide(frame, c1 + 40, fps, 24);
  const half = glide(frame, c2 + 10, fps, 20);
  const energy = glide(frame, c3 + 10, fps, 24);
  const back = glide(frame, c4 + 10, fps, 24);
  const redraw = glide(frame, c4 + 24, fps, 40);
  const live = frame > c5 ? 1 + 0.25 * Math.sin((frame - c5) * 0.4) : 1;
  const shown = frame >= c4 + 10 ? redraw : draw;
  const N = 240;
  const path = Array.from(
    { length: Math.max(2, Math.round(N * shown)) },
    (_, i) => {
      const t = i / N;
      return `${i ? "L" : "M"} ${(L.x + t * L.w).toFixed(1)} ${(L.y - wave(t) * 90).toFixed(1)}`;
    },
  ).join(" ");
  const E = 1 + 0.36 + 0.16;
  const M = { x: 960, y: 170 };
  const cell = 60;

  return (
    <SceneShell id="fourier">
      <Sfx name="whoosh" at={c0 + 10} volume={0.08} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      {TONES.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={c1 + 40 + k * 6} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 10} volume={0.08} />
      <Sfx name="ding" at={c3 + 36} volume={0.35} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the DFT matrix, every entry an arrow */}
        <g opacity={fadeIn(frame, c1 + 6)}>
          <path
            d={`M ${M.x - 2.3 * cell} ${M.y - 2.2 * cell} l -14 0 l 0 ${4.4 * cell} l 14 0 M ${M.x + 2.3 * cell} ${M.y - 2.2 * cell} l 14 0 l 0 ${4.4 * cell} l -14 0`}
            fill="none"
            stroke={colors.text}
            strokeWidth={5}
          />
          {Array.from({ length: 16 }).map((_, n) => {
            const j0 = Math.floor(n / 4);
            const k0 = n % 4;
            // backwards: conjugate (angle flips) and transpose (swap row/col)
            const j = back > 0.5 ? k0 : j0;
            const k = back > 0.5 ? j0 : k0;
            const ang = (-Math.PI / 2) * j0 * k0 * (1 - 2 * back);
            const len = cell * 0.42 * (1 - 0.5 * half);
            const cx = M.x + (k - 1.5) * cell;
            const cy = M.y + (j - 1.5) * cell;
            return (
              <g key={n}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={cell * 0.42}
                  fill={alpha(colors.paper, 0.05)}
                  stroke={alpha(colors.paper, 0.18)}
                  strokeWidth={2}
                />
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx + len * Math.cos(ang)}
                  y2={cy - len * Math.sin(ang)}
                  stroke={colors.orange}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <circle
                  cx={cx + len * Math.cos(ang)}
                  cy={cy - len * Math.sin(ang)}
                  r={5}
                  fill={colors.orange}
                />
              </g>
            );
          })}
        </g>
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
            y={L.y + 120 - k.a * 240 * spikes * (i === 0 ? live : 2 - live)}
            width={36}
            height={k.a * 240 * spikes * (i === 0 ? live : 2 - live)}
            rx={6}
            fill={colors.orange}
          />
        ))}
        <g opacity={fadeIn(frame, c1 + 30)}>
          {back > 0.5 ? (
            <Arrow
              from={{ x: 1020, y: 470 }}
              to={{ x: 900, y: 470 }}
              width={12}
              color={colors.green}
            />
          ) : (
            <Arrow
              from={{ x: 900, y: 470 }}
              to={{ x: 1020, y: 470 }}
              width={12}
              color={colors.orange}
            />
          )}
        </g>
        {/* energy */}
        <g opacity={fadeIn(frame, c3 + 6)}>
          <rect
            x={L.x + L.w / 2 - 60}
            y={790 - E * 70 * energy}
            width={120}
            height={E * 70 * energy}
            rx={8}
            fill={colors.green}
          />
          <rect
            x={RP.x + RP.w / 2 - 60}
            y={790 - E * 70 * energy}
            width={120}
            height={E * 70 * energy}
            rx={8}
            fill={colors.green}
          />
          <line
            x1={L.x + L.w / 2 + 80}
            y1={790 - E * 70}
            x2={RP.x + RP.w / 2 - 80}
            y2={790 - E * 70}
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c3 + 36)}
          />
          <text
            x={960}
            y={760}
            fill={colors.green}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 36)}
          >
            =
          </text>
          <text
            x={960}
            y={820}
            fill={colors.muted}
            fontSize={34}
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
          top: 300,
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
          top: 300,
          left: RP.x + RP.w - 300,
          width: 300,
          textAlign: "right",
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 40),
        }}
      >
        {tx.freq}
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1130,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 20) * fadeOut(frame, c4 + 6, 8),
          translate: riseIn(frame, c2 + 20, 10),
        }}
      >
        ÷ √n → U*U = I
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1130,
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 14),
          translate: riseIn(frame, c4 + 14, 10),
        }}
      >
        {tx.back}
      </div>
    </SceneShell>
  );
};
