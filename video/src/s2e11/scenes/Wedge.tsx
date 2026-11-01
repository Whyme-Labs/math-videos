import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { type V3 } from "../components/iso";
import {
  Arrow3,
  Box3,
  FloorGrid,
  ParamSurface,
  Stage3D,
} from "../../shared/components/three3d";
import { useStrings } from "../i18n";

// The wedge. Three basis arrows in 3-space. Three oriented unit patches
// light up one at a time (e₁∧e₂, e₂∧e₃, e₃∧e₁): "3 directions". Then the
// unit cube e₁∧e₂∧e₃ fills in: "1 direction". Then the row of dimensions
// 1 3 3 1 builds, the last 1 glows, and a single "× λ" dial is all a map
// can do to it, while the cube breathes in and out by that same λ. All in
// real 3D, the camera circling.

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
  const patch = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 30, fps, 10));
  const cube = fadeIn(frame, c0 + 150, 12);
  const row = (k: number) =>
    Math.min(1, springIn(frame, c1 + 10 + k * 10, fps, 10));
  const dial = frame * 0.05;
  // all a map can do to the cube's one direction: scale it by λ
  const lam = 1 + 0.22 * Math.sin(dial) * fadeIn(frame, c1 + 60, 10);
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

      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) * 0.35 + 0.65 }}>
        <Stage3D
          azimuth={-0.8 + (frame - c0) * 0.004}
          elevation={0.45}
          distance={6.4}
          target={[0.45, 0.45, 0.45]}
          style={{ left: -260, top: -40 }}
        >
          <FloorGrid n={2} color={colors.paper} opacity={0.18} />
          {[0, 1, 2].map((k) => {
            const a = E[k];
            const b = E[(k + 1) % 3];
            const o = patch(k) * (1 - 0.6 * cube);
            return (
              <ParamSurface
                key={k}
                res={2}
                p={(u, v) => [
                  (u * a[0] + v * b[0]) * patch(k),
                  (u * a[1] + v * b[1]) * patch(k),
                  (u * a[2] + v * b[2]) * patch(k),
                ]}
                color={tints[k]}
                opacity={Math.max(0.01, 0.55 * o)}
              />
            );
          })}
          {cube > 0.01 ? (
            <Box3
              a={[lam, 0, 0]}
              b={[0, lam, 0]}
              c={[0, 0, lam]}
              color={colors.orange}
              opacity={0.45 * cube}
              edge={0.012 * cube}
            />
          ) : null}
          {E.map((e, k) => (
            <Arrow3
              key={k}
              from={[0, 0, 0]}
              to={[e[0] * 1.35, e[1] * 1.35, e[2] * 1.35]}
              color={tints[k]}
              radius={0.03}
            />
          ))}
        </Stage3D>
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
