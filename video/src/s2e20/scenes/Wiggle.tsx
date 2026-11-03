import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// Loss two. ‖Ax‖ ≤ σ₁‖x‖ for every matrix (c0). Two panels: f = ε sin(x/ε²)
// on top and its derivative below, ε = 0.5 (c1). ε shrinks: the top
// graph flattens onto the axis while the bottom one grows taller and
// denser, clipped by its panel, the two sizes read out live, ε and 1/ε
// (c2–c3). The second ledger line is crossed (c4).

const PX = 160;
const PW = 1000;
const TOP = { y: 330, h: 110 };
const BOT = { y: 640, h: 150 };

export const Wiggle: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("wiggle");
  const [c0, c1, c2, c3, c4] = cues;
  const t = glide(frame, c2 + 6, fps, 200);
  const eps = lerp(0.5, 0.09, t);
  const f = (x: number) => eps * Math.sin(x / (eps * eps));
  const df = (x: number) => (1 / eps) * Math.cos(x / (eps * eps));
  const path = (g: (x: number) => number, y0: number, k: number) =>
    Array.from({ length: 801 }, (_, i) => {
      const x = i / 800;
      return `${i ? "L" : "M"} ${(PX + PW * x).toFixed(1)} ${(y0 - k * g(x)).toFixed(1)}`;
    }).join(" ");
  const steps: Tok[][] = [[{ id: "a", t: "‖Ax‖ ≤ σ₁‖x‖" }]];
  const show = fadeIn(frame, c1 + 4, 10);
  const crossed = 1 + glide(frame, c4 + 10, fps, 20);

  return (
    <SceneShell id="wiggle">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 4} volume={0.14} />
      <Sfx name="riser" at={c2 + 6} volume={0.1} />
      <Sfx name="thud" at={c3 + 30} volume={0.2} />
      <Sfx name="scratch" at={c4 + 10} volume={0.2} />

      <Eq
        steps={steps}
        at={[c0 + 6]}
        x={660}
        y={96}
        size={60}
        family={fonts.body}
      />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="wtop">
            <rect x={PX - 10} y={TOP.y - 150} width={PW + 20} height={300} />
          </clipPath>
          <clipPath id="wbot">
            <rect x={PX - 10} y={BOT.y - 190} width={PW + 20} height={380} />
          </clipPath>
        </defs>
        <g opacity={show}>
          <line
            x1={PX}
            y1={TOP.y}
            x2={PX + PW}
            y2={TOP.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={PX}
            y1={BOT.y}
            x2={PX + PW}
            y2={BOT.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <g clipPath="url(#wtop)">
            <path
              d={path(f, TOP.y, TOP.h / 0.5)}
              fill="none"
              stroke={colors.primary}
              strokeWidth={4}
            />
          </g>
          <g clipPath="url(#wbot)">
            <path
              d={path(df, BOT.y, BOT.h / 2)}
              fill="none"
              stroke={colors.orange}
              strokeWidth={3}
            />
          </g>
          <rect
            x={PX - 10}
            y={BOT.y - 190}
            width={PW + 20}
            height={380}
            fill="none"
            stroke={alpha(colors.paper, 0.2)}
            strokeWidth={2}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: TOP.y - 40,
          left: PX + PW + 30,
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: show,
          whiteSpace: "nowrap",
        }}
      >
        f · {tx.height}{" "}
        <span style={{ fontFamily: fonts.mono }}>{eps.toFixed(2)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: BOT.y - 40,
          left: PX + PW + 30,
          fontSize: 40,
          fontWeight: 800,
          color: colors.orange,
          opacity: show,
          whiteSpace: "nowrap",
          translate: riseIn(frame, c1 + 4, 10),
        }}
      >
        f′ · {tx.slope}{" "}
        <span style={{ fontFamily: fonts.mono }}>{(1 / eps).toFixed(1)}</span>
      </div>
      <Ledger crossed={crossed} active={1} compact />
    </SceneShell>
  );
};
