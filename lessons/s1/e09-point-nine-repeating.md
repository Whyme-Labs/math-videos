# S1E09: 0.999… = 1, and What Decimals Really Are

> **Season / Act:** Season 1, Act II (Repairing the Defects) · **Target runtime:** 15–20 min ·
> **Prerequisites:** S1E07 (holes in ℚ), S1E08 (ℝ as the complete ordered field; Cauchy sequences); geometric series are helpful but re-derived here ·
> **Builds toward:** S1E12 (the diagonal argument has to dodge double decimal names), S1E13 (ordinals: "infinitely many steps" made precise), side quest *Hyperreals*

## Learning objectives
By the end of this lesson the viewer can:
1. Say precisely what an infinite decimal *means*: the supremum (equivalently, the limit) of its finite truncations.
2. Prove that $0.999\ldots = 1$ from the Archimedean property, and prove the Archimedean property from completeness.
3. Identify exactly which real numbers have two decimal names, and convert repeating decimals to fractions with justified steps.
4. Explain why ℝ contains no infinitesimals, and why that is a feature of ℝ rather than of "numbers" in general.

## Cold open
*Narrator, over a scrolling comment thread that never ends:*

It might be the most argued-about equation on the internet.

$$0.999\ldots = 1$$

One side says: obviously not. The left side starts with a zero. It's always *just a little bit* less than 1. It gets closer and closer but never arrives.

The other side has a bag of tricks. One third is 0.333…; multiply by three and you get 0.999…, but three thirds is 1. Or: call it $x$, then $10x = 9.999\ldots$, subtract, and $9x = 9$.

And the first side answers: those are tricks. You can't just multiply an infinite thing by ten and shift it over.

Here's the twist. The skeptics are asking the *right* question. Those tricks really do hide something. To settle this properly we need to know what an infinite string of digits even *is*. Nobody can write infinitely many nines. So what does "0.999…" name?

By the end of this episode you'll have an answer that doesn't depend on any trick, and you'll see that the real question was never "does 0.999… reach 1?" It was "is there any room between them?"

## The story

### 1. The naive attempt: "it gets closer but never arrives"

The skeptic's picture is a process: 0.9, then 0.99, then 0.999, a ball rolling toward 1 and never touching it. That picture is accurate *about the truncations*. Every finite truncation is less than 1:

$$1 - \underbrace{0.99\ldots9}_{n \text{ nines}} = 10^{-n} > 0.$$

But "0.999…" is not any of the truncations. It is not a process; it is supposed to be a single number. The naive argument confuses the sequence of approximations with the thing being approximated. So the first job is to say what the thing is.

### 2. The crisis: decimals need a definition

In ↩ S1E08 we built ℝ and described it as the complete ordered field. Nowhere in that description do digits appear. Decimals are a *naming system* laid on top.

> **Definition (value of a decimal).** Let $d_0$ be an integer and $d_1, d_2, d_3, \ldots$ digits in $\{0, 1, \ldots, 9\}$. The **finite truncations** are
> $$s_n = d_0 + \frac{d_1}{10} + \frac{d_2}{10^2} + \cdots + \frac{d_n}{10^n}.$$
> The decimal $d_0.d_1d_2d_3\ldots$ **denotes** the real number
> $$\sup_{n} s_n.$$

This makes sense because the truncations increase (each new digit adds something nonnegative) and are bounded above by $d_0 + 1$:

$$s_n \le d_0 + \sum_{k=1}^n \frac{9}{10^k} = d_0 + 1 - 10^{-n} < d_0 + 1.$$

So by completeness (↩ S1E08) the supremum exists. For an increasing bounded sequence the supremum is also the limit, so you can equally read the definition as "the decimal denotes $\lim_{n\to\infty} s_n$."

Notice what the definition does *not* say. It does not say the decimal is "the last truncation," because there is no last truncation. A decimal is a name, and the name points at the smallest number that is at least every truncation.

### 3. The key fact: there is no room for infinitesimals

To evaluate $\sup\{0.9, 0.99, 0.999, \ldots\}$, we need one property of ℝ.

> **Theorem (Archimedean property).** For every real $x$ there is a natural number $n$ with $n > x$. Equivalently, for every real $\varepsilon > 0$ there is $n$ with $1/n < \varepsilon$.

