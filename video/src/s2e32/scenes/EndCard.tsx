import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { blob, stir, toXY } from "../components/swirl";
import { useStrings } from "../i18n";

// Recap: the stirred cup on the left and the unit circle of eigenvalues
// on the right (c0); the circle's three readings appear beside it,
// recurrence, ergodic, mixing (c1). Teaser for distributions: a spike
// narrowing on a line, heading for a delta (c2).

const DROPS = blob(300);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const t = 14 + frame / 30;
  const w = 0.25 * 0.9 ** Math.max(0, (frame - c2 - 10) / 3) + 0.004;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 80} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={560}
            cy={450}
            r={250}
            fill={alpha("#3a2414", 0.95)}
            stroke={colors.paper}
            strokeWidth={7}
          />
          {DROPS.map((d, i) => {
            const [x, y] = toXY(stir(d, t), 560, 450, 232);
            return <circle key={i} cx={x} cy={y} r={4} fill={colors.paper} />;
          })}
          <circle
            cx={1300}
            cy={450}
            r={220}
            fill="none"
            stroke={colors.orange}
            strokeWidth={10}
          />
          <circle cx={1520} cy={450} r={16} fill={colors.green} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 330,
            left: 1580,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontSize: 40,
            fontWeight: 800,
            opacity: fadeIn(frame, c1 + 6),
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: colors.highlight }}>{tx.recurrence}</span>
          <span style={{ color: colors.green }}>{tx.ergodic}</span>
          <span style={{ color: colors.orange }}>{tx.mixingWord}</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1100}
            y1={680}
            x2={1800}
            y2={680}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={Array.from({ length: 401 }, (_, i) => {
              const x = -1 + (2 * i) / 400;
              const v = Math.exp(-((x / w) ** 2)) / w;
              return `${i ? "L" : "M"} ${1450 + 330 * x} ${680 - Math.min(480, 26 * v)}`;
            }).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <text
            x={1450}
            y={740}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            δ
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 860,
              opacity: fadeIn(frame, c2 + 60),
              translate: riseIn(frame, c2 + 60),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 80) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
