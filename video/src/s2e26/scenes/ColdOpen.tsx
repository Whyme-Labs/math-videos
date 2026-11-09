import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Fourier series that behave and one that doesn't. Waves stack up into a
// tent |x| (c0); the partial sums close in on it, the error shrinking
// (c1). Chip: every continuous f? (c2). A new curve, du Bois-Reymond's,
// with its partial sums at 0 shown as bars that keep climbing (c3); it is
// built from layers of wiggles, shown peeled apart (c4). A card: Banach &
// Steinhaus 1927 with a three-line proof (c5); the bad function's curve is
// replaced by "f = ?" (c6). Chip: completeness (c7).

const PX = 160;
const PW = 1000;
const PY = 560;
const sx = (x: number) => PX + (PW * (x + Math.PI)) / (2 * Math.PI);
const tent = (x: number, n: number) => {
  let s = Math.PI / 2;
  for (let k = 0; k <= n; k++)
    s -= ((4 / Math.PI) * Math.cos((2 * k + 1) * x)) / (2 * k + 1) ** 2;
  return s;
};
const LAYERS = [1, 3, 9, 27];
const bad = (x: number, upto = 4) => {
  let s = 0;
  for (let k = 0; k < upto; k++)
    s +=
      (0.55 / (k + 1)) *
      Math.sin(LAYERS[k] * 2 * x) *
      Math.exp(-((x * LAYERS[k]) ** 2) / 8);
  return s;
};
const curve = (g: (x: number) => number, y0: number, h: number) =>
  Array.from({ length: 301 }, (_, i) => {
    const x = -Math.PI + (2 * Math.PI * i) / 300;
    return `${i ? "L" : "M"} ${sx(x)} ${y0 - h * g(x)}`;
  }).join(" ");
// partial sums at 0 for the bad function: slow, bumpy growth
const BARS = Array.from(
  { length: 24 },
  (_, n) => 0.3 + 0.55 * Math.log(1 + n) + 0.25 * Math.sin(n * 1.7),
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10);
  const nA =
    frame < c1
      ? Math.min(3, Math.floor((frame - c0) / 25))
      : Math.min(12, 3 + Math.floor((frame - c1 - 6) / 10));
  const bars = Math.min(
    BARS.length,
    Math.max(0, Math.floor((frame - c3 - 10) / 4)),
  );
  const peel = glide(frame, c4 + 6, fps, 24) * (1 - glide(frame, c5, fps, 16));
  const gone = fadeIn(frame, c6 + 6, 10);

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pluck1" at={c0 + 25 * i + 4} volume={0.1} />
      ))}
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx
          key={i}
          name="tick"
          at={c3 + 12 + i * 12}
          volume={0.06 + i * 0.01}
        />
      ))}
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="page" at={c5 + 6} volume={0.18} />
      <Sfx name="scratch" at={c6 + 6} volume={0.12} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={curve((x) => Math.abs(x), PY, 100)}
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={10}
          />
          {frame < c1 &&
            Array.from({ length: nA + 1 }, (_, k) => (
              <path
                key={k}
                d={curve(
                  (x) =>
                    ((4 / Math.PI) * Math.cos((2 * k + 1) * x)) /
                    (2 * k + 1) ** 2,
                  PY + 170,
                  60,
                )}
                fill="none"
                stroke={alpha(colors.orange, 0.7)}
                strokeWidth={3}
              />
            ))}
          <path
            d={curve((x) => tent(x, nA), PY, 100)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: PX,
            fontFamily: fonts.title,
            fontSize: 54,
            fontWeight: 700,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4),
          }}
        >
          {tx.fourier1807}
        </div>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 1240,
            fontFamily: fonts.mono,
            fontSize: 42,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 6),
            whiteSpace: "nowrap",
          }}
        >
          n = {2 * nA + 1} · err {(4 / (Math.PI * (2 * nA + 3))).toFixed(3)}
        </div>
        <Chip frame={frame} at={c2 + 6} x={1240} y={240} color={colors.text}>
          {tx.everyContinuous}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={330}
            x2={PX + PW}
            y2={330}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <g opacity={1 - gone}>
            <path
              d={curve((x) => bad(x), 330, 140)}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
            />
            {LAYERS.map((_, k) => (
              <path
                key={k}
                d={curve(
                  (x) => bad(x, k + 1) - bad(x, k),
                  330 + peel * (120 + 90 * k),
                  140,
                )}
                fill="none"
                stroke={alpha(colors.orange, 0.8)}
                strokeWidth={3}
                opacity={peel}
              />
            ))}
          </g>
          <line
            x1={sx(0)}
            y1={200}
            x2={sx(0)}
            y2={460}
            stroke={colors.red}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <g opacity={1 - peel}>
            <line
              x1={PX}
              y1={800}
              x2={PX + PW}
              y2={800}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
            />
            {Array.from({ length: bars }, (_, n) => (
              <rect
                key={n}
                x={PX + 8 + n * 41}
                y={800 - 110 * BARS[n]}
                width={30}
                height={110 * BARS[n]}
                fill={colors.red}
                opacity={0.85}
              />
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: PX,
            fontFamily: fonts.title,
            fontSize: 50,
            fontWeight: 700,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 6),
          }}
        >
          {tx.dbr1873}
        </div>
        <div
          style={{
            position: "absolute",
            top: 470,
            left: PX,
            fontFamily: fonts.math,
            fontSize: 40,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c3 + 30) * (1 - peel),
            whiteSpace: "nowrap",
          }}
        >
          Sₙ f(0) →
        </div>
        <div
          style={{
            position: "absolute",
            top: 290,
            left: sx(0) - 60,
            width: 120,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.highlight,
            opacity: gone,
          }}
        >
          f = ?
        </div>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1220,
            width: 600,
            padding: "26px 34px",
            borderRadius: 20,
            background: alpha(colors.paper, 0.94),
            color: colors.ink,
            opacity: fadeIn(frame, c5 + 6),
            translate: `${(1 - fadeIn(frame, c5 + 6, 14)) * 120}px 0px`,
          }}
        >
          <div
            style={{ fontFamily: fonts.title, fontSize: 40, fontWeight: 700 }}
          >
            {tx.bs1927}
          </div>
          {[0.9, 0.7, 0.8].map((w, i) => (
            <div
              key={i}
              style={{
                marginTop: 18,
                height: 14,
                width: `${w * 100}%`,
                borderRadius: 7,
                background: alpha(colors.ink, 0.35),
                opacity: fadeIn(frame, c5 + 20 + i * 8),
              }}
            />
          ))}
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              fontWeight: 700,
              color: colors.red,
              opacity: fadeIn(frame, c6 + 10),
            }}
          >
            {tx.neverWritten}
          </div>
        </div>
        <Chip
          frame={frame}
          at={c7 + 6}
          x={1260}
          y={560}
          color={colors.green}
          size={52}
        >
          {tx.completeness}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
