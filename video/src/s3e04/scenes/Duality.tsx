import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { Dial } from "../components/dial";
import { useStrings } from "../i18n";

// A group and its dual. ℤ/8 as a ring of dots and Ĝ as a ring of dials
// (c0). Beside them, V as arrows and V* as stacks of lines (c1). Threads
// from each k to χₖ; picking ω³ instead of ω rewires them (c2). From G to
// the dual of the dual, threads that snap back with no choice (c3). Three
// pairs: circle ↔ integers, integers ↔ circle, line ↔ line (c4).
// Pontryagin (c5).

const N = 8;
const TH = (2 * Math.PI) / N;
const G = { x: 520, y: 450 };
const D = { x: 1400, y: 450 };
const R = 200;
const pos = (c: { x: number; y: number }, k: number) =>
  [
    c.x + R * Math.cos(Math.PI / 2 - k * TH),
    c.y - R * Math.sin(Math.PI / 2 - k * TH),
  ] as const;

export const Duality: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("duality");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const rings = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c4, 12);
  const vv = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const threads = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  // ω → ω³ rewires k ↦ 3k mod 8
  const rewire = progress(frame, c2 + 60, 30);
  const dd = fadeIn(frame, c3 + 4, 10);
  const snap = progress(frame, c3 + 20, 40);
  const pairs = fadeIn(frame, c4 + 4, 10);

  return (
    <SceneShell id="duality">
      <Sfx name="pop" at={c0 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 60} volume={0.12} />
      <Sfx name="clink" at={c3 + 60} volume={0.14} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c4 + 10 + i * 16} volume={0.1} />
      ))}
      <Sfx name="chime" at={c5 + 10} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={rings}>
          <circle
            cx={G.x}
            cy={G.y}
            r={R}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          {Array.from({ length: N }, (_, k) => {
            const [x, y] = pos(G, k);
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={14} fill={colors.primary} />
                <text
                  x={G.x + (R + 44) * Math.cos(Math.PI / 2 - k * TH)}
                  y={G.y - (R + 44) * Math.sin(Math.PI / 2 - k * TH) + 12}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={30}
                  fontFamily={fonts.mono}
                >
                  {k}
                </text>
              </g>
            );
          })}
          <text
            x={G.x}
            y={G.y + 16}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            G
          </text>
          {Array.from({ length: N }, (_, k) => {
            const [x, y] = pos(D, k);
            return <Dial key={k} cx={x} cy={y} r={34} angle={k * TH} />;
          })}
          <text
            x={D.x}
            y={D.y + 16}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            Ĝ
          </text>
        </g>
        <g opacity={threads}>
          {Array.from({ length: N }, (_, k) => {
            const [x1, y1] = pos(G, k);
            const t1 = pos(D, k);
            const t3 = pos(D, (3 * k) % N);
            const x2 = t1[0] + (t3[0] - t1[0]) * rewire;
            const y2 = t1[1] + (t3[1] - t1[1]) * rewire;
            return (
              <path
                key={k}
                d={`M ${x1} ${y1} Q 960 ${200 + k * 60} ${x2} ${y2}`}
                fill="none"
                stroke={alpha(colors.orange, 0.7)}
                strokeWidth={3}
              />
            );
          })}
          <text
            x={960}
            y={140}
            textAnchor="middle"
            fill={colors.orange}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {rewire < 0.5 ? "ω" : "ω³"}
          </text>
        </g>
        <g opacity={dd * rings}>
          {Array.from({ length: N }, (_, k) => {
            // a loop out from k to the far side and back to k itself
            const [x1, y1] = pos(G, k);
            const a = Math.PI / 2 - k * TH;
            const far = (r: number, da: number) =>
              [G.x + r * Math.cos(a + da), G.y - r * Math.sin(a + da)] as const;
            const [q1x, q1y] = far(R + 170, 0.35);
            const [q2x, q2y] = far(R + 170, -0.35);
            return (
              <path
                key={k}
                d={`M ${x1} ${y1} Q ${q1x} ${q1y} ${(q1x + q2x) / 2} ${(q1y + q2y) / 2} Q ${q2x} ${q2y} ${x1} ${y1}`}
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - snap}
                fill="none"
                stroke={colors.green}
                strokeWidth={4}
              />
            );
          })}
        </g>
        <g opacity={vv}>
          <g transform="translate(960 450)">
            <line
              x1={-60}
              y1={60}
              x2={40}
              y2={-60}
              stroke={colors.primary}
              strokeWidth={7}
              strokeLinecap="round"
            />
            {[-2, -1, 0, 1, 2].map((i) => (
              <line
                key={i}
                x1={-70 + i * 26}
                y1={-70}
                x2={-10 + i * 26}
                y2={70}
                stroke={colors.orange}
                strokeWidth={3}
                opacity={0.8}
              />
            ))}
          </g>
          <text
            x={960}
            y={580}
            textAnchor="middle"
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            V ↔ V*
          </text>
        </g>
        <g opacity={pairs}>
          {[0, 1, 2].map((i) => {
            const y = 230 + i * 190;
            const on = fadeIn(frame, c4 + 10 + i * 16, 8);
            const circle = (cx: number) => (
              <circle
                cx={cx}
                cy={y}
                r={60}
                fill="none"
                stroke={colors.primary}
                strokeWidth={6}
              />
            );
            const dots = (cx: number) => (
              <g>
                {Array.from({ length: 9 }, (_, j) => (
                  <circle
                    key={j}
                    cx={cx - 120 + j * 30}
                    cy={y}
                    r={8}
                    fill={colors.highlight}
                  />
                ))}
              </g>
            );
            const line = (cx: number) => (
              <line
                x1={cx - 140}
                y1={y}
                x2={cx + 140}
                y2={y}
                stroke={colors.green}
                strokeWidth={6}
              />
            );
            const L = [circle, dots, line][i];
            const Rr = [dots, circle, line][i];
            const names = [
              ["𝕋", "ℤ"],
              ["ℤ", "𝕋"],
              ["ℝ", "ℝ"],
            ][i];
            return (
              <g key={i} opacity={on}>
                {L(600)}
                {Rr(1320)}
                <text
                  x={960}
                  y={y + 16}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={56}
                  fontFamily={fonts.math}
                >
                  ↔
                </text>
                <text
                  x={600}
                  y={y + 100}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={38}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {names[0]}
                </text>
                <text
                  x={1320}
                  y={y + 100}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={38}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {names[1]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={760}
          y={640}
          size={34}
          color={colors.primary}
        >
          {tx.vectors} · {tx.covectors}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 70}
          x={860}
          y={740}
          size={36}
          color={colors.orange}
        >
          {tx.choice}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 60}
          x={860}
          y={740}
          size={36}
          math
          color={colors.green}
        >
          G → (Ĝ)ˆ · {tx.natural}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c5 + 8}
        x={1480}
        y={110}
        size={40}
        math
        color={colors.highlight}
      >
        G ≅ (Ĝ)ˆ
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 20}
        x={1480}
        y={200}
        size={36}
        color={colors.highlight}
      >
        {tx.pontryagin}
      </Chip>
    </SceneShell>
  );
};
