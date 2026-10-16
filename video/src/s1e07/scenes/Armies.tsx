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
// that are too big down, and neither side ever reaches √2. Last line: zoom
// into the slot between them.

const X0 = 260;
const X1 = 1660;
const Y = 470;
const LO = 1.3;
const HI = 1.55;
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

export const Armies: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("armies");
  const [c0, c1, c2, c3] = cues;
  const zoom = glide(frame, c3 + 6, fps, 34);
  const scale = lerp(1, 60, zoom);
  const px = (v: number) => {
    const base = X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
    const pivot = X0 + ((SQRT2 - LO) / (HI - LO)) * (X1 - X0);
    return lerp(base, 960 + (base - pivot) * scale, zoom);
  };
  const stepAt = (side: 0 | 1, k: number) =>
    (side === 0 ? c1 + 30 : c2 + 10) + k * 18;

  // Current position of the hopping marker on each side.
  const marker = (list: F[], side: 0 | 1) => {
    let x = px(val(list[0]));
    let y = Y;
    for (let k = 0; k < list.length - 1; k++) {
      const t = ramp(frame, stepAt(side, k), 14);
      if (t > 0) {
        const p = hop(
          t,
          px(val(list[k])),
          Y,
          px(val(list[k + 1])),
          Y,
          side === 0 ? 70 : -70,
        );
        x = p.x;
        y = p.y;
      }
    }
    return { x, y };
  };
  const mB = marker(BELOW, 0);
  const mA = marker(ABOVE, 1);

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
          <line
            x1={0}
            y1={Y}
            x2={1920}
            y2={Y}
            stroke={colors.muted}
            strokeWidth={3}
            opacity={fadeIn(frame, c0 + 2)}
          />
          {[1.3, 1.4, 1.5].map((v) => (
            <text
              key={v}
              x={px(v)}
              y={Y + 90}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c0 + 4) * (1 - zoom)}
            >
              {v.toFixed(1)}
            </text>
          ))}
          {/* the two sides */}
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
          {BELOW.map((f, k) => {
            const at = k === 0 ? c0 + 26 : stepAt(0, k - 1) + 14;
            return (
              <g key={`${f.p}/${f.q}`} opacity={fadeIn(frame, at, 6)}>
                <circle cx={px(val(f))} cy={Y} r={10} fill={colors.primary} />
                <text
                  x={px(val(f))}
                  y={Y - 30 - (k % 2) * 36}
                  fill={colors.primary}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {f.p}/{f.q}
                </text>
              </g>
            );
          })}
          {ABOVE.map((f, k) => {
            const at = k === 0 ? c0 + 40 : stepAt(1, k - 1) + 14;
            return (
              <g key={`${f.p}/${f.q}`} opacity={fadeIn(frame, at, 6)}>
                <circle cx={px(val(f))} cy={Y} r={10} fill={colors.orange} />
                <text
                  x={px(val(f))}
                  y={Y + 46 + (k % 2) * 36}
                  fill={colors.orange}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {f.p}/{f.q}
                </text>
              </g>
            );
          })}
          {/* hopping markers */}
          <circle
            cx={mB.x}
            cy={mB.y}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c1 + 24) * fadeOut(frame, c3, 8)}
          />
          <circle
            cx={mA.x}
            cy={mA.y}
            r={14}
            fill={colors.red}
            opacity={fadeIn(frame, c2 + 4) * fadeOut(frame, c3, 8)}
          />
          {/* the slot where √2 would be */}
          <rect
            x={px(SQRT2) - 14}
            y={Y - 40}
            width={28}
            height={80}
            rx={8}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="8 6"
            opacity={fadeIn(frame, c3 + 40)}
          />
          <text
            x={px(SQRT2)}
            y={Y - 150}
            fill={colors.highlight}
            fontSize={40}
            textAnchor="middle"
            opacity={fadeIn(frame, c3 + 44)}
          >
            {tx.nothing}
          </text>
        </svg>

        {/* labels and the rule */}
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 200,
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
            top: 200,
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
            top: 680,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 48,
            opacity: fadeIn(frame, c1 + 8) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c1 + 8, 20),
          }}
        >
          q → (2q + 2)/(q + 2)
        </div>
        <div
          style={{
            position: "absolute",
            top: 680,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 52,
            color: colors.highlight,
            backgroundColor: alpha(colors.bg, 0),
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
