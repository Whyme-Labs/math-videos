import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Corridor, doorCenter, Guest, guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// Chinese edition only. 《列子·汤问》: 殷汤 asks 夏革 whether up, down and
// the eight directions have an end; 夏革: "无极之外复无无极，无尽之中复无
// 无尽" (beyond the endless there is no further endless). Bamboo slips on
// the right; on the left the camera keeps pulling back along the corridor,
// and new guests keep slipping in at room 0, without the hotel getting any
// bigger.

const SLIP_W = 92;
const SLIP_X = (i: number) => 1740 - i * (SLIP_W + 16);
const SLIP_Y = 150;
const SLIP_H = 420;

export const Liezi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liezi");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c1 + 4 + i * 10;
  // endless pull-back: the zoom halves every ~3 seconds
  const z =
    Math.max(0.22, 0.9 * 0.5 ** (Math.max(0, frame - c0) / 90)) +
    0.38 * glide(frame, c2, fps, 30);
  const arrivals = Math.floor(Math.max(0, frame - c2) / 20);
  const shift = Math.min(1, ((frame - c2) % 20) / 14);

  return (
    <SceneShell id="liezi">
      <Sfx name="whoosh" at={c0 + 4} volume={0.12} />
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`a${k}`} name="pop" at={c2 + 14 + k * 20} volume={0.16} />
      ))}

      <AbsoluteFill>
        <Camera zoom={z} x={doorCenter(0) - 960 + 600 / z} y={-80}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <Corridor from={0} to={Math.min(400, Math.ceil(8 / z))} />
            {Array.from({ length: Math.min(400, Math.ceil(8 / z)) }).map(
              (_, n) => {
                const moving = frame >= c2 && arrivals >= 0;
                const x = doorCenter(n) + (moving ? lerp(0, 230, shift) : 0);
                return (
                  <Guest
                    key={n}
                    x={x}
                    color={guestColor(n + arrivals)}
                    bob={moving && shift < 1 ? frame / 2.4 : 0}
                  />
                );
              },
            )}
            {frame >= c2 ? (
              <Guest
                x={lerp(doorCenter(-1), doorCenter(0), shift)}
                color={colors.highlight}
                bob={shift < 1 ? frame / 2.4 : 0}
                suitcase
              />
            ) : null}
          </svg>
        </Camera>
      </AbsoluteFill>

      <AbsoluteFill>
        {/* the question, on a hanging scroll */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 120,
            padding: "18px 30px",
            borderRadius: 16,
            backgroundColor: alpha(colors.paper, 0.92),
            color: colors.ink,
            fontSize: 44,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c0 + 10),
            translate: riseIn(frame, c0 + 10, 20),
          }}
        >
          上下八方有极尽乎？
        </div>
        <div
          style={{
            position: "absolute",
            left: SLIP_X(3) - 40,
            top: SLIP_Y - 30,
            width: SLIP_X(0) + SLIP_W - SLIP_X(3) + 80,
            height: SLIP_H + 110,
            borderRadius: 24,
            backgroundColor: alpha(colors.bg, 0.85),
            opacity: fadeIn(frame, slipAt(0)),
          }}
        />
        {tx.quote.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 12,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 22,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -50}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 52,
                letterSpacing: 10,
                color: colors.paper,
              }}
            >
              {[...t].map((ch, j) => (
                <span
                  key={j}
                  style={{
                    color:
                      Math.floor((frame - slipAt(0) - 20) / 7) === i * 4 + j
                        ? colors.primary
                        : colors.paper,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(3) - 30,
            width: SLIP_X(0) + SLIP_W - SLIP_X(3) + 60,
            top: SLIP_Y + SLIP_H + 18,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(3) + 6),
          }}
        >
          {tx.lieziSource}
        </div>
        <div
          style={{
            position: "absolute",
            left: 1220,
            width: 640,
            top: 660,
            padding: "10px 0",
            borderRadius: 20,
            backgroundColor: alpha(colors.bg, 0.85),
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 72,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 40),
            scale: lerp(0.7, 1, Math.min(1, glide(frame, c2 + 40, fps, 16))),
          }}
        >
          ∞ + 1 = ∞
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
