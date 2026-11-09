import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// ℓ¹ is different. The same marching eₙ, but the probe is the flat wall
// (1, 1, 1, …), allowed because ℓ¹'s dual is ℓ∞ (c0). The reading under
// eₙ is 1 every time, a meter that never drops (c1). Chip: ℓ¹ is not
// reflexive (c2).

const K = 16;
const SX = 160;
const CW = 62;
const Y1 = 420;
const Y2 = 640;

export const LOne: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("lOne");
  const [c0, c1, c2] = cues;
  const n = Math.min(K - 1, Math.max(0, Math.floor((frame - c0 - 6) / 12)));

  return (
    <SceneShell id="lOne">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 30 + i * 12} volume={0.06} />
      ))}
      <Sfx name="thud" at={c1 + 10} volume={0.2} />
      <Sfx name="chime" at={c2 + 8} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <line
            x1={SX}
            y1={Y1}
            x2={SX + K * CW}
            y2={Y1}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={SX}
            y1={Y2}
            x2={SX + K * CW}
            y2={Y2}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <rect
            x={SX + n * CW + 8}
            y={Y1 - 160}
            width={CW - 16}
            height={160}
            rx={6}
            fill={colors.primary}
          />
          {Array.from({ length: K }, (_, k) => (
            <rect
              key={k}
              x={SX + k * CW + 8}
              y={Y2 - 150}
              width={CW - 16}
              height={150}
              rx={4}
              fill={k === n ? colors.orange : alpha(colors.orange, 0.5)}
            />
          ))}
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <rect
            x={1460}
            y={Y2 - 300}
            width={70}
            height={300}
            rx={8}
            fill={colors.red}
          />
          <text
            x={1560}
            y={Y2 - 290}
            fill={colors.red}
            fontSize={40}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            1
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: SX,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 10),
          whiteSpace: "nowrap",
        }}
      >
        y = (1, 1, 1, …) ∈ ℓ∞ = (ℓ¹)*
      </div>
      <div
        style={{
          position: "absolute",
          top: Y2 + 20,
          left: 1440,
          fontFamily: fonts.math,
          fontSize: 42,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 10),
          whiteSpace: "nowrap",
        }}
      >
        f(eₙ) = 1 ↛ 0
      </div>
      <Chip frame={frame} at={c2 + 8} x={1240} y={200} color={colors.red}>
        {tx.notReflexive}
      </Chip>
    </SceneShell>
  );
};
