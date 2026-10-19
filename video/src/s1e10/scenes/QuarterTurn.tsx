import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow,
  Grid,
  mul,
  polar,
  px,
  type C,
  type View,
} from "../components/plane";
import { useStrings } from "../i18n";

// Multiplying by i turns the whole plane a quarter turn: the grid, an "F"
// drawn on it, and the point (2, 1), which lands on (−1, 2). Again: a half
// turn, and every point goes to minus itself. Then, on the real line, × (−1)
// is a half-turn arc from 1 to −1 and × i is the quarter-turn arc to i.

const V: View = { cx: 780, cy: 470, unit: 128 };
const F: C[] = [
  { re: 0.5, im: 0.3 },
  { re: 0.9, im: 0.3 },
  { re: 0.9, im: 1.3 },
  { re: 1.6, im: 1.3 },
  { re: 1.6, im: 1.7 },
  { re: 0.9, im: 1.7 },
  { re: 0.9, im: 2.1 },
  { re: 1.9, im: 2.1 },
  { re: 1.9, im: 2.5 },
  { re: 0.5, im: 2.5 },
];
const Z: C = { re: 2, im: 1 };

export const QuarterTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("quarterTurn");
  const [c0, c1, c2] = cues;
  const turns = glide(frame, c0 + 56, fps, 44) + glide(frame, c1 + 20, fps, 44);
  const rot = polar(1, (Math.PI / 2) * turns);
  const map = (z: C) => mul(z, rot);
  const plane = lerp(1, 0.25, glide(frame, c2 + 4, fps, 16));
  const zNow = map(Z);
  const fPts = F.map((z) => px(V, map(z)))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
  const half = glide(frame, c2 + 20, fps, 30);
  const quarter = glide(frame, c2 + 60, fps, 26);
  const o = px(V, { re: 0, im: 0 });
  const arc = (t: number, sweep: number) => {
    const p = px(V, polar(2, sweep * t));
    return `M ${o.x + 2 * V.unit} ${o.y} A ${2 * V.unit} ${2 * V.unit} 0 0 0 ${p.x} ${p.y}`;
  };
  const halfEnd = px(V, polar(2, Math.PI * half));
  const quarterEnd = px(V, polar(2, (Math.PI / 2) * quarter));

  return (
    <SceneShell id="quarterTurn">
      <Sfx name="pop" at={c0 + 10} />
      <Sfx name="whoosh" at={c0 + 56} volume={0.18} />
      <Sfx name="ding" at={c0 + 100} volume={0.22} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.18} />
      <Sfx name="chime" at={c1 + 64} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.14} />
      <Sfx name="pluck3" at={c2 + 50} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 60} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 86} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={plane}>
            <Grid view={V} n={4} map={map} opacity={fadeIn(frame, c0 + 2)} />
            {/* where the F started, and the path of the arrow's tip */}
            <polygon
              points={F.map((z) => px(V, z))
                .map((p) => `${p.x},${p.y}`)
                .join(" ")}
              fill="none"
              stroke={alpha(colors.primary, 0.5)}
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={turns > 0.02 ? 1 : 0}
            />
            <path
              d={`M ${px(V, Z).x} ${px(V, Z).y} A ${Math.hypot(Z.re, Z.im) * V.unit} ${Math.hypot(Z.re, Z.im) * V.unit} 0 ${turns > 1 ? 1 : 0} 0 ${px(V, zNow).x} ${px(V, zNow).y}`}
              fill="none"
              stroke={alpha(colors.highlight, 0.7)}
              strokeWidth={3}
              strokeDasharray="8 8"
              opacity={turns > 0.02 ? 1 : 0}
            />
            <polygon
              points={fPts}
              fill={alpha(colors.primary, 0.75)}
              stroke={colors.primary}
              strokeWidth={3}
              opacity={fadeIn(frame, c0 + 10)}
            />
            <Arrow
              view={V}
              z={zNow}
              color={colors.highlight}
              opacity={fadeIn(frame, c0 + 16)}
            />
            <circle
              cx={px(V, Z).x}
              cy={px(V, Z).y}
              r={9}
              fill="none"
              stroke={alpha(colors.highlight, 0.6)}
              strokeWidth={3}
              opacity={fadeIn(frame, c0 + 40)}
            />
          </g>
          {/* × (−1) and × i on the real line */}
          <g opacity={fadeIn(frame, c2 + 16)}>
            <line
              x1={o.x - 3 * V.unit}
              y1={o.y}
              x2={o.x + 3 * V.unit}
              y2={o.y}
              stroke={colors.text}
              strokeWidth={4}
            />
            <path
              d={arc(half, Math.PI)}
              fill="none"
              stroke={colors.orange}
              strokeWidth={5}
              strokeDasharray="12 9"
            />
            <path
              d={arc(quarter, Math.PI / 2)}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={7}
              opacity={quarter > 0 ? 1 : 0}
            />
            <circle cx={o.x + 2 * V.unit} cy={o.y} r={14} fill={colors.text} />
            <circle cx={halfEnd.x} cy={halfEnd.y} r={12} fill={colors.orange} />
            <circle
              cx={quarterEnd.x}
              cy={quarterEnd.y}
              r={14}
              fill={colors.highlight}
              opacity={quarter > 0 ? 1 : 0}
            />
            {[
              {
                t: "1",
                x: o.x + 2 * V.unit,
                y: o.y + 54,
                c: colors.text,
                at: c2 + 16,
              },
              {
                t: "−1",
                x: o.x - 2 * V.unit,
                y: o.y + 54,
                c: colors.orange,
                at: c2 + 48,
              },
              {
                t: "i",
                x: o.x + 30,
                y: o.y - 2 * V.unit - 10,
                c: colors.highlight,
                at: c2 + 84,
              },
              {
                t: "× (−1)",
                x: o.x,
                y: o.y - 2 * V.unit - 70,
                c: colors.orange,
                at: c2 + 30,
              },
              {
                t: "× i",
                x: o.x + 1.75 * V.unit,
                y: o.y - 1.75 * V.unit,
                c: colors.highlight,
                at: c2 + 74,
              },
            ].map((l) => (
              <text
                key={l.t}
                x={l.x}
                y={l.y}
                fill={l.c}
                fontSize={42}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, l.at)}
              >
                {l.t}
              </text>
            ))}
          </g>
        </svg>
        {/* the coordinates of the arrow */}
        <div
          style={{
            position: "absolute",
            left: 1340,
            top: 230,
            fontFamily: fonts.math,
            fontSize: 48,
            lineHeight: 1.6,
            opacity: fadeIn(frame, c0 + 16) * fadeOut(frame, c2, 10),
          }}
        >
          <div style={{ color: colors.highlight }}>(2, 1)</div>
          <div style={{ opacity: fadeIn(frame, c0 + 96) }}>→ (−1, 2)</div>
          <div style={{ opacity: fadeIn(frame, c1 + 60) }}>→ (−2, −1)</div>
        </div>
        {[
          { t: tx.quarter, at: c0 + 100, out: c1 + 16 },
          { t: tx.half, at: c1 + 64, out: c2 },
          { t: tx.halfway, at: c2 + 90, out: 1e9 },
        ].map((l) => (
          <div
            key={l.t}
            style={{
              position: "absolute",
              left: 1340,
              top: 560,
              fontFamily: fonts.math,
              fontSize: 44,
              color: colors.highlight,
              opacity: fadeIn(frame, l.at) * fadeOut(frame, l.out, 10),
              translate: riseIn(frame, l.at, 14),
            }}
          >
            {l.t}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
