import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The story. A night sky; a dot crawls along its path among the stars and
// Piazzi's observation marks drop behind it (c0). The Sun's glare swells
// and swallows the dot (c1). The marks are all that's left, and the path
// ahead is a question mark (c2). Each mark gets a little error bar: every
// measurement is slightly off (c3). Candidate orbits swing through; each
// one leaves red misses somewhere and shakes (c4). Gauss, 24 (c5). The
// misses grow into squares, their total area is read out live, and the
// curve slides to the place where that total is smallest (c6). In
// December the glare clears, the curve runs on, and at its end the dot
// reappears inside a ping: Ceres (c7).

const XS = [300, 410, 520, 630, 740, 850, 960, 1070];
const NOISE = [34, -28, 22, -38, 18, 30, -26, 20];
const truth = (x: number) => 640 - 0.32 * (x - 300) + 0.00018 * (x - 300) ** 2;
const OBS = XS.map((x, i) => ({ x, y: truth(x) + NOISE[i] }));

// best quadratic y = a + b u + c u², u = (x − 700)/400, by the normal
// equations (a 3 × 3 solve)
const U = (x: number) => (x - 700) / 400;
const BEST = (() => {
  const M = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const r = [0, 0, 0];
  for (const o of OBS) {
    const u = U(o.x);
    const v = [1, u, u * u];
    for (let i = 0; i < 3; i++) {
      r[i] += v[i] * o.y;
      for (let j = 0; j < 3; j++) M[i][j] += v[i] * v[j];
    }
  }
  // Gaussian elimination
  for (let i = 0; i < 3; i++)
    for (let k = i + 1; k < 3; k++) {
      const f = M[k][i] / M[i][i];
      for (let j = i; j < 3; j++) M[k][j] -= f * M[i][j];
      r[k] -= f * r[i];
    }
  const s = [0, 0, 0];
  for (let i = 2; i >= 0; i--) {
    let t = r[i];
    for (let j = i + 1; j < 3; j++) t -= M[i][j] * s[j];
    s[i] = t / M[i][i];
  }
  return s;
})();
const best = (x: number) => {
  const u = U(x);
  return BEST[0] + BEST[1] * u + BEST[2] * u * u;
};
// wrong orbits: the best one plus an offset and a tilt
const WRONG = [
  [70, 0],
  [-40, 60],
  [10, -70],
];