**Proof.** Suppose not: some real $x$ satisfies $n \le x$ for all $n \in \mathbb{N}$. Then ℕ is a nonempty subset of ℝ that is bounded above, so by completeness it has a least upper bound $b = \sup \mathbb{N}$. Since $b - 1 < b$, the number $b - 1$ is *not* an upper bound, so some natural number $m$ satisfies $m > b - 1$. But then $m + 1 > b$, and $m + 1 \in \mathbb{N}$, contradicting that $b$ is an upper bound of ℕ. So no such $x$ exists.

For the equivalent form: given $\varepsilon > 0$, apply the first form to $x = 1/\varepsilon$ to get $n > 1/\varepsilon$, i.e. $1/n < \varepsilon$. ∎

> **Definition (infinitesimal).** A positive **infinitesimal** in an ordered field is an element $\varepsilon > 0$ with $\varepsilon < 1/n$ for every positive integer $n$.

> **Corollary.** ℝ has no positive infinitesimals.

That is immediate from the second form of the Archimedean property. Because $10^n \ge n$ for every $n \ge 1$, it also follows that no positive real is smaller than every $10^{-n}$.

### 4. The payoff: 0.999… = 1

> **Theorem.** $0.999\ldots = 1$.

**Proof.** Let $s_n = 0.\underbrace{99\ldots9}_{n} = 1 - 10^{-n}$. We show $\sup_n s_n = 1$.

*1 is an upper bound:* $s_n = 1 - 10^{-n} < 1$ for all $n$.

*Nothing smaller is an upper bound:* suppose $c < 1$. Then $\varepsilon = 1 - c > 0$. By the Archimedean property there is $n$ with $1/n < \varepsilon$, and $10^{-n} \le 1/n$, so $10^{-n} < \varepsilon$. Then
$$s_n = 1 - 10^{-n} > 1 - \varepsilon = c,$$
so $c$ is not an upper bound.

Hence $\sup_n s_n = 1$, i.e. $0.999\ldots = 1$. ∎

Read the proof backwards and you get the real content: *if* 0.999… were less than 1, the gap $1 - 0.999\ldots$ would be a positive number smaller than every $10^{-n}$. That is an infinitesimal, and ℝ doesn't have any. The question was never whether the nines "arrive." It was whether there is room between them and 1. In ℝ there isn't.

### 5. Which numbers have two names?

The same argument shows that any decimal ending in an infinite tail of 9s equals the decimal with that tail "rounded up." Conversely, these are the only collisions.

> **Theorem (double names).** A real number has two different decimal expansions if and only if it can be written as $k/10^n$ for integers $k$ and $n \ge 0$ (a terminating decimal). In that case, its two expansions are the terminating one (ending in repeated 0s) and one ending in repeated 9s. Every other real number has exactly one decimal expansion.

**Proof sketch.** If two expansions differ, look at the first position $j$ where their digits differ, say $a_j < b_j$. The tail after position $j$ can contribute at most $10^{-j}$ in total (an all-9s tail contributes exactly $10^{-j}$ and every other tail contributes strictly less). The values can only agree if the first expansion has $a_j = b_j - 1$ followed by all 9s, and the second has $b_j$ followed by all 0s. Then the number is a terminating decimal. ∎

So decimals are an *almost* perfect naming system. The only defect is that every terminating decimal (other than 0 itself) has a twin. This tiny defect matters later: Cantor's diagonal argument in ↪ S1E12 has to be careful not to produce a "new" number that is secretly an old number with a different name.

### 6. Zoom out: names versus things

The recurring theme of Act II is that we never *invent* numbers by decree; we *construct* them and then *name* them. Decimals are like spelling. "Colour" and "color" are two spellings of one word; "1.000…" and "0.999…" are two spellings of one number. Nobody thinks the word changes when the spelling does.

This is also the first time the series meets a theme that returns in Season 2: an object (here a real number) versus a description of it in a chosen system (here base-10 digits). In Season 2 the object will be a linear map and the description will be a matrix in a chosen basis; a change of basis changes the description, never the map.

**Teaser.** Is it *impossible* to have numbers with infinitesimals? Not at all. It is impossible in ℝ, because ℝ is complete and Archimedean. Other perfectly rigorous number systems, the **hyperreals** of non-standard analysis and Conway's **surreal numbers**, do contain infinitesimals, and in them you can do Leibniz-style calculus with genuine $dx$'s. But even there, the standard number 0.999… (with one 9 for each natural number) still equals 1; what those systems add are new numbers, such as $1 - \varepsilon$ for an infinitesimal $\varepsilon$, that are infinitely close to 1 without being equal to it. See the *Hyperreals* side quest (attaches here) and the *Surreal numbers* side quest (attaches after S1E13).

