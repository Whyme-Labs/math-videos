import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Two blobs try to overlap. A shared x links a to b, so they were one blob.
// Then the general picture: blobs cut a set into pieces (a partition).

const Y = 450;
const RX = 230;
const RY = 170;

const CUTS = [
  [780, 200, 720, 700],
  [1180, 200, 1240, 700],
  [750, 450, 1210, 450],
  [1196, 330, 1560, 330],
];
const PIECES = [
  "360,200 780,200 720,700 360,700",
  "780,200 1180,200 1210,450 750,450",
  "750,450 1210,450 1240,700 720,700",
  "1180,200 1560,200 1560,330 1196,330",
  "1196,330 1560,330 1560,700 1240,700",
];
const PIECE_COLORS = [
  colors.primary,
  colors.orange,
  colors.highlight,
  colors.highlight,
  colors.primary,
];
const DOTS = [
  [480, 300],
  [560, 520],
  [450, 620],
  [620, 380],
  [900, 300],
  [1050, 360],
  [980, 250],
  [880, 560],
  [1060, 620],
  [960, 520],
  [1350, 260],
  [1480, 280],
  [1330, 480],
  [1450, 600],
  [1400, 420],
];

export const Partition: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("partition");
  const [c0, c1, c2] = cues;
  const close = glide(frame, c0 + 30, fps, 24);
  const merge = glide(frame, c1 + 52, fps, 20);
  const ax = lerp(lerp(620, 830, close), 960, merge);
  const bx = lerp(lerp(1300, 1090, close), 960, merge);
  const a = { x: ax - 140, y: Y - 20 };
  const b = { x: bx + 140, y: Y + 20 };
  const x = { x: 960, y: Y };
  const blobsOut = fadeOut(frame, c2, 12);

  const arrow = (
    p: { x: number; y: number },
    q: { x: number; y: number },
    lift: number,
    t: number,
    color: string,
  ) => (
    <path
      d={`M ${p.x} ${p.y - 22} Q ${(p.x + q.x) / 2} ${(p.y + q.y) / 2 - lift} ${q.x} ${q.y - 22}`}
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="1 1"
      strokeDashoffset={1 - t}
    />
  );

  return (
    <SceneShell id="partition">
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 10} volume={0.3} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.14} />
      <Sfx name="pop" at={c0 + 56} />
      <Sfx name="tick" at={c1 + 16} />
      <Sfx name="tick" at={c1 + 28} />
      <Sfx name="scratch" at={c1 + 34} volume={0.22} />
      <Sfx name="ding" at={c1 + 68} />
      {CUTS.map((_, i) => (
        <Sfx key={i} name="scratch" at={c2 + 10 + i * 8} volume={0.18} />
      ))}
      <Sfx name="sparkle" at={c2 + 54} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={blobsOut}>
            {[
              { cx: ax, s: springIn(frame, c0 + 4, fps, 11), name: "a" },
              { cx: bx, s: springIn(frame, c0 + 10, fps, 11), name: "b" },
            ].map((e) => (
              <ellipse
                key={e.name}
                cx={e.cx}
                cy={Y}
                rx={RX * Math.min(1, e.s)}
                ry={RY * Math.min(1, e.s)}
                fill={alpha(colors.primary, merge > 0.95 ? 0.14 : 0.08)}
                stroke={colors.primary}
                strokeWidth={3}
              />
            ))}
            {[
              { p: a, n: "a", at: c0 + 8 },
              { p: b, n: "b", at: c0 + 14 },
              { p: x, n: "x", at: c0 + 56 },
            ].map(({ p, n, at }) => (
              <g key={n} opacity={fadeIn(frame, at)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={14}
                  fill={n === "x" ? colors.highlight : colors.primary}
                />
                <text
                  x={p.x}
                  y={p.y + 54}
                  fill={n === "x" ? colors.highlight : colors.text}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {n}
                </text>
              </g>
            ))}
            <text
              x={x.x}
              y={Y - 200}
              fill={colors.highlight}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.title}
              opacity={fadeIn(frame, c0 + 60) * fadeOut(frame, c1, 10)}
            >
              ?
            </text>
            <g opacity={fadeOut(frame, c1 + 52, 12)}>
              {arrow(a, x, 70, ramp(frame, c1 + 6, 12), colors.primary)}
              {arrow(x, b, 70, ramp(frame, c1 + 18, 12), colors.primary)}
              {arrow(a, b, 220, ramp(frame, c1 + 34, 16), colors.highlight)}
            </g>
            <text
              x={960}
              y={Y - 210}
              fill={colors.primary}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.title}
              opacity={fadeIn(frame, c1 + 68)}
            >
              {tx.oneBlob}
            </text>
          </g>

          {/* a partition */}
          <g opacity={fadeIn(frame, c2 + 6)}>
            {PIECES.map((pts, i) => (
              <polygon
                key={i}
                points={pts}
                fill={alpha(PIECE_COLORS[i], 0.14)}
                opacity={fadeIn(frame, c2 + 44 + i * 3)}
              />
            ))}
            <rect
              x={360}
              y={200}
              width={1200}
              height={500}
              fill="none"
              stroke={colors.muted}
              strokeWidth={4}
            />
            {CUTS.map(([x1, y1, x2, y2], i) => {
              const t = ramp(frame, c2 + 10 + i * 8, 12);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={lerp(x1, x2, t)}
                  y2={lerp(y1, y2, t)}
                  stroke={colors.text}
                  strokeWidth={4}
                />
              );
            })}
            {DOTS.map(([dx, dy], i) => (
              <circle
                key={i}
                cx={dx}
                cy={dy}
                r={11 * Math.min(1, springIn(frame, c2 + 6 + i, fps, 12))}
                fill={colors.primary}
              />
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 56,
            fontFamily: fonts.title,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 40),
            translate: riseIn(frame, c2 + 40, 20),
          }}
        >
          {tx.partition}
        </div>
        <div
          style={{
            position: "absolute",
            top: 730,
            width: "100%",
            textAlign: "center",
            fontSize: 46,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 54),
            translate: riseIn(frame, c2 + 54, 20),
          }}
        >
          {tx.identicalOrDisjoint}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
