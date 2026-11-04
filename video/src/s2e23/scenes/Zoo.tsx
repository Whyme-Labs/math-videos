import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The zoo. Two columns, complete and not (c0). The complete ones light in
// green: ℝⁿ, ℓᵖ, C[0, 1] with the peak norm (c1). The incomplete ones in
// red, each with a small drawing of what it's missing: Taylor curves
// crowding towards eˣ (c2), the bars (1, ½, ¼, …) never all filled (c3),
// ramps crowding towards a step (c4).

const MiniCurves: React.FC<{ k: number }> = ({ k }) => (
  <svg width={200} height={110}>
    {Array.from({ length: k }).map((_, n) => (
      <path
        key={n}
        d={Array.from({ length: 41 }, (_, i) => {
          const x = i / 40;
          let s = 0;
          let f = 1;
          for (let j = 0; j <= n; j++) {
            if (j) f *= j;
            s += x ** j / f;
          }
          return `${i ? "L" : "M"} ${10 + 180 * x} ${100 - 30 * s}`;
        }).join(" ")}
        fill="none"
        stroke={alpha(colors.red, 0.3 + 0.7 * (n / k))}
        strokeWidth={3}
      />
    ))}
  </svg>
);
const MiniBars: React.FC = () => (
  <svg width={200} height={110}>
    {Array.from({ length: 9 }).map((_, i) => (
      <rect
        key={i}
        x={10 + i * 20}
        y={100 - 80 / 2 ** i}
        width={14}
        height={80 / 2 ** i + 1}
        fill={i < 5 ? colors.red : "none"}
        stroke={colors.red}
        strokeWidth={2}
      />
    ))}
  </svg>
);
const MiniRamps: React.FC = () => (
  <svg width={200} height={110}>
    {[2, 4, 8, 16].map((n) => (
      <path
        key={n}
        d={`M 10 100 L 100 100 L ${100 + 90 / n} 20 L 190 20`}
        fill="none"
        stroke={colors.red}
        strokeWidth={3}
        opacity={0.4 + n / 30}
      />
    ))}
  </svg>
);

export const Zoo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("zoo");
  const [c0, c1, c2, c3, c4] = cues;
  const no = [c2 + 6, c3 + 6, c4 + 6];
  const minis = [
    <MiniCurves key="c" k={5} />,
    <MiniBars key="b" />,
    <MiniRamps key="r" />,
  ];

  return (
    <SceneShell id="zoo">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 12} volume={0.12} />
      ))}
      <Sfx name="thud" at={c2 + 6} volume={0.18} />
      <Sfx name="thud" at={c3 + 6} volume={0.18} />
      <Sfx name="thud" at={c4 + 6} volume={0.18} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          width: 640,
          textAlign: "center",
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        {tx.complete} ✓
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1000,
          width: 760,
          textAlign: "center",
          fontSize: 52,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c0 + 12),
        }}
      >
        {tx.incomplete} ✗
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 200,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {tx.zooYes.map((t, i) => (
          <div
            key={t}
            style={{
              width: 640,
              height: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              border: `5px solid ${colors.green}`,
              background: alpha(colors.bg, 0.85),
              fontFamily: fonts.math,
              fontSize: 52,
              fontWeight: 800,
              color: colors.green,
              opacity: fadeIn(frame, c1 + 6 + i * 12, 8),
              translate: riseIn(frame, c1 + 6 + i * 12, 12),
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {tx.zooNo.map((t, i) => (
          <div
            key={t}
            style={{
              width: 760,
              height: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              boxSizing: "border-box",
              borderRadius: 18,
              border: `5px solid ${colors.red}`,
              background: alpha(colors.bg, 0.85),
              fontSize: 42,
              fontWeight: 800,
              color: colors.text,
              opacity: fadeIn(frame, no[i], 8),
              translate: riseIn(frame, no[i], 12),
            }}
          >
            <span>{t}</span>
            {minis[i]}
            <span
              style={{
                fontFamily: fonts.math,
                color: colors.red,
                fontSize: 36,
              }}
            >
              − {tx.missing[i]}
            </span>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
