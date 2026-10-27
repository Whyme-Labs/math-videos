import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock, Tile } from "../../s1e16/components/props";
import { IDial } from "../components/dial";
import { useStrings } from "../i18n";

// The three toys step together, tied by threads (isomorphic), and the
// kernel's multiples of 4 drop into the clock's 0 (what the map forgets).
// Then the teaser for E18: the multiplication table of the six-hour clock
// fills in row by row, and the cell 2 × 3 lights up: 0.

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const beat = Math.max(0, Math.min(4, (frame - c0 - 10) / 18));
  const part1 = fadeOut(frame, c1, 10);
  const rowAt = (r: number) => c1 + 10 + r * 6;
  const hit = Math.min(1, springIn(frame, c1 + 60, fps, 9));
  const CELL = 74;
  const T = { x: 1100, y: 240 };

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="clink" at={c0 + 10 + k * 18} volume={0.14} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((r) => (
        <Sfx key={`r${r}`} name="tick" at={rowAt(r)} volume={0.1} />
      ))}
      <Sfx name="thud" at={c1 + 60} volume={0.35} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1].map((j) => (
            <path
              key={j}
              d={`M ${560 + j * 480} 470 Q ${800 + j * 480} ${440 + 30 * Math.sin(frame / 10 + j)} ${880 + j * 480} 470`}
              fill="none"
              stroke={colors.primary}
              strokeWidth={5}
            />
          ))}
          <Tile x={440} y={470} size={240} rot={90 * beat} labels={false} />
          <Clock x={960} y={470} r={140} n={4} pos={beat} />
          <IDial x={1480} y={470} r={120} pos={beat} />
        </svg>
      </AbsoluteFill>

      {/* the teaser: the six-hour clock's multiplication table */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => {
              const v = (r * c) % 6;
              const star = r === 2 && c === 3;
              return (
                <g key={`${r}${c}`} opacity={fadeIn(frame, rowAt(r), 6)}>
                  <rect
                    x={T.x + c * CELL}
                    y={T.y + r * CELL}
                    width={CELL - 6}
                    height={CELL - 6}
                    rx={10}
                    fill={
                      star
                        ? alpha(colors.highlight, 0.4 + 0.6 * hit)
                        : v === 0
                          ? alpha(colors.red, 0.25)
                          : alpha(colors.paper, 0.15)
                    }
                    stroke={star ? colors.highlight : alpha(colors.muted, 0.5)}
                    strokeWidth={star ? 5 : 2}
                  />
                  <text
                    x={T.x + c * CELL + (CELL - 6) / 2}
                    y={T.y + r * CELL + 48}
                    fill={colors.text}
                    fontSize={34}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={star ? 900 : 600}
                  >
                    {v}
                  </text>
                </g>
              );
            }),
          )}
          {Array.from({ length: 6 }).map((_, k) => (
            <g key={`h${k}`} opacity={fadeIn(frame, c1 + 8)}>
              <text
                x={T.x + k * CELL + 34}
                y={T.y - 16}
                fill={colors.primary}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {k}
              </text>
              <text
                x={T.x - 26}
                y={T.y + k * CELL + 48}
                fill={colors.primary}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {k}
              </text>
            </g>
          ))}
          <text
            x={T.x + 3 * CELL}
            y={T.y + 6 * CELL + 80}
            fill={colors.highlight}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={hit}
          >
            2 × 3 = 0
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
