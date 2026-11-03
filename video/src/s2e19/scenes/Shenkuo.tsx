import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Mat } from "../../s2e18/components/mat";
import { useStrings } from "../i18n";

// Chinese edition only. 沈括 (1031–1095), 《梦溪笔谈·辨证一》 on the
// pinhole: 若鸢飞空中，其影随鸢而移；或中间为窗隙所束，则影与鸢遂相违，鸢东则
// 影西，鸢西则影东. Seen from above: a kite flies outside a wall (c0); on
// open ground its shadow follows it (c1). Through a slit in the wall, rays
// cross, and the image on the far wall runs the other way: kite east,
// image west, the image turned round and smaller (c2). That is a turn by
// 180° and a shrink, the matrix [−0.8 0; 0 −0.8] (c3).

const P = { x: 960, y: 470 }; // the slit
const KY = 230; // the kite's line
const SY = 662; // the far wall
const R = (SY - P.y) / (P.y - KY);
// where a point outside lands on the far wall, through the slit
const img = (x: number, y: number) => ({
  x: P.x - (x - P.x) * R,
  y: P.y + (P.y - y) * R,
});

const Kite: React.FC<{
  x: number;
  y: number;
  s: number;
  rot: number;
  color: string;
  o?: number;
}> = ({ x, y, s, rot, color, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 -50 L 34 0 L 0 70 L -34 0 Z" fill={color} />
    <path
      d="M 0 70 Q 12 100 -6 130"
      fill="none"
      stroke={color}
      strokeWidth={4}
    />
    <circle cx={0} cy={-50} r={9} fill={colors.highlight} />
  </g>
);

export const Shenkuo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("shenkuo");
  const [c0, c1, c2, c3] = cues;
  const kx = P.x + 330 * Math.sin((frame - c0) * 0.03);
  const ground = fadeIn(frame, c1 + 6, 10) * (1 - fadeIn(frame, c2, 10));
  const slit = fadeIn(frame, c2 + 4, 10);
  const ix = P.x - (kx - P.x) * R;

  return (
    <SceneShell id="shenkuo">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="chime" at={c3 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the wall with its slit, and the far wall */}
        <g opacity={slit}>
          <line
            x1={300}
            y1={P.y}
            x2={P.x - 14}
            y2={P.y}
            stroke={colors.wood}
            strokeWidth={16}
          />
          <line
            x1={P.x + 14}
            y1={P.y}
            x2={1620}
            y2={P.y}
            stroke={colors.wood}
            strokeWidth={16}
          />
          <line
            x1={300}
            y1={SY + 110}
            x2={1620}
            y2={SY + 110}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={6}
          />
          <line
            x1={kx}
            y1={KY - 50}
            x2={img(kx, KY - 50).x}
            y2={img(kx, KY - 50).y}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <line
            x1={kx}
            y1={KY + 70}
            x2={img(kx, KY + 70).x}
            y2={img(kx, KY + 70).y}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <Kite
            x={ix}
            y={SY}
            s={R}
            rot={180}
            color={alpha(colors.paper, 0.55)}
          />
          <text
            x={P.x + 30}
            y={P.y - 24}
            fill={colors.wood}
            fontSize={40}
            fontWeight={800}
          >
            {tx.slit}
          </text>
        </g>
        <g opacity={ground}>
          <Kite
            x={kx + 40}
            y={KY + 360}
            s={1}
            rot={0}
            color={alpha(colors.paper, 0.35)}
          />
        </g>
        <Kite
          x={kx}
          y={KY}
          s={1}
          rot={0}
          color={colors.paper}
          o={fadeIn(frame, c0 + 6, 8)}
        />
        <g opacity={fadeIn(frame, c0 + 6, 8)}>
          <text
            x={1680}
            y={KY + 14}
            fill={colors.muted}
            fontSize={44}
            fontWeight={800}
          >
            东 →
          </text>
          <text
            x={240}
            y={KY + 14}
            fill={colors.muted}
            fontSize={44}
            fontWeight={800}
            textAnchor="end"
          >
            ← 西
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
        {tx.shen}
      </div>
      <div style={{ opacity: fadeIn(frame, c3 + 10, 10) }}>
        <Mat m={[-0.8, 0, 0, -0.8]} x={1640} y={600} cell={100} />
      </div>
    </SceneShell>
  );
};
