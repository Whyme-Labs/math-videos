# S1E07: The Holes in ℚ

> **Season / Act:** Season 1 ("What Is a Number?"), Act II: Repairing the Defects · **Target runtime:** 18–22 min ·
> **Prerequisites:** S1E06 (ℚ as an ordered field); S1E03 (well-ordering of ℕ); school algebra; the Pythagorean theorem ·
> **Builds toward:** S1E08 (building ℝ by Dedekind cuts and Cauchy sequences), S1E09 (decimals as limits), S1E11–S1E12 (ℚ is countable, ℝ isn't), S2E23 (completing spaces of functions)

## Learning objectives
By the end of this lesson the viewer can:
1. Prove that $\sqrt 2$ is irrational: no rational number squares to 2.
2. Prove that ℚ is **dense**: between any two rationals there is another.
3. Define upper bound, least upper bound (supremum), and the least upper bound property, and prove that the set $\lbrace q \in \mathbb{Q} : q^2 < 2 \rbrace$ has no least upper bound in ℚ.
4. Define a Cauchy sequence of rationals, and show that the sequence $1, \tfrac32, \tfrac{17}{12}, \tfrac{577}{408}, \dots$ is Cauchy but has no limit in ℚ.
5. Explain why density does not imply "no gaps," and why repairing ℚ needs a genuinely new idea.

## Cold open
Draw a square, one unit on each side. Now draw its diagonal.

How long is it? The Pythagorean theorem says the diagonal squared equals one squared plus one squared, which is 2. So the diagonal is "the number whose square is 2."

For the Greek mathematicians around Pythagoras, numbers meant whole numbers and their ratios. They believed, roughly, that any two lengths could be measured with a common unit: make the unit small enough and both lengths are whole numbers of units. The side and the diagonal of the square should be, say, 5 units and 7 units, or 12 and 17, or *something*.

Then someone proved it's impossible. No unit, however tiny, measures both the side and the diagonal exactly. Later legend says the man who revealed this was drowned at sea for it. The legend is almost certainly made up, but the shock was real.

Today we'll see that shock from the inside. The fractions seem to be everywhere: between any two of them, there's always another one. Zoom into the number line and it looks completely solid. And yet, it's full of holes. Infinitely many of them, right next to every fraction you can name.

## The story

### 1. The naive picture: fractions are everywhere

After ↩ S1E06 we have ℚ, an ordered field: we can add, subtract, multiply, divide by nonzero numbers, and compare. It certainly *looks* like it fills the number line.

> **Theorem (density of ℚ).** If $x < y$ are rational, then there is a rational $z$ with $x < z < y$. Consequently, between any two distinct rationals there are infinitely many rationals.

*Proof.* Let $z = \frac{x + y}{2}$, which is rational. From $x < y$, adding $x$ gives $2x < x + y$, and adding $y$ gives $x + y < 2y$. Dividing by 2 (which preserves order, since $2 > 0$), $x < z < y$. Applying the same argument to $x$ and $z$, then to $x$ and the new midpoint, and so on, produces infinitely many distinct rationals between $x$ and $y$. ∎

Density is something ℤ didn't have (there's nothing between 0 and 1 in ℤ). It's tempting to conclude that ℚ has no gaps at all. Rationals can also approximate any length as closely as we like: $1.4$, $1.41$, $1.414$, $1.4142$, … are all rational, and their squares get as close to 2 as you want. So isn't the diagonal "basically" rational?

### 2. The crisis: √2 is not rational

> **Theorem (irrationality of √2).** There is no rational number $q$ with $q^2 = 2$.

*Proof.* Suppose, for contradiction, that $q^2 = 2$ with $q$ rational. Replacing $q$ by $-q$ if needed, we may assume $q > 0$, so $q = \frac{a}{b}$ with $a, b$ positive integers. Among all such representations, choose one with $b$ as small as possible (possible by the **well-ordering** of ℕ, ↩ S1E03). From $\frac{a^2}{b^2} = 2$ we get
$$a^2 = 2b^2 .$$
So $a^2$ is even. Then $a$ is even, because the square of an odd number $2k + 1$ is $4k^2 + 4k + 1$, which is odd. Write $a = 2c$. Then $4c^2 = 2b^2$, so
$$b^2 = 2c^2 .$$
By the same reasoning, $b$ is even: $b = 2d$. But then $q = \frac{a}{b} = \frac{2c}{2d} = \frac{c}{d}$ with $0 < d < b$, contradicting the minimality of $b$. ∎

