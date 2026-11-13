import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path, square } from "../components/waves";
import { useStrings } from "../i18n";

// Differentiation is diagonal. A ring, half hot and half cold (c0). The
// tone cos 3x and its derivative: the same wave, shifted a quarter turn
// and three times taller (c1). An infinite diagonal matrix with entries
// …, −2i, −i, 0, i, 2i, … (c2). One small equation per tone, cₙ′ = −n² cₙ
// (c3). Bars of the coefficients fading like e^(−n²t), the high ones
// first (c4). The ring's temperature profile rounding off at the corners,
// and the ring's colours blending (c5).

const RING = { x: 1460, y: 450, r: 220 };

export const Diagonal: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("diagonal");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const t = frame >= c4 ? Math.max(0, (frame - c4 - 6) / 1500) : 0;
  const u = (x: number) => {
    if (t === 0) return square(x);
    let s = 0;
    for (let n = 1; n <= 61; n += 2)
      s += ((4 / Math.PI) * Math.exp(-n * n * t) * Math.sin(n * x)) / n;
    return s;
  };
  const leftA = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c2, 10);
  const leftB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c4, 10);
  const leftC = fadeIn(frame, c4 + 4, 10);
  const segs = 72;

  return (
    <SceneShell id="diagonal">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 5} volume={0.06} />
      ))}
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 8} volume={0.1} />
      <Sfx name="chime" at={c5 + 30} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 4, 10)}>
          {Array.from({ length: segs }, (_, i) => {
            const a0 = (2 * Math.PI * i) / segs;
            const a1 = (2 * Math.PI * (i + 1)) / segs;
            const v = Math.max(-1, Math.min(1, u((a0 + a1) / 2)));
            const col =
              v > 0
                ? alpha(colors.red, 0.25 + 0.6 * v)
                : alpha(colors.green, 0.25 - 0.6 * v);
            return (
              <path
                key={i}
                d={`M ${RING.x + RING.r * Math.cos(a0)} ${RING.y - RING.r * Math.sin(a0)} A ${RING.r} ${RING.r} 0 0 0 ${RING.x + RING.r * Math.cos(a1)} ${RING.y - RING.r * Math.sin(a1)}`}
                stroke={col}
                strokeWidth={46}
                fill="none"
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: RING.y - 30,
          left: RING.x - 120,
          width: 240,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 10),
        }}
      >
        <span style={{ color: colors.red }}>{tx.hot}</span> /{" "}
        <span style={{ color: colors.green }}>{tx.cold}</span>
      </div>
      <AbsoluteFill style={{ opacity: leftA }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={460}
            x2={1060}
            y2={460}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={path(
              (x) => Math.cos(3 * x),
              0,
              2 * Math.PI,
              (x) => 160 + (900 * x) / (2 * Math.PI),
              (v) => 460 - 60 * v,
              400,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={path(
              (x) => -3 * Math.sin(3 * x),
              0,
              2 * Math.PI,
              (x) => 160 + (900 * x) / (2 * Math.PI),
              (v) => 460 - 60 * v,
              400,
            )}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            opacity={fadeIn(frame, c1 + 20, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          d/dx eⁱⁿˣ = <span style={{ color: colors.orange }}>in</span> · eⁱⁿˣ
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: leftB }}>
        <svg width={1920} height={1080}>
          <path
            d="M 200 200 L 180 200 L 180 760 L 200 760 M 1000 200 L 1020 200 L 1020 760 L 1000 760"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          {Array.from({ length: 7 }, (_, r) =>
            Array.from({ length: 7 }, (_, c) => (
              <text
                key={`${r}-${c}`}
                x={250 + c * 112}
                y={260 + r * 76}
                textAnchor="middle"
                fill={r === c ? colors.orange : alpha(colors.paper, 0.35)}
                fontSize={r === c ? 34 : 30}
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={fadeIn(frame, c2 + 6 + r * 5, 6)}
              >
                {r === c ? ["−3i", "−2i", "−i", "0", "i", "2i", "3i"][r] : "0"}
              </text>
            )),
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 180,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, c3, 8),
            whiteSpace: "nowrap",
          }}
        >
          d/dx = diag(in)
        </div>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 180,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 8),
            whiteSpace: "nowrap",
          }}
        >
          uₜ = uₓₓ ⟹ cₙ′ = −n² cₙ
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: leftC }}>
        <svg width={1920} height={1080}>
          <line
            x1={160}
            y1={420}
            x2={1060}
            y2={420}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {Array.from({ length: 8 }, (_, j) => {
            const n = 2 * j + 1;
            const h = (220 / n) * Math.exp(-n * n * t);
            return (
              <g key={j}>
                <rect
                  x={190 + j * 108}
                  y={420 - h}
                  width={70}
                  height={h}
                  rx={6}
                  fill={colors.orange}
                />
                <text
                  x={225 + j * 108}
                  y={460}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={28}
                  fontFamily={fonts.mono}
                >
                  {n}
                </text>
              </g>
            );
          })}
          <line
            x1={160}
            y1={680}
            x2={1060}
            y2={680}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
            opacity={fadeIn(frame, c5 + 4, 8)}
          />
          <path
            d={path(
              u,
              -Math.PI,
              Math.PI,
              (x) => 160 + (900 * (x + Math.PI)) / (2 * Math.PI),
              (v) => 680 - 110 * v,
              500,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeIn(frame, c5 + 4, 8)}
          />
          <path
            d={path(
              square,
              -Math.PI + 0.001,
              Math.PI - 0.001,
              (x) => 160 + (900 * (x + Math.PI)) / (2 * Math.PI),
              (v) => 680 - 110 * v,
              300,
            )}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
            opacity={fadeIn(frame, c5 + 4, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          cₙ(t) = e⁻ⁿ²ᵗ cₙ(0) · t ={" "}
          <span style={{ fontFamily: fonts.mono }}>{t.toFixed(2)}</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
