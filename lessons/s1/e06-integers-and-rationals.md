# S1E06: Subtraction and Division: ℤ and ℚ

> **Season / Act:** Season 1 ("What Is a Number?"), Act II: Repairing the Defects · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E03 (arithmetic and order on ℕ, cancellation); S1E04 (ordered pairs); S1E05 (equivalence relations, quotient sets, well-definedness) ·
> **Builds toward:** S1E07 (ℚ's holes), S1E08 (ℝ, built from ℚ), S1E11 (ℤ and ℚ are countable), S1E16–S1E19 (groups, rings, fields), S3E01 (fields as vector spaces)

## Learning objectives
By the end of this lesson the viewer can:
1. Construct ℤ as equivalence classes of pairs of natural numbers, with $(a, b) \sim (c, d) \iff a + d = b + c$, and define $+$, $\times$, and $\le$ on it.
2. Construct ℚ as equivalence classes of pairs of integers $(p, q)$ with $q \ne 0$, with $(p, q) \sim (r, s) \iff ps = qr$, and define its operations.
3. Prove that an operation on classes is well-defined, and recognize one that is not (the "mediant" of fractions).
4. Explain how ℕ sits inside ℤ and ℤ inside ℚ, and why "negative times negative is positive" is a theorem rather than a rule.
5. State the ring and field axioms informally, and say what was gained and lost at each step (the "What did we lose?" ledger).

## Cold open
What is 3 minus 5?

"Negative two," you say. But in the world we've built so far, ℕ, there is no such thing. Three take away five is like asking for the change from a three-dollar bill when you've paid five dollars. There's no answer.

For most of history, the response was to *invent* an answer. Some mathematicians called negative solutions absurd. Later generations simply declared: there's a new number, "minus two," and here are the rules for it. Minus times minus is plus. Don't ask why.

We're going to do something different. We won't invent a single new symbol. We're going to *build* negative two out of things we already have: pairs of ordinary whole numbers. And once we've built it, "minus times minus is plus" won't be a rule you memorize. It'll be something we can check.

Then we'll do it again. Three divided by two has no answer in the integers. So we'll build fractions the same way, out of pairs.

The tool is the one from last episode: declare things equal, and glue them together. The trap is the one we warned about: make sure the answers don't depend on which pair you picked. One very natural way of adding fractions falls straight into that trap.

## The story

### 1. The naive attempt: invent new symbols

The equation $x + 5 = 3$ has no solution in ℕ, because $x + 5 \ge 5$ for every $x$. The traditional fix is to invent a new symbol "$-2$" and decree its properties. The trouble with decrees is that you can't tell whether they're consistent. Could the rules for negative numbers secretly contradict each other? If we *build* the integers from ℕ and *prove* the rules, consistency comes for free: anything built from consistent material is as consistent as the material.

So what *is* $-2$? Here's the idea. A subtraction problem "$a - b$" is described by the pair $(a, b)$. The problem $3 - 5$ has no answer in ℕ, but the *pair* $(3, 5)$ exists. Many pairs describe "the same" subtraction: $0 - 2$, $1 - 3$, $2 - 4$, $3 - 5$, … all "should" be equal. Let's make the integer $-2$ **be** that whole family.

### 2. Building ℤ

When "should" $a - b = c - d$? Exactly when $a + d = b + c$. That condition uses only addition, so it makes sense in ℕ.

> **Definition (integers).** On $\mathbb{N} \times \mathbb{N}$ define
> $$(a, b) \sim (c, d) \iff a + d = b + c .$$
> The set of **integers** is the quotient $\mathbb{Z} = (\mathbb{N} \times \mathbb{N})/{\sim}$. We write $[a, b]$ for the class of $(a, b)$; think of it as "$a - b$."

**It's an equivalence relation.** Reflexive: $a + b = b + a$. Symmetric: $a + d = b + c$ is the same equation as $c + b = d + a$. Transitive: if $a + d = b + c$ and $c + f = d + e$, add the equations: $a + d + c + f = b + c + d + e$. Cancel $c + d$ from both sides (cancellation in ℕ, ↩ S1E03) to get $a + f = b + e$, i.e. $(a, b) \sim (e, f)$. ✓

**Canonical representatives.** Every class contains exactly one pair of the form $(n, 0)$ or $(0, n)$: if $a \ge b$ then $a = b + k$ and $(a, b) \sim (k, 0)$; if $a < b$ then $(a, b) \sim (0, k)$ with $b = a + k$. We name these classes $k$ and $-k$ respectively. So the integers are $\dots, -2, -1, 0, 1, 2, \dots$, just as we expect, but each one is now a definite set.

> **Definition (operations on ℤ).**
> $$[a, b] + [c, d] = [a + c,\ b + d], \qquad [a, b] \cdot [c, d] = [ac + bd,\ ad + bc], \qquad -[a,b] = [b, a].$$

Where do these formulas come from? Pretend $[a, b]$ "is" $a - b$ and expand: $(a - b) + (c - d) = (a + c) - (b + d)$ and $(a - b)(c - d) = (ac + bd) - (ad + bc)$. That's the *motivation*. The formulas themselves use only $+$ and $\times$ in ℕ, so they are legitimate definitions, provided they are well-defined.

> **Theorem (addition on ℤ is well-defined).** If $(a, b) \sim (a', b')$ and $(c, d) \sim (c', d')$, then $(a + c, b + d) \sim (a' + c', b' + d')$.

*Proof.* The hypotheses say $a + b' = b + a'$ and $c + d' = d + c'$. Adding them, and rearranging using associativity and commutativity in ℕ:
$$(a + c) + (b' + d') = (a + b') + (c + d') = (b + a') + (d + c') = (b + d) + (a' + c').$$
That's exactly the statement $(a + c,\ b + d) \sim (a' + c',\ b' + d')$. ∎

Multiplication is well-defined too (the proof changes one factor at a time and uses distributivity; see the Stretch exercise). With the operations in hand, one checks that ℤ satisfies the familiar laws. Each check is a short computation with representatives.

> **ℤ is a commutative ring.** Addition and multiplication are associative and commutative; $0 = [0,0]$ is an additive identity; $1 = [1, 0]$ is a multiplicative identity; multiplication distributes over addition; and **every element has an additive inverse**: $[a, b] + [b, a] = [a + b, b + a] = [0, 0]$ because $(a + b, a + b) \sim (0, 0)$.

That last property is exactly what ℕ lacked. In ℤ, $x + 5 = 3$ has the solution $x = [3, 5] = -2$.

**ℕ lives inside ℤ.** The map $n \mapsto [n, 0]$ is injective, and it respects the operations: $[m, 0] + [n, 0] = [m + n, 0]$ and $[m, 0]\cdot[n, 0] = [mn, 0]$. So we may *identify* $n$ with $[n, 0]$. Strictly speaking ℕ isn't a subset of ℤ (a natural number isn't a set of pairs), but ℤ contains a perfect copy of ℕ, and that's all we need.

