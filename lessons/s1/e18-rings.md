# S1E18: Rings: Adding *and* Multiplying

> **Season / Act:** Season 1, Act IV (Forget What It Is, Keep What It Does) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E03 (arithmetic from Peano), S1E05 (equivalence classes), S1E06 (ℤ and ℚ; well-definedness), S1E10 (ℂ as pairs of reals), S1E16–S1E17 (groups, homomorphisms, kernels, quotients). Outside knowledge: polynomial and matrix multiplication ·
> **Builds toward:** S1E19 (fields; ℚ[x]/(irreducible) as a field), S2E01 (vector spaces), S2E04 (matrix rings), S3E01 (field extensions), S3E02 (modules over rings; PIDs)

## Learning objectives
By the end of this lesson the viewer can:
1. State the ring axioms, give examples (ℤ, ℤ/n, polynomials, matrices) and non-examples, and prove elementary consequences such as $0 \cdot a = 0$ and $(-1)(-1) = 1$.
2. Identify zero divisors and units, and prove that ℤ/n has no zero divisors exactly when n is prime.
3. Define ideals and quotient rings, and show that $\mathbb{R}[x]/(x^2+1) \cong \mathbb{C}$.
4. Use the norm to show that unique factorization fails in $\mathbb{Z}[\sqrt{-5}]$, and explain how factoring into *ideals* restores it.

## Cold open
*Narrator:*

"On a 6-hour clock, two times three is zero. Not 'about zero,' not 'zero after rounding': exactly zero. Two things, neither of them nothing, multiply to nothing. In school, if a product is zero, one factor must be zero. That's how you solve equations. On this clock, the rule is broken.

Now a second puzzle. Every whole number splits into primes in only one way: 6 is 2 times 3, and that's that. Euclid knew this. But let's allow one new number, the square root of minus five, and do arithmetic with all numbers of the form a + b√−5. Then 6 is 2 times 3. And 6 is also (1 + √−5) times (1 − √−5). And none of these four factors can be broken down any further. Two completely different factorizations into 'primes.'

In the 1840s, a flawed proof of Fermat's Last Theorem collapsed over exactly this problem. And the repair invented an idea, the *ideal*, that now sits at the center of algebra.

Clocks, polynomials, matrices, whole numbers: today we look at everything that lets you add *and* multiply. And we'll find, hiding inside, the cleanest construction yet of the complex numbers."

## The story

### 1. The naive attempt: a group that can also multiply
S1E16 gave us groups: one operation. But ℤ has two, and they interact through the distributive law. Lots of other systems share this:

| System | + | × | Commutative ×? |
|---|---|---|---|
| ℤ | usual | usual | yes |
| ℤ/n (clock arithmetic) | mod n | mod n | yes |
| ℝ[x] (real polynomials) | add coefficients | multiply out | yes |
| $M_2(\mathbb{R})$ (2×2 matrices) | entrywise | row-times-column | **no** |
| Functions ℝ → ℝ | pointwise | pointwise | yes |

The naive guess "it's like ℤ" fails immediately: matrices don't commute, and as we'll see, products can vanish without either factor vanishing. We need to say precisely which rules are shared, and then study what can go wrong.

> **Definition (ring).** A **ring** is a set $R$ with two operations $+$ and $\cdot$ and elements $0, 1$ such that
> 1. $(R, +)$ is an abelian group with identity 0;
> 2. multiplication is associative and has identity 1: $(ab)c = a(bc)$, $1a = a1 = a$;
> 3. **distributive laws:** $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$.
>
> $R$ is **commutative** if $ab = ba$ for all $a, b$. (Some books do not require a 1; we always do.)

Non-examples: ℕ (no additive inverses, ↩ S1E06); the even integers (no multiplicative identity, under our convention); the vectors in ℝ³ with the cross product (not associative).

Here is the first complete proof, and it answers a question every student has asked: *why is a negative times a negative positive?*

> **Proposition.** In any ring: (a) $0 \cdot a = a \cdot 0 = 0$; (b) $(-a)b = -(ab)$; (c) $(-1)(-1) = 1$.