Notice the structure: assume a solution, use well-ordering to pick the "smallest" one, and produce a smaller one. This **infinite descent** argument is one of the oldest proof techniques in mathematics.

So the diagonal of the unit square has *no* length in ℚ. And ↩ S1E01's question "is √2 a number?" gets its first precise answer: it is not a *rational* number. Whether it's a number at all depends on whether we can build a bigger system that contains it.

### 3. Precisely what's missing: least upper bounds

"ℚ doesn't contain √2" sounds like a single missing point. It's much worse than that, and to say *how* much worse we need precise language.

> **Definition (bounds).** Let $F$ be an ordered field (such as ℚ) and $S \subseteq F$.
> - $u \in F$ is an **upper bound** for $S$ if $s \le u$ for every $s \in S$. If $S$ has an upper bound, it is **bounded above**.
> - $u$ is a **least upper bound** or **supremum** of $S$, written $\sup S$, if $u$ is an upper bound for $S$ and $u \le u'$ for every upper bound $u'$ of $S$.

> **Definition (least upper bound property).** An ordered field $F$ has the **least upper bound property** (is **complete**) if every nonempty subset of $F$ that is bounded above has a least upper bound in $F$.

Every finite nonempty set has a supremum (its largest element). Infinite sets may not have a largest element but can still have a supremum: $\lbrace 1 - \frac1n : n \ge 1 \rbrace$ has no largest element but has supremum $1$ in ℚ.

Now consider
$$S = \lbrace q \in \mathbb{Q} : q^2 < 2 \rbrace .$$
It's nonempty ($1 \in S$) and bounded above by 2 (if $q \ge 2$ then $q^2 \ge 4 > 2$). In ℚ, it has **no** least upper bound. The proof rests on one clever map.

> **Lemma (the improvement map).** For rational $q > 0$, let
> $$q' = \frac{2q + 2}{q + 2}.$$
> Then $q'$ is rational and positive, and
> $$q' - q = \frac{2 - q^2}{q + 2}, \qquad q'^2 - 2 = \frac{2(q^2 - 2)}{(q + 2)^2}.$$
> So if $q^2 < 2$ then $q' > q$ and $q'^2 < 2$; and if $q^2 > 2$ then $q' < q$ and $q'^2 > 2$.

*Proof.* Direct computation: $q' - q = \frac{2q + 2 - q(q + 2)}{q + 2} = \frac{2 - q^2}{q + 2}$, and
$$q'^2 - 2 = \frac{(2q+2)^2 - 2(q+2)^2}{(q+2)^2} = \frac{4q^2 + 8q + 4 - 2q^2 - 8q - 8}{(q + 2)^2} = \frac{2q^2 - 4}{(q + 2)^2}.$$
Since $q + 2 > 0$, the signs follow. ∎

In words: from any positive rational that's too small, the map produces a strictly bigger one that's *still* too small; from any rational that's too big, a strictly smaller one that's *still* too big.

> **Theorem (the hole at √2).** The set $S = \lbrace q \in \mathbb{Q} : q^2 < 2 \rbrace$ is nonempty and bounded above, but has no least upper bound in ℚ. So **ℚ does not have the least upper bound property.**

*Proof.* First we identify the rational upper bounds of $S$: they are exactly the rationals $u > 0$ with $u^2 > 2$.
- Let $u$ be an upper bound. Since $1 \in S$, $u \ge 1 > 0$. We can't have $u^2 = 2$ (§2). If $u^2 < 2$, then $u \in S$ and, by the lemma, $u' \in S$ with $u' > u$, contradicting that $u$ is an upper bound. So $u^2 > 2$.
- Conversely, let $u > 0$ with $u^2 > 2$. If some $q \in S$ had $q > u$, then $q > u > 0$ would give $q^2 > u^2 > 2$, contradicting $q \in S$. So $u$ is an upper bound.

Now suppose $u$ were a least upper bound. Then $u > 0$ and $u^2 > 2$. By the lemma, $u' < u$ and $u'^2 > 2$, so $u'$ is a *smaller* upper bound. That contradicts leastness. ∎

