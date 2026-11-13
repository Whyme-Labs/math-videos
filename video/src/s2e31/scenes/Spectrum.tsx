import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The spectrum. A complex plane with a sample spectrum: two eigenvalue
// dots, a segment and a small disk. A probe λ wanders; it turns red
// whenever T − λ fails to invert (c0). Three cards: point spectrum, red
// (c1); continuous and residual spectrum, orange and lemon (c2). The disk
// |λ| ≤ ‖T‖ drawn dashed and everything outside it shaded as invertible,
// with the geometric series beside it (c3). The spectrum glows, closed and
// inside the disk (c4). Chip: never empty (c5).

const CX = 640;
const CY = 450;
const U = 230;
const R = 1.35;
const DOTS: [number, number][] = [
  [0.75, 0.45],
  [0.75, -0.45],
];
const SEG: [number, number] = [-0.8, 0.25];
const DISK = { x: -0.35, y: 0.6, r: 0.22 };
const sx = (x: number) => CX + U * x;
const sy = (y: number) => CY - U * y;
const inSpec = (x: number, y: number) =>
  DOTS.some(([a, b]) => Math.hypot(x - a, y - b) < 0.09) ||
  (x > SEG[0] - 0.04 && x < SEG[1] + 0.04 && Math.abs(y) < 0.06) ||
  Math.hypot(x - DISK.x, y - DISK.y) < DISK.r + 0.04;

export const Spectrum: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("spectrum");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const t = Math.max(0, frame - c0 - 10) / 50;
  const lx = 0.85 * Math.cos(t) - 0.15;
  const ly = 0.62 * Math.sin(1.7 * t);
  const hitNow = inSpec(lx, ly);
  const glow = fadeIn(frame, c4 + 4, 10) * (0.6 + 0.4 * Math.sin(frame * 0.2));
  const cards: [string, string, string, number][] = [
    ["p", tx.point, colors.red, c1],
    ["c", tx.continuous, colors.orange, c2],
    ["r", tx.residual, colors.highlight, c2 + 30],
  ];
  const outside = progress(frame, c3 + 6, 20);

  return (
    <SceneShell id="spectrum">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 8} volume={0.12} />
      <Sfx name="pluck4" at={c2 + 38} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="ding" at={c4 + 8} volume={0.2} />
      <Sfx name="chime" at={c5 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <mask id="sp-out">
            <rect x={0} y={0} width={1920} height={1080} fill="white" />
            <circle cx={CX} cy={CY} r={R * U} fill="black" />
          </mask>
        </defs>
        <rect
          x={140}
          y={100}
          width={1000}
          height={700}
          fill={alpha(colors.green, 0.16)}
          mask="url(#sp-out)"
          opacity={outside}
        />
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <line
            x1={140}
            y1={CY}
            x2={1140}
            y2={CY}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <line
            x1={CX}
            y1={100}
            x2={CX}
            y2={800}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <text
            x={1110}
            y={CY - 16}
            fill={colors.muted}
            fontSize={34}
            fontFamily={fonts.math}
          >
            ℂ
          </text>
        </g>
        <circle
          cx={CX}
          cy={CY}
          r={R * U}
          fill="none"
          stroke={colors.green}
          strokeWidth={4}
          strokeDasharray="12 9"
          opacity={outside}
        />
        <g opacity={fadeIn(frame, c0 + 6, 8)}>
          {glow > 0 && (
            <g opacity={glow} stroke={colors.highlight} strokeWidth={22}>
              <line
                x1={sx(SEG[0])}
                y1={CY}
                x2={sx(SEG[1])}
                y2={CY}
                strokeLinecap="round"
              />
              {DOTS.map(([a, b]) => (
                <circle key={a + b} cx={sx(a)} cy={sy(b)} r={12} />
              ))}
              <circle cx={sx(DISK.x)} cy={sy(DISK.y)} r={DISK.r * U} />
            </g>
          )}
          <line
            x1={sx(SEG[0])}
            y1={CY}
            x2={sx(SEG[1])}
            y2={CY}
            stroke={colors.orange}
            strokeWidth={12}
            strokeLinecap="round"
          />
          {DOTS.map(([a, b]) => (
            <circle
              key={a + b}
              cx={sx(a)}
              cy={sy(b)}
              r={14}
              fill={colors.red}
            />
          ))}
          <circle
            cx={sx(DISK.x)}
            cy={sy(DISK.y)}
            r={DISK.r * U}
            fill={alpha(colors.highlight, 0.85)}
          />
        </g>
        <g opacity={fadeIn(frame, c0 + 10, 8) * fadeOut(frame, c4, 10)}>
          <circle
            cx={sx(lx)}
            cy={sy(ly)}
            r={22}
            fill="none"
            stroke={hitNow ? colors.red : colors.paper}
            strokeWidth={6}
          />
          <text
            x={sx(lx) + 28}
            y={sy(ly) - 22}
            fill={hitNow ? colors.red : colors.text}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λ
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1220,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          opacity: fadeOut(frame, c3, 10),
        }}
      >
        {cards.map(([sym, text, col, at]) => (
          <div
            key={sym}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "14px 24px",
              borderRadius: 16,
              border: `4px solid ${col}`,
              opacity: fadeIn(frame, at + 6),
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: fonts.math,
                fontSize: 48,
                fontWeight: 800,
                color: col,
              }}
            >
              σ<sub style={{ fontSize: 30 }}>{sym}</sub>
            </span>
            <span style={{ fontSize: 38, fontWeight: 700, color: colors.text }}>
              {text}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 1220,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 16) * fadeOut(frame, c5, 10),
        }}
      >
        (T − λ)⁻¹ = −Σ Tⁿ / λⁿ⁺¹
      </div>
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 1220,
          fontSize: 40,
          fontWeight: 700,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 26),
          whiteSpace: "nowrap",
        }}
      >
        |λ| {">"} ‖T‖ ⟹ {tx.invertible}
      </div>
      <Chip
        frame={frame}
        at={c5 + 20}
        x={1220}
        y={420}
        color={colors.highlight}
        size={48}
      >
        σ(T) ≠ ∅ · {tx.nonEmpty}
      </Chip>
    </SceneShell>
  );
};
