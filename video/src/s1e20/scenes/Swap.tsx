import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { useEpisode } from "../../shared/episode";
import { useLocale } from "../../shared/locale";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Why the quadratic formula has a square root. x² − 6x + 8 has roots 2 and
// 4, two beads on a number line. They swap (and swap back): the sum card (6)
// and the product card (8) don't budge. The difference arrow does: +2
// becomes −2. But the square on the difference stays 4 either way, so it's
// known; the square shrinks to its side, √4 = 2, and the formula appears.

const LINE_Y = 600;
const X0 = 360; // where 0 sits
const UNIT = 200;
const xOf = (v: number) => X0 + v * UNIT;

export const Swap: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("swap");
  const [c0, c1] = cues;
  const { durationInFrames } = useEpisode().sceneTiming("swap", useLocale());
  const swaps = [c0 + 60, c0 + 150, c1 + 40, c1 + 120];
  // the last beats fit inside the line, however long it runs
  const rootAt = Math.min(c1 + 170, durationInFrames - 100);
  const formulaAt = Math.min(c1 + 210, durationInFrames - 60);
  // how many swaps have finished, and the one in flight
  const ts = swaps.map((at) => glide(frame, at, fps, 18));
  const done = ts.filter((t) => t >= 0.999).length;
  const live = ts.find((t) => t > 0 && t < 0.999) ?? 0;
  const flipped = done % 2 === 1;
  // r₁'s value: 2 or 4, hopping over r₂ while a swap is in flight
  const r1From = flipped ? 4 : 2;
  const r1To = flipped ? 2 : 4;
  const r1 = hop(live, xOf(r1From), LINE_Y, xOf(r1To), LINE_Y, 120);
  const r2 = hop(live, xOf(6 - r1From), LINE_Y, xOf(6 - r1To), LINE_Y, -120);
  const settled = live === 0;
  const diff = (r2.x - r1.x) / UNIT; // r₂ − r₁, live
  const square = glide(frame, c1 + 76, fps, 16);
  const root = glide(frame, rootAt, fps, 18);
  const part1 = fadeOut(frame, c1, 10);
  const checkAt = (k: number) => swaps[k] + 18;

  return (
    <SceneShell id="swap">
      <Sfx name="pop" at={c0 + 8} volume={0.18} />
      {swaps.map((at, k) => (
        <Sfx key={k} name="whoosh" at={at} volume={0.14} />
      ))}
      <Sfx name="ding" at={checkAt(0)} volume={0.14} />
      <Sfx name="ding" at={checkAt(1)} volume={0.14} />
      <Sfx name="thud" at={checkAt(2)} volume={0.26} />
      <Sfx name="pop" at={c1 + 76} volume={0.18} />
      <Sfx name="scratch" at={rootAt} volume={0.2} />
      <Sfx name="chime" at={formulaAt} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the number line */}
        <line
          x1={xOf(-0.5)}
          y1={LINE_Y}
          x2={xOf(6.5)}
          y2={LINE_Y}
          stroke={colors.muted}
          strokeWidth={4}
        />
        {[0, 1, 2, 3, 4, 5, 6].map((n) => (
          <g key={n}>
            <line
              x1={xOf(n)}
              y1={LINE_Y - 14}
              x2={xOf(n)}
              y2={LINE_Y + 14}
              stroke={colors.muted}
              strokeWidth={4}
            />
            <text
              x={xOf(n)}
              y={LINE_Y + 70}
              fill={colors.muted}
              fontSize={42}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {n}
            </text>
          </g>
        ))}
        {/* the difference arrow, from r₁ to r₂ */}
        <g opacity={fadeIn(frame, c1 + 4)}>
          <line
            x1={r1.x}
            y1={LINE_Y - 110}
            x2={r2.x - Math.sign(diff) * 30}
            y2={LINE_Y - 110}
            stroke={diff > 0 ? colors.green : colors.red}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <polygon
            points={`${r2.x},${LINE_Y - 110} ${r2.x - Math.sign(diff) * 36},${LINE_Y - 132} ${r2.x - Math.sign(diff) * 36},${LINE_Y - 88}`}
            fill={diff > 0 ? colors.green : colors.red}
          />
          <text
            x={(r1.x + r2.x) / 2}
            y={LINE_Y - 140}
            fill={diff > 0 ? colors.green : colors.red}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            transform={`translate(${frame >= checkAt(2) ? shake(frame, checkAt(2), 8) : 0} 0)`}
          >
            {settled ? (diff > 0 ? "+2" : "−2") : ""}
          </text>
        </g>
        {/* the two roots */}
        {[
          { p: r1, l: "r₁", c: colors.primary },
          { p: r2, l: "r₂", c: colors.highlight },
        ].map((b) => {
          const s = Math.min(1, springIn(frame, c0 + 8, fps, 10));
          return (
            <g key={b.l} transform={`translate(${b.p.x} ${b.p.y}) scale(${s})`}>
              <circle r={40} fill={b.c} stroke={colors.ink} strokeWidth={5} />
              <text
                y={14}
                fill={colors.ink}
                fontSize={38}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {b.l}
              </text>
            </g>
          );
        })}
        {/* the square on the difference: 4 either way */}
        <g
          opacity={square * (1 - root)}
          transform={`translate(1560 ${LINE_Y - 230})`}
        >
          <rect
            x={-100}
            y={-100}
            width={200 * square}
            height={200 * square}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <text
            x={0}
            y={22}
            fill={colors.primary}
            fontSize={72}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={square}
          >
            4
          </text>
        </g>
        {/* √: the square shrinks to its side */}
        <g opacity={root} transform={`translate(1560 ${LINE_Y - 230})`}>
          <line
            x1={-100}
            y1={100}
            x2={-100 + 200 * root}
            y2={100}
            stroke={colors.primary}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <text
            x={0}
            y={60}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            √4 = 2
          </text>
        </g>
      </svg>

      {/* what the swap leaves alone */}
      <AbsoluteFill style={{ opacity: part1 }}>
        {[
          { l: tx.sum, v: "6", x: 420, k: 0 },
          { l: tx.product, v: "8", x: 1100, k: 1 },
        ].map((card) => {
          const ok = frame >= checkAt(0);
          return (
            <div
              key={card.l}
              style={{
                position: "absolute",
                top: 150,
                left: card.x,
                width: 400,
                padding: "20px 0",
                textAlign: "center",
                borderRadius: 24,
                border: `5px solid ${ok ? colors.green : colors.primary}`,
                backgroundColor: alpha(colors.violet, 0.8),
                fontSize: 48,
                fontWeight: 800,
                color: colors.text,
                opacity: fadeIn(frame, c0 + 20 + card.k * 10),
                translate: riseIn(frame, c0 + 20 + card.k * 10, 16),
              }}
            >
              {card.l}{" "}
              <span style={{ fontFamily: fonts.math, fontSize: 64 }}>
                {card.v}
              </span>
              <span style={{ color: colors.green, opacity: ok ? 1 : 0 }}>
                {" "}
                ✓
              </span>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* the formula */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 84,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, formulaAt),
          translate: riseIn(frame, formulaAt, 16),
        }}
      >
        {tx.quadFormula}
      </div>
    </SceneShell>
  );
};
