import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Box, isoAt, type V3 } from "../components/iso";
import { useStrings } from "../i18n";

// The determinant as volume. The unit cube leans and stretches into a box
// while a volume counter climbs to its determinant. Then its third edge
// swings through the floor, the box turns red and the counter goes
// negative. Last, the third edge lies down into the plane of the other two:
// the box flattens, the counter falls to 0, and "a direction lost" lands.

const A: V3 = [1.3, 0.2, 0];
const B: V3 = [0.4, 1.1, 0.2];
const C: V3 = [0, 0.3, 1.4];
const det3 = (a: V3, b: V3, c: V3) =>
  a[0] * (b[1] * c[2] - b[2] * c[1]) -
  b[0] * (a[1] * c[2] - a[2] * c[1]) +
  c[0] * (a[1] * b[2] - a[2] * b[1]);
const mix = (p: V3, q: V3, t: number): V3 => [
  lerp(p[0], q[0], t),
  lerp(p[1], q[1], t),
  lerp(p[2], q[2], t),
];

export const Det: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("det");
  const [c0, c1] = cues;
  const grow = glide(frame, c0 + 20, fps, 40);
  const flip = glide(frame, c0 + 90, fps, 30);
  const back = glide(frame, c1 + 4, fps, 20);
  const crush = glide(frame, c1 + 30, fps, 40);
  const a = mix([1, 0, 0], A, grow);
  const b = mix([0, 1, 0], B, grow);
  const cUp = mix([0, 0, 1], C, grow);
  const cDown: V3 = [C[0], C[1], -C[2]];
  const c1v = mix(cUp, cDown, lerp(flip, 0, back));
  const flat: V3 = [
    0.5 * (A[0] + B[0]),
    0.5 * (A[1] + B[1]),
    0.5 * (A[2] + B[2]),
  ];
  const c = mix(c1v, flat, crush);
  const v = det3(a, b, c);
  const to = isoAt(760, 320, 165);
  const neg = v < -0.01;
  const zero = Math.abs(v) < 0.01;

  return (
    <SceneShell id="det">
      <Sfx name="riser" at={c0 + 20} volume={0.1} />
      <Sfx name="ding" at={c0 + 60} />
      <Sfx name="whoosh" at={c0 + 90} volume={0.12} />
      <Sfx name="thud" at={c0 + 110} volume={0.28} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="scratch" at={c1 + 70} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Box a={a} b={b} c={c} to={to} flipped={neg} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1360,
          width: 400,
          padding: "16px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${neg || zero ? colors.red : colors.primary}`,
          opacity: fadeIn(frame, c0 + 10),
          translate: riseIn(frame, c0 + 10, 16),
        }}
      >
        <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
          {tx.volume} = det
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 96,
            fontWeight: 800,
            color: neg || zero ? colors.red : colors.primary,
          }}
        >
          {(zero ? 0 : v).toFixed(2).replace("-", "−")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 1360,
          width: 400,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 70),
          translate: riseIn(frame, c1 + 70, 12),
        }}
      >
        {tx.lost}
      </div>
    </SceneShell>
  );
};
