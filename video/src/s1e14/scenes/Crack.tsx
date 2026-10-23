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
import { Bag, Cup, Shoe, Star } from "../components/study";
import { useStrings } from "../i18n";

// The crack. Frege's rule as a machine: a property card goes in the top, a
// bag drops out the bottom. Then the bags line up; none of them is inside
// itself (a bag of cups is not a cup), so each hops into the big bag R.
// Last, R tries to climb into itself: in is wrong, out is wrong, faster and
// faster, until the bag tears in two.

const MACHINE = { x: 960, y: 420 };
const bagX = (k: number) => 300 + k * 230;
const FLOOR = 820;
const ITEMS = [
  (x: number, y: number) => <Cup x={x} y={y} s={0.7} />,
  (x: number, y: number) => <Star x={x} y={y} s={0.8} />,
  (x: number, y: number) => <Shoe x={x} y={y} s={0.7} />,
];

export const Crack: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("crack");
  const [c0, c1, c2] = cues;
  // part 1: cards in, bags out
  const cardAt = (k: number) => c0 + 14 + k * 20;
  const machine = fadeOut(frame, c1, 12);
  // part 2: bags hop into R
  const hopAt = (k: number) => c1 + 40 + k * 14;
  // part 3: R and itself; the flips speed up, then it tears
  const t3 = Math.max(0, frame - c2 - 10);
  const period = Math.max(8, 22 - t3 / 8);
  const flips = t3 / period;
  const inside = Math.floor(flips) % 2 === 0;
  const tearAt = c2 + 100;
  const torn = glide(frame, tearAt, fps, 18);
  const rIn =
    frame < c2 + 10 || frame >= tearAt
      ? 0
      : inside
        ? Math.min(1, (flips % 1) * 2)
        : 1 - Math.min(1, (flips % 1) * 2);
  const push = glide(frame, c2, fps, 30);

  return (
    <SceneShell id="crack">
      {tx.props.map((_, k) => (
        <Sfx key={k} name="clink" at={cardAt(k) + 12} volume={0.16} />
      ))}
      {tx.props.map((_, k) => (
        <Sfx key={`d${k}`} name="thud" at={cardAt(k) + 26} volume={0.18} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`h${k}`} name="pop" at={hopAt(k) + 14} volume={0.16} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <Sfx key={`f${k}`} name="tick" at={c2 + 10 + k * 14} volume={0.14} />
      ))}
      <Sfx name="scratch" at={tearAt} volume={0.4} />
      <Sfx name="thud" at={tearAt + 4} volume={0.45} />

      <Camera
        zoom={lerp(1, 1.25, push)}
        x={lerp(0, 300, push)}
        y={lerp(0, 80, push)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <line
            x1={-400}
            y1={FLOOR}
            x2={2400}
            y2={FLOOR}
            stroke={alpha(colors.muted, 0.6)}
            strokeWidth={4}
          />
          {/* the machine: property in, set out */}
          <g opacity={machine}>
            <path
              d={`M ${MACHINE.x - 200} ${MACHINE.y - 200} L ${MACHINE.x + 200} ${MACHINE.y - 200} L ${MACHINE.x + 110} ${MACHINE.y - 80} L ${MACHINE.x - 110} ${MACHINE.y - 80} Z`}
              fill={colors.violet}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <rect
              x={MACHINE.x - 160}
              y={MACHINE.y - 80}
              width={320}
              height={260}
              rx={20}
              fill={colors.violet}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <circle
              cx={MACHINE.x}
              cy={MACHINE.y + 50}
              r={40}
              fill={colors.primary}
              stroke={colors.ink}
              strokeWidth={5}
              transform={`rotate(${frame * 6} ${MACHINE.x} ${MACHINE.y + 50})`}
            />
            <rect
              x={MACHINE.x - 20}
              y={MACHINE.y + 20}
              width={40}
              height={60}
              fill={colors.ink}
              transform={`rotate(${frame * 6} ${MACHINE.x} ${MACHINE.y + 50})`}
            />
            {tx.props.map((p, k) => {
              const t = glide(frame, cardAt(k), fps, 12);
              const out = glide(frame, cardAt(k) + 16, fps, 12);
              return (
                <g key={p}>
                  {/* the card drops into the funnel */}
                  <g
                    opacity={1 - out}
                    transform={`translate(${lerp(300 + k * 120, MACHINE.x, t)} ${lerp(200, MACHINE.y - 160, t)})`}
                  >
                    <rect
                      x={-120}
                      y={-36}
                      width={240}
                      height={64}
                      rx={10}
                      fill={colors.paper}
                      stroke={colors.ink}
                      strokeWidth={3}
                    />
                    <text
                      x={0}
                      y={8}
                      fill={colors.ink}
                      fontSize={34}
                      textAnchor="middle"
                      fontWeight={700}
                    >
                      {p}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
          {/* the bags it makes: they drop out, then line up */}
          {[0, 1, 2].map((k) => {
            const made = frame >= cardAt(k) + 18;
            if (!made) return null;
            const drop = glide(frame, cardAt(k) + 18, fps, 12);
            const line = glide(frame, c1 + 4, fps, 20);
            const x0 = lerp(MACHINE.x, MACHINE.x + 320 + k * 200, drop);
            const y0 = lerp(MACHINE.y + 180, FLOOR, drop);
            const xl = lerp(x0, bagX(k), line);
            const t = glide(frame, hopAt(k), fps, 14);
            const p = hop(t, xl, FLOOR, 1380 + (k - 1) * 150, FLOOR - 30, 240);
            return (
              <g key={k}>
                <Bag
                  x={p.x}
                  y={frame >= c1 ? p.y : y0}
                  w={170}
                  h={150}
                  s={lerp(1, 0.8, t)}
                  label={k === 0 ? tx.cups : undefined}
                >
                  {ITEMS[k](-30, -24)}
                  {ITEMS[k](30, -24)}
                </Bag>
                {/* not a member of itself */}
                <text
                  x={xl}
                  y={FLOOR - 200}
                  fill={colors.green}
                  fontSize={56}
                  textAnchor="middle"
                  fontWeight={800}
                  opacity={fadeIn(frame, c1 + 20 + k * 6, 6) * (1 - t)}
                >
                  ∉
                </text>
              </g>
            );
          })}
          {/* the big bag R */}
          <g opacity={fadeIn(frame, c1 + 10, 12)}>
            {/* the two halves once it tears */}
            <g
              transform={`translate(${-torn * 260} ${torn * 40}) rotate(${-torn * 18} 1380 ${FLOOR})`}
              clipPath="url(#leftHalf)"
            >
              <Bag
                x={1380}
                y={FLOOR}
                w={560}
                h={420}
                label="R"
                color={colors.violet}
              />
            </g>
            <g
              transform={`translate(${torn * 260} ${torn * 40}) rotate(${torn * 18} 1380 ${FLOOR})`}
              clipPath="url(#rightHalf)"
            >
              <Bag x={1380} y={FLOOR} w={560} h={420} color={colors.violet} />
            </g>
            <defs>
              <clipPath id="leftHalf">
                <path
                  d={`M 0 -200 L 1380 -200 L 1350 400 L 1400 560 L 1360 700 L 1380 1200 L 0 1200 Z`}
                />
              </clipPath>
              <clipPath id="rightHalf">
                <path
                  d={`M 1380 -200 L 2400 -200 L 2400 1200 L 1380 1200 L 1360 700 L 1400 560 L 1350 400 Z`}
                />
              </clipPath>
            </defs>
          </g>
          {/* R, small, trying to get into itself */}
          {frame >= c2 + 6 && frame < tearAt + 4
            ? (() => {
                const p = hop(rIn, 1380, FLOOR - 470, 1380, FLOOR - 60, 120);
                return (
                  <Bag
                    x={
                      p.x +
                      shake(frame, c2 + 10 + Math.floor(flips) * period, 8)
                    }
                    y={p.y}
                    w={560}
                    h={420}
                    s={0.3}
                    label="R"
                    color={colors.highlight}
                  />
                );
              })()
            : null}
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 70,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 66,
          fontWeight: 700,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 10),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.rule}
      </div>
      <div
        style={{
          position: "absolute",
          top: 70,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 76,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, tearAt, 8),
        }}
      >
        R ∈ R ⇔ R ∉ R
      </div>
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 80,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, tearAt + 6, 6),
          scale: lerp(1.4, 1, Math.min(1, springIn(frame, tearAt + 6, fps, 9))),
        }}
      >
        {tx.impossible}
      </div>
    </SceneShell>
  );
};
