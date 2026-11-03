import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Spreading out. A total of 1 spread evenly over n boxes, n climbing
// 1, 2, … 24 (c0), with three readouts: total 1, energy 1/√n, peak 1/n
// (c1). The definition of equivalent norms as a formula (c2). Back to the
// spikes: peak ÷ area = 2n², read out as n climbs, a bar that grows
// without end past any C (c3).

export const Spread: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("spread");
  const [c0, c1, c2, c3] = cues;
  const n = Math.min(24, Math.max(1, Math.floor((frame - c0 - 6) / 6) + 1));
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const m = Math.min(12, Math.max(1, Math.floor((frame - c3 - 6) / 10) + 1));
  const ratio = 2 * m * m;
  const C = 60;
  const reads = [
    { l: tx.total, v: 1, c: colors.primary },
    { l: tx.energy, v: 1 / Math.sqrt(n), c: colors.green },
    { l: tx.peak, v: 1 / n, c: colors.highlight },
  ];
  const bar = glide(frame, c3 + 6, fps, 12);

  return (
    <SceneShell id="spread">
      <Sfx name="riser" at={c0 + 6} volume={0.08} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="riser" at={c3 + 6} volume={0.1} />
      <Sfx name="thud" at={c3 + 100} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={700}
            x2={1120}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: n }).map((_, i) => {
            const w = 960 / n;
            return (
              <rect
                key={i}
                x={160 + i * w + 2}
                y={700 - 400 / n}
                width={w - 4}
                height={400 / n}
                rx={4}
                fill={colors.primary}
              />
            );
          })}
          <text
            x={160}
            y={760}
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            n = {n}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 1220,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            opacity: fadeIn(frame, c1 + 6),
          }}
        >
          {reads.map((r) => (
            <div
              key={r.l}
              style={{
                width: 520,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 46,
                fontWeight: 800,
                color: r.c,
              }}
            >
              <span>{r.l}</span>
              <span style={{ fontFamily: fonts.mono }}>{r.v.toFixed(3)}</span>
            </div>
          ))}
        </div>
        <Eq
          steps={[[{ id: "a", t: "c‖x‖ ≤ ‖x‖′ ≤ C‖x‖" }]]}
          at={[c2 + 6]}
          x={960}
          y={100}
          size={64}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={500}
            y1={760}
            x2={900}
            y2={760}
            stroke={colors.text}
            strokeWidth={4}
          />
          <rect
            x={620}
            y={760 - Math.min(600, ratio * 2) * bar}
            width={160}
            height={Math.min(600, ratio * 2) * bar}
            rx={10}
            fill={colors.highlight}
          />
          <line
            x1={480}
            y1={760 - C * 2}
            x2={920}
            y2={760 - C * 2}
            stroke={colors.green}
            strokeWidth={5}
            strokeDasharray="12 10"
          />
          <text
            x={940}
            y={760 - C * 2 + 14}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            C ?
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 160,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          {tx.peak} ÷ {tx.judges[0]} ={" "}
          <span style={{ fontFamily: fonts.mono, color: colors.highlight }}>
            2n² = {ratio}
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              color: colors.muted,
              marginLeft: 30,
            }}
          >
            n = {m}
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
