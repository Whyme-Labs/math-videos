import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Gap,
  RationalDots,
  toX,
  type Window,
} from "../../shared/components/rationals";
import { useStrings } from "../i18n";

// A unit square and its diagonal. The diagonal swings down onto a ruler;
// a magnifier shows its end falling between two marks at every refinement.
// Then a sea-and-ship sketch for the (late) legend, and a preview of the
// rational line with a gap.

const O = { x: 360, y: 640 };
const SIDE = 300;
const RULER_Y = 720;
const LENS = { x: 1080, y: 230, w: 680, h: 300 };
const LEVELS = [
  { step: 0.5, lo: 0.75, hi: 1.75 },
  { step: 0.1, lo: 1.15, hi: 1.65 },
  { step: 0.01, lo: 1.39, hi: 1.44 },
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const draw = ramp(frame, c0 + 4, 24);
  const diag = ramp(frame, c0 + 34, 16);
  const swing = glide(frame, c1 + 6, fps, 26);
  const levelAt = (k: number) => c1 + 40 + k * 40;
  const level = LEVELS.reduce(
    (acc, _, k) => (frame >= levelAt(k) ? k : acc),
    -1,
  );
  const lensIn = fadeIn(frame, levelAt(0) - 6) * fadeOut(frame, c2, 12);
  const sea = fadeIn(frame, c2 + 6) * fadeOut(frame, c3, 12);
  const ship = ramp(frame, c2 + 6, 150);
  const squareOut = fadeOut(frame, c3, 12);
  // the preview line zooms in on √2 a little
  const pz = glide(frame, c3 + 50, fps, 50);
  const PREVIEW: Window = {
    lo: lerp(1, Math.SQRT2 - 0.12, pz),
    hi: lerp(2, Math.SQRT2 + 0.12, pz),
    x0: 260,
    x1: 1660,
    y: 460,
  };
  // The diagonal's end, swinging from the top-right corner down to the ruler.
  const ang = lerp(Math.PI / 4, 0, swing);
  const L = SIDE * Math.SQRT2;
  const end = { x: O.x + L * Math.cos(ang), y: O.y - L * Math.sin(ang) };
  const lensX = (v: number, k: number) =>
    LENS.x + ((v - LEVELS[k].lo) / (LEVELS[k].hi - LEVELS[k].lo)) * LENS.w;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="scratch" at={c0 + 4} />
      <Sfx name="scratch" at={c0 + 34} volume={0.22} />
      <Sfx name="chime" at={c0 + 56} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      {LEVELS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={levelAt(k)} volume={0.28} />
      ))}
      <Sfx name="thud" at={levelAt(2) + 20} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="thud" at={c2 + 20} volume={0.3} />
      <Sfx name="whoosh" at={c3 + 50} volume={0.12} />
      <Sfx name="pop" at={c3 + 6} />
      <Sfx name="ding" at={c3 + 40} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={squareOut}>
            {/* the square, drawn on */}
            <rect
              x={O.x}
              y={O.y - SIDE}
              width={SIDE}
              height={SIDE}
              fill={alpha(colors.primary, 0.06)}
              stroke={colors.primary}
              strokeWidth={5}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - draw}
            />
            <text
              x={O.x + SIDE / 2}
              y={O.y + 46}
              fill={colors.text}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 20) * (1 - swing)}
            >
              1
            </text>
            <text
              x={O.x - 34}
              y={O.y - SIDE / 2 + 12}
              fill={colors.text}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 20)}
            >
              1
            </text>
            {/* the diagonal, which swings down onto the ruler */}
            <line
              x1={O.x}
              y1={O.y}
              x2={lerp(O.x, end.x, diag)}
              y2={lerp(O.y, end.y, diag)}
              stroke={colors.highlight}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <text
              x={(O.x + end.x) / 2 - 20}
              y={(O.y + end.y) / 2 - 20}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c0 + 48)}
            >
              √2
            </text>
            {/* the ruler */}
            <g opacity={fadeIn(frame, c1 + 6)}>
              <line
                x1={O.x}
                y1={RULER_Y}
                x2={O.x + 2 * SIDE}
                y2={RULER_Y}
                stroke={colors.muted}
                strokeWidth={4}
              />
              {[0, 1, 2].map((n) => (
                <g key={n}>
                  <line
                    x1={O.x + n * SIDE}
                    y1={RULER_Y - 18}
                    x2={O.x + n * SIDE}
                    y2={RULER_Y + 18}
                    stroke={colors.text}
                    strokeWidth={4}
                  />
                  <text
                    x={O.x + n * SIDE}
                    y={RULER_Y + 56}
                    fill={colors.text}
                    fontSize={32}
                    textAnchor="middle"
                    fontFamily={fonts.mono}
                  >
                    {n}
                  </text>
                </g>
              ))}
              {level >= 0
                ? Array.from({
                    length: Math.round(2 / LEVELS[level].step) + 1,
                  }).map((_, i) => {
                    const x = O.x + i * LEVELS[level].step * SIDE;
                    return (
                      <line
                        key={`${level}-${i}`}
                        x1={x}
                        y1={RULER_Y - 9}
                        x2={x}
                        y2={RULER_Y + 9}
                        stroke={alpha(colors.text, 0.6)}
                        strokeWidth={level === 2 ? 1 : 2}
                      />
                    );
                  })
                : null}
            </g>
          </g>
          {/* the magnifier around the diagonal's end */}
          {level >= 0 ? (
            <g opacity={lensIn}>
              <rect
                x={LENS.x - 30}
                y={LENS.y - 30}
                width={LENS.w + 60}
                height={LENS.h}
                rx={24}
                fill={alpha(colors.ink, 0.7)}
                stroke={colors.panelEdge}
                strokeWidth={3}
              />
              <line
                x1={LENS.x}
                y1={LENS.y + 140}
                x2={LENS.x + LENS.w}
                y2={LENS.y + 140}
                stroke={colors.muted}
                strokeWidth={4}
              />
              {Array.from({ length: 200 }).map((_, i) => {
                const v =
                  Math.ceil(LEVELS[level].lo / LEVELS[level].step) *
                    LEVELS[level].step +
                  i * LEVELS[level].step;
                if (v > LEVELS[level].hi + 1e-9) return null;
                const x = lensX(v, level);
                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={LENS.y + 116}
                      x2={x}
                      y2={LENS.y + 164}
                      stroke={colors.text}
                      strokeWidth={3}
                    />
                    <text
                      x={x}
                      y={LENS.y + 210}
                      fill={colors.text}
                      fontSize={28}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                    >
                      {v.toFixed(level === 2 ? 2 : 1)}
                    </text>
                  </g>
                );
              })}
              <circle
                cx={lensX(Math.SQRT2, level)}
                cy={LENS.y + 140}
                r={
                  11 * Math.min(1, springIn(frame, levelAt(level) + 8, fps, 10))
                }
                fill={colors.highlight}
              />
              <text
                x={LENS.x + LENS.w / 2}
                y={LENS.y + 50}
                fill={colors.highlight}
                fontSize={34}
                textAnchor="middle"
                opacity={fadeIn(frame, levelAt(0) + 14)}
              >
                {tx.between}
              </text>
            </g>
          ) : null}
          {/* no common unit */}
          <text
            x={O.x + SIDE}
            y={O.y - SIDE - 40}
            fill={colors.red}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c2 + 20) * squareOut}
          >
            ✗ 1 : √2 ≠ m : n
          </text>
          {/* the legend: sea and a ship */}
          <g opacity={sea}>
            {[0, 1, 2].map((k) => (
              <path
                key={k}
                d={Array.from({ length: 13 })
                  .map((_, i) => {
                    const x = 1000 + i * 70;
                    const y =
                      520 + k * 34 + 10 * Math.sin(i * 1.3 + frame / 10 + k);
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke={alpha(colors.muted, 0.7)}
                strokeWidth={3}
              />
            ))}
            <g
              transform={`translate(${lerp(1080, 1560, ship)} ${500 + 6 * Math.sin(frame / 12)})`}
            >
              <path d="M -60 0 L 60 0 L 40 26 L -40 26 Z" fill={colors.wood} />
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={-90}
                stroke={colors.paper}
                strokeWidth={4}
              />
              <path d="M 4 -86 L 52 -20 L 4 -20 Z" fill={colors.paper} />
            </g>
            <text
              x={1360}
              y={680}
              fill={colors.muted}
              fontSize={34}
              textAnchor="middle"
            >
              {tx.legend}
            </text>
          </g>
          {/* preview: the rationals, with a gap */}
          <g opacity={fadeIn(frame, c3 + 6)}>
            <RationalDots w={PREVIEW} target={180} r={4} />
            <Gap
              x={toX(PREVIEW, Math.SQRT2)}
              y={PREVIEW.y}
              s={springIn(frame, c3 + 36, fps, 10)}
              r={18}
            />
            <text
              x={toX(PREVIEW, Math.SQRT2)}
              y={PREVIEW.y - 46}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c3 + 40)}
            >
              ?
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 1080,
            top: 250,
            fontFamily: fonts.math,
            fontSize: 56,
            opacity: fadeIn(frame, c0 + 56) * fadeOut(frame, c1 + 30, 10),
            translate: riseIn(frame, c0 + 56, 20),
          }}
        >
          d² = 1² + 1² = 2
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
