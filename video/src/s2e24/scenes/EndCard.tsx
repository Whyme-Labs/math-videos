import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Recap: a function nudged a little while a gauge's needle moves only a
// little (c0). The unit ball morphs diamond → disc → square while its
// dual partner morphs the other way: the norm decides X* (c1). Teaser
// for Hahn–Banach: bars 1, 0, 1, 0, … and their running average
// settling on ½ (c2).

const ballPath = (p: number, cx: number, cy: number, R: number) =>
  Array.from({ length: 121 }, (_, k) => {
    const t = (2 * Math.PI * k) / 120;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const r = 1 / (Math.abs(c) ** p + Math.abs(s) ** p) ** (1 / p);
    return `${k ? "L" : "M"} ${cx + R * r * c} ${cy - R * r * s}`;
  }).join(" ") + " Z";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c1, 8);
  const part2 = fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c2, 10);
  const nudge = 0.08 * Math.sin((frame - c0) * 0.08);
  const ff = (x: number) => 0.5 + 0.25 * Math.sin(5 * x) + nudge;
  // p sweeps 1 → 8 (log scale); partner r = p/(p − 1)
  const u = glide(frame, c1 + 8, fps, 90);
  const p = Math.exp(Math.log(1.05) + (Math.log(8) - Math.log(1.05)) * u);
  const r = p / (p - 1);
  const n = Math.min(40, Math.max(0, Math.floor((frame - c2 - 6) / 2)));
  const means: number[] = [];
  let sum = 0;
  for (let k = 0; k < n; k++) {
    sum += k % 2 ? 0 : 1;
    means.push(sum / (k + 1));
  }

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.14} />
      <Sfx name="ding" at={c1 + 98} volume={0.22} />
      <Sfx name="riser" at={c2 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 90} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={700}
            x2={1100}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, k) =>
                `${k ? "L" : "M"} ${200 + 9 * k} ${700 - 400 * ff(k / 100)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <g transform="translate(1450 520)">
            <path
              d="M -220 0 A 220 220 0 0 1 220 0"
              fill="none"
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={8}
            />
            <line
              x1={0}
              y1={0}
              x2={-200 * Math.cos(Math.PI * (0.5 + nudge * 2))}
              y2={-200 * Math.sin(Math.PI * (0.5 + nudge * 2))}
              stroke={colors.highlight}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <circle r={16} fill={colors.highlight} />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <path
            d={ballPath(p, 620, 470, 250)}
            fill={alpha(colors.primary, 0.2)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path
            d={ballPath(r, 1300, 470, 250)}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={6}
          />
          <text
            x={620}
            y={800}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            X = ℓ{"ᵖ"}
          </text>
          <text
            x={1300}
            y={800}
            textAnchor="middle"
            fill={colors.orange}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            X* = ℓʳ
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          p = {p.toFixed(2)} · r = {r > 99 ? "∞" : r.toFixed(2)}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={1000}
            y1={640}
            x2={1800}
            y2={640}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={1000}
            y1={490}
            x2={1800}
            y2={490}
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {Array.from({ length: n }, (_, k) => (
            <rect
              key={k}
              x={1000 + k * 20}
              y={640 - (k % 2 ? 0 : 300)}
              width={12}
              height={k % 2 ? 0 : 300}
              fill={alpha(colors.primary, 0.5)}
            />
          ))}
          <path
            d={means
              .map(
                (m, k) => `${k ? "L" : "M"} ${1006 + k * 20} ${640 - 300 * m}`,
              )
              .join(" ")}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
          />
          <text
            x={1810}
            y={500}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ½
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 820,
              opacity: fadeIn(frame, c2 + 70),
              translate: riseIn(frame, c2 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
