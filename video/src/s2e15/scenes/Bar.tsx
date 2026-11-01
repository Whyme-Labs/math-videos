import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Why the bar. A complex plane: z (lemon) turning slowly, z·z (orange)
// turning twice as fast so its real part keeps changing sign, and the
// mirror image z̄ (dashed). Their product z̄·z sits still on the positive
// real axis as a green dot at |z|². On the right two readouts: z·z wanders
// in colour, z̄·z holds. Then (1, i) again: with the bar on the first i the
// sum is 1 + 1 and the length² gauge rises to a green 2.

const O = { x: 640, y: 470 };
const S = 200;
const R = 1.15;
const fmt = (x: number, y: number) => {
  const r = (n: number) =>
    (Math.round(n * 10) / 10).toFixed(1).replace("-", "−");
  return `${r(x)} ${y < 0 ? "−" : "+"} ${r(Math.abs(y)).replace("−", "")}i`;
};

export const Bar: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("bar");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const th = 0.5 + Math.max(0, frame - c0 - 10) * 0.03;
  const z = { x: R * Math.cos(th), y: R * Math.sin(th) };
  const zz = { x: R * R * Math.cos(2 * th), y: R * R * Math.sin(2 * th) };
  const p = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const mirror = fadeIn(frame, c0 + 70, 10);
  const rise = glide(frame, c1 + 60, fps, 20);
  const U = 80;

  return (
    <SceneShell id="bar">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c0 + 70} volume={0.14} />
      <Sfx name="chime" at={c0 + 90} volume={0.6} />
      <Sfx name="pop" at={c1 + 40} volume={0.14} />
      <Sfx name="ding" at={c1 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={p(-1.8, 0).x}
            y1={O.y}
            x2={p(1.8, 0).x}
            y2={O.y}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          <line
            x1={O.x}
            y1={p(0, -1.6).y}
            x2={O.x}
            y2={p(0, 1.6).y}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={3}
          />
          <circle
            cx={O.x}
            cy={O.y}
            r={R * S}
            fill="none"
            stroke={alpha(colors.primary, 0.25)}
            strokeWidth={3}
            strokeDasharray="10 10"
          />
          <Arrow from={O} to={p(zz.x, zz.y)} width={12} color={colors.orange} />
          <Arrow from={O} to={p(z.x, z.y)} width={14} />
          <g opacity={mirror}>
            <line
              x1={O.x}
              y1={O.y}
              x2={p(z.x, -z.y).x}
              y2={p(z.x, -z.y).y}
              stroke={colors.primary}
              strokeWidth={6}
              strokeDasharray="12 10"
            />
            <circle cx={p(R * R, 0).x} cy={O.y} r={18} fill={colors.green} />
            <text
              x={p(R * R, 0).x + 30}
              y={O.y - 24}
              fill={colors.green}
              fontSize={48}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              <tspan textDecoration="overline">z</tspan>z
            </text>
            <text
              x={p(z.x, -z.y).x + 16}
              y={p(z.x, -z.y).y + 46}
              fill={colors.primary}
              fontSize={48}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              <tspan textDecoration="overline">z</tspan>
            </text>
          </g>
          <text
            x={p(z.x, z.y).x + 16}
            y={p(z.x, z.y).y - 16}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            z
          </text>
          <text
            x={p(zz.x, zz.y).x + 16}
            y={p(zz.x, zz.y).y - 16}
            fill={colors.orange}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            z²
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 1240,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 58,
              fontWeight: 800,
              color: zz.x < 0 ? colors.red : colors.orange,
              opacity: fadeIn(frame, c0 + 20),
            }}
          >
            z·z = {fmt(zz.x, zz.y)}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 58,
              fontWeight: 800,
              color: colors.green,
              opacity: mirror,
              translate: riseIn(frame, c0 + 70, 12),
            }}
          >
            <span style={{ textDecoration: "overline" }}>z</span>·z ={" "}
            {fmt(R * R, 0)}
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: colors.muted,
              opacity: mirror,
            }}
          >
            <span
              style={{ textDecoration: "overline", fontFamily: fonts.math }}
            >
              z
            </span>{" "}
            = {tx.conj}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 110,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 14),
          }}
        >
          1·1 +{" "}
          <span style={{ position: "relative" }}>
            i
            <span
              style={{
                position: "absolute",
                left: "-0.05em",
                right: "-0.05em",
                top: "0.12em",
                height: 10,
                borderRadius: 5,
                background: colors.orange,
                opacity: fadeIn(frame, c1 + 40, 6),
                translate: `0 ${lerp(-60, 0, glide(frame, c1 + 40, fps, 10))}px`,
              }}
            />
          </span>
          ·i ={" "}
          <span
            style={{ color: colors.green, opacity: fadeIn(frame, c1 + 60, 6) }}
          >
            1 + 1
          </span>
        </div>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <g transform="translate(1500 600)">
            <rect
              x={-90}
              y={-3 * U}
              width={180}
              height={4 * U}
              rx={20}
              fill={alpha(colors.bg, 0.8)}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            <line
              x1={-110}
              y1={0}
              x2={110}
              y2={0}
              stroke={colors.text}
              strokeWidth={5}
            />
            <rect
              x={-60}
              y={-2 * rise * U}
              width={120}
              height={2 * rise * U}
              rx={8}
              fill={colors.green}
            />
            <text
              x={0}
              y={-3 * U - 30}
              fill={colors.muted}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.lengthSq}
            </text>
            <text
              x={130}
              y={-2 * U + 14}
              fill={colors.green}
              fontSize={48}
              fontFamily={fonts.mono}
              fontWeight={800}
              opacity={rise}
            >
              2
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
