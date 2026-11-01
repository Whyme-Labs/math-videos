import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Berlin, 1932: von Neumann beside his book, a state vector with
// complex entries floating over it. Then the test: the dot product of
// (1, i) with itself is typed out and a length² gauge adds the terms: 1·1
// lifts it to 1, i·i pulls it back to 0 with a thud. (1, 2i) sends the bar
// below zero to −3, in red. Last, a small orange bar hovers over the
// first i: the fix, still unexplained.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c1, 10);
  // the gauge adds the terms as they're typed: 1·1 lifts it to 1, i·i
  // takes 1 away and it lands on 0; then 1·1 again and 2i·2i takes 4: −3
  const up1 = glide(frame, c1 + 28, fps, 12);
  const fall = glide(frame, c1 + 70, fps, 14);
  const up2 = glide(frame, c2 + 12, fps, 12);
  const neg = glide(frame, c2 + 30, fps, 20);
  const val = up1 - fall + up2 - 4 * neg;
  const two = frame >= c2 + 10;
  const G = { x: 1500, y: 470 };
  const U = 80;
  const jolt = shake(frame, c2 + 50, 12);
  const hover = fadeIn(frame, c3 + 30, 10);
  const segs = two ? ["1·1 + ", "2i", "·2i"] : ["1·1 + ", "i", "·i"];
  const shown = two ? 99 : typed("1·1 + i·i", frame, c1 + 20, fps, 16).length;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 20} volume={0.2} />
      <Sfx name="whoosh" at={c0 + 40} volume={0.1} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 20 + k * 7} volume={0.1} />
      ))}
      <Sfx name="pop" at={c1 + 28} volume={0.12} />
      <Sfx name="thud" at={c1 + 70} volume={0.3} />
      <Sfx name="pop" at={c2 + 12} volume={0.12} />
      <Sfx name="scratch" at={c2 + 30} volume={0.22} />
      <Sfx name="riser" at={c3 + 10} volume={0.12} />
      <Sfx name="pop" at={c3 + 30} volume={0.14} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(560 ${560 + lerp(30, 0, glide(frame, c0 + 20, fps, 20))})`}
            opacity={fadeIn(frame, c0 + 20)}
          >
            <rect
              x={-260}
              y={-200}
              width={520}
              height={380}
              rx={14}
              fill={alpha(colors.paper, 0.92)}
              stroke={colors.wood}
              strokeWidth={10}
            />
            <line
              x1={-200}
              y1={-110}
              x2={200}
              y2={-110}
              stroke={alpha(colors.ink, 0.4)}
              strokeWidth={4}
            />
            <text
              x={0}
              y={60}
              fill={colors.ink}
              fontSize={88}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              (1, i)
            </text>
          </g>
          <Person
            x={1400}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={-1}
          />
          <text
            x={1400}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.vonNeumann}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 320,
            width: 480,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            color: colors.ink,
            opacity: fadeIn(frame, c0 + 30),
          }}
        >
          {tx.book}
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.berlin}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 140,
            fontFamily: fonts.math,
            fontSize: 104,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "pre",
          }}
        >
          {segs[0].slice(0, shown)}
          <span style={{ position: "relative" }}>
            {segs[1].slice(0, Math.max(0, shown - segs[0].length))}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: -10,
                height: 12,
                borderRadius: 6,
                background: colors.orange,
                opacity: hover,
                translate: `0 ${Math.sin((frame - c3) * 0.15) * 10 - 20}px`,
              }}
            />
          </span>
          {segs[2].slice(
            0,
            Math.max(0, shown - segs[0].length - segs[1].length),
          )}
          <span
            style={{
              color: colors.red,
              opacity: fadeIn(frame, two ? c2 + 30 : c1 + 70, 6),
            }}
          >
            {two ? " = −3" : " = 0"}
          </span>
        </div>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <g transform={`translate(${G.x + jolt} ${G.y})`}>
            <rect
              x={-90}
              y={-4 * U}
              width={180}
              height={8 * U}
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
              y={val > 0 ? -val * U : 0}
              width={120}
              height={Math.abs(val) * U}
              rx={8}
              fill={val > 0.3 ? colors.green : colors.red}
            />
            <text
              x={0}
              y={-4 * U - 30}
              fill={colors.muted}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.lengthSq}
            </text>
            <text
              x={130}
              y={14}
              fill={colors.text}
              fontSize={40}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              0
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
