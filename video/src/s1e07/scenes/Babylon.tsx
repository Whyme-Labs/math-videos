import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The Babylonian sequence x → (x + 2/x)/2: 1, 3/2, 17/12, 577/408. The
// terms crowd together (a zoom shows how tightly); a landing pad drawn
// where they gather falls through the hole.

const X0 = 260;
const X1 = 1660;
const Y = 500;
const LO = 0.9;
const HI = 1.6;
const SQRT2 = Math.SQRT2;
const TERMS = [
  { p: 1, q: 1, err: "−1" },
  { p: 3, q: 2, err: "1/4" },
  { p: 17, q: 12, err: "1/144" },
  { p: 577, q: 408, err: "1/166464" },
];

export const Babylon: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("babylon");
  const [c0, c1, c2] = cues;
  const zoom = glide(frame, c1 + 6, fps, 30);
  const scale = lerp(1, 120, zoom);
  const px = (v: number) => {
    const base = X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
    const pivot = X0 + ((SQRT2 - LO) / (HI - LO)) * (X1 - X0);
    return lerp(base, 960 + (base - pivot) * scale, zoom);
  };
  const termAt = (k: number) => c0 + 20 + k * 18;
  const padIn = springIn(frame, c2 + 10, fps, 12);
  const fall = ramp(frame, c2 + 46, 24);

  let mx = px(1);
  let my = Y;
  for (let k = 0; k < TERMS.length - 1; k++) {
    const t = ramp(frame, termAt(k + 1) - 14, 14);
    if (t > 0) {
      const a = TERMS[k];
      const b = TERMS[k + 1];
      const p = hop(t, px(a.p / a.q), Y, px(b.p / b.q), Y, 80);
      mx = p.x;
      my = p.y;
    }
  }

  return (
    <SceneShell id="babylon">
      <Sfx name="page" at={c0 + 6} />
      {TERMS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={termAt(k)} volume={0.26} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.16} />
      {TERMS.slice(1).map((_, k) => (
        <Sfx key={`e${k}`} name="tick" at={c1 + 30 + k * 10} volume={0.18} />
      ))}
      <Sfx name="pop" at={c2 + 10} />
      <Sfx name="thud" at={c2 + 62} />
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
          {[1, 1.5].map((v) => (
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
              {v}
            </text>
          ))}
          {TERMS.map((t, k) => {
            const x = px(t.p / t.q);
            const s = Math.min(1, springIn(frame, termAt(k), fps, 12));
            return (
              <g key={t.p}>
                <circle cx={x} cy={Y} r={11 * s} fill={colors.primary} />
                <text
                  x={x}
                  y={Y - 40 - (k >= 2 ? (k - 2) * 46 : 0)}
                  fill={colors.primary}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={s}
                >
                  {t.q === 1 ? t.p : `${t.p}/${t.q}`}
                </text>
              </g>
            );
          })}
          <circle
            cx={mx}
            cy={my}
            r={14}
            fill={colors.highlight}
            opacity={fadeIn(frame, termAt(0)) * fadeOut(frame, c1, 8)}
          />
          {/* a landing pad where the terms gather; it falls through */}
          <g
            opacity={Math.min(1, padIn) * (1 - fall)}
            transform={`translate(${shake(frame, c2 + 40, 8)} ${260 * fall * fall})`}
          >
            <rect
              x={px(SQRT2) - 70}
              y={Y + 18}
              width={140}
              height={18}
              rx={6}
              fill={colors.highlight}
            />
            <text
              x={px(SQRT2)}
              y={Y + 80}
              fill={colors.highlight}
              fontSize={34}
              textAnchor="middle"
            >
              {tx.landing}
            </text>
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: 200,
            top: 150,
            fontFamily: fonts.math,
            fontSize: 50,
            opacity: fadeIn(frame, c0 + 6),
            translate: riseIn(frame, c0 + 6, 20),
          }}
        >
          x → (x + 2/x)/2
        </div>
        {/* how far each square is from 2 */}
        <div
          style={{
            position: "absolute",
            left: 1150,
            top: 130,
            fontFamily: fonts.math,
            fontSize: 34,
            opacity: fadeIn(frame, c1 + 24) * fadeOut(frame, c2 + 6, 10),
          }}
        >
          {TERMS.slice(1).map((t, k) => (
            <div
              key={t.p}
              style={{
                opacity: fadeIn(frame, c1 + 30 + k * 10),
                marginBottom: 6,
              }}
            >
              ({t.p}/{t.q})² − 2 ={" "}
              <span style={{ color: colors.highlight }}>{t.err}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 690,
            width: "100%",
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 70) * fadeOut(frame, c1, 10),
          }}
        >
          {tx.tablet}
        </div>
        <div
          style={{
            position: "absolute",
            top: 690,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 52,
            color: colors.red,
            opacity: fadeIn(frame, c2 + 62),
            translate: `${shake(frame, c2 + 62, 12)}px 0px`,
          }}
        >
          {tx.nowhere}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
