import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Bag, Cup, Shoe, Star } from "../components/study";
import { useStrings } from "../i18n";

// Russell's theory of types as a building. Floor 0: things. Floor 1: bags of
// things, each tied by strings to what it holds on the floor below. Floor 2:
// a bag of those bags. R tries to jump into itself and slams into the
// ceiling: on this building the question can't be asked. Then the price:
// the camera rides up, and every floor has its own bag marked 2; back down
// on floor 0, the things run off to the right without end.

const floorY = (k: number) => 780 - k * 230;
const THINGS = [
  { x: 520, el: (x: number, y: number) => <Cup x={x} y={y} s={0.8} /> },
  { x: 620, el: (x: number, y: number) => <Cup x={x} y={y} s={0.8} /> },
  { x: 780, el: (x: number, y: number) => <Star x={x} y={y} s={0.8} /> },
  { x: 880, el: (x: number, y: number) => <Star x={x} y={y} s={0.8} /> },
  { x: 1040, el: (x: number, y: number) => <Shoe x={x} y={y} s={0.8} /> },
  { x: 1140, el: (x: number, y: number) => <Shoe x={x} y={y} s={0.8} /> },
];
const BAGS1 = [570, 830, 1090];
const FLOORS = 8;

export const Floors: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("floors");
  const [c0, c1, c2] = cues;
  const thingAt = (k: number) => c0 + 8 + k * 4;
  const bag1At = (k: number) => c0 + 40 + k * 8;
  const bag2At = c0 + 76;
  // R tries to jump into itself and hits the ceiling
  const jump = glide(frame, c1 + 20, fps, 14);
  const bounced = frame >= c1 + 34;
  const fallBack = glide(frame, c1 + 34, fps, 12);
  const rY = bounced
    ? lerp(floorY(2) - 100, floorY(2), fallBack)
    : lerp(floorY(2), floorY(2) - 100, jump);
  // the price: ride up past a 2 on every floor, then back down to floor 0
  const up = glide(frame, c2 + 4, fps, 50);
  const down = glide(frame, c2 + 70, fps, 30);
  const camY = lerp(0, -1000, up) * (1 - down) + 60 * down;
  const camX = lerp(0, 600, down);
  const many = glide(frame, c2 + 86, fps, 40);

  return (
    <SceneShell id="floors">
      {THINGS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={thingAt(k)} volume={0.12} />
      ))}
      {BAGS1.map((_, k) => (
        <Sfx key={`b${k}`} name="pop" at={bag1At(k)} volume={0.16} />
      ))}
      <Sfx name="pop" at={bag2At} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.16} />
      <Sfx name="thud" at={c1 + 34} volume={0.4} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.16} />
      {[1, 2, 3, 4, 5].map((k) => (
        <Sfx key={`t${k}`} name="ding" at={c2 + 6 + k * 9} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 70} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 90} volume={0.3} />

      <Camera zoom={lerp(1, 0.9, up)} x={camX} y={camY}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the floors */}
          {Array.from({ length: FLOORS }).map((_, k) => (
            <g
              key={k}
              opacity={k < 3 ? fadeIn(frame, c0 + k * 6) : fadeIn(frame, c2)}
            >
              <rect
                x={200}
                y={floorY(k)}
                width={k === 0 ? 3200 : 1520}
                height={16}
                fill={alpha(colors.primary, 0.6)}
              />
              <text
                x={230}
                y={floorY(k) - 24}
                fill={colors.muted}
                fontSize={36}
                fontFamily={fonts.mono}
              >
                {tx.floor(k)}
              </text>
              {/* every floor above 0 has its own 2 */}
              {k >= 1 ? (
                <g opacity={fadeIn(frame, c2 + 6 + k * 9, 8)}>
                  <Bag
                    x={1540}
                    y={floorY(k)}
                    w={150}
                    h={130}
                    s={Math.min(1, springIn(frame, c2 + 6 + k * 9, fps, 10))}
                    label="2"
                    color={colors.green}
                  />
                </g>
              ) : null}
            </g>
          ))}
          <text
            x={1900}
            y={floorY(0) - 110}
            fill={colors.highlight}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 96)}
          >
            {tx.infinitelyMany}
          </text>
          {/* floor 0: things */}
          {THINGS.map((t, k) => (
            <g key={k} opacity={fadeIn(frame, thingAt(k), 6)}>
              {t.el(t.x, floorY(0))}
            </g>
          ))}
          {/* and more things, off to the right, without end */}
          {Array.from({ length: 40 }).map((_, n) => (
            <g key={`m${n}`} opacity={many}>
              <Star
                x={1300 + 1100 * (1 - 0.88 ** n) * many}
                y={floorY(0)}
                s={0.8 * 0.95 ** n}
              />
            </g>
          ))}
          {/* floor 1: bags of things, tied to what they hold */}
          {BAGS1.map((x, k) => (
            <g key={x} opacity={fadeIn(frame, bag1At(k), 8)}>
              {[THINGS[2 * k], THINGS[2 * k + 1]].map((t) => (
                <line
                  key={t.x}
                  x1={x}
                  y1={floorY(1)}
                  x2={t.x}
                  y2={floorY(0) - 70}
                  stroke={alpha(colors.paper, 0.5)}
                  strokeWidth={3}
                  strokeDasharray="8 6"
                />
              ))}
              <Bag
                x={x}
                y={floorY(1)}
                w={150}
                h={130}
                s={Math.min(1, springIn(frame, bag1At(k), fps, 10))}
                color={colors.wood}
              />
            </g>
          ))}
          {/* floor 2: a bag of bags */}
          <g opacity={fadeIn(frame, bag2At, 8)}>
            {BAGS1.map((x) => (
              <line
                key={x}
                x1={830}
                y1={floorY(2)}
                x2={x}
                y2={floorY(1) - 130}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
                strokeDasharray="8 6"
              />
            ))}
            <Bag
              x={830}
              y={floorY(2)}
              w={170}
              h={140}
              s={Math.min(1, springIn(frame, bag2At, fps, 10))}
              color={colors.violet}
            />
          </g>
          {/* R jumps at itself and hits the ceiling */}
          <g
            opacity={fadeIn(frame, c1 + 4, 8)}
            transform={`translate(${bounced ? shake(frame, c1 + 34, 12) : 0} 0)`}
          >
            <Bag
              x={1220}
              y={rY}
              w={170}
              h={140}
              label="R"
              color={colors.highlight}
            />
            <rect
              x={1080}
              y={floorY(3) - 4}
              width={280}
              height={24}
              fill={colors.red}
              opacity={bounced ? fadeIn(frame, c1 + 34, 4) : 0}
            />
          </g>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 70,
          right: 140,
          display: "flex",
          alignItems: "baseline",
          gap: 30,
          opacity: fadeIn(frame, c1 + 36) * fadeOut(frame, c2, 10),
        }}
      >
        <span
          style={{
            fontFamily: fonts.math,
            fontSize: 72,
            fontWeight: 700,
            color: colors.muted,
            textDecoration: "line-through",
            textDecorationColor: colors.red,
            textDecorationThickness: 6,
          }}
        >
          R ∈ R
        </span>
        <span
          style={{
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.red,
          }}
        >
          {tx.cantAsk}
        </span>
      </div>
    </SceneShell>
  );
};
