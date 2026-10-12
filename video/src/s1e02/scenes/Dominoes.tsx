import type React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Domino, DOMINO_H } from "../../shared/components/Domino";
import { useStrings } from "../i18n";

const N = 13;
const GAP = 118;
const H = DOMINO_H;
const FLOOR = 720; // real table
const GHOST_FLOOR = 330; // the second table
const GHOSTS = 6;
const dx = (i: number) => 220 + i * GAP;
const gx = (i: number) => 520 + i * GAP;
const fallEase = Easing.bezier(0.5, 0, 0.8, 1); // accelerates like gravity

export const Dominoes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("dominoes");
  const [c0, c1, c2, c3, c4] = cues;

  const fallStart = (i: number) => c1 + 24 + i * 7;
  const angle = (i: number) =>
    interpolate(
      frame,
      [fallStart(i), fallStart(i) + 10],
      [0, i === N - 1 ? 90 : 68],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: fallEase,
      },
    );

  // Camera: close on the first domino, ride the wave, pull back, look up at
  // the ghost table, then settle.
  const follow = ramp(frame, fallStart(0), fallStart(N - 1) - fallStart(0));
  const back = glide(frame, c2 - 4, fps, 22);
  const up = glide(frame, c3 - 4, fps, 22);
  const settle = glide(frame, c4 + 40, fps, 24);
  let zoom = 1.35;
  let fx = lerp(420, 1500, follow);
  let fy = 600;
  zoom = lerp(zoom, 1, back);
  fx = lerp(fx, 960, back);
  fy = lerp(fy, 470, back);
  zoom = lerp(zoom, 1.1, up * (1 - settle));
  fy = lerp(fy, 380, up * (1 - settle));

  const ghostIn = fadeIn(frame, c3 - 4, 14);
  const countStart = c4 + 56;
  const ghostGone = (i: number) => ramp(frame, c4 + 6 + i * 4, 14);

  return (
    <SceneShell id="dominoes">
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={`u${i}`} name="tick" at={c0 + 6 + i * 3} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 12} volume={0.18} />
      {Array.from({ length: N }).map((_, i) => (
        <Sfx key={`f${i}`} name="clink" at={fallStart(i) + 9} volume={0.16} />
      ))}
      <Sfx name="ding" at={c2 + 6} />
      <Sfx name="whoosh" at={c3 - 4} />
      <Sfx name="sparkle" at={c4 + 8} />
      {Array.from({ length: N - 1 }).map((_, k) => (
        <Sfx
          key={`c${k}`}
          name="tick"
          at={c4 + 56 + (k + 1) * 6}
          volume={0.12}
        />
      ))}
      <QuestionTray />

      <Camera zoom={zoom} x={fx - 960} y={fy - 445}>
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* Real table */}
          <rect
            x={120}
            y={FLOOR}
            width={1760}
            height={18}
            rx={9}
            fill={colors.wood}
            opacity={0.85}
          />
          <text x={1760} y={FLOOR - 30} fill={colors.muted} fontSize={40}>
            …
          </text>
          {Array.from({ length: N }).map((_, i) => (
            <Domino
              key={i}
              x={dx(i)}
              floor={FLOOR}
              label={String(i)}
              angle={angle(i)}
              rise={springIn(frame, c0 + 4 + i * 3, fps, 12)}
            />
          ))}

          {/* Counting along the fallen row: every number is reached from 0. */}
          {frame >= countStart ? (
            <g opacity={fadeIn(frame, countStart, 6)}>
              {(() => {
                const k = Math.min(N - 1, Math.floor((frame - countStart) / 6));
                const t = ramp(frame, countStart + k * 6, 5);
                const p =
                  k === 0
                    ? { x: dx(0) + 40, y: FLOOR - 110 }
                    : hop(
                        t,
                        dx(k - 1) + 40,
                        FLOOR - 110,
                        dx(k) + 40,
                        FLOOR - 110,
                        40,
                      );
                return (
                  <>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={26}
                      fill={alpha(colors.primary, 0.25)}
                    />
                    <circle cx={p.x} cy={p.y} r={12} fill={colors.primary} />
                  </>
                );
              })()}
            </g>
          ) : null}

          {/* The push. */}
          <g opacity={fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c1 + 40, 10)}>
            <line
              x1={lerp(20, 130, glide(frame, c1 + 6, fps, 18))}
              y1={FLOOR - H + 30}
              x2={lerp(110, 180, glide(frame, c1 + 6, fps, 18))}
              y2={FLOOR - H + 30}
              stroke={colors.orange}
              strokeWidth={10}
              strokeLinecap="round"
            />
          </g>

          {/* The ghost table: standing dominoes nobody ever pushes. */}
          <g
            opacity={ghostIn}
            transform={`translate(0 ${-40 * ghostGone(GHOSTS)})`}
          >
            <rect
              x={420}
              y={GHOST_FLOOR}
              width={760}
              height={14}
              rx={7}
              fill={alpha(colors.muted, 0.5)}
              opacity={1 - ghostGone(GHOSTS)}
            />
            {Array.from({ length: GHOSTS }).map((_, i) => (
              <g
                key={i}
                opacity={1 - ghostGone(i)}
                transform={`translate(0 ${-30 * ghostGone(i)})`}
              >
                <Domino
                  x={gx(i)}
                  floor={GHOST_FLOOR}
                  label={`${i}′`}
                  angle={0}
                  ghost
                />
              </g>
            ))}
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: 520,
            top: 96,
            fontSize: 40,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 10) * fadeOut(frame, c4, 10),
            translate: riseIn(frame, c3 + 10),
          }}
        >
          {tx.secondTable}
        </div>
      </Camera>

      {/* Verdicts sit outside the camera so they stay put and readable. */}
      <div
        style={{
          position: "absolute",
          top: 790,
          width: "100%",
          textAlign: "center",
          fontSize: 40,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c3 - 6, 10),
          translate: riseIn(frame, c2 + 6),
        }}
      >
        ✓ {tx.allFall}
      </div>
      <div
        style={{
          position: "absolute",
          top: 150,
          width: "100%",
          textAlign: "center",
          fontSize: 60,
          fontFamily: fonts.title,
          color: colors.primary,
          opacity: fadeIn(frame, c4 + 20),
          translate: riseIn(frame, c4 + 20),
        }}
      >
        {tx.noSecondTable}
      </div>
      <div
        style={{
          position: "absolute",
          top: 790,
          width: "100%",
          textAlign: "center",
          fontSize: 36,
          fontFamily: fonts.math,
          color: colors.muted,
          opacity: fadeIn(frame, c4 + 50),
        }}
      >
        {tx.reached}
      </div>
    </SceneShell>
  );
};
