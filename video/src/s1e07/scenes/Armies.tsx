import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
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
import { useStrings } from "../i18n";

// S = {q : q² < 2} and its upper bounds. The improvement map
// q → (2q + 2)/(q + 2) moves fractions that are too small up, and fractions
// that are too big down. A magnifier below the main line (×30 around √2)
// shows the later steps; in the last line it zooms further onto the empty
// slot.

const X0 = 260;
const X1 = 1660;
const Y = 330; // the main line
const LO = 1.3;
const HI = 1.55;
const Y2 = 600; // the magnifier
const LO2 = 1.41;
const HI2 = 1.418;
const SQRT2 = Math.SQRT2;
type F = { p: number; q: number };
const BELOW: F[] = [
  { p: 7, q: 5 },
  { p: 24, q: 17 },
  { p: 41, q: 29 },
  { p: 140, q: 99 },
];
const ABOVE: F[] = [
  { p: 3, q: 2 },
  { p: 10, q: 7 },
  { p: 17, q: 12 },
  { p: 58, q: 41 },
  { p: 99, q: 70 },
];
const OTHERS_BELOW = [1.32, 1.35, 1.37, 1.39];
const OTHERS_ABOVE = [1.52, 1.54];
const val = (f: F) => f.p / f.q;
const px = (v: number) => X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
const inLens = (v: number) => v >= LO2 && v <= HI2;

