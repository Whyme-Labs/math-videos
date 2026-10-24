import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  shake,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../../s1e11/components/hotel";
import { Desk, DESK_Y, Person } from "../../s1e14/components/study";
import { Card, Rulebook } from "../components/world";
import { useStrings } from "../i18n";

// The story. Königsberg, 7 September 1930: a round table, people talking.
// The quiet young man at the end stands up. A thought bubble opens over the
// table: the rulebook of axioms with arrows reaching out to the statements
// it proves, and one statement, marked true, that no arrow reaches. Nobody
// turns; only von Neumann walks over. Next day: Hilbert at a podium, his
// words typed out in German. A crack runs through "we will know", and the
// unreachable statement drifts back in.

const SEATS = [460, 660, 860, 1060, 1260];
const GODEL = 1440;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  const stand = glide(frame, c0 + 50, fps, 14);
  const bubble =
    Math.min(1, springIn(frame, c1 + 4, fps, 12)) * fadeOut(frame, c2 + 10, 10);
  const rays = (k: number) => glide(frame, c1 + 24 + k * 8, fps, 10);
  const walk = glide(frame, c2 + 20, fps, 40);
  const day1 = fadeOut(frame, c3, 10);
  const quote = typed(tx.hilbertQuote, frame, c3 + 16, fps, 26);
  const crack = glide(frame, c4 + 10, fps, 16);
  const star = glide(frame, c4 + 30, fps, 24);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 50} volume={0.16} />
      <Sfx name="pop" at={c1 + 4} volume={0.2} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={k} name="tick" at={c1 + 24 + k * 8} volume={0.12} />
      ))}
      <Sfx name="sparkle" at={c1 + 64} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c3} volume={0.16} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`q${k}`} name="tick" at={c3 + 16 + k * 6} volume={0.1} />
      ))}
      <Sfx name="scratch" at={c4 + 10} volume={0.35} />
      <Sfx name="chime" at={c4 + 40} />

      {/* day one: the round table */}
      <AbsoluteFill style={{ opacity: day1 }}>
        <Camera
          zoom={lerp(1, 1.12, glide(frame, c0, fps, 90))}
          x={lerp(0, 120, glide(frame, c0, fps, 90))}
          y={0}
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
            {SEATS.map((x, k) => (
              <Person
                key={x}
                x={x}
                y={DESK_Y + 60}
                color={guestColor(k + 2)}
                size={1.3}
                bob={frame / 14 + k}
                facing={k < 2 ? 1 : -1}
              />
            ))}
            {/* von Neumann walks over */}
            <Person
              x={lerp(SEATS[2], GODEL - 170, walk)}
              y={DESK_Y + 60 - 30 * walk}
              color={colors.green}
              size={1.3}
              bob={walk > 0 && walk < 1 ? frame / 3 : frame / 14 + 2}
              facing={1}
              opacity={frame >= c2 ? 1 : 0}
            />
            <Person
              x={GODEL}
              y={DESK_Y + 60 - 90 * stand}
              color={colors.highlight}
              size={1.35}
              glasses
              facing={-1}
            />
            <Desk x={340} w={1300} />
            <text
              x={GODEL}
              y={DESK_Y - 300 - 90 * stand}
              fill={colors.highlight}
              fontSize={36}
              textAnchor="middle"
              fontWeight={700}
              opacity={fadeIn(frame, c0 + 56) * fadeOut(frame, c1, 8)}
            >
              {tx.godelName}
            </text>
            <text
              x={lerp(SEATS[2], GODEL - 170, walk)}
              y={DESK_Y - 220}
              fill={colors.green}
              fontSize={34}
              textAnchor="middle"
              fontWeight={700}
              opacity={fadeIn(frame, c2 + 40)}
            >
              {tx.vonNeumann}
            </text>
            {/* the thought: axioms reach many statements, but not this one */}
            <g
              opacity={bubble}
              transform={`translate(860 300) scale(${bubble})`}
            >
              <ellipse
                cx={0}
                cy={0}
                rx={560}
                ry={230}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={6}
              />
              <circle
                cx={420}
                cy={250}
                r={26}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <circle
                cx={500}
                cy={300}
                r={14}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <Rulebook x={-300} y={60} pages={4} title={tx.axioms} s={0.9} />
              {[
                [-60, -120],
                [40, -10],
                [-30, 110],
                [120, 120],
              ].map(([x, y], k) => (
                <g key={k} opacity={rays(k)}>
                  <line
                    x1={-190}
                    y1={0}
                    x2={lerp(-190, x - 40, rays(k))}
                    y2={lerp(0, y, rays(k))}
                    stroke={colors.violet}
                    strokeWidth={5}
                  />
                  <Card
                    x={x + 40}
                    y={y}
                    text="✓"
                    w={80}
                    s={0.8}
                    color={alpha(colors.green, 0.5)}
                  />
                </g>
              ))}
              <g opacity={fadeIn(frame, c1 + 64)}>
                <Card
                  x={360}
                  y={-40}
                  text={tx.trueLabel}
                  w={150}
                  glow={1}
                  color={colors.highlight}
                />
                <text
                  x={360}
                  y={50}
                  fill={colors.red}
                  fontSize={32}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {tx.unprovable}
                </text>
              </g>
            </g>
          </svg>
        </Camera>
      </AbsoluteFill>

      {/* day two: Hilbert's speech */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 2, 10) }}>
        <Camera zoom={lerp(1.1, 1, glide(frame, c3, fps, 40))} x={0} y={0}>
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
            <Person
              x={420}
              y={760}
              color={colors.orange}
              size={2}
              beard
              glasses
              facing={1}
              bob={frame / 18}
            />
            {/* podium and microphone */}
            <path
              d="M 300 700 L 560 700 L 530 900 L 330 900 Z"
              fill={colors.wood}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <line
              x1={540}
              y1={700}
              x2={600}
              y2={520}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <rect
              x={586}
              y={480}
              width={30}
              height={56}
              rx={14}
              fill={colors.muted}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={430}
              y={260}
              fill={colors.orange}
              fontSize={44}
              textAnchor="middle"
              fontWeight={800}
              opacity={fadeIn(frame, c3 + 8)}
            >
              {tx.hilbert}
            </text>
            {/* the unreachable statement comes back */}
            <g
              opacity={star}
              transform={`translate(${lerp(2100, 1500, star)} 700)`}
            >
              <Card
                x={0}
                y={0}
                text={tx.trueLabel}
                w={150}
                glow={1}
                color={colors.highlight}
              />
              <text
                x={0}
                y={90}
                fill={colors.red}
                fontSize={34}
                textAnchor="middle"
                fontWeight={800}
              >
                {tx.unprovable}
              </text>
            </g>
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 330,
            left: 700,
            right: 100,
            fontFamily: fonts.title,
            fontSize: 70,
            fontWeight: 800,
            color: colors.text,
            translate: `${frame >= c4 + 10 ? shake(frame, c4 + 10, 12) : 0}px 0`,
          }}
        >
          {quote}
          <div
            style={{
              fontSize: 40,
              fontWeight: 400,
              color: colors.muted,
              marginTop: 16,
              opacity: fadeIn(frame, c3 + 60),
            }}
          >
            {tx.hilbertTr}
          </div>
          {/* a crack runs through it */}
          <svg
            width={1120}
            height={200}
            style={{
              position: "absolute",
              left: 0,
              top: -20,
              overflow: "visible",
            }}
          >
            <path
              d="M 0 90 L 160 60 L 260 120 L 420 70 L 560 130 L 700 60 L 860 110 L 1000 70 L 1120 100"
              fill="none"
              stroke={colors.red}
              strokeWidth={8}
              strokeLinejoin="round"
              strokeDasharray={1300}
              strokeDashoffset={1300 * (1 - crack)}
            />
          </svg>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 10),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.konigsberg}
      </div>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c3 + 6) * fadeOut(frame, c4, 10),
          translate: riseIn(frame, c3 + 6, 16),
        }}
      >
        {tx.nextDay}
      </div>
    </SceneShell>
  );
};
