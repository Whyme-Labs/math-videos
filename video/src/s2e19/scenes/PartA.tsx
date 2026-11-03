import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The end of Part A and the cliffhanger. Motifs of the season (an arrow,
// a stack, a box, a tilted ellipse) gather into one ellipse whose two σ
// bars are all that's left (c0). A star of axes with a counter: 2, 3, 4,
// 6, 10, 20 axes, each theorem's quiet assumption, finite dimension (c1).
// Functions on [0, 1] wiggle as vectors: sin πx, sin 2πx, sin 3πx … (c2).
// Last unit arrows e₁, e₂, e₃, … fan out without end, each pair √2 apart:
// no point for them to crowd towards (c3).

export const PartA: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("partA");
  const [c0, c1, c2, c3] = cues;
  const gather = glide(frame, c0 + 20, fps, 40);
  const part0 = fadeOut(frame, c1, 10);
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const part3 = fadeIn(frame, c3 + 4, 10);
  const DIMS = [2, 3, 4, 6, 10, 20];
  const di = Math.min(
    DIMS.length - 1,
    Math.floor(Math.max(0, frame - c1 - 10) / 22),
  );
  const n = DIMS[di];
  const C = { x: 960, y: 450 };
  const fanN = Math.min(40, Math.floor(Math.max(0, frame - c3 - 6) / 4) + 1);
  const motifs = [
    { x: 360, y: 260 },
    { x: 1560, y: 260 },
    { x: 360, y: 680 },
    { x: 1560, y: 680 },
  ];

  return (
    <SceneShell id="partA">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="chime" at={c0 + 60} volume={0.3} />
      {DIMS.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 10 + i * 22} volume={0.1} />
      ))}
      <Sfx name="pluck2" at={c2 + 6} volume={0.14} />
      <Sfx name="riser" at={c3 + 6} volume={0.1} />

      <AbsoluteFill style={{ opacity: part0 }}>
        <svg width={1920} height={1080}>
          {motifs.map((m, i) => {
            const x = lerp(m.x, C.x, gather);
            const y = lerp(m.y, C.y, gather);
            return (
              <g
                key={i}
                transform={`translate(${x} ${y})`}
                opacity={1 - gather}
              >
                {i === 0 ? (
                  <line
                    x1={-70}
                    y1={50}
                    x2={70}
                    y2={-50}
                    stroke={colors.primary}
                    strokeWidth={12}
                    strokeLinecap="round"
                  />
                ) : null}
                {i === 1
                  ? [-2, -1, 0, 1, 2].map((k) => (
                      <line
                        key={k}
                        x1={k * 26}
                        y1={-70}
                        x2={k * 26}
                        y2={70}
                        stroke={colors.orange}
                        strokeWidth={8}
                      />
                    ))
                  : null}
                {i === 2 ? (
                  <rect
                    x={-70}
                    y={-50}
                    width={140}
                    height={100}
                    fill={alpha(colors.orange, 0.4)}
                    stroke={colors.orange}
                    strokeWidth={6}
                    transform="skewX(-20)"
                  />
                ) : null}
                {i === 3 ? (
                  <ellipse
                    rx={90}
                    ry={45}
                    fill="none"
                    stroke={colors.green}
                    strokeWidth={8}
                    transform="rotate(-25)"
                  />
                ) : null}
              </g>
            );
          })}
          <g
            transform={`translate(${C.x} ${C.y}) rotate(-25)`}
            opacity={gather}
          >
            <ellipse
              rx={260}
              ry={110}
              fill={alpha(colors.primary, 0.1)}
              stroke={colors.primary}
              strokeWidth={8}
            />
            <line
              x1={0}
              y1={0}
              x2={260}
              y2={0}
              stroke={colors.green}
              strokeWidth={12}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-110}
              stroke={colors.highlight}
              strokeWidth={12}
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 64,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
          }}
        >
          {tx.partA}
        </div>
        <div
          style={{
            position: "absolute",
            top: 660,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            opacity: fadeIn(frame, c0 + 60),
          }}
        >
          <span style={{ color: colors.green }}>σ₁</span>
          <span style={{ color: colors.muted }}>{"  ,  "}</span>
          <span style={{ color: colors.highlight }}>σ₂</span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: n }).map((_, k) => {
            const a = (k / n) * Math.PI * 2 + 0.3;
            const r = 300 * (0.6 + 0.4 * Math.abs(Math.cos(a * 1.7)));
            return (
              <line
                key={k}
                x1={C.x}
                y1={C.y}
                x2={C.x + r * Math.cos(a)}
                y2={C.y - r * Math.sin(a) * 0.8}
                stroke={k % 2 ? colors.primary : colors.green}
                strokeWidth={6}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120,
            fontFamily: fonts.mono,
            fontSize: 56,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          dim = {n}
        </div>
        <div
          style={{
            position: "absolute",
            top: 190,
            left: 120,
            fontSize: 46,
            fontWeight: 800,
            color: colors.highlight,
          }}
        >
          {tx.fin}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={360}
            y1={460}
            x2={1560}
            y2={460}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          {[1, 2, 3, 4, 5].map((k) => (
            <path
              key={k}
              d={Array.from({ length: 121 }, (_, i) => {
                const x = i / 120;
                const y =
                  (220 *
                    Math.sin(k * Math.PI * x) *
                    Math.cos(frame * 0.05 * (1 + k * 0.2))) /
                  Math.sqrt(k);
                return `${i ? "L" : "M"} ${360 + 1200 * x} ${460 - y}`;
              }).join(" ")}
              fill="none"
              stroke={
                [
                  colors.primary,
                  colors.orange,
                  colors.highlight,
                  colors.green,
                  colors.text,
                ][k - 1]
              }
              strokeWidth={6}
              opacity={fadeIn(frame, c2 + 6 + k * 8, 8)}
            />
          ))}
          <text
            x={360}
            y={760}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
            textAnchor="middle"
          >
            0
          </text>
          <text
            x={1560}
            y={760}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
            textAnchor="middle"
          >
            1
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: fanN }).map((_, k) => {
            const a = 0.55 + k * 0.38;
            const depth = 1 / (1 + k * 0.08);
            const tip = {
              x: C.x + 330 * depth * Math.cos(a),
              y: C.y - 260 * depth * Math.sin(a),
            };
            return (
              <g key={k} opacity={depth}>
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={k % 2 ? colors.primary : colors.green}
                  strokeWidth={6 * depth}
                />
                <circle
                  cx={tip.x}
                  cy={tip.y}
                  r={10 * depth}
                  fill={colors.text}
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            translate: riseIn(frame, c3 + 6, 14),
          }}
        >
          ‖eᵢ − eⱼ‖ = √2
        </div>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 120,
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.highlight,
          }}
        >
          e₁, e₂, e₃, … ({fanN})
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
