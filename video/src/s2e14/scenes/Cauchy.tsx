import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Cauchy–Schwarz as a shadow. A fixed lemon arrow v along the floor and a
// pink arrow u swinging round; u's shadow on the line of v is drawn in
// orange, never longer than u. On the right two bars: |overlap| and
// length × length; the first never passes the second and only meets it
// when u lies along v. Then a dial for cos θ = overlap ÷ (length × length),
// its needle staying between −1 and 1.

const O = { x: 640, y: 600 };
const S = 120;

export const Cauchy: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("cauchy");
  const [c0, c1] = cues;
  const swing = (frame - c0 - 20) * 0.025;
  const th = 2.4 * Math.sin(Math.max(0, swing));
  const u = { x: 2.6 * Math.cos(th), y: 2.6 * Math.sin(th) };
  const v = { x: 3, y: 0 };
  const dot = u.x * v.x + u.y * v.y;
  const lu = Math.hypot(u.x, u.y);
  const lv = 3;
  const cos = dot / (lu * lv);
  const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const BAR = 30;

  return (
    <SceneShell id="cauchy">
      <Sfx name="pluck2" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 20 + Math.round(Math.PI / 0.025)} />
      <Sfx name="pop" at={c1 + 10} volume={0.16} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={scr(-4, 0).x}
          y1={O.y}
          x2={scr(4.4, 0).x}
          y2={O.y}
          stroke={alpha(colors.primary, 0.3)}
          strokeWidth={4}
        />
        <line
          x1={scr(u.x, u.y).x}
          y1={scr(u.x, u.y).y}
          x2={scr(u.x, 0).x}
          y2={O.y}
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={3}
          strokeDasharray="8 8"
        />
        <line
          x1={O.x}
          y1={O.y + 30}
          x2={scr(u.x, 0).x}
          y2={O.y + 30}
          stroke={colors.orange}
          strokeWidth={12}
          strokeLinecap="round"
        />
        <Arrow from={O} to={scr(v.x, v.y)} width={14} />
        <Arrow
          from={O}
          to={scr(u.x, u.y)}
          width={14}
          color={colors.highlight}
        />
        {/* the two bars */}
        <g transform="translate(1260 760)" opacity={fadeIn(frame, c0 + 10)}>
          <rect
            x={0}
            y={-Math.abs(dot) * BAR}
            width={110}
            height={Math.abs(dot) * BAR}
            fill={colors.orange}
          />
          <rect
            x={160}
            y={-lu * lv * BAR}
            width={110}
            height={lu * lv * BAR}
            fill={alpha(colors.primary, 0.7)}
          />
          <line
            x1={-20}
            y1={-lu * lv * BAR}
            x2={290}
            y2={-lu * lv * BAR}
            stroke={colors.primary}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <text
            x={55}
            y={50}
            fill={colors.orange}
            fontSize={30}
            textAnchor="middle"
            fontWeight={800}
          >
            |{tx.overlap}|
          </text>
          <text
            x={215}
            y={50}
            fill={colors.primary}
            fontSize={30}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.lengths}
          </text>
        </g>
        {/* the cos θ dial */}
        <g transform="translate(1620 340)" opacity={fadeIn(frame, c1 + 10)}>
          <path
            d="M -150 0 A 150 150 0 0 1 150 0"
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={8}
          />
          <text
            x={-150}
            y={44}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            −1
          </text>
          <text
            x={150}
            y={44}
            fill={colors.muted}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            1
          </text>
          <line
            x1={0}
            y1={0}
            x2={130 * cos}
            y2={-130 * Math.sqrt(Math.max(0, 1 - cos * cos))}
            stroke={colors.green}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <circle r={14} fill={colors.green} />
          <text
            y={-180}
            fill={colors.green}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            cos θ
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 140,
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c1 + 30),
          translate: riseIn(frame, c1 + 30, 12),
        }}
      >
        {tx.cauchyNames}
      </div>
    </SceneShell>
  );
};
