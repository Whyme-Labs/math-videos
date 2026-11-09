import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Pointwise bounded is not uniformly bounded. Bumps fₙ(x) = n²x e^{−nx}
// appear one by one; a probe at a fixed x reads all of them, and the
// readings stay small (c0). Chip: bounded together? (c1). More bumps,
// their peaks n/e at x = 1/n climbing up a dashed trail (c2). On the
// right, finite sequences: unit cells eₙ and bars fₙ(eₙ) = n (c3);
// chip: c₀₀ has holes (c4).

const PX = 160;
const PW = 900;
const PY = 760;
const XM = 1.6;
const sx = (x: number) => PX + (PW * x) / XM;
const sy = (y: number) => PY - 130 * y;
const bump = (n: number) => (x: number) => n * n * x * Math.exp(-n * x);
const X0 = 0.9;

export const Naive: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("naive");
  const [c0, c1, c2, c3, c4] = cues;
  const shown =
    frame < c2
      ? Math.min(3, 1 + Math.floor((frame - c0 - 6) / 20))
      : Math.min(8, 3 + Math.floor((frame - c2 - 6) / 12));
  const cells = Math.min(8, Math.max(0, Math.floor((frame - c3 - 6) / 6)));

  return (
    <SceneShell id="naive">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 20} volume={0.1} />
      ))}
      <Sfx name="pluck2" at={c1 + 6} volume={0.12} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx
          key={i}
          name="pluck1"
          at={c2 + 6 + i * 12}
          volume={0.07 + 0.01 * i}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 6} volume={0.06} />
      ))}
      <Sfx name="thud" at={c4 + 8} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={PX}
            y1={PY}
            x2={PX}
            y2={sy(3.9)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          {Array.from({ length: shown }, (_, k) => {
            const n = k + 1;
            const g = bump(n);
            return (
              <g key={n}>
                <path
                  d={Array.from(
                    { length: 241 },
                    (_, i) =>
                      `${i ? "L" : "M"} ${sx((XM * i) / 240)} ${sy(g((XM * i) / 240))}`,
                  ).join(" ")}
                  fill="none"
                  stroke={
                    n === shown ? colors.primary : alpha(colors.primary, 0.45)
                  }
                  strokeWidth={n === shown ? 5 : 3}
                />
                <circle
                  cx={sx(X0)}
                  cy={sy(g(X0))}
                  r={9}
                  fill={colors.highlight}
                />
                {frame >= c2 && (
                  <circle
                    cx={sx(1 / n)}
                    cy={sy(n / Math.E)}
                    r={10}
                    fill={colors.red}
                  />
                )}
              </g>
            );
          })}
          <line
            x1={sx(X0)}
            y1={PY}
            x2={sx(X0)}
            y2={sy(3.9)}
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <text
            x={sx(X0) + 12}
            y={PY + 44}
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
          >
            x
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 4, 8)}>
          <line
            x1={1220}
            y1={760}
            x2={1780}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: cells }, (_, k) => (
            <g key={k}>
              <rect
                x={1236 + k * 68}
                y={760 - 52 * (k + 1)}
                width={44}
                height={52 * (k + 1)}
                fill={colors.red}
                opacity={0.85}
              />
              <text
                x={1258 + k * 68}
                y={800}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={28}
                fontFamily={fonts.math}
              >
                {`e${"₁₂₃₄₅₆₇₈"[k]}`}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <Chip frame={frame} at={c1 + 6} x={PX} y={120} color={colors.text}>
        {tx.uniformly}
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 210,
          left: PX,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c2 + 20) * fadeOut(frame, c3, 8),
          whiteSpace: "nowrap",
        }}
      >
        {tx.peak} = n/e → ∞
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1220,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 6),
          whiteSpace: "nowrap",
        }}
      >
        fₙ(x) = n·xₙ on c₀₀
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 1220,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c3 + 40),
          whiteSpace: "nowrap",
        }}
      >
        fₙ(eₙ) = n
      </div>
      <Chip frame={frame} at={c4 + 8} x={1220} y={270} color={colors.red}>
        {tx.holes}
      </Chip>
    </SceneShell>
  );
};
