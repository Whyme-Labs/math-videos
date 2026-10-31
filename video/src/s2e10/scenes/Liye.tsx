import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. The Liye Qin slip (excavated 2002) with its
// multiplication table: a bamboo slip rises on the left with the first
// phrases written down it. Then a 9 × 9 grid builds as a column 1–9 times a
// row 1–9, each cell filling with its product, shaded by size. Last, the
// column and the row glow: 18 numbers write all 81, and "秩 = 1" lands.

export const Liye: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liye");
  const [c0, c1, c2] = cues;
  const slip = glide(frame, c0 + 10, fps, 24);
  const chars = tx.liyeLines.replace(/ /g, "").split("");
  const write = ramp(frame, c0 + 30, 50);
  const fill = ramp(frame, c1 + 20, 60);
  const glow = fadeIn(frame, c2 + 10, 10);
  const rank = Math.min(1, springIn(frame, c2 + 50, fps, 10));
  const G = { x: 820, y: 230, c: 62 };

  return (
    <SceneShell id="liye">
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 30 + k * 8} volume={0.1} />
      ))}
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="ding" at={c1 + 80} />
      <Sfx name="chime" at={c2 + 50} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the bamboo slip */}
        <g transform={`translate(0 ${(1 - slip) * 600})`} opacity={slip}>
          <rect
            x={300}
            y={120}
            width={110}
            height={700}
            rx={14}
            fill={alpha(colors.wood, 0.75)}
            stroke={colors.ink}
            strokeWidth={5}
          />
          {chars.map((ch, k) => (
            <text
              key={k}
              x={355}
              y={160 + k * 32}
              fill={colors.ink}
              fontSize={28}
              textAnchor="middle"
              fontWeight={800}
              opacity={k / chars.length < write ? 1 : 0}
            >
              {ch}
            </text>
          ))}
        </g>
        {/* the column and the row */}
        {Array.from({ length: 9 }).map((_, k) => (
          <g key={k} opacity={fadeIn(frame, c1 + k * 2, 8)}>
            <rect
              x={G.x - G.c - 20}
              y={G.y + k * G.c}
              width={G.c - 6}
              height={G.c - 6}
              rx={8}
              fill={alpha(colors.primary, 0.2 + 0.5 * glow)}
              stroke={colors.primary}
              strokeWidth={3}
            />
            <text
              x={G.x - G.c - 20 + (G.c - 6) / 2}
              y={G.y + k * G.c + 40}
              fill={colors.primary}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {k + 1}
            </text>
            <rect
              x={G.x + k * G.c}
              y={G.y - G.c - 20}
              width={G.c - 6}
              height={G.c - 6}
              rx={8}
              fill={alpha(colors.highlight, 0.2 + 0.5 * glow)}
              stroke={colors.highlight}
              strokeWidth={3}
            />
            <text
              x={G.x + k * G.c + (G.c - 6) / 2}
              y={G.y - G.c - 20 + 40}
              fill={colors.highlight}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {k + 1}
            </text>
          </g>
        ))}
        {/* the 81 products */}
        {Array.from({ length: 81 }).map((_, k) => {
          const i = Math.floor(k / 9);
          const j = k % 9;
          if (fill <= 0 || (i + j) / 16 > fill) return null;
          const v = (i + 1) * (j + 1);
          return (
            <g key={k}>
              <rect
                x={G.x + j * G.c}
                y={G.y + i * G.c}
                width={G.c - 6}
                height={G.c - 6}
                rx={6}
                fill={alpha(colors.orange, 0.12 + (0.6 * v) / 81)}
              />
              <text
                x={G.x + j * G.c + (G.c - 6) / 2}
                y={G.y + i * G.c + 38}
                fill={colors.text}
                fontSize={24}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={700}
                opacity={1 - 0.5 * glow}
              >
                {v}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.liyeTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1440,
          padding: "12px 28px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 64,
          fontWeight: 900,
          color: colors.green,
          opacity: rank,
          scale: String(rank),
        }}
      >
        {tx.rankOne}
      </div>
    </SceneShell>
  );
};
