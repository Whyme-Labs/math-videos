# S2E29 narration script

Voiceover script for *Fourier*, generated from `src/s2e29/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e29-fourier.md`.

## Cold open: a sound as a recipe of tones

1. Play one note on a violin, then on a flute. Same pitch.
2. Your ear still tells them apart. It hears their recipes.
3. Each sound splits into pure tones and overtones.
4. 1807: Fourier says every function splits like this.
5. Even a square wave, corners and all, from smooth waves?
6. Lagrange doubted it. The partial sums keep overshooting.
7. So is Fourier right? It depends on what '=' means.
8. Today: pure tones are perpendicular unit vectors.

## Title

1. Season two, episode twenty-nine. Fourier.

## Pure tones are orthonormal

1. The tones are eⁱⁿˣ, one for every whole number n.
2. Multiply two different tones and average: you get 0.
3. The positive and negative areas cancel exactly.
4. So the tones are orthonormal. A recipe entry is ⟨f, eₙ⟩.
5. The partial sum Sₙ f projects f onto the first tones.

## Convergence in energy, and Parseval

1. Project the square wave onto more and more tones.
2. The energy left over: 0.19, 0.10, 0.07, 0.04, …
3. It goes to 0. Sₙ f → f in L², for every f.
4. Parseval: the energy is the sum of the tones' energies.
5. So the Fourier map L² → ℓ² keeps every length and angle.
6. Square wave: 1 = (8/π²)(1 + 1/9 + 1/25 + …).
7. So 1 + 1/9 + 1/25 + … = π²/8, and Σ 1/n² = π²/6.

## The Gibbs overshoot

1. Pointwise, the overshoot near a jump never leaves.
2. N = 9, 49, 199: the peak stays near 1.179.
3. It gets thinner, so the energy it carries goes to 0.
4. In energy, Fourier is right. Pointwise, almost always.

## Differentiation is diagonal

1. Why did Fourier care? He was solving the heat equation.
2. d/dx eⁱⁿˣ = in·eⁱⁿˣ. Every tone is an eigenvector.
3. In this basis, d/dx is diagonal: …, −i, 0, i, 2i, …
4. So uₜ = uₓₓ splits into one easy equation per tone.
5. Tone n fades like e⁻ⁿ²ᵗ. High notes die first.
6. On a hot ring, the corners round off first.

## Other orthonormal bases

1. Fourier's basis is one of many.
2. Gram–Schmidt on 1, x, x², x³ gives Legendre: x² − ⅓, …
3. Hermite functions: the quantum oscillator's own states.
4. Haar wavelets: blocks that zoom in where a signal jumps.
5. Each basis diagonalises its own operator.

## End card

1. Fourier: a function is an infinite vector of tones.
2. Energy is kept, and derivatives become multiplications.
3. Next: compact operators. The spectral theorem survives.
