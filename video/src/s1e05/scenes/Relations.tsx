import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/pieces";
import { useStrings } from "../i18n";

// A relation on {0, …, 8} drawn as the grid A × A: row a, column b lights up
// when a ~ b. Reflexive lights the diagonal, symmetric mirrors across it,
// transitive forces a third dot. The pattern that fills in is
// "same remainder ÷ 3".

const N = 9;
const CELL = 54;
const X0 = 500;
const Y0 = 230;
const dotX = (b: number) => X0 + b * CELL;
const dotY = (a: number) => Y0 + a * CELL;
const SAMPLES: [number, number][] = [
  [1, 4],
  [2, 8],
  [5, 2],
];
const PANEL_X = 1090;
const ROW_Y = [300, 400, 500];

export const Relations: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("relations");
  const [c0, c1, c2, c3, c4] = cues;
  const sampleAt = (i: number) => c0 + 30 + i * 8;
  const mirrorAt = (i: number) => c2 + 16 + i * 6;
  // Frame at which dot (a, b) lights up.
  const lightAt = (a: number, b: number): number => {
    const s = SAMPLES.findIndex(([p, q]) => p === a && q === b);
    if (s >= 0) return sampleAt(s);
    if (a === b) return c1 + 4 + a * 4;
    const m = SAMPLES.findIndex(([p, q]) => p === b && q === a);
    if (m >= 0) return mirrorAt(m) + 16;
    if ((a === 0 && b === 3) || (a === 3 && b === 0)) return c3 + 4;
    if ((a === 3 && b === 6) || (a === 6 && b === 3)) return c3 + 12;
    if (a === 0 && b === 6) return c3 + 40;
    if (a === 6 && b === 0) return c3 + 46;
    if (a % 3 === b % 3) return c4 + 4 + a * 3;
    return Infinity;
  };
  const rows = [
    { name: tx.reflexive, math: "a ~ a", at: c1 + 4 },
    { name: tx.symmetric, math: "a ~ b ⇒ b ~ a", at: c2 + 4 },
    { name: tx.transitive, math: "a ~ b, b ~ c ⇒ a ~ c", at: c3 + 4 },
  ];
  const chain = [0, 3, 6];
  // Last line: the three classes {0,3,6}, {1,4,7}, {2,5,8} light up in turn.
  const classAt = (k: number) => c4 + 50 + k * 20;
  const classLit = (a: number, b: number) =>
    a % 3 === b % 3 && frame >= classAt(a % 3) && frame < classAt(a % 3) + 22;
  const chainX = (i: number) => PANEL_X + 110 + i * 200;
  const CHAIN_Y = 650;

  return (
    <SceneShell id="relations">
      <Sfx name="tick" at={c0 + 6} volume={0.18} />
      {SAMPLES.map((_, i) => (
        <Sfx key={`s${i}`} name="pop" at={sampleAt(i)} volume={0.25} />
      ))}
      {[0, 2, 4, 6, 8].map((i) => (
        <Sfx key={`d${i}`} name="tick" at={c1 + 4 + i * 4} volume={0.2} />
      ))}
      <Sfx name="scratch" at={c2 + 4} volume={0.2} />
      {SAMPLES.map((_, i) => (
        <Sfx
          key={`m${i}`}
          name={PLUCKS[i]}
          at={mirrorAt(i) + 16}
          volume={0.25}
        />
      ))}
      <Sfx name="pop" at={c3 + 4} volume={0.25} />
      <Sfx name="pop" at={c3 + 12} volume={0.25} />
      <Sfx name="ding" at={c3 + 40} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.12} />
      <Sfx name="sparkle" at={c4 + 34} />
      {[0, 1, 2].map((k) => (
        <Sfx
          key={`k${k}`}
          name={PLUCKS[k + 2]}
          at={c4 + 50 + k * 20}
          volume={0.2}
        />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* axis labels */}
          {Array.from({ length: N }).map((_, k) => (
            <g key={k} opacity={fadeIn(frame, c0 + 2 + k)}>
              <text
                x={dotX(k)}
                y={Y0 - 38}
                fill={colors.muted}
                fontSize={28}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {k}
              </text>
              <text
                x={X0 - 44}
                y={dotY(k) + 10}
                fill={colors.muted}
                fontSize={28}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {k}
              </text>
            </g>
          ))}
          <text
            x={X0 - 44}
            y={Y0 - 38}
            fill={colors.muted}
            fontSize={28}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 2)}
          >
            ~
          </text>
          {/* mirror line */}
          <line
            x1={dotX(0) - 24}
            y1={dotY(0) - 24}
            x2={lerp(dotX(0) - 24, dotX(N - 1) + 24, ramp(frame, c2 + 4, 14))}
            y2={lerp(dotY(0) - 24, dotY(N - 1) + 24, ramp(frame, c2 + 4, 14))}
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="10 8"
            opacity={fadeOut(frame, c3, 12) * 0.8}
          />
          {/* the grid */}
          {Array.from({ length: N * N }).map((_, i) => {
            const a = Math.floor(i / N);
            const b = i % N;
            const at = lightAt(a, b);
            const on =
              frame >= at ? Math.min(1, springIn(frame, at, fps, 11)) : 0;
            const chainHit =
              frame >= c3 &&
              frame < c4 &&
              ((a === 0 && b === 3) ||
                (a === 3 && b === 6) ||
                (a === 0 && b === 6));
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 4 + a * 2)}>
                <circle
                  cx={dotX(b)}
                  cy={dotY(a)}
                  r={6}
                  fill={alpha(colors.muted, 0.35)}
                />
                {frame >= at ? (
                  <circle
                    cx={dotX(b)}
                    cy={dotY(a)}
                    r={14 * on}
                    fill={
                      chainHit || classLit(a, b)
                        ? colors.highlight
                        : colors.primary
                    }
                  />
                ) : null}
              </g>
            );
          })}
          {/* mirror copies flying across the diagonal */}
          {SAMPLES.map(([a, b], i) => {
            const t = glide(frame, mirrorAt(i), fps, 16);
            if (frame < mirrorAt(i) || frame >= mirrorAt(i) + 16) return null;
            return (
              <circle
                key={i}
                cx={lerp(dotX(b), dotX(a), t)}
                cy={lerp(dotY(a), dotY(b), t)}
                r={14}
                fill={alpha(colors.primary, 0.8)}
              />
            );
          })}
          {/* sample pair tags */}
          {SAMPLES.map(([a, b], i) => (
            <text
              key={i}
              x={dotX(b) + 24}
              y={dotY(a) - 16}
              fill={colors.primary}
              fontSize={26}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, sampleAt(i) + 4) * fadeOut(frame, c1, 10)}
            >
              ({a}, {b})
            </text>
          ))}
          {/* transitive: 0 → 3 → 6 forces 0 → 6 */}
          <g opacity={fadeIn(frame, c3 + 4) * fadeOut(frame, c4, 12)}>
            {[0, 1].map((k) => (
              <path
                key={k}
                d={`M ${chainX(k) + 30} ${CHAIN_Y - 20} Q ${(chainX(k) + chainX(k + 1)) / 2} ${CHAIN_Y - 80} ${chainX(k + 1) - 30} ${CHAIN_Y - 20}`}
                fill="none"
                stroke={colors.primary}
                strokeWidth={4}
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - ramp(frame, c3 + 4 + k * 8, 10)}
              />
            ))}
            <path
              d={`M ${chainX(0) + 20} ${CHAIN_Y + 28} Q ${chainX(1)} ${CHAIN_Y + 120} ${chainX(2) - 20} ${CHAIN_Y + 28}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, c3 + 24, 16)}
            />
            {chain.map((n, i) => (
              <Chip
                key={n}
                cx={chainX(i)}
                cy={CHAIN_Y}
                label={n}
                r={28}
                scale={Math.min(1, springIn(frame, c3 + 4 + i * 4, fps, 11))}
              />
            ))}
          </g>
        </svg>

        {/* the three properties */}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 170,
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 20) * fadeOut(frame, c4 + 20, 10),
          }}
        >
          {tx.pairs} (a, b) ⊆ A × A
        </div>
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 160,
            fontSize: 50,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 30),
            translate: riseIn(frame, c4 + 30, 20),
          }}
        >
          = {tx.equivalence}
        </div>
        {rows.map((r, i) => (
          <div
            key={r.name}
            style={{
              position: "absolute",
              left: PANEL_X,
              top: ROW_Y[i] - 34,
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              opacity: fadeIn(frame, r.at),
              translate: riseIn(frame, r.at, 20),
            }}
          >
            <span
              style={{
                width: 34,
                color: colors.green,
                fontSize: 40,
                opacity: fadeIn(frame, c4 + 14 + i * 6),
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontFamily: fonts.title,
                fontSize: 44,
                color: colors.primary,
                minWidth: 200,
              }}
            >
              {r.name}
            </span>
            <span style={{ fontFamily: fonts.math, fontSize: 36 }}>
              {r.math}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: PANEL_X,
            top: 610,
            fontSize: 40,
            color: colors.text,
            opacity: fadeIn(frame, c4 + 40),
            translate: riseIn(frame, c4 + 40, 16),
          }}
        >
          {tx.mod3}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
