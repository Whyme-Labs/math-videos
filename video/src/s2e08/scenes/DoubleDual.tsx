import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// A vector measures measurements. Four small panels, each holding a
// different orange stack. The arrow v visits them one at a time; in each
// it pierces the stack and a reading pops up above the panel. Then a ring
// closes round the big v on the left, labelled v**, threads run from every
// reading back to it, and "no basis chosen ✓" lands.

const V = { x: 1.5, y: 1 };
const PSIS = [
  { a: 1, b: 0 },
  { a: 0, b: 1 },
  { a: 1, b: 1 },
  { a: 1, b: -1 },
];
const PX = [860, 1120, 1380, 1640];
const PY = 500;
const BIG = { x: 400, y: 500 };

export const DoubleDual: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("doubleDual");
  const [c0, c1] = cues;
  const visit = (k: number) => glide(frame, c0 + 20 + k * 24, fps, 14);
  const pop = (k: number) =>
    Math.min(1, springIn(frame, c0 + 32 + k * 24, fps, 10));
  const ring = Math.min(1, springIn(frame, c1 + 10, fps, 10));
  const threads = fadeIn(frame, c1 + 40, 10);

  return (
    <SceneShell id="doubleDual">
      {PSIS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={c0 + 32 + k * 24} volume={0.14} />
      ))}
      <Sfx name="pop" at={c1 + 10} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="chime" at={c1 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          {PX.map((x, k) => (
            <clipPath key={k} id={`dd${k}`}>
              <rect x={x - 110} y={PY - 110} width={220} height={220} rx={20} />
            </clipPath>
          ))}
        </defs>
        {/* the big v, and the ring that makes it a measurement of measurements */}
        <Arrow
          from={{ x: BIG.x - 90, y: BIG.y + 60 }}
          to={{ x: BIG.x + 90, y: BIG.y - 60 }}
          width={16}
        />
        <circle
          cx={BIG.x}
          cy={BIG.y}
          r={170 * ring}
          fill="none"
          stroke={colors.primary}
          strokeWidth={8}
          opacity={ring}
        />
        <text
          x={BIG.x}
          y={BIG.y - 200}
          fill={colors.primary}
          fontSize={60}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={ring}
        >
          v**
        </text>
        {PX.map((x, k) => {
          const s = { a: PSIS[k].a, b: PSIS[k].b };
          const scr = (px: number, py: number) => ({
            x: x - 60 + px * 60,
            y: PY + 40 - py * 60,
          });
          const val = s.a * V.x + s.b * V.y;
          return (
            <g key={k} opacity={fadeIn(frame, c0 + k * 6, 10)}>
              <rect
                x={x - 110}
                y={PY - 110}
                width={220}
                height={220}
                rx={20}
                fill={alpha(colors.bgMid, 0.7)}
                stroke={alpha(colors.paper, 0.3)}
                strokeWidth={3}
              />
              <g clipPath={`url(#dd${k})`}>
                <Stack a={s.a} b={s.b} scr={scr} width={4} range={6} />
              </g>
              <Arrow
                from={scr(0, 0)}
                to={scr(V.x * visit(k), V.y * visit(k))}
                width={8}
                opacity={visit(k) > 0 ? 1 : 0}
              />
              <g
                opacity={pop(k)}
                transform={`translate(${x} ${PY - 150}) scale(${pop(k)})`}
              >
                <text
                  y={14}
                  fill={colors.primary}
                  fontSize={54}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {val.toFixed(1)}
                </text>
              </g>
              <path
                d={`M ${x} ${PY - 190} Q ${(x + BIG.x) / 2} ${PY - 380} ${BIG.x + 120} ${BIG.y - 120}`}
                fill="none"
                stroke={alpha(colors.primary, 0.6)}
                strokeWidth={4}
                strokeDasharray="12 10"
                opacity={threads}
              />
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 860,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 70),
          translate: riseIn(frame, c1 + 70, 16),
        }}
      >
        {tx.noBasis} ✓
      </div>
    </SceneShell>
  );
};
