import type React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { N, SVD, rebuild, toUrl } from "../components/picture";
import { useStrings } from "../i18n";

// Eckart–Young on a real SVD. An 80 × 80 picture A and the sum formula
// (c0). Its first three layers σᵢuᵢvᵢᵀ as tiles, each a picture of rank
// one, and the bars of all 80 σ's falling off fast (c1). The big picture
// is rebuilt from k layers with k climbing, a counter running, the bars
// lit up to k (c2); the error ‖A − Aₖ‖ = σₖ₊₁ is read out next to the
// Eckart–Young tag (c3). Four frozen tiles: 1, 5, 20 and 50 layers (c4).
// The storage count for a 1000 × 1000 photo: 50 × 2001 = 100,050 of
// 1,000,000 numbers (c5).

const BIG = 560;
const smax = SVD.s[0];

export const Layers: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("layers");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const climb = glide(frame, c2 + 6, fps, 220);
  const k =
    frame < c2 + 6 ? N : Math.max(1, Math.round(lerp(1, 50, climb ** 2.5)));
  const big =
    frame < c2 + 6 ? toUrl("full", rebuild(N)) : toUrl(`k${k}`, rebuild(k));
  const part1 = fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const lit = frame < c2 + 6 ? 0 : k;
  const err = k < N ? SVD.s[k] : 0;

  return (
    <SceneShell id="layers">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx
          key={i}
          name={(["pluck1", "pluck3", "pluck5"] as const)[i]}
          at={c1 + 6 + i * 12}
          volume={0.14}
        />
      ))}
      <Sfx name="riser" at={c2 + 6} volume={0.1} />
      <Sfx name="pop" at={c3 + 10} volume={0.12} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={`t${i}`} name="tick" at={c4 + 8 + i * 10} volume={0.12} />
      ))}
      <Sfx name="chime" at={c5 + 10} volume={0.3} />

      <div style={{ opacity: part1 }}>
        <Img
          src={big}
          style={{
            position: "absolute",
            top: 150,
            left: 160,
            width: BIG,
            height: BIG,
            imageRendering: "pixelated",
            borderRadius: 12,
            opacity: fadeIn(frame, c0 + 4, 8),
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 730,
            left: 160,
            width: BIG,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c2 + 6),
          }}
        >
          k = {k} {tx.layer}
        </div>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 800,
            fontFamily: fonts.body,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 8),
            translate: riseIn(frame, c0 + 8, 14),
          }}
        >
          A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + σ₃u₃v₃ᵀ + …
        </div>
        <div
          style={{
            position: "absolute",
            top: 190,
            left: 800,
            display: "flex",
            gap: 24,
          }}
        >
          {[1, 2, 3].map((l, i) => (
            <div
              key={l}
              style={{
                opacity: fadeIn(frame, c1 + 6 + i * 12, 8),
                translate: riseIn(frame, c1 + 6 + i * 12, 12),
              }}
            >
              <Img
                src={toUrl(`layer${l}`, rebuild(l, true), l > 1)}
                style={{
                  width: 220,
                  height: 220,
                  imageRendering: "pixelated",
                  borderRadius: 10,
                  display: "block",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: fonts.mono,
                  fontSize: 36,
                  fontWeight: 800,
                  color: colors.primary,
                  marginTop: 8,
                }}
              >
                σ{["₁", "₂", "₃"][i]} = {SVD.s[i].toFixed(1)}
              </div>
            </div>
          ))}
        </div>
        {/* all 80 σ's */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute" }}
          opacity={fadeIn(frame, c1 + 40, 10)}
        >
          <line
            x1={800}
            y1={720}
            x2={1760}
            y2={720}
            stroke={colors.text}
            strokeWidth={3}
          />
          {SVD.s.map((s, i) => {
            const h = 220 * Math.sqrt(s / smax);
            return (
              <rect
                key={i}
                x={800 + i * 12}
                y={720 - h}
                width={9}
                height={h}
                fill={i < lit ? colors.primary : alpha(colors.paper, 0.35)}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 745,
            left: 860,
            padding: "8px 22px",
            borderRadius: 14,
            border: `4px solid ${colors.green}`,
            background: alpha(colors.bg, 0.9),
            fontSize: 40,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c3 + 10),
            translate: riseIn(frame, c3 + 10, 12),
          }}
        >
          Eckart–Young ·{" "}
          <span style={{ fontFamily: fonts.math }}>‖A − Aₖ‖ = σₖ₊₁</span> ={" "}
          <span style={{ fontFamily: fonts.mono }}>{err.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ opacity: part2 }}>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 0,
            width: 1920,
            display: "flex",
            justifyContent: "center",
            gap: 36,
          }}
        >
          {[1, 5, 20, 50].map((kk, i) => (
            <div
              key={kk}
              style={{
                opacity: fadeIn(frame, c4 + 8 + i * 10, 8),
                translate: riseIn(frame, c4 + 8 + i * 10, 12),
              }}
            >
              <Img
                src={toUrl(`k${kk}`, rebuild(kk))}
                style={{
                  width: 380,
                  height: 380,
                  imageRendering: "pixelated",
                  borderRadius: 12,
                  display: "block",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: fonts.mono,
                  fontSize: 44,
                  fontWeight: 800,
                  color: colors.text,
                  marginTop: 10,
                }}
              >
                {kk}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c5 + 10),
            translate: riseIn(frame, c5 + 10, 12),
          }}
        >
          50 × (1000 + 1000 + 1) = 100,050 / 1,000,000 · {tx.stored}
        </div>
      </div>
    </SceneShell>
  );
};
