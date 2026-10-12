import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { BrandMark } from "../../shared/components/Brand";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { NextArrow, NumberNode } from "../../shared/components/graph";
import { useStrings } from "../i18n";

// Behind the title, the counting chain 0 → 1 → 2 → … builds itself and drifts left.
const N = 9;
const STEP = 230;

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const drift = -frame * 1.2;

  return (
    <SceneShell id="title" showCaptions={false} showWatermark={false}>
      <Sfx name="chime" at={15} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name={PLUCKS[i]} at={8 + i * 8} volume={0.18} />
      ))}

      <AbsoluteFill style={{ bottom: -190, zIndex: -1 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${drift} 0)`} opacity={0.45}>
            {Array.from({ length: N }).map((_, i) => {
              const s = springIn(frame, 4 + i * 8, fps, 12);
              const p = { x: 260 + i * STEP, y: 900 };
              return (
                <g key={i}>
                  {i > 0 ? (
                    <NextArrow
                      a={{ x: p.x - STEP, y: p.y }}
                      b={p}
                      progress={s}
                    />
                  ) : null}
                  <NumberNode
                    x={p.x}
                    y={p.y}
                    label={String(i)}
                    scale={Math.min(1, s)}
                  />
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