*Proof.* (a) $0 \cdot a = (0 + 0)\cdot a = 0 \cdot a + 0 \cdot a$. Add $-(0 \cdot a)$ to both sides: $0 = 0 \cdot a$. The other side is the same.
(b) $ab + (-a)b = (a + (-a))b = 0 \cdot b = 0$, so $(-a)b$ is the additive inverse of $ab$.
(c) By (b) twice, $(-1)(-1) = -(1 \cdot (-1)) = -(-1) = 1$. ∎

So "minus times minus is plus" isn't a convention. It is forced by the distributive law. If you want distributivity (and you do, since it's what makes algebra work), you have no choice.

### 2. The first crisis: zero divisors and units
> **Definitions.** In a commutative ring $R$:
> - $a \neq 0$ is a **zero divisor** if $ab = 0$ for some $b \neq 0$.
> - $u$ is a **unit** if $uv = 1$ for some $v$. The units form a group $R^\times$ under multiplication.
> - $R$ is an **integral domain** if $1 \neq 0$ and $R$ has no zero divisors.
> - $R$ is a **field** if $1 \neq 0$ and every nonzero element is a unit.

In ℤ/6, $2 \cdot 3 = 0$, $3 \cdot 4 = 12 \equiv 0$: zero divisors (Worked Example 1). In $M_2(\mathbb{R})$, $\begin{pmatrix}1&0\\0&0\end{pmatrix}\begin{pmatrix}0&0\\0&1\end{pmatrix} = 0$. In an integral domain we can cancel: if $ab = ac$ and $a \ne 0$, then $a(b - c) = 0$, so $b = c$. That's the property that makes "solve by factoring" work.

> **Theorem.** For $n \ge 2$, the following are equivalent: (i) $n$ is prime; (ii) ℤ/n is an integral domain; (iii) ℤ/n is a field.

*Proof.* (iii ⇒ ii) In a field, if $ab = 0$ and $a \ne 0$, then $b = a^{-1}ab = 0$.
(ii ⇒ i) If $n = jk$ with $1 < j, k < n$, then $j \cdot k \equiv 0$ with $j, k \not\equiv 0$: zero divisors.
(i ⇒ iii) Let $p$ be prime and $a \not\equiv 0 \pmod p$. Then $\gcd(a, p) = 1$, so by Bézout there are integers $x, y$ with $ax + py = 1$. Reducing mod $p$: $ax \equiv 1$. So $a$ is a unit. ∎

(The same argument shows: the units of ℤ/n are exactly the classes $a$ with $\gcd(a, n) = 1$, such as $U(12) = \{1, 5, 7, 11\}$ from S1E16.)

### 3. Ideals and quotient rings
S1E17 showed that the right things to divide a group by are kernels. Let's find the analogue for rings.

> **Definition (ring homomorphism).** $\varphi: R \to S$ with $\varphi(a + b) = \varphi(a) + \varphi(b)$, $\varphi(ab) = \varphi(a)\varphi(b)$, $\varphi(1) = 1$.

What does a kernel $I = \ker\varphi$ look like? It's an additive subgroup, and it has an extra property: if $a \in I$ and $r \in R$, then $\varphi(ra) = \varphi(r)\cdot 0 = 0$, so $ra \in I$. The kernel *absorbs* multiplication.

> **Definition (ideal).** An **ideal** of a commutative ring $R$ is an additive subgroup $I \subseteq R$ such that $ra \in I$ for all $r \in R$, $a \in I$. The ideal **generated** by $a_1, \dots, a_k$ is $(a_1, \dots, a_k) = \{r_1 a_1 + \dots + r_k a_k : r_i \in R\}$. An ideal of the form $(a)$ is **principal**.

Ideals are **generalized multiples**. In ℤ, the ideal $(n) = n\mathbb{Z}$ is "all multiples of n." And "$a$ divides $b$" becomes "$b \in (a)$," i.e. $(b) \subseteq (a)$: to contain is to divide. In ℤ every ideal is principal: $(4, 6) = (2)$, since $2 = 6 - 4$ is in the ideal and 2 divides both generators.

