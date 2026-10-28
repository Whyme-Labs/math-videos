import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  typed,
  lerp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { arcPath, Floor } from "../components/tools";
import { useStrings } from "../i18n";

// The payoff. A unit circle with the 60° angle; the 20° ray we'd need,
// dashed; drop from where it meets the circle to the axis: cos 20°, a root
// of 8x³ − 6x − 1. Its badge, "degree 3", flies at the tower of
// constructible degrees (1, 2, 4, 8), finds no floor that fits, and bounces
// off. Then a cube with its edge ∛2 gets the same badge, and IMPOSSIBLE
// slams down across both.

const C = { x: 620, y: 600 };
const R = 300;
const at = (d: number, r = R) => ({
  x: C.x + r * Math.cos((d * Math.PI) / 180),
  y: C.y - r * Math.sin((d * Math.PI) / 180),
});
const TOWER = { x: 1460, base: 740, step: 110 };

const Badge: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s: number;
  readonly text: string;
  readonly red?: boolean;
}> = ({ x, y, s, text, red }) => (
  <g opacity={s > 0 ? 1 : 0} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect
      x={-150}
      y={-50}
      width={300}
      height={96}
      rx={22}
      fill={red ? colors.red : colors.highlight}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      x={0}
      y={16}
      fill={colors.ink}
      fontSize={50}
      textAnchor="middle"
      fontFamily={fonts.title}
      fontWeight={900}
    >
      {text}
    </text>
  </g>
);

