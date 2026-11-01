import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// A unitary map, seen right. Two little complex planes, one per
// coordinate, each with a point stepping round its own unit circle at its
// own rate (angles 0.6 and −1.2 per step), leaving a trail. Then its matrix:
// diagonal, with entries e^{0.6i} ≈ 0.8 + 0.6i and e^{−1.2i} ≈ 0.4 − 0.9i;
// a basis change fills it with numbers (the real U = P D P*), while a unit
// circle on the right keeps the two eigenvalue dots exactly where they were.

const ANG = [0.6, -1.2];
const DIAG = ["0.8 + 0.6i", "0", "0", "0.4 − 0.9i"];
const FULL = ["0.6 − 0.1i", "−0.7 + 0.2i", "0.7 − 0.2i", "0.6 − 0.3i"];

export const Unitary: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("unitary");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const step = Math.max(0, Math.floor((frame - c0 - 20) / 14));
  const tween = glide(frame, c0 + 20 + step * 14, fps, 8);
  const fill = glide(frame, c1 + 40, fps, 24);
  const planes = [
    { x: 620, label: tx.coord1 },
    { x: 1300, label: tx.coord2 },
  ];
  const R = 200;

  return (
    <SceneShell id="unitary">
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 20 + k * 14} volume={0.08} />
      ))}
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="ding" at={c1 + 80} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {planes.map((pl, i) => {
            const cy = 470;
            const pos = (n: number) => ({
              x: pl.x + R * Math.cos(n * ANG[i]),
              y: cy - R * Math.sin(n * ANG[i]),
            });
            const now = (step + tween) * ANG[i];
            return (
              <g key={i} opacity={fadeIn(frame, c0 + 6 + i * 8)}>
                <line
                  x1={pl.x - 260}
                  y1={cy}
                  x2={pl.x + 260}
                  y2={cy}
                  stroke={alpha(colors.paper, 0.3)}
                  strokeWidth={3}
                />
                <line
                  x1={pl.x}
                  y1={cy - 260}
                  x2={pl.x}
                  y2={cy + 260}
                  stroke={alpha(colors.paper, 0.3)}
                  strokeWidth={3}
                />
                <circle
                  cx={pl.x}
                  cy={cy}
                  r={R}
                  fill="none"
                  stroke={alpha(colors.primary, 0.5)}
                  strokeWidth={5}
                />
                {Array.from({ length: Math.min(step, 12) }).map((_, k) => (
                  <circle
                    key={k}
                    cx={pos(step - k).x}
                    cy={pos(step - k).y}
                    r={10}
                    fill={alpha(colors.orange, 0.5 - k * 0.04)}
                  />
                ))}
                <line
                  x1={pl.x}
                  y1={cy}
                  x2={pl.x + R * Math.cos(now)}
                  y2={cy - R * Math.sin(now)}
                  stroke={colors.orange}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <circle
                  cx={pl.x + R * Math.cos(now)}
                  cy={cy - R * Math.sin(now)}
                  r={18}
                  fill={colors.orange}
                />
                <text
                  x={pl.x}
                  y={cy - 300}
                  fill={colors.muted}
                  fontSize={44}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {pl.label}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g transform="translate(620 470)">
            <path
              d="M -380 -150 l -24 0 l 0 300 l 24 0 M 380 -150 l 24 0 l 0 300 l -24 0"
              fill="none"
              stroke={colors.text}
              strokeWidth={6}
            />
            {DIAG.map((d, k) => {
              const x = -185 + (k % 2) * 370;
              const y = -50 + Math.floor(k / 2) * 130;
              return (
                <g key={k}>
                  <text
                    x={x}
                    y={y}
                    fill={
                      k === 0 || k === 3
                        ? colors.orange
                        : alpha(colors.text, 0.4)
                    }
                    fontSize={42}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                    fontWeight={800}
                    opacity={1 - fill}
                    transform={`translate(0 ${fill * 30})`}
                  >
                    {d}
                  </text>
                  <text
                    x={x}
                    y={y}
                    fill={colors.text}
                    fontSize={42}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                    fontWeight={800}
                    opacity={fill}
                    transform={`translate(0 ${(1 - fill) * -30})`}
                  >
                    {FULL[k]}
                  </text>
                </g>
              );
            })}
          </g>
          <g transform="translate(1440 470)">
            <line
              x1={-260}
              y1={0}
              x2={260}
              y2={0}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={3}
            />
            <line
              x1={0}
              y1={-260}
              x2={0}
              y2={260}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={3}
            />
            <circle r={R} fill="none" stroke={colors.primary} strokeWidth={6} />
            {ANG.map((a, i) => (
              <circle
                key={i}
                cx={R * Math.cos(a)}
                cy={-R * Math.sin(a)}
                r={20 + 4 * Math.sin((frame - c1) * 0.2 + i)}
                fill={colors.orange}
                opacity={fadeIn(frame, c1 + 14 + i * 6)}
              />
            ))}
            <text
              y={-300}
              fill={colors.muted}
              fontSize={44}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.eigen}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 420,
            width: 400,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 80),
            translate: riseIn(frame, c1 + 80, 12),
          }}
        >
          U U* = I
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