const star = (k: number) => {
  const r = (n: number) => {
    const v = Math.sin(k * 127.1 + n * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  return { x: r(1) * 1920, y: r(2) * 820, s: 1.5 + r(3) * 3, tw: r(4) };
};
const STARS = Array.from({ length: 130 }, (_, k) => star(k));
const SUN = { x: 1380, y: 500 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  // the dot's crawl, from c0 into the glare after c1
  const crawl = ramp(frame, c0 + 10, c1 + 50 - (c0 + 10));
  const dx = lerp(260, 1380, crawl);
  const glare =
    glide(frame, c1 + 4, fps, 40) * (1 - glide(frame, c7 + 4, fps, 30));
  const dotOp = fadeIn(frame, c0 + 6, 8) * (1 - ramp(frame, c1 + 30, 20));
  const bars = fadeIn(frame, c3 + 6, 10);
  const jitter = frame >= c3 && frame < c4 ? 1 : 0;
  // candidate orbits: c4 swings through three wrong ones
  const k = Math.min(2.999, Math.max(0, (frame - c4 - 10) / 38));
  const ki = Math.floor(k);
  const kf = glide(frame, c4 + 10 + ki * 38, fps, 18);
  const prev = ki === 0 ? [0, 120] : WRONG[ki - 1];
  const cur = WRONG[ki];
  const settle = glide(frame, c6 + 20, fps, 50);
  const off0 = lerp(prev[0], cur[0], kf);
  const off1 = lerp(prev[1], cur[1], kf);
  const off = { a: lerp(off0, 0, settle), b: lerp(off1, 0, settle) };
  const orbit = (x: number) => best(x) + off.a + off.b * U(x);
  const curveOp = fadeIn(frame, c4 + 6, 10);
  const sq = fadeIn(frame, c6 + 6, 12);
  const sum = OBS.reduce((s, o) => s + ((o.y - orbit(o.x)) / 10) ** 2, 0);
  const shk =
    shake(frame, c4 + 28, 10) +
    shake(frame, c4 + 66, 10) +
    shake(frame, c4 + 104, 10);
  const extend = glide(frame, c7 + 10, fps, 40);
  const xEnd = lerp(1100, 1700, extend);
  const ping = Math.max(0, frame - c7 - 50);
  const found = fadeIn(frame, c7 + 50, 8);
  const pathD = (f: (x: number) => number, x0: number, x1: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 40;
      return `${i ? "L" : "M"} ${x.toFixed(1)} ${f(x).toFixed(1)}`;
    }).join(" ");

  return (
    <SceneShell id="coldOpen">
      {OBS.map((o, i) => (
        <Sfx
          key={i}
          name="tick"
          at={c0 + 10 + ((o.x - 260) / 1120) * (c1 + 40 - c0)}
          volume={0.1}
        />
      ))}
      <Sfx name="riser" at={c1 + 4} volume={0.1} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />
      <Sfx name="thud" at={c4 + 28} volume={0.2} />
      <Sfx name="thud" at={c4 + 66} volume={0.2} />
      <Sfx name="thud" at={c4 + 104} volume={0.2} />
      <Sfx name="pop" at={c5 + 6} volume={0.12} />
      <Sfx name="pop" at={c6 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c6 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c7 + 10} volume={0.1} />
      <Sfx name="chime" at={c7 + 50} volume={0.35} />

      <AbsoluteFill>
        <svg width={1920} height={1080}>
          <defs>
            <radialGradient id="glare">
              <stop offset="0%" stopColor="#fff6c8" stopOpacity={1} />
              <stop
                offset="30%"
                stopColor={colors.primary}
                stopOpacity={0.55}
              />
              <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
            </radialGradient>
          </defs>
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.s}
              fill={colors.paper}
              opacity={
                0.25 + 0.35 * (0.5 + 0.5 * Math.sin(frame * 0.05 + s.tw * 6.28))
              }
            />
          ))}
          <circle
            cx={SUN.x}
            cy={SUN.y}
            r={lerp(0, 330, glare)}
            fill="url(#glare)"
          />
          {/* the dashed road ahead, unknown */}
          <path
            d={pathD(truth, 1080, 1380)}
            fill="none"
            stroke={alpha(colors.highlight, 0.8)}
            strokeWidth={5}
            strokeDasharray="12 12"
            opacity={fadeIn(frame, c2 + 6, 10) * (1 - curveOp)}
          />
          <text
            x={1230}
            y={truth(1230) - 40}
            fill={colors.highlight}
            fontSize={90}
            fontWeight={800}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c2 + 16, 10) * (1 - curveOp)}
          >
            ?
          </text>
          {/* a candidate orbit, then the best one */}
          <g opacity={curveOp} transform={`translate(${shk} 0)`}>
            <path
              d={pathD(orbit, 200, xEnd)}
              fill="none"
              stroke={settle > 0.9 ? colors.green : colors.primary}
              strokeWidth={6}
            />
            {OBS.map((o, i) => {
              const y = orbit(o.x);
              const m = o.y - y;
              return (
                <g key={i}>
                  <rect
                    x={o.x}
                    y={Math.min(o.y, y)}
                    width={Math.abs(m)}
                    height={Math.abs(m)}
                    fill={alpha(colors.orange, 0.35)}
                    stroke={colors.orange}
                    strokeWidth={3}
                    opacity={sq}
                  />
                  <line
                    x1={o.x}
                    y1={o.y}
                    x2={o.x}
                    y2={y}
                    stroke={colors.red}
                    strokeWidth={5}
                  />
                </g>
              );
            })}
          </g>
          {/* the observations */}
          {OBS.map((o, i) => {
            const seen = dx >= o.x;
            const j = jitter ? 6 * Math.sin(frame * 0.9 + i * 2) : 0;
            return (
              <g key={i} opacity={seen ? 1 : 0}>
                <line
                  x1={o.x}
                  y1={o.y - 40}
                  x2={o.x}
                  y2={o.y + 40}
                  stroke={alpha(colors.highlight, 0.8)}
                  strokeWidth={4}
                  opacity={bars}
                />
                <circle cx={o.x} cy={o.y + j} r={11} fill={colors.text} />
              </g>
            );
          })}
          {/* the moving dot, and Ceres found */}
          <circle
            cx={dx}
            cy={truth(dx)}
            r={13}
            fill={colors.primary}
            opacity={dotOp}
          />
          <circle
            cx={1700}
            cy={best(1700)}
            r={14}
            fill={colors.primary}
            opacity={found}
          />
          {[0, 1].map((n) => {
            const t = (ping - n * 18) / 40;
            return t > 0 && t < 1 ? (
              <circle
                key={n}
                cx={1700}
                cy={best(1700)}
                r={20 + t * 110}
                fill="none"
                stroke={colors.primary}
                strokeWidth={5}
                opacity={1 - t}
              />
            ) : null;
          })}
        </svg>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c5, 10),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {tx.date}
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.muted,
            marginTop: 8,
          }}
        >
          {tx.piazzi}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: SUN.y - 230,
          left: SUN.x - 200,
          width: 400,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity:
            fadeIn(frame, c1 + 30, 10) * (1 - glide(frame, c7 + 4, fps, 20)),
        }}
      >
        {tx.sun}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c5 + 6) * fadeOut(frame, c7, 10),
          translate: riseIn(frame, c5 + 6, 16),
        }}
      >
        {tx.gauss}
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: sq * fadeOut(frame, c7, 10),
        }}
      >
        {tx.sumSq}:{" "}
        <span style={{ fontFamily: fonts.mono }}>{sum.toFixed(1)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          opacity: fadeIn(frame, c7 + 50),
          translate: riseIn(frame, c7 + 50, 16),
        }}
      >
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {tx.december}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            marginTop: 8,
          }}
        >
          {tx.ceres}
        </div>
      </div>
    </SceneShell>
  );
};
