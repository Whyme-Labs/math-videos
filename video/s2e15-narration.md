# S2E15 narration script

Voiceover script for *Unitary Spaces*, generated from `src/s2e15/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e15-unitary-spaces.md`.

## Cold open: (1, i) has length zero

1. Berlin, 1932. Quantum mechanics, written in vectors.
2. A state is a vector with complex entries, like (1, i).
3. Its length gives probabilities. So let's measure it.
4. Last episode's rule: multiply matching entries and add.
5. 1·1 + i·i. That's 1 + (−1). Zero.
6. A nonzero arrow with length zero.
7. Try (1, 2i): 1 + (−4) = −3. Negative.
8. Today: one bar over one letter fixes all of it.

## Title

1. Season two, episode fifteen. Unitary spaces.

## No bilinear form works over ℂ

1. Could a cleverer formula, linear in both slots, work?
2. Suppose some arrow v gets a positive B(v, v).
3. Turn v a quarter turn: multiply by i.
4. Both slots pull out an i. i · i = −1.
5. So B(iv, iv) is negative. No such formula exists.

## Why the bar

1. Look at one complex number z on its circle.
2. z · z spins twice as fast. Its real part flips sign.
3. Mirror z across the real line: its conjugate.
4. Conjugate times z doesn't spin at all. It sits at |z|².
5. The conjugate undoes the turn and keeps the size.

## The complex inner product

1. So conjugate the second slot before multiplying.
2. Rule one: linear in the first slot.
3. Rule two: swap the slots and you get the conjugate.
4. Rule three: ⟨v, v⟩ is real and positive.
5. Now (1, i): 1·1 + i·(−i) = 1 + 1 = 2.
6. Unfold ℂ² into ℝ⁴: (1, 0, 0, 1). Length² 2 again.

## Unitary maps

1. Which maps keep these lengths? Unitary maps.
2. Each coordinate lives in its own complex plane.
3. The simplest unitary map turns each one on its circle.
4. Lengths can't change: each coordinate only turns.
5. Change the basis and the matrix fills with numbers.
6. But it's still the same turning, seen differently.

## Eigenvalues on the unit circle

1. Its eigenvalues must sit on the unit circle. Here's why.
2. Say Uv = λv. U keeps lengths, so ‖Uv‖ = ‖v‖.
3. Pull λ out of each slot: one comes out conjugated.
4. So |λ|² = 1: λ is on the unit circle.
5. Without the bar this gives λ², which proves nothing.

## Schur and the spectral theorem

1. Schur, 1909: over ℂ, every map gets triangular.
2. Pick an eigenvector, make it the first basis arrow.
3. Repeat in what's left. Zeros fill the lower corner.
4. If the map commutes with its conjugate transpose…
5. …the upper corner empties too. Diagonal.
6. Perpendicular eigen-axes, each with its own scale.

## Matrix land

1. Three special kinds of numbers on the complex plane.
2. Real numbers: the line. Hermitian matrices land here.
3. Unit numbers: the circle. Unitary matrices live there.
4. Positive numbers: the ray. Positive matrices.

## The Fourier transform is unitary

1. Now the payoff: a sound split into frequencies.
2. The discrete Fourier transform does it with a matrix.
3. Divided by √n, that matrix is unitary.
4. So energy is the same in time and in frequency.
5. Run it backwards with the conjugate transpose.
6. Every audio file and phone call leans on this.

## End card

1. Over ℂ, length needs a conjugate.
2. With it, unitary maps keep length and only turn.
3. Next: the gradient isn't an arrow. It's a stack.
