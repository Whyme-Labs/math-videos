import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Corridor, doorCenter, Guest, guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// Behind the title: the corridor keeps sliding past, every room occupied.

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const x = doorCenter(4) - 960 + frame * 6;

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      <Sfx name="whoosh" at={10} volume={0.14} />

      <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
        <Camera zoom={0.6} x={x} y={-560}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <Corridor from={0} to={30} />
            {Array.from({ length: 30 }).map((_, n) => (
              <Guest key={n} x={doorCenter(n)} color={guestColor(n)} />
            ))}
          </svg>
        </Camera>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", bottom: 80 }}
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
