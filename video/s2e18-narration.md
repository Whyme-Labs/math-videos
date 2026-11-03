# S2E18 narration script

Voiceover script for *The Spectral Theorem*, generated from `src/s2e18/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e18-spectral-theorem.md`.

## Cold open: three clean spin axes

1. Toss a box in the air with a spin. It wobbles.
2. Spin it about one of three axes, and it turns cleanly.
3. Every rigid object has three: a potato, a wrench, a book.
4. And the three are always at right angles.
5. A second puzzle: the curve 5x² + 4xy + 2y² = 1.
6. A tilted ellipse. Its long and short axes cross at 90°.
7. Both come from a symmetric matrix.
8. Today: why symmetric means perpendicular axes.

## Title

1. Season two, episode eighteen. The spectral theorem.

## When eigenvectors fail

1. Eigenvectors: directions a map only stretches.
2. A rotation has none. A shear has only one.
3. Some eigenbases are terrible: (1, 0) and (100, 1).
4. Almost parallel. Useless for measuring anything.
5. With an inner product, ask for perpendicular ones.

## Perpendicular axes force symmetry

1. Suppose A has perpendicular unit eigenvectors.
2. In that basis, A is a diagonal list of stretches.
3. Back on the usual axes: A = QDQᵀ.
4. Flip it across its diagonal: nothing changes. Aᵀ = A.
5. Symmetry is necessary. The theorem: it's enough, too.

## Real eigenvalues, perpendicular eigenvectors

1. Symmetric means ⟨Au, v⟩ = ⟨u, Av⟩: A moves across.
2. Take eigenvectors u and v, with stretches λ and μ.
3. Move A across: λ⟨u, v⟩ = μ⟨u, v⟩.
4. If λ ≠ μ, then ⟨u, v⟩ = 0. Perpendicular, forced.
5. The same trick over ℂ shows every λ is real.

## The perpendicular plane stays put

1. Now the key step. Take one eigen-arrow v.
2. Its perpendicular plane: everything at right angles to v.
3. A symmetric map sends that plane into itself.
4. Why: ⟨Aw, v⟩ = ⟨w, Av⟩ = λ⟨w, v⟩ = 0.
5. A shear doesn't. Its plane tips out of place.
6. So what's left never gets tangled with v.

## The proof by peeling

1. That's the whole proof. Find one eigen-arrow.
2. Split it off. What's left is symmetric again.
3. Find an eigen-arrow in there. Split again.
4. Repeat until you run out of room.
5. Perpendicular unit axes, one for every dimension.

## The tilted ellipse

1. Back to the tilted ellipse. Its matrix is [5 2; 2 2].
2. Its stretches are 6 and 1, along (2, 1) and (1, −2).
3. Perpendicular, as promised.
4. Turn to those axes: the curve is 6X² + Y² = 1.
5. No cross term. Semi-axes 1/√6 and 1.
6. An ellipse is a circle seen through a symmetric map.

## The second-derivative test

1. Same story in calculus: f = x³ − 3xy + y³.
2. Flat spots at (0, 0) and (1, 1). Which is which?
3. Second derivatives form a symmetric matrix: the Hessian.
4. At (0, 0) its stretches are 3 and −3.
5. Up along one axis, down along the other: a saddle.
6. At (1, 1): 3 and 9. Both positive: a bowl.

## A sum of stretched shadows

1. One more way to say it: A is a sum of stretched shadows.
2. Project onto each axis, stretch by λ, add up.
3. For the ellipse: A = 6 P₁ + 1 P₂.
4. Now functions of A make sense: √A = √6 P₁ + P₂.
5. Quantum measurements use exactly these shadows.

## End card

1. Symmetric maps only stretch, along perpendicular axes.
2. The axes peel off one at a time.
3. Next: every matrix, symmetric or not. The SVD.