## Worked examples

### Example 1: Why the "10x − x" trick works here, and where it fails

**The trick.** Let $x = 0.999\ldots$. Then $10x = 9.999\ldots$, and $10x - x = 9$, so $x = 1$.

**What the trick assumes.** It assumes (a) $x$ is a real number at all, (b) multiplying a decimal by 10 shifts its digits, and (c) subtracting two infinite decimals digit by digit is legitimate. All three are true for convergent decimals, but each needs the definition from Section 2:

- (a) holds because the truncations are bounded, so the supremum exists.
- (b): the truncations of $10x$ are $10 s_n = 9.99\ldots9$ (with $n-1$ nines after the point). Multiplying by the positive constant 10 preserves suprema, so $10x = \sup_n 10 s_n = 9.999\ldots$.
- (c): compare truncations, offset by one place: $10 s_{n+1} - s_n = (10 - 10^{-n}) - (1 - 10^{-n}) = 9$ for every $n$. As $n \to \infty$, $10 s_{n+1} \to 10x$ and $s_n \to x$, and limits respect subtraction, so $10x - x = 9$. (Careful: this step only uses that the limits *exist*, not what they are, so it isn't circular.)

**Where the same trick breaks.** Apply it to $y = 1 + 2 + 4 + 8 + \cdots$. "Then $2y = 2 + 4 + 8 + \cdots = y - 1$, so $y = -1$." The steps look identical, yet a sum of positive numbers came out negative. The error is (a): the partial sums $2^{n+1} - 1$ are unbounded, so $y$ is not a real number, and manipulating it as if it were is meaningless. (Remarkably, $-1$ is the correct answer in a *different* completion of ℚ, the 2-adic numbers ℚ₂; see the *p-adic numbers* side quest. Different notion of distance, different limits.)

**Moral.** The tricks are fine as *shortcuts* once you know the series converges. They are not proofs of convergence.

### Example 2: Converting a repeating decimal to a fraction, step by step

Convert $0.\overline{142857} = 0.142857142857\ldots$ into a fraction.

Group the digits in blocks of six. The value is the sum of the geometric series
$$\frac{142857}{10^6} + \frac{142857}{10^{12}} + \frac{142857}{10^{18}} + \cdots = 142857 \sum_{k=1}^{\infty} \left(10^{-6}\right)^k.$$

For $|r| < 1$, the partial sums of $\sum_{k=1}^n r^k$ equal $r(1 - r^n)/(1 - r)$. Since $r^n \to 0$ (by the Archimedean property, for $r = 10^{-6}$), the series converges to $r/(1-r)$. With $r = 10^{-6}$:
$$\frac{r}{1-r} = \frac{10^{-6}}{1 - 10^{-6}} = \frac{1}{10^6 - 1} = \frac{1}{999999}.$$
So
$$0.\overline{142857} = \frac{142857}{999999}.$$
Now simplify: $999999 = 7 \times 142857$ (check: $7 \times 142857 = 999999$). Therefore
$$0.\overline{142857} = \frac{1}{7}.$$

Cross-check by long division: $1 \div 7$ gives remainders $1 \to 3 \to 2 \to 6 \to 4 \to 5 \to 1$, producing digits 1, 4, 2, 8, 5, 7 and then repeating. ✓

The same method with $r = 1/10$ and digit 9 gives $9 \cdot \frac{1/10}{1 - 1/10} = 9 \cdot \frac19 = 1$, which is a second proof that $0.999\ldots = 1$, this time via the geometric series formula (whose own proof rests on $r^n \to 0$, i.e. on the Archimedean property).

### Example 3: Twins in the wild

Find both decimal names of each number, or show there is only one.

1. **$\tfrac{1}{5}$.** $1/5 = 2/10$, a terminating decimal. Names: $0.2000\ldots$ and $0.1999\ldots$. Check the second: $0.1999\ldots = 0.1 + 0.0999\ldots = 0.1 + \tfrac{1}{10}(0.999\ldots) = 0.1 + 0.1 = 0.2$. ✓
2. **$2.35$.** $= 235/100$. Names: $2.35000\ldots$ and $2.34999\ldots$. Check: $2.34999\ldots = 2.34 + 0.00999\ldots = 2.34 + \tfrac{1}{100}\cdot 1 = 2.35$. ✓
3. **$\tfrac13$.** Is $1/3 = k/10^n$ for some integers? That would mean $10^n = 3k$, but 3 does not divide $10^n = 2^n 5^n$. So $1/3$ has exactly one name: $0.333\ldots$.
4. **$\tfrac{3}{40}$.** $3/40 = 75/1000$, so it terminates: $0.075$ and $0.074999\ldots$. (General rule: a fraction in lowest terms terminates iff its denominator has no prime factors other than 2 and 5.)

### Example 4: The same phenomenon in base 2

In binary, digits are 0 and 1 and place values are $2^{-k}$. Then
$$0.111\ldots_2 = \sup_n \left(\tfrac12 + \tfrac14 + \cdots + \tfrac1{2^n}\right) = \sup_n \left(1 - 2^{-n}\right) = 1,$$
by exactly the same proof (now using $2^{-n} \le 1/n$). Every base has double names: the twin of $0.1_2 = \tfrac12$ is $0.0111\ldots_2$. The phenomenon has nothing to do with 9 specifically; it comes from the fact that the largest digit, repeated forever, adds up to one unit in the previous place.

## Visual and animation notes
1. **Cold open:** a comment thread scrolling upward, with "= 1" and "≠ 1" replies stacking forever. Freeze, then zoom into the "0.999…" until the dots become a horizontal row of nines running off screen.
2. **Truncations as a staircase:** the number line from 0.8 to 1.0. Markers at 0.9, 0.99, 0.999, each step one-tenth the previous gap, so they pile up near 1. A magnifying-glass zoom (×10 each time) shows the gap is always exactly "one unit" at the current scale, and the picture is self-similar.
3. **Supremum as a ceiling:** a horizontal ceiling slides down from above, stops at the lowest position that is still above every marker, and lands exactly on 1. Caption: "the decimal names *this*."
4. **Hunting for room:** the narrator places a hypothetical point $c$ just below 1. The staircase marches past it. Try a closer $c$; the staircase marches past again. A small card: "Archimedean property: no room for infinitesimals."
5. **Archimedes proof:** natural numbers as dots marching right; a hypothetical "ceiling" $b = \sup \mathbb{N}$ appears; the dot $m > b - 1$ jumps by 1 past it, and the ceiling shatters.
6. **Two names, one point:** "0.2000…" and "0.1999…" written on two luggage tags, both tied with threads to the same point on the line. Use the bijection-thread motif, except here two threads go to one point: a naming system that is *not* injective.
7. **Base 2 replay:** the staircase animation again with halves, quarters, eighths (a tile-filling square works well: tiles of area 1/2, 1/4, 1/8 fill a unit square).
8. **Teaser:** the line zooms in near 1 and, briefly, a fuzzy cloud of hyperreal points appears around it, then fades with the caption "not in ℝ."

## Common misconceptions
- **Misconception:** "0.999… is a process that never finishes, so it never equals 1." **Reality:** a decimal is defined as a single number, the supremum of its truncations. The truncations never reach 1; their supremum is 1.
- **Misconception:** "1 − 0.999… = 0.000…1." **Reality:** "0.000…1" (a 1 after infinitely many zeros) is not a decimal, since there is no position "after" all the natural-number positions. If it named a number, that number would be a positive infinitesimal, and ℝ has none.
- **Misconception:** "0.999… = 1 is a matter of convention." **Reality:** once decimals are defined as suprema of truncations, it is a theorem. One could choose a different naming system, but in any naming system for ℝ, the number named must be a real number, and there is no real between all the truncations and 1.
- **Misconception:** "Only 0.999… has this problem." **Reality:** every nonzero terminating decimal has a twin ending in 9s, and the same thing happens in every base.
- **Misconception:** "Infinitesimals are logically impossible." **Reality:** they are impossible in ℝ (an Archimedean field). Non-Archimedean ordered fields, like the hyperreals, exist and are consistent.

## Exercises
- **Warm-up (computational):** Write $0.\overline{27}$ and $0.1\overline{6}$ as fractions in lowest terms, showing the geometric-series steps.
- **Core (conceptual):** A friend says: "If 0.999… = 1, then the numbers just below 1 must have a largest element, namely 0.999…, which is absurd." Explain carefully what's wrong.
- **Stretch (proof):** Prove that a fraction $p/q$ in lowest terms (with $q > 0$) has a terminating decimal expansion if and only if $q = 2^a 5^b$ for some $a, b \ge 0$. Then prove that every rational number has an eventually repeating decimal expansion. (Hint: the remainders in long division.)

<details><summary>Hints and answers</summary>

- **Warm-up:** $0.\overline{27} = 27 \cdot \frac{1/100}{1 - 1/100} = \frac{27}{99} = \frac{3}{11}$. And $0.1\overline{6} = \frac{1}{10} + 6 \cdot \frac{1/100}{1 - 1/10} = \frac{1}{10} + \frac{6}{90} = \frac{9}{90} + \frac{6}{90} = \frac{15}{90} = \frac16$.
- **Core:** 0.999… is not "just below 1"; it *is* 1. The numbers strictly below 1 have no largest element (between any $c < 1$ and 1 there is $(c+1)/2$), and that's fine. The friend is still picturing 0.999… as a point strictly inside the interval.
- **Stretch:** if $p/q = k/10^n$ in lowest terms, then $q$ divides $10^n$, so $q$ has only the primes 2 and 5. Conversely, if $q = 2^a 5^b$ and $n = \max(a, b)$, then $10^n/q$ is an integer $m$, so $p/q = pm/10^n$. For repetition: in long division of $p$ by $q$, each step's remainder is one of $0, 1, \ldots, q-1$; after at most $q$ steps a remainder repeats, and from then on the digits repeat.

</details>

## Historical note
Decimal fractions were used in China, the medieval Islamic world (al-Kashi wrote extensively about them in the 15th century), and Europe before they became standard. Their spread in Europe owes much to Simon Stevin's short 1585 pamphlet *De Thiende* ("The Tenth"), which argued that decimal fractions would make everyday arithmetic, measurement, and accounting easier. Stevin's notation was clumsy (he circled place numbers), and the decimal point arrived later.

Infinite decimals and infinite series were used freely in the 17th and 18th centuries, often with brilliant results and occasional nonsense: manipulations like the "$1 + 2 + 4 + \cdots = -1$" calculation in Example 1 appear in the work of serious mathematicians of the period. The modern answer, that a decimal names the limit of its truncations and that limits require a complete number system, came with the 19th-century rigorization of analysis: Cauchy's definition of convergence in the 1820s and the constructions of ℝ by Dedekind, Cantor, and others in 1872 (↩ S1E08).

The non-Archimedean alternative also has a history. Leibniz's calculus used infinitesimals informally. In 1961 Abraham Robinson showed, using model theory, that infinitesimals can be made completely rigorous, founding non-standard analysis.

## Connections
- **Callbacks:** ↩ S1E07 (ℚ is dense but has holes), ↩ S1E08 (completeness, suprema, Cauchy sequences; Example 3 there previewed this episode)
- **Sets up:** ↪ S1E12 (the diagonal argument must avoid numbers with two decimal names), ↪ S1E13 (ordinals: what "after infinitely many steps" can mean), ↪ S2E04 (an object versus its description in a chosen system: matrices as shadows of maps)
- **Side quests:** *Hyperreals* (attaches here: infinitesimals done rigorously), *p-adic numbers* (attaches after S1E08: where $1 + 2 + 4 + \cdots = -1$ is true), *Surreal numbers* (attaches after S1E13)

## References
- **Primary / historical**
  - Simon Stevin, *De Thiende* (1585); French version *La Disme* (1585).
  - Abraham Robinson, *Non-standard Analysis* (1966).
- **Textbooks**
  - Walter Rudin, *Principles of Mathematical Analysis*, 3rd ed. (1976), Chapter 1 (the Archimedean property and density of ℚ in ℝ) and Chapter 3 (sequences and series, including the geometric series).
  - Terence Tao, *Analysis I*, Chapter 5 (the reals and the least upper bound property) and the appendix on the decimal system (which discusses $0.999\ldots = 1$).
  - H. Jerome Keisler, *Elementary Calculus: An Infinitesimal Approach* (1976; later editions freely available from the author): calculus with hyperreal infinitesimals.
- **Accessible**
  - Fred Richman, "Is 0.999… = 1?", *Mathematics Magazine* 72 (1999).
  - David Tall and Rolph Schwarzenberger, "Conflicts in the learning of real numbers and limits," *Mathematics Teaching* 82 (1978). (Classic study of why students resist 0.999… = 1.)
