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

// Recap: V and W with T going forward along the top, W* and V* with T*
// coming back along the bottom, and V joined to V** by a green thread.
// Teaser for bilinear forms: a machine with two slots; two arrows slide in
// and one number drops out.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const node = (k: number) =>
    Math.min(1, springIn(frame, c0 + 10 + k * 10, fps, 10));
  const feed = glide(frame, c1 + 20, fps, 30);
  const out = Math.min(1, springIn(frame, c1 + 54, fps, 10));
  const N = [
    { x: 560, y: 320, t: "V", c: colors.primary },
    { x: 1360, y: 320, t: "W", c: colors.primary },
    { x: 560, y: 660, t: "V*", c: colors.orange },
    { x: 1360, y: 660, t: "W*", c: colors.orange },
    { x: 960, y: 160, t: "V**", c: colors.primary },
  ];

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {N.map((_, k) => (
        <Sfx key={k} name="pop" at={c0 + 10 + k * 10} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="ding" at={c1 + 54} />
      <Sfx name="sparkle" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={680}
            y1={320}
            x2={1220}
            y2={320}
            stroke={colors.primary}
            strokeWidth={8}
            opacity={node(1)}
          />
          <polygon
            points="1240,320 1212,304 1212,336"
            fill={colors.primary}
            opacity={node(1)}
          />
          <text
            x={960}
            y={290}
            fill={colors.primary}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={node(1)}
          >
            T
          </text>
          <line
            x1={1240}
            y1={660}
            x2={700}
            y2={660}
            stroke={colors.orange}
            strokeWidth={8}
            opacity={node(3)}
          />
          <polygon
            points="680,660 708,644 708,676"
            fill={colors.orange}
            opacity={node(3)}
          />
          <text
            x={960}
            y={730}
            fill={colors.orange}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={node(3)}
          >
            T* = T
            <tspan dy={-24} fontSize={34}>
              T
            </tspan>
          </text>
          <path
            d="M 640 250 Q 760 150 860 160"
            fill="none"
            stroke={colors.green}
            strokeWidth={8}
            opacity={node(4)}
          />
          {N.map((n, k) => (
            <g
              key={n.t}
              opacity={node(k)}
              transform={`translate(${n.x} ${n.y}) scale(${node(k)})`}
            >
              <circle
                r={90}
                fill={alpha(colors.bgMid, 0.95)}
                stroke={n.c}
                strokeWidth={7}
              />
              <text
                y={24}
                fill={n.c}
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {n.t}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      {/* teaser: a machine with two slots */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={1220}
            y={360}
            width={360}
            height={260}
            rx={30}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {[420, 540].map((y) => (
            <rect
              key={y}
              x={1200}
              y={y - 22}
              width={40}
              height={44}
              rx={8}
              fill={colors.ink}
            />
          ))}
          {[0, 1].map((k) => {
            const y = [420, 540][k];
            const x = lerp(900, 1180, feed);
            return (
              <Arrow
                key={k}
                from={{ x: x - 200, y: y + 20 * (k ? 1 : -1) }}
                to={{ x, y }}
                width={12}
                opacity={feed < 0.98 ? 1 : 0}
              />
            );
          })}
          <g
            opacity={out}
            transform={`translate(${lerp(1600, 1700, out)} 500) scale(${out})`}
          >
            <text
              fill={colors.primary}
              fontSize={96}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              7
            </text>
          </g>
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
