import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glide, ramp, springIn } from "../components/motion";
import { NumberLine, type Point, type Tick } from "../components/NumberLine";
import { QuestionTray } from "../components/QuestionTray";
import { PLUCKS, Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";
import { useStrings } from "../i18n";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const LINE_W = 1500;
const LINE_X = 210;

const Tag: React.FC<{
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      position: "absolute",
      fontSize: 30,
      padding: "10px 24px",
      borderRadius: 999,
      backgroundColor: alpha(colors.primary, 0.12),
      border: `2px solid ${colors.primary}`,
      color: colors.primary,
      ...style,
    }}
  >
    {children}
  </div>
);

// Ticks every `step` inside [lo, hi], labelled with `digits` decimals.
const ticksIn = (
  lo: number,
  hi: number,
  step: number,
  digits: number,
  opacity = 1,
): Tick[] => {
  const out: Tick[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + step / 2; v += step) {
    out.push({
      value: Number(v.toFixed(digits + 2)),
      label: v.toFixed(digits),
      major: true,
      opacity,
    });
  }
  return out;
};

export const WhyHard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("whyHard");
  const phaseA = interpolate(
    frame,
    [cues[1] - 10, cues[1], cues[4] - 8, cues[4]],
    [0, 1, 1, 0],
    clamp,
  );
  const phaseB = interpolate(
    frame,
    [cues[4] - 4, cues[4] + 6, cues[5] - 8, cues[5]],
    [0, 1, 1, 0],
    clamp,
  );
  const phaseC = interpolate(frame, [cues[5] - 4, cues[5] + 6], [0, 1], clamp);

  // ---- A: 0.999… as a sum, then zooming toward 1 ----
  const pieces = [0.9, 0.09, 0.009, 0.0009, 0.00009, 0.000009];
  const pieceAt = (k: number) =>
    k < 3 ? cues[1] + 10 + k * 22 : cues[2] + 10 + (k - 3) * 14;
  // Zoom level z: the view shows the last 1.2·10^-z before 1.
  const zoomStart = cues[3] + 6;
  const z = interpolate(
    frame,
    [
      zoomStart,
      zoomStart + 30,
      zoomStart + 60,
      zoomStart + 90,
      zoomStart + 120,
    ],
    [0, 1, 2, 3, 3.6],
    {
      ...clamp,
      easing: (t) => t * t * (3 - 2 * t),
    },
  );
  const g = 10 ** -z;
  const loA = 1 - 1.15 * g;
  const hiA = 1 + 0.12 * g;
  const nines = Math.min(4, Math.max(1, Math.floor(z + 1.0001)));
  const latest = 1 - 10 ** -nines;
  const step = 10 ** -Math.ceil(z + 1);
  const ticksA: Tick[] =
    frame >= zoomStart
      ? ticksIn(loA, hiA, step, 0, 0.5).map((t) => ({ ...t, label: undefined }))
      : [];
  const pointsA: Point[] =
    frame >= zoomStart
      ? [
          ...[1, 2, 3, 4].map((d) => ({
            value: 1 - 10 ** -d,
            color: colors.primary,
            r: 13,
            label: `0.${"9".repeat(d)}`,
            opacity: d <= nines ? 1 : 0,
          })),
          { value: 1, color: colors.highlight, r: 15, label: "1" },
        ]
      : [];

  // ---- B: √2 by compass, then zooming in around it ----
  const b0 = cues[4];
  const draw = ramp(frame, b0 + 4, 22);
  const swing = glide(frame, b0 + 30, fps, 34);
  const zoomB = interpolate(
    frame,
    [b0 + 74, b0 + 120, b0 + 150, b0 + 196, b0 + 226, b0 + 272],
    [0, 1, 1, 2, 2, 3],
    {
      ...clamp,
      easing: (t) => t * t * (3 - 2 * t),
    },
  );
  const windows = [
    [-1.2, 3.3],
    [1.33, 1.57],
    [1.403, 1.427],
    [1.4133, 1.4157],
  ];
  const wi = Math.min(2, Math.floor(zoomB));
  const wt = zoomB - wi;
  const loB = windows[wi][0] + (windows[wi + 1][0] - windows[wi][0]) * wt;
  const hiB = windows[wi][1] + (windows[wi + 1][1] - windows[wi][1]) * wt;
  const ticksB: Tick[] = [
    ...ticksIn(loB, hiB, 1, 0, interpolate(zoomB, [0, 0.4], [1, 0], clamp)),
    ...ticksIn(
      loB,
      hiB,
      0.1,
      1,
      interpolate(zoomB, [0.3, 0.8, 1.3, 1.7], [0, 1, 1, 0], clamp),
    ),
    ...ticksIn(
      loB,
      hiB,
      0.01,
      2,
      interpolate(zoomB, [1.3, 1.8, 2.3, 2.7], [0, 1, 1, 0], clamp),
    ),
    ...ticksIn(
      loB,
      hiB,
      0.001,
      3,
      interpolate(zoomB, [2.3, 2.8], [0, 1], clamp),
    ),
  ];
  const SQ_FADE = 0.55;
  const squares = [
    { at: 1, text: "1.4² = 1.96   1.5² = 2.25" },
    { at: 2, text: "1.41² = 1.9881   1.42² = 2.0164" },
    { at: 3, text: "1.414² = 1.999396   1.415² = 2.002225" },
  ];
  const unit = LINE_W / (windows[0][1] - windows[0][0]); // px per unit at the start
  const originX = LINE_X + (0 - windows[0][0]) * unit;

  // ---- C: whole numbers march off; fractions keep filling [0, 1] ----
  const c0 = cues[5];
  const march = interpolate(frame, [c0 + 10, c0 + 160], [0, 1], clamp);
  const fracTicks: Tick[] = [];
  for (let q = 2; q <= 24; q++) {
    for (let p = 1; p < q; p++) {
      const a = (num: number, den: number): number =>
        den === 0 ? num : a(den, num % den);
      if (a(p, q) !== 1) continue;
      const appear = c0 + 14 + (q - 2) * 5;
      fracTicks.push({
        value: p / q,
        opacity: ramp(frame, appear, 6) * (q < 6 ? 1 : 0.7),
        label: q <= 4 ? `${p}/${q}` : undefined,
        major: q <= 4,
      });
    }
  }

  return (
    <SceneShell id="whyHard">
      {pieces.map((p, k) => (
        <Sfx key={p} name={k < 3 ? PLUCKS[k + 2] : "tick"} at={pieceAt(k)} />
      ))}
      {[0, 1, 2, 3].map((d) => (
        <Sfx key={d} name="whoosh" at={zoomStart + d * 30} volume={0.14} />
      ))}
      <Sfx name="pop" at={cues[3] + 130} />
      <Sfx name="scratch" at={b0 + 4} volume={0.2} />
      <Sfx name="whoosh" at={b0 + 30} />
      {[74, 150, 226].map((d) => (
        <Sfx key={d} name="whoosh" at={b0 + d} volume={0.14} />
      ))}
      <Sfx name="ding" at={b0 + 280} volume={0.25} />
      <Sfx name="whoosh" at={c0 + 10} volume={0.16} />
      <Sfx name="pop" at={c0 + 60} />
      <QuestionTray />

      {/* Intro: the three tray questions drop in, two leave, 0.999… stays. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(frame, [cues[1] - 10, cues[1]], [1, 0], clamp),
        }}
      >
        <div style={{ display: "flex", gap: 40 }}>
          {tx.tray.map((q, i) => (
            <div
              key={q}
              style={{
                fontFamily: fonts.math,
                fontSize: 52,
                padding: "18px 36px",
                borderRadius: 999,
                border: `3px solid ${colors.highlight}`,
                color: colors.highlight,
                translate: `0px ${(1 - springIn(frame, 4 + i * 6, fps, 11)) * -420}px`,
                scale: springIn(frame, 4 + i * 6, fps, 11),
              }}
            >
              {q}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 50,
            fontSize: 40,
            color: colors.muted,
            opacity: ramp(frame, 30, 12),
          }}
        >
          {tx.needsDefinition}
        </div>
      </AbsoluteFill>

      {/* A */}
      <AbsoluteFill style={{ opacity: phaseA }}>
        <div
          style={{
            position: "absolute",
            top: 90,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
          }}
        >
          0.999… <span style={{ color: colors.highlight }}>= 1 ?</span>
        </div>
        {/* The sum as stacked pieces of a unit bar (before the zoom). */}
        <svg
          width={1920}
          height={890}
          style={{
            position: "absolute",
            opacity: interpolate(
              frame,
              [zoomStart - 6, zoomStart + 6],
              [1, 0],
              clamp,
            ),
          }}
        >
          <rect
            x={LINE_X}
            y={330}
            width={LINE_W}
            height={90}
            rx={10}
            fill="none"
            stroke={colors.muted}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <text
            x={LINE_X + LINE_W}
            y={310}
            fill={colors.highlight}
            fontSize={36}
            textAnchor="end"
            fontFamily={fonts.math}
          >
            1
          </text>
          {pieces.map((p, k) => {
            const before = pieces.slice(0, k).reduce((a, b) => a + b, 0);
            const t = glide(frame, pieceAt(k), fps, 14);
            if (frame < pieceAt(k)) return null;
            return (
              <g key={p}>
                <rect
                  x={LINE_X + before * LINE_W}
                  y={330 + (1 - t) * -80}
                  width={Math.max(1.5, p * LINE_W * t)}
                  height={90}
                  fill={k % 2 ? colors.orange : colors.primary}
                  opacity={0.9}
                />
                {k < 3 ? (
                  <g opacity={t}>
                    <line
                      x1={LINE_X + before * LINE_W + (p * LINE_W) / 2}
                      y1={425}
                      x2={
                        LINE_X +
                        before * LINE_W +
                        (p * LINE_W) / 2 -
                        (k === 0 ? 0 : 60 * k)
                      }
                      y2={455 + k * 44}
                      stroke={colors.muted}
                      strokeWidth={2}
                    />
                    <text
                      x={
                        LINE_X +
                        before * LINE_W +
                        (p * LINE_W) / 2 -
                        (k === 0 ? 0 : 60 * k)
                      }
                      y={490 + k * 44}
                      fill={colors.text}
                      fontSize={34}
                      textAnchor={k === 0 ? "middle" : "end"}
                      fontFamily={fonts.math}
                    >
                      {["9/10", "9/100", "9/1000"][k]}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
          <text
            x={LINE_X + LINE_W}
            y={640}
            fill={colors.highlight}
            fontSize={44}
            textAnchor="end"
            fontFamily={fonts.math}
            opacity={ramp(frame, cues[2] + 50, 10)}
          >
            {tx.forever}
          </text>
        </svg>
        {/* The zoom: every step is 10× closer, and the gap looks the same. */}
        <div
          style={{
            position: "absolute",
            left: LINE_X,
            top: 330,
            opacity: ramp(frame, zoomStart - 4, 10),
          }}
        >
          <NumberLine
            width={LINE_W}
            lo={loA}
            hi={hiA}
            ticks={ticksA}
            points={pointsA}
            labelSize={34}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 560,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 40,
            opacity: ramp(frame, zoomStart, 10),
          }}
        >
          {tx.zoom(Math.round(10 ** z).toLocaleString(), "")[0]}
          <span style={{ color: colors.orange }}>
            {(1 - latest).toFixed(nines)}
          </span>
        </div>
        <Tag
          style={{
            top: 650,
            left: 760,
            scale: springIn(frame, cues[3] + 130, fps, 11),
          }}
        >
          {tx.limitsTag}
        </Tag>
      </AbsoluteFill>

      {/* B */}
      <AbsoluteFill style={{ opacity: phaseB }}>
        <div
          style={{
            position: "absolute",
            top: 90,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
          }}
        >
          {tx.sqrtTitle[0]}
          <span style={{ color: colors.highlight }}>{tx.sqrtTitle[1]}</span>
          {tx.sqrtTitle[2]}
        </div>
        <svg
          width={1920}
          height={890}
          style={{
            position: "absolute",
            opacity: interpolate(zoomB, [0, 0.3], [1, 0], clamp),
          }}
        >
          {/* Unit square standing on the line, and its diagonal swinging down like a compass. */}
          <rect
            x={originX}
            y={510 - unit}
            width={unit * draw}
            height={unit}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
            opacity={draw > 0 ? 1 : 0}
          />
          {(() => {
            const len = Math.SQRT2 * unit * draw;
            const ang = (-45 + 45 * swing) * (Math.PI / 180);
            return (
              <>
                <path
                  d={`M ${originX + Math.SQRT2 * unit * Math.cos(-Math.PI / 4)} ${510 + Math.SQRT2 * unit * Math.sin(-Math.PI / 4)} A ${Math.SQRT2 * unit} ${Math.SQRT2 * unit} 0 0 1 ${originX + Math.SQRT2 * unit * Math.cos(ang)} ${510 + Math.SQRT2 * unit * Math.sin(ang)}`}
                  fill="none"
                  stroke={alpha(colors.orange, 0.6)}
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  opacity={swing > 0.02 ? 1 : 0}
                />
                <line
                  x1={originX}
                  y1={510}
                  x2={originX + len * Math.cos(ang)}
                  y2={510 + len * Math.sin(ang)}
                  stroke={colors.orange}
                  strokeWidth={7}
                />
              </>
            );
          })()}
        </svg>
        <div style={{ position: "absolute", left: LINE_X, top: 430 }}>
          <NumberLine
            width={LINE_W}
            lo={loB}
            hi={hiB}
            ticks={ticksB}
            points={[
              {
                value: Math.SQRT2,
                color: colors.orange,
                r: 15,
                hollow: zoomB > 0.5,
                label: "√2",
                opacity: swing > 0.97 ? 1 : 0,
              },
            ]}
            labelSize={30}
          />
        </div>
        {squares.map((s) => (
          <div
            key={s.at}
            style={{
              position: "absolute",
              top: 640,
              width: "100%",
              textAlign: "center",
              fontFamily: fonts.mono,
              fontSize: 36,
              color: colors.muted,
              opacity:
                s.at === 3
                  ? interpolate(zoomB, [2.6, 3], [0, 1], clamp)
                  : interpolate(
                      zoomB,
                      [s.at - 0.4, s.at, s.at + SQ_FADE - 0.15, s.at + SQ_FADE],
                      [0, 1, 1, 0],
                      clamp,
                    ),
            }}
          >
            {s.text}
          </div>
        ))}
        <Tag
          style={{
            top: 250,
            left: 700,
            scale: springIn(frame, b0 + 280, fps, 11),
          }}
        >
          {tx.sqrtTag}
        </Tag>
      </AbsoluteFill>

      {/* C */}
      <AbsoluteFill style={{ opacity: phaseC }}>
        <div
          style={{
            position: "absolute",
            top: 90,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
          }}
        >
          {tx.fracTitle[0]}
          <span style={{ color: colors.highlight }}>{tx.fracTitle[1]}</span>
          {tx.fracTitle[2]}
        </div>
        <svg
          width={1920}
          height={300}
          style={{ position: "absolute", top: 210 }}
        >
          {Array.from({ length: 40 }, (_, k) => {
            const x = 260 + k * 130 - march * 2600;
            return (
              <g key={k} opacity={ramp(frame, c0 + 6 + k * 2, 6)}>
                <circle cx={x} cy={110} r={16} fill={colors.primary} />
                <text
                  x={x}
                  y={170}
                  fill={colors.text}
                  fontSize={32}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {k + 1}
                </text>
              </g>
            );
          })}
          <text
            x={1700}
            y={60}
            fill={colors.muted}
            fontSize={30}
            textAnchor="end"
          >
            {tx.wholeArrow}
          </text>
        </svg>
        <div style={{ position: "absolute", left: LINE_X, top: 470 }}>
          <NumberLine
            width={LINE_W}
            lo={0}
            hi={1}
            ticks={[
              { value: 0, label: "0", major: true },
              { value: 1, label: "1", major: true },
              ...fracTicks,
            ]}
            labelSize={30}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 700,
            width: "100%",
            textAlign: "center",
            fontSize: 34,
            color: colors.muted,
            opacity: ramp(frame, c0 + 40, 10),
          }}
        >
          {tx.fracEndless}
        </div>
        <Tag
          style={{
            top: 770,
            left: 740,
            scale: springIn(frame, c0 + 100, fps, 11),
          }}
        >
          {tx.sameSizeTag}
        </Tag>
      </AbsoluteFill>
    </SceneShell>
  );
};
