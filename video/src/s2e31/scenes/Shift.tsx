import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The right shift on ℓ². A row of coordinates x (bars in slots) and the
// row Sx below it; the bars slide one slot to the right and slot 1 is
// left empty (c0). The eigenvector attempt: tiles x₁ … x₇ linked by
// λxₖ₊₁ = xₖ (c1) fall to 0 one after another; chip (c2). Random inputs
// flicker through S and slot 1 of the output is always empty, e₁ glowing
// beside it; chip (c3). ℝⁿ: one-to-one ⟺ onto, ✓; ℓ²: ✗ (c4).

const N = 8;
const SLOT = 170;
const X0 = 280;
const VALS = [0.9, 0.55, 0.8, 0.4, 0.65, 0.3, 0.45, 0.2];

const Row: React.FC<{
  y: number;
  vals: number[];
  shift: number;
  color: string;
  label: string;
}> = ({ y, vals, shift, color, label }) => (
  <g>
    <text
      x={X0 - 40}
      y={y + 70}
      textAnchor="end"
      fill={colors.muted}
      fontSize={40}
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
    {Array.from({ length: N }, (_, i) => (
      <rect
        key={i}
        x={X0 + i * SLOT}
        y={y}
        width={SLOT - 20}
        height={120}
        rx={12}
        fill={alpha(colors.paper, 0.06)}
        stroke={alpha(colors.paper, 0.35)}
        strokeWidth={3}
      />
    ))}
    {vals.map((v, i) => {
      const x = X0 + (i + shift) * SLOT;
      if (x > X0 + (N - 0.5) * SLOT) return null;
      return (
        <rect
          key={i}
          x={x + 45}
          y={y + 110 - 95 * v}
          width={60}
          height={95 * v}
          rx={6}
          fill={color}
        />
      );
    })}
  </g>
);

export const Shift: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("shift");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c1, 10);
  const partB = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c3, 10);
  const partC = fadeIn(frame, c3 + 4, 10);
  const slide = progress(frame, c0 + 20, 24);
  const fallen = Math.max(0, Math.floor((frame - c2 - 6) / 7) + 1);
  const batch = Math.max(0, Math.floor((frame - c3 - 10) / 14));
  const inVals = VALS.map((_, i) => 0.15 + 0.8 * rnd(batch * 11 + i));

  return (
    <SceneShell id="shift">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="clink" at={c2 + 6 + i * 7} volume={0.08} />
      ))}
      <Sfx name="thud" at={c2 + 60} volume={0.16} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 10 + i * 14} volume={0.06} />
      ))}
      <Sfx name="chime" at={c4 + 20} volume={0.26} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <Row y={200} vals={VALS} shift={0} color={colors.primary} label="x" />
          <Row
            y={500}
            vals={VALS}
            shift={slide}
            color={colors.orange}
            label="Sx"
          />
          {Array.from({ length: N - 1 }, (_, i) => (
            <path
              key={i}
              d={`M ${X0 + i * SLOT + 75} 336 L ${X0 + (i + 1) * SLOT + 60} 486`}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
              fill="none"
              opacity={fadeIn(frame, c0 + 12 + i * 2, 6)}
            />
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }, (_, i) => {
            const down = i < fallen;
            const x = 260 + i * 200;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={380}
                  width={150}
                  height={150}
                  rx={18}
                  fill={
                    down ? alpha(colors.red, 0.25) : alpha(colors.paper, 0.08)
                  }
                  stroke={down ? colors.red : colors.primary}
                  strokeWidth={5}
                />
                <text
                  x={x + 75}
                  y={478}
                  textAnchor="middle"
                  fill={down ? colors.red : colors.text}
                  fontSize={54}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {down ? "0" : `x${"₁₂₃₄₅₆₇"[i]}`}
                </text>
                {i < 6 && (
                  <path
                    d={`M ${x + 120} 370 Q ${x + 175} 300 ${x + 230} 370`}
                    fill="none"
                    stroke={colors.highlight}
                    strokeWidth={4}
                    opacity={fadeIn(frame, c1 + 14 + i * 5, 6)}
                  />
                )}
              </g>
            );
          })}
          <text
            x={335}
            y={600}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 10)}
          >
            λx₁ = 0
          </text>
        </svg>
        <Chip
          frame={frame}
          at={c2 + 60}
          x={760}
          y={180}
          color={colors.red}
          size={46}
        >
          {tx.noEigenvalues}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          <Row
            y={200}
            vals={inVals}
            shift={0}
            color={colors.primary}
            label="x"
          />
          <Row
            y={420}
            vals={inVals}
            shift={1}
            color={colors.orange}
            label="Sx"
          />
          <rect
            x={X0 - 6}
            y={414}
            width={SLOT - 8}
            height={132}
            rx={16}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={0.6 + 0.4 * Math.sin(frame * 0.2)}
          />
        </svg>
        <Chip
          frame={frame}
          at={c3 + 30}
          x={X0 - 20}
          y={570}
          color={colors.highlight}
          size={40}
        >
          e₁ · {tx.notHit}
        </Chip>
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 0,
            width: 1920,
            display: "flex",
            justifyContent: "center",
            gap: 120,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c4 + 6),
          }}
        >
          <span style={{ color: colors.green }}>{tx.finite}</span>
          <span style={{ color: colors.red, opacity: fadeIn(frame, c4 + 20) }}>
            ℓ²: ✗
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
