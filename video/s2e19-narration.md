# S2E19 narration script

Voiceover script for *The Singular Value Decomposition*, generated from `src/s2e19/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e19-svd.md`.

## Cold open: every circle becomes an ellipse

1. Pick any four numbers. Put them in a 2 × 2 matrix.
2. Apply it to a circle.
3. An ellipse. Always a perfect ellipse.
4. Try another. And another. Shears, flips, squashes.
5. Every time: an ellipse with axes at right angles.
6. A perpendicular pair always lands on a perpendicular pair.
7. Every map is secretly simple: turn, stretch, turn.
8. Today: the singular value decomposition.

## Title

1. Season two, episode nineteen. The SVD.

## Two bases, not one

1. Eigenvectors want Av ∥ v: one basis for both sides.
2. A 3 × 2 matrix sends ℝ² into ℝ³. Parallel makes no sense.
3. New idea: one perpendicular basis in, another one out.
4. Ask for Av₁ = σ₁u₁ and Av₂ = σ₂u₂.
5. Each input axis lands on an output axis, stretched.

## The proof from AᵀA

1. Where do the v's come from? From AᵀA.
2. AᵀA is symmetric: perpendicular eigen-axes v.
3. Its stretches are never negative: ⟨AᵀAv, v⟩ = ‖Av‖².
4. Push the v's through A. Their images stay perpendicular.
5. Their lengths are σ = √λ. Scale them down: the u's.
6. So AV = UΣ, and A = UΣVᵀ.

## Rotate, stretch, rotate

1. Read it right to left. Vᵀ turns the sphere.
2. Σ stretches along the axes.
3. U turns the result into place.
4. Sphere in, ellipsoid out. The semi-axes are σᵢuᵢ.
5. Every linear map does exactly this.

## A worked example

1. An example: A = [3 0; 4 5].
2. AᵀA = [25 20; 20 25]. Stretches 45 and 5.
3. So σ₁ = √45 ≈ 6.7 and σ₂ = √5 ≈ 2.2.
4. The biggest stretch is the size of A: ‖A‖ = 6.7.
5. Their product is |det A| = 15: the area scale.
6. Their ratio, 3, says how much A can blow up errors.

## Rectangular maps

1. Rectangular maps work too. A 3 × 2 matrix:
2. the disc lands as a flat ellipse floating in 3D.
3. A 2 × 3 matrix crushes a ball onto an ellipse.
4. The crushed direction, σ = 0, is the kernel.

## Eckart–Young, layer by layer

1. Write A as layers: σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + …
2. Each layer is a rank-one picture, biggest first.
3. Keep the first k. That's the best rank-k copy.
4. No rank-k matrix gets closer. Eckart–Young, 1936.
5. A picture rebuilt: 1 layer, 5, 20, 50.
6. A 1000 × 1000 photo at 50 layers: a tenth of the numbers.

## Principal component analysis

1. A cloud of data points is a matrix too.
2. Its first singular direction is the main trend.
3. Project onto it: the best line through the cloud.
4. That's principal component analysis.

## The end of Part A

1. That ends Part A. Up to turns, a map is its σ's.
2. Every theorem so far assumed finite dimension.
3. What if the vectors are all functions on [0, 1]?
4. Infinitely many axes, all √2 apart. Nothing closes up.

## End card

1. Every map: turn, stretch, turn.
2. The stretches, the σ's, are all that's left.
3. Next: Part B. What breaks in infinite dimensions.
