import type React from "react";
import { useEffect, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { measureText } from "@remotion/layout-utils";
import { fonts } from "../theme";
import { colors } from "../theme";
import { glide, lerp } from "./motion";

// A formula that moves. Each step is a row of tokens; a token keeps its
// `id` from one step to the next, so between steps it slides to its new
// place (arcing up a little as it goes), terms that cancel fade and drop
// away, new ones rise in, and a token whose text changes under the same
// id cross-fades. `bar` puts a conjugate bar over a token; the bar drops
// in when it first appears. This replaces typing a formula and leaving it
// on screen: the algebra happens in front of the viewer.
//
// `at[k]` is the frame where the move into step k starts (`at[0]` is when
// the first step fades in). The row is centred on `x`; `y` is its top.

export type Tok = {
  readonly id: string;
  readonly t: string;
  readonly color?: string;
  readonly bar?: boolean;
};

const WEIGHT = 800;

const layout = (row: readonly Tok[], size: number, family: string) => {
  const widths = row.map(
    (k) =>
      measureText({
        text: k.t.replace(/ /g, " "),
        fontFamily: family,
        // a bare number is read as an invalid CSS size: pass pixels
        fontSize: `${size}px`,
        fontWeight: WEIGHT,
      }).width,
  );
  const total = widths.reduce((s, w) => s + w, 0);
  let x = -total / 2;
  const out = new Map<string, { x: number; w: number; tok: Tok }>();
  row.forEach((k, i) => {
    out.set(k.id, { x, w: widths[i], tok: k });
    x += widths[i];
  });
  return out;
};

export const Eq: React.FC<{
  readonly steps: readonly (readonly Tok[])[];
  readonly at: readonly number[];
  readonly x: number;
  readonly y: number;
  readonly size?: number;
  readonly family?: string;
  readonly dur?: number;
  readonly color?: string;
}> = ({
  steps,
  at,
  x,
  y,
  size = 96,
  family = fonts.math,
  dur = 16,
  color = colors.text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // measure only once the fonts are in: a width taken from the fallback
  // font would be cached and the whole row laid out wrong for good.
  // fonts.ready alone isn't enough (it can resolve before a face has even
  // started loading), so load this exact font for these exact characters.
  const [handle] = useState(() => delayRender("Eq: waiting for fonts"));
  const [ready, setReady] = useState(false);
  const sample = steps
    .flat()
    .map((k) => k.t)
    .join("");
  useEffect(() => {
    document.fonts
      .load(`${WEIGHT} ${size}px ${family}`, sample)
      .then(() => document.fonts.ready)
      .then(() => {
        setReady(true);
        continueRender(handle);
      });
  }, [handle, size, family, sample]);
  if (!ready) return null;
  const s = Math.max(0, at.filter((a) => frame >= a).length - 1);
  const cur = layout(steps[s], size, family);
  const prev = s > 0 ? layout(steps[s - 1], size, family) : null;
  const t = s > 0 ? glide(frame, at[s], fps, dur) : 1;
  const appear = (i: number) =>
    s > 0 ? 1 : glide(frame, at[0] + i * 2, fps, 10);

  type Piece = {
    key: string;
    text: string;
    left: number;
    dy: number;
    opacity: number;
    color: string;
    bar: number;
    w: number;
  };
  const pieces: Piece[] = [];
  const ids = new Set([...(prev ? prev.keys() : []), ...cur.keys()]);
  let i = 0;
  for (const id of ids) {
    const a = prev?.get(id);
    const b = cur.get(id);
    if (a && b) {
      const moved = Math.abs(a.x - b.x) > 1;
      const arc = moved ? -0.3 * size * Math.sin(Math.PI * t) : 0;
      const left = lerp(a.x, b.x, t);
      const w = lerp(a.w, b.w, t);
      const bar = lerp(a.tok.bar ? 1 : 0, b.tok.bar ? 1 : 0, t);
      if (a.tok.t !== b.tok.t) {
        pieces.push({
          key: `${id}-a`,
          text: a.tok.t,
          left,
          dy: arc,
          opacity: 1 - t,
          color: a.tok.color ?? color,
          bar,
          w,
        });
        pieces.push({
          key: `${id}-b`,
          text: b.tok.t,
          left,
          dy: arc,
          opacity: t,
          color: b.tok.color ?? color,
          bar,
          w,
        });
      } else {
        pieces.push({
          key: id,
          text: b.tok.t,
          left,
          dy: arc,
          opacity: 1,
          color: b.tok.color ?? color,
          bar,
          w,
        });
      }
    } else if (a) {
      pieces.push({
        key: id,
        text: a.tok.t,
        left: a.x,
        dy: t * 0.4 * size,
        opacity: 1 - t,
        color: a.tok.color ?? color,
        bar: a.tok.bar ? 1 : 0,
        w: a.w,
      });
    } else if (b) {
      const o = prev ? t : appear(i);
      pieces.push({
        key: id,
        text: b.tok.t,
        left: b.x,
        dy: (1 - o) * -0.3 * size,
        opacity: o,
        color: b.tok.color ?? color,
        bar: b.tok.bar ? 1 : 0,
        w: b.w,
      });
    }
    i++;
  }

  return (
    <div style={{ position: "absolute", left: x, top: y, height: size * 1.3 }}>
      {pieces.map((p) => (
        <span
          key={p.key}
          style={{
            position: "absolute",
            left: p.left,
            top: 0,
            whiteSpace: "pre",
            fontFamily: family,
            fontSize: size,
            fontWeight: WEIGHT,
            lineHeight: 1.3,
            color: p.color,
            opacity: p.opacity,
            translate: `0 ${p.dy}px`,
          }}
        >
          {p.text}
          {p.bar > 0 ? (
            <span
              style={{
                position: "absolute",
                left: p.w / 2 - Math.max(p.w * 0.76, size * 0.36) / 2,
                width: Math.max(p.w * 0.76, size * 0.36),
                top: size * 0.02 - (1 - p.bar) * size * 0.6,
                height: Math.max(6, size * 0.08),
                borderRadius: size * 0.04,
                background: colors.orange,
                opacity: p.bar,
              }}
            />
          ) : null}
        </span>
      ))}
    </div>
  );
};
