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
import { useStrings } from "../i18n";

// Infinite dimension. A dashed box sized for a finite list; tiles 1, x, x²,
// x³, … march into it and keep coming, burst out of its end, and the camera
// pans to follow the line of tiles off to the right: never enough. Then the
// real line over ℚ: a dust of points thickens without end, a "basis?" card
// hangs over it, and an "axiom of choice" stamp lands on the card.

const TILE = 150;
const POWERS = ["1", "x", "x²", "x³", "x⁴", "x⁵", "x⁶", "x⁷", "x⁸", "x⁹"];

export const Infinite: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("infinite");
  const [c0, c1] = cues;
  const tileAt = (k: number) => c0 + 12 + k * 12;
  const burst = frame >= tileAt(4);
  const pan = ramp(frame, tileAt(4), 100) * 900;
  const part1 = fadeOut(frame, c1, 10);
  const dust = ramp(frame, c1 + 10, 120);
  const card = Math.min(1, springIn(frame, c1 + 60, fps, 10));
  const stamp = glide(frame, c1 + 110, fps, 8);

  return (
    <SceneShell id="infinite">
      {POWERS.map((_, k) => (
        <Sfx
          key={k}
          name={PLUCKS[k % PLUCKS.length]}
          at={tileAt(k)}
          volume={0.12}
        />
      ))}
      <Sfx name="thud" at={tileAt(4)} volume={0.3} />
      <Sfx name="riser" at={c1 + 10} volume={0.1} />
      <Sfx name="pop" at={c1 + 60} volume={0.16} />
      <Sfx name="thud" at={c1 + 118} volume={0.4} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <Camera x={pan}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {/* the finite box */}
            <rect
              x={300}
              y={360}
              width={4 * (TILE + 20)}
              height={TILE + 60}
              rx={24}
              fill="none"
              stroke={burst ? colors.red : alpha(colors.paper, 0.6)}
              strokeWidth={6}
              strokeDasharray="18 12"
              transform={
                burst
                  ? `translate(${shake(frame, tileAt(4), 12)} 0)`
                  : undefined
              }
            />
            {POWERS.map((p, k) => {
              const t = glide(frame, tileAt(k), fps, 14);
              const x = 330 + k * (TILE + 20);
              return (
                <g
                  key={p}
                  opacity={t}
                  transform={`translate(${lerp(x - 300, x, t)} 390)`}
                >
                  <rect
                    width={TILE}
                    height={TILE}
                    rx={20}
                    fill={
                      k < 4
                        ? alpha(colors.violet, 0.9)
                        : alpha(colors.orange, 0.9)
                    }
                    stroke={colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={TILE / 2}
                    y={TILE / 2 + 24}
                    fill={colors.text}
                    fontSize={68}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    {p}
                  </text>
                </g>
              );
            })}
            <text
              x={330 + 10 * (TILE + 20)}
              y={490}
              fill={colors.muted}
              fontSize={90}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, tileAt(9))}
            >
              …
            </text>
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 640,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 72,
            fontWeight: 900,
            color: colors.red,
            opacity: fadeIn(frame, tileAt(5)),
          }}
        >
          {tx.never}
        </div>
      </AbsoluteFill>

      {/* ℝ over ℚ */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={640}
            x2={1760}
            y2={640}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {Array.from({ length: 320 }).map((_, i) => {
            const x = 160 + ((i * 7919) % 1600);
            const show = i / 320 < dust;
            return show ? (
              <circle
                key={i}
                cx={x}
                cy={640 + (((i * 31) % 9) - 4) * 3}
                r={3 + (i % 3)}
                fill={i % 5 ? colors.primary : colors.highlight}
                opacity={0.8}
              />
            ) : null;
          })}
          <text
            x={1700}
            y={720}
            fill={colors.text}
            fontSize={56}
            textAnchor="end"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 20)}
          >
            {tx.rOverQ}
          </text>
          <g
            opacity={card}
            transform={`translate(960 ${lerp(300, 330, card)}) scale(${card})`}
          >
            <rect
              x={-230}
              y={-80}
              width={460}
              height={150}
              rx={24}
              fill={alpha(colors.violet, 0.95)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <text
              y={22}
              fill={colors.text}
              fontSize={66}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.basis} ?
            </text>
          </g>
          <g
            opacity={stamp}
            transform={`translate(1060 ${lerp(220, 390, stamp)}) rotate(-10) scale(${lerp(1.8, 1, stamp)})`}
          >
            <rect
              x={-230}
              y={-46}
              width={460}
              height={84}
              rx={16}
              fill={alpha(colors.bg, 0.7)}
              stroke={colors.highlight}
              strokeWidth={7}
            />
            <text
              y={14}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.choice}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
