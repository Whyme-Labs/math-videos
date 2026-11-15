import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Multiplication as a linear map. The complex plane's grid and the unit
// square; multiplying by α = 2 + i turns and stretches it (c0). The
// matrix [2 −1; 1 2] (c1). The square becomes a parallelogram of area
// 5 = 2² + 1², the norm (c2). Then by β = 3 + 2i as well: area 5 · 13 =
// 65 (c3). The two-squares identity with these numbers (c4). Trace 4 and
// the characteristic polynomial x² − 4x + 5 (c5).

const O = { x: 600, y: 560 };
const U = 60;

export const Norm: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("norm");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const t1 = progress(frame, c0 + 20, 30);
  const t2 = progress(frame, c3 + 10, 30);
  // interpolate the matrix from I to A = m(2 + i), then to m((2 + i)(3 + 2i)) = m(4 + 7i)
  const ar = 1 + (2 - 1) * t1 + (4 - 2) * t2;
  const ai = 0 + 1 * t1 + (7 - 1) * t2;
  const scale = t2 > 0 ? 1 - 0.5 * t2 : 1;
  const M = (x: number, y: number) =>
    [
      O.x + scale * U * (ar * x - ai * y),
      O.y - scale * U * (ai * x + ar * y),
    ] as const;
  const sq = [M(0, 0), M(1, 0), M(1, 1), M(0, 1)];
  const area = ar * ar + ai * ai;

  return (
    <SceneShell id="norm">
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="pop" at={c1 + 8} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="pluck3" at={c4 + 10} volume={0.12} />
      <Sfx name="chime" at={c5 + 30} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="nm-clip">
            <rect x={140} y={150} width={940} height={680} />
          </clipPath>
        </defs>
        <g clipPath="url(#nm-clip)" opacity={fadeIn(frame, c0 + 2, 8)}>
          {Array.from({ length: 21 }, (_, k) => {
            const v = k - 10;
            const [x1, y1] = M(v, -10);
            const [x2, y2] = M(v, 10);
            const [x3, y3] = M(-10, v);
            const [x4, y4] = M(10, v);
            return (
              <g key={k}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={alpha(colors.paper, v === 0 ? 0.6 : 0.18)}
                  strokeWidth={2}
                />
                <line
                  x1={x3}
                  y1={y3}
                  x2={x4}
                  y2={y4}
                  stroke={alpha(colors.paper, v === 0 ? 0.6 : 0.18)}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <path
            d={`M ${sq.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`}
            fill={alpha(colors.primary, 0.4)}
            stroke={colors.primary}
            strokeWidth={4}
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={M(1, 0)[0]}
            y2={M(1, 0)[1]}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={M(0, 1)[0]}
            y2={M(0, 1)[1]}
            stroke={colors.orange}
            strokeWidth={7}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        × α, α = 2 + i
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1160,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: fadeIn(frame, c1 + 8),
        }}
      >
        <span
          style={{
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          m<sub style={{ fontSize: 28 }}>α</sub> =
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 80px",
            padding: "8px 18px",
            borderLeft: `4px solid ${colors.paper}`,
            borderRight: `4px solid ${colors.paper}`,
            fontFamily: fonts.mono,
            fontSize: 46,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          <span style={{ color: colors.primary }}>2</span>
          <span style={{ color: colors.orange }}>−1</span>
          <span style={{ color: colors.primary }}>1</span>
          <span style={{ color: colors.orange }}>2</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1160,
          fontFamily: fonts.mono,
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 8),
        }}
      >
        {tx.norm} = det = {area.toFixed(0)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1160,
          fontFamily: fonts.mono,
          fontSize: 42,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 30),
        }}
      >
        N(αβ) = 5 · 13 = 65
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c4 + 8),
        }}
      >
        (2² + 1²)(3² + 2²) = 4² + 7²
      </div>
      <Chip
        frame={frame}
        at={c5 + 10}
        x={1160}
        y={650}
        color={colors.highlight}
        size={38}
        math
      >
        {tx.trace} = 4 · x² − 4x + 5
      </Chip>
    </SceneShell>
  );
};
