import type React from "react";
import { Tube, type V3 } from "../../shared/components/three3d";
import { colors } from "../../shared/theme";
import * as THREE from "three";

// The 3D stage shared by Shadow, Closest and Projector: the plane z = 0
// stands for everything the model can make (the column space), the arrow
// b points above it. Here ‖e‖ = 1, to match the data's ‖e‖² = 1.

export const B: V3 = [0.9, 0.5, 1];
export const P: V3 = [0.9, 0.5, 0];

export const ModelPlane: React.FC<{
  readonly opacity?: number;
  readonly size?: number;
}> = ({ opacity = 1, size = 2.4 }) => (
  <group>
    <mesh position={[0, 0, -0.002]}>
      <planeGeometry args={[2 * size, 2 * size]} />
      <meshStandardMaterial
        color={colors.violet}
        transparent
        opacity={0.35 * opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
    {Array.from({ length: 9 }, (_, i) => -size + (i * size) / 4).map((k) => (
      <group key={k}>
        <Tube
          points={[
            [k, -size, 0],
            [k, size, 0],
          ]}
          radius={0.005}
          color={colors.paper}
          opacity={0.3 * opacity}
        />
        <Tube
          points={[
            [-size, k, 0],
            [size, k, 0],
          ]}
          radius={0.005}
          color={colors.paper}
          opacity={0.3 * opacity}
        />
      </group>
    ))}
  </group>
);

// A right-angle mark at `at` between the unit directions u and v.
export const RightAngle: React.FC<{
  readonly at: V3;
  readonly u: V3;
  readonly v: V3;
  readonly s?: number;
  readonly color?: string;
  readonly opacity?: number;
}> = ({ at, u, v, s = 0.16, color = colors.text, opacity = 1 }) => {
  const p = (a: number, b: number): V3 => [
    at[0] + s * (a * u[0] + b * v[0]),
    at[1] + s * (a * u[1] + b * v[1]),
    at[2] + s * (a * u[2] + b * v[2]),
  ];
  return (
    <Tube
      points={[p(1, 0), p(1, 1), p(0, 1)]}
      radius={0.01}
      color={color}
      opacity={opacity}
    />
  );
};

export const Ball: React.FC<{
  readonly at: V3;
  readonly r?: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ at, r = 0.05, color, opacity = 1 }) => (
  <mesh position={[...at]}>
    <sphereGeometry args={[r, 20, 20]} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.3}
      transparent={opacity < 1}
      opacity={opacity}
    />
  </mesh>
);

export const norm = (v: V3) => Math.hypot(v[0], v[1], v[2]);
export const sub = (a: V3, b: V3): V3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
export const unit = (v: V3): V3 => {
  const n = norm(v) || 1;
  return [v[0] / n, v[1] / n, v[2] / n];
};

// A flat translucent triangle.
export const Tri: React.FC<{
  readonly a: V3;
  readonly b: V3;
  readonly c: V3;
  readonly color: string;
  readonly opacity?: number;
}> = ({ a, b, c, color, opacity = 0.2 }) => {
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([...a, ...b, ...c], 3),
  );
  return (
    <mesh geometry={g}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
