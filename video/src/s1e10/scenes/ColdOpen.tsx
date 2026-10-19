import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";

// A story first. Italy, around 1560: Bombelli draining a marsh (the Val di
// Chiana works) stops to write his Algebra. Its puzzle x³ = 15x + 4 becomes a
// balance: a cube of blocks on the left, fifteen rods and four blocks on the
// right. The cube of side 4 (64 blocks) levels it. Then Cardano's recipe
// spits out a glowing √−121 and the scale lurches; Bombelli's two ghost
// numbers 2 + i and 2 − i collide, the i's burst, and a 4 drops onto the pan.

const PIVOT = { x: 960, y: 250 };
const ARM = 470;
const STRING = 210;
const BLOCK = 30;

// isometric block cube with side n blocks, `layers` of them built so far
const Cube: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly n: number;
  readonly layers: number;
  readonly opacity?: number;
}> = ({ x, y, n, layers, opacity = 1 }) => {
  const s = BLOCK * 0.82;
  const dx = s * 0.866;
  const dy = s * 0.5;
  const h = layers * s;
  const w = n * dx;
  // points: bottom front corner at (x, y)
  const top = [
    [x, y - h],
    [x + w, y - h - n * dy],
    [x, y - h - 2 * n * dy],
    [x - w, y - h - n * dy],
  ];
  const left = [
    [x, y],
    [x, y - h],
    [x - w, y - h - n * dy],
    [x - w, y - n * dy],
  ];
  const right = [
    [x, y],
    [x, y - h],
    [x + w, y - h - n * dy],
    [x + w, y - n * dy],
  ];
  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  const grid = [];
  for (let k = 1; k < n; k++) {
    grid.push(
      <line
        key={`l${k}`}
        x1={x - k * dx}
        y1={y - k * dy}
        x2={x - k * dx}
        y2={y - k * dy - h}
        stroke={colors.ink}
        strokeWidth={1.5}
      />,
      <line
        key={`r${k}`}
        x1={x + k * dx}
        y1={y - k * dy}
        x2={x + k * dx}
        y2={y - k * dy - h}
        stroke={colors.ink}
        strokeWidth={1.5}
      />,
    );
  }
  for (let k = 1; k < Math.floor(layers + 0.001); k++) {
    grid.push(
      <polyline
        key={`h${k}`}
        points={`${x - w},${y - n * dy - k * s} ${x},${y - k * s} ${x + w},${y - n * dy - k * s}`}
        fill="none"
        stroke={colors.ink}
        strokeWidth={1.5}
      />,
    );
  }
  return (
    <g opacity={opacity}>
      <polygon points={poly(left)} fill={colors.orange} />
      <polygon points={poly(right)} fill={alpha(colors.orange, 0.75)} />
      <polygon points={poly(top)} fill={colors.primary} />
      {grid}
    </g>
  );
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;

  // camera: wide on the marsh, then onto the book, then the scale
  const toBook = glide(frame, c0 + 70, fps, 30);
  const toScale = glide(frame, c1 - 6, fps, 24);
  const zoom = lerp(lerp(1, 1.5, toBook), 1, toScale);
  const camX = lerp(lerp(0, 30, toBook), 0, toScale);
  const camY = lerp(lerp(0, -10, toBook), 0, toScale);
  const marsh = 1 - toScale;

  // the scale: searching before the cube is known, level at 4, lurching at
  // √−121, settling on 4
  const rodAt = (k: number) => c1 + 24 + k * 4;
  const looseAt = (k: number) => c1 + 90 + k * 8;
  const searching = frame >= c1 + 20 && frame < c2 + 10;
  const layerAt = (k: number) => c2 + 10 + k * 12;
  const layers = [0, 1, 2, 3].reduce(
    (acc, k) => acc + Math.min(1, ramp(frame, layerAt(k), 10)),
    0,
  );
  const lurch = frame >= c3 + 30 && frame < c4 + 70;
  const settle = glide(frame, c4 + 70, fps, 30);
  let tilt = 0;
  if (searching) tilt = 0.12 * Math.sin((frame - c1) / 9);
  else if (frame >= c2 + 10 && frame < c3 + 30)
    tilt =
      0.12 *
      Math.sin((c2 + 10 - c1) / 9) *
      (1 - glide(frame, c2 + 50, fps, 24));
  if (lurch)
    tilt =
      0.22 * Math.sin((frame - c3) / 4) * Math.exp(-(frame - c3 - 30) / 90);
  if (frame >= c4 + 70) tilt = tilt * (1 - settle);
  const L = {
    x: PIVOT.x - ARM * Math.cos(tilt),
    y: PIVOT.y + ARM * Math.sin(tilt),
  };
  const R = {
    x: PIVOT.x + ARM * Math.cos(tilt),
    y: PIVOT.y - ARM * Math.sin(tilt),
  };
  const panL = { x: L.x, y: L.y + STRING };
  const panR = { x: R.x, y: R.y + STRING };
  const showScale = fadeIn(frame, c1 - 4);
  const cubeKnown = frame >= c2 + 10;

  // Cardano's recipe and the glowing √−121
  const page = glide(frame, c3 + 4, fps, 22) - glide(frame, c4 + 4, fps, 20);
  const orb = springIn(frame, c3 + 30, fps, 9);
  const glow = 0.6 + 0.4 * Math.sin(frame / 4);
  const orbPos = {
    x: lerp(560, panL.x, ramp(frame, c4 + 4, 20)),
    y: lerp(560, panL.y - 220, ramp(frame, c4 + 4, 20)),
  };
  // the two ghost numbers collide
  const meet = glide(frame, c4 + 24, fps, 20);
  const burst = frame >= c4 + 44;
  const burstT = Math.min(1, (frame - c4 - 44) / 18);
  const fourDrop = ramp(frame, c4 + 56, 14);
  const fourPos = hop(fourDrop, 960, 600, panL.x, panL.y + 130, 120);

  // marsh reeds
  const reeds = Array.from({ length: 34 }).map((_, k) => ({
    x: 40 + k * 56 + ((k * 37) % 23),
    h: 90 + ((k * 53) % 70),
  }));

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 4} volume={0.12} />
      <Sfx name="page" at={c0 + 76} />
      <Sfx name="thud" at={c1 + 6} volume={0.25} />
      {Array.from({ length: 15 }).map((_, k) =>
        k % 3 === 0 ? (
          <Sfx key={k} name="tick" at={rodAt(k)} volume={0.16} />
        ) : null,
      )}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`b${k}`} name="clink" at={looseAt(k)} volume={0.2} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`l${k}`} name={PLUCKS[k]} at={layerAt(k)} volume={0.22} />
      ))}
      <Sfx name="ding" at={c2 + 60} volume={0.24} />
      <Sfx name="page" at={c3 + 4} />
      <Sfx name="thud" at={c3 + 30} volume={0.4} />
      <Sfx name="scratch" at={c3 + 34} volume={0.2} />
      <Sfx name="whoosh" at={c4 + 24} volume={0.16} />
      <Sfx name="sparkle" at={c4 + 44} />
      <Sfx name="pop" at={c4 + 70} />
      <Sfx name="chime" at={c4 + 90} />

      <Camera zoom={zoom} x={camX} y={camY}>
        {/* the marsh at dusk */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", opacity: marsh }}
        >
          <circle cx={420} cy={600} r={150} fill={alpha(colors.orange, 0.55)} />
          <path
            d="M 0 640 Q 300 470 620 600 T 1240 560 T 1920 600 L 1920 660 L 0 660 Z"
            fill={alpha(colors.ink, 0.9)}
          />
          <rect
            x={0}
            y={640}
            width={1920}
            height={440}
            fill={alpha(colors.violet, 0.35)}
          />
          {Array.from({ length: 8 }).map((_, k) => (
            <line
              key={k}
              x1={((frame * (1 + k * 0.3) + k * 240) % 2200) - 200}
              y1={680 + k * 40}
              x2={((frame * (1 + k * 0.3) + k * 240) % 2200) + 60}
              y2={680 + k * 40}
              stroke={alpha(colors.muted, 0.35)}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
          {reeds.map((r, k) => {
            const sway = 10 * Math.sin(frame / 16 + k);
            return (
              <path
                key={k}
                d={`M ${r.x} 660 Q ${r.x + sway / 2} ${660 - r.h / 2} ${r.x + sway} ${660 - r.h}`}
                stroke={alpha(colors.green, 0.55)}
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          {/* Bombelli with a spade, then the book on a table */}
          <g
            transform={`translate(${lerp(1500, 1180, glide(frame, c0 + 6, fps, 40))} 0)`}
          >
            <circle cx={0} cy={470} r={26} fill={colors.paper} />
            <path
              d="M -34 500 L 34 500 L 44 640 L -44 640 Z"
              fill={colors.wood}
            />
            <line
              x1={40}
              y1={520}
              x2={80 + 14 * Math.sin(frame / 10)}
              y2={660}
              stroke={colors.paper}
              strokeWidth={7}
              strokeLinecap="round"
            />
          </g>
          <g opacity={fadeIn(frame, c0 + 60)}>
            <rect
              x={760}
              y={560}
              width={400}
              height={20}
              rx={6}
              fill={colors.wood}
            />
            <g
              transform={`translate(960 556) scale(${Math.min(1, springIn(frame, c0 + 70, fps, 12))})`}
            >
              <path
                d="M -150 0 L -150 -110 Q -75 -130 0 -112 L 0 0 Z"
                fill={colors.paper}
              />
              <path
                d="M 150 0 L 150 -110 Q 75 -130 0 -112 L 0 0 Z"
                fill={alpha(colors.paper, 0.85)}
              />
              <text
                x={-75}
                y={-50}
                fill={colors.ink}
                fontSize={20}
                textAnchor="middle"
                fontFamily={fonts.title}
              >
                L&apos;Algebra
              </text>
              <text
                x={75}
                y={-50}
                fill={colors.ink}
                fontSize={24}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {typed("x³ = 15x + 4", frame, c0 + 96, fps, 8)}
              </text>
            </g>
          </g>
          <text
            x={120}
            y={140}
            fill={colors.muted}
            fontSize={44}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 10) * fadeOut(frame, c0 + 70, 12)}
          >
            Italia · 1560
          </text>
        </svg>

        {/* the balance */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", opacity: showScale }}
        >
          <path
            d={`M ${PIVOT.x - 60} 900 L ${PIVOT.x + 60} 900 L ${PIVOT.x + 16} ${PIVOT.y} L ${PIVOT.x - 16} ${PIVOT.y} Z`}
            fill={colors.wood}
          />
          <line
            x1={L.x}
            y1={L.y}
            x2={R.x}
            y2={R.y}
            stroke={colors.paper}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <circle cx={PIVOT.x} cy={PIVOT.y} r={16} fill={colors.primary} />
          {[
            { a: L, p: panL },
            { a: R, p: panR },
          ].map(({ a, p }, k) => (
            <g key={k}>
              <line
                x1={a.x}
                y1={a.y}
                x2={p.x - 150}
                y2={p.y}
                stroke={colors.muted}
                strokeWidth={3}
              />
              <line
                x1={a.x}
                y1={a.y}
                x2={p.x + 150}
                y2={p.y}
                stroke={colors.muted}
                strokeWidth={3}
              />
              <path
                d={`M ${p.x - 170} ${p.y} L ${p.x + 170} ${p.y} Q ${p.x} ${p.y + 50} ${p.x - 170} ${p.y} Z`}
                fill={alpha(colors.paper, 0.9)}
              />
            </g>
          ))}
          {/* left: the unknown cube */}
          {cubeKnown ? (
            <Cube x={panL.x} y={panL.y - 2} n={4} layers={layers} />
          ) : (
            <g opacity={fadeIn(frame, c1 + 6)}>
              <Cube x={panL.x} y={panL.y - 2} n={4} layers={4} opacity={0.35} />
              <text
                x={panL.x}
                y={panL.y - 120}
                fill={colors.text}
                fontSize={90}
                textAnchor="middle"
                fontFamily={fonts.title}
              >
                ?
              </text>
            </g>
          )}
          {/* right: fifteen rods of length x, and four loose blocks */}
          {Array.from({ length: 15 }).map((_, k) => {
            const drop = springIn(frame, rodAt(k), fps, 14);
            const y = panR.y - 10 - k * 11;
            return (
              <g
                key={k}
                opacity={frame >= rodAt(k) ? 1 : 0}
                transform={`translate(0 ${(1 - Math.min(1, drop)) * -200})`}
              >
                <rect
                  x={panR.x - 150}
                  y={y}
                  width={4 * BLOCK}
                  height={10}
                  rx={3}
                  fill={colors.primary}
                />
                {cubeKnown
                  ? [1, 2, 3].map((j) => (
                      <line
                        key={j}
                        x1={panR.x - 150 + j * BLOCK}
                        y1={y}
                        x2={panR.x - 150 + j * BLOCK}
                        y2={y + 10}
                        stroke={colors.ink}
                        strokeWidth={1.5}
                      />
                    ))
                  : null}
              </g>
            );
          })}
          {[0, 1, 2, 3].map((k) => {
            const p = hop(
              ramp(frame, looseAt(k), 12),
              panR.x + 200,
              panR.y - 300,
              panR.x + 30 + (k % 2) * (BLOCK + 4),
              panR.y - 4 - BLOCK - Math.floor(k / 2) * (BLOCK + 2),
              60,
            );
            return frame >= looseAt(k) ? (
              <rect
                key={k}
                x={p.x}
                y={p.y}
                width={BLOCK}
                height={BLOCK}
                rx={4}
                fill={colors.orange}
              />
            ) : null;
          })}
          {/* the 4 that drops out of the collision */}
          {frame >= c4 + 56 ? (
            <text
              x={fourPos.x}
              y={fourPos.y}
              fill={colors.green}
              fontSize={110}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              x = 4
            </text>
          ) : null}
        </svg>

        {/* one formula at a time */}
        {[
          { t: "4³ = 64 = 15 × 4 + 4", at: c2 + 56, out: c3, c: colors.green },
          {
            t: "(2 + i) + (2 − i) = 4",
            at: c4 + 60,
            out: 1e9,
            c: colors.green,
          },
        ].map((f) => (
          <div
            key={f.t}
            style={{
              position: "absolute",
              top: 60,
              width: "100%",
              textAlign: "center",
              fontFamily: fonts.math,
              fontSize: 64,
              color: f.c,
              opacity: fadeIn(frame, f.at) * fadeOut(frame, f.out, 10),
              translate: riseIn(frame, f.at, 18),
            }}
          >
            {f.t}
          </div>
        ))}
      </Camera>

      {/* Cardano's page slides in; out comes a glowing √−121 */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: lerp(-560, 120, page),
            top: 300,
            width: 460,
            height: 520,
            borderRadius: 18,
            backgroundColor: colors.paper,
            boxShadow: `0 20px 60px ${alpha(colors.bg, 0.6)}`,
            padding: 34,
            color: colors.ink,
            rotate: `${-4 + 2 * Math.sin(frame / 20)}deg`,
          }}
        >
          <div style={{ fontFamily: fonts.title, fontSize: 40 }}>Ars Magna</div>
          <div style={{ fontSize: 24, opacity: 0.7 }}>Cardano · 1545</div>
          {Array.from({ length: 7 }).map((_, k) => (
            <div
              key={k}
              style={{
                height: 10,
                width: `${70 + ((k * 23) % 25)}%`,
                borderRadius: 5,
                backgroundColor: alpha(colors.ink, 0.18),
                marginTop: 24,
              }}
            />
          ))}
        </div>
        {frame >= c3 + 30 && !burst ? (
          <div
            style={{
              position: "absolute",
              left: orbPos.x - 150 + (lurch ? shake(frame, c3 + 30, 12) : 0),
              top: orbPos.y - 70,
              width: 300,
              height: 140,
              borderRadius: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.math,
              fontSize: 70,
              color: colors.text,
              backgroundColor: alpha(colors.red, 0.85),
              boxShadow: `0 0 ${60 * glow}px ${alpha(colors.red, 0.9)}`,
              scale: Math.min(1, orb) * (1 - meet * 0.4),
              opacity: 1 - meet,
            }}
          >
            √−121
          </div>
        ) : null}
        {/* Bombelli's two ghost numbers */}
        {[
          { t: "2 + i", x0: 420, s: -1 },
          { t: "2 − i", x0: 1500, s: 1 },
        ].map((g) => {
          const x = lerp(g.x0, 960 + g.s * 90, meet);
          return frame >= c4 + 10 && !burst ? (
            <div
              key={g.t}
              style={{
                position: "absolute",
                left: x - 170,
                top: 520,
                width: 340,
                height: 150,
                borderRadius: 75,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.math,
                fontSize: 78,
                color: colors.text,
                border: `5px solid ${colors.highlight}`,
                backgroundColor: alpha(colors.highlight, 0.25),
                opacity: fadeIn(frame, c4 + 10),
              }}
            >
              {g.t}
            </div>
          ) : null;
        })}
        {/* the i's burst into sparks */}
        {burst && burstT < 1
          ? Array.from({ length: 16 }).map((_, k) => {
              const a = (k / 16) * 2 * Math.PI;
              const d = 40 + 260 * burstT;
              return (
                <div
                  key={k}
                  style={{
                    position: "absolute",
                    left: 960 + d * Math.cos(a) - 8,
                    top: 595 + d * Math.sin(a) - 8,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: colors.highlight,
                    opacity: 1 - burstT,
                  }}
                />
              );
            })
          : null}
      </AbsoluteFill>
    </SceneShell>
  );
};
