import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Counting is the wrong ruler. ℚ as dots on a line, ℚ(√2) as dots on a
// plane, the a and b of a + b√2 as its two axes (c0). Matching threads
// join them one to one: both countable (c1). The √2 axis glows: a new
// direction (c2). Arrows add and stretch by rationals inside the plane
// (c3). Chip: dim = 2 (c4).

const O = { x: 1160, y: 560 };
const U = 110;

export const Ruler: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("ruler");
  const [c0, c1, c2, c3, c4] = cues;
  const threads = Math.min(10, Math.max(0, Math.floor((frame - c1 - 6) / 5)));
  const grow = progress(frame, c3 + 10, 30);
  const a = 1.5 * grow;
  const b = 1 * grow;

  return (
    <SceneShell id="ruler">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 10 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 5} volume={0.05} />
      ))}
      <Sfx name="pluck3" at={c2 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="chime" at={c4 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <line
            x1={160}
            y1={300}
            x2={760}
            y2={300}
            stroke={colors.primary}
            strokeWidth={4}
          />
          {Array.from({ length: 13 }, (_, i) => (
            <circle
              key={i}
              cx={180 + i * 47}
              cy={300}
              r={7}
              fill={colors.primary}
            />
          ))}
          <text
            x={160}
            y={260}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℚ
          </text>
          <line
            x1={O.x - 4 * U}
            y1={O.y}
            x2={O.x + 4 * U}
            y2={O.y}
            stroke={colors.primary}
            strokeWidth={4}
          />
          <line
            x1={O.x}
            y1={O.y + 2.4 * U}
            x2={O.x}
            y2={O.y - 3 * U}
            stroke={frame >= c2 + 6 ? colors.orange : alpha(colors.paper, 0.5)}
            strokeWidth={frame >= c2 + 6 ? 8 : 4}
          />
          {Array.from({ length: 9 }, (_, i) =>
            Array.from({ length: 5 }, (_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={O.x + (i - 4) * U * 0.9}
                cy={O.y - (j - 2) * U * 0.9 * 1.0}
                r={6}
                fill={j === 2 ? colors.primary : alpha(colors.highlight, 0.8)}
              />
            )),
          )}
          <text
            x={O.x + 3.4 * U}
            y={O.y - 2.6 * U}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℚ(√2)
          </text>
          <text
            x={O.x + 20}
            y={O.y - 3 * U + 10}
            fill={colors.orange}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 6, 8)}
          >
            √2
          </text>
          <text
            x={O.x + 4 * U - 10}
            y={O.y + 46}
            fill={colors.primary}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1
          </text>
        </g>
        <g opacity={fadeOut(frame, c2, 10)}>
          {Array.from({ length: threads }, (_, i) => (
            <path
              key={i}
              d={`M ${180 + i * 47} 300 Q ${700} ${380 + i * 6} ${O.x + ((i % 9) - 4) * U * 0.9} ${O.y - ((Math.floor(i / 2) % 5) - 2) * U * 0.9}`}
              fill="none"
              stroke={alpha(colors.green, 0.7)}
              strokeWidth={3}
            />
          ))}
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + a * U * 0.9}
            y2={O.y}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={O.x + a * U * 0.9}
            y1={O.y}
            x2={O.x + a * U * 0.9}
            y2={O.y - b * U * 0.9}
            stroke={colors.orange}
            strokeWidth={7}
          />
          <circle
            cx={O.x + a * U * 0.9}
            cy={O.y - b * U * 0.9}
            r={14}
            fill={colors.text}
          />
          <text
            x={O.x + a * U * 0.9 + 22}
            y={O.y - b * U * 0.9 - 14}
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {(1.5).toFixed(1)} + 1·√2
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c1 + 30) * fadeOut(frame, c2, 10),
        }}
      >
        |ℚ| = |ℚ(√2)| = ℵ₀ · {tx.countable}
      </div>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 10) }}>
        <Chip
          frame={frame}
          at={c2 + 14}
          x={160}
          y={420}
          color={colors.orange}
          size={40}
        >
          √2 · {tx.newDirection}
        </Chip>
      </AbsoluteFill>
      <Chip
        frame={frame}
        at={c4 + 16}
        x={160}
        y={540}
        color={colors.primary}
        size={48}
        math
      >
        dim<sub style={{ fontSize: 28 }}>ℚ</sub> ℚ(√2) = 2
      </Chip>
    </SceneShell>
  );
};
