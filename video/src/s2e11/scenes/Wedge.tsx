import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Box, isoAt, type V3 } from "../components/iso";
import { useStrings } from "../i18n";

// The wedge. Three basis arrows in 3-space. Three oriented unit patches
// light up one at a time (e₁∧e₂, e₂∧e₃, e₃∧e₁): "3 directions". Then the
// unit cube e₁∧e₂∧e₃ fills in: "1 direction". Then the row of dimensions
// 1 3 3 1 builds, the last 1 glows, and a single "× λ" dial is all a map
// can do to it.

const E: V3[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

export const Wedge: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("wedge");
  const [c0, c1] = cues;
  const to = isoAt(760, 520, 230);
  const patch = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 30, fps, 10));
  const cube = fadeIn(frame, c0 + 150, 12);
  const row = (k: number) =>
    Math.min(1, springIn(frame, c1 + 10 + k * 10, fps, 10));
  const dial = frame * 0.05;
  const tints = [colors.primary, colors.highlight, colors.green];

  return (
    <SceneShell id="wedge">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={c0 + 20 + k * 30} volume={0.14} />
      ))}
      <Sfx name="ding" at={c0 + 154} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`r${k}`} name="tick" at={c1 + 10 + k * 10} volume={0.12} />
      ))}
      <Sfx name="chime" at={c1 + 60} />

      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) * 0.7 + 0.3 }}>
        <svg width={1920} height={1080}>
          <g opacity={cube}>
            <Box a={E[0]} b={E[1]} c={E[2]} to={to} color={colors.orange} />
          </g>
          {[0, 1, 2].map((k) => {
            const a = E[k];
            const b = E[(k + 1) % 3];
            const pts = [
              [0, 0, 0],
              a,
              [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
              b,
            ] as V3[];
            return (
              <polygon
                key={k}
                points={pts.map((p) => `${to(p).x},${to(p).y}`).join(" ")}
                fill={alpha(tints[k], 0.35 * patch(k) * (1 - 0.6 * cube))}
                stroke={tints[k]}
                strokeWidth={4}
                opacity={patch(k)}
              />
            );
          })}
          {E.map((e, k) => (
            <Arrow
              key={k}
              from={to([0, 0, 0])}
              to={to([e[0] * 1.3, e[1] * 1.3, e[2] * 1.3])}
              width={12}
              color={tints[k]}
            />
          ))}
        </svg>
      </AbsoluteFill>
      {[
        { t: tx.threeDirs, at: c0 + 90, out: c0 + 150 },
        { t: tx.oneDir, at: c0 + 160, out: 99999 },
      ].map((l) => (
        <div
          key={l.t}
          style={{
            position: "absolute",
            top: 140,
            left: 1240,
            fontSize: 56,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, l.at) * fadeOut(frame, l.out, 6),
            translate: riseIn(frame, l.at, 12),
          }}
        >
          {l.t}
        </div>
      ))}
      {/* the row of dimensions, and the single dial */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[1, 3, 3, 1].map((n, k) => (
            <g
              key={k}
              opacity={row(k)}
              transform={`translate(${1220 + k * 130} 320) scale(${row(k)})`}
            >
              <rect
                x={-50}
                y={-50}
                width={100}
                height={100}
                rx={16}
                fill={alpha(
                  k === 3 ? colors.green : colors.paper,
                  k === 3 ? 0.3 : 0.1,
                )}
                stroke={k === 3 ? colors.green : alpha(colors.paper, 0.4)}
                strokeWidth={4}
              />
              <text
                y={22}
                fill={k === 3 ? colors.green : colors.text}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {n}
              </text>
            </g>
          ))}
          <g
            opacity={fadeIn(frame, c1 + 60, 10)}
            transform="translate(1610 560)"
          >
            <circle
              r={100}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.orange}
              strokeWidth={8}
            />
            <line
              x1={0}
              y1={0}
              x2={80 * Math.cos(dial)}
              y2={80 * Math.sin(dial)}
              stroke={colors.primary}
              strokeWidth={12}
              strokeLinecap="round"
            />
            <circle r={14} fill={colors.primary} />
            <text
              y={170}
              fill={colors.orange}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              × λ
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
