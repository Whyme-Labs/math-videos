import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: the cobweb for cos x closing on its fixed point (c0–c1). Teaser
// for the dual: tents at 0 getting narrower, their area read out going to
// 0 while "the value at 0" keeps reading 1 (c2).

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const xs = [1];
  for (let i = 0; i < 12; i++) xs.push(Math.cos(xs[i]));
  const k = Math.min(12, Math.floor(Math.max(0, frame - c0 - 6) / 6));
  const S = 380;
  const O = { x: 760, y: 760 };
  const web = Array.from(
    { length: k },
    (_, i) =>
      `M ${O.x + S * xs[i]} ${O.y - S * (i ? xs[i] : 0)} L ${O.x + S * xs[i]} ${O.y - S * xs[i + 1]} L ${O.x + S * xs[i + 1]} ${O.y - S * xs[i + 1]}`,
  ).join(" ");
  const w = 1 / (1 + Math.max(0, frame - c2 - 6) * 0.15);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="ding" at={c1 + 6} volume={0.24} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + S}
            y2={O.y - S}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
          />
          <path
            d={Array.from(
              { length: 41 },
              (_, i) =>
                `${i ? "L" : "M"} ${O.x + (S * i) / 40} ${O.y - S * Math.cos(i / 40)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path d={web} fill="none" stroke={colors.orange} strokeWidth={3} />
          <circle
            cx={O.x + S * 0.739}
            cy={O.y - S * 0.739}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c1 + 6, 8)}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1180}
            y1={600}
            x2={1760}
            y2={600}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
          />
          <path
            d={`M 1180 ${600 - 220} L ${1180 + 580 * w} 600 L 1180 600 Z`}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <circle cx={1180} cy={380} r={12} fill={colors.highlight} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 640,
            left: 1180,
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ∫ = {(w / 2).toFixed(3)} · f(0) = 1
        </div>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
              opacity: fadeIn(frame, c2 + 70),
              translate: riseIn(frame, c2 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
