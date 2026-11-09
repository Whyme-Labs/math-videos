import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// A minimum that isn't attained. Unit vectors e₁, e₂, … as one lit cell
// marching along a strip, all a distance √2 apart (c0). The formula for F
// (c1). Bars F(eₙ) = 1/n² dropping towards a dashed line at 0 (c2). A red
// chip: inf F = 0, never reached; the candidate limit 0 has F(0) = 1, a
// tall red bar (c3). Chip: a weaker convergence (c4).

const CELLS = 12;
const BX = 220;
const BY = 760;

export const Crisis: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("crisis");
  const [c0, c1, c2, c3, c4] = cues;
  const n = Math.min(CELLS, 1 + Math.max(0, Math.floor((frame - c0 - 6) / 12)));
  const bars = Math.min(10, Math.max(0, Math.floor((frame - c2 - 6) / 8)));

  return (
    <SceneShell id="crisis">
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 12} volume={0.06} />
      ))}
      <Sfx name="pop" at={c1 + 8} volume={0.12} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx
          key={i}
          name="pluck1"
          at={c2 + 6 + i * 8}
          volume={0.08 - i * 0.008}
        />
      ))}
      <Sfx name="thud" at={c3 + 10} volume={0.22} />
      <Sfx name="chime" at={c4 + 8} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          {Array.from({ length: CELLS }, (_, k) => (
            <rect
              key={k}
              x={160 + k * 70}
              y={200}
              width={56}
              height={56}
              rx={10}
              fill={k === n - 1 ? colors.primary : alpha(colors.paper, 0.08)}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={2}
            />
          ))}
          <text
            x={160 + CELLS * 70 + 10}
            y={240}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
          >
            …
          </text>
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <line
            x1={BX - 20}
            y1={BY}
            x2={BX + 760}
            y2={BY}
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {Array.from({ length: bars }, (_, k) => (
            <rect
              key={k}
              x={BX + k * 74}
              y={BY - 340 / (k + 1) ** 2}
              width={48}
              height={340 / (k + 1) ** 2}
              rx={4}
              fill={colors.primary}
            />
          ))}
          {["1", "¼", "⅑"].map((t, k) =>
            k < bars ? (
              <text
                key={t}
                x={BX + 24 + k * 74}
                y={BY - 340 / (k + 1) ** 2 - 14}
                textAnchor="middle"
                fill={colors.text}
                fontSize={34}
                fontFamily={fonts.math}
              >
                {t}
              </text>
            ) : null,
          )}
        </g>
        <g opacity={fadeIn(frame, c3 + 10, 8)}>
          <rect
            x={1300}
            y={BY - 340}
            width={80}
            height={340}
            rx={6}
            fill={colors.red}
          />
          <text
            x={1340}
            y={BY + 50}
            textAnchor="middle"
            fill={colors.red}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            F(0) = 1
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 30),
          whiteSpace: "nowrap",
        }}
      >
        ‖eₙ − eₘ‖ = √2
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 8),
          whiteSpace: "nowrap",
        }}
      >
        F(x) = (‖x‖² − 1)² + Σ xₖ² / k²
      </div>
      <Chip frame={frame} at={c3 + 10} x={1180} y={210} color={colors.red}>
        {tx.infimum}
      </Chip>
      <Chip frame={frame} at={c4 + 8} x={1180} y={310} color={colors.green}>
        {tx.weaker}
      </Chip>
    </SceneShell>
  );
};
