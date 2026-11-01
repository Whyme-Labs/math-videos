import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The three rules, each acted out on two arrows with a live overlap
// readout ⟨u, v⟩ (the dot product as the example ruler).
// 1. linear: u stretches to 2u and the readout doubles with it;
// 2. symmetric: the names u and v trade places, the readout label turns
//    into ⟨v, u⟩ and the number holds;
// 3. positive: u fades, v sweeps a full turn while a bar shows ⟨v, v⟩
//    always above zero, then v shrinks and the bar reaches 0 only at 0.
// A tag lights for each rule; at the end the three tags close into one
// box labelled "inner product".

const O = { x: 480, y: 560 };
const S = 170;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const U0 = { x: 1.6, y: 0.4 };
const V0 = { x: 0.7, y: 1.4 };

export const Axioms: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("axioms");
  const [c0, c1, c2, c3, c4] = cues;
  const k =
    lerp(1, 2, glide(frame, c1 + 20, fps, 30)) *
    lerp(1, 0.5, glide(frame, c2, fps, 12));
  const swap = glide(frame, c2 + 20, fps, 40);
  const pos = frame >= c3;
  const turn = ramp(frame, c3 + 16, 90) * Math.PI * 2;
  const shrink = glide(frame, c3 + 116, fps, 24);
  // the two arrows, u scaled; for symmetry the arrows stay put and their
  // names trade places
  const ua = { x: U0.x * k, y: U0.y * k };
  const pu = ua;
  const pv = V0;
  const tipU = scr(ua.x, ua.y);
  const tipV = scr(V0.x, V0.y);
  const nameU = {
    x: lerp(tipU.x + 14, tipV.x + 14, swap),
    y: lerp(tipU.y + 46, tipV.y - 12, swap) - 30 * Math.sin(Math.PI * swap),
  };
  const nameV = {
    x: lerp(tipV.x + 14, tipU.x + 14, swap),
    y: lerp(tipV.y - 12, tipU.y + 46, swap) + 30 * Math.sin(Math.PI * swap),
  };
  const flip = swap > 0.5;
  const r = Math.hypot(V0.x, V0.y) * (1 - shrink);
  const a0 = Math.atan2(V0.y, V0.x);
  const vp = { x: r * Math.cos(a0 + turn), y: r * Math.sin(a0 + turn) };
  const dot = pos ? vp.x * vp.x + vp.y * vp.y : pu.x * pv.x + pu.y * pv.y;
  const tag = (i: number) =>
    Math.min(1, springIn(frame, [c1 + 10, c2 + 10, c3 + 10][i], fps, 10));
  const merge = glide(frame, c4 + 6, fps, 24);

  return (
    <SceneShell id="axioms">
      <Sfx name="pop" at={c0 + 10} volume={0.12} />
      <Sfx name="pluck1" at={c1 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.1} />
      <Sfx name="pluck3" at={c2 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />
      <Sfx name="pluck5" at={c3 + 10} volume={0.14} />
      <Sfx name="riser" at={c3 + 16} volume={0.08} />
      <Sfx name="chime" at={c4 + 20} volume={0.35} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 420}
          y1={O.y}
          x2={O.x + 520}
          y2={O.y}
          stroke={alpha(colors.paper, 0.25)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={O.y + 240}
          x2={O.x}
          y2={O.y - 440}
          stroke={alpha(colors.paper, 0.25)}
          strokeWidth={3}
        />
        {pos ? (
          <g>
            <circle
              cx={O.x}
              cy={O.y}
              r={Math.hypot(V0.x, V0.y) * S}
              fill="none"
              stroke={alpha(colors.highlight, 0.25)}
              strokeWidth={3}
              strokeDasharray="8 10"
            />
            {r > 0.02 ? (
              <Arrow
                from={O}
                to={scr(vp.x, vp.y)}
                width={16}
                color={colors.highlight}
              />
            ) : null}
            <circle
              cx={O.x}
              cy={O.y}
              r={shrink > 0.95 ? 16 : 0}
              fill={colors.text}
            />
          </g>
        ) : (
          <g opacity={fadeIn(frame, c0 + 6)}>
            <Arrow
              from={O}
              to={scr(pu.x, pu.y)}
              width={16}
              color={flip ? colors.highlight : colors.primary}
            />
            <Arrow
              from={O}
              to={scr(pv.x, pv.y)}
              width={16}
              color={flip ? colors.primary : colors.highlight}
            />
            <text
              x={nameU.x}
              y={nameU.y}
              fill={colors.primary}
              fontSize={50}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {k > 1.05 ? `${k.toFixed(1)}u` : "u"}
            </text>
            <text
              x={nameV.x}
              y={nameV.y}
              fill={colors.highlight}
              fontSize={50}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              v
            </text>
          </g>
        )}
        {/* the readout: a bar for ⟨·,·⟩ */}
        <g transform="translate(1250 640)" opacity={fadeIn(frame, c0 + 10)}>
          <line
            x1={-70}
            y1={0}
            x2={70}
            y2={0}
            stroke={colors.text}
            strokeWidth={4}
          />
          <rect
            x={-45}
            y={-Math.max(0, dot) * 70}
            width={90}
            height={Math.max(0, dot) * 70}
            rx={8}
            fill={pos ? colors.green : colors.orange}
          />
          <text
            y={50}
            fill={colors.text}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            {dot.toFixed(2)}
          </text>
          <text
            y={-330}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {pos ? "⟨v, v⟩" : flip ? "⟨v, u⟩" : "⟨u, v⟩"}
          </text>
        </g>
      </svg>
      {/* the three rule tags, merging into one box */}
      {tx.rules.map((t, i) => (
        <div
          key={t}
          style={{
            position: "absolute",
            top: lerp(200 + i * 130, 260 + i * 100, merge),
            left: 1440,
            width: 360,
            padding: "14px 0",
            borderRadius: 16,
            textAlign: "center",
            border: `4px solid ${colors.primary}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 42,
            fontWeight: 800,
            color: colors.primary,
            opacity: tag(i),
            scale: `${tag(i)}`,
          }}
        >
          {i + 1} · {t}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1410,
          width: 420,
          height: 380,
          borderRadius: 24,
          border: `6px solid ${colors.green}`,
          opacity: merge,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 610,
          left: 1410,
          width: 420,
          textAlign: "center",
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: merge,
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        = {tx.innerProduct}
      </div>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          width: 1240,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 96,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 14),
        }}
      >
        ⟨u, v⟩
      </div>
    </SceneShell>
  );
};
