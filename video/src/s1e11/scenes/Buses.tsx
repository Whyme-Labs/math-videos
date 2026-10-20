import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest, guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// Infinitely many infinite buses in a car park: bus b is row b, seat s is
// column s. Bus by bus fails: a usher walks along bus 1's row forever while
// a clock spins and bus 2 waits. Diagonals work: a glowing path zigzags
// through the car park, each passenger it reaches stands up and gets the
// next room number, and every bus gets a turn.

const COLS = 9;
const ROWS = 6;
const CELL = { w: 170, h: 132 };
const ORIGIN = { x: 330, y: 230 };
const cell = (b: number, s: number) => ({
  x: ORIGIN.x + s * CELL.w,
  y: ORIGIN.y + b * CELL.h,
});
// diagonal order: (b, s) with b + s = 0, then 1, then 2, …
const ORDER: { b: number; s: number }[] = [];
for (let d = 0; d < COLS + ROWS; d++)
  for (let s = 0; s <= d; s++) {
    const b = d - s;
    if (b < ROWS && s < COLS) ORDER.push({ b, s });
  }

export const Buses: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("buses");
  const [c0, c1, c2] = cues;
  const busIn = (b: number) => glide(frame, c0 + 6 + b * 8, fps, 30);
  // bus by bus: an usher walks along row 0 and never turns the corner
  const rowWalk = Math.max(0, frame - (c1 + 10)) * 9;
  const rowOut = fadeOut(frame, c2, 10);
  const clock = ((frame - c1) / fps) * 360;
  // diagonals
  const stepAt = (k: number) => c2 + 12 + k * 4;
  const reached = ORDER.filter((_, k) => frame >= stepAt(k)).length;
  const head = ORDER[Math.max(0, reached - 1)];
  const path = ORDER.slice(0, reached)
    .map(
      ({ b, s }, k) => `${k === 0 ? "M" : "L"} ${cell(b, s).x} ${cell(b, s).y}`,
    )
    .join(" ");
  const zoom =
    lerp(0.95, 0.8, glide(frame, c0, fps, 60)) + 0.05 * ramp(frame, c2, 120);

  return (
    <SceneShell id="buses">
      {Array.from({ length: ROWS }).map((_, b) => (
        <Sfx key={b} name="whoosh" at={c0 + 6 + b * 8} volume={0.08} />
      ))}
      <Sfx name="thud" at={c0 + 70} volume={0.2} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={`r${k}`} name="tick" at={c1 + 10 + k * 18} volume={0.14} />
      ))}
      <Sfx name="thud" at={c1 + 90} volume={0.3} />
      {ORDER.slice(0, 24).map((_, k) => (
        <Sfx key={`d${k}`} name={PLUCKS[k % 6]} at={stepAt(k)} volume={0.1} />
      ))}
      <Sfx name="chime" at={stepAt(24) + 4} />
      <QuestionTray />

      <Camera zoom={zoom} x={60} y={40}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <rect
            x={-200}
            y={ORIGIN.y - 110}
            width={2400}
            height={ROWS * CELL.h + 120}
            fill={alpha(colors.ink, 0.7)}
          />
          {Array.from({ length: ROWS }).map((_, b) => {
            const off = (1 - busIn(b)) * 1600;
            const y = ORIGIN.y + b * CELL.h;
            return (
              <g key={b} transform={`translate(${off} 0)`}>
                {/* each bus runs off the right edge: infinitely long */}
                <rect
                  x={ORIGIN.x - 120}
                  y={y - 52}
                  width={3000}
                  height={104}
                  rx={30}
                  fill={guestColor(b)}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
                <text
                  x={ORIGIN.x - 190}
                  y={y + 12}
                  fill={guestColor(b)}
                  fontSize={34}
                  textAnchor="end"
                  fontWeight={700}
                >
                  {tx.busN(b + 1)}
                </text>
                {Array.from({ length: COLS + 8 }).map((__, s) => {
                  const k = ORDER.findIndex((o) => o.b === b && o.s === s);
                  const got = k >= 0 && k < reached;
                  return (
                    <g key={s}>
                      <rect
                        x={cell(b, s).x - 54}
                        y={y - 38}
                        width={108}
                        height={76}
                        rx={14}
                        fill={got ? colors.paper : alpha(colors.paper, 0.55)}
                      />
                      <circle
                        cx={cell(b, s).x}
                        cy={y - (got ? 6 : 0)}
                        r={20}
                        fill={colors.ink}
                      />
                      {got ? (
                        <text
                          x={cell(b, s).x}
                          y={y + 40 - 6}
                          fill={colors.ink}
                          fontSize={42}
                          textAnchor="middle"
                          fontFamily={fonts.math}
                          fontWeight={700}
                          transform={`translate(0 ${-24 * Math.min(1, springIn(frame, stepAt(k), fps, 12))})`}
                        >
                          {k}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </g>
            );
          })}
          {/* bus by bus: the usher never leaves row 0 */}
          <g opacity={fadeIn(frame, c1 + 6) * rowOut}>
            <line
              x1={cell(0, 0).x}
              y1={ORIGIN.y - 80}
              x2={cell(0, 0).x + rowWalk}
              y2={ORIGIN.y - 80}
              stroke={colors.red}
              strokeWidth={8}
              strokeDasharray="14 10"
            />
            <Guest
              x={cell(0, 0).x + rowWalk}
              y={ORIGIN.y - 74}
              color={colors.red}
              size={0.7}
              bob={frame / 2.2}
              facing={1}
            />
            <g
              transform={`translate(${cell(1, 0).x - 260} ${cell(1, 0).y}) ${frame >= c1 + 90 ? `translate(${shake(frame, c1 + 90, 10)} 0)` : ""}`}
            >
              <circle
                cx={0}
                cy={0}
                r={46}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <line
                x1={0}
                y1={0}
                x2={30 * Math.sin((clock * Math.PI) / 180)}
                y2={-30 * Math.cos((clock * Math.PI) / 180)}
                stroke={colors.ink}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <line
                x1={0}
                y1={0}
                x2={20 * Math.sin((clock * Math.PI) / 2160)}
                y2={-20 * Math.cos((clock * Math.PI) / 2160)}
                stroke={colors.ink}
                strokeWidth={7}
                strokeLinecap="round"
              />
            </g>
          </g>
          {/* diagonals */}
          <path
            d={path}
            fill="none"
            stroke={colors.primary}
            strokeWidth={9}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.9}
          />
          {reached > 0 ? (
            <circle
              cx={cell(head.b, head.s).x}
              cy={cell(head.b, head.s).y}
              r={30}
              fill="none"
              stroke={colors.primary}
              strokeWidth={6}
            />
          ) : null}
        </svg>
      </Camera>
      <div
        style={{
          position: "absolute",
          top: 850,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 44,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 60) * rowOut,
          translate: riseIn(frame, c1 + 60, 14),
        }}
      >
        {tx.busN(2)} · {tx.waiting}
      </div>
    </SceneShell>
  );
};
