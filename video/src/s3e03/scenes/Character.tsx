import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Mat } from "../components/draw";
import { camera, type V3 } from "../components/space";
import { useStrings } from "../i18n";

// Characters. A third-of-a-turn seen through a drifting basis: the four
// entries churn while the trace badge stays at −1 (c0). χ(g) = tr ρ(g)
// (c1). The character table of S₃: three classes across, three
// irreducibles down (c2), filled in (c3). The rows as three perpendicular
// arrows (c4). The permutation character (3, 1, 0) as an arrow whose
// shadows on the three are 1, 0, 1 (c5).

const TABLE = [
  [1, 1, 1],
  [1, -1, 1],
  [2, 0, -1],
];
const PERM = [3, 1, 0];
const PROJ = [1, 0, 1];
const SIZES = [1, 3, 2];
const TX = 200;
const TY = 260;
const CW = 170;
const RH = 90;
const P3 = camera(1440, 470, 200, -0.7, 0.35);
const rc = () => [colors.primary, colors.orange, colors.highlight];

const fmt = (v: number) => (v < -0.005 ? "−" : "") + Math.abs(v).toFixed(2);

export const Character: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("character");
  const [c0, c1, c2, c3, c4, c5] = cues;
  // P = [1 s; 0 d], ρ = rotation by 120°
  const s = 0.9 * Math.sin(frame * 0.05);
  const d = 1 + 0.5 * Math.sin(frame * 0.033 + 1);
  const ca = -0.5;
  const sa = Math.sqrt(3) / 2;
  // P R P⁻¹ with P⁻¹ = [1 −s/d; 0 1/d]
  const pr = [ca + s * sa, -sa + s * ca, d * sa, d * ca];
  const m = [
    pr[0],
    (-pr[0] * s) / d + pr[1] / d,
    pr[2],
    (-pr[2] * s) / d + pr[3] / d,
  ];
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const table = fadeIn(frame, c2 + 4, 10);
  const arrows = fadeIn(frame, c4 + 6, 10);
  const perm = progress(frame, c5 + 10, 30);
  const o = P3([0, 0, 0]);
  const RC = rc();
  const pv: V3 = [1, 0, 1];

  return (
    <SceneShell id="character">
      <Sfx name="whoosh" at={c0 + 10} volume={0.08} />
      <Sfx name="ding" at={c1 + 10} volume={0.16} />
      <Sfx name="page" at={c2 + 4} volume={0.12} />
      {TABLE.map((_, i) => (
        <Sfx key={i} name="pluck2" at={c3 + 8 + i * 12} volume={0.1} />
      ))}
      <Sfx name="pop" at={c4 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c5 + 10} volume={0.1} />
      <Sfx name="chime" at={c5 + 50} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={partA}>
          <Mat
            x={560}
            y={300}
            rows={[
              [fmt(m[0]), fmt(m[1])],
              [fmt(m[2]), fmt(m[3])],
            ]}
            cw={200}
            rh={100}
            size={60}
            cell={(i, j) =>
              i === j ? colors.highlight : alpha(colors.paper, 0.6)
            }
          />
          <rect
            x={1160}
            y={330}
            width={330}
            height={130}
            rx={24}
            fill={alpha(colors.highlight, 0.12)}
            stroke={colors.highlight}
            strokeWidth={5}
          />
          <text
            x={1325}
            y={418}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={64}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            tr = −1
          </text>
        </g>
        <g opacity={table}>
          {tx.classes.map((c, j) => (
            <g key={c}>
              <text
                x={TX + CW * (j + 1.5)}
                y={TY}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={44}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {c}
              </text>
              <text
                x={TX + CW * (j + 1.5)}
                y={TY - 56}
                textAnchor="middle"
                fill={alpha(colors.paper, 0.45)}
                fontSize={28}
                fontFamily={fonts.mono}
              >
                ×{SIZES[j]}
              </text>
            </g>
          ))}
          <line
            x1={TX}
            y1={TY + 26}
            x2={TX + CW * 4}
            y2={TY + 26}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={2}
          />
          {TABLE.map((r, i) => (
            <g key={i} opacity={fadeIn(frame, c2 + 10 + i * 8, 8)}>
              <text
                x={TX + CW * 0.5}
                y={TY + RH * (i + 1)}
                textAnchor="middle"
                fill={RC[i]}
                fontSize={38}
                fontWeight={800}
                fontFamily={fonts.body}
              >
                {tx.irreps[i]}
              </text>
              {r.map((v, j) => (
                <text
                  key={j}
                  x={TX + CW * (j + 1.5)}
                  y={TY + RH * (i + 1)}
                  textAnchor="middle"
                  fill={RC[i]}
                  fontSize={48}
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={fadeIn(frame, c3 + 8 + i * 12, 8)}
                >
                  {String(v).replace("-", "−")}
                </text>
              ))}
              <text
                x={TX + CW * 4.4}
                y={TY + RH * (i + 1)}
                textAnchor="middle"
                fill={PROJ[i] ? colors.green : alpha(colors.paper, 0.5)}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={fadeIn(frame, c5 + 40 + i * 10, 8)}
              >
                {PROJ[i]}
              </text>
            </g>
          ))}
          <g opacity={fadeIn(frame, c5 + 6, 10)}>
            <line
              x1={TX}
              y1={TY + RH * 3.55}
              x2={TX + CW * 4}
              y2={TY + RH * 3.55}
              stroke={alpha(colors.paper, 0.2)}
              strokeWidth={2}
            />
            <text
              x={TX + CW * 0.5}
              y={TY + RH * 4.3}
              textAnchor="middle"
              fill={colors.green}
              fontSize={34}
              fontWeight={800}
              fontFamily={fonts.body}
            >
              {tx.perm}
            </text>
            {PERM.map((v, j) => (
              <text
                key={j}
                x={TX + CW * (j + 1.5)}
                y={TY + RH * 4.3}
                textAnchor="middle"
                fill={colors.green}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {v}
              </text>
            ))}
          </g>
        </g>
        <g opacity={arrows}>
          {[0, 1, 2].map((i) => {
            const e: V3 = [0, 0, 0];
            e[i] = 1.4;
            const [x, y] = P3(e);
            return (
              <g key={i}>
                <line
                  x1={o[0]}
                  y1={o[1]}
                  x2={x}
                  y2={y}
                  stroke={RC[i]}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <text
                  x={x + 14}
                  y={y - 14}
                  fill={RC[i]}
                  fontSize={42}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  χ{["₁", "₂", "₃"][i]}
                </text>
              </g>
            );
          })}
          <g opacity={perm}>
            <line
              x1={o[0]}
              y1={o[1]}
              x2={P3(pv.map((v) => v * 1.4 * perm) as V3)[0]}
              y2={P3(pv.map((v) => v * 1.4 * perm) as V3)[1]}
              stroke={colors.green}
              strokeWidth={9}
              strokeLinecap="round"
            />
            <path
              d={`M ${P3([1.4, 0, 1.4])[0]} ${P3([1.4, 0, 1.4])[1]} L ${P3([1.4, 0, 0])[0]} ${P3([1.4, 0, 0])[1]} M ${P3([1.4, 0, 1.4])[0]} ${P3([1.4, 0, 1.4])[1]} L ${P3([0, 0, 1.4])[0]} ${P3([0, 0, 1.4])[1]}`}
              stroke={colors.green}
              strokeWidth={3}
              strokeDasharray="8 8"
              fill="none"
            />
          </g>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c0 + 20}
          x={620}
          y={560}
          size={38}
          color={colors.muted}
        >
          {tx.newBasis}
        </Chip>
        <Chip
          frame={frame}
          at={c1 + 10}
          x={1100}
          y={560}
          size={44}
          math
          color={colors.highlight}
        >
          χ(g) = tr ρ(g)
        </Chip>
      </div>
    </SceneShell>
  );
};
