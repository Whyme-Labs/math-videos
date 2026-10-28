import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The exchange argument. Top: a basis u₁ u₂ u₃ (lemon). Bottom: another
// list w₁ w₂ w₃ w₄ (orange), the fourth seat dashed: could a basis have
// four? Then the u's hop down one at a time; each evicts a w (which flies
// off) and takes its seat, and a tick says the row still makes everything.
// After three swaps only the dashed fourth seat is left, with nothing to
// put in it: it shakes and vanishes. 3 = 3.

const SEAT = { w: 200, h: 120 };
const TOP_Y = 300;
const BOT_Y = 620;
const xOf = (k: number) => 560 + k * 260;

const Chip: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly color: string;
  readonly opacity?: number;
  readonly scale?: number;
}> = ({ x, y, label, color, opacity = 1, scale = 1 }) => (
  <g opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect
      x={-SEAT.w / 2}
      y={-SEAT.h / 2}
      width={SEAT.w}
      height={SEAT.h}
      rx={22}
      fill={color}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      y={22}
      fill={colors.ink}
      fontSize={64}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);

export const Exchange: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("exchange");
  const [c0, c1] = cues;
  const chipAt = (k: number) => c0 + 10 + k * 16;
  const swapAt = (k: number) => c1 + 20 + k * 50;
  const gone = glide(frame, swapAt(3), fps, 14);
  const done = frame >= swapAt(3);

  return (
    <SceneShell id="exchange">
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <Sfx key={k} name="tick" at={chipAt(k)} volume={0.08} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx
          key={`s${k}`}
          name={PLUCKS[k * 2]}
          at={swapAt(k) + 14}
          volume={0.18}
        />
      ))}
      <Sfx name="thud" at={swapAt(3)} volume={0.34} />
      <Sfx name="chime" at={swapAt(3) + 20} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the bottom row's seats */}
        {[0, 1, 2, 3].map((k) => (
          <rect
            key={k}
            x={xOf(k) - SEAT.w / 2 - 10}
            y={BOT_Y - SEAT.h / 2 - 10}
            width={SEAT.w + 20}
            height={SEAT.h + 20}
            rx={28}
            fill="none"
            stroke={alpha(colors.paper, k === 3 ? 0.6 : 0.25)}
            strokeWidth={4}
            strokeDasharray={k === 3 ? "14 10" : undefined}
            opacity={(k === 3 ? 1 - gone : 1) * fadeIn(frame, chipAt(3 + k))}
            transform={
              k === 3 && done
                ? `translate(${shake(frame, swapAt(3), 14)} 0)`
                : undefined
            }
          />
        ))}
        <text
          x={xOf(3)}
          y={BOT_Y + 24}
          fill={colors.highlight}
          fontSize={72}
          textAnchor="middle"
          fontFamily={fonts.title}
          fontWeight={900}
          opacity={fadeIn(frame, c0 + 120) * (1 - gone)}
          transform={`rotate(${8 * Math.sin(frame / 6)} ${xOf(3)} ${BOT_Y})`}
        >
          ?
        </text>
        {/* the w's: evicted one by one */}
        {[0, 1, 2].map((k) => {
          const out = glide(frame, swapAt(k) + 10, fps, 18);
          return (
            <Chip
              key={`w${k}`}
              x={xOf(k) + out * 160}
              y={BOT_Y + out * 110}
              label={`w${"₁₂₃"[k]}`}
              color={colors.orange}
              opacity={
                Math.min(1, springIn(frame, chipAt(3 + k), fps, 10)) * (1 - out)
              }
            />
          );
        })}
        {/* the u's: hopping down into the evicted seats */}
        {[0, 1, 2].map((k) => {
          const t = glide(frame, swapAt(k), fps, 18);
          const p = hop(t, xOf(k), TOP_Y, xOf(k), BOT_Y, 120);
          return (
            <Chip
              key={`u${k}`}
              x={p.x}
              y={p.y}
              label={`u${"₁₂₃"[k]}`}
              color={colors.primary}
              scale={Math.min(1, springIn(frame, chipAt(k), fps, 10))}
            />
          );
        })}
        {/* each time: the row still makes everything */}
        {[0, 1, 2].map((k) => (
          <text
            key={`ok${k}`}
            x={xOf(k)}
            y={BOT_Y + 130}
            fill={colors.green}
            fontSize={64}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(frame, swapAt(k) + 18, 6)}
          >
            ✓
          </text>
        ))}
        <text
          x={300}
          y={TOP_Y + 22}
          fill={colors.primary}
          fontSize={52}
          textAnchor="middle"
          fontFamily={fonts.title}
          fontWeight={900}
          opacity={fadeIn(frame, c0 + 30)}
        >
          {tx.basis}
        </text>
        <g
          opacity={Math.min(1, springIn(frame, swapAt(3) + 20, fps, 10))}
          transform={`translate(${xOf(3) + 60} ${TOP_Y}) scale(${Math.min(1, springIn(frame, swapAt(3) + 20, fps, 10))})`}
        >
          <text
            y={30}
            fill={colors.green}
            fontSize={110}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            3 = 3
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity:
            fadeIn(frame, swapAt(0) + 18) * (1 - fadeIn(frame, swapAt(3), 8)),
          translate: riseIn(frame, swapAt(0) + 18, 16),
        }}
      >
        ✓ {tx.spans}
      </div>
    </SceneShell>
  );
};
