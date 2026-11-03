import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// All norms on the plane agree, by a sandwich. A lopsided convex unit
// ball of some norm N, and the ordinary unit circle (c0). The upper
// bound: a small circle of radius 1/M fits inside N's ball, touching it
// (c1). A probe runs round the unit circle reading N(u) (c2); the
// readings have a lowest value m, where the probe settles (c3), and it
// isn't 0: a big circle of radius 1/m holds N's ball (c4). Sandwiched
// between two circles, N agrees with ordinary length. The step that used
// finite dimension lights up: the circle is compact (c5).

const C = { x: 680, y: 470 };
const S = 200;
const N = (x: number, y: number) =>
  0.85 *
  (0.55 * (Math.abs(x) + Math.abs(y)) +
    0.45 * Math.max(Math.abs(x - 0.6 * y), Math.abs(0.3 * x + y)));
const samples = Array.from({ length: 721 }, (_, i) => {
  const t = (i / 720) * Math.PI * 2;
  return { t, v: N(Math.cos(t), Math.sin(t)) };
});
const M = Math.max(...samples.map((s) => s.v));
const m = Math.min(...samples.map((s) => s.v));
const tMin = samples.find((s) => s.v === m)?.t ?? 0;

export const Finite: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("finite");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const ballPath =
    samples
      .map((s, i) => {
        const r = 1 / s.v;
        return `${i ? "L" : "M"} ${(C.x + S * r * Math.cos(s.t)).toFixed(1)} ${(C.y - S * r * Math.sin(s.t)).toFixed(1)}`;
      })
      .join(" ") + " Z";
  const inner = glide(frame, c1 + 6, fps, 24);
  const settle = glide(frame, c3 + 6, fps, 30);
  const run = (frame - c2) * 0.06;
  const tp = lerp(
    run,
    tMin + Math.PI * 2 * Math.ceil(run / (Math.PI * 2)),
    settle,
  );
  const u = { x: Math.cos(tp), y: Math.sin(tp) };
  const val = N(u.x, u.y);
  const outer = glide(frame, c4 + 6, fps, 24);

  return (
    <SceneShell id="finite">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="riser" at={c2 + 6} volume={0.08} />
      <Sfx name="ding" at={c3 + 36} volume={0.26} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <path
          d={ballPath}
          fill={alpha(colors.primary, 0.12)}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 4, 10)}
        />
        <circle
          cx={C.x}
          cy={C.y}
          r={S}
          fill="none"
          stroke={colors.paper}
          strokeWidth={4}
          strokeDasharray="12 10"
          opacity={fadeIn(frame, c0 + 10, 10)}
        />
        <circle
          cx={C.x}
          cy={C.y}
          r={(S / M) * inner}
          fill={alpha(colors.green, 0.12)}
          stroke={colors.green}
          strokeWidth={5}
          opacity={fadeIn(frame, c1 + 6, 8)}
        />
        <circle
          cx={C.x}
          cy={C.y}
          r={(S / m) * outer}
          fill="none"
          stroke={colors.highlight}
          strokeWidth={5}
          opacity={fadeIn(frame, c4 + 6, 8)}
        />
        <g opacity={fadeIn(frame, c2 + 6, 8)}>
          <line
            x1={C.x}
            y1={C.y}
            x2={C.x + S * u.x}
            y2={C.y - S * u.y}
            stroke={colors.text}
            strokeWidth={4}
          />
          <circle
            cx={C.x + S * u.x}
            cy={C.y - S * u.y}
            r={14}
            fill={settle > 0.9 ? colors.highlight : colors.text}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontSize: 46,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            color: colors.green,
            opacity: fadeIn(frame, c1 + 20),
            fontFamily: fonts.math,
          }}
        >
          N(x) ≤ M‖x‖{" "}
          <span style={{ fontFamily: fonts.mono, fontSize: 40 }}>
            M = {M.toFixed(2)}
          </span>
        </div>
        <div
          style={{
            color: colors.text,
            opacity: fadeIn(frame, c2 + 6),
            fontFamily: fonts.mono,
          }}
        >
          N(u) = {val.toFixed(2)}
        </div>
        <div
          style={{
            color: colors.highlight,
            opacity: fadeIn(frame, c3 + 36),
            fontFamily: fonts.math,
          }}
        >
          {tx.min} m ={" "}
          <span style={{ fontFamily: fonts.mono }}>{m.toFixed(2)}</span> &gt; 0
        </div>
        <div
          style={{
            color: colors.text,
            opacity: fadeIn(frame, c4 + 30),
            fontFamily: fonts.math,
            translate: riseIn(frame, c4 + 30, 12),
          }}
        >
          m‖x‖ ≤ N(x) ≤ M‖x‖
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 1240,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.highlight}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 46,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c5 + 6),
          translate: riseIn(frame, c5 + 6, 12),
        }}
      >
        S¹ · {tx.compact}
      </div>
    </SceneShell>
  );
};
