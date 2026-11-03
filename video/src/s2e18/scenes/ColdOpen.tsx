import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Box3,
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { RightAngle } from "../../s2e17/components/stage";
import { Mat } from "../components/mat";
import { A, V1, V2, ellipsePath } from "../components/ellipse";
import { useStrings } from "../i18n";

// Two puzzles. A box tossed with a spin tumbles every which way (c0).
// Three axes light up inside it, and spun about any one of them it turns
// cleanly, switching from axis to axis (c1). The box turns into a lumpy
// potato that still has its three axes (c2), with right-angle marks
// between them (c3). Then a flat puzzle: the curve 5x² + 4xy + 2y² = 1
// draws itself, a tilted ellipse (c4); its long and short axes appear,
// crossing at 90° (c5). The matrix [5 2; 2 2] beside it flips across its
// diagonal and nothing changes: symmetric (c6). Last a chip: symmetric ⇒
// perpendicular axes (c7).

const AX: { d: V3; c: () => string }[] = [
  { d: [1, 0, 0], c: () => colors.primary },
  { d: [0, 1, 0], c: () => colors.highlight },
  { d: [0, 0, 1], c: () => colors.green },
];
const O = { x: 760, y: 480 };
const S = 330;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const t = frame - c0;
  // tumbling, then clean spins about one axis at a time (a whole turn
  // every 60 frames, so switching axes never jumps)
  const clean = frame >= c1 + 10;
  const k = Math.floor(Math.max(0, frame - c1 - 10) / 60) % 3;
  const spin = (Math.max(0, frame - c1 - 10) / 60) * Math.PI * 2;
  const rot: V3 = clean
    ? [k === 0 ? spin : 0, k === 1 ? spin : 0, k === 2 ? spin : 0]
    : [
        t * 0.09 + 0.6 * Math.sin(t * 0.07),
        t * 0.05 + 0.8 * Math.sin(t * 0.05 + 1),
        t * 0.07,
      ];
  const part3d = fadeOut(frame, c4, 12);
  const axes = fadeIn(frame, c1 + 4, 8);
  const potato = fadeIn(frame, c2 + 6, 16);
  const draw = glide(frame, c4 + 6, fps, 40);
  const diam = fadeIn(frame, c5 + 6, 10);
  const flip = glide(frame, c6 + 30, fps, 30);
  const lump = (u: number, v: number): V3 => {
    const th = u * Math.PI;
    const ph = v * Math.PI * 2;
    const r =
      1 +
      0.1 * Math.sin(3 * th) * Math.cos(2 * ph) +
      0.07 * Math.cos(5 * ph + 1) * Math.sin(th);
    return [
      0.85 * r * Math.sin(th) * Math.cos(ph),
      0.55 * r * Math.sin(th) * Math.sin(ph),
      0.35 * r * Math.cos(th),
    ];
  };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 4} volume={0.12} />
      <Sfx name="pop" at={c1 + 4} volume={0.14} />
      {[0, 1, 2, 3, 4].map((n) => (
        <Sfx key={n} name="tick" at={c1 + 10 + n * 60} volume={0.08} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="clink" at={c3 + 6} volume={0.18} />
      <Sfx name="riser" at={c4 + 6} volume={0.08} />
      <Sfx name="pluck3" at={c5 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c6 + 30} volume={0.1} />
      <Sfx name="ding" at={c6 + 64} volume={0.28} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: part3d }}>
        <Stage3D
          azimuth={-0.6}
          elevation={0.35}
          distance={5.4}
          target={[0, 0, 0]}
          style={{ left: -120, top: -40 }}
        >
          <group rotation={[...rot]}>
            <group visible={potato < 1}>
              <Box3
                a={[1.5, 0, 0]}
                b={[0, 0.95, 0]}
                c={[0, 0, 0.5]}
                origin={[-0.75, -0.475, -0.25]}
                color={colors.orange}
                opacity={0.55 * (1 - potato)}
              />
            </group>
            {potato > 0 ? (
              <ParamSurface
                p={lump}
                color={colors.wood}
                opacity={0.75 * potato}
              />
            ) : null}
            {AX.map(({ d, c }, i) => (
              <Tube
                key={i}
                points={[
                  [-1.3 * d[0], -1.3 * d[1], -1.3 * d[2]],
                  [1.3 * d[0], 1.3 * d[1], 1.3 * d[2]],
                ]}
                radius={clean && k === i ? 0.035 : 0.018}
                color={c()}
                opacity={axes}
              />
            ))}
            <RightAngle
              at={[0, 0, 0]}
              u={[1, 0, 0]}
              v={[0, 1, 0]}
              s={0.22}
              opacity={fadeIn(frame, c3 + 6, 8)}
            />
            <RightAngle
              at={[0, 0, 0]}
              u={[0, 1, 0]}
              v={[0, 0, 1]}
              s={0.22}
              opacity={fadeIn(frame, c3 + 6, 8)}
            />
            <RightAngle
              at={[0, 0, 0]}
              u={[1, 0, 0]}
              v={[0, 0, 1]}
              s={0.22}
              opacity={fadeIn(frame, c3 + 6, 8)}
            />
          </group>
        </Stage3D>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 120,
            fontSize: 48,
            fontWeight: 800,
            color: clean ? colors.green : colors.highlight,
            opacity: fadeIn(frame, c0 + 6),
          }}
        >
          {frame >= c2 ? tx.principal : clean ? tx.clean : tx.wobble}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c4 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={O.x - 420}
            y1={O.y}
            x2={O.x + 420}
            y2={O.y}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <line
            x1={O.x}
            y1={O.y - 300}
            x2={O.x}
            y2={O.y + 360}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <path
            d={ellipsePath(scr, draw * Math.PI * 2)}
            fill={alpha(colors.primary, 0.08 * draw)}
            stroke={colors.primary}
            strokeWidth={7}
          />
          <g opacity={diam}>
            <line
              x1={scr(-V2.x, -V2.y).x}
              y1={scr(-V2.x, -V2.y).y}
              x2={scr(V2.x, V2.y).x}
              y2={scr(V2.x, V2.y).y}
              stroke={colors.highlight}
              strokeWidth={7}
            />
            <line
              x1={scr(-V1.x / Math.sqrt(6), -V1.y / Math.sqrt(6)).x}
              y1={scr(-V1.x / Math.sqrt(6), -V1.y / Math.sqrt(6)).y}
              x2={scr(V1.x / Math.sqrt(6), V1.y / Math.sqrt(6)).x}
              y2={scr(V1.x / Math.sqrt(6), V1.y / Math.sqrt(6)).y}
              stroke={colors.green}
              strokeWidth={7}
            />
            <path
              d={`M ${scr(0.09 * V1.x, 0.09 * V1.y).x} ${scr(0.09 * V1.x, 0.09 * V1.y).y} L ${scr(0.09 * (V1.x + V2.x), 0.09 * (V1.y + V2.y)).x} ${scr(0.09 * (V1.x + V2.x), 0.09 * (V1.y + V2.y)).y} L ${scr(0.09 * V2.x, 0.09 * V2.y).x} ${scr(0.09 * V2.x, 0.09 * V2.y).y}`}
              fill="none"
              stroke={colors.text}
              strokeWidth={4}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 120,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c4 + 6),
            translate: riseIn(frame, c4 + 6, 14),
          }}
        >
          5x² + 4xy + 2y² = 1
        </div>
        <Mat
          m={A}
          x={1480}
          y={470}
          flip={flip}
          diag={fadeIn(frame, c6 + 20, 8)}
          opacity={fadeIn(frame, c6 + 4, 10)}
        />
        <div
          style={{
            position: "absolute",
            top: 640,
            left: 1180,
            width: 600,
            textAlign: "center",
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c6 + 64, 10),
          }}
        >
          {tx.symmetric}
        </div>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1180,
            width: 600,
            textAlign: "center",
            padding: "10px 0",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontFamily: fonts.body,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c7 + 6, 10),
            translate: riseIn(frame, c7 + 6, 14),
          }}
        >
          Aᵀ = A ⇒ ⊥
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
