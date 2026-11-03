import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 曹冲称象 (《三国志·魏书·邓哀王冲传》): 置象大船之上，
// 而刻其水痕所至，称物以载之，则校可知矣. A boat on the water (c0); the
// elephant is too heavy for any steelyard (c1). The elephant goes aboard,
// the boat sinks and the waterline is notched; the elephant leaves and
// stones are loaded until the water reaches the same notch (c2). The
// stones are weighed one by one onto a running total: the elephant's
// weight, measured by cutting it up differently (c3).

const W = 640; // water level
const B = { x: 560, w: 520 };

export const Caochong: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("caochong");
  const [c0, c1, c2, c3] = cues;
  const on =
    glide(frame, c2 + 6, fps, 20) * (1 - glide(frame, c2 + 60, fps, 20));
  const stones = Math.min(8, Math.floor(Math.max(0, frame - c2 + -76) / 8));
  const load = on + (stones / 8) * (frame >= c2 + 76 ? 1 : 0);
  const sink = 70 * Math.min(1, load);
  const weighed = Math.min(8, Math.floor(Math.max(0, frame - c3 - 6) / 10));
  const wave = 4 * Math.sin(frame * 0.08);

  return (
    <SceneShell id="caochong">
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="thud" at={c1 + 10} volume={0.2} />
      <Sfx name="thud" at={c2 + 10} volume={0.22} />
      <Sfx name="scratch" at={c2 + 30} volume={0.18} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={i} name="clink" at={c2 + 76 + i * 8} volume={0.1} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={`w${i}`} name="tick" at={c3 + 6 + i * 10} volume={0.1} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={0}
          y={W + wave}
          width={1920}
          height={260}
          fill={alpha(colors.primary, 0.12)}
        />
        <line
          x1={0}
          y1={W + wave}
          x2={1920}
          y2={W + wave}
          stroke={alpha(colors.paper, 0.6)}
          strokeWidth={4}
        />
        <g
          transform={`translate(0 ${sink + wave})`}
          opacity={fadeIn(frame, c0 + 4, 10)}
        >
          <path
            d={`M ${B.x - B.w / 2} ${W - 60} L ${B.x + B.w / 2} ${W - 60} L ${B.x + B.w / 2 - 70} ${W + 30} L ${B.x - B.w / 2 + 70} ${W + 30} Z`}
            fill={colors.wood}
          />
          {/* the notch */}
          <line
            x1={B.x + B.w / 2 - 40}
            y1={W - 70 + 70}
            x2={B.x + B.w / 2 + 10}
            y2={W - 70 + 70}
            stroke={colors.red}
            strokeWidth={6}
            opacity={fadeIn(frame, c2 + 30, 6)}
          />
          {/* the elephant */}
          <g opacity={on} transform={`translate(${B.x} ${W - 60})`}>
            <ellipse
              cx={0}
              cy={-90}
              rx={130}
              ry={80}
              fill={alpha(colors.paper, 0.8)}
            />
            <ellipse
              cx={120}
              cy={-120}
              rx={55}
              ry={50}
              fill={alpha(colors.paper, 0.8)}
            />
            <path
              d="M 160 -110 Q 190 -40 170 0"
              fill="none"
              stroke={alpha(colors.paper, 0.8)}
              strokeWidth={22}
              strokeLinecap="round"
            />
            {[-80, -30, 30, 80].map((x) => (
              <rect
                key={x}
                x={x - 14}
                y={-30}
                width={28}
                height={30}
                fill={alpha(colors.paper, 0.8)}
              />
            ))}
          </g>
          {/* the stones */}
          {Array.from({ length: stones }).map((_, i) => (
            <rect
              key={i}
              x={B.x - 200 + (i % 4) * 100}
              y={W - 60 - 50 - Math.floor(i / 4) * 52}
              width={88}
              height={46}
              rx={14}
              fill={alpha(colors.muted, 0.9)}
            />
          ))}
        </g>
        {/* the steelyard, too weak for the elephant, then the stones */}
        <g opacity={fadeIn(frame, c1 + 4, 8)} transform="translate(1440 220)">
          <line
            x1={-160}
            y1={0}
            x2={200}
            y2={frame < c3 ? 30 : 0}
            stroke={colors.paper}
            strokeWidth={8}
          />
          <line
            x1={0}
            y1={-60}
            x2={0}
            y2={0}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <text
            x={0}
            y={90}
            fill={frame < c3 ? colors.red : colors.green}
            fontSize={48}
            fontWeight={800}
            textAnchor="middle"
          >
            {frame < c3 ? `${tx.elephant} ✗` : `${tx.stones} × ${weighed}`}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.caochong}
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1300,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {tx.elephant} = Σ {tx.stones}
        <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
          {weighed}/8
        </span>
      </div>
    </SceneShell>
  );
};
