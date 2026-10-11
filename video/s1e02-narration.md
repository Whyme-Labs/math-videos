# S1E02 narration script

Voiceover script for *Peano: Zero and "Next"*, generated from
`src/s1e02/narration.ts`, which is the source of truth. Each line is one
caption. Condensed from `lessons/s1/e02-peano-zero-and-next.md` and edited
with the `unslop` and `humanizer` skills in `.claude/skills`.

## Title

1. Season one, episode two. Zero and next.

## Cold open

1. Imagine teaching a machine to count. It knows no digits, no apples, no number line.
2. What's the least you could tell it so it counts forever and never gets stuck?
3. Rule one: there's a starting point. Call it zero.
4. Rule two: every number has a next one.
5. Is that enough?

## Three broken worlds

1. It isn't. These two rules still allow some strange worlds.
2. A loop: after two, next brings you back to zero, like a clock.
3. A merge: after three, next goes back to two, and counting gets stuck.
4. Ghosts: a second chain sits beside ours, and counting up from zero never reaches it.

## Peano's five rules

1. In 1889, Giuseppe Peano wrote down five rules that rule out all of them.
2. The first two we already have: zero is a number, and every number has a next.
3. Rule three: zero is not the next of anything. The loop breaks.
4. Rule four: different numbers have different nexts. The merge comes apart.
5. Rule five, induction, removes the ghosts. To see how, line up some dominoes.

## Induction as dominoes

1. Stand the numbers up as dominoes, with zero first.
2. Push zero over. Each falling domino knocks over the next one.
3. So every domino falls. That is induction.
4. The ghosts stand on a second table, and nothing ever pushes them.
5. Rule five says there is no second table. Every number is reached from zero by taking next.

## A first proof

1. Here's a first proof. Claim: every number except zero is the next of some number.
2. Let A hold zero, plus every number that is a next.
3. Zero is in A. The next of any number is a next, so it's in A too.
4. By induction, A holds every number. Done.
5. Among the ghosts the claim fails: zero-prime isn't zero, and nothing comes before it.

## Dedekind: only one world

1. Do these rules catch every broken world? Yes. Dedekind proved it in 1888, a year before Peano's list.
2. Take two worlds that obey all five rules. One counts with dots, the other with tally marks.
3. Match zero with zero, then each next with the next.
4. The rules make it a perfect match, with nothing left over and nothing matched twice.
5. So up to renaming there is only one such world. We call it the natural numbers.

## Build or describe?

1. Notice what we never said: what zero is made of.
2. Peano only described how numbers behave, and that was enough to pin them down.
3. Episode four builds them out of sets, and Dedekind's theorem says we'll get the same numbers.

## The fine print

1. One catch. Rule five talks about every set of numbers.
2. Many logicians only allow sets you can describe with a formula.
3. There are far fewer formulas than sets, so some sets never get checked.
4. Then strange models sneak back in: the usual numbers, followed by chains with no first and no last element.
5. Episode thirteen comes back to them.

## End card

1. So far we have zero, next, and nothing else.
2. Next episode: where do plus and times come from? From next alone.
