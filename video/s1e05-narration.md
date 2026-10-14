# S1E05 narration script

Voiceover script for *The Master Tool: Equivalence Classes*, generated from
`src/s1e05/narration.ts`, which is the source of truth. Each line is one
caption. Condensed from `lessons/s1/e05-equivalence-classes.md` and
edited with the `unslop` and `humanizer` skills in `.claude/skills`.

## Title

1. Season one, episode five. The master tool: equivalence classes.

## Cold open

1. Is one half the same as two quarters?
2. As amounts, yes. Lay one over the other and the shaded parts match exactly.
3. As written, no. The pair one, two and the pair two, four are different pairs.
4. Clocks do this too. Fifteen hundred hours and three o'clock point the same way.
5. Different things, declared the same for a purpose. Today we learn to do that without breaking anything.

## Relations and the three properties

1. First, a relation is just a set of pairs: which things go with which.
2. Reflexive: everything goes with itself.
3. Symmetric: if a goes with b, then b goes with a.
4. Transitive: if a goes with b, and b goes with c, then a goes with c.
5. A relation with all three is an equivalence relation. This one is same remainder after dividing by three.

## "Close to" is not transitive

1. Some relations feel like sameness and still fail. Call two numbers close if they differ by less than one.
2. Zero is close to 0.6, and 0.6 is close to 1.2. But zero and 1.2 are not close.
3. Small differences add up, so close-to isn't transitive. You can't glue things together with it.

## Blobs: classes and the quotient

1. Now a real one: same remainder after dividing by twelve.
2. Related numbers drift together into a blob. Each blob is called an equivalence class.
3. Then treat each blob as one new point. Twelve blobs, twelve points: a clock.
4. Fifteen and three are in the same blob, so on the clock they are equal.
5. The set of blobs is called the quotient. Equal in the new world means related in the old one.

## Identical or disjoint: partitions

1. Can two blobs partly overlap? Suppose x sits in the blob of a and in the blob of b.
2. Then a goes with x and x goes with b, so a goes with b. It was one blob all along.
3. So two blobs are identical or completely separate. They cut the set into pieces, each element in exactly one. That's a partition.

## Well defined

1. To add on the clock, pick a member of each blob, add them, and see where the answer lands.
2. Nine plus five is fourteen, which lands in the blob of two.
3. Pick other members: twenty-one plus seventeen is thirty-eight. Same blob. Addition passes.
4. Now try two to the power n. Zero and twelve sit in the same blob.
5. Two to the zero is one. Two to the twelve is 4096, which leaves four. Different blobs, so this rule fails.
6. Every rule on blobs needs this check. A rule that passes is called well defined.

## Fractions as classes

1. Back to fractions. Call pairs p, q and r, s the same when p times s equals q times r.
2. The blob of one, two holds two, four and three, six and so on, all along one line.
3. That whole blob is the fraction one half. One half equals two quarters because they share a blob.
4. Allow zero over zero and it goes with every pair, so all the blobs glue into one. That's why the bottom can't be zero.

## The recipe

1. That's the whole recipe: raw descriptions, a rule for being the same, the blobs, and a check for every operation.
2. Next we use it to build the integers and the fractions, later the real numbers, and much more.

## End card

1. We decide what counts as the same, and then we check that our rules survive.
2. Next episode: three minus five, with only natural numbers. Pairs come to the rescue.
