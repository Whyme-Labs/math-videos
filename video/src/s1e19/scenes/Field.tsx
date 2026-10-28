import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// What a field is. A card of rationals and the seven-hour clock each take
// a "field" stamp, slammed down. Then ℚ(√2): a grid with two directions,
// 1 along the floor and √2 up the wall. A point walks 3 steps along and 2
// up to 3 + 2√2; every number of the field is one of these grid points.
// The badge: degree 2.

const G = { x: 760, y: 740, s: 120 }; // grid origin and step

const Stamp: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly t: number;
  readonly text: string;
}> = ({ x, y, t, text }) => (
  <g
    opacity={t > 0 ? 1 : 0}
    transform={`translate(${x} ${lerp(y - 200, y, t)}) rotate(-8) scale(${lerp(1.6, 1, t)})`}
  >
    <rect
      x={-170}
      y={-62}
      width={340}
      height={110}
      rx={16}
      fill={alpha(colors.bg, 0.6)}
      stroke={colors.primary}
      strokeWidth={8}
    />
    <text
      x={0}
      y={18}
      fill={colors.primary}
      fontSize={64}
      textAnchor="middle"
      fontFamily={fonts.title}
      fontWeight={900}
    >
      {text}
    </text>
  </g>
);

export const Field: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("field");
  const [c0, c1] = cues;
  const stampAt = [c0 + 60, c0 + 110];
  const part1 = fadeOut(frame, c1, 10);
  const grid = glide(frame, c1 + 6, fps, 20);
  const walk1 = glide(frame, c1 + 40, fps, 24);
  const walk2 = glide(frame, c1 + 76, fps, 20);
  const badge = Math.min(1, springIn(frame, c1 + 110, fps, 10));
  const px = G.x + 3 * G.s * walk1;
  const py = G.y - 2 * G.s * Math.SQRT2 * walk2;

  return (
    <SceneShell id="field">
      {stampAt.map((at, k) => (
        <Sfx key={k} name="thud" at={at + 8} volume={0.34} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      <Sfx name={PLUCKS[0]} at={c1 + 40} volume={0.16} />
      <Sfx name={PLUCKS[3]} at={c1 + 76} volume={0.16} />
      <Sfx name="ding" at={c1 + 110} />

      {/* two fields, stamped */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${frame >= stampAt[0] + 8 ? shake(frame, stampAt[0] + 8, 10) : 0} 0)`}
            opacity={fadeIn(frame, c0 + 6)}
          >
            <rect
              x={340}
              y={240}
              width={520}
              height={420}
              rx={28}
              fill={alpha(colors.violet, 0.8)}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <text
              x={600}
              y={420}
              fill={colors.text}
              fontSize={140}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.rationals}
            </text>
            <text
              x={600}
              y={540}
              fill={colors.muted}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              ½ · −3 · 7⁄8 · 22⁄7
            </text>
          </g>
          <g
            transform={`translate(${frame >= stampAt[1] + 8 ? shake(frame, stampAt[1] + 8, 10) : 0} 0)`}
            opacity={fadeIn(frame, c0 + 20)}
          >
            <Clock
              x={1320}
              y={450}
              r={210}
              n={7}
              pos={(frame / 30) % 7}
              zeroTop
            />
          </g>
          <Stamp
            x={600}
            y={660}
            t={glide(frame, stampAt[0], fps, 8)}
            text={tx.field}
          />
          <Stamp
            x={1320}
            y={660}
            t={glide(frame, stampAt[1], fps, 8)}
            text={tx.field}
          />
          <text
            x={960}
            y={170}
            fill={colors.red}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 30) * fadeOut(frame, c0 + 100, 10)}
          >
            {tx.divideByZero}
          </text>
        </svg>
      </AbsoluteFill>

      {/* ℚ(√2): a grid with two directions */}
      <AbsoluteFill style={{ opacity: grid }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }).map((_, i) =>
            Array.from({ length: 4 }).map((_, j) => {
              const a = i - 2;
              const b = j;
              return (
                <circle
                  key={`${i}${j}`}
                  cx={G.x + a * G.s}
                  cy={G.y - b * G.s * Math.SQRT2}
                  r={8}
                  fill={alpha(colors.paper, 0.5)}
                  opacity={fadeIn(frame, c1 + 10 + (i + j) * 2, 8)}
                />
              );
            }),
          )}
          {/* the two directions, in lemon */}
          {[
            { dx: G.s, dy: 0, l: "1", lx: 10, ly: 60 },
            { dx: 0, dy: -G.s * Math.SQRT2, l: "√2", lx: -70, ly: 10 },
          ].map((v) => (
            <g key={v.l}>
              <line
                x1={G.x}
                y1={G.y}
                x2={G.x + v.dx}
                y2={G.y + v.dy}
                stroke={colors.primary}
                strokeWidth={12}
                strokeLinecap="round"
              />
              <circle
                cx={G.x + v.dx}
                cy={G.y + v.dy}
                r={14}
                fill={colors.primary}
              />
              <text
                x={G.x + v.dx + v.lx}
                y={G.y + v.dy + v.ly}
                fill={colors.primary}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {v.l}
              </text>
            </g>
          ))}
          {/* the walk to 3 + 2√2 */}
          <path
            d={`M ${G.x} ${G.y} L ${px} ${G.y} L ${px} ${py}`}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            strokeDasharray="14 10"
            opacity={walk1 > 0 ? 1 : 0}
          />
          <circle
            cx={px}
            cy={py}
            r={20}
            fill={colors.highlight}
            opacity={walk1 > 0 ? 1 : 0}
          />
          <text
            x={px + 36}
            y={py - 20}
            fill={colors.highlight}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 96)}
          >
            3 + 2√2
          </text>
          <g
            opacity={badge}
            transform={`translate(1500 190) rotate(-4) scale(${badge})`}
          >
            <rect
              x={-200}
              y={-62}
              width={400}
              height={116}
              rx={24}
              fill={colors.primary}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <text
              x={0}
              y={20}
              fill={colors.ink}
              fontSize={60}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.degree} 2
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
