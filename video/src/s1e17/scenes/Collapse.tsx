import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";
import { LANE_COLORS } from "./Lanes";

// The first isomorphism theorem. The four lanes of integers squash, each
// into one blob; the blobs swing round onto the four positions of a ring,
// and beside the ring the four-hour clock moves in step with it: ≅. Then
// the picture becomes the diagram of the theorem: integers → collapse →
// relabel → clock, every homomorphism in two moves.

const LANE_NAMES = ["4ℤ", "1 + 4ℤ", "2 + 4ℤ", "3 + 4ℤ"];
const laneY = (r: number) => 330 + r * 130;
const RING = { x: 700, y: 500, r: 220 };

export const Collapse: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("collapse");
  const [c0, c1] = cues;
  const squash = glide(frame, c0 + 10, fps, 20);
  const swing = glide(frame, c0 + 40, fps, 24);
  const clock = fadeIn(frame, c0 + 64, 10);
  const beat = Math.max(0, Math.min(4, (frame - c0 - 80) / 16));
  const iso = Math.min(1, springIn(frame, c0 + 70, fps, 10));
  const diagram = glide(frame, c1 + 6, fps, 20);

  return (
    <SceneShell id="collapse">
      <Sfx name="whoosh" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.14} />
      <Sfx name="ding" at={c0 + 70} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="tick" at={c0 + 80 + k * 16} volume={0.12} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.16} />
      <Sfx name="chime" at={c1 + 40} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[0, 1, 2, 3].map((r) => {
          // lane → blob → point on the ring
          const a = (r / 4) * Math.PI * 2 - Math.PI / 2;
          const ringPt = {
            x: RING.x + RING.r * Math.cos(a),
            y: RING.y + RING.r * Math.sin(a),
          };
          const blob = { x: 1060, y: laneY(r) };
          const x = lerp(blob.x, ringPt.x, swing);
          const y = lerp(blob.y, ringPt.y, swing);
          const w = lerp(1520, 120, squash);
          const lit = frame >= c0 + 80 && Math.floor(beat) % 4 === r;
          return (
            <g key={r} opacity={1 - diagram * 0.6}>
              <rect
                x={x - w / 2}
                y={y - 50}
                width={w}
                height={100}
                rx={50}
                fill={LANE_COLORS[r]}
                stroke={lit ? colors.paper : colors.ink}
                strokeWidth={lit ? 8 : 4}
                opacity={lerp(0.35, 1, squash)}
              />
              <text
                x={x}
                y={y + 14}
                fill={colors.ink}
                fontSize={34}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={squash}
              >
                {LANE_NAMES[r]}
              </text>
            </g>
          );
        })}
        <circle
          cx={RING.x}
          cy={RING.y}
          r={RING.r}
          fill="none"
          stroke={alpha(colors.muted, 0.7)}
          strokeWidth={4}
          opacity={swing * (1 - diagram * 0.6)}
        />
        <g opacity={clock * (1 - diagram * 0.6)}>
          <Clock x={1420} y={500} r={200} n={4} pos={beat} />
        </g>
        <text
          x={1060}
          y={530}
          fill={colors.highlight}
          fontSize={110}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={iso * (1 - diagram * 0.6)}
        >
          ≅
        </text>
        {/* the theorem as a picture */}
        <g opacity={diagram}>
          {[
            { x: 360, l: "ℤ" },
            { x: 960, l: "ℤ / 4ℤ" },
            { x: 1560, l: "ℤ₄" },
          ].map((b, k) => (
            <g key={k}>
              <rect
                x={b.x - 160}
                y={680}
                width={320}
                height={90}
                rx={24}
                fill={colors.violet}
                stroke={colors.primary}
                strokeWidth={4}
              />
              <text
                x={b.x}
                y={742}
                fill={colors.text}
                fontSize={50}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {b.l}
              </text>
            </g>
          ))}
          {[660, 1260].map((x, k) => (
            <g key={x}>
              <line
                x1={x - 120}
                y1={725}
                x2={x + 110}
                y2={725}
                stroke={colors.highlight}
                strokeWidth={6}
              />
              <polygon
                points={`${x + 110},708 ${x + 140},725 ${x + 110},742`}
                fill={colors.highlight}
              />
              <text
                x={x}
                y={690}
                fill={colors.highlight}
                fontSize={30}
                textAnchor="middle"
                fontWeight={700}
              >
                {k === 0 ? "▼" : "≅"}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 20),
          translate: riseIn(frame, c1 + 20, 16),
        }}
      >
        {tx.firstIso}
      </div>
    </SceneShell>
  );
};
