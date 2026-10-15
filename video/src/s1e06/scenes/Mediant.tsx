import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { lerp, ramp, shake } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { at, LatticeGrid, type Lattice } from "../components/lattice";
import { useStrings } from "../i18n";

// The mediant: add tops and bottoms. Two names for 1/2 (same line) give two
// answers on two different lines, so it isn't an operation on numbers.

const L: Lattice = { ox: 1080, oy: 790, cell: 74, min: 0, max: 7 };
const PANEL_X = 150;

// A line from the corner through (p, q), to the top or right edge.
const rayEnd = (p: number, q: number) => {
  const k = (L.max + 0.3) / Math.max(p, q);
  return at(L, p * k, q * k);
};

const Ray: React.FC<{
  readonly p: number;
  readonly q: number;
  readonly t: number;
  readonly color: string;
  readonly name: string;
  readonly dx?: number;
}> = ({ p, q, t, color, name, dx = 0 }) => {
  const e = rayEnd(p, q);
  return (
    <g>
      <line
        x1={L.ox}
        y1={L.oy}
        x2={lerp(L.ox, e.x, t)}
        y2={lerp(L.oy, e.y, t)}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <text
        x={e.x + dx}
        y={e.y - 14}
        fill={color}
        fontSize={34}
        textAnchor="middle"
        fontFamily={fonts.math}
        opacity={t >= 1 ? 1 : 0}
      >
        {name}
      </text>
    </g>
  );
};

export const Mediant: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("mediant");
  const [c0, c1, c2] = cues;
  const failAt = c2 + 30;

  const row = (
    text: React.ReactNode,
    start: number,
    top: number,
    size = 52,
  ) => (
    <div
      style={{
        position: "absolute",
        left: PANEL_X,
        top,
        fontFamily: fonts.math,
        fontSize: size,
        opacity: fadeIn(frame, start),
        translate: riseIn(frame, start, 16),
      }}
    >
      {text}
    </div>
  );
  const pt = (p: number, q: number, color: string, start: number) => (
    <circle
      cx={at(L, p, q).x}
      cy={at(L, p, q).y}
      r={12}
      fill={color}
      opacity={fadeIn(frame, start, 8)}
    />
  );

  return (
    <SceneShell id="mediant">
      <Sfx name="page" at={c0 + 6} />
      <Sfx name="scratch" at={c0 + 30} volume={0.18} />
      <Sfx name="scratch" at={c0 + 50} volume={0.18} />
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="scratch" at={c1 + 20} volume={0.2} />
      <Sfx name="pop" at={c1 + 44} />
      <Sfx name="scratch" at={c1 + 60} volume={0.2} />
      <Sfx name="tick" at={c2 + 8} />
      <Sfx name="thud" at={failAt} />
      <QuestionTray />

      <AbsoluteFill>
        {row(
          <>
            p/q <span style={{ color: colors.orange }}>⊕</span> r/s = (p + r)/(q
            + s)
          </>,
          c0 + 6,
          160,
        )}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 240,
            fontSize: 36,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 20),
          }}
        >
          {tx.mediantName}
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 330,
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 64) * fadeOut(frame, c1, 10),
          }}
        >
          1/1 ⊕ 1/2 = 2/3
        </div>
        {row(
          <>
            <span style={{ color: colors.highlight }}>1/2</span> ⊕ 1/3 ={" "}
            <span style={{ color: colors.primary }}>2/5</span>
          </>,
          c1 + 6,
          340,
        )}
        {row(
          <>
            <span style={{ color: colors.highlight }}>2/4</span> ⊕ 1/3 ={" "}
            <span style={{ color: colors.orange }}>3/7</span>
          </>,
          c1 + 44,
          420,
        )}
        {row(
          <span style={{ color: colors.muted }}>2·7 = 14 ≠ 15 = 5·3</span>,
          c2 + 6,
          520,
          40,
        )}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 600,
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.red,
            opacity: fadeIn(frame, failAt),
            translate: `${shake(frame, failAt, 12)}px 0px`,
          }}
        >
          ✗ {tx.notWellDefined}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <LatticeGrid
            l={L}
            labels={["p", "q"]}
            opacity={fadeIn(frame, c0 + 4)}
          />
          <Ray
            p={1}
            q={2}
            t={ramp(frame, c1 + 30, 14)}
            color={alpha(colors.highlight, 0.8)}
            name="1/2"
            dx={44}
          />
          <Ray
            p={2}
            q={5}
            t={ramp(frame, c1 + 20, 14)}
            color={colors.primary}
            name="2/5"
            dx={-34}
          />
          <Ray
            p={3}
            q={7}
            t={ramp(frame, c1 + 60, 14)}
            color={colors.orange}
            name="3/7"
            dx={0}
          />
          {/* adding tops and bottoms is adding arrows: (1, 1) + (1, 2) = (2, 3) */}
          <g opacity={fadeIn(frame, c0 + 30) * (1 - fadeIn(frame, c1, 10))}>
            {[
              { a: [0, 0], b: [1, 1], s: c0 + 30 },
              { a: [1, 1], b: [2, 3], s: c0 + 50 },
            ].map(({ a, b, s: st }) => {
              const p0 = at(L, a[0], a[1]);
              const p1 = at(L, b[0], b[1]);
              const t = ramp(frame, st, 14);
              return (
                <line
                  key={st}
                  x1={p0.x}
                  y1={p0.y}
                  x2={lerp(p0.x, p1.x, t)}
                  y2={lerp(p0.y, p1.y, t)}
                  stroke={colors.muted}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              );
            })}
            {pt(2, 3, colors.text, c0 + 64)}
          </g>
          {pt(1, 2, colors.highlight, c1 + 6)}
          {pt(1, 3, colors.text, c1 + 6)}
          {pt(2, 5, colors.primary, c1 + 20)}
          {pt(2, 4, colors.highlight, c1 + 44)}
          {pt(3, 7, colors.orange, c1 + 60)}
          {/* two outputs, two different lines */}
          <circle
            cx={(rayEnd(2, 5).x + rayEnd(3, 7).x) / 2}
            cy={rayEnd(2, 5).y + 6}
            r={46}
            fill="none"
            stroke={colors.red}
            strokeWidth={4}
            opacity={fadeIn(frame, failAt)}
          />
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
