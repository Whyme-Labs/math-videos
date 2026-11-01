import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. 1907: Riesz on the left, Fréchet on the right, each pushing a
// paper to the middle where the two land on top of each other, both
// filling with the same lines. Then a
// hillside: contour lines of x + y as an orange stack, a hiker dot, and
// the uphill arrow (1, 1) at right angles to them. A squashed map (inset)
// has its own perpendicular, (1, 2) on the map, which is (1, 4) on the
// ground: the arrow swings while the contours stay exactly where they
// were, the old arrow left as a ghost. Last, a stack and an arrow face
// each other across a "?".

const O = { x: 640, y: 470 };
const S = 110;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const I = { x: 1440, y: 470 };
const scrI = (x: number, y: number) => ({ x: I.x + x * 70, y: I.y - y * 70 });

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const slide = glide(frame, c0 + 30, fps, 24);
  const part2 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c3, 10);
  const swing = glide(frame, c2 + 40, fps, 30);
  const dir0 = Math.atan2(1, 1);
  const dir1 = Math.atan2(4, 1);
  const a = lerp(dir0, dir1, swing);
  const L = 2.6;
  const inset = fadeIn(frame, c2 + 10);
  // the stack and the arrow breathe together: wider sheets, shorter arrow
  const breathe = Math.sin(Math.max(0, frame - c3 - 20) * 0.1);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="clink" at={c0 + 54} volume={0.2} />
      <Sfx name="pop" at={c1 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.1} />
      <Sfx name="scratch" at={c2 + 40} volume={0.2} />
      <Sfx name="riser" at={c3 + 10} volume={0.12} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Person
            x={360}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={1}
            beard
          />
          <Person
            x={1560}
            y={800}
            color={colors.primary}
            size={1.7}
            facing={-1}
          />
          <text
            x={360}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.riesz}
          </text>
          <text
            x={1560}
            y={540}
            fill={colors.primary}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.frechet}
          </text>
          {[0, 1].map((k) => {
            const x = lerp(k ? 1380 : 540, k ? 980 : 940, slide);
            return (
              <g
                key={k}
                transform={`translate(${x} ${480 + k * 20}) rotate(${k ? 4 : -4})`}
                opacity={fadeIn(frame, c0 + 16)}
              >
                <rect
                  x={-150}
                  y={-200}
                  width={300}
                  height={400}
                  rx={8}
                  fill={colors.paper}
                  stroke={colors.wood}
                  strokeWidth={6}
                />
                {Array.from({ length: 7 }).map((_, j) => (
                  <line
                    key={j}
                    x1={-110}
                    y1={-140 + j * 44}
                    x2={lerp(
                      -110,
                      j % 3 === 2 ? 40 : 110,
                      glide(frame, c0 + 40 + j * 12 + k * 4, fps, 10),
                    )}
                    y2={-140 + j * 44}
                    stroke={alpha(colors.ink, 0.35)}
                    strokeWidth={6}
                  />
                ))}
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
          {tx.year}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e16hill">
              <rect x={260} y={110} width={760} height={720} rx={30} />
            </clipPath>
            <clipPath id="e16inset">
              <rect
                x={I.x - 260}
                y={I.y - 180}
                width={520}
                height={360}
                rx={20}
              />
            </clipPath>
          </defs>
          <rect
            x={260}
            y={110}
            width={760}
            height={720}
            rx={30}
            fill={alpha(colors.green, 0.06)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <g clipPath="url(#e16hill)">
            <Stack a={0.5} b={0.5} scr={scr} range={8} />
          </g>
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(L * Math.cos(dir0), L * Math.sin(dir0)).x}
            y2={scr(L * Math.cos(dir0), L * Math.sin(dir0)).y}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={6}
            strokeDasharray="12 10"
            opacity={swing}
          />
          <g opacity={fadeIn(frame, c1 + 30)}>
            <Arrow
              from={O}
              to={scr(L * Math.cos(a), L * Math.sin(a))}
              width={16}
              color={swing > 0.05 ? colors.highlight : colors.primary}
            />
          </g>
          <circle cx={O.x} cy={O.y} r={16} fill={colors.text} />
          <text
            x={scr(L * Math.cos(a), L * Math.sin(a)).x + 20}
            y={scr(L * Math.cos(a), L * Math.sin(a)).y}
            fill={colors.primary}
            fontSize={44}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 40)}
          >
            {tx.uphill}
          </text>
          {/* the squashed map */}
          <g opacity={inset}>
            <rect
              x={I.x - 260}
              y={I.y - 180}
              width={520}
              height={360}
              rx={20}
              fill={alpha(colors.wood, 0.25)}
              stroke={colors.wood}
              strokeWidth={5}
            />
            <g clipPath="url(#e16inset)">
              <Stack a={0.5} b={1} scr={scrI} range={8} width={5} />
            </g>
            <Arrow
              from={I}
              to={scrI(2.4 / Math.sqrt(5), 4.8 / Math.sqrt(5))}
              width={12}
              color={colors.highlight}
            />
            <text
              x={I.x}
              y={I.y + 240}
              fill={colors.muted}
              fontSize={40}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.squash}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[-2, -1, 0, 1, 2].map((k) => (
            <line
              key={k}
              x1={560 + k * (50 + 14 * breathe)}
              y1={300}
              x2={560 + k * (50 + 14 * breathe)}
              y2={640}
              stroke={colors.orange}
              strokeWidth={k === 0 ? 10 : 7}
              strokeLinecap="round"
            />
          ))}
          <Arrow
            from={{ x: 1180, y: 470 }}
            to={{ x: 1480 - 40 * breathe, y: 470 }}
            width={18}
          />
          <text
            x={870}
            y={520}
            fill={colors.highlight}
            fontSize={160}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(frame, c3 + 30)}
          >
            ?
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
