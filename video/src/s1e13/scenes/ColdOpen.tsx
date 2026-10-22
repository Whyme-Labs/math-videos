import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../../s1e11/components/hotel";
import { FINISH_X, Runner, Track, TRACK_Y } from "../components/race";
import { useStrings } from "../i18n";

// The story. Runner 0 crosses the finish line, then 1, 2, …, each quicker
// than the last, until they blur. The scoreboard keeps counting and never
// runs out. Then, after all of them, one more runner jogs in alone and
// crosses. Her bib tries 7, 1000, a billion: all taken by runners ahead.
// The camera pulls back on the line-up past the finish: 0, 1, 2, …
// bunching up to a point, and her standing after all of them.

const N = 40;
const LANE = (n: number) => TRACK_Y - 106 * (n % 3) + 40;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  // runner n crosses at cross(n); all of them before c2
  const span = c2 - 10 - (c0 + 10);
  const cross = (n: number) => c0 + 10 + span * (1 - 0.86 ** n);
  const speed = (n: number) => 9 * 1.12 ** n;
  const crossed = Array.from({ length: N }).filter(
    (_, n) => frame >= cross(n),
  ).length;
  // the scoreboard: real crossings, then numbers that keep growing
  const board =
    frame < c1 + 10
      ? String(Math.max(0, crossed - 1))
      : Math.floor(
          10 ** Math.min(12, 2 + (frame - c1 - 10) / 8),
        ).toLocaleString("en-US");
  // the last runner
  const her = {
    x: lerp(-200, FINISH_X + 160, ramp(frame, c2 + 4, 70)),
    moving: frame >= c2 + 4 && frame < c2 + 74,
  };
  const tries = ["7", "1000", "10⁹"];
  const tryAt = (k: number) => c3 + 8 + k * 22;
  const tryK = tries.reduce((acc, _, k) => (frame >= tryAt(k) ? k : acc), -1);
  // pull back to the line-up
  const pull = glide(frame, c4 + 4, fps, 50);
  const lineup = fadeIn(frame, c4 + 4, 12);
  // push in on her while the bibs are tried, then pull back to the line-up
  const push = glide(frame, c3, fps, 20);
  const zoom = lerp(lerp(1, 1.7, push), 0.85, pull);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 4} volume={0.12} />
      {Array.from({ length: 12 }).map((_, n) => (
        <Sfx
          key={n}
          name={PLUCKS[n % 6]}
          at={Math.round(cross(n))}
          volume={0.14}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={`b${k}`} name="tick" at={c1 + 10 + k * 8} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c2 + 4} volume={0.1} />
      <Sfx name="ding" at={c2 + 60} />
      {tries.map((_, k) => (
        <Sfx key={`t${k}`} name="thud" at={tryAt(k) + 8} volume={0.25} />
      ))}
      <Sfx name="whoosh" at={c4 + 4} volume={0.16} />
      <Sfx name="chime" at={c4 + 44} />

      <Camera
        zoom={zoom}
        x={lerp(lerp(0, 600, push), 1000, pull)}
        y={lerp(lerp(0, 60, push), 150, pull)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <Track />
          {/* the field, crossing faster and faster */}
          <g opacity={1 - lineup}>
            {Array.from({ length: N }).map((_, n) => {
              const x = FINISH_X + speed(n) * (frame - cross(n));
              if (x < -200 || x > 2400) return null;
              return (
                <Runner
                  key={n}
                  x={x}
                  y={LANE(n)}
                  color={guestColor(n)}
                  bib={String(n)}
                  phase={frame / (2.4 - Math.min(1.6, n * 0.06)) + n}
                  size={1 - (n % 3) * 0.06}
                />
              );
            })}
          </g>
          {/* the line-up past the finish: 0, 1, 2, … bunching to a point */}
          <g opacity={lineup}>
            {Array.from({ length: N }).map((_, n) => {
              const x = FINISH_X + 120 + 900 * (1 - 0.82 ** n);
              const s = 0.9 * 0.93 ** n;
              return (
                <Runner
                  key={n}
                  x={x}
                  color={guestColor(n)}
                  bib={n < 6 ? String(n) : undefined}
                  size={s}
                />
              );
            })}
          </g>
          {/* her */}
          {frame >= c2 + 4 ? (
            <g
              transform={`translate(${tryK >= 0 && frame < c4 ? shake(frame, tryAt(tryK) + 8, 10) : 0} 0)`}
            >
              <Runner
                x={lineup > 0 ? lerp(her.x, FINISH_X + 1140, pull) : her.x}
                color={colors.highlight}
                bib={tryK >= 0 && frame < c4 ? tries[tryK] : "?"}
                phase={her.moving ? frame / 2.6 : undefined}
                size={1.1}
              />
            </g>
          ) : null}
          {/* "taken": the runner who already holds that number */}
          {tryK >= 0 && frame < c4 ? (
            <g opacity={fadeIn(frame, tryAt(tryK), 6)}>
              <rect
                x={FINISH_X + 200}
                y={TRACK_Y - 330}
                width={260}
                height={74}
                rx={14}
                fill="none"
                stroke={colors.red}
                strokeWidth={6}
                transform={`rotate(-6 ${FINISH_X + 330} ${TRACK_Y - 293})`}
              />
              <text
                x={FINISH_X + 330}
                y={TRACK_Y - 278}
                fill={colors.red}
                fontSize={42}
                textAnchor="middle"
                fontWeight={800}
                transform={`rotate(-6 ${FINISH_X + 330} ${TRACK_Y - 293})`}
              >
                {tx.taken}
              </text>
            </g>
          ) : null}
          {/* labels on the line-up */}
          <g opacity={fadeIn(frame, c4 + 40)}>
            <text
              x={FINISH_X + 1140}
              y={TRACK_Y - 230}
              fill={colors.highlight}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.last}
            </text>
            <path
              d={`M ${FINISH_X + 120} ${TRACK_Y + 70} L ${FINISH_X + 1030} ${TRACK_Y + 70}`}
              stroke={colors.primary}
              strokeWidth={5}
              strokeDasharray="10 8"
            />
            <text
              x={FINISH_X + 560}
              y={TRACK_Y + 130}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              0, 1, 2, 3, …
            </text>
          </g>
        </svg>
      </Camera>

      {/* the scoreboard */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 80,
            width: 400,
            padding: "10px 0",
            textAlign: "center",
            borderRadius: 16,
            backgroundColor: colors.ink,
            border: `6px solid ${colors.primary}`,
            fontFamily: fonts.mono,
            fontSize: board.length > 10 ? 40 : 64,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c2 + 4, 12),
            scale:
              1 +
              0.06 *
                Math.max(0, 1 - ((frame - c0) % 8) / 8) *
                (frame < c2 ? 1 : 0),
          }}
        >
          {board}
        </div>
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 80,
            width: 400,
            padding: "10px 0",
            textAlign: "center",
            borderRadius: 16,
            backgroundColor: colors.ink,
            border: `6px solid ${colors.highlight}`,
            fontFamily: fonts.mono,
            fontSize: 64,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 60) * fadeOut(frame, c4, 10),
            scale: lerp(1.3, 1, Math.min(1, springIn(frame, c2 + 60, fps, 11))),
          }}
        >
          ?
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 60,
            fontSize: 44,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c4 + 60),
          }}
        >
          <span style={{ color: colors.muted }}>{tx.sameSize}</span>
          <span style={{ color: alpha(colors.muted, 0.5) }}>·</span>
          <span style={{ color: colors.highlight }}>{tx.newPosition}</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
