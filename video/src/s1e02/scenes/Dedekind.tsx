import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { NextArrow } from "../components/graph";
import { World, type WorldKind } from "../components/worlds";
import { useStrings } from "../i18n";

const N = 7;
const R = 42;
const TOP = 250;
const BOTTOM = 600;
const MID = 430;
const x = (i: number) => 260 + i * 225;
const RECAP: WorldKind[] = ["loop", "merge", "ghosts"];
const recapX = (i: number) => 330 + i * 430;
const RECAP_Y = 300;

// Number i written as i dots (top world) or i tally marks (bottom world).
const Dots: React.FC<{ readonly n: number }> = ({ n }) => (
  <>
    {Array.from({ length: n }).map((_, k) => {
      const row = Math.floor(k / 3);
      const col = k % 3;
      const inRow = Math.min(3, n - row * 3);
      return (
        <circle
          key={k}
          cx={(col - (inRow - 1) / 2) * 18}
          cy={(row - (Math.ceil(n / 3) - 1) / 2) * 18}
          r={6}
          fill={colors.primary}
        />
      );
    })}
  </>
);

const Tally: React.FC<{ readonly n: number }> = ({ n }) => (
  <g stroke={colors.orange} strokeWidth={4} strokeLinecap="round">
    {Array.from({ length: Math.min(4, n) }).map((_, k) => (
      <line key={k} x1={-15 + k * 10} y1={-16} x2={-15 + k * 10} y2={16} />
    ))}
    {n >= 5 ? <line x1={-22} y1={12} x2={22} y2={-12} /> : null}
    {n === 6 ? <line x1={26} y1={-16} x2={26} y2={16} /> : null}
  </g>
);

const Node: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly scale: number;
  readonly children: React.ReactNode;
}> = ({ x: cx, y, color, scale, children }) => (
  <g transform={`translate(${cx} ${y}) scale(${scale})`}>
    <circle r={R} fill={alpha(color, 0.14)} stroke={color} strokeWidth={3} />
    {children}
  </g>
);

