import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The matrix of a map. The basis arrows e₁, e₂ swing to their images
// T(e₁) = (2, 1) and T(e₂) = (−1, 1). Each image's coordinates fly across
// into a bracket on the right and become a column. Then v = (1, 2): one
// copy of column 1 and two of column 2 are laid tip to tail on the plane,
// landing on T(v) = (0, 3), the same point the matrix computes.

const O = { x: 640, y: 660 };
const S = 110;
const C1 = { x: 2, y: 1 };
const C2 = { x: -1, y: 1 };
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const MAT = { x: 1460, y: 420 };

export const Columns: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("columns");
  const [c0, c1] = cues;
  const e1 = glide(frame, c0 + 20, fps, 22);
  const e2 = glide(frame, c0 + 50, fps, 22);
  const fly1 = glide(frame, c0 + 84, fps, 22);
  const fly2 = glide(frame, c0 + 110, fps, 22);
  const mix1 = glide(frame, c1 + 30, fps, 18);
  const mix2 = glide(frame, c1 + 60, fps, 24);
  const land = Math.min(1, springIn(frame, c1 + 90, fps, 10));
  const p1 = scr(lerp(1, C1.x, e1), lerp(0, C1.y, e1));
  const p2 = scr(lerp(0, C2.x, e2), lerp(1, C2.y, e2));
  const t1 = scr(C1.x, C1.y);
  const t2end = scr(C1.x + 2 * C2.x * mix2, C1.y + 2 * C2.y * mix2);

  const entry = (
    v: number,
    from: { x: number; y: number },
    to: { x: number; y: number },
    t: number,
    color: string,
  ) => (
    <text
      x={lerp(from.x, to.x, t)}
      y={lerp(from.y, to.y, t)}
      fill={color}
      fontSize={lerp(40, 72, t)}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
      opacity={t > 0 ? 1 : 0}
    >
      {v < 0 ? `−${-v}` : v}
    </text>
  );

  return (
    <SceneShell id="columns">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 50} volume={0.12} />
      <Sfx name={PLUCKS[0]} at={c0 + 84} volume={0.16} />
      <Sfx name={PLUCKS[2]} at={c0 + 110} volume={0.16} />
      <Sfx name="pluck4" at={c1 + 30} volume={0.14} />
      <Sfx name="pluck5" at={c1 + 60} volume={0.14} />
      <Sfx name="ding" at={c1 + 90} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the plane */}
        {Array.from({ length: 9 }).map((_, i) => {
          const k = i - 3;
          return (
            <g key={i}>
              <line
                x1={scr(k, -0.6).x}
                y1={scr(k, -0.6).y}
                x2={scr(k, 4.4).x}
                y2={scr(k, 4.4).y}
                stroke={alpha(colors.paper, k === 0 ? 0.45 : 0.12)}
                strokeWidth={k === 0 ? 4 : 2}
              />
              {k >= 0 && k <= 4 ? (
                <line
                  x1={scr(-3.6, k).x}
                  y1={scr(-3.6, k).y}
                  x2={scr(4.6, k).x}
                  y2={scr(4.6, k).y}
                  stroke={alpha(colors.paper, k === 0 ? 0.45 : 0.12)}
                  strokeWidth={k === 0 ? 4 : 2}
                />
              ) : null}
            </g>
          );
        })}
        {/* the basis arrows, swinging to their images */}
        <Arrow
          from={O}
          to={p1}
          color={colors.orange}
          width={12}
          opacity={1 - 0.7 * mix1}
        />
        <Arrow
          from={O}
          to={p2}
          color={colors.highlight}
          width={12}
          opacity={1 - 0.7 * mix1}
        />
        {/* the matrix */}
        <g opacity={fadeIn(frame, c0 + 80)}>
          <path
            d={`M ${MAT.x - 150} ${MAT.y - 120} l -30 0 l 0 240 l 30 0 M ${MAT.x + 150} ${MAT.y - 120} l 30 0 l 0 240 l -30 0`}
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
        </g>
        {entry(C1.x, t1, { x: MAT.x - 75, y: MAT.y - 30 }, fly1, colors.orange)}
        {entry(C1.y, t1, { x: MAT.x - 75, y: MAT.y + 80 }, fly1, colors.orange)}
        {entry(
          C2.x,
          scr(C2.x, C2.y),
          { x: MAT.x + 75, y: MAT.y - 30 },
          fly2,
          colors.highlight,
        )}
        {entry(
          C2.y,
          scr(C2.x, C2.y),
          { x: MAT.x + 75, y: MAT.y + 80 },
          fly2,
          colors.highlight,
        )}
        {/* T(v) for v = (1, 2): column 1, then two of column 2 */}
        <Arrow
          from={O}
          to={scr(C1.x * mix1, C1.y * mix1)}
          color={colors.orange}
          width={14}
          opacity={mix1 > 0 ? 1 : 0}
        />
        <Arrow
          from={t1}
          to={t2end}
          color={colors.highlight}
          width={14}
          opacity={mix2 > 0 ? 1 : 0}
        />
        <g opacity={land}>
          <Arrow from={O} to={scr(0, 3)} width={16} />
          <text
            x={scr(0, 3).x + 30}
            y={scr(0, 3).y - 10}
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            T(v)
          </text>
        </g>
        <text
          x={MAT.x}
          y={MAT.y + 250}
          fill={colors.text}
          fontSize={52}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c1 + 20)}
        >
          v = (1, 2)
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1160,
          width: 600,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 120),
          translate: riseIn(frame, c0 + 120, 16),
        }}
      >
        {tx.columnsAre}
      </div>
    </SceneShell>
  );
};
