import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// A basis decides the map. The plane's grid and its two basis arrows. The
// basis arrows move to their images T(e₁), T(e₂), leaving ghosts behind.
// Then the whole grid follows, cell by cell, and the arrow v = 2e₁ + e₂ is
// carried along to 2T(e₁) + T(e₂): nothing else had any choice.

const O = { x: 700, y: 650 };
const S = 165;
const M = { a: 1.25, b: 0.55, c: 0.35, d: 1.0 }; // columns (a, c) and (b, d)

export const Basis: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("basis");
  const [c0, c1] = cues;
  const e = glide(frame, c0 + 30, fps, 70);
  const grid = glide(frame, c1 + 10, fps, 50);
  const vShow = Math.min(1, springIn(frame, c1 + 70, fps, 10));
  const lerpM = (t: number) => ({
    a: lerp(1, M.a, t),
    b: lerp(0, M.b, t),
    c: lerp(0, M.c, t),
    d: lerp(1, M.d, t),
  });
  const scr = (m: ReturnType<typeof lerpM>, x: number, y: number) => ({
    x: O.x + (m.a * x + m.b * y) * S,
    y: O.y - (m.c * x + m.d * y) * S,
  });
  const g = lerpM(grid);
  const eM = lerpM(e);

  return (
    <SceneShell id="basis">
      <Sfx name="whoosh" at={c0 + 30} volume={0.14} />
      <Sfx name="ding" at={c0 + 60} volume={0.14} />
      <Sfx name="riser" at={c1 + 10} volume={0.1} />
      <Sfx name="chime" at={c1 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the grid, carried along by the map */}
        {Array.from({ length: 9 }).map((_, i) => {
          const k = i - 2;
          const a1 = scr(g, k, -1.0);
          const a2 = scr(g, k, 4);
          const b1 = scr(g, -3, k);
          const b2 = scr(g, 7, k);
          return (
            <g key={i}>
              <line
                x1={a1.x}
                y1={a1.y}
                x2={a2.x}
                y2={a2.y}
                stroke={alpha(colors.paper, k === 0 ? 0.5 : 0.16)}
                strokeWidth={k === 0 ? 4 : 2}
              />
              {k >= 0 && k <= 3 ? (
                <line
                  x1={b1.x}
                  y1={b1.y}
                  x2={b2.x}
                  y2={b2.y}
                  stroke={alpha(colors.paper, k === 0 ? 0.5 : 0.16)}
                  strokeWidth={k === 0 ? 4 : 2}
                />
              ) : null}
            </g>
          );
        })}
        {/* ghosts of the old basis */}
        <Arrow
          from={O}
          to={scr(lerpM(0), 1, 0)}
          color={alpha(colors.orange, 0.35)}
          width={8}
          opacity={e > 0.05 ? 1 : 0}
        />
        <Arrow
          from={O}
          to={scr(lerpM(0), 0, 1)}
          color={alpha(colors.orange, 0.35)}
          width={8}
          opacity={e > 0.05 ? 1 : 0}
        />
        {/* the basis arrows and where they go */}
        <Arrow from={O} to={scr(eM, 1, 0)} color={colors.orange} width={12} />
        <Arrow from={O} to={scr(eM, 0, 1)} color={colors.orange} width={12} />
        {[
          { p: scr(eM, 1.15, -0.25), t: e > 0.5 ? "T(e₁)" : "e₁" },
          { p: scr(eM, -0.35, 1.1), t: e > 0.5 ? "T(e₂)" : "e₂" },
        ].map((l, k) => (
          <text
            key={k}
            x={l.p.x}
            y={l.p.y}
            fill={colors.orange}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {l.t}
          </text>
        ))}
        {/* v = 2e₁ + e₂, carried along */}
        <g opacity={vShow}>
          <Arrow from={O} to={scr(g, 2, 1)} width={14} />
          <text
            x={scr(g, 2, 1).x + 30}
            y={scr(g, 2, 1).y - 16}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            2T(e₁) + T(e₂)
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 900,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 90),
          translate: riseIn(frame, c1 + 90, 16),
        }}
      >
        {tx.decided}
      </div>
    </SceneShell>
  );
};
