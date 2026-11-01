import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Rulers without protractors. Part 1: one unit circle |x|^p + |y|^p = 1,
// round (c0), morphing to the taxi diamond (c1) and the chessboard square
// (c2), each named. Part 2, taxi Pythagoras (c3–c4): a unit square on a
// street grid; a taxi drives along the two sides, its odometer reaching
// 2, while the straight diagonal is drawn dashed; then the Pythagoras
// check 1² + 1² = 2 ≠ 4 = 2² works itself out and the diagonal turns red.
// Part 3, the parallelogram law as a balance (c5–c7): the unit square's
// sides (lemon) and diagonals (orange) inside the current unit ball; two
// orange blocks (diagonals²) against four lemon ones (2 × sides²); p
// sweeps through every ruler and the beam only sits level at p = 2.

const ball = (q: number, cx: number, cy: number, r: number) =>
  Array.from({ length: 145 }, (_, i) => {
    const t = (i / 144) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = Math.sign(c) * Math.abs(c) ** (2 * q);
    const y = Math.sign(s) * Math.abs(s) ** (2 * q);
    return `${i ? "L" : "M"} ${(cx + x * r).toFixed(1)} ${(cy - y * r).toFixed(1)}`;
  }).join(" ");

const Q_INF = 0.02;

export const Norms: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("norms");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;

  // part 1: q = 1/p, round → diamond → square
  const q1 = lerp(
    lerp(0.5, 1, glide(frame, c1 + 6, fps, 30)),
    Q_INF,
    glide(frame, c2 + 6, fps, 30),
  );
  const part1 = fadeOut(frame, c3, 10);
  const named = [
    { at: c0 + 6, label: tx.round, color: colors.green },
    { at: c1 + 20, label: tx.taxi, color: colors.primary },
    { at: c2 + 20, label: tx.chess, color: colors.primary },
  ];

  // part 2: the taxi drive
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const drive = glide(frame, c3 + 16, fps, 60);
  const T = { x: 520, y: 640 };
  const L = 320;
  const car =
    drive < 0.5
      ? { x: T.x + 2 * drive * L, y: T.y }
      : { x: T.x + L, y: T.y - (2 * drive - 1) * L };
  const odo = 2 * drive;

  // part 3: the balance, p sweeping 1 → ∞, then settling at 2
  const part3 = fadeIn(frame, c5 + 4, 10);
  const q2 = lerp(
    lerp(1, Q_INF, glide(frame, c6 + 6, fps, 90)),
    0.5,
    glide(frame, c7 + 4, fps, 40),
  );
  const p = 1 / q2;
  const diag2 = 2 ** (2 * q2);
  const tilt = Math.max(-14, Math.min(14, (2 * diag2 - 4) * 5));
  const level = Math.abs(2 * diag2 - 4) < 0.05;
  const H = 34;
  const O = { x: 440, y: 560 };
  const R = 220;
  const corner = { x: O.x + R, y: O.y - R };

  return (
    <SceneShell id="norms">
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="riser" at={c3 + 16} volume={0.08} />
      <Sfx name="pop" at={c3 + 76} volume={0.14} />
      <Sfx name="thud" at={c4 + 30} volume={0.22} />
      <Sfx name="pop" at={c5 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c6 + 6} volume={0.1} />
      <Sfx name="ding" at={c7 + 44} volume={0.4} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0.5, 1, Q_INF].map((q, i) => (
            <path
              key={i}
              d={ball(q, 760, 450, 300)}
              fill="none"
              stroke={alpha(colors.paper, 0.18)}
              strokeWidth={3}
              strokeDasharray="10 10"
              opacity={fadeIn(frame, named[i].at + 20)}
            />
          ))}
          <path
            d={ball(q1, 760, 450, 300)}
            fill={alpha(colors.primary, 0.12)}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <line
            x1={400}
            y1={450}
            x2={1120}
            y2={450}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={760}
            y1={90}
            x2={760}
            y2={810}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
        </svg>
        {named.map((n, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 200 + i * 130,
              left: 1360,
              fontSize: 60,
              fontWeight: 800,
              color: n.color,
              opacity: fadeIn(frame, n.at),
              translate: riseIn(frame, n.at, 14),
            }}
          >
            {n.label}
          </div>
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }).map((_, k) => (
            <g key={k} stroke={alpha(colors.paper, 0.14)} strokeWidth={2}>
              <line
                x1={T.x - L + k * (L / 2)}
                y1={T.y + L / 2}
                x2={T.x - L + k * (L / 2)}
                y2={T.y - 1.5 * L}
              />
              <line
                x1={T.x - L}
                y1={T.y + L / 2 - k * (L / 2)}
                x2={T.x + 2 * L}
                y2={T.y + L / 2 - k * (L / 2)}
              />
            </g>
          ))}
          <rect
            x={T.x}
            y={T.y - L}
            width={L}
            height={L}
            fill={alpha(colors.primary, 0.08)}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
          />
          <line
            x1={T.x}
            y1={T.y}
            x2={T.x + L}
            y2={T.y - L}
            stroke={fadeIn(frame, c4 + 30) > 0.5 ? colors.red : colors.paper}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <path
            d={`M ${T.x} ${T.y} L ${drive < 0.5 ? car.x : T.x + L} ${T.y} ${drive >= 0.5 ? `L ${car.x} ${car.y}` : ""}`}
            fill="none"
            stroke={colors.orange}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <rect
            x={car.x - 22}
            y={car.y - 14}
            width={44}
            height={28}
            rx={8}
            fill={colors.highlight}
          />
          <text
            x={T.x + L / 2}
            y={T.y + 56}
            fill={colors.muted}
            fontSize={42}
            textAnchor="middle"
            fontFamily={fonts.mono}
          >
            1
          </text>
          <text
            x={T.x + L + 30}
            y={T.y - L / 2 + 14}
            fill={colors.muted}
            fontSize={42}
            fontFamily={fonts.mono}
          >
            1
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 1180,
            width: 520,
            padding: "14px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.orange}`,
          }}
        >
          <div style={{ fontSize: 32, color: colors.muted, fontWeight: 700 }}>
            {tx.taxi}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 88,
              fontWeight: 800,
              color: colors.orange,
            }}
          >
            {odo.toFixed(2)}
          </div>
        </div>
        <Eq
          steps={[
            [
              { id: "a", t: "1² + 1²" },
              { id: "e", t: " = " },
              { id: "b", t: "2" },
            ],
            [
              { id: "a", t: "1² + 1²" },
              { id: "e", t: " = " },
              { id: "b", t: "2" },
              { id: "n", t: " ≠ ", color: colors.red },
              { id: "c", t: "2²", color: colors.red },
            ],
          ]}
          at={[c4 + 4, c4 + 30]}
          x={1440}
          y={480}
          size={66}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <path
            d={ball(q2, O.x, O.y, R)}
            fill={alpha(colors.primary, 0.08)}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
          />
          <Arrow from={O} to={{ x: O.x + R, y: O.y }} width={12} />
          <Arrow from={O} to={{ x: O.x, y: O.y - R }} width={12} />
          <line
            x1={O.x + R}
            y1={O.y}
            x2={corner.x}
            y2={corner.y}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <line
            x1={O.x}
            y1={O.y - R}
            x2={corner.x}
            y2={corner.y}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={corner.x}
            y2={corner.y}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <line
            x1={O.x + R}
            y1={O.y}
            x2={O.x}
            y2={O.y - R}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <g transform="translate(1340 640)">
            <path
              d="M -40 120 L 0 0 L 40 120 Z"
              fill={alpha(colors.wood, 0.8)}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <g transform={`rotate(${tilt})`}>
              <line
                x1={-300}
                y1={0}
                x2={300}
                y2={0}
                stroke={level ? colors.green : colors.text}
                strokeWidth={10}
                strokeLinecap="round"
              />
              <g transform={`translate(-240 0) rotate(${-tilt})`}>
                <line
                  x1={-70}
                  y1={-6}
                  x2={70}
                  y2={-6}
                  stroke={colors.text}
                  strokeWidth={6}
                />
                {[0, 1].map((n) => (
                  <rect
                    key={n}
                    x={-50}
                    y={-6 - (n + 1) * diag2 * H}
                    width={100}
                    height={diag2 * H - 4}
                    rx={6}
                    fill={colors.orange}
                  />
                ))}
                <text
                  y={60}
                  fill={colors.orange}
                  fontSize={34}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {tx.diagonals}
                </text>
              </g>
              <g transform={`translate(240 0) rotate(${-tilt})`}>
                <line
                  x1={-70}
                  y1={-6}
                  x2={70}
                  y2={-6}
                  stroke={colors.text}
                  strokeWidth={6}
                />
                {[0, 1, 2, 3].map((n) => (
                  <rect
                    key={n}
                    x={-50}
                    y={-6 - (n + 1) * H}
                    width={100}
                    height={H - 4}
                    rx={6}
                    fill={colors.primary}
                  />
                ))}
                <text
                  y={60}
                  fill={colors.primary}
                  fontSize={34}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {tx.sides}
                </text>
              </g>
            </g>
            <circle r={12} fill={colors.text} />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c5 + 10),
            translate: riseIn(frame, c5 + 10, 16),
          }}
        >
          {tx.parallelogram}
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 140,
            fontFamily: fonts.mono,
            fontSize: 72,
            fontWeight: 800,
            color: level ? colors.green : colors.text,
            opacity: fadeIn(frame, c5 + 20),
          }}
        >
          p = {p > 30 ? "∞" : p.toFixed(1)}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
