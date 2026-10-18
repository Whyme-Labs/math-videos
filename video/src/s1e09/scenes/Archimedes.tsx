import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, ramp, shake } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Archimedes from completeness. Suppose the whole numbers had a least upper
// bound b. b − 1 is not an upper bound, so some n > b − 1; then n + 1 > b,
// and the ceiling breaks. The whole numbers march on. Then the bars 1/n
// dip under any height ε > 0.

const Y = 360;
const X0 = 180;
const UNIT = 190;
const B = 5.4;
const N = 5;
const BARS = { x0: 420, x1: 1500, base: 830, h: 300, count: 16 };
const EPS = 0.09;

export const Archimedes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("archimedes");
  const [c0, c1] = cues;
  const hopT = ramp(frame, c1 + 6, 16);
  const broken = frame >= c1 + 22;
  const march = glide(frame, c1 + 40, fps, 50);
  const px = (v: number) => X0 + v * UNIT - march * 3 * UNIT;
  const barAt = (n: number) => c1 + 70 + n * 5;
  const bw = (BARS.x1 - BARS.x0) / BARS.count;
  const p = hop(hopT, px(N), Y, px(N + 1), Y, 90);

  return (
    <SceneShell id="archimedes">
      <Sfx name="page" at={c0 + 6} volume={0.2} />
      <Sfx name="thud" at={c0 + 30} volume={0.3} />
      <Sfx name="tick" at={c0 + 60} />
      <Sfx name="ding" at={c0 + 84} volume={0.24} />
      <Sfx name="pluck5" at={c1 + 22} />
      <Sfx name="scratch" at={c1 + 22} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.16} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={barAt(k * 2 + 1)} volume={0.16} />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <line
            x1={0}
            y1={Y}
            x2={1920}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {Array.from({ length: 13 }).map((_, v) => (
            <g key={v} opacity={fadeIn(frame, c0 + 2 + v * 2)}>
              <circle
                cx={px(v)}
                cy={Y}
                r={
                  18 *
                  (v === N
                    ? 1 + 0.15 * Math.max(0, Math.sin((frame - c0 - 60) / 5))
                    : 1)
                }
                fill={
                  v === N && frame >= c0 + 60 && frame < c1 + 6
                    ? colors.green
                    : colors.primary
                }
                opacity={v === N && hopT > 0 && hopT < 1 ? 0.3 : 1}
              />
              <text
                x={px(v)}
                y={Y + 56}
                fill={colors.muted}
                fontSize={32}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {v}
              </text>
            </g>
          ))}
          {/* the would-be ceiling b, and b − 1 */}
          <g
            opacity={
              fadeIn(frame, c0 + 30) *
              (broken ? fadeOut(frame, c1 + 30, 14) : 1)
            }
            transform={`translate(${shake(frame, c1 + 22, 16)} ${broken ? ramp(frame, c1 + 26, 20) * 120 : 0})`}
          >
            <line
              x1={px(B)}
              y1={Y - 140}
              x2={px(B)}
              y2={Y + 30}
              stroke={broken ? colors.red : colors.highlight}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <text
              x={px(B)}
              y={Y - 160}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              b
            </text>
            <rect
              x={px(B - 1)}
              y={Y - 30}
              width={UNIT}
              height={60}
              fill={alpha(colors.green, 0.12 * fadeIn(frame, c0 + 70))}
            />
          </g>
          <g opacity={fadeIn(frame, c0 + 60) * fadeOut(frame, c1 + 30, 10)}>
            <line
              x1={px(B - 1)}
              y1={Y - 90}
              x2={px(B - 1)}
              y2={Y + 20}
              stroke={alpha(colors.highlight, 0.6)}
              strokeWidth={4}
              strokeDasharray="8 8"
            />
            <text
              x={px(B - 1)}
              y={Y - 104}
              fill={colors.muted}
              fontSize={34}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              b − 1
            </text>
          </g>
          {/* n hops to n + 1 */}
          {hopT > 0 && hopT < 1 ? (
            <circle cx={p.x} cy={p.y} r={16} fill={colors.green} />
          ) : null}
          {/* 1/n under any ε */}
          <g opacity={fadeIn(frame, barAt(0))}>
            <line
              x1={BARS.x0 - 30}
              y1={BARS.base}
              x2={BARS.x1 + 30}
              y2={BARS.base}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {Array.from({ length: BARS.count }).map((_, k) => {
              const n = k + 1;
              const h = (BARS.h / n) * Math.min(1, ramp(frame, barAt(n), 8));
              const under = 1 / n < EPS;
              return (
                <rect
                  key={n}
                  x={BARS.x0 + k * bw + 8}
                  y={BARS.base - h}
                  width={bw - 16}
                  height={h}
                  rx={4}
                  fill={under ? colors.green : colors.orange}
                />
              );
            })}
            <line
              x1={BARS.x0 - 30}
              y1={BARS.base - EPS * BARS.h}
              x2={BARS.x1 + 30}
              y2={BARS.base - EPS * BARS.h}
              stroke={colors.highlight}
              strokeWidth={3}
              strokeDasharray="10 8"
            />
            <text
              x={BARS.x1 + 50}
              y={BARS.base - EPS * BARS.h + 12}
              fill={colors.highlight}
              fontSize={36}
              fontFamily={fonts.math}
            >
              ε
            </text>
            <text
              x={BARS.x0 - 50}
              y={BARS.base - BARS.h + 12}
              fill={colors.orange}
              fontSize={34}
              textAnchor="end"
              fontFamily={fonts.math}
            >
              1/n
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 90,
            fontSize: 38,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 10),
          }}
        >
          {tx.supposeBound}
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 90,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 8) * fadeOut(frame, c1 + 40, 10),
          }}
        >
          n + 1 {">"} b
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 90,
            fontSize: 40,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 50),
            translate: riseIn(frame, c1 + 50, 14),
          }}
        >
          {tx.noCeiling}
        </div>
        <div
          style={{
            position: "absolute",
            top: 470,
            width: "100%",
            textAlign: "center",
            fontSize: 38,
            color: colors.muted,
            opacity: fadeIn(frame, barAt(BARS.count) + 10),
            translate: riseIn(frame, barAt(BARS.count) + 10, 14),
          }}
        >
          {tx.noInfinitesimal}
        </div>
        <div
          style={{
            position: "absolute",
            left: px(N) - 60,
            top: Y + 90,
            fontFamily: fonts.math,
            fontSize: 36,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 84) * fadeOut(frame, c1 + 6, 8),
          }}
        >
          n {">"} b − 1
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