**Order.** Define $[a, b] \le [c, d] \iff a + d \le b + c$ (in ℕ). This is well-defined, extends the order on ℕ, and is compatible with $+$; and if $x \le y$ and $0 \le z$ then $xz \le yz$.

### 3. Building ℚ: the same move, one level up

Now $2x = 3$ has no solution in ℤ. A division problem "$p \div q$" is described by a pair $(p, q)$ with $q \ne 0$, and $p \div q$ "should" equal $r \div s$ exactly when $ps = qr$. This is the relation from ↩ S1E05, Example 4, now with integers.

> **Definition (rationals).** Let $X = \lbrace (p, q) \in \mathbb{Z} \times \mathbb{Z} : q \ne 0 \rbrace$ and define
> $$(p, q) \sim (r, s) \iff ps = qr .$$
> The set of **rational numbers** is $\mathbb{Q} = X/{\sim}$. We write $\dfrac{p}{q}$ for the class of $(p, q)$.

Transitivity uses a fact about ℤ: **if $s \ne 0$ and $sx = sy$, then $x = y$** (ℤ has no zero divisors). The proof is the same as in ↩ S1E05, Example 4: from $ps = qr$ and $ru = st$ we get $s(pu) = s(qt)$ and cancel $s$.

> **Definition (operations on ℚ).**
> $$\frac{p}{q} + \frac{r}{s} = \frac{ps + qr}{qs}, \qquad \frac{p}{q} \cdot \frac{r}{s} = \frac{pr}{qs}, \qquad -\frac{p}{q} = \frac{-p}{q}, \qquad \Big(\frac{p}{q}\Big)^{-1} = \frac{q}{p}\ \ (p \ne 0).$$

