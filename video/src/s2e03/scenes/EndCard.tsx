import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: the machine T between two spaces: a pink dot (the kernel) falls in
// and comes out as 0; lemon arrows come out and fill a lit region (the
// image). Teaser for matrices: a square turned a quarter turn then
// flattened, beside the same square flattened then turned: two different
// shadows, and a "?" between them.

const Square: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly turn: number; // 0..1 of a quarter turn
  readonly flat: number; // 0..1, squash onto the horizontal
  readonly order: "turnFirst" | "flatFirst";
}> = ({ x, y, turn, flat, order }) => {
  const pts = [
    [0, 0],
    [120, 0],
    [120, -80],
    [0, -80],
  ].map(([px, py]) => {
    const r = (p: number[]) => {
      const a = (-Math.PI / 2) * turn;
      return [
        p[0] * Math.cos(a) - p[1] * Math.sin(a),
        p[0] * Math.sin(a) + p[1] * Math.cos(a),
      ];
    };
    const f = (p: number[]) => [p[0], p[1] * (1 - flat)];
    const q = order === "turnFirst" ? f(r([px, py])) : r(f([px, py]));
    return `${x + q[0]},${y + q[1]}`;
  });
  return (
    <polygon
      points={pts.join(" ")}
      fill={alpha(colors.primary, 0.35)}
      stroke={colors.primary}
      strokeWidth={6}
    />
  );
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const fall = glide(frame, c0 + 20, fps, 20);
  const outs = [0, 1, 2].map((k) => glide(frame, c0 + 50 + k * 14, fps, 14));
  const a1 = glide(frame, c1 + 20, fps, 18);
  const a2 = glide(frame, c1 + 46, fps, 18);
  const q = Math.min(1, springIn(frame, c1 + 80, fps, 10));

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 20} volume={0.14} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pluck2" at={c0 + 50 + k * 14} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 46} volume={0.12} />
      <Sfx name="ding" at={c1 + 80} />
      <Sfx name="sparkle" at={c1 + 110} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={810}
            y={340}
            width={300}
            height={260}
            rx={30}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={6}
          />
          <text
            x={960}
            y={500}
            fill={colors.ink}
            fontSize={100}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={900}
          >
            T
          </text>
          {/* the kernel: in, and out as 0 */}
          <circle
            cx={lerp(480, 800, fall)}
            cy={470}
            r={22}
            fill={colors.highlight}
            opacity={1 - (fall > 0.98 ? 1 : 0)}
          />
          <text
            x={1300}
            y={500}
            fill={colors.highlight}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 40)}
          >
            0
          </text>
          {/* the image: arrows reaching out */}
          <ellipse
            cx={1500}
            cy={470}
            rx={210}
            ry={150}
            fill={alpha(colors.primary, 0.12)}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 50)}
          />
          {outs.map((t, k) => (
            <Arrow
              key={k}
              from={{ x: 1400, y: 520 }}
              to={{
                x: 1400 + [180, 120, 220][k] * t,
                y: 520 - [60, 160, 140][k] * t,
              }}
              width={10}
            />
          ))}
          <text
            x={1500}
            y={700}
            fill={colors.primary}
            fontSize={50}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c0 + 80)}
          >
            {tx.image}
          </text>
          <text
            x={1300}
            y={600}
            fill={colors.highlight}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c0 + 50)}
          >
            {tx.kernel}
          </text>
        </svg>
      </AbsoluteFill>

      {/* the teaser: order matters */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Square x={1180} y={560} turn={a1} flat={a2} order="turnFirst" />
          <Square x={1560} y={560} turn={a2} flat={a1} order="flatFirst" />
          <line
            x1={1050}
            y1={560}
            x2={1820}
            y2={560}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <text
            x={1390}
            y={420}
            fill={colors.highlight}
            fontSize={120}
            textAnchor="middle"
            fontWeight={900}
            opacity={q}
          >
            ≠
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 200, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 90),
              translate: riseIn(frame, c1 + 90),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 110) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
