import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Schur's lemma. Two rooms V and W, each with the group turning inside it,
// and an arrow φ between them that commutes with the turning (c0). The
// kernel inside V and the image inside W, both turning with the group: both
// invariant (c1). Two endings: the arrow shrinks to nothing, or swells into
// a bridge, an isomorphism (c2). From V to itself: a grid scaled evenly,
// λI (c3).

const V = { x: 520, y: 420 };
const W = { x: 1400, y: 420 };
const RR = 210;

const Room: React.FC<{
  x: number;
  y: number;
  label: string;
  spin: number;
  color: string;
}> = ({ x, y, label, spin, color }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={RR}
      fill={alpha(color, 0.08)}
      stroke={color}
      strokeWidth={5}
    />
    {[0, 1, 2].map((k) => {
      const a = spin + (2 * Math.PI * k) / 3;
      return (
        <circle
          key={k}
          cx={x + 130 * Math.cos(a)}
          cy={y - 130 * Math.sin(a)}
          r={14}
          fill={color}
        />
      );
    })}
    <text
      x={x}
      y={y - RR - 24}
      textAnchor="middle"
      fill={color}
      fontSize={56}
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);

export const Schur: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("schur");
  const [c0, c1, c2, c3] = cues;
  const spin = frame * 0.03;
  const rooms = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c3, 12);
  const sub = fadeIn(frame, c1 + 6, 10) * fadeOut(frame, c2, 10);
  const fate = progress(frame, c2 + 10, 30);
  const lam = 1 + 0.5 * progress(frame, c3 + 20, 40);
  const one = fadeIn(frame, c3 + 6, 12);

  return (
    <SceneShell id="schur">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="thud" at={c2 + 30} volume={0.16} />
      <Sfx name="chime" at={c2 + 40} volume={0.2} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={rooms}>
          <Room x={V.x} y={V.y} label="V" spin={spin} color={colors.primary} />
          <Room
            x={W.x}
            y={W.y}
            label="W"
            spin={spin}
            color={colors.highlight}
          />
          {/* before c2: one arrow φ; at c2 it splits into the two endings */}
          <g opacity={1 - fate}>
            <line
              x1={V.x + RR}
              y1={V.y}
              x2={W.x - RR - 20}
              y2={W.y}
              stroke={colors.orange}
              strokeWidth={8}
            />
            <path
              d={`M ${W.x - RR - 40} ${W.y - 20} L ${W.x - RR - 10} ${W.y} L ${W.x - RR - 40} ${W.y + 20}`}
              fill="none"
              stroke={colors.orange}
              strokeWidth={8}
            />
            <text
              x={960}
              y={V.y - 30}
              textAnchor="middle"
              fill={colors.orange}
              fontSize={56}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              φ
            </text>
          </g>
          <g opacity={sub}>
            <ellipse
              cx={V.x}
              cy={V.y}
              rx={90 + 6 * Math.sin(spin * 2)}
              ry={60}
              fill={alpha(colors.red, 0.25)}
              stroke={colors.red}
              strokeWidth={3}
            />
            <text
              x={V.x}
              y={V.y + 14}
              textAnchor="middle"
              fill={colors.red}
              fontSize={36}
              fontWeight={800}
              fontFamily={fonts.body}
            >
              {tx.kernel}
            </text>
            <ellipse
              cx={W.x}
              cy={W.y}
              rx={110}
              ry={70 + 6 * Math.sin(spin * 2)}
              fill={alpha(colors.green, 0.25)}
              stroke={colors.green}
              strokeWidth={3}
            />
            <text
              x={W.x}
              y={W.y + 14}
              textAnchor="middle"
              fill={colors.green}
              fontSize={36}
              fontWeight={800}
              fontFamily={fonts.body}
            >
              {tx.image}
            </text>
          </g>
          <g opacity={fate}>
            {/* ending 1: the arrow shrinks to a point */}
            <line
              x1={V.x + RR}
              y1={V.y - 110}
              x2={V.x + RR + 300 * (1 - fate) + 10}
              y2={V.y - 110}
              stroke={colors.red}
              strokeWidth={6}
              strokeDasharray="10 8"
            />
            <circle
              cx={V.x + RR + 10}
              cy={V.y - 110}
              r={12}
              fill={colors.red}
            />
            <text
              x={V.x + RR + 60}
              y={V.y - 130}
              fill={colors.red}
              fontSize={40}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              0
            </text>
            {/* ending 2: a thick bridge */}
            <path
              d={`M ${V.x + RR - 10} ${V.y + 60} L ${W.x - RR + 10} ${W.y + 60} L ${W.x - RR + 10} ${W.y + 110} L ${V.x + RR - 10} ${V.y + 110} Z`}
              fill={alpha(colors.green, 0.35)}
              stroke={colors.green}
              strokeWidth={4}
            />
            <text
              x={960}
              y={V.y + 98}
              textAnchor="middle"
              fill={colors.green}
              fontSize={42}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              ≅
            </text>
          </g>
        </g>
        <g opacity={one}>
          <circle
            cx={760}
            cy={430}
            r={RR}
            fill={alpha(colors.primary, 0.06)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {Array.from({ length: 9 }, (_, k) => {
            const u = (k - 4) * 40 * lam;
            return (
              <g key={k}>
                <line
                  x1={760 + u}
                  y1={430 - 160 * lam}
                  x2={760 + u}
                  y2={430 + 160 * lam}
                  stroke={alpha(colors.paper, 0.25)}
                  strokeWidth={2}
                />
                <line
                  x1={760 - 160 * lam}
                  y1={430 + u}
                  x2={760 + 160 * lam}
                  y2={430 + u}
                  stroke={alpha(colors.paper, 0.25)}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <line
            x1={760}
            y1={430}
            x2={760 + 80 * lam}
            y2={430 - 40 * lam}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <line
            x1={760}
            y1={430}
            x2={760 - 40 * lam}
            y2={430 - 80 * lam}
            stroke={colors.green}
            strokeWidth={8}
          />
          <path
            d={`M 980 300 C 1100 200, 1100 660, 980 560`}
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
          />
          <text
            x={1110}
            y={450}
            fill={colors.orange}
            fontSize={64}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            φ = λI
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={840}
          y={650}
          size={38}
          color={colors.text}
        >
          {tx.invariant}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 40}
          x={360}
          y={700}
          size={38}
          color={colors.red}
        >
          {tx.zero}
        </Chip>
        <Chip
          frame={frame}
          at={c2 + 50}
          x={1240}
          y={700}
          size={38}
          color={colors.green}
        >
          {tx.iso}
        </Chip>
      </div>
    </SceneShell>
  );
};
