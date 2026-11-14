import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The doubling map. Its graph, a sawtooth, on the right, and a point x on
// a line [0, 1) (c0). x in binary under the line (c1). Steps tick on: the
// digits slide left and the point jumps (c2). A second point whose digits
// agree for 50 places, in green; a bar chart of their gap, doubling each
// step, replaces the sawtooth (c3). Chip: ask about averages (c4).

const BITS: number[] = Array.from({ length: 140 }, (_, i) =>
  rnd(i + 3) > 0.5 ? 1 : 0,
);
const BITS2 = BITS.map((b, i) => (i < 50 ? b : rnd(i + 900) > 0.5 ? 1 : 0));
BITS2[50] = 1 - BITS[50];
const value = (bits: number[], n: number) => {
  let v = 0;
  for (let k = 0; k < 52; k++) v += bits[n + k] / 2 ** (k + 1);
  return v;
};
const LX = (v: number) => 160 + 900 * v;

export const Doubling: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("doubling");
  const [c0, c1, c2, c3, c4] = cues;
  const fast = frame >= c3 ? Math.floor((frame - c3 - 6) / 3) : 0;
  const n = Math.min(
    60,
    Math.max(0, Math.floor((frame - c2 - 6) / 14)) + Math.max(0, fast),
  );
  const xa = value(BITS, n);
  const xb = value(BITS2, n);
  const gaps = Array.from({ length: n + 1 }, (_, k) =>
    Math.abs(value(BITS, k) - value(BITS2, k)),
  );
  const saw = fadeIn(frame, c0 + 6, 8) * fadeOut(frame, c3, 8);
  const row = (bits: number[], col: string, y: number, op: number) => (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 160,
        fontFamily: fonts.mono,
        fontSize: 40,
        fontWeight: 800,
        color: col,
        whiteSpace: "nowrap",
        opacity: op,
      }}
    >
      0.{bits.slice(n, n + 30).join("")}…
    </div>
  );

  return (
    <SceneShell id="doubling">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="tick" at={c1 + 6} volume={0.08} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 14} volume={0.06} />
      ))}
      <Sfx name="riser" at={c3 + 6} volume={0.12} />
      <Sfx name="chime" at={c4 + 20} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <line
            x1={LX(0)}
            y1={560}
            x2={LX(1)}
            y2={560}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          {[0, 1].map((v) => (
            <text
              key={v}
              x={LX(v)}
              y={610}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={32}
              fontFamily={fonts.mono}
            >
              {v}
            </text>
          ))}
          <circle cx={LX(xa)} cy={560} r={14} fill={colors.red} />
          <circle
            cx={LX(xb)}
            cy={560}
            r={9}
            fill={colors.green}
            opacity={fadeIn(frame, c3 + 4, 8)}
          />
        </g>
        <g opacity={saw}>
          <rect
            x={1180}
            y={200}
            width={560}
            height={420}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d="M 1180 620 L 1460 200 M 1460 620 L 1740 200"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <text
            x={1460}
            y={680}
            textAnchor="middle"
            fill={colors.text}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x ↦ 2x mod 1
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <line
            x1={1180}
            y1={620}
            x2={1780}
            y2={620}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {gaps.map((g, k) => {
            const h = 7.4 * Math.max(0, 52 + Math.log2(Math.max(g, 1e-18)));
            return (
              <rect
                key={k}
                x={1180 + k * 10}
                y={620 - Math.min(400, h)}
                width={8}
                height={Math.min(400, h)}
                fill={k >= 50 ? colors.red : colors.orange}
              />
            );
          })}
          <text
            x={1180}
            y={190}
            fill={colors.muted}
            fontSize={34}
            fontFamily={fonts.body}
            fontWeight={700}
          >
            log₂ {tx.gap}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 160,
          fontFamily: fonts.mono,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 6),
          whiteSpace: "nowrap",
        }}
      >
        n = {n}
      </div>
      {row(BITS, colors.red, 300, fadeIn(frame, c1 + 6))}
      {row(BITS2, colors.green, 370, fadeIn(frame, c3 + 6))}
      <Chip
        frame={frame}
        at={c4 + 20}
        x={160}
        y={680}
        color={colors.highlight}
        size={44}
      >
        {tx.averages}
      </Chip>
    </SceneShell>
  );
};
