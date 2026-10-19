import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { mul, polar, px, type C, type View } from "../components/plane";
import { HOME, Town } from "../components/town";
import { useStrings } from "../i18n";

// × i turns the whole town a quarter turn about 0: houses, roads, pond and
// trees all swing round together, and the yellow house at (2, 1) lands at
// (−1, 2). Again: a half turn, every point to minus itself. Then the town
// fades to its east-west road, and × (−1) is a half-turn swing from 1 to −1
// while × i stops halfway, at i.

const V: View = { cx: 960, cy: 560, unit: 120 };

const Formula: React.FC<{
  readonly text: string;
  readonly at: number;
  readonly out: number;
  readonly color?: string;
}> = ({ text, at, out, color = colors.text }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: fadeIn(frame, at) * fadeOut(frame, out, 8),
        translate: riseIn(frame, at, 18),
      }}
    >
      <div
        style={{
          fontFamily: fonts.math,
          fontSize: 60,
          color,
          padding: "12px 34px",
          borderRadius: 22,
          backgroundColor: alpha(colors.bg, 0.85),
          border: `2px solid ${alpha(color, 0.5)}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const QuarterTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("quarterTurn");
  const [c0, c1, c2] = cues;
  const turns = glide(frame, c0 + 30, fps, 50) + glide(frame, c1 + 14, fps, 50);
  const rot = polar(1, (Math.PI / 2) * turns);
  const map = (z: C) => mul(z, rot);
  // the camera pulls out while the town turns, then settles
  const zoom =
    lerp(1.15, 0.95, glide(frame, c0 + 20, fps, 40)) +
    0.05 * glide(frame, c2, fps, 20);
  const town = 1 - glide(frame, c2 + 4, fps, 20) * 0.85;
  const home = px(V, map(HOME));
  const r = Math.hypot(HOME.re, HOME.im) * V.unit;
  const start = px(V, HOME);
  const large = turns > 1 ? 1 : 0;
  // the real line: × (−1) and × i
  const half = glide(frame, c2 + 24, fps, 34);
  const quarter = glide(frame, c2 + 66, fps, 26);
  const o = px(V, { re: 0, im: 0 });
  const R2 = 2 * V.unit;
  const halfEnd = px(V, polar(2, Math.PI * half));
  const quarterEnd = px(V, polar(2, (Math.PI / 2) * quarter));

  return (
    <SceneShell id="quarterTurn">
      <Sfx name="pop" at={c0 + 10} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.2} />
      <Sfx name="thud" at={c0 + 76} volume={0.25} />
      <Sfx name="whoosh" at={c1 + 14} volume={0.2} />
      <Sfx name="chime" at={c1 + 60} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 24} volume={0.14} />
      <Sfx name="pluck3" at={c2 + 58} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 66} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 92} />
      <QuestionTray />

      <Camera zoom={zoom} x={0} y={0}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <g opacity={town}>
            <Town view={V} map={map} highlight={0} />
            {/* the path the yellow house travels */}
            <path
              d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${home.x} ${home.y}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
              strokeDasharray="12 10"
              opacity={turns > 0.02 ? 1 : 0}
            />
            <text
              x={home.x + 60}
              y={home.y - 50}
              fill={colors.paper}
              fontSize={40}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 10)}
            >
              {turns < 0.5 ? "(2, 1)" : turns < 1.5 ? "(−1, 2)" : "(−2, −1)"}
            </text>
          </g>
          {/* the east-west road alone: × (−1) and × i */}
          <g opacity={fadeIn(frame, c2 + 16)}>
            <line
              x1={o.x - 3.6 * V.unit}
              y1={o.y}
              x2={o.x + 3.6 * V.unit}
              y2={o.y}
              stroke={colors.text}
              strokeWidth={6}
            />
            <path
              d={`M ${o.x + R2} ${o.y} A ${R2} ${R2} 0 0 0 ${halfEnd.x} ${halfEnd.y}`}
              fill="none"
              stroke={colors.orange}
              strokeWidth={7}
              strokeDasharray="14 10"
            />
            <path
              d={`M ${o.x + R2} ${o.y} A ${R2} ${R2} 0 0 0 ${quarterEnd.x} ${quarterEnd.y}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={10}
              opacity={quarter > 0 ? 1 : 0}
            />
            <circle cx={o.x + R2} cy={o.y} r={20} fill={colors.text} />
            <circle cx={halfEnd.x} cy={halfEnd.y} r={18} fill={colors.orange} />
            <circle
              cx={quarterEnd.x}
              cy={quarterEnd.y}
              r={20}
              fill={colors.highlight}
              opacity={quarter > 0 ? 1 : 0}
            />
            {[
              { t: "1", x: o.x + R2, y: o.y + 70, c: colors.text, at: c2 + 16 },
              {
                t: "−1",
                x: o.x - R2,
                y: o.y + 70,
                c: colors.orange,
                at: c2 + 56,
              },
              {
                t: "i",
                x: o.x + 40,
                y: o.y - R2 - 20,
                c: colors.highlight,
                at: c2 + 90,
              },
              {
                t: "× (−1)",
                x: o.x - 0.9 * R2,
                y: o.y - 0.95 * R2,
                c: colors.orange,
                at: c2 + 30,
              },
              {
                t: "× i",
                x: o.x + 0.95 * R2,
                y: o.y - 0.9 * R2,
                c: colors.highlight,
                at: c2 + 80,
              },
            ].map((l) => (
              <text
                key={l.t}
                x={l.x}
                y={l.y}
                fill={l.c}
                fontSize={56}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, l.at)}
              >
                {l.t}
              </text>
            ))}
          </g>
        </svg>
      </Camera>

      <AbsoluteFill>
        <Formula
          text="× i :  (a, b) → (−b, a)"
          at={c0 + 8}
          out={c1 + 10}
          color={colors.highlight}
        />
        <Formula
          text="× i × i  =  × (−1)"
          at={c1 + 60}
          out={c2 + 4}
          color={colors.orange}
        />
        <Formula
          text={tx.halfway}
          at={c2 + 96}
          out={1e9}
          color={colors.highlight}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
