import type React from "react";
import { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

// Real 3D for the series, through @remotion/three. Everything is in math
// coordinates with z up: a point is [x, y, z]. The view is set by an
// azimuth and an elevation (radians) around `target`, so a scene orbits by
// animating `azimuth` from the frame number. The camera itself never moves:
// the world turns in front of it, which keeps every frame deterministic. WebGL draws lines one pixel
// wide, so curves and arrows here are tubes with a real radius.

export type V3 = readonly [number, number, number];

export const Stage3D: React.FC<{
  readonly width?: number;
  readonly height?: number;
  readonly azimuth: number;
  readonly elevation: number;
  readonly distance: number;
  readonly target?: V3;
  readonly fov?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({
  width = 1920,
  height = 1080,
  azimuth,
  elevation,
  distance,
  target = [0, 0, 0],
  fov = 35,
  style,
  children,
}) => (
  <ThreeCanvas
    width={width}
    height={height}
    camera={{ fov, near: 0.1, far: 200, position: [0, 0, distance] }}
    style={{ position: "absolute", ...style }}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={1.1} />
    <directionalLight position={[3, -4, 8]} intensity={1.6} />
    <directionalLight position={[-5, 3, 2]} intensity={0.5} />
    <group rotation={[-(Math.PI / 2 - elevation), 0, 0]}>
      <group rotation={[0, 0, -(azimuth + Math.PI / 2)]}>
        <group position={[-target[0], -target[1], -target[2]]}>
          {children}
        </group>
      </group>
    </group>
  </ThreeCanvas>
);

// The graph z = f(x, y) over a rectangle, or over a disc when `radius` is
// set (points outside are dropped). Smooth shaded, optionally translucent.
export const Surface: React.FC<{
  readonly f: (x: number, y: number) => number;
  readonly range: readonly [number, number, number, number];
  readonly res?: number;
  readonly color: string;
  readonly opacity?: number;
  readonly radius?: number;
}> = ({ f, range, res = 64, color, opacity = 1, radius }) => {
  const [x0, x1, y0, y1] = range;
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos: number[] = [];
    const idx: number[] = [];
    const id = (i: number, j: number) => i * (res + 1) + j;
    for (let i = 0; i <= res; i++)
      for (let j = 0; j <= res; j++) {
        let x = x0 + ((x1 - x0) * i) / res;
        let y = y0 + ((y1 - y0) * j) / res;
        if (radius !== undefined) {
          // squeeze the square onto the disc so the rim is smooth
          const u = (2 * i) / res - 1;
          const v = (2 * j) / res - 1;
          x = radius * u * Math.sqrt(1 - (v * v) / 2);
          y = radius * v * Math.sqrt(1 - (u * u) / 2);
        }
        pos.push(x, y, f(x, y));
      }
    for (let i = 0; i < res; i++)
      for (let j = 0; j < res; j++) {
        idx.push(id(i, j), id(i + 1, j), id(i + 1, j + 1));
        idx.push(id(i, j), id(i + 1, j + 1), id(i, j + 1));
      }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, [f, x0, x1, y0, y1, res, radius]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.55}
        metalness={0.05}
        depthWrite={opacity >= 1}
      />
    </mesh>
  );
};

// A thick polyline through `points`.
export const Tube: React.FC<{
  readonly points: readonly V3[];
  readonly radius?: number;
  readonly color: string;
  readonly opacity?: number;
  readonly closed?: boolean;
}> = ({ points, radius = 0.025, color, opacity = 1, closed = false }) => {
  const geom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      closed,
      "centripetal",
    );
    return new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 3),
      radius,
      10,
      closed,
    );
  }, [points, radius, closed]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
};

// An arrow from `from` to `to`: a tube shaft and a cone head.
export const Arrow3: React.FC<{
  readonly from: V3;
  readonly to: V3;
  readonly color: string;
  readonly radius?: number;
  readonly opacity?: number;
}> = ({ from, to, color, radius = 0.04, opacity = 1 }) => {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const d = b.clone().sub(a);
  const len = d.length();
  if (len < 1e-6) return null;
  const head = Math.min(len * 0.35, radius * 6);
  const dir = d.clone().normalize();
  const shaftEnd = b.clone().sub(dir.clone().multiplyScalar(head));
  const mid = a.clone().add(shaftEnd).multiplyScalar(0.5);
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir,
  );
  const headPos = shaftEnd.clone().add(dir.clone().multiplyScalar(head / 2));
  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.35}
      transparent={opacity < 1}
      opacity={opacity}
    />
  );
  return (
    <group>
      <mesh position={mid} quaternion={q}>
        <cylinderGeometry args={[radius, radius, len - head, 12]} />
        {mat}
      </mesh>
      <mesh position={headPos} quaternion={q}>
        <coneGeometry args={[radius * 2.6, head, 18]} />
        {mat}
      </mesh>
    </group>
  );
};

