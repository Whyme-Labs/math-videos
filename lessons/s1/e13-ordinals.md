# S1E13: Counting Past Infinity: Ordinals

> **Season / Act:** Season 1, Act III (Infinity and the Foundations Crisis) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E02 (Peano axioms; the planted remark about non-standard models), S1E03 (recursive definitions of + and ×), S1E04 (von Neumann numerals), S1E11 (bijections, countability), S1E12 (the ladder of cardinalities) ·
> **Builds toward:** S1E14 (Burali-Forti's paradox in the foundations crisis), S1E15 (Gödel's incompleteness; Gentzen's consistency proof via ε₀; well-ordering and Choice), side quest *Surreal numbers*

## Learning objectives
By the end of this lesson the viewer can:
1. Distinguish ordinals ("which position in line?") from cardinals ("how many?"), and explain why they agree for finite sets but not for infinite ones.
2. Define well-orders and von Neumann ordinals, and continue the construction 0, 1, 2, … past ℕ to ω, ω + 1, ω·2, ω², ω^ω, and ε₀.
3. Compute with ordinal addition and multiplication, including non-commutative examples like 1 + ω = ω ≠ ω + 1.
4. Compute Goodstein sequences in hereditary base notation, and explain how the decreasing ordinals prove that every Goodstein sequence reaches 0, and why Peano arithmetic cannot prove it.

## Cold open
*Narrator, over a game being played on a whiteboard:*

Let's play a game. Pick a number, say 4. Write it in base 2, and then go further: write the *exponents* in base 2 as well, all the way down. So 4 is $2^2$.

Now two moves. First, *bump the base*: replace every 2 with a 3. Our $2^2$ becomes $3^3$, which is 27. Second, subtract 1. We get 26.

Repeat. Write 26 in base 3 the same way, bump every 3 to a 4, subtract 1. You get 41. Then 60. Then 83. Then 109.

The numbers are growing. Bumping the base makes them bigger, and subtracting 1 barely makes a dent. Start with 19 instead of 4, and by the third step the number has over 150 digits.

So here's the question: does this sequence ever come back down to 0?

It seems absurd. And yet the answer is *yes*. Every such sequence, starting from any number, eventually hits 0. That's Goodstein's theorem.

Here's the stranger part. This is a statement about whole numbers: bumping bases and subtracting 1. But the proof needs numbers *beyond* infinity. And in 1982 it was shown that the usual axioms for whole numbers, the Peano axioms from Episode 2, can't prove it at all.

To see why, we have to learn to count past infinity.

## The story

### 1. The naive attempt: what comes after 0, 1, 2, …?

In ↩ S1E11 and ↩ S1E12 we measured infinite sets by *size*: two sets are the same size if they can be matched. Under that measure, adding one more element to ℕ changes nothing (the hotel shift).

But there's another way to use numbers. "Three" can mean *how many* (three apples) or *which one* (the third runner across the line). For finite collections the two meanings always agree. For infinite ones, they split apart.

Imagine runners crossing a finish line: runner 0, runner 1, runner 2, and so on forever. Now one more runner crosses after all of them. That runner is not "runner $n$" for any natural number $n$. Their position in line is genuinely new. The number of runners hasn't changed in the cardinal sense (↩ S1E11), but the *arrangement* has: there is now a last runner, where before there wasn't.

So the naive answer "nothing comes after 0, 1, 2, …" is right for *sizes* and wrong for *positions*. We need a number system for positions.

### 2. The crisis: what is a "position"?

A position only makes sense in a line where "first" always makes sense.

> **Definition (well-order).** A **well-order** on a set $W$ is a total order $<$ such that every nonempty subset of $W$ has a least element.

ℕ with its usual order is well-ordered (that's induction in disguise, ↩ S1E02). ℤ is not: the subset of negative integers has no least element. The non-negative rationals aren't either: $\{q > 0\}$ has no least element.

> **Definition (order isomorphism, order type).** Well-orders $(A, <)$ and $(B, <)$ are **order-isomorphic** if there is a bijection $f : A \to B$ with $a < a' \iff f(a) < f(a')$. Their shared "shape" is called their **order type**.

Order isomorphism is stricter than equinumerosity. Example: ℕ, and ℕ with one extra element placed after everything, have the same *size*, but they are not order-isomorphic: the second has a largest element and ℕ doesn't, and order isomorphisms preserve "having a largest element."

We want a canonical representative for each order type: a "number" that names each possible position.

### 3. The construction: von Neumann ordinals, continued past ℕ

In ↩ S1E04 we built the natural numbers as
$$0 = \varnothing,\quad 1 = \{0\},\quad 2 = \{0, 1\},\quad \ldots,\quad n + 1 = n \cup \{n\}.$$
Each number is the set of all numbers before it. Nothing in that recipe says "stop at the finite ones." So don't.

> **Definition (ordinal).** A set $\alpha$ is an **ordinal** if it is *transitive* (every element of $\alpha$ is also a subset of $\alpha$) and it is well-ordered by $\in$. For ordinals, we write $\alpha < \beta$ to mean $\alpha \in \beta$.

Key facts (each proved by short arguments from the definition, using the Axiom of Foundation or the well-ordering directly):
- Every element of an ordinal is an ordinal, and **each ordinal is the set of all smaller ordinals**: $\alpha = \{\beta : \beta < \alpha\}$.
- Any two ordinals are comparable: $\alpha < \beta$, $\alpha = \beta$, or $\beta < \alpha$.
- **Every well-ordered set is order-isomorphic to exactly one ordinal.** So ordinals are exactly the order types of well-orders.

Two ways to make new ordinals:
- **Successor:** $\alpha + 1 = \alpha \cup \{\alpha\}$, the next position.
- **Limit:** the union of a set of ordinals is an ordinal, its supremum.

The first infinite ordinal is the union of all the natural numbers:
$$\omega = \{0, 1, 2, 3, \ldots\}.$$
It is the first ordinal that is neither 0 nor a successor; it is a **limit ordinal**. And now we just keep going:
$$\omega + 1 = \omega \cup \{\omega\} = \{0, 1, 2, \ldots, \omega\},\qquad \omega + 2 = \{0, 1, 2, \ldots, \omega, \omega + 1\},\ \ldots$$
The union of all $\omega + n$ is $\omega + \omega = \omega \cdot 2$. Then $\omega \cdot 3$, …, and the union of all of those is $\omega \cdot \omega = \omega^2$. Then $\omega^3$, …, $\omega^\omega$, $\omega^{\omega^\omega}$, …

> **Definition (ε₀).** $\varepsilon_0 = \sup\{\omega,\ \omega^\omega,\ \omega^{\omega^\omega},\ \ldots\}$, the limit of the tower of ω's. It is the least ordinal $\varepsilon$ with $\omega^{\varepsilon} = \varepsilon$.

**Ordinal arithmetic** is defined by gluing well-orders, or, equivalently, by exactly the same recursion we used in ↩ S1E03, plus one clause for limits:

| | zero | successor | limit $\lambda$ |
|---|---|---|---|
| addition | $\alpha + 0 = \alpha$ | $\alpha + (\beta + 1) = (\alpha + \beta) + 1$ | $\alpha + \lambda = \sup_{\beta < \lambda}(\alpha + \beta)$ |
| multiplication | $\alpha \cdot 0 = 0$ | $\alpha \cdot (\beta + 1) = \alpha\cdot\beta + \alpha$ | $\alpha \cdot \lambda = \sup_{\beta < \lambda} \alpha\cdot\beta$ |
| exponentiation | $\alpha^0 = 1$ | $\alpha^{\beta + 1} = \alpha^\beta \cdot \alpha$ | $\alpha^\lambda = \sup_{\beta < \lambda} \alpha^\beta$ |

Picture: $\alpha + \beta$ is "a line of type $\alpha$, followed by a line of type $\beta$"; $\alpha \cdot \beta$ is "$\beta$ copies of $\alpha$, one after another." These operations are associative but **not commutative** (Example 1).

The workhorse principle for ordinals is the one we've already been using on ℕ, now extended:

> **Theorem (no infinite descent).** There is no infinite strictly decreasing sequence of ordinals $\alpha_0 > \alpha_1 > \alpha_2 > \cdots$.

**Proof.** Suppose there were one. The set $A = \{\alpha_0, \alpha_1, \alpha_2, \ldots\}$ is a nonempty set of ordinals; all its members are elements of $\alpha_0 + 1$, which is well-ordered by $<$. So $A$ has a least element, say $\alpha_k$. But $\alpha_{k+1} \in A$ and $\alpha_{k+1} < \alpha_k$, contradicting minimality. ∎

Equivalently, **transfinite induction** works: if a property holds for $\alpha$ whenever it holds for all $\beta < \alpha$, it holds for every ordinal (otherwise take the least counterexample).

### 4. Ordinals vs. cardinals

Here is the twist that ties this to ↩ S1E11. *Every ordinal listed so far is countable.* For example $\omega + 1$ is listed as $\omega, 0, 1, 2, \ldots$ (put the top element first); $\omega \cdot 2$ by interleaving its two copies of ω; $\omega^2$ by the Cantor pairing function (Example 3). Even $\varepsilon_0$ is a countable set. The ordinals climb through an enormous variety of *shapes* while the *size* stays at $|\mathbb{N}|$.

> **Definition (cardinal vs. ordinal).** The **ordinal** of a well-ordered set records its order type ("which position comes last, or what limit is reached"). The **cardinality** of a set records only its size up to bijection. For finite sets these coincide; for infinite sets, many different ordinals share one cardinality.

The set of all countable ordinals is itself an ordinal, called $\omega_1$, and it is uncountable (if it were countable it would be a countable ordinal, hence an element of itself, which ordinals never are). It is the first uncountable ordinal, and its cardinality is the next infinite size after $|\mathbb{N}|$, written $\aleph_1$. Whether $\aleph_1 = |\mathbb{R}|$ is the Continuum Hypothesis, ↪ S1E15.

And there is a ceiling we can't reach: there is **no set of all ordinals**. If there were, it would be transitive and well-ordered by $\in$, so it would itself be an ordinal $\Omega$, and then $\Omega \in \Omega$, i.e. $\Omega < \Omega$. This is the **Burali-Forti paradox** (1897), the first of the set-theoretic paradoxes, and one of the shocks that fed the foundations crisis of ↪ S1E14.

### 5. Goodstein's theorem: a fact about ℕ that needs ε₀

> **Definition (hereditary base-$b$ notation).** Write $n$ as a sum of powers of $b$ with coefficients less than $b$; then write each exponent the same way, recursively, until only numbers less than $b$ appear.

For example, in base 2:
$$266 = 2^8 + 2^3 + 2 = 2^{2^{3}} + 2^{3} + 2 = 2^{2^{2+1}} + 2^{2+1} + 2.$$

> **Definition (Goodstein sequence).** Start with $G_m(2) = m$. To get $G_m(b+1)$ from $G_m(b)$: if $G_m(b) = 0$, stop; otherwise write $G_m(b)$ in hereditary base $b$, replace every $b$ by $b + 1$ (the **bump**), and subtract 1.

> **Theorem (Goodstein, 1944).** For every $m$, the Goodstein sequence starting at $m$ eventually reaches 0.

**The idea.** Replace the base by ω. For a number $n$ written in hereditary base $b$, let $o_b(n)$ be the ordinal obtained by replacing every $b$ with ω. For instance $o_2(266) = \omega^{\omega^{\omega + 1}} + \omega^{\omega + 1} + \omega$. Every such ordinal is below $\varepsilon_0$ (only finitely many towers of ω's appear).

**Proof.**
1. *Bumping does not change the ordinal.* If $n$ is written in hereditary base $b$ and $n'$ is the bumped number in hereditary base $b + 1$, then the two expressions are identical except that $b$ became $b + 1$. Replacing either base by ω gives the same expression, so $o_{b+1}(n') = o_b(n)$.
2. *Subtracting 1 makes the ordinal strictly smaller.* For a fixed base $c$, the map $n \mapsto o_c(n)$ is strictly increasing: comparing two hereditary base-$c$ expressions works exactly like comparing their ordinal versions in Cantor normal form (compare leading exponents, recursively; then leading coefficients; then the remainders). Hence $o_c(n - 1) < o_c(n)$ for $n \ge 1$.
3. Combining 1 and 2, if $G_m(b) > 0$ then
$$o_{b+1}\big(G_m(b+1)\big) < o_{b+1}\big(\text{bump of } G_m(b)\big) = o_b\big(G_m(b)\big).$$
So as long as the sequence is nonzero, its ordinals form a strictly decreasing sequence.
4. By the no-infinite-descent theorem, this cannot go on forever. So some term is 0. ∎

The numbers explode, but the ordinals shrink. The base keeps growing, but ω doesn't care about the base: the bump is invisible to the ordinal, while each "−1" knocks it down a notch. And there is no infinite way down.

**Why Peano arithmetic can't prove it.** The proof used induction over ordinals up to $\varepsilon_0$. Peano arithmetic (PA) can carry out transfinite induction up to any *particular* ordinal below $\varepsilon_0$, but not up to $\varepsilon_0$ itself. In 1982, Laurie Kirby and Jeff Paris proved that this is not a weakness of the proof but of PA: **Goodstein's theorem is not provable in PA**, even though it is a statement purely about natural numbers, and true.

Be careful about what this means. For each *specific* $m$, PA can prove "the sequence starting at $m$ reaches 0," since that is a finite (if astronomically long) computation. What PA can't prove is the *general* statement "for every $m$."

This is the full-circle payoff of ↩ S1E02. There we saw that Peano's axioms with *full second-order* induction pin down ℕ uniquely, and planted the remark that *first-order* PA has non-standard models: structures that satisfy all the axioms but contain extra "numbers" beyond the standard ones. Since PA doesn't prove Goodstein's theorem, Gödel's completeness theorem guarantees a non-standard model of PA in which it is false. In that model, some starting value has a Goodstein sequence that never reaches 0. That starting value has to be one of the *non-standard* numbers, because every standard starting value really does reach 0.

## Worked examples

### Example 1: Order matters: 1 + ω vs. ω + 1, and 2·ω vs. ω·2

**$1 + \omega = \omega$.** $1 + \omega$ is one point, followed by a copy of ω:
$$\star,\ 0,\ 1,\ 2,\ 3,\ \ldots$$
The map $\star \mapsto 0$, $n \mapsto n + 1$ is an order isomorphism onto $0, 1, 2, 3, \ldots$ (it is a bijection, and it preserves order since $\star$ is first and $n < m \iff n+1 < m+1$). So $1 + \omega = \omega$. In the recursion: $1 + \omega = \sup_{n < \omega}(1 + n) = \sup\{1, 2, 3, \ldots\} = \omega$.

**$\omega + 1 \neq \omega$.** $\omega + 1$ is a copy of ω followed by one point:
$$0,\ 1,\ 2,\ 3,\ \ldots,\ \star.$$
This has a largest element ($\star$), and ω does not. An order isomorphism would send a largest element to a largest element, so none exists. Hence $\omega + 1 > \omega$, while $1 + \omega = \omega$: **addition is not commutative.**

**$2 \cdot \omega = \omega$.** $2 \cdot \omega$ is ω copies of 2: $(a_0, b_0), (a_1, b_1), (a_2, b_2), \ldots$, i.e.
$$a_0 < b_0 < a_1 < b_1 < a_2 < \cdots,$$
which is just a relabeled ω ($a_k \mapsto 2k$, $b_k \mapsto 2k + 1$).

**$\omega \cdot 2 = \omega + \omega$.** Two copies of ω:
$$0, 1, 2, \ldots,\ 0', 1', 2', \ldots$$
The element $0'$ has infinitely many predecessors, and nothing in ω does. So $\omega \cdot 2 \ne \omega$, while $2 \cdot \omega = \omega$: **multiplication is not commutative either.**

All four sets are countable, so as *cardinals* $1 + \aleph_0 = \aleph_0 + 1 = 2\cdot\aleph_0 = \aleph_0$. The ordinals see the difference; the cardinals don't.

### Example 2: The Goodstein sequence starting at 3, step by step

| base $b$ | term $G_3(b)$ | hereditary base $b$ | ordinal $o_b$ | next step |
|---|---|---|---|---|
| 2 | 3 | $2^1 + 1$ | $\omega + 1$ | bump: $3^1 + 1 = 4$; minus 1: $3$ |
| 3 | 3 | $3^1$ | $\omega$ | bump: $4^1 = 4$; minus 1: $3$ |
| 4 | 3 | $3$ | $3$ | bump: $3$ (no base appears); minus 1: $2$ |
| 5 | 2 | $2$ | $2$ | minus 1: $1$ |
| 6 | 1 | $1$ | $1$ | minus 1: $0$ |
| 7 | 0 | | $0$ | stop |

Sequence: $3, 3, 3, 2, 1, 0$. Ordinals: $\omega + 1 > \omega > 3 > 2 > 1 > 0$, strictly decreasing, exactly as the proof predicts. The interesting moment is base 3 → base 4: the term "$3^1$" loses its 1 and becomes "$4^1 - 1 = 3$," a plain digit less than the base. In ordinal terms, ω drops to a finite number: the descent from the infinite to the finite happens in one step.

### Example 3: The Goodstein sequence starting at 4 (the cold open)

**Base 2.** $4 = 2^2$, and the exponent $2 = 2^1$ is written as $2$. Ordinal: $\omega^\omega$.

**Bump and subtract.** $3^3 - 1 = 27 - 1 = 26$. In base 3: $26 = 2\cdot 3^2 + 2\cdot 3 + 2$. Ordinal: $\omega^2 \cdot 2 + \omega\cdot 2 + 2$.

**Continue.** Each line: bump the previous term, subtract 1, and rewrite.

| base | term | expansion | ordinal |
|---|---|---|---|
| 2 | 4 | $2^2$ | $\omega^\omega$ |
| 3 | 26 | $2\cdot 3^2 + 2\cdot 3 + 2$ | $\omega^2\cdot2 + \omega\cdot2 + 2$ |
| 4 | 41 | $2\cdot 4^2 + 2\cdot 4 + 1$ | $\omega^2\cdot2 + \omega\cdot2 + 1$ |
| 5 | 60 | $2\cdot 5^2 + 2\cdot 5$ | $\omega^2\cdot2 + \omega\cdot2$ |
| 6 | 83 | $2\cdot 6^2 + 1\cdot 6 + 5$ | $\omega^2\cdot2 + \omega + 5$ |
| 7 | 109 | $2\cdot 7^2 + 1\cdot 7 + 4$ | $\omega^2\cdot2 + \omega + 4$ |

Check the row for base 6: bump $2\cdot5^2 + 2\cdot5$ to $2\cdot6^2 + 2\cdot6 = 72 + 12 = 84$, subtract 1: $83 = 72 + 6 + 5 = 2\cdot6^2 + 1\cdot6 + 5$. ✓ Notice that the ordinal went from $\omega^2\cdot2 + \omega\cdot2$ down to $\omega^2\cdot2 + \omega + 5$: a "$\omega$" was traded for a finite amount (5 now, and the base minus 1 each later time this happens).

**How long does it take?** One can follow the pattern exactly. The last digit counts down to 0, which roughly doubles the base each time the middle digit decreases; when the middle digit is used up, the leading coefficient decreases and the base gets exponentiated. Carrying this out, the sequence starting at 4 reaches 0 only when the base reaches
$$3 \cdot 2^{402{,}653{,}211} - 1,$$
a number with about 121 million decimal digits. The ordinal argument guarantees termination without any of this bookkeeping.

**A taste of the explosion.** Start at 19 instead: $19 = 2^{2^2} + 2 + 1$. Bump and subtract: $3^{3^3} + 3 + 1 - 1 = 3^{27} + 3 = 7{,}625{,}597{,}484{,}990$. Next: $4^{4^4} + 4 - 1 = 4^{256} + 3$, a number with 155 digits. The corresponding ordinals are $\omega^{\omega^\omega} + \omega + 1$, then $\omega^{\omega^\omega} + \omega$, then $\omega^{\omega^\omega} + 3$: still decreasing.

### Example 4: ω² is countable (ordinal shape vs. cardinal size)

The ordinal $\omega^2 = \omega \cdot \omega$ is "ω copies of ω": the set of pairs $(a, b) \in \mathbb{N} \times \mathbb{N}$ ordered **lexicographically**, with $(a, b) < (a', b')$ iff $a < a'$, or $a = a'$ and $b < b'$. The pair $(a, b)$ sits at position $\omega\cdot a + b$.

As an *order*, it is very different from ω: the element $(1, 0)$ (position ω) has infinitely many predecessors.

As a *set*, the Cantor pairing function from ↩ S1E11, $\pi(a, b) = \frac{(a+b)(a+b+1)}{2} + b$, is a bijection onto ℕ. For instance the element at position $\omega\cdot 2 + 3$, i.e. $(2, 3)$, is sent to $\pi(2, 3) = \frac{5 \cdot 6}{2} + 3 = 18$. The bijection scrambles the order completely, which is allowed for cardinality and forbidden for ordinals. So $|\omega^2| = |\mathbb{N}|$ even though $\omega^2 \neq \omega$.

## Visual and animation notes
1. **Cold open:** a whiteboard with $4 = 2^2$; the 2s glow, morph into 3s, then "−1" ticks it down to 26 written as $2\cdot3^2 + 2\cdot3 + 2$. Numbers grow on a counter in the corner (4, 26, 41, 60, 83, 109, …); then flash the 19-sequence with its 155-digit third term scrolling off screen.
2. **Runners:** runners 0, 1, 2, … crossing a finish line, shrinking with distance; then one more runner crosses "after all of them," labeled ω.
3. **Key visual, the matchstick picture:** ω drawn as a row of matchsticks, each a fixed fraction shorter than the last, converging to a point. ω + 1 adds one full-size stick after the limit point. ω·2 is two such converging rows; ω² is a row of converging rows that itself converges. Then spiral the picture: each new level of the tower ω, ω^ω, ω^{ω^ω} is drawn as a tighter coil, and the spiral converges toward a point labeled ε₀. Reuse this in S1E15 (Gentzen).
4. **Russian dolls continued:** reprise S1E04's nested boxes $0, 1, 2, \ldots$; then a giant box containing all of them labeled ω, and a box containing that labeled ω + 1.
5. **Non-commutativity:** a single dot slides in front of an ω-row and is absorbed (1 + ω = ω); a dot placed after the row stays visibly separate (ω + 1).
6. **Shape vs. size split screen:** left, the matchstick ω² (ordered); right, the same matchsticks dumped into Hilbert's hotel rooms by the zig-zag of S1E11 (bijection motif). Caption: "same size, different shape."
7. **Goodstein ordinals:** two tracks. Upper track: the Goodstein numbers, a bar chart growing explosively (log scale). Lower track: the ordinals, drawn as matchstick diagrams, visibly losing a stick or a whole row at each step. The bump animates as "relabel the base" on the upper track while the lower track stays perfectly still; "−1" changes both.
8. **Burali-Forti:** a box labeled "all ordinals" tries to contain itself and bursts.
9. **Non-standard model teaser:** the number line ℕ, followed (after a gap) by a shadowy copy of ℤ-shaped blocks: "non-standard numbers." A Goodstein counter starting from one of the shadow numbers keeps running and never stops.

## Common misconceptions
- **Misconception:** "ω + 1 is a bigger infinity than ω." **Reality:** it is a later *position*, not a bigger *size*. As sets, ω + 1 and ω are equinumerous.
- **Misconception:** "ω is the largest natural number" or "ω = ∞." **Reality:** ω is not a natural number; it is the first ordinal after all of them. And there is no largest ordinal at all (Burali-Forti).
- **Misconception:** "Ordinal arithmetic is just cardinal arithmetic with different notation." **Reality:** ordinal addition and multiplication are not commutative ($1 + \omega \ne \omega + 1$), while infinite cardinal arithmetic is commutative but collapses ($\aleph_0 + 1 = \aleph_0$).
- **Misconception:** "Goodstein's theorem is unprovable, so we don't know whether it's true." **Reality:** it is *provable*, in set theory (or in PA plus transfinite induction up to ε₀). It is unprovable *in PA specifically*. Unprovability is always relative to a system.
- **Misconception:** "PA can't even verify that the sequence from 4 terminates." **Reality:** for each fixed starting value, termination is a finite computation and is provable in PA. Only the universal statement escapes PA.
- **Misconception:** "There's no infinite decreasing sequence of ordinals, so there's no infinite increasing one either." **Reality:** $0 < 1 < 2 < \cdots$ is infinite and increasing. Well-ordering forbids only infinite *descent*.

## Exercises
- **Warm-up (computational):** Compute the Goodstein sequence starting at 2, and at 5 for three steps (with hereditary notation and ordinals at each step). Write 100 in hereditary base 2 and give its ordinal.
- **Core (conceptual):** Simplify $\omega + \omega^2$ and $\omega^2 + \omega$, and explain which one equals $\omega^2$. Then explain why the set ℤ of integers, with its usual order, is not well-ordered, but ℤ *can* be well-ordered by some other order, of type ω (and also of type ω·2).
- **Stretch (proof):** Prove by transfinite induction that $\alpha + \beta \ge \beta$ for all ordinals $\alpha, \beta$, and that $0 + \beta = \beta$. Then prove that every ordinal is either 0, a successor, or a limit.

<details><summary>Hints and answers</summary>

- **Warm-up:** $m = 2$: $2 = 2^1$ (ordinal ω) → bump to $3^1 = 3$, minus 1 = 2 (ordinal 2) → 1 → 0. Sequence: $2, 2, 1, 0$. For $m = 5$: $5 = 2^2 + 1$ (ordinal $\omega^\omega + 1$) → $3^3 + 1 - 1 = 27$ ($= 3^3$, ordinal $\omega^\omega$) → $4^4 - 1 = 255 = 3\cdot4^3 + 3\cdot4^2 + 3\cdot4 + 3$ (ordinal $\omega^3\cdot3 + \omega^2\cdot3 + \omega\cdot3 + 3$) → bump to $3\cdot5^3 + 3\cdot5^2 + 3\cdot5 + 3 = 468$, minus 1 = 467. And $100 = 2^6 + 2^5 + 2^2 = 2^{2^2 + 2} + 2^{2^2 + 1} + 2^2$, with ordinal $\omega^{\omega^\omega + \omega} + \omega^{\omega^\omega + 1} + \omega^\omega$.
- **Core:** $\omega + \omega^2 = \omega^2$ (the leading ω is absorbed, as in $1 + \omega = \omega$), while $\omega^2 + \omega > \omega^2$. For ℤ: the negative integers have no least element. The listing $0, -1, 1, -2, 2, \ldots$ from S1E11 well-orders ℤ in type ω; putting $0, 1, 2, \ldots$ first and then $-1, -2, -3, \ldots$ gives type ω·2.
- **Stretch:** for $\alpha + \beta \ge \beta$: the case $\beta = 0$ is clear; at successors, $\alpha + (\beta + 1) = (\alpha + \beta) + 1 \ge \beta + 1$; at limits, $\alpha + \lambda = \sup_{\beta<\lambda}(\alpha + \beta) \ge \sup_{\beta<\lambda}\beta = \lambda$. For the trichotomy, if $\alpha \ne 0$ has a largest element $\beta$, then $\alpha = \beta + 1$; otherwise $\alpha$ is the union of its elements, a limit.

</details>

## Historical note
Georg Cantor met transfinite ordinals before he met infinite cardinals. In work on trigonometric series around 1872 he studied the *derived set* $P'$ of a set of points $P$ (its limit points), then $P''$, $P'''$, and so on, and he needed to continue the process "past infinity" to $P^{(\infty)}$ and beyond. In his 1883 *Grundlagen einer allgemeinen Mannigfaltigkeitslehre* ("Foundations of a General Theory of Manifolds") he introduced the transfinite numbers as positions generated by two principles, "add one" and "take the limit," which is the construction of Section 3. His two-part *Beiträge zur Begründung der transfiniten Mengenlehre* (1895, 1897) gave the mature theory of order types, ordinal arithmetic, the normal form, and the ε-numbers.

Cesare Burali-Forti published the paradox of the largest ordinal in 1897. The definition of ordinals as sets used in this lesson is due to John von Neumann (1923), at age 19.

Reuben Goodstein proved his theorem in 1944. Gerhard Gentzen had shown in 1936 that the consistency of Peano arithmetic can be proved using transfinite induction up to $\varepsilon_0$ (↪ S1E15). In 1982 Laurie Kirby and Jeff Paris proved that Goodstein's theorem is unprovable in PA, building on the Paris–Harrington theorem of 1977, the first "natural" mathematical statement shown to be independent of PA. In the same paper Kirby and Paris introduced the *hydra game*, another battle that seems unwinnable but always ends.

## Connections
- **Callbacks:** ↩ S1E02 (Peano; non-standard models of first-order PA, the promise kept here), ↩ S1E03 (recursive definitions of + and ×, now with a limit clause), ↩ S1E04 (von Neumann numerals $n + 1 = n \cup \{n\}$), ↩ S1E11 (countability; the pairing function), ↩ S1E12 (the ladder of cardinal sizes, now contrasted with the ladder of ordinal positions)
- **Sets up:** ↪ S1E14 (Burali-Forti and the paradoxes of the foundations crisis), ↪ S1E15 (Gödel's incompleteness explains why PA misses true statements like Goodstein's; Gentzen's ε₀; $\aleph_1$ and the Continuum Hypothesis; the well-ordering theorem and Choice)
- **Side quests:** *Surreal numbers* (attaches here: Conway's construction contains all ordinals, all reals, and infinitesimals in one ordered field)

## References
- **Primary / historical**
  - Georg Cantor, *Grundlagen einer allgemeinen Mannigfaltigkeitslehre* (1883); and "Beiträge zur Begründung der transfiniten Mengenlehre," *Mathematische Annalen* 46 (1895) and 49 (1897), English translation by P. E. B. Jourdain, *Contributions to the Founding of the Theory of Transfinite Numbers* (1915; Dover reprint).
  - John von Neumann, "Zur Einführung der transfiniten Zahlen," *Acta Litterarum ac Scientiarum (Szeged)* 1 (1923). (English translation in van Heijenoort, *From Frege to Gödel*, 1967.)
  - R. L. Goodstein, "On the Restricted Ordinal Theorem," *The Journal of Symbolic Logic* 9 (1944).
  - Laurie Kirby and Jeff Paris, "Accessible Independence Results for Peano Arithmetic," *Bulletin of the London Mathematical Society* 14 (1982).
- **Textbooks**
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 7 (Orderings and Ordinals) and Chapter 8 (Ordinals and Order Types).
  - Thomas Jech, *Set Theory*, 3rd millennium ed. (2003), Chapter 2 (Ordinal Numbers).
  - Paul Halmos, *Naive Set Theory* (1960), the sections on well ordering, transfinite induction, ordinal numbers, and ordinal arithmetic.
- **Accessible**
  - Stanford Encyclopedia of Philosophy, "The Early Development of Set Theory."
  - John H. Conway and Richard K. Guy, *The Book of Numbers* (1996), the chapter on infinite and infinitesimal numbers (ordinals and surreal numbers).
