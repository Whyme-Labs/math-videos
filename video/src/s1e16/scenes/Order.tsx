import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Shoe } from "../../s1e14/components/study";
import { Tile } from "../components/props";
import { useStrings } from "../i18n";

// Order matters. Two tiles side by side with corner 1 ringed in red. Left:
// flip across the 1–3 diagonal, then a quarter turn; corner 1 ends bottom
// right, where 2 was. Right: quarter turn, then the same flip; corner 1 ends
// top left, where 4 was. Then socks and shoes: a foot gets a sock, then a
// shoe, and taking them off goes in reverse, shoe first.

const FOOT_Y = 640;

export const Order: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("order");
  const [c0, c1] = cues;
  const a = glide(frame, c0 + 20, fps, 22); // first move
  const b = glide(frame, c0 + 80, fps, 22); // second move
  const result = Math.min(1, springIn(frame, c0 + 130, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  // socks and shoes
  const sockOn = glide(frame, c1 + 10, fps, 12);
  const shoeOn = glide(frame, c1 + 30, fps, 12);
  const shoeOff = glide(frame, c1 + 66, fps, 12);
  const sockOff = glide(frame, c1 + 86, fps, 12);

  return (
    <SceneShell id="order">
      <Sfx name="pluck2" at={c0 + 20} volume={0.14} />
      <Sfx name="pluck4" at={c0 + 80} volume={0.14} />
      <Sfx name="ding" at={c0 + 130} volume={0.2} />
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      <Sfx name="thud" at={c1 + 30} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 66} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 86} volume={0.14} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* left: flip, then turn */}
          <Tile
            x={560}
            y={500}
            size={340}
            flip={a}
            axis={45}
            rot={90 * b}
            mark={0}
            outline
          />
          {/* right: turn, then flip. The flip axis is fixed in space, so after
              the turn it is applied in the frame of the table, not the tile. */}
          <g transform="translate(1360 500)">
            <g
              transform={`rotate(-45) scale(1 ${Math.cos(Math.PI * b)}) rotate(45)`}
            >
              <Tile x={0} y={0} size={340} rot={90 * a} mark={0} outline />
            </g>
          </g>
          <text
            x={960}
            y={540}
            fill={colors.red}
            fontSize={140}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={result}
          >
            ≠
          </text>
          {/* where corner 1 ended up */}
          <g opacity={result}>
            <text
              x={560}
              y={790}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              1 → 2
            </text>
            <text
              x={1360}
              y={790}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              1 → 4
            </text>
          </g>
        </svg>
        {[
          { t: tx.flipThenTurn, x: 560 },
          { t: tx.turnThenFlip, x: 1360 },
        ].map((l) => (
          <div
            key={l.t}
            style={{
              position: "absolute",
              top: 120,
              left: l.x - 300,
              width: 600,
              textAlign: "center",
              fontFamily: fonts.title,
              fontSize: 52,
              fontWeight: 800,
              color: colors.highlight,
              opacity: fadeIn(frame, c0 + 6),
              translate: riseIn(frame, c0 + 6, 16),
            }}
          >
            {l.t}
          </div>
        ))}
      </AbsoluteFill>

      {/* socks and shoes */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2, 10) }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(960 ${FOOT_Y}) scale(2.4)`}>
            {/* the foot */}
            <path
              d="M -16 -110 L 16 -110 L 16 -30 Q 50 -26 50 -6 Q 50 8 30 8 L -14 8 Q -24 8 -24 -6 Z"
              fill="#f2c9a0"
              stroke={colors.ink}
              strokeWidth={3}
            />
            {/* the sock slides on from above, and off again */}
            <g
              transform={`translate(0 ${lerp(-180, 0, sockOn) + lerp(0, -180, sockOff)})`}
              opacity={sockOn * (1 - sockOff)}
            >
              <path
                d="M -18 -112 L 18 -112 L 18 -28 Q 52 -24 52 -6 Q 52 10 30 10 L -16 10 Q -26 10 -26 -6 Z"
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={3}
              />
              <rect
                x={-18}
                y={-112}
                width={36}
                height={16}
                fill={colors.primary}
              />
            </g>
            {/* the shoe */}
            <g
              transform={`translate(${lerp(140, 8, shoeOn) + lerp(0, 140, shoeOff)} 10)`}
              opacity={shoeOn * (1 - shoeOff)}
            >
              <Shoe x={0} y={0} s={1.2} />
            </g>
          </g>
          {/* the order, on and off */}
          {[
            {
              t: `1. ${tx.socks} ${tx.on}`,
              x: 300,
              y: 380,
              at: c1 + 10,
              c: colors.text,
            },
            {
              t: `2. ${tx.shoes} ${tx.on}`,
              x: 300,
              y: 460,
              at: c1 + 30,
              c: colors.text,
            },
            {
              t: `1. ${tx.shoes} ${tx.off}`,
              x: 1620,
              y: 380,
              at: c1 + 66,
              c: colors.highlight,
            },
            {
              t: `2. ${tx.socks} ${tx.off}`,
              x: 1620,
              y: 460,
              at: c1 + 86,
              c: colors.highlight,
            },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={l.y}
              fill={l.c}
              fontSize={48}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, l.at, 8)}
            >
              {l.t}
            </text>
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
