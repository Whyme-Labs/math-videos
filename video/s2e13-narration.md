# S2E13 narration script

Voiceover script for *When Diagonalization Fails*, generated from `src/s2e13/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e13-jordan-form.md`.

## Cold open: Paris, 1870

1. Paris, 1870. Camille Jordan publishes a treatise on substitutions, 667 pages long, and in it a simplest form for every linear map.
2. In 1874 Leopold Kronecker attacks it in public. Weierstrass had the same classification back in 1868, he says, and did it properly.
3. The quarrel is over what's left when last episode's trick fails: when a map doesn't have enough eigenvectors.
4. And it fails on something as ordinary as a deck of cards.

## Title

1. Season two, episode thirteen. When diagonalization fails.

## The shear has one eigen-direction

1. Push a deck of cards sideways: that's a shear. Horizontal arrows stay put, with eigenvalue 1. We need a second eigen-direction.
2. There isn't one. Every other arrow tilts. The eigenvalue 1 counts twice, but it owns only one line.

## A generalized eigenvector

1. Look at S minus the identity instead. It sends the vertical arrow to the horizontal one, and the horizontal one to zero.
2. So the vertical arrow is an eigenvector after two steps: a generalized eigenvector. Together the two make a little ladder.

## Jordan blocks

1. Jordan's theorem: on a complex space every map splits into blocks, each with one eigenvalue down the diagonal and ones just above it.
2. The ones are the nudge. They push each rung of a ladder down one step until it falls to zero. Diagonal, plus a little push.

## Payoff: critical damping

1. Here's where it shows up. A damped spring: too little damping and it swings, too much and it creeps. Two eigen-directions either way.
2. At the exact balance the two eigenvalues merge, the matrix becomes a Jordan block, and a new term appears: t times e to the minus t. Engineers call it critical damping.

## End card

1. When a map has too few eigenvectors, it's diagonal plus a nudge. That's the Jordan form, the map's complete fingerprint.
2. Next episode: a ruler for vectors. Lengths, angles, and what perpendicular really means.
