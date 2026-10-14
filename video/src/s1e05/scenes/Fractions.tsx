import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Pairs (p, q) of positive whole numbers on a grid. The class of (1, 2) is
// a ray through the corner; each other fraction is another ray. Allowing
// (0, 0) relates it to every pair, and all the rays glue into one blob.

const N = 8;
const CELL = 68;
const O = { x: 520, y: 790 };
const gx = (p: number) => O.x + p * CELL;
const gy = (q: number) => O.y - q * CELL;
const HALF = [1, 2, 3, 4]; // (k, 2k)
// Other classes, by their simplest pair, drawn as faint rays.
const OTHERS: [number, number][] = [
  [1, 1],
  [2, 1],
  [1, 3],
  [2, 3],
  [3, 2],
  [3, 1],
  [1, 4],
  [3, 4],
];
const PANEL_X = 1180;

// Where a ray from the corner through (p, q) leaves the grid.
const rayEnd = (p: number, q: number) => {
  const k = N / Math.max(p, q);
  return { x: gx(p * k), y: gy(q * k) };
};

export const Fractions: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fractions");
  const [c0, c1, c2, c3] = cues;
  const ray = ramp(frame, c1 + 4, 20);
  const halfAt = (i: number) => c1 + 10 + i * 10;
  const zero = Math.min(1, springIn(frame, c3 + 6, fps, 10));
  const glue = glide(frame, c3 + 50, fps, 24);
  const end = rayEnd(1, 2);

  return (
    <SceneShell id="fractions">
      <Sfx name="tick" at={c0 + 4} volume={0.2} />
      <Sfx name="page" at={c0 + 10} />
      <Sfx name="ding" at={c0 + 44} volume={0.25} />
      <Sfx name="scratch" at={c1 + 4} volume={0.22} />
      {HALF.map((_, i) => (
        <Sfx key={i} name={PLUCKS[i]} at={halfAt(i)} volume={0.28} />
      ))}
      <Sfx name="chime" at={c2 + 6} />
      {OTHERS.map((_, i) =>
        i % 2 === 0 ? (
          <Sfx key={`o${i}`} name="tick" at={c2 + 32 + i * 4} volume={0.15} />
        ) : null,
      )}
      <Sfx name="pop" at={c3 + 6} />
      <Sfx name="scratch" at={c3 + 16} volume={0.2} />
      <Sfx name="thud" at={c3 + 66} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* axes */}
          <g opacity={fadeIn(frame, c0 + 2)}>
            <line
              x1={O.x}
              y1={O.y}
              x2={gx(N) + 30}
              y2={O.y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            <line
              x1={O.x}
              y1={O.y}
              x2={O.x}
              y2={gy(N) - 30}
              stroke={colors.muted}
              strokeWidth={3}
            />
            <text
              x={gx(N) + 54}
              y={O.y + 10}
              fill={colors.muted}
              fontSize={34}
              fontFamily={fonts.math}
            >
              p
            </text>
            <text
              x={O.x - 12}
              y={gy(N) - 50}
              fill={colors.muted}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              q
            </text>
            {Array.from({ length: N }).map((_, k) => (
              <g key={k}>
                <text
                  x={gx(k + 1)}
                  y={O.y + 40}
                  fill={colors.muted}
                  fontSize={26}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k + 1}
                </text>
                <text
                  x={O.x - 30}
                  y={gy(k + 1) + 9}
                  fill={colors.muted}
                  fontSize={26}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k + 1}
                </text>
              </g>
            ))}
          </g>
          {/* other fractions: faint rays */}
          {OTHERS.map(([p, q], i) => {
            const e = rayEnd(p, q);
            const t = ramp(frame, c2 + 32 + i * 4, 14);
            return (
              <line
                key={`${p}/${q}`}
                x1={O.x}
                y1={O.y}
                x2={lerp(O.x, e.x, t)}
                y2={lerp(O.y, e.y, t)}
                stroke={alpha(colors.primary, 0.35)}
                strokeWidth={3}
                opacity={1 - glue}
              />
            );
          })}
          {/* the class of (1, 2) */}
          <line
            x1={O.x}
            y1={O.y}
            x2={lerp(O.x, end.x, ray)}
            y2={lerp(O.y, end.y, ray)}
            stroke={colors.primary}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={1 - glue}
          />
          {/* (0, 0) relates to everything */}
          <g opacity={fadeIn(frame, c3 + 16) * (1 - glue)}>
            {Array.from({ length: N * N }).map((_, i) => {
              const p = (i % N) + 1;
              const q = Math.floor(i / N) + 1;
              const t = ramp(frame, c3 + 16 + (p + q) * 1.5, 10);
              return (
                <line
                  key={i}
                  x1={O.x}
                  y1={O.y}
                  x2={lerp(O.x, gx(p), t)}
                  y2={lerp(O.y, gy(q), t)}
                  stroke={alpha(colors.red, 0.3)}
                  strokeWidth={2}
                />
              );
            })}
          </g>
          {/* grid points */}
          {Array.from({ length: N * N }).map((_, i) => {
            const p = (i % N) + 1;
            const q = Math.floor(i / N) + 1;
            const h = HALF.indexOf(p);
            const isHalf = q === 2 * p && h >= 0;
            const lit = isHalf
              ? Math.min(1, springIn(frame, halfAt(h), fps, 10))
              : 0;
            const x = lerp(gx(p), (O.x + gx(N)) / 2, glue * 0.55);
            const y = lerp(gy(q), (O.y + gy(N)) / 2, glue * 0.55);
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 4 + (p + q))}>
                <circle
                  cx={x}
                  cy={y}
                  r={6 + 8 * lit}
                  fill={
                    glue > 0
                      ? colors.red
                      : lit > 0
                        ? colors.primary
                        : alpha(colors.muted, 0.5)
                  }
                />
              </g>
            );
          })}
          {/* the one blob everything glues into */}
          <ellipse
            cx={(O.x + gx(N)) / 2}
            cy={(O.y + gy(N)) / 2}
            rx={170 * glue}
            ry={170 * glue}
            fill={alpha(colors.red, 0.08)}
            stroke={colors.red}
            strokeWidth={3}
            opacity={glue}
            transform={`translate(${shake(frame, c3 + 66, 10)} 0)`}
          />
          {/* (0, 0) */}
          <circle cx={O.x} cy={O.y} r={16 * zero} fill={colors.red} />
          <text
            x={O.x - 20}
            y={O.y + 60}
            fill={colors.red}
            fontSize={32}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={zero}
          >
            (0, 0)
          </text>
          {/* tags on the ray */}
          {[0, 1].map((h) => (
            <text
              key={h}
              x={gx(HALF[h]) + 24}
              y={gy(2 * HALF[h]) + 10}
              fill={colors.primary}
              fontSize={28}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, halfAt(h) + 4) * fadeOut(frame, c3, 10)}
            >
              ({HALF[h]}, {2 * HALF[h]})
            </text>
          ))}
          <text
            x={end.x + 30}
            y={end.y + 20}
            fill={colors.primary}
            fontSize={64}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c2 + 6) * (1 - glue)}
          >
            ½
          </text>
        </svg>

        {/* panel */}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 220,
            fontFamily: fonts.math,
            fontSize: 40,
            opacity: fadeIn(frame, c0 + 10),
            translate: riseIn(frame, c0 + 10, 20),
          }}
        >
          (p, q) ~ (r, s) ⇔ p·s = q·r
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 300,
            fontFamily: fonts.math,
            fontSize: 36,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 40) * fadeOut(frame, c2, 10),
          }}
        >
          (1, 2) ~ (2, 4): 1·4 = 2·2{" "}
          <span style={{ color: colors.green }}>✓</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 320,
            opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c2 + 10, 16),
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 44,
              color: colors.primary,
            }}
          >
            {tx.oneHalf}
          </div>
          <div style={{ fontFamily: fonts.math, fontSize: 38, marginTop: 10 }}>
            ½ = [(1, 2)]
          </div>
          <div style={{ fontFamily: fonts.math, fontSize: 34, marginTop: 6 }}>
            = {"{(1, 2), (2, 4), (3, 6), …}"}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 44,
              marginTop: 18,
              color: colors.highlight,
              opacity: fadeIn(frame, c2 + 24),
            }}
          >
            1/2 = 2/4
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 330,
            opacity: fadeIn(frame, c3 + 16),
            translate: riseIn(frame, c3 + 16, 16),
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 36,
              color: colors.muted,
            }}
          >
            (0, 0) ~ (p, q): 0·q = 0·p
          </div>
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 46,
              marginTop: 24,
              color: colors.red,
              opacity: fadeIn(frame, c3 + 66),
              translate: `${shake(frame, c3 + 66, 10)}px 0px`,
            }}
          >
            ✗ {tx.allGlued}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 48,
              marginTop: 24,
              color: colors.primary,
              opacity: fadeIn(frame, c3 + 84),
              translate: riseIn(frame, c3 + 84, 16),
            }}
          >
            {tx.denomZero}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
