import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../components/stack";
import { useStrings } from "../i18n";

// Bigger means denser. Left: an arrow doubles and gets longer. Right: a
// stack doubles and its sheets crowd in to half the spacing. Then the
// grocer's change of units, drawn in coordinates: the tick marks on the
// axis stay put while the unit shrinks, so the arrow stretches and the
// sheets spread apart together, and the counter of sheets crossed holds at
// 2.

export const Density: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("density");
  const [c0, c1] = cues;
  const dbl = glide(frame, c0 + 30, fps, 30);
  const dblStack = glide(frame, c0 + 70, fps, 30);
  const part1 = fadeOut(frame, c1, 10);
  const stretch = glide(frame, c1 + 30, fps, 60);
  const s = lerp(1, 2.4, stretch);
  const L = { x: 520, y: 520 };
  const R = { x: 1400, y: 520 };
  const O = { x: 560, y: 620 };
  const U = 60;
  const scr = (x: number, y: number) => ({
    x: O.x + x * U * s,
    y: O.y - y * U * s,
  });

  return (
    <SceneShell id="density">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="ding" at={c0 + 50} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 70} volume={0.12} />
      <Sfx name="ding" at={c0 + 90} volume={0.16} />
      <Sfx name="riser" at={c1 + 30} volume={0.1} />
      <Sfx name="chime" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="densityRight">
              <rect
                x={R.x - 330}
                y={R.y - 300}
                width={660}
                height={600}
                rx={30}
              />
            </clipPath>
          </defs>
          <rect
            x={R.x - 330}
            y={R.y - 300}
            width={660}
            height={600}
            rx={30}
            fill={alpha(colors.bgMid, 0.5)}
            stroke={alpha(colors.paper, 0.25)}
            strokeWidth={4}
          />
          <g clipPath="url(#densityRight)">
            <Stack
              a={lerp(1, 2, dblStack)}
              b={0}
              scr={(x, y) => ({ x: R.x + x * 150, y: R.y - y * 150 })}
              range={8}
            />
          </g>
          <Arrow
            from={{ x: L.x - 300, y: L.y + 100 }}
            to={{
              x: L.x - 300 + lerp(260, 520, dbl),
              y: L.y + 100 - lerp(130, 260, dbl),
            }}
            width={16}
          />
          {[
            { x: L.x, at: c0 + 30, c: colors.primary, t: tx.vector },
            { x: R.x, at: c0 + 70, c: colors.orange, t: tx.covector },
          ].map((l) => (
            <g key={l.x}>
              <text
                x={l.x}
                y={170}
                fill={l.c}
                fontSize={52}
                textAnchor="middle"
                fontWeight={800}
              >
                {l.t}
              </text>
              <text
                x={l.x}
                y={l.x === L.x ? 720 : 780}
                fill={l.c}
                stroke={colors.bg}
                strokeWidth={8}
                paintOrder="stroke"
                fontSize={72}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={fadeIn(frame, l.at)}
              >
                {tx.doubled}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="densityStage">
              <rect x={120} y={90} width={1680} height={740} />
            </clipPath>
          </defs>
          <g clipPath="url(#densityStage)">
            <Stack a={0.5} b={0.25} scr={scr} range={10} />
          </g>
          {/* the units: tick marks that close up as the unit shrinks */}
          <line
            x1={140}
            y1={O.y}
            x2={1780}
            y2={O.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          {Array.from({ length: 41 }).map((_, k) => {
            const x = O.x + (k - 6) * U;
            return x > 140 && x < 1780 ? (
              <line
                key={k}
                x1={x}
                y1={O.y - 12}
                x2={x}
                y2={O.y + 12}
                stroke={alpha(colors.paper, 0.7)}
                strokeWidth={3}
              />
            ) : null;
          })}
          <Arrow from={O} to={scr(3.4, 1.2)} width={16} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1300,
            width: 420,
            padding: "18px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.green}`,
            opacity: fadeIn(frame, c1 + 14),
            translate: riseIn(frame, c1 + 14, 16),
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
            {tx.sheets}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 96,
              fontWeight: 800,
              color: colors.green,
            }}
          >
            2.0
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
