import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Corridor, doorCenter, Guest, guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// Dawn: the camera pulls back along a corridor where every room is lit and
// taken. Then the teaser: one more bus, its windows showing infinite
// decimals, and the clerk reading the passenger list and frowning.

const DECIMALS = ["0.14159…", "0.71828…", "0.41421…", "0.57721…", "0.30103…"];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const pull = glide(frame, c0 + 4, fps, 120);
  const zoom = lerp(0.7, 0.38, pull);
  const camX = lerp(doorCenter(3), doorCenter(12), pull) - 960;
  const part1 = fadeOut(frame, c1, 10);
  const bus = glide(frame, c1 + 6, fps, 40);
  const frown = glide(frame, c1 + 50, fps, 14);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 4} volume={0.16} />
      <Sfx name="chime" at={c0 + 50} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.16} />
      <Sfx name="thud" at={c1 + 46} volume={0.25} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      {/* dawn in the corridor */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <AbsoluteFill
          style={{ backgroundColor: alpha(colors.orange, 0.12 * pull) }}
        />
        <Camera zoom={zoom} x={camX} y={-80}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <Corridor from={0} to={50} />
            {Array.from({ length: 50 }).map((_, n) => (
              <Guest key={n} x={doorCenter(n)} color={guestColor(n)} />
            ))}
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 160,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 64,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 50),
            translate: riseIn(frame, c0 + 50, 18),
          }}
        >
          {tx.dawn}
        </div>
      </AbsoluteFill>

      {/* one more bus */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <rect
            x={lerp(2000, 640, bus)}
            y={210}
            width={3000}
            height={220}
            rx={40}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={8}
          />
          {DECIMALS.map((d, k) => (
            <g key={d}>
              <rect
                x={lerp(2000, 640, bus) + 50 + k * 250}
                y={250}
                width={220}
                height={120}
                rx={18}
                fill={colors.paper}
              />
              <text
                x={lerp(2000, 640, bus) + 160 + k * 250}
                y={326}
                fill={colors.ink}
                fontSize={36}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {d}
              </text>
            </g>
          ))}
          {/* the clerk with the passenger list */}
          <g transform="translate(380 640) scale(1.3)">
            <Guest x={0} y={0} color={colors.green} size={1.6} />
            <line
              x1={-36}
              y1={-222 + 6 * frown}
              x2={-6}
              y2={-212 - 4 * frown}
              stroke={colors.ink}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <line
              x1={10}
              y1={-212 - 4 * frown}
              x2={40}
              y2={-222 + 6 * frown}
              stroke={colors.ink}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <g
              transform={`translate(70 -80) rotate(${-8 + 2 * Math.sin(frame / 12)})`}
            >
              <rect
                x={0}
                y={-60}
                width={120}
                height={160}
                rx={10}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              {[0, 1, 2, 3, 4].map((k) => (
                <rect
                  key={k}
                  x={16}
                  y={-40 + k * 26}
                  width={88}
                  height={8}
                  rx={4}
                  fill={alpha(colors.ink, 0.35)}
                />
              ))}
            </g>
          </g>
        </svg>
        <AbsoluteFill style={{ top: 640, alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontSize: 40,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
