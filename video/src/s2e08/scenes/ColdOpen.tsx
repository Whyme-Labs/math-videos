import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Ann Arbor, 1941: Mac Lane at a blackboard, Eilenberg in the
// front row. On the board, "V ≅ V*" and "V ≅ V**", each followed by
// "natural?". Then a paper lands with the 1945 title typed across it, and a
// small diagram (dots joined by arrows, the first picture of a category)
// draws itself. Last, three circles V, V*, V**: the thread from V to V**
// holds green, the thread from V to V* snaps red.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const part1 = fadeOut(frame, c3, 10);
  const q = (k: number) =>
    Math.min(1, springIn(frame, c1 + 20 + k * 24, fps, 10));
  const paper = Math.min(1, springIn(frame, c2 + 10, fps, 10));
  const diagram = glide(frame, c2 + 40, fps, 40);
  const snap = glide(frame, c3 + 60, fps, 14);
  const NODES = [
    { x: 1340, y: 520 },
    { x: 1560, y: 430 },
    { x: 1560, y: 650 },
    { x: 1780, y: 540 },
  ];
  const EDGES = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  const V = { x: 960, y: 300 };
  const VS = { x: 560, y: 620 };
  const VSS = { x: 1360, y: 620 };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="tick" at={c0 + 30} volume={0.14} />
      <Sfx name="pop" at={c1 + 20} volume={0.16} />
      <Sfx name="pop" at={c1 + 44} volume={0.16} />
      <Sfx name="thud" at={c2 + 10} volume={0.32} />
      {EDGES.map((_, k) => (
        <Sfx key={k} name="pluck2" at={c2 + 40 + k * 10} volume={0.12} />
      ))}
      <Sfx name="ding" at={c3 + 30} />
      <Sfx name="scratch" at={c3 + 60} volume={0.24} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {/* the blackboard */}
          <rect
            x={160}
            y={140}
            width={980}
            height={460}
            rx={14}
            fill={alpha(colors.ink, 0.9)}
            stroke={colors.wood}
            strokeWidth={10}
          />
          {["V ≅ V*", "V ≅ V**"].map((t, k) => (
            <g key={t}>
              <text
                x={240}
                y={300 + k * 170}
                fill={colors.paper}
                fontSize={90}
                fontFamily={fonts.math}
                fontWeight={700}
              >
                {typed(t, frame, c0 + 20 + k * 30, fps, 12)}
              </text>
              <g
                opacity={q(k)}
                transform={`translate(${780} ${290 + k * 170}) scale(${q(k)})`}
              >
                <text fill={colors.highlight} fontSize={64} fontWeight={800}>
                  {tx.naturalQ}
                </text>
              </g>
            </g>
          ))}
          <Person
            x={1220}
            y={780}
            color={colors.orange}
            size={1.8}
            facing={-1}
          />
          <Person
            x={480}
            y={820}
            color={colors.primary}
            size={1.4}
            facing={1}
            glasses
          />
          <text
            x={1220}
            y={500}
            fill={colors.orange}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10) * fadeOut(frame, c2, 8)}
          >
            {tx.maclane}
          </text>
          <text
            x={640}
            y={760}
            fill={colors.primary}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 16) * fadeOut(frame, c2, 8)}
          >
            {tx.eilenberg}
          </text>
          {/* the paper, and a first diagram */}
          <g
            opacity={paper}
            transform={`translate(1500 ${lerp(-200, 260, paper)}) rotate(-3)`}
          >
            <rect
              x={-330}
              y={-80}
              width={660}
              height={130}
              rx={8}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              y={0}
              fill={colors.ink}
              fontSize={30}
              textAnchor="middle"
              fontStyle="italic"
              fontWeight={700}
            >
              {typed(tx.paper, frame, c2 + 16, fps, 40)}
            </text>
          </g>
          {EDGES.map(([a, b], k) => {
            const t = Math.max(0, Math.min(1, diagram * 4 - k));
            const A = NODES[a];
            const B = NODES[b];
            return (
              <line
                key={k}
                x1={A.x}
                y1={A.y}
                x2={lerp(A.x, B.x, t)}
                y2={lerp(A.y, B.y, t)}
                stroke={colors.primary}
                strokeWidth={6}
                opacity={t > 0 ? 1 : 0}
              />
            );
          })}
          {NODES.map((n, k) => (
            <circle
              key={k}
              cx={n.x}
              cy={n.y}
              r={20}
              fill={colors.orange}
              opacity={fadeIn(frame, c2 + 34 + k * 4, 6)}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.annArbor}
        </div>
      </AbsoluteFill>

      {/* V, V*, V**: one thread holds, one snaps */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={V.x}
            y1={V.y}
            x2={VSS.x}
            y2={VSS.y}
            stroke={colors.green}
            strokeWidth={10}
          />
          {[0, 1].map((k) => {
            const mid = { x: (V.x + VS.x) / 2, y: (V.y + VS.y) / 2 };
            const end = k === 0 ? V : VS;
            const dx = (k === 0 ? -1 : 1) * 40 * snap;
            return (
              <line
                key={k}
                x1={end.x}
                y1={end.y}
                x2={mid.x + dx}
                y2={mid.y + 30 * snap * (k === 0 ? -1 : 1)}
                stroke={snap > 0.05 ? colors.red : colors.paper}
                strokeWidth={10}
                strokeDasharray={snap > 0.05 ? "16 10" : undefined}
              />
            );
          })}
          {[
            { p: V, t: "V", c: colors.primary },
            { p: VS, t: "V*", c: colors.orange },
            { p: VSS, t: "V**", c: colors.primary },
          ].map((n) => (
            <g key={n.t}>
              <circle
                cx={n.p.x}
                cy={n.p.y}
                r={100}
                fill={alpha(colors.bgMid, 0.95)}
                stroke={n.c}
                strokeWidth={8}
              />
              <text
                x={n.p.x}
                y={n.p.y + 26}
                fill={n.c}
                fontSize={76}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {n.t}
              </text>
            </g>
          ))}
          <text
            x={(V.x + VSS.x) / 2 + 70}
            y={(V.y + VSS.y) / 2}
            fill={colors.green}
            fontSize={48}
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 30)}
          >
            {tx.natural} ✓
          </text>
          <text
            x={(V.x + VS.x) / 2 - 70}
            y={(V.y + VS.y) / 2}
            fill={colors.red}
            fontSize={48}
            textAnchor="end"
            fontWeight={800}
            opacity={fadeIn(frame, c3 + 66)}
          >
            {tx.choice}
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
