import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The vibrating string. The equation and a string pinned at both ends
// (c0). The Green's function G(x, y): tents for several y, the kernel of
// the inverse operator (c1). Its eigenfunctions sin(nπx), n = 1 … 4, with
// bars for the eigenvalues 1/(n²π²) (c2). Inverted, the frequencies nπ
// climb a ladder (c3). The diagonal x(1 − x) with its area 1/6 shaded,
// and the sum Σ 1/n² counting up to π²/6 (c4).

const PX = 200;
const PW = 760;
const X = (x: number) => PX + PW * x;

export const StringScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("string");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c4, 10);
  const part3 = fadeIn(frame, c4 + 4, 10);
  const terms = Math.min(
    20000,
    Math.max(0, Math.floor(((frame - c4 - 20) / 3) ** 2.4)),
  );
  let sum = 0;
  for (let n = 1; n <= terms; n++) sum += 1 / (n * n);

  return (
    <SceneShell id="string">
      <Sfx name="pluck1" at={c0 + 8} volume={0.16} />
      {[0.2, 0.4, 0.6, 0.8].map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 8 + i * 8} volume={0.06} />
      ))}
      {[1, 2, 3, 4].map((n) => (
        <Sfx key={n} name="pluck2" at={c2 + 6 + n * 8} volume={0.08} />
      ))}
      <Sfx name="ding" at={c3 + 30} volume={0.2} />
      <Sfx name="chime" at={c4 + 80} volume={0.28} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={600}
            x2={X(1)}
            y2={600}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 121 },
              (_, i) =>
                `${i ? "L" : "M"} ${X(i / 120)} ${600 - 120 * Math.sin((Math.PI * i) / 120) * Math.cos(frame * 0.2)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeOut(frame, c1, 8)}
          />
          {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
            <path
              key={y}
              d={`M ${X(0)} 600 L ${X(y)} ${600 - 900 * y * (1 - y)} L ${X(1)} 600`}
              fill="none"
              stroke={
                [colors.orange, colors.highlight, colors.green, colors.primary][
                  i
                ]
              }
              strokeWidth={5}
              opacity={fadeIn(frame, c1 + 8 + i * 8, 6)}
            />
          ))}
          <rect
            x={X(0) - 14}
            y={540}
            width={14}
            height={120}
            fill={colors.wood}
          />
          <rect x={X(1)} y={540} width={14} height={120} fill={colors.wood} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1080,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          −u″ = λu · u(0) = u(1) = 0
        </div>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1080,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 10),
            whiteSpace: "nowrap",
          }}
        >
          G(x, y) = min(x, y)(1 − max(x, y))
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {[1, 2, 3, 4].map((n, i) => (
            <g key={n} opacity={fadeIn(frame, c2 + 6 + i * 8, 6)}>
              <line
                x1={X(0)}
                y1={220 + i * 150}
                x2={X(1)}
                y2={220 + i * 150}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={2}
              />
              <path
                d={Array.from(
                  { length: 121 },
                  (_, j) =>
                    `${j ? "L" : "M"} ${X(j / 120)} ${220 + i * 150 - 50 * Math.sin((n * Math.PI * j) / 120) * Math.cos(n * frame * 0.15)}`,
                ).join(" ")}
                fill="none"
                stroke={colors.orange}
                strokeWidth={4}
              />
              <rect
                x={1060}
                y={220 + i * 150 - 18}
                width={600 / (n * n)}
                height={36}
                rx={6}
                fill={colors.green}
              />
              <text
                x={1080 + 600 / (n * n)}
                y={232 + i * 150}
                fill={colors.text}
                fontSize={32}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                1/({n}²π²)
              </text>
            </g>
          ))}
          <g opacity={fadeIn(frame, c3 + 6, 8)}>
            <line
              x1={1620}
              y1={760}
              x2={1620}
              y2={160}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
            />
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <circle
                key={n}
                cx={1620}
                cy={760 - 95 * n}
                r={12}
                fill={colors.highlight}
                opacity={fadeIn(frame, c3 + 6 + n * 6, 4)}
              />
            ))}
            <text
              x={1660}
              y={170}
              fill={colors.highlight}
              fontSize={38}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              nπ
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 820 - 50,
            left: 1460,
            fontSize: 36,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 10),
          }}
        >
          {tx.frequencies}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={700}
            x2={X(1)}
            y2={700}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={`${Array.from({ length: 121 }, (_, i) => `${i ? "L" : "M"} ${X(i / 120)} ${700 - 1600 * (i / 120) * (1 - i / 120)}`).join(" ")} Z`}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={5}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1060,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          Σ 1/(n²π²) = ∫ x(1 − x) dx = 1/6
        </div>
        <div
          style={{
            position: "absolute",
            top: 320,
            left: 1060,
            fontFamily: fonts.mono,
            fontSize: 60,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
          }}
        >
          Σ 1/n² = {sum.toFixed(4)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 430,
            left: 1060,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c4 + 80),
            whiteSpace: "nowrap",
          }}
        >
          = π²/6
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
