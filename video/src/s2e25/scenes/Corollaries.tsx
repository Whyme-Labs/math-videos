import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { ballPath, longLine } from "../components/draw";
import { useStrings } from "../i18n";

// Norming functionals. The vector x₀ = (3, −4) grows from the origin
// (c0). The ℓ² circle of radius 5 through x₀ and the level line f = 5
// touching it there (c1); readout f = (3/5, −4/5) reads 5 (c2). The
// circle squares off into the ℓ¹ diamond of radius 7 and the line turns
// to lie along its face, f = (1, −1) reads 7 (c3). On the right, a point
// f runs round the dual ball (the ℓ∞ square) while a bar shows f(x₀);
// the bar touches the dashed line at 7 only at the corner (1, −1) (c4).
// Then two points x and y with a stack of level lines that gives them
// different readings (c5).

const O = { x: 520, y: 470 };
const U = 48;
const X = (x: number) => O.x + U * x;
const Y = (y: number) => O.y - U * y;
const SQ = { x: 1340, y: 600, h: 120 };

// a point running round the square [−1, 1]², starting at (1, 1)
const onSquare = (s: number): [number, number] => {
  const u = ((s % 4) + 4) % 4;
  if (u < 1) return [1, 1 - 2 * u];
  if (u < 2) return [1 - 2 * (u - 1), -1];
  if (u < 3) return [-1, -1 + 2 * (u - 2)];
  return [-1 + 2 * (u - 3), 1];
};

