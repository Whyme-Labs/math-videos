import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Cosets. The integers −4 … 15 sit on one line; each hops down into its
// lane by remainder: 4ℤ, 1 + 4ℤ, 2 + 4ℤ, 3 + 4ℤ. Then Lagrange: twelve dots
// on a 12-hour clock, the subgroup {0, 4, 8} lit, and every dot slides into
// one of four piles of three. 12 = 4 × 3.

export const LANE_COLORS = [
  colors.highlight,
  colors.green,
  colors.orange,
  colors.primary,
];
const laneY = (r: number) => 330 + r * 130;
const LANE_NAMES = ["4ℤ", "1 + 4ℤ", "2 + 4ℤ", "3 + 4ℤ"];

export const Lanes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lanes");
  const [c0, c1] = cues;
  const sortAt = (r: number) => c0 + 30 + r * 16;
  const part1 = fadeOut(frame, c1, 10);
  // the 12-hour clock and its cosets
  const pileAt = (r: number) => c1 + 40 + r * 10;
  const eq = Math.min(1, springIn(frame, c1 + 90, fps, 10));

  return (
    <SceneShell id="lanes">
      <Sfx name="whoosh" at={c0 + 10} volume={0.12} />
      {[0, 1, 2, 3].map((r) => (
        <Sfx key={r} name={PLUCKS[r]} at={sortAt(r) + 10} volume={0.14} />
      ))}
      {[0, 1, 2, 3].map((r) => (
        <Sfx key={`p${r}`} name="pop" at={pileAt(r) + 12} volume={0.14} />
      ))}
      <Sfx name="ding" at={c1 + 90} />

      {/* the integers, sorted into four lanes */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3].map((r) => (
            <g key={r} opacity={fadeIn(frame, sortAt(r))}>
              <rect
                x={300}
                y={laneY(r) - 50}
                width={1520}
                height={100}
                rx={50}
                fill={LANE_COLORS[r]}
                opacity={0.18}
              />
              <text
                x={260}
                y={laneY(r) + 16}
                fill={LANE_COLORS[r]}
                fontSize={44}
                textAnchor="end"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {LANE_NAMES[r]}
              </text>
            </g>
          ))}
          {Array.from({ length: 20 }).map((_, i) => {
            const n = i - 4;
            const r = ((n % 4) + 4) % 4;
            const t = glide(frame, sortAt(r), fps, 14);
            const x0 = 340 + i * 76;
            const x1 = 380 + Math.floor((n - r) / 4 + 1) * 280 + r * 70;
            const p = hop(t, x0, 200, x1, laneY(r), 80);
            return (
              <g key={n} opacity={fadeIn(frame, c0 + 4 + i, 6)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={36}
                  fill={t > 0.5 ? LANE_COLORS[r] : colors.paper}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <text
                  x={p.x}
                  y={p.y + 14}
                  fill={colors.ink}
                  fontSize={36}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {n < 0 ? `−${-n}` : n}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 60,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, sortAt(3) + 20),
            translate: riseIn(frame, sortAt(3) + 20, 16),
          }}
        >
          {tx.coset}
        </div>
      </AbsoluteFill>

      {/* Lagrange: 12 dots into four piles of three */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <circle
            cx={560}
            cy={500}
            r={230}
            fill="none"
            stroke={colors.muted}
            strokeWidth={4}
          />
          {Array.from({ length: 12 }).map((_, k) => {
            const r = k % 4;
            const a = (k / 12) * Math.PI * 2 - Math.PI / 2;
            const home = {
              x: 560 + 230 * Math.cos(a),
              y: 500 + 230 * Math.sin(a),
            };
            const slot = Math.floor(k / 4);
            const target = { x: 1100 + r * 200, y: 380 + slot * 120 };
            const t = glide(frame, pileAt(r), fps, 16);
            const p = hop(t, home.x, home.y, target.x, target.y, 100);
            const lit = frame >= c1 + 16;
            return (
              <g key={k}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={40}
                  fill={lit ? LANE_COLORS[r] : colors.paper}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <text
                  x={p.x}
                  y={p.y + 14}
                  fill={colors.ink}
                  fontSize={36}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {k}
                </text>
              </g>
            );
          })}
          <g opacity={eq}>
            <text
              x={1400}
              y={790}
              fill={colors.text}
              fontSize={72}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              12 = 4 × 3
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 96),
            translate: riseIn(frame, c1 + 96, 16),
          }}
        >
          {tx.lagrange}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
