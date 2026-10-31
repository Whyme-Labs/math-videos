import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";

// A form is a machine V → V*. A two-slot machine; an arrow u slides into
// the first slot, and out of the machine unrolls a panel holding an orange
// stack of sheets: B(u, ·), a covector. Then two rows: a map turns an
// arrow into an arrow (its formula P⁻¹AP lit lemon), and a form turns an
// arrow into a stack (its formula PᵀBP lit orange), one formula at a time.

export const Machine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("machine");
  const [c0, c1] = cues;
  const feed = glide(frame, c0 + 20, fps, 24);
  const unroll = glide(frame, c0 + 50, fps, 30);
  const part1 = fadeOut(frame, c1, 10);
  const row1 = Math.min(1, springIn(frame, c1 + 14, fps, 10));
  const row2 = Math.min(1, springIn(frame, c1 + 70, fps, 10));
  const PX = 1400;
  const PY = 470;

  return (
    <SceneShell id="machine">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="clink" at={c0 + 44} volume={0.18} />
      <Sfx name="ding" at={c0 + 70} />
      <Sfx name="pop" at={c1 + 14} volume={0.16} />
      <Sfx name="pop" at={c1 + 70} volume={0.16} />
      <Sfx name="chime" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="machinePanel">
              <rect
                x={PX - 220}
                y={PY - 220}
                width={440 * unroll}
                height={440}
                rx={24}
              />
            </clipPath>
          </defs>
          <rect
            x={620}
            y={340}
            width={380}
            height={280}
            rx={30}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {[420, 540].map((y, k) => (
            <rect
              key={y}
              x={600}
              y={y - 22}
              width={40}
              height={44}
              rx={8}
              fill={k === 0 && feed > 0.95 ? colors.primary : colors.ink}
            />
          ))}
          <Arrow
            from={{ x: lerp(160, 380, feed), y: 450 }}
            to={{ x: lerp(380, 600, feed), y: 420 }}
            width={14}
            opacity={feed < 0.97 ? 1 : 0}
          />
          <text
            x={810}
            y={500}
            fill={colors.orange}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            B
          </text>
          <line
            x1={1000}
            y1={480}
            x2={1160}
            y2={480}
            stroke={colors.orange}
            strokeWidth={8}
            opacity={unroll}
          />
          <polygon
            points="1176,480 1150,464 1150,496"
            fill={colors.orange}
            opacity={unroll}
          />
          <rect
            x={PX - 220}
            y={PY - 220}
            width={440 * unroll}
            height={440}
            rx={24}
            fill={alpha(colors.bgMid, 0.7)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={4}
          />
          <g clipPath="url(#machinePanel)">
            <Stack
              a={1}
              b={0.6}
              scr={(x, y) => ({ x: PX + x * 90, y: PY - y * 90 })}
            />
          </g>
          <text
            x={PX}
            y={PY + 290}
            fill={colors.orange}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={unroll}
          >
            B(u, ·)
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* row 1: a map, arrow to arrow */}
          <g opacity={row1}>
            <Arrow
              from={{ x: 300, y: 360 }}
              to={{ x: 460, y: 280 }}
              width={12}
            />
            <line
              x1={520}
              y1={320}
              x2={680}
              y2={320}
              stroke={colors.text}
              strokeWidth={6}
            />
            <polygon points="696,320 670,304 670,336" fill={colors.text} />
            <Arrow
              from={{ x: 740, y: 380 }}
              to={{ x: 940, y: 260 }}
              width={12}
            />
          </g>
          {/* row 2: a form, arrow to stack */}
          <g opacity={row2}>
            <Arrow
              from={{ x: 300, y: 660 }}
              to={{ x: 460, y: 580 }}
              width={12}
            />
            <line
              x1={520}
              y1={620}
              x2={680}
              y2={620}
              stroke={colors.text}
              strokeWidth={6}
            />
            <polygon points="696,620 670,604 670,636" fill={colors.text} />
            {[0, 1, 2, 3].map((k) => (
              <line
                key={k}
                x1={740 + k * 50}
                y1={700}
                x2={800 + k * 50}
                y2={540}
                stroke={colors.orange}
                strokeWidth={7}
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
        {[
          {
            top: 270,
            s: row1 * fadeOut(frame, c1 + 66, 8),
            t: "P⁻¹ A P",
            c: colors.primary,
          },
          { top: 570, s: row2, t: "PTBP", c: colors.orange },
        ].map((r) => (
          <div
            key={r.t}
            style={{
              position: "absolute",
              top: r.top,
              left: 1120,
              fontFamily: fonts.math,
              fontSize: 84,
              fontWeight: 800,
              color: r.c,
              opacity: r.s,
            }}
          >
            {r.t === "PTBP" ? (
              <>
                P<sup>T</sup> B P
              </>
            ) : (
              r.t
            )}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
