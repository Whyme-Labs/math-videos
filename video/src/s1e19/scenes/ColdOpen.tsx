import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Desk, DESK_Y, Person, Stack } from "../../s1e14/components/study";
import { arcPath, Compass, Straightedge } from "../components/tools";
import { useStrings } from "../i18n";

// The story. Paris, 1837: Wantzel at a desk by candlelight, a sheet of
// parchment beside him with a 60° angle on it. A compass halves the angle
// in three strokes and a straightedge rules the bisector. Then the thirds:
// trial rays land near the right place, never on it, each crossed out,
// while a counter runs the years from 400 BCE to 1837. Wantzel writes; the
// camera pushes in on him as the word "field" lights up over the desk.

const V = { x: 860, y: 660 }; // the angle's vertex
const RAY = 820;
const R1 = 280; // the first arc
// the bisecting arcs: centred where arc 1 meets the rays, meeting at P
const A = { x: V.x + R1, y: V.y };
const B = {
  x: V.x + R1 * Math.cos(Math.PI / 3),
  y: V.y - R1 * Math.sin(Math.PI / 3),
};
const P = {
  x: V.x + 2 * R1 * Math.cos(Math.PI / 6) * Math.cos(Math.PI / 6),
  y: V.y - 2 * R1 * Math.cos(Math.PI / 6) * Math.sin(Math.PI / 6),
};
const deg = (from: { x: number; y: number }, to: { x: number; y: number }) =>
  (Math.atan2(from.y - to.y, to.x - from.x) * 180) / Math.PI;