> **Theorem (quotient ring).** If $I$ is an ideal of $R$, the cosets $a + I$ form a ring $R/I$ with
> $$(a + I) + (b + I) = (a + b) + I, \qquad (a + I)(b + I) = ab + I.$$
> The map $R \to R/I$, $a \mapsto a + I$, is a surjective ring homomorphism with kernel $I$.

*Proof of well-definedness for ×.* If $a' = a + i$ and $b' = b + j$ with $i, j \in I$, then $a'b' = ab + (aj + ib + ij)$. Each of $aj$, $ib$, $ij$ is in $I$ by absorption, so $a'b' + I = ab + I$. (Addition is the group case from S1E17; $(R, +)$ is abelian, so every subgroup is normal.) ∎

> **First Isomorphism Theorem for rings.** If $\varphi: R \to S$ is a ring homomorphism, then $R/\ker\varphi \cong \operatorname{im}\varphi$.

The proof is the group proof from S1E17, plus one line checking multiplication. Examples:
- $\mathbb{Z}/(n) = \mathbb{Z}/n\mathbb{Z}$: clock arithmetic is a quotient ring. Ep. 5's "same remainder" relation is the coset relation of the ideal $(n)$.
- **The payoff.** Let $\mathrm{ev}_i: \mathbb{R}[x] \to \mathbb{C}$ be "evaluate at $i$": $p(x) \mapsto p(i)$. It is a ring homomorphism, surjective because $a + bx \mapsto a + bi$. Its kernel is the set of real polynomials with $i$ as a root. Such a polynomial also has $-i$ as a root (real coefficients), so it is divisible by $(x - i)(x + i) = x^2 + 1$; conversely every multiple of $x^2+1$ vanishes at $i$. So $\ker = (x^2 + 1)$, and
$$\boxed{\ \mathbb{R}[x]/(x^2 + 1) \cong \mathbb{C}\ }$$

S1E10 built ℂ as pairs of reals with "a clever multiplication." Here is where the cleverness comes from: take polynomials, and declare $x^2 + 1 = 0$. The rule $i^2 = -1$ isn't a definition pulled from the air. It is the one relation we imposed, and everything else is ordinary polynomial arithmetic. **Build or describe:** the pairs construction builds ℂ; the quotient describes it as "the most general ring containing ℝ and a square root of −1."

### 4. The second crisis: unique factorization fails
In ℤ, every nonzero non-unit factors into primes, uniquely up to order and signs. Is that a law of nature, or a lucky property of ℤ?

Consider $\mathbb{Z}[\sqrt{-5}] = \{a + b\sqrt{-5} : a, b \in \mathbb{Z}\}$, a subring of ℂ. To study divisibility, use the **norm**
$$N(a + b\sqrt{-5}) = (a + b\sqrt{-5})(a - b\sqrt{-5}) = a^2 + 5b^2.$$
It is the squared absolute value in ℂ, so it is **multiplicative**: $N(\alpha\beta) = N(\alpha)N(\beta)$. Consequences:
- $\alpha$ is a unit iff $N(\alpha) = 1$ (if $\alpha\beta = 1$ then $N(\alpha)N(\beta) = 1$ in the positive integers). Since $a^2 + 5b^2 = 1$ forces $b = 0, a = \pm1$, the units are only $\pm 1$.
- If $\alpha = \beta\gamma$, then $N(\beta)$ divides $N(\alpha)$.

> **Definitions.** A nonzero non-unit $p$ is **irreducible** if $p = ab$ implies $a$ or $b$ is a unit. It is **prime** if $p \mid ab$ implies $p \mid a$ or $p \mid b$.

In ℤ the two notions coincide (that's Euclid's lemma, the heart of unique factorization). In $\mathbb{Z}[\sqrt{-5}]$ they don't. Worked Example 3 shows that $2$, $3$, $1 + \sqrt{-5}$, $1 - \sqrt{-5}$ are all irreducible and that
$$6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$$
are two genuinely different factorizations. In particular, 2 divides the product $(1 + \sqrt{-5})(1 - \sqrt{-5}) = 6$ but divides neither factor, so **2 is irreducible but not prime**.

