import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Grid, mul, polar, px, type C, type View } from "../components/plane";
import { useStrings } from "../i18n";

// The Fundamental Theorem of Algebra, as winding. Left: a circle |z| = R
// with a point going round. Right: its image under p(z) = z³ − 1. A small
// circle lands near −1 and doesn't go round 0; a big one winds round 0
// three times. As R grows the loop sweeps across 0 at R = 1, and the
// three roots (the cube roots of 1) light up on the left.

const VL: View = { cx: 470, cy: 500, unit: 130 };
const VR: View = { cx: 1340, cy: 500, unit: 62 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const p = (z: C): C => {
  const z3 = mul(mul(z, z), z);
  return { re: z3.re - 1, im: z3.im };
};

export const Fta: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fta");
  const [c0, c1, c2] = cues;
  const R = interpolate(
    frame,
    [c1, c1 + 60, c1 + 80, c2, c2 + 10, c2 + 50, c2 + 80, c2 + 110],
    [0.5, 0.5, 1.4, 1.4, 0.4, 1, 1, 1.4],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  const phi = (Math.max(0, frame - c1) / 60) * 2 * Math.PI;
  const z = polar(R, phi);
  const pz = p(z);
  const loop = Array.from({ length: 181 })
    .map((_, k) => px(VR, p(polar(R, (k / 180) * 2 * Math.PI))))
    .map((q, k) => `${k === 0 ? "M" : "L"} ${q.x} ${q.y}`)
    .join(" ");
  const planes = fadeIn(frame, c1 + 2);
  const hit = frame >= c2 + 50;
  const flash = springIn(frame, c2 + 50, fps, 9);
  const o = px(VR, { re: 0, im: 0 });
  const zp = px(VL, z);
  const pp = px(VR, pz);

  return (
    <SceneShell id="fta">
      <Sfx name="pop" at={c0 + 6} />
      <Sfx name="ding" at={c0 + 40} volume={0.24} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={c0 + 76 + k * 14} volume={0.2} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 64} volume={0.16} />
      <Sfx name="riser" at={c2 + 10} volume={0.18} />
      <Sfx name="chime" at={c2 + 50} />
      <Sfx name="sparkle" at={c2 + 56} />
      <QuestionTray />

      <AbsoluteFill>
        {/* wanted vs. got for free */}
        <div
          style={{
            position: "absolute",
            top: 200,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 80,
            opacity: fadeOut(frame, c1, 10),
          }}
        >
          {[
            { l: tx.wanted, t: "x² + 1 = 0", at: c0 + 6, c: colors.text },
            { l: tx.gotFree, t: tx.everyPoly, at: c0 + 40, c: colors.primary },
          ].map((b) => (
            <div
              key={b.l}
              style={{
                textAlign: "center",
                opacity: fadeIn(frame, b.at),
                translate: riseIn(frame, b.at, 18),
              }}
            >
              <div style={{ fontSize: 34, color: colors.muted }}>{b.l}</div>
              <div
                style={{
                  fontFamily: fonts.math,
                  fontSize: 58,
                  color: b.c,
                  marginTop: 12,
                }}
              >
                {b.t}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 420,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 60) * fadeOut(frame, c1, 10),
          }}
        >
          {tx.fta}
        </div>
        <div
          style={{
            position: "absolute",
            top: 520,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 70,
            fontFamily: fonts.math,
            fontSize: 42,
            opacity: fadeOut(frame, c1, 10),
          }}
        >
          {["x³ = 15x + 4", "x⁵ − x − 1 = 0", "z⁷ + 2iz = 3"].map((t, k) => (
            <div
              key={t}
              style={{
                opacity: fadeIn(frame, c0 + 76 + k * 14),
                translate: riseIn(frame, c0 + 76 + k * 14, 14),
              }}
            >
              {t} <span style={{ color: colors.green }}>✓</span>
            </div>
          ))}
        </div>

        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", opacity: planes }}
        >
          <Grid view={VL} n={2} />
          <Grid view={VR} n={5} />
          {/* left: the circle |z| = R and its point */}
          <circle
            cx={VL.cx}
            cy={VL.cy}
            r={R * VL.unit}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <circle cx={zp.x} cy={zp.y} r={12} fill={colors.primary} />
          {/* right: the image loop, and 0 */}
          <path d={loop} fill="none" stroke={colors.orange} strokeWidth={5} />
          <circle cx={pp.x} cy={pp.y} r={12} fill={colors.orange} />
          <circle
            cx={o.x}
            cy={o.y}
            r={10 + (hit ? 22 * Math.max(0, 1 - (frame - c2 - 50) / 20) : 0)}
            fill={colors.text}
            opacity={hit ? 1 : 0.9}
          />
          {/* the three roots */}
          {[0, 1, 2].map((k) => {
            const r = px(VL, polar(1, (2 * Math.PI * k) / 3));
            return (
              <circle
                key={k}
                cx={r.x}
                cy={r.y}
                r={16 * Math.min(1, flash)}
                fill={colors.highlight}
                opacity={hit ? 1 : 0}
              />
            );
          })}
          <text
            x={VL.cx}
            y={VL.cy - 2 * VL.unit - 40}
            fill={colors.primary}
            fontSize={38}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            |z| = {R.toFixed(2)}
          </text>
          <text
            x={VR.cx}
            y={VR.cy - 5 * VR.unit - 40}
            fill={colors.orange}
            fontSize={38}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            p(z) = z³ − 1
          </text>
          <line
            x1={VL.cx + 2 * VL.unit + 50}
            y1={VL.cy}
            x2={VR.cx - 5 * VR.unit - 50}
            y2={VR.cy}
            stroke={alpha(colors.muted, 0.6)}
            strokeWidth={3}
          />
          <text
            x={(VL.cx + 2 * VL.unit + VR.cx - 5 * VR.unit) / 2}
            y={VL.cy - 16}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            p
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: VR.cx - 300,
            width: 600,
            top: VR.cy + 5 * VR.unit + 20,
            textAlign: "center",
            fontSize: 38,
            color: R < 1 ? colors.muted : colors.orange,
            opacity:
              planes *
              (hit && frame < c2 + 80 ? 0 : 1) *
              fadeOut(frame, c2 + 84, 8),
          }}
        >
          {R < 1 ? tx.noWind : tx.winds(3)}
        </div>
        <div
          style={{
            position: "absolute",
            left: VL.cx - 300,
            width: 600,
            top: VL.cy + 2 * VL.unit + 20,
            textAlign: "center",
            fontSize: 40,
            color: colors.highlight,
            opacity: hit ? fadeIn(frame, c2 + 56) : 0,
          }}
        >
          {tx.root}: z³ = 1
        </div>
        <div
          style={{
            position: "absolute",
            top: 836,
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 90),
            translate: riseIn(frame, c2 + 90, 14),
          }}
        >
          {tx.fta} · Gauss, 1799
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
