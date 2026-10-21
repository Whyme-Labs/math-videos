import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest, guestColor } from "../../s1e11/components/hotel";
import {
  Badge,
  cellCenter,
  digitOf,
  flip,
  Ledger,
  nameOf,
  ROWS,
  type Layout,
} from "../components/ledger";
import { useStrings } from "../i18n";

// The story continues from E11. The smug clerk hangs a sign: NO CROWD TOO
// LARGE. A bus pulls up outside the lobby window, every passenger tagged
// with an infinite decimal. The clerk writes the ledger, room by room. A
// girl from the back of the bus hops down the ledger's diagonal; each digit
// she lands on flips and flies onto her own name tag. She has no room. The
// clerk reshuffles the rows; she hops the new diagonal and does it again.

const L: Layout = { x: 540, y: 130, cw: 104, rh: 72 };
const SHUFFLE = [3, 0, 6, 1, 7, 2, 5, 4];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;

  // --- the lobby (wide) and the ledger (close) ---
  const toLedger = glide(frame, c2 - 4, fps, 30);
  const lobby = 1 - toLedger;
  const sign = springIn(frame, c0 + 30, fps, 10);
  const bus = glide(frame, c1 + 4, fps, 50);
  // --- ledger rows being written ---
  const writeAt = (k: number) => c2 + 8 + k * 7;
  // --- the girl hops down the diagonal ---
  const hopAt = (k: number) => c3 + 6 + k * 13;
  const shuffled = frame >= c4 + 30;
  const shuffle = glide(frame, c4 + 30, fps, 22);
  const hop2At = (k: number) => c4 + 60 + k * 6;
  const order = shuffled
    ? SHUFFLE
    : Array.from({ length: ROWS }).map((_, k) => k);
  const slotOf = (id: number) => {
    const from = id;
    const to = SHUFFLE.indexOf(id);
    return lerp(from, to, shuffle);
  };
  const at = shuffled ? hop2At : hopAt;
  const step = order.reduce((acc, _, k) => (frame >= at(k) ? k : acc), -1);
  const girlPos = (() => {
    if (step < 0) return { x: L.x - 220, y: L.y + ROWS * L.rh + 40 };
    const t = ramp(frame, at(step), shuffled ? 5 : 10);
    const a =
      step === 0
        ? { x: L.x - 220, y: L.y - 20 }
        : cellCenter(L, step - 1, step - 1);
    const b = cellCenter(L, step, step);
    return hop(t, a.x, a.y - 10, b.x, b.y - 10, 60);
  })();
  const badgeDigits = order.map((id, k) => flip(digitOf(id, k)));
  const badgeShown = step + 1;
  const noRoom = springIn(frame, c4 + 6, fps, 9);
  // a slow push in while she walks the diagonal
  const camZoom = 1 + 0.08 * ramp(frame, c3, c4 - c3);
  const camX = 60 * ramp(frame, c3, c4 - c3);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.2} />
      <Sfx name="thud" at={c0 + 30} volume={0.3} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.18} />
      <Sfx name="thud" at={c1 + 54} volume={0.2} />
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`w${k}`} name="tick" at={writeAt(k)} volume={0.12} />
      ))}
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx
          key={`h${k}`}
          name={PLUCKS[k % 6]}
          at={hopAt(k) + 8}
          volume={0.2}
        />
      ))}
      <Sfx name="scratch" at={c4 + 6} />
      <Sfx name="whoosh" at={c4 + 30} volume={0.16} />
      {Array.from({ length: ROWS }).map((_, k) => (
        <Sfx key={`g${k}`} name="tick" at={hop2At(k) + 4} volume={0.12} />
      ))}
      <Sfx name="chime" at={hop2At(ROWS) + 6} />

      {/* the lobby */}
      <AbsoluteFill style={{ opacity: lobby }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <rect
            x={0}
            y={0}
            width={1920}
            height={1080}
            fill={alpha(colors.violet, 0.3)}
          />
          {/* the big window onto the street */}
          <rect
            x={980}
            y={170}
            width={860}
            height={520}
            rx={20}
            fill={alpha(colors.ink, 0.85)}
            stroke={colors.wood}
            strokeWidth={14}
          />
          <g transform={`translate(${lerp(1400, 0, bus)} 0)`}>
            <rect
              x={1040}
              y={420}
              width={2000}
              height={220}
              rx={36}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={6}
            />
            {Array.from({ length: 8 }).map((_, k) => (
              <g key={k}>
                <rect
                  x={1080 + k * 200}
                  y={450}
                  width={180}
                  height={110}
                  rx={14}
                  fill={colors.paper}
                />
                <text
                  x={1170 + k * 200}
                  y={520}
                  fill={colors.ink}
                  fontSize={26}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  {nameOf(k + 11, 5)}
                </text>
              </g>
            ))}
          </g>
          {/* the sign the clerk hangs */}
          <g
            transform={`translate(560 150) scale(${Math.max(0.01, Math.min(1, sign))}) rotate(${-3 + 2 * Math.sin(frame / 18)})`}
          >
            <line
              x1={-200}
              y1={-90}
              x2={-150}
              y2={-36}
              stroke={colors.muted}
              strokeWidth={4}
            />
            <line
              x1={200}
              y1={-90}
              x2={150}
              y2={-36}
              stroke={colors.muted}
              strokeWidth={4}
            />
            <rect
              x={-300}
              y={-40}
              width={600}
              height={90}
              rx={16}
              fill={colors.bg}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <text
              x={0}
              y={20}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontWeight={800}
              letterSpacing={2}
            >
              {tx.sign}
            </text>
          </g>
          {/* the desk and the smug clerk */}
          <Guest
            x={520}
            y={760}
            color={colors.green}
            size={1.9}
            bob={frame / 5}
          />
          <rect
            x={200}
            y={700}
            width={680}
            height={260}
            rx={22}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={6}
          />
          <rect
            x={250}
            y={660}
            width={240}
            height={50}
            rx={8}
            fill={colors.paper}
            transform="rotate(-6 370 685)"
          />
        </svg>
      </AbsoluteFill>

      {/* the ledger, close up */}
      <AbsoluteFill style={{ opacity: toLedger }}>
        <Camera zoom={camZoom} x={camX} y={0}>
          <svg width={1920} height={1080} style={{ position: "absolute" }}>
            <Ledger
              L={L}
              order={order}
              slotOf={shuffled ? slotOf : undefined}
              reveal={(k) => ramp(frame, writeAt(k), 12)}
              rowLabel={(_, k) => `${tx.room} ${k}`}
              lit={(k) => (k <= step ? 1 : 0)}
              fontSize={42}
            />
            {/* the girl hopping down the diagonal */}
            <Guest
              x={girlPos.x}
              y={girlPos.y + 30}
              color={colors.highlight}
              size={0.7}
              bob={step >= 0 ? frame / 2 : 0}
            />
            {/* her name tag, built from the flipped diagonal */}
            <g transform={`translate(${shake(frame, c4 + 6, 10)} 0)`}>
              <Badge
                x={1680}
                y={560}
                digits={badgeDigits}
                shown={Math.max(0, badgeShown)}
                scale={1}
              />
            </g>
            <g opacity={Math.min(1, noRoom) * fadeOut(frame, c4 + 28, 8)}>
              <rect
                x={1480}
                y={410}
                width={400}
                height={80}
                rx={14}
                fill="none"
                stroke={colors.red}
                strokeWidth={7}
                transform="rotate(-6 1680 450)"
              />
              <text
                x={1680}
                y={466}
                fill={colors.red}
                fontSize={48}
                textAnchor="middle"
                fontWeight={800}
                transform="rotate(-6 1680 450)"
              >
                {tx.noRoom}
              </text>
            </g>
          </svg>
        </Camera>
      </AbsoluteFill>
      {/* the rows are guests: the colored chips beside the ledger */}
      <AbsoluteFill style={{ opacity: toLedger * 0.9, pointerEvents: "none" }}>
        <svg width={1920} height={1080}>
          {order.map((id, k) => {
            const slot = shuffled ? slotOf(id) : k;
            return (
              <circle
                key={id}
                cx={L.x - 270}
                cy={L.y + (slot + 0.5) * L.rh}
                r={16}
                fill={guestColor(id)}
                stroke={colors.ink}
                strokeWidth={3}
                opacity={ramp(frame, writeAt(k), 8)}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
