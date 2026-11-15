import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The Hamming(7,4) code. Seven lamps, the codeword 0110011, data bits in
// lemon and parity bits in orange, in a row (c0). They fly into three
// circles, the parity checks φ₁, φ₂, φ₄ (c1). The code is the kernel,
// dimension 7 − 3 = 4 (c2). Bit 6 flips; circles 2 and 4 turn red (c3).
// Their labels add up to 6, which points at the lamp (c4); it flips back
// and every circle turns green: 𝔽₂ is a field (c5).

const CODE = [0, 1, 1, 0, 0, 1, 1]; // c₁ … c₇
const SPOT: Record<number, [number, number]> = {
  1: [760, 330],
  2: [1160, 330],
  3: [960, 290],
  4: [960, 690],
  5: [850, 530],
  6: [1070, 530],
  7: [960, 450],
};
const CIRCLES = [
  { k: 1, x: 840, y: 380, lx: 620, ly: 210, bits: [1, 3, 5, 7] },
  { k: 2, x: 1080, y: 380, lx: 1250, ly: 210, bits: [2, 3, 6, 7] },
  { k: 4, x: 960, y: 590, lx: 1170, ly: 790, bits: [4, 5, 6, 7] },
];

export const Hamming: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("hamming");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const fly = progress(frame, c1 + 4, 30);
  const flipped = frame >= c3 + 10 && frame < c4 + 50;
  const fixed = frame >= c4 + 50;
  const bit = (j: number) => (j === 6 && flipped ? 1 - CODE[5] : CODE[j - 1]);
  const fails = (bits: number[]) =>
    bits.reduce((s, j) => s + bit(j), 0) % 2 === 1;

  return (
    <SceneShell id="hamming">
      {CODE.map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 8 + i * 5} volume={0.05} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.1} />
      <Sfx name="pop" at={c2 + 10} volume={0.12} />
      <Sfx name="scratch" at={c3 + 10} volume={0.14} />
      <Sfx name="ding" at={c4 + 20} volume={0.18} />
      <Sfx name="pluck3" at={c4 + 50} volume={0.12} />
      <Sfx name="chime" at={c5 + 20} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {CIRCLES.map((c, i) => {
          const bad = fails(c.bits);
          const col = bad
            ? colors.red
            : frame > c5
              ? colors.green
              : colors.orange;
          return (
            <g key={c.k} opacity={fadeIn(frame, c1 + 20 + i * 8, 10)}>
              <circle
                cx={c.x}
                cy={c.y}
                r={180}
                fill={alpha(col, bad ? 0.12 : 0.04)}
                stroke={col}
                strokeWidth={bad ? 6 : 4}
              />
              <text
                x={c.lx}
                y={c.ly}
                textAnchor="middle"
                fill={col}
                fontSize={46}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                φ{["₁", "₂", "₄"][i]}
              </text>
            </g>
          );
        })}
        {CODE.map((_, i) => {
          const j = i + 1;
          const rowX = 520 + i * 140;
          const rowY = 300;
          const [vx, vy] = SPOT[j];
          const x = rowX + (vx - rowX) * fly;
          const y = rowY + (vy - rowY) * fly;
          const on = bit(j) === 1;
          const isData = [3, 5, 6, 7].includes(j);
          const ring =
            j === 6 && flipped
              ? colors.red
              : j === 6 && fixed && frame < c5 + 40
                ? colors.green
                : isData
                  ? colors.primary
                  : colors.orange;
          return (
            <g key={j} opacity={fadeIn(frame, c0 + 8 + i * 5, 8)}>
              <circle
                cx={x}
                cy={y}
                r={36}
                fill={on ? ring : alpha(colors.bg, 0.9)}
                stroke={ring}
                strokeWidth={5}
              />
              <text
                x={x}
                y={y + 13}
                textAnchor="middle"
                fill={on ? colors.bg : colors.text}
                fontSize={36}
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {bit(j)}
              </text>
              <text
                x={x}
                y={y - 48}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={26}
                fontFamily={fonts.mono}
                fontWeight={700}
                opacity={1 - 0.5 * fly}
              >
                {j}
              </text>
            </g>
          );
        })}
        <g opacity={fadeIn(frame, c4 + 6, 10) * fadeOut(frame, c5, 10)}>
          <text
            x={1560}
            y={470}
            textAnchor="middle"
            fill={colors.red}
            fontSize={64}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            4 + 2 = 6
          </text>
          <text
            x={1560}
            y={540}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            110₂
          </text>
          <path
            d={`M 1400 500 Q 1250 560 ${SPOT[6][0] + 50} ${SPOT[6][1]}`}
            fill="none"
            stroke={colors.red}
            strokeWidth={5}
            strokeDasharray="12 8"
            opacity={fadeIn(frame, c4 + 20, 10)}
          />
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c1, 10) }}>
        <Chip frame={frame} at={c0 + 50} x={520} y={420} size={38}>
          {tx.data}: 3 5 6 7
        </Chip>
        <Chip
          frame={frame}
          at={c0 + 60}
          x={1000}
          y={420}
          size={38}
          color={colors.orange}
        >
          {tx.parity}: 1 2 4
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip frame={frame} at={c2 + 8} x={100} y={420} size={42} math>
          {tx.codeKer}
        </Chip>
        <Chip
          frame={frame}
          at={c2 + 30}
          x={100}
          y={520}
          size={42}
          math
          color={colors.green}
        >
          {tx.dimCode}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c5, 10) }}>
        <Chip
          frame={frame}
          at={c4 + 30}
          x={1380}
          y={600}
          size={36}
          color={colors.red}
        >
          {tx.address}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c5 + 10}
        x={1400}
        y={420}
        size={46}
        math
        color={colors.green}
      >
        {tx.isField}
      </Chip>
    </SceneShell>
  );
};
