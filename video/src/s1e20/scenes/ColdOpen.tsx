import type React from "react";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Desk, DESK_Y, Person, Stack } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Paris, the night of 29 May 1832: Galois at a desk by
// candlelight, a window on the night sky. He writes; sheets pile up. A big
// page fills with "Mon cher ami," and lines of writing; in the margin, in
// red, "Je n'ai pas le temps." The quintic x⁵ = ? hangs over the page. Then
// five dots, the roots, lift off the page and trade places in pairs, while
// the window turns from night to the first grey of dawn.

const WIN = { x: 120, y: 60, w: 360, h: 260 };
const PAGE = { x: 780, y: 110, w: 900, h: 660 };
const SWAPS: [number, number][] = [
  [0, 3],
  [1, 4],
  [2, 0],
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const end = c3 + 150;
  const dawn = ramp(frame, c2, end - c2);
  const page = glide(frame, c0 + 70, fps, 20);
  const writing = ramp(frame, c1 + 30, 140);
  const margin = typed(tx.noTime, frame, c2 + 10, fps, 14);
  const quintic = Math.min(1, springIn(frame, c2 + 80, fps, 10));
  const lift = glide(frame, c3 + 4, fps, 20);
  const swapAt = (k: number) => c3 + 34 + k * 30;

  // five roots on a ring above the page, trading places
  const slot = (i: number) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return { x: 1230 + 170 * Math.cos(a), y: 400 + 170 * Math.sin(a) };
  };
  const slotOf = [0, 1, 2, 3, 4];
  let moving: { a: number; b: number; t: number } | null = null;
  SWAPS.forEach(([a, b], k) => {
    const t = glide(frame, swapAt(k), fps, 16);
    if (t >= 0.999) {
      const ra = slotOf.indexOf(a);
      const rb = slotOf.indexOf(b);
      slotOf[ra] = b;
      slotOf[rb] = a;
    } else if (t > 0) moving = { a, b, t };
  });
  const rootPos = slotOf.map((s) => {
    const m = moving as { a: number; b: number; t: number } | null;
    if (!m || (s !== m.a && s !== m.b)) return slot(s);
    const from = slot(s);
    const to = slot(s === m.a ? m.b : m.a);
    const bow = Math.sin(Math.PI * m.t) * 70 * (s === m.a ? 1 : -1);
    const nx = -(to.y - from.y);
    const ny = to.x - from.x;
    const nl = Math.hypot(nx, ny) || 1;
    return {
      x: lerp(from.x, to.x, m.t) + (nx / nl) * bow,
      y: lerp(from.y, to.y, m.t) + (ny / nl) * bow,
    };
  });
  const rootColors = [
    colors.primary,
    colors.highlight,
    colors.green,
    colors.orange,
    colors.paper,
  ];
  const writingLines = 7;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 70} volume={0.18} />
      <Sfx name="scratch" at={c1 + 30} volume={0.14} />
      <Sfx name="scratch" at={c2 + 10} volume={0.24} />
      <Sfx name="thud" at={c2 + 80} volume={0.3} />
      <Sfx name="riser" at={c3 + 4} volume={0.12} />
      {SWAPS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={swapAt(k)} volume={0.16} />
      ))}

      <Camera zoom={lerp(1, 1.08, ramp(frame, c0, end - c0))} x={60}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the window: night, then the first grey of dawn */}
          <rect
            x={WIN.x}
            y={WIN.y}
            width={WIN.w}
            height={WIN.h}
            rx={10}
            fill={interpolateColors(dawn, [0, 1], ["#1a1440", "#7d72ad"])}
            stroke={colors.wood}
            strokeWidth={14}
          />
          <line
            x1={WIN.x + WIN.w / 2}
            y1={WIN.y}
            x2={WIN.x + WIN.w / 2}
            y2={WIN.y + WIN.h}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <line
            x1={WIN.x}
            y1={WIN.y + WIN.h / 2}
            x2={WIN.x + WIN.w}
            y2={WIN.y + WIN.h / 2}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <circle
            cx={WIN.x + 90}
            cy={WIN.y + 80 + 40 * dawn}
            r={30}
            fill={colors.paper}
            opacity={1 - 0.7 * dawn}
          />
          {/* the desk, the candle, the pile of sheets */}
          <Desk x={100} w={620} />
          <Stack x={560} n={3 + Math.floor(writing * 8)} />
          <rect
            x={190}
            y={DESK_Y - 60}
            width={28}
            height={60}
            rx={4}
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={3}
          />
          <ellipse
            cx={204}
            cy={DESK_Y - 80 + Math.sin(frame / 5) * 2}
            rx={10}
            ry={18}
            fill={colors.primary}
          />
          <Person
            x={380}
            y={860}
            color={colors.highlight}
            size={2.2}
            facing={1}
            bob={frame >= c1 + 30 && frame < c3 ? frame / 6 : 0}
          />
          <text
            x={380}
            y={390}
            fill={colors.highlight}
            fontSize={42}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1 + 30, 8)}
          >
            {tx.galois}
          </text>

          {/* the letter */}
          <g
            opacity={page}
            transform={`translate(${lerp(160, 0, page)} 0) rotate(${lerp(4, 1, page)} ${PAGE.x + PAGE.w / 2} ${PAGE.y + PAGE.h / 2})`}
          >
            <rect
              x={PAGE.x}
              y={PAGE.y}
              width={PAGE.w}
              height={PAGE.h}
              rx={10}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={PAGE.x + 70}
              y={PAGE.y + 100}
              fill={colors.ink}
              fontSize={52}
              fontFamily={fonts.title}
              fontStyle="italic"
            >
              {typed(tx.dear, frame, c1 + 14, fps, 18)}
            </text>
            {/* lines of handwriting, drawn as wavy strokes */}
            {Array.from({ length: writingLines }).map((_, k) => {
              const t = Math.max(0, Math.min(1, writing * writingLines - k));
              const w = (PAGE.w - 260) * t;
              const y = PAGE.y + 170 + k * 62;
              return t > 0 ? (
                <path
                  key={k}
                  d={Array.from({ length: Math.max(2, Math.floor(w / 14)) })
                    .map(
                      (_, i) =>
                        `${i ? "L" : "M"} ${PAGE.x + 70 + i * 14} ${y + Math.sin(i * 1.7 + k) * 7}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke={alpha(colors.ink, 0.75)}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              ) : null;
            })}
            {/* the margin note */}
            <text
              x={PAGE.x + PAGE.w - 40}
              y={PAGE.y + PAGE.h - 70}
              fill={colors.red}
              fontSize={44}
              textAnchor="end"
              fontFamily={fonts.title}
              fontStyle="italic"
              fontWeight={700}
              transform={`rotate(-6 ${PAGE.x + PAGE.w - 40} ${PAGE.y + PAGE.h - 70})`}
            >
              {margin}
            </text>
          </g>

          {/* the question, and the roots that answer it */}
          <g
            opacity={quintic * (1 - lift)}
            transform={`translate(1230 400) scale(${quintic})`}
          >
            <rect
              x={-230}
              y={-80}
              width={460}
              height={140}
              rx={24}
              fill={colors.violet}
              stroke={colors.primary}
              strokeWidth={5}
            />
            <text
              x={0}
              y={30}
              fill={colors.text}
              fontSize={90}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.quintic}
            </text>
          </g>
          {rootPos.map((p, i) => (
            <circle
              key={i}
              cx={lerp(1230, p.x, lift)}
              cy={lerp(400, p.y, lift)}
              r={36 * lift}
              fill={rootColors[i]}
              stroke={colors.ink}
              strokeWidth={5}
            />
          ))}
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 520,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1 + 30, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.paris}
      </div>
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 120,
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c2 + 50) * fadeOut(frame, c3, 10),
          translate: riseIn(frame, c2 + 50, 16),
        }}
      >
        {tx.noTimeGloss}
      </div>
    </SceneShell>
  );
};
