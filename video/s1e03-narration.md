# S1E03 narration script

Voiceover script for *Arithmetic from Scratch*, generated from
`src/s1e03/narration.ts`, which is the source of truth. Each line is one
caption. Condensed from `lessons/s1/e03-arithmetic-from-scratch.md` and edited
with the `unslop` and `humanizer` skills in `.claude/skills`.

## Title

1. Season one, episode three. Arithmetic from scratch.

## Cold open

1. Last time we pinned down counting with zero and next. Nothing else.
2. So here's a puzzle: can you prove that two plus two is four, using only next?
3. And why is three plus five the same as five plus three?

## Defining plus

1. Here's the trick: define plus by what it does to the second number.
2. Rule one: a plus zero is a. Adding zero changes nothing.
3. Rule two: a plus the next of b is the next of a plus b.
4. Watch two plus two. Each step peels a next off the right and wraps it around the outside.
5. When the right side reaches zero, rule one finishes the job. Four.

## 3 + 0 versus 0 + 3

1. But these rules only ever look at the second number.
2. Three plus zero: rule one, done in a single step.
3. Zero plus three: three rounds of peeling before it's done.
4. Same answer, different work. So why should the order never matter?

## Commutativity: three inductions

1. That order doesn't matter is a theorem, and proving it takes three inductions.
2. First: zero plus a is a.
3. Second: the next of a, plus b, is the next of a plus b.
4. Then the theorem itself. Its induction only goes through because the first two are down.
5. Three plus five equals five plus three, for every pair of numbers, proved from next.

## Cancellation needs rule four

1. Rule four earns its keep here: if a plus c equals b plus c, then a equals b.
2. In last episode's merge world it fails. One plus one and one plus three both land on two.

## Times

1. Times works the same way: a times zero is zero, and a times the next of b is a times b, plus a.
2. So two times three is three rows of two.
3. Three times two is two rows of three. Turn the rectangle and they match.
4. The picture is a hint. The proof is more induction.

## Order from plus

1. Even less-than comes for free: a is at most b when some c takes you from a to b.
2. Two to five: a jump of three.
3. Five to two: no jump works, because adding only moves you forward.

## Payoff

1. Every rule of school arithmetic is now a theorem, from five rules and two definitions.
2. But three plus x equals zero has no answer in these numbers.
3. Fixing that means building the integers, in episode six.

## End card

1. We built arithmetic out of next.
2. Next episode: what is next made of? We build the numbers out of sets.
