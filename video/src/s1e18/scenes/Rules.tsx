import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The ring rules. A 2 × 5 grid of tiles is a(b + c) with a = 2, b = 3,
// c = 2; a cut slides down between the third and fourth columns and the
// grid splits into 2 × 3 and 2 × 2, the same tiles, regrouped. Then minus
// times minus: on the number line an arrow from 0 to 1; times −1 swings it
// half a turn to −1, times −1 again swings it home to 1.

const CELL = 110;
const G = { x: 560, y: 300 };

export const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rules");
  const [c0, c1] = cues;
  const tileAt = (k: number) => c0 + 10 + k * 3;
  const cut = glide(frame, c0 + 50, fps, 16);
  const apart = glide(frame, c0 + 70, fps, 16);
  const part1 = fadeOut(frame, c1, 10);
  // −1 × −1: two half turns
  const turn1 = glide(frame, c1 + 30, fps, 18);
  const turn2 = glide(frame, c1 + 70, fps, 18);
  const angle = 180 * (turn1 + turn2);
  const done = Math.min(1, springIn(frame, c1 + 92, fps, 10));

  return (
    <SceneShell id="rules">
      {Array.from({ length: 10 }).map((_, k) => (
        <Sfx key={k} name="tick" at={tileAt(k)} volume={0.08} />
      ))}
      <Sfx name="scratch" at={c0 + 50} volume={0.2} />
      <Sfx name="whoosh" at={c0 + 70} volume={0.14} />
      <Sfx name="ding" at={c0 + 90} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 70} volume={0.14} />
      <Sfx name="chime" at={c1 + 92} />

      {/* a(b + c) = ab + ac, as tiles */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 10 }).map((_, k) => {
            const r = Math.floor(k / 5);
            const c = k % 5;
            const right = c >= 3;
            const s = Math.min(1, springIn(frame, tileAt(k), fps, 10));
            const x = G.x + c * CELL + (right ? 120 * apart : 0);
            return <rect key={k} x={x + 4} y={G.y + r * CELL + 4} width={(CELL - 8) * s} height={(CELL - 8) * s} rx={12} fill={right && apart > 0.5 ? colors.orange : colors.primary} stroke={colors.ink} strokeWidth={4} />;
          })}
          {/* the cut */}
          <line x1={G.x + 3 * CELL + 60 * apart} y1={lerp(G.y - 40, G.y - 40, cut)} x2={G.x + 3 * CELL + 60 * apart} y2={lerp(G.y - 40, G.y + 2 * CELL + 40, cut)} stroke={colors.red} strokeWidth={6} strokeDasharray="14 10" />
          {/* side labels */}
          <text x={G.x - 40} y={G.y + CELL + 16} fill={colors.text} fontSize={56} textAnchor="middle" fontFamily={fonts.math} fontWeight={800} opacity={fadeIn(frame, c0 + 30)}>
            a
          </text>
          <text x={G.x + 1.5 * CELL} y={G.y + 2 * CELL + 70} fill={colors.primary} fontSize={56} textAnchor="middle" fontFamily={fonts.math} fontWeight={800} opacity={fadeIn(frame, c0 + 34)}>
            b
          </text>
          <text x={G.x + 4 * CELL + 120 * apart} y={G.y + 2 * CELL + 70} fill={apart > 0.5 ? colors.orange : colors.primary} fontSize={56} textAnchor="middle" fontFamily={fonts.math} fontWeight={800} opacity={fadeIn(frame, c0 + 38)}>
            c
          </text>
        </svg>
        <div style={{ position: "absolute", top: 110, width: "100%", textAlign: "center", fontFamily: fonts.math, fontSize: 72, fontWeight: 800, color: colors.text, opacity: fadeIn(frame, c0 + 90), translate: riseIn(frame, c0 + 90, 16) }}>
          {tx.spreads}
        </div>
      </AbsoluteFill>

      {/* minus times minus */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line x1={260} y1={520} x2={1660} y2={520} stroke={colors.muted} strokeWidth={4} />
          {[-2, -1, 0, 1, 2].map((n) => (
            <g key={n}>
              <line x1={960 + n * 300} y1={500} x2={960 + n * 300} y2={540} stroke={colors.muted} strokeWidth={4} />
              <text x={960 + n * 300} y={600} fill={colors.text} fontSize={48} textAnchor="middle" fontFamily={fonts.math} fontWeight={700}>
                {n < 0 ? `−${-n}` : n}
              </text>
            </g>
          ))}
          <g transform={`translate(960 520) rotate(${-angle})`}>
            <line x1={0} y1={0} x2={270} y2={0} stroke={colors.highlight} strokeWidth={14} strokeLinecap="round" />
            <polygon points="270,-26 310,0 270,26" fill={colors.highlight} />
          </g>
          <circle cx={960} cy={520} r={14} fill={colors.ink} />
          {[
            { t: "× (−1)", at: c1 + 30, x: 960, y: 320 },
            { t: "× (−1)", at: c1 + 70, x: 960, y: 720 },
          ].map((l, k) => (
            <text key={k} x={l.x} y={l.y} fill={colors.text} fontSize={52} textAnchor="middle" fontFamily={fonts.math} fontWeight={800} opacity={fadeIn(frame, l.at) * fadeOut(frame, l.at + 30, 10)}>
              {l.t}
            </text>
          ))}
          <path d="M 1230 470 A 270 270 0 0 0 690 470" fill="none" stroke={alpha(colors.highlight, 0.6)} strokeWidth={5} strokeDasharray="12 10" opacity={turn1 > 0 && turn1 < 1 ? 1 : 0} />
          <g opacity={done} transform={`translate(960 210) scale(${done})`}>
            <text x={0} y={0} fill={colors.green} fontSize={80} textAnchor="middle" fontFamily={fonts.math} fontWeight={800}>
              (−1) × (−1) = 1
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
