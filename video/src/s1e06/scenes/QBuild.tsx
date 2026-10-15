import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, shake } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { at, LatticeGrid, type Lattice } from "../components/lattice";
import { useStrings } from "../i18n";

// ℚ from pairs (p, q) of integers, q ≠ 0. Each rational is a line through
// the centre; the row q = 0 is left out, because (0, 0) would glue every
// line into one. Inverses swap p and q: a mirror across the diagonal.

const L: Lattice = { ox: 620, oy: 470, cell: 52, min: -4, max: 4 };
const R = 4.6 * L.cell;
const PANEL_X = 1010;
// Directions of the lines drawn, in the order they sweep in.
const DIRS: [number, number][] = [
  [3, 2],
  [1, 1],
  [1, 2],
  [2, 1],
  [0, 1],
  [-1, 1],
  [1, 3],
  [-2, 1],
  [3, 1],
  [-1, 2],
  [2, 3],
];
const MAIN = 0; // 3/2

export const QBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("qBuild");
  const [c0, c1, c2, c3] = cues;
  const rayAt = (i: number) => c1 + 20 + i * 6;
  const glue = glide(frame, c2 + 36, fps, 20) - glide(frame, c2 + 100, fps, 20);
  const mirror = glide(frame, c3 + 26, fps, 22);
  const target = Math.atan2(2, 3);

  return (
    <SceneShell id="qBuild">
      <Sfx name="pop" at={c0 + 18} />
      <Sfx name="thud" at={c0 + 40} volume={0.3} />
      <Sfx name="page" at={c1 + 6} />
      {DIRS.map((_, i) =>
        i % 2 === 0 ? (
          <Sfx key={i} name="tick" at={rayAt(i)} volume={0.16} />
        ) : null,
      )}
      <Sfx name="scratch" at={c2 + 6} volume={0.22} />
      <Sfx name="thud" at={c2 + 54} />
      <Sfx name="whoosh" at={c2 + 100} volume={0.14} />
      <Sfx name="scratch" at={c3 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 26} volume={0.12} />
      <Sfx name="ding" at={c3 + 50} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <LatticeGrid
            l={L}
            labels={["p", "q"]}
            opacity={fadeIn(frame, c0 + 2)}
            dot={(p, q) =>
              (p === 3 && q === 2) || (p === -3 && q === -2)
                ? frame >= c0 + 18
                  ? colors.highlight
                  : undefined
                : q === 0 && frame >= c2 + 6
                  ? colors.red
                  : undefined
            }
            dotOpacity={(p, q) => (q === 0 && frame >= c2 + 6 ? 0.8 : 1)}
          />
          {/* the lines through the centre */}
          {DIRS.map(([p, q], i) => {
            const t = ramp(frame, rayAt(i), 10);
            const a = lerp(Math.atan2(q, p), target, Math.max(0, glue));
            const isMain = i === MAIN;
            return (
              <line
                key={`${p},${q}`}
                x1={L.ox - R * t * Math.cos(a)}
                y1={L.oy + R * t * Math.sin(a)}
                x2={L.ox + R * t * Math.cos(a)}
                y2={L.oy - R * t * Math.sin(a)}
                stroke={
                  glue > 0.05
                    ? colors.red
                    : isMain
                      ? colors.highlight
                      : alpha(colors.primary, 0.5)
                }
                strokeWidth={isMain ? 5 : 3}
                strokeLinecap="round"
                opacity={isMain ? 1 : 0.9}
              />
            );
          })}
          <text
            x={at(L, 3, 2).x + 20}
            y={at(L, 3, 2).y - 18}
            fill={colors.highlight}
            fontSize={32}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 22) * fadeOut(frame, c3, 10)}
          >
            (3, 2)
          </text>
          <text
            x={L.ox + R * Math.cos(target) + 16}
            y={L.oy - R * Math.sin(target)}
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, rayAt(0) + 8) * fadeOut(frame, c2 + 30, 8)}
          >
            3/2
          </text>
          {/* (0, 0) glows red while the lines glue */}
          <circle
            cx={L.ox}
            cy={L.oy}
            r={16}
            fill={colors.red}
            opacity={Math.max(0, glue)}
          />
          {/* inverse: mirror across p = q */}
          <g opacity={fadeIn(frame, c3 + 6)}>
            <line
              x1={L.ox - R * 0.7}
              y1={L.oy + R * 0.7}
              x2={L.ox + R * 0.7}
              y2={L.oy - R * 0.7}
              stroke={colors.muted}
              strokeWidth={3}
              strokeDasharray="10 8"
            />
            {(() => {
              const a = at(L, 2, 3);
              const b = at(L, 3, 2);
              const x = lerp(a.x, b.x, mirror);
              const y =
                lerp(a.y, b.y, mirror) - 40 * Math.sin(Math.PI * mirror);
              return (
                <>
                  <circle cx={a.x} cy={a.y} r={13} fill={colors.highlight} />
                  <circle cx={x} cy={y} r={13} fill={colors.orange} />
                  <text
                    x={a.x - 18}
                    y={a.y - 18}
                    fill={colors.highlight}
                    fontSize={30}
                    textAnchor="end"
                    fontFamily={fonts.math}
                  >
                    (2, 3)
                  </text>
                </>
              );
            })()}
          </g>
        </svg>

        {/* panel */}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 170,
            fontFamily: fonts.math,
            fontSize: 60,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 10),
          }}
        >
          3 ÷ 2 <span style={{ color: colors.muted }}>→</span>{" "}
          <span style={{ color: colors.highlight }}>(3, 2)</span>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 36,
              color: colors.red,
              marginTop: 10,
              opacity: fadeIn(frame, c0 + 40),
            }}
          >
            ✗ {tx.noIntAnswer}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 190,
            fontFamily: fonts.math,
            fontSize: 46,
            opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c1 + 6, 20),
          }}
        >
          (p, q) ~ (r, s) ⇔ p·s = q·r
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 300,
            opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c3, 10),
            translate: `${shake(frame, c2 + 54, 10)}px 0px`,
          }}
        >
          <div
            style={{ fontFamily: fonts.math, fontSize: 40, color: colors.red }}
          >
            {tx.zeroRowOut}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 36,
              color: colors.muted,
              marginTop: 14,
              opacity: fadeIn(frame, c2 + 24),
            }}
          >
            (0, 0) ~ (p, q): 0·q = 0·p
          </div>
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 44,
              color: colors.red,
              marginTop: 14,
              opacity: fadeIn(frame, c2 + 54),
            }}
          >
            ✗ {tx.allGlued}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 230,
            opacity: fadeIn(frame, c3 + 10),
            translate: riseIn(frame, c3 + 10, 20),
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 48,
              color: colors.orange,
            }}
          >
            {tx.inverse}
          </div>
          <div style={{ fontFamily: fonts.math, fontSize: 48, marginTop: 14 }}>
            (p, q)⁻¹ = (q, p)
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 48,
              marginTop: 18,
              color: colors.primary,
              opacity: fadeIn(frame, c3 + 50),
            }}
          >
            2/3 · 3/2 = 6/6 = 1
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
