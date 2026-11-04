import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Zorn's lemma. Nested boxes M ⊂ M₁ ⊂ M₂ ⊂ … pop out one after another,
// each striped with its own extension's level lines (c0). A highlight
// runs up the chain and a dashed box around all of them, their union,
// lights up as its upper bound (c1). A crown lands on the biggest
// extension, which swells to fill the frame: it is all of X (c2). A
// stamp: Axiom of Choice (c3).

const CX = 960;
const CY = 460;
const K = 7;
const box = (k: number) => ({ w: 200 + 170 * k, h: 90 + 80 * k });
const LABELS = ["M", "M₁", "M₂", "M₃", "M₄", "M₅", "M₆"];

export const Zorn: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zorn");
  const [c0, c1, c2, c3] = cues;
  const hl = Math.floor((frame - c1 - 6) / 5);
  const grow = glide(frame, c2 + 30, fps, 30);
  const top = box(K);
  const W = lerp(top.w, 1600, grow);
  const H = lerp(top.h, 620, grow);

  return (
    <SceneShell id="zorn">
      {Array.from({ length: K }, (_, k) => (
        <Sfx key={k} name="pop" at={c0 + 6 + k * 8} volume={0.08 + k * 0.01} />
      ))}
      <Sfx name="riser" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c1 + 46} volume={0.22} />
      <Sfx name="sparkle" at={c2 + 8} volume={0.4} />
      <Sfx name="whoosh" at={c2 + 30} volume={0.1} />
      <Sfx name="thud" at={c3 + 10} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="zr-stripes"
            width={28}
            height={28}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={28}
              stroke={alpha(colors.orange, 0.35)}
              strokeWidth={3}
            />
          </pattern>
        </defs>
        <rect
          x={CX - W / 2}
          y={CY - H / 2}
          width={W}
          height={H}
          rx={26}
          fill="url(#zr-stripes)"
          stroke={colors.green}
          strokeWidth={6}
          strokeDasharray={grow > 0.02 ? undefined : "18 12"}
          opacity={fadeIn(frame, c1 + 40, 10)}
        />
        {Array.from({ length: K }, (_, i) => {
          const k = K - 1 - i;
          const b = box(k);
          const at = c0 + 6 + k * 8;
          const lit = hl >= k && frame < c2;
          return (
            <g key={k} opacity={fadeIn(frame, at, 6) * (1 - 0.6 * grow)}>
              <rect
                x={CX - b.w / 2}
                y={CY - b.h / 2}
                width={b.w}
                height={b.h}
                rx={20}
                fill={alpha(colors.bg, 0.55)}
                stroke={lit ? colors.primary : alpha(colors.paper, 0.5)}
                strokeWidth={lit ? 6 : 3}
              />
              <rect
                x={CX - b.w / 2}
                y={CY - b.h / 2}
                width={b.w}
                height={b.h}
                rx={20}
                fill="url(#zr-stripes)"
              />
              <text
                x={CX - b.w / 2 + 18}
                y={CY - b.h / 2 + 34}
                fill={colors.text}
                fontSize={30}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {LABELS[k]}
              </text>
            </g>
          );
        })}
        <g
          transform={`translate(${CX} ${CY - H / 2 - 20 + 40 * (1 - glide(frame, c2 + 8, fps, 14))})`}
          opacity={fadeIn(frame, c2 + 8, 6)}
        >
          <path
            d="M -60 0 L -70 -70 L -30 -35 L 0 -85 L 30 -35 L 70 -70 L 60 0 Z"
            fill={colors.primary}
            stroke={colors.paper}
            strokeWidth={4}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: CY + H / 2 - 70,
          left: CX + W / 2 - 520,
          width: 500,
          textAlign: "right",
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 50),
          whiteSpace: "nowrap",
        }}
      >
        {tx.maximal} = X
      </div>
      <div
        style={{
          position: "absolute",
          top: CY - 40,
          left: CX + box(K - 1).w / 2 + 20,
          fontFamily: fonts.math,
          fontSize: 56,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 70) * (1 - grow),
        }}
      >
        …
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1180,
          padding: "12px 34px",
          border: `8px solid ${colors.red}`,
          borderRadius: 16,
          color: colors.red,
          background: alpha(colors.bg, 0.8),
          fontSize: 64,
          fontWeight: 800,
          rotate: "-10deg",
          opacity: fadeIn(frame, c3 + 10, 4),
          scale: String(1 + 0.5 * (1 - fadeIn(frame, c3 + 10, 6))),
          whiteSpace: "nowrap",
        }}
      >
        {tx.choice}
      </div>
    </SceneShell>
  );
};