The picture: the set $S$ creeps up toward a point from the left, the upper bounds creep down toward it from the right, the two sides never touch, and **there is nothing in between.** That "nothing" is a hole. (In ↪ S1E08, Dedekind will *define* the real number √2 to be this cut: the pair consisting of what's on the left and what's on the right.)

And √2 isn't special. The same argument works for $\sqrt 3$, $\sqrt 5$, $\sqrt[3]{2}$, and many others. In fact holes are everywhere: if $h$ is a hole and $r \ne 0$ is rational, then $r h + s$ "is" a hole for every rational $s$ (a rational multiple of an irrational, plus a rational, is irrational). So between any two rationals there are holes as well. ℚ is dense and riddled with holes at the same time.

### 4. Sequences with nowhere to go

There's a second, equivalent way to see the holes, through sequences. This view is the one that generalizes to spaces of functions in Season 2.

> **Definition (convergence and Cauchy sequences in ℚ).** Let $(a_n)$ be a sequence of rationals.
> - $(a_n)$ **converges** to $L \in \mathbb{Q}$ if for every rational $\varepsilon > 0$ there is an $N$ with $\lvert a_n - L \rvert < \varepsilon$ for all $n \ge N$.
> - $(a_n)$ is **Cauchy** if for every rational $\varepsilon > 0$ there is an $N$ with $\lvert a_m - a_n \rvert < \varepsilon$ for all $m, n \ge N$.

Every convergent sequence is Cauchy (if all terms are close to $L$, they're close to each other). The Cauchy condition is the one you can check *without knowing the limit*: the terms bunch up. A **complete** space is one where every Cauchy sequence converges. ℚ is not complete:

> **Theorem.** Define $x_1 = 1$ and $x_{n+1} = \dfrac{1}{2}\Big(x_n + \dfrac{2}{x_n}\Big)$. Every $x_n$ is rational, and $(x_n)$ is Cauchy, but it does not converge to any rational number.

*Proof sketch.* Write $e_n = x_n^2 - 2$. A short computation gives
$$e_{n+1} = \frac{e_n^2}{4x_n^2} .$$
So $e_n > 0$ for $n \ge 2$, i.e. $x_n^2 > 2$; and since $x_n - x_{n+1} = \frac{e_n}{2x_n} > 0$, the sequence decreases from $n = 2$ on, staying above 1. With $x_n \ge 1$ we get $e_{n+1} \le e_n^2/4$, and starting from $e_2 = \frac14$ this forces $e_n \to 0$ extremely fast.

*Cauchy:* for $m > n \ge 2$, we have $2 < x_m^2 < x_n^2$, and $x_n + x_m > 2$, so
$$0 < x_n - x_m = \frac{x_n^2 - x_m^2}{x_n + x_m} < \frac{x_n^2 - 2}{2} = \frac{e_n}{2},$$
which is as small as we like for large $n$.

*No rational limit:* if $x_n \to L \in \mathbb{Q}$, then $x_n^2 \to L^2$ (limit laws hold in ℚ, with the usual proofs), while $x_n^2 = 2 + e_n \to 2$. Limits are unique, so $L^2 = 2$, contradicting §2. ∎

This is the "should converge but has nowhere to go" phenomenon. The terms huddle together, closer and closer, around a spot on the number line where ℚ has no point.

### 5. Payoff: we need a new floor, built from a new idea

We can now say exactly what's wrong with ℚ, in two equivalent ways:
- **Order version:** some nonempty, bounded-above sets have no least upper bound.
- **Sequence version:** some Cauchy sequences have no limit.

Both describe the same defect: ℚ has **holes**. And this defect is different in kind from the ones we fixed before. ℕ couldn't solve $x + 5 = 3$; ℤ couldn't solve $2x = 3$. Those were *algebraic* defects, fixed by gluing pairs (↩ S1E06). The holes in ℚ are about **limits**: infinite processes that ought to end somewhere. Adding $\sqrt 2$ alone won't do (we'd still be missing $\sqrt 3$, $\pi$, and uncountably many others, ↪ S1E12). We need a construction that fills **every** hole at once.