### 5. The rescue: factor the ideals instead
Kummer's insight (for cyclotomic integers, in the 1840s) was that the missing primes exist, just not as numbers. He called them "ideal numbers." Dedekind (1871) made them concrete as *ideals*: sets of numbers that behave like "the multiples of a missing prime." In $\mathbb{Z}[\sqrt{-5}]$, define
$$P = (2,\ 1 + \sqrt{-5}), \qquad Q = (3,\ 1 + \sqrt{-5}), \qquad Q' = (3,\ 1 - \sqrt{-5}).$$
None of these is principal (Worked Example 4 checks $P$), so they are not generated by any single number; they are the "ideal numbers." Multiplying ideals (the ideal generated by all products), one finds
$$(2) = P^2, \qquad (3) = QQ', \qquad (1 + \sqrt{-5}) = PQ, \qquad (1 - \sqrt{-5}) = PQ'.$$
So both factorizations of 6 are regroupings of the same four prime ideals:
$$(6) = (2)(3) = P\,P\,Q\,Q' \quad\text{and}\quad (6) = (1+\sqrt{-5})(1-\sqrt{-5}) = (PQ)(PQ').$$

> **Theorem (Dedekind).** In the ring of integers of any number field (such as $\mathbb{Z}[\sqrt{-5}]$ or $\mathbb{Z}[i]$), every nonzero ideal factors **uniquely** as a product of prime ideals.

Unique factorization is restored, one level up. Numbers can misbehave; ideals can't. How badly numbers misbehave is measured by the *class group* (ideals modulo principal ideals); for $\mathbb{Z}[\sqrt{-5}]$ it has order 2. Rings where every ideal is principal (like ℤ, $\mathbb{Z}[i]$, and $F[x]$ for a field $F$) are called **principal ideal domains**, and in them ordinary unique factorization holds. They return in S3E02.

### 6. Zoom out
A ring is "whatever you can add, subtract and multiply in," defined by behavior, not substance. The two constructions of this episode, ℤ/n and $\mathbb{R}[x]/(x^2+1)$, are the same move: start with a familiar ring, choose an ideal, glue (thread 2: equivalence classes and quotients). Which ideals give *fields*? ℤ/(p) for primes $p$, and $\mathbb{R}[x]/(x^2+1)$ because $x^2 + 1$ can't be factored over ℝ. Whereas $\mathbb{R}[x]/(x^2 - 1)$ has zero divisors, because $x^2 - 1 = (x-1)(x+1)$. **Teaser:** "irreducible polynomial ↦ field" is a machine for manufacturing fields, including fields with 4, 8, or 9 elements, and it is the key to proving that you can't trisect an angle. That's next episode.

## Worked examples

### Example 1: ℤ/6, zero divisors and units
The multiplication table mod 6 (each entry is $ab \bmod 6$):

| × | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 |
| **2** | 0 | 2 | 4 | 0 | 2 | 4 |
| **3** | 0 | 3 | 0 | 3 | 0 | 3 |
| **4** | 0 | 4 | 2 | 0 | 4 | 2 |
| **5** | 0 | 5 | 4 | 3 | 2 | 1 |

Sample entries: $4 \cdot 5 = 20 = 3 \cdot 6 + 2 \equiv 2$; $5 \cdot 5 = 25 = 4 \cdot 6 + 1 \equiv 1$; $3 \cdot 4 = 12 \equiv 0$.

- **Zero divisors:** 2 ($2 \cdot 3 = 0$), 3 ($3 \cdot 2 = 0$, $3 \cdot 4 = 0$), 4 ($4 \cdot 3 = 0$). These are exactly the nonzero $a$ with $\gcd(a, 6) > 1$.
- **Units:** 1 and 5 (a 1 appears in their rows). $(\mathbb{Z}/6)^\times = \{1, 5\} \cong \mathbb{Z}/2$.
- **Cancellation fails:** $2 \cdot 1 = 2 = 2 \cdot 4$, but $1 \neq 4$.
- **Equations misbehave:** $x^2 = x$ means $x(x - 1) = 0$. In ℤ the solutions are 0, 1. In ℤ/6, testing all six: $0^2 = 0$, $1^2 = 1$, $2^2 = 4$, $3^2 = 9 \equiv 3$ ✓, $4^2 = 16 \equiv 4$ ✓, $5^2 = 25 \equiv 1$. So $x \in \{0, 1, 3, 4\}$: four solutions to a quadratic.

