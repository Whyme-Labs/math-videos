import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow, Grid, polar, type View } from "../components/plane";
import { useStrings } from "../i18n";

// An arrow from 1 that stretches and turns, then makes one quarter turn to
// i. Then the teaser for E11: a row of full hotel rooms; every guest moves
// one room up, and room 1 is free for a new guest.

const V: View = { cx: 960, cy: 400, unit: 120 };
const ROOMS = 9;
const ROOM_W = 120;
const ROOM_X = (k: number) => 960 - (ROOMS * ROOM_W) / 2 + k * ROOM_W;
const ROOM_Y = 250;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const st = glide(frame, c0 + 10, fps, 24);
  const back = glide(frame, c0 + 50, fps, 20);
  const quarter = glide(frame, c0 + 76, fps, 24);
  const r = 1 + 0.5 * st - 0.5 * back;
  const theta = (Math.PI / 5) * (st - back) + (Math.PI / 2) * quarter;
  const part1 = fadeOut(frame, c1, 10);
  const shift = glide(frame, c1 + 30, fps, 22);
  const newGuest = springIn(frame, c1 + 56, fps, 11);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="whoosh" at={c0 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 76} volume={0.14} />
      <Sfx name="chime" at={c0 + 100} />
      <Sfx name="page" at={c1 + 8} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.16} />
      <Sfx name="pop" at={c1 + 56} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={part1}>
            <Grid view={V} n={2} opacity={fadeIn(frame, c0 + 2) * 0.7} />
            <Arrow
              view={V}
              z={polar(r * 1.5, theta)}
              color={colors.primary}
              width={8}
              opacity={fadeIn(frame, c0 + 4)}
            />
            <text
              x={V.cx + 24}
              y={V.cy - 1.5 * V.unit - 10}
              fill={colors.highlight}
              fontSize={52}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 96)}
            >
              i
            </text>
          </g>
          {/* Hilbert's Hotel: every room full, then everyone moves up one */}
          <g opacity={fadeIn(frame, c1 + 6)}>
            {Array.from({ length: ROOMS }).map((_, k) => (
              <g key={k}>
                <rect
                  x={ROOM_X(k) + 8}
                  y={ROOM_Y}
                  width={ROOM_W - 16}
                  height={150}
                  rx={10}
                  fill={alpha(colors.violet, 0.35)}
                  stroke={colors.muted}
                  strokeWidth={3}
                />
                <text
                  x={ROOM_X(k) + ROOM_W / 2}
                  y={ROOM_Y - 16}
                  fill={colors.muted}
                  fontSize={28}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k + 1}
                </text>
                <circle
                  cx={ROOM_X(k) + ROOM_W / 2 + shift * ROOM_W}
                  cy={ROOM_Y + 90}
                  r={22}
                  fill={colors.primary}
                />
              </g>
            ))}
            <text
              x={ROOM_X(ROOMS) + 70}
              y={ROOM_Y + 100}
              fill={colors.muted}
              fontSize={44}
              fontFamily={fonts.math}
            >
              …
            </text>
            <circle
              cx={ROOM_X(0) + ROOM_W / 2}
              cy={ROOM_Y + 90}
              r={22 * Math.min(1, newGuest)}
              fill={colors.highlight}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            opacity: fadeIn(frame, c0 + 30) * part1,
            translate: riseIn(frame, c0 + 30, 16),
          }}
        >
          {tx.stretchTurn}
        </div>
        <AbsoluteFill style={{ top: 560, alignItems: "center", gap: 10 }}>
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
