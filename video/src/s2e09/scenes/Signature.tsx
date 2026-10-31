import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The gallery of signatures. Three panels pop in: (+, +) concentric
// ellipses, (+, −) hyperbolas, (+, 0) parallel lines. Then Minkowski's
// plane: the light cone (two orange diagonals) and the hyperbolas
// t² − x² = c; an event slides along one hyperbola as the frame boosts,
// and its interval reading never changes. Badge: (+, −, −, −).

const Panel: React.FC<{
  readonly cx: number;
  readonly s: number;
  readonly kind: 0 | 1 | 2;
  readonly label: string;
}> = ({ cx, s, kind, label }) => {
  const cy = 450;
  const curves: string[] = [];
  for (const c of [0.3, 0.8, 1.5]) {
    if (kind === 0) {
      curves.push(
        Array.from({ length: 49 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return `${i ? "L" : "M"} ${cx + Math.sqrt(c) * 120 * Math.cos(a)} ${cy - Math.sqrt(c) * 120 * Math.sin(a)}`;
        }).join(" "),
      );
    } else if (kind === 1) {
      for (const sg of [-1, 1]) {
        curves.push(
          Array.from({ length: 31 }, (_, i) => {
            const t = -1.4 + (2.8 * i) / 30;
            return `${i ? "L" : "M"} ${cx + sg * Math.sqrt(c) * 80 * Math.cosh(t)} ${cy - Math.sqrt(c) * 80 * Math.sinh(t)}`;
          }).join(" "),
        );
      }
    } else {
      for (const sg of [-1, 1]) {
        const x = cx + sg * Math.sqrt(c) * 110;
        curves.push(`M ${x} ${cy - 190} L ${x} ${cy + 190}`);
      }
    }
  }
  return (
    <g
      opacity={s}
      transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}
    >
      <defs>
        <clipPath id={`sig${kind}`}>
          <rect x={cx - 220} y={cy - 220} width={440} height={440} rx={26} />
        </clipPath>
      </defs>
      <rect
        x={cx - 220}
        y={cy - 220}
        width={440}
        height={440}
        rx={26}
        fill={alpha(colors.bgMid, 0.6)}
        stroke={alpha(colors.paper, 0.3)}
        strokeWidth={4}
      />
      <g clipPath={`url(#sig${kind})`}>
        {curves.map((d, k) => (
          <path
            key={k}
            d={d}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
          />
        ))}
      </g>
      <text
        x={cx}
        y={cy + 290}
        fill={colors.green}
        fontSize={56}
        textAnchor="middle"
        fontWeight={900}
      >
        {label}
      </text>
    </g>
  );
};

export const Signature: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("signature");
  const [c0, c1] = cues;
  const pop = (k: number) =>
    Math.min(1, springIn(frame, c0 + 20 + k * 30, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const boost = glide(frame, c1 + 40, fps, 60);
  const O = { x: 760, y: 470 };
  const S = 130;
  const scr = (x: number, t: number) => ({ x: O.x + x * S, y: O.y - t * S });
  const ev = {
    x: Math.sinh(-0.6 + 1.4 * boost),
    t: Math.cosh(-0.6 + 1.4 * boost),
  };

  return (
    <SceneShell id="signature">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="pop" at={c0 + 20 + k * 30} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="riser" at={c1 + 40} volume={0.1} />
      <Sfx name="chime" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Panel cx={400} s={pop(0)} kind={0} label="(+, +)" />
          <Panel cx={960} s={pop(1)} kind={1} label="(+, −)" />
          <Panel cx={1520} s={pop(2)} kind={2} label="(+, 0)" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="mink">
              <rect x={260} y={110} width={1000} height={720} rx={30} />
            </clipPath>
          </defs>
          <g clipPath="url(#mink)">
            <line
              x1={scr(-4, 0).x}
              y1={O.y}
              x2={scr(4, 0).x}
              y2={O.y}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
            />
            <line
              x1={O.x}
              y1={scr(0, -3).y}
              x2={O.x}
              y2={scr(0, 3).y}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
            />
            {[1, 2.5].map((c) =>
              [-1, 1].map((sg) => (
                <g key={`${c}${sg}`}>
                  <path
                    d={Array.from({ length: 41 }, (_, i) => {
                      const u = -2 + (4 * i) / 40;
                      const p = scr(
                        Math.sqrt(c) * Math.sinh(u),
                        sg * Math.sqrt(c) * Math.cosh(u),
                      );
                      return `${i ? "L" : "M"} ${p.x} ${p.y}`;
                    }).join(" ")}
                    fill="none"
                    stroke={alpha(colors.primary, 0.6)}
                    strokeWidth={4}
                  />
                  <path
                    d={Array.from({ length: 41 }, (_, i) => {
                      const u = -2 + (4 * i) / 40;
                      const p = scr(
                        sg * Math.sqrt(c) * Math.cosh(u),
                        Math.sqrt(c) * Math.sinh(u),
                      );
                      return `${i ? "L" : "M"} ${p.x} ${p.y}`;
                    }).join(" ")}
                    fill="none"
                    stroke={alpha(colors.highlight, 0.5)}
                    strokeWidth={4}
                  />
                </g>
              )),
            )}
            <line
              x1={scr(-4, -4).x}
              y1={scr(-4, -4).y}
              x2={scr(4, 4).x}
              y2={scr(4, 4).y}
              stroke={colors.orange}
              strokeWidth={8}
            />
            <line
              x1={scr(-4, 4).x}
              y1={scr(-4, 4).y}
              x2={scr(4, -4).x}
              y2={scr(4, -4).y}
              stroke={colors.orange}
              strokeWidth={8}
            />
            <line
              x1={O.x}
              y1={O.y}
              x2={scr(ev.x, ev.t).x}
              y2={scr(ev.x, ev.t).y}
              stroke={colors.primary}
              strokeWidth={6}
            />
            <circle
              cx={scr(ev.x, ev.t).x}
              cy={scr(ev.x, ev.t).y}
              r={18}
              fill={colors.primary}
            />
          </g>
          <text
            x={scr(2.4, 2.4).x + 20}
            y={scr(2.4, 2.4).y}
            fill={colors.orange}
            fontSize={44}
            fontWeight={800}
          >
            {tx.lightCone}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1340,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 16,
              border: `5px solid ${colors.green}`,
              background: alpha(colors.bg, 0.85),
              color: colors.green,
              fontSize: 54,
              fontWeight: 900,
              opacity: fadeIn(frame, c1 + 20),
              translate: riseIn(frame, c1 + 20, 12),
            }}
          >
            (+, −, −, −)
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 50,
              fontWeight: 800,
              color: colors.primary,
              opacity: fadeIn(frame, c1 + 40),
            }}
          >
            t² − x² = {(ev.t * ev.t - ev.x * ev.x).toFixed(2)}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