export const Corollaries: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("corollaries");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const grow = glide(frame, c0 + 6, fps, 18);
  const sq = glide(frame, c3 + 6, fps, 30);
  const p = lerp(2, 1, sq);
  const R = lerp(5, 7, sq);
  const nx = lerp(3 / 5, 1, sq);
  const ny = lerp(-4 / 5, -1, sq);
  const part1 = fadeOut(frame, c5, 10);
  const [a, b] = onSquare(0.4 + Math.max(0, frame - c4 - 10) * 0.018);
  const reading = 3 * a - 4 * b;
  const part2 = fadeIn(frame, c5 + 4, 10);
  const P = { x: -2.5, y: 3 };
  const Q = { x: 2, y: 1.2 };
  const d = { x: P.x - Q.x, y: P.y - Q.y };
  const dn = Math.hypot(d.x, d.y);
  const fP = (P.x * d.x + P.y * d.y) / dn;
  const fQ = (Q.x * d.x + Q.y * d.y) / dn;

  return (
    <SceneShell id="corollaries">
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.14} />
      <Sfx name="ding" at={c2 + 8} volume={0.2} />
      <Sfx name="pluck4" at={c3 + 8} volume={0.14} />
      <Sfx name="ding" at={c3 + 40} volume={0.2} />
      <Sfx name="pluck3" at={c4 + 10} volume={0.12} />
      <Sfx name="chime" at={c5 + 10} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <marker
            id="co-head"
            viewBox="0 0 10 10"
            refX={7}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.primary} />
          </marker>
          <clipPath id="co-clip">
            <rect x={X(-7.6)} y={Y(7.6)} width={U * 15.2} height={U * 15.2} />
          </clipPath>
        </defs>
        <line
          x1={X(-7.6)}
          y1={Y(0)}
          x2={X(7.6)}
          y2={Y(0)}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={2}
        />
        <line
          x1={X(0)}
          y1={Y(7.6)}
          x2={X(0)}
          y2={Y(-7.6)}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={2}
        />
        <g opacity={part1}>
          <path
            d={ballPath(p, O.x, O.y, U * R)}
            fill={alpha(colors.paper, 0.08)}
            stroke={colors.paper}
            strokeWidth={4}
            opacity={fadeIn(frame, c1 + 6, 10)}
          />
          <g clipPath="url(#co-clip)" opacity={fadeIn(frame, c1 + 14, 10)}>
            <path
              d={longLine(X(3), Y(-4), ny, nx)}
              stroke={colors.orange}
              strokeWidth={6}
            />
          </g>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(3 * grow)}
            y2={Y(-4 * grow)}
            stroke={colors.primary}
            strokeWidth={8}
            markerEnd="url(#co-head)"
          />
          <text
            x={X(3) + 30}
            y={Y(-4) + 50}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={grow}
          >
            x₀
          </text>
        </g>
        <g opacity={part1 * fadeIn(frame, c4 + 6, 10)}>
          <rect
            x={SQ.x - SQ.h}
            y={SQ.y - SQ.h}
            width={2 * SQ.h}
            height={2 * SQ.h}
            fill={alpha(colors.orange, 0.12)}
            stroke={colors.orange}
            strokeWidth={4}
          />
          <circle
            cx={SQ.x + SQ.h * a}
            cy={SQ.y - SQ.h * b}
            r={14}
            fill={colors.orange}
          />
          <text
            x={SQ.x}
            y={SQ.y + SQ.h + 50}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={34}
            fontFamily={fonts.math}
          >
            ‖f‖ ≤ 1
          </text>
          <line
            x1={1580}
            y1={SQ.y + SQ.h}
            x2={1760}
            y2={SQ.y + SQ.h}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={1580}
            y1={SQ.y + SQ.h - 34 * 7}
            x2={1760}
            y2={SQ.y + SQ.h - 34 * 7}
            stroke={colors.green}
            strokeWidth={4}
            strokeDasharray="12 8"
          />
          <rect
            x={1630}
            y={SQ.y + SQ.h - 34 * Math.max(0, reading)}
            width={80}
            height={34 * Math.max(0, reading)}
            fill={reading > 6.95 ? colors.green : colors.primary}
          />
          <text
            x={1770}
            y={SQ.y + SQ.h - 34 * 7 + 12}
            fill={colors.green}
            fontSize={36}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            7
          </text>
        </g>
        <g opacity={part2}>
          {Array.from({ length: 13 }, (_, i) => {
            const k = (i - 6) * 1.2;
            return (
              <path
                key={i}
                d={longLine(X((k * d.x) / dn), Y((k * d.y) / dn), -d.y, d.x)}
                stroke={alpha(colors.orange, 0.5)}
                strokeWidth={3}
                clipPath="url(#co-clip)"
              />
            );
          })}
          <circle cx={X(P.x)} cy={Y(P.y)} r={16} fill={colors.primary} />
          <circle cx={X(Q.x)} cy={Y(Q.y)} r={16} fill={colors.highlight} />
          <text
            x={X(P.x) - 26}
            y={Y(P.y) - 22}
            textAnchor="end"
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x
          </text>
          <text
            x={X(Q.x) + 26}
            y={Y(Q.y) + 50}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            y
          </text>
        </g>
      </svg>
      <AbsoluteFill style={{ opacity: part1 }}>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 1120,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{ color: colors.orange, opacity: fadeIn(frame, c1 + 20) }}
          >
            f(x₀) = ‖x₀‖
          </div>
          <div
            style={{
              color: colors.text,
              opacity:
                fadeIn(frame, c2 + 6) * (1 - 0.6 * fadeIn(frame, c3 + 6)),
            }}
          >
            ℓ²: f = (3/5, −4/5) · {tx.reads} 5
          </div>
          <div style={{ color: colors.text, opacity: fadeIn(frame, c3 + 30) }}>
            ℓ¹: f = (1, −1) · {tx.reads} 7
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: SQ.y - SQ.h - 90,
            left: 1580,
            fontFamily: fonts.mono,
            fontSize: 38,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c4 + 10),
            whiteSpace: "nowrap",
          }}
        >
          f(x₀) = {reading.toFixed(1)}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1120,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.text,
          opacity: part2,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: colors.primary }}>f(x) = {fP.toFixed(1)}</span> ≠{" "}
        <span style={{ color: colors.highlight }}>f(y) = {fQ.toFixed(1)}</span>
      </div>
    </SceneShell>
  );
};
