import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// Three rings side by side: the six-hour clock, a polynomial card, a card
// of numbers with √−5. Each gets a drop of glue (its ideal) and shines.
// Then the teaser for E19: a compass sweeps an arc across an angle, a
// ruler lays two trial lines to cut it in three, and both fade to "?".

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const dropAt = (k: number) => c0 + 20 + k * 40;
  const part1 = fadeOut(frame, c1, 10);
  const arc = glide(frame, c1 + 10, fps, 24);
  const tryLines = glide(frame, c1 + 40, fps, 20);
  const q = Math.min(1, springIn(frame, c1 + 66, fps, 10));
  const V = { x: 1100, y: 760 };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pop" at={dropAt(k) + 14} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.14} />
      <Sfx name="scratch" at={c1 + 40} volume={0.2} />
      <Sfx name="ding" at={c1 + 66} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const x = 420 + k * 540;
            const drop = glide(frame, dropAt(k), fps, 14);
            const shine = frame >= dropAt(k) + 14;
            return (
              <g key={k}>
                {k === 0 ? (
                  <Clock x={x} y={520} r={170} n={6} pos={0} zeroTop />
                ) : (
                  <g>
                    <rect
                      x={x - 200}
                      y={400}
                      width={400}
                      height={240}
                      rx={24}
                      fill={alpha(colors.violet, 0.8)}
                      stroke={shine ? colors.highlight : colors.primary}
                      strokeWidth={shine ? 8 : 4}
                    />
                    <text
                      x={x}
                      y={540}
                      fill={colors.text}
                      fontSize={60}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                      fontWeight={800}
                    >
                      {k === 1 ? "a + bx" : "a + b√−5"}
                    </text>
                  </g>
                )}
                {/* the drop of glue: the ideal */}
                <g
                  opacity={drop > 0 && drop < 1 ? 1 : 0}
                  transform={`translate(${x} ${lerp(160, 360, drop)})`}
                >
                  <path
                    d="M 0 -40 Q 30 0 0 30 Q -30 0 0 -40 Z"
                    fill={colors.highlight}
                    stroke={colors.ink}
                    strokeWidth={3}
                  />
                </g>
                <text
                  x={x}
                  y={770}
                  fill={colors.highlight}
                  fontSize={54}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={shine ? fadeIn(frame, dropAt(k) + 14) : 0}
                >
                  {["(6)", "(x² + 1)", "(2, 1 + √−5)"][k]}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the teaser: ruler and compass, an angle in three? */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          <line
            x1={V.x}
            y1={V.y}
            x2={V.x + 640}
            y2={V.y}
            stroke={colors.paper}
            strokeWidth={6}
          />
          <line
            x1={V.x}
            y1={V.y}
            x2={V.x + 640 * Math.cos(Math.PI / 3)}
            y2={V.y - 640 * Math.sin(Math.PI / 3)}
            stroke={colors.paper}
            strokeWidth={6}
          />
          <path
            d={`M ${V.x + 400} ${V.y} A 400 400 0 0 0 ${V.x + 400 * Math.cos((Math.PI / 3) * arc)} ${V.y - 400 * Math.sin((Math.PI / 3) * arc)}`}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          {[1, 2].map((j) => {
            const a = (Math.PI / 9) * j;
            return (
              <line
                key={j}
                x1={V.x}
                y1={V.y}
                x2={V.x + 560 * Math.cos(a) * tryLines}
                y2={V.y - 560 * Math.sin(a) * tryLines}
                stroke={colors.orange}
                strokeWidth={4}
                strokeDasharray="14 10"
                opacity={1 - q * 0.5}
              />
            );
          })}
          {/* the compass */}
          <g
            transform={`translate(${V.x} ${V.y}) rotate(${-60 * arc})`}
            opacity={1 - tryLines}
          >
            <line
              x1={0}
              y1={0}
              x2={200}
              y2={-340}
              stroke={colors.muted}
              strokeWidth={8}
            />
            <line
              x1={400}
              y1={0}
              x2={200}
              y2={-340}
              stroke={colors.muted}
              strokeWidth={8}
            />
            <circle cx={200} cy={-340} r={14} fill={colors.highlight} />
          </g>
          <text
            x={V.x + 520}
            y={V.y - 200}
            fill={colors.highlight}
            fontSize={140}
            textAnchor="middle"
            fontWeight={800}
            opacity={q}
          >
            ?
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
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
