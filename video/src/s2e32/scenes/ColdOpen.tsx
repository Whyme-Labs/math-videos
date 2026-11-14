import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly } from "../components/draw";
import { blob, stir, toXY } from "../components/swirl";
import { useStrings } from "../i18n";

// Stirring coffee. A cup with a blob of cream that the stirring twists
// into filaments (c0). Two drops a hair apart, red and green, drift to
// opposite sides (c1). A small patch outlined in lemon is stretched into a
// thin arc while its area readout stays put (c2, c3). One drop's start is
// ringed and the drop comes back to it (c4). The stirring speeds up and the
// cream fills the ring evenly (c5). The cup slides left; a reading of the
// drop under it scrolls on the right (c6); U f = f ∘ T, linear (c7).

const CX = 960;
const CY = 440;
const R = 300;
const DROPS = blob(420);
const PATCH = Array.from({ length: 80 }, (_, k) => {
  const s = k / 80;
  // the boundary of the patch 0.62 < r < 0.72, 0.3 < a < 0.6
  const side = Math.floor(s * 4);
  const u = s * 4 - side;
  const pts = [
    { r: 0.62 + 0.1 * u, a: 0.3 },
    { r: 0.72, a: 0.3 + 0.3 * u },
    { r: 0.72 - 0.1 * u, a: 0.6 },
    { r: 0.62, a: 0.6 - 0.3 * u },
  ];
  return pts[side];
});

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const base = Math.max(0, frame - c0 - 10) / 30;
  const extra = Math.max(0, frame - c5 - 6) / 30;
  const t = base + 6 * extra;
  const slide = progress(frame, c6 + 4, 24);
  const cx = CX - 420 * slide;
  const scale = 1 - 0.25 * slide;
  const r = R * scale;
  const twoT = Math.max(0, frame - c1 - 6) / 30;
  const pair = [0.42, 0.5].map((rr) => stir({ r: rr, a: -0.6 }, twoT * 1.4));
  const patchT = Math.max(0, frame - c3 - 6) / 30;
  const patch = PATCH.map((d) => toXY(stir(d, patchT * 2.5), cx, CY, r));
  let area = 0;
  for (let i = 0; i < patch.length; i++) {
    const [x1, y1] = patch[i];
    const [x2, y2] = patch[(i + 1) % patch.length];
    area += x1 * y2 - x2 * y1;
  }
  area = Math.abs(area) / 2 / (Math.PI * r * r);
  // the returning drop: one full turn exactly 50 frames after c4
  const retT = Math.max(0, frame - c4 - 6) / 30;
  const w = (2 * Math.PI) / (50 / 30);
  const rr = 1 - (w - 0.3) / 2.6;
  const ret = { r: Math.max(0.15, rr), a: 1.9 + w * Math.min(retT, 50 / 30) };
  const reading = (k: number) => {
    const d = stir({ r: 0.5, a: 0 }, Math.max(0, frame - c6 - k * 2) / 30);
    return Math.sin(3 * d.a) * 0.5 + 0.3 * Math.cos(d.a);
  };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 8} volume={0.12} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="ding" at={c4 + 56} volume={0.22} />
      <Sfx name="riser" at={c5 + 4} volume={0.12} />
      <Sfx name="whoosh" at={c6 + 4} volume={0.1} />
      <Sfx name="chime" at={c7 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={cx}
          cy={CY}
          r={r + 18}
          fill={alpha("#3a2414", 0.95)}
          stroke={colors.paper}
          strokeWidth={8}
          opacity={fadeIn(frame, c0, 10)}
        />
        {DROPS.map((d, i) => {
          const [x, y] = toXY(stir(d, t), cx, CY, r);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4.5 * scale}
              fill={alpha(colors.paper, 0.85)}
              opacity={fadeIn(frame, c0 + 4, 8)}
            />
          );
        })}
        <g opacity={fadeIn(frame, c1 + 6, 8) * (1 - fadeIn(frame, c3, 8))}>
          {pair.map((d, i) => {
            const [x, y] = toXY(d, cx, CY, r);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={13}
                fill={i ? colors.green : colors.red}
                stroke={colors.ink}
                strokeWidth={3}
              />
            );
          })}
        </g>
        <path
          d={poly(
            patch.map(([x, y]) => [x, y]),
            true,
          )}
          fill={alpha(colors.primary, 0.35)}
          stroke={colors.primary}
          strokeWidth={4}
          opacity={fadeIn(frame, c2 + 6, 8) * (1 - fadeIn(frame, c4, 8))}
        />
        <g opacity={fadeIn(frame, c4 + 4, 8) * (1 - fadeIn(frame, c5, 8))}>
          <circle
            cx={toXY({ r: ret.r, a: 1.9 }, cx, CY, r)[0]}
            cy={toXY({ r: ret.r, a: 1.9 }, cx, CY, r)[1]}
            r={26}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="8 6"
          />
          <circle
            cx={toXY(ret, cx, CY, r)[0]}
            cy={toXY(ret, cx, CY, r)[1]}
            r={13}
            fill={colors.highlight}
          />
        </g>
        <g opacity={fadeIn(frame, c6 + 20, 10)}>
          <line
            x1={1000}
            y1={460}
            x2={1760}
            y2={460}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={poly(
              Array.from({ length: 90 }, (_, k) => [
                1760 - k * 8.4,
                460 - 130 * reading(k),
              ]),
            )}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
          />
          <circle
            cx={1760}
            cy={460 - 130 * reading(0)}
            r={11}
            fill={colors.orange}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1360,
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 10) * (1 - fadeIn(frame, c4, 8)),
        }}
      >
        {tx.area} = {area.toFixed(3)}
      </div>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c6 + 20, 10) }}>
        <Chip
          frame={frame}
          at={c6 + 24}
          x={1000}
          y={200}
          color={colors.orange}
          size={42}
        >
          {tx.measurements}
        </Chip>
        <div
          style={{
            position: "absolute",
            top: 660,
            left: 1000,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c7 + 6),
          }}
        >
          U f = f ∘ T{" "}
          <span style={{ color: colors.green, fontSize: 44 }}>
            · {tx.linear}
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
