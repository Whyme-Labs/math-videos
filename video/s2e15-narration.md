# S2E15 narration script

Voiceover script for *Unitary Spaces*, generated from `src/s2e15/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e15-unitary-spaces.md`.

## Cold open: Berlin, 1932

1. Berlin, 1932. John von Neumann publishes the mathematics of quantum mechanics. A particle's state is a vector, and its entries are complex numbers.
2. Lengths of those vectors give probabilities, so they'd better be positive. Try the dot product on the vector (1, i): one times one, plus i times i. Zero.
3. A vector that isn't zero has length zero. And (1, 2i) is worse: its squared length comes out minus 3.
4. Today: one bar over one letter that repairs geometry for the complex numbers.

## Title

1. Season two, episode fifteen. Unitary spaces.

## The conjugate bar

1. A complex number times itself spins twice as fast, and its sign wanders. A complex number times its conjugate doesn't spin at all: it's the length squared.
2. So the complex inner product conjugates one slot. Now the squared length of (1, i) is 1 plus 1: two.

## Unitary maps

1. A map that keeps complex lengths is called unitary. In the right basis it just turns each coordinate around its own circle.
2. Change the basis and its matrix fills with numbers, but the eigenvalues stay put, every one of them on the unit circle.

## Schur and the spectral theorem

1. In 1909 Schur proved that any complex map is triangular in some orthonormal basis.
2. If the map also commutes with its adjoint, the triangle empties out and it's diagonal. Hermitian maps get real eigenvalues; unitary maps get eigenvalues on the circle.

## The Fourier transform is unitary

1. Now the payoff. Break a signal into frequencies with the discrete Fourier transform. It's a unitary map.
2. So the energy is the same in time and in frequency, and running it backwards is just the conjugate transpose. Every audio file and phone call leans on that.

## End card

1. Over the complex numbers, length needs a conjugate. With it, unitary maps keep lengths and just spin.
2. Next episode: the exact moment a stack of sheets becomes an arrow. The gradient, finally explained.
