import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { SetBox } from "../components/sets";
import { useStrings } from "../i18n";

// Behind the title: von Neumann numbers 0, 1, 2, 3 as boxes of boxes.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name={PLUCKS[i]} at={8 + i * 8} volume={0.18} />
      ))}

      <AbsoluteFill style={{ bottom: -190, zIndex: -1 }}>
        <svg width={1920} height={1080}>
          <g opacity={0.4} transform={`translate(${-frame * 0.8} 0)`}>
            {[0, 1, 2, 3].map((i) => {
              const s = springIn(frame, 4 + i * 8, fps, 12);
              const x = [240, 420, 680, 1120][i];
              return (
                <g
                  key={i}
                  opacity={Math.min(1, s)}
                  transform={`translate(${x} 900) scale(${Math.min(1, s)}) translate(${-x} -900)`}
                >
                  <SetBox n={i} kind="vn" cx={x} cy={900} />
                </g>
              );
            })}
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", bottom: -130 }}
      >
        <BrandMark
          height={90}
          style={{ marginBottom: 36, opacity: fadeIn(frame, 0) }}
        />
        <div
          style={{
            fontSize: 36,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: colors.highlight,
            opacity: fadeIn(frame, 5),
            translate: riseIn(frame, 5),
          }}
        >
          {tx.season}
        </div>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 132,
            fontWeight: 700,
            marginTop: 24,
            opacity: fadeIn(frame, 15),
            translate: riseIn(frame, 15),
          }}
        >
          {tx.title}
        </div>
        <div
          style={{
            fontSize: 48,
            color: colors.muted,
            marginTop: 28,
            opacity: fadeIn(frame, 35),
            translate: riseIn(frame, 35),
          }}
        >
          {tx.subtitle}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
