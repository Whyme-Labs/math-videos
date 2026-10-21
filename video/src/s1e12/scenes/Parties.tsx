import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
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
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Guest, guestColor } from "../../s1e11/components/hotel";
import { useStrings } from "../i18n";

// Cantor's theorem as a party. Six guests each host a party and fill in a
// guest list (a row of envelopes: ✓ = invited). The diagonal envelopes are
// "did you invite yourself?". Flip them into a new list: everyone who did
// not invite themselves. That list slides up past each host; at the host's
// own envelope it disagrees, the host shakes their head. Nobody's party.

const N = 6;
const CELL = 96;
const GX = 700;
const GY = 170;
const invited = (host: number, guest: number) =>
  [
    [1, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 0],
  ][host][guest] === 1;
const cx = (g: number) => GX + (g + 0.5) * CELL;
const cy = (h: number) => GY + (h + 0.5) * CELL;
const NEW_Y = GY + N * CELL + 70;

const Envelope: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly yes: boolean;
  readonly glow?: number;
  readonly bad?: number;
  readonly scale?: number;
}> = ({ x, y, yes, glow = 0, bad = 0, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {glow > 0 ? (
      <rect
        x={-50}
        y={-50}
        width={100}
        height={100}
        rx={16}
        fill={alpha(colors.primary, 0.8 * glow)}
      />
    ) : null}
    <rect
      x={-38}
      y={-28}
      width={76}
      height={56}
      rx={6}
      fill={colors.paper}
      stroke={colors.ink}
      strokeWidth={3}
    />
    <path
      d="M -38 -28 L 0 4 L 38 -28"
      fill="none"
      stroke={colors.ink}
      strokeWidth={3}
    />
    <text
      x={0}
      y={22}
      fill={yes ? colors.green : alpha(colors.ink, 0.4)}
      fontSize={34}
      textAnchor="middle"
      fontWeight={800}
    >
      {yes ? "✓" : "·"}
    </text>
    {bad > 0 ? (
      <rect
        x={-52}
        y={-52}
        width={104}
        height={104}
        rx={16}
        fill="none"
        stroke={colors.red}
        strokeWidth={7}
        opacity={bad}
      />
    ) : null}
  </g>
);

export const Parties: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("parties");
  const [c0, c1, c2] = cues;
  const hostAt = (h: number) => c0 + 6 + h * 6;
  const cardAt = (h: number, g: number) => c0 + 40 + h * 8 + g * 3;
  const diagAt = (h: number) => c1 + 6 + h * 8;
  const dropAt = (h: number) => c1 + 60 + h * 7;
  // the new list slides up past each host
  const visitAt = (h: number) => c2 + 10 + (N - 1 - h) * 16;
  const visiting = Array.from({ length: N }).reduce<number>(
    (acc, _, h) => (frame >= visitAt(h) ? Math.min(acc, h) : acc),
    N,
  );
  const listY =
    visiting < N
      ? lerp(
          visiting === N - 1 ? NEW_Y : cy(visiting + 1),
          cy(visiting),
          glide(frame, visitAt(visiting), fps, 10),
        )
      : NEW_Y;
  const nobody = springIn(frame, visitAt(0) + 22, fps, 9);
  const zoom =
    lerp(1.08, 0.98, glide(frame, c0, fps, 60)) +
    0.04 * ramp(frame, c1, c2 - c1);

  return (
    <SceneShell id="parties">
      {Array.from({ length: N }).map((_, h) => (
        <Sfx key={`h${h}`} name="pop" at={hostAt(h)} volume={0.14} />
      ))}
      {Array.from({ length: N }).map((_, h) => (
        <Sfx key={`c${h}`} name="page" at={cardAt(h, 0)} volume={0.08} />
      ))}
      {Array.from({ length: N }).map((_, h) => (
        <Sfx key={`d${h}`} name={PLUCKS[h]} at={diagAt(h)} volume={0.2} />
      ))}
      {Array.from({ length: N }).map((_, h) => (
        <Sfx key={`v${h}`} name="thud" at={visitAt(h) + 10} volume={0.14} />
      ))}
      <Sfx name="chime" at={visitAt(0) + 22} />
      <QuestionTray />

      <Camera zoom={zoom} x={0} y={0}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* column heads: who is invited */}
          {Array.from({ length: N }).map((_, g) => (
            <g key={`col${g}`} opacity={fadeIn(frame, hostAt(g))}>
              <circle
                cx={cx(g)}
                cy={GY - 50}
                r={26}
                fill={guestColor(g)}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                x={cx(g)}
                y={GY - 40}
                fill={colors.ink}
                fontSize={28}
                textAnchor="middle"
                fontWeight={800}
              >
                {g}
              </text>
            </g>
          ))}
          {/* hosts down the left, in party hats */}
          {Array.from({ length: N }).map((_, h) => {
            const s = Math.min(1, springIn(frame, hostAt(h), fps, 11));
            const no =
              visiting === h && frame < visitAt(h) + 16
                ? shake(frame, visitAt(h) + 6, 12)
                : 0;
            return (
              <g
                key={`host${h}`}
                transform={`translate(${GX - 120 + no} ${cy(h) + 52}) scale(${0.55 * s})`}
              >
                <Guest x={0} y={0} color={guestColor(h)} />
                <polygon
                  points="-22,-146 22,-146 0,-200"
                  fill={colors.highlight}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
              </g>
            );
          })}
          {/* the invitations */}
          {Array.from({ length: N }).map((_, h) =>
            Array.from({ length: N }).map((__, g) => {
              const s = Math.min(1, springIn(frame, cardAt(h, g), fps, 13));
              const diag = g === h;
              return (
                <Envelope
                  key={`${h}-${g}`}
                  x={cx(g)}
                  y={cy(h)}
                  yes={invited(h, g)}
                  scale={s}
                  glow={diag && frame >= diagAt(h) ? 1 : 0}
                  bad={
                    diag && visiting <= h && frame >= visitAt(h) + 10 ? 1 : 0
                  }
                />
              );
            }),
          )}
          {/* the flipped diagonal: a new list, owned by nobody */}
          {Array.from({ length: N }).map((_, g) => {
            const t = ramp(frame, dropAt(g), 14);
            if (t <= 0) return null;
            const from = { x: cx(g), y: cy(g) };
            const p =
              t < 1
                ? hop(t, from.x, from.y, cx(g), NEW_Y, 90)
                : { x: cx(g), y: listY };
            return (
              <Envelope
                key={`n${g}`}
                x={p.x}
                y={p.y}
                yes={!invited(g, g)}
                scale={1.05}
              />
            );
          })}
          {frame >= dropAt(0) ? (
            <rect
              x={GX - 10}
              y={listY - 64}
              width={N * CELL + 20}
              height={128}
              rx={20}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={6}
              opacity={fadeIn(frame, dropAt(0))}
            />
          ) : null}
          <text
            x={GX + N * CELL + 60}
            y={NEW_Y + 14}
            fill={colors.highlight}
            fontSize={40}
            opacity={fadeIn(frame, dropAt(N - 1) + 14) * fadeOut(frame, c2, 8)}
          >
            {tx.whose}
          </text>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          left: 1440,
          top: 160,
          fontSize: 36,
          color: colors.muted,
          opacity: fadeIn(frame, cardAt(0, 0)) * fadeOut(frame, c1, 8),
          translate: riseIn(frame, cardAt(0, 0), 14),
        }}
      >
        ✓ = {tx.invites}
      </div>
      <div
        style={{
          position: "absolute",
          left: 1420,
          top: 520,
          width: 420,
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 64,
          color: colors.red,
          padding: "14px 0",
          border: `6px solid ${colors.red}`,
          borderRadius: 16,
          opacity: Math.min(1, nobody),
          scale: lerp(1.6, 1, Math.min(1, nobody)),
          rotate: "-6deg",
        }}
      >
        {tx.nobody}
      </div>
    </SceneShell>
  );
};
