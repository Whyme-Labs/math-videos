import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Mat, Young } from "../components/draw";
import { useStrings } from "../i18n";

// The structure theorem, read over F[x]. The piece F[x]/(x − 2)³ as a
// chain 1 → x − 2 → (x − 2)² → 0, each step multiplying by x − 2 (c0).
// Multiplying by x is the Jordan block, 2 on the diagonal and 1 above it
// (c1). The three partitions of 3 as Young diagrams (c2), each over its
// matrix: 2I, a 2-block and a 1-block, one 3-block (c3). Under them, the
// group twins with p in place of x − 2 (c4).

const PARTS = [[1, 1, 1], [2, 1], [3]];
const MATS = [
  [
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2],
  ],
  [
    [2, 1, 0],
    [0, 2, 0],
    [0, 0, 2],
  ],
  [
    [2, 1, 0],
    [0, 2, 1],
    [0, 0, 2],
  ],
];
const TWINS = ["ℤ/p ⊕ ℤ/p ⊕ ℤ/p", "ℤ/p² ⊕ ℤ/p", "ℤ/p³"];
const XS = [420, 960, 1500];
const BOX = ["(x − 2)²", "x − 2", "1"];

const tint = (i: number, j: number) =>
  i === j
    ? colors.green
    : j === i + 1
      ? colors.orange
      : alpha(colors.paper, 0.4);

export const Jordan: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("jordan");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);

  return (
    <SceneShell id="jordan">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c0 + 20 + i * 18} volume={0.1} />
      ))}
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="tick" at={c2 + 8 + i * 10} volume={0.08} />
      ))}
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck4" at={c3 + 8 + i * 12} volume={0.1} />
      ))}
      <Sfx name="chime" at={c4 + 20} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={partA}>
          <text
            x={960}
            y={170}
            textAnchor="middle"
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            F[x] / (x − 2)³
          </text>
          {BOX.map((b, i) => {
            const x = 520 + i * 380;
            return (
              <g key={b} opacity={fadeIn(frame, c0 + 20 + (2 - i) * 18, 8)}>
                <rect
                  x={x - 130}
                  y={230}
                  width={260}
                  height={100}
                  rx={18}
                  fill={alpha(colors.primary, 0.12)}
                  stroke={colors.primary}
                  strokeWidth={4}
                />
                <text
                  x={x}
                  y={296}
                  textAnchor="middle"
                  fill={colors.primary}
                  fontSize={44}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {b}
                </text>
                <text
                  x={x}
                  y={380}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={34}
                  fontFamily={fonts.math}
                  fontStyle="italic"
                >
                  v{["₁", "₂", "₃"][i]}
                </text>
              </g>
            );
          })}
          {[0, 1, 2].map((i) => {
            const x0 = 520 + (2 - i) * 380 - 140;
            const x1 = x0 - 100;
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 30 + i * 18, 8)}>
                <path
                  d={`M ${x0} 280 L ${x1 + 14} 280 M ${x1 + 30} 266 L ${x1 + 12} 280 L ${x1 + 30} 294`}
                  stroke={colors.orange}
                  strokeWidth={5}
                  fill="none"
                />
                <text
                  x={(x0 + x1) / 2}
                  y={258}
                  textAnchor="middle"
                  fill={colors.orange}
                  fontSize={26}
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  x − 2
                </text>
              </g>
            );
          })}
          <text
            x={250}
            y={296}
            textAnchor="middle"
            fill={colors.red}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 70, 8)}
          >
            0
          </text>
          <g opacity={fadeIn(frame, c1 + 6, 10)}>
            <Mat
              x={780}
              y={450}
              rows={MATS[2]}
              cw={120}
              rh={90}
              size={56}
              cell={tint}
            />
          </g>
        </g>
        {PARTS.map((p, k) => (
          <g key={k} opacity={fadeIn(frame, c2 + 8 + k * 10, 8)}>
            <Young x={XS[k] - (p[0] * 40) / 2} y={140} parts={p} s={40} />
            <g opacity={fadeIn(frame, c3 + 8 + k * 12, 8)}>
              <Mat
                x={XS[k] - 165}
                y={340}
                rows={MATS[k]}
                cw={110}
                rh={80}
                size={46}
                cell={tint}
              />
            </g>
            <text
              x={XS[k]}
              y={720}
              textAnchor="middle"
              fill={colors.highlight}
              fontSize={44}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, c4 + 10 + k * 8, 8)}
            >
              {TWINS[k]}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={1260}
          y={520}
          size={40}
          color={colors.green}
        >
          {tx.jordanBlock}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 50}
          x={110}
          y={130}
          size={40}
          color={colors.primary}
        >
          {tx.three}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c4 + 4}
        x={110}
        y={130}
        size={40}
        math
        color={colors.highlight}
      >
        x − 2 ↔ p
      </Chip>
    </SceneShell>
  );
};
