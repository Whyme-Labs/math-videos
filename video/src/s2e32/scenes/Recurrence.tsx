import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Poincaré recurrence. The space X as a long bar with A marked on it; an
// orbit hops along (a golden rotation) and lights up each time it lands
// back in A (c0). B, the points of A that never return, as a red strip
// inside A (c1). Copies of B, T⁻¹B, T⁻²B, …, laid end to end on a second
// bar of length 1 (c2); they run past the end, so the strip must shrink,
// and it does, to nothing (c3). Chip: μ(B) = 0 (c4).

const X0 = 200;
const XW = 1500;
const A = [0.25, 0.45];
const GOLD = (Math.sqrt(5) - 1) / 2;
const COPIES = 14;

export const Recurrence: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("recurrence");
  const [c0, c1, c2, c3, c4] = cues;
  const hops = Math.min(40, Math.max(0, Math.floor((frame - c0 - 8) / 5)));
  const orbit = Array.from(
    { length: hops + 1 },
    (_, k) => (0.3 + k * GOLD) % 1,
  );
  const w0 = 0.11;
  const w = w0 * (1 - progress(frame, c3 + 40, 40));
  const copies = Math.min(
    COPIES,
    Math.max(0, Math.floor((frame - c2 - 6) / 8)),
  );
  const total = copies * w;

  return (
    <SceneShell id="recurrence">
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 8 + i * 15} volume={0.05} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      {Array.from({ length: COPIES }, (_, i) => (
        <Sfx key={i} name="clink" at={c2 + 6 + i * 8} volume={0.06} />
      ))}
      <Sfx name="whoosh" at={c3 + 40} volume={0.12} />
      <Sfx name="chime" at={c4 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <rect
            x={X0}
            y={260}
            width={XW}
            height={70}
            rx={12}
            fill={alpha(colors.paper, 0.08)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <rect
            x={X0 + XW * A[0]}
            y={260}
            width={XW * (A[1] - A[0])}
            height={70}
            fill={alpha(colors.green, 0.4)}
            stroke={colors.green}
            strokeWidth={4}
          />
          {orbit.map((v, k) => {
            const inA = v >= A[0] && v <= A[1];
            return (
              <circle
                key={k}
                cx={X0 + XW * v}
                cy={295}
                r={k === hops ? 14 : 7}
                fill={inA ? colors.primary : alpha(colors.paper, 0.5)}
                opacity={k === hops ? 1 : 0.7}
              />
            );
          })}
          <rect
            x={X0 + XW * (A[0] + 0.05)}
            y={260}
            width={XW * w}
            height={70}
            fill={colors.red}
            opacity={fadeIn(frame, c1 + 6, 8)}
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 2, 8)}>
          <rect
            x={X0}
            y={500}
            width={XW}
            height={80}
            rx={12}
            fill={alpha(colors.paper, 0.06)}
            stroke={colors.paper}
            strokeWidth={4}
          />
          {Array.from({ length: copies }, (_, k) => (
            <rect
              key={k}
              x={X0 + XW * k * w + 2}
              y={510}
              width={Math.max(0, XW * w - 4)}
              height={60}
              rx={6}
              fill={
                X0 + XW * (k + 1) * w > X0 + XW ? colors.red : colors.orange
              }
            />
          ))}
          <text
            x={X0}
            y={480}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.mono}
          >
            μ(X) = 1
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: X0,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c1, 8),
          whiteSpace: "nowrap",
        }}
      >
        A ⊂ X
      </div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: X0,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 10),
          whiteSpace: "nowrap",
        }}
      >
        B = {tx.neverBack}
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: X0,
          fontFamily: fonts.mono,
          fontSize: 46,
          fontWeight: 800,
          color: total > 1 ? colors.red : colors.orange,
          opacity: fadeIn(frame, c2 + 10),
          whiteSpace: "nowrap",
        }}
      >
        {copies} × μ(B) = {total.toFixed(2)}
      </div>
      <Chip
        frame={frame}
        at={c4 + 20}
        x={1260}
        y={630}
        color={colors.green}
        size={50}
        math
      >
        μ(B) = 0
      </Chip>
    </SceneShell>
  );
};
