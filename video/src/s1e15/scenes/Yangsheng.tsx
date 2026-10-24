import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Rulebook } from "../components/world";
import { useStrings } from "../i18n";

// Chinese edition only. 《庄子·养生主》: "吾生也有涯，而知也无涯。以有涯随
// 无涯，殆已。" The four clauses arrive on bamboo slips. Then a walker with
// the rulebook under one arm heads down a road that runs to the horizon;
// glowing truths keep appearing further out, faster than he walks.

const SLIP_W = 110;
const SLIP_X = (i: number) => 1600 - i * (SLIP_W + 36);
const SLIP_Y = 130;
const SLIP_H = 640;
const HORIZON = 360;

export const Yangsheng: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("yangsheng");
  const [c0, c1] = cues;
  const slipAt = (i: number) => c0 + 8 + i * 10;
  const slips = fadeOut(frame, c1, 10);
  // the walk: depth 0 (near) … 1 (horizon); he never gets far
  const t1 = Math.max(0, frame - c1);
  const walkerD = 0.25 + Math.min(0.15, t1 / 300);
  const depthY = (d: number) => lerp(980, HORIZON, d);
  const depthS = (d: number) => lerp(1, 0.05, d);
  // truths appear further and further out
  const truths = Array.from({ length: 14 }).map((_, k) => ({
    d: 0.45 + 0.04 * k,
    x: (k % 2 ? 1 : -1) * (120 + ((k * 53) % 200)),
    at: c1 + 10 + k * 7,
  }));

  return (
    <SceneShell id="yangsheng">
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      {truths.map((t, k) =>
        k % 3 === 0 ? (
          <Sfx key={`t${k}`} name="sparkle" at={t.at} volume={0.12} />
        ) : null,
      )}

      {/* the slips */}
      <AbsoluteFill style={{ opacity: slips }}>
        <svg width={1920} height={1080}>
          {tx.quote.map((q, i) => {
            const t = glide(frame, slipAt(i), fps, 16);
            return (
              <g
                key={q}
                opacity={t}
                transform={`translate(0 ${lerp(-60, 0, t)})`}
              >
                <rect
                  x={SLIP_X(i)}
                  y={SLIP_Y}
                  width={SLIP_W}
                  height={SLIP_H}
                  rx={14}
                  fill={colors.wood}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                {[0.1, 0.9].map((f) => (
                  <line
                    key={f}
                    x1={SLIP_X(i) - 10}
                    y1={SLIP_Y + SLIP_H * f}
                    x2={SLIP_X(i) + SLIP_W + 10}
                    y2={SLIP_Y + SLIP_H * f}
                    stroke={colors.ink}
                    strokeWidth={5}
                  />
                ))}
                {[...q].map((ch, j) => (
                  <text
                    key={j}
                    x={SLIP_X(i) + SLIP_W / 2}
                    y={SLIP_Y + 110 + j * 80}
                    fill={colors.ink}
                    fontSize={60}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                  >
                    {ch}
                  </text>
                ))}
              </g>
            );
          })}
          <text
            x={200}
            y={300}
            fill={colors.primary}
            fontSize={60}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 4)}
          >
            {tx.yangshengSource}
          </text>
        </svg>
      </AbsoluteFill>

      {/* the road to the horizon */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={0}
            y={0}
            width={1920}
            height={HORIZON}
            fill={alpha(colors.ink, 0.35)}
          />
          <path
            d={`M 560 1080 L 940 ${HORIZON} L 980 ${HORIZON} L 1360 1080 Z`}
            fill={alpha(colors.wood, 0.5)}
          />
          {Array.from({ length: 10 }).map((_, k) => {
            const d = (k / 10 + 1 - ((t1 / 150) % 1)) % 1;
            return (
              <rect
                key={k}
                x={960 - 6 * depthS(d)}
                y={depthY(d)}
                width={12 * depthS(d)}
                height={40 * depthS(d)}
                fill={alpha(colors.paper, 0.5)}
              />
            );
          })}
          {truths.map((t, k) => (
            <g
              key={k}
              opacity={fadeIn(frame, t.at, 8)}
              transform={`translate(${960 + t.x * depthS(t.d) * 3} ${depthY(t.d) - 80 * depthS(t.d)}) scale(${depthS(t.d) * 3})`}
            >
              <circle
                cx={0}
                cy={0}
                r={30}
                fill={alpha(colors.highlight, 0.35)}
              />
              <circle cx={0} cy={0} r={14} fill={colors.highlight} />
            </g>
          ))}
          <g
            transform={`translate(${960} ${depthY(walkerD)}) scale(${depthS(walkerD) * 1.4})`}
          >
            <Person
              x={0}
              y={0}
              color={colors.orange}
              size={1.6}
              bob={frame / 4}
            />
            <g transform="translate(70 -110) rotate(-10)">
              <Rulebook x={0} y={0} pages={2} s={0.5} />
            </g>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
