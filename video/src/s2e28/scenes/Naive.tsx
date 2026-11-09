import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Why an inner product alone fails. Chip (c0). Bars of y = (1, ½, ⅓, …)
// and the plane ⟨x, y⟩ = 0 (c1). The closest point to e₁, bar by bar: the
// first few bars are fine, the rest go red and hatched, "not a finite
// sequence" (c2). A square sup-norm ball beside a point: a whole edge is
// at the least distance, many closest points (c3). Chip: angles +
// completeness (c4).

const BX = 200;
const BW = 64;
const Y0 = 520;
const K = 14;
const yv = (k: number) => 1 / (k + 1);
const pv = (k: number) => (k === 0 ? 1 : 0) - (6 / Math.PI ** 2) * yv(k);

export const Naive: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("naive");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const shown = Math.min(K, Math.max(0, Math.floor((frame - c2 - 6) / 5)));
  const N = 5;
  const sweep = Math.sin((frame - c3) * 0.05);

  return (
    <SceneShell id="naive">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 5} volume={0.06} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 5} volume={0.06} />
      ))}
      <Sfx name="thud" at={c2 + 80} volume={0.2} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="chime" at={c4 + 8} volume={0.28} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <pattern
              id="nv-hatch"
              width={12}
              height={12}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={12}
                stroke={colors.red}
                strokeWidth={4}
              />
            </pattern>
          </defs>
          <line
            x1={BX}
            y1={Y0 - 150}
            x2={BX + K * BW}
            y2={Y0 - 150}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {Array.from({ length: K }, (_, k) => (
            <rect
              key={k}
              x={BX + k * BW + 10}
              y={Y0 - 150 - 160 * yv(k)}
              width={BW - 20}
              height={160 * yv(k)}
              rx={4}
              fill={colors.orange}
              opacity={fadeIn(frame, c1 + 6 + k * 5, 4)}
            />
          ))}
          <line
            x1={BX}
            y1={Y0 + 200}
            x2={BX + K * BW}
            y2={Y0 + 200}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
            opacity={fadeIn(frame, c2 + 2, 6)}
          />
          {Array.from({ length: shown }, (_, k) => {
            const v = pv(k);
            const h = 200 * Math.abs(v);
            const bad = k >= N;
            return (
              <rect
                key={k}
                x={BX + k * BW + 10}
                y={v > 0 ? Y0 + 200 - h : Y0 + 200}
                width={BW - 20}
                height={h}
                rx={4}
                fill={
                  bad && frame > c2 + 70 ? "url(#nv-hatch)" : colors.primary
                }
                stroke={bad && frame > c2 + 70 ? colors.red : "none"}
                strokeWidth={2}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 150,
            left: BX,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 6),
            whiteSpace: "nowrap",
          }}
        >
          y = (1, ½, ⅓, …) · ⟨x, y⟩ = 0
        </div>
        <div
          style={{
            position: "absolute",
            top: Y0 + 20,
            left: BX,
            fontFamily: fonts.math,
            fontSize: 40,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 6),
            whiteSpace: "nowrap",
          }}
        >
          p = e₁ − (6/π²) y
        </div>
        <div
          style={{
            position: "absolute",
            top: Y0 + 20,
            left: BX + N * BW,
            fontSize: 38,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c2 + 80),
            whiteSpace: "nowrap",
          }}
        >
          ← {tx.notAllowed}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <rect
            x={300}
            y={240}
            width={400}
            height={400}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <circle cx={1100} cy={440} r={14} fill={colors.highlight} />
          <rect
            x={700}
            y={240}
            width={800}
            height={400}
            fill="none"
            stroke={alpha(colors.highlight, 0.6)}
            strokeWidth={4}
            strokeDasharray="12 8"
          />
          <line
            x1={700}
            y1={240}
            x2={700}
            y2={640}
            stroke={colors.red}
            strokeWidth={10}
          />
          <line
            x1={1100}
            y1={440}
            x2={700}
            y2={440 + 180 * sweep}
            stroke={colors.red}
            strokeWidth={4}
          />
          <circle cx={700} cy={440 + 180 * sweep} r={10} fill={colors.red} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 680,
            left: 560,
            fontSize: 40,
            fontWeight: 800,
            color: colors.red,
            whiteSpace: "nowrap",
          }}
        >
          {tx.manyClosest}
        </div>
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 300,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          ‖·‖∞
        </div>
      </AbsoluteFill>
      <Chip frame={frame} at={c0 + 6} x={1300} y={130} color={colors.text} math>
        ⟨·, ·⟩ + ?
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 8}
        x={1100}
        y={760}
        color={colors.green}
        size={40}
      >
        {tx.hilbert}
      </Chip>
    </SceneShell>
  );
};
