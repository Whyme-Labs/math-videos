import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The FFT for n = 8. Eight samples in a column sort themselves, evens
// above and odds below (c0). Two boxes "DFT 4", glued to the outputs by a
// butterfly of crossing lines (c1). Each box opens into its own smaller
// butterflies: three layers in all (c2). Two bars on a log scale, n² and
// n log₂ n for n = 2²⁰ (c3).

const N = 8;
const Y = (r: number) => 190 + r * 76;
const XS = [260, 520, 760, 1000, 1240];
// bit-reversed order of 0..7 (evens first, then by halves)
const BITREV = [0, 4, 2, 6, 1, 5, 3, 7];

export const Fft: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("fft");
  const [c0, c1, c2, c3] = cues;
  const sort = progress(frame, c0 + 20, 40);
  const boxes = fadeIn(frame, c1 + 4, 10) * (1 - progress(frame, c2 + 10, 20));
  const diagram = fadeOut(frame, c3, 12);

  // a stage of butterflies between columns x0 and x1, pairing rows r and r + d
  const stage = (
    x0: number,
    x1: number,
    d: number,
    on: number,
    col: string,
  ) => (
    <g opacity={on}>
      {Array.from({ length: N }, (_, r) => {
        const partner =
          Math.floor(r / (2 * d)) * 2 * d + (((r % (2 * d)) + d) % (2 * d));
        return (
          <g key={r}>
            <line
              x1={x0}
              y1={Y(r)}
              x2={x1}
              y2={Y(r)}
              stroke={alpha(col, 0.8)}
              strokeWidth={3}
            />
            <line
              x1={x0}
              y1={Y(partner)}
              x2={x1}
              y2={Y(r)}
              stroke={alpha(col, 0.8)}
              strokeWidth={3}
            />
          </g>
        );
      })}
    </g>
  );

  return (
    <SceneShell id="fft">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="pop" at={c1 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 40} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c2 + 20 + i * 20} volume={0.1} />
      ))}
      <Sfx name="riser" at={c3 + 20} volume={0.1} />
      <Sfx name="chime" at={c3 + 70} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={diagram}>
          {Array.from({ length: N }, (_, i) => {
            const target = BITREV.indexOf(i);
            const y = Y(i) + (Y(target) - Y(i)) * sort;
            const even = i % 2 === 0;
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 4 + i * 3, 6)}>
                <circle
                  cx={XS[0]}
                  cy={y}
                  r={20}
                  fill={even ? colors.primary : colors.highlight}
                />
                <text
                  x={XS[0] - 50}
                  y={y + 12}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={32}
                  fontFamily={fonts.mono}
                >
                  {i}
                </text>
              </g>
            );
          })}
          <text
            x={XS[0] - 100}
            y={Y(1.5) + 12}
            textAnchor="end"
            fill={colors.primary}
            fontSize={34}
            fontWeight={800}
            fontFamily={fonts.body}
            opacity={sort}
          >
            {tx.even}
          </text>
          <text
            x={XS[0] - 100}
            y={Y(5.5) + 12}
            textAnchor="end"
            fill={colors.highlight}
            fontSize={34}
            fontWeight={800}
            fontFamily={fonts.body}
            opacity={sort}
          >
            {tx.odd}
          </text>
          {/* c1: two half-size DFTs and the last butterfly layer */}
          <g opacity={boxes}>
            {[0, 1].map((h) => (
              <g key={h}>
                <rect
                  x={XS[1] - 40}
                  y={Y(h * 4) - 40}
                  width={XS[3] - XS[1] + 80}
                  height={Y(3) - Y(0) + 80}
                  rx={18}
                  fill={alpha(h ? colors.highlight : colors.primary, 0.12)}
                  stroke={h ? colors.highlight : colors.primary}
                  strokeWidth={4}
                />
                <text
                  x={(XS[1] + XS[3]) / 2}
                  y={Y(h * 4 + 1.5) + 16}
                  textAnchor="middle"
                  fill={h ? colors.highlight : colors.primary}
                  fontSize={52}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  DFT₄
                </text>
              </g>
            ))}
          </g>
          <g opacity={fadeIn(frame, c1 + 10, 10)}>
            {Array.from({ length: N }, (_, r) => (
              <line
                key={r}
                x1={XS[0] + 24}
                y1={Y(r)}
                x2={XS[1]}
                y2={Y(r)}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={3}
              />
            ))}
          </g>
          {stage(XS[1], XS[2], 1, fadeIn(frame, c2 + 20, 10), colors.primary)}
          {stage(XS[2], XS[3], 2, fadeIn(frame, c2 + 40, 10), colors.highlight)}
          {stage(XS[3], XS[4], 4, fadeIn(frame, c1 + 40, 10), colors.green)}
          {Array.from({ length: N }, (_, r) => (
            <g key={r} opacity={fadeIn(frame, c1 + 50, 10)}>
              <circle cx={XS[4] + 20} cy={Y(r)} r={16} fill={colors.green} />
              <text
                x={XS[4] + 60}
                y={Y(r) + 12}
                fill={colors.green}
                fontSize={32}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                f̂({r})
              </text>
            </g>
          ))}
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 10)}>
          {[
            ["n²", 12.04, colors.red, "≈ 10¹²"],
            ["n log₂ n", 7.32, colors.green, "≈ 2 × 10⁷"],
          ].map(([label, v, col, val], i) => {
            const w =
              (v as number) * 74 * progress(frame, c3 + 20 + i * 20, 40);
            return (
              <g key={i}>
                <text
                  x={560}
                  y={380 + i * 200}
                  textAnchor="end"
                  fill={col as string}
                  fontSize={52}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {label}
                </text>
                <rect
                  x={600}
                  y={330 + i * 200}
                  width={w}
                  height={70}
                  rx={12}
                  fill={col as string}
                />
                <text
                  x={620 + w}
                  y={382 + i * 200}
                  fill={col as string}
                  fontSize={48}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {val}
                </text>
              </g>
            );
          })}
          <text
            x={600}
            y={760}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.mono}
          >
            log₁₀ scale · n = 2²⁰
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 70}
          x={1500}
          y={130}
          size={40}
          math
          color={colors.primary}
        >
          3 = log₂ 8
        </Chip>
      </div>
    </SceneShell>
  );
};
