import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useStrings } from "../i18n";
import { fadeIn, riseIn } from "../components/anim";
import { BrandMark, BrandWordmark } from "../components/Brand";
import { PLUCKS, Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

// 0, S(0), S(S(0)), …: counting with nothing but zero and "next".
const CHAIN = ["0", "S(0)", "S(S(0))", "S(S(S(0)))"];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("endCard");
  const spin = interpolate(frame, [0, 120], [0, 360]);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={10} />
      {CHAIN.map((c, i) => (
        <Sfx key={c} name={PLUCKS[i + 2]} at={cues[1] + 20 + i * 25} />
      ))}
      <Sfx name="page" at={cues[1] + 140} />
      <Sfx name="sparkle" at={cues[1] + 170} />

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 60 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            opacity: fadeIn(frame, 10),
          }}
        >
          <div
            style={{ fontFamily: fonts.title, fontSize: 150, fontWeight: 700 }}
          >
            {tx.nextWord}
          </div>
          <svg
            width={130}
            height={130}
            viewBox="0 0 130 130"
            style={{ rotate: `${spin}deg` }}
          >
            <path
              d="M 65 15 A 50 50 0 1 1 20 45"
              fill="none"
              stroke={colors.highlight}
              strokeWidth={10}
              strokeLinecap="round"
            />
            <polygon points="65,0 65,30 90,15" fill={colors.highlight} />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            fontFamily: fonts.math,
            fontSize: 52,
          }}
        >
          {CHAIN.map((c, i) => (
            <span
              key={c}
              style={{
                opacity: fadeIn(frame, cues[1] + 20 + i * 25),
                translate: riseIn(frame, cues[1] + 20 + i * 25, 20),
              }}
            >
              {i > 0 ? (
                <span style={{ color: colors.highlight }}>→ </span>
              ) : null}
              {c}
            </span>
          ))}
          <span
            style={{
              opacity: fadeIn(frame, cues[1] + 120),
              color: colors.muted,
            }}
          >
            → …
          </span>
        </div>
        <div
          style={{
            fontSize: 40,
            color: colors.muted,
            opacity: fadeIn(frame, cues[1] + 140),
          }}
        >
          {tx.nextEpisode}
          <span style={{ color: colors.text }}>{tx.nextTitle}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 30,
            opacity: fadeIn(frame, cues[1] + 170),
          }}
        >
          <BrandMark height={70} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <BrandWordmark height={30} />
            <span
              style={{
                fontSize: 24,
                letterSpacing: 4,
                color: colors.muted,
                textTransform: "uppercase",
              }}
            >
              {tx.seriesLine}
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
