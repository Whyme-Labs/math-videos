import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
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
import { guestColor } from "../../s1e11/components/hotel";
import { Runner } from "../components/race";
import { useStrings } from "../i18n";

// Two line-ups of the same infinite field, one above the other.
// Top: a new runner squeezes in at the front; a ripple runs down the line as
// every bib goes up by one, and the line looks exactly as before: 1 + ω = ω.
// Bottom: she walks all the way past the bunching point and stands after
// everyone, under a flag: a last runner. ω + 1.

const N = 30;
const pos = (n: number, x0: number) => x0 + 1000 * (1 - 0.84 ** n);
const size = (n: number) => 1.1 * 0.93 ** n;
const TOP = 400;
const BOT = 770;

export const Order: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("order");
  const [c0, c1] = cues;
  // top: she joins at the front, everyone shifts back one place
  const join = glide(frame, c0 + 8, fps, 22);
  const rippleAt = (n: number) => c0 + 34 + n * 3;
  const shift = (n: number) => glide(frame, rippleAt(n), fps, 12);
  // bottom: she runs to the end
  const run = ramp(frame, c1 + 6, 50);
  const herX = lerp(240, 1400, run);
  const flag = springIn(frame, c1 + 58, fps, 10);

  return (
    <SceneShell id="order">
      <Sfx name="whoosh" at={c0 + 8} volume={0.14} />
      {[0, 2, 4, 6, 8].map((n) => (
        <Sfx key={n} name="tick" at={rippleAt(n)} volume={0.12} />
      ))}
      <Sfx name="ding" at={c0 + 70} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      <Sfx name="thud" at={c1 + 58} volume={0.3} />
      <Sfx name="chime" at={c1 + 66} />
      <QuestionTray />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[TOP, BOT].map((y) => (
          <rect
            key={y}
            x={0}
            y={y - 6}
            width={1920}
            height={60}
            fill={alpha(colors.red, 0.3)}
          />
        ))}
        {/* top line-up */}
        {Array.from({ length: N }).map((_, n) => {
          const t = shift(n);
          const x = lerp(pos(n, 240), pos(n + 1, 240), t);
          const bib = n < 5 ? String(t > 0.5 ? n + 1 : n) : undefined;
          return (
            <Runner
              key={`t${n}`}
              x={x}
              y={TOP}
              color={guestColor(n)}
              bib={bib}
              size={lerp(size(n), size(n + 1), t)}
              phase={t > 0 && t < 1 ? frame / 2 : undefined}
            />
          );
        })}
        {(() => {
          const p = hop(join, 80, TOP, 240, TOP, 80);
          return (
            <Runner
              x={p.x}
              y={p.y}
              color={colors.highlight}
              bib={join >= 1 ? "0" : "?"}
              size={1.1}
              phase={join < 1 ? frame / 2.4 : undefined}
              opacity={fadeIn(frame, c0 + 4)}
            />
          );
        })()}
        <text
          x={1500}
          y={TOP - 170}
          fill={colors.text}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={700}
          opacity={fadeIn(frame, c0 + 70) * lerp(1, 0.3, fadeIn(frame, c1, 12))}
        >
          1 + ω = ω
        </text>
        <text
          x={1500}
          y={TOP - 110}
          fill={colors.muted}
          fontSize={34}
          opacity={fadeIn(frame, c0 + 70) * lerp(1, 0.3, fadeIn(frame, c1, 12))}
        >
          {tx.noLast}
        </text>
        {/* bottom line-up */}
        {Array.from({ length: N }).map((_, n) => (
          <Runner
            key={`b${n}`}
            x={pos(n, 240)}
            y={BOT}
            color={guestColor(n)}
            bib={n < 5 ? String(n) : undefined}
            size={size(n)}
            opacity={fadeIn(frame, c0 + 20)}
          />
        ))}
        {frame >= c1 + 2 ? (
          <Runner
            x={herX}
            y={BOT}
            color={colors.highlight}
            bib={run >= 1 ? "ω" : "?"}
            size={1.25}
            phase={run < 1 ? frame / 2.2 : undefined}
          />
        ) : null}
        <g
          opacity={Math.min(1, flag)}
          transform={`translate(1480 ${BOT - 280})`}
        >
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={260}
            stroke={colors.paper}
            strokeWidth={6}
          />
          <path
            d={`M 0 0 L ${140 * Math.min(1, flag)} 20 L 0 50 Z`}
            fill={colors.highlight}
          />
          <text
            x={20}
            y={-20}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.hasLast}
          </text>
        </g>
        <text
          x={1560}
          y={BOT - 110}
          fill={colors.text}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={700}
          opacity={fadeIn(frame, c1 + 70)}
        >
          ω + 1
        </text>
        {/* captions for the two rows */}
        <text
          x={80}
          y={TOP - 230}
          fill={colors.muted}
          fontSize={36}
          opacity={fadeIn(frame, c0 + 4)}
        >
          {tx.front}
        </text>
        <text
          x={80}
          y={BOT - 230}
          fill={colors.muted}
          fontSize={36}
          opacity={fadeIn(frame, c1 + 2)}
        >
          {tx.end}
        </text>
      </svg>
    </SceneShell>
  );
};