### Example 2: Computing in ℝ[x]/(x² + 1), and two impostors
**(a)** Multiply the classes of $1 + 2x$ and $3 - x$:
$$(1 + 2x)(3 - x) = 3 - x + 6x - 2x^2 = 3 + 5x - 2x^2.$$
Reduce using $x^2 \equiv -1$ (i.e. subtract $-2(x^2 + 1)$): $3 + 5x - 2(-1) = 5 + 5x$.
Compare in ℂ: $(1 + 2i)(3 - i) = 3 - i + 6i - 2i^2 = 3 + 5i + 2 = 5 + 5i$. ✓

**(b) General product.** $(a + bx)(c + dx) = ac + (ad + bc)x + bd\,x^2 \equiv (ac - bd) + (ad + bc)x$, which is exactly S1E10's rule $(a, b)\cdot(c, d) = (ac - bd, ad + bc)$.

**(c) Inverse.** Find the inverse of $1 + x$. Try $(1 + x)(c + dx) = (c - d) + (c + d)x$. We need $c - d = 1$, $c + d = 0$, so $c = \tfrac12$, $d = -\tfrac12$. Check: $(1 + x)\left(\tfrac12 - \tfrac12 x\right) = \tfrac12 - \tfrac12 x^2 \equiv \tfrac12 + \tfrac12 = 1$. ✓ (In ℂ: $1/(1+i) = (1 - i)/2$.)

**(d) Impostor 1: $\mathbb{R}[x]/(x^2 - 1)$.** Here $(x - 1)(x + 1) = x^2 - 1 \equiv 0$, but neither $x - 1$ nor $x + 1$ is a multiple of $x^2 - 1$ (degree 1), so their classes are nonzero. Zero divisors: not a field.

**(e) Impostor 2: $\mathbb{R}[x]/(x^2)$** (the "dual numbers"). The class of $x$ is nonzero but $x \cdot x \equiv 0$. Not even an integral domain. The difference between (a) and (d), (e) is whether the polynomial is irreducible over ℝ.

### Example 3: Two factorizations of 6 in ℤ[√−5]
**Step 1: the products.** $2 \cdot 3 = 6$, and $(1 + \sqrt{-5})(1 - \sqrt{-5}) = 1 - (\sqrt{-5})^2 = 1 - (-5) = 6$.

**Step 2: the norms.** $N(2) = 4$, $N(3) = 9$, $N(1 \pm \sqrt{-5}) = 1 + 5 = 6$.

**Step 3: no element has norm 2 or 3.** $a^2 + 5b^2 \in \{2, 3\}$ forces $b = 0$ (else the value is ≥ 5), and then $a^2 \in \{2, 3\}$, impossible for an integer $a$.

**Step 4: all four factors are irreducible.** If $2 = \beta\gamma$ with neither a unit, then $N(\beta)N(\gamma) = 4$ with both norms > 1, so $N(\beta) = 2$: impossible. Same for 3 (would need norm 3) and for $1 \pm \sqrt{-5}$ (norm 6 = 2 · 3 would need a factor of norm 2 or 3).

**Step 5: the factorizations really differ.** The units are only ±1, so the factorizations would agree only if $1 + \sqrt{-5} = \pm 2$ or $\pm 3$. Its norm is 6, not 4 or 9. So $2$ is not "a unit times" $1 + \sqrt{-5}$, and the two factorizations are different.

**Step 6: 2 is not prime.** $2 \mid 6 = (1 + \sqrt{-5})(1 - \sqrt{-5})$. Does $2 \mid 1 + \sqrt{-5}$? That would mean $\frac{1 + \sqrt{-5}}{2} = \frac12 + \frac12\sqrt{-5} \in \mathbb{Z}[\sqrt{-5}]$, but the coefficients aren't integers. Same for $1 - \sqrt{-5}$. So 2 divides a product without dividing either factor. ∎

