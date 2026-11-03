import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// Loss three. The target (1, ½, ⅓, …) as outlined bars (c0), with its
// squares summing to π²/6 (c1). Finite sums of e₁, e₂, … fill the bars
// in green from the left, one per beat, while the distance still missing,
// √(Σ_{k>N} 1/k²), is read out (c2). The counter jumps: N = 10 leaves
// 0.31, N = 1000 leaves 0.03 (c3). The fill never reaches the end of the
// row; the third ledger line is crossed (c4).

const N = 36;
const BW = 30;
const X0 = 160;
const Y0 = 560;
const tail = (n: number) => {
  // Σ_{k>n} 1/k² ≈ π²/6 − Σ_{k≤n} 1/k²
  let s = 0;
  for (let k = 1; k <= n; k++) s += 1 / (k * k);
  return Math.sqrt(Math.max(0, Math.PI ** 2 / 6 - s));
};

export const Hamel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("hamel");
  const [c0, c1, c2, c3, c4] = cues;
  const fill =
    frame < c2 + 6 ? 0 : Math.min(10, Math.floor((frame - c2 - 6) / 10) + 1);
  const big = frame >= c3 + 50;
  const Nshow = big ? 1000 : fill;
  const crossed = 2 + glide(frame, c4 + 10, fps, 20);

  return (
    <SceneShell id="hamel">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c3 + 50} volume={0.1} />
      <Sfx name="scratch" at={c4 + 10} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={X0 - 20}
          y1={Y0}
          x2={X0 + N * BW}
          y2={Y0}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        {Array.from({ length: N }).map((_, i) => {
          const h = 340 / (i + 1);
          const o =
            Math.max(0, Math.min(1, (N - i) / 10)) *
            fadeIn(frame, c0 + 6 + i, 6);
          const on = big ? i < N - 1 : i < fill;
          return (
            <g key={i} opacity={o}>
              <rect
                x={X0 + i * BW}
                y={Y0 - h}
                width={BW - 6}
                height={h}
                rx={3}
                fill={on ? colors.green : "none"}
                stroke={on ? colors.green : alpha(colors.paper, 0.6)}
                strokeWidth={3}
              />
            </g>
          );
        })}
        <text
          x={X0 + N * BW + 10}
          y={Y0 - 10}
          fill={colors.muted}
          fontSize={56}
          fontWeight={800}
        >
          …
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4),
        }}
      >
        x = (1, ½, ⅓, ¼, …)
        <span
          style={{
            color: colors.primary,
            marginLeft: 36,
            opacity: fadeIn(frame, c1 + 6),
          }}
        >
          Σ xₖ² = π²/6
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 160,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 6),
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontFamily: fonts.mono }}>N = {Nshow}</span>
        <span style={{ color: colors.red, marginLeft: 40 }}>
          {tx.missing}{" "}
          <span style={{ fontFamily: fonts.mono }}>
            {tail(Nshow).toFixed(Nshow >= 1000 ? 3 : 2)}
          </span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 30),
          translate: riseIn(frame, c4 + 30, 12),
        }}
      >
        x = Σ<sub style={{ fontSize: 30 }}>k=1…∞</sub> (1/k) eₖ ?
      </div>
      <Ledger crossed={crossed} active={2} compact />
    </SceneShell>
  );
};
