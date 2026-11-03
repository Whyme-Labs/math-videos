// The picture for the Eckart–Young scene: an 80 × 80 grayscale landscape
// (sky, sun, two ridges, a lake with the ridge reflected, a tree), its SVD
// by one-sided Jacobi, and the rank-k rebuilds as PNG data URLs.

export const N = 80;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

const make = (): number[][] => {
  const img: number[][] = [];
  for (let i = 0; i < N; i++) {
    const row: number[] = [];
    for (let j = 0; j < N; j++) {
      const x = j / N;
      const y = i / N;
      let v = 0.75 - 0.35 * y; // sky
      const sun = Math.hypot(x - 0.7, y - 0.22);
      v = Math.max(v, 1 - smooth(0.07, 0.09, sun));
      const far = 0.5 + 0.06 * Math.sin(x * 9) + 0.04 * Math.sin(x * 23 + 1);
      if (y > far) v = 0.45 - 0.1 * (y - far);
      const near = 0.6 + 0.08 * Math.sin(x * 5 + 2) + 0.03 * Math.sin(x * 31);
      if (y > near) v = 0.22 + 0.05 * Math.sin(x * 40) * Math.sin(y * 30);
      if (y > 0.74) {
        // the lake, with the far ridge mirrored
        const my = 0.74 - (y - 0.74) * 1.2;
        v = my < far ? 0.55 - 0.3 * (y - 0.74) : 0.32;
        v += 0.04 * Math.sin(y * 120);
      }
      // a tree
      const tx = Math.abs(x - 0.2);
      if (y > 0.36 && y < 0.72 && tx < (y - 0.36) * 0.35) v = 0.08;
      if (y >= 0.72 && y < 0.78 && tx < 0.012) v = 0.1;
      // a little grain, so the picture isn't secretly low-rank
      const h = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
      v += 0.05 * (h - Math.floor(h) - 0.5);
      row.push(clamp(v));
    }
    img.push(row);
  }
  return img;
};

// one-sided Jacobi: rotate column pairs of a copy of A until orthogonal;
// then the column norms are the σ's and A = U Σ Vᵀ.
const svd = (a: number[][]) => {
  const m = a.length;
  const n = a[0].length;
  const U = a.map((r) => r.slice());
  const V: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
  for (let sweep = 0; sweep < 12; sweep++) {
    let off = 0;
    for (let p = 0; p < n - 1; p++)
      for (let q = p + 1; q < n; q++) {
        let al = 0;
        let be = 0;
        let ga = 0;
        for (let i = 0; i < m; i++) {
          al += U[i][p] * U[i][p];
          be += U[i][q] * U[i][q];
          ga += U[i][p] * U[i][q];
        }
        if (Math.abs(ga) < 1e-12 * Math.sqrt(al * be)) continue;
        off = Math.max(off, Math.abs(ga) / Math.sqrt(al * be));
        const z = (be - al) / (2 * ga);
        const t = Math.sign(z || 1) / (Math.abs(z) + Math.sqrt(1 + z * z));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = c * t;
        for (let i = 0; i < m; i++) {
          const up = U[i][p];
          const uq = U[i][q];
          U[i][p] = c * up - s * uq;
          U[i][q] = s * up + c * uq;
        }
        for (let i = 0; i < n; i++) {
          const vp = V[i][p];
          const vq = V[i][q];
          V[i][p] = c * vp - s * vq;
          V[i][q] = s * vp + c * vq;
        }
      }
    if (off < 1e-10) break;
  }
  const sig = Array.from({ length: n }, (_, j) =>
    Math.sqrt(U.reduce((s, r) => s + r[j] * r[j], 0)),
  );
  const order = sig.map((_, j) => j).sort((x, y) => sig[y] - sig[x]);
  return {
    s: order.map((j) => sig[j]),
    u: order.map((j) => U.map((r) => (sig[j] > 1e-12 ? r[j] / sig[j] : 0))),
    v: order.map((j) => V.map((r) => r[j])),
  };
};

export const IMG = make();
export const SVD = svd(IMG);

export const rebuild = (k: number, only = false) => {
  const out = Array.from({ length: N }, () => new Array<number>(N).fill(0));
  for (let l = only ? k - 1 : 0; l < k; l++) {
    const { s, u, v } = { s: SVD.s[l], u: SVD.u[l], v: SVD.v[l] };
    for (let i = 0; i < N; i++) {
      const a = s * u[i];
      for (let j = 0; j < N; j++) out[i][j] += a * v[j];
    }
  }
  return out;
};

// grayscale → PNG data URL; a single layer (signed) is shown around mid-grey
const cache = new Map<string, string>();
export const toUrl = (key: string, m: number[][], signed = false) => {
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = N;
  c.height = N;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const data = ctx.createImageData(N, N);
  let mx = 0;
  if (signed)
    for (const r of m) for (const x of r) mx = Math.max(mx, Math.abs(x));
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      const raw = m[i][j];
      const v = clamp(signed ? 0.5 + (0.5 * raw) / (mx || 1) : raw);
      const o = 4 * (i * N + j);
      data.data[o] = Math.round(255 * (0.08 + 0.92 * v));
      data.data[o + 1] = Math.round(255 * (0.12 + 0.88 * v));
      data.data[o + 2] = Math.round(255 * (0.11 + 0.85 * v));
      data.data[o + 3] = 255;
    }
  ctx.putImageData(data, 0, 0);
  const url = c.toDataURL("image/png");
  cache.set(key, url);
  return url;
};
