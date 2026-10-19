import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Grid, mul, polar, px, type C, type View } from "../components/plane";
import { useStrings } from "../i18n";

// The Fundamental Theorem of Algebra. A corridor of locked doors, each with a
// polynomial equation on it. A key marked ℂ opens x² + 1 = 0 (behind it: ±i),
// then flies down the corridor and every door swings open on its roots.
// Then why: a circle |z| = R on the left and its image under z³ − 1 on the
// right. Small R: the loop sits near −1 and doesn't go round 0. Big R: it
// winds round 0 three times. In between it must sweep across 0, and the
// three roots light up on the left.

const DOORS = [
  { eq: "x² + 1 = 0", roots: "±i" },
  { eq: "x³ = 15x + 4", roots: "4, −2 ± √3" },
  { eq: "x⁴ = −4", roots: "±1 ± i" },
  { eq: "x⁵ − x − 1 = 0", roots: "5 roots" },
  { eq: "z⁷ + 2iz = 3", roots: "7 roots" },
];
const DOOR_W = 300;
const DOOR_H = 470;
const DOOR_X = (k: number) => 110 + k * 350;
const DOOR_Y = 330;
const VL: View = { cx: 500, cy: 560, unit: 170 };
const VR: View = { cx: 1400, cy: 560, unit: 74 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const p = (z: C): C => {
  const z3 = mul(mul(z, z), z);
  return { re: z3.re - 1, im: z3.im };
};

export const Fta: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("fta");
  const [c0, c1, c2] = cues;
  // doors
  const openAt = (k: number) => (k === 0 ? c0 + 40 : c0 + 70 + k * 12);
  const keyT = ramp(frame, c0 + 14, 26);
  const keyPos =
    frame < c0 + 70
      ? hop(keyT, 960, 980, DOOR_X(0) + DOOR_W - 40, DOOR_Y + DOOR_H / 2, 200)
      : hop(
          ramp(frame, c0 + 70, 60),
          DOOR_X(0) + DOOR_W - 40,
          DOOR_Y + DOOR_H / 2,
          DOOR_X(4) + DOOR_W - 40,
          DOOR_Y + DOOR_H / 2,
          60,
        );
  const corridor = 1 - glide(frame, c1, fps, 16);
  const camX = lerp(-300, 0, glide(frame, c0 + 64, fps, 40));
  const zoom = lerp(1.35, 1, glide(frame, c0 + 64, fps, 40));
  // winding
  const R = interpolate(
    frame,
    [c1, c1 + 60, c1 + 80, c2, c2 + 10, c2 + 50, c2 + 80, c2 + 110],
    [0.5, 0.5, 1.4, 1.4, 0.4, 1, 1, 1.4],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  const phi = (Math.max(0, frame - c1) / 60) * 2 * Math.PI;
  const z = polar(R, phi);
  const pz = p(z);
  const loop = Array.from({ length: 181 })
    .map((_, k) => px(VR, p(polar(R, (k / 180) * 2 * Math.PI))))
    .map((q, k) => `${k === 0 ? "M" : "L"} ${q.x} ${q.y}`)
    .join(" ");
  const planes = fadeIn(frame, c1 + 6);
  const hit = frame >= c2 + 50;
  const flash = springIn(frame, c2 + 50, fps, 9);
  const o = px(VR, { re: 0, im: 0 });
  const zp = px(VL, z);
  const pp = px(VR, pz);

  return (
    <SceneShell id="fta">
      <Sfx name="whoosh" at={c0 + 14} volume={0.14} />
      <Sfx name="clink" at={c0 + 40} />
      <Sfx name="chime" at={c0 + 44} volume={0.24} />
      {[1, 2, 3, 4].map((k) => (
        <Sfx key={k} name={PLUCKS[k]} at={openAt(k)} volume={0.22} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 64} volume={0.16} />
      <Sfx name="riser" at={c2 + 10} volume={0.18} />
      <Sfx name="chime" at={c2 + 50} />
      <Sfx name="sparkle" at={c2 + 56} />
      <QuestionTray />

      {/* the corridor of locked doors */}
      <Camera zoom={zoom} x={camX} y={0}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", opacity: corridor }}
        >
          <rect
            x={-400}
            y={DOOR_Y + DOOR_H}
            width={2800}
            height={300}
            fill={alpha(colors.ink, 0.8)}
          />
          {DOORS.map((d, k) => {
            const open = glide(frame, openAt(k), fps, 20);
            const x = DOOR_X(k);
            return (
              <g key={d.eq}>
                {/* the light behind the door, and the roots */}
                <rect
                  x={x}
                  y={DOOR_Y}
                  width={DOOR_W}
                  height={DOOR_H}
                  rx={10}
                  fill={alpha(colors.primary, 0.15 + 0.6 * open)}
                />
                <text
                  x={x + DOOR_W / 2}
                  y={DOOR_Y + DOOR_H / 2 + 20}
                  fill={colors.ink}
                  fontSize={k === 1 ? 40 : 56}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                  opacity={open}
                >
                  {d.roots}
                </text>
                {/* the door itself, hinged on the left */}
                <g transform={`translate(${x} 0) scale(${1 - 0.85 * open} 1)`}>
                  <rect
                    x={0}
                    y={DOOR_Y}
                    width={DOOR_W}
                    height={DOOR_H}
                    rx={10}
                    fill={colors.wood}
                    stroke={colors.ink}
                    strokeWidth={5}
                  />
                  <rect
                    x={30}
                    y={DOOR_Y + 40}
                    width={DOOR_W - 60}
                    height={90}
                    rx={8}
                    fill={colors.paper}
                  />
                  <text
                    x={DOOR_W / 2}
                    y={DOOR_Y + 100}
                    fill={colors.ink}
                    fontSize={k === 3 || k === 4 ? 32 : 38}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {d.eq}
                  </text>
                  <circle
                    cx={DOOR_W - 40}
                    cy={DOOR_Y + DOOR_H / 2}
                    r={14}
                    fill={colors.primary}
                  />
                </g>
              </g>
            );
          })}
          {/* the key */}
          <g
            transform={`translate(${keyPos.x} ${keyPos.y})`}
            opacity={fadeIn(frame, c0 + 10) * fadeOut(frame, c0 + 130, 10)}
          >
            <circle
              cx={-70}
              cy={0}
              r={36}
              fill="none"
              stroke={colors.primary}
              strokeWidth={12}
            />
            <rect x={-36} y={-7} width={80} height={14} fill={colors.primary} />
            <rect x={24} y={0} width={10} height={24} fill={colors.primary} />
            <text
              x={-70}
              y={14}
              fill={colors.primary}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              ℂ
            </text>
          </g>
        </svg>
      </Camera>

      {/* why: the winding picture */}
      <AbsoluteFill style={{ opacity: planes }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <Grid view={VL} n={2} />
          <Grid view={VR} n={5} />
          <circle
            cx={VL.cx}
            cy={VL.cy}
            r={R * VL.unit}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <circle cx={zp.x} cy={zp.y} r={16} fill={colors.primary} />
          <path
            d={loop}
            fill={alpha(colors.orange, 0.08)}
            stroke={colors.orange}
            strokeWidth={6}
          />
          <circle cx={pp.x} cy={pp.y} r={16} fill={colors.orange} />
          {/* a thread from the point to its image */}
          <line
            x1={zp.x}
            y1={zp.y}
            x2={pp.x}
            y2={pp.y}
            stroke={alpha(colors.muted, 0.35)}
            strokeWidth={2}
            strokeDasharray="6 8"
          />
          <circle
            cx={o.x}
            cy={o.y}
            r={12 + (hit ? 30 * Math.max(0, 1 - (frame - c2 - 50) / 20) : 0)}
            fill={colors.text}
          />
          {[0, 1, 2].map((k) => {
            const r = px(VL, polar(1, (2 * Math.PI * k) / 3));
            return (
              <circle
                key={k}
                cx={r.x}
                cy={r.y}
                r={20 * Math.min(1, flash)}
                fill={colors.highlight}
                opacity={hit ? 1 : 0}
              />
            );
          })}
          <text
            x={VL.cx}
            y={VL.cy - 2 * VL.unit - 30}
            fill={colors.primary}
            fontSize={42}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            |z| = {R.toFixed(2)}
          </text>
          <text
            x={VR.cx}
            y={VR.cy - 5 * VR.unit - 30}
            fill={colors.orange}
            fontSize={42}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            z³ − 1
          </text>
          <text
            x={VR.cx}
            y={VR.cy + 5 * VR.unit + 56}
            fill={R < 1 ? colors.muted : colors.orange}
            fontSize={40}
            textAnchor="middle"
            opacity={hit && frame < c2 + 80 ? 0 : 1}
          >
            {R < 1 ? tx.noWind : tx.winds(3)}
          </text>
          <text
            x={VL.cx}
            y={VL.cy + 2 * VL.unit + 56}
            fill={colors.highlight}
            fontSize={42}
            textAnchor="middle"
            opacity={hit ? fadeIn(frame, c2 + 56) : 0}
          >
            {tx.root}: z³ = 1
          </text>
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 70,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 48,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 90),
          translate: riseIn(frame, c2 + 90, 16),
        }}
      >
        {tx.fta} · Gauss, 1799
      </div>
    </SceneShell>
  );
};