That's ↪ S1E08, which does it twice: Dedekind fills each hole with the cut that defines it, and Cantor fills it with the class of Cauchy sequences that home in on it (Ep. 5's tool again). Both produce the unique **complete ordered field**, ℝ.

**What did we lose?** Nothing yet: we've only discovered what ℚ was missing all along. The cost comes next time: the real numbers will be so numerous that almost none of them can ever be named (↪ S1E12).

## Worked examples

### Example 1: density in action, and a near miss
**Find a rational between $\frac75 = 1.4$ and $\frac32 = 1.5$, and test whether its square is 2.**
The midpoint is
$$\frac{1}{2}\Big(\frac75 + \frac32\Big) = \frac12\Big(\frac{14}{10} + \frac{15}{10}\Big) = \frac{29}{20} = 1.45.$$
Its square is $\frac{841}{400} = 2.1025$, slightly more than 2. So $\frac{29}{20}$ is an upper bound for $S$, and the hole lies between $\frac75$ and $\frac{29}{20}$. Repeating forever narrows the interval but never lands on a rational whose square is exactly 2; §2 guarantees it never will.

### Example 2: the improvement map, step by step
**From below.** Start with $q = \frac75$. Check: $q^2 = \frac{49}{25} = 1.96 < 2$, so $q \in S$.
$$q' = \frac{2\cdot\frac75 + 2}{\frac75 + 2} = \frac{\frac{14}{5} + \frac{10}{5}}{\frac{7}{5} + \frac{10}{5}} = \frac{24/5}{17/5} = \frac{24}{17} \approx 1.41176.$$
Then $q'^2 = \frac{576}{289}$, and $576 < 578 = 2 \cdot 289$, so $q'^2 < 2$. ✓ And $\frac{24}{17} > \frac75$ since $24 \cdot 5 = 120 > 119 = 17 \cdot 7$. ✓ So $\frac{24}{17}$ is a bigger element of $S$. (The lemma's formula agrees: $q'^2 - 2 = \frac{2(1.96 - 2)}{(3.4)^2} = \frac{-0.08}{11.56} = -\frac{2}{289}$, and indeed $\frac{576}{289} - 2 = \frac{576 - 578}{289} = -\frac{2}{289}$.)

**From above.** Start with $u = \frac32$: $u^2 = \frac94 = 2.25 > 2$, so $u$ is an upper bound.
$$u' = \frac{3 + 2}{\frac32 + 2} = \frac{5}{7/2} = \frac{10}{7} \approx 1.42857, \qquad u'^2 = \frac{100}{49}, \quad 100 > 98 = 2 \cdot 49.$$
So $\frac{10}{7}$ is a smaller upper bound. ✓ Once more: $u'' = \frac{20/7 + 2}{10/7 + 2} = \frac{34/7}{24/7} = \frac{17}{12} \approx 1.41667$, and $17^2 = 289 > 288 = 2 \cdot 144$. Another smaller upper bound. ✓

Each side can always be improved; neither ever wins.

### Example 3: the Babylonian sequence, computed exactly
$x_{n+1} = \frac12\big(x_n + \frac{2}{x_n}\big)$, starting from $x_1 = 1$.
- $x_2 = \frac12(1 + 2) = \frac32$.
- $x_3 = \frac12\Big(\frac32 + \frac{2}{3/2}\Big) = \frac12\Big(\frac32 + \frac43\Big) = \frac12 \cdot \frac{9 + 8}{6} = \frac{17}{12}$.
- $x_4 = \frac12\Big(\frac{17}{12} + \frac{24}{17}\Big) = \frac12 \cdot \frac{289 + 288}{204} = \frac{577}{408}$.

Now the errors $e_n = x_n^2 - 2$:

| $n$ | $x_n$ | decimal | $x_n^2 - 2$ |
|---|---|---|---|
| 1 | $1$ | 1 | $-1$ |
| 2 | $\frac{3}{2}$ | 1.5 | $\frac{9}{4} - 2 = \frac14$ |
| 3 | $\frac{17}{12}$ | 1.41666… | $\frac{289 - 288}{144} = \frac{1}{144}$ |
| 4 | $\frac{577}{408}$ | 1.4142156… | $\frac{332929 - 332928}{166464} = \frac{1}{166464}$ |

