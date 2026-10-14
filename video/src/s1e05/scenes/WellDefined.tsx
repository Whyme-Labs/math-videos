import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, ClockFace, clockPos } from "../components/pieces";
import { useStrings } from "../i18n";

// The well-definedness test. Pick members of blobs on the clock, run them
// through a machine, and see which blob the answer lands in. + always lands
// in the same blob; 2ⁿ sends 0 and 12 (same blob) to different blobs.

const C = { x: 440, y: 450 };
const R = 220;
const SLOT_L = { x: 1080, y: 290 };
const SLOT_R = { x: 1420, y: 290 };
const BOX = { x: 1050, y: 400, w: 400, h: 110 };
const OUT_C = { x: 1250, y: 630 };
const OUT_L = { x: 1080, y: 630 };
const OUT_R = { x: 1420, y: 630 };
const at = (k: number) => clockPos(k, C.x, C.y, R);
type P = { x: number; y: number };
const path = (p: P, q: P, t: number) => ({
  x: lerp(p.x, q.x, t),
  y: lerp(p.y, q.y, t),
});
const BOX_MID = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h / 2 };

export const WellDefined: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("wellDefined");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const g = (start: number, len = 20) => glide(frame, start, fps, len);
  const pop = (start: number) => Math.min(1, springIn(frame, start, fps, 11));

  // One run of the machine: inputs leave the clock at `out`, sit in their
  // slots, drop into the box at `drop`, outputs appear at `res` and fly to
  // their blobs at `send`.
  type Run = {
    inputs: { n: number; from: number; slot: P }[];
    outputs: { n: number; to: number; slot: P }[];
    out: number;
    drop: number;
    res: number;
    send: number;
    end: number;
  };
  const runs: Run[] = [
    {
      inputs: [
        { n: 9, from: 9, slot: SLOT_L },
        { n: 5, from: 5, slot: SLOT_R },
      ],
      outputs: [{ n: 14, to: 2, slot: OUT_C }],
      out: c0 + 20,
      drop: c1 + 4,
      res: c1 + 20,
      send: c1 + 40,
      end: c2,
    },
    {
      inputs: [
        { n: 21, from: 9, slot: SLOT_L },
        { n: 17, from: 5, slot: SLOT_R },
      ],
      outputs: [{ n: 38, to: 2, slot: OUT_C }],
      out: c2 + 6,
      drop: c2 + 28,
      res: c2 + 42,
      send: c2 + 56,
      end: c3,
    },
    {
      inputs: [
        { n: 0, from: 0, slot: SLOT_L },
        { n: 12, from: 0, slot: SLOT_R },
      ],
      outputs: [
        { n: 1, to: 1, slot: OUT_L },
        { n: 4096, to: 4, slot: OUT_R },
      ],
      out: c3 + 10,
      drop: c4 + 4,
      res: c4 + 20,
      send: c4 + 44,
      end: c5,
    },
  ];

  const lit: Partial<Record<number, string>> = {};
  if (frame >= c0 + 10 && frame < c3) {
    lit[9] = colors.orange;
    lit[5] = colors.orange;
  }
  if (frame >= c1 + 62 && frame < c3) lit[2] = colors.green;
  if (frame >= c3 + 4) lit[0] = colors.orange;
  if (frame >= c4 + 66) {
    lit[1] = colors.red;
    lit[4] = colors.red;
  }
  const isPower = frame >= c3;
  const machineOut = fadeOut(frame, c5, 12);

  return (
    <SceneShell id="wellDefined">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      {runs.map((r, i) => (
        <Sfx key={`d${i}`} name="tick" at={r.drop + 14} />
      ))}
      {runs.map((r, i) => (
        <Sfx key={`r${i}`} name="pop" at={r.res} volume={0.3} />
      ))}
      <Sfx name="ding" at={c1 + 62} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="ding" at={c2 + 78} />
      <Sfx name="sparkle" at={c2 + 82} volume={0.25} />
      <Sfx name="page" at={c3 + 2} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="thud" at={c4 + 66} />
      <Sfx name="chime" at={c5 + 6} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c0 + 2)}>
            <ClockFace cx={C.x} cy={C.y} r={R} lit={lit} dot={14} />
          </g>

          {/* the machine */}
          <g opacity={machineOut}>
            <g opacity={fadeIn(frame, c0 + 6)}>
              {[SLOT_L, SLOT_R].map((s, i) => (
                <circle
                  key={i}
                  cx={s.x}
                  cy={s.y}
                  r={40}
                  fill="none"
                  stroke={alpha(colors.muted, 0.6)}
                  strokeWidth={3}
                  strokeDasharray="8 6"
                />
              ))}
              <rect
                x={BOX.x}
                y={BOX.y}
                width={BOX.w}
                height={BOX.h}
                rx={24}
                fill={alpha(colors.violet, 0.5)}
                stroke={colors.panelEdge}
                strokeWidth={3}
              />
              {[SLOT_L, SLOT_R].map((s, i) => (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y + 44}
                  x2={lerp(s.x, BOX_MID.x, 0.35)}
                  y2={BOX.y - 6}
                  stroke={alpha(colors.muted, 0.6)}
                  strokeWidth={3}
                />
              ))}
              <text
                x={BOX_MID.x}
                y={BOX_MID.y + 24}
                fill={colors.text}
                fontSize={68}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={
                  isPower ? fadeIn(frame, c3 + 2) : fadeOut(frame, c3 - 4, 6)
                }
              >
                {isPower ? (
                  <>
                    2
                    <tspan baselineShift="super" fontSize={40}>
                      n
                    </tspan>
                  </>
                ) : (
                  "+"
                )}
              </text>
            </g>
            {runs.map((r, ri) => {
              if (frame < r.out || frame >= r.end) return null;
              return (
                <g key={ri}>
                  {r.inputs.map((inp) => {
                    const t1 = g(r.out, 22);
                    const t2 = g(r.drop, 16);
                    const p = path(
                      path(at(inp.from), inp.slot, t1),
                      BOX_MID,
                      t2,
                    );
                    return (
                      <Chip
                        key={inp.n}
                        cx={p.x}
                        cy={p.y}
                        label={inp.n}
                        r={32}
                        color={colors.orange}
                        opacity={1 - t2}
                      />
                    );
                  })}
                  {r.outputs.map((o) => {
                    const t = g(r.send, 22);
                    const p = path(o.slot, at(o.to), t);
                    return (
                      <Chip
                        key={o.n}
                        cx={p.x}
                        cy={p.y}
                        label={o.n}
                        r={o.n > 99 ? 40 : 32}
                        color={ri === 2 ? colors.red : colors.green}
                        scale={pop(r.res) * lerp(1, 0.5, t)}
                        opacity={t < 1 ? 1 : fadeOut(frame, r.send + 22, 8)}
                      />
                    );
                  })}
                </g>
              );
            })}
            <text
              x={OUT_R.x}
              y={OUT_R.y + 80}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c4 + 28) * fadeOut(frame, c4 + 44, 8)}
            >
              4096 = 341·12 + 4
            </text>
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            left: BOX.x - 100,
            width: BOX.w + 200,
            top: 150,
            textAlign: "center",
            fontSize: 36,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 20) * fadeOut(frame, c3, 10),
          }}
        >
          {tx.pick}
        </div>
        <div
          style={{
            position: "absolute",
            left: BOX.x - 100,
            width: BOX.w + 200,
            top: 700,
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 80) * fadeOut(frame, c3, 10),
            translate: riseIn(frame, c2 + 80, 16),
          }}
        >
          ✓ + {tx.passes}
        </div>
        <div
          style={{
            position: "absolute",
            left: BOX.x - 100,
            width: BOX.w + 200,
            top: 720,
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            color: colors.red,
            opacity: fadeIn(frame, c4 + 66) * machineOut,
            translate: `${shake(frame, c4 + 66, 12)}px 0px`,
          }}
        >
          ✗ {tx.fails}
        </div>

        {/* verdict */}
        <div
          style={{
            position: "absolute",
            left: 1000,
            top: 230,
            opacity: fadeIn(frame, c5 + 6),
            translate: riseIn(frame, c5 + 6, 20),
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.primary,
            }}
          >
            {tx.wellDefined}
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 40,
              marginTop: 16,
              color: colors.text,
            }}
          >
            a ~ a′ ⇒ f(a) ~ f(a′)
          </div>
          {[
            { op: "a + b", ok: true },
            { op: "2ⁿ", ok: false },
          ].map((r, i) => (
            <div
              key={r.op}
              style={{
                display: "flex",
                gap: 28,
                marginTop: 24,
                fontSize: 44,
                opacity: fadeIn(frame, c5 + 18 + i * 8),
              }}
            >
              <span style={{ fontFamily: fonts.math, width: 160 }}>{r.op}</span>
              <span style={{ color: r.ok ? colors.green : colors.red }}>
                {r.ok ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
