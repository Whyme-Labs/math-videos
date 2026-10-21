import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest } from "../../s1e11/components/hotel";
import { useStrings } from "../i18n";

// The staircase of infinities: |ℕ|, |ℝ|, |P(ℝ)|, … rising out of frame; the
// girl from the cold open climbs it while the camera tilts up and never
// reaches the top. Then the teaser for E13: tokens 0, 1, 2, 3, … race away
// to the right, and past all of them one more lands: ω.

const STEPS = ["|ℕ|", "|ℝ|", "|P(ℝ)|", "|P(P(ℝ))|", "…"];
const step = (k: number) => ({ x: 420 + k * 300, y: 860 - k * 190 });

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const climb = Math.min(3.6, Math.max(0, (frame - c0 - 10) / 22));
  const kk = Math.floor(climb);
  const a = step(kk);
  const b = step(Math.min(STEPS.length - 1, kk + 1));
  const g = hop(climb - kk, a.x, a.y, b.x, b.y, 80);
  const tilt = glide(frame, c0, fps, 90);
  const part1 = fadeOut(frame, c1, 10);
  const race = ramp(frame, c1 + 4, 60);
  const omega = glide(frame, c1 + 56, fps, 18);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 4} volume={0.14} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="pop" at={c0 + 10 + k * 22 + 18} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.16} />
      <Sfx name="chime" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <Camera zoom={1} x={lerp(0, 220, tilt)} y={lerp(0, -260, tilt)}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {STEPS.map((s, k) => {
              const p = step(k);
              return (
                <g key={s} opacity={fadeIn(frame, c0 + k * 8)}>
                  <rect
                    x={p.x - 140}
                    y={p.y}
                    width={300}
                    height={1200}
                    fill={alpha(colors.violet, 0.5 + k * 0.1)}
                    stroke={colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={p.x + 10}
                    y={p.y + 80}
                    fill={colors.primary}
                    fontSize={48}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    {s}
                  </text>
                </g>
              );
            })}
            <Guest
              x={g.x}
              y={g.y}
              color={colors.highlight}
              bob={frame / 3}
              size={0.9}
            />
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 64,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 30),
            translate: riseIn(frame, c0 + 30, 18),
          }}
        >
          {tx.sizes}
        </div>
      </AbsoluteFill>

      {/* counting past infinity */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={360}
            x2={1760}
            y2={360}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {Array.from({ length: 40 }).map((_, k) => {
            // positions crowd toward x = 1500 as k grows: 0, 1, 2, … accumulate
            const x = 200 + 1300 * (1 - 0.86 ** k);
            const t = ramp(frame, c1 + 4 + k * 1.5, 8);
            return (
              <g key={k} opacity={t * (1 - race * 0.2)}>
                <circle
                  cx={lerp(160, x, t)}
                  cy={360}
                  r={Math.max(3, 14 * 0.92 ** k)}
                  fill={colors.primary}
                />
                {k < 6 ? (
                  <text
                    x={x}
                    y={320}
                    fill={colors.text}
                    fontSize={36}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {k}
                  </text>
                ) : null}
              </g>
            );
          })}
          <g opacity={omega}>
            <circle
              cx={1620}
              cy={lerp(160, 360, omega)}
              r={20}
              fill={colors.highlight}
            />
            <text
              x={1620}
              y={lerp(120, 310, omega)}
              fill={colors.highlight}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              ω
            </text>
          </g>
        </svg>
        <AbsoluteFill style={{ top: 560, alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontSize: 40,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
