# S1E08 narration script

Voiceover script for *Building ℝ, Twice*, generated from `src/s1e08/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s1/e08-building-the-reals.md` and edited with the `unslop` and
`humanizer` skills in `.claude/skills`.

## Title

1. Season one, episode eight. Building the real numbers, twice.

## Cold open

1. Last time we found holes in the rationals. At root two there is nothing, and the hole has no edges to grab.
2. Adding root two, then root three, then pi, one name at a time, never ends. New holes keep turning up.
3. In 1872 two answers appeared. Dedekind: a number is a cut. Cantor: a number is where a swarm of fractions is heading.

## Dedekind's cut

1. Dedekind's idea: describe the hole by the fractions on its left. Take every fraction below zero or with square less than two.
2. That set has no largest member. From one, last episode's rule climbs to four thirds, seven fifths, twenty-four seventeenths, forever.
3. And no fraction sits at its edge. So Dedekind declares that this set of fractions is root two.
4. Each fraction r gets a cut too: every fraction below r. The cuts are the new numbers.

## Cuts have no holes

1. Cuts are ordered by containment. A smaller number's cut sits inside a bigger one's.
2. Take any bounded pile of cuts and join them together. The union is a cut, and it's the least upper bound.
3. So the cuts have no holes. The hard part is multiplication, which needs a separate case for each pair of signs.

## Cantor's swarms

1. Cantor starts from sequences. One, 1.4, 1.41, 1.414 crowd together near the hole.
2. So do three halves, seventeen twelfths and 577 over 408, from the other side. Two swarms heading for one spot.
3. The gap between them shrinks to zero. Call two such sequences the same and glue them, with the tool from episode five.
4. Each glued blob is a real number. Multiply term by term, and root two times root two is exactly two.

## Two machines, one ℝ

1. So one machine makes sets of fractions and the other makes classes of sequences. No number is literally the same in both.
2. Yet both give a complete ordered field: arithmetic, order, and no holes. And any two such fields match up exactly.
3. We built the reals twice and can now describe them once: the complete ordered field. The scaffolding can go.

## The tower

1. The tower gets its real floor. Every bounded set has a least upper bound, and every swarm lands.
2. What did we lose? Most real numbers will never have a finite name. Episode twelve shows why.

## End card

1. A hole is filled by its own description: everything to its left, or every swarm flying toward it.
2. Next episode: 0.999 repeating and one name the same real number. So what is a decimal, really?
