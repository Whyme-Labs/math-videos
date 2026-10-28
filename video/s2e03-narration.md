# S2E03 narration script

Voiceover script for *Linear Maps*, generated from `src/s2e03/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e03-linear-maps.md`.

## Cold open: London, 1821

1. London, 1821. Charles Babbage and John Herschel are checking a book of astronomical tables, and it is full of mistakes.
2. Babbage snaps: I wish to God these calculations had been executed by steam.
3. So he designs a machine that can only add. It works because taking differences respects adding and scaling.
4. Machines like that move vectors, and they're today's subject: linear maps.

## Title

1. Season two, episode three. Linear maps.

## The linearity test

1. Here's the test. Turn a sum of arrows, or turn each arrow and then add: same answer. Stretch then turn, or turn then stretch: same answer.
2. Rotations pass. So do shadows, derivatives, and shifting a list along. Squaring fails: the square of a sum isn't the sum of the squares.

## A basis decides the map

1. That test is strong. Tell a linear map where the two basis arrows go, and it has no choices left.
2. Every other arrow is a mix of the basis, so its image is the same mix of their images. The whole grid follows.

## Kernel, image, rank–nullity

1. A shadow at noon flattens space onto the floor. Everything that lands on zero, the whole vertical line, is the kernel. The floor it covers is the image.
2. And no dimension is lost: three in, one crushed, two out. Rank plus nullity always adds back to where you started.

## Payoff: Babbage's engine

1. Babbage's engine runs on this. For the squares 0, 1, 4, 9, 16, the differences are 1, 3, 5, 7, and their differences are all 2.
2. Taking differences is linear, and it crushes constants to zero. So the engine starts from a 2 and adds its way back up, column by column: 25, 36, 49, with no mistakes.

## End card

1. Linear maps respect adding and scaling. A basis decides them, and what they crush plus what they reach is everything.
2. Next episode: why matrices multiply row by column, and why turning then flattening isn't flattening then turning.