// A flat translucent square at height z (or any plane via position/rotation).
export const Sheet: React.FC<{
  readonly size: number;
  readonly z: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ size, z, color, opacity = 0.25 }) => (
  <mesh position={[0, 0, z]}>
    <planeGeometry args={[size, size]} />
    <meshStandardMaterial
      color={color}
      transparent
      opacity={opacity}
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  </mesh>
);

// A surface given by a parametrisation (u, v) ∈ [0, 1]² → [x, y, z], for
// shapes a graph over a rectangle can't give cleanly (a bowl cut off at an
// even height, a sphere, a cylinder).
export const ParamSurface: React.FC<{
  readonly p: (u: number, v: number) => V3;
  readonly res?: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ p, res = 48, color, opacity = 1 }) => {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos: number[] = [];
    const idx: number[] = [];
    const id = (i: number, j: number) => i * (res + 1) + j;
    for (let i = 0; i <= res; i++)
      for (let j = 0; j <= res; j++) pos.push(...p(i / res, j / res));
    for (let i = 0; i < res; i++)
      for (let j = 0; j < res; j++) {
        idx.push(id(i, j), id(i + 1, j), id(i + 1, j + 1));
        idx.push(id(i, j), id(i + 1, j + 1), id(i, j + 1));
      }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, [p, res]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.55}
        metalness={0.05}
        depthWrite={opacity >= 1}
      />
    </mesh>
  );
};

// The box (parallelepiped) spanned by three edge vectors from `origin`,
// flat-shaded and translucent, with its twelve edges drawn as thin tubes.
export const Box3: React.FC<{
  readonly a: V3;
  readonly b: V3;
  readonly c: V3;
  readonly origin?: V3;
  readonly color: string;
  readonly opacity?: number;
  readonly edge?: number;
}> = ({ a, b, c, origin = [0, 0, 0], color, opacity = 0.5, edge = 0.012 }) => {
  const P = (i: number, j: number, k: number): V3 => [
    origin[0] + i * a[0] + j * b[0] + k * c[0],
    origin[1] + i * a[1] + j * b[1] + k * c[1],
    origin[2] + i * a[2] + j * b[2] + k * c[2],
  ];
  const quads: V3[][] = [
    [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)],
    [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)],
    [P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)],
    [P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)],
  ];
  const pos: number[] = [];
  for (const [p, q, r, s] of quads)
    pos.push(...p, ...q, ...r, ...p, ...r, ...s);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  const edges: [V3, V3][] = [];
  for (const [i, j] of [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ]) {
    edges.push([P(0, i, j), P(1, i, j)]);
    edges.push([P(i, 0, j), P(i, 1, j)]);
    edges.push([P(i, j, 0), P(i, j, 1)]);
  }
  return (
    <group>
      <mesh geometry={g}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
          flatShading
        />
      </mesh>
      {edges.map(([p, q], k) => (
        <Tube key={k} points={[p, q]} radius={edge} color={color} />
      ))}
    </group>
  );
};

// A square grid of thin lines on the floor z = 0, from −n to n.
export const FloorGrid: React.FC<{
  readonly n: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ n, color, opacity = 0.25 }) => (
  <group>
    {Array.from({ length: 2 * n + 1 }, (_, i) => i - n).map((k) => (
      <group key={k}>
        <Tube
          points={[
            [k, -n, 0],
            [k, n, 0],
          ]}
          radius={k === 0 ? 0.008 : 0.004}
          color={color}
          opacity={opacity}
        />
        <Tube
          points={[
            [-n, k, 0],
            [n, k, 0],
          ]}
          radius={k === 0 ? 0.008 : 0.004}
          color={color}
          opacity={opacity}
        />
      </group>
    ))}
  </group>
);
