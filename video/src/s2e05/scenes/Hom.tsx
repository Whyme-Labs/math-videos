import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Maps form a space. Two 3×2 matrix cards, A and B, slide together and
// their entries add: A + B. Then the six entries become six dials; as the
// dials turn, the image of the plane inside space (drawn in isometric
// view, spanned by T(e₁) and T(e₂)) tilts and stretches. Last, the whole
// picture shrinks to one dot among a cloud of dots: each map is a point.

const A = [
  [1, 0],
  [0, 1],
  [1, 1],
];
const B = [
  [0, 2],
  [1, 0],
  [-1, 0],
];
const C = { x: 1300, y: 520 };
const IS = 125;
const iso = (x: number, y: number, z: number) => ({
  x: C.x + (x - y) * 0.866 * IS,
  y: C.y - z * IS + (x + y) * 0.5 * IS,
});

const Card: React.FC<{
  readonly m: number[][];
  readonly x: number;
  readonly label: string;
  readonly s: number;
}> = ({ m, x, label, s }) => (
  <g opacity={s} transform={`translate(${x} 460) scale(${s})`}>
    <path
      d="M -90 -150 l -22 0 l 0 300 l 22 0 M 90 -150 l 22 0 l 0 300 l -22 0"
      fill="none"
      stroke={colors.text}
      strokeWidth={6}
    />
    {m.map((r, i) =>
      r.map((v, j) => (
        <text
          key={`${i}${j}`}
          x={-45 + j * 90}
          y={-70 + i * 95}
          fill={colors.text}
          fontSize={60}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {v < 0 ? `−${-v}` : v}
        </text>
      )),
    )}
    <text
      y={-190}
      fill={colors.primary}
      fontSize={60}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);

export const Hom: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("hom");
  const [c0, c1] = cues;
  const cardA = Math.min(1, springIn(frame, c0 + 10, fps, 10));
  const cardB = Math.min(1, springIn(frame, c0 + 24, fps, 10));
  const merge = glide(frame, c0 + 60, fps, 24);
  const sumCard = Math.min(1, springIn(frame, c0 + 70, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const turn = ramp(frame, c1 + 20, 30);
  const shrink = glide(frame, c1 + 110, fps, 24);
  const m = A.map((r, i) =>
    r.map(
      (v, j) =>
        v +
        B[i][j] +
        turn * 0.7 * Math.sin((frame - c1) * 0.06 + i * 1.3 + j * 2.1),
    ),
  );
  const t1 = { x: m[0][0], y: m[1][0], z: m[2][0] };
  const t2 = { x: m[0][1], y: m[1][1], z: m[2][1] };
  const at = (a: number, b: number) =>
    iso(a * t1.x + b * t2.x, a * t1.y + b * t2.y, a * t1.z + b * t2.z);

  return (
    <SceneShell id="hom">
      <Sfx name="pop" at={c0 + 10} volume={0.16} />
      <Sfx name="pop" at={c0 + 24} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 60} volume={0.12} />
      <Sfx name="ding" at={c0 + 70} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 14 + k * 5} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 110} volume={0.12} />
      <Sfx name="chime" at={c1 + 130} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Card
            m={A}
            x={lerp(560, 960, merge)}
            label="A"
            s={cardA * (1 - merge)}
          />
          <Card
            m={B}
            x={lerp(1360, 960, merge)}
            label="B"
            s={cardB * (1 - merge)}
          />
          <text
            x={960}
            y={480}
            fill={colors.text}
            fontSize={90}
            textAnchor="middle"
            fontWeight={800}
            opacity={cardB * (1 - merge)}
          >
            +
          </text>
          <Card
            m={A.map((r, i) => r.map((v, j) => v + B[i][j]))}
            x={960}
            label="A + B"
            s={sumCard}
          />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* six dials */}
          {m.map((r, i) =>
            r.map((v, j) => {
              const cx = 360 + j * 200;
              const cy = 260 + i * 200;
              const a = -Math.PI / 2 + v * 0.9;
              return (
                <g key={`${i}${j}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={70}
                    fill={alpha(colors.paper, 0.12)}
                    stroke={colors.orange}
                    strokeWidth={6}
                  />
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + 56 * Math.cos(a)}
                    y2={cy + 56 * Math.sin(a)}
                    stroke={colors.primary}
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <circle cx={cx} cy={cy} r={10} fill={colors.primary} />
                </g>
              );
            }),
          )}
          {/* the picture, shrinking to one point among many */}
          <g
            transform={`translate(${C.x} ${C.y}) scale(${1 - 0.96 * shrink}) translate(${-C.x} ${-C.y})`}
          >
            {[iso(3.4, 0, 0), iso(0, 3.4, 0), iso(0, 0, 3.4)].map((p, k) => (
              <line
                key={k}
                x1={C.x}
                y1={C.y}
                x2={p.x}
                y2={p.y}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={4}
              />
            ))}
            {[-1, 0, 1].map((k) => (
              <g key={k}>
                <line
                  x1={at(k, -1.2).x}
                  y1={at(k, -1.2).y}
                  x2={at(k, 1.2).x}
                  y2={at(k, 1.2).y}
                  stroke={alpha(colors.primary, 0.5)}
                  strokeWidth={3}
                />
                <line
                  x1={at(-1.2, k).x}
                  y1={at(-1.2, k).y}
                  x2={at(1.2, k).x}
                  y2={at(1.2, k).y}
                  stroke={alpha(colors.primary, 0.5)}
                  strokeWidth={3}
                />
              </g>
            ))}
            <Arrow from={C} to={at(1, 0)} width={10} />
            <Arrow from={C} to={at(0, 1)} color={colors.orange} width={10} />
          </g>
          {Array.from({ length: 40 }).map((_, k) => (
            <circle
              key={k}
              cx={C.x + (420 * Math.cos(k * 2.4) * ((k % 7) + 1)) / 7}
              cy={C.y + (260 * Math.sin(k * 2.4) * ((k % 7) + 1)) / 7}
              r={9}
              fill={alpha(colors.primary, 0.5)}
              opacity={fadeIn(frame, c1 + 120 + (k % 10), 8)}
            />
          ))}
          <circle
            cx={C.x}
            cy={C.y}
            r={18}
            fill={colors.primary}
            opacity={shrink}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 1000,
            width: 640,
            textAlign: "center",
            fontSize: 46,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          <div
            style={{
              opacity: fadeIn(frame, c1 + 10),
              translate: riseIn(frame, c1 + 10, 16),
            }}
          >
            {tx.homLabel}
          </div>
          <div
            style={{
              color: colors.orange,
              marginTop: 10,
              opacity: fadeIn(frame, c1 + 60),
              translate: riseIn(frame, c1 + 60, 16),
            }}
          >
            {tx.sixDims}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