export const Dedekind: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("dedekind");
  const [c0, c1, c2, c3, c4] = cues;

  const topIn = (i: number) => springIn(frame, c1 + 4 + i * 5, fps, 12);
  const botIn = (i: number) => springIn(frame, c1 + 34 + i * 5, fps, 12);
  const thread = (i: number) => ramp(frame, c2 + 8 + i * 12, 10);
  const merge = glide(frame, c4 + 4, fps, 26);
  const topY = lerp(TOP, MID, merge);
  const botY = lerp(BOTTOM, MID, merge);
  const digits = ramp(frame, c4 + 26, 12);
  const solveAt = c0 + 70;
  const unknownSolved = frame >= solveAt ? 1 : 0;
  const recapOut = fadeOut(frame, c1 - 2, 10);
  const countStart = c4 + 60;

  return (
    <SceneShell id="dedekind">
      {RECAP.map((k, w) => (
        <Sfx key={k} name="thud" at={c0 + 16 + w * 6} volume={0.18} />
      ))}
      <Sfx name="pop" at={c0 + 30} volume={0.25} />
      <Sfx name="ding" at={c0 + 70} />
      {Array.from({ length: N - 1 }).map((_, k) => (
        <Sfx
          key={`c${k}`}
          name="tick"
          at={c4 + 60 + (k + 1) * 8}
          volume={0.12}
        />
      ))}
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={`t${i}`} name="tick" at={c1 + 4 + i * 5} volume={0.12} />
      ))}
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={`b${i}`} name="scratch" at={c1 + 34 + i * 5} volume={0.12} />
      ))}
      {Array.from({ length: N }).map((_, i) => (
        <Sfx
          key={`p${i}`}
          name={PLUCKS[Math.min(5, i)]}
          at={c2 + 14 + i * 12}
          volume={0.26}
        />
      ))}
      <Sfx name="ding" at={c3 + 6} />
      <Sfx name="whoosh" at={c4 + 4} />
      <Sfx name="sparkle" at={c4 + 30} />
      <QuestionTray />

      <AbsoluteFill>
        {/* Recap: the three broken worlds are out. Is there a fourth? */}
        <AbsoluteFill style={{ opacity: recapOut }}>
          <svg width={1920} height={890} style={{ position: "absolute" }}>
            {RECAP.map((kind, w) => {
              const drop = springIn(frame, c0 + 2 + w * 5, fps, 12);
              return (
                <World
                  key={kind}
                  kind={kind}
                  x={recapX(w)}
                  y={RECAP_Y - (1 - Math.min(1, drop)) * 300}
                  scale={0.72}
                  title={tx.worlds[w]}
                  frame={frame}
                  opacity={Math.min(1, drop) * 0.7}
                  broken={1}
                  verdict={springIn(frame, c0 + 14 + w * 6, fps, 9)}
                />
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              left: recapX(3) - 194,
              top: RECAP_Y - 119,
              width: 389,
              height: 238,
              borderRadius: 18,
              border: `3px dashed ${unknownSolved > 0.5 ? colors.green : colors.highlight}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              fontFamily: fonts.title,
              fontWeight: 700,
              color: unknownSolved > 0.5 ? colors.green : colors.highlight,
              opacity: fadeIn(frame, c0 + 30),
              scale:
                springIn(frame, c0 + 30, fps, 10) *
                (1 + 0.12 * Math.sin(Math.PI * ramp(frame, solveAt, 10))),
            }}
          >
            {unknownSolved > 0.5 ? "✓" : "?"}
          </div>
          <div
            style={{
              position: "absolute",
              top: RECAP_Y + 180,
              width: "100%",
              textAlign: "center",
              fontSize: 44,
              fontFamily: fonts.title,
              color: colors.text,
              opacity: fadeIn(frame, solveAt + 4),
              translate: riseIn(frame, solveAt + 4),
            }}
          >
            {tx.dedekindTag}
          </div>
        </AbsoluteFill>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Threads: zero to zero, next to next. */}
          {Array.from({ length: N }).map((_, i) => {
            const t = thread(i);
            if (t <= 0) return null;
            return (
              <line
                key={i}
                x1={x(i)}
                y1={topY + R}
                x2={x(i)}
                y2={lerp(topY + R, botY - R, t)}
                stroke={frame >= c3 ? colors.green : colors.highlight}
                strokeWidth={4}
                strokeDasharray="6 8"
                opacity={1 - merge}
              />
            );
          })}

          {/* Bottom world: tally marks (fades out as the two become one). */}
          <g opacity={1 - ramp(frame, c4 + 16, 10)}>
            {Array.from({ length: N }).map((_, i) => (
              <g key={i}>
                {i > 0 ? (
                  <NextArrow
                    a={{ x: x(i - 1), y: botY }}
                    b={{ x: x(i), y: botY }}
                    r={R}
                    progress={Math.min(1, botIn(i))}
                    color={colors.orange}
                  />
                ) : null}
                <Node
                  x={x(i)}
                  y={botY}
                  color={colors.orange}
                  scale={Math.min(1, botIn(i))}
                >
                  <Tally n={i} />
                </Node>
              </g>
            ))}
          </g>

          {/* Top world: dots, which turn into plain numerals once merged. */}
          {Array.from({ length: N }).map((_, i) => (
            <g key={i}>
              {i > 0 ? (
                <NextArrow
                  a={{ x: x(i - 1), y: topY }}
                  b={{ x: x(i), y: topY }}
                  r={R}
                  progress={Math.min(1, topIn(i))}
                />
              ) : null}
              <Node
                x={x(i)}
                y={topY}
                color={colors.primary}
                scale={
                  Math.min(1, topIn(i)) * (1 + 0.1 * digits * (1 - digits) * 4)
                }
              >
                <g opacity={1 - digits}>
                  <Dots n={i} />
                </g>
                <text
                  y={13}
                  fill={colors.primary}
                  fontSize={38}
                  fontFamily={fonts.math}
                  textAnchor="middle"
                  opacity={digits}
                >
                  {i}
                </text>
              </Node>
            </g>
          ))}
          <text
            x={x(N - 1) + 80}
            y={topY + 12}
            fill={colors.muted}
            fontSize={40}
            opacity={fadeIn(frame, c1 + 40)}
          >
            …
          </text>
          <text
            x={x(N - 1) + 80}
            y={botY + 12}
            fill={colors.muted}
            fontSize={40}
            opacity={fadeIn(frame, c1 + 70) * (1 - merge)}
          >
            …
          </text>

          {/* Count along ℕ once it stands alone. */}
          {frame >= countStart
            ? (() => {
                const k = Math.min(N - 1, Math.floor((frame - countStart) / 8));
                const t = ramp(frame, countStart + k * 8, 6);
                const p =
                  k === 0
                    ? { x: x(0), y: MID - 76 }
                    : hop(t, x(k - 1), MID - 76, x(k), MID - 76, 40);
                return (
                  <g opacity={fadeIn(frame, countStart, 6)}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={22}
                      fill={alpha(colors.primary, 0.25)}
                    />
                    <circle cx={p.x} cy={p.y} r={10} fill={colors.primary} />
                  </g>
                );
              })()
            : null}

          {/* ℕ */}
          <text
            x={110}
            y={MID + 34}
            fill={colors.primary}
            fontSize={110}
            fontFamily={fonts.math}
            textAnchor="middle"
            opacity={fadeIn(frame, c4 + 30)}
          >
            ℕ
          </text>
        </svg>

        {/* World labels */}
        <div
          style={{
            position: "absolute",
            left: x(0) - R,
            top: TOP - R - 56,
            fontSize: 30,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 10) * (1 - merge),
          }}
        >
          {tx.dots}
        </div>
        <div
          style={{
            position: "absolute",
            left: x(0) - R,
            top: BOTTOM + R + 18,
            fontSize: 30,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 40) * (1 - merge),
          }}
        >
          {tx.tallies}
        </div>
        <div
          style={{
            position: "absolute",
            right: 120,
            top: TOP - R - 56,
            fontSize: 28,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 30) * (1 - merge),
          }}
        >
          {tx.cupsCallback}
        </div>
        <div
          style={{
            position: "absolute",
            top: 760,
            width: "100%",
            textAlign: "center",
            fontSize: 38,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 6) * (1 - merge),
            translate: riseIn(frame, c3 + 6),
          }}
        >
          ✓ {tx.perfectMatch}
        </div>
        <div
          style={{
            position: "absolute",
            top: MID + 90,
            width: "100%",
            textAlign: "center",
            fontSize: 56,
            fontFamily: fonts.title,
            color: colors.primary,
            opacity: fadeIn(frame, c4 + 34),
            translate: riseIn(frame, c4 + 34),
            scale: interpolate(
              springIn(frame, c4 + 34, fps, 10),
              [0, 1],
              [0.8, 1],
            ),
          }}
        >
          {tx.naturals}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
