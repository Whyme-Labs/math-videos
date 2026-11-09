import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The escaping bump. A bump of height 1 on a long line (c0). It slides
// right while a counter runs 1, 10, …, a million (c1); an energy meter on
// the right stays full (c2). A sensor is planted (c3); the bump passes
// over it, its trace twitches and falls back to 0 (c4). Seven more
// sensors, all reading 0 once the bump has gone by (c5). The bump leaves
// the frame: escaped to ∞, the meter still full (c6). Chip: ask only the
// measurements (c7).

const LY = 640;
const H = 220;
const W = 70;
const bump = (d: number) => Math.max(0, 1 - (d / W) ** 2) ** 2;
const SENSOR = 1060;
const MORE = [260, 420, 580, 760, 900, 1220, 1380];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const pos = (f: number) => {
    if (f < c1) return 360;
    if (f < c3) return 360 + (240 * (f - c1)) / (c3 - c1);
    if (f < c4 + 60) return 600 + (800 * (f - c3)) / (c4 + 60 - c3);
    return 1400 + 6 * (f - c4 - 60);
  };
  const p = pos(frame);
  const reading = (f: number) => bump(SENSOR - pos(f));
  const steps =
    frame < c1
      ? 1
      : Math.round(10 ** Math.min(6, ((frame - c1) / (c3 - c1)) * 6));
  const trace: string[] = [];
  for (let f = c3; f <= frame; f += 2)
    trace.push(
      `${trace.length ? "L" : "M"} ${1300 + (f - c3) * 0.9} ${300 - 120 * reading(f)}`,
    );

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="ding" at={c2 + 8} volume={0.18} />
      <Sfx name="clink" at={c3 + 8} volume={0.16} />
      <Sfx name="tick" at={c4 + 10} volume={0.1} />
      {MORE.map((_, i) => (
        <Sfx key={i} name="clink" at={c5 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="whoosh" at={c6 + 6} volume={0.12} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={80}
          y1={LY}
          x2={1840}
          y2={LY}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
          opacity={fadeIn(frame, c0 + 2, 8)}
        />
        <path
          d={Array.from({ length: 81 }, (_, i) => {
            const x = p - W + (2 * W * i) / 80;
            return `${i ? "L" : "M"} ${x} ${LY - H * bump(x - p)}`;
          }).join(" ")}
          fill={alpha(colors.primary, 0.35)}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <rect
            x={SENSOR - 14}
            y={LY + 10}
            width={28}
            height={60}
            rx={6}
            fill={colors.orange}
          />
          <rect
            x={SENSOR - 40}
            y={LY + 80}
            width={80}
            height={14}
            rx={7}
            fill={alpha(colors.orange, 0.3)}
          />
          <rect
            x={SENSOR - 40}
            y={LY + 80}
            width={80 * reading(frame)}
            height={14}
            rx={7}
            fill={colors.orange}
          />
        </g>
        {MORE.map((x, i) => (
          <g key={x} opacity={fadeIn(frame, c5 + 6 + i * 6, 6)}>
            <rect
              x={x - 12}
              y={LY + 10}
              width={24}
              height={50}
              rx={6}
              fill={colors.orange}
            />
            <text
              x={x}
              y={LY + 100}
              textAnchor="middle"
              fill={colors.orange}
              fontSize={30}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              0
            </text>
          </g>
        ))}
        <g opacity={fadeIn(frame, c3 + 6, 8) * fadeOut(frame, c6, 10)}>
          <line
            x1={1300}
            y1={300}
            x2={1760}
            y2={300}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          {trace.length > 1 && (
            <path
              d={trace.join(" ")}
              fill="none"
              stroke={colors.orange}
              strokeWidth={4}
            />
          )}
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <rect
            x={1790}
            y={140}
            width={40}
            height={300}
            rx={8}
            fill={alpha(colors.paper, 0.1)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <rect
            x={1790}
            y={140}
            width={40}
            height={300}
            rx={8}
            fill={alpha(colors.green, 0.7)}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 160,
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c4, 10),
          whiteSpace: "nowrap",
        }}
      >
        step {steps.toLocaleString("en-US")}
      </div>
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 1700,
          width: 220,
          textAlign: "center",
          fontSize: 32,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 8),
        }}
      >
        {tx.energy} 1
      </div>
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 1300,
          fontSize: 34,
          fontWeight: 700,
          color: colors.orange,
          opacity: fadeIn(frame, c3 + 10) * fadeOut(frame, c6, 10),
        }}
      >
        {tx.sensor}
      </div>
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 1500,
          fontSize: 48,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c6 + 10),
          translate: riseIn(frame, c6 + 10),
          whiteSpace: "nowrap",
        }}
      >
        {tx.escaped} →
      </div>
      <Chip frame={frame} at={c7 + 6} x={160} y={200} color={colors.green}>
        {tx.onlyMeasure}
      </Chip>
    </SceneShell>
  );
};
