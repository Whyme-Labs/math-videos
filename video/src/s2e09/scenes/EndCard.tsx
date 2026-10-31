import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: the two-slot machine takes two arrows and drops a number; beside
// it, the signature badge, which never changes. Teaser for tensors: a
// funnel marked ⊗; two arrows go in at the top and one glowing token comes
// out at the bottom.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const feed = glide(frame, c0 + 20, fps, 26);
  const out = Math.min(1, springIn(frame, c0 + 50, fps, 10));
  const badge = Math.min(1, springIn(frame, c0 + 80, fps, 10));
  const drop = glide(frame, c1 + 20, fps, 40);
  const token = Math.min(1, springIn(frame, c1 + 60, fps, 10));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 50} />
      <Sfx name="pop" at={c0 + 80} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={700}
            y={330}
            width={380}
            height={280}
            rx={30}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {[410, 530].map((y) => (
            <rect
              key={y}
              x={680}
              y={y - 22}
              width={40}
              height={44}
              rx={8}
              fill={colors.ink}
            />
          ))}
          {[0, 1].map((k) => {
            const y = [410, 530][k];
            const x = lerp(360, 660, feed);
            return (
              <Arrow
                key={k}
                from={{ x: x - 200, y: y + 30 * (k ? 1 : -1) }}
                to={{ x, y }}
                width={12}
                opacity={feed < 0.97 ? 1 : 0}
              />
            );
          })}
          <text
            x={890}
            y={490}
            fill={colors.orange}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            B
          </text>
          <g
            opacity={out}
            transform={`translate(${lerp(1100, 1180, out)} 500) scale(${out})`}
          >
            <text
              fill={colors.primary}
              fontSize={100}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              7
            </text>
          </g>
          <g opacity={badge} transform={`translate(1500 470) scale(${badge})`}>
            <rect
              x={-150}
              y={-56}
              width={300}
              height={100}
              rx={18}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.green}
              strokeWidth={6}
            />
            <text
              y={14}
              fill={colors.green}
              fontSize={54}
              textAnchor="middle"
              fontWeight={900}
            >
              (+, −)
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* teaser: the ⊗ funnel */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <path
            d="M 1180 260 L 1620 260 L 1440 520 L 1440 640 L 1360 640 L 1360 520 Z"
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <text
            x={1400}
            y={400}
            fill={colors.primary}
            fontSize={96}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ⊗
          </text>
          {[0, 1].map((k) => {
            const sx = k ? 1560 : 1240;
            const t = drop;
            return (
              <Arrow
                key={k}
                from={{ x: sx, y: lerp(60, 200, t) }}
                to={{ x: lerp(sx, 1400, t * 0.4), y: lerp(160, 300, t) }}
                width={12}
                color={k ? colors.highlight : colors.primary}
                opacity={t < 0.97 ? 1 : 0}
              />
            );
          })}
          <circle
            cx={1400}
            cy={lerp(600, 720, token)}
            r={34 * token}
            fill={colors.primary}
            opacity={token}
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