export const Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("payoff");
  const [c0, c1, c2] = cues;
  const rays = glide(frame, c0 + 6, fps, 18);
  const third = glide(frame, c0 + 34, fps, 18);
  const drop = glide(frame, c0 + 60, fps, 16);
  const badge = Math.min(1, springIn(frame, c1 + 20, fps, 10));
  const fly = glide(frame, c1 + 50, fps, 22);
  const hit = frame >= c1 + 72;
  const back = glide(frame, c1 + 76, fps, 20);
  const p20 = at(20);
  const foot = { x: p20.x, y: C.y };
  const throwAt = hop(fly, foot.x, foot.y + 150, TOWER.x - 330, 520, 160);
  const bx = hit ? lerp(TOWER.x - 330, TOWER.x - 440, back) : throwAt.x;
  const by = hit ? lerp(520, 730, back) : throwAt.y;
  const part12 = fadeOut(frame, c2, 12);
  const cube = glide(frame, c2 + 6, fps, 20);
  const slam = glide(frame, c2 + 70, fps, 8);

  return (
    <SceneShell id="payoff">
      <Sfx name="scratch" at={c0 + 6} volume={0.16} />
      <Sfx name="scratch" at={c0 + 34} volume={0.16} />
      <Sfx name="pluck3" at={c0 + 60} volume={0.16} />
      <Sfx name="pop" at={c1 + 20} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.16} />
      <Sfx name="thud" at={c1 + 72} volume={0.4} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 40} volume={0.18} />
      <Sfx name="thud" at={c2 + 78} volume={0.5} />
      <Sfx name="riser" at={c2 + 30} volume={0.12} />

      {/* the angle, the cosine, the tower */}
      <AbsoluteFill style={{ opacity: part12 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={C.x}
            cy={C.y}
            r={R}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <line
            x1={C.x - R - 40}
            y1={C.y}
            x2={C.x + R + 60}
            y2={C.y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {[0, 60].map((d) => {
            const e = at(d, (R + 60) * rays);
            return (
              <line
                key={d}
                x1={C.x}
                y1={C.y}
                x2={e.x}
                y2={e.y}
                stroke={colors.paper}
                strokeWidth={7}
                strokeLinecap="round"
              />
            );
          })}
          <text
            x={at(42, 120).x}
            y={at(42, 120).y}
            fill={colors.paper}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={rays}
          >
            60°
          </text>
          {/* the third we'd need */}
          <line
            x1={C.x}
            y1={C.y}
            x2={lerp(C.x, p20.x, third)}
            y2={lerp(C.y, p20.y, third)}
            stroke={colors.highlight}
            strokeWidth={6}
            strokeDasharray="16 10"
          />
          <path
            d={arcPath(C.x, C.y, 160, 0, 20, third)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            opacity={third > 0 ? 1 : 0}
          />
          <text
            x={at(10, 200).x}
            y={at(10, 200).y + 16}
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={700}
            opacity={third}
          >
            20°
          </text>
          {/* drop to the axis */}
          <line
            x1={p20.x}
            y1={p20.y}
            x2={p20.x}
            y2={lerp(p20.y, C.y, drop)}
            stroke={colors.green}
            strokeWidth={6}
            opacity={drop > 0 ? 1 : 0}
          />
          <line
            x1={C.x}
            y1={C.y}
            x2={lerp(C.x, foot.x, drop)}
            y2={C.y}
            stroke={colors.green}
            strokeWidth={12}
            strokeLinecap="round"
            opacity={drop > 0 ? 1 : 0}
          />
          <circle cx={foot.x} cy={foot.y} r={16 * drop} fill={colors.green} />
          <text
            x={lerp(C.x, foot.x, 0.5)}
            y={C.y + 64}
            fill={colors.green}
            fontSize={50}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 70)}
          >
            cos 20°
          </text>
          <text
            x={foot.x + 30}
            y={C.y - 30}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 120) * fadeOut(frame, c1 + 40, 10)}
          >
            {typed("≈ 0.9397", frame, c0 + 120, fps, 10)}
          </text>
          {/* the tower of constructible degrees */}
          {["1", "2", "4", "8"].map((l, k) => (
            <g
              key={l}
              opacity={fadeIn(frame, c1 + 10 + k * 6)}
              transform={`translate(${hit ? shake(frame, c1 + 72, 8) : 0} 0)`}
            >
              <Floor
                x={TOWER.x}
                y={TOWER.base - k * TOWER.step}
                w={300}
                label={l}
              />
            </g>
          ))}
          <text
            x={TOWER.x - 220}
            y={530}
            fill={colors.red}
            fontSize={90}
            textAnchor="middle"
            fontWeight={900}
            opacity={hit ? fadeIn(frame, c1 + 72, 4) : 0}
          >
            ✗
          </text>
          <Badge x={bx} y={by} s={badge} text={tx.degree3} red={hit} />
        </svg>
      </AbsoluteFill>

      {/* doubling the cube: the same 3 */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 6, 10) }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${frame >= c2 + 78 ? shake(frame, c2 + 78, 12) : 0} 0)`}
          >
            <g
              transform={`translate(760 520) scale(${lerp(0.6, 1, cube)})`}
              opacity={cube}
            >
              {/* an isometric cube */}
              <path
                d="M 0 -200 L 173 -100 L 0 0 L -173 -100 Z"
                fill={alpha(colors.primary, 0.85)}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <path
                d="M -173 -100 L 0 0 L 0 200 L -173 100 Z"
                fill={alpha(colors.orange, 0.85)}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <path
                d="M 173 -100 L 0 0 L 0 200 L 173 100 Z"
                fill={alpha(colors.violet, 0.95)}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <text
                x={110}
                y={190}
                fill={colors.text}
                fontSize={72}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {tx.cubeRoot}
              </text>
            </g>
            <Badge
              x={1260}
              y={420}
              s={Math.min(1, springIn(frame, c2 + 40, fps, 10))}
              text={tx.degree3}
            />
          </g>
          <g
            opacity={slam}
            transform={`translate(960 460) rotate(-10) scale(${lerp(2.2, 1, slam)})`}
          >
            <rect
              x={-420}
              y={-90}
              width={840}
              height={170}
              rx={24}
              fill={alpha(colors.bg, 0.5)}
              stroke={colors.red}
              strokeWidth={12}
            />
            <text
              x={0}
              y={34}
              fill={colors.red}
              fontSize={110}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
              letterSpacing={6}
            >
              {tx.impossible.toUpperCase()}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* the one formula */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 76,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 90) * fadeOut(frame, c1 + 40, 10),
          translate: riseIn(frame, c0 + 90, 16),
        }}
      >
        {tx.cubic}
      </div>
    </SceneShell>
  );
};