export const Armies: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("armies");
  const [c0, c1, c2, c3] = cues;
  const lensIn = fadeIn(frame, c1 + 40);
  const zoom = glide(frame, c3 + 6, fps, 34);
  const scale = lerp(1, 12, zoom);
  const px2 = (v: number) => {
    const base = X0 + ((v - LO2) / (HI2 - LO2)) * (X1 - X0);
    const pivot = X0 + ((SQRT2 - LO2) / (HI2 - LO2)) * (X1 - X0);
    return lerp(base, 960 + (base - pivot) * scale, zoom);
  };
  const stepAt = (side: 0 | 1, k: number) =>
    (side === 0 ? c1 + 30 : c2 + 10) + k * 18;
  const arrive = (side: 0 | 1, k: number) =>
    k === 0 ? (side === 0 ? c0 + 26 : c0 + 40) : stepAt(side, k - 1) + 14;

  // The hopping marker on one side of a line.
  const marker = (
    list: F[],
    side: 0 | 1,
    map: (v: number) => number,
    y: number,
  ) => {
    let x = map(val(list[0]));
    let yy = y;
    for (let k = 0; k < list.length - 1; k++) {
      const t = ramp(frame, stepAt(side, k), 14);
      if (t > 0) {
        const p = hop(
          t,
          map(val(list[k])),
          y,
          map(val(list[k + 1])),
          y,
          side === 0 ? 50 : -50,
        );
        x = p.x;
        yy = p.y;
      }
    }
    return { x, y: yy };
  };
  const mB = marker(BELOW, 0, px, Y);
  const mA = marker(ABOVE, 1, px, Y);
  const mB2 = marker(BELOW, 0, px2, Y2);
  const mA2 = marker(ABOVE, 1, px2, Y2);

  const points = (
    list: F[],
    side: 0 | 1,
    map: (v: number) => number,
    y: number,
    lens: boolean,
  ) =>
    list.map((f, k) => {
      const v = val(f);
      if (lens && !inLens(v)) return null;
      const color = side === 0 ? colors.primary : colors.orange;
      const showLabel = lens || !inLens(v);
      const dy = side === 0 ? -30 - (k % 2) * 34 : 46 + (k % 2) * 34;
      return (
        <g key={`${lens}-${f.p}`} opacity={fadeIn(frame, arrive(side, k), 6)}>
          <circle cx={map(v)} cy={y} r={10} fill={color} />
          {showLabel ? (
            <text
              x={map(v)}
              y={y + dy}
              fill={color}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              {f.p}/{f.q}
            </text>
          ) : null}
        </g>
      );
    });

  return (
    <SceneShell id="armies">
      {OTHERS_BELOW.map((_, i) => (
        <Sfx key={`b${i}`} name="tick" at={c0 + 8 + i * 5} volume={0.16} />
      ))}
      <Sfx name="pop" at={c0 + 40} />
      <Sfx name="page" at={c1 + 6} />
      {BELOW.slice(1).map((_, k) => (
        <Sfx
          key={`u${k}`}
          name={PLUCKS[k]}
          at={stepAt(0, k) + 14}
          volume={0.24}
        />
      ))}
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      {ABOVE.slice(1).map((_, k) => (
        <Sfx
          key={`d${k}`}
          name={PLUCKS[3 - Math.min(3, k)]}
          at={stepAt(1, k) + 14}
          volume={0.24}
        />
      ))}
      <Sfx name="whoosh" at={c3 + 6} volume={0.16} />
      <Sfx name="chime" at={c3 + 44} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* main line */}
          <g opacity={fadeOut(frame, c3, 12)}>
            <line
              x1={X0 - 80}
              y1={Y}
              x2={X1 + 80}
              y2={Y}
              stroke={colors.muted}
              strokeWidth={3}
              opacity={fadeIn(frame, c0 + 2)}
            />
            {[1.3, 1.4, 1.5].map((v) => (
              <text
                key={v}
                x={px(v)}
                y={Y + 120}
                fill={colors.muted}
                fontSize={28}
                textAnchor="middle"
                fontFamily={fonts.mono}
                opacity={fadeIn(frame, c0 + 4)}
              >
                {v.toFixed(1)}
              </text>
            ))}
            {OTHERS_BELOW.map((v, i) => (
              <circle
                key={`ob${i}`}
                cx={px(v)}
                cy={Y}
                r={9 * Math.min(1, springIn(frame, c0 + 8 + i * 5, fps, 12))}
                fill={colors.primary}
              />
            ))}
            {OTHERS_ABOVE.map((v, i) => (
              <circle
                key={`oa${i}`}
                cx={px(v)}
                cy={Y}
                r={9 * Math.min(1, springIn(frame, c0 + 40 + i * 5, fps, 12))}
                fill={colors.orange}
              />
            ))}
            {points(BELOW, 0, px, Y, false)}
            {points(ABOVE, 1, px, Y, false)}
            <circle
              cx={mB.x}
              cy={mB.y}
              r={13}
              fill={colors.green}
              opacity={fadeIn(frame, c1 + 24)}
            />
            <circle
              cx={mA.x}
              cy={mA.y}
              r={13}
              fill={colors.red}
              opacity={fadeIn(frame, c2 + 4)}
            />
            {/* the part the lens magnifies */}
            <g opacity={lensIn}>
              <rect
                x={px(LO2)}
                y={Y - 22}
                width={px(HI2) - px(LO2)}
                height={44}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={3}
              />
              <line
                x1={px(LO2)}
                y1={Y + 22}
                x2={X0 - 40}
                y2={Y2 - 90}
                stroke={alpha(colors.highlight, 0.5)}
                strokeWidth={2}
              />
              <line
                x1={px(HI2)}
                y1={Y + 22}
                x2={X1 + 40}
                y2={Y2 - 90}
                stroke={alpha(colors.highlight, 0.5)}
                strokeWidth={2}
              />
            </g>
          </g>
          {/* the magnifier */}
          <g opacity={lensIn}>
            <rect
              x={X0 - 40}
              y={Y2 - 90}
              width={X1 - X0 + 80}
              height={200}
              rx={20}
              fill={alpha(colors.ink, 0.6)}
              stroke={alpha(colors.highlight, 0.6)}
              strokeWidth={3}
            />
            <line
              x1={X0 - 20}
              y1={Y2}
              x2={X1 + 20}
              y2={Y2}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {points(BELOW, 0, px2, Y2, true)}
            {points(ABOVE, 1, px2, Y2, true)}
            <circle
              cx={mB2.x}
              cy={mB2.y}
              r={13}
              fill={colors.green}
              opacity={
                ramp(frame, stepAt(0, 0) + 10, 4) * fadeOut(frame, c3, 8)
              }
            />
            <circle
              cx={mA2.x}
              cy={mA2.y}
              r={13}
              fill={colors.red}
              opacity={
                ramp(frame, stepAt(1, 1) + 10, 4) * fadeOut(frame, c3, 8)
              }
            />
            {/* the slot where √2 would be */}
            <rect
              x={px2(SQRT2) - 12}
              y={Y2 - 34}
              width={24}
              height={68}
              rx={8}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={4}
              strokeDasharray="8 6"
              opacity={fadeIn(frame, c3 + 40)}
            />
          </g>
          <text
            x={960}
            y={Y2 - 130}
            fill={colors.highlight}
            fontSize={40}
            textAnchor="middle"
            opacity={fadeIn(frame, c3 + 44)}
          >
            {tx.nothing}
          </text>
        </svg>

        <div
          style={{
            position: "absolute",
            left: 260,
            top: 160,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 8) * fadeOut(frame, c3, 10),
          }}
        >
          S = {"{ q ∈ ℚ : q² < 2 }"}
        </div>
        <div
          style={{
            position: "absolute",
            right: 260,
            top: 160,
            fontSize: 40,
            color: colors.orange,
            opacity: fadeIn(frame, c0 + 44) * fadeOut(frame, c3, 10),
          }}
        >
          {tx.upperBounds}{" "}
          <span style={{ fontFamily: fonts.math }}>(q² &gt; 2)</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 740,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 46,
            opacity: fadeIn(frame, c1 + 8) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c1 + 8, 20),
          }}
        >
          q → (2q + 2)/(q + 2)
        </div>
        <div
          style={{
            position: "absolute",
            top: 740,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 54),
            translate: riseIn(frame, c3 + 54, 20),
          }}
        >
          sup S ∉ ℚ · {tx.noSup}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
