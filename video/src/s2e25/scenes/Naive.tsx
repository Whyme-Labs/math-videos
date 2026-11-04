import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The naive extension. A plane with the subspace M (the x-axis) glowing
// (c0); f's readings tick along it (c1). Level lines of F = x + c·y
// through those ticks, swinging as c changes: every c agrees with f on M
// (c2). On the right a cloud of basis chips, a Hamel basis (c3), and the
// monster bars F(eₙ) = n climbing (c4). Chip: ‖F‖ = ‖f‖ (c5).

const O = { x: 620, y: 460 };
const U = 80;
const X = (x: number) => O.x + U * x;
const Y = (y: number) => O.y - U * y;

export const Naive: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("naive");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const c =
    frame >= c2
      ? Math.sin((frame - c2 - 10) * 0.045) * fadeIn(frame, c2 + 10, 20)
      : 0;
  const bars = Math.min(10, Math.max(0, Math.floor((frame - c4 - 6) / 5)));
  const cloud = fadeIn(frame, c3 + 6, 10) * fadeOut(frame, c4, 10);

  return (
    <SceneShell id="naive">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 9 }, (_, k) => (
        <Sfx key={k} name="tick" at={c1 + 6 + k * 3} volume={0.07} />
      ))}
      <Sfx name="whoosh" at={c2 + 10} volume={0.1} />
      <Sfx name="pluck3" at={c3 + 6} volume={0.14} />
      {Array.from({ length: 10 }, (_, k) => (
        <Sfx
          key={k}
          name="pluck1"
          at={c4 + 6 + k * 5}
          volume={0.06 + k * 0.006}
        />
      ))}
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="nv-clip">
            <rect
              x={X(-5)}
              y={Y(3.9)}
              width={U * 10}
              height={U * 7.8}
              rx={20}
            />
          </clipPath>
        </defs>
        <g opacity={fadeIn(frame, c0 + 2, 10)}>
          <rect
            x={X(-5)}
            y={Y(3.9)}
            width={U * 10}
            height={U * 7.8}
            rx={20}
            fill={alpha(colors.paper, 0.04)}
            stroke={alpha(colors.paper, 0.2)}
            strokeWidth={3}
          />
          <line
            x1={X(0)}
            y1={Y(3.9)}
            x2={X(0)}
            y2={Y(-3.9)}
            stroke={alpha(colors.paper, 0.25)}
            strokeWidth={2}
          />
          <text
            x={X(4.7)}
            y={Y(3.4)}
            textAnchor="end"
            fill={colors.muted}
            fontSize={48}
            fontFamily={fonts.math}
          >
            X
          </text>
        </g>
        <g clipPath="url(#nv-clip)" opacity={fadeIn(frame, c2 + 6, 10)}>
          {Array.from({ length: 9 }, (_, i) => {
            const k = i - 4;
            return (
              <line
                key={k}
                x1={X(k + 4 * c)}
                y1={Y(-4)}
                x2={X(k - 4 * c)}
                y2={Y(4)}
                stroke={colors.orange}
                strokeWidth={k === 0 ? 5 : 3}
                opacity={k === 0 ? 1 : 0.7}
              />
            );
          })}
        </g>
        <line
          x1={X(-5)}
          y1={Y(0)}
          x2={X(5)}
          y2={Y(0)}
          stroke={colors.primary}
          strokeWidth={9}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
        <text
          x={X(4.6)}
          y={Y(0) - 22}
          textAnchor="end"
          fill={colors.primary}
          fontSize={48}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 6, 8)}
        >
          M
        </text>
        {Array.from({ length: 9 }, (_, i) => {
          const k = i - 4;
          return (
            <g key={k} opacity={fadeIn(frame, c1 + 6 + i * 3, 6)}>
              <circle cx={X(k)} cy={Y(0)} r={10} fill={colors.paper} />
              <text
                x={X(k)}
                y={Y(0) + 50}
                textAnchor="middle"
                fill={colors.text}
                fontSize={34}
                fontFamily={fonts.mono}
                fontWeight={700}
              >
                {k}
              </text>
            </g>
          );
        })}
        <g opacity={cloud}>
          {Array.from({ length: 30 }, (_, k) => (
            <rect
              key={k}
              x={1180 + rnd(k) * 520}
              y={260 + rnd(k + 99) * 440}
              width={64}
              height={44}
              rx={10}
              fill={alpha(colors.paper, 0.08 + 0.1 * rnd(k + 7))}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={2}
            />
          ))}
        </g>
        <g
          opacity={
            fadeIn(frame, c4 + 4, 8) * (1 - 0.75 * fadeIn(frame, c5, 10))
          }
        >
          <line
            x1={1180}
            y1={760}
            x2={1780}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: bars }, (_, k) => (
            <rect
              key={k}
              x={1196 + k * 58}
              y={760 - 46 * (k + 1)}
              width={36}
              height={46 * (k + 1)}
              rx={4}
              fill={colors.red}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1180,
          display: "flex",
          gap: 14,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.text,
          opacity: cloud,
        }}
      >
        {["e₁", "e₂", "e₃", "…"].map((e, i) => (
          <span
            key={e}
            style={{
              padding: "4px 16px",
              borderRadius: 10,
              border: `3px solid ${colors.paper}`,
              opacity: fadeIn(frame, c3 + 6 + i * 4),
            }}
          >
            {e}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          fontSize: 40,
          fontWeight: 700,
          color: colors.muted,
          opacity: cloud,
        }}
      >
        {tx.hamel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 10) * fadeOut(frame, c5, 10),
          whiteSpace: "nowrap",
        }}
      >
        F(eₙ) = n → ∞
      </div>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: X(-5),
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 10),
          whiteSpace: "nowrap",
        }}
      >
        F(x, y) = x + c·y ·{" "}
        <span style={{ fontFamily: fonts.mono }}>c = {c.toFixed(2)}</span>
      </div>
      <Chip
        frame={frame}
        at={c5 + 6}
        x={1300}
        y={420}
        color={colors.green}
        math
        size={60}
      >
        {tx.sameNorm}
      </Chip>
    </SceneShell>
  );
};
