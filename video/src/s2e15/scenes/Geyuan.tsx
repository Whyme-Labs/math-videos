import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 刘徽割圆术 (Liu Hui's commentary on 《九章算术》,
// 263 AD): a regular hexagon inscribed in a circle, the sides doubling to
// 12, 24, 48, 96, 192 with the half-perimeter n·sin(π/n) shown as the
// estimate of π (3, 3.1058, 3.1326, 3.1394, 3.1410, 3.1415). Then one
// orange arrow stepping from vertex to vertex: every step the same turn,
// a multiplication by a number on the unit circle.

const C = { x: 760, y: 470 };
const R = 300;
const NS = [6, 12, 24, 48, 96, 192];

export const Geyuan: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("geyuan");
  const [c0, c1, c2] = cues;
  const doubleAt = [c0 + 20, c0 + 80, c1 + 10, c1 + 34, c1 + 58, c1 + 82];
  const idx = doubleAt.filter((t) => frame >= t).length - 1;
  const n = NS[Math.max(0, idx)];
  const grow = glide(frame, doubleAt[Math.max(0, idx)], fps, 14);
  const poly = Array.from({ length: n + 1 }, (_, k) => {
    const a = (k / n) * Math.PI * 2;
    return `${k ? "L" : "M"} ${(C.x + R * Math.cos(a)).toFixed(1)} ${(C.y - R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  const est = n * Math.sin(Math.PI / n);
  const walker = Math.max(0, frame - c2 - 20) / 18;
  const wk = Math.floor(walker);
  const wa =
    ((wk + glide(frame, c2 + 20 + wk * 18, fps, 10)) / 6) * Math.PI * 2;

  return (
    <SceneShell id="geyuan">
      {doubleAt.map((t, k) => (
        <Sfx key={k} name="pop" at={t} volume={0.12} />
      ))}
      <Sfx name="chime" at={c1 + 40} volume={0.35} />
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={`w${k}`} name="tick" at={c2 + 20 + k * 18} volume={0.1} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={C.x}
          cy={C.y}
          r={R}
          fill="none"
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
        />
        <path
          d={poly}
          fill={alpha(colors.primary, 0.12)}
          stroke={colors.primary}
          strokeWidth={n > 48 ? 4 : 6}
          opacity={fadeIn(frame, c0 + 20)}
          transform={`translate(${C.x} ${C.y}) scale(${0.97 + 0.03 * grow}) translate(${-C.x} ${-C.y})`}
        />
        <g opacity={fadeIn(frame, c2 + 10)}>
          <line
            x1={C.x}
            y1={C.y}
            x2={C.x + R * Math.cos(wa)}
            y2={C.y - R * Math.sin(wa)}
            stroke={colors.orange}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <circle
            cx={C.x + R * Math.cos(wa)}
            cy={C.y - R * Math.sin(wa)}
            r={20}
            fill={colors.orange}
          />
        </g>
        <circle cx={C.x} cy={C.y} r={10} fill={colors.text} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.geyuan}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1240,
          fontFamily: fonts.mono,
          fontSize: 64,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 20),
        }}
      >
        {n} {tx.sides}
        <div style={{ color: colors.green, marginTop: 16 }}>
          π ≈ {est.toFixed(4)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1240,
          fontSize: 52,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 40),
          translate: riseIn(frame, c1 + 40, 14),
        }}
      >
        “{tx.quote}”
      </div>
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 1240,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 30),
          translate: riseIn(frame, c2 + 30, 12),
        }}
      >
        {tx.step}
      </div>
    </SceneShell>
  );
};
