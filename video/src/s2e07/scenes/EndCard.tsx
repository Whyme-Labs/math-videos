import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: one curve, and its three kinds of probe (a value pin, a slope
// gauge, the shaded area) light up in turn; then the slope gauge and the
// area each send a thread to the three value pins: each measurement is a
// mix of the others. Teaser for the transpose: a 2 × 3 grid of numbers
// whose cells fly across the diagonal into a 3 × 2 grid.

const plot = (x: number, y: number) => ({ x: 360 + x * 560, y: 640 - y * 260 });
const f = (x: number) => 0.4 + 1.3 * x - 0.6 * x * x;
const GRID = [
  [1, 2, 0],
  [3, -1, 4],
];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const on = (k: number) =>
    Math.min(1, springIn(frame, c0 + 10 + k * 16, fps, 10));
  const threads = fadeIn(frame, c0 + 70, 12);
  const flip = glide(frame, c1 + 30, fps, 40);
  const pins = [0, 0.75, 1.5];

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="clink" at={c0 + 10 + k * 16} volume={0.16} />
      ))}
      <Sfx name="ding" at={c0 + 74} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 80} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <path
            d={`${curve(f, 0, 1.5, plot)} L ${plot(1.5, 0).x} ${plot(0, 0).y} L ${plot(0, 0).x} ${plot(0, 0).y} Z`}
            fill={alpha(colors.orange, 0.25 * on(2))}
          />
          <line
            x1={plot(-0.05, 0).x}
            y1={plot(0, 0).y}
            x2={plot(1.6, 0).x}
            y2={plot(0, 0).y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          <path
            d={curve(f, 0, 1.5, plot)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={8}
          />
          {/* value pins */}
          {pins.map((x) => (
            <g key={x} opacity={on(0)}>
              <line
                x1={plot(x, 0).x}
                y1={plot(x, f(x)).y - 110}
                x2={plot(x, 0).x}
                y2={plot(x, f(x)).y}
                stroke={colors.orange}
                strokeWidth={6}
              />
              <circle
                cx={plot(x, 0).x}
                cy={plot(x, f(x)).y}
                r={15}
                fill={colors.orange}
              />
            </g>
          ))}
          {/* slope gauge */}
          <g opacity={on(1)}>
            <line
              x1={plot(0.95, f(1.25) - 0.3 * (1.3 - 1.5)).x}
              y1={plot(0.95, f(1.25) - 0.3 * (1.3 - 1.5)).y}
              x2={plot(1.55, f(1.25) + 0.3 * (1.3 - 1.5)).x}
              y2={plot(1.55, f(1.25) + 0.3 * (1.3 - 1.5)).y}
              stroke={colors.highlight}
              strokeWidth={8}
              strokeLinecap="round"
            />
          </g>
          {/* threads: slope and area as mixes of the pins */}
          <g opacity={threads}>
            {pins.map((x) => (
              <g key={x}>
                <path
                  d={`M 1500 300 Q ${(1500 + plot(x, 0).x) / 2} 160 ${plot(x, 0).x} ${plot(x, f(x)).y - 110}`}
                  fill="none"
                  stroke={alpha(colors.highlight, 0.7)}
                  strokeWidth={4}
                />
                <path
                  d={`M 1500 520 Q ${(1500 + plot(x, 0).x) / 2} 760 ${plot(x, 0).x} ${plot(0, 0).y}`}
                  fill="none"
                  stroke={alpha(colors.orange, 0.7)}
                  strokeWidth={4}
                />
              </g>
            ))}
          </g>
          {[
            { y: 300, t: tx.slope, c: colors.highlight, k: 1 },
            { y: 520, t: tx.area, c: colors.orange, k: 2 },
          ].map((b) => (
            <g key={b.t} opacity={on(b.k)} transform={`translate(1600 ${b.y})`}>
              <rect
                x={-120}
                y={-44}
                width={300}
                height={88}
                rx={18}
                fill={alpha(colors.bg, 0.9)}
                stroke={b.c}
                strokeWidth={5}
              />
              <text
                x={30}
                y={14}
                fill={b.c}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
              >
                {b.t}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      {/* teaser: a grid flipping across its diagonal */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1180 - 60}
            y1={300 - 60}
            x2={1180 + 330}
            y2={300 + 330}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
            strokeDasharray="12 10"
          />
          {GRID.map((row, i) =>
            row.map((v, j) => {
              const x = 1180 + lerp(j, i, flip) * 130;
              const y = 300 + lerp(i, j, flip) * 130;
              return (
                <g key={`${i}${j}`}>
                  <rect
                    x={x - 50}
                    y={y - 50}
                    width={100}
                    height={100}
                    rx={14}
                    fill={alpha(colors.primary, 0.18)}
                    stroke={colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={x}
                    y={y + 20}
                    fill={colors.text}
                    fontSize={56}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    {v < 0 ? `−${-v}` : v}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 900,
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
