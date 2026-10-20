import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { guestColor } from "../components/hotel";
import { useStrings } from "../i18n";

// The fractions. First a number line where every gap you look into holds
// another fraction (the camera keeps pushing into the gap between 1/2 and
// 1). Then the Calkin–Wilf tree grows as a real tree: 1/1 at the root, each
// a/b sprouting a/(a+b) and (a+b)/b. Then a lantern visits the fruit row by
// row, and each fraction flies down into the next free room.

type F = { p: number; q: number };
const ROWS = 4;
const TREE: F[][] = [[{ p: 1, q: 1 }]];
for (let r = 1; r < ROWS; r++)
  TREE.push(
    TREE[r - 1].flatMap(({ p, q }) => [
      { p, q: p + q },
      { p: p + q, q },
    ]),
  );
const BFS = TREE.flat();
const nodePos = (r: number, i: number) => ({
  x: 210 + ((i + 0.5) * 1500) / 2 ** r,
  y: 200 + r * 130,
});
const ROOM = (k: number) => ({ x: 170 + k * 112, y: 800 });

// mediants between 1/2 and 1/1, deeper each time
const LINE = { x0: 160, x1: 1760, y: 520 };

export const Fractions: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fractions");
  const [c0, c1, c2] = cues;
  // --- dense line, the camera falling into a gap ---
  const dive = Math.max(0, frame - (c0 + 20)) / 50;
  const lineZoom = 2 ** Math.min(dive, 4.5);
  const lineOut = fadeOut(frame, c1, 12);
  const lineX = (v: number) =>
    960 + (v - 0.6667) * (LINE.x1 - LINE.x0) * lineZoom;
  const marks: { v: number; l: string; d: number }[] = [];
  for (let q = 1; q <= 24; q++)
    for (let p = 0; p <= 2 * q; p++) {
      let g = p;
      let h = q;
      while (h) [g, h] = [h, g % h];
      if (g !== 1 && p !== 0) continue;
      if (p === 0 && q !== 1) continue;
      marks.push({ v: p / q, l: `${p}/${q}`, d: q });
    }
  // --- tree ---
  const rowAt = (r: number) => c1 + 10 + r * 26;
  const grow = (r: number) => Math.min(1, springIn(frame, rowAt(r), fps, 12));
  // --- reading into rooms ---
  const readAt = (k: number) => c2 + 10 + k * 7;
  const lantern = BFS.findIndex((_, k) => frame < readAt(k + 1));
  const lk = lantern < 0 ? BFS.length - 1 : lantern;
  const rowOf = (k: number) => Math.floor(Math.log2(k + 1));
  const idxOf = (k: number) => k + 1 - 2 ** rowOf(k);
  const treeZoom = lerp(1, 0.94, glide(frame, c2, fps, 30));

  return (
    <SceneShell id="fractions">
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={k} name="whoosh" at={c0 + 20 + k * 50} volume={0.1} />
      ))}
      {[0, 1, 2, 3].map((r) => (
        <Sfx key={`g${r}`} name={PLUCKS[r + 1]} at={rowAt(r)} volume={0.22} />
      ))}
      {BFS.map((_, k) => (
        <Sfx key={`r${k}`} name="tick" at={readAt(k) + 14} volume={0.12} />
      ))}
      <Sfx name="chime" at={readAt(BFS.length) + 10} />
      <QuestionTray />

      {/* the line where every gap holds another fraction */}
      <AbsoluteFill style={{ opacity: lineOut }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <line
            x1={0}
            y1={LINE.y}
            x2={1920}
            y2={LINE.y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {marks.map((m) => {
            const x = lineX(m.v);
            if (x < -60 || x > 1980) return null;
            // smaller denominators show first; deeper ones appear as we dive
            const show = fadeIn(frame, c0 + 4 + Math.min(m.d, 24) * 9, 10);
            const big = m.d <= 2 ** Math.min(dive + 1.5, 6);
            return (
              <g key={m.l} opacity={show}>
                <circle
                  cx={x}
                  cy={LINE.y}
                  r={m.d <= 3 ? 12 : 7}
                  fill={guestColor(m.d)}
                />
                {big && m.d <= 2 + 2 * dive ? (
                  <text
                    x={x}
                    y={LINE.y - 36}
                    fill={colors.text}
                    fontSize={Math.max(22, 44 - m.d * 1.4)}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {m.l}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 700,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 70),
            translate: riseIn(frame, c0 + 70, 16),
          }}
        >
          {tx.between}
        </div>
      </AbsoluteFill>

      {/* the Calkin–Wilf tree */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <Camera zoom={treeZoom} x={0} y={0}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {/* trunk */}
            <path
              d="M 930 1080 Q 945 700 960 190 Q 975 700 990 1080 Z"
              fill={colors.wood}
              opacity={0.75}
            />
            {TREE.map((row, r) =>
              row.map((_, i) => {
                if (r === 0) return null;
                const a = nodePos(r - 1, Math.floor(i / 2));
                const b = nodePos(r, i);
                const g = grow(r);
                return (
                  <path
                    key={`br${r}-${i}`}
                    d={`M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${a.y} ${lerp(a.x, b.x, g)} ${lerp(a.y, b.y, g)}`}
                    fill="none"
                    stroke={colors.wood}
                    strokeWidth={10 - r * 2}
                    strokeLinecap="round"
                  />
                );
              }),
            )}
            {/* the rooms */}
            <g opacity={fadeIn(frame, c2)}>
              {BFS.map((_, k) => (
                <g key={`room${k}`}>
                  <rect
                    x={ROOM(k).x - 44}
                    y={ROOM(k).y - 76}
                    width={88}
                    height={110}
                    rx={8}
                    fill={colors.wood}
                    stroke={colors.ink}
                    strokeWidth={3}
                  />
                  <text
                    x={ROOM(k).x}
                    y={ROOM(k).y + 70}
                    fill={colors.muted}
                    fontSize={28}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {k}
                  </text>
                </g>
              ))}
            </g>
            {BFS.map((f, k) => {
              const r = rowOf(k);
              const i = idxOf(k);
              const home = nodePos(r, i);
              const g = grow(r);
              const fly = ramp(frame, readAt(k) + 4, 14);
              const room = ROOM(k);
              const p = hop(fly, home.x, home.y, room.x, room.y - 22, 120);
              const sway = 4 * Math.sin(frame / 16 + k);
              return (
                <g
                  key={k}
                  transform={`translate(${p.x + (fly > 0 ? 0 : sway)} ${p.y}) scale(${g * lerp(1, 0.62, fly)})`}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={54}
                    fill={guestColor(k)}
                    stroke={colors.ink}
                    strokeWidth={4}
                  />
                  <text
                    x={0}
                    y={12}
                    fill={colors.ink}
                    fontSize={34}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    {f.p}/{f.q}
                  </text>
                </g>
              );
            })}
            {/* the lantern that reads the tree row by row */}
            {frame >= c2 + 6 && frame < readAt(BFS.length) ? (
              <circle
                cx={nodePos(rowOf(lk), idxOf(lk)).x}
                cy={nodePos(rowOf(lk), idxOf(lk)).y}
                r={64}
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
            top: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            opacity: fadeIn(frame, rowAt(1)) * fadeOut(frame, c2, 10),
            translate: riseIn(frame, rowAt(1), 16),
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 54,
              padding: "10px 30px",
              borderRadius: 20,
              backgroundColor: alpha(colors.bg, 0.85),
              color: colors.primary,
            }}
          >
            a/b → a/(a+b) , (a+b)/b
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