Note that $qs \ne 0$ whenever $q, s \ne 0$ (no zero divisors again), so the results are legitimate pairs in $X$.

> **Theorem (multiplication on ℚ is well-defined).** If $(p,q) \sim (p', q')$ and $(r, s) \sim (r', s')$, then $(pr, qs) \sim (p'r', q's')$.

*Proof.* We have $pq' = qp'$ and $rs' = sr'$. Multiply these equations: $(pq')(rs') = (qp')(sr')$, which rearranges to $(pr)(q's') = (qs)(p'r')$. That's the claim. ∎

Addition is well-defined by a similar calculation (Exercise). Then:

> **ℚ is a field.** ℚ is a commutative ring (as ℤ was) in which, additionally, **every nonzero element has a multiplicative inverse**: if $p \ne 0$ then $\frac{p}{q}\cdot\frac{q}{p} = \frac{pq}{qp} = \frac{1}{1}$, because $(pq, qp) \sim (1, 1)$.

So $2x = 3$ has the solution $x = \frac32$. And ℤ sits inside ℚ via $a \mapsto \frac{a}{1}$, which respects $+$ and $\times$.

**Order on ℚ.** Every rational has a representative with positive denominator (replace $(p, q)$ by $(-p, -q)$ if $q < 0$). For positive denominators $q, s > 0$, define $\frac pq \le \frac rs \iff ps \le qr$. This is well-defined and makes ℚ an **ordered field**: the order is total and compatible with $+$, and the product of positive elements is positive.

**Why we exclude $q = 0$.** If $(p, 0)$ were allowed, then $(p, 0) \sim (0, 0)$ for every $p$ (since $p \cdot 0 = 0 \cdot 0$), and $(0, 0) \sim (r, s)$ for every pair. Transitivity would then glue every fraction to every other, collapsing ℚ to a single point. "You can't divide by zero" is not an arbitrary rule. It's what keeps the equivalence relation from collapsing.

### 4. The key visual: lines in the lattice

Draw the pairs as lattice points in the plane.

- **For ℤ**, the points are $(a, b)$ with $a, b \in \mathbb{N}$. The class of $(a, b)$ consists of all $(c, d)$ with $c - d = a - b$: a **diagonal line** parallel to $a = b$. The main diagonal is $0$; the lines below it (with $a > b$) are the positive integers; the lines above are the negatives. Each line blurs into one point, and those points line up as the number line ℤ.
- **For ℚ**, the points are $(p, q)$ with $q \ne 0$. The class of $(p, q)$ consists of the lattice points on the **line through the origin** with slope $q/p$ (the origin itself excluded). Every rational number is a line through the origin that passes through some other lattice point. The vertical axis $p = 0$ is the number $0$; the horizontal axis $q = 0$ is excluded.

This picture explains why the construction needs no "favorite" representative: the whole line is the number.

### 5. Payoff, and the ledger

Negative numbers and fractions are no longer invented. They're **constructed** from ℕ, using nothing but pairs and equivalence classes, and every law they obey is a theorem.

Two quiet structural facts will matter a great deal in Act IV:

- **ℤ is a ring**: you can add, subtract, and multiply. (↪ S1E18)
- **ℚ is a field**: you can also divide by anything nonzero. (↪ S1E19) In fact ℚ is the **smallest** field containing ℤ: any field containing a copy of ℤ contains a copy of ℚ. The same construction, applied to any ring without zero divisors, gives its **field of fractions**.

**What did we lose?** (recurring segment)

| Extension | Gained | Lost |
|---|---|---|
| ℕ → ℤ | additive inverses (subtraction) | **well-ordering**: ℤ has no least element, and "smallest counterexample" proofs no longer work directly |
| ℤ → ℚ | multiplicative inverses (division by nonzero) | **discreteness**: there's no "next" rational after $0$ (or after anything); between any two rationals there's another (↪ S1E07) |

And there's something ℚ still can't do. The equation $x^2 = 2$ has no solution in ℚ. That's next episode.

## Worked examples

### Example 1: integer arithmetic with pairs
**(a) $3 - 5$.** The class $[3, 5]$. Since $3 + 2 = 5 + 0$, we have $(3, 5) \sim (0, 2)$, so $[3, 5] = -2$. ✓

**(b) $(-5) + 4$ using unusual representatives.** Take $-5 = [2, 7]$ (since $2 + 5 = 7$) and $4 = [5, 1]$ (since $5 = 1 + 4$). Then
$$[2, 7] + [5, 1] = [2 + 5,\ 7 + 1] = [7, 8].$$
Since $7 + 1 = 8 + 0$, $(7, 8) \sim (0, 1)$, so the sum is $-1$. *Check:* $-5 + 4 = -1$. ✓

**(c) $(-2)\cdot(-3)$.** Use $-2 = [0, 2]$ and $-3 = [0, 3]$:
$$[0, 2]\cdot[0, 3] = [0\cdot 0 + 2 \cdot 3,\ 0 \cdot 3 + 2 \cdot 0] = [6, 0] = 6 .$$
*Same product, other representatives:* $-2 = [1, 3]$ and $-3 = [4, 7]$:
$$[1, 3]\cdot[4, 7] = [1\cdot 4 + 3 \cdot 7,\ 1 \cdot 7 + 3 \cdot 4] = [4 + 21,\ 7 + 12] = [25, 19].$$
Since $25 + 0 = 19 + 6$, $(25, 19) \sim (6, 0)$. Again $6$. ✓ (Well-definedness in action.)

### Example 2: why negative times negative is positive
**Direct computation.** $(-1)\cdot(-1) = [0,1]\cdot[0,1] = [0 \cdot 0 + 1 \cdot 1,\ 0 \cdot 1 + 1 \cdot 0] = [1, 0] = 1$. The "rule" is just what the multiplication formula gives.

**Why the formula *had* to be this way.** Suppose we only demanded that ℤ be a ring: that the distributive law hold and $-1$ be the additive inverse of $1$. Then:
$$0 = (-1)\cdot 0 = (-1)\cdot\big(1 + (-1)\big) = (-1)\cdot 1 + (-1)\cdot(-1) = -1 + (-1)\cdot(-1).$$
Adding $1$ to both sides gives $(-1)\cdot(-1) = 1$. (The first step, $x \cdot 0 = 0$, also follows from distributivity: $x \cdot 0 = x\cdot(0 + 0) = x \cdot 0 + x \cdot 0$, then cancel.)

So "minus times minus is plus" isn't a convention. Any number system that extends ℕ, keeps distributivity, and has negatives is *forced* to obey it. This is the "build vs. describe" theme again: the construction (pairs) and the description (ring axioms) agree.

### Example 3: adding fractions with different representatives
**Compute $\frac12 + \frac13$** using the representatives $(2, 4)$ for $\frac12$ and $(3, 9)$ for $\frac13$:
$$\frac{2}{4} + \frac{3}{9} = \frac{2\cdot 9 + 4 \cdot 3}{4 \cdot 9} = \frac{18 + 12}{36} = \frac{30}{36}.$$
Is $(30, 36) \sim (5, 6)$? Check $30 \cdot 6 = 180$ and $36 \cdot 5 = 180$. Yes. So the sum is $\frac56$, the same as with the "usual" representatives: $\frac12 + \frac13 = \frac{3 + 2}{6} = \frac56$. ✓

