import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Axes, PlotClip, PTS, ps } from "../components/plot";
import { useStrings } from "../i18n";

// Four points and a line y = c + d t. The points pop in (c0). Each one
// lights up in turn and writes its equation c + t·d = y in the list on the
// right (c1). The line through the first two grows across the plot, and
// their rows get ticks: c = 1, d = 2 (c2). At t = 2 the line is at 5 but
// the point is at 4: a red gap opens, the third row turns into 1 + 4 = 4
// and shakes (c3). The line then tries other pairs of points, each time
// leaving a red gap somewhere, while a tag reads 4 equations, 2 unknowns
// (c4).

const PAIRS: [number, number][] = [
  [2, 3],
  [0, 2],
  [1, 3],
];
const through = (i: number, j: number) => {
  const d = (PTS[j].y - PTS[i].y) / (PTS[j].t - PTS[i].t);
  return { c: PTS[i].y - d * PTS[i].t, d };
};

export const Naive: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("naive");
  const [c0, c1, c2, c3, c4] = cues;
  // which line: the first pair, then the other pairs in turn
  const k = Math.min(2, Math.max(-1, Math.floor((frame - c4 - 10) / 40)));
  const from = k <= 0 ? through(0, 1) : through(...PAIRS[k - 1]);
  const to = k < 0 ? through(0, 1) : through(...PAIRS[k]);
  const kt = k < 0 ? 1 : glide(frame, c4 + 10 + k * 40, fps, 18);
  const L = { c: lerp(from.c, to.c, kt), d: lerp(from.d, to.d, kt) };
  const grow = glide(frame, c2 + 6, fps, 30);
  const xEnd = lerp(-0.3, 3.5, grow);
  const a = ps(-0.3, L.c - 0.3 * L.d);
  const b = ps(xEnd, L.c + xEnd * L.d);
  const gaps = frame >= c3 + 6;
  const row3 = frame >= c3 + 10;
  const shk = shake(frame, c3 + 14, 14);

  return (
    <SceneShell id="naive">
      {PTS.map((_, i) => (
        <Sfx key={i} name="pop" at={c0 + 8 + i * 6} volume={0.12} />
      ))}
      {PTS.map((_, i) => (
        <Sfx key={`r${i}`} name="tick" at={c1 + 6 + i * 14} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 30} volume={0.14} />
      <Sfx name="thud" at={c3 + 14} volume={0.26} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`w${i}`} name="whoosh" at={c4 + 10 + i * 40} volume={0.08} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Axes opacity={fadeIn(frame, c0 + 2, 10)} />
        {/* the line */}
        <PlotClip />
        <g opacity={fadeIn(frame, c2 + 6, 6)} clipPath="url(#plotclip)">
          <line
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={colors.primary}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {PTS.map((p, i) => {
            const q = ps(p.t, L.c + p.t * L.d);
            const miss = Math.abs(p.y - (L.c + p.t * L.d)) > 0.05;
            return gaps && miss && p.t <= xEnd ? (
              <line
                key={i}
                x1={q.x}
                y1={q.y}
                x2={ps(p.t, p.y).x}
                y2={ps(p.t, p.y).y}
                stroke={colors.red}
                strokeWidth={7}
                strokeLinecap="round"
              />
            ) : null;
          })}
        </g>
        {PTS.map((p, i) => {
          const s = ps(p.t, p.y);
          const lit = frame >= c1 + 6 + i * 14 && frame < c1 + 6 + i * 14 + 14;
          return (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={
                16 * Math.min(1.2, springIn(frame, c0 + 8 + i * 6, fps)) +
                (lit ? 6 : 0)
              }
              fill={lit ? colors.primary : colors.text}
            />
          );
        })}
      </svg>
      {/* the four equations */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {PTS.map((p, i) => {
          const ok = frame >= c2 + 30 && i < 2;
          const bad = row3 && i === 2;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                fontFamily: fonts.math,
                fontSize: 64,
                fontWeight: 800,
                color: bad ? colors.red : colors.text,
                opacity: fadeIn(frame, c1 + 6 + i * 14, 8),
                translate: `${bad ? shk : 0}px ${riseIn(frame, c1 + 6 + i * 14, 14).split(" ")[1]}`,
              }}
            >
              <span style={{ width: 420 }}>
                {bad ? "1 + 4 = 4" : `c + ${p.t}d = ${p.y}`}
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  color: bad ? colors.red : colors.green,
                  opacity: ok || bad ? 1 : 0,
                }}
              >
                {bad ? "✗" : "✓"}
              </span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
        }}
      >
        y = c + d t
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 1180,
          padding: "12px 28px",
          borderRadius: 16,
          border: `5px solid ${colors.highlight}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c4 + 6, 10),
          translate: riseIn(frame, c4 + 6, 14),
        }}
      >
        4 × 2 · {tx.noSolution}
      </div>
    </SceneShell>
  );
};
