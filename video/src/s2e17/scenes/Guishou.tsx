import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 郭守敬 (1231–1316) and the 四丈高表 at 登封观星台
// (《元史·天文志》): a gnomon five times the old 八尺表, with the 圭 (the
// ground scale) running north from its foot. The Sun's ray grazes the top
// and the shadow runs along the scale (c0). The old 八尺表 stands in front:
// its shadow is a fifth as long, but both shadow tips are blurred by the
// same amount, so the tall one's blur is a fifth as large relative to its
// length; two bars compare blur ÷ length (c1). 景符: a small plate with a
// pinhole slides onto the scale at the shadow tip, and the wide grey blur
// tightens into one bright dot (c2). Many days' shadow lengths around the
// winter solstice go into a plot; a fitted curve through the scattered
// readings finds the day and hour of the longest shadow (c3).

const G = { x: 1560, y: 760 }; // the foot of the gnomon
const PX = 11; // pixels per 尺
const SLOPE = 0.52; // the Sun's height: rise over run
const tip = (h: number) => G.x - (h * PX) / SLOPE;

export const Guishou: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("guishou");
  const [c0, c1, c2, c3] = cues;
  const rise = glide(frame, c0 + 10, fps, 30);
  const H = 40 * rise;
  const small = fadeIn(frame, c1 + 6, 10);
  const blur = 26;
  const fu = glide(frame, c2 + 10, fps, 24);
  const sharp = glide(frame, c2 + 40, fps, 24);
  const plot = fadeIn(frame, c3 + 4, 10);
  const scene = fadeOut(frame, c3, 10);
  const T = tip(40);
  // the plot of shadow lengths around the solstice
  const PL = { x: 180, y: 640, w: 760, h: 300 };
  const DAYS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  const N = [
    0.2, -0.3, 0.15, 0.25, -0.2, 0.1, -0.15, 0.2, -0.1, -0.25, 0.3, -0.2, 0.1,
  ];
  const PEAK = 0.4;
  const len = (d: number) => 1 - 0.022 * (d - PEAK) ** 2;
  const px = (d: number) => PL.x + ((d + 7) / 14) * PL.w;
  const py = (v: number) => PL.y - ((v - 0.1) / 1) * PL.h;
  const fit = glide(frame, c3 + 30, fps, 40);

  return (
    <SceneShell id="guishou">
      <Sfx name="riser" at={c0 + 10} volume={0.08} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.1} />
      <Sfx name="sparkle" at={c2 + 40} volume={0.3} />
      {DAYS.map((d, i) => (
        <Sfx key={d} name="tick" at={c3 + 8 + i * 2} volume={0.06} />
      ))}
      <Sfx name="chime" at={c3 + 70} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={scene}>
          {/* the Sun and its ray */}
          <circle
            cx={1820}
            cy={G.y - 40 * PX - 0.52 * (1820 - G.x) * 1}
            r={46}
            fill={colors.primary}
            opacity={fadeIn(frame, c0 + 4)}
          />
          <line
            x1={1820}
            y1={G.y - 40 * PX - 0.52 * (1820 - G.x)}
            x2={tip(H)}
            y2={G.y}
            stroke={alpha(colors.primary, 0.7)}
            strokeWidth={4}
            strokeDasharray="12 8"
            opacity={rise}
          />
          {/* the 圭: the ground scale */}
          <rect
            x={T - 80}
            y={G.y}
            width={G.x - T + 120}
            height={26}
            fill={colors.wood}
            rx={4}
          />
          {Array.from({ length: 26 }).map((_, k) => (
            <line
              key={k}
              x1={G.x - k * 40}
              y1={G.y}
              x2={G.x - k * 40}
              y2={G.y + (k % 5 ? 12 : 24)}
              stroke={colors.ink}
              strokeWidth={3}
            />
          ))}
          {/* the shadow of the tall gnomon, with its blurred tip */}
          <line
            x1={G.x}
            y1={G.y - 4}
            x2={tip(H)}
            y2={G.y - 4}
            stroke={colors.ink}
            strokeWidth={12}
          />
          <rect
            x={tip(H) - lerp(blur, 3, sharp)}
            y={G.y - 16}
            width={2 * lerp(blur, 3, sharp)}
            height={24}
            fill={alpha(colors.paper, lerp(0.35, 0, sharp))}
            opacity={rise}
          />
          <circle
            cx={tip(H)}
            cy={G.y - 4}
            r={10}
            fill={colors.primary}
            opacity={sharp}
          />
          {/* the tall gnomon */}
          <rect
            x={G.x - 18}
            y={G.y - H * PX}
            width={36}
            height={H * PX}
            fill={colors.paper}
            rx={4}
          />
          <rect
            x={G.x - 50}
            y={G.y - H * PX - 12}
            width={100}
            height={14}
            fill={colors.paper}
            rx={4}
          />
          {/* the old eight-foot gnomon */}
          <g opacity={small}>
            <rect
              x={G.x + 60}
              y={G.y - 8 * PX}
              width={20}
              height={8 * PX}
              fill={colors.highlight}
              rx={3}
            />
            <line
              x1={G.x + 60}
              y1={G.y + 40}
              x2={G.x + 60 - (8 * PX) / SLOPE}
              y2={G.y + 40}
              stroke={colors.highlight}
              strokeWidth={10}
            />
            <rect
              x={G.x + 60 - (8 * PX) / SLOPE - blur}
              y={G.y + 30}
              width={2 * blur}
              height={20}
              fill={alpha(colors.paper, 0.35)}
            />
          </g>
          {/* 景符 */}
          <g
            transform={`translate(${tip(40)} ${lerp(G.y - 260, G.y - 70, fu)})`}
            opacity={fu}
          >
            <rect
              x={-40}
              y={-30}
              width={80}
              height={60}
              rx={6}
              fill={colors.wood}
            />
            <circle r={6} fill={colors.bg} />
          </g>
        </g>
        {/* shadow lengths around the solstice */}
        <g opacity={plot}>
          <line
            x1={PL.x}
            y1={PL.y}
            x2={PL.x + PL.w}
            y2={PL.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {DAYS.map((d, i) => (
            <circle
              key={d}
              cx={px(d)}
              cy={py(len(d) + N[i] * 0.12)}
              r={11}
              fill={colors.text}
              opacity={fadeIn(frame, c3 + 8 + i * 2, 4)}
            />
          ))}
          <path
            d={Array.from({ length: 41 }, (_, i) => {
              const d = -6.5 + (13 * i) / 40;
              const v = lerp(0.8, len(d), fit);
              return `${i ? "L" : "M"} ${px(d)} ${py(v)}`;
            }).join(" ")}
            fill="none"
            stroke={colors.green}
            strokeWidth={6}
            opacity={fadeIn(frame, c3 + 30, 8)}
          />
          <line
            x1={px(PEAK)}
            y1={py(1) - 30}
            x2={px(PEAK)}
            y2={PL.y}
            stroke={colors.primary}
            strokeWidth={4}
            strokeDasharray="10 8"
            opacity={fadeIn(frame, c3 + 70, 8)}
          />
          <text
            x={px(PEAK)}
            y={py(1) - 50}
            fill={colors.primary}
            fontSize={48}
            fontWeight={800}
            textAnchor="middle"
            opacity={fadeIn(frame, c3 + 70, 8)}
          >
            {tx.solstice}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.guo}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 44,
          fontWeight: 800,
          opacity: scene,
        }}
      >
        <div style={{ color: colors.paper, opacity: rise }}>{tx.biao40}</div>
        <div style={{ color: colors.highlight, opacity: small }}>
          {tx.biao8}
        </div>
        <div style={{ color: colors.wood, opacity: fu }}>
          {tx.jingfu}
          <span style={{ color: colors.muted, fontSize: 38, marginLeft: 20 }}>
            {sharp > 0.5 ? tx.sharp : tx.blur}
          </span>
        </div>
      </div>
      {/* blur ÷ length, for the two gnomons */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={small * scene}
      >
        <text
          x={560}
          y={380}
          fill={colors.muted}
          fontSize={34}
          fontWeight={700}
        >
          {tx.ratio}
        </text>
        {[
          { h: 40, c: colors.paper },
          { h: 8, c: colors.highlight },
        ].map(({ h, c }, k) => {
          const ratio = (2 * blur) / ((h * PX) / SLOPE);
          const w = 520 * Math.min(1, ratio) * glide(frame, c1 + 30, fps, 20);
          return (
            <g key={h}>
              <rect
                x={560}
                y={212 + k * 82}
                width={w}
                height={36}
                rx={8}
                fill={c}
              />
            </g>
          );
        })}
      </svg>
    </SceneShell>
  );
};
