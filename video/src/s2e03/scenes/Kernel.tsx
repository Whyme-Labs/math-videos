import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Kernel and image. A floor in perspective, a sun overhead, and points
// floating above it. The noon shadow drops every point straight down. The
// vertical line through the origin (pink) collapses to a single dot at the
// origin: the kernel. The floor lights up: the image. Then three blocks
// stand for the dimensions: one goes pink (crushed), two go lemon
// (reached): 3 = 1 + 2.

const O = { x: 900, y: 560 };
const S = 140;
const iso = (x: number, y: number, z: number) => ({
  x: O.x + (x - y) * 0.9 * S,
  y: O.y + (x + y) * 0.42 * S - z * S,
});
const POINTS = [
  [1.2, -0.6, 1.8],
  [-1.4, 0.4, 1.2],
  [0.6, 1.3, 2.2],
  [-0.4, -1.5, 1.5],
  [1.8, 1.0, 0.9],
  [-1.8, -1.0, 2.0],
];

export const Kernel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("kernel");
  const [c0, c1] = cues;
  const drop = glide(frame, c0 + 30, fps, 30);
  const crush = glide(frame, c0 + 80, fps, 24);
  const floor = fadeIn(frame, c0 + 120, 14);
  const part1 = fadeOut(frame, c1, 10);
  const blockAt = (k: number) => c1 + 20 + k * 14;
  const sort = glide(frame, c1 + 80, fps, 20);

  const corners = [
    iso(-1.9, -1.9, 0),
    iso(1.9, -1.9, 0),
    iso(1.9, 1.9, 0),
    iso(-1.9, 1.9, 0),
  ];

  return (
    <SceneShell id="kernel">
      <Sfx name="whoosh" at={c0 + 30} volume={0.14} />
      <Sfx name="thud" at={c0 + 80} volume={0.3} />
      <Sfx name="ding" at={c0 + 120} volume={0.16} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={blockAt(k)} volume={0.14} />
      ))}
      <Sfx name="chime" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* the floor: the image */}
          <polygon
            points={corners.map((p) => `${p.x},${p.y}`).join(" ")}
            fill={alpha(colors.primary, 0.08 + 0.22 * floor)}
            stroke={floor > 0.5 ? colors.primary : alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          {/* the sun */}
          <circle
            cx={1500}
            cy={150}
            r={50}
            fill={colors.primary}
            opacity={0.9}
          />
          {/* points and their shadows */}
          {POINTS.map(([x, y, z], k) => {
            const p = iso(x, y, z * (1 - drop));
            const f = iso(x, y, 0);
            return (
              <g key={k}>
                <line
                  x1={iso(x, y, z).x}
                  y1={iso(x, y, z).y}
                  x2={f.x}
                  y2={f.y}
                  stroke={alpha(colors.paper, 0.35)}
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  opacity={drop > 0 ? 1 : 0}
                />
                <circle
                  cx={f.x}
                  cy={f.y}
                  r={12}
                  fill={alpha(colors.ink, 0.7)}
                  opacity={drop}
                />
                <circle cx={p.x} cy={p.y} r={16} fill={colors.orange} />
              </g>
            );
          })}
          {/* the vertical line through the origin: crushed to a point */}
          <line
            x1={O.x}
            y1={iso(0, 0, 2.6 * (1 - crush)).y}
            x2={O.x}
            y2={iso(0, 0, -0.8 * (1 - crush)).y}
            stroke={colors.highlight}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <circle
            cx={O.x}
            cy={O.y}
            r={lerp(10, 22, crush)}
            fill={colors.highlight}
          />
          <text
            x={O.x + 40}
            y={O.y - 40}
            fill={colors.highlight}
            fontSize={52}
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c0 + 96)}
          >
            {tx.kernel}
          </text>
          <text
            x={corners[1].x - 40}
            y={corners[1].y + 70}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.title}
            fontWeight={900}
            textAnchor="end"
            opacity={floor}
          >
            {tx.image}
          </text>
        </svg>
      </AbsoluteFill>

      {/* conservation of dimension */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const s = Math.min(1, springIn(frame, blockAt(k), fps, 10));
            const crushed = k === 0;
            const x = lerp(
              760 + k * 200,
              crushed ? 560 : 1060 + (k - 1) * 200,
              sort,
            );
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(${x} 500) scale(${s})`}
              >
                <rect
                  x={-80}
                  y={-80}
                  width={160}
                  height={160}
                  rx={20}
                  fill={
                    sort > 0.5
                      ? crushed
                        ? colors.highlight
                        : colors.primary
                      : alpha(colors.violet, 0.9)
                  }
                  stroke={colors.ink}
                  strokeWidth={5}
                />
              </g>
            );
          })}
          <text
            x={960}
            y={730}
            fill={colors.text}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 100)}
          >
            {tx.rankNullity}
          </text>
          {[
            { x: 560, t: tx.kernel, c: colors.highlight },
            { x: 1160, t: tx.image, c: colors.primary },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={360}
              fill={l.c}
              fontSize={50}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
              opacity={fadeIn(frame, c1 + 96)}
            >
              {l.t}
            </text>
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
