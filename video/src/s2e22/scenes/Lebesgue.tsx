import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Lebesgue slices the heights. f = x² twice: on the left cut into vertical
// strips (Riemann), on the right into horizontal layers (Lebesgue) (c0).
// Coins scattered, then sorted into piles by value and counted (c1). A
// height line t sweeps up; the part of the x-axis where f > t lights, its
// length 1 − √t read out (c2). The layers stack up into the area under
// the curve, the total climbing to ⅓ (c3). Dirichlet's function by the
// same recipe: 1 × m(ℚ) = 0 (c4). A chip: lim ∫ = ∫ lim (c5).

const P = { x: 980, y: 740, w: 760, h: 520 };
const L = { x: 160, y: 740, w: 640, h: 440 };

export const Lebesgue: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lebesgue");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part0 = fadeOut(frame, c1, 10);
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c4, 10);
  const part3 = fadeIn(frame, c4 + 4, 10);
  const t = Math.min(0.95, Math.max(0, (frame - c2 - 10) / 120));
  const layers = Math.min(20, Math.floor(Math.max(0, frame - c3 - 6) / 6));
  const area = Array.from(
    { length: layers },
    (_, i) => (1 - Math.sqrt((i + 0.5) / 20)) / 20,
  ).reduce((a, b) => a + b, 0);
  const sort = glide(frame, c1 + 30, fps, 30);
  const coin = (i: number) => {
    const r = (n: number) => {
      const v = Math.sin(i * 91.7 + n * 47.3) * 9631.17;
      return v - Math.floor(v);
    };
    const kind = i % 3;
    const from = { x: 300 + r(1) * 1300, y: 260 + r(2) * 420 };
    const to = { x: 600 + kind * 360, y: 720 - Math.floor(i / 3) * 26 };
    return { x: lerp(from.x, to.x, sort), y: lerp(from.y, to.y, sort), kind };
  };
  const curve = (o: { x: number; y: number; w: number; h: number }) =>
    Array.from(
      { length: 101 },
      (_, i) =>
        `${i ? "L" : "M"} ${o.x + o.w * (i / 100)} ${o.y - o.h * (i / 100) ** 2}`,
    ).join(" ");

  return (
    <SceneShell id="lebesgue">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="clink" at={c1 + 60} volume={0.18} />
      <Sfx name="riser" at={c2 + 10} volume={0.08} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 12} volume={0.08} />
      ))}
      <Sfx name="ding" at={c4 + 30} volume={0.26} />
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: part0 }}>
        <svg width={1920} height={1080}>
          {[L, P].map((o, k) => (
            <g key={k}>
              <line
                x1={o.x}
                y1={o.y}
                x2={o.x + o.w}
                y2={o.y}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              {k === 0
                ? Array.from({ length: 10 }).map((_, i) => {
                    const x = (i + 0.5) / 10;
                    return (
                      <rect
                        key={i}
                        x={o.x + (o.w * i) / 10 + 2}
                        y={o.y - o.h * x * x}
                        width={o.w / 10 - 4}
                        height={o.h * x * x}
                        fill={alpha(colors.primary, 0.3)}
                        stroke={colors.primary}
                        strokeWidth={2}
                      />
                    );
                  })
                : Array.from({ length: 10 }).map((_, i) => {
                    const tt = (i + 0.5) / 10;
                    const a = Math.sqrt(tt);
                    return (
                      <rect
                        key={i}
                        x={o.x + o.w * a}
                        y={o.y - (o.h * (i + 1)) / 10 + 2}
                        width={o.w * (1 - a)}
                        height={o.h / 10 - 4}
                        fill={alpha(colors.green, 0.3)}
                        stroke={colors.green}
                        strokeWidth={2}
                      />
                    );
                  })}
              <path
                d={curve(o)}
                fill="none"
                stroke={k ? colors.green : colors.primary}
                strokeWidth={5}
              />
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: L.x,
            fontSize: 48,
            fontWeight: 800,
            color: colors.primary,
          }}
        >
          {tx.riemann}
        </div>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: P.x,
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
          }}
        >
          {tx.lebesgue}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 30 }).map((_, i) => {
            const c = coin(i);
            return (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={[20, 26, 32][c.kind]}
                fill={[colors.orange, colors.paper, colors.primary][c.kind]}
                stroke={colors.bg}
                strokeWidth={3}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={P.x}
            y1={P.y}
            x2={P.x + P.w}
            y2={P.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: layers }).map((_, i) => {
            const tt = (i + 0.5) / 20;
            const a = Math.sqrt(tt);
            return (
              <rect
                key={i}
                x={P.x + P.w * a}
                y={P.y - (P.h * (i + 1)) / 20 + 1}
                width={P.w * (1 - a)}
                height={P.h / 20 - 2}
                fill={alpha(colors.green, 0.5)}
              />
            );
          })}
          <path
            d={curve(P)}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
          />
          {frame < c3 + 6 ? (
            <g>
              <line
                x1={P.x - 20}
                y1={P.y - P.h * t}
                x2={P.x + P.w + 20}
                y2={P.y - P.h * t}
                stroke={colors.orange}
                strokeWidth={4}
                strokeDasharray="12 8"
              />
              <rect
                x={P.x + P.w * Math.sqrt(t)}
                y={P.y - 8}
                width={P.w * (1 - Math.sqrt(t))}
                height={16}
                fill={colors.orange}
              />
            </g>
          ) : null}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 160,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              color: colors.orange,
              whiteSpace: "nowrap",
            }}
          >
            m{"{"}f &gt; t{"}"} = 1 − √t{" "}
            <span style={{ fontFamily: fonts.mono, marginLeft: 30 }}>
              ·t = {t.toFixed(2)}
            </span>
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              color: colors.green,
              opacity: fadeIn(frame, c3 + 6),
              whiteSpace: "nowrap",
            }}
          >
            ∫ x² ={" "}
            <span style={{ fontFamily: fonts.mono }}>{area.toFixed(3)}</span> →
            ⅓
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <Eq
          steps={[
            [
              { id: "a", t: "∫ 1" },
              { id: "q", t: "ℚ", color: colors.highlight },
              { id: "b", t: " = 1 · m(ℚ) = 0" },
            ],
          ]}
          at={[c4 + 30]}
          x={960}
          y={300}
          size={80}
        />
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c5 + 6),
            translate: riseIn(frame, c5 + 6, 14),
          }}
        >
          lim ∫ fₙ = ∫ lim fₙ
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
