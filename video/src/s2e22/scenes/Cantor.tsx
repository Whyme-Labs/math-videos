import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq, type Tok } from "../../shared/components/Eq";
import { cantor } from "../components/line";
import { useStrings } from "../i18n";

// The Cantor set, both ways. Rows of the construction, 2ⁿ pieces of
// 3⁻ⁿ (c0); the removed lengths as a sum climbing to 1 (c1). One point
// of the set followed down the rows, its digits in base 3 written as it
// goes: left third 0, right third 2 (c2). Each 2 turns into a 1 and the
// same digits read as a binary number (c3). A chip: m(C) = 0 and
// |C| = |[0, 1]| (c4).

const X0 = 200;
const X1 = 1200;
const sx = (x: number) => X0 + (X1 - X0) * x;
const D = [2, 0, 2, 2, 0, 2];
const val = (k: number) =>
  D.slice(0, k).reduce((s, d, i) => s + d * 3 ** -(i + 1), 0);

export const Cantor: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("cantor");
  const [c0, c1, c2, c3, c4] = cues;
  const rows = Math.min(7, Math.floor(Math.max(0, frame - c0 - 6) / 14) + 1);
  const terms = Math.min(16, Math.floor(Math.max(0, frame - c1 - 6) / 7) + 1);
  const sum = 1 - (2 / 3) ** terms;
  const dig = Math.min(6, Math.floor(Math.max(0, frame - c2 - 6) / 16) + 1);
  const follow = frame >= c2 + 6;
  const steps: Tok[][] = [
    [
      { id: "z", t: "0." },
      ...D.map((d, i) => ({
        id: `d${i}`,
        t: String(d),
        color: colors.primary,
      })),
      { id: "e", t: "…₃" },
    ],
    [
      { id: "z", t: "0." },
      ...D.map((d, i) => ({
        id: `d${i}`,
        t: String(d / 2),
        color: colors.green,
      })),
      { id: "e", t: "…₂" },
    ],
  ];

  return (
    <SceneShell id="cantor">
      {Array.from({ length: 7 }).map((_, i) => (
        <Sfx key={i} name="pluck2" at={c0 + 6 + i * 14} volume={0.1} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sfx key={`t${i}`} name="tick" at={c1 + 6 + i * 14} volume={0.1} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sfx key={`d${i}`} name="pop" at={c2 + 6 + i * 16} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: rows }).map((_, k) =>
          cantor(k).map(([a, b], i) => (
            <rect
              key={`${k}-${i}`}
              x={sx(a)}
              y={200 + k * 66}
              width={Math.max(1, (X1 - X0) * (b - a))}
              height={36}
              fill={alpha(colors.primary, follow ? 0.5 : 1)}
            />
          )),
        )}
        {follow
          ? Array.from({ length: dig }).map((_, k) => {
              const a = val(k + 1);
              const w = 3 ** -(k + 1);
              return (
                <rect
                  key={k}
                  x={sx(a)}
                  y={200 + (k + 1) * 66}
                  width={Math.max(2, (X1 - X0) * w)}
                  height={36}
                  fill={colors.highlight}
                />
              );
            })
          : null}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1260,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        ⅓ + 2/9 + 4/27 + … ={" "}
        <span style={{ fontFamily: fonts.mono }}>{sum.toFixed(3)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1260,
          fontSize: 40,
          fontWeight: 800,
          color: frame >= c3 + 10 ? colors.green : colors.primary,
          opacity: fadeIn(frame, c2 + 6),
        }}
      >
        {frame >= c3 + 10 ? tx.base2 : tx.base3}
      </div>
      <div style={{ opacity: fadeIn(frame, c2 + 6) }}>
        <Eq
          steps={steps}
          at={[c2 + 6, c3 + 10]}
          x={1560}
          y={320}
          size={72}
          family={fonts.mono}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 1260,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 6),
          translate: riseIn(frame, c4 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        m(C) = 0 · |C| = |[0, 1]|
      </div>
    </SceneShell>
  );
};
