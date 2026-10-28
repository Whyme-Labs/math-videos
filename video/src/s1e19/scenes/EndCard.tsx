import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Floor } from "../components/tools";
import { useStrings } from "../i18n";

// Recap: the ÷ sign, the two-direction grid, and the tower, each popping
// in turn. Then the teaser for the finale: five roots of a quintic sit on a
// ring; pairs of them swap places along arcs (their symmetries), and a "?"
// lands in the middle: no formula.

const ROOTS = 5;
const RING = { x: 1380, y: 470, r: 230 };
const SWAPS: [number, number][] = [
  [0, 2],
  [1, 4],
  [3, 0],
];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const popAt = (k: number) => c0 + 10 + k * 26;
  const part1 = fadeOut(frame, c1, 10);
  const swapAt = (k: number) => c1 + 20 + k * 26;
  const q = Math.min(1, springIn(frame, c1 + 100, fps, 10));

  // which slot each root is in; swaps run one at a time, each trading the
  // roots in two slots along arcs that bow apart
  const pos = (i: number) => {
    const a = (i / ROOTS) * Math.PI * 2 - Math.PI / 2;
    return {
      x: RING.x + RING.r * Math.cos(a),
      y: RING.y + RING.r * Math.sin(a),
    };
  };
  const slotOf = Array.from({ length: ROOTS }, (_, i) => i);
  let moving: { a: number; b: number; t: number } | null = null;
  SWAPS.forEach(([a, b], k) => {
    const t = glide(frame, swapAt(k), fps, 16);
    if (t >= 0.999) {
      const ra = slotOf.indexOf(a);
      const rb = slotOf.indexOf(b);
      slotOf[ra] = b;
      slotOf[rb] = a;
    } else if (t > 0) moving = { a, b, t };
  });
  const place = slotOf.map((slot) => {
    const m = moving as { a: number; b: number; t: number } | null;
    if (!m || (slot !== m.a && slot !== m.b)) return pos(slot);
    const from = pos(slot);
    const to = pos(slot === m.a ? m.b : m.a);
    const bow = Math.sin(Math.PI * m.t) * 80 * (slot === m.a ? 1 : -1);
    const nx = -(to.y - from.y);
    const ny = to.x - from.x;
    const nl = Math.hypot(nx, ny) || 1;
    return {
      x: lerp(from.x, to.x, m.t) + (nx / nl) * bow,
      y: lerp(from.y, to.y, m.t) + (ny / nl) * bow,
    };
  });
  const rootColors = [
    colors.primary,
    colors.highlight,
    colors.green,
    colors.orange,
    colors.paper,
  ];

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pop" at={popAt(k)} volume={0.16} />
      ))}
      {SWAPS.map((_, k) => (
        <Sfx
          key={`s${k}`}
          name={PLUCKS[k * 2 + 1]}
          at={swapAt(k)}
          volume={0.14}
        />
      ))}
      <Sfx name="ding" at={c1 + 100} />
      <Sfx name="sparkle" at={c1 + 130} />

      {/* recap: divide, a dimension, a tower */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const s = Math.min(1, springIn(frame, popAt(k), fps, 10));
            const x = 460 + k * 500;
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(${x} 450) scale(${1.3 * s})`}
              >
                {k === 0 ? (
                  <text
                    x={0}
                    y={70}
                    fill={colors.primary}
                    fontSize={240}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    ÷
                  </text>
                ) : k === 1 ? (
                  <g>
                    {[0, 1, 2].map((i) =>
                      [0, 1, 2].map((j) => (
                        <circle
                          key={`${i}${j}`}
                          cx={-120 + i * 120}
                          cy={120 - j * 120}
                          r={9}
                          fill={alpha(colors.paper, 0.5)}
                        />
                      )),
                    )}
                    <line
                      x1={-120}
                      y1={120}
                      x2={0}
                      y2={120}
                      stroke={colors.primary}
                      strokeWidth={12}
                      strokeLinecap="round"
                    />
                    <line
                      x1={-120}
                      y1={120}
                      x2={-120}
                      y2={0}
                      stroke={colors.primary}
                      strokeWidth={12}
                      strokeLinecap="round"
                    />
                  </g>
                ) : (
                  <g>
                    {["2", "4", "8"].map((l, j) => (
                      <Floor
                        key={l}
                        x={0}
                        y={110 - j * 100}
                        w={220}
                        label={l}
                      />
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the teaser: five roots, swapping */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <circle
            cx={RING.x}
            cy={RING.y}
            r={RING.r}
            fill="none"
            stroke={alpha(colors.paper, 0.25)}
            strokeWidth={4}
            strokeDasharray="10 12"
          />
          {place.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={34}
              fill={rootColors[i]}
              stroke={colors.ink}
              strokeWidth={5}
            />
          ))}
          <text
            x={RING.x}
            y={RING.y + 50}
            fill={colors.highlight}
            fontSize={150}
            textAnchor="middle"
            fontWeight={800}
            opacity={q}
            transform={`translate(0 ${lerp(-40, 0, q)})`}
          >
            ?
          </text>
          <text
            x={RING.x}
            y={RING.y - RING.r - 70}
            fill={colors.text}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 10)}
          >
            x⁵
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 100),
              translate: riseIn(frame, c1 + 100),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 130) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
