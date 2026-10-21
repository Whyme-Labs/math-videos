import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest } from "../../s1e11/components/hotel";
import { useStrings } from "../i18n";

// Chinese edition only. 《韩非子·难一》: a man of 楚 sells shields and spears.
// "吾盾之坚，物莫能陷也"; "吾矛之利，于物无不陷也". Someone asks "以子之矛，
// 陷子之盾，何如？" and he cannot answer. At the stall the spear drives at
// the shield and stops, shaking, at the point of contact; then the pair
// becomes a single diagonal cell that flips back and forth, ✓ ↔ ✗.

const SLIP_W = 92;
const SLIP_X = (i: number) => 1760 - i * (SLIP_W + 16);
const SLIP_Y = 150;
const SLIP_H = 360;

export const Maodun: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("maodun");
  const [c0, c1, c2] = cues;
  const boast1 = fadeIn(frame, c0 + 10) * fadeOut(frame, c1, 8);
  const boast2 = fadeIn(frame, c0 + 50) * fadeOut(frame, c1, 8);
  const thrust = glide(frame, c1 + 30, fps, 18);
  const stuck = frame >= c1 + 48;
  const slipAt = (i: number) => c1 + 4 + i * 10;
  const morph = glide(frame, c2 + 6, fps, 24);
  const flipK = Math.floor(Math.max(0, frame - (c2 + 36)) / 12) % 2;
  const zoom = lerp(1, 1.25, glide(frame, c1 + 20, fps, 40)) - 0.25 * morph;

  return (
    <SceneShell id="maodun">
      <Sfx name="pop" at={c0 + 10} />
      <Sfx name="pop" at={c0 + 50} />
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 30} volume={0.2} />
      <Sfx name="thud" at={c1 + 48} volume={0.45} />
      <Sfx name="scratch" at={c1 + 50} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`f${k}`} name="tick" at={c2 + 36 + k * 12} volume={0.16} />
      ))}

      <Camera
        zoom={zoom}
        x={-200 * glide(frame, c1 + 20, fps, 40) * (1 - morph)}
        y={0}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <g opacity={1 - morph}>
            {/* the market stall */}
            <rect
              x={160}
              y={360}
              width={900}
              height={40}
              rx={10}
              fill={colors.red}
            />
            {Array.from({ length: 9 }).map((_, k) => (
              <path
                key={k}
                d={`M ${160 + k * 100} 400 q 50 50 100 0`}
                fill={k % 2 ? colors.paper : colors.red}
              />
            ))}
            <rect
              x={200}
              y={760}
              width={820}
              height={160}
              rx={14}
              fill={colors.wood}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <Guest x={620} y={760} color={colors.orange} size={1.6} />
            {/* the shield, on the left */}
            <g
              transform={`translate(${380 + (stuck ? shake(frame, c1 + 48, 10) : 0)} 640)`}
            >
              <ellipse
                cx={0}
                cy={0}
                rx={110}
                ry={140}
                fill={colors.wood}
                stroke={colors.ink}
                strokeWidth={8}
              />
              <ellipse
                cx={0}
                cy={0}
                rx={70}
                ry={96}
                fill="none"
                stroke={colors.primary}
                strokeWidth={8}
              />
              <circle cx={0} cy={0} r={20} fill={colors.primary} />
            </g>
            {/* the spear, driving at the shield */}
            <g
              transform={`translate(${lerp(1300, 520, thrust) + (stuck ? shake(frame, c1 + 48, 10) : 0)} 640)`}
            >
              <rect
                x={0}
                y={-10}
                width={700}
                height={20}
                rx={8}
                fill={colors.wood}
              />
              <polygon
                points="-90,0 10,-34 10,34"
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={5}
              />
            </g>
            {stuck ? (
              <text
                x={470}
                y={520}
                fill={colors.highlight}
                fontSize={120}
                textAnchor="middle"
                fontWeight={800}
                opacity={fadeIn(frame, c1 + 50)}
              >
                ?
              </text>
            ) : null}
            {/* the two boasts */}
            {[
              { t: "吾盾之坚，物莫能陷也", x: 380, y: 300, o: boast1 },
              { t: "吾矛之利，于物无不陷也", x: 860, y: 230, o: boast2 },
            ].map((b) => (
              <g key={b.t} opacity={b.o}>
                <rect
                  x={b.x - 260}
                  y={b.y - 60}
                  width={520}
                  height={90}
                  rx={24}
                  fill={colors.paper}
                />
                <text
                  x={b.x}
                  y={b.y}
                  fill={colors.ink}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                >
                  {b.t}
                </text>
              </g>
            ))}
          </g>
          {/* the spear and shield become one cell that flips forever */}
          <g
            opacity={morph}
            transform={`translate(760 560) scale(${lerp(0.5, 1.6, morph)})`}
          >
            <rect
              x={-80}
              y={-80}
              width={160}
              height={160}
              rx={20}
              fill={alpha(colors.primary, 0.85)}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <text
              x={0}
              y={36}
              fill={flipK ? colors.red : colors.green}
              fontSize={110}
              textAnchor="middle"
              fontWeight={800}
            >
              {flipK ? "✗" : "✓"}
            </text>
          </g>
        </svg>
      </Camera>

      <AbsoluteFill>
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
              backgroundColor: alpha(colors.wood, 0.35),
              border: `3px solid ${alpha(colors.wood, 0.85)}`,
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
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(2) - 30,
            width: SLIP_X(0) + SLIP_W - SLIP_X(2) + 60,
            top: SLIP_Y + SLIP_H + 18,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(2) + 6),
          }}
        >
          {tx.hanfei}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
