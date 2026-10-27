import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../../s1e11/components/hotel";
import { Letter, Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Paris, 1847: the Academy in rows, Lamé at the board with
// Fermat's equation. The left side breaks into a row of factor bricks to
// be matched against the right. Liouville stands up in the second row:
// "only one way?" Then a letter flies in from Kummer and lands on the
// lectern; the bricks crack and slide apart.

const BOARD = { x: 780, y: 140, w: 980, h: 360 };
const BRICKS = 5;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  const write = fadeIn(frame, c0 + 20, 12);
  const split = glide(frame, c1 + 10, fps, 24);
  const brickAt = (k: number) => c1 + 16 + k * 6;
  const stand = glide(frame, c2 + 6, fps, 14);
  const bubble =
    Math.min(1, springIn(frame, c2 + 24, fps, 10)) * fadeOut(frame, c3, 10);
  const fly = glide(frame, c3 + 6, fps, 24);
  const letter = hop(fly, 2100, 200, 470, 600, 200);
  const crack = frame >= c3 + 34;
  const apart = glide(frame, c3 + 40, fps, 20);
  const push = glide(frame, c4 + 4, fps, 30);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="scratch" at={c0 + 20} volume={0.2} />
      {Array.from({ length: BRICKS }).map((_, k) => (
        <Sfx key={k} name="clink" at={brickAt(k)} volume={0.12} />
      ))}
      <Sfx name="pop" at={c2 + 6} volume={0.18} />
      <Sfx name="pop" at={c2 + 24} volume={0.2} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.18} />
      <Sfx name="thud" at={c3 + 30} volume={0.3} />
      <Sfx name="scratch" at={c3 + 34} volume={0.4} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.14} />

      <Camera
        zoom={lerp(1, 1.35, push)}
        x={lerp(0, 310, push)}
        y={lerp(0, -170, push)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <rect
            x={-200}
            y={-200}
            width={2400}
            height={1500}
            fill={alpha(colors.ink, 0.25)}
          />
          {/* the board */}
          <rect
            x={BOARD.x}
            y={BOARD.y}
            width={BOARD.w}
            height={BOARD.h}
            rx={12}
            fill={alpha(colors.green, 0.22)}
            stroke={colors.wood}
            strokeWidth={14}
          />
          <text
            x={BOARD.x + BOARD.w / 2}
            y={BOARD.y + 100}
            fill={colors.paper}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={write}
          >
            xⁿ + yⁿ = zⁿ
          </text>
          {/* the left side as a row of factor bricks */}
          {Array.from({ length: BRICKS }).map((_, k) => {
            const s = Math.min(1, springIn(frame, brickAt(k), fps, 10));
            const bx =
              BOARD.x +
              60 +
              k * 110 +
              (crack ? shake(frame, c3 + 34 + k, 10) : 0) +
              apart * (k - 2) * 40;
            const by = BOARD.y + 285 + apart * (k % 2 ? 30 : -20);
            return (
              <g
                key={k}
                opacity={s * split}
                transform={`translate(${bx} ${by}) rotate(${apart * (k - 2) * 8})`}
              >
                <rect
                  x={0}
                  y={-50}
                  width={100}
                  height={80}
                  rx={10}
                  fill={colors.highlight}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <text
                  x={50}
                  y={8}
                  fill={colors.ink}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {k === BRICKS - 1 ? "…" : `p${["₁", "₂", "₃", "₄"][k]}`}
                </text>
                {crack ? (
                  <path
                    d="M 20 -50 L 50 -10 L 36 10 L 70 30"
                    stroke={colors.red}
                    strokeWidth={5}
                    fill="none"
                  />
                ) : null}
              </g>
            );
          })}
          <text
            x={BOARD.x + 640}
            y={BOARD.y + 300}
            fill={colors.paper}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={split}
          >
            = z · z · … · z
          </text>
          {/* Lamé and the lectern */}
          <Person
            x={420}
            y={760}
            color={colors.orange}
            size={2.2}
            facing={1}
            bob={frame / 16}
          />
          <rect
            x={330}
            y={640}
            width={260}
            height={220}
            rx={8}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={5}
          />
          <text
            x={420}
            y={330}
            fill={colors.orange}
            fontSize={44}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.lame}
          </text>
          {/* the audience */}
          {[0, 1].map((row) =>
            Array.from({ length: 6 }).map((_, k) => {
              const x = 820 + k * 170 + row * 80;
              const y = 680 + row * 125;
              const him = row === 0 && k === 3;
              return (
                <g key={`${row}-${k}`} opacity={1 - 0.85 * push}>
                  <Person
                    x={x}
                    y={y - (him ? 60 * stand : 0)}
                    color={him ? colors.green : guestColor(row * 6 + k)}
                    size={1}
                    facing={-1}
                  />
                  <rect
                    x={x - 70}
                    y={y - 30}
                    width={140}
                    height={30}
                    rx={6}
                    fill={colors.wood}
                  />
                </g>
              );
            }),
          )}
          <text
            x={820 + 3 * 170}
            y={680 - 270 - 60 * stand + 90}
            fill={colors.green}
            fontSize={36}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 10) * fadeOut(frame, c3, 8)}
          >
            {tx.liouville}
          </text>
          {/* his question */}
          <g
            opacity={bubble}
            transform={`translate(${820 + 3 * 170} ${300}) scale(${bubble})`}
          >
            <rect
              x={-200}
              y={-42}
              width={400}
              height={80}
              rx={30}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <path
              d="M -20 38 L 0 70 L 30 38 Z"
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={0}
              y={12}
              fill={colors.ink}
              fontSize={38}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.onlyOneWay}
            </text>
          </g>
          {/* Kummer's letter */}
          {frame >= c3 + 4 ? (
            <Letter
              x={letter.x}
              y={letter.y}
              rot={lerp(-30, -4, fly)}
              scale={0.9}
              open={glide(frame, c3 + 32, fps, 10)}
            />
          ) : null}
          <text
            x={315}
            y={620}
            fill={colors.highlight}
            fontSize={36}
            textAnchor="end"
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 30)}
          >
            {tx.fromKummer}
          </text>
          <text
            x={BOARD.x + BOARD.w / 2}
            y={BOARD.y - 30}
            fill={colors.red}
            fontSize={70}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={fadeIn(frame, c3 + 40)}
          >
            {tx.no}
          </text>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 10),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.paris}
      </div>
    </SceneShell>
  );
};
