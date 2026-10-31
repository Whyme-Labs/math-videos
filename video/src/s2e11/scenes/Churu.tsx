import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 刘徽's 出入相补. A parallelogram with an area
// badge. A cut line drops down from its top-left corner; the left triangle
// lifts, slides right and drops into the gap on the other side: a
// rectangle, and the badge never changes. Last, the
// rectangle shears back and forth along its base, badge steady.

const O = { x: 560, y: 640 };
const S = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Churu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("churu");
  const [c0, c1, c2] = cues;
  const cut = fadeIn(frame, c1 + 6, 8);
  const lift = glide(frame, c1 + 30, fps, 20);
  const slide = glide(frame, c1 + 50, fps, 30);
  const drop = glide(frame, c1 + 80, fps, 20);
  const shear = frame > c2 + 20 ? Math.sin((frame - c2 - 20) * 0.06) * 1.2 : 0;
  const rest = frame > c2;
  const tri = [
    [0, 0],
    [1.5, 2.5],
    [1.5, 0],
  ].map(([x, y]) => scr(x + 4 * slide, y + 0.4 * lift * (1 - drop)));
  const body = rest
    ? [scr(1.5, 0), scr(5.5, 0), scr(5.5 + shear, 2.5), scr(1.5 + shear, 2.5)]
    : [scr(1.5, 0), scr(4, 0), scr(5.5, 2.5), scr(1.5, 2.5)];

  return (
    <SceneShell id="churu">
      <Sfx name="scratch" at={c1 + 6} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.12} />
      <Sfx name="clink" at={c1 + 90} volume={0.2} />
      <Sfx name="chime" at={c1 + 100} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <polygon
          points={body.map((p) => `${p.x},${p.y}`).join(" ")}
          fill={alpha(colors.primary, 0.3)}
          stroke={colors.primary}
          strokeWidth={5}
        />
        {!rest ? (
          <polygon
            points={tri.map((p) => `${p.x},${p.y}`).join(" ")}
            fill={alpha(colors.orange, 0.45)}
            stroke={colors.orange}
            strokeWidth={5}
          />
        ) : null}
        <line
          x1={scr(1.5, 0).x}
          y1={scr(1.5, -0.2).y}
          x2={scr(1.5, 2.7).x}
          y2={scr(1.5, 2.7).y}
          stroke={colors.paper}
          strokeWidth={4}
          strokeDasharray="12 10"
          opacity={cut * (rest ? 0 : 1 - slide)}
        />
        <text
          x={scr(3.5 + shear / 2, 1.25).x}
          y={scr(3.5, 1.25).y + 20}
          fill={colors.text}
          fontSize={64}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 20)}
        >
          10
        </text>
      </svg>
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
        {tx.liuhui}
      </div>
    </SceneShell>
  );
};
