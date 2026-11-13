# S2E31 narration script

Voiceover script for *Spectrum and Quantum Mechanics*, generated from `src/s2e31/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e31-spectrum-and-quantum-mechanics.md`.

## Cold open: position has no eigenvalues

1. Multiply a function on [0, 1] by x. Simple, linear.
2. x·f = λf forces f to live at the single point λ.
3. A function at one point is zero. No eigenvectors.
4. In quantum mechanics, multiplying by x is position.
5. Textbook rule: measured values are eigenvalues.
6. Position has none, yet detectors record it all day.
7. Eigenvalues were the wrong idea in infinite dimensions.
8. The fix is the spectrum: where T − λ fails to invert.

## Title

1. Season two, episode thirty-one. The spectrum.

## The right shift

1. The right shift: S(x₁, x₂, …) = (0, x₁, x₂, …).
2. Sx = λx? Then λx₁ = 0, λx₂ = x₁, λx₃ = x₂, …
3. Every coordinate falls to 0: S has no eigenvalues.
4. Yet S isn't onto: nothing maps to e₁ = (1, 0, 0, …).
5. One-to-one, not onto: impossible in finite dimensions.

## The spectrum

1. Ask instead: is T − λ invertible? If not, λ ∈ σ(T).
2. Three ways to fail: not one-to-one (an eigenvalue)…
3. …onto a dense part only, or onto a thin part.
4. For |λ| > ‖T‖, a geometric series inverts T − λ.
5. So σ(T) is closed, inside the disk of radius ‖T‖.
6. Liouville's theorem: over ℂ, σ(T) is never empty.

## The two examples solved

1. The shift: for |λ| < 1, the geometric vector v is in ℓ².
2. Every output of S − λ is perpendicular to v.
3. So σ(S) is the closed unit disk. Still no eigenvalues.
4. Multiplying by x: off [0, 1], 1/(x − λ) inverts it.
5. For λ in [0, 1], tall thin bumps nearly solve xf = λf.
6. ‖(M − λ)fₙ‖ ≤ 1/n. So σ(M) = [0, 1], all continuous.

## Why X and P are unbounded

1. Physics wants XP − PX = iħ. Can X and P be bounded?
2. Matrices: no. tr(XP − PX) = 0, but tr(iħI) isn't.
3. Bounded operators: XPⁿ − PⁿX = n·iħ·Pⁿ⁻¹.
4. Take norms: nħ ≤ 2‖X‖‖P‖ for every n. Impossible.
5. So X and P can't both be bounded.
6. Hellinger–Toeplitz: they live on a dense domain only.

## The spectral theorem as multiplication

1. Spectral theorem: a self-adjoint A is multiplication…
2. …by a real function g, in the right coordinates.
3. Episode 18 was the discrete case: diag(λ₁, …, λₙ).
4. Position is already multiplication by x.
5. Momentum: the Fourier transform turns it into ħk.

## The quantum mechanics dictionary

1. The dictionary: a state is a unit vector ψ.
2. An observable is self-adjoint. Outcomes: its spectrum.
3. Detectors ask: is X in [a, b]? Never: is X = 0.3?
4. Prob(a ≤ X ≤ b) = ∫ₐᵇ |ψ|². No eigenvector needed.
5. Cauchy–Schwarz on XP − PX gives ΔX · ΔP ≥ ħ/2.
6. Narrow in x means wide in k, and the other way round.

## End card

1. Spectrum: where T − λ fails to invert. Never empty.
2. Eigenvalues were the discrete special case all along.
3. Next: measure-preserving maps, and chaos.
