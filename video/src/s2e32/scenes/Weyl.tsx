import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly } from "../components/draw";
import { useStrings } from "../i18n";

// Weyl equidistribution. A circle filling with the points nα (golden α),
// and beside it a histogram of ten bins evening out (c0). An arc [a, b]
// lit, with the share of points in it running towards b − a = 0.25 (c1).
// The histogram gives way to the average of e^(2πinα): a path of partial
// averages spiralling into 0 (c2). Chip: order and chaos, one spectrum
// (c3).

const CX = 500;
const CY = 470;
const R = 260;
const GOLD = (Math.sqrt(5) - 1) / 2;
const AB = [0.1, 0.35];

export const Weyl: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("weyl");
  const [c0, c1, c2, c3] = cues;
  const N = Math.min(
    600,
    Math.max(0, Math.floor(((frame - c0 - 6) / 2) ** 1.4)),
  );
  const pts = Array.from({ length: N }, (_, n) => (n * GOLD) % 1);
  const bins = Array.from({ length: 10 }, () => 0);
  let inside = 0;
  for (const p of pts) {
    bins[Math.floor(p * 10)] += 1;
    if (p >= AB[0] && p < AB[1]) inside += 1;
  }
  const hist = fadeIn(frame, c0 + 6, 8) * fadeOut(frame, c2, 10);
  const M = Math.min(60, Math.max(1, Math.floor((frame - c2 - 6) / 3)));
  const avgPath = Array.from({ length: M }, (_, k) => {
    let x = 0;
    let y = 0;
    for (let n = 0; n <= k; n++) {
      x += Math.cos(2 * Math.PI * n * GOLD);
      y += Math.sin(2 * Math.PI * n * GOLD);
    }
    return [1480 + (260 * x) / (k + 1), 460 - (260 * y) / (k + 1)] as [
      number,
      number,
    ];
  });

  return (
    <SceneShell id="weyl">
      <Sfx name="sparkle" at={c0 + 10} volume={0.25} />
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="chime" at={c3 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={4}
          opacity={fadeIn(frame, c0, 8)}
        />
        <path
          d={poly(
            Array.from({ length: 31 }, (_, i) => {
              const t = 2 * Math.PI * (AB[0] + ((AB[1] - AB[0]) * i) / 30);
              return [CX + (R + 26) * Math.cos(t), CY - (R + 26) * Math.sin(t)];
            }),
          )}
          fill="none"
          stroke={colors.green}
          strokeWidth={14}
          strokeLinecap="round"
          opacity={fadeIn(frame, c1 + 6, 8)}
        />
        {pts.map((p, n) => (
          <circle
            key={n}
            cx={CX + R * Math.cos(2 * Math.PI * p)}
            cy={CY - R * Math.sin(2 * Math.PI * p)}
            r={n === N - 1 ? 12 : 6}
            fill={n === N - 1 ? colors.highlight : colors.primary}
            opacity={0.85}
          />
        ))}
        <g opacity={hist}>
          <line
            x1={1180}
            y1={700}
            x2={1780}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {bins.map((b, i) => {
            const h = N ? (3200 * b) / N : 0;
            return (
              <rect
                key={i}
                x={1190 + i * 59}
                y={700 - h}
                width={48}
                height={h}
                fill={
                  i >= 1 && i < 4 && frame >= c1 + 6
                    ? colors.green
                    : colors.orange
                }
              />
            );
          })}
          <line
            x1={1180}
            y1={380}
            x2={1780}
            y2={380}
            stroke={colors.paper}
            strokeWidth={2}
            strokeDasharray="8 6"
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <circle
            cx={1480}
            cy={460}
            r={260}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={poly(avgPath)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={4}
          />
          <circle cx={1480} cy={460} r={10} fill={colors.green} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1080,
          fontFamily: fonts.mono,
          fontSize: 36,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c1 + 10) * fadeOut(frame, c2, 8),
        }}
      >
        {tx.share}: {N ? (inside / N).toFixed(3) : "0"} → 0.25
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 10),
        }}
      >
        (1/N) Σ e<sup style={{ fontSize: 28 }}>2πinα</sup> → 0
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        N = {N}
      </div>
      <Chip
        frame={frame}
        at={c3 + 16}
        x={160}
        y={740}
        color={colors.green}
        size={40}
      >
        {tx.spectrumOne}
      </Chip>
    </SceneShell>
  );
};
