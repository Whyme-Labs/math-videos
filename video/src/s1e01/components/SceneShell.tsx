import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { narration, sceneTiming, type SceneId } from "../narration";
import { colors, fonts } from "../theme";
import { fadeIn } from "./anim";

// Start frames of each narration line in this scene.
export const useCues = (id: SceneId) => {
  const { fps } = useVideoConfig();
  return sceneTiming(id, fps).starts;
};

// Background, safe-area content slot, and narration captions for one scene.
export const SceneShell: React.FC<{
  readonly id: SceneId;
  readonly children: React.ReactNode;
  readonly showCaptions?: boolean;
}> = ({ id, children, showCaptions = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { starts } = sceneTiming(id, fps);
  const lines = narration[id];
  let current = 0;
  for (let i = 0; i < starts.length; i++) if (frame >= starts[i]) current = i;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        backgroundImage: `radial-gradient(circle at 50% 35%, #1a2230 0%, ${colors.bg} 65%)`,
        color: colors.text,
        fontFamily: fonts.body,
      }}
    >
      <AbsoluteFill style={{ bottom: 190 }}>{children}</AbsoluteFill>
      {showCaptions ? (
        <div
          style={{
            position: "absolute",
            left: 160,
            right: 160,
            bottom: 56,
            minHeight: 110,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            key={current}
            style={{
              opacity: fadeIn(frame, starts[current], 8),
              backgroundColor: "rgba(0,0,0,0.55)",
              border: `1px solid ${colors.panelEdge}`,
              borderRadius: 16,
              padding: "18px 32px",
              fontSize: 38,
              lineHeight: 1.35,
              textAlign: "center",
              maxWidth: 1500,
            }}
          >
            {lines[current]}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
