import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { mul, polar, px, type C, type View } from "../components/plane";
import { useStrings } from "../i18n";

// Chinese edition only. 《周髀算经》: 商高 "故折矩，以为句广三，股修四，径隅
// 五", the 3-4-5 right triangle, so |3 + 4i| = 5. Then 赵爽's 弦图 from his
// commentary (勾股圆方图): four red right triangles, each a quarter turn of
// the one before, around a yellow square of side 4 − 3 = 1. Red 4 × 6 plus
// yellow 1 makes the hypotenuse square 25. Four quarter turns return: i⁴ = 1.

const V: View = { cx: 560, cy: 470, unit: 72 };
// One triangle: hypotenuse along the bottom of the 5 × 5 square, right angle
// inside, legs 4 (from the left corner) and 3.
const T0: C[] = [
  { re: -2.5, im: -2.5 },
  { re: 2.5, im: -2.5 },
  { re: -2.5 + 3.2, im: -2.5 + 2.4 },
];
const SLIP_W = 92;
const SLIP_X = (i: number) => 1720 - i * (SLIP_W + 14);
const SLIP_Y = 150;
const SLIP_H = 330;

const tri = (turn: number) =>
  T0.map((z) => px(V, mul(z, polar(1, (Math.PI / 2) * turn))))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

export const XianTu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("xianTu");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 6 + i * 9;
  const placeAt = (k: number) => c1 + 10 + k * 22;
  // each new triangle starts on the previous one and turns a quarter turn
  const turnOf = (k: number) =>
    k === 0 ? 0 : k - 1 + glide(frame, placeAt(k), fps, 18);
  const yellow = springIn(frame, placeAt(4), fps, 12);
  const sumAt = c2 + 10;
  // the last line: one triangle walks round the four places and back
  const walk = Math.min(4, Math.max(0, (frame - (c2 + 60)) / 14));
  const box = px(V, { re: -2.5, im: 2.5 });

  return (
    <SceneShell id="xianTu">
      {tx.quote.map((_, i) => (
        <Sfx key={`q${i}`} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="pop" at={c0 + 40} />
      {[1, 2, 3].map((k) => (
        <Sfx key={k} name={PLUCKS[k]} at={placeAt(k)} volume={0.24} />
      ))}
      <Sfx name="ding" at={placeAt(4)} volume={0.24} />
      <Sfx name="chime" at={sumAt + 20} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`w${k}`} name="tick" at={c2 + 60 + k * 14} volume={0.18} />
      ))}

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* the hypotenuse square */}
          <rect
            x={box.x}
            y={box.y}
            width={5 * V.unit}
            height={5 * V.unit}
            fill="none"
            stroke={colors.paper}
            strokeWidth={4}
            opacity={fadeIn(frame, c1 + 4)}
          />
          {[0, 1, 2, 3].map((k) => (
            <polygon
              key={k}
              points={tri(turnOf(k))}
              fill={alpha(colors.red, 0.7)}
              stroke={colors.paper}
              strokeWidth={3}
              opacity={
                k === 0 ? fadeIn(frame, c0 + 40) : fadeIn(frame, placeAt(k), 6)
              }
            />
          ))}
          {/* the yellow square between the right angles, side 4 − 3 = 1 */}
          <polygon
            points={[0, 1, 2, 3]
              .map((k) => px(V, mul(T0[2], polar(1, (Math.PI / 2) * k))))
              .map((p) => `${p.x},${p.y}`)
              .join(" ")}
            fill={colors.primary}
            opacity={Math.min(1, yellow)}
          />
          {/* one triangle going round: four quarter turns */}
          {walk > 0 ? (
            <polygon
              points={tri(walk)}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={8}
              strokeLinejoin="round"
            />
          ) : null}
          {/* 句 3, 股 4, 弦 5 on the first triangle */}
          <g opacity={fadeIn(frame, c0 + 50) * (1 - glide(frame, c1, fps, 12))}>
            {[
              { t: "股 4", z: { re: -1.6, im: -1.0 } },
              { t: "句 3", z: { re: 1.9, im: -1.2 } },
              { t: "弦 5", z: { re: 0, im: -3.0 } },
            ].map((l) => (
              <text
                key={l.t}
                x={px(V, l.z).x}
                y={px(V, l.z).y}
                fill={colors.text}
                fontSize={36}
                textAnchor="middle"
              >
                {l.t}
              </text>
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 560,
            fontFamily: fonts.math,
            fontSize: 48,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 70),
            translate: riseIn(frame, c0 + 70, 16),
          }}
        >
          |3 + 4i| = 5
        </div>
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 640,
            fontSize: 42,
            lineHeight: 1.5,
            opacity: fadeIn(frame, sumAt),
            translate: riseIn(frame, sumAt, 16),
          }}
        >
          <span style={{ color: colors.red }}>{tx.red} 4 × 6</span>
          <span> + </span>
          <span style={{ color: colors.primary }}>{tx.yellow} 1</span>
          <span style={{ fontFamily: fonts.math }}> = 25 = 5²</span>
          <div
            style={{
              fontFamily: fonts.math,
              color: colors.highlight,
              opacity: fadeIn(frame, c2 + 116),
              scale: lerp(
                0.8,
                1,
                Math.min(1, springIn(frame, c2 + 116, fps, 12)),
              ),
              transformOrigin: "0 50%",
            }}
          >
            i⁴ = 1
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: V.cx - 250,
            width: 500,
            top: V.cy + 2.5 * V.unit + 24,
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 8),
          }}
        >
          {tx.zhaoShuang}
        </div>
        {/* 商高's words on bamboo slips */}
        {tx.quote.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 12,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 22,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -50}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 50,
                letterSpacing: 10,
                color: colors.paper,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(3) - 30,
            width: SLIP_X(0) + SLIP_W - SLIP_X(3) + 60,
            top: SLIP_Y + SLIP_H + 18,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(3) + 6),
          }}
        >
          {tx.zhoubi}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
