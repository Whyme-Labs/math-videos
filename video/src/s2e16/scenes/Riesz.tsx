import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The Riesz theorem. An arrow v (c0). Its stack: measure any arrow by its
// overlap with v; a test arrow w turns and a counter shows ⟨w, v⟩, the
// sheets crossed (c1). v grows and shrinks: the sheets stay perpendicular
// and pack denser as v gets longer, spacing 1/‖v‖ (c2). Then three stacks
// on the left and three arrows on the right, green links snapping between
// them: one arrow ↔ one stack (c3). Uniqueness: two arrows r and r′
// claiming the same stack, their difference d = r − r′ drawn in green; the
// algebra ⟨d, d⟩ = 0 works itself out and r′ slides onto r as d shrinks
// to nothing (c6–c7). In between, the construction (c4–c5): an
// orthonormal pair, the stack's reading on each (1.2 and 0.6), the two
// readings grown into a parallelogram, and r = (1.2, 0.6) standing
// perpendicular to the sheets.

const O = { x: 720, y: 480 };
const S = 130;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const PAIRS = [
  { a: 1, b: 0.4 },
  { a: -0.5, b: 1 },
  { a: 0.7, b: -0.7 },
];

export const Riesz: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("riesz");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const partB = fadeIn(frame, c4 + 4, 10) * fadeOut(frame, c6, 10);
  const part3 = fadeIn(frame, c6 + 4, 10);
  // building r from readings on an orthonormal basis
  const AL = { a: 1.2, b: 0.6 };
  const grow = glide(frame, c5 + 6, fps, 24);
  const showR = fadeIn(frame, c5 + 36, 10);
  const len =
    1.1 * (1 + (frame > c2 ? 0.45 * Math.sin((frame - c2) * 0.05) : 0));
  const v = { x: len * Math.cos(0.6), y: len * Math.sin(0.6) };
  const th = 0.2 + Math.max(0, frame - c1) * 0.025;
  const w = { x: 2.2 * Math.cos(th), y: 2.2 * Math.sin(th) };
  const dot = v.x * w.x + v.y * w.y;
  // uniqueness
  const R = { x: 1.2, y: 0.7 };
  const slide = glide(frame, c7 + 50, fps, 30);
  const Rp = { x: lerp(0.5, R.x, slide), y: lerp(1.5, R.y, slide) };
  const steps: Tok[][] = [
    [
      { id: "a", t: "⟨u, r⟩ = ⟨u, r′⟩" },
      { id: "f", t: tx.forAll },
    ],
    [
      { id: "a", t: "⟨r − r′, r − r′⟩" },
      { id: "e", t: " = 0" },
    ],
    [
      { id: "a", t: "‖r − r′‖²" },
      { id: "e", t: " = 0", color: colors.green },
    ],
  ];

  return (
    <SceneShell id="riesz">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.08} />
      {PAIRS.map((_, k) => (
        <Sfx key={k} name="clink" at={c3 + 40 + k * 20} volume={0.16} />
      ))}
      <Sfx name="pop" at={c4 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c5 + 6} volume={0.1} />
      <Sfx name="ding" at={c5 + 36} volume={0.3} />
      <Sfx name="pop" at={c6 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c7 + 10} volume={0.08} />
      <Sfx name="chime" at={c7 + 80} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e16r1">
              <circle cx={O.x} cy={O.y} r={360} />
            </clipPath>
          </defs>
          <g clipPath="url(#e16r1)" opacity={fadeIn(frame, c1 + 6)}>
            <Stack a={v.x} b={v.y} scr={scr} range={12} />
          </g>
          <g opacity={fadeIn(frame, c1 + 6)}>
            <Arrow
              from={O}
              to={scr(w.x, w.y)}
              width={12}
              color={colors.highlight}
            />
            <text
              x={scr(w.x, w.y).x + 14}
              y={scr(w.x, w.y).y + 10}
              fill={colors.highlight}
              fontSize={48}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              w
            </text>
          </g>
          <Arrow from={O} to={scr(v.x, v.y)} width={16} />
          <text
            x={scr(v.x, v.y).x + 14}
            y={scr(v.x, v.y).y - 14}
            fill={colors.primary}
            fontSize={50}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1300,
            width: 460,
            padding: "16px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.orange}`,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 12),
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 40,
              color: colors.muted,
              fontWeight: 800,
            }}
          >
            ⟨w, v⟩
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 92,
              fontWeight: 800,
              color: colors.orange,
            }}
          >
            {dot.toFixed(1).replace("-", "−")}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {PAIRS.map((p, k) => {
            const y = 230 + k * 220;
            const ls = { x: 560, y };
            const ra = { x: 1360, y };
            const n = Math.hypot(p.a, p.b);
            const link = glide(frame, c3 + 40 + k * 20, fps, 10);
            return (
              <g key={k} opacity={fadeIn(frame, c3 + 10 + k * 6)}>
                <g
                  transform={`translate(${ls.x} ${ls.y}) rotate(${(-Math.atan2(p.b, p.a) * 180) / Math.PI})`}
                >
                  {[-2, -1, 0, 1, 2].map((j) => (
                    <line
                      key={j}
                      x1={(j * 34) / n}
                      y1={-80}
                      x2={(j * 34) / n}
                      y2={80}
                      stroke={colors.orange}
                      strokeWidth={j === 0 ? 9 : 6}
                      strokeLinecap="round"
                    />
                  ))}
                </g>
                <Arrow
                  from={ra}
                  to={{ x: ra.x + (110 * p.a) / n, y: ra.y - (110 * p.b) / n }}
                  width={14}
                />
                <line
                  x1={ls.x + 140}
                  y1={y}
                  x2={ls.x + 140 + (ra.x - ls.x - 280) * link}
                  y2={y}
                  stroke={colors.green}
                  strokeWidth={6}
                  strokeDasharray="14 10"
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 90),
            translate: riseIn(frame, c3 + 90, 14),
          }}
        >
          {tx.rieszThm}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e16rb">
              <circle cx={760} cy={480} r={340} />
            </clipPath>
          </defs>
          {(() => {
            const o = { x: 760, y: 480 };
            const sb = (x: number, y: number) => ({
              x: o.x + x * 200,
              y: o.y - y * 200,
            });
            const r = { x: AL.a, y: AL.b };
            return (
              <g>
                <g clipPath="url(#e16rb)">
                  <Stack a={AL.a} b={AL.b} scr={sb} range={10} opacity={0.75} />
                </g>
                <Arrow from={o} to={sb(1, 0)} width={11} color={colors.paper} />
                <Arrow from={o} to={sb(0, 1)} width={11} color={colors.paper} />
                <g
                  opacity={fadeIn(frame, c4 + 20)}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  fontSize={44}
                >
                  <text x={sb(1, 0).x + 10} y={o.y + 56} fill={colors.orange}>
                    {AL.a}
                  </text>
                  <text x={o.x - 90} y={sb(0, 1).y + 10} fill={colors.orange}>
                    {AL.b}
                  </text>
                </g>
                <g opacity={fadeIn(frame, c5 + 6)}>
                  <line
                    x1={o.x}
                    y1={o.y}
                    x2={sb(r.x * grow, 0).x}
                    y2={o.y}
                    stroke={colors.primary}
                    strokeWidth={8}
                  />
                  <line
                    x1={o.x}
                    y1={o.y}
                    x2={o.x}
                    y2={sb(0, r.y * grow).y}
                    stroke={colors.primary}
                    strokeWidth={8}
                  />
                  <line
                    x1={sb(r.x, 0).x}
                    y1={o.y}
                    x2={sb(r.x, r.y).x}
                    y2={sb(r.x, r.y).y}
                    stroke={alpha(colors.primary, 0.5)}
                    strokeWidth={4}
                    strokeDasharray="10 8"
                    opacity={showR}
                  />
                  <line
                    x1={o.x}
                    y1={sb(0, r.y).y}
                    x2={sb(r.x, r.y).x}
                    y2={sb(r.x, r.y).y}
                    stroke={alpha(colors.primary, 0.5)}
                    strokeWidth={4}
                    strokeDasharray="10 8"
                    opacity={showR}
                  />
                </g>
                <g opacity={showR}>
                  <Arrow from={o} to={sb(r.x, r.y)} width={16} />
                  <text
                    x={sb(r.x, r.y).x + 16}
                    y={sb(r.x, r.y).y - 12}
                    fill={colors.primary}
                    fontSize={50}
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    r
                  </text>
                </g>
              </g>
            );
          })()}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1320,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.primary,
            opacity: showR,
            translate: riseIn(frame, c5 + 36, 12),
          }}
        >
          r = (1.2, 0.6)
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e16r3">
              <circle cx={620} cy={520} r={330} />
            </clipPath>
          </defs>
          {(() => {
            const o = { x: 620, y: 520 };
            const s3 = (x: number, y: number) => ({
              x: o.x + x * 170,
              y: o.y - y * 170,
            });
            const dn = Math.hypot(R.x - Rp.x, R.y - Rp.y);
            return (
              <g>
                <g clipPath="url(#e16r3)">
                  <Stack
                    a={R.x / 1.4}
                    b={R.y / 1.4}
                    scr={s3}
                    range={10}
                    opacity={0.6}
                  />
                </g>
                <Arrow
                  from={o}
                  to={s3(Rp.x, Rp.y)}
                  width={15}
                  color={colors.highlight}
                />
                <Arrow from={o} to={s3(R.x, R.y)} width={15} />
                {dn > 0.04 ? (
                  <Arrow
                    from={s3(Rp.x, Rp.y)}
                    to={s3(R.x, R.y)}
                    width={10}
                    color={colors.green}
                  />
                ) : null}
                <text
                  x={s3(R.x, R.y).x + 14}
                  y={s3(R.x, R.y).y + 10}
                  fill={colors.primary}
                  fontSize={48}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  r
                </text>
                <text
                  x={s3(Rp.x, Rp.y).x - 50}
                  y={s3(Rp.x, Rp.y).y - 10}
                  fill={colors.highlight}
                  fontSize={48}
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={1 - slide}
                >
                  r′
                </text>
              </g>
            );
          })()}
        </svg>
        <Eq
          steps={steps}
          at={[c6 + 10, c7 + 10, c7 + 40]}
          x={1360}
          y={300}
          size={56}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
