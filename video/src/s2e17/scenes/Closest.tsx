import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Arrow3,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import {
  B,
  Ball,
  ModelPlane,
  P,
  RightAngle,
  Tri,
  sub,
  unit,
} from "../components/stage";
import { useStrings } from "../i18n";

// Why the shadow is closest. b, its shadow p and the upright error stay
// from the last scene. A second point u appears on the plane and wanders
// around p (c0). From b to u by two legs: down the error, then along the
// plane from p to u; the straight road b → u in red (c1). The two legs
// meet at a right angle, and the triangle fills in (c2). On the right a
// live stacked bar: ‖e‖² in green (always 1), ‖p − u‖² in lemon on top
// of it, and the red outline of ‖b − u‖² that is their sum (c3). Then u
// slides into p: the lemon part shrinks to nothing and the total bottoms
// out at ‖e‖² (c4).

const BAR = { x: 1500, y: 700, w: 150, k: 150 };

export const Closest: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("closest");
  const [c0, c1, c2, c3, c4] = cues;
  const home = glide(frame, c4 + 10, fps, 40);
  const t = (frame - c0) * 0.035;
  const r = lerp(0.85 + 0.3 * Math.sin(t * 0.7), 0, home);
  const u: V3 = [P[0] + r * Math.cos(t), P[1] + r * Math.sin(t), 0];
  const pu2 = r * r;
  const bu2 = 1 + pu2;
  const legs = fadeIn(frame, c1 + 6, 10);
  const tri = fadeIn(frame, c2 + 6, 10);
  const bars = fadeIn(frame, c3 + 4, 10);
  const azimuth = -0.4 + (frame - c0) * 0.0018;
  const dir = r > 0.02 ? unit(sub(u, P)) : ([1, 0, 0] as V3);

  return (
    <SceneShell id="closest">
      <Sfx name="pop" at={c0 + 8} volume={0.14} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c1 + 20} volume={0.14} />
      <Sfx name="clink" at={c2 + 6} volume={0.18} />
      <Sfx name="pop" at={c3 + 4} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />
      <Sfx name="ding" at={c4 + 50} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.45}
        distance={6}
        target={[0.6, 0.4, 0.4]}
        style={{ left: -200, top: -60 }}
      >
        <ModelPlane />
        <Arrow3 from={[0, 0, 0]} to={B} color={colors.text} radius={0.03} />
        <Arrow3
          from={[0, 0, 0.005]}
          to={[P[0], P[1], 0.005]}
          color={colors.orange}
          radius={0.03}
        />
        <Tube points={[P, B]} radius={0.022} color={colors.green} />
        <RightAngle at={P} u={[0, 0, 1]} v={dir} opacity={tri} />
        <Ball at={B} color={colors.text} r={0.045} />
        <Ball at={P} color={colors.orange} r={0.05} />
        <group>
          <Ball
            at={u}
            color={colors.primary}
            r={0.06}
            opacity={fadeIn(frame, c0 + 8, 8)}
          />
          {r > 0.02 ? (
            <>
              <Tube
                points={[P, [u[0], u[1], 0.004]]}
                radius={0.02}
                color={colors.primary}
                opacity={legs}
              />
              <Tube
                points={[B, u]}
                radius={0.02}
                color={colors.red}
                opacity={legs}
              />
              <Tri
                a={B}
                b={P}
                c={u}
                color={colors.green}
                opacity={0.18 * tri}
              />
            </>
          ) : null}
        </group>
      </Stage3D>

      {/* the live Pythagoras bar */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={bars}>
          <rect
            x={BAR.x}
            y={BAR.y - BAR.k}
            width={BAR.w}
            height={BAR.k}
            fill={colors.green}
          />
          <rect
            x={BAR.x}
            y={BAR.y - BAR.k * (1 + pu2)}
            width={BAR.w}
            height={BAR.k * pu2}
            fill={colors.primary}
          />
          <rect
            x={BAR.x - 10}
            y={BAR.y - BAR.k * bu2 - 10}
            width={BAR.w + 20}
            height={BAR.k * bu2 + 10}
            fill="none"
            stroke={colors.red}
            strokeWidth={6}
            rx={6}
          />
          <line
            x1={BAR.x - 60}
            y1={BAR.y}
            x2={BAR.x + BAR.w + 60}
            y2={BAR.y}
            stroke={colors.text}
            strokeWidth={4}
          />
          <text
            x={BAR.x - 30}
            y={BAR.y - BAR.k / 2 + 14}
            fill={colors.green}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
          >
            ‖e‖²
          </text>
          <text
            x={BAR.x - 30}
            y={BAR.y - BAR.k * bu2 + 14}
            fill={colors.red}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="end"
          >
            ‖b − u‖²
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1180,
          width: 680,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 50,
          fontWeight: 800,
          opacity: bars,
          translate: riseIn(frame, c3 + 4, 14),
        }}
      >
        <span style={{ color: colors.red }}>{bu2.toFixed(2)}</span>
        <span style={{ color: colors.muted }}> = </span>
        <span style={{ color: colors.green }}>1.00</span>
        <span style={{ color: colors.muted }}> + </span>
        <span style={{ color: colors.primary }}>{pu2.toFixed(2)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 8) * (1 - home),
        }}
      >
        {tx.other}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          padding: "10px 28px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 50, 10),
          translate: riseIn(frame, c4 + 50, 14),
        }}
      >
        {tx.closestPerp}
      </div>
    </SceneShell>
  );
};
