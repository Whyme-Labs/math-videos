import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors } from "../../shared/theme";
import {
  Arrow3,
  FloorGrid,
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { useStrings } from "../i18n";

// Why "positive" matters, in 3D. Eight arrows on the floor, and above each
// tip a post as tall as ⟨v, v⟩. A bowl grows through the post tops: the dot
// product, x² + y², up everywhere but the origin. Then the form morphs to
// x² − y²: the bowl becomes a saddle, its posts along y sink below the
// floor and turn red, a "length²" that is negative. Then back to the bowl.
// The camera circles the whole time.

const K = 0.45; // height scale
const R = 1.35;

export const Bowl: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("bowl");
  const [c0, c1, c2, c3, c4] = cues;
  const posts = fadeIn(frame, c0 + 20, 12);
  const grow = glide(frame, c1 + 6, fps, 30);
  const s =
    glide(frame, c2 + 10, fps, 40) * (1 - glide(frame, c4 + 4, fps, 30));
  const b = 1 - 2 * s; // coefficient of y²: 1 (bowl) → −1 (saddle)
  const q = (x: number, y: number) => x * x + b * y * y;
  const bad = s > 0.5;
  const surf = (u: number, v: number): V3 => {
    const t = v * Math.PI * 2;
    const x = u * R * Math.cos(t);
    const y = u * R * Math.sin(t);
    return [x, y, K * grow * q(x, y)];
  };
  const tips = Array.from({ length: 8 }, (_, k) => {
    const t = (k / 8) * Math.PI * 2 + 0.2;
    return { x: Math.cos(t), y: Math.sin(t) };
  });

  return (
    <SceneShell id="bowl">
      <Sfx name="pop" at={c0 + 20} volume={0.12} />
      <Sfx name="riser" at={c1 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="thud" at={c3 + 10} volume={0.24} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.1} />

      <Stage3D
        azimuth={-0.9 + (frame - c0) * 0.004}
        elevation={0.38}
        distance={7.6}
        target={[0, 0, 0.3]}
        style={{ left: -250, top: -120 }}
      >
        <FloorGrid n={2} color={colors.paper} opacity={0.28} />
        {tips.map((p, k) => {
          const h = K * q(p.x, p.y);
          return (
            <group key={k}>
              <Arrow3
                from={[0, 0, 0]}
                to={[p.x, p.y, 0]}
                color={colors.primary}
                radius={0.02}
                opacity={fadeIn(frame, c0 + 6 + k * 2)}
              />
              <Tube
                points={[
                  [p.x, p.y, 0],
                  [p.x, p.y, h],
                ]}
                radius={0.022}
                color={h < -0.01 ? colors.red : colors.orange}
                opacity={posts}
              />
              <mesh position={[p.x, p.y, h]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                  color={h < -0.01 ? colors.red : colors.orange}
                  transparent
                  opacity={posts}
                />
              </mesh>
            </group>
          );
        })}
        <ParamSurface
          p={surf}
          color={bad ? colors.red : colors.green}
          opacity={0.42 * Math.min(1, grow * 2)}
        />
      </Stage3D>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 50,
          fontWeight: 800,
          color: colors.green,
          opacity:
            fadeIn(frame, c1 + 10) * fadeOut(frame, c2 + 10, 8) +
            fadeIn(frame, c4 + 20),
        }}
      >
        {tx.bowl}
      </div>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 50,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c2 + 30) * fadeOut(frame, c4 + 4, 8),
        }}
      >
        {tx.saddle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 42,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c3 + 14) * fadeOut(frame, c4 + 4, 8),
          translate: riseIn(frame, c3 + 14, 12),
        }}
      >
        ✗ {tx.ruledOut}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 42,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 24),
          translate: riseIn(frame, c4 + 24, 12),
        }}
      >
        ✓ {tx.innerProduct}
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 1300,
          width: 520,
          textAlign: "center",
          fontSize: 60,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 20) * fadeOut(frame, c1 + 6, 8),
        }}
      >
        {"height = ⟨v, v⟩"}
      </div>
    </SceneShell>
  );
};
