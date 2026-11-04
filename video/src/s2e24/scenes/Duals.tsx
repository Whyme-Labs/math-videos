import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The duals of the sequence spaces. The result (ℓᵖ)* = ℓʳ (c0). A
// functional tested on e₁, e₂, …: each test lights a bar, the readings
// yₖ = f(eₖ) (c1). A sequence x in ℓ² and its truncations filling it in
// from the left, the distance still missing read out falling to 0:
// finite sequences are dense (c2). The same for (1, 1, 1, …) in ℓ∞: the
// distance stays 1 (c3). Chip: (ℓ∞)* ⊋ ℓ¹ (c4).

export const Duals: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("duals");
  const [c0, c1, c2, c3, c4] = cues;
  const tests = Math.min(12, Math.floor(Math.max(0, frame - c1 - 6) / 6));
  const fillA = Math.min(14, Math.floor(Math.max(0, frame - c2 - 6) / 7));
  const fillB = Math.min(14, Math.floor(Math.max(0, frame - c3 - 6) / 7));
  const tailA = Math.sqrt(
    Array.from({ length: 400 }, (_, i) =>
      i >= fillA ? 1 / (i + 1) ** 2 : 0,
    ).reduce((a, b) => a + b, 0),
  );
  const ys = (k: number) => (0.9 / (k + 1) ** 0.9) * (k % 2 ? -1 : 1);

  return (
    <SceneShell id="duals">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 12 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="riser" at={c2 + 6} volume={0.08} />
      <Sfx name="thud" at={c3 + 80} volume={0.2} />
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 60,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        (ℓᵖ)* = ℓʳ{" "}
        <span style={{ fontSize: 42, color: colors.muted }}>1 ≤ p &lt; ∞</span>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the tests */}
        <g opacity={fadeIn(frame, c1 + 4, 8)}>
          <line
            x1={160}
            y1={330}
            x2={1000}
            y2={330}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: tests }).map((_, k) => (
            <rect
              key={k}
              x={170 + k * 68}
              y={ys(k) > 0 ? 330 - ys(k) * 100 : 330}
              width={50}
              height={Math.abs(ys(k)) * 100}
              fill={colors.orange}
            />
          ))}
          <text
            x={1020}
            y={340}
            fill={colors.orange}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            yₖ = f(eₖ)
          </text>
        </g>
        {[0, 1].map((r) => {
          const fill = r === 0 ? fillA : fillB;
          return (
            <g
              key={r}
              transform={`translate(160 ${600 + r * 200})`}
              opacity={fadeIn(frame, (r ? c3 : c2) + 4, 8)}
            >
              <line
                x1={0}
                y1={0}
                x2={14 * 60}
                y2={0}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              {Array.from({ length: 14 }).map((_, i) => {
                const h = r === 0 ? 150 / (i + 1) : 110;
                const on = i < fill;
                return (
                  <rect
                    key={i}
                    x={i * 60}
                    y={-h}
                    width={48}
                    height={h}
                    rx={4}
                    fill={on ? colors.green : "none"}
                    stroke={
                      on ? colors.green : r ? colors.highlight : colors.primary
                    }
                    strokeWidth={3}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 1100,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 6),
          whiteSpace: "nowrap",
        }}
      >
        ℓ²: {tx.missing}{" "}
        <span style={{ fontFamily: fonts.mono }}>{tailA.toFixed(3)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 1100,
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c3 + 6),
          whiteSpace: "nowrap",
        }}
      >
        ℓ∞: {tx.missing} <span style={{ fontFamily: fonts.mono }}>1</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1260,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.red}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 6),
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        {tx.bigger}
      </div>
    </SceneShell>
  );
};
