import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  abs,
  Arrow,
  Grid,
  mul,
  polar,
  px,
  type C,
  type View,
} from "../components/plane";
import { useStrings } from "../i18n";

// Lengths multiply, angles add. z = 3 + 4i (length 5, 53°) and w = 1 + 2i
// (length √5, 63°). Then z turns by w's angle while it stretches by w's
// length, and lands on the product −5 + 10i (length 5√5, 117°).

const V: View = { cx: 760, cy: 700, unit: 52 };
const Z: C = { re: 3, im: 4 };
const W: C = { re: 1, im: 2 };
const argZ = Math.atan2(Z.im, Z.re);
const argW = Math.atan2(W.im, W.re);

const arcPath = (r: number, a0: number, a1: number) => {
  const p = px(V, polar(r, a0));
  const q = px(V, polar(r, a1));
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p.x} ${p.y} A ${r * V.unit} ${r * V.unit} 0 ${large} 0 ${q.x} ${q.y}`;
};

export const ScaleRotate: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("scaleRotate");
  const [c0, c1, c2] = cues;
  const zIn = springIn(frame, c0 + 8, fps, 12);
  const angIn = glide(frame, c0 + 30, fps, 20);
  const wIn = springIn(frame, c1 + 6, fps, 12);
  const t = glide(frame, c2 + 8, fps, 40);
  const moving = mul(Z, polar(abs(W) ** t, argW * t));
  const done = frame >= c2 + 48;
  const badgeAt = (k: number) => c1 + 40 + k * 22;

  return (
    <SceneShell id="scaleRotate">
      <Sfx name="pop" at={c0 + 8} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="pop" at={c1 + 6} volume={0.3} />
      {[0, 1].map((k) => (
        <Sfx key={k} name={PLUCKS[k + 2]} at={badgeAt(k)} volume={0.24} />
      ))}
      <Sfx name="whoosh" at={c2 + 8} volume={0.18} />
      <Sfx name="chime" at={c2 + 48} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Grid view={V} n={9} opacity={fadeIn(frame, c0 + 2) * 0.8} />
          {/* angle of z, then w's angle stacked on top of it */}
          <path
            d={arcPath(1.6, 0, argZ * angIn)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={arcPath(2.2, 0, argW * Math.min(1, wIn))}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            opacity={(1 - t) * Math.min(1, wIn)}
          />
          <path
            d={arcPath(2.2, argZ, argZ + argW * t)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
            opacity={t > 0 ? 1 : 0}
          />
          <Arrow
            view={V}
            z={mul(Z, { re: Math.min(1, zIn), im: 0 })}
            color={colors.primary}
            label="3 + 4i"
            opacity={t > 0 ? 0.35 : 1}
          />
          <Arrow
            view={V}
            z={mul(W, { re: Math.min(1, wIn), im: 0 })}
            color={colors.highlight}
            label="1 + 2i"
            labelOffset={{ x: 16, y: 6 }}
            opacity={(1 - t) * (wIn > 0 ? 1 : 0)}
          />
          {t > 0 ? (
            <Arrow
              view={V}
              z={moving}
              color={colors.orange}
              width={7}
              label={done ? "−5 + 10i" : undefined}
              labelOffset={{ x: -200, y: -10 }}
            />
          ) : null}
          <text
            x={px(V, polar(1.6, argZ / 2)).x + 14}
            y={px(V, polar(1.6, argZ / 2)).y}
            fill={colors.primary}
            fontSize={30}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c0 + 44)}
          >
            53°
          </text>
        </svg>
        {/* what a complex number is: a length and an angle */}
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 150,
            fontSize: 38,
            lineHeight: 1.6,
            opacity: fadeIn(frame, c0 + 20),
          }}
        >
          <div>
            <span style={{ color: colors.muted }}>{tx.length} </span>
            <span style={{ fontFamily: fonts.math }}>|3 + 4i| = 5</span>
          </div>
          <div style={{ opacity: fadeIn(frame, c0 + 44) }}>
            <span style={{ color: colors.muted }}>{tx.angle} </span>
            <span style={{ fontFamily: fonts.math }}>53°</span>
          </div>
        </div>
        {/* the two badges */}
        {[
          { l: tx.lengthsMultiply, t: "5 × √5 = 5√5" },
          { l: tx.anglesAdd, t: "53° + 63° = 117°" },
        ].map((b, k) => (
          <div
            key={b.l}
            style={{
              position: "absolute",
              left: 1240,
              top: 330 + k * 130,
              padding: "14px 26px",
              borderRadius: 18,
              border: `2px solid ${alpha(k === 0 ? colors.primary : colors.highlight, 0.6)}`,
              backgroundColor: alpha(colors.bg, 0.6),
              opacity: fadeIn(frame, badgeAt(k)),
              translate: riseIn(frame, badgeAt(k), 16),
            }}
          >
            <div style={{ fontSize: 30, color: colors.muted }}>{b.l}</div>
            <div
              style={{
                fontFamily: fonts.math,
                fontSize: 46,
                color: k === 0 ? colors.primary : colors.highlight,
              }}
            >
              {b.t}
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 610,
            fontFamily: fonts.math,
            fontSize: 44,
            color: colors.orange,
            opacity: fadeIn(frame, c2 + 50),
            scale: lerp(0.8, 1, Math.min(1, springIn(frame, c2 + 50, fps, 12))),
          }}
        >
          (3 + 4i)(1 + 2i) = −5 + 10i
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