**Negative denominators are fine too.** $\frac{1}{-2} + \frac{2}{3} = \frac{1 \cdot 3 + (-2)\cdot 2}{(-2)\cdot 3} = \frac{-1}{-6}$, and $(-1, -6) \sim (1, 6)$ because $(-1)\cdot 6 = -6 = (-6)\cdot 1$. With representatives $(-3, 6)$ and $(4, 6)$: $\frac{-18 + 24}{36} = \frac{6}{36} \sim \frac16$. ✓

### Example 4: the mediant, an operation that is NOT well-defined
A tempting "addition" (common among students, and it has real uses elsewhere) is to add tops and bottoms:
$$\frac{p}{q} \oplus \frac{r}{s} := \frac{p + r}{q + s}.$$
**Test it with two representatives of $\frac12$:**
- $(1, 2) \oplus (1, 3) = (2, 5)$, i.e. $\frac25$.
- $(2, 4) \oplus (1, 3) = (3, 7)$, i.e. $\frac37$.

Is $\frac25 = \frac37$? Check: $2 \cdot 7 = 14$ and $5 \cdot 3 = 15$. Not equal. So the same inputs $\frac12$ and $\frac13$ produce two different outputs: $\oplus$ is **not well-defined** on ℚ. It's an operation on *pairs*, not on *numbers*.

