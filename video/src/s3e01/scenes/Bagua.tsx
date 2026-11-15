import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《周易·系辞上》: two, four, eight. The book and
// the line (c0). Rows of one, two and three yao: 2, 4, 8 (c1). The eight
// trigrams, each with its coordinates over 𝔽₂, yang = 1, yin = 0 (c2). Two
// trigrams stacked into one hexagram; 64 = 8² (c3).

const Yao: React.FC<{ x: number; y: number; on: number; w?: number }> = ({
  x,
  y,
  on,
  w = 110,
}) =>
  on ? (
    <rect x={x} y={y} width={w} height={16} rx={4} fill={colors.primary} />
  ) : (
    <g>
      <rect
        x={x}
        y={y}
        width={w * 0.42}
        height={16}
        rx={4}
        fill={colors.orange}
      />
      <rect
        x={x + w * 0.58}
        y={y}
        width={w * 0.42}
        height={16}
        rx={4}
        fill={colors.orange}
      />
    </g>
  );

const Gua: React.FC<{ x: number; y: number; bits: number[]; w?: number }> = ({
  x,
  y,
  bits,
  w,
}) => (
  <g>
    {bits.map((b, i) => (
      // bottom line first, as the yao are read
      <Yao key={i} x={x} y={y + (bits.length - 1 - i) * 30} on={b} w={w} />
    ))}
  </g>
);

const bitsOf = (k: number, n: number) =>
  Array.from({ length: n }, (_, i) => (k >> i) & 1);

export const Bagua: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("bagua");
  const [c0, c1, c2, c3] = cues;
  const stages = fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c2, 10);
  const eight = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const hex = fadeIn(frame, c3 + 4, 10);

  return (
    <SceneShell id="bagua">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck3" at={c1 + 10 + i * 30} volume={0.1} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 8 + i * 6} volume={0.05} />
      ))}
      <Sfx name="chime" at={c3 + 30} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={stages}>
          {[1, 2, 3].map((n, s) => (
            <g key={n} opacity={fadeIn(frame, c1 + 10 + s * 30, 8)}>
              {Array.from({ length: 2 ** n }, (_, k) => (
                <Gua
                  key={k}
                  x={200 + k * 150}
                  y={330 + s * 160 - (n - 1) * 30}
                  bits={bitsOf(k, n)}
                />
              ))}
              <text
                x={1460}
                y={350 + s * 160}
                fill={colors.text}
                fontSize={40}
                fontWeight={800}
                fontFamily={fonts.body}
              >
                {tx.bgStages[s]}
              </text>
            </g>
          ))}
        </g>
        <g opacity={eight}>
          {Array.from({ length: 8 }, (_, k) => {
            const a = Math.PI / 2 - (2 * Math.PI * k) / 8;
            const cx = 960 + 300 * Math.cos(a);
            const cy = 500 - 260 * Math.sin(a);
            const bits = bitsOf(k, 3);
            return (
              <g key={k} opacity={fadeIn(frame, c2 + 8 + k * 6, 6)}>
                <Gua x={cx - 55} y={cy - 40} bits={bits} />
                <text
                  x={cx + 75}
                  y={cy + 12}
                  fill={colors.highlight}
                  fontSize={30}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  ({bits[2]},{bits[1]},{bits[0]})
                </text>
              </g>
            );
          })}
          <text
            x={960}
            y={515}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            𝔽₂³
          </text>
        </g>
        <g opacity={hex}>
          <Gua x={860} y={260} bits={[1, 0, 1]} w={200} />
          <Gua x={860} y={380} bits={[0, 1, 1]} w={200} />
          <rect
            x={840}
            y={240}
            width={240}
            height={110}
            rx={10}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <rect
            x={840}
            y={360}
            width={240}
            height={110}
            rx={10}
            fill="none"
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <text
            x={1120}
            y={315}
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            8
          </text>
          <text
            x={1120}
            y={435}
            fill={colors.green}
            fontSize={36}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            8
          </text>
          <text
            x={960}
            y={600}
            textAnchor="middle"
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            64 = 8² = 2⁶
          </text>
          <text
            x={960}
            y={680}
            textAnchor="middle"
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            [𝔽₆₄ : 𝔽₂] = 2 × 3
          </text>
        </g>
      </svg>
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
        {tx.bgTitle}
        <span style={{ color: colors.text, marginLeft: 30 }}>{tx.bgQuote}</span>
      </div>
    </SceneShell>
  );
};
