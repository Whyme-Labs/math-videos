import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../components/vec";
import { useStrings } from "../i18n";

// The payoff. A rope with two pulses travelling towards each other: where
// they meet the rope is their sum, and they come out the other side exactly
// as they went in. Then a curve, not linear at all: the view zooms in on
// one point, the window shrinking a hundredfold, until the curve is a
// straight line, and the tangent in lemon lies right on it. "linear".

const ROPE = { x0: 160, x1: 1760, y: 470 };
const bump = (x: number, c: number, h: number) =>
  h * Math.exp(-(((x - c) / 90) ** 2));

export const Superpose: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("superpose");
  const [c0, c1] = cues;
  // the pulses cross over the length of the first line
  const run = ramp(frame, c0 + 10, Math.max(90, c1 - c0 - 20));
  const aX = lerp(ROPE.x0 + 120, ROPE.x1 - 120, run);
  const bX = lerp(ROPE.x1 - 120, ROPE.x0 + 120, run);
  const rope = (x: number) => bump(x, aX, 150) + bump(x, bX, 110);
  const part1 = fadeOut(frame, c1, 10);

  // the zoom: the window around x = 1 shrinks from ±2.4 to ±0.02
  const z = glide(frame, c1 + 20, fps, 90);
  const half = 2.4 * Math.pow(0.02 / 2.4, z);
  const f = (x: number) => 0.4 * x * x * x - x + 0.3 * Math.sin(3 * x);
  const a = 1;
  const fa = f(a);
  const slope = 1.2 * a * a - 1 + 0.9 * Math.cos(3 * a);
  const BOX = { x: 960, y: 470, w: 640, h: 300 };
  const toScreen = (x: number, y: number) => ({
    x: BOX.x + ((x - a) / half) * BOX.w,
    y: BOX.y - ((y - fa) / half) * BOX.h * 0.6,
  });
  const tangent = fadeIn(frame, c1 + 110, 12);
  const word = Math.min(1, springIn(frame, c1 + 130, fps, 10));

  return (
    <SceneShell id="superpose">
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      <Sfx
        name="pluck3"
        at={c0 + 10 + Math.round(Math.max(90, c1 - c0 - 20) / 2)}
        volume={0.2}
      />
      <Sfx name="riser" at={c1 + 20} volume={0.12} />
      <Sfx name="ding" at={c1 + 110} />
      <Sfx name="chime" at={c1 + 130} />

      {/* two pulses, passing through each other */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[
            { c: aX, h: 150, col: colors.highlight },
            { c: bX, h: 110, col: colors.green },
          ].map((p, k) => (
            <path
              key={k}
              d={curve(
                (x) => bump(x, p.c, p.h),
                ROPE.x0,
                ROPE.x1,
                (x, y) => ({ x, y: ROPE.y + 220 - y * 0.6 }),
                200,
              )}
              fill="none"
              stroke={alpha(p.col, 0.6)}
              strokeWidth={5}
            />
          ))}
          <path
            d={curve(
              rope,
              ROPE.x0,
              ROPE.x1,
              (x, y) => ({ x, y: ROPE.y - y }),
              240,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={10}
            strokeLinecap="round"
          />
          {[ROPE.x0, ROPE.x1].map((x) => (
            <circle key={x} cx={x} cy={ROPE.y} r={16} fill={colors.wood} />
          ))}
          <text
            x={960}
            y={ROPE.y - 230}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={run > 0.4 && run < 0.6 ? 1 : 0}
          >
            +
          </text>
        </svg>
      </AbsoluteFill>

      {/* zoom in far enough and it's linear */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="zoombox">
              <rect x={260} y={140} width={1400} height={660} rx={24} />
            </clipPath>
          </defs>
          <rect
            x={260}
            y={140}
            width={1400}
            height={660}
            rx={24}
            fill={alpha(colors.ink, 0.35)}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
          />
          <g clipPath="url(#zoombox)">
            <line
              x1={toScreen(a - 10 * half, fa - 10 * half * slope).x}
              y1={toScreen(a - 10 * half, fa - 10 * half * slope).y}
              x2={toScreen(a + 10 * half, fa + 10 * half * slope).x}
              y2={toScreen(a + 10 * half, fa + 10 * half * slope).y}
              stroke={colors.primary}
              strokeWidth={6}
              strokeDasharray="18 12"
              opacity={tangent}
            />
            <path
              d={curve(f, a - 1.3 * half, a + 1.3 * half, toScreen, 240)}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={8}
            />
            <circle cx={BOX.x} cy={BOX.y} r={14} fill={colors.paper} />
          </g>
          <text
            x={300}
            y={200}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
            fontWeight={700}
          >
            × {Math.round(2.4 / half)}
          </text>
          <g
            opacity={word}
            transform={`translate(1400 ${lerp(300, 260, word)}) scale(${word})`}
          >
            <rect
              x={-160}
              y={-56}
              width={320}
              height={100}
              rx={20}
              fill={colors.primary}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              y={18}
              fill={colors.ink}
              fontSize={54}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.linearWord}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
