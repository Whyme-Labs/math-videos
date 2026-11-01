import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";

// Angles, then the cold open's 30° computed. Part 1: v fixed, u turning
// all the way round; a dial on the right shows overlap ÷ (length × length),
// its needle never leaving [−1, 1]; then the arc between u and v lights up
// with θ, the needle reading cos θ. Part 2: three small graphs on [0, 1]
// whose shaded areas are the three numbers we need, ⟨1, x⟩ = ½,
// ⟨1, 1⟩ = 1, ⟨x, x⟩ = ⅓; below them the angle works itself out,
// cos θ = ½ ÷ √(1 · ⅓) = √3/2, θ = 30°; and two arrows named 1 and x
// open to exactly 30°.

const O = { x: 640, y: 520 };
const S = 210;
// built at render time: the palette depends on the season
const panels = () => [
  { at: 2, f: (x: number) => x, label: "⟨1, x⟩ = ½", color: colors.green },
  { at: 3, f: () => 1, label: "⟨1, 1⟩ = 1", color: colors.primary },
  {
    at: 3,
    f: (x: number) => x * x,
    label: "⟨x, x⟩ = ⅓",
    color: colors.highlight,
  },
];

export const Angle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("angle");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const th = 0.5 + Math.max(0, frame - c0 - 10) * 0.035;
  const u = { x: Math.cos(th), y: Math.sin(th) };
  const v = { x: 1, y: 0 };
  const cos = u.x * v.x + u.y * v.y;
  const theta = Math.acos(cos);
  const arc = fadeIn(frame, c1 + 6, 10);
  const open = glide(frame, c4 + 4, fps, 30);
  const steps: Tok[][] = [
    [
      { id: "c", t: "cos θ" },
      { id: "e", t: " = " },
      { id: "n", t: "½" },
      { id: "d", t: " ÷ √(1 · ⅓)" },
    ],
    [
      { id: "c", t: "cos θ" },
      { id: "e", t: " = " },
      { id: "n", t: "√3/2", color: colors.green },
    ],
    [
      { id: "c", t: "θ" },
      { id: "e", t: " = " },
      { id: "n", t: "30°", color: colors.green },
    ],
  ];

  return (
    <SceneShell id="angle">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pop" at={c2 + 14} volume={0.12} />
      <Sfx name="pop" at={c3 + 10} volume={0.12} />
      <Sfx name="pop" at={c3 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 70} volume={0.1} />
      <Sfx name="chime" at={c4 + 30} volume={0.35} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={O.x}
            cy={O.y}
            r={S}
            fill="none"
            stroke={alpha(colors.paper, 0.2)}
            strokeWidth={3}
            strokeDasharray="8 10"
          />
          <Arrow from={O} to={{ x: O.x + v.x * S * 1.3, y: O.y }} width={14} />
          <Arrow
            from={O}
            to={{ x: O.x + u.x * S, y: O.y - u.y * S }}
            width={14}
            color={colors.highlight}
          />
          <path
            d={`M ${O.x + 80} ${O.y} A 80 80 0 0 ${u.y >= 0 ? 0 : 1} ${O.x + 80 * u.x} ${O.y - 80 * u.y}`}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            opacity={arc}
          />
          <text
            x={O.x - 30}
            y={O.y + 300}
            fill={colors.orange}
            fontSize={56}
            fontFamily={fonts.mono}
            fontWeight={800}
            opacity={arc}
          >
            θ = {Math.round((theta * 180) / Math.PI)}°
          </text>
          {/* the dial: −1 … 1 */}
          <g transform="translate(1440 520)" opacity={fadeIn(frame, c0 + 10)}>
            <path
              d="M -220 0 A 220 220 0 0 1 220 0"
              fill="none"
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={10}
            />
            <path
              d="M -280 0 L -228 0 M 228 0 L 280 0"
              stroke={colors.red}
              strokeWidth={10}
            />
            {[-1, 0, 1].map((k) => (
              <text
                key={k}
                x={k * 220}
                y={56}
                fill={colors.muted}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.mono}
              >
                {k < 0 ? "−1" : k}
              </text>
            ))}
            <line
              x1={0}
              y1={0}
              x2={200 * cos}
              y2={-200 * Math.sqrt(Math.max(0, 1 - cos * cos))}
              stroke={colors.green}
              strokeWidth={12}
              strokeLinecap="round"
            />
            <circle r={16} fill={colors.green} />
            <text
              y={-260}
              fill={colors.green}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {arc > 0.5 ? "cos θ" : "⟨u, v⟩ ÷ ‖u‖‖v‖"}
            </text>
            <text
              y={130}
              fill={colors.text}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {cos.toFixed(2).replace("-", "−")}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {panels().map((pnl, k) => {
            const at = [c0, c1, c2, c3][pnl.at] + 10 + (k === 2 ? 10 : 0);
            const x0 = 220 + k * 520;
            const y0 = 400;
            const W = 360;
            const H = 200;
            const fill = glide(frame, at, fps, 30);
            const pts = Array.from({ length: 31 }, (_, i) => {
              const x = (i / 30) * fill;
              return `L ${x0 + x * W} ${y0 - pnl.f(x) * H}`;
            }).join(" ");
            const line = Array.from({ length: 31 }, (_, i) => {
              const x = i / 30;
              return `${i ? "L" : "M"} ${x0 + x * W} ${y0 - pnl.f(x) * H}`;
            }).join(" ");
            return (
              <g key={k} opacity={fadeIn(frame, at - 6)}>
                <path
                  d={`M ${x0} ${y0} ${pts} L ${x0 + fill * W} ${y0} Z`}
                  fill={alpha(pnl.color, 0.45)}
                />
                <path d={line} fill="none" stroke={pnl.color} strokeWidth={6} />
                <line
                  x1={x0 - 10}
                  y1={y0}
                  x2={x0 + W + 20}
                  y2={y0}
                  stroke={alpha(colors.paper, 0.5)}
                  strokeWidth={3}
                />
                <line
                  x1={x0}
                  y1={y0 + 10}
                  x2={x0}
                  y2={y0 - H - 30}
                  stroke={alpha(colors.paper, 0.35)}
                  strokeWidth={3}
                />
                <text
                  x={x0 + W / 2}
                  y={y0 + 70}
                  fill={pnl.color}
                  fontSize={46}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {pnl.label}
                </text>
              </g>
            );
          })}
          {/* the two arrows opening to 30° */}
          <g opacity={fadeIn(frame, c4 + 4)}>
            <Arrow
              from={{ x: 1300, y: 760 }}
              to={{ x: 1600, y: 760 }}
              width={14}
            />
            <Arrow
              from={{ x: 1300, y: 760 }}
              to={{
                x: 1300 + 300 * Math.cos(lerp(0, Math.PI / 6, open)),
                y: 760 - 300 * Math.sin(lerp(0, Math.PI / 6, open)),
              }}
              width={14}
              color={colors.highlight}
            />
            <text
              x={1620}
              y={775}
              fill={colors.primary}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              1
            </text>
            <text
              x={1570}
              y={590}
              fill={colors.highlight}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              x
            </text>
          </g>
        </svg>
        <Eq
          steps={steps}
          at={[c3 + 70, c4 - 10, c4 + 30]}
          x={700}
          y={560}
          size={70}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c2 + 6),
          translate: riseIn(frame, c2 + 6, 12),
        }}
      >
        [0, 1]
      </div>
    </SceneShell>
  );
};
