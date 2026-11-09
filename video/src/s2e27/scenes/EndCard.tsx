import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the bump sliding away under sensors that read 0 (c0); a ball
// settling at the bottom of a bowl (c1). Teaser for Hilbert spaces: a
// point dropping a perpendicular onto a line, a right-angle mark
// appearing at its foot (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const p = 300 + 6 * Math.max(0, frame - c0);
  const roll = glide(frame, c1 + 6, fps, 40);
  const u = 0.1 + 0.4 * roll;
  const drop = glide(frame, c2 + 20, fps, 24);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="ding" at={c1 + 46} volume={0.2} />
      <Sfx name="sparkle" at={c2 + 70} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={100}
            y1={420}
            x2={1820}
            y2={420}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          <path
            d={Array.from(
              { length: 41 },
              (_, i) =>
                `${i ? "L" : "M"} ${p - 70 + 3.5 * i} ${420 - 160 * Math.max(0, 1 - ((3.5 * i - 70) / 70) ** 2) ** 2}`,
            ).join(" ")}
            fill={alpha(colors.primary, 0.35)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {[300, 600, 900, 1200, 1500].map((x) => (
            <rect
              key={x}
              x={x - 10}
              y={430}
              width={20}
              height={44}
              rx={5}
              fill={colors.orange}
            />
          ))}
          <g opacity={fadeIn(frame, c1 + 4, 8)}>
            <path
              d={Array.from(
                { length: 101 },
                (_, i) =>
                  `${i ? "L" : "M"} ${660 + 6 * i} ${820 - 600 * (i / 100 - 0.5) ** 2}`,
              ).join(" ")}
              fill="none"
              stroke={colors.green}
              strokeWidth={5}
            />
            <circle
              cx={660 + 600 * u}
              cy={820 - 600 * (u - 0.5) ** 2 - 20}
              r={20}
              fill={colors.orange}
            />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1060}
            y1={760}
            x2={1820}
            y2={480}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <circle cx={1300} cy={360} r={14} fill={colors.highlight} />
          <line
            x1={1300}
            y1={360}
            x2={1300 + (1386 - 1300) * drop}
            y2={360 + (594 - 360) * drop}
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="10 7"
          />
          <path
            d="M 1366 601 L 1373 620 L 1392 613"
            fill="none"
            stroke={colors.paper}
            strokeWidth={4}
            opacity={fadeIn(frame, c2 + 44, 6)}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 820,
              opacity: fadeIn(frame, c2 + 60),
              translate: riseIn(frame, c2 + 60),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text, fontFamily: fonts.body }}>
              {tx.nextTitle}
            </span>
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
