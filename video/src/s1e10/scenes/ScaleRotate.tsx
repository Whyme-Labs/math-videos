import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
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

// Lengths multiply, angles add, measured with real tools. A ruler lies along
// 3 + 4i (it reads 5) and a protractor at 0 reads 53°. 1 + 2i comes in with
// its own ruler (√5) and wedge (63°). Then 3 + 4i stretches along a growing
// ruler and turns through the 63° wedge stacked on its 53°, and lands on
// −5 + 10i: ruler 5√5, protractor 117°.

const V: View = { cx: 1060, cy: 760, unit: 56 };
const Z: C = { re: 3, im: 4 };
const W: C = { re: 1, im: 2 };
const argZ = Math.atan2(Z.im, Z.re);
const argW = Math.atan2(W.im, W.re);

const wedge = (r: number, a0: number, a1: number) => {
  const o = px(V, { re: 0, im: 0 });
  const p = px(V, polar(r, a0));
  const q = px(V, polar(r, a1));
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${o.x} ${o.y} L ${p.x} ${p.y} A ${r * V.unit} ${r * V.unit} 0 ${large} 0 ${q.x} ${q.y} Z`;
};

// a ruler lying beside the arrow from 0 to z, with a tick at every unit
const Ruler: React.FC<{
  readonly z: C;
  readonly label: string;
  readonly color: string;
  readonly opacity?: number;
}> = ({ z, label, color, opacity = 1 }) => {
  const len = abs(z) * V.unit;
  const a = (Math.atan2(z.im, z.re) * 180) / Math.PI;
  const o = px(V, { re: 0, im: 0 });
  const ticks = Math.floor(abs(z));
  return (
    <g opacity={opacity} transform={`translate(${o.x} ${o.y}) rotate(${-a})`}>
      <rect
        x={0}
        y={22}
        width={len}
        height={34}
        rx={6}
        fill={alpha(colors.paper, 0.92)}
      />
      {Array.from({ length: ticks + 1 }).map((_, k) => (
        <line
          key={k}
          x1={k * V.unit}
          y1={22}
          x2={k * V.unit}
          y2={40}
          stroke={colors.ink}
          strokeWidth={3}
        />
      ))}
      <g transform={`translate(${len - 10} 48) rotate(${a})`}>
        <text
          x={0}
          y={0}
          fill={color}
          fontSize={44}
          fontFamily={fonts.math}
          fontWeight={700}
          textAnchor="middle"
          stroke={colors.bg}
          strokeWidth={8}
          paintOrder="stroke"
        >
          {label}
        </text>
      </g>
    </g>
  );
};

const Formula: React.FC<{
  readonly text: string;
  readonly at: number;
  readonly out: number;
  readonly color?: string;
}> = ({ text, at, out, color = colors.text }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: fadeIn(frame, at) * fadeOut(frame, out, 8),
        translate: riseIn(frame, at, 18),
      }}
    >
      <div
        style={{
          fontFamily: fonts.math,
          fontSize: 60,
          color,
          padding: "12px 34px",
          borderRadius: 22,
          backgroundColor: alpha(colors.bg, 0.85),
          border: `2px solid ${alpha(color, 0.5)}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ScaleRotate: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("scaleRotate");
  const [c0, c1, c2] = cues;
  const zIn = Math.min(1, springIn(frame, c0 + 8, fps, 12));
  const ruler = fadeIn(frame, c0 + 30);
  const prot = glide(frame, c0 + 54, fps, 24);
  const wIn = Math.min(1, springIn(frame, c1 + 6, fps, 12));
  const t = glide(frame, c2 + 6, fps, 50);
  const moving = mul(Z, polar(abs(W) ** t, argW * t));
  const done = frame >= c2 + 56;
  // camera: close on the first arrow, out for the product
  const out = glide(frame, c2, fps, 40);
  const zoom = lerp(1.7, 0.9, out);
  const camX = lerp(184, 0, out);
  const camY = lerp(108, -20, out);

  return (
    <SceneShell id="scaleRotate">
      <Sfx name="pop" at={c0 + 8} />
      <Sfx name="scratch" at={c0 + 30} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 54} volume={0.12} />
      <Sfx name="pop" at={c1 + 6} volume={0.3} />
      <Sfx name={PLUCKS[2]} at={c1 + 40} volume={0.24} />
      <Sfx name={PLUCKS[4]} at={c1 + 80} volume={0.24} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.18} />
      <Sfx name="chime" at={c2 + 56} />
      <QuestionTray />

      <Camera zoom={zoom} x={camX} y={camY}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <Grid view={V} n={13} opacity={fadeIn(frame, c0 + 2) * 0.7} />
          {/* protractor: z's 53°, and w's 63° stacked on top of it */}
          <path
            d={wedge(2.6, 0, argZ * prot)}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={3}
          />
          <path
            d={wedge(3.3, 0, argW * wIn)}
            fill={alpha(colors.highlight, 0.25)}
            stroke={colors.highlight}
            strokeWidth={3}
            opacity={(1 - t) * (wIn > 0 ? 1 : 0)}
          />
          <path
            d={wedge(3.3, argZ, argZ + argW * t)}
            fill={alpha(colors.highlight, 0.3)}
            stroke={colors.highlight}
            strokeWidth={3}
            opacity={t > 0 ? 1 : 0}
          />
          {[
            {
              t: "53°",
              a: argZ / 2,
              r: 1.9,
              c: colors.primary,
              at: c0 + 70,
              o: 1,
            },
            {
              t: "63°",
              a: argW / 2,
              r: 3.9,
              c: colors.highlight,
              at: c1 + 20,
              o: 1 - t,
            },
            {
              t: "63°",
              a: argZ + argW / 2,
              r: 4.1,
              c: colors.highlight,
              at: c2 + 30,
              o: t,
            },
          ].map((l, k) => {
            const p = px(V, polar(l.r, l.a));
            return (
              <text
                key={k}
                x={p.x}
                y={p.y}
                fill={l.c}
                fontSize={42}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, l.at) * l.o}
              >
                {l.t}
              </text>
            );
          })}
          {/* rulers */}
          {(() => {
            const m = ramp(frame, c0 + 60, 70) * (1 - fadeIn(frame, c1, 10));
            const tip = px(V, mul(Z, { re: m, im: 0 }));
            const n = Math.min(5, Math.floor(m * 5 + 0.001));
            return m > 0 ? (
              <g>
                <circle cx={tip.x} cy={tip.y} r={14} fill={colors.green} />
                <text
                  x={tip.x - 40}
                  y={tip.y - 20}
                  fill={colors.green}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {n}
                </text>
              </g>
            ) : null;
          })()}
          <Ruler
            z={Z}
            label="5"
            color={colors.primary}
            opacity={ruler * (t > 0 ? 0.25 : 1)}
          />
          <Ruler
            z={W}
            label="√5"
            color={colors.highlight}
            opacity={fadeIn(frame, c1 + 24) * (1 - t)}
          />
          {t > 0 ? (
            <Ruler z={moving} label={done ? "5√5" : ""} color={colors.orange} />
          ) : null}
          <Arrow
            view={V}
            z={mul(Z, { re: zIn, im: 0 })}
            color={colors.primary}
            width={8}
            label={zIn > 0.6 ? "3 + 4i" : undefined}
            labelOffset={{ x: 18, y: -14 }}
            opacity={t > 0 ? 0.35 : 1}
          />
          <Arrow
            view={V}
            z={mul(W, { re: wIn, im: 0 })}
            color={colors.highlight}
            width={7}
            label={wIn > 0.6 ? "1 + 2i" : undefined}
            labelOffset={{ x: 20, y: 8 }}
            opacity={(1 - t) * (wIn > 0 ? 1 : 0)}
          />
          {t > 0 ? (
            <Arrow
              view={V}
              z={moving}
              color={colors.orange}
              width={9}
              label={done ? "−5 + 10i" : undefined}
              labelOffset={{ x: -210, y: -16 }}
            />
          ) : null}
          {done ? (
            <text
              x={px(V, polar(5, argZ + argW / 2 - 0.3)).x}
              y={px(V, polar(5, argZ + argW / 2 - 0.3)).y}
              fill={colors.text}
              fontSize={52}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c2 + 60)}
            >
              117°
            </text>
          ) : null}
        </svg>
      </Camera>

      <AbsoluteFill>
        <Formula
          text={`${tx.length} 5 · ${tx.angle} 53°`}
          at={c0 + 74}
          out={c1 + 36}
          color={colors.primary}
        />
        <Formula
          text={`5 × √5 = 5√5`}
          at={c1 + 40}
          out={c1 + 78}
          color={colors.primary}
        />
        <Formula
          text={`53° + 63° = 117°`}
          at={c1 + 80}
          out={c2 + 4}
          color={colors.highlight}
        />
        <Formula
          text="(3 + 4i)(1 + 2i) = −5 + 10i"
          at={c2 + 58}
          out={1e9}
          color={colors.orange}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
