import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../../s1e11/components/hotel";
import { Person } from "../../s1e14/components/study";
import { Clock, Tile } from "../../s1e16/components/props";
import { IDial } from "../components/dial";
import { useStrings } from "../i18n";

// The story. A video call, three panels: one friend with a square tile, one
// with a four-hour clock, one with the numbers 1, i, −1, −i. The tile turns
// and the clock ticks; then the third multiplies by i; then all three step
// together until, after four moves, each is home and glows. The labels fade
// out and a little four-dot ring appears under every panel, its marker
// stepping in time: the same pattern three times. The panels slide
// together under one question.

const PANEL_X = [340, 960, 1580];
const PANEL_Y = 140;
const PANEL_W = 540;
const PANEL_H = 600;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  // the beats: tile and clock first, dial joins, then all together
  const step = (at: number) => glide(frame, at, fps, 12);
  const together = [c1 + 34, c1 + 64, c2 + 14, c3 + 20, c3 + 50, c3 + 80]
    .map(step)
    .reduce((a, b) => a + b, 0);
  const tc = step(c0 + 50) + together; // tile and clock
  const dial = step(c1 + 10) + together;
  const home = frame >= c2 + 26 && frame < c3 + 10;
  const hide = glide(frame, c3 + 4, fps, 14);
  const slide = glide(frame, c4 + 6, fps, 24);
  const ask = Math.min(1, springIn(frame, c4 + 30, fps, 10));
  const panelX = (k: number) => lerp(PANEL_X[k], 960 + (k - 1) * 380, slide);

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pop" at={c0 + 6 + k * 8} volume={0.14} />
      ))}
      <Sfx name={PLUCKS[0]} at={c0 + 50} volume={0.14} />
      <Sfx name={PLUCKS[1]} at={c1 + 10} volume={0.14} />
      {[c1 + 34, c1 + 64, c2 + 14, c3 + 20, c3 + 50, c3 + 80].map((t, k) => (
        <Sfx key={`t${k}`} name={PLUCKS[(k + 2) % 6]} at={t} volume={0.14} />
      ))}
      <Sfx name="chime" at={c2 + 26} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.14} />
      <Sfx name="ding" at={c4 + 30} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[0, 1, 2].map((k) => {
          const s = Math.min(1, springIn(frame, c0 + 6 + k * 8, fps, 12));
          const x = panelX(k);
          const lit = home || (k === 2 && frame >= c1 && frame < c1 + 30);
          return (
            <g
              key={k}
              transform={`translate(${x} ${PANEL_Y + PANEL_H / 2}) scale(${s * lerp(1, 0.68, slide)}) translate(0 ${-PANEL_H / 2})`}
            >
              <rect
                x={-PANEL_W / 2}
                y={0}
                width={PANEL_W}
                height={PANEL_H}
                rx={24}
                fill={alpha(colors.ink, 0.6)}
                stroke={lit ? colors.highlight : alpha(colors.primary, 0.5)}
                strokeWidth={lit ? 8 : 4}
              />
              {/* the friend, in the corner of the frame */}
              <g opacity={1 - slide}>
                <Person
                  x={-PANEL_W / 2 + 80}
                  y={PANEL_H - 20}
                  color={guestColor(k + 3)}
                  size={0.8}
                  bob={frame / 16 + k}
                />
              </g>
              {/* the toy */}
              {k === 0 ? (
                <Tile
                  x={0}
                  y={250}
                  size={220}
                  rot={90 * tc}
                  labels={false}
                  plain={hide > 0.5}
                />
              ) : null}
              {k === 1 ? (
                <Clock
                  x={0}
                  y={250}
                  r={140}
                  n={4}
                  pos={tc}
                  numbers={hide < 0.5}
                />
              ) : null}
              {k === 2 ? (
                <IDial x={0} y={250} r={120} pos={dial} labels={hide < 0.5} />
              ) : null}
              {/* the same pattern, underneath each one */}
              <g opacity={hide} transform={`translate(0 ${PANEL_H - 90})`}>
                {[0, 1, 2, 3].map((j) => (
                  <circle
                    key={j}
                    cx={-90 + j * 60}
                    cy={0}
                    r={16}
                    fill={
                      Math.round(k === 2 ? dial : tc) % 4 === j
                        ? colors.highlight
                        : alpha(colors.paper, 0.3)
                    }
                  />
                ))}
              </g>
            </g>
          );
        })}
        {/* one question for all three */}
        <g opacity={ask} transform={`translate(960 ${lerp(840, 790, ask)})`}>
          <rect
            x={-220}
            y={-56}
            width={440}
            height={100}
            rx={24}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={5}
          />
          <text
            x={0}
            y={12}
            fill={colors.ink}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.question}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c3 + 30),
          translate: riseIn(frame, c3 + 30, 16),
        }}
      >
        {tx.samePattern}
      </div>
    </SceneShell>
  );
};
