import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Axes, PlotClip, PTS, PY, ps } from "../components/plot";
import { useStrings } from "../i18n";

// The normal equations on the four points. A line wanders over the data;
// each miss is drawn as a real square and the total area is read out live
// (c0). The misses form one arrow e; its overlap with each column of A,
// the all-ones column and the t column, is read out too, and goes green
// only when it hits 0 (c1). The formula: Aᵀe = 0 → Aᵀ(b − Ax) = 0 →
// AᵀAx = Aᵀb (c2), then x = (1.5, 1) as the line settles on y = 1.5 + t
// and both overlaps land on 0 (c3). The misses −½, ½, ½, −½ label their
// gaps and add up tip to tail back to zero (c4). The four squares are a
// quarter each: total 1. A nudge of the line makes it grow, and it comes
// back (c5).

const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });
const BEST = { c: 1.5, d: 1 };

export const Normal: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("normal");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const w = Math.max(0, frame - c0) * 0.045;
  const settle = glide(frame, c3 + 20, fps, 40);
  const bump =
    frame > c5 + 40
      ? Math.sin(Math.min(1, (frame - c5 - 40) / 50) * Math.PI)
      : 0;
  const L = {
    c: lerp(1.5 + 0.7 * Math.sin(w), BEST.c, settle) + 0.5 * bump,
    d: lerp(1 + 0.35 * Math.sin(1.3 * w + 1), BEST.d, settle) - 0.15 * bump,
  };
  const e = PTS.map((p) => p.y - (L.c + L.d * p.t));
  const total = e.reduce((s, v) => s + v * v, 0);
  const e1 = e.reduce((s, v) => s + v, 0);
  const et = e.reduce((s, v, i) => s + v * PTS[i].t, 0);
  const a = ps(-0.3, L.c - 0.3 * L.d);
  const b = ps(3.5, L.c + 3.5 * L.d);
  const cols = fadeIn(frame, c1 + 6, 10);
  const chain = fadeIn(frame, c4 + 20, 10) * fadeOut(frame, c5 + 30, 10);
  const halves = ["−½", "½", "½", "−½"];
  const steps: Tok[][] = [
    [tok("A", "Aᵀ"), tok("e", "e", colors.green), tok("eq", " = 0")],
    [
      tok("A", "Aᵀ"),
      tok("(", "("),
      tok("b", "b"),
      tok("m", " − "),
      tok("Ax", "Ax"),
      tok(")", ")"),
      tok("eq", " = 0"),
    ],
    [
      tok("A", "Aᵀ"),
      tok("Ax", "Ax"),
      tok("eq", " = "),
      tok("A2", "Aᵀ"),
      tok("b", "b"),
    ],
    [tok("x", "x"), tok("eq", " = "), tok("v", "(1.5, 1)", colors.primary)],
  ];
  const zero = (v: number) => Math.abs(v) < 0.02;

  return (
    <SceneShell id="normal">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 50} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 100} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="ding" at={c3 + 55} volume={0.3} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="tick" at={c4 + 24 + i * 10} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c5 + 40} volume={0.08} />
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Axes />
        <PlotClip />
        <line
          clipPath="url(#plotclip)"
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={settle > 0.95 && bump < 0.02 ? colors.green : colors.primary}
          strokeWidth={7}
          strokeLinecap="round"
        />
        {PTS.map((p, i) => {
          const s = ps(p.t, p.y);
          const q = ps(p.t, L.c + L.d * p.t);
          const side = Math.abs(e[i]) * PY;
          return (
            <g key={i}>
              <rect
                x={s.x}
                y={Math.min(s.y, q.y)}
                width={side}
                height={side}
                fill={alpha(colors.orange, 0.3)}
                stroke={colors.orange}
                strokeWidth={3}
              />
              <line
                x1={s.x}
                y1={s.y}
                x2={q.x}
                y2={q.y}
                stroke={colors.red}
                strokeWidth={6}
              />
              <circle cx={s.x} cy={s.y} r={15} fill={colors.text} />
              <text
                x={i === 0 ? s.x + side + 14 : s.x - 22}
                y={(s.y + q.y) / 2 + 14}
                fill={colors.red}
                fontSize={40}
                fontFamily={fonts.math}
                fontWeight={800}
                textAnchor={i === 0 ? "start" : "end"}
                opacity={
                  fadeIn(frame, c4 + 6, 10) * fadeOut(frame, c5 + 30, 10)
                }
              >
                {halves[i]}
              </text>
            </g>
          );
        })}
        {/* the misses tip to tail, back to zero */}
        <g opacity={chain}>
          <line
            x1={1240}
            y1={720}
            x2={1760}
            y2={720}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {e.map((v, i) => {
            const before = e.slice(0, i).reduce((s, u) => s + u, 0);
            const g = glide(frame, c4 + 24 + i * 10, fps, 12);
            const x = 1300 + i * 120;
            const y0 = 720 - before * 160;
            const y1 = 720 - (before + v * g) * 160;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={y0}
                  x2={x + 120 * g}
                  y2={y1}
                  stroke={colors.red}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
                <circle cx={x + 120 * g} cy={y1} r={8} fill={colors.red} />
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1180,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 6, 10),
        }}
      >
        {tx.total}:{" "}
        <span
          style={{
            fontFamily: fonts.mono,
            color:
              zero(total - 1) && settle > 0.95 ? colors.green : colors.orange,
          }}
        >
          {total.toFixed(2)}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          opacity: cols,
          translate: riseIn(frame, c1 + 6, 12),
        }}
      >
        <div style={{ color: zero(e1) ? colors.green : colors.text }}>
          e · (1, 1, 1, 1) ={" "}
          <span style={{ fontFamily: fonts.mono }}>{e1.toFixed(2)}</span>
        </div>
        <div style={{ color: zero(et) ? colors.green : colors.text }}>
          e · (0, 1, 2, 3) ={" "}
          <span style={{ fontFamily: fonts.mono }}>{et.toFixed(2)}</span>
        </div>
      </div>
      <Eq
        steps={steps}
        at={[c2 + 6, c2 + 50, c2 + 100, c3 + 10]}
        x={1500}
        y={400}
        size={76}
        family={fonts.body}
      />
    </SceneShell>
  );
};
