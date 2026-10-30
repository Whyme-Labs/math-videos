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

// Recap: four tiles, one per construction (sum: two lines filling a
// plane; split: an arrow and its two pieces; quotient: lines squeezing to
// dots; maps: a grid of dials). The quotient tile gets the "no choice
// needed" stamp. Teaser for covectors: an orange stack of parallel sheets
// and a lemon arrow growing through it while a counter ticks the sheets.

const Tile: React.FC<{
  readonly x: number;
  readonly s: number;
  readonly children: React.ReactNode;
}> = ({ x, s, children }) => (
  <g opacity={s} transform={`translate(${x} 450) scale(${s})`}>
    <rect
      x={-170}
      y={-170}
      width={340}
      height={340}
      rx={28}
      fill={alpha(colors.bgMid, 0.8)}
      stroke={alpha(colors.paper, 0.3)}
      strokeWidth={4}
    />
    {children}
  </g>
);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const tile = (k: number) =>
    Math.min(1, springIn(frame, c0 + 10 + k * 14, fps, 10));
  const stamp = Math.min(1, springIn(frame, c0 + 80, fps, 10));
  const squeeze = 0.5 + 0.5 * Math.sin(frame * 0.08);
  const grow = glide(frame, c1 + 20, fps, 60);
  const tipX = lerp(1000, 1640, grow);
  const SHEET0 = 1060;
  const GAP = 110;
  const count = Math.max(0, (tipX - SHEET0) / GAP + 0);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="pop" at={c0 + 10 + k * 14} volume={0.14} />
      ))}
      <Sfx name="thud" at={c0 + 80} volume={0.3} />
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx
          key={`t${k}`}
          name="tick"
          at={c1 + 22 + Math.round(k * 11)}
          volume={0.14}
        />
      ))}
      <Sfx name="sparkle" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* sum */}
          <Tile x={330} s={tile(0)}>
            {Array.from({ length: 25 }).map((_, k) => (
              <circle
                key={k}
                cx={-120 + (k % 5) * 60}
                cy={-120 + Math.floor(k / 5) * 60}
                r={7}
                fill={alpha(colors.primary, 0.5)}
              />
            ))}
            <line
              x1={-150}
              y1={30}
              x2={150}
              y2={-30}
              stroke={colors.orange}
              strokeWidth={7}
            />
            <line
              x1={-50}
              y1={150}
              x2={50}
              y2={-150}
              stroke={colors.highlight}
              strokeWidth={7}
            />
          </Tile>
          {/* split */}
          <Tile x={750} s={tile(1)}>
            <line
              x1={-150}
              y1={60}
              x2={150}
              y2={60}
              stroke={colors.orange}
              strokeWidth={6}
            />
            <Arrow
              from={{ x: -100, y: 60 }}
              to={{ x: 40, y: 60 }}
              color={colors.orange}
              width={10}
            />
            <Arrow
              from={{ x: 40, y: 60 }}
              to={{ x: 100, y: -100 }}
              color={colors.highlight}
              width={10}
            />
            <Arrow
              from={{ x: -100, y: 60 }}
              to={{ x: 100, y: -100 }}
              width={10}
            />
          </Tile>
          {/* quotient */}
          <Tile x={1170} s={tile(2)}>
            {[-2, -1, 0, 1, 2].map((h) => (
              <g key={h}>
                <line
                  x1={-130 * squeeze}
                  y1={h * 55}
                  x2={130 * squeeze}
                  y2={h * 55}
                  stroke={h === 0 ? colors.orange : colors.primary}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <circle cy={h * 55} r={10} fill={colors.primary} />
              </g>
            ))}
          </Tile>
          {/* maps */}
          <Tile x={1590} s={tile(3)}>
            {Array.from({ length: 6 }).map((_, k) => {
              const cx = -55 + (k % 2) * 110;
              const cy = -100 + Math.floor(k / 2) * 100;
              const a = frame * 0.04 + k;
              return (
                <g key={k}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={38}
                    fill="none"
                    stroke={colors.orange}
                    strokeWidth={5}
                  />
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + 30 * Math.cos(a)}
                    y2={cy + 30 * Math.sin(a)}
                    stroke={colors.primary}
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </Tile>
          <g
            opacity={stamp}
            transform={`translate(1170 690) rotate(-6) scale(${stamp})`}
          >
            <rect
              x={-170}
              y={-44}
              width={340}
              height={80}
              rx={14}
              fill="none"
              stroke={colors.green}
              strokeWidth={6}
            />
            <text
              y={14}
              fill={colors.green}
              fontSize={40}
              textAnchor="middle"
              fontWeight={900}
            >
              {tx.noChoice}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* teaser: an arrow pierces a stack of sheets */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 6 }).map((_, k) => {
            const x = SHEET0 + k * GAP;
            return (
              <line
                key={k}
                x1={x - 90}
                y1={220}
                x2={x + 90}
                y2={720}
                stroke={colors.orange}
                strokeWidth={8}
                strokeLinecap="round"
                opacity={0.85}
              />
            );
          })}
          <Arrow
            from={{ x: 1000, y: 470 }}
            to={{ x: tipX, y: 470 }}
            width={14}
          />
          <text
            x={tipX}
            y={410}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.mono}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 24, 6)}
          >
            {Math.floor(count)}
          </text>
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
