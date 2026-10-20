import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, ramp } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Corridor,
  doorCenter,
  FLOOR_Y,
  Guest,
  guestColor,
} from "../components/hotel";
import { useStrings } from "../i18n";

// An infinitely long bus pulls up in front of the corridor and never ends.
// "Room n → room 2n": every guest hops to an even door, the odd doors go
// dark and open. Then seat k hops off the bus into room 2k + 1.

const ROOMS = 22;
const SEATS = 14;
const BUS_Y = 1500;
const SEAT_W = 150;

const Formula: React.FC<{
  readonly text: string;
  readonly at: number;
  readonly out: number;
  readonly color?: string;
}> = ({ text, at, out, color = colors.text }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: fadeIn(frame, at) * fadeOut(frame, out, 8),
        translate: riseIn(frame, at, 18),
      }}
    >
      <div
        style={{
          fontFamily: fonts.math,
          fontSize: 64,
          color,
          padding: "12px 36px",
          borderRadius: 22,
          backgroundColor: alpha(colors.bg, 0.85),
          border: `2px solid ${alpha(color, 0.5)}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Bus: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("bus");
  const [c0, c1, c2] = cues;
  // the bus drives in from the right and stops
  const drive = glide(frame, c0 + 4, fps, 60);
  const busX = lerp(3600, doorCenter(0) - 60, drive);
  const seatX = (k: number) => busX + 120 + k * SEAT_W;
  // guests hop n → 2n
  const hopAt = (n: number) => c1 + 14 + n * 6;
  const hopT = (n: number) => ramp(frame, hopAt(n), 34);
  // passengers hop off: seat k → room 2k + 1
  const offAt = (k: number) => c2 + 10 + k * 7;
  const offT = (k: number) => ramp(frame, offAt(k), 36);
  // camera: a wide view of rooms and bus, drifting right as things move
  const zoom = 0.85 - 0.08 * glide(frame, c2, fps, 40);
  const camX =
    lerp(
      doorCenter(4),
      doorCenter(8.5),
      ramp(frame, c1 + 30, c2 + 150 - c1 - 30),
    ) - 960;
  const camY = 1000 - 540;
  const freed = (n: number) => n % 2 === 1 && frame >= hopAt((n - 1) / 2) + 20;
  const filled = (n: number) => n % 2 === 1 && frame >= offAt((n - 1) / 2) + 36;

  return (
    <SceneShell id="bus">
      <Sfx name="whoosh" at={c0 + 4} volume={0.16} />
      <Sfx name="thud" at={c0 + 60} volume={0.25} />
      <Sfx name="page" at={c1 + 4} />
      {Array.from({ length: 8 }).map((_, n) => (
        <Sfx key={n} name={PLUCKS[n % 6]} at={hopAt(n) + 34} volume={0.14} />
      ))}
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`o${k}`} name="pop" at={offAt(k) + 36} volume={0.14} />
      ))}
      <Sfx name="chime" at={offAt(8) + 30} />
      <QuestionTray />

      <Camera zoom={zoom} x={camX} y={camY}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <Corridor
            from={-3}
            to={ROOMS + 14}
            open={(n) => (freed(n) && !filled(n) ? 1 : 0)}
            lit={(n) => (freed(n) && !filled(n) ? 0 : 1)}
          />
          {/* the street */}
          <rect
            x={-2000}
            y={1180}
            width={14000}
            height={900}
            fill={alpha(colors.ink, 0.9)}
          />
          {Array.from({ length: 40 }).map((_, k) => (
            <rect
              key={k}
              x={-2000 + k * 320}
              y={1780}
              width={160}
              height={14}
              rx={7}
              fill={alpha(colors.paper, 0.35)}
            />
          ))}
          {/* the bus, which goes on forever to the right */}
          <rect
            x={busX}
            y={BUS_Y - 260}
            width={12000}
            height={300}
            rx={40}
            fill={colors.primary}
            stroke={colors.ink}
            strokeWidth={8}
          />
          <rect
            x={busX}
            y={BUS_Y - 30}
            width={12000}
            height={40}
            fill={colors.orange}
          />
          <text
            x={busX + 60}
            y={BUS_Y - 290}
            fill={colors.primary}
            fontSize={64}
            fontWeight={800}
          >
            {tx.bus} ∞
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <circle
              key={`w${k}`}
              cx={busX + 400 + k * 1400}
              cy={BUS_Y + 30}
              r={70}
              fill={colors.ink}
              stroke={colors.muted}
              strokeWidth={10}
            />
          ))}
          {Array.from({ length: SEATS + 40 }).map((_, k) => (
            <rect
              key={`win${k}`}
              x={seatX(k) - 60}
              y={BUS_Y - 230}
              width={120}
              height={150}
              rx={18}
              fill={alpha(colors.paper, 0.85)}
            />
          ))}
          {/* passengers: seated, then hopping off to room 2k + 1 */}
          {Array.from({ length: SEATS + 40 }).map((_, k) => {
            const t = offT(k);
            const from = { x: seatX(k), y: BUS_Y - 90 };
            const to = { x: doorCenter(2 * k + 1), y: FLOOR_Y };
            const p = t > 0 ? hop(t, from.x, from.y, to.x, to.y, 260) : from;
            return (
              <Guest
                key={`p${k}`}
                x={p.x}
                y={p.y}
                color={colors.highlight}
                size={t > 0 ? 1 : 0.8}
                bob={t > 0 && t < 1 ? frame / 2.4 : 0}
                label={
                  k < SEATS ? (t >= 1 ? String(2 * k + 1) : `${k}`) : undefined
                }
              />
            );
          })}
          {/* old guests hop n → 2n */}
          {Array.from({ length: ROOMS }).map((_, n) => {
            const t = hopT(n);
            const p = hop(
              t,
              doorCenter(n),
              FLOOR_Y,
              doorCenter(2 * n),
              FLOOR_Y,
              160 + n * 30,
            );
            return (
              <Guest
                key={n}
                x={p.x}
                y={p.y}
                color={guestColor(n)}
                bob={t > 0 && t < 1 ? frame / 2.4 + n : 0}
                label={t >= 1 ? String(2 * n) : String(n)}
              />
            );
          })}
        </svg>
      </Camera>

      <AbsoluteFill>
        <Formula text="n → 2n" at={c1 + 4} out={c2} color={colors.primary} />
        <Formula
          text="k → 2k + 1"
          at={c2 + 4}
          out={1e9}
          color={colors.highlight}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
