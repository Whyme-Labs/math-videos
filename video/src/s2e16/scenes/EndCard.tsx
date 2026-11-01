import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: a stack on the left, an arrow on the right, and between them a
// ruler (an ellipse) with green links snapping to both sides. The ruler
// turns back and forth; the stack stays put and the arrow swings with it. Teaser for
// projection: a cloud of points and a line that turns until it settles as
// the best fit, with dashed drops from each point to the line.

const PTS = [
  [-3, -1.6],
  [-2, -0.6],
  [-1.2, -1],
  [-0.4, 0.2],
  [0.5, -0.1],
  [1.2, 0.9],
  [2, 0.6],
  [2.8, 1.7],
];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const link = glide(frame, c1 + 10, fps, 16);
  // the ruler keeps turning; the stack stays and the arrow follows the ruler
  const sway = Math.sin(Math.max(0, frame - c1 - 30) * 0.05);
  const fit = glide(frame, c2 + 20, fps, 40);
  // least-squares slope through the origin-centred cloud
  const best =
    PTS.reduce((s, [x, y]) => s + x * y, 0) /
    PTS.reduce((s, [x]) => s + x * x, 0);
  const m = lerp(-0.6, best, fit);
  const T = { x: 1300, y: 470 };
  const U = 110;
  const scr = (x: number, y: number) => ({ x: T.x + x * U, y: T.y - y * U });

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="clink" at={c1 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[-2, -1, 0, 1, 2].map((k) => (
            <line
              key={k}
              x1={460 + k * 46}
              y1={300}
              x2={460 + k * 46}
              y2={640}
              stroke={colors.orange}
              strokeWidth={k === 0 ? 10 : 7}
              strokeLinecap="round"
            />
          ))}
          <ellipse
            cx={960}
            cy={470}
            rx={150}
            ry={100}
            fill={alpha(colors.primary, 0.1)}
            stroke={colors.primary}
            strokeWidth={6}
            transform={`rotate(${-20 + 30 * sway} 960 470)`}
          />
          <Arrow
            from={{ x: 1340, y: 470 }}
            to={{
              x: 1340 + 280 * Math.cos(0.4 * sway),
              y: 470 - 280 * Math.sin(0.4 * sway),
            }}
            width={18}
          />
          <line
            x1={600}
            y1={470}
            x2={lerp(600, 790, link)}
            y2={470}
            stroke={colors.green}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <line
            x1={1130}
            y1={470}
            x2={lerp(1130, 1320, link)}
            y2={470}
            stroke={colors.green}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={scr(-4, -4 * m).x}
            y1={scr(-4, -4 * m).y}
            x2={scr(4, 4 * m).x}
            y2={scr(4, 4 * m).y}
            stroke={colors.primary}
            strokeWidth={7}
          />
          {PTS.map(([x, y], k) => {
            const t = (x + y * m) / (1 + m * m);
            const f = scr(t, t * m);
            const p = scr(x, y);
            return (
              <g key={k}>
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={f.x}
                  y2={f.y}
                  stroke={alpha(colors.green, 0.8)}
                  strokeWidth={4}
                  strokeDasharray="8 6"
                />
                <circle cx={p.x} cy={p.y} r={14} fill={colors.orange} />
              </g>
            );
          })}
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 700,
              opacity: fadeIn(frame, c2 + 70),
              translate: riseIn(frame, c2 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