(The mediant is still interesting: $\frac{p+r}{q+s}$ always lies strictly between $\frac pq$ and $\frac rs$ when $q, s > 0$ and $\frac pq \ne \frac rs$, and it appears in the Stern–Brocot and Calkin–Wilf trees, ↪ S1E11. But as an operation on rational numbers, it doesn't exist.)

### Example 5: an inverse, checked
**Find the inverse of $-\frac23$.** It's the class of $(-2, 3)$. Its inverse is the class of $(3, -2)$, which equals the class of $(-3, 2)$, i.e. $-\frac32$.
*Check:* $\frac{-2}{3} \cdot \frac{3}{-2} = \frac{-6}{-6}$, and $(-6, -6) \sim (1, 1)$ since $(-6)\cdot 1 = (-6) \cdot 1$. So the product is $1$. ✓

## Visual and animation notes
1. **Cold open:** a vending machine with "3 coins in, 5 coins needed"; a "−2" token tries to appear and is crossed out. Then the pair "(3, 5)" glows instead.
2. **ℤ lattice** (key visual): the grid ℕ × ℕ with dots. Diagonal lines light up one at a time, each labeled ($0$ on the main diagonal, $1, 2, \dots$ below, $-1, -2, \dots$ above). Each line **blurs into one glowing point** (recurring motif **Equivalence class / quotient**), and the points rotate to form a horizontal number line ℤ.
3. **Well-definedness check:** two different representatives of $-5$ and two of $4$ are added; the results land on the same diagonal line. Green light.
4. **ℕ inside ℤ:** the points $(n, 0)$ on the horizontal axis glow, and threads connect them to ℕ's dots (motif **Bijection / isomorphism**).
5. **ℚ lattice** (key visual): the integer grid ℤ × ℤ, with the horizontal axis $q = 0$ greyed out. Lines through the origin sweep around like a lighthouse beam; each line that hits lattice points is a rational number. The class of $\frac12$ is highlighted, passing through $(1,2), (2,4), (-1,-2), \dots$.
6. **The collapse if $q = 0$ were allowed:** the origin $(0,0)$ glows red and every line through it starts merging into one blob. Then the origin is removed and the lines separate again.
7. **The mediant trap:** two representatives of $\frac12$ go through the "⊕ machine" with $\frac13$; the outputs land on two different lines. Red light.
8. **Number tower** (recurring motif): the ℤ and ℚ floors are built, replacing their scaffolding. Plaques read "ring" and "field." The "What did we lose?" ledger gets two entries: "well-ordering" and "discreteness (no next number)."
9. **Teaser:** a zoom into the rational number line, which looks solid, and then a tiny gap appears at $\sqrt{2}$.

## Common misconceptions
- **Misconception:** "Negative numbers are just numbers with a minus sign attached." **Reality:** In the construction, $-2$ is a set of pairs, and the minus sign is a *name* for the inverse operation $[a, b] \mapsto [b, a]$. The sign is notation; the structure is what matters.
- **Misconception:** "Negative times negative is positive is a convention we could have chosen differently." **Reality:** It's forced by distributivity (Example 2).
- **Misconception:** "ℕ ⊂ ℤ ⊂ ℚ literally, as sets." **Reality:** In the construction, these are *embeddings*: ℤ contains a copy of ℕ, and ℚ contains a copy of ℤ. We identify each with its copy, which is harmless because the embeddings respect all the operations.
- **Misconception:** "A fraction is a pair of integers." **Reality:** A fraction is a *class* of pairs. "$\frac24$" and "$\frac12$" are two names for one rational number. Operations on fractions must give answers independent of the name (Example 4).
- **Misconception:** "We forbid division by zero because it gives infinity." **Reality:** In this construction, allowing $q = 0$ would make the relation glue *all* fractions together (§3). There's no consistent way to include it in a field.

## Exercises
- **Warm-up (computational):** Using pairs, compute $(-4) + 7$ and $(-4)\cdot 7$ in ℤ, each with two different choices of representatives. Then compute $\frac{3}{4} + \frac{-5}{6}$ and $\frac{3}{4}\cdot\frac{-5}{6}$ in ℚ and reduce.
- **Core (conceptual):** (a) Show that the order on ℤ, $[a,b] \le [c,d] \iff a + d \le b + c$, is well-defined. (b) Show that ℤ has no least element. (c) Show that between any two rationals $x < y$ there's another rational. Why does this fail in ℤ?
- **Stretch (proof):** (a) Prove that multiplication on ℤ is well-defined. (Hint: show it's enough to change one factor at a time.) (b) Prove that addition on ℚ is well-defined.

<details><summary>Hints and answers</summary>

- **Warm-up:** $-4 = [0, 4] = [1, 5]$, $7 = [7, 0] = [9, 2]$. $[0,4] + [7,0] = [7,4] = 3$; $[1,5]+[9,2] = [10, 7] = 3$. $[0,4]\cdot[7,0] = [0, 28] = -28$; $[1,5]\cdot[9,2] = [9 + 10, 2 + 45] = [19, 47] = -28$. In ℚ: $\frac34 + \frac{-5}{6} = \frac{18 - 20}{24} = \frac{-2}{24} = -\frac{1}{12}$; $\frac34 \cdot \frac{-5}{6} = \frac{-15}{24} = -\frac58$.
- **Core:** (a) If $(a, b) \sim (a', b')$ and $(c, d) \sim (c', d')$, then $a + d \le b + c \iff a + d + b' + c' \le b + c + b' + c'$; substitute $a + b' = b + a'$ and $c' + d = c + d'$ and cancel. (b) For any $x$, $x + (-1) < x$. (c) $\frac{x + y}{2}$ lies strictly between. In ℤ there's nothing between $0$ and $1$.
- **Stretch:** (a) Change the first factor: suppose $a + b' = b + a'$, and call this number $k$. Then $(ac + bd) + (a'd + b'c) = (a + b')c + (b + a')d = kc + kd$ and $(ad + bc) + (a'c + b'd) = (a + b')d + (b + a')c = kd + kc$. These are equal, which says exactly $(ac + bd,\ ad + bc) \sim (a'c + b'd,\ a'd + b'c)$. By commutativity of the formula, the same holds when changing the second factor; change one factor, then the other. (b) With $pq' = qp'$ and $rs' = sr'$: $(ps + qr)(q's') = (pq')ss' + (rs')qq' = (qp')ss' + (sr')qq' = (qs)(p's' + q'r')$.

</details>

## Historical note
Fractions are among the oldest mathematics on record: the Egyptian Rhind papyrus (c. 1550 BCE) is full of computations with unit fractions. Negative numbers took far longer to be accepted. Chinese mathematicians gave rules for combining positive and negative quantities in *The Nine Chapters on the Mathematical Art* (compiled by roughly the first century CE), and Liu Hui's third-century commentary describes red and black counting rods for the two kinds. Brahmagupta, in 628 CE, stated rules for arithmetic with negative numbers ("debts") and zero, including that the product of two debts is a fortune. Greek mathematicians, Diophantus among them, worked only with positive quantities, and European mathematicians remained uneasy about negative numbers well into the seventeenth and eighteenth centuries.

The idea of constructing new numbers as *pairs* of old ones became explicit in the nineteenth century. William Rowan Hamilton treated complex numbers as ordered pairs of reals in 1837 (↪ S1E10). As the foundations of arithmetic were rebuilt in the late nineteenth and early twentieth centuries, the constructions of ℤ and ℚ as equivalence classes of pairs became the standard textbook approach. The general construction of a "field of fractions" for any suitable ring belongs to the abstract algebra of the early twentieth century (↪ S1E18–S1E19).

## Connections
- **Callbacks:** ↩ S1E01 (the tower and its equations $x + 5 = 3$, $2x = 3$); ↩ S1E03 (cancellation in ℕ, commutativity, order); ↩ S1E04 (ordered pairs); ↩ S1E05 (equivalence classes, well-definedness, the fraction relation)
- **Sets up:**
  - ↪ S1E07: ℚ is dense but has holes; $x^2 = 2$ has no rational solution
  - ↪ S1E08: ℝ is built from ℚ; the Cauchy construction is a quotient again, with its own well-definedness trap
  - ↪ S1E10: ℂ as pairs of reals, the same "pairs" idea with a cleverer multiplication
  - ↪ S1E11: ℤ and ℚ are countable; the mediant reappears in the Calkin–Wilf tree
  - ↪ S1E16: ℤ under + is a group; ℚ∖{0} under × is a group
  - ↪ S1E17: ℤ/nℤ as a quotient of ℤ
  - ↪ S1E18: rings, zero divisors, and ideals; ℤ as the model ring
  - ↪ S1E19: fields; ℚ as the smallest field of characteristic 0
  - ↪ S3E01: field extensions of ℚ as vector spaces
- **Side quests:** p-adic numbers (after S1E08): a different way to complete ℚ.

## References
- **Primary / historical**
  - Brahmagupta, *Brāhmasphuṭasiddhānta* (628 CE), the chapter on algebra, with rules for zero and negative numbers. (Discussed in the histories below.)
  - William Rowan Hamilton, "Theory of Conjugate Functions, or Algebraic Couples; with a Preliminary and Elementary Essay on Algebra as the Science of Pure Time," *Transactions of the Royal Irish Academy* 17 (1837).
- **Textbooks**
  - Terence Tao, *Analysis I* (3rd ed., 2016), Chapter 4 ("Integers and rationals"), §4.1 (integers as formal differences) and §4.2 (rationals as formal quotients).
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 5 ("Construction of the Real Numbers"), which begins with ℤ and ℚ as equivalence classes.
  - Elliott Mendelson, *Number Systems and the Foundations of Analysis* (1973; Dover reprint 2008), the chapters on the integers and the rational numbers.
- **Accessible**
  - Victor J. Katz, *A History of Mathematics: An Introduction* (3rd ed., 2009), on Chinese and Indian work with negative numbers and on the history of fractions.
  - Timothy Gowers, *Mathematics: A Very Short Introduction* (2002), Chapter 2 ("Numbers and abstraction"), on why $(-1)\cdot(-1) = 1$ is forced by the rules we want.
