# S2E28 narration script

Voiceover script for *Hilbert Spaces*, generated from `src/s2e28/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e28-hilbert-spaces.md`.

## Cold open: the closest-point puzzle

1. In the plane, the closest point on a line is easy.
2. Drop a perpendicular. The error meets it square on.
3. Some spaces have no closest point. Gaps just shrink.
4. Now take every square-integrable function on [0, 1].
5. Sound clips, temperature curves, an electron's wave.
6. Pick the subspace of lines a + b·x.
7. Is there a closest line to x², error perpendicular?
8. Yes: with angles and completeness. Hilbert spaces.

## Title

1. Season two, episode twenty-eight. Hilbert spaces.

## An inner product is not enough

1. An inner product alone isn't enough.
2. In finite sequences, aim at the plane ⟨x, y⟩ = 0.
3. The closest point to e₁ needs every entry. Not allowed.
4. Without one, balls get corners and closest points split.
5. A Hilbert space has both: angles and completeness.

## The projection theorem

1. Projection: a closed convex C has one closest point.
2. Take cₙ in C, closer and closer to the best distance d.
3. Parallelogram law: ‖cₘ − cₙ‖² ≤ 2/n + 2/m.
4. So they're Cauchy, and completeness gives a limit p.
5. For a subspace, the error x − p is perpendicular to it.
6. So H = M ⊕ M⊥ for every closed subspace M.

## Riesz representation

1. Riesz: every continuous functional is ⟨x, y⟩ for one y.
2. Draw φ as a stack of parallel level hyperplanes.
3. Its kernel is closed, so drop a perpendicular z onto it.
4. y = z / ‖z‖² points across the stack, and ‖φ‖ = ‖y‖.
5. Example: ∫ f over [0, ½] is ⟨f, y⟩ with y = 1 on [0, ½].
6. H is its own dual. Banach spaces lost that. It's back.

## Orthonormal bases, Bessel and Parseval

1. The best line to x² on [0, 1] is x − 1/6. Error²: 1/180.
2. Add orthonormal directions e₁, e₂, e₃, one at a time.
3. Each step projects x again, and the error shrinks.
4. Bessel: Σ |⟨x, eₙ⟩|² ≤ ‖x‖². The pieces never overshoot.
5. Completeness sums the series. Parseval: equality.
6. So x = Σ ⟨x, eₙ⟩ eₙ, an infinite sum of shadows.

## There is only one ℓ²

1. Every separable Hilbert space has such a basis.
2. Read off coordinates: x ↦ (⟨x, e₁⟩, ⟨x, e₂⟩, …).
3. That map keeps lengths and angles, and lands in ℓ².
4. So L²[0, 1], L²(ℝ) and a quantum state space are all ℓ².
5. Don't build it. Describe it: the separable Hilbert space.
6. Bonus: f(t) = t and Parseval give Σ 1/n² = π²/6.

## End card

1. Inner product plus completeness: Euclid comes back.
2. Closest points, perpendiculars, H = H*, and one ℓ².
3. Next: Fourier. Functions as infinite vectors.
