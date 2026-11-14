import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { useStrings } from "../i18n";

// The Koopman operator. U f = f ∘ T across the top; a measurement f on
// [0, 1) in lemon and, for the doubling map, f ∘ T in orange: the same
// shape, twice over (c0). Chip: linear (c1). Two bars, ‖f‖ and ‖Uf‖, the
// same height; chip: isometry (c2). The tones e₁ … e₁₂ as two rows of
// slots, arrows from k to 2k (c3); the odd slots of the bottom row ringed,
// never hit (c4). Chip: the right shift again (c5).

const f = (x: number) =>
  0.55 * Math.sin(2 * Math.PI * x) + 0.3 * Math.cos(6 * Math.PI * x + 0.5);
const X = (t: number) => 160 + 1000 * t;
const Y = (v: number) => 470 - 200 * v;
const K = 12;
const SX = (k: number) => 240 + (k - 1) * 120;

export const Koopman: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("koopman");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10);
  let n1 = 0;
  let n2 = 0;
  for (let i = 0; i < 1000; i++) {
    const x = (i + 0.5) / 1000;
    n1 += f(x) ** 2 / 1000;
    n2 += f((2 * x) % 1) ** 2 / 1000;
  }

  return (
    <SceneShell id="koopman">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c0 + 30} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 10} volume={0.12} />
      <Sfx name="ding" at={c2 + 20} volume={0.2} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 10 + i * 6} volume={0.06} />
      ))}
      <Sfx name="thud" at={c4 + 10} volume={0.16} />
      <Sfx name="chime" at={c5 + 20} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c3, 10),
        }}
      >
        U f = f ∘ T
      </div>
      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(f, 0, 1, X, Y, 400)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={path((x) => f((2 * x) % 1), 0, 0.9999, X, Y, 800)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 30, 8)}
          />
          <g opacity={fadeIn(frame, c2 + 6, 8)}>
            {[n1, n2].map((v, i) => (
              <g key={i}>
                <rect
                  x={1360 + i * 180}
                  y={700 - 900 * v}
                  width={110}
                  height={900 * v}
                  rx={10}
                  fill={i ? colors.orange : colors.primary}
                />
                <text
                  x={1415 + i * 180}
                  y={750}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={38}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {i ? "‖Uf‖²" : "‖f‖²"}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <Chip
          frame={frame}
          at={c1 + 10}
          x={760}
          y={110}
          color={colors.green}
          size={42}
        >
          {tx.linear}
        </Chip>
        <Chip
          frame={frame}
          at={c2 + 20}
          x={1360}
          y={240}
          color={colors.green}
          size={42}
        >
          {tx.isometry}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          {[0, 1].map((row) =>
            Array.from({ length: K }, (_, j) => {
              const k = j + 1;
              const odd = row === 1 && k % 2 === 1;
              return (
                <g key={`${row}-${k}`}>
                  <rect
                    x={SX(k) - 46}
                    y={row ? 520 : 220}
                    width={92}
                    height={92}
                    rx={14}
                    fill={alpha(colors.paper, 0.06)}
                    stroke={
                      odd && frame >= c4 + 6
                        ? colors.highlight
                        : alpha(colors.paper, 0.5)
                    }
                    strokeWidth={odd && frame >= c4 + 6 ? 6 : 3}
                  />
                  <text
                    x={SX(k)}
                    y={(row ? 520 : 220) + 60}
                    textAnchor="middle"
                    fill={colors.text}
                    fontSize={36}
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    e
                    <tspan fontSize={26} dy={8}>
                      {k}
                    </tspan>
                  </text>
                </g>
              );
            }),
          )}
          {Array.from({ length: K / 2 }, (_, j) => {
            const k = j + 1;
            return (
              <line
                key={k}
                x1={SX(k)}
                y1={318}
                x2={SX(2 * k)}
                y2={512}
                stroke={colors.primary}
                strokeWidth={5}
                opacity={fadeIn(frame, c3 + 10 + j * 6, 6)}
              />
            );
          })}
        </svg>
        <Chip
          frame={frame}
          at={c4 + 16}
          x={240}
          y={660}
          color={colors.highlight}
          size={40}
        >
          e₁, e₃, e₅, … · {tx.notOnto}
        </Chip>
        <Chip
          frame={frame}
          at={c5 + 16}
          x={1060}
          y={660}
          color={colors.green}
          size={40}
        >
          ≈ S (Ep. 31)
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
