import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Zurich, 1912: Einstein at a desk littered with crumpled
// pages; Grossmann walks in and Einstein's bubble pops: "Help me, or I'll
// go crazy!". Grossmann holds up the 1900 memoir, and a 4 × 4 grid of
// numbers churns as the coordinates change under it. Then the slogan "a
// tensor is something that transforms like a tensor" runs round a circle,
// chasing its own tail. Last, a funnel marked ⊗ drops into the middle.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const walk = glide(frame, c0 + 10, fps, 40);
  const bubble = Math.min(1, springIn(frame, c0 + 50, fps, 10));
  const part1 = fadeOut(frame, c2, 10);
  const book = Math.min(1, springIn(frame, c1 + 10, fps, 10));
  const churn = frame > c1 + 40 ? (frame - c1 - 40) / 18 : 0;
  const loop = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const funnel = Math.min(1, springIn(frame, c3 + 20, fps, 10));
  const cellVal = (i: number, j: number) => {
    const base = i === j ? (i === 0 ? -1 : 1) : 0;
    if (churn <= 0) return base;
    const t = Math.floor(churn);
    return Math.round(base + Math.sin(t * 1.7 + i * 2.3 + j * 0.9) * 2.4);
  };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.16} />
      <Sfx name="pop" at={c0 + 50} volume={0.18} />
      <Sfx name="thud" at={c1 + 10} volume={0.3} />
      {Array.from({ length: 5 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 40 + k * 18} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 4} volume={0.12} />
      <Sfx name="thud" at={c3 + 20} volume={0.3} />
      <Sfx name="chime" at={c3 + 30} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* the desk and its crumpled pages */}
          <rect x={300} y={600} width={760} height={24} fill={colors.wood} />
          <rect x={340} y={624} width={18} height={150} fill={colors.wood} />
          <rect x={1000} y={624} width={18} height={150} fill={colors.wood} />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle
              key={k}
              cx={420 + k * 130 + (k % 2) * 30}
              cy={590 - (k % 2) * 8}
              r={22}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={3}
            />
          ))}
          <Person
            x={560}
            y={780}
            color={colors.highlight}
            size={1.7}
            facing={1}
          />
          <Person
            x={lerp(1900, 1300, walk)}
            y={780}
            color={colors.orange}
            size={1.7}
            facing={-1}
            glasses
            bob={walk < 1 ? frame / 4 : 0}
          />
          <text
            x={560}
            y={470}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.einstein}
          </text>
          <text
            x={1300}
            y={470}
            fill={colors.orange}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 40) * fadeOut(frame, c1, 8)}
          >
            {tx.grossmann}
          </text>
          {/* the plea */}
          <g
            opacity={bubble * fadeOut(frame, c1, 8)}
            transform={`translate(760 300) scale(${bubble})`}
          >
            <rect
              x={-300}
              y={-60}
              width={600}
              height={110}
              rx={50}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <path
              d="M -160 48 L -210 110 L -100 48 Z"
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={14}
              fill={colors.ink}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.help}
            </text>
          </g>
          {/* the memoir, and a grid that churns as coordinates change */}
          <g
            opacity={book}
            transform={`translate(1300 250) rotate(-4) scale(${book})`}
          >
            <rect
              x={-230}
              y={-60}
              width={460}
              height={110}
              rx={8}
              fill={colors.violet}
              stroke={colors.paper}
              strokeWidth={4}
            />
            <text
              y={10}
              fill={colors.paper}
              fontSize={34}
              textAnchor="middle"
              fontStyle="italic"
              fontWeight={700}
            >
              {tx.memoir}
            </text>
          </g>
          <g opacity={fadeIn(frame, c1 + 30, 8)} transform="translate(700 260)">
            <path
              d="M -170 -150 l -20 0 l 0 300 l 20 0 M 170 -150 l 20 0 l 0 300 l -20 0"
              fill="none"
              stroke={colors.text}
              strokeWidth={5}
            />
            {[0, 1, 2, 3].map((i) =>
              [0, 1, 2, 3].map((j) => {
                const v = cellVal(i, j);
                return (
                  <text
                    key={`${i}${j}`}
                    x={-120 + j * 80}
                    y={-100 + i * 72 + 14}
                    fill={colors.text}
                    fontSize={36}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                    fontWeight={700}
                  >
                    {v < 0 ? `−${Math.abs(v)}` : v}
                  </text>
                );
              }),
            )}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.zurich}
        </div>
      </AbsoluteFill>

      {/* the slogan, chasing its own tail */}
      <AbsoluteFill style={{ opacity: loop }}>
        <svg width={1920} height={1080}>
          <defs>
            <path
              id="ouroboros"
              d="M 960 470 m -300 0 a 300 300 0 1 1 600 0 a 300 300 0 1 1 -600 0"
            />
          </defs>
          <circle
            cx={960}
            cy={470}
            r={300}
            fill="none"
            stroke={alpha(colors.paper, 0.15)}
            strokeWidth={60}
          />
          <g transform={`rotate(${(frame - c2) * 0.8} 960 470)`}>
            <text fill={colors.paper} fontSize={40} fontWeight={700}>
              <textPath href="#ouroboros">{tx.slogan + tx.slogan}</textPath>
            </text>
          </g>
          <text
            x={960}
            y={500}
            fill={colors.highlight}
            fontSize={120}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(frame, c2 + 40)}
          >
            ?
          </text>
        </svg>
      </AbsoluteFill>

      {/* the funnel */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g
            opacity={funnel}
            transform={`translate(960 ${lerp(200, 470, funnel)})`}
          >
            <path
              d="M -260 -200 L 260 -200 L 60 80 L 60 220 L -60 220 L -60 80 Z"
              fill={alpha(colors.primary, 0.15)}
              stroke={colors.primary}
              strokeWidth={10}
            />
            <text
              y={-40}
              fill={colors.primary}
              fontSize={130}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              ⊗
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
