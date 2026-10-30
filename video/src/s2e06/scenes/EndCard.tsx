import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow, curve } from "../../s2e01/components/vec";
import { Stack } from "../components/stack";
import { useStrings } from "../i18n";

// Recap: three arrows of different lengths pierce one orange stack, and a
// number pops out at each piercing. Teaser for S2E07: a wine barrel's
// curved outline on its side; three orange probes drop onto its profile at
// the two ends and the middle, sized one sixth, four sixths, one sixth.

const O = { x: 760, y: 470 };
const S = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const arrows = [
    { v: { x: 2.2, y: 0.8 }, at: c0 + 10 },
    { v: { x: 0.8, y: 2.4 }, at: c0 + 30 },
    { v: { x: 3.4, y: -1.2 }, at: c0 + 50 },
  ];
  const phi = { a: 1, b: 0.5 };
  const barrel = glide(frame, c1 + 10, fps, 24);
  const probe = (k: number) =>
    Math.min(1, springIn(frame, c1 + 40 + k * 14, fps, 10));
  const bx = (t: number) => lerp(1200, 1740, t);
  const by = (t: number) => 360 - 70 * Math.sin(Math.PI * t);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {arrows.map((a, k) => (
        <Sfx key={k} name="pop" at={a.at + 16} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`p${k}`} name="clink" at={c1 + 40 + k * 14} volume={0.16} />
      ))}
      <Sfx name="sparkle" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="endStage">
              <rect x={160} y={110} width={1600} height={700} rx={30} />
            </clipPath>
          </defs>
          <g clipPath="url(#endStage)">
            <Stack a={phi.a} b={phi.b} scr={scr} range={10} />
          </g>
          {arrows.map((a, k) => {
            const t = glide(frame, a.at, fps, 16);
            const tip = scr(a.v.x * t, a.v.y * t);
            const val = phi.a * a.v.x + phi.b * a.v.y;
            const pop = Math.min(1, springIn(frame, a.at + 16, fps, 10));
            return (
              <g key={k}>
                <Arrow from={O} to={tip} width={14} opacity={t > 0 ? 1 : 0} />
                <g
                  opacity={pop}
                  transform={`translate(${tip.x + 40} ${tip.y - 20}) scale(${pop})`}
                >
                  <text
                    fill={colors.primary}
                    stroke={colors.bg}
                    strokeWidth={10}
                    paintOrder="stroke"
                    fontSize={72}
                    fontFamily={fonts.mono}
                    fontWeight={800}
                  >
                    {val.toFixed(1)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* teaser: a barrel and three probes */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g
            opacity={barrel}
            transform={`translate(${lerp(300, 0, barrel)} 0)`}
          >
            <path
              d={`${curve(
                (t) => t,
                0,
                1,
                (t) => ({ x: bx(t), y: by(t) }),
              )} L ${bx(1)} ${940 - by(1)} ${curve(
                (t) => t,
                1,
                0,
                (t) => ({ x: bx(t), y: 940 - by(t) }),
              ).replace("M", "L")} Z`}
              fill={alpha(colors.wood, 0.35)}
              stroke={colors.wood}
              strokeWidth={8}
            />
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1={bx(t)}
                y1={by(t)}
                x2={bx(t)}
                y2={940 - by(t)}
                stroke={alpha(colors.wood, 0.6)}
                strokeWidth={6}
              />
            ))}
          </g>
          {[
            { t: 0, w: "1/6", r: 18 },
            { t: 0.5, w: "4/6", r: 36 },
            { t: 1, w: "1/6", r: 18 },
          ].map((p, k) => {
            const s = probe(k);
            return (
              <g key={k} opacity={s}>
                <line
                  x1={bx(p.t)}
                  y1={lerp(120, by(p.t) - 140, s)}
                  x2={bx(p.t)}
                  y2={by(p.t) - p.r}
                  stroke={colors.orange}
                  strokeWidth={6}
                />
                <circle
                  cx={bx(p.t)}
                  cy={by(p.t)}
                  r={p.r}
                  fill={colors.orange}
                />
                <text
                  x={bx(p.t)}
                  y={by(p.t) - 160}
                  fill={colors.orange}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {p.w}
                </text>
              </g>
            );
          })}
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 80),
              translate: riseIn(frame, c1 + 80),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
