import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Building past ω, with crates and matchsticks. First: crate n holds crates
// 0 … n−1 (each number is the set of the numbers before it). Then the
// matchstick ruler: sticks 0, 1, 2, … bunching to a point, where a taller
// stick ω lands; then ω+1, ω+2 … repeat the pattern. The camera pulls back:
// copies of that pattern bunch up to ω·2, ω·3 … ω², then ω^ω, ε₀. Last, a
// brace sweeps over everything before ω: ω is the set of all of them.

const BASE_Y = 760;
const RATE = 0.72;

// one copy of the ω pattern inside [x0, x0 + w]: sticks bunch toward the end
const Pattern: React.FC<{
  readonly x0: number;
  readonly w: number;
  readonly h: number;
  readonly depth: number;
  readonly shown: number; // 0..1 how much of it is drawn
  readonly labels?: boolean;
}> = ({ x0, w, h, depth, shown, labels = false }) => {
  const K = depth > 1 ? 9 : 16;
  const out = [];
  for (let k = 0; k < K; k++) {
    if (k / K > shown) break;
    const s = x0 + w * (1 - RATE ** k);
    const seg = w * (RATE ** k - RATE ** (k + 1));
    const hk = h * 0.86 ** k;
    if (depth > 1) {
      out.push(
        <Pattern
          key={k}
          x0={s}
          w={seg * 0.92}
          h={hk * 0.7}
          depth={depth - 1}
          shown={1}
        />,
      );
      out.push(
        <line
          key={`s${k}`}
          x1={s + seg * 0.92}
          y1={BASE_Y}
          x2={s + seg * 0.92}
          y2={BASE_Y - hk * 0.95}
          stroke={colors.highlight}
          strokeWidth={Math.max(2, 8 * 0.85 ** k)}
          strokeLinecap="round"
        />,
      );
    } else {
      out.push(
        <g key={k}>
          <line
            x1={s}
            y1={BASE_Y}
            x2={s}
            y2={BASE_Y - hk}
            stroke={colors.primary}
            strokeWidth={Math.max(2, 7 * 0.88 ** k)}
            strokeLinecap="round"
          />
          <circle
            cx={s}
            cy={BASE_Y - hk}
            r={Math.max(2, 8 * 0.88 ** k)}
            fill={colors.orange}
          />
          {labels && k < 5 ? (
            <text
              x={s}
              y={BASE_Y + 50}
              fill={colors.text}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              {k}
            </text>
          ) : null}
        </g>,
      );
    }
  }
  return <g>{out}</g>;
};

// a crate holding smaller crates
const Crate: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly n: number;
  readonly s: number;
}> = ({ x, y, n, s }) => {
  const W = 60 + n * 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect
        x={-W / 2}
        y={-90}
        width={W}
        height={90}
        rx={10}
        fill={alpha(colors.wood, 0.85)}
        stroke={colors.ink}
        strokeWidth={4}
      />
      {Array.from({ length: n }).map((_, k) => (
        <rect
          key={k}
          x={-W / 2 + 14 + k * 70}
          y={-70}
          width={50}
          height={50}
          rx={6}
          fill={colors.paper}
          stroke={colors.ink}
          strokeWidth={3}
        />
      ))}
      {Array.from({ length: n }).map((_, k) => (
        <text
          key={`t${k}`}
          x={-W / 2 + 39 + k * 70}
          y={-35}
          fill={colors.ink}
          fontSize={28}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={700}
        >
          {k}
        </text>
      ))}
      <text
        x={0}
        y={50}
        fill={colors.primary}
        fontSize={48}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={700}
      >
        {n}
      </text>
    </g>
  );
};

