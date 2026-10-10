# S1E08: Building ℝ, Twice

> **Season / Act:** Season 1, Act II (Repairing the Defects) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E05 (equivalence classes), S1E06 (ℤ and ℚ as quotients), S1E07 (the holes in ℚ); comfort with inequalities and the idea of a sequence ·
> **Builds toward:** S1E09 (decimals and 0.999…), S1E10 (ℂ as pairs of reals), S1E12 (ℝ is uncountable), S1E20 (the finale's "complete ordered field" label), S2E23 (Banach spaces as completions)

## Learning objectives
By the end of this lesson the viewer can:
1. State the least upper bound property and explain why ℚ fails it while ℝ has it.
2. Define a Dedekind cut, write down the cut for √2, and prove that the set of cuts has the least upper bound property.
3. Define a Cauchy sequence of rationals and the equivalence relation that turns classes of such sequences into real numbers.
4. Explain, in the "Build or Describe?" spirit, why two very different constructions produce "the same" ℝ: both are complete ordered fields, and any two complete ordered fields are isomorphic.

## Cold open
*Narrator, over a slow zoom into a glowing number line:*

Last time we caught ℚ lying to us. It *looks* like a solid line. Between any two fractions there's another fraction, and between those, another, forever. And yet, right at the spot where √2 should be, there is nothing. Not a tiny gap you can see, not a missing pixel. A hole with no edges.

So here's today's puzzle. How do you fill a hole you can't point to?

You can't say "put a number at √2," because √2 is exactly the thing that doesn't exist yet. You can't measure the hole, because the hole has no width. Every fraction is either a little to the left of it or a little to the right.

Mathematicians in the 1870s found two answers, and they could hardly be more different. Richard Dedekind said: *a number is a cut*. Slice the line with a knife, and the number is the slice itself, described by everything on its left. Georg Cantor (and, independently, others) said: *a number is a destination*. Take a swarm of fractions homing in on a spot, and the number is the swarm.

A knife and a swarm. Two completely different machines. And at the end of this episode, we'll see they build exactly the same thing.

## The story

### 1. The naive attempt: "just add the missing numbers"

The first instinct is to throw in √2, then √3, then π, then … what, exactly? Every time we name a new number we use some description ("the positive solution of x² = 2," "the ratio of circumference to diameter"), and there is no reason to think a list of descriptions will ever plug *every* hole. (In S1E12 we'll see that this hunch is right in a very strong sense: there are only countably many descriptions, but uncountably many holes.)

So we need a construction that fills *all* holes at once, without naming them one by one. To do that, we first have to say precisely what a "hole" is.

### 2. The crisis, stated precisely

Recall from ↩ S1E07 that the set

$$A = \{\, q \in \mathbb{Q} : q < 0 \text{ or } q^2 < 2 \,\}$$

is bounded above in ℚ (by 2, say) but has no *least* upper bound in ℚ. Every rational upper bound can be improved to a smaller one, and no rational element of $A$ is the largest.

> **Definition (upper bound, supremum).** Let $S$ be a subset of an ordered set $F$. An element $b \in F$ is an **upper bound** of $S$ if $s \le b$ for every $s \in S$. An upper bound $b$ is the **least upper bound** or **supremum**, written $\sup S$, if $b \le b'$ for every upper bound $b'$ of $S$.

> **Definition (least upper bound property / completeness).** An ordered set $F$ has the **least upper bound property** if every nonempty subset of $F$ that is bounded above has a supremum in $F$.

This is the precise statement of "no holes." ℚ fails it. What we want is a field that contains ℚ, keeps its arithmetic and its order, and *has* the least upper bound property.

> **Definition (complete ordered field).** An **ordered field** is a field $F$ with a total order $<$ such that (i) $x < y \Rightarrow x + z < y + z$, and (ii) $0 < x$ and $0 < y \Rightarrow 0 < xy$. A **complete ordered field** is an ordered field with the least upper bound property.

That definition is a *description*. It says what ℝ must do. Now we need to *build* something that does it.

### 3. Construction one: Dedekind's knife

Dedekind's insight: a hole in ℚ is perfectly well described by the rationals on its left. The set $A$ above *is* the information "where √2 should be." So declare that the real number √2 **is** that set.

> **Definition (Dedekind cut).** A **cut** is a subset $\alpha \subseteq \mathbb{Q}$ such that
> 1. $\alpha \neq \varnothing$ and $\alpha \neq \mathbb{Q}$;
> 2. $\alpha$ is *downward closed*: if $p \in \alpha$ and $q < p$ (with $q \in \mathbb{Q}$), then $q \in \alpha$;
> 3. $\alpha$ has no largest element.
>
> The set of all cuts is denoted ℝ. We order cuts by inclusion: $\alpha \le \beta$ means $\alpha \subseteq \beta$.

Condition 3 is a tie-breaking convention: the rational number $r$ corresponds to the cut $r^* = \{q \in \mathbb{Q} : q < r\}$, which leaves $r$ itself out. Every rational gets a cut, so ℚ sits inside ℝ via $r \mapsto r^*$. The cut for √2 is $A$ above, and it is *not* of the form $r^*$ for any rational $r$, because it has no rational "edge."

**Order.** Inclusion is a total order on cuts: if $\alpha \not\subseteq \beta$, pick $p \in \alpha \setminus \beta$. For any $q \in \beta$, we must have $q < p$ (otherwise $p \le q$ would put $p$ in $\beta$ by downward closure), so $q \in \alpha$. Hence $\beta \subseteq \alpha$.

**Addition.** $\alpha + \beta = \{\, r + s : r \in \alpha,\ s \in \beta \,\}$. The zero is $0^* = \{q : q < 0\}$, and the negative of $\alpha$ is $-\alpha = \{\, p : \text{there is } r > 0 \text{ with } -p - r \notin \alpha \,\}$ (the reflection of the complement, with its possible largest element removed).

**Multiplication** is the fiddly part. For positive cuts ($\alpha, \beta > 0^*$) define $\alpha\beta$ to be all rationals $p$ with $p \le rs$ for some positive $r \in \alpha$, $s \in \beta$. Then extend to signs by the usual rules ($(-\alpha)\beta = -(\alpha\beta)$, and so on). Checking all the field axioms is long but routine. Rudin's appendix to Chapter 1 does it in a few pages.

Now the one property that justifies the whole construction:

> **Theorem (completeness of the cuts).** Every nonempty set of cuts that is bounded above has a least upper bound, namely its union.

**Proof.** Let $\mathcal{S}$ be a nonempty set of cuts with an upper bound $\beta$ (so $\alpha \subseteq \beta$ for every $\alpha \in \mathcal{S}$). Let $\gamma = \bigcup_{\alpha \in \mathcal{S}} \alpha$.

*Step 1: $\gamma$ is a cut.*
- $\gamma \ne \varnothing$, because $\mathcal{S}$ contains some cut, which is nonempty. And $\gamma \subseteq \beta \neq \mathbb{Q}$, so $\gamma \neq \mathbb{Q}$.
- Downward closed: if $p \in \gamma$ then $p \in \alpha$ for some $\alpha \in \mathcal{S}$. If $q < p$, then $q \in \alpha$ (since $\alpha$ is a cut), so $q \in \gamma$.
- No largest element: if $p \in \gamma$, then $p \in \alpha$ for some $\alpha \in \mathcal{S}$, and $\alpha$ has some $r > p$; that $r \in \gamma$.

*Step 2: $\gamma$ is an upper bound.* Each $\alpha \in \mathcal{S}$ satisfies $\alpha \subseteq \gamma$, i.e. $\alpha \le \gamma$.

*Step 3: $\gamma$ is the least one.* If $\delta$ is any upper bound, then $\alpha \subseteq \delta$ for every $\alpha \in \mathcal{S}$, so their union $\gamma \subseteq \delta$, i.e. $\gamma \le \delta$. ∎

Notice how cheap that was. Order is inclusion, and the supremum is the union. The holes get filled "for free" because a cut is defined by exactly the data a hole gives us.

### 4. Construction two: Cantor's swarm

The second construction starts from a different picture. In ↩ S1E07 we watched sequences like 1, 1.4, 1.41, 1.414, … that *should* converge but have nowhere to go in ℚ. What they do have is the property that their terms get arbitrarily close *to each other*.

> **Definition (Cauchy sequence).** A sequence $(a_n)$ of rationals is **Cauchy** if for every rational $\varepsilon > 0$ there is an $N$ such that $|a_m - a_n| < \varepsilon$ for all $m, n \ge N$.

Many different sequences home in on the same hole. So we use the master tool from ↩ S1E05 and glue them together.

> **Definition (equivalent Cauchy sequences; the reals).** Two Cauchy sequences $(a_n)$ and $(b_n)$ are **equivalent**, written $(a_n) \sim (b_n)$, if $a_n - b_n \to 0$: for every rational $\varepsilon > 0$ there is $N$ with $|a_n - b_n| < \varepsilon$ for all $n \ge N$. A **real number** is an equivalence class $[(a_n)]$. The rational $r$ is identified with the class of the constant sequence $(r, r, r, \dots)$.

Checking that $\sim$ is an equivalence relation is quick. Reflexivity and symmetry are clear. For transitivity, if $a_n - b_n \to 0$ and $b_n - c_n \to 0$, then $|a_n - c_n| \le |a_n - b_n| + |b_n - c_n| < \varepsilon/2 + \varepsilon/2$ for large $n$.

**Arithmetic is termwise.** $[(a_n)] + [(b_n)] = [(a_n + b_n)]$ and $[(a_n)] \cdot [(b_n)] = [(a_n b_n)]$. As in ↩ S1E06, the hidden trap is *well-definedness*: the answer must not depend on which sequences we picked from each class. For addition, if $a_n \sim a'_n$ and $b_n \sim b'_n$ then $(a_n + b_n) - (a'_n + b'_n) = (a_n - a'_n) + (b_n - b'_n) \to 0$. For multiplication, write $a_n b_n - a'_n b'_n = a_n(b_n - b'_n) + b'_n(a_n - a'_n)$ and use the fact that Cauchy sequences are bounded.

**Order.** Say $[(a_n)] > 0$ if there is a rational $\delta > 0$ and an $N$ with $a_n > \delta$ for all $n \ge N$ ("eventually bounded away from 0 on the positive side"). Then $x < y$ means $y - x > 0$. The key lemma is a trichotomy: every Cauchy sequence is either equivalent to 0, eventually above some $\delta > 0$, or eventually below some $-\delta < 0$.

**Completeness.** The deeper fact, that every Cauchy sequence *of real numbers* converges to a real number (and, equivalently, that the least upper bound property holds), takes more work. The idea of the proof: given a Cauchy sequence of reals $x_1, x_2, \ldots$, pick for each $k$ a rational $q_k$ within $1/k$ of $x_k$ (possible because each $x_k$ is the class of a rational Cauchy sequence). Then $(q_k)$ is a rational Cauchy sequence, and its class is the limit of $(x_k)$. A swarm of swarms collapses to a single swarm.

### 5. Build or Describe? Two machines, one ℝ

We now have two constructions:

| | Dedekind cuts | Cauchy sequences |
|---|---|---|
| A real number *is* | a downward-closed set of rationals with no maximum | a class of rational sequences that get close to each other |
| Visual | a knife slicing the line | a swarm of points converging |
| Order is | inclusion | "eventually bigger by a fixed margin" |
| Easy part | completeness (the union) | arithmetic (termwise) |
| Hard part | multiplication (sign cases) | completeness (sequences of sequences) |

These are very different sets. A cut is a set of rationals; a Cauchy class is a set of *sequences* of rationals. No real number in one construction is literally equal to any real number in the other. Yet:

> **Theorem (uniqueness of the reals).** Any two complete ordered fields $F$ and $G$ are isomorphic: there is exactly one bijection $\phi : F \to G$ that preserves addition, multiplication, and order.

**Proof sketch.** Every ordered field contains a copy of ℚ (generated from 1 by adding, subtracting, and dividing), and the field operations force $\phi$ to send each rational of $F$ to the corresponding rational of $G$. Completeness implies the **Archimedean property** (no element is bigger than every integer; see S1E09 for the proof), and from that, ℚ is dense in both fields. Now define

$$\phi(x) = \sup\nolimits_G \{\, q \in \mathbb{Q} : q < x \,\},$$

so each element of $F$ goes to the element of $G$ that has the same rationals below it. Completeness of $G$ makes the supremum exist, and density shows $\phi$ is an order-preserving bijection. Checking $\phi(x+y) = \phi(x) + \phi(y)$ and $\phi(xy) = \phi(x)\phi(y)$ is done by squeezing with rationals. Any other isomorphism must also fix the rationals and preserve order, so it must agree with $\phi$. ∎

This is the "Build or Describe?" moment of the episode. We **built** ℝ twice. We can **describe** it once: *ℝ is the complete ordered field*. Every property of ℝ that anyone uses in calculus follows from the description. The building materials, cuts or sequences, can now be thrown away, exactly like the scaffolding of the number tower.

### 6. Payoff, and a seed for Season 2

So how do you fill a hole you can't point to? You let the hole describe itself. Dedekind: the hole is the set of everything to its left. Cantor: the hole is the class of every swarm that flies toward it. Either way the new number *is* the description of the gap, and the gap disappears.

The Cauchy construction carries a seed for much later. Notice that it used only one ingredient beyond arithmetic: a way to measure the **distance** $|a - b|$ between two rationals. Any space with a notion of distance can be completed the same way, by declaring classes of Cauchy sequences to be new points. Change the distance on ℚ and you get a different completion: the p-adic numbers (side quest). Change the *space*, from numbers to functions, and you get the Banach and Hilbert spaces of ↪ S2E23 and ↪ S2E28. Dedekind's knife needs an order, so it does not generalize this way. The swarm does.

## Worked examples

### Example 1: The √2 cut has no largest element (and how to climb inside it)

**Claim.** $A = \{ q \in \mathbb{Q} : q < 0 \text{ or } q^2 < 2 \}$ is a cut.

*Nonempty, not everything:* $0 \in A$, and $2 \notin A$ since $2^2 = 4 > 2$.

*Downward closed:* suppose $p \in A$ and $q < p$. If $q < 0$, then $q \in A$. If $q \ge 0$, then $0 \le q < p$, so $q^2 < p^2 < 2$, and $q \in A$.

*No largest element:* Given $p \in A$, we must find a larger element. If $p < 0$, then $0 \in A$ is larger. If $p \ge 0$ with $p^2 < 2$, set

$$q = \frac{2p + 2}{p + 2}.$$

Then
$$q - p = \frac{2p + 2 - p^2 - 2p}{p + 2} = \frac{2 - p^2}{p + 2} > 0,$$
so $q > p$. And
$$q^2 - 2 = \frac{(2p+2)^2 - 2(p+2)^2}{(p+2)^2} = \frac{4p^2 + 8p + 4 - 2p^2 - 8p - 8}{(p+2)^2} = \frac{2(p^2 - 2)}{(p+2)^2} < 0,$$
so $q^2 < 2$ and $q \in A$.

**Climbing.** Start at $p = 1$ and apply $p \mapsto (2p+2)/(p+2)$ repeatedly:

| step | $p$ | $p^2$ |
|---|---|---|
| 0 | 1 | 1 |
| 1 | 4/3 | 16/9 ≈ 1.778 |
| 2 | 7/5 | 49/25 = 1.96 |
| 3 | 24/17 | 576/289 ≈ 1.993 |
| 4 | 41/29 | 1681/841 ≈ 1.9988 |

(Check step 2: $p = 4/3$ gives $(8/3 + 2)/(4/3 + 2) = (14/3)/(10/3) = 7/5$.) Every term is inside $A$, and each is larger than the last, but none is the top. The cut is "open at the top," just as the definition requires.

*Why $A$ is not a rational cut:* if $A = r^*$ for a rational $r$, then $r$ would be the least rational not in $A$. That forces $r > 0$ and $r^2 \ge 2$; since no rational squares to 2 (↩ S1E07), $r^2 > 2$. But then $r' = (2r+2)/(r+2)$ satisfies $r - r' = (r^2 - 2)/(r + 2) > 0$ and $r'^2 - 2 = 2(r^2 - 2)/(r+2)^2 > 0$, so $r' < r$ and $r'$ is also not in $A$. That contradicts $r$ being the least. So $A$ is a genuinely new number.

### Example 2: Two swarms that fly to the same hole

Consider two rational sequences:

- **Decimal truncations:** $d = (1,\ 1.4,\ 1.41,\ 1.414,\ 1.4142,\ \ldots)$, where $d_n$ is the largest number with $n$ decimal places whose square is below 2.
- **Babylonian (Newton) iteration:** $b_1 = 1$, $b_{n+1} = \tfrac12\left(b_n + \tfrac{2}{b_n}\right)$.

Compute the Babylonian terms exactly:

$$b_2 = \tfrac12\left(1 + 2\right) = \tfrac32,\quad b_3 = \tfrac12\left(\tfrac32 + \tfrac43\right) = \tfrac12 \cdot \tfrac{17}{6} = \tfrac{17}{12},$$
$$b_4 = \tfrac12\left(\tfrac{17}{12} + \tfrac{24}{17}\right) = \tfrac12 \cdot \tfrac{289 + 288}{204} = \tfrac{577}{408},\quad b_5 = \tfrac{665857}{470832}.$$

Their squares overshoot 2 by a shrinking amount: $(3/2)^2 = 2 + 1/4$, $(17/12)^2 = 289/144 = 2 + 1/144$, $(577/408)^2 = 332929/166464 = 2 + 1/166464$.

**Both are Cauchy.** For the decimals, $d_n \le d_m < d_n + 10^{-n}$ whenever $m \ge n$, so $|d_m - d_n| < 10^{-n}$. For the Babylonian sequence, one checks $b_n^2 > 2$ for $n \ge 2$, so every $b_n$ (for $n \ge 2$) is an upper bound for the cut $A$ while $d_n$ is a lower bound, and $b_n^2 - 2$ shrinks fast.

**They are equivalent.** For $n \ge 2$ we have $d_n^2 < 2 < b_n^2$, so $d_n < b_n$, and
$$b_n - d_n = \frac{b_n^2 - d_n^2}{b_n + d_n} \le \frac{(b_n^2 - 2) + (2 - d_n^2)}{2}.$$
Both $b_n^2 - 2$ and $2 - d_n^2$ tend to 0 (the second is at most $(d_n + 10^{-n})^2 - d_n^2 < 3 \cdot 10^{-n}$, using $d_n < 1.5$), so $b_n - d_n \to 0$. Concretely, $b_4 - d_4 = 577/408 - 1.4142 = 1/63750 \approx 0.0000157$.

So $[(d_n)] = [(b_n)]$: two different swarms, one real number. That single real number is what we call √2.

**And it squares to 2.** By termwise multiplication, $[(b_n)]^2 = [(b_n^2)]$, and $b_n^2 - 2 \to 0$, so $(b_n^2) \sim (2, 2, 2, \ldots)$. Hence $[(b_n)]^2 = 2$ in the Cauchy reals.

### Example 3: Two names for 1 (a preview of S1E09)

Take $a_n = 1 - 10^{-n}$, i.e. $(0.9,\ 0.99,\ 0.999,\ \ldots)$, and the constant sequence $c_n = 1$.

- $(a_n)$ is Cauchy: for $m \ge n$, $|a_m - a_n| = 10^{-n} - 10^{-m} < 10^{-n}$.
- $c_n - a_n = 10^{-n} \to 0$: given rational $\varepsilon > 0$, choose $N$ with $10^{-N} < \varepsilon$ (possible since $10^N > 1/\varepsilon$ for large $N$). Then $|c_n - a_n| < \varepsilon$ for all $n \ge N$.

So $[(a_n)] = [(c_n)] = 1$. In the Cauchy construction, "0.999… = 1" is not a debate. It is the statement that two sequences lie in the same equivalence class, and checking it takes two lines.

In the Dedekind picture the same fact reads: the cut generated by $\{0.9, 0.99, 0.999, \ldots\}$, namely $\{q : q < 1 - 10^{-n} \text{ for some } n\}$, equals $1^* = \{q : q < 1\}$. Indeed, if $q < 1$, then $1 - q > 0$ and some $10^{-n} < 1 - q$, so $q < 1 - 10^{-n}$. We will take this apart properly in ↪ S1E09.

### Example 4: Adding two cuts

Let $\alpha = A$ (the √2 cut) and $\beta = 1^* = \{q : q < 1\}$. Then
$$\alpha + \beta = \{\, r + s : r \in A,\ s < 1 \,\}.$$
Is $2.4$ in it? We need $r \in A$ and $s < 1$ with $r + s = 2.4$. Take $r = 1.41$ (since $1.41^2 = 1.9881 < 2$) and $s = 0.99$: $1.41 + 0.99 = 2.40$. Yes. Is $2.42$ in it? We would need $r = 2.42 - s > 1.42$, but $1.42^2 = 2.0164 > 2$, so no such $r$ is in $A$. So $2.4 \in \alpha + \beta$ and $2.42 \notin \alpha + \beta$, as expected for $1 + \sqrt2 \approx 2.414$.

## Visual and animation notes
1. **Cold open:** reprise the S1E07 "zoom into ℚ and find holes" animation. The camera dives toward the location of √2; rationals rush past on both sides; at the center there is a faint dotted outline where nothing is. Keep this exact animation in the asset library, because S2E23 replays it with functions (production notes, "Completion" motif).
2. **Title card:** split screen. Left: a knife (Dedekind). Right: a swarm of glowing points (Cantor). The title "Building ℝ, Twice" appears across the seam.
3. **Dedekind cut:** the knife slices the rational line at the hole. Everything to the left turns one color and is "picked up" as a set; caption "this set *is* √2." Show the climbing sequence 1, 4/3, 7/5, 24/17, 41/29 as markers that keep climbing toward the knife without touching it.
4. **Order as inclusion:** two cuts drawn as shaded left rays; the shorter ray slides inside the longer one. Then a whole family of rays, and their union drawn as the outline of all of them: "the supremum is the union."
5. **Cauchy swarm:** two swarms of points (decimal truncations in one color, Babylonian iterates in another) converge on the same spot. Between them, a tether whose length shrinks to 0 as $n$ grows.
6. **Equivalence class blob:** the two swarms, and more, blur into a single glowing blob that becomes one point on the new line. Reuse the S1E05 equivalence-class motif exactly ("points blurring into a single glowing blob").
7. **Build or Describe? segment:** the two finished lines (one made of cuts, one of blobs) are connected by threads (bijection motif), then slide onto each other and merge into one line labeled "the complete ordered field."
8. **Number tower:** the ℝ floor gets built. The "What did we lose?" ledger gains an entry: "every number has a finite name" (foreshadowing S1E12).
9. **Seed:** brief flash-forward of the same swarm animation, but the points are little graphs of functions converging to a curve; caption "↪ S2E23."

## Common misconceptions
- **Misconception:** "A real number is an infinite decimal." **Reality:** decimals are *names* for real numbers, and some reals have two names (S1E09). The number is the cut or the class; the decimal is one convenient label.
- **Misconception:** "A Cauchy sequence is a convergent sequence." **Reality:** in ℚ, many Cauchy sequences do not converge (to anything in ℚ). That gap between "Cauchy" and "convergent" is exactly what completeness closes.
- **Misconception:** "The two constructions give two different real lines." **Reality:** as sets they are different, but there is a unique isomorphism of ordered fields between them. Anything you can say using only $+$, $\times$, and $<$ is true in one iff it is true in the other.
- **Misconception:** "Completeness just means there are no gaps between neighbors." **Reality:** ℚ already has no "neighbors" (it is dense) and still has holes. Completeness is the stronger statement that bounded sets have suprema.
- **Misconception:** "We could have stopped at ℚ plus all square roots, cube roots, and so on." **Reality:** that field (the real algebraic numbers) is still full of holes: π and e are missing, and the supremum of the decimal truncations of π does not exist in it.

## Exercises
- **Warm-up (computational):** Show that $(1,\ 1.7,\ 1.73,\ 1.732,\ \ldots)$ (largest $n$-place decimals with square below 3) is Cauchy, and compute the first three terms of the Babylonian iteration $b_{n+1} = \frac12(b_n + 3/b_n)$ starting at $b_1 = 2$.
- **Core (conceptual):** Explain why the definition of a cut includes "no largest element." What would go wrong in the correspondence between rationals and cuts if we dropped it?
- **Stretch (proof):** Prove that the set of Cauchy reals is Archimedean directly: if $x = [(a_n)]$, there is an integer $M$ with $x < M$. (Hint: Cauchy sequences are bounded.) Then prove that in any complete ordered field, every Cauchy sequence converges.

<details><summary>Hints and answers</summary>

- **Warm-up:** if $d_n$ is the $n$-place truncation, then for $m \ge n$, $d_n \le d_m < d_n + 10^{-n}$, so $|d_m - d_n| < 10^{-n}$, which is less than any given $\varepsilon$ once $n$ is large. Babylonian: $b_2 = \frac12(2 + 3/2) = 7/4$, $b_3 = \frac12(7/4 + 12/7) = \frac12 \cdot \frac{49 + 48}{28} = 97/56$. Check: $(97/56)^2 = 9409/3136 = 3 + 1/3136$.
- **Core:** without condition 3, both $\{q : q < r\}$ and $\{q : q \le r\}$ would be cuts, so each rational would correspond to two different "real numbers." Condition 3 picks one of them.
- **Stretch:** take $\varepsilon = 1$ in the Cauchy condition to get $N$ with $|a_n - a_N| < 1$ for $n \ge N$; then all terms are below $B = \max(|a_1|, \ldots, |a_N|) + 1$. Choose an integer $M \ge B + 1$; then $M - a_n \ge 1$ eventually, so $M - x > 0$. For the second part: a Cauchy sequence is bounded; let $x = \sup_n \inf_{k \ge n} x_k$ (the lim inf), which exists by completeness, and show $x_n \to x$ using the Cauchy condition.

</details>

## Historical note
For most of history, mathematicians used real numbers without defining them, leaning on geometric intuition about lines and magnitudes (Eudoxus's theory of proportion, preserved in Book V of Euclid's *Elements*, is strikingly close in spirit to Dedekind's cuts). The push to define them came from 19th-century analysis, where intuition about limits kept producing errors.

Richard Dedekind recorded that he had the idea of cuts in November 1858, while teaching calculus at the Polytechnic in Zürich and finding that he could not prove basic facts about limits without appealing to geometry. He published it only in 1872, in the short book *Stetigkeit und irrationale Zahlen* ("Continuity and Irrational Numbers"). In the same year Georg Cantor published a construction based on "fundamental sequences" (what we now call Cauchy sequences) in a paper on trigonometric series, and Charles Méray and Eduard Heine gave related constructions around the same time; Weierstrass had taught his own version in his Berlin lectures. The name "Cauchy sequence" honors Augustin-Louis Cauchy, who used the convergence criterion in the 1820s but did not construct the reals.

The axiomatic description, "a complete ordered field," came later. Hilbert stated axioms for the reals, including a completeness axiom, around 1900.

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes: the Cauchy reals are a quotient), ↩ S1E06 (well-definedness of operations on classes; ℚ as the starting field), ↩ S1E07 (the √2 hole and the set $\{q : q^2 < 2\}$ with no rational supremum)
- **Sets up:** ↪ S1E09 (decimals as names, 0.999… = 1, the Archimedean property), ↪ S1E10 (ℂ as pairs of reals), ↪ S1E12 (ℝ is uncountable: there are more holes than descriptions), ↪ S1E20 (finale montage: "ℝ, the complete ordered field"), ↪ S2E23 (Banach spaces: completing function spaces with Cauchy sequences), ↪ S2E28 (Hilbert spaces)
- **Side quests:** *p-adic numbers* (attaches here: complete ℚ with a different distance; Ostrowski's theorem says the usual absolute value and the p-adic ones are essentially the only choices)

## References
- **Primary / historical**
  - Richard Dedekind, *Stetigkeit und irrationale Zahlen* (1872). English translation: "Continuity and Irrational Numbers," in *Essays on the Theory of Numbers*, trans. W. W. Beman (1901; Dover reprint).
  - Georg Cantor, "Über die Ausdehnung eines Satzes aus der Theorie der trigonometrischen Reihen," *Mathematische Annalen* 5 (1872). (Introduces fundamental sequences.)
  - Euclid, *Elements*, Book V (Eudoxus's theory of proportion), e.g. in T. L. Heath's translation.
- **Textbooks**
  - Walter Rudin, *Principles of Mathematical Analysis*, 3rd ed. (1976), Chapter 1 and its appendix (construction of ℝ by Dedekind cuts).
  - Terence Tao, *Analysis I*, Chapter 5 ("The real numbers": construction by Cauchy sequences of rationals).
  - Michael Spivak, *Calculus*, final part ("Epilogue"): the chapters on constructing the real numbers and on their uniqueness as a complete ordered field.
  - Edmund Landau, *Grundlagen der Analysis* (1930), English *Foundations of Analysis*: builds ℕ, ℚ, ℝ (via cuts), and ℂ step by step from the Peano axioms.
- **Accessible**
  - Stanford Encyclopedia of Philosophy, "Dedekind's Contributions to the Foundations of Mathematics."
