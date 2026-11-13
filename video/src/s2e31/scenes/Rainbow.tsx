import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  fadeIn,
  fadeOut,
  progress,
  riseIn,
} from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. Shen Kuo's Dream Pool Essays (book 21) records Sun
// Yanxian: "the rainbow is the sun's image in the rain". The book (c0).
// The quote, with the sun on the left, rain on the right and a rainbow
// arc growing in the rain (c1). The arc unrolls into a straight band of
// colour, one continuous strip (c2). Beside it, four thin lines of a
// discrete spectrum for contrast; chips: continuous, discrete (c3).

const HUES = [
  "#e8453c",
  "#f39b2b",
  "#f5d63d",
  "#5cc96b",
  "#3fa7e0",
  "#5560d8",
  "#8e4fc9",
];
const spectral = (t: number) => `hsl(${Math.round(270 * (1 - t))} 85% 58%)`;

export const Rainbow: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("rainbow");
  const [c0, c1, c2, c3] = cues;
  const sky = fadeIn(frame, c1 + 2, 10) * fadeOut(frame, c2 + 20, 12);
  const arc = progress(frame, c1 + 20, 40);
  const unroll = progress(frame, c2 + 20, 30);
  const drops = 60;

  return (
    <SceneShell id="rainbow">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      <Sfx name="riser" at={c1 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pluck4" at={c3 + 8 + i * 6} volume={0.07} />
      ))}
      <Sfx name="chime" at={c3 + 50} volume={0.26} />

      <AbsoluteFill style={{ opacity: sky }}>
        <svg width={1920} height={1080}>
          <circle cx={330} cy={430} r={70} fill={colors.highlight} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={330 + 90 * Math.cos(a)}
                y1={430 + 90 * Math.sin(a)}
                x2={330 + 120 * Math.cos(a)}
                y2={430 + 120 * Math.sin(a)}
                stroke={colors.highlight}
                strokeWidth={6}
                strokeLinecap="round"
              />
            );
          })}
          {Array.from({ length: drops }, (_, i) => {
            const x = 760 + 1000 * rnd(i + 1);
            const y = 300 + ((rnd(i + 50) * 480 + frame * 9) % 480);
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x - 6}
                y2={y + 26}
                stroke={alpha(colors.paper, 0.45)}
                strokeWidth={3}
              />
            );
          })}
          {HUES.map((h, i) => {
            const R = 420 - i * 16;
            const end = Math.PI * arc;
            const pts = Array.from({ length: 61 }, (_, j) => {
              const a = Math.PI - (end * j) / 60;
              return `${j ? "L" : "M"} ${1260 + R * Math.cos(a)} ${800 - R * Math.sin(a)}`;
            }).join(" ");
            return (
              <path
                key={h}
                d={pts}
                fill="none"
                stroke={h}
                strokeWidth={16}
                opacity={0.85}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 24, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <linearGradient id="rb-band">
              {Array.from({ length: 11 }, (_, i) => (
                <stop key={i} offset={i / 10} stopColor={spectral(i / 10)} />
              ))}
            </linearGradient>
          </defs>
          <rect
            x={260}
            y={430}
            width={1400 * unroll}
            height={90}
            rx={14}
            fill="url(#rb-band)"
          />
          <rect
            x={260}
            y={640}
            width={1400}
            height={90}
            rx={14}
            fill={alpha(colors.ink, 0.8)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
            opacity={fadeIn(frame, c3 + 4, 8)}
          />
          {[656, 486, 434, 410].map((nm, i) => (
            <rect
              key={nm}
              x={260 + 1400 * ((nm - 380) / 320) - 4}
              y={640}
              width={8}
              height={90}
              fill={spectral((nm - 380) / 320)}
              opacity={fadeIn(frame, c3 + 8 + i * 6, 4)}
            />
          ))}
        </svg>
        <Chip
          frame={frame}
          at={c2 + 60}
          x={1300}
          y={340}
          color={colors.green}
          size={40}
        >
          {tx.rbContinuous}
        </Chip>
        <Chip
          frame={frame}
          at={c3 + 34}
          x={1300}
          y={750}
          color={colors.orange}
          size={40}
        >
          {tx.rbDiscrete}
        </Chip>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.rbTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 200,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
        }}
      >
        {tx.rbQuote}
      </div>
    </SceneShell>
  );
};
