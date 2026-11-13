import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { useStrings } from "../i18n";

// The two examples solved. The shift: a unit circle with a probe λ inside,
// and the bars of v = (1, λ̄, λ̄², …) shrinking geometrically (c0). The
// range of S − λ as a plane of arrows and v standing perpendicular to it
// (c1). The disk fills in; chip (c2). Multiplication by x: λ off [0, 1]
// and the bounded curve 1/|x − λ| (c3). λ inside: bumps fₙ, taller and
// thinner as n doubles, with the readout ‖(M − λ)fₙ‖ ≤ 1/n (c4). The band
// [0, 1] fills in as continuous spectrum (c5).

const CX = 480;
const CY = 440;
const U = 260;
const L = { x: 0.45, y: 0.3 };
const r = Math.hypot(L.x, L.y);
const Lb = () => <span style={{ textDecoration: "overline" }}>λ</span>;
const X = (t: number) => 200 + 760 * t;
const Y = (v: number) => 720 - 70 * v;

export const Examples: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("examples");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10);
  const bars = fadeIn(frame, c0 + 10, 8) * fadeOut(frame, c1, 8);
  const perp = fadeIn(frame, c1 + 6, 10) * fadeOut(frame, c2, 8);
  const fill = progress(frame, c2 + 6, 30);
  const off = 1.25;
  const inside = 0.55;
  const k = Math.min(5, Math.max(0, Math.floor((frame - c4 - 6) / 22)));
  const n = 2 ** (k + 1);
  const lam = frame < c4 ? off : inside;
  const bump = (x: number) =>
    Math.abs(x - inside) < 0.5 / n ? Math.sqrt(n) : 0;
  const band = progress(frame, c5 + 6, 30);

  return (
    <SceneShell id="examples">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 12 + i * 4} volume={0.05} />
      ))}
      <Sfx name="pluck3" at={c1 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="ding" at={c2 + 40} volume={0.2} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="pluck2" at={c4 + 6 + i * 22} volume={0.08} />
      ))}
      <Sfx name="chime" at={c5 + 30} volume={0.28} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={CX - 340}
            y1={CY}
            x2={CX + 340}
            y2={CY}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={2}
          />
          <line
            x1={CX}
            y1={CY - 330}
            x2={CX}
            y2={CY + 330}
            stroke={alpha(colors.paper, 0.35)}
            strokeWidth={2}
          />
          <circle
            cx={CX}
            cy={CY}
            r={U * fill}
            fill={alpha(colors.orange, 0.55)}
          />
          <circle
            cx={CX}
            cy={CY}
            r={U}
            fill="none"
            stroke={colors.paper}
            strokeWidth={4}
          />
          <circle
            cx={CX + U * L.x}
            cy={CY - U * L.y}
            r={14}
            fill={colors.highlight}
            opacity={fadeOut(frame, c2 + 20, 10)}
          />
          <text
            x={CX + U * L.x + 22}
            y={CY - U * L.y - 18}
            fill={colors.highlight}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeOut(frame, c2 + 20, 10)}
          >
            λ
          </text>
          <g opacity={bars}>
            <line
              x1={1000}
              y1={600}
              x2={1760}
              y2={600}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            {Array.from({ length: 10 }, (_, j) => (
              <rect
                key={j}
                x={1020 + j * 74}
                y={600 - 360 * r ** j}
                width={50}
                height={360 * r ** j}
                rx={6}
                fill={colors.orange}
                opacity={fadeIn(frame, c0 + 12 + j * 4, 6)}
              />
            ))}
          </g>
          <g opacity={perp}>
            <path
              d="M 1020 620 L 1420 520 L 1760 620 L 1360 720 Z"
              fill={alpha(colors.primary, 0.2)}
              stroke={colors.primary}
              strokeWidth={3}
            />
            {[
              [1180, 610, 1290, 590],
              [1350, 650, 1440, 600],
              [1420, 580, 1540, 610],
              [1260, 660, 1350, 680],
            ].map(([a, b, c, d], i) => (
              <line
                key={i}
                x1={a}
                y1={b}
                x2={c}
                y2={d}
                stroke={colors.primary}
                strokeWidth={4}
              />
            ))}
            <line
              x1={1390}
              y1={620}
              x2={1390}
              y2={300}
              stroke={colors.orange}
              strokeWidth={7}
            />
            <path
              d="M 1372 322 L 1390 292 L 1408 322"
              fill="none"
              stroke={colors.orange}
              strokeWidth={7}
            />
            <path
              d="M 1390 590 L 1420 582 L 1420 612"
              fill="none"
              stroke={colors.paper}
              strokeWidth={3}
            />
            <text
              x={1410}
              y={300}
              fill={colors.orange}
              fontSize={44}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              v
            </text>
            <text
              x={1600}
              y={700}
              fill={colors.primary}
              fontSize={34}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              range(S − λ)
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1000,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c0 + 8) * fadeOut(frame, c2, 8),
          }}
        >
          v = (1, <Lb />, <Lb />
          ², <Lb />
          ³, …)
        </div>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1000,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c2 + 30),
          }}
        >
          σ(S) = {"{"} |λ| ≤ 1 {"}"}
        </div>
        <Chip
          frame={frame}
          at={c2 + 50}
          x={1000}
          y={260}
          color={colors.red}
          size={42}
        >
          {tx.noEigenvalues}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-0.05)}
            y1={Y(0)}
            x2={X(1.35)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <rect
            x={X(0)}
            y={Y(0) - 12}
            width={(X(1) - X(0)) * band}
            height={24}
            rx={12}
            fill={colors.green}
          />
          {[0, 1].map((t) => (
            <text
              key={t}
              x={X(t)}
              y={Y(0) + 56}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={34}
              fontFamily={fonts.mono}
            >
              {t}
            </text>
          ))}
          <line
            x1={X(lam)}
            y1={Y(0) + 20}
            x2={X(lam)}
            y2={Y(8)}
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <text
            x={X(lam)}
            y={Y(0) + 56}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            λ
          </text>
          <path
            d={path((x) => 1 / Math.abs(x - off), 0, 1, X, Y, 200)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeIn(frame, c3 + 10, 8) * fadeOut(frame, c4, 8)}
          />
          <path
            d={path(bump, 0, 1, X, Y, 1200)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 6, 6)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1100,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c3 + 10) * fadeOut(frame, c4, 8),
          }}
        >
          |1/(x − λ)| ≤ 4
        </div>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1100,
            fontFamily: fonts.mono,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c4 + 10),
          }}
        >
          n = {n}
          <br />
          ‖(M − λ)fₙ‖ ≤ 1/{n}
        </div>
        <Chip
          frame={frame}
          at={c4 + 40}
          x={1100}
          y={340}
          color={colors.orange}
          size={38}
        >
          fₙ · {tx.approx}
        </Chip>
        <Chip
          frame={frame}
          at={c5 + 30}
          x={1100}
          y={460}
          color={colors.green}
          size={46}
          math
        >
          σ(M) = [0, 1]
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
