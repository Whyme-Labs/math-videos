import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { polar, px, type C, type View } from "../components/plane";
import { Town, Walker } from "../components/town";
import { useStrings } from "../i18n";

// ℂ as pairs, acted out in a town on the plane. Every spot is a pair (a, b).
// A walker walks the pair (3, 2): three steps east, two north. Adding is
// walking one pair and then the other. Then the multiplication rule, and
// i = one step north: i · i swings the walker a quarter turn to (−1, 0).

const V: View = { cx: 960, cy: 560, unit: 120 };

type Leg = { from: C; to: C; start: number; len: number };
const along = (frame: number, legs: Leg[], rest: C) => {
  for (let k = legs.length - 1; k >= 0; k--) {
    const l = legs[k];
    if (frame >= l.start) {
      const t = ramp(frame, l.start, l.len);
      return {
        z: { re: lerp(l.from.re, l.to.re, t), im: lerp(l.from.im, l.to.im, t) },
        moving: t > 0 && t < 1,
        dir: Math.atan2(-(l.to.im - l.from.im), l.to.re - l.from.re),
      };
    }
  }
  return { z: rest, moving: false, dir: 0 };
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

export const Pairs: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("pairs");
  const [c0, c1, c2] = cues;
  const pull = glide(frame, c0, fps, 50);
  const zoom = lerp(1.9, 1.18, pull);
  // a slow drift across the town while the signposts go up
  const drift =
    lerp(-70, 40, ramp(frame, c0, c1 - c0)) * (1 - glide(frame, c1, fps, 20));
  const tagAt = (k: number) => c0 + 30 + k * 12;
  const TAGS: C[] = [
    { re: 2, im: 1 },
    { re: -2, im: 2 },
    { re: 1.2, im: -2 },
    { re: -2.6, im: -1.4 },
  ];
  const O = { re: 0, im: 0 };
  const P = { re: 3, im: 2 };
  const Q = { re: 2, im: 3 };
  const I = { re: 0, im: 1 };
  const legs: Leg[] = [
    { from: O, to: { re: 3, im: 0 }, start: c1 + 6, len: 36 },
    { from: { re: 3, im: 0 }, to: P, start: c1 + 44, len: 26 },
    { from: P, to: { re: 2, im: 2 }, start: c1 + 80, len: 16 },
    { from: { re: 2, im: 2 }, to: Q, start: c1 + 98, len: 16 },
    { from: Q, to: O, start: c2 + 20, len: 24 },
    { from: O, to: I, start: c2 + 48, len: 16 },
  ];
  const turnAt = c2 + 84;
  const turn = glide(frame, turnAt, fps, 30);
  let w = along(frame, legs, O);
  if (frame >= turnAt) {
    const a = Math.PI / 2 + (Math.PI / 2) * turn;
    w = { z: polar(1, a), moving: turn > 0 && turn < 1, dir: Math.PI };
  }
  const wp = px(V, w.z);
  const p3 = px(V, { re: 3, im: 0 });
  const pP = px(V, P);
  const pQ = px(V, Q);
  const o = px(V, O);
  const firstWalk = fadeIn(frame, c1 + 6) * fadeOut(frame, c2 + 14, 10);
  const secondWalk = fadeIn(frame, c1 + 80) * fadeOut(frame, c2 + 14, 10);

  return (
    <SceneShell id="pairs">
      <Sfx name="whoosh" at={c0 + 2} volume={0.14} />
      {TAGS.map((_, k) => (
        <Sfx key={k} name="pop" at={tagAt(k)} volume={0.2} />
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={`s${k}`} name="tick" at={c1 + 10 + k * 8} volume={0.14} />
      ))}
      <Sfx name={PLUCKS[2]} at={c1 + 70} volume={0.24} />
      <Sfx name={PLUCKS[4]} at={c1 + 114} volume={0.24} />
      <Sfx name="ding" at={c1 + 120} volume={0.2} />
      <Sfx name="page" at={c2 + 4} />
      <Sfx name="pop" at={c2 + 64} />
      <Sfx name="whoosh" at={turnAt} volume={0.16} />
      <Sfx name="chime" at={turnAt + 30} />
      <QuestionTray />

      <Camera zoom={zoom} x={drift} y={-20}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <Town view={V} opacity={fadeIn(frame, 0, 20)} />
          {/* signposts: every spot is a pair */}
          {TAGS.map((z, k) => {
            const p = px(V, z);
            const s = Math.min(1, springIn(frame, tagAt(k), fps, 11));
            return (
              <g
                key={k}
                opacity={s * fadeOut(frame, c1, 10)}
                transform={`translate(${p.x} ${p.y - 70}) scale(${s})`}
              >
                <rect
                  x={-80}
                  y={-30}
                  width={160}
                  height={52}
                  rx={12}
                  fill={colors.paper}
                />
                <text
                  x={0}
                  y={8}
                  fill={colors.ink}
                  fontSize={32}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  ({z.re}, {z.im})
                </text>
              </g>
            );
          })}
          {/* the walk (3, 2), and then (−1, 1) */}
          <g opacity={firstWalk}>
            <polyline
              points={`${o.x},${o.y} ${lerp(o.x, p3.x, ramp(frame, c1 + 6, 36))},${o.y}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth={10}
              strokeDasharray="4 18"
              strokeLinecap="round"
            />
            <line
              x1={p3.x}
              y1={p3.y}
              x2={p3.x}
              y2={lerp(p3.y, pP.y, ramp(frame, c1 + 44, 26))}
              stroke={colors.primary}
              strokeWidth={10}
              strokeDasharray="4 18"
              strokeLinecap="round"
              opacity={frame >= c1 + 44 ? 1 : 0}
            />
            <text
              x={lerp(o.x, p3.x, 0.5)}
              y={o.y + 70}
              fill={colors.primary}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c1 + 30)}
            >
              {tx.east}
            </text>
            <text
              x={p3.x + 30}
              y={lerp(p3.y, pP.y, 0.5)}
              fill={colors.primary}
              fontSize={38}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c1 + 60)}
            >
              {tx.north}
            </text>
          </g>
          <g opacity={secondWalk}>
            <polyline
              points={`${pP.x},${pP.y} ${px(V, { re: 2, im: 2 }).x},${pP.y} ${pQ.x},${pQ.y}`}
              fill="none"
              stroke={colors.green}
              strokeWidth={10}
              strokeDasharray="4 18"
              strokeLinecap="round"
              opacity={fadeIn(frame, c1 + 80, 6)}
            />
            <circle
              cx={pQ.x}
              cy={pQ.y}
              r={16 * Math.min(1, springIn(frame, c1 + 114, fps, 10))}
              fill={colors.green}
            />
          </g>
          {/* i, and i · i */}
          <g opacity={fadeIn(frame, c2 + 64)}>
            <path
              d={`M ${px(V, I).x} ${px(V, I).y} A ${V.unit} ${V.unit} 0 0 0 ${wp.x} ${wp.y}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={6}
              strokeDasharray="12 10"
              opacity={frame >= turnAt ? 1 : 0}
            />
            <text
              x={px(V, I).x + 40}
              y={px(V, I).y - 40}
              fill={colors.highlight}
              fontSize={64}
              fontFamily={fonts.math}
            >
              i
            </text>
            <text
              x={px(V, { re: -1, im: 0 }).x}
              y={o.y + 80}
              fill={colors.orange}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, turnAt + 28)}
            >
              −1
            </text>
          </g>
          <g opacity={fadeIn(frame, c1 + 2)}>
            <Walker
              x={wp.x}
              y={wp.y}
              dir={w.dir}
              bob={w.moving ? frame / 2.2 : 0}
              color={frame >= c2 + 64 ? colors.highlight : colors.primary}
              size={1.4}
            />
          </g>
        </svg>
      </Camera>

      <AbsoluteFill>
        <Formula text="(a, b)" at={c0 + 20} out={c1} />
        <div
          style={{
            position: "absolute",
            top: 190,
            width: "100%",
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 26) * fadeOut(frame, c1, 8),
          }}
        >
          {tx.pairsOfReals}
        </div>
        <Formula
          text="(3, 2) + (−1, 1) = (2, 3)"
          at={c1 + 116}
          out={c2}
          color={colors.green}
        />
        <Formula
          text="(a, b) · (c, d) = (ac − bd, ad + bc)"
          at={c2 + 4}
          out={turnAt - 4}
          color={colors.orange}
        />
        <Formula
          text="(0, 1) · (0, 1) = (−1, 0)"
          at={turnAt}
          out={1e9}
          color={colors.highlight}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
