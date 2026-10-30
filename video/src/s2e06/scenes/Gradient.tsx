import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../components/stack";
import { useStrings } from "../i18n";

// The payoff: the gradient is a covector. A contour map of a hill
// (f = x² + 2y², contours every half unit). The camera dives onto a point
// on its slope; as it does, the curved contours give way to a straight,
// evenly spaced orange stack: df at that point. A step (lemon arrow)
// crosses the stack and the climb counter ticks up. Then a box labelled
// "+ perpendicular" plugs in, and only then does the dashed gradient arrow
// appear, at right angles to the sheets.

const C = { x: 960, y: 470 };
const U = 100;
const P = { x: 2, y: 1 };
const ZOOM = 6;
const levels = Array.from({ length: 34 }, (_, k) => 0.5 * (k + 1));

export const Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("gradient");
  const [c0, c1, c2] = cues;
  const dive = glide(frame, c0 + 30, fps, 100);
  const straight = fadeIn(frame, c0 + 125, 15);
  const step = ramp(frame, c1 + 20, 80);
  const plug = Math.min(1, springIn(frame, c2 + 20, fps, 10));
  const grad = glide(frame, c2 + 50, fps, 24);
  const pScreen = { x: C.x + P.x * U, y: C.y - P.y * U };
  // zoomed view: df_p = 4 dx + 4 dy, one sheet per half unit of height
  const Z = U * ZOOM;
  const zscr = (x: number, y: number) => ({ x: 960 + x * Z, y: 480 - y * Z });
  const df = { a: 8, b: 8 };
  const stepV = { x: 0.32 * step, y: -0.05 * step };
  const climb = df.a * stepV.x + df.b * stepV.y;

  return (
    <SceneShell id="gradient">
      <Sfx name="whoosh" at={c0 + 30} volume={0.14} />
      <Sfx name="ding" at={c0 + 130} />
      {[0.25, 0.5, 0.75, 1].map((t, k) => (
        <Sfx
          key={k}
          name="tick"
          at={c1 + 20 + Math.round(t * 74)}
          volume={0.12}
        />
      ))}
      <Sfx name="clink" at={c2 + 20} volume={0.2} />
      <Sfx name="whoosh" at={c2 + 50} volume={0.12} />
      <Sfx name="chime" at={c2 + 74} />

      {/* the contour map, with the camera diving onto P */}
      <AbsoluteFill style={{ opacity: 1 - straight }}>
        <Camera
          zoom={lerp(1, ZOOM, dive)}
          x={lerp(0, pScreen.x - 960, dive)}
          y={lerp(0, pScreen.y - 540, dive)}
        >
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <ellipse
              cx={C.x}
              cy={C.y}
              rx={60}
              ry={42}
              fill={alpha(colors.primary, 0.3)}
            />
            {levels.map((l, k) => (
              <ellipse
                key={k}
                cx={C.x}
                cy={C.y}
                rx={U * Math.sqrt(l)}
                ry={U * Math.sqrt(l / 2)}
                fill="none"
                stroke={k % 4 === 3 ? colors.orange : alpha(colors.orange, 0.6)}
                strokeWidth={(k % 4 === 3 ? 4 : 2) / lerp(1, ZOOM * 0.6, dive)}
                opacity={fadeIn(frame, c0 + k * 0.6, 8)}
              />
            ))}
            <circle
              cx={pScreen.x}
              cy={pScreen.y}
              r={10 / lerp(1, ZOOM, dive)}
              fill={colors.primary}
            />
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 140,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c0 + 40, 10),
          }}
        >
          {tx.hill}
        </div>
      </AbsoluteFill>

      {/* close up: a straight stack, df */}
      <AbsoluteFill style={{ opacity: straight }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="gradStage">
              <rect x={120} y={90} width={1680} height={740} />
            </clipPath>
          </defs>
          <g clipPath="url(#gradStage)">
            <Stack a={df.a} b={df.b} scr={zscr} range={14} />
          </g>
          <circle cx={960} cy={480} r={12} fill={colors.primary} />
          <Arrow
            from={{ x: 960, y: 480 }}
            to={zscr(stepV.x, stepV.y)}
            width={14}
          />
          {/* the converter, and only then the gradient arrow */}
          <g
            opacity={plug}
            transform={`translate(${lerp(1900, 1480, plug)} 700)`}
          >
            <rect
              x={-210}
              y={-50}
              width={420}
              height={100}
              rx={18}
              fill={alpha(colors.bg, 0.9)}
              stroke={colors.highlight}
              strokeWidth={5}
            />
            <text
              y={16}
              fill={colors.highlight}
              fontSize={44}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.perp}
            </text>
          </g>
          <Arrow
            from={{ x: 960, y: 480 }}
            to={{
              x: 960 + 250 * grad * Math.SQRT1_2,
              y: 480 - 250 * grad * Math.SQRT1_2,
            }}
            color={colors.highlight}
            width={10}
            dashed
            opacity={grad > 0.02 ? 1 : 0}
          />
          <text
            x={700}
            y={300}
            fill={colors.orange}
            stroke={colors.bg}
            strokeWidth={10}
            paintOrder="stroke"
            fontSize={96}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            {tx.dfLabel}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1300,
            width: 420,
            padding: "18px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.primary}`,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 16),
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
            {tx.climb}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 96,
              fontWeight: 800,
              color: colors.primary,
            }}
          >
            {(Math.round(climb * 10) / 10).toFixed(1)}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
