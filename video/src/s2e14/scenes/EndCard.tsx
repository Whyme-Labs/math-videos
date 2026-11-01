import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap (c0): a unit circle with two perpendicular arrows, a right-angle mark
// and the dashed hypotenuse, a slow turn so the pair keeps its right angle;
// Pythagoras lands above it (c1, Euclid for free).
// Teaser for unitary spaces: the length² of (1, i) by the old rule,
// 1·1 + i·i = 0 in red; then a bar lands over the first i and the 0 flips
// to a green 2.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const th = 0.3 + (frame - c0) * 0.008;
  const O = { x: 960, y: 470 };
  const R = 260;
  const u = { x: O.x + R * Math.cos(th), y: O.y - R * Math.sin(th) };
  const v = { x: O.x - R * Math.sin(th), y: O.y - R * Math.cos(th) };
  const m = 40;
  const mk = (a: { x: number; y: number }) => ({
    x: O.x + ((a.x - O.x) / R) * m,
    y: O.y + ((a.y - O.y) / R) * m,
  });
  const bar = glide(frame, c2 + 60, fps, 14);
  const fixed = bar > 0.9;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 10} volume={0.14} />
      <Sfx name="thud" at={c2 + 30} volume={0.24} />
      <Sfx name="sparkle" at={c2 + 66} />

      <Sfx name="pop" at={c1 + 10} volume={0.12} />
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={O.x}
            cy={O.y}
            r={R}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={u.x}
            y1={u.y}
            x2={v.x}
            y2={v.y}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c0 + 20)}
          />
          <Arrow from={O} to={u} width={14} color={colors.orange} />
          <Arrow from={O} to={v} width={14} color={colors.highlight} />
          <path
            d={`M ${mk(u).x} ${mk(u).y} L ${mk(u).x + mk(v).x - O.x} ${mk(u).y + mk(v).y - O.y} L ${mk(v).x} ${mk(v).y}`}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
          />
        </svg>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 10) * part1,
          translate: riseIn(frame, c1 + 10, 12),
        }}
      >
        ‖u + v‖² = ‖u‖² + ‖v‖²
      </div>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 110,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c2 + 20),
            translate: riseIn(frame, c2 + 20, 16),
          }}
        >
          1·1 +{" "}
          <span style={{ position: "relative" }}>
            i
            <span
              style={{
                position: "absolute",
                left: "-0.05em",
                right: "-0.05em",
                top: "0.12em",
                height: 10,
                borderRadius: 5,
                background: colors.orange,
                opacity: bar,
                translate: `0 ${(1 - bar) * -60}px`,
              }}
            />
          </span>
          ·i ={" "}
          <span style={{ color: fixed ? colors.green : colors.red }}>
            {fixed ? "2" : "0"}
          </span>
        </div>
        <AbsoluteFill
          style={{ top: 620, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
              opacity: fadeIn(frame, c2 + 90),
              translate: riseIn(frame, c2 + 90),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 110) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
