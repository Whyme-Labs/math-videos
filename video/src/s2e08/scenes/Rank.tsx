import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Row rank = column rank. A 2 × 7 matrix across the top. Its seven columns
// fly down as arrows into a plane on the left: they all fit in a plane,
// and two of them (lit) already span it. Then its two rows light up and
// two bar charts build on the right, rank–nullity for T (7 = 5 + 2) and
// for T* (2 = 0 + 2): the two image bars are the same length, and glow.

const ROWS = [
  [1, 2, 0, -1, 3, 1, 2],
  [0, 1, 1, 2, -1, 1, 1],
];
const P = { x: 520, y: 640 };
const S = 62;

export const Rank: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rank");
  const [c0, c1] = cues;
  const fly = (j: number) => glide(frame, c0 + 20 + j * 8, fps, 20);
  const rowsLit = fadeIn(frame, c1 + 10, 8);
  const bars = glide(frame, c1 + 40, fps, 30);
  const glow = fadeIn(frame, c1 + 80, 10);
  const U = 46;

  return (
    <SceneShell id="rank">
      {ROWS[0].map((_, j) => (
        <Sfx key={j} name={PLUCKS[j % 6]} at={c0 + 20 + j * 8} volume={0.12} />
      ))}
      <Sfx name="ding" at={c0 + 90} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="riser" at={c1 + 40} volume={0.1} />
      <Sfx name="chime" at={c1 + 80} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the matrix */}
        {ROWS.map((row, i) =>
          row.map((v, j) => (
            <g key={`${i}${j}`}>
              <rect
                x={640 + j * 90 - 38}
                y={150 + i * 90 - 38}
                width={76}
                height={76}
                rx={12}
                fill={alpha(
                  rowsLit > 0 ? colors.orange : colors.primary,
                  0.12 + 0.2 * rowsLit,
                )}
                stroke={
                  rowsLit > 0.5 ? colors.orange : alpha(colors.primary, 0.5)
                }
                strokeWidth={3}
              />
              <text
                x={640 + j * 90}
                y={150 + i * 90 + 18}
                fill={colors.text}
                fontSize={48}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {v < 0 ? `−${-v}` : v}
              </text>
            </g>
          )),
        )}
        {/* the plane */}
        <circle
          cx={P.x}
          cy={P.y}
          r={200}
          fill={alpha(colors.primary, 0.08)}
          stroke={alpha(colors.primary, 0.3)}
          strokeWidth={3}
        />
        {ROWS[0].map((_, j) => {
          const t = fly(j);
          const tip = { x: P.x + ROWS[0][j] * S, y: P.y - ROWS[1][j] * S };
          const from = { x: 640 + j * 90, y: 240 };
          const lit = j === 0 || j === 2;
          return (
            <Arrow
              key={j}
              from={{ x: lerp(from.x, P.x, t), y: lerp(from.y, P.y, t) }}
              to={{ x: lerp(from.x, tip.x, t), y: lerp(from.y + 40, tip.y, t) }}
              color={lit ? colors.primary : alpha(colors.primary, 0.45)}
              width={lit ? 12 : 8}
              opacity={t > 0 ? 1 : 0}
            />
          );
        })}
        {/* rank–nullity bars for T and T* */}
        {[
          { x: 1180, total: 7, ker: 5, label: "T" },
          { x: 1500, total: 2, ker: 0, label: "T*" },
        ].map((b) => (
          <g key={b.label} opacity={fadeIn(frame, c1 + 30, 8)}>
            <text
              x={b.x + 60}
              y={420}
              fill={b.label === "T" ? colors.primary : colors.orange}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {b.label}
            </text>
            <rect
              x={b.x}
              y={780 - b.ker * U * bars}
              width={120}
              height={b.ker * U * bars}
              fill={alpha(colors.paper, 0.25)}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            <rect
              x={b.x}
              y={780 - (b.ker + 2) * U * bars}
              width={120}
              height={2 * U * bars}
              fill={alpha(colors.green, 0.35 + 0.4 * glow)}
              stroke={colors.green}
              strokeWidth={4}
            />
          </g>
        ))}
      </svg>
      {[
        { t: tx.colRank, at: c0 + 90, left: 300, top: 360, c: colors.primary },
        { t: tx.rowRank, at: c1 + 80, left: 1180, top: 330, c: colors.orange },
      ].map((l) => (
        <div
          key={l.t}
          style={{
            position: "absolute",
            top: l.top,
            left: l.left,
            fontSize: 44,
            fontWeight: 800,
            color: l.c,
            opacity: fadeIn(frame, l.at),
            translate: riseIn(frame, l.at, 16),
          }}
        >
          {l.t} ✓
        </div>
      ))}
    </SceneShell>
  );
};
