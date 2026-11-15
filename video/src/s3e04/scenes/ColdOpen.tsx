import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { useStrings } from "../i18n";

// Why waves? A signal splits into three sine waves (c0). The music scrolls
// past while its spectrum bars bounce, thousands of times a second (c1).
// Three panels of other bases, steps and polynomials beside the sines (c2).
// Then three rows, each sliding to the right: a bump becomes a new
// function (c3), so does a parabola (c4), but the helix e^(iωt) lands on
// itself, turned by one phase (c5); eigenvector of every shift (c6). The
// other two rows dim and the helix is left (c7).

const X0 = 260;
const X1 = 1660;
const sig = (x: number) =>
  Math.sin(x) + 0.5 * Math.sin(3 * x + 1) + 0.3 * Math.sin(5 * x + 2);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const split = progress(frame, c0 + 30, 40);
  const scroll = frame * 0.08;
  const partB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 12);
  const rows = fadeIn(frame, c3 + 2, 10);
  const sh = (c: number) => 1.6 * progress(frame, c + 20, 40);
  const s3 = sh(c3);
  const s4 = sh(c4);
  const s5 = sh(c5);
  const X = (x: number) => 520 + x * 140;
  const dim = 1 - 0.75 * progress(frame, c7 + 4, 20);

  const row = (
    y: number,
    f: (x: number) => number,
    s: number,
    on: number,
    color: string,
  ) => (
    <g opacity={on}>
      <line
        x1={X(-2.2)}
        y1={y}
        x2={X(6.5)}
        y2={y}
        stroke={alpha(colors.paper, 0.3)}
        strokeWidth={2}
      />
      <path
        d={path(f, -2, 6.3, X, (v) => y - 55 * v)}
        fill="none"
        stroke={alpha(color, 0.3)}
        strokeWidth={4}
        strokeDasharray="10 8"
      />
      <path
        d={path(
          (x) => f(x - s),
          -2,
          6.3,
          X,
          (v) => y - 55 * v,
        )}
        fill="none"
        stroke={color}
        strokeWidth={6}
      />
    </g>
  );
  // the helix e^(iωt) seen from the side: its real part, with the
  // imaginary part as depth (dots get bigger in front)
  const W = 2.2;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pluck3" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 30} volume={0.1} />
      <Sfx name="tick" at={c1 + 10} volume={0.06} />
      <Sfx name="tick" at={c1 + 30} volume={0.06} />
      <Sfx name="pop" at={c2 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c4 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c5 + 20} volume={0.1} />
      <Sfx name="ding" at={c5 + 60} volume={0.16} />
      <Sfx name="chime" at={c7 + 10} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={partA * fadeOut(frame, c1, 10)}>
          <path
            d={path(
              sig,
              0,
              4 * Math.PI,
              (x) => X0 + (x / (4 * Math.PI)) * (X1 - X0),
              (v) => 300 - 70 * v,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          {[
            (x: number) => Math.sin(x),
            (x: number) => 0.5 * Math.sin(3 * x + 1),
            (x: number) => 0.3 * Math.sin(5 * x + 2),
          ].map((f, i) => (
            <path
              key={i}
              d={path(
                f,
                0,
                4 * Math.PI,
                (x) => X0 + (x / (4 * Math.PI)) * (X1 - X0),
                (v) => 300 + split * (170 + i * 130) - 70 * v,
              )}
              fill="none"
              stroke={[colors.highlight, colors.green, colors.orange][i]}
              strokeWidth={4}
              opacity={split}
            />
          ))}
        </g>
        <g opacity={fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10)}>
          <path
            d={path(
              (x) =>
                sig(x + scroll * 6) * (0.6 + 0.4 * Math.sin(x * 0.3 + scroll)),
              0,
              6 * Math.PI,
              (x) => 200 + (x / (6 * Math.PI)) * 900,
              (v) => 420 - 90 * v,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={4}
          />
          {Array.from({ length: 16 }, (_, k) => {
            const h =
              40 +
              220 *
                Math.abs(
                  Math.sin(frame * 0.21 + k * 1.7) * Math.exp(-k * 0.12),
                );
            return (
              <rect
                key={k}
                x={1240 + k * 34}
                y={640 - h}
                width={24}
                height={h}
                rx={4}
                fill={k % 3 ? colors.highlight : colors.green}
              />
            );
          })}
        </g>
        <g opacity={partB}>
          {[0, 1, 2].map((p) => {
            const x0 = 220 + p * 520;
            const fs =
              p === 0
                ? [
                    (x: number) => (x < 0.5 ? 1 : -1),
                    (x: number) => (x % 0.5 < 0.25 ? 1 : -1),
                  ]
                : p === 1
                  ? [
                      (x: number) => 2 * x - 1,
                      (x: number) => 1.5 * (2 * x - 1) ** 2 - 0.5,
                    ]
                  : [
                      (x: number) => Math.sin(2 * Math.PI * x),
                      (x: number) => Math.cos(4 * Math.PI * x),
                    ];
            return (
              <g key={p} opacity={fadeIn(frame, c2 + 8 + p * 10, 8)}>
                <rect
                  x={x0}
                  y={230}
                  width={440}
                  height={380}
                  rx={20}
                  fill={alpha(colors.paper, 0.04)}
                  stroke={p === 2 ? colors.primary : alpha(colors.paper, 0.3)}
                  strokeWidth={p === 2 ? 5 : 2}
                />
                {fs.map((f, i) => (
                  <path
                    key={i}
                    d={path(
                      f,
                      0,
                      0.999,
                      (x) => x0 + 30 + x * 380,
                      (v) => 330 + i * 170 - 60 * v,
                      200,
                    )}
                    fill="none"
                    stroke={[colors.highlight, colors.green][i]}
                    strokeWidth={4}
                  />
                ))}
              </g>
            );
          })}
        </g>
        {row(
          240,
          (x) => 1.6 * Math.exp(-((x - 0.5) ** 2) * 2),
          s3,
          rows * dim,
          colors.orange,
        )}
        {row(
          470,
          (x) => 0.12 * (x - 2) ** 2 - 0.8,
          s4,
          fadeIn(frame, c4 + 2, 10) * dim,
          colors.green,
        )}
        {/* the helix: dots along t, real part up, imaginary part as size */}
        <g opacity={fadeIn(frame, c5 + 2, 10)}>
          <line
            x1={X(-2.2)}
            y1={700}
            x2={X(6.5)}
            y2={700}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          {Array.from({ length: 90 }, (_, k) => {
            const x = -2 + (8.3 * k) / 89;
            const ph = W * (x - s5);
            const ghost = W * x;
            return (
              <g key={k}>
                <circle
                  cx={X(x)}
                  cy={700 - 55 * Math.cos(ghost)}
                  r={4 + 3 * Math.sin(ghost)}
                  fill={alpha(colors.highlight, 0.25)}
                />
                <circle
                  cx={X(x)}
                  cy={700 - 55 * Math.cos(ph)}
                  r={5 + 4 * Math.sin(ph)}
                  fill={colors.highlight}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={1240}
          y={680}
          size={36}
          color={colors.green}
        >
          {tx.perSecond}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 40}
          x={1300}
          y={640}
          size={40}
          color={colors.primary}
        >
          {tx.whyThis}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c3 + 50}
        x={1470}
        y={180}
        size={34}
        color={colors.orange}
      >
        {tx.newFn}
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 50}
        x={1470}
        y={410}
        size={34}
        color={colors.green}
      >
        {tx.newFn}
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 60}
        x={1470}
        y={650}
        size={34}
        color={colors.highlight}
      >
        {tx.sameFn}
      </Chip>
      <div>
        <Chip
          frame={frame}
          at={c6 + 8}
          x={120}
          y={760}
          size={40}
          color={colors.primary}
        >
          {tx.eigen}
        </Chip>
      </div>
    </SceneShell>
  );
};
