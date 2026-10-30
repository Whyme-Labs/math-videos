import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Paris, 1795: a grocer's shop with a striped awning; a decree
// slams onto the counter, "kg → g". Then two cards: the basket (lemon
// column: 2, 1, 0.5 kg) and the price list (orange row: 3, 2, 5 F per kg).
// The basket's numbers swell a thousandfold as they turn into grams; the
// prices shrink a thousandfold; between them the bill, 10.50 F, never
// moves and rings each time it is checked. Last, a big arrow up beside
// the basket and a big arrow down beside the prices: opposite ways.

const BASKET = [2, 1, 0.5];
const PRICES = [3, 2, 5];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const decree = Math.min(1, springIn(frame, c0 + 40, fps, 10));
  const shop = fadeOut(frame, c1, 10);
  const grow = glide(frame, c1 + 40, fps, 40);
  const shrink = glide(frame, c2 + 10, fps, 40);
  const opposite = Math.min(1, springIn(frame, c3 + 20, fps, 10));
  const bump = (at: number) => Math.sin(Math.PI * ramp(frame, at, 14));
  const ring = 1 + 0.1 * (bump(c1 + 84) + bump(c2 + 56));
  const fmt = (v: number) =>
    v >= 10
      ? `${Math.round(v)}`
      : v >= 1
        ? `${Math.round(v * 100) / 100}`
        : v.toFixed(v < 0.1 ? 3 : 1);
  const items = [tx.apples, tx.flour, tx.sugar];

  return (
    <SceneShell id="coldOpen">
      <Sfx name="thud" at={c0 + 40} volume={0.36} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.12} />
      <Sfx name="riser" at={c1 + 40} volume={0.1} />
      <Sfx name="ding" at={c1 + 84} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="ding" at={c2 + 56} />
      <Sfx name="pop" at={c3 + 20} volume={0.18} />
      <Sfx name="pop" at={c3 + 30} volume={0.18} />

      {/* the shop */}
      <AbsoluteFill style={{ opacity: shop }}>
        <svg width={1920} height={1080}>
          <rect
            x={300}
            y={160}
            width={1320}
            height={620}
            fill={alpha(colors.ink, 0.5)}
          />
          {Array.from({ length: 11 }).map((_, k) => (
            <path
              key={k}
              d={`M ${300 + k * 120} 160 l 120 0 l 0 90 a 60 30 0 0 1 -120 0 Z`}
              fill={k % 2 ? colors.paper : colors.highlight}
            />
          ))}
          {/* shelves with jars */}
          {[0, 1].map((r) =>
            Array.from({ length: 8 }).map((_, k) => (
              <rect
                key={`${r}${k}`}
                x={420 + k * 140}
                y={330 + r * 130}
                width={70}
                height={90}
                rx={14}
                fill={
                  [colors.orange, colors.primary, colors.green, colors.wood][
                    (k + r) % 4
                  ]
                }
                opacity={0.8}
              />
            )),
          )}
          <Person x={960} y={760} color={colors.orange} size={1.8} facing={1} />
          {/* the counter */}
          <rect x={360} y={620} width={1200} height={160} fill={colors.wood} />
          {/* the decree */}
          <g
            opacity={decree}
            transform={`translate(1260 560) rotate(${lerp(-30, -6, decree)}) scale(${decree})`}
          >
            <rect
              x={-170}
              y={-110}
              width={340}
              height={200}
              rx={6}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={20}
              fill={colors.ink}
              fontSize={72}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.kg} → {tx.g}
            </text>
            <circle cx={110} cy={50} r={28} fill={colors.red} opacity={0.85} />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.paris}
        </div>
      </AbsoluteFill>

      {/* the basket and the price list */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* basket: a column */}
          <g transform="translate(470 470)">
            <text
              y={-250}
              fill={colors.primary}
              fontSize={52}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.basket} ({grow > 0.5 ? tx.g : tx.kg})
            </text>
            <path
              d="M -150 -200 l -24 0 l 0 400 l 24 0 M 150 -200 l 24 0 l 0 400 l -24 0"
              fill="none"
              stroke={colors.primary}
              strokeWidth={7}
            />
            {BASKET.map((v, k) => (
              <g key={k}>
                <text
                  x={-230}
                  y={-110 + k * 130}
                  fill={colors.muted}
                  fontSize={34}
                  textAnchor="end"
                  fontWeight={700}
                >
                  {items[k]}
                </text>
                <text
                  y={-100 + k * 130}
                  fill={colors.text}
                  fontSize={lerp(60, 84, grow)}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {fmt(v * lerp(1, 1000, grow))}
                </text>
              </g>
            ))}
            <g
              opacity={opposite}
              transform={`translate(260 0) scale(${opposite})`}
            >
              <path
                d="M 0 140 L 0 -120 M -40 -80 L 0 -130 L 40 -80"
                fill="none"
                stroke={colors.primary}
                strokeWidth={14}
                strokeLinecap="round"
              />
              <text
                x={60}
                y={20}
                fill={colors.primary}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                × 1000
              </text>
            </g>
          </g>
          {/* prices: a row */}
          <g transform="translate(1340 380)">
            <text
              y={-110}
              fill={colors.orange}
              fontSize={52}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.prices} (F / {shrink > 0.5 ? tx.g : tx.kg})
            </text>
            <path
              d="M -330 -60 l -20 0 l 0 120 l 20 0 M 330 -60 l 20 0 l 0 120 l -20 0"
              fill="none"
              stroke={colors.orange}
              strokeWidth={7}
            />
            {PRICES.map((v, k) => (
              <text
                key={k}
                x={-220 + k * 220}
                y={20}
                fill={colors.text}
                fontSize={lerp(64, 44, shrink)}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {shrink < 0.98
                  ? fmt(v / lerp(1, 1000, shrink))
                  : (v / 1000).toFixed(3)}
              </text>
            ))}
            <g
              opacity={opposite}
              transform={`translate(0 170) scale(${opposite})`}
            >
              <path
                d="M 0 -50 L 0 70 M -40 30 L 0 80 L 40 30"
                fill="none"
                stroke={colors.orange}
                strokeWidth={14}
                strokeLinecap="round"
              />
              <text
                x={60}
                y={30}
                fill={colors.orange}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                ÷ 1000
              </text>
            </g>
          </g>
          {/* the bill, which never moves */}
          <g transform={`translate(1340 720) scale(${ring})`}>
            <rect
              x={-260}
              y={-56}
              width={520}
              height={100}
              rx={20}
              fill={alpha(colors.green, 0.15)}
              stroke={colors.green}
              strokeWidth={5}
              opacity={fadeIn(frame, c1 + 20)}
            />
            <text
              y={16}
              fill={colors.green}
              fontSize={54}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, c1 + 20)}
            >
              {tx.bill}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
