import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Mat } from "../../s2e18/components/mat";
import { useStrings } from "../i18n";

// One matrix, three operator norms. A = [1 2; 3 4] (c0). Three panels,
// one per ruler: the unit diamond, disc and square each pushed through A,
// the image drawn with the smallest ball of the same ruler around it
// (c1). That ball's size is the operator norm: 6, 5.46, 7 (c2). A chip:
// the size of a map depends on the ruler (c3).

const A = [1, 2, 3, 4];
const S = 26;
const CX = [380, 960, 1540];
const CY = 560;
const norms = [6, 5.465, 7];
const shape = (p: number) =>
  Array.from({ length: 145 }, (_, i) => {
    const t = (i / 144) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const r =
      p === Infinity
        ? 1 / Math.max(Math.abs(c), Math.abs(s))
        : 1 / (Math.abs(c) ** p + Math.abs(s) ** p) ** (1 / p);
    return { x: r * c, y: r * s };
  });

export const MatrixNorms: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("matrix");
  const [c0, c1, c2, c3] = cues;
  const go = glide(frame, c1 + 10, fps, 30);
  const ring = glide(frame, c2 + 6, fps, 24);

  return (
    <SceneShell id="matrix">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx
          key={i}
          name={(["pluck1", "pluck3", "pluck5"] as const)[i]}
          at={c2 + 30 + i * 12}
          volume={0.14}
        />
      ))}
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <Mat m={A} x={960} y={190} cell={90} opacity={fadeIn(frame, c0 + 6, 8)} />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={fadeIn(frame, c1 + 4, 8)}
      >
        {[1, 2, Infinity].map((p, i) => {
          const col = [colors.primary, colors.green, colors.highlight][i];
          const pts = shape(p);
          const img = pts.map((q) => ({
            x: q.x + (A[0] * q.x + A[1] * q.y - q.x) * go,
            y: q.y + (A[2] * q.x + A[3] * q.y - q.y) * go,
          }));
          const d = (arr: { x: number; y: number }[], k = 1) =>
            arr
              .map(
                (q, j) =>
                  `${j ? "L" : "M"} ${(CX[i] + q.x * S * k).toFixed(1)} ${(CY - q.y * S * k).toFixed(1)}`,
              )
              .join(" ") + " Z";
          return (
            <g key={i}>
              <path
                d={d(pts)}
                fill="none"
                stroke={alpha(col, 0.6)}
                strokeWidth={3}
              />
              <path
                d={d(img)}
                fill={alpha(col, 0.15)}
                stroke={col}
                strokeWidth={5}
              />
              <path
                d={d(pts, norms[i] * ring)}
                fill="none"
                stroke={col}
                strokeWidth={3}
                strokeDasharray="10 8"
                opacity={ring}
              />
            </g>
          );
        })}
      </svg>
      {tx.rulers.map((r, i) => (
        <div
          key={r}
          style={{
            position: "absolute",
            top: 760,
            left: CX[i] - 200,
            width: 400,
            textAlign: "center",
            fontSize: 44,
            fontWeight: 800,
            color: [colors.primary, colors.green, colors.highlight][i],
            opacity: fadeIn(frame, c1 + 4, 8),
            whiteSpace: "nowrap",
          }}
        >
          {r}:{" "}
          <span
            style={{
              fontFamily: fonts.mono,
              opacity: fadeIn(frame, c2 + 30 + i * 12, 8),
            }}
          >
            {norms[i] === 5.465 ? "5.46" : norms[i]}
          </span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1300,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
        }}
      >
        ‖A‖ = ?
      </div>
    </SceneShell>
  );
};
