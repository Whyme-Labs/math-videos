import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// PCA. Sixty data points pop in, a tilted cloud: the rows of a 60 × 2
// matrix (c0). Its first singular direction grows through the cloud as a
// lemon axis, the second, short and perpendicular, in coral, with the
// spread ellipse (c1). Every point drops onto the lemon line along a
// dashed perpendicular: the best line through the cloud (c2). A chip
// reads how much of the spread the first direction carries (c3).

const PTS = Array.from({ length: 60 }, (_, k) => {
  const r = (n: number) => {
    const v = Math.sin(k * 91.7 + n * 47.3) * 9631.17;
    return v - Math.floor(v);
  };
  // Box–Muller for two normal numbers
  const a =
    Math.sqrt(-2 * Math.log(1 - r(1) * 0.98)) * Math.cos(2 * Math.PI * r(2));
  const b =
    Math.sqrt(-2 * Math.log(1 - r(3) * 0.98)) * Math.cos(2 * Math.PI * r(4));
  const t = 0.6;
  const x = 1.4 * a;
  const y = 0.45 * b;
  return {
    x: x * Math.cos(t) - y * Math.sin(t),
    y: x * Math.sin(t) + y * Math.cos(t),
  };
});
const mx = PTS.reduce((s, p) => s + p.x, 0) / PTS.length;
const my = PTS.reduce((s, p) => s + p.y, 0) / PTS.length;
const C = PTS.map((p) => ({ x: p.x - mx, y: p.y - my }));
const sxx = C.reduce((s, p) => s + p.x * p.x, 0);
const syy = C.reduce((s, p) => s + p.y * p.y, 0);
const sxy = C.reduce((s, p) => s + p.x * p.y, 0);
const TH = 0.5 * Math.atan2(2 * sxy, sxx - syy);
const L1 = (sxx + syy) / 2 + Math.hypot((sxx - syy) / 2, sxy);
const L2 = (sxx + syy) / 2 - Math.hypot((sxx - syy) / 2, sxy);
const D1 = { x: Math.cos(TH), y: Math.sin(TH) };
const D2 = { x: -Math.sin(TH), y: Math.cos(TH) };
const SD1 = Math.sqrt(L1 / (PTS.length - 1));
const SD2 = Math.sqrt(L2 / (PTS.length - 1));
const O = { x: 760, y: 470 };
const S = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Pca: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("pca");
  const [c0, c1, c2, c3] = cues;
  const ax = glide(frame, c1 + 6, fps, 30);
  const drop = glide(frame, c2 + 10, fps, 30);
  const share = Math.round((100 * L1) / (L1 + L2));

  return (
    <SceneShell id="pca">
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="thud" at={c2 + 40} volume={0.18} />
      <Sfx name="chime" at={c3 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          transform={`translate(${O.x} ${O.y}) rotate(${(-TH * 180) / Math.PI})`}
          opacity={fadeIn(frame, c1 + 20, 10)}
        >
          <ellipse
            rx={2 * SD1 * S}
            ry={2 * SD2 * S}
            fill={alpha(colors.primary, 0.08)}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={4}
            strokeDasharray="12 10"
          />
        </g>
        <line
          x1={scr(-3.2 * D1.x * ax, -3.2 * D1.y * ax).x}
          y1={scr(-3.2 * D1.x * ax, -3.2 * D1.y * ax).y}
          x2={scr(3.2 * D1.x * ax, 3.2 * D1.y * ax).x}
          y2={scr(3.2 * D1.x * ax, 3.2 * D1.y * ax).y}
          stroke={colors.primary}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <line
          x1={scr(-2 * SD2 * D2.x * ax, -2 * SD2 * D2.y * ax).x}
          y1={scr(-2 * SD2 * D2.x * ax, -2 * SD2 * D2.y * ax).y}
          x2={scr(2 * SD2 * D2.x * ax, 2 * SD2 * D2.y * ax).x}
          y2={scr(2 * SD2 * D2.x * ax, 2 * SD2 * D2.y * ax).y}
          stroke={colors.highlight}
          strokeWidth={8}
          strokeLinecap="round"
        />
        {C.map((p, i) => {
          const t = p.x * D1.x + p.y * D1.y;
          const q = {
            x: lerp(p.x, t * D1.x, drop),
            y: lerp(p.y, t * D1.y, drop),
          };
          const a = scr(p.x, p.y);
          const b = scr(q.x, q.y);
          return (
            <g key={i} opacity={fadeIn(frame, c0 + 6 + (i % 5) * 6, 6)}>
              {drop > 0.02 ? (
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={alpha(colors.green, 0.6)}
                  strokeWidth={3}
                  strokeDasharray="6 5"
                />
              ) : null}
              <circle cx={b.x} cy={b.y} r={11} fill={colors.text} />
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1380,
          fontFamily: fonts.mono,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        60 × 2
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1380,
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 30),
        }}
      >
        {tx.pc1}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1380,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 46,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 10),
          translate: riseIn(frame, c3 + 10, 12),
        }}
      >
        PCA · <span style={{ fontFamily: fonts.mono }}>{share}%</span>{" "}
        {tx.explained}
      </div>
    </SceneShell>
  );
};