const ray = (d: number, len = RAY) => ({
  x: V.x + len * Math.cos((d * Math.PI) / 180),
  y: V.y - len * Math.sin((d * Math.PI) / 180),
});
// trial thirds: near 20°, never on it
const TRIES = [17.2, 22.4, 19.1];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;

  const sheet = glide(frame, c0 + 10, fps, 20);
  const rays = glide(frame, c0 + 50, fps, 60);
  const arc1 = glide(frame, c1 + 10, fps, 26);
  const arc2 = glide(frame, c1 + 50, fps, 18);
  const arc3 = glide(frame, c1 + 76, fps, 18);
  const rule = glide(frame, c1 + 104, fps, 18);
  const half = Math.min(1, springIn(frame, c1 + 126, fps, 10));
  const tryAt = (k: number) => c2 + 16 + k * 36;
  const yearsLen = Math.max(60, c3 - c2 - 50);
  const years = Math.round(lerp(-400, 1837, ramp(frame, c2 + 6, yearsLen)));
  const push = glide(frame, c3 + 4, fps, 30);
  const field = Math.min(1, springIn(frame, c3 + 30, fps, 10));
  // compass position: arc 1, then arcs 2 and 3, then it lifts away
  const compass =
    frame < c1 + 46
      ? { cx: V.x, cy: V.y, r: R1, deg: 60 * arc1 }
      : frame < c1 + 72
        ? { cx: A.x, cy: A.y, r: R1, deg: deg(A, P) - 18 + 36 * arc2 }
        : { cx: B.x, cy: B.y, r: R1, deg: deg(B, P) + 18 - 36 * arc3 };
  const compassOn = fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c1 + 98, 8);
  const pRay = ray(30);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.18} />
      <Sfx name="scratch" at={c0 + 40} volume={0.16} />
      <Sfx name="scratch" at={c1 + 10} volume={0.2} />
      <Sfx name="scratch" at={c1 + 50} volume={0.18} />
      <Sfx name="scratch" at={c1 + 76} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 104} volume={0.12} />
      <Sfx name="ding" at={c1 + 126} />
      {TRIES.map((_, k) => (
        <Sfx key={k} name="thud" at={tryAt(k) + 20} volume={0.22} />
      ))}
      <Sfx name="whoosh" at={c3 + 4} volume={0.14} />
      <Sfx name="sparkle" at={c3 + 30} />

      <Camera
        zoom={lerp(1, 1.06, ramp(frame, c0, c3 - c0)) * lerp(1, 1.18, push)}
        x={lerp(0, -480, push)}
        y={lerp(0, 60, push)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the desk, the candle, the papers */}
          <Desk x={120} w={560} />
          <Stack x={250} n={5 + Math.floor(ramp(frame, c2, yearsLen) * 6)} />
          <rect
            x={560}
            y={DESK_Y - 70}
            width={30}
            height={70}
            rx={4}
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={3}
          />
          <ellipse
            cx={575}
            cy={DESK_Y - 92 + Math.sin(frame / 5) * 2}
            rx={11}
            ry={20}
            fill={colors.primary}
          />
          <Person
            x={420}
            y={860}
            color={colors.green}
            size={2.2}
            facing={1}
            bob={frame >= c3 ? frame / 8 : 0}
          />
          <text
            x={420}
            y={330}
            fill={colors.green}
            fontSize={42}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.wantzel}
          </text>

          {/* the parchment */}
          <g opacity={sheet} transform={`translate(${lerp(200, 0, sheet)} 0)`}>
            <rect
              x={740}
              y={110}
              width={1060}
              height={700}
              rx={14}
              fill={alpha(colors.paper, 0.94)}
              stroke={colors.wood}
              strokeWidth={8}
            />
            {/* the 60° angle */}
            {[0, 60].map((d) => {
              const e = ray(d, (d ? 600 : RAY) * rays);
              return (
                <line
                  key={d}
                  x1={V.x}
                  y1={V.y}
                  x2={e.x}
                  y2={e.y}
                  stroke={colors.ink}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
              );
            })}
            <path
              d={arcPath(V.x, V.y, 90, 0, 60, rays)}
              fill="none"
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={V.x + 120}
              y={V.y - 26}
              fill={colors.ink}
              fontSize={40}
              fontFamily={fonts.math}
              fontWeight={700}
              opacity={rays * fadeOut(frame, c1, 8)}
            >
              60°
            </text>
            {/* halving it: three arcs, then the ruled line */}
            <path
              d={arcPath(V.x, V.y, R1, -6, 66, arc1)}
              fill="none"
              stroke={colors.violet}
              strokeWidth={5}
              opacity={arc1 > 0 ? 1 : 0}
            />
            <path
              d={arcPath(A.x, A.y, R1, deg(A, P) - 18, deg(A, P) + 18, arc2)}
              fill="none"
              stroke={colors.violet}
              strokeWidth={5}
              opacity={arc2 > 0 ? 1 : 0}
            />
            <path
              d={arcPath(B.x, B.y, R1, deg(B, P) + 18, deg(B, P) - 18, arc3)}
              fill="none"
              stroke={colors.violet}
              strokeWidth={5}
              opacity={arc3 > 0 ? 1 : 0}
            />
            <line
              x1={V.x}
              y1={V.y}
              x2={lerp(V.x, pRay.x, rule)}
              y2={lerp(V.y, pRay.y, rule)}
              stroke={colors.green}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <Straightedge
              x1={V.x}
              y1={V.y}
              x2={pRay.x}
              y2={pRay.y}
              opacity={fadeIn(frame, c1 + 98, 6) * fadeOut(frame, c1 + 126, 8)}
            />
            <Compass {...compass} opacity={compassOn} />
            <g
              opacity={half * fadeOut(frame, c2, 10)}
              transform={`translate(${pRay.x - 40} ${pRay.y + 40}) scale(${half})`}
            >
              <text
                x={0}
                y={0}
                fill={colors.green}
                fontSize={84}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {tx.half}
              </text>
            </g>
            {/* thirds: near misses */}
            {TRIES.map((d, k) => {
              const t = glide(frame, tryAt(k), fps, 18);
              const e = ray(d, 700 * t);
              const miss = frame >= tryAt(k) + 20;
              return (
                <g key={k}>
                  <line
                    x1={V.x}
                    y1={V.y}
                    x2={e.x}
                    y2={e.y}
                    stroke={colors.orange}
                    strokeWidth={5}
                    strokeDasharray="16 10"
                    opacity={
                      t > 0 ? 1 - 0.6 * ramp(frame, tryAt(k) + 26, 10) : 0
                    }
                  />
                  <text
                    x={ray(d, 740).x}
                    y={ray(d, 740).y + 16}
                    fill={colors.red}
                    fontSize={54}
                    textAnchor="middle"
                    fontWeight={900}
                    opacity={miss ? fadeIn(frame, tryAt(k) + 20, 4) : 0}
                    transform={`translate(${miss ? shake(frame, tryAt(k) + 20, 8) : 0} 0)`}
                  >
                    ✗
                  </text>
                </g>
              );
            })}
            <text
              x={ray(40, 560).x}
              y={ray(40, 560).y}
              fill={colors.orange}
              fontSize={80}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, c2 + 8)}
            >
              {tx.third}
            </text>
          </g>

          {/* the word that settles it */}
          <g
            opacity={field}
            transform={`translate(420 ${lerp(300, 270, field)}) scale(${field})`}
          >
            <text
              x={0}
              y={0}
              fill={colors.primary}
              fontSize={120}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.field}
            </text>
          </g>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.paris}
      </div>
      {/* the years running past */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 120,
          fontFamily: fonts.mono,
          fontSize: 64,
          fontWeight: 800,
          color: years >= 1837 ? colors.primary : colors.text,
          opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c3, 10),
        }}
      >
        {tx.year(years)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 120,
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 6 + yearsLen) * fadeOut(frame, c3, 10),
          translate: riseIn(frame, c2 + 6 + yearsLen, 16),
        }}
      >
        {tx.noMethod}
      </div>
    </SceneShell>
  );
};
