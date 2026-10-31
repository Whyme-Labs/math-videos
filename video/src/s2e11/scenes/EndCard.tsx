import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Box, isoAt } from "../components/iso";
import { useStrings } from "../i18n";

// Recap: the cube breathing in and out of a slanted box, with a "det" badge
// on it. Teaser for eigenvectors: a grid transforms under [[4, 1], [2, 3]];
// most arrows swing off their lines while two lines glow and their arrows
// only stretch.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const breathe = 0.5 - 0.5 * Math.cos((frame - c0) * 0.06);
  const act = glide(frame, c1 + 20, fps, 40);
  const O = { x: 1300, y: 560 };
  const S = 60;
  const M = (x: number, y: number) => ({
    x: lerp(x, 4 * x + y, act),
    y: lerp(y, 2 * x + 3 * y, act),
  });
  const scr = (p: { x: number; y: number }) => ({
    x: O.x + p.x * S,
    y: O.y - p.y * S,
  });
  const to = isoAt(860, 420, 170);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="sparkle" at={c1 + 70} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Box
            a={[1 + 0.3 * breathe, 0.2 * breathe, 0]}
            b={[0.4 * breathe, 1, 0]}
            c={[0, 0.3 * breathe, 1 + 0.4 * breathe]}
            to={to}
          />
          <g transform="translate(1340 420)">
            <rect
              x={-120}
              y={-56}
              width={240}
              height={100}
              rx={20}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <text
              y={14}
              fill={colors.primary}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              det
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[
            { d: { x: 1, y: 1 }, c: colors.green },
            { d: { x: 1, y: -2 }, c: colors.green },
          ].map((l, k) => (
            <line
              key={k}
              x1={scr({ x: -2 * l.d.x, y: -2 * l.d.y }).x}
              y1={scr({ x: -2 * l.d.x, y: -2 * l.d.y }).y}
              x2={scr({ x: 2 * l.d.x, y: 2 * l.d.y }).x}
              y2={scr({ x: 2 * l.d.x, y: 2 * l.d.y }).y}
              stroke={alpha(l.c, 0.5 + 0.3 * act)}
              strokeWidth={8}
            />
          ))}
          {[
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0.5 },
          ].map((p, k) => (
            <Arrow
              key={k}
              from={O}
              to={scr(M(p.x, p.y))}
              width={10}
              color={alpha(colors.paper, 0.6)}
            />
          ))}
          <Arrow from={O} to={scr(M(0.7, 0.7))} width={14} />
          <Arrow
            from={O}
            to={scr(M(0.5, -1))}
            width={14}
            color={colors.highlight}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 80),
              translate: riseIn(frame, c1 + 80),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
