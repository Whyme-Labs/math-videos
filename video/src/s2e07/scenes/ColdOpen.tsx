import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { Barrel, barrelTop } from "../components/barrel";
import { useStrings } from "../i18n";

// The story. Linz, autumn 1613: a barrel on its side, the merchant pushing
// one long rod through the bung hole to the far bottom corner; a reading
// ticks up on the rod. Kepler, beside it, gets a "?" over his head; a book
// lands with the title of his 1615 treatise. Then the barrel glows at its
// two ends and its middle, and the weights 1/6, 4/6, 1/6 pop over them.
// Last, a plot: a parabola gets "exact ✓", then a cubic also gets "exact ✓",
// and a big question mark.

const B = { cx: 1120, cy: 540, len: 640, rEnd: 150, rMid: 210 };
const top = (t: number) => barrelTop(t, B.cx, B.cy, B.len, B.rEnd, B.rMid);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const rod = glide(frame, c0 + 40, fps, 30);
  const doubt = Math.min(1, springIn(frame, c1 + 10, fps, 10));
  const book = Math.min(1, springIn(frame, c1 + 50, fps, 10));
  const weights = (k: number) =>
    Math.min(1, springIn(frame, c2 + 20 + k * 14, fps, 10));
  const part1 = fadeOut(frame, c3, 10);
  const parab = fadeIn(frame, c3 + 10, 10);
  const cubic = fadeIn(frame, c3 + 60, 10);
  const q = Math.min(1, springIn(frame, c3 + 100, fps, 10));
  const bung = top(0.5);
  const corner = { x: B.cx - B.len / 2 + 20, y: B.cy + B.rEnd - 10 };
  const rodEnd = {
    x: lerp(bung.x + 120, corner.x, rod),
    y: lerp(bung.y - 220, corner.y, rod),
  };
  const plot = (x: number, y: number) => ({
    x: 560 + x * 800,
    y: 640 - y * 420,
  });

  return (
    <SceneShell id="coldOpen">
      <Sfx name="scratch" at={c0 + 40} volume={0.2} />
      <Sfx name="clink" at={c0 + 70} volume={0.2} />
      <Sfx name="pop" at={c1 + 10} volume={0.16} />
      <Sfx name="thud" at={c1 + 50} volume={0.34} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pluck3" at={c2 + 20 + k * 14} volume={0.14} />
      ))}
      <Sfx name="ding" at={c3 + 30} />
      <Sfx name="ding" at={c3 + 80} />
      <Sfx name="thud" at={c3 + 100} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* the cellar floor */}
          <rect
            x={0}
            y={760}
            width={1920}
            height={80}
            fill={alpha(colors.ink, 0.5)}
          />
          <Barrel cx={B.cx} cy={B.cy} len={B.len} rEnd={B.rEnd} rMid={B.rMid} />
          {/* the merchant's rod, through the bung hole to the far corner */}
          <line
            x1={rodEnd.x + (bung.x - corner.x) * 1.5}
            y1={rodEnd.y + (bung.y - corner.y) * 1.5}
            x2={rodEnd.x}
            y2={rodEnd.y}
            stroke={colors.paper}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={fadeIn(frame, c0 + 30, 8) * fadeOut(frame, c2, 10)}
          />
          <Person
            x={1640}
            y={760}
            color={colors.orange}
            size={1.6}
            facing={-1}
          />
          <Person
            x={330}
            y={760}
            color={colors.primary}
            size={1.7}
            facing={1}
          />
          <text
            x={330}
            y={480}
            fill={colors.primary}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.kepler}
          </text>
          <text
            x={1640}
            y={480}
            fill={colors.orange}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.merchant}
          </text>
          {/* Kepler's doubt */}
          <g opacity={doubt} transform={`translate(400 370) scale(${doubt})`}>
            <circle
              r={56}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={28}
              fill={colors.ink}
              fontSize={80}
              textAnchor="middle"
              fontWeight={900}
            >
              ?
            </text>
          </g>
          {/* the book */}
          <g
            opacity={book}
            transform={`translate(640 200) rotate(-4) scale(${book})`}
          >
            <rect
              x={-170}
              y={-110}
              width={340}
              height={220}
              rx={10}
              fill={colors.violet}
              stroke={colors.paper}
              strokeWidth={4}
            />
            <rect
              x={-150}
              y={-90}
              width={300}
              height={180}
              rx={6}
              fill="none"
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
          </g>
          <text
            x={640}
            y={350}
            fill={colors.muted}
            fontSize={30}
            textAnchor="middle"
            fontStyle="italic"
            opacity={book}
          >
            {typed(tx.book, frame, c1 + 56, fps, 40)}
          </text>
          {/* the two ends and the middle */}
          {[0, 0.5, 1].map((t, k) => {
            const p = top(t);
            const w = weights(k);
            return (
              <g key={t} opacity={w}>
                <ellipse
                  cx={p.x}
                  cy={B.cy}
                  rx={22}
                  ry={B.cy - p.y}
                  fill={alpha(colors.orange, 0.35)}
                  stroke={colors.orange}
                  strokeWidth={6}
                />
                <text
                  x={p.x}
                  y={p.y - 30}
                  fill={colors.orange}
                  stroke={colors.bg}
                  strokeWidth={8}
                  paintOrder="stroke"
                  fontSize={56}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {["1/6", "4/6", "1/6"][k]}
                </text>
              </g>
            );
          })}
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
          {tx.linz}
        </div>
      </AbsoluteFill>

      {/* exact for parabolas, and for cubics too */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={plot(-0.05, 0).x}
            y1={plot(0, 0).y}
            x2={plot(1.05, 0).x}
            y2={plot(0, 0).y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          <path
            d={`${curve((x) => 0.3 + 0.8 * x * (1 - x), 0, 1, plot)} L ${plot(1, 0).x} ${plot(1, 0).y} L ${plot(0, 0).x} ${plot(0, 0).y} Z`}
            fill={alpha(colors.primary, 0.12)}
            stroke={colors.primary}
            strokeWidth={7}
            opacity={parab * (1 - cubic * 0.7)}
          />
          <path
            d={`${curve((x) => 0.35 + 0.6 * x * (1 - x) + 1.6 * (x - 0.5) ** 3, 0, 1, plot)} L ${plot(1, 0).x} ${plot(1, 0).y} L ${plot(0, 0).x} ${plot(0, 0).y} Z`}
            fill={alpha(colors.highlight, 0.14)}
            stroke={colors.highlight}
            strokeWidth={7}
            opacity={cubic}
          />
          {[0, 0.5, 1].map((x) => (
            <circle
              key={x}
              cx={plot(x, 0).x}
              cy={plot(x, 0).y}
              r={14}
              fill={colors.orange}
              opacity={parab}
            />
          ))}
          {[
            {
              y: 200,
              o: fadeIn(frame, c3 + 30, 6),
              c: colors.primary,
              t: "x²",
            },
            {
              y: 290,
              o: fadeIn(frame, c3 + 80, 6),
              c: colors.highlight,
              t: "x³",
            },
          ].map((l) => (
            <text
              key={l.t}
              x={1560}
              y={l.y}
              fill={l.c}
              fontSize={56}
              textAnchor="end"
              fontWeight={800}
              opacity={l.o}
            >
              {l.t} · {tx.exact} ✓
            </text>
          ))}
          <g opacity={q} transform={`translate(380 380) scale(${q})`}>
            <text
              fill={colors.highlight}
              fontSize={220}
              textAnchor="middle"
              fontWeight={900}
            >
              ?
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
