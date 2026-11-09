import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// eₙ ⇀ 0 in ℓ². The definition (c0). A strip of coordinates: eₙ is one
// lemon bar marching right; under it a fixed probe y, orange bars that
// shrink along the strip (c1). The reading f(eₙ) = yₙ, the probe's bar
// under eₙ, copied to a meter that keeps dropping (c2). Chip: eₙ ⇀ 0 and
// ‖eₙ‖ = 1 (c3). Dots for ‖eₙ‖ = 1 along a row and the limit's norm at 0
// below: the norm drops (c4). Two badges: limits are unique, weak
// sequences are bounded (c5).

const K = 16;
const SX = 160;
const CW = 62;
const Y1 = 420;
const Y2 = 640;
const y = (k: number) => 0.95 / (k + 1) ** 0.75;

export const Weak: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("weak");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const n = Math.min(K - 1, Math.max(0, Math.floor((frame - c1 - 6) / 14)));
  const strip = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);

  return (
    <SceneShell id="weak">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 10 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 14} volume={0.06} />
      ))}
      <Sfx name="pluck2" at={c2 + 8} volume={0.12} />
      <Sfx name="chime" at={c3 + 8} volume={0.26} />
      <Sfx name="pluck4" at={c4 + 10} volume={0.12} />
      <Sfx name="ding" at={c5 + 8} volume={0.2} />
      <Sfx name="ding" at={c5 + 24} volume={0.18} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={strip}>
          <line
            x1={SX}
            y1={Y1}
            x2={SX + K * CW}
            y2={Y1}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={SX}
            y1={Y2}
            x2={SX + K * CW}
            y2={Y2}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <rect
            x={SX + n * CW + 8}
            y={Y1 - 160}
            width={CW - 16}
            height={160}
            rx={6}
            fill={colors.primary}
          />
          {Array.from({ length: K }, (_, k) => (
            <rect
              key={k}
              x={SX + k * CW + 8}
              y={Y2 - 160 * y(k)}
              width={CW - 16}
              height={160 * y(k)}
              rx={4}
              fill={
                k === n && frame >= c2
                  ? colors.orange
                  : alpha(colors.orange, 0.5)
              }
            />
          ))}
          <rect
            x={SX + n * CW + 2}
            y={Y1 - 170}
            width={CW - 4}
            height={Y2 - Y1 + 180}
            rx={10}
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
            strokeDasharray="8 6"
            opacity={fadeIn(frame, c2 + 6, 8)}
          />
          <g opacity={fadeIn(frame, c2 + 6, 8)}>
            <rect
              x={1460}
              y={Y2 - 300}
              width={70}
              height={300}
              rx={8}
              fill={alpha(colors.orange, 0.15)}
              stroke={alpha(colors.orange, 0.5)}
              strokeWidth={3}
            />
            <rect
              x={1460}
              y={Y2 - 300 * y(n)}
              width={70}
              height={300 * y(n)}
              rx={8}
              fill={colors.orange}
            />
            <text
              x={1560}
              y={Y2 - 300 * y(n) + 12}
              fill={colors.orange}
              fontSize={36}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {y(n).toFixed(2)}
            </text>
          </g>
        </g>
        <g opacity={part2}>
          <line
            x1={240}
            y1={420}
            x2={1100}
            y2={420}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={240}
            y1={700}
            x2={1100}
            y2={700}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          {Array.from({ length: 12 }, (_, k) => (
            <circle
              key={k}
              cx={260 + k * 64}
              cy={420}
              r={12}
              fill={colors.primary}
            />
          ))}
          <circle cx={1080} cy={700} r={16} fill={colors.green} />
          <text
            x={200}
            y={432}
            textAnchor="end"
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.mono}
          >
            1
          </text>
          <text
            x={200}
            y={712}
            textAnchor="end"
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.mono}
          >
            0
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: SX,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        xₙ ⇀ x ⟺ f(xₙ) → f(x), ∀ f ∈ X*
      </div>
      <div
        style={{
          position: "absolute",
          top: Y1 - 230,
          left: SX + n * CW - 10,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: strip,
        }}
      >
        eₙ
      </div>
      <div
        style={{
          position: "absolute",
          top: Y2 + 20,
          left: SX,
          fontSize: 38,
          fontWeight: 800,
          color: colors.orange,
          opacity: strip,
        }}
      >
        {tx.probe}
      </div>
      <div
        style={{
          position: "absolute",
          top: Y2 + 20,
          left: 1440,
          fontFamily: fonts.math,
          fontSize: 42,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 6) * strip,
          whiteSpace: "nowrap",
        }}
      >
        f(eₙ) = yₙ
      </div>
      <Chip
        frame={frame}
        at={c3 + 8}
        x={1180}
        y={220}
        color={colors.green}
        math
        size={50}
      >
        eₙ ⇀ 0 · ‖eₙ‖ = 1
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 240,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 20),
          whiteSpace: "nowrap",
        }}
      >
        ‖x‖ ≤ lim inf ‖xₙ‖
      </div>
      <Chip
        frame={frame}
        at={c5 + 8}
        x={1180}
        y={420}
        color={colors.paper}
        size={40}
      >
        {tx.unique}
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 24}
        x={1180}
        y={520}
        color={colors.paper}
        size={40}
      >
        {tx.bounded}
      </Chip>
    </SceneShell>
  );
};
