import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Union vs sum. Two lines through the origin, U and W. An arrow from each,
// added tip to tail, lands on neither line: a red cross, "not a space".
// Then the sum floods in: every combination a·u + b·w lights up as a dot,
// spreading out from the origin until the dots tile the whole plane.

const O = { x: 960, y: 480 };
const S = 105;
const U = { x: 1, y: 0.35 };
const W = { x: -0.45, y: 1 };
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Sum: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("sum");
  const [c0, c1] = cues;
  const u = glide(frame, c0 + 20, fps, 16);
  const w = glide(frame, c0 + 40, fps, 16);
  const cross = Math.min(1, springIn(frame, c0 + 70, fps, 10));
  const flood = ramp(frame, c1 + 20, 50);
  const a = 2;
  const b = 1.6;
  const tipU = scr(a * U.x * u, a * U.y * u);
  const tipSum = scr(a * U.x + b * W.x * w, a * U.y + b * W.y * w);
  const dots: { p: { x: number; y: number }; d: number }[] = [];
  for (let i = -9; i <= 9; i++) {
    for (let j = -5; j <= 5; j++) {
      const p = scr(
        i * 0.8 * U.x + j * 0.8 * W.x,
        i * 0.8 * U.y + j * 0.8 * W.y,
      );
      if (p.x < 160 || p.x > 1760 || p.y < 110 || p.y > 820) continue;
      dots.push({ p, d: Math.hypot(p.x - O.x, p.y - O.y) / 900 });
    }
  }
  const line = (d: { x: number; y: number }) => ({
    a: scr(-9 * d.x, -9 * d.y),
    b: scr(9 * d.x, 9 * d.y),
  });

  return (
    <SceneShell id="sum">
      <Sfx name="pluck1" at={c0 + 20} volume={0.16} />
      <Sfx name="pluck3" at={c0 + 40} volume={0.16} />
      <Sfx name="scratch" at={c0 + 70} volume={0.24} />
      <Sfx name="riser" at={c1 + 20} volume={0.1} />
      <Sfx name="chime" at={c1 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="sumStage">
            <rect x={120} y={90} width={1680} height={740} />
          </clipPath>
        </defs>
        <g clipPath="url(#sumStage)">
          {/* the sum: dots flooding out from the origin */}
          {dots.map(({ p, d }, k) => {
            const t = Math.max(0, Math.min(1, (flood - d * 0.8) * 5));
            return (
              <circle
                key={k}
                cx={p.x}
                cy={p.y}
                r={9 * t}
                fill={alpha(colors.primary, 0.55)}
              />
            );
          })}
          {[
            { d: U, c: colors.orange },
            { d: W, c: colors.highlight },
          ].map(({ d, c }, k) => {
            const l = line(d);
            return (
              <line
                key={k}
                x1={l.a.x}
                y1={l.a.y}
                x2={l.b.x}
                y2={l.b.y}
                stroke={c}
                strokeWidth={8}
                opacity={fadeIn(frame, c0 + k * 8, 10)}
              />
            );
          })}
        </g>
        <Arrow from={O} to={tipU} color={colors.orange} width={12} />
        <Arrow from={tipU} to={tipSum} color={colors.highlight} width={12} />
        <Arrow
          from={O}
          to={tipSum}
          width={14}
          opacity={fadeIn(frame, c0 + 58, 8)}
        />
        <g
          opacity={cross * (1 - flood)}
          transform={`translate(${tipSum.x + 60} ${tipSum.y - 40}) scale(${cross})`}
        >
          <text
            fill={colors.red}
            fontSize={90}
            textAnchor="middle"
            fontWeight={900}
          >
            ✗
          </text>
        </g>
        <text
          x={scr(4.6, 0).x}
          y={scr(4.6, 1.6).y + 16}
          fill={colors.orange}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 6)}
        >
          U
        </text>
        <text
          x={scr(-2.6, 3).x - 50}
          y={scr(0, 3).y + 16}
          fill={colors.highlight}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 14)}
        >
          W
        </text>
      </svg>
      {[
        { t: tx.union, at: c0 + 74, out: c1, c: colors.red },
        { t: tx.sumLabel, at: c1 + 60, out: 99999, c: colors.primary },
      ].map((l) => (
        <div
          key={l.t}
          style={{
            position: "absolute",
            top: 110,
            left: 140,
            padding: "10px 26px",
            borderRadius: 14,
            background: alpha(colors.bg, 0.85),
            fontSize: 48,
            fontWeight: 800,
            color: l.c,
            opacity: fadeIn(frame, l.at) * (frame < l.out ? 1 : 0),
            translate: riseIn(frame, l.at, 16),
          }}
        >
          {l.t}
        </div>
      ))}
    </SceneShell>
  );
};
