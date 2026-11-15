import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Mat } from "../components/draw";
import {
  camera,
  DIAG,
  diagPlane,
  path3,
  rotate,
  type V3,
} from "../components/space";
import { useStrings } from "../i18n";

// S₃ on three axes. The axes e₁, e₂, e₃; the 3-cycle turns them into each
// other, a third of a turn about the diagonal (c0). The diagonal through
// (1, 1, 1) lights up and stays put while they turn (c1). The plane
// x + y + z = 0 turns within itself (c2). The 3 × 3 matrix splits into a
// 1-block and a 2-block (c3). A line inside the plane is carried off by
// the turn: no smaller invariant piece (c4). V = V₁ ⊕ V₂ ⊕ ⋯ (c5).

const P = camera(720, 470, 230);
const AXES: V3[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const axc = () => [colors.primary, colors.paper, colors.orange];

export const Blocks: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("blocks");
  const [c0, c1, c2, c3, c4, c5] = cues;
  // one third-turn per line, starting 20 frames in
  const turns =
    progress(frame, c0 + 20, 40) +
    progress(frame, c1 + 20, 40) +
    progress(frame, c2 + 20, 40) +
    progress(frame, c4 + 20, 40);
  const ang = (2 * Math.PI * turns) / 3;
  const R = (p: V3) => rotate(p, DIAG, ang);
  const diag = fadeIn(frame, c1 + 4, 10);
  const plane = fadeIn(frame, c2 + 4, 10);
  const lineIn: V3[] = [
    [0.9, -0.9, 0],
    [-0.9, 0.9, 0],
  ];
  const lineOn = fadeIn(frame, c4 + 4, 10) * fadeOut(frame, c5, 10);
  const o = P([0, 0, 0]);
  const AXC = axc();

  return (
    <SceneShell id="blocks">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c1 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />
      <Sfx name="pop" at={c3 + 8} volume={0.12} />
      <Sfx name="scratch" at={c4 + 40} volume={0.12} />
      <Sfx name="chime" at={c5 + 10} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <path
          d={path3(diagPlane(1.35).map(R), P, true)}
          fill={alpha(colors.highlight, 0.12 * plane)}
          stroke={alpha(colors.highlight, 0.7 * plane)}
          strokeWidth={3}
        />
        {/* a marker on the plane's rim shows the plane turning */}
        <circle
          cx={P(R(diagPlane(1.35, 4)[0]))[0]}
          cy={P(R(diagPlane(1.35, 4)[0]))[1]}
          r={12}
          fill={colors.highlight}
          opacity={plane}
        />
        <path
          d={path3(
            [
              [-1.4, -1.4, -1.4].map((v) => v / Math.sqrt(3)) as V3,
              [1.6, 1.6, 1.6].map((v) => v / Math.sqrt(3)) as V3,
            ],
            P,
          )}
          stroke={colors.green}
          strokeWidth={6}
          opacity={diag}
        />
        <path
          d={path3(lineIn.map(R), P)}
          stroke={colors.red}
          strokeWidth={6}
          strokeDasharray="14 8"
          opacity={lineOn}
        />
        <path
          d={path3(lineIn, P)}
          stroke={alpha(colors.red, 0.35)}
          strokeWidth={4}
          opacity={lineOn * progress(frame, c4 + 20, 20)}
        />
        <g opacity={fadeIn(frame, c0 + 2, 10)}>
          {AXES.map((a, i) => {
            const [x, y] = P(R(a));
            return (
              <g key={i}>
                <line
                  x1={o[0]}
                  y1={o[1]}
                  x2={x}
                  y2={y}
                  stroke={AXC[i]}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <circle cx={x} cy={y} r={12} fill={AXC[i]} />
                <text
                  x={x + 22}
                  y={y - 14}
                  fill={AXC[i]}
                  fontSize={40}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  e{["₁", "₂", "₃"][i]}
                </text>
              </g>
            );
          })}
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 10)}>
          <rect
            x={1272}
            y={302}
            width={92}
            height={72}
            rx={10}
            fill="none"
            stroke={colors.green}
            strokeWidth={4}
          />
          <rect
            x={1372}
            y={382}
            width={176}
            height={140}
            rx={10}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
          />
          <Mat
            x={1270}
            y={300}
            rows={[
              ["1", "0", "0"],
              ["0", "∗", "∗"],
              ["0", "∗", "∗"],
            ]}
            cw={92}
            rh={74}
            size={46}
            cell={(i, j) =>
              i === 0 && j === 0
                ? colors.green
                : i > 0 && j > 0
                  ? colors.highlight
                  : alpha(colors.paper, 0.4)
            }
          />
          <text
            x={1410}
            y={620}
            textAnchor="middle"
            fill={colors.text}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            3 = 1 + 2
          </text>
        </g>
      </svg>
      <Chip
        frame={frame}
        at={c1 + 30}
        x={130}
        y={140}
        size={38}
        color={colors.green}
      >
        {tx.fixedLine}
      </Chip>
      <Chip
        frame={frame}
        at={c2 + 30}
        x={130}
        y={240}
        size={38}
        math
        color={colors.highlight}
      >
        {tx.plane}
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 50}
        x={130}
        y={340}
        size={38}
        color={colors.red}
      >
        {tx.irreducible}
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 10}
        x={1180}
        y={700}
        size={44}
        math
        color={colors.primary}
      >
        V = V₁ ⊕ V₂ ⊕ ⋯
      </Chip>
    </SceneShell>
  );
};
