import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Corridor,
  doorCenter,
  Guest,
  guestColor,
  Rain,
  walk,
} from "../components/hotel";
import { useStrings } from "../i18n";

// The story. Midnight, rain: a traveler with a suitcase walks up to a hotel
// whose windows run off to the vanishing point, all lit, under a NO VACANCY
// sign. Inside, the clerk lifts the intercom. In the corridor every guest
// steps one door along, door 0 swings open, the traveler walks in, and the
// NO drops off the sign. The camera pulls back along a corridor that never
// ends.

const VP = { x: 1780, y: 430 };
const NEAR = { x: 330, top: 170, bottom: 840 };
const persp = (s: number) => ({
  x: VP.x + (NEAR.x - VP.x) * s,
  top: VP.y + (NEAR.top - VP.y) * s,
  bottom: VP.y + (NEAR.bottom - VP.y) * s,
});

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;

  // --- outside ---
  const outside = 1 - ramp(frame, c2 - 6, 12);
  const traveler = walk(frame, c0 + 4, c0 + 110, -160, 420);
  const pan = glide(frame, c1 + 4, fps, 70);
  const outZoom = lerp(1, 1.25, pan);
  const outX = lerp(0, 520, pan);
  const sign = springIn(frame, c0 + 50, fps, 11);

  // --- the desk ---
  const desk = ramp(frame, c2 - 6, 12) * (1 - ramp(frame, c3 - 6, 12));
  const handset = glide(frame, c2 + 10, fps, 14);
  const rings = (frame - (c2 + 26)) / 16;

  // --- the corridor ---
  const inside = ramp(frame, c3 - 6, 12);
  const moveAt = (n: number) => c3 + 10 + n * 2;
  const enterAt = c3 + 56;
  const traveler2 = walk(
    frame,
    enterAt,
    enterAt + 34,
    doorCenter(-1) + 30,
    doorCenter(0),
  );
  const door0 = glide(frame, c3 + 40, fps, 14);
  const noFall = ramp(frame, enterAt + 40, 22);
  const pull = glide(frame, c4 + 4, fps, 80);
  const inZoom = lerp(0.82, 0.36, pull);
  const inX = lerp(doorCenter(2.6) - 960, doorCenter(14) - 960, pull);
  const inY = lerp(-60, -40, pull);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 2} volume={0.1} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="tick" at={c0 + 14 + k * 18} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="thud" at={c0 + 50} volume={0.25} />
      <Sfx name="page" at={c2 + 10} />
      <Sfx name="chime" at={c2 + 26} />
      {Array.from({ length: 8 }).map((_, n) => (
        <Sfx
          key={`m${n}`}
          name={PLUCKS[n % 6]}
          at={moveAt(n) + 14}
          volume={0.12}
        />
      ))}
      <Sfx name="clink" at={c3 + 40} />
      <Sfx name="pop" at={enterAt + 34} />
      <Sfx name="scratch" at={enterAt + 40} volume={0.25} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.16} />
      <Sfx name="sparkle" at={c4 + 70} />

      {/* outside, in the rain */}
      <AbsoluteFill style={{ opacity: outside }}>
        <Camera zoom={outZoom} x={outX} y={0}>
          <svg width={1920} height={1080} style={{ position: "absolute" }}>
            <rect
              x={-400}
              y={840}
              width={2800}
              height={300}
              fill={alpha(colors.ink, 0.9)}
            />
            {/* the building runs off to the vanishing point */}
            <polygon
              points={`${NEAR.x},${NEAR.top} ${VP.x},${VP.y} ${NEAR.x},${NEAR.bottom}`}
              fill={alpha(colors.violet, 0.75)}
              stroke={alpha(colors.paper, 0.3)}
              strokeWidth={3}
            />
            {Array.from({ length: 40 }).map((_, k) => {
              const a = persp(0.88 ** k);
              const b = persp(0.88 ** (k + 0.62));
              const h = a.bottom - a.top;
              return (
                <g key={k}>
                  <polygon
                    points={`${a.x},${a.top + h * 0.22} ${b.x},${b.top + (b.bottom - b.top) * 0.22} ${b.x},${b.top + (b.bottom - b.top) * 0.62} ${a.x},${a.top + h * 0.62}`}
                    fill={alpha(colors.primary, 0.85)}
                  />
                  {k < 9 ? (
                    <text
                      x={(a.x + b.x) / 2}
                      y={a.top + h * 0.15}
                      fill={colors.paper}
                      fontSize={Math.max(10, 44 * 0.88 ** k)}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                    >
                      {k}
                    </text>
                  ) : null}
                </g>
              );
            })}
            {/* the entrance and the sign */}
            <rect
              x={200}
              y={640}
              width={150}
              height={200}
              rx={10}
              fill={colors.ink}
              stroke={colors.primary}
              strokeWidth={4}
            />
            <g
              transform={`translate(275 560) scale(${Math.max(0.01, Math.min(1, sign))})`}
            >
              <rect
                x={-170}
                y={-40}
                width={340}
                height={76}
                rx={14}
                fill={colors.bg}
                stroke={colors.red}
                strokeWidth={5}
              />
              <text
                x={0}
                y={14}
                fill={colors.red}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
                letterSpacing={3}
              >
                {tx.noVacancy}
              </text>
            </g>
            <text
              x={275}
              y={150}
              fill={colors.primary}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              HOTEL ∞
            </text>
            <Guest
              x={traveler.x}
              y={900}
              size={1.6}
              color={colors.highlight}
              bob={traveler.moving ? frame / 2.4 : 0}
              suitcase
            />
            <Rain frame={frame} />
          </svg>
        </Camera>
      </AbsoluteFill>

      {/* the desk: the clerk picks up the intercom */}
      <AbsoluteFill style={{ opacity: desk }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <rect
            x={0}
            y={0}
            width={1920}
            height={1080}
            fill={alpha(colors.violet, 0.3)}
          />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <g key={k}>
              <rect
                x={520 + k * 110}
                y={220}
                width={80}
                height={80}
                rx={8}
                fill={alpha(colors.ink, 0.6)}
              />
              <circle
                cx={560 + k * 110}
                cy={262}
                r={12}
                fill={colors.primary}
              />
              <text
                x={560 + k * 110}
                y={330}
                fill={colors.muted}
                fontSize={26}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {k}
              </text>
            </g>
          ))}
          <Guest x={960} y={720} color={colors.green} size={1.5} />
          <rect
            x={560}
            y={690}
            width={800}
            height={240}
            rx={20}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={5}
          />
          {/* the handset rises to the clerk */}
          <g
            transform={`translate(${lerp(1180, 1030, handset)} ${lerp(680, 560, handset)}) rotate(${lerp(0, -30, handset)})`}
          >
            <rect
              x={-70}
              y={-14}
              width={140}
              height={28}
              rx={14}
              fill={colors.ink}
            />
            <circle cx={-62} cy={0} r={20} fill={colors.ink} />
            <circle cx={62} cy={0} r={20} fill={colors.ink} />
          </g>
          {/* the call goes out */}
          {[0, 1, 2].map((k) => {
            const t = rings - k * 0.6;
            if (t <= 0) return null;
            const r = 60 + ((t * 120) % 360);
            return (
              <circle
                key={k}
                cx={1060}
                cy={540}
                r={r}
                fill="none"
                stroke={alpha(colors.primary, Math.max(0, 0.7 - r / 520))}
                strokeWidth={6}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the corridor */}
      <AbsoluteFill style={{ opacity: inside }}>
        <Camera zoom={inZoom} x={inX} y={inY}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <Corridor
              from={-2}
              to={60}
              open={(n) => (n === 0 ? door0 : 0)}
              lit={(n) =>
                n === 0
                  ? Math.max(0, 1 - door0) + ramp(frame, enterAt + 34, 10)
                  : 1
              }
            />
            {/* every guest steps one door along */}
            {Array.from({ length: 60 }).map((_, n) => {
              const w = walk(
                frame,
                moveAt(n),
                moveAt(n) + 34,
                doorCenter(n),
                doorCenter(n + 1),
              );
              return (
                <Guest
                  key={n}
                  x={w.x}
                  color={guestColor(n)}
                  bob={w.moving ? frame / 2.4 + n : 0}
                  label={pull > 0.4 ? undefined : String(w.t < 0.5 ? n : n + 1)}
                />
              );
            })}
            <Guest
              x={traveler2.x}
              color={colors.highlight}
              bob={traveler2.moving ? frame / 2.4 : 0}
              suitcase
              label={traveler2.t >= 1 && pull < 0.4 ? "0" : undefined}
              opacity={fadeIn(frame, enterAt - 4, 6)}
            />
            {/* the sign over room 0 loses its NO */}
            <g transform={`translate(${doorCenter(0)} 300)`} opacity={1 - pull}>
              <rect
                x={-190}
                y={-44}
                width={380}
                height={80}
                rx={14}
                fill={colors.bg}
                stroke={noFall > 0.5 ? colors.green : colors.red}
                strokeWidth={5}
              />
              <text
                x={-60}
                y={14}
                fill={noFall > 0.5 ? colors.green : colors.red}
                fontSize={40}
                textAnchor="start"
                fontWeight={800}
                letterSpacing={3}
              >
                {tx.vacancy}
              </text>
              <text
                x={-120}
                y={14 + noFall * noFall * 420}
                fill={colors.red}
                fontSize={40}
                textAnchor="middle"
                fontWeight={800}
                transform={`rotate(${noFall * 70} -120 ${14 + noFall * noFall * 420})`}
                opacity={1 - noFall}
              >
                {tx.no}
              </text>
            </g>
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 72,
            color: colors.primary,
            opacity: fadeIn(frame, c4 + 60),
          }}
        >
          {tx.full}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
