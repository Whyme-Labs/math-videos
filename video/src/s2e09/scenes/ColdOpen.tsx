import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Cologne, 21 September 1908: Minkowski (bearded) at a lectern
// under a banner "Raum und Zeit", a row of heads in front. Then a space
// ruler and a time axis stand apart, fade to grey shadows and slide
// together into one spacetime diagram. Two events appear on it, joined by a
// segment, with the light-cone lines faint behind, and the interval
// (Δt)² − (Δx)² lands with its minus sign in red. Last, a machine with two
// slots takes two arrows and drops one number.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const hall = fadeOut(frame, c1, 10);
  const shadow = glide(frame, c1 + 40, fps, 30);
  const join = glide(frame, c1 + 80, fps, 30);
  const events = Math.min(1, springIn(frame, c2 + 10, fps, 10));
  const formula = fadeIn(frame, c2 + 50, 10);
  const part3 = fadeOut(frame, c3, 10);
  // pairs keep feeding in, one every 70 frames, each dropping a number
  const cycle = Math.max(0, Math.floor((frame - c3 - 20) / 70));
  const start = c3 + 20 + cycle * 70;
  const feed = glide(frame, start, fps, 30);
  const out =
    Math.min(1, springIn(frame, start + 34, fps, 10)) *
    fadeOut(frame, start + 66, 4);
  const outValue = ["−3", "5", "0", "−1"][cycle % 4];
  const O = { x: 960, y: 560 };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="tick" at={c0 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="thud" at={c1 + 110} volume={0.3} />
      <Sfx name="pop" at={c2 + 10} volume={0.16} />
      <Sfx name="ding" at={c2 + 50} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.12} />
      <Sfx name="chime" at={c3 + 54} />
      {[1, 2, 3].map((k) => (
        <Sfx key={k} name="pop" at={c3 + 54 + k * 70} volume={0.14} />
      ))}

      {/* the hall */}
      <AbsoluteFill style={{ opacity: hall }}>
        <svg width={1920} height={1080}>
          <rect
            x={560}
            y={110}
            width={800}
            height={110}
            rx={10}
            fill={colors.wood}
          />
          <text
            x={960}
            y={190}
            fill={colors.paper}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.raumZeit}
          </text>
          <Person
            x={960}
            y={640}
            color={colors.highlight}
            size={1.6}
            facing={1}
            beard
          />
          <rect
            x={860}
            y={570}
            width={200}
            height={170}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={5}
          />
          {Array.from({ length: 9 }).map((_, k) => (
            <circle
              key={k}
              cx={300 + k * 165}
              cy={790}
              r={46}
              fill={alpha(colors.ink, 0.85)}
            />
          ))}
          <text
            x={960}
            y={330}
            fill={colors.highlight}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.minkowski}
          </text>
        </svg>
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
          {tx.cologne}
        </div>
      </AbsoluteFill>

      {/* space and time fade to shadows and join */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) * part3 }}>
        <svg width={1920} height={1080}>
          {/* light cone, faint */}
          <g opacity={fadeIn(frame, c2, 12) * 0.6}>
            <line
              x1={O.x - 300}
              y1={O.y + 300}
              x2={O.x + 300}
              y2={O.y - 300}
              stroke={colors.orange}
              strokeWidth={4}
              strokeDasharray="12 10"
            />
            <line
              x1={O.x + 300}
              y1={O.y + 300}
              x2={O.x - 300}
              y2={O.y - 300}
              stroke={colors.orange}
              strokeWidth={4}
              strokeDasharray="12 10"
            />
          </g>
          {/* space: a ruler */}
          <g
            transform={`translate(${lerp(-420, 0, join)} ${lerp(-120, 0, join)})`}
            opacity={1 - 0.6 * shadow + 0.6 * join}
          >
            <line
              x1={O.x - 340}
              y1={O.y}
              x2={O.x + 340}
              y2={O.y}
              stroke={shadow > 0.5 && join < 0.5 ? colors.muted : colors.paper}
              strokeWidth={8}
            />
            {Array.from({ length: 9 }).map((_, k) => (
              <line
                key={k}
                x1={O.x - 320 + k * 80}
                y1={O.y - 16}
                x2={O.x - 320 + k * 80}
                y2={O.y + 16}
                stroke={colors.paper}
                strokeWidth={4}
              />
            ))}
            <text
              x={O.x + 360}
              y={O.y + 16}
              fill={colors.paper}
              fontSize={44}
              fontWeight={800}
            >
              {tx.space}
            </text>
          </g>
          {/* time: a vertical axis */}
          <g
            transform={`translate(${lerp(420, 0, join)} 0)`}
            opacity={1 - 0.6 * shadow + 0.6 * join}
          >
            <line
              x1={O.x}
              y1={O.y + 300}
              x2={O.x}
              y2={O.y - 340}
              stroke={shadow > 0.5 && join < 0.5 ? colors.muted : colors.paper}
              strokeWidth={8}
            />
            <text
              x={O.x + 20}
              y={O.y - 350}
              fill={colors.paper}
              fontSize={44}
              fontWeight={800}
            >
              {tx.time}
            </text>
          </g>
          {/* two events and the gap between them */}
          <g opacity={events}>
            <line
              x1={O.x - 120}
              y1={O.y + 120}
              x2={O.x + 80}
              y2={O.y - 200}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <circle
              cx={O.x - 120}
              cy={O.y + 120}
              r={18 * events}
              fill={colors.primary}
            />
            <circle
              cx={O.x + 80}
              cy={O.y - 200}
              r={18 * events}
              fill={colors.primary}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 330,
            left: 1300,
            fontFamily: fonts.math,
            fontSize: 64,
            fontWeight: 800,
            color: colors.primary,
            opacity: formula,
          }}
        >
          (Δt)² <span style={{ color: colors.red }}>−</span> (Δx)²
        </div>
      </AbsoluteFill>

      {/* a machine with two slots */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={800}
            y={330}
            width={360}
            height={260}
            rx={30}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {[400, 520].map((y) => (
            <rect
              key={y}
              x={780}
              y={y - 22}
              width={40}
              height={44}
              rx={8}
              fill={colors.ink}
            />
          ))}
          {[0, 1].map((k) => {
            const y = [400, 520][k];
            const x = lerp(480, 760, feed);
            return (
              <Arrow
                key={k}
                from={{ x: x - 200, y: y + 30 * (k ? 1 : -1) }}
                to={{ x, y }}
                width={12}
                opacity={feed < 0.98 ? 1 : 0}
              />
            );
          })}
          <g
            opacity={out}
            transform={`translate(${lerp(1180, 1260, out)} 490) scale(${out})`}
          >
            <text
              fill={colors.primary}
              fontSize={110}
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {outValue}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
