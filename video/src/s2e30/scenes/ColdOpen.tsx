import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// A string and the spectral theorem. A plucked string between two pegs
// (c0). Below it, its first four modes, each vibrating at its own rate
// (c1), with their frequencies 1, 2, 3, 4 marked (c2). A tilted ellipse
// with its principal axes (c3) turns to line up with the coordinate axes
// (c4). Modes keep coming, smaller and faster, without end (c5). A red
// chip: some operators have no eigenvectors (c6). Chip: compact = almost
// finite (c7).

const SX = 260;
const SW = 1400;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  const pluck = (s: number) =>
    [0.5, 0.25, 0.15, 0.1].reduce(
      (acc, a, k) =>
        acc +
        a * Math.sin((k + 1) * Math.PI * s) * Math.cos((k + 1) * frame * 0.22),
      0,
    ) * Math.exp(-Math.max(0, frame - c0 - 6) * 0.004);
  const rot = glide(frame, c4 + 6, fps, 30);
  const ang = 0.6 * (1 - rot);
  const modes = Math.min(
    14,
    4 + Math.max(0, Math.floor((frame - c5 - 6) / 10)),
  );

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pluck1" at={c0 + 6} volume={0.2} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="pluck2" at={c1 + 6 + k * 10} volume={0.08} />
      ))}
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="clink" at={c4 + 36} volume={0.16} />
      <Sfx name="tick" at={c5 + 10} volume={0.06} />
      <Sfx name="thud" at={c6 + 8} volume={0.2} />
      <Sfx name="chime" at={c7 + 8} volume={0.3} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <rect
            x={SX - 30}
            y={180}
            width={24}
            height={80}
            rx={6}
            fill={colors.wood}
          />
          <rect
            x={SX + SW + 6}
            y={180}
            width={24}
            height={80}
            rx={6}
            fill={colors.wood}
          />
          <path
            d={Array.from(
              { length: 201 },
              (_, i) =>
                `${i ? "L" : "M"} ${SX + (SW * i) / 200} ${220 - 90 * pluck(i / 200)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          {[1, 2, 3, 4].map((n, i) => (
            <g key={n} opacity={fadeIn(frame, c1 + 6 + i * 10, 8)}>
              <line
                x1={SX}
                y1={380 + i * 110}
                x2={SX + SW * 0.7}
                y2={380 + i * 110}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={2}
              />
              <path
                d={Array.from(
                  { length: 151 },
                  (_, j) =>
                    `${j ? "L" : "M"} ${SX + (SW * 0.7 * j) / 150} ${380 + i * 110 - 40 * Math.sin((n * Math.PI * j) / 150) * Math.cos(n * frame * 0.22)}`,
                ).join(" ")}
                fill="none"
                stroke={colors.orange}
                strokeWidth={4}
              />
              <text
                x={SX + SW * 0.7 + 40}
                y={392 + i * 110}
                fill={colors.green}
                fontSize={40}
                fontFamily={fonts.mono}
                fontWeight={800}
                opacity={fadeIn(frame, c2 + 6 + i * 8, 6)}
              >
                ω = {n}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={560}
            y1={470}
            x2={1360}
            y2={470}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={960}
            y1={170}
            x2={960}
            y2={770}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <g transform={`translate(960 470) rotate(${(-ang * 180) / Math.PI})`}>
            <ellipse
              rx={330}
              ry={160}
              fill={alpha(colors.primary, 0.18)}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <line
              x1={-330}
              y1={0}
              x2={330}
              y2={0}
              stroke={colors.orange}
              strokeWidth={5}
            />
            <line
              x1={0}
              y1={-160}
              x2={0}
              y2={160}
              stroke={colors.orange}
              strokeWidth={5}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1400,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          A = A*
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: modes }, (_, i) => {
            const n = i + 1;
            const col = i % 7;
            const row = Math.floor(i / 7);
            const x0 = 160 + col * 230;
            const y0 = 250 + row * 220;
            return (
              <path
                key={n}
                d={Array.from(
                  { length: 81 },
                  (_, j) =>
                    `${j ? "L" : "M"} ${x0 + 2.5 * j} ${y0 - 50 * Math.sin((n * Math.PI * j) / 80) * Math.cos(n * frame * 0.2)}`,
                ).join(" ")}
                fill="none"
                stroke={alpha(colors.orange, Math.max(0.3, 1 - i * 0.05))}
                strokeWidth={3}
              />
            );
          })}
          <text
            x={1700}
            y={520}
            fill={colors.muted}
            fontSize={80}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            …∞
          </text>
        </svg>
        <Chip
          frame={frame}
          at={c6 + 8}
          x={160}
          y={620}
          color={colors.red}
          size={44}
        >
          Mₓ : {tx.noEigen}
        </Chip>
        <Chip
          frame={frame}
          at={c7 + 8}
          x={900}
          y={620}
          color={colors.green}
          size={44}
        >
          {tx.compact}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
