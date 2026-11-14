import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Dynamics as spectrum. U1 = 1 with a flat line, the constant (c0). A
// circle turning by a quarter, carrying four arcs onto themselves: an
// invariant set that is neither null nor full, not ergodic (c1). The
// criterion, ergodic ⟺ the eigenvalue 1 is simple (c2). On the right, the
// unit circle in ℂ with the eigenvalues e^(2πikα) of the rotation: for
// α = ¼ they pile onto four points, 1 among them many times over (c3);
// for golden α they spread densely and only k = 0 sits at 1 (c4). The
// doubling map: the eigenvalue dots fade and the whole circle glows,
// continuous spectrum (c5).

const LC = { x: 480, y: 500, r: 220 };
const EC = { x: 1340, y: 530, r: 230 };
const GOLD = (Math.sqrt(5) - 1) / 2;
const arcPath = (cx: number, cy: number, r: number, a: number, b: number) =>
  Array.from({ length: 21 }, (_, i) => {
    const t = 2 * Math.PI * (a + ((b - a) * i) / 20);
    return `${i ? "L" : "M"} ${cx + r * Math.cos(t)} ${cy - r * Math.sin(t)}`;
  }).join(" ");

export const Spectrum: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("spectrum");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const turn =
    0.25 * progress(frame, c1 + 20, 20) + 0.25 * progress(frame, c1 + 60, 20);
  const golden = frame >= c4 + 6;
  const alphaV = golden ? GOLD : 0.25;
  const kmax = golden
    ? Math.min(60, Math.max(0, Math.floor((frame - c4 - 6) / 2)))
    : Math.min(12, Math.max(0, Math.floor((frame - c3 - 6) / 6)));
  const dots = Array.from({ length: 2 * kmax + 1 }, (_, i) => i - kmax);
  const mult = golden ? 1 : dots.filter((k) => k % 4 === 0).length;
  const cont = fadeIn(frame, c5 + 6, 14);

  return (
    <SceneShell id="spectrum">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 60} volume={0.1} />
      <Sfx name="pluck2" at={c2 + 8} volume={0.12} />
      {Array.from({ length: 10 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 6} volume={0.05} />
      ))}
      <Sfx name="sparkle" at={c4 + 10} volume={0.3} />
      <Sfx name="riser" at={c5 + 6} volume={0.12} />
      <Sfx name="chime" at={c5 + 40} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c2, 8),
        }}
      >
        U 1 = 1
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 6),
        }}
      >
        {tx.ergodic} ⟺ dim ker(U − 1) = 1
      </div>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c0 + 4, 8) }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={300}
            x2={760}
            y2={300}
            stroke={colors.primary}
            strokeWidth={6}
            opacity={fadeOut(frame, c1, 8)}
          />
          <g opacity={fadeIn(frame, c1 + 6, 8)}>
            <circle
              cx={LC.x}
              cy={LC.y}
              r={LC.r}
              fill="none"
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            {[0, 1, 2, 3].map((q) => (
              <path
                key={q}
                d={arcPath(
                  LC.x,
                  LC.y,
                  LC.r,
                  q * 0.25 + 0.04 + turn,
                  q * 0.25 + 0.14 + turn,
                )}
                fill="none"
                stroke={colors.highlight}
                strokeWidth={18}
                strokeLinecap="round"
              />
            ))}
            <text
              x={LC.x}
              y={LC.y + 14}
              textAnchor="middle"
              fill={colors.text}
              fontSize={36}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              α = 1/4
            </text>
          </g>
        </svg>
        <Chip
          frame={frame}
          at={c1 + 70}
          x={LC.x - 120}
          y={LC.y + LC.r + 30}
          color={colors.highlight}
          size={38}
        >
          {tx.notErgodic}
        </Chip>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 2, 8) }}>
        <svg width={1920} height={1080}>
          <line
            x1={EC.x - 300}
            y1={EC.y}
            x2={EC.x + 300}
            y2={EC.y}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={EC.x}
            y1={EC.y - 270}
            x2={EC.x}
            y2={EC.y + 270}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <circle
            cx={EC.x}
            cy={EC.y}
            r={EC.r}
            fill="none"
            stroke={cont > 0 ? colors.orange : alpha(colors.paper, 0.5)}
            strokeWidth={4 + 14 * cont}
          />
          <g opacity={1 - cont}>
            {dots.map((k) => {
              const a = 2 * Math.PI * k * alphaV;
              return (
                <circle
                  key={k}
                  cx={EC.x + EC.r * Math.cos(a)}
                  cy={EC.y - EC.r * Math.sin(a)}
                  r={k === 0 ? 16 : 10}
                  fill={k === 0 ? colors.green : colors.primary}
                  opacity={k === 0 ? 1 : 0.8}
                />
              );
            })}
          </g>
          <text
            x={EC.x + EC.r + 20}
            y={EC.y - 16}
            fill={colors.green}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={1 - cont}
          >
            1 ×{mult}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: EC.y + EC.r + 22,
            left: EC.x - 300,
            width: 600,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 36,
            fontWeight: 800,
            color: cont > 0.5 ? colors.orange : colors.text,
            whiteSpace: "nowrap",
          }}
        >
          {cont > 0.5 ? tx.mixing : golden ? tx.irrational : tx.rational}
        </div>
      </AbsoluteFill>
      <Chip
        frame={frame}
        at={c4 + 50}
        x={EC.x - 360}
        y={170}
        color={colors.green}
        size={40}
      >
        {tx.ergodic} ✓
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 30}
        x={EC.x + 40}
        y={170}
        color={colors.orange}
        size={40}
      >
        {tx.continuous}
      </Chip>
    </SceneShell>
  );
};
