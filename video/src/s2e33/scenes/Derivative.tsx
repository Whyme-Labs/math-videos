import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { phi, spike } from "../components/fns";
import { useStrings } from "../i18n";

// The distributional derivative. Integration by parts as a formula over a
// smooth f and a test φ, with φ's ends at zero ringed: no boundary terms
// (c0). The same formula becomes the definition (c1). Chip: every
// derivative exists (c2). The step H in lemon with φ in green; the area
// under φ′ to the right of 0 shaded, read out as φ(0) (c3). Below, H's
// derivative appears as a spike at 0: jump → spike (c4). A wiggle
// ε sin(x/ε²) shrinking to nothing while its derivative stays wild;
// chip: limits and d/dx commute in D′ (c5).

const X = (t: number) => 960 + 560 * t;
const Y = (v: number) => 560 - 200 * v;
const dphi = (x: number) => (phi(x + 1e-4) - phi(x - 1e-4)) / 2e-4;

export const Derivative: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("derivative");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  const eps = 0.3 * 0.6 ** (6 * progress(frame, c5 + 10, 60)) + 0.02;
  const wig = (x: number) => eps * Math.sin(x / (eps * eps));

  return (
    <SceneShell id="derivative">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="thud" at={c4 + 20} volume={0.18} />
      <Sfx name="chime" at={c5 + 40} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 60,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: partA,
        }}
      >
        {frame < c1 ? (
          <>∫ f′ φ = − ∫ f φ′</>
        ) : (
          <span style={{ color: colors.primary }}>T′(φ) := − T(φ′)</span>
        )}
      </div>
      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-1.5)}
            y1={Y(0)}
            x2={X(1.5)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path((x) => 0.5 + 0.4 * Math.sin(1.7 * x), -1.5, 1.5, X, Y, 200)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <path
            d={path(phi, -1.5, 1.5, X, Y, 300)}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
          />
          {[-1.2, 1.4].map((x) => (
            <circle
              key={x}
              cx={X(x)}
              cy={Y(0)}
              r={18}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={5}
              opacity={fadeIn(frame, c0 + 30, 8)}
            />
          ))}
        </svg>
        <Chip
          frame={frame}
          at={c2 + 10}
          x={760}
          y={680}
          color={colors.green}
          size={42}
        >
          {tx.everyDeriv}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-1.5)}
            y1={Y(0)}
            x2={X(1.5)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={`M ${X(-1.5)} ${Y(0)} L ${X(0)} ${Y(0)} M ${X(0)} ${Y(1)} L ${X(1.5)} ${Y(1)}`}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            opacity={fadeOut(frame, c4 + 10, 10)}
          />
          <path
            d={path(phi, -1.5, 1.5, X, Y, 300)}
            fill="none"
            stroke={colors.green}
            strokeWidth={4}
          />
          <path
            d={`${path((x) => 0.5 * dphi(x), 0, 1.5, X, Y, 300)} L ${X(1.5)} ${Y(0)} L ${X(0)} ${Y(0)} Z`}
            fill={alpha(colors.orange, 0.4)}
            stroke={colors.orange}
            strokeWidth={4}
            opacity={fadeIn(frame, c3 + 16, 8) * fadeOut(frame, c4 + 10, 10)}
          />
          <path
            d={path(
              (x) => Math.min(2, 0.25 * spike(x, 0.03)),
              -1.5,
              1.5,
              X,
              Y,
              1500,
            )}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={fadeIn(frame, c4 + 16, 10)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
            opacity: fadeOut(frame, c4 + 10, 10),
          }}
        >
          H′(φ) = − ∫<sub style={{ fontSize: 30 }}>0</sub>
          <sup style={{ fontSize: 30 }}>∞</sup> φ′ ={" "}
          <span style={{ color: colors.highlight }}>φ(0)</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c4 + 20),
          }}
        >
          H′ = δ
        </div>
        <Chip
          frame={frame}
          at={c4 + 30}
          x={1300}
          y={140}
          color={colors.highlight}
          size={42}
        >
          {tx.jump}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-1.5)}
            y1={Y(0)}
            x2={X(1.5)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(wig, -1.5, 1.5, X, Y, 3000)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={3}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ε sin(x/ε²) → 0 ⟹ (1/ε) cos(x/ε²) → 0 in D′
        </div>
        <Chip
          frame={frame}
          at={c5 + 30}
          x={160}
          y={680}
          color={colors.green}
          size={42}
        >
          {tx.commute}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