### Example 4: Checking the ideal factorizations
Write $w = \sqrt{-5}$, so $w^2 = -5$.

**$P^2 = (2)$.** $P^2$ is generated by all products of generators: $2 \cdot 2 = 4$, $2(1 + w) = 2 + 2w$, and $(1 + w)^2 = 1 + 2w + w^2 = -4 + 2w$.
- $P^2 \subseteq (2)$: each generator is 2 times an element of the ring ($2$, $1 + w$, $-2 + w$).
- $(2) \subseteq P^2$: $(2 + 2w) - (-4 + 2w) - 4 = 2 + 4 - 4 = 2$. So $2 \in P^2$.

**$QQ' = (3)$.** Generators: $9$, $3(1 - w)$, $3(1 + w)$, $(1 + w)(1 - w) = 6$. All are multiples of 3, and $9 - 6 = 3$. ✓

**$PQ = (1 + w)$.** Generators: $6$, $2(1 + w)$, $3(1 + w)$, $(1 + w)^2$. Each is a multiple of $1 + w$ (note $6 = (1 + w)(1 - w)$), and $3(1 + w) - 2(1 + w) = 1 + w$. ✓ By complex conjugation, $PQ' = (1 - w)$.

**$P$ is not principal.** An element $x + yw$ of $P$ is $2(a + bw) + (1 + w)(c + dw) = (2a + c - 5d) + (2b + c + d)w$, and $(2a + c - 5d) - (2b + c + d) = 2a - 2b - 6d$ is even. So **every element of $P$ has $x \equiv y \pmod 2$**. In particular $1 \notin P$, so $P$ is a proper ideal. If $P = (\alpha)$, then $\alpha$ divides both 2 and $1 + w$, so $N(\alpha)$ divides $\gcd(4, 6) = 2$. $N(\alpha) = 2$ is impossible (Step 3 of Example 3), and $N(\alpha) = 1$ makes $\alpha$ a unit, giving $P = R \ni 1$, which we just ruled out. So $P$ is not principal. ∎

## Visual and animation notes
1. **Cold open:** a 6-hour clock. A "×2" hand and a "×3" hand combine and the pointer lands on 0 with a thud. Then the number 6 splits into $2 \times 3$ on one side and $(1 + \sqrt{-5}) \times (1 - \sqrt{-5})$ on the other, each factor stamped "can't split further."
2. **Ring axioms:** a stamp "RING" lands on ℤ, a clock, a polynomial, a 2×2 matrix, a graph of a function (callback to the "vector space stamp" planned for S2E01). The matrix gets a small "×: non-commutative" flag.
3. **Minus times minus:** a short derivation animates the distributive law as an area model, showing why $(-1)(-1)$ has no freedom.
4. **ℤ/6 table:** heat-map coloring, zeros in dark; zero rows/columns for 2, 3, 4 stand out; the unit rows (1, 5) are permutations (callback to the sudoku property of S1E16).
5. **Ideals as multiples:** in ℤ, the ideal (6) as evenly spaced glowing points; (2) as a denser set containing it. Caption: "to contain is to divide."
6. **Quotient ring (blob motif):** polynomials on a "shelf"; all those differing by a multiple of $x^2 + 1$ blur into one blob. Each blob is labeled by its remainder $a + bx$, which slides onto the complex plane point $a + bi$ (isomorphism motif). Then S1E10's rotating plane plays again.
7. **Number tower ledger:** a footnote appears on the ℂ floor: "also = ℝ[x]/(x² + 1)."
8. **ℤ[√−5] lattice:** the points $a + b\sqrt{-5}$ drawn as a rectangular lattice in ℂ (spacing 1 horizontally, $\sqrt5$ vertically), with circles of radius $\sqrt2$ and $\sqrt3$ around 0 containing no lattice points: "no norm 2 or 3."
9. **Ideal numbers:** the ideal $P$ drawn as a sublattice (points with $x \equiv y \bmod 2$, a checkerboard). Four ideals $P, P, Q, Q'$ appear as colored tiles; they regroup into $(2)(3)$ and into $(1+\sqrt{-5})(1-\sqrt{-5})$, like the same four Lego bricks assembled two ways.
10. **Teaser:** the machine "polynomial ring ÷ irreducible polynomial = field" with $\mathbb{F}_2[x]/(x^2 + x + 1)$ entering and a 4-element field coming out, labeled "↪ S1E19."

