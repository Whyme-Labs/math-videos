import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock, Tile } from "../../s1e16/components/props";
import { IDial } from "../components/dial";
import { useStrings } from "../i18n";

// Isomorphism. Three columns, the four states of each toy: tile turned
// 0/90/180/270, the clock at 0/1/2/3, the dial at 1/i/−1/−i. Threads tie
// each row together, and a glowing marker steps down all three columns at
// once. Then the counterexample: a rectangle's flip is home after two
// steps, while the clock's one hour needs four. The threads snap.

const COL = [480, 960, 1440];
const rowY = (k: number) => 230 + k * 160;

const Rect: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly flip: number;
}> = ({ x, y, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${Math.cos(Math.PI * flip)} 1)`}>
    <rect
      x={-170}
      y={-100}
      width={340}
      height={200}
      rx={14}
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={6}
    />
    <circle
      cx={-120}
      cy={-56}
      r={20}
      fill={colors.highlight}
      stroke={colors.ink}
      strokeWidth={3}
    />
  </g>
);

export const Same: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("same");
  const [c0, c1] = cues;
  const rowAt = (k: number) => c0 + 8 + k * 10;
  const thread = (k: number) => glide(frame, c0 + 50 + k * 8, fps, 14);
  const marker = Math.min(3.999, Math.max(0, (frame - c0 - 90) / 18)) % 4;
  const part1 = fadeOut(frame, c1, 10);
  // the counterexample
  const clockSteps = Math.min(4, Math.max(0, (frame - c1 - 20) / 16));
  const rectFlips = Math.min(2, Math.max(0, (frame - c1 - 20) / 16));
  const snap = glide(frame, c1 + 100, fps, 12);

  return (
    <SceneShell id="same">
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="pop" at={rowAt(k)} volume={0.14} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx
          key={`t${k}`}
          name={PLUCKS[k]}
          at={c0 + 50 + k * 8}
          volume={0.12}
        />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`c${k}`} name="tick" at={c1 + 20 + k * 16} volume={0.14} />
      ))}
      <Sfx name="ding" at={c1 + 52} volume={0.2} />
      <Sfx name="ding" at={c1 + 84} volume={0.2} />
      <Sfx name="scratch" at={c1 + 100} volume={0.3} />

      {/* the three columns, tied row by row */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3].map((k) => {
            const s = Math.min(1, springIn(frame, rowAt(k), fps, 10));
            const y = rowY(k);
            const on = Math.floor(marker) === k && frame >= c0 + 90;
            return (
              <g key={k}>
                {/* threads */}
                {[0, 1].map((j) => (
                  <path
                    key={j}
                    d={`M ${COL[j] + 110} ${y} Q ${(COL[j] + COL[j + 1]) / 2} ${y + 30 * Math.sin(frame / 12 + k + j)} ${lerp(COL[j] + 110, COL[j + 1] - 110, thread(k))} ${y}`}
                    fill="none"
                    stroke={on ? colors.highlight : alpha(colors.primary, 0.8)}
                    strokeWidth={on ? 7 : 4}
                  />
                ))}
                <g opacity={s}>
                  <Tile
                    x={COL[0]}
                    y={y}
                    size={140 * s}
                    rot={90 * k}
                    labels={false}
                  />
                  <Clock x={COL[1]} y={y} r={80 * s} n={4} pos={k} />
                  <IDial x={COL[2]} y={y} r={60 * s} pos={k} labels={false} />
                </g>
                {on ? (
                  <rect
                    x={COL[0] - 100}
                    y={y - 90}
                    width={COL[2] - COL[0] + 200}
                    height={180}
                    rx={30}
                    fill="none"
                    stroke={colors.highlight}
                    strokeWidth={6}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 50,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 60,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 70),
            translate: riseIn(frame, c0 + 70, 16),
          }}
        >
          {tx.iso}
        </div>
      </AbsoluteFill>

      {/* the counterexample: same size, different pattern */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Clock x={560} y={470} r={200} n={4} pos={clockSteps} />
          <Rect x={1360} y={470} flip={rectFlips} />
          <text
            x={560}
            y={760}
            fill={clockSteps >= 4 ? colors.green : colors.text}
            fontSize={52}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.steps(4)}{" "}
            {clockSteps >= 4 ? "✓" : `· ${Math.floor(clockSteps)}`}
          </text>
          <text
            x={1360}
            y={760}
            fill={rectFlips >= 2 ? colors.green : colors.text}
            fontSize={52}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.steps(2)} {rectFlips >= 2 ? "✓" : `· ${Math.floor(rectFlips)}`}
          </text>
          <text
            x={1360}
            y={220}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={700}
          >
            {tx.rect}
          </text>
          {/* the threads between them, snapping */}
          {[0, 1].map((j) => (
            <path
              key={j}
              d={`M 800 ${440 + j * 60} L ${lerp(1180, 980, snap)} ${440 + j * 60 + 60 * snap * (j ? 1 : -1)}`}
              stroke={snap > 0 ? colors.red : colors.primary}
              strokeWidth={5}
              fill="none"
            />
          ))}
          <text
            x={990}
            y={500}
            fill={colors.red}
            fontSize={110}
            textAnchor="middle"
            fontWeight={800}
            opacity={snap}
          >
            ≠
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
