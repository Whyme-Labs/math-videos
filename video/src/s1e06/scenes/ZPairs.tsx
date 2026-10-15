import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, ramp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { at, LatticeGrid, type Lattice } from "../components/lattice";
import { useStrings } from "../i18n";

// The key visual for ℤ: pairs (a, b) of natural numbers on a grid. Pairs
// that "should" give the same difference lie on one diagonal; each diagonal
// is one integer, and the diagonals collapse onto the number line.

const L: Lattice = { ox: 300, oy: 810, cell: 76, min: 0, max: 7 };
const PANEL_X = 1010;
const MINUS2: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
];
const MORE: [number, number][] = [
  [4, 6],
  [5, 7],
];
const D = Array.from({ length: 15 }, (_, k) => k - 7); // a − b
const NL_Y = 470;
const nlX = (d: number) => 960 + d * 100;
const label = (d: number) => (d < 0 ? `−${-d}` : `${d}`);

// End points of the diagonal a − b = d inside the grid.
const diag = (d: number) => {
  const a0 = Math.max(0, d);
  const a1 = Math.min(L.max, L.max + d);
  return { p: at(L, a0, a0 - d), q: at(L, a1, a1 - d) };
};

export const ZPairs: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zPairs");
  const [c0, c1, c2, c3, c4] = cues;
  const litAt = (a: number, b: number) => {
    if (a === 3 && b === 5) return c0 + 16;
    const i = MINUS2.findIndex(([x, y]) => x === a && y === b);
    if (i >= 0) return c1 + 6 + i * 12;
    const j = MORE.findIndex(([x, y]) => x === a && y === b);
    if (j >= 0) return c1 + 48 + j * 8;
    return Infinity;
  };
  const otherAt = (d: number) => c3 + 30 + Math.abs(d + 2) * 3;
  const collapse = (d: number) =>
    glide(frame, c4 + 4 + Math.abs(d) * 2, fps, 24);
  const panelOut = fadeOut(frame, c4, 12);
  const stepAt = (k: number) => c4 + 56 + k * 10;

  return (
    <SceneShell id="zPairs">
      <Sfx name="pop" at={c0 + 16} />
      {MINUS2.map((_, i) => (
        <Sfx key={i} name={PLUCKS[i]} at={c1 + 6 + i * 12} volume={0.28} />
      ))}
      <Sfx name="tick" at={c1 + 48} />
      <Sfx name="tick" at={c1 + 56} />
      <Sfx name="page" at={c2 + 6} />
      <Sfx name="ding" at={c2 + 30} />
      <Sfx name="scratch" at={c3 + 4} />
      <Sfx name="chime" at={c3 + 22} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.18} />
      <Sfx name="sparkle" at={c4 + 34} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx
          key={`h${k}`}
          name={PLUCKS[4 - k]}
          at={c4 + 65 + k * 10}
          volume={0.2}
        />
      ))}
      <Sfx name="ding" at={c4 + 106} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <LatticeGrid
            l={L}
            opacity={fadeIn(frame, c0 + 2) * fadeOut(frame, c4 + 4, 12)}
          />
          {/* diagonals */}
          {D.map((d) => {
            const { p, q } = diag(d);
            const isM2 = d === -2;
            const t = isM2
              ? ramp(frame, c3 + 4, 16)
              : ramp(frame, otherAt(d), 10);
            const c = collapse(d);
            return (
              <line
                key={d}
                x1={lerp(p.x, nlX(d), c)}
                y1={lerp(p.y, NL_Y, c)}
                x2={lerp(lerp(p.x, q.x, t), nlX(d), c)}
                y2={lerp(lerp(p.y, q.y, t), NL_Y, c)}
                stroke={isM2 ? colors.highlight : alpha(colors.primary, 0.55)}
                strokeWidth={isM2 ? 7 : 4}
                strokeLinecap="round"
              />
            );
          })}
          {/* diagonal names, at the top-left end of each line */}
          {D.map((d) => {
            const { q } = diag(d);
            const isM2 = d === -2;
            const show = isM2
              ? fadeIn(frame, c3 + 18)
              : fadeIn(frame, otherAt(d) + 8);
            const off = d >= 0 ? { x: 22, y: 0 } : { x: 0, y: -26 };
            return (
              <text
                key={`l${d}`}
                x={q.x + off.x}
                y={q.y + off.y + 8}
                fill={isM2 ? colors.highlight : colors.primary}
                fontSize={isM2 ? 34 : 26}
                textAnchor={d >= 0 ? "start" : "middle"}
                fontFamily={fonts.math}
                opacity={show * panelOut}
              >
                {label(d)}
              </text>
            );
          })}
          {/* lit pairs, which also collapse */}
          {Array.from({ length: 64 }).map((_, i) => {
            const a = i % 8;
            const b = Math.floor(i / 8);
            const d = a - b;
            const lit = litAt(a, b);
            const p = at(L, a, b);
            const c = collapse(d);
            const on = frame >= lit || frame >= c4;
            if (!on) return null;
            return (
              <circle
                key={i}
                cx={lerp(p.x, nlX(d), c)}
                cy={lerp(p.y, NL_Y, c)}
                r={frame >= lit ? 12 : 8 * c}
                fill={d === -2 ? colors.highlight : colors.primary}
              />
            );
          })}
          <text
            x={at(L, 3, 5).x + 22}
            y={at(L, 3, 5).y - 16}
            fill={colors.highlight}
            fontSize={30}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c3, 10)}
          >
            (3, 5)
          </text>
          {/* (3, 5): three along, five up */}
          <g opacity={fadeIn(frame, c0 + 30) * fadeOut(frame, c1 + 40, 10)}>
            <line
              x1={at(L, 3, 5).x}
              y1={at(L, 3, 5).y}
              x2={at(L, 3, 0).x}
              y2={L.oy}
              stroke={colors.highlight}
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            <line
              x1={at(L, 3, 5).x}
              y1={at(L, 3, 5).y}
              x2={L.ox}
              y2={at(L, 0, 5).y}
              stroke={colors.highlight}
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            <circle
              cx={at(L, 3, 0).x}
              cy={L.oy}
              r={10}
              fill={colors.highlight}
            />
            <circle
              cx={L.ox}
              cy={at(L, 0, 5).y}
              r={10}
              fill={colors.highlight}
            />
          </g>
          {/* 3 − 5 on the new line: five steps left from 3 land on −2 */}
          {(() => {
            const k = Math.min(
              4,
              Math.max(0, Math.floor((frame - stepAt(0)) / 10)),
            );
            const t = ramp(frame, stepAt(k), 9);
            const p = hop(t, nlX(3 - k), NL_Y - 30, nlX(2 - k), NL_Y - 30, 44);
            return (
              <circle
                cx={frame < stepAt(0) ? nlX(3) : p.x}
                cy={frame < stepAt(0) ? NL_Y - 30 : p.y}
                r={14}
                fill={colors.highlight}
                opacity={fadeIn(frame, stepAt(0) - 8)}
              />
            );
          })()}
          <text
            x={nlX(-2)}
            y={NL_Y - 80}
            fill={colors.highlight}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, stepAt(4) + 10)}
          >
            3 − 5 = −2
          </text>
          {/* the number line the diagonals become */}
          <g opacity={fadeIn(frame, c4 + 30)}>
            <line
              x1={nlX(-7) - 50}
              y1={NL_Y}
              x2={nlX(7) + 50}
              y2={NL_Y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {D.map((d) => (
              <text
                key={d}
                x={nlX(d)}
                y={NL_Y + 60}
                fill={d === -2 ? colors.highlight : colors.text}
                fontSize={36}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {label(d)}
              </text>
            ))}
            <text
              x={960}
              y={NL_Y - 70}
              fill={colors.primary}
              fontSize={72}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              ℤ
            </text>
          </g>
        </svg>

        {/* panel */}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 190,
            fontFamily: fonts.math,
            fontSize: 64,
            opacity: fadeIn(frame, c0 + 20) * panelOut,
            translate: riseIn(frame, c0 + 20, 20),
          }}
        >
          3 − 5 <span style={{ color: colors.muted }}>→</span>{" "}
          <span style={{ color: colors.highlight }}>(3, 5)</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 290,
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.highlight,
            display: "flex",
            gap: 30,
            opacity: panelOut,
          }}
        >
          {MINUS2.map(([a, b], i) => (
            <span key={a} style={{ opacity: fadeIn(frame, c1 + 6 + i * 12) }}>
              {a} − {b}
            </span>
          ))}
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 34,
              opacity: fadeIn(frame, c1 + 44),
            }}
          >
            = {tx.same}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 400,
            opacity: fadeIn(frame, c2 + 6) * panelOut,
            translate: riseIn(frame, c2 + 6, 20),
          }}
        >
          <div style={{ fontFamily: fonts.math, fontSize: 46 }}>
            (a, b) ~ (c, d) ⇔ a + d = b + c
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 38,
              marginTop: 16,
              color: colors.muted,
              opacity: fadeIn(frame, c2 + 30),
            }}
          >
            (3, 5) ~ (0, 2): 3 + 2 = 5 + 0{" "}
            <span style={{ color: colors.green }}>✓</span>
          </div>
          <div
            style={{
              fontSize: 34,
              marginTop: 16,
              color: colors.primary,
              opacity: fadeIn(frame, c2 + 44),
            }}
          >
            {tx.onlyPlus}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 640,
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 22) * panelOut,
            translate: riseIn(frame, c3 + 22, 20),
          }}
        >
          {tx.theLine}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
