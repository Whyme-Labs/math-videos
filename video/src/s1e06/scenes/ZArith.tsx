import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { lerp, ramp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { at, LatticeGrid, type Lattice } from "../components/lattice";
import { useStrings } from "../i18n";

// Adding integers as pairs: add the parts, which on the grid is placing one
// arrow after the other. Different representatives land on the same
// diagonal, and (3, 5) + (5, 3) lands on the diagonal of 0.

const L: Lattice = { ox: 300, oy: 800, cell: 60, min: 0, max: 8 };
const PANEL_X = 960;
type V = [number, number];

const diagLine = (d: number) => {
  const a0 = Math.max(0, d);
  const a1 = Math.min(L.max, L.max + d);
  return { p: at(L, a0, a0 - d), q: at(L, a1, a1 - d) };
};

const Arrow: React.FC<{
  readonly from: V;
  readonly by: V;
  readonly t: number;
  readonly color: string;
  readonly dashed?: boolean;
}> = ({ from, by, t, color, dashed }) => {
  if (t <= 0) return null;
  const p = at(L, from[0], from[1]);
  const q = at(L, from[0] + by[0], from[1] + by[1]);
  const x = lerp(p.x, q.x, t);
  const y = lerp(p.y, q.y, t);
  const ang = Math.atan2(q.y - p.y, q.x - p.x);
  const h = 16;
  return (
    <g>
      <line
        x1={p.x}
        y1={p.y}
        x2={x}
        y2={y}
        stroke={color}
        strokeWidth={5}
        strokeDasharray={dashed ? "10 8" : undefined}
        strokeLinecap="round"
      />
      <polygon
        points={`${x},${y} ${x - h * Math.cos(ang - 0.45)},${y - h * Math.sin(ang - 0.45)} ${x - h * Math.cos(ang + 0.45)},${y - h * Math.sin(ang + 0.45)}`}
        fill={color}
      />
    </g>
  );
};

const Diag: React.FC<{
  readonly d: number;
  readonly t: number;
  readonly color: string;
  readonly name: string;
}> = ({ d, t, color, name }) => {
  const { p, q } = diagLine(d);
  return (
    <g opacity={t}>
      <line
        x1={p.x}
        y1={p.y}
        x2={q.x}
        y2={q.y}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.8}
      />
      <text
        x={q.x + (d >= 0 ? 22 : 0)}
        y={q.y + (d >= 0 ? 10 : -22)}
        fill={color}
        fontSize={34}
        textAnchor={d >= 0 ? "start" : "middle"}
        fontFamily={fonts.math}
      >
        {name}
      </text>
    </g>
  );
};

export const ZArith: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("zArith");
  const [c0, c1, c2] = cues;
  const out01 = fadeOut(frame, c2, 12);

  const sumRow = (
    text: React.ReactNode,
    start: number,
    top: number,
    out = 1,
  ) => (
    <div
      style={{
        position: "absolute",
        left: PANEL_X,
        top,
        fontFamily: fonts.math,
        fontSize: 44,
        opacity: fadeIn(frame, start) * out,
        translate: riseIn(frame, start, 16),
      }}
    >
      {text}
    </div>
  );

  return (
    <SceneShell id="zArith">
      <Sfx name="scratch" at={c0 + 26} volume={0.2} />
      <Sfx name="scratch" at={c0 + 50} volume={0.2} />
      <Sfx name="pop" at={c0 + 68} />
      <Sfx name="chime" at={c1 + 6} />
      <Sfx name="scratch" at={c1 + 26} volume={0.18} />
      <Sfx name="ding" at={c1 + 62} />
      <Sfx name="scratch" at={c2 + 14} volume={0.18} />
      <Sfx name="ding" at={c2 + 50} />
      <Sfx name="sparkle" at={c2 + 64} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <LatticeGrid l={L} opacity={fadeIn(frame, c0 + 2)} />
          <Diag
            d={-1}
            t={fadeIn(frame, c1 + 6) * out01}
            color={colors.green}
            name="−1"
          />
          <Diag
            d={0}
            t={fadeIn(frame, c2 + 44)}
            color={colors.green}
            name="0"
          />
          {/* −5 + 4 as (2, 7) + (5, 1) */}
          <g opacity={out01}>
            <Arrow
              from={[0, 0]}
              by={[2, 7]}
              t={ramp(frame, c0 + 26, 16)}
              color={colors.highlight}
            />
            <Arrow
              from={[2, 7]}
              by={[5, 1]}
              t={ramp(frame, c0 + 50, 14)}
              color={colors.orange}
            />
            {/* (0, 5) + (4, 0) */}
            <Arrow
              from={[0, 0]}
              by={[0, 5]}
              t={ramp(frame, c1 + 26, 14)}
              color={alpha(colors.highlight, 0.7)}
              dashed
            />
            <Arrow
              from={[0, 5]}
              by={[4, 0]}
              t={ramp(frame, c1 + 44, 14)}
              color={alpha(colors.orange, 0.7)}
              dashed
            />
            {[
              { p: [7, 8] as V, at: c0 + 66 },
              { p: [4, 5] as V, at: c1 + 60 },
            ].map(({ p, at: s }) => (
              <circle
                key={p.join()}
                cx={at(L, p[0], p[1]).x}
                cy={at(L, p[0], p[1]).y}
                r={14}
                fill={colors.green}
                opacity={fadeIn(frame, s, 8)}
              />
            ))}
          </g>
          {/* (3, 5) + (5, 3) = (8, 8) */}
          <Arrow
            from={[0, 0]}
            by={[3, 5]}
            t={ramp(frame, c2 + 14, 14)}
            color={colors.highlight}
          />
          <Arrow
            from={[3, 5]}
            by={[5, 3]}
            t={ramp(frame, c2 + 30, 14)}
            color={colors.primary}
          />
          <circle
            cx={at(L, 8, 8).x}
            cy={at(L, 8, 8).y}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c2 + 46, 8)}
          />
        </svg>

        {sumRow(
          <>
            −5 + 4 = <span style={{ color: colors.highlight }}>(2, 7)</span> +{" "}
            <span style={{ color: colors.orange }}>(5, 1)</span> = (7, 8)
          </>,
          c0 + 10,
          200,
          out01,
        )}
        {sumRow(
          <span style={{ color: colors.green }}>(7, 8) ~ (0, 1) = −1</span>,
          c0 + 66,
          270,
          out01,
        )}
        {sumRow(
          <span style={{ color: colors.muted }}>
            (0, 5) + (4, 0) = (4, 5) ~ (0, 1)
          </span>,
          c1 + 30,
          360,
          out01,
        )}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 440,
            fontSize: 40,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 62) * out01,
            translate: riseIn(frame, c1 + 62, 16),
          }}
        >
          ✓ {tx.sameLine}
        </div>
        {sumRow(
          <>
            <span style={{ color: colors.highlight }}>(3, 5)</span> +{" "}
            <span style={{ color: colors.primary }}>(5, 3)</span> = (8, 8) ~ (0,
            0) = 0
          </>,
          c2 + 10,
          240,
        )}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 330,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 30),
          }}
        >
          [a, b] + [b, a] = [0, 0]
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 430,
            fontSize: 46,
            fontFamily: fonts.title,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 50),
            translate: riseIn(frame, c2 + 50, 16),
          }}
        >
          {tx.opposite}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
