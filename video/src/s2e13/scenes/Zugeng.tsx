import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 祖暅原理: equal cross-sections at every height
// give equal volumes. Two stacks of cards side by side, one straight, one
// pushed into a slant; a scan line climbs both and at each height the two
// slices light up together, the same width. Badge: volume unchanged,
// det = 1. Last, the slanted stack keeps one glowing line along its base
// and a lone arrow on it: only one eigen-direction.

const N = 14;

export const Zugeng: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zugeng");
  const [c0, c1, c2] = cues;
  const push = glide(frame, c0 + 30, fps, 40);
  const scan = Math.floor(((frame - c1 - 10) / 6) % N);
  const scanning = frame > c1 + 10 && frame < c2;
  const badge = Math.min(1, springIn(frame, c1 + 60, fps, 10));
  const base = fadeIn(frame, c2 + 20, 10);

  return (
    <SceneShell id="zugeng">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="riser" at={c1 + 10} volume={0.08} />
      <Sfx name="ding" at={c1 + 60} />
      <Sfx name="pluck2" at={c2 + 20} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[0, 1].map((side) =>
          Array.from({ length: N }).map((_, k) => {
            const x = (side ? 1020 : 360) + (side ? k * 26 * push : 0);
            const y = 740 - k * 34;
            const lit = scanning && k === scan;
            return (
              <rect
                key={`${side}${k}`}
                x={x}
                y={y}
                width={380}
                height={30}
                rx={5}
                fill={
                  lit ? colors.primary : alpha(colors.paper, k % 2 ? 0.9 : 0.75)
                }
                stroke={colors.ink}
                strokeWidth={2}
              />
            );
          }),
        )}
        <line
          x1={980}
          y1={772}
          x2={1820}
          y2={772}
          stroke={colors.primary}
          strokeWidth={8}
          opacity={base}
        />
        <line
          x1={1040}
          y1={800}
          x2={1300}
          y2={800}
          stroke={colors.primary}
          strokeWidth={10}
          opacity={base}
        />
        <polygon
          points="1320,800 1290,784 1290,816"
          fill={colors.primary}
          opacity={base}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.zugeng}
      </div>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 760,
          width: 400,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: badge,
          scale: String(badge),
        }}
      >
        {tx.volumeSame}
      </div>
    </SceneShell>
  );
};
