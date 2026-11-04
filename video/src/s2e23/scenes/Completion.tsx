import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Completion as a table. The recipe's first row: ℚ → ℝ (c0). Two
// sequences of dots both crowding to the same hole are boxed together:
// one new point (c1). Then the rows: polynomials → C[0, 1] (c2), finite
// sequences → ℓᵖ (c3), continuous functions in area → L¹ (c4), each new
// space drawn as a filled band beside the dotted old one.

export const Completion: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("completion");
  const [c0, c1, c2, c3, c4] = cues;
  const rows = [
    { a: "ℚ", b: "ℝ", at: c0 + 6 },
    { a: `${tx.zooNo[0]} · ‖·‖∞`, b: "C[0, 1]", at: c2 + 6 },
    { a: "c₀₀ · ‖·‖ₚ", b: "ℓᵖ", at: c3 + 6 },
    { a: "C[0, 1] · ‖·‖₁", b: "L¹[0, 1]", at: c4 + 6 },
  ];
  const t = (frame - c1) * 0.06;
  const box = glide(frame, c1 + 50, fps, 16);

  return (
    <SceneShell id="completion">
      {rows.map((r, i) => (
        <Sfx key={i} name="pluck3" at={r.at} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="clink" at={c1 + 50} volume={0.18} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          display: "flex",
          gap: 300,
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
        }}
      >
        <span>{tx.space}</span>
        <span style={{ marginLeft: 160 }}>{tx.completion}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 160,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        {rows.map((r) => (
          <div
            key={r.a}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              opacity: fadeIn(frame, r.at, 8),
              translate: riseIn(frame, r.at, 12),
            }}
          >
            <div
              style={{
                width: 440,
                padding: "14px 24px",
                borderRadius: 14,
                border: `4px dashed ${colors.red}`,
                background: alpha(colors.bg, 0.85),
                fontFamily: fonts.math,
                fontSize: 40,
                fontWeight: 800,
                color: colors.text,
                whiteSpace: "nowrap",
              }}
            >
              {r.a}
            </div>
            <div style={{ fontSize: 48, color: colors.muted }}>→</div>
            <div
              style={{
                width: 300,
                padding: "14px 24px",
                borderRadius: 14,
                border: `4px solid ${colors.green}`,
                background: alpha(colors.green, 0.15),
                fontFamily: fonts.math,
                fontSize: 44,
                fontWeight: 800,
                color: colors.green,
              }}
            >
              {r.b}
            </div>
          </div>
        ))}
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={fadeIn(frame, c1 + 6, 8)}
      >
        <line
          x1={1240}
          y1={420}
          x2={1760}
          y2={420}
          stroke={colors.paper}
          strokeWidth={4}
        />
        <circle
          cx={1580}
          cy={420}
          r={16}
          fill="none"
          stroke={colors.red}
          strokeWidth={4}
          strokeDasharray="5 4"
        />
        {Array.from({ length: 7 }).map((_, i) => {
          const d = 300 * 0.6 ** i;
          return (
            <g key={i} opacity={Math.min(1, Math.max(0, t - i * 0.6))}>
              <circle cx={1580 - d} cy={400} r={8} fill={colors.primary} />
              <circle
                cx={1580 + d * 0.5}
                cy={440}
                r={8}
                fill={colors.highlight}
              />
            </g>
          );
        })}
        <rect
          x={1240}
          y={360}
          width={520}
          height={120}
          rx={14}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
          opacity={box}
        />
        <text
          x={1500}
          y={530}
          fill={colors.green}
          fontSize={36}
          fontFamily={fonts.math}
          fontWeight={800}
          textAnchor="middle"
          opacity={box}
        >
          (xₙ) ~ (yₙ) ⇔ ‖xₙ − yₙ‖ → 0
        </text>
      </svg>
    </SceneShell>
  );
};
