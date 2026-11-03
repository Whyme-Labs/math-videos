import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Stage3D,
  Surface,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { Ball } from "../../s2e17/components/stage";
import { Mat } from "../components/mat";
import { useStrings } from "../i18n";

// The second-derivative test on a real surface, f = x³ − 3xy + y³. The
// surface rises (c0). Its two flat spots, (0, 0) and (1, 1), get beads
// (c1). The Hessian [6x −3; −3 6y] appears (c2). At (0, 0) it reads
// [0 −3; −3 0], stretches 3 and −3: two slices of the surface along the
// eigen-directions are drawn, one curving up in green and one curving
// down in red (c3), a saddle (c4). The camera moves to (1, 1): [6 −3;
// −3 6], stretches 3 and 9, and both slices curve up: a bowl (c5).

const K = 0.3;
const f = (x: number, y: number) => x ** 3 - 3 * x * y + y ** 3;
// heights squashed smoothly so the far corners stay on screen
const z = (x: number, y: number) => 2.4 * K * Math.tanh(f(x, y) / 2.4);
const slice = (
  cx: number,
  cy: number,
  d: { x: number; y: number },
  r = 0.55,
): V3[] =>
  Array.from({ length: 31 }, (_, i) => {
    const t = -r + (2 * r * i) / 30;
    const x = cx + t * d.x;
    const y = cy + t * d.y;
    return [x, y, z(x, y) + 0.012];
  });
const S2 = Math.SQRT1_2;

export const Hessian: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("hessian");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const rise = glide(frame, c0 + 6, fps, 30);
  const go = glide(frame, c5 + 6, fps, 40);
  const target: V3 = [lerp(0.15, 1, go), lerp(0.15, 1, go), lerp(0, -0.3, go)];
  const azimuth = -0.75 + (frame - c0) * 0.0015;
  const at0 = fadeIn(frame, c3 + 6, 10) * fadeOut(frame, c5, 10);
  const at1 = fadeIn(frame, c5 + 30, 10);
  const pulse =
    frame > c4 ? 1 + 0.4 * Math.abs(Math.sin((frame - c4) * 0.12)) : 1;
  const mat =
    frame < c3 + 6
      ? ["6x", "−3", "−3", "6y"]
      : frame < c5 + 20
        ? [0, -3, -3, 0]
        : [6, -3, -3, 6];

  return (
    <SceneShell id="hessian">
      <Sfx name="riser" at={c0 + 6} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pop" at={c1 + 16} volume={0.12} />
      <Sfx name="pluck2" at={c2 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c3 + 6} volume={0.14} />
      <Sfx name="thud" at={c4 + 6} volume={0.2} />
      <Sfx name="whoosh" at={c5 + 6} volume={0.12} />
      <Sfx name="chime" at={c5 + 40} volume={0.3} />

      <Stage3D
        azimuth={azimuth}
        elevation={0.5}
        distance={5.2}
        target={target}
        style={{ left: -260, top: 0 }}
      >
        <Surface
          f={(x, y) => rise * z(x, y)}
          range={[-0.7, 1.55, -0.7, 1.55]}
          res={70}
          color={colors.violet}
          opacity={0.6}
        />
        <Ball
          at={[0, 0, 0.02]}
          r={0.05 * (frame < c5 ? pulse : 1)}
          color={colors.text}
          opacity={fadeIn(frame, c1 + 6, 8)}
        />
        <Ball
          at={[1, 1, rise * z(1, 1) + 0.02]}
          r={0.05}
          color={colors.text}
          opacity={fadeIn(frame, c1 + 16, 8)}
        />
        <Tube
          points={slice(0, 0, { x: S2, y: -S2 })}
          radius={0.034}
          color={colors.green}
          opacity={at0}
        />
        <Tube
          points={slice(0, 0, { x: S2, y: S2 })}
          radius={0.034}
          color={colors.red}
          opacity={at0}
        />
        <Tube
          points={slice(1, 1, { x: S2, y: S2 }, 0.45)}
          radius={0.034}
          color={colors.green}
          opacity={at1}
        />
        <Tube
          points={slice(1, 1, { x: S2, y: -S2 }, 0.45)}
          radius={0.034}
          color={colors.green}
          opacity={at1}
        />
      </Stage3D>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4),
        }}
      >
        f = x³ − 3xy + y³
      </div>
      <Mat
        m={mat}
        x={1520}
        y={330}
        cell={120}
        opacity={fadeIn(frame, c2 + 6, 10)}
      />
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1220,
          width: 600,
          textAlign: "center",
          fontSize: 46,
          fontWeight: 800,
          opacity: fadeIn(frame, c3 + 10) * fadeOut(frame, c5, 10),
        }}
      >
        <span style={{ color: colors.green, fontFamily: fonts.mono }}>+3</span>
        <span style={{ color: colors.muted }}> {tx.up} · </span>
        <span style={{ color: colors.red, fontFamily: fonts.mono }}>−3</span>
        <span style={{ color: colors.muted }}> {tx.down}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1220,
          width: 600,
          textAlign: "center",
          fontSize: 46,
          fontWeight: 800,
          color: colors.green,
          opacity: at1,
        }}
      >
        <span style={{ fontFamily: fonts.mono }}>3 · 9</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 1220,
          width: 600,
          textAlign: "center",
          padding: "10px 0",
          borderRadius: 16,
          border: `5px solid ${frame < c5 ? colors.highlight : colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 52,
          fontWeight: 800,
          color: frame < c5 ? colors.highlight : colors.green,
          opacity: Math.max(
            fadeIn(frame, c4 + 6, 10) * fadeOut(frame, c5, 8),
            at1,
          ),
          translate: riseIn(frame, c4 + 6, 14),
        }}
      >
        {frame < c5 ? tx.saddle : tx.bowl}
      </div>
    </SceneShell>
  );
};
