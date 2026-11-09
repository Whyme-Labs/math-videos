import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The three escapes, side by side, each over a fixed probe g (a faint
// orange curve) with the reading ∫ fₙ g below (c0). Travelling: a block
// slides off to the right (c1). Concentrating: √n on [0, 1/n], taller
// and thinner (c2). Oscillating: sin(nx) with n climbing (c3). All three
// readings sink to 0 and turn green (c4). The third panel switches to
// sin²(nx): it settles on a dashed line at ½, not 0 (c5).

const W = 500;
const H = 300;
const TOP = 260;
const LEFT = [120, 710, 1300];
const BASE = TOP + H;
const integrate = (f: (x: number) => number, a: number, b: number) => {
  let s = 0;
  const N = 400;
  for (let i = 0; i < N; i++) s += f(a + ((i + 0.5) * (b - a)) / N);
  return (s * (b - a)) / N;
};

export const Escapes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("escapes");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const t = Math.max(0, (frame - c1 - 6) / 30);
  const travel = (x: number) => (x >= t && x <= t + 1 ? 1 : 0);
  const g1 = (x: number) => Math.exp(-((x - 2) ** 2) / 2);
  const n2 = Math.min(900, 1 + Math.max(0, (frame - c2 - 6) / 8) ** 2);
  const conc = (x: number) => (x <= 1 / n2 ? Math.sqrt(n2) : 0);
  const g2 = (x: number) => 0.6 + 0.4 * Math.cos(3 * x);
  const n3 = Math.min(40, 1 + Math.max(0, Math.floor((frame - c3 - 6) / 6)));
  const sq = frame >= c5 + 6;
  const osc = (x: number) => (sq ? Math.sin(n3 * x) ** 2 : Math.sin(n3 * x));
  const g3 = (x: number) => Math.exp(-((x - 3) ** 2));
  const r1 = integrate((x) => travel(x) * g1(x), 0, 12);
  const r2 = integrate((x) => conc(x) * g2(x), 0, 1);
  const r3 =
    integrate((x) => osc(x) * g3(x), 0, 2 * Math.PI) /
    integrate(g3, 0, 2 * Math.PI);
  const panels = [
    { head: tx.travel, at: c1, f: travel, g: g1, a: 0, b: 8, ys: 150, r: r1 },
    { head: tx.concentrate, at: c2, f: conc, g: g2, a: 0, b: 1, ys: 50, r: r2 },
    {
      head: tx.oscillate,
      at: c3,
      f: osc,
      g: g3,
      a: 0,
      b: 2 * Math.PI,
      ys: 110,
      r: r3,
    },
  ];
  const ok = frame >= c4 + 10;

  return (
    <SceneShell id="escapes">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 8} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c3 + 6} volume={0.12} />
      <Sfx name="ding" at={c4 + 10} volume={0.22} />
      <Sfx name="thud" at={c5 + 6} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          {LEFT.map((x, i) => (
            <clipPath key={i} id={`es-${i}`}>
              <rect x={x} y={TOP - 80} width={W} height={H + 100} />
            </clipPath>
          ))}
        </defs>
        {panels.map((p, i) => {
          const X = (x: number) => LEFT[i] + (W * (x - p.a)) / (p.b - p.a);
          const curve = (h: (x: number) => number, ys: number) =>
            Array.from({ length: 601 }, (_, k) => {
              const x = p.a + ((p.b - p.a) * k) / 600;
              return `${k ? "L" : "M"} ${X(x)} ${BASE - ys * h(x)}`;
            }).join(" ");
          return (
            <g key={i} opacity={fadeIn(frame, c0 + 6 + i * 8, 8)}>
              <rect
                x={LEFT[i] - 20}
                y={TOP - 120}
                width={W + 40}
                height={H + 190}
                rx={24}
                fill={alpha(colors.paper, 0.05)}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={3}
              />
              <text
                x={LEFT[i] + W / 2}
                y={TOP - 70}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={40}
                fontFamily={fonts.body}
                fontWeight={700}
              >
                {p.head}
              </text>
              <line
                x1={LEFT[i]}
                y1={BASE}
                x2={LEFT[i] + W}
                y2={BASE}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              <path
                d={curve(p.g, 120)}
                fill="none"
                stroke={alpha(colors.orange, 0.6)}
                strokeWidth={4}
              />
              {i === 2 && sq && (
                <line
                  x1={LEFT[i]}
                  y1={BASE - 55}
                  x2={LEFT[i] + W}
                  y2={BASE - 55}
                  stroke={colors.green}
                  strokeWidth={3}
                  strokeDasharray="10 8"
                />
              )}
              <g clipPath={`url(#es-${i})`} opacity={frame >= p.at ? 1 : 0.25}>
                <path
                  d={curve(p.f, p.ys)}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={i === 2 ? 3 : 5}
                />
              </g>
            </g>
          );
        })}
      </svg>
      {panels.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: BASE + 20,
            left: LEFT[i],
            width: W,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 34,
            fontWeight: 800,
            color:
              i === 2 && sq ? colors.green : ok ? colors.green : colors.text,
            opacity: fadeIn(frame, p.at + 6),
            whiteSpace: "nowrap",
          }}
        >
          ∫ fₙ g = {p.r.toFixed(3)}{" "}
          {ok && !(i === 2 && sq) ? "→ 0" : i === 2 && sq ? "→ ½" : ""}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 750,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 14),
          whiteSpace: "nowrap",
        }}
      >
        ‖fₙ‖ = const · fₙ ⇀ 0
      </div>
    </SceneShell>
  );
};
