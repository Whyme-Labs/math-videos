import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// There is only one separable Hilbert space. Chip (c0). A function's
// graph on the left, an arrow U, and a column of its coordinates filling
// in on the right (c1). Lengths and angles are kept: it lands in ℓ²
// (c2). Three cards, L²[0, 1], L²(ℝ) and a quantum state, each threaded
// to the same column (c3). Build or describe: two cards (c4). The bonus:
// f(t) = t, Parseval, and the partial sums of Σ 1/n² climbing to π²/6
// (c5).

const g1 = (t: number) =>
  0.5 * Math.sin(2 * Math.PI * t) + 0.25 * Math.sin(6 * Math.PI * t);
const COEF = ["½", "i/2π", "−i/2π", "i/4π", "−i/4π", "i/6π", "…"];

const MiniCard: React.FC<{
  x: number;
  y: number;
  at: number;
  frame: number;
  label: string;
  g: (t: number) => number;
}> = ({ x, y, at, frame, label, g }) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: x,
      width: 340,
      height: 170,
      borderRadius: 16,
      background: alpha(colors.paper, 0.06),
      border: `3px solid ${alpha(colors.paper, 0.3)}`,
      opacity: fadeIn(frame, at),
      translate: riseIn(frame, at),
    }}
  >
    <svg width={340} height={170}>
      <path
        d={Array.from(
          { length: 151 },
          (_, i) => `${i ? "L" : "M"} ${20 + 2 * i} ${110 - 70 * g(i / 150)}`,
        ).join(" ")}
        fill="none"
        stroke={colors.primary}
        strokeWidth={4}
      />
    </svg>
    <div
      style={{
        position: "absolute",
        top: 8,
        left: 14,
        fontFamily: fonts.math,
        fontSize: 30,
        fontWeight: 800,
        color: colors.text,
      }}
    >
      {label}
    </div>
  </div>
);

export const OnlyOne: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("onlyOne");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10) * fadeOut(frame, c5, 10);
  const part3 = fadeIn(frame, c5 + 4, 10);
  const rows = Math.min(
    COEF.length,
    Math.max(0, Math.floor((frame - c1 - 10) / 10)),
  );
  const terms = Math.min(
    20000,
    Math.max(0, Math.floor(((frame - c5 - 20) / 3) ** 2.4)),
  );
  let sum = 0;
  for (let k = 1; k <= terms; k++) sum += 1 / (k * k);

  return (
    <SceneShell id="onlyOne">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {COEF.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 10 + i * 10} volume={0.06} />
      ))}
      <Sfx name="ding" at={c2 + 10} volume={0.2} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c3 + 6 + i * 12} volume={0.1} />
      ))}
      <Sfx name="page" at={c4 + 6} volume={0.16} />
      <Sfx name="chime" at={c5 + 80} volume={0.28} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={450}
            x2={760}
            y2={450}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 201 },
              (_, i) =>
                `${i ? "L" : "M"} ${200 + 2.8 * i} ${450 - 200 * g1(i / 200)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path
            d="M 820 450 Q 920 390 1020 450"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          <path
            d="M 1004 436 L 1022 452 L 1000 460"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          <path
            d="M 1120 220 L 1100 220 L 1100 840 L 1120 840 M 1300 220 L 1320 220 L 1320 840 L 1300 840"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
            opacity={fadeIn(frame, c1 + 6, 8)}
          />
        </svg>
        {COEF.slice(0, rows).map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 240 + i * 80,
              left: 1100,
              width: 220,
              textAlign: "center",
              fontFamily: fonts.math,
              fontSize: 42,
              fontWeight: 800,
              color: colors.text,
            }}
          >
            {c}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 330,
            left: 860,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          U
        </div>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1400,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            fontFamily: fonts.math,
            fontSize: 42,
            fontWeight: 800,
            opacity: fadeIn(frame, c2 + 10),
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: colors.green }}>‖Ux‖ = ‖x‖</div>
          <div style={{ color: colors.green }}>⟨Ux, Uy⟩ = ⟨x, y⟩</div>
          <div style={{ color: colors.text }}>U : H → ℓ²</div>
        </div>
        <MiniCard
          x={1400}
          y={420}
          at={c3 + 6}
          frame={frame}
          label="L²[0, 1]"
          g={g1}
        />
        <MiniCard
          x={1400}
          y={600}
          at={c3 + 18}
          frame={frame}
          label="L²(ℝ)"
          g={(t) => 1.2 * Math.exp(-(((t - 0.5) / 0.15) ** 2)) - 0.4}
        />
        <MiniCard
          x={420}
          y={640}
          at={c3 + 30}
          frame={frame}
          label={tx.quantum}
          g={(t) => Math.exp(-(((t - 0.5) / 0.18) ** 2)) * Math.cos(40 * t)}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        {[tx.build, tx.describe].map((w, i) => (
          <div
            key={w}
            style={{
              position: "absolute",
              top: 260,
              left: 260 + i * 740,
              width: 640,
              height: 380,
              borderRadius: 24,
              background: alpha(colors.paper, i ? 0.12 : 0.05),
              border: `4px solid ${i ? colors.green : alpha(colors.paper, 0.3)}`,
              padding: 36,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: i ? colors.green : colors.text,
              }}
            >
              {w}
            </div>
            <div
              style={{
                marginTop: 30,
                fontFamily: fonts.math,
                fontSize: 40,
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.4,
              }}
            >
              {i
                ? "H separable, dim ∞ ⇒ H ≅ ℓ²"
                : "C[0, 1] completed under ‖·‖₂"}
            </div>
          </div>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part3 }}>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          f(t) = t · ‖f‖² = ⅓ = ¼ + Σ 1 / (2π² n²)
        </div>
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 72,
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
            top: 500,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c5 + 80),
            whiteSpace: "nowrap",
          }}
        >
          = π²/6 ≈ 1.6449
        </div>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c0 + 6}
          x={160}
          y={120}
          color={colors.text}
          math
          size={40}
        >
          e₁, e₂, e₃, … ⟂
        </Chip>
      </div>
    </SceneShell>
  );
};
