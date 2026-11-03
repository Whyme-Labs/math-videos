import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { NumberLine } from "../components/line";
import { useStrings } from "../i18n";

// Probability is measure. Kolmogorov, 1933 (c0). A dictionary: event ↔
// measurable set, probability ↔ measure (c1). Darts rain onto [0, 1];
// each one's landing spot is read out, and the counter of darts that hit a
// fraction stays at 0 (c2). The last row: expected value ↔ integral (c3).

export const Probability: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("probability");
  const [c0, c1, c2, c3] = cues;
  const darts = Math.min(30, Math.floor(Math.max(0, frame - c2 - 6) / 4));
  const rows = [c1 + 6, c1 + 30, c3 + 6];

  return (
    <SceneShell id="probability">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="tick" at={c1 + 6} volume={0.12} />
      <Sfx name="tick" at={c1 + 30} volume={0.12} />
      {Array.from({ length: 15 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 8} volume={0.06} />
      ))}
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 160,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 6),
          translate: riseIn(frame, c0 + 6, 14),
        }}
      >
        Kolmogorov · 1933
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 160,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {tx.table.map(([a, b], i) => (
          <div
            key={a}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              fontSize: 46,
              fontWeight: 800,
              opacity: fadeIn(frame, rows[i], 8),
              translate: riseIn(frame, rows[i], 12),
            }}
          >
            <div
              style={{
                width: 320,
                padding: "8px 20px",
                borderRadius: 14,
                border: `4px solid ${colors.highlight}`,
                background: alpha(colors.bg, 0.85),
                color: colors.highlight,
              }}
            >
              {a}
            </div>
            <div style={{ color: colors.muted }}>↔</div>
            <div
              style={{
                width: 420,
                whiteSpace: "nowrap",
                padding: "8px 20px",
                borderRadius: 14,
                border: `4px solid ${colors.green}`,
                background: alpha(colors.bg, 0.85),
                color: colors.green,
              }}
            >
              {b}
            </div>
          </div>
        ))}
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={fadeIn(frame, c2 + 4, 8)}
      >
        <NumberLine x0={1100} x1={1760} y={620} />
        {Array.from({ length: darts }).map((_, i) => {
          const v = Math.sin(i * 78.233 + 1.7) * 43758.5453;
          const x = v - Math.floor(v);
          return (
            <line
              key={i}
              x1={1100 + 660 * x}
              y1={560}
              x2={1100 + 660 * x}
              y2={620}
              stroke={colors.primary}
              strokeWidth={4}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1100,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 6),
          whiteSpace: "nowrap",
        }}
      >
        P(X ∈ ℚ) = 0{" "}
        <span
          style={{ fontFamily: fonts.mono, color: colors.muted, fontSize: 40 }}
        >
          · 0 / {darts}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 20),
          whiteSpace: "nowrap",
        }}
      >
        E[X] = ∫ X dP
      </div>
    </SceneShell>
  );
};