Check the recurrence $e_{n+1} = \frac{e_n^2}{4x_n^2}$ at $n = 2$: $\frac{(1/4)^2}{4 \cdot 9/4} = \frac{1/16}{9} = \frac{1}{144}$. ✓ At $n = 3$: $\frac{(1/144)^2}{4 \cdot 289/144} = \frac{1}{144 \cdot 4 \cdot 289} = \frac{1}{166464}$. ✓

The bound from the proof: $\lvert x_4 - x_m \rvert < \frac{e_4}{2} = \frac{1}{332928} < 0.000004$ for all $m > 4$. The sequence is pinned down to within a few millionths, and the next term $x_5 = \frac{665857}{470832}$ has $e_5 = \frac{1}{221682772224}$. Yet no term, and no rational number, has square exactly 2. (All values checked with Python's exact `Fraction` arithmetic.)

### Example 4: decimal truncations, defined without √2
We can define the decimal sequence $1, 1.4, 1.41, 1.414, \dots$ entirely inside ℚ: let $k_n$ be the **largest natural number with $k_n^2 \le 2 \cdot 10^{2n}$**, and set $a_n = k_n / 10^n$. (So $a_n$ is the largest $n$-place decimal whose square is at most 2.)

| $n$ | $k_n$ | check: $k_n^2 \le 2\cdot 10^{2n} < (k_n + 1)^2$ | $a_n$ |
|---|---|---|---|
| 0 | 1 | $1 \le 2 < 4$ | 1 |
| 1 | 14 | $196 \le 200 < 225$ | 1.4 |
| 2 | 141 | $19881 \le 20000 < 20164$ | 1.41 |
| 3 | 1414 | $1999396 \le 2000000 < 2002225$ | 1.414 |
| 4 | 14142 | $199996164 \le 200000000 < 200024449$ | 1.4142 |

**It's Cauchy:** for $m > n$, both $a_m$ and $a_n$ lie in the interval $[a_n,\ a_n + 10^{-n})$, so $\lvert a_m - a_n \rvert < 10^{-n}$. Given any rational $\varepsilon > 0$, choose $N$ with $10^{-N} < \varepsilon$.
**It has no rational limit:** $a_n^2 \le 2 < (a_n + 10^{-n})^2$, so $a_n^2 \to 2$, and a rational limit $L$ would satisfy $L^2 = 2$.

This is the sequence that ↪ S1E09 will use to say what the infinite decimal $1.41421356\ldots$ *means*.

## Visual and animation notes
1. **Cold open:** a unit square drawn in chalk; the diagonal sweeps in. A ruler with tick marks tries to measure both side and diagonal; the ticks subdivide (halves, tenths, hundredths…) and the diagonal's endpoint always falls between two ticks. Brief sea-and-ship silhouette for the legend, with a caption "legend."
2. **Density:** two points on the rational line; a midpoint appears, then midpoints of midpoints, cascading until the segment looks solid.
3. **The irrationality proof as a shrinking staircase:** the fraction $\frac{a}{b}$ shown as a pair of bars; each "both even" step halves both bars. The bars can't shrink forever (a floor labeled "well-ordering of ℕ" stops them), so the starting assumption collapses.
4. **The hole** (key visual): zoom into the rational number line near 1.414. At every zoom level the line looks solid, dotted with labeled fractions. Then switch on "x-ray mode": the line is revealed as dust with gaps, and one gap glows at √2. Zoom further: more gaps keep appearing. *This is the "zoom in and find holes" animation that S2E23 replays with functions; build it as a reusable scene.*
5. **Two armies:** elements of $S$ (green) march right, upper bounds (red) march left, each step given by the improvement map. They get arbitrarily close but a glowing empty slot sits between them forever.
6. **Sequences with nowhere to go:** the Babylonian terms $\frac32, \frac{17}{12}, \frac{577}{408}$ as dots hopping onto the line, clustering tighter and tighter. A landing pad labeled "limit" is drawn where they cluster, and it falls through the hole.
7. **Number tower** (recurring motif): the ℚ floor is complete, but cracks appear in its ceiling. The next floor (ℝ) is scaffolding labeled "needs a new idea: limits."
8. **Teaser:** a knife poised over the number line (Dedekind) and a swarm of converging points (Cantor), side by side: "Two ways to fill a hole you can't point to."

## Common misconceptions
- **Misconception:** "Dense means no gaps." **Reality:** ℚ is dense (a rational between any two rationals) and still full of gaps. Density is about *between*; completeness is about *limits*.
- **Misconception:** "√2 is irrational because its decimal expansion never ends." **Reality:** $\frac13 = 0.333\ldots$ never ends either. A rational's decimal expansion eventually *repeats*; √2's doesn't. But the proof of irrationality (§2) doesn't use decimals at all.
- **Misconception:** "There's just one hole, at √2, plus a few famous ones like π." **Reality:** The holes are everywhere: between any two rationals there are infinitely many. In fact there are uncountably many holes and only countably many rationals (↪ S1E11, S1E12).
- **Misconception:** "A Cauchy sequence is one that converges." **Reality:** In ℚ, every convergent sequence is Cauchy but not conversely (Examples 3–4). "Every Cauchy sequence converges" is exactly the property ℚ lacks and ℝ will have.
- **Misconception:** "1.41421356 is √2." **Reality:** It's a rational approximation. Its square is $1.9999999932\ldots$. No finite decimal, and no fraction, squares to exactly 2.

## Exercises
- **Warm-up (computational):** Apply the improvement map $q \mapsto \frac{2q + 2}{q + 2}$ to $q = \frac43$ and to $q = \frac{17}{12}$. For each output, decide whether it is in $S$ or is an upper bound, by comparing its square with 2 using integer arithmetic only.
- **Core (conceptual):** (a) Prove that $\sqrt 3$ is irrational. (b) Where does the same argument break down if you try to "prove" that $\sqrt 4$ is irrational? (c) Find a set of rationals that is bounded above, has no largest element, but *does* have a supremum in ℚ.
- **Stretch (proof):** (a) Prove: if $n$ is a positive integer that is not a perfect square, then $\sqrt n$ is irrational. (Hint: use unique prime factorization, or adapt the descent.) (b) Show that the set $\lbrace q \in \mathbb{Q} : q^3 < 2 \rbrace$ has no supremum in ℚ. (You may use (a)-style reasoning to show no rational cubes to 2.)

<details><summary>Hints and answers</summary>

- **Warm-up:** $\frac43 \mapsto \frac{8/3 + 2}{4/3 + 2} = \frac{14/3}{10/3} = \frac75$; and $49 < 50 = 2 \cdot 25$, so $\frac75 \in S$ (from an upper bound we got… wait, $\frac43$ has $16 < 18$, so $\frac43 \in S$ too, and $\frac75 > \frac43$). $\frac{17}{12} \mapsto \frac{34/12 + 24/12}{17/12 + 24/12} = \frac{58}{41}$, and $58^2 = 3364 > 3362 = 2 \cdot 41^2$, so $\frac{58}{41}$ is an upper bound (smaller than $\frac{17}{12}$).
- **Core:** (a) If $a^2 = 3b^2$ in lowest terms, then $3 \mid a^2$, so $3 \mid a$ (if $a = 3k \pm 1$ then $a^2 = 9k^2 \pm 6k + 1$ leaves remainder 1). Write $a = 3c$: $b^2 = 3c^2$, so $3 \mid b$, contradiction. (b) $a^2 = 4b^2$ gives $a = 2b$, which is perfectly consistent: $\sqrt 4 = 2$. The descent step "then $b$ is even" fails, since $b^2 = c^2$ doesn't force anything. (c) $\lbrace 1 - \frac1n : n \ge 1 \rbrace$, with supremum 1.
- **Stretch:** (a) If $\sqrt n = \frac ab$ then $a^2 = n b^2$. In the prime factorization of $a^2$ and $b^2$, every exponent is even, so every exponent in $n$ is even, so $n$ is a perfect square. (b) Use the same strategy as §3: rational upper bounds are exactly the $u$ with $u^3 > 2$; for any such $u$, find a slightly smaller rational $u - \delta$ with $(u - \delta)^3 > 2$ (for instance, $\delta = \frac{u^3 - 2}{3u^2 + 1}$ works when $0 < \delta < u$; check by expanding).

</details>

## Historical note
The discovery that the side and diagonal of a square are **incommensurable** (have no common unit of measure) was made by Greek mathematicians, probably in the fifth century BCE, and is traditionally linked to the Pythagoreans. The story that the Pythagorean Hippasus revealed it and was drowned comes from much later writers and is best treated as legend; we don't know who made the discovery or how. Earlier, Babylonian scribes had computed $\sqrt 2$ to remarkable accuracy without (as far as we know) asking whether it was a ratio: the tablet YBC 7289 (Old Babylonian period, roughly 1800–1600 BCE) shows a square with its diagonal and the sexagesimal value $1;24,51,10$, which is about $1.4142130$. The iteration in Example 3 is often called the Babylonian method or Heron's method, after Heron of Alexandria, who described it in the first century CE.

Plato's dialogue *Theaetetus* reports that Theodorus of Cyrene proved the irrationality of $\sqrt 3$, $\sqrt 5$, …, up to $\sqrt{17}$. Aristotle refers to the proof that the diagonal is incommensurable, "because odd numbers would be equal to even," which is the parity argument of §2. Book X of Euclid's *Elements* (c. 300 BCE) classifies incommensurable magnitudes at length, and Book V presents Eudoxus' theory of proportion, which handles incommensurable ratios in a way that strikingly anticipates Dedekind's cuts.

The modern repair came in the nineteenth century. Richard Dedekind recorded that, while teaching calculus in Zurich in 1858, he was dissatisfied that there was no rigorous foundation for the continuity of the number line. His essay *Stetigkeit und irrationale Zahlen* ("Continuity and Irrational Numbers," 1872) located the problem exactly where this episode does, in the gaps of the rationals, and filled them with cuts (↪ S1E08).

## Connections
- **Callbacks:** ↩ S1E01 (the question "is √2 a number?"; the tower's equation $x^2 = 2$); ↩ S1E03 (well-ordering, used for the descent); ↩ S1E05 (equivalence classes, needed next episode); ↩ S1E06 (ℚ as an ordered field; "what we lost": discreteness, replaced here by density)
- **Sets up:**
  - ↪ S1E08: filling the holes with Dedekind cuts and with classes of Cauchy sequences; the least upper bound property as the defining axiom of ℝ
  - ↪ S1E09: decimals as names for limits of sequences like Example 4
  - ↪ S1E11: ℚ is countable
  - ↪ S1E12: ℝ is uncountable, so "almost all" points of the line are holes in ℚ
  - ↪ S1E19: $\sqrt 2$ as an algebraic number; the field $\mathbb{Q}(\sqrt 2)$ as a vector space over ℚ
  - ↪ S2E23: the same defect one level up: a Cauchy sequence of polynomials whose limit $e^x$ isn't a polynomial; completing function spaces into Banach spaces
- **Side quests:** p-adic numbers (after S1E08): ℚ has holes for a completely different notion of distance too; History interlude "Pythagoras and the irrationality crisis" (S1 Act II).

## References
- **Primary / historical**
  - Euclid, *Elements* (c. 300 BCE), Book V (Eudoxus' theory of proportion) and Book X (incommensurable magnitudes). English translation and commentary by T. L. Heath, *The Thirteen Books of Euclid's Elements* (1908).
  - Plato, *Theaetetus*, the passage on Theodorus and the incommensurable "powers" (147d–148b).
  - Richard Dedekind, *Stetigkeit und irrationale Zahlen* (1872). English: "Continuity and Irrational Numbers," in *Essays on the Theory of Numbers*, trans. W. W. Beman (1901).
- **Textbooks**
  - Walter Rudin, *Principles of Mathematical Analysis* (3rd ed., 1976), Chapter 1, Example 1.1, which uses the same improvement map to show ℚ has gaps.
  - Terence Tao, *Analysis I* (3rd ed., 2016), §4.4 ("Gaps in the rational numbers") and Chapter 5 (Cauchy sequences of rationals).
  - G. H. Hardy and E. M. Wright, *An Introduction to the Theory of Numbers* (1938; 6th ed. 2008), Chapter IV ("Irrational numbers").
- **Accessible**
  - Richard Courant and Herbert Robbins, *What Is Mathematics?* (1941; 2nd ed. 1996), Chapter II ("The Number System of Mathematics"), on incommensurable segments and irrational numbers.
  - Stanford Encyclopedia of Philosophy, entry "Dedekind's Contributions to the Foundations of Mathematics," on the 1872 essay and the motivation for cuts.
