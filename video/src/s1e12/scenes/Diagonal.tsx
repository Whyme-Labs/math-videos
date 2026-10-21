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
import { colors, fonts } from "../../shared/theme";
import {
  Badge,
  cellCenter,
  COLS,
  digitOf,
  flip,
  Ledger,
  ROWS,
  type Layout,
} from "../components/ledger";
import { useStrings } from "../i18n";

// The diagonal, close up. The camera rides down the diagonal as each cell
// lights. Each lit digit flips (5 → 4, else → 5) and drops into the new name
// at the bottom. The new name then slides up past every row, and at row n
// its digit n rings red: different. Then the twin trap: "add one" builds
// 0.1999…, which sits on the same point as 0.2 already on the list. Last,
// the rows shuffle, the diagonal relights, and a new name drops out.

const L: Layout = { x: 420, y: 150, cw: 112, rh: 82 };
const SHUFFLE = [5, 2, 7, 0, 3, 6, 1, 4];
const BADGE = { x: 1680, y: 600 };

export const Diagonal: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("diagonal");
  const [c0, c1, c2, c3] = cues;
  // line 0: light the diagonal, camera tracking it
  const litAt = (k: number) => c0 + 8 + k * 9;
  const lit = (k: number) => (frame >= litAt(k) ? 1 : 0);
  const track = ramp(frame, litAt(0), litAt(ROWS - 1) - litAt(0) + 10);
  const trackOut = glide(frame, c1, fps, 24);
  const zoom = lerp(1.5, 1, trackOut);
  const focus = cellCenter(
    L,
    lerp(0, ROWS - 1, track),
    lerp(0, ROWS - 1, track),
  );
  const camX = lerp(focus.x - 960, 0, trackOut);
  const camY = lerp(focus.y - 540, 0, trackOut);
  // line 1: flip and drop, then compare
  const dropAt = (k: number) => c1 + 6 + k * 6;
  const compare = ramp(frame, c1 + 70, 80);
  const cmpRow = Math.min(ROWS - 1, Math.floor(compare * ROWS));
  // line 2: the twin trap
  const twins = fadeIn(frame, c2 + 4) * fadeOut(frame, c3, 10);
  const tie = glide(frame, c2 + 40, fps, 20);
  // line 3: shuffle and redo
  const shuf = glide(frame, c3 + 6, fps, 24);
  const reLitAt = (k: number) => c3 + 36 + k * 5;
  const reLit = (k: number) => (frame >= reLitAt(k) ? 1 : 0);
  const shuffled = frame >= c3 + 6;
  const order = shuffled
    ? SHUFFLE
    : Array.from({ length: ROWS }).map((_, k) => k);
  const slotOf = (id: number) => lerp(id, SHUFFLE.indexOf(id), shuf);
  const firstDigits = Array.from({ length: ROWS }).map((_, k) =>
    flip(digitOf(k, k)),
  );
  const secondDigits = SHUFFLE.map((id, k) => flip(digitOf(id, k)));
  const shownFirst = Array.from({ length: ROWS }).filter(
    (_, k) => frame >= dropAt(k) + 12,
  ).length;
  const shownSecond = Array.from({ length: ROWS }).filter(
    (_, k) => frame >= reLitAt(k) + 4,
  ).length;
  const ledgerDim = 1 - 0.75 * twins;

  return (
    <SceneShell id="diagonal">
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`l${k}`} name={PLUCKS[k % 6]} at={litAt(k)} volume={0.18} />
      ))}
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`d${k}`} name="tick" at={dropAt(k) + 10} volume={0.14} />
      ))}
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`c${k}`} name="scratch" at={c1 + 70 + k * 10} volume={0.08} />
      ))}
      <Sfx name="page" at={c2 + 4} />
      <Sfx name="clink" at={c2 + 60} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.16} />
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`r${k}`} name="tick" at={reLitAt(k)} volume={0.12} />
      ))}
      <Sfx name="chime" at={reLitAt(ROWS) + 4} />
      <QuestionTray />

      <Camera zoom={zoom} x={camX} y={camY}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <g opacity={ledgerDim}>
            <Ledger
              L={L}
              order={order}
              slotOf={shuffled ? slotOf : undefined}
              lit={(k) => (shuffled ? reLit(k) : lit(k))}
              mismatch={(k) =>
                !shuffled && frame >= c1 + 70 && k <= cmpRow ? 1 : 0
              }
            />
            {/* flipped digits drop from the diagonal to the name tag */}
            {!shuffled
              ? Array.from({ length: ROWS }).map((_, k) => {
                  const t = ramp(frame, dropAt(k), 12);
                  if (t <= 0 || t >= 1) return null;
                  const a = cellCenter(L, k, k);
                  const p = hop(
                    t,
                    a.x,
                    a.y,
                    BADGE.x - 120 + k * 26,
                    BADGE.y,
                    80,
                  );
                  return (
                    <text
                      key={k}
                      x={p.x}
                      y={p.y}
                      fill={colors.highlight}
                      fontSize={52}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                      fontWeight={800}
                    >
                      {firstDigits[k]}
                    </text>
                  );
                })
              : null}
            {/* the new name slides up the table to compare row by row */}
            {!shuffled && compare > 0 ? (
              <rect
                x={L.x}
                y={L.y + cmpRow * L.rh - 4}
                width={COLS * L.cw}
                height={L.rh + 8}
                rx={12}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={6}
              />
            ) : null}
          </g>
        </svg>
      </Camera>

      {/* the name tag at the bottom */}
      <AbsoluteFill>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(${shake(frame, c3 + 6, 8)} 0)`}
            opacity={ledgerDim}
          >
            <Badge
              x={BADGE.x}
              y={BADGE.y}
              digits={shuffled ? secondDigits : firstDigits}
              shown={shuffled ? shownSecond : shownFirst}
              scale={1}
            />
          </g>
          {/* the rule, small and once */}
          <text
            x={1680}
            y={420}
            fill={colors.highlight}
            fontSize={28}
            textAnchor="middle"
            fontFamily={fonts.mono}
            opacity={fadeIn(frame, c1 + 4) * fadeOut(frame, c2, 8)}
          >
            {tx.rule}
          </text>
          <text
            x={1680}
            y={720}
            fill={colors.green}
            fontSize={40}
            textAnchor="middle"
            opacity={fadeIn(frame, c1 + 150) * fadeOut(frame, c2, 8)}
          >
            {tx.differs}
          </text>
          {/* the twin trap: two names on one point */}
          <g opacity={twins}>
            <line
              x1={260}
              y1={560}
              x2={1660}
              y2={560}
              stroke={colors.text}
              strokeWidth={5}
            />
            {[0, 0.1, 0.2, 0.3].map((v) => (
              <g key={v}>
                <line
                  x1={260 + v * 4000}
                  y1={540}
                  x2={260 + v * 4000}
                  y2={580}
                  stroke={colors.text}
                  strokeWidth={4}
                />
              </g>
            ))}
            <circle
              cx={260 + 0.2 * 4000}
              cy={560}
              r={20 * Math.min(1, springIn(frame, c2 + 30, fps, 10))}
              fill={colors.primary}
            />
            {[
              { t: "0.2000…", x: 700, c: colors.primary, at: c2 + 10 },
              { t: "0.1999…", x: 1360, c: colors.red, at: c2 + 26 },
            ].map((b) => (
              <g key={b.t} opacity={fadeIn(frame, b.at)}>
                <line
                  x1={b.x}
                  y1={380}
                  x2={lerp(b.x, 1060, tie)}
                  y2={lerp(380, 540, tie)}
                  stroke={b.c}
                  strokeWidth={4}
                />
                <rect
                  x={b.x - 150}
                  y={290}
                  width={300}
                  height={90}
                  rx={18}
                  fill={b.c}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
                <text
                  x={b.x}
                  y={350}
                  fill={colors.ink}
                  fontSize={46}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={700}
                >
                  {b.t}
                </text>
              </g>
            ))}
            <text
              x={960}
              y={700}
              fill={colors.highlight}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              opacity={fadeIn(frame, c2 + 60)}
            >
              {tx.sameName}
            </text>
            <text
              x={960}
              y={800}
              fill={colors.green}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c2 + 80)}
            >
              {tx.rule}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
