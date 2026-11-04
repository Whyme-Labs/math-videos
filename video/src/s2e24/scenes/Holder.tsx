import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Hölder and dual unit balls. The question (c0) and the inequality (c1);
// a chip: every y in ℓ_q measures ℓᵖ (c2). Two panels, the ℓᵖ unit ball
// and its partner ℓ_q ball: p = 1 is the diamond and its partner the
// square (c3); p = 2, the disc, is its own partner (c4); then p sweeps
// from 1.2 to 6 and back, the left ball fattening as the right one thins,
// with p and q = p/(p − 1) read out (c5).

const R = 190;
const CL = { x: 520, y: 520 };
const CR = { x: 1240, y: 520 };
const ball = (p: number, c: { x: number; y: number }) =>
  Array.from({ length: 145 }, (_, i) => {
    const t = (i / 144) * Math.PI * 2;
    const co = Math.cos(t);
    const si = Math.sin(t);
    const r =
      p > 40
        ? 1 / Math.max(Math.abs(co), Math.abs(si))
        : 1 / (Math.abs(co) ** p + Math.abs(si) ** p) ** (1 / p);
    return `${i ? "L" : "M"} ${(c.x + R * r * co).toFixed(1)} ${(c.y - R * r * si).toFixed(1)}`;
  }).join(" ") + " Z";

export const Holder: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("holder");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const toTwo = glide(frame, c4 + 6, fps, 30);
  const sweep =
    frame < c5 + 6 ? 0 : Math.sin(((frame - c5 - 6) / 150) * Math.PI);
  const p = Math.max(
    1,
    frame < c5 + 6
      ? lerp(1, 2, toTwo)
      : lerp(2, 6, Math.max(0, sweep)) - lerp(0, 0.8, Math.max(0, -sweep)),
  );
  const q = p <= 1.0001 ? 99 : p / (p - 1);
  const shown = frame >= c3 + 4;

  return (
    <SceneShell id="holder">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="riser" at={c5 + 6} volume={0.08} />

      <Eq
        steps={[
          [
            { id: "a", t: "Σ |xₖyₖ| ≤ ‖x‖ₚ ‖y‖" },
            { id: "q", t: "ᵣ", color: colors.highlight },
          ],
        ]}
        at={[c1 + 6]}
        x={960}
        y={100}
        size={64}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c1 + 20),
        }}
      >
        1/p + 1/r = 1
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={shown ? 1 : 0}
      >
        <path
          d={ball(p, CL)}
          fill={alpha(colors.primary, 0.14)}
          stroke={colors.primary}
          strokeWidth={6}
        />
        <path
          d={ball(q, CR)}
          fill={alpha(colors.highlight, 0.14)}
          stroke={colors.highlight}
          strokeWidth={6}
        />
        <text
          x={CR.x - 360}
          y={CL.y + 16}
          fill={colors.muted}
          fontSize={60}
          fontWeight={800}
          textAnchor="middle"
        >
          ↔
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: CL.x - 200,
          width: 400,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: shown ? 1 : 0,
        }}
      >
        p = {p.toFixed(2)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: CR.x - 200,
          width: 400,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: shown ? 1 : 0,
        }}
      >
        r = {q > 50 ? "∞" : q.toFixed(2)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1500,
          padding: "10px 24px",
          borderRadius: 16,
          border: `4px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 6) * (shown ? 0 : 1),
          translate: riseIn(frame, c2 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        y ∈ ℓʳ ⇒ x ↦ Σ xₖyₖ
      </div>
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: shown ? 1 : 0,
        }}
      >
        {tx.partner}
      </div>
    </SceneShell>
  );
};
