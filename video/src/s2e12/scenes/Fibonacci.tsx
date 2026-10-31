import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The payoff: Fibonacci through its eigenvectors. The pair (Fₙ₊₁, Fₙ)
// hops across the plane: (1, 1), (2, 1), (3, 2), (5, 3) … (34, 21). The two
// eigen-lines glow: the golden line y = x / φ (×1.618) and the steep line
// through (ψ, 1) (×(−0.618)). Then a bar chart of each pair's ψ part shows
// it flipping sign and shrinking every step, while the ratio readout
// closes in on 1.618.

const PHI = (1 + Math.sqrt(5)) / 2;
const PSI = (1 - Math.sqrt(5)) / 2;
const PTS = [
  [1, 1],
  [2, 1],
  [3, 2],
  [5, 3],
  [8, 5],
  [13, 8],
  [21, 13],
  [34, 21],
];
const O = { x: 300, y: 760 };
const S = 17;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Fibonacci: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fibonacci");
  const [c0, c1] = cues;
  const hopAt = (k: number) => c0 + 20 + k * 14;
  const shown = PTS.filter((_, k) => frame >= hopAt(k)).length;
  const stubs = fadeIn(frame, c1 + 10, 10);
  const last = PTS[Math.max(0, shown - 1)];
  const ratio = last[0] / last[1];
  const lines = glide(frame, c0 + 10, fps, 30);

  return (
    <SceneShell id="fibonacci">
      {PTS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k % 6]} at={hopAt(k)} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="chime" at={c1 + 60} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="fibStage">
            <rect x={140} y={110} width={1100} height={710} rx={24} />
          </clipPath>
        </defs>
        <g clipPath="url(#fibStage)">
          <line
            x1={O.x - 100}
            y1={O.y}
            x2={1240}
            y2={O.y}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={O.x}
            y1={O.y + 60}
            x2={O.x}
            y2={120}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {/* the golden line, and the steep one */}
          <line
            x1={scr(-4, -4 / PHI).x}
            y1={scr(-4, -4 / PHI).y}
            x2={scr(lerp(-4, 56, lines), lerp(-4, 56, lines) / PHI).x}
            y2={scr(lerp(-4, 56, lines), lerp(-4, 56, lines) / PHI).y}
            stroke={alpha(colors.primary, 0.7)}
            strokeWidth={7}
          />
          <line
            x1={scr(3, -3 * PHI).x}
            y1={scr(3, -3 * PHI).y}
            x2={scr(-25, 25 * PHI).x}
            y2={scr(-25, 25 * PHI).y}
            stroke={alpha(colors.highlight, 0.6 * lines)}
            strokeWidth={7}
          />
          {/* the hops */}
          {PTS.slice(0, shown).map((p, k) => {
            const q = scr(p[0], p[1]);
            const prev = k ? scr(PTS[k - 1][0], PTS[k - 1][1]) : null;
            return (
              <g key={k}>
                {prev ? (
                  <line
                    x1={prev.x}
                    y1={prev.y}
                    x2={q.x}
                    y2={q.y}
                    stroke={alpha(colors.paper, 0.5)}
                    strokeWidth={3}
                    strokeDasharray="8 8"
                  />
                ) : null}
                <circle cx={q.x} cy={q.y} r={12} fill={colors.primary} />
              </g>
            );
          })}
        </g>
        <text
          x={scr(30, 30 / PHI).x}
          y={scr(30, 30 / PHI).y - 30}
          fill={colors.primary}
          fontSize={50}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={lines}
        >
          × 1.618
        </text>
        <text
          x={scr(-9, 9 * PHI).x + 40}
          y={scr(-9, 9 * PHI).y}
          fill={colors.highlight}
          fontSize={50}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={lines}
        >
          × (−0.618)
        </text>
        {/* the ψ part of each pair: flips sign and shrinks */}
        <g opacity={stubs} transform="translate(1340 640)">
          <line
            x1={0}
            y1={0}
            x2={420}
            y2={0}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {PTS.slice(0, shown).map((p, k) => {
            const beta = p[1] - (p[0] - PSI * p[1]) / (PHI - PSI);
            return (
              <rect
                key={k}
                x={14 + k * 50}
                y={beta > 0 ? -beta * 260 : 0}
                width={34}
                height={Math.abs(beta) * 260}
                rx={6}
                fill={colors.highlight}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1340,
          width: 420,
          padding: "18px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${colors.primary}`,
          opacity: fadeIn(frame, c0 + 30),
          translate: riseIn(frame, c0 + 30, 16),
        }}
      >
        <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
          {tx.ratio} {last[0]}/{last[1]}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 96,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {ratio.toFixed(4)}
        </div>
      </div>
    </SceneShell>
  );
};
