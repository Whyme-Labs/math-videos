import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The showcase: a continuous function whose Fourier series diverges at 0.
// Sₙ f(0) = ∫ f·Dₙ and an empty plot (c0). The Dirichlet kernel Dₙ for
// n = 1, 2, 3, …, taller and wigglier each time (c1). |Dₙ| shaded: its
// area is the norm of f ↦ Sₙ f(0) (c2). On the right, bars of the
// Lebesgue constants for n = 1, 2, 5, 10, 100, 1000 next to the curve
// (4/π²) ln n + 1.27 (c3). Chip: some f has Sₙ f(0) → ∞ (c4). A field of
// dots, one per continuous function, nearly all turning red (c5).

const PX = 140;
const PW = 920;
const PY = 600;
const KY = 13;
const sx = (t: number) => PX + (PW * (t + Math.PI)) / (2 * Math.PI);
const D = (n: number, t: number) =>
  Math.abs(t) < 1e-6 ? 2 * n + 1 : Math.sin((n + 0.5) * t) / Math.sin(t / 2);
const TABLE: [string, number][] = [
  ["1", 1.436],
  ["2", 1.6422],
  ["5", 1.9614],
  ["10", 2.2234],
  ["100", 3.1388],
  ["1000", 4.0702],
];
const BX = 1200;
const BY = 760;
const BU = 90;

export const Fourier: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("fourier");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const n =
    frame < c1 ? 0 : Math.min(12, 1 + Math.floor((frame - c1 - 6) / 12));
  const curve = (g: (t: number) => number) =>
    Array.from({ length: 601 }, (_, i) => {
      const t = -Math.PI + (2 * Math.PI * i) / 600;
      return `${i ? "L" : "M"} ${sx(t)} ${PY - KY * g(t)}`;
    }).join(" ");
  const bars = Math.min(
    TABLE.length,
    Math.max(0, Math.floor((frame - c3 - 6) / 10)),
  );
  const plot = 1 - fadeIn(frame, c5, 10);
  const dots = fadeIn(frame, c5 + 4, 10);

  return (
    <SceneShell id="fourier">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx
          key={i}
          name="pluck1"
          at={c1 + 6 + i * 12}
          volume={0.06 + 0.01 * i}
        />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      {TABLE.map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 10} volume={0.08} />
      ))}
      <Sfx name="thud" at={c4 + 10} volume={0.22} />
      <Sfx name="sparkle" at={c5 + 20} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 4, 8) * plot}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={sx(0)}
            y1={PY + 120}
            x2={sx(0)}
            y2={PY - 360}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          {n > 0 && (
            <>
              <path
                d={`${curve((t) => Math.abs(D(n, t)))} L ${PX + PW} ${PY} L ${PX} ${PY} Z`}
                fill={alpha(colors.orange, 0.35)}
                opacity={fadeIn(frame, c2 + 6, 10)}
              />
              <path
                d={curve((t) => D(n, t))}
                fill="none"
                stroke={colors.primary}
                strokeWidth={4}
              />
            </>
          )}
        </g>
        <g opacity={fadeIn(frame, c3 + 4, 8) * plot}>
          <line
            x1={BX}
            y1={BY}
            x2={BX + 600}
            y2={BY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {TABLE.slice(0, bars).map(([lab, v], i) => (
            <g key={lab}>
              <rect
                x={BX + 16 + i * 98}
                y={BY - BU * v}
                width={60}
                height={BU * v}
                rx={6}
                fill={colors.orange}
              />
              <text
                x={BX + 46 + i * 98}
                y={BY + 40}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={30}
                fontFamily={fonts.mono}
              >
                {lab}
              </text>
              <text
                x={BX + 46 + i * 98}
                y={BY - BU * v - 14}
                textAnchor="middle"
                fill={colors.text}
                fontSize={26}
                fontFamily={fonts.mono}
              >
                {v.toFixed(2)}
              </text>
            </g>
          ))}
        </g>
        <g opacity={dots}>
          {Array.from({ length: 22 * 9 }, (_, i) => {
            const red = rnd(i) > 0.06 && frame > c5 + 10 + (i % 22) * 2;
            return (
              <circle
                key={i}
                cx={260 + (i % 22) * 60}
                cy={260 + Math.floor(i / 22) * 56}
                r={12}
                fill={red ? colors.red : alpha(colors.paper, 0.5)}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: PX,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c5, 8),
          whiteSpace: "nowrap",
        }}
      >
        Sₙ f(0) = ∫ f·Dₙ
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: PX,
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c5, 8),
        }}
      >
        n = {Math.max(1, n)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 560,
          fontSize: 40,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 16) * fadeOut(frame, c5, 8),
          whiteSpace: "nowrap",
        }}
      >
        {tx.lebesgue}
      </div>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: BX,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c3 + 50) * fadeOut(frame, c5, 8),
          whiteSpace: "nowrap",
        }}
      >
        ≈ (4/π²) ln n + 1.27
      </div>
      <div style={{ opacity: 1 - fadeIn(frame, c5, 10) }}>
        <Chip frame={frame} at={c4 + 10} x={BX} y={250} color={colors.red} math>
          {tx.diverges}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c5 + 40}
        x={600}
        y={120}
        color={colors.red}
        size={50}
      >
        {tx.most}
      </Chip>
    </SceneShell>
  );
};