## Common misconceptions
- **Misconception:** if $ab = 0$ then $a = 0$ or $b = 0$, in any number system. **Reality:** that holds only in integral domains. ℤ/6, matrices and $\mathbb{R}[x]/(x^2)$ all have zero divisors.
- **Misconception:** "irreducible" and "prime" mean the same thing. **Reality:** they agree in ℤ (and in any unique factorization domain), but in $\mathbb{Z}[\sqrt{-5}]$, 2 is irreducible and not prime.
- **Misconception:** an ideal is just a subring. **Reality:** an ideal must absorb multiplication by *every* ring element. ℤ is a subring of ℚ but not an ideal ($\tfrac12 \cdot 1 \notin \mathbb{Z}$). With our convention, a proper ideal never contains 1.
- **Misconception:** $i$ is "defined" as $\sqrt{-1}$, which is mysterious. **Reality:** in $\mathbb{R}[x]/(x^2+1)$, $i$ is just the class of the polynomial $x$, and $i^2 = -1$ because we glued $x^2 + 1$ to 0.
- **Misconception:** unique factorization is a basic law of arithmetic. **Reality:** it is a special property of ℤ (and of PIDs). It fails in many natural rings; Dedekind's ideals restore it in rings of integers.

## Exercises
- **Warm-up (computational):** Find all zero divisors and all units in ℤ/12. Then compute $(2 + 3x)(1 - x)$ in $\mathbb{R}[x]/(x^2 + 1)$ and check it against complex multiplication.
- **Core (conceptual):** Show that the units of a commutative ring form a group, and that a unit is never a zero divisor. Show that every ideal of ℤ is of the form $(n)$. (Hint: take the least positive element.)
- **Stretch (exploration):** In $\mathbb{Z}[\sqrt{-5}]$, show that $9 = 3 \cdot 3 = (2 + \sqrt{-5})(2 - \sqrt{-5})$ are two different factorizations into irreducibles. Which product of the prime ideals $Q, Q'$ is $(2 + \sqrt{-5})$?

<details><summary>Hints and answers</summary>

- **Warm-up:** Units: $\{1, 5, 7, 11\}$ (gcd 1 with 12). Zero divisors: $\{2, 3, 4, 6, 8, 9, 10\}$ (every other nonzero element; e.g. $8 \cdot 3 = 24 \equiv 0$, $9 \cdot 4 = 36 \equiv 0$, $10 \cdot 6 = 60 \equiv 0$). $(2 + 3x)(1 - x) = 2 + x - 3x^2 \equiv 5 + x$; $(2 + 3i)(1 - i) = 2 - 2i + 3i + 3 = 5 + i$ ✓.
- **Core:** If $uv = 1$ and $u'v' = 1$ then $(uu')(v'v) = 1$; inverses are units by definition. If $u$ is a unit and $ub = 0$, then $b = vub = 0$. For ideals of ℤ: if $I \ne 0$, let $n$ be its least positive element; for $m \in I$, write $m = qn + r$ with $0 \le r < n$; then $r = m - qn \in I$, so $r = 0$ by minimality. Hence $I = (n)$.
- **Stretch:** $N(3) = 9$, $N(2 \pm \sqrt{-5}) = 4 + 5 = 9$; a proper factor would need norm 3, impossible. Units are ±1 and $2 + \sqrt{-5} \ne \pm 3$. One finds $(2 + \sqrt{-5}) = Q'^2$ and $(2 - \sqrt{-5}) = Q^2$ (check: $2 + w = 3 - (1 - w) \in Q'$, and $Q'^2$ is generated by $9$, $3(1 - w)$, $(1 - w)^2 = -4 - 2w$, each a multiple of $2 + w$; e.g. $(2 + w)(2 - w) = 9$, $(2 + w)(-1 - w) = -2 - 3w - w^2 = 3 - 3w$, $(2 + w)(-2) = -4 - 2w$). Then $(9) = Q^2 Q'^2$ both ways.

