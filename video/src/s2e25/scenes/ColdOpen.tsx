import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The "limit" of 1, 0, 1, 0, … Dots pop in one by one, bouncing between
// a line at 1 and a line at 0 (c0); a red "no limit" stamp (c1). The
// running average is traced over them and settles on a dashed line at ½
// (c2). The pattern changes to 1, 0, 0, … and the average settles on ⅓
// (c3); then to a random bounded sequence whose average wanders (c4).
// A card: Stefan Banach, 1932 (c5). A locked box "it exists" that rattles
// and never opens (c6). Chip: enough measurements (c7).

const PX = 160;
const PW = 1100;
const Y1 = 260;
const Y0 = 680;
const N = 36;
const sx = (n: number) => PX + (PW * (n + 0.5)) / N;
const sy = (v: number) => Y0 + (Y1 - Y0) * v;

const SEQS: ((n: number) => number)[] = [
  (n) => (n % 2 ? 0 : 1),
  (n) => (n % 3 ? 0 : 1),
  (n) =>
    0.5 + 0.45 * Math.sin(n * 0.7 + 3 * rnd(n)) * (rnd(n + 50) > 0.3 ? 1 : -1),
];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const which = frame < c3 ? 0 : frame < c4 ? 1 : 2;
  const start = [c0, c3, c4][which];
  const shown = Math.min(N, Math.max(0, Math.floor((frame - start - 4) / 3)));
  const seq = SEQS[which];
  const means: number[] = [];
  let sum = 0;
  for (let n = 0; n < N; n++) {
    sum += seq(n);
    means.push(sum / (n + 1));
  }
  const meanFrom = which === 0 ? c2 : start;
  const meanShown = Math.min(
    N,
    Math.max(0, Math.floor((frame - meanFrom - 8) / 2)),
  );
  const target = which === 0 ? 0.5 : which === 1 ? 1 / 3 : -1;
  const plot = fadeOut(frame, c5, 12) * 0.75 + 0.25;
  const dim = frame >= c5 ? 0.3 : 1;
  const rattle = shake(frame, c6 + 20, 10) + shake(frame, c6 + 60, 8);

  return (
    <SceneShell id="coldOpen">
      {Array.from({ length: 12 }, (_, k) => (
        <Sfx key={k} name="tick" at={c0 + 4 + k * 3} volume={0.06} />
      ))}
      <Sfx name="thud" at={c1 + 8} volume={0.22} />
      <Sfx name="pluck2" at={c2 + 8} volume={0.14} />
      <Sfx name="ding" at={c2 + 80} volume={0.2} />
      <Sfx name="pluck4" at={c3 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="page" at={c5 + 6} volume={0.18} />
      <Sfx name="clink" at={c6 + 20} volume={0.2} />
      <Sfx name="clink" at={c6 + 60} volume={0.16} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: plot * dim + (1 - dim) * 0.3 }}>
        <svg width={1920} height={1080}>
          {[0, 1].map((v) => (
            <g key={v}>
              <line
                x1={PX}
                y1={sy(v)}
                x2={PX + PW}
                y2={sy(v)}
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={3}
              />
              <text
                x={PX - 24}
                y={sy(v) + 14}
                textAnchor="end"
                fill={colors.muted}
                fontSize={40}
                fontFamily={fonts.mono}
              >
                {v}
              </text>
            </g>
          ))}
          {Array.from({ length: shown }, (_, n) => (
            <circle
              key={`${which}-${n}`}
              cx={sx(n)}
              cy={sy(seq(n))}
              r={13}
              fill={colors.primary}
            />
          ))}
          {target > 0 && (
            <g opacity={fadeIn(frame, which === 0 ? c2 + 60 : c3 + 60, 10)}>
              <line
                x1={PX}
                y1={sy(target)}
                x2={PX + PW}
                y2={sy(target)}
                stroke={colors.green}
                strokeWidth={4}
                strokeDasharray="14 10"
              />
              <text
                x={PX + PW + 20}
                y={sy(target) + 16}
                fill={colors.green}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {which === 0 ? "½" : "⅓"}
              </text>
            </g>
          )}
          {meanShown > 1 && (
            <path
              d={means
                .slice(0, meanShown)
                .map((m, n) => `${n ? "L" : "M"} ${sx(n)} ${sy(m)}`)
                .join(" ")}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={6}
            />
          )}
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1340,
          padding: "8px 28px",
          border: `6px solid ${colors.red}`,
          borderRadius: 14,
          color: colors.red,
          fontSize: 56,
          fontWeight: 800,
          rotate: "-8deg",
          opacity: fadeIn(frame, c1 + 8, 4) * fadeOut(frame, c2 + 40, 10),
          scale: String(1 + 0.4 * (1 - fadeIn(frame, c1 + 8, 6))),
          whiteSpace: "nowrap",
        }}
      >
        {tx.noLimit}
      </div>
      <Chip
        frame={frame}
        at={c4 + 10}
        x={1180}
        y={130}
        color={colors.text}
        size={40}
      >
        {tx.everyBounded}?
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 1180,
          width: 600,
          padding: "26px 36px",
          borderRadius: 20,
          background: alpha(colors.paper, 0.94),
          color: colors.ink,
          fontFamily: fonts.title,
          fontSize: 50,
          fontWeight: 700,
          opacity: fadeIn(frame, c5 + 6),
          translate: `${(1 - fadeIn(frame, c5 + 6, 14)) * 120}px 0px`,
        }}
      >
        {tx.banach1932}
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 44,
            marginTop: 14,
            color: colors.ink,
          }}
        >
          L(1, 0, 1, 0, …) = ½
        </div>
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", opacity: fadeIn(frame, c6 + 6, 8) }}
      >
        <g transform={`translate(${1520 + rattle} 640)`}>
          <path
            d="M -60 -70 L -60 -120 A 60 60 0 0 1 60 -120 L 60 -70"
            fill="none"
            stroke={colors.paper}
            strokeWidth={16}
          />
          <rect
            x={-150}
            y={-70}
            width={300}
            height={200}
            rx={20}
            fill={colors.wood}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <circle cx={0} cy={10} r={22} fill={colors.ink} />
          <rect x={-8} y={10} width={16} height={60} fill={colors.ink} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 1150,
          width: 200,
          textAlign: "right",
          fontSize: 40,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c6 + 10),
        }}
      >
        {tx.exists}
      </div>
      <Chip frame={frame} at={c7 + 6} x={160} y={160} color={colors.green}>
        {tx.enough}
      </Chip>
    </SceneShell>
  );
};
