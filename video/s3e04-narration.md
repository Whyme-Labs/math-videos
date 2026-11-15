# S3E04 narration script

Voiceover script for *Fourier Is Duality*, generated from `src/s3e04/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s3/e04-fourier-is-duality.md`.

## Cold open: why waves?

1. Why do we always break signals into waves?
2. Your phone does it to music thousands of times a second.
3. There are endless orthonormal bases. Why this one?
4. Slide a bump to the right: a brand-new function.
5. Slide a parabola: another new function.
6. Slide the helix e^(iωt): same helix, times one number.
7. It's an eigenvector of every shift at once.
8. Fourier analysis is the representation theory of shifts.

## Title

1. Season three, episode four. Fourier is duality.

## What shifts want: characters

1. Shifts form a group: slide by a, then by b, is a + b.
2. Look for functions that every shift only rescales.
3. Set f(0) = 1. Then f(x + y) = f(x) f(y).
4. Those are characters: homomorphisms to the unit circle.
5. On ℤ/8: χₖ(j) = ωʲᵏ, a pointer walking k steps a time.

## Orthogonality by shifting the sum

1. Add up a nontrivial character over the whole group.
2. Shift the sum: it gets multiplied by χ(h) ≠ 1.
3. But a shifted sum is the same sum. So it's 0.
4. So characters are orthogonal: n of them, a basis.
5. The Fourier transform: coordinates in that basis.

## The DFT matrix

1. For ℤ/n, write the characters as rows of a matrix.
2. A grid of little clock hands: the DFT matrix.
3. Divided by √n, it's unitary: a rotation of ℂⁿ.
4. In the new basis, every shift is diagonal.
5. So convolution becomes plain multiplication.

## The FFT butterfly

1. Split the samples into even and odd.
2. Two half-size DFTs, glued by a butterfly.
3. Repeat: n log n steps instead of n².
4. n = 2²⁰: a trillion steps down to twenty million.

## A group and its dual

1. Characters form a group of their own: the dual Ĝ.
2. Like V and V*: vectors and covectors.
3. ℤ/n matches its dual, but only once you pick ω.
4. The dual of the dual needs no choice at all.
5. Circle ↔ integers. Integers ↔ circle. ℝ ↔ ℝ.
6. Pontryagin: every such group is its dual's dual.

## ℝ, L² and Plancherel

1. On ℝ, e^(2πiξx) never fades. It isn't in L².
2. Like δ, it lives just outside the space.
3. Sums over characters become integrals.
4. Plancherel: the Fourier transform is unitary on L².
5. A Gaussian fits inside, and maps to itself.

## Act I montage

1. Fields were vector spaces: dimension.
2. Groups and operators were modules: Jordan form.
3. Groups acted by matrices: the trace.
4. And Fourier was duality: the dual space.

## End card

1. Fourier's waves are the characters of the shift group.
2. Transforming is measuring against every character.
3. Next: leave flat space behind. Manifolds.
