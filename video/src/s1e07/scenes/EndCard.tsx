import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Gap, RationalDots, toX, type Window } from "../components/line";
import { useStrings } from "../i18n";

// The rational line with its gaps; then the teaser for E08: a knife that
// cuts the line at √2 (Dedekind) and a swarm of points closing in on it
// (Cantor).

const W: Window = { lo: 1, hi: 2, x0: 260, x1: 1660, y: 300 };
const GAPS = [
  Math.cbrt(2),
  Math.SQRT2,
  Math.PI / 2,
  (1 + Math.sqrt(5)) / 2,
  Math.sqrt(3),
];
const KNIFE = { x: 640, y: 420 };
const SWARM = { x: 1280, y: 420 };

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const lineOut = fadeOut(frame, c1, 12);
  const cut = ramp(frame, c1 + 10, 14);
  const swarm = ramp(frame, c1 + 10, 50);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="tick" at={c0 + 6} volume={0.2} />
      {GAPS.map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 20 + i * 8} volume={0.16} />
      ))}
      <Sfx name="scratch" at={c1 + 10} />
      <Sfx name="chime" at={c1 + 40} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c0 + 4) * lineOut}>
            <RationalDots w={W} target={180} r={4} />
            {GAPS.map((v, i) => (
              <Gap
                key={i}
                x={toX(W, v)}
                y={W.y}
                s={springIn(frame, c0 + 20 + i * 8, fps, 10)}
                r={12}
              />
            ))}
          </g>
          {/* Dedekind: cut the line at √2 */}
          <g opacity={fadeIn(frame, c1 + 4)}>
            <line
              x1={KNIFE.x - 220}
              y1={KNIFE.y}
              x2={KNIFE.x}
              y2={KNIFE.y}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <line
              x1={KNIFE.x}
              y1={KNIFE.y}
              x2={KNIFE.x + 220}
              y2={KNIFE.y}
              stroke={colors.orange}
              strokeWidth={6}
            />
            <line
              x1={KNIFE.x}
              y1={KNIFE.y - 110}
              x2={KNIFE.x}
              y2={lerp(KNIFE.y - 110, KNIFE.y + 60, cut)}
              stroke={colors.highlight}
              strokeWidth={6}
              strokeLinecap="round"
            />
            <polygon
              points={`${KNIFE.x - 18},${KNIFE.y - 170} ${KNIFE.x + 18},${KNIFE.y - 170} ${KNIFE.x},${KNIFE.y - 110}`}
              fill={colors.highlight}
            />
          </g>
          {/* Cantor: points closing in */}
          <g opacity={fadeIn(frame, c1 + 4)}>
            <line
              x1={SWARM.x - 220}
              y1={SWARM.y}
              x2={SWARM.x + 220}
              y2={SWARM.y}
              stroke={colors.muted}
              strokeWidth={4}
            />
            {Array.from({ length: 10 }).map((_, k) => {
              const side = k % 2 === 0 ? -1 : 1;
              const d0 = 200 / (1 + Math.floor(k / 2));
              const d = d0 * (1 - 0.85 * swarm);
              return (
                <circle
                  key={k}
                  cx={SWARM.x + side * d}
                  cy={SWARM.y}
                  r={9}
                  fill={colors.primary}
                />
              );
            })}
            <Gap
              x={SWARM.x}
              y={SWARM.y}
              s={springIn(frame, c1 + 40, fps, 10)}
              r={14}
            />
          </g>
          <text
            x={960}
            y={KNIFE.y + 10}
            fill={colors.highlight}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c1 + 40)}
          >
            √2 = ?
          </text>
        </svg>

        <AbsoluteFill style={{ top: 580, alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontSize: 40,
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
