import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, longLine } from "../components/draw";
import { useStrings } from "../i18n";

// The closed graph theorem. The plane X × Y with the graph of T as a line
// through the origin; points (xₖ, Txₖ) slide along it to a limit that's
// still on it (c0). Chip: T is bounded (c1). Then d/dx on C¹ with the
// sup norm: the curves xⁿ, all topping out at 1 (c2), and the tangent at
// x = 1 tilting up with slope n (c3). Chip: C¹ with the sup norm isn't
// complete, with smooth curves closing in on the corner of |x − ½| (c4).

const G = { x: 760, y: 470, u: 140 };
const P = { x: 220, y: 720, w: 600, h: 520 };
const px = (x: number) => P.x + P.w * x;
const py = (y: number) => P.y - P.h * y;

export const ClosedGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("closedGraph");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10);
  const k = Math.min(10, Math.max(0, Math.floor((frame - c0 - 10) / 10)));
  const seq = Array.from(
    { length: k },
    (_, i) => 2.2 + 1.6 * (i % 2 ? -1 : 1) * 0.7 ** i,
  );
  const n =
    frame < c3
      ? Math.min(10, 1 + Math.floor((frame - c2 - 6) / 8))
      : Math.min(10, 1 + Math.floor((frame - c3 - 6) / 10));
  const smooth = Math.min(5, Math.max(0, Math.floor((frame - c4 - 20) / 12)));

  return (
    <SceneShell id="closedGraph">
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 10 + i * 10} volume={0.06} />
      ))}
      <Sfx name="ding" at={c1 + 8} volume={0.22} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="pluck1" at={c2 + 6 + i * 8} volume={0.07} />
      ))}
      <Sfx name="pluck4" at={c3 + 8} volume={0.14} />
      <Sfx name="thud" at={c4 + 10} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={G.x - 560}
            y1={G.y}
            x2={G.x + 560}
            y2={G.y}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={G.x}
            y1={G.y + 330}
            x2={G.x}
            y2={G.y - 330}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={longLine(G.x, G.y, 1, -0.55, 620)}
            stroke={alpha(colors.primary, 0.3)}
            strokeWidth={22}
            strokeLinecap="round"
          />
          <path
            d={longLine(G.x, G.y, 1, -0.55, 620)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {seq.map((x, i) => (
            <circle
              key={i}
              cx={G.x + G.u * x}
              cy={G.y - G.u * 0.55 * x}
              r={10}
              fill={colors.highlight}
              opacity={0.4 + 0.6 * (i === seq.length - 1 ? 1 : 0.5)}
            />
          ))}
          <circle
            cx={G.x + G.u * 2.2}
            cy={G.y - G.u * 0.55 * 2.2}
            r={18}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 110, 8)}
          />
          <text
            x={G.x + 560}
            y={G.y + 50}
            textAnchor="end"
            fill={colors.muted}
            fontSize={44}
            fontFamily={fonts.math}
          >
            X
          </text>
          <text
            x={G.x + 20}
            y={G.y - 300}
            fill={colors.muted}
            fontSize={44}
            fontFamily={fonts.math}
          >
            Y
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1300,
            fontSize: 40,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {tx.graph}
        </div>
        <Chip
          frame={frame}
          at={c1 + 8}
          x={240}
          y={140}
          color={colors.green}
          size={50}
        >
          {tx.bounded}
        </Chip>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={P.x}
            y1={P.y}
            x2={P.x + P.w}
            y2={P.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={P.x}
            y1={P.y}
            x2={P.x}
            y2={P.y - P.h}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={P.x}
            y1={py(1)}
            x2={P.x + P.w}
            y2={py(1)}
            stroke={alpha(colors.green, 0.6)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {Array.from({ length: n }, (_, i) => (
            <path
              key={i}
              d={Array.from(
                { length: 101 },
                (_, s) =>
                  `${s ? "L" : "M"} ${px(s / 100)} ${py((s / 100) ** (i + 1))}`,
              ).join(" ")}
              fill="none"
              stroke={i === n - 1 ? colors.primary : alpha(colors.primary, 0.4)}
              strokeWidth={i === n - 1 ? 5 : 3}
            />
          ))}
          <g opacity={fadeIn(frame, c3 + 6, 8)}>
            <path
              d={longLine(px(1), py(1), 1 / P.w, -n / P.h, 260)}
              stroke={colors.orange}
              strokeWidth={5}
            />
            <circle cx={px(1)} cy={py(1)} r={10} fill={colors.orange} />
          </g>
          <g opacity={fadeIn(frame, c4 + 10, 8)}>
            <line
              x1={1100}
              y1={P.y}
              x2={1700}
              y2={P.y}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            <path
              d={Array.from(
                { length: 101 },
                (_, s) =>
                  `${s ? "L" : "M"} ${1100 + 6 * s} ${P.y - 400 * Math.abs(s / 100 - 0.5)}`,
              ).join(" ")}
              fill="none"
              stroke={colors.red}
              strokeWidth={5}
            />
            {Array.from({ length: smooth }, (_, j) => {
              const e = 0.18 * 0.5 ** j;
              return (
                <path
                  key={j}
                  d={Array.from(
                    { length: 101 },
                    (_, s) =>
                      `${s ? "L" : "M"} ${1100 + 6 * s} ${P.y - 400 * Math.sqrt((s / 100 - 0.5) ** 2 + e * e)}`,
                  ).join(" ")}
                  fill="none"
                  stroke={alpha(colors.primary, 0.6)}
                  strokeWidth={3}
                />
              );
            })}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 900,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: colors.green, opacity: fadeIn(frame, c2 + 20) }}>
            ‖xⁿ‖∞ = 1
          </div>
          <div
            style={{ color: colors.orange, opacity: fadeIn(frame, c3 + 20) }}
          >
            {tx.slope} = <span style={{ fontFamily: fonts.mono }}>{n}</span>
          </div>
        </div>
        <Chip
          frame={frame}
          at={c4 + 10}
          x={900}
          y={330}
          color={colors.red}
          size={40}
        >
          {tx.notComplete}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
