import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The complex inner product. At the top, the definition with the bar on
// the second slot (c0); the three rules light up as tags on the left
// (c1–c3). Then the same formula row works out (1, i): 1·1 + i·ī, ī
// becomes −i, (−i)·i becomes 1, and the sum settles on 2 as a length²
// gauge rises (c4). Last ℂ² unfolds into ℝ⁴: (1, i) becomes four real
// bars 1, 0, 0, 1 whose squares add to the same 2 (c5).

export const Define: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("define");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const tag = (k: number) =>
    Math.min(1, springIn(frame, [c1, c2, c3][k] + 6, fps, 10));
  const rise = glide(frame, c4 + 100, fps, 20);
  const unfold = (k: number) => glide(frame, c5 + 10 + k * 10, fps, 14);
  const green = colors.green;
  const steps: Tok[][] = [
    [
      { id: "l", t: "⟨u, v⟩" },
      { id: "e", t: " = " },
      { id: "s", t: "Σ uₖ · " },
      { id: "v", t: "vₖ", bar: true },
    ],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "d", t: " · " },
      { id: "c", t: "i", bar: true },
    ],
    [
      { id: "a", t: "1·1" },
      { id: "p", t: " + " },
      { id: "b", t: "i" },
      { id: "d", t: " · " },
      { id: "c", t: "(−i)", color: colors.orange },
    ],
    [
      { id: "a", t: "1" },
      { id: "p", t: " + " },
      { id: "r", t: "1", color: green },
    ],
    [{ id: "z", t: "2", color: green }],
  ];
  const at = [c0 + 6, c4 + 6, c4 + 36, c4 + 66, c4 + 96];
  const bars = [1, 0, 0, 1];
  const names = ["Re z₁", "Im z₁", "Re z₂", "Im z₂"];

  return (
    <SceneShell id="define">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="pluck5" at={c3 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c4 + 36} volume={0.08} />
      <Sfx name="ding" at={c4 + 96} volume={0.3} />
      {bars.map((_, k) => (
        <Sfx key={k} name="tick" at={c5 + 10 + k * 10} volume={0.1} />
      ))}

      <Eq steps={steps} at={at} x={960} y={110} size={88} />
      {tx.rules.map((r, k) => (
        <div
          key={r}
          style={{
            position: "absolute",
            top: 320 + k * 120,
            left: 140,
            padding: "14px 30px",
            borderRadius: 16,
            border: `4px solid ${colors.primary}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 42,
            fontWeight: 800,
            color: colors.primary,
            opacity: tag(k) * fadeOut(frame, c5, 10),
            scale: `${tag(k)}`,
          }}
        >
          {k + 1} · {r}
        </div>
      ))}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the length² gauge for (1, i) */}
        <g
          transform="translate(1600 640)"
          opacity={fadeIn(frame, c4 + 6) * fadeOut(frame, c5, 10)}
        >
          <rect
            x={-80}
            y={-260}
            width={160}
            height={300}
            rx={20}
            fill={alpha(colors.bg, 0.8)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <line
            x1={-100}
            y1={0}
            x2={100}
            y2={0}
            stroke={colors.text}
            strokeWidth={5}
          />
          <rect
            x={-54}
            y={-2 * 100 * rise}
            width={108}
            height={2 * 100 * rise}
            rx={8}
            fill={green}
          />
          <text
            y={-290}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ‖(1, i)‖²
          </text>
        </g>
        {/* ℂ² unfolded into ℝ⁴ */}
        <g opacity={fadeIn(frame, c5 + 4, 10)}>
          <line
            x1={420}
            y1={700}
            x2={1500}
            y2={700}
            stroke={colors.text}
            strokeWidth={4}
          />
          {bars.map((b, k) => {
            const h = b * 220 * unfold(k);
            const x = 520 + k * 260;
            return (
              <g key={k}>
                <rect
                  x={x - 60}
                  y={700 - h}
                  width={120}
                  height={Math.max(h, 4)}
                  rx={8}
                  fill={k < 2 ? colors.primary : colors.highlight}
                  opacity={b ? 1 : 0.5}
                />
                <text
                  x={x}
                  y={760}
                  fill={k < 2 ? colors.primary : colors.highlight}
                  fontSize={40}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {names[k]}
                </text>
                <text
                  x={x}
                  y={700 - h - 20}
                  fill={colors.text}
                  fontSize={48}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  opacity={unfold(k)}
                >
                  {b}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: green,
          opacity: fadeIn(frame, c5 + 60),
          translate: riseIn(frame, c5 + 60, 12),
        }}
      >
        1² + 0² + 0² + 1² = 2 · {tx.unfold}
      </div>
    </SceneShell>
  );
};
