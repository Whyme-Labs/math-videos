import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Monsters in the algebraic dual. A chip: every linear f (c0). In the
// plane a functional's level lines stay evenly spaced: on the unit disc
// its readings stay between −‖f‖ and ‖f‖ (c1). The monster f(x) = Σ k·xₖ
// (c2): unit vectors e₁, e₂, … as single bars, each of length 1, while the
// reading f(eₙ) = n climbs as its own bar beside them (c3). A dial: input
// change tiny, output change huge, in red (c4).

export const Monsters: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("monsters");
  const [c0, c1, c2, c3, c4] = cues;
  const n = Math.min(10, Math.max(1, Math.floor((frame - c3 - 6) / 10) + 1));
  const O = { x: 520, y: 470 };
  const t = (frame - c1) * 0.04;

  return (
    <SceneShell id="monsters">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="thud" at={c4 + 10} volume={0.22} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        V* = {"{"} {tx.allLinear} {"}"}
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          opacity={fadeIn(frame, c1 + 6, 10) * (1 - fadeIn(frame, c2 + 6, 10))}
        >
          {Array.from({ length: 9 }).map((_, i) => {
            const d = (i - 4) * 55;
            const a = 0.5 + 0.2 * Math.sin(t);
            return (
              <line
                key={i}
                x1={O.x + d * Math.cos(a) - 400 * Math.sin(a)}
                y1={O.y - d * Math.sin(a) - 400 * Math.cos(a)}
                x2={O.x + d * Math.cos(a) + 400 * Math.sin(a)}
                y2={O.y - d * Math.sin(a) + 400 * Math.cos(a)}
                stroke={colors.orange}
                strokeWidth={4}
                opacity={0.7}
              />
            );
          })}
          <circle
            cx={O.x}
            cy={O.y}
            r={160}
            fill={alpha(colors.primary, 0.1)}
            stroke={colors.primary}
            strokeWidth={5}
          />
        </g>
        <g opacity={fadeIn(frame, c3 + 4, 8)}>
          <line
            x1={160}
            y1={720}
            x2={1100}
            y2={720}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: n }).map((_, i) => (
            <g key={i}>
              <rect
                x={180 + i * 90}
                y={720 - 60}
                width={30}
                height={60}
                fill={colors.primary}
              />
              <rect
                x={214 + i * 90}
                y={720 - 45 * (i + 1)}
                width={30}
                height={45 * (i + 1)}
                fill={colors.red}
              />
              <text
                x={212 + i * 90}
                y={770}
                fill={colors.muted}
                fontSize={30}
                fontFamily={fonts.mono}
                textAnchor="middle"
              >
                e{"₁₂₃₄₅₆₇₈₉"[i] ?? "₁₀"}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c2 + 6),
          translate: riseIn(frame, c2 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        f(x) = Σ k · xₖ
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1200,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontSize: 46,
          fontWeight: 800,
          opacity: fadeIn(frame, c3 + 6),
        }}
      >
        <div style={{ color: colors.primary }}>
          ‖eₙ‖ = <span style={{ fontFamily: fonts.mono }}>1</span>
        </div>
        <div style={{ color: colors.red }}>
          f(eₙ) = <span style={{ fontFamily: fonts.mono }}>{n}</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1200,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 10),
          translate: riseIn(frame, c4 + 10, 12),
          whiteSpace: "nowrap",
        }}
      >
        ‖eₙ/√n‖ → 0 · f → ∞
      </div>
    </SceneShell>
  );
};
