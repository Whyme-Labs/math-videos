import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";

// The transformation law, forced by the legs. A tensor drawn as a node
// with two lemon (vector) legs and one orange (covector) leg. The basis
// changes: a lemon "P⁻¹" token runs out along every lemon leg and an orange
// "P" token along every orange leg. Then two smaller nodes: a map (one leg
// of each colour) collects P⁻¹ and P, and a form (two orange legs) collects
// P and P; their formulas light up one after the other.

type Leg = { readonly a: number; readonly kind: "v" | "c" };

const Node: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly legs: Leg[];
  readonly len: number;
  readonly run: number;
  readonly s: number;
}> = ({ x, y, legs, len, run, s }) => (
  <g opacity={s} transform={`translate(${x} ${y}) scale(${s})`}>
    {legs.map((l, k) => {
      const dx = Math.cos(l.a);
      const dy = Math.sin(l.a);
      const c = l.kind === "v" ? colors.primary : colors.orange;
      const t = 0.25 + 0.75 * run;
      return (
        <g key={k}>
          <line
            x1={0}
            y1={0}
            x2={dx * len}
            y2={dy * len}
            stroke={c}
            strokeWidth={14}
            strokeLinecap="round"
          />
          <g
            opacity={run > 0 ? 1 : 0}
            transform={`translate(${dx * len * t + dy * 46} ${dy * len * t - dx * 46})`}
          >
            <rect
              x={-46}
              y={-30}
              width={92}
              height={56}
              rx={12}
              fill={alpha(colors.bg, 0.9)}
              stroke={c}
              strokeWidth={4}
            />
            <text
              y={14}
              fill={c}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {l.kind === "v" ? "P⁻¹" : "P"}
            </text>
          </g>
        </g>
      );
    })}
    <circle r={46} fill={colors.primary} stroke={colors.ink} strokeWidth={5} />
  </g>
);

export const Legs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("legs");
  const [c0, c1] = cues;
  const big = Math.min(1, springIn(frame, c0 + 10, fps, 10));
  const run = ramp(frame, c0 + 50, 30);
  const part1 = fadeOut(frame, c1, 10);
  const mapN = Math.min(1, springIn(frame, c1 + 10, fps, 10));
  const formN = Math.min(1, springIn(frame, c1 + 60, fps, 10));
  const mapRun = ramp(frame, c1 + 20, 20);
  const formRun = ramp(frame, c1 + 70, 20);
  const up = -Math.PI / 2;

  return (
    <SceneShell id="legs">
      <Sfx name="pop" at={c0 + 10} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 50} volume={0.12} />
      <Sfx name="ding" at={c0 + 80} />
      <Sfx name="pop" at={c1 + 10} volume={0.14} />
      <Sfx name="ding" at={c1 + 40} />
      <Sfx name="pop" at={c1 + 60} volume={0.14} />
      <Sfx name="chime" at={c1 + 90} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Node
            x={960}
            y={470}
            len={220}
            run={run}
            s={big}
            legs={[
              { a: up - 0.6, kind: "v" },
              { a: up + 0.6, kind: "v" },
              { a: Math.PI / 2, kind: "c" },
            ]}
          />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Node
            x={600}
            y={420}
            len={170}
            run={mapRun}
            s={mapN}
            legs={[
              { a: up, kind: "v" },
              { a: Math.PI / 2, kind: "c" },
            ]}
          />
          <Node
            x={1320}
            y={420}
            len={170}
            run={formRun}
            s={formN}
            legs={[
              { a: Math.PI / 2 - 0.6, kind: "c" },
              { a: Math.PI / 2 + 0.6, kind: "c" },
            ]}
          />
        </svg>
        {[
          {
            left: 600,
            s: fadeIn(frame, c1 + 40) * fadeOut(frame, c1 + 62, 8),
            node: "map" as const,
          },
          { left: 1320, s: fadeIn(frame, c1 + 90), node: "form" as const },
        ].map((f) => (
          <div
            key={f.node}
            style={{
              position: "absolute",
              top: 690,
              left: f.left - 250,
              width: 500,
              textAlign: "center",
              fontFamily: fonts.math,
              fontSize: 80,
              fontWeight: 800,
              color: f.node === "map" ? colors.primary : colors.orange,
              opacity: f.s,
            }}
          >
            {f.node === "map" ? (
              "P⁻¹ A P"
            ) : (
              <>
                P<sup>T</sup> B P
              </>
            )}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