export const Omega: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("omega");
  const [c0, c1, c2, c3] = cues;
  const crateAt = (n: number) => c0 + 10 + n * 14;
  const crates = fadeOut(frame, c1, 12);
  // the ω pattern draws in, then ω lands, then ω+1, ω+2 …
  const draw = ramp(frame, c1 + 6, 50);
  const omega = springIn(frame, c1 + 58, fps, 10);
  const after = ramp(frame, c1 + 76, 40);
  // pull back to ω²
  const pull = glide(frame, c2 + 4, fps, 50);
  const W1 = 700;
  const X0 = 200;
  const W2 = lerp(W1 * 2.2, 1400, pull);
  // the pull-back: start close on the first ω, end on the whole row
  const zoom = lerp(1.12, 1, pull);
  const labelAt = (k: number) => c2 + 40 + k * 14;
  const brace = ramp(frame, c3 + 6, 24);

  return (
    <SceneShell id="omega">
      {[0, 1, 2, 3].map((n) => (
        <Sfx key={n} name="pop" at={crateAt(n)} volume={0.18} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={`s${k}`} name={PLUCKS[k]} at={c1 + 6 + k * 7} volume={0.14} />
      ))}
      <Sfx name="thud" at={c1 + 58} volume={0.3} />
      <Sfx name="whoosh" at={c2 + 4} volume={0.16} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`l${k}`} name="ding" at={labelAt(k)} volume={0.18} />
      ))}
      <Sfx name="scratch" at={c3 + 6} volume={0.2} />
      <QuestionTray />

      {/* crates: each number holds the numbers before it */}
      <AbsoluteFill style={{ opacity: crates }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2, 3].map((n) => (
            <Crate
              key={n}
              x={[260, 520, 860, 1340][n]}
              y={560}
              n={n}
              s={Math.min(1, springIn(frame, crateAt(n), fps, 12))}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* matchsticks */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2) }}>
        <Camera zoom={zoom} x={lerp(-120, 0, pull)} y={lerp(80, 0, pull)}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <line
              x1={120}
              y1={BASE_Y}
              x2={1820}
              y2={BASE_Y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {pull < 0.02 ? (
              <g>
                <Pattern x0={X0} w={W1} h={300} depth={1} shown={draw} labels />
                {/* ω */}
                <g opacity={Math.min(1, omega)}>
                  <line
                    x1={X0 + W1}
                    y1={BASE_Y}
                    x2={X0 + W1}
                    y2={BASE_Y - 380 * Math.min(1, omega)}
                    stroke={colors.highlight}
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <text
                    x={X0 + W1}
                    y={BASE_Y + 56}
                    fill={colors.highlight}
                    fontSize={48}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    ω
                  </text>
                </g>
                {/* ω + 1, ω + 2, … the same pattern again */}
                <Pattern
                  x0={X0 + W1 + 30}
                  w={W1}
                  h={300}
                  depth={1}
                  shown={after}
                />
                {["ω+1", "ω+2"].map((l, k) => (
                  <text
                    key={l}
                    x={X0 + W1 + 30 + W1 * (1 - RATE ** (k + 1))}
                    y={BASE_Y + 56}
                    fill={colors.text}
                    fontSize={32}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={fadeIn(frame, c1 + 86 + k * 8)}
                  >
                    {l}
                  </text>
                ))}
              </g>
            ) : (
              <g>
                <Pattern
                  x0={X0}
                  w={W2}
                  h={lerp(300, 340, pull)}
                  depth={2}
                  shown={1}
                />
                <line
                  x1={X0 + W2}
                  y1={BASE_Y}
                  x2={X0 + W2}
                  y2={BASE_Y - 440}
                  stroke={colors.green}
                  strokeWidth={12}
                  strokeLinecap="round"
                  opacity={fadeIn(frame, labelAt(0))}
                />
                {[
                  { l: "ω", x: X0 + W2 * (1 - RATE) * 0.92, at: c2 + 10 },
                  {
                    l: "ω·2",
                    x: X0 + W2 * (1 - RATE) + W2 * (RATE - RATE ** 2) * 0.92,
                    at: c2 + 20,
                  },
                  { l: "ω²", x: X0 + W2, at: labelAt(0) },
                ].map((m) => (
                  <text
                    key={m.l}
                    x={m.x}
                    y={BASE_Y + 60}
                    fill={m.l === "ω²" ? colors.green : colors.highlight}
                    fontSize={46}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                    opacity={fadeIn(frame, m.at)}
                  >
                    {m.l}
                  </text>
                ))}
              </g>
            )}
          </svg>
        </Camera>
        {/* still further: ω^ω and ε₀ climb off to the right */}
        <div
          style={{
            position: "absolute",
            right: 140,
            top: 230,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 26,
            fontFamily: fonts.math,
            fontWeight: 700,
          }}
        >
          {[
            { l: "ω^ω", at: labelAt(1), s: 60 },
            { l: "ε₀ = ω^ω^ω^…", at: labelAt(2), s: 72 },
          ].map((m) => (
            <div
              key={m.l}
              style={{
                fontSize: m.s,
                color: colors.green,
                opacity: fadeIn(frame, m.at),
                translate: riseIn(frame, m.at, 18),
              }}
            >
              {m.l}
            </div>
          ))}
        </div>
        {/* ω is the set of everything before it */}
        <AbsoluteFill style={{ opacity: brace * (pull > 0.5 ? 1 : 0) }}>
          <svg width={1920} height={1080}>
            <path
              d={`M ${X0} ${BASE_Y - 470} Q ${X0} ${BASE_Y - 520} ${X0 + 60} ${BASE_Y - 520} L ${X0 + (W2 - 60) * brace} ${BASE_Y - 520} Q ${X0 + W2} ${BASE_Y - 520} ${X0 + W2} ${BASE_Y - 470}`}
              fill="none"
              stroke={colors.green}
              strokeWidth={6}
            />
            <text
              x={X0 + W2 / 2}
              y={BASE_Y - 545}
              fill={colors.green}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c3 + 24)}
            >
              ω² = {"{"}0, 1, …, ω, …, ω·2, …{"}"}
            </text>
          </svg>
        </AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 130,
            fontFamily: fonts.title,
            fontSize: 60,
            color: colors.primary,
            opacity: fadeIn(frame, c3 + 40),
            translate: riseIn(frame, c3 + 40, 16),
          }}
        >
          {tx.ordinals}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
