import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The rationals between 0 and 2 fill in until the line looks solid. Then a
// zoom towards √2, where no rational sits: the teaser for E07.

const LINE_Y = 330;
const X0 = 460;
const UNIT = 500;
const SQRT2 = Math.SQRT2;

// Fractions p/q in [0, 2] with q ≤ 12, in lowest terms, smallest q first.
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const RATIONALS: { v: number; q: number }[] = [];
for (let q = 1; q <= 12; q++)
  for (let p = 0; p <= 2 * q; p++)
    if (gcd(p, q) === 1) RATIONALS.push({ v: p / q, q });

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const zoom = glide(frame, c1 + 10, fps, 40);
  const scale = lerp(1, 7, zoom);
  // Screen x of a value, zooming about √2.
  const sx = (v: number) => {
    const base = X0 + v * UNIT;
    const pivot = X0 + SQRT2 * UNIT;
    return lerp(base, 960 + (base - pivot) * scale, zoom);
  };
  const gap = springIn(frame, c1 + 46, fps, 10);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="tick" at={c0 + 10} volume={0.2} />
      <Sfx name="tick" at={c0 + 30} volume={0.2} />
      <Sfx name="tick" at={c0 + 50} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.18} />
      <Sfx name="chime" at={c1 + 46} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={0}
            y1={LINE_Y}
            x2={1920}
            y2={LINE_Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {[0, 1, 2].map((n) => (
            <text
              key={n}
              x={sx(n)}
              y={LINE_Y + 60}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 4) * (1 - zoom)}
            >
              {n}
            </text>
          ))}
          {RATIONALS.map((r, i) => {
            const x = sx(r.v);
            if (x < -20 || x > 1940) return null;
            const s = Math.min(1, springIn(frame, c0 + 6 + r.q * 6, fps, 12));
            return (
              <circle
                key={i}
                cx={x}
                cy={LINE_Y}
                r={(r.q <= 2 ? 10 : r.q <= 6 ? 7 : 5) * s}
                fill={colors.primary}
              />
            );
          })}
          {/* the hole at √2 */}
          <circle
            cx={sx(SQRT2)}
            cy={LINE_Y}
            r={16 * Math.min(1, gap)}
            fill={colors.bg}
            stroke={colors.highlight}
            strokeWidth={4}
          />
          <text
            x={sx(SQRT2)}
            y={LINE_Y - 50}
            fill={colors.highlight}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={Math.min(1, gap)}
          >
            x² = 2 ?
          </text>
          <text
            x={960}
            y={LINE_Y - 120}
            fill={colors.primary}
            fontSize={72}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 10) * (1 - zoom)}
          >
            ℚ
          </text>
        </svg>

        <AbsoluteFill style={{ top: 580, alignItems: "center", gap: 10 }}>
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
