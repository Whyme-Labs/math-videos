import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 曾侯乙编钟 (excavated 1978 at 随州, early Warring
// States): each bell rings two notes, 一钟双音. A bell in front view with
// its rows of knobs (c0). Its cross-section is not a circle but a 合瓦形,
// two roof tiles put together (c1). A strike at the middle of the front,
// 正鼓, sets off one vibration (the outline breathes with antinodes front,
// back and at the ends); a strike at the side, 侧鼓, sets off the other,
// turned 45° (c2). Side by side, each one's still points are the other's
// loudest: the two don't mix (c3). The bell's two symmetry axes, at right
// angles, light up: the shape sorts the vibration into principal
// directions (c4).

const C = { x: 1280, y: 470 };
const W = 330;
const H = 190;
const outline = (mode: 0 | 1 | 2, amp: number, cx = C.x, cy = C.y, k = 1) =>
  Array.from({ length: 121 }, (_, i) => {
    const t = (i / 120) * Math.PI * 2;
    const s = Math.sin(t);
    const x = W * Math.cos(t);
    const y = H * Math.sign(s) * Math.abs(s) ** 1.5;
    const d = mode === 1 ? Math.cos(2 * t) : mode === 2 ? Math.sin(2 * t) : 0;
    const f = 1 + amp * d;
    return `${i ? "L" : "M"} ${(cx + k * x * f).toFixed(1)} ${(cy - k * y * f).toFixed(1)}`;
  }).join(" ") + " Z";

export const Bianzhong: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("bianzhong");
  const [c0, c1, c2, c3, c4] = cues;
  const sec = fadeIn(frame, c1 + 6, 12);
  const hitA = c2 + 10;
  const hitB = c2 + 80;
  const ring = (at: number, f: number) =>
    frame < at
      ? 0
      : 0.15 * Math.exp(-(frame - at) / 60) * Math.sin((frame - at) * f);
  const mode: 0 | 1 | 2 = frame < hitA ? 0 : frame < hitB ? 1 : 2;
  const amp = mode === 1 ? ring(hitA, 0.5) : mode === 2 ? ring(hitB, 0.62) : 0;
  const pair = frame >= c3 + 6;
  const ax = fadeIn(frame, c4 + 6, 10);
  const strike = (t: number, at: number) => {
    const s = Math.sin(t);
    const p = {
      x: C.x + W * Math.cos(t),
      y: C.y - H * Math.sign(s) * Math.abs(s) ** 1.5,
    };
    const k = Math.max(0, 1 - Math.abs(frame - at) / 10);
    return (
      <circle
        cx={p.x}
        cy={p.y - 30 * k}
        r={18}
        fill={colors.highlight}
        opacity={k}
      />
    );
  };
  const loopA = 0.06 * Math.sin(frame * 0.5);
  const loopB = 0.06 * Math.sin(frame * 0.62);

  return (
    <SceneShell id="bianzhong">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="ding" at={hitA} volume={0.3} />
      <Sfx name="chime" at={hitB} volume={0.3} />
      <Sfx name="pluck2" at={c3 + 6} volume={0.14} />
      <Sfx name="pluck5" at={c4 + 6} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the bell, front view */}
        <g opacity={fadeIn(frame, c0 + 6, 10)}>
          <rect
            x={385}
            y={170}
            width={30}
            height={70}
            fill={colors.wood}
            rx={6}
          />
          <path
            d="M 300 240 L 500 240 L 560 690 Q 400 620 240 690 Z"
            fill={alpha(colors.wood, 0.9)}
            stroke={colors.paper}
            strokeWidth={5}
          />
          {[0, 1, 2].map((row) =>
            [-1, 1].map((side) =>
              [0, 1, 2].map((k) => (
                <circle
                  key={`${row}${side}${k}`}
                  cx={400 + side * (55 + k * 26 + row * 6)}
                  cy={300 + row * 70}
                  r={9}
                  fill={colors.primary}
                />
              )),
            ),
          )}
          <line
            x1={400}
            y1={250}
            x2={400}
            y2={520}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
        </g>
        {/* the cross-section */}
        <g opacity={sec * (pair ? 0 : 1)}>
          <path
            d={outline(mode, amp)}
            fill={alpha(colors.wood, 0.25)}
            stroke={colors.wood}
            strokeWidth={8}
          />
          <path
            d={outline(0, 0)}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {strike(Math.PI / 2, hitA)}
          {strike(Math.PI / 4, hitB)}
        </g>
        <g opacity={pair ? 1 : 0}>
          {[
            { m: 1 as const, a: loopA, x: 1060, c: colors.primary },
            { m: 2 as const, a: loopB, x: 1500, c: colors.highlight },
          ].map(({ m, a, x, c }) => (
            <g key={m}>
              <path
                d={outline(m, a, x, 430, 0.6)}
                fill={alpha(c, 0.18)}
                stroke={c}
                strokeWidth={6}
              />
              {[0, 1, 2, 3].map((j) => {
                const t = (j * Math.PI) / 2 + (m === 1 ? Math.PI / 4 : 0);
                const s = Math.sin(t);
                return (
                  <circle
                    key={j}
                    cx={x + 0.6 * W * Math.cos(t)}
                    cy={430 - 0.6 * H * Math.sign(s) * Math.abs(s) ** 1.5}
                    r={9}
                    fill={colors.text}
                  />
                );
              })}
            </g>
          ))}
          <g opacity={ax}>
            {[1060, 1500].map((x) => (
              <g
                key={x}
                stroke={colors.green}
                strokeWidth={5}
                strokeDasharray="12 8"
              >
                <line
                  x1={x - 0.6 * W - 40}
                  y1={430}
                  x2={x + 0.6 * W + 40}
                  y2={430}
                />
                <line
                  x1={x}
                  y1={430 - 0.6 * H - 40}
                  x2={x}
                  y2={430 + 0.6 * H + 40}
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.bell}
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 1100,
          width: 360,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.wood,
          opacity: sec * (pair ? 0 : 1),
        }}
      >
        {tx.hewa}
      </div>
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 940,
          width: 800,
          display: "flex",
          justifyContent: "space-around",
          fontSize: 46,
          fontWeight: 800,
        }}
      >
        <div style={{ color: colors.primary, opacity: fadeIn(frame, hitA, 8) }}>
          {tx.zhenggu}
        </div>
        <div
          style={{ color: colors.highlight, opacity: fadeIn(frame, hitB, 8) }}
        >
          {tx.cegu}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 940,
          width: 800,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 20),
        }}
      >
        {tx.independent}
      </div>
    </SceneShell>
  );
};
