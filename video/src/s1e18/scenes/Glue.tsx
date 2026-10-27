import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Gluing in x² + 1 = 0. The product (1 + 2x)(3 + x) as a 2 × 2 grid of
// cells: 3, x, 6x, 2x². The rule card lands and the x² cell flips over to
// −2. The cells collect into 1 + 7x, and every x flips into an i: 1 + 7i,
// the same answer complex multiplication gives. Beside it, x on the plane
// is a quarter turn: x · x swings 1 round to −1.

const G = { x: 520, y: 330, w: 260, h: 170 };
const CELLS = [
  { r: 0, c: 0, t: "3" },
  { r: 0, c: 1, t: "x" },
  { r: 1, c: 0, t: "6x" },
  { r: 1, c: 1, t: "2x²" },
];

export const Glue: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("glue");
  const [c0, c1] = cues;
  const cellAt = (k: number) => c0 + 12 + k * 10;
  const rule = Math.min(1, springIn(frame, c0 + 60, fps, 10));
  const flip = glide(frame, c0 + 80, fps, 14);
  const collect = glide(frame, c1 + 6, fps, 20);
  const toI = glide(frame, c1 + 40, fps, 14);
  const quarter =
    glide(frame, c1 + 60, fps, 16) + glide(frame, c1 + 84, fps, 16);

  return (
    <SceneShell id="glue">
      {CELLS.map((_, k) => (
        <Sfx key={k} name="pop" at={cellAt(k)} volume={0.14} />
      ))}
      <Sfx name="thud" at={c0 + 60} volume={0.3} />
      <Sfx name="whoosh" at={c0 + 80} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      <Sfx name="ding" at={c1 + 40} />
      <Sfx name="pluck2" at={c1 + 60} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 84} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the factors along the edges */}
        <g opacity={fadeIn(frame, c0 + 6) * (1 - collect)}>
          {["3", "+ x"].map((t, c) => (
            <text
              key={t}
              x={G.x + c * G.w + G.w / 2}
              y={G.y - 30}
              fill={colors.primary}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {t}
            </text>
          ))}
          {["1", "+ 2x"].map((t, r) => (
            <text
              key={t}
              x={G.x - 30}
              y={G.y + r * G.h + G.h / 2 + 18}
              fill={colors.primary}
              fontSize={56}
              textAnchor="end"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {t}
            </text>
          ))}
        </g>
        {/* the cells */}
        {CELLS.map((cl, k) => {
          const s = Math.min(1, springIn(frame, cellAt(k), fps, 10));
          const isSq = k === 3;
          const fl = isSq ? flip : 0;
          const x = G.x + cl.c * G.w;
          const y = G.y + cl.r * G.h;
          // collecting: everything slides into one row
          const tx2 = lerp(x, 1000 + [0, 1, 1, 0][k] * 320, collect);
          const ty2 = lerp(y, 700, collect);
          return (
            <g
              key={k}
              opacity={s * (1 - collect * 0.9)}
              transform={`translate(${tx2 + G.w / 2} ${ty2 + G.h / 2}) scale(${Math.abs(Math.cos(Math.PI * fl)) * s} ${s})`}
            >
              <rect
                x={-G.w / 2 + 6}
                y={-G.h / 2 + 6}
                width={G.w - 12}
                height={G.h - 12}
                rx={16}
                fill={isSq && fl > 0.5 ? colors.red : alpha(colors.violet, 0.8)}
                stroke={colors.primary}
                strokeWidth={4}
              />
              <text
                x={0}
                y={22}
                fill={colors.text}
                fontSize={64}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {isSq && fl > 0.5 ? "−2" : cl.t}
              </text>
            </g>
          );
        })}
        {/* the result: 1 + 7x, and then x becomes i */}
        <g opacity={collect}>
          <text
            x={1160}
            y={760}
            fill={colors.highlight}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1 + 7
            <tspan fill={toI > 0.5 ? colors.green : colors.highlight}>
              {toI > 0.5 ? "i" : "x"}
            </tspan>
          </text>
        </g>
        {/* the rule card */}
        <g
          opacity={rule}
          transform={`translate(1380 ${lerp(200, 260, rule)}) rotate(-4) scale(${rule})`}
        >
          <rect
            x={-220}
            y={-60}
            width={440}
            height={120}
            rx={24}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={6}
          />
          <text
            x={0}
            y={22}
            fill={colors.ink}
            fontSize={66}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {tx.rule}
          </text>
        </g>
        {/* x as a quarter turn */}
        <g opacity={fadeIn(frame, c1 + 56)} transform="translate(440 640)">
          <line
            x1={-180}
            y1={0}
            x2={180}
            y2={0}
            stroke={colors.muted}
            strokeWidth={3}
          />
          <line
            x1={0}
            y1={-180}
            x2={0}
            y2={180}
            stroke={colors.muted}
            strokeWidth={3}
          />
          <g transform={`rotate(${-90 * quarter})`}>
            <line
              x1={0}
              y1={0}
              x2={140}
              y2={0}
              stroke={colors.green}
              strokeWidth={12}
              strokeLinecap="round"
            />
            <polygon points="140,-20 172,0 140,20" fill={colors.green} />
          </g>
          <text
            x={0}
            y={240}
            fill={colors.green}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {tx.becomesI}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 120,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1 + 6, 10),
          translate: riseIn(frame, c0 + 6, 16),
        }}
      >
        (1 + 2x)(3 + x)
      </div>
    </SceneShell>
  );
};