</details>

## Historical note
In March 1847, Gabriel Lamé announced to the Paris Academy a proof of Fermat's Last Theorem that factored $x^n + y^n$ using complex roots of unity. Joseph Liouville immediately pointed out that the argument assumed unique factorization in these new number systems, without justification. Ernst Kummer had already found that unique factorization fails in some of these rings, and in the mid-1840s he introduced "ideal complex numbers" to restore it, which let him prove Fermat's Last Theorem for a large class of prime exponents (the regular primes).

Richard Dedekind recast Kummer's ideal numbers as *ideals*, sets of ordinary numbers closed under addition and under multiplication by ring elements, in his famous Supplement X to the 1871 second edition of Dirichlet's *Vorlesungen über Zahlentheorie*. David Hilbert's 1897 report on algebraic number theory (the *Zahlbericht*) introduced the word *Zahlring*, from which "ring" comes. Abraham Fraenkel gave an early axiomatic definition of rings in 1914, and Emmy Noether's 1921 paper *Idealtheorie in Ringbereichen* established the abstract theory of ideals in commutative rings.

## Connections
- **Callbacks:** ↩ S1E03 (Peano arithmetic; ℕ under + and ×), ↩ S1E05 (same remainder mod n as an equivalence relation), ↩ S1E06 (ℤ is a ring; well-definedness), ↩ S1E10 (ℂ as pairs with $(a,b)(c,d) = (ac - bd, ad + bc)$), ↩ S1E15 (Gödel numbering relied on unique factorization in ℤ), ↩ S1E16 (U(12), the sudoku property), ↩ S1E17 (kernels, quotients, the First Isomorphism Theorem)
- **Sets up:** ↪ S1E19 (fields; $F[x]/(\text{irreducible})$ is a field; finite fields), ↪ S1E20 (the finale's number tower: ℤ as a ring), ↪ S2E01 (vector spaces need a field of scalars, not just a ring), ↪ S2E04 (the ring of matrices; non-commutativity), ↪ S3E01 (norm as the determinant of multiplication), ↪ S3E02 (modules over a PID; what we lose when scalars form only a ring)
- **Side quests:** Cayley–Dickson (after S1E10): quaternions and octonions as non-commutative and non-associative relatives of rings; p-adic numbers (after S1E08)

## References
- **Primary / historical**
  - Richard Dedekind, Supplement X in P. G. Lejeune Dirichlet, *Vorlesungen über Zahlentheorie*, 2nd edition (Vieweg, 1871); later expanded in subsequent editions.
  - Emmy Noether, "Idealtheorie in Ringbereichen," *Mathematische Annalen* 83 (1921).
  - David Hilbert, "Die Theorie der algebraischen Zahlkörper" (the *Zahlbericht*), *Jahresbericht der Deutschen Mathematiker-Vereinigung* 4 (1897).
- **Textbooks**
  - David S. Dummit and Richard M. Foote, *Abstract Algebra* (3rd ed., Wiley, 2004), Chapter 7 (rings, ideals, quotient rings) and Chapter 8 (Euclidean domains, PIDs, UFDs).
  - Michael Artin, *Algebra* (2nd ed., Pearson, 2011), Chapter 11 (rings) and Chapters 12–13 (factoring; quadratic number fields, including ideal factorization in $\mathbb{Z}[\sqrt{-5}]$).
  - Charles C. Pinter, *A Book of Abstract Algebra* (2nd ed., 1990; Dover 2010), Chapters 17–22 (rings, ideals, quotient rings, integral domains, factoring into primes).
  - Ian Stewart and David Tall, *Algebraic Number Theory and Fermat's Last Theorem* (A K Peters / CRC Press, 3rd ed. 2002; 4th ed. 2015), for norms, ideals and Kummer's work.
- **Accessible**
  - Harold M. Edwards, *Fermat's Last Theorem: A Genetic Introduction to Algebraic Number Theory* (Springer, 1977): the Lamé–Kummer story and ideal numbers.
  - Israel Kleiner, *A History of Abstract Algebra* (Birkhäuser, 2007), chapters on the history of ring theory.
