import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// Fewer evens? Two rows of balloons: the whole numbers on top, and the
// evens below, each floating under its own value, so they look half as
// many. Then strings tie n to 2n and the evens drift left until every
// string hangs straight: one partner each. Galileo's 1638 squares, threaded
// to 1, 2, 3, 4 on a parchment, with his verdict stamped across. Then two
// heaps of sweets matched pair by pair, with nothing left over.

const N = 12;
const GAP = 140;
const X0 = 200;
const TOP = 360;
const BOT = 640;

const Balloon: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly color: string;
  readonly opacity?: number;
}> = ({ x, y, label, color, opacity = 1 }) => (
  <g opacity={opacity}>
    <ellipse
      cx={x}
      cy={y}
      rx={50}
      ry={58}
      fill={color}
      stroke={colors.ink}
      strokeWidth={4}
    />
    <path
      d={`M ${x - 8} ${y + 56} L ${x + 8} ${y + 56} L ${x} ${y + 66} Z`}
      fill={color}
    />
    <text
      x={x}
      y={y + 14}
      fill={colors.ink}
      fontSize={42}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={700}
    >
      {label}
    </text>
  </g>
);

export const Matching: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("matching");
  const [c0, c1, c2, c3] = cues;
  const sway = (k: number) => 6 * Math.sin(frame / 14 + k);
  const topIn = (k: number) =>
    Math.min(1, springIn(frame, c0 + 6 + k * 4, fps, 12));
  const botIn = (k: number) =>
    Math.min(1, springIn(frame, c0 + 40 + k * 4, fps, 12));
  const tie = (k: number) => ramp(frame, c1 + 8 + k * 5, 14);
  const slide = glide(frame, c1 + 80, fps, 40);
  const rows = fadeOut(frame, c2, 12);
  // Galileo's parchment
  const parch = glide(frame, c2 + 4, fps, 24) * fadeOut(frame, c3, 12);
  const stamp = springIn(frame, c2 + 80, fps, 9);
  // sweets
  const sweetsIn = fadeIn(frame, c3 + 4);
  const pairAt = (k: number) => c3 + 30 + k * 7;
  const camZoom =
    lerp(1.08, 1, glide(frame, c0, fps, 60)) + 0.04 * ramp(frame, c1 + 80, 90);

  return (
    <SceneShell id="matching">
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="pop" at={c0 + 6 + k * 8} volume={0.14} />
      ))}
      <Sfx name="tick" at={c0 + 60} volume={0.2} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx
          key={`t${k}`}
          name={PLUCKS[k]}
          at={c1 + 22 + k * 10}
          volume={0.18}
        />
      ))}
      <Sfx name="whoosh" at={c1 + 80} volume={0.16} />
      <Sfx name="chime" at={c1 + 120} />
      <Sfx name="page" at={c2 + 4} />
      <Sfx name="thud" at={c2 + 80} volume={0.35} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`s${k}`} name="clink" at={pairAt(k) + 10} volume={0.14} />
      ))}
      <Sfx name="sparkle" at={pairAt(8) + 16} />
      <QuestionTray />

      <Camera zoom={camZoom} x={0} y={0}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <g opacity={rows}>
            {/* strings from n to 2n */}
            {Array.from({ length: N }).map((_, k) => {
              const ex = lerp(X0 + 2 * k * GAP, X0 + k * GAP, slide);
              const t = tie(k);
              return (
                <line
                  key={`s${k}`}
                  x1={X0 + k * GAP + sway(k)}
                  y1={TOP + 66}
                  x2={lerp(X0 + k * GAP, ex + sway(k + 3), t)}
                  y2={lerp(TOP + 66, BOT - 58, t)}
                  stroke={colors.paper}
                  strokeWidth={3}
                  opacity={t > 0 ? 1 : 0}
                />
              );
            })}
            {Array.from({ length: N }).map((_, k) => (
              <g
                key={`t${k}`}
                transform={`translate(0 ${(1 - topIn(k)) * -300})`}
              >
                <Balloon
                  x={X0 + k * GAP + sway(k)}
                  y={TOP}
                  label={String(k)}
                  color={guestColor(k)}
                />
              </g>
            ))}
            {Array.from({ length: N }).map((_, k) => {
              const x =
                lerp(X0 + 2 * k * GAP, X0 + k * GAP, slide) + sway(k + 3);
              return (
                <g
                  key={`b${k}`}
                  transform={`translate(0 ${(1 - botIn(k)) * 300})`}
                >
                  <Balloon
                    x={x}
                    y={BOT}
                    label={String(2 * k)}
                    color={guestColor(k)}
                  />
                </g>
              );
            })}
            <text x={X0 - 70} y={TOP - 100} fill={colors.muted} fontSize={38}>
              {tx.naturals}
            </text>
            <text x={X0 - 70} y={BOT + 130} fill={colors.muted} fontSize={38}>
              {tx.evens}
            </text>
            <text
              x={1500}
              y={BOT + 140}
              fill={colors.highlight}
              fontSize={56}
              fontFamily={fonts.title}
              textAnchor="middle"
              opacity={fadeIn(frame, c0 + 60) * (1 - slide)}
              transform={`translate(${shake(frame, c1 + 80, 12)} 0)`}
            >
              {tx.half}
            </text>
            <text
              x={960}
              y={BOT + 160}
              fill={colors.green}
              fontSize={64}
              fontFamily={fonts.title}
              textAnchor="middle"
              opacity={fadeIn(frame, c1 + 120)}
            >
              {tx.sameSize}
            </text>
          </g>
        </svg>
      </Camera>

      {/* Galileo's parchment, 1638 */}
      <AbsoluteFill style={{ opacity: parch }}>
        <div
          style={{
            position: "absolute",
            left: 360,
            top: lerp(1100, 170, parch),
            width: 1200,
            height: 640,
            borderRadius: 26,
            backgroundColor: colors.paper,
            rotate: `${-2 + Math.sin(frame / 30)}deg`,
            boxShadow: `0 30px 80px ${alpha(colors.bg, 0.7)}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 50,
              top: 30,
              fontFamily: fonts.title,
              fontSize: 44,
              color: colors.ink,
            }}
          >
            {tx.galileo}
          </div>
          <svg width={1200} height={640} style={{ position: "absolute" }}>
            {[1, 2, 3, 4, 5].map((n, k) => {
              const t = ramp(frame, c2 + 30 + k * 8, 12);
              return (
                <g key={n}>
                  <text
                    x={170 + k * 210}
                    y={210}
                    fill={colors.ink}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {n}
                  </text>
                  <line
                    x1={170 + k * 210}
                    y1={230}
                    x2={170 + k * 210}
                    y2={lerp(230, 330, t)}
                    stroke={colors.red}
                    strokeWidth={4}
                  />
                  <text
                    x={170 + k * 210}
                    y={400}
                    fill={colors.ink}
                    fontSize={64}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={t}
                  >
                    {n * n}
                  </text>
                </g>
              );
            })}
            <text
              x={1100}
              y={400}
              fill={alpha(colors.ink, 0.7)}
              fontSize={36}
              textAnchor="end"
            >
              {tx.squares}
            </text>
          </svg>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              top: 470,
              textAlign: "center",
              fontSize: 40,
              fontWeight: 700,
              color: colors.red,
              padding: "14px 0",
              border: `5px solid ${colors.red}`,
              borderLeft: "none",
              borderRight: "none",
              opacity: Math.min(1, stamp),
              scale: lerp(1.6, 1, Math.min(1, stamp)),
              rotate: "-3deg",
            }}
          >
            {tx.galileoVerdict}
          </div>
        </div>
      </AbsoluteFill>

      {/* two heaps of sweets, matched pair by pair */}
      <AbsoluteFill style={{ opacity: sweetsIn }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {Array.from({ length: 9 }).map((_, k) => {
            const ax = 520 + ((k * 73) % 160) - 80 + (k % 3) * 60;
            const ay = 340 + Math.floor(k / 3) * 110 + ((k * 37) % 40);
            const bx = 1300 + ((k * 59) % 160) - 80 + (k % 3) * 60;
            const by = 360 + Math.floor(k / 3) * 110 + ((k * 23) % 40);
            const t = ramp(frame, pairAt(k), 12);
            const tk = glide(frame, pairAt(k) + 10, fps, 14);
            const ta = { x: 760 + (k % 3) * 0 - 60, y: 280 + k * 62 };
            const tb = { x: 1160, y: 280 + k * 62 };
            const a = hop(tk, ax, ay, ta.x, ta.y, 40);
            const b = hop(tk, bx, by, tb.x, tb.y, 40);
            return (
              <g key={k}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={lerp(a.x, b.x, t)}
                  y2={lerp(a.y, b.y, t)}
                  stroke={colors.paper}
                  strokeWidth={4}
                  opacity={t > 0 ? 0.8 : 0}
                />
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={26}
                  fill={guestColor(k)}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <rect
                  x={b.x - 26}
                  y={b.y - 26}
                  width={52}
                  height={52}
                  rx={12}
                  fill={guestColor(k + 2)}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
              </g>
            );
          })}
          <text
            x={960}
            y={900}
            fill={colors.green}
            fontSize={60}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, pairAt(8) + 16)}
          >
            {tx.sameSize}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
