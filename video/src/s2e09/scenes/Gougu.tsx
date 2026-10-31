import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《周髀算经》: 商高's 勾三股四弦五. A right
// triangle draws itself with its three sides labelled. Then a square grows
// on each side and fills with unit cells, 9, 16 and 25, and "9 + 16 = 25"
// lands. Last, the oldest quadratic form x² + y² sits large on the right
// and its plus sign turns into Minkowski's red minus.

const C = { x: 560, y: 300 };
const U = 75;
const A = { x: C.x + 3 * U, y: C.y };
const B = { x: C.x, y: C.y + 4 * U };
const N = { x: 4 * U, y: 3 * U };

const Cells: React.FC<{
  readonly o: { x: number; y: number };
  readonly u: { x: number; y: number };
  readonly v: { x: number; y: number };
  readonly n: number;
  readonly fill: number;
  readonly color: string;
}> = ({ o, u, v, n, fill, color }) => (
  <g>
    {Array.from({ length: n * n }).map((_, k) => {
      if (k / (n * n) > fill) return null;
      const i = k % n;
      const j = Math.floor(k / n);
      const p = (a: number, b: number) => ({
        x: o.x + a * u.x + b * v.x,
        y: o.y + a * u.y + b * v.y,
      });
      const q = [
        p(i / n, j / n),
        p((i + 1) / n, j / n),
        p((i + 1) / n, (j + 1) / n),
        p(i / n, (j + 1) / n),
      ];
      return (
        <polygon
          key={k}
          points={q.map((z) => `${z.x},${z.y}`).join(" ")}
          fill={alpha(color, 0.45)}
          stroke={alpha(colors.bg, 0.8)}
          strokeWidth={2}
        />
      );
    })}
  </g>
);

export const Gougu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("gougu");
  const [c0, c1, c2] = cues;
  const draw = ramp(frame, c0 + 10, 30);
  const fills = [0, 1, 2].map((k) => ramp(frame, c1 + 10 + k * 26, 24));
  const sum = Math.min(1, springIn(frame, c1 + 90, fps, 10));
  const flip = ramp(frame, c2 + 30, 14);
  const minus = flip > 0.5;

  return (
    <SceneShell id="gougu">
      <Sfx name="scratch" at={c0 + 10} volume={0.16} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pluck3" at={c1 + 10 + k * 26} volume={0.14} />
      ))}
      <Sfx name="ding" at={c1 + 90} />
      <Sfx name="thud" at={c2 + 30} volume={0.3} />
      <Sfx name="chime" at={c2 + 44} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeOut(frame, c2, 10) * 0.6 + 0.4}>
          <Cells
            o={C}
            u={{ x: 3 * U, y: 0 }}
            v={{ x: 0, y: -3 * U }}
            n={3}
            fill={fills[0]}
            color={colors.orange}
          />
          <Cells
            o={C}
            u={{ x: 0, y: 4 * U }}
            v={{ x: -4 * U, y: 0 }}
            n={4}
            fill={fills[1]}
            color={colors.highlight}
          />
          <Cells
            o={A}
            u={{ x: B.x - A.x, y: B.y - A.y }}
            v={N}
            n={5}
            fill={fills[2]}
            color={colors.primary}
          />
          <polygon
            points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`}
            fill="none"
            stroke={colors.paper}
            strokeWidth={7}
            strokeDasharray={1200}
            strokeDashoffset={1200 * (1 - draw)}
          />
          {[
            {
              p: { x: C.x + 1.5 * U, y: C.y - 1.5 * U + 14 },
              t: tx.gou,
              c: colors.orange,
            },
            {
              p: { x: C.x - 2 * U, y: C.y + 2 * U + 14 },
              t: tx.gu,
              c: colors.highlight,
            },
            {
              p: { x: (A.x + B.x + N.x) / 2, y: (A.y + B.y + N.y) / 2 + 14 },
              t: tx.xian,
              c: colors.primary,
            },
          ].map((l) => (
            <text
              key={l.t}
              x={l.p.x}
              y={l.p.y}
              fill={l.c}
              stroke={colors.bg}
              strokeWidth={8}
              paintOrder="stroke"
              fontSize={42}
              textAnchor="middle"
              fontWeight={900}
              opacity={fadeIn(frame, c0 + 40)}
            >
              {l.t}
            </text>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 72,
          fontWeight: 800,
          color: colors.text,
          opacity: sum * fadeOut(frame, c2, 10),
          translate: riseIn(frame, c1 + 90, 16),
        }}
      >
        9 + 16 = 25
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 110,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 6, 10),
        }}
      >
        x²{" "}
        <span
          style={{
            display: "inline-block",
            color: minus ? colors.red : colors.primary,
            rotate: `${flip * 180}deg`,
          }}
        >
          {minus ? "−" : "+"}
        </span>{" "}
        y²
      </div>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.zhoubi}
      </div>
    </SceneShell>
  );
};
