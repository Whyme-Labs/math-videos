import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
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
import { B, Ball, ModelPlane, P, RightAngle } from "../components/stage";
import { useStrings } from "../i18n";

// The picture behind least squares, in 3D. On the left the four heights
// as bars that slide together into one column (1, 3, 4, 4); in the stage
// that column grows as one arrow b (c0). The plane of everything the
// model can make fades in, and lemon arrows Ax sweep around inside it,
// never leaving it (c1). b's tip hangs above the plane on a dashed drop:
// no x reaches it (c2). A sheet of vertical light rays rains down and b's
// shadow p grows on the plane (c3). The error e rises from p to b's tip,
// upright, with a right-angle mark (c4). The camera keeps circling; p
// pulses: the best fit is the shadow (c5).

const H = [1, 3, 4, 4];

export const Shadow: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("shadow");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const merge = glide(frame, c0 + 20, fps, 24);
  const growB = glide(frame, c0 + 50, fps, 24);
  const plane = fadeIn(frame, c1 + 4, 14);
  const sweep = (frame - c1) * 0.04;
  const sweepOp = fadeIn(frame, c1 + 10, 10) * fadeOut(frame, c3, 10);
  const drop = fadeIn(frame, c2 + 6, 10) * fadeOut(frame, c4, 8);
  const rain = Math.max(0, frame - c3 - 4);
  const rainOp = fadeIn(frame, c3 + 4, 8) * fadeOut(frame, c4 + 20, 16);
  const shadow = glide(frame, c3 + 30, fps, 24);
  const e = glide(frame, c4 + 6, fps, 20);
  const pulse =
    frame > c5 ? 1 + 0.35 * Math.abs(Math.sin((frame - c5) * 0.12)) : 1;
  const azimuth = -0.9 + (frame - c0) * 0.0011;
  const tipB: V3 = [B[0] * growB, B[1] * growB, B[2] * growB];

  return (
    <SceneShell id="shadow">
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="pop" at={c0 + 50} volume={0.14} />
      <Sfx name="riser" at={c1 + 4} volume={0.08} />
      <Sfx name="pluck2" at={c2 + 6} volume={0.14} />
      <Sfx name="sparkle" at={c3 + 4} volume={0.3} />
      <Sfx name="pop" at={c3 + 30} volume={0.14} />
      <Sfx name="pluck5" at={c4 + 6} volume={0.14} />
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.42}
        distance={6.4}
        target={[0.3, 0.2, 0.35]}
        style={{ left: 200, top: -60 }}
      >
        <group>
          <ModelPlane opacity={plane} />
          {[0, 1, 2, 3, 4].map((k) => {
            const a = sweep + (k * Math.PI * 2) / 5;
            const r = 1.1 + 0.5 * Math.sin(sweep * 0.7 + k);
            return (
              <Arrow3
                key={k}
                from={[0, 0, 0]}
                to={[r * Math.cos(a), r * Math.sin(a), 0.01]}
                color={colors.primary}
                radius={0.022}
                opacity={sweepOp * 0.8}
              />
            );
          })}
        </group>
        {growB > 0.02 ? (
          <Arrow3
            from={[0, 0, 0]}
            to={tipB}
            color={colors.text}
            radius={0.035}
          />
        ) : null}
        <Tube
          points={[B, P]}
          radius={0.01}
          color={colors.highlight}
          opacity={drop}
        />
        {/* the rain of light */}
        {Array.from({ length: 25 }).map((_, k) => {
          const x = -1.2 + (k % 5) * 0.6;
          const y = -1.2 + Math.floor(k / 5) * 0.6;
          const z = 1.5 - ((rain * 0.05 + ((k * 0.37) % 1)) % 1) * 1.5;
          return (
            <Tube
              key={k}
              points={[
                [x, y, z + 0.35],
                [x, y, z],
              ]}
              radius={0.008}
              color={colors.primary}
              opacity={rainOp * 0.8}
            />
          );
        })}
        <Tube
          points={[
            [B[0], B[1], 1.8],
            [B[0], B[1], B[2]],
          ]}
          radius={0.012}
          color={colors.primary}
          opacity={rainOp}
        />
        {shadow > 0.02 ? (
          <Arrow3
            from={[0, 0, 0.005]}
            to={[P[0] * shadow, P[1] * shadow, 0.005]}
            color={colors.orange}
            radius={0.035 * pulse}
          />
        ) : null}
        {e > 0.02 ? (
          <Arrow3
            from={P}
            to={[P[0], P[1], B[2] * e]}
            color={colors.green}
            radius={0.03}
          />
        ) : null}
        <RightAngle
          at={P}
          u={[0, 0, 1]}
          v={[-0.874, -0.486, 0]}
          opacity={fadeIn(frame, c4 + 20, 8)}
        />
        <Ball at={P} color={colors.orange} r={0.05 * pulse} opacity={shadow} />
      </Stage3D>

      {/* the four heights, merging into one column */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          {H.map((h, i) => {
            const x = lerp(140 + i * 70, 250, merge);
            const w = lerp(46, 0, merge);
            return (
              <rect
                key={i}
                x={x - w / 2}
                y={520 - h * 60}
                width={w}
                height={h * 60}
                rx={6}
                fill={colors.primary}
                opacity={1 - merge}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 140,
          width: 240,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 60,
          fontWeight: 800,
          lineHeight: 1.15,
          color: colors.text,
          opacity: merge,
        }}
      >
        <div
          style={{ fontSize: 42, color: colors.muted, fontFamily: fonts.body }}
        >
          {tx.heights}
        </div>
        {H.map((h, i) => (
          <div key={i}>{h}</div>
        ))}
        <div style={{ color: colors.text, marginTop: 6 }}>= b</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1160,
          whiteSpace: "nowrap",
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: plane,
          translate: riseIn(frame, c1 + 4, 14),
        }}
      >
        {tx.model}
      </div>
      <div
        style={{
          position: "absolute",
          top: 162,
          left: 1160,
          fontSize: 36,
          fontWeight: 700,
          color: colors.muted,
          opacity: fadeIn(frame, c2 + 10, 10),
        }}
      >
        {tx.drawn}
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1360,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontSize: 48,
          fontWeight: 800,
        }}
      >
        <div style={{ color: colors.orange, opacity: shadow }}>{tx.shadow}</div>
        <div style={{ color: colors.green, opacity: e }}>
          {tx.error}
          <span style={{ fontFamily: fonts.math, marginLeft: 16 }}>
            = b − p
          </span>
        </div>
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
          fontSize: 56,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c5 + 6, 10),
          translate: riseIn(frame, c5 + 6, 14),
        }}
      >
        b ≈ p
      </div>
    </SceneShell>
  );
};
