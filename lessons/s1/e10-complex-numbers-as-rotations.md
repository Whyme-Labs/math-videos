# S1E10: ℂ: Numbers as Rotations

> **Season / Act:** Season 1, Act II (Repairing the Defects), final episode · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E06 (building new numbers as pairs), S1E08 (ℝ as the complete ordered field); outside knowledge: sine, cosine, and the angle-addition formulas ·
> **Builds toward:** S1E16 (the unit circle as a group), S1E18 (ℂ as the quotient ring ℝ[x]/(x² + 1)), S1E19–S1E20 (fields; ℂ as the algebraic closure of ℝ), S2E12 (eigenvalues need ℂ), S2E15 (unitary spaces and U(1)), S3E11 (Lie groups)

## Learning objectives
By the end of this lesson the viewer can:
1. Define ℂ as ordered pairs of reals with a specific multiplication, and verify that $i^2 = -1$ and that every nonzero element has an inverse.
2. Explain geometrically why multiplying by $i$ is a quarter turn, and prove that multiplying complex numbers multiplies lengths and adds angles.
3. Prove that ℂ cannot be made into an ordered field.
4. State the Fundamental Theorem of Algebra, sketch why it is true, and explain why it means the algebraic repairs of the number tower are finished.

## Cold open
*Narrator, over a 16th-century printed page and a cubic graph:*

In 1572, the Italian engineer Rafael Bombelli was staring at a cubic equation with a perfectly ordinary answer.

$$x^3 = 15x + 4.$$

Try $x = 4$: $64 = 60 + 4$. Done. A whole number. Nothing strange.

But there was a famous formula for cubics, published a few decades earlier by Cardano, and when Bombelli fed this equation into it, the formula demanded the square root of *minus 121*. A number whose square is negative. Nonsense, by every rule anyone knew.

Here's what Bombelli did. Instead of giving up, he played along. He treated $\sqrt{-1}$ as a symbol that obeys the usual rules of algebra, ground through the calculation, and the "impossible" parts cancelled out exactly, leaving: 4.

The right answer, reached by walking *through* the impossible.

So these weren't tricks for imaginary equations. They were needed to get real answers to real questions. Today we'll stop treating them as ghosts and build them, exactly the way we built every other floor of the tower. And we'll find out what they really are: not "imaginary" at all, but *turns*.

## The story

### 1. The naive attempt: "just declare √−1 exists"

The defect is easy to state: the equation $x^2 + 1 = 0$ has no solution in ℝ, because squares of reals are never negative. The naive repair is to declare a new symbol $i$ with $i^2 = -1$ and hope the usual algebra still works.

That hope is not automatic. Declaring things into existence is exactly what the series has avoided since ↩ S1E06. A symbol with made-up rules might lead to a contradiction: compare "let $\infty$ be a number with $\infty + 1 = \infty$," which immediately gives $1 = 0$ if you also want subtraction. We need to *construct* a field containing ℝ and an element squaring to $-1$, then check that it really is a field.

### 2. The construction: pairs with a clever multiplication

Same move as ℤ from pairs of naturals and ℚ from pairs of integers (↩ S1E06): use pairs, and choose the operations carefully. This time there is no equivalence relation; different pairs are different numbers.

> **Definition (complex numbers).** ℂ is the set $\mathbb{R}^2$ of ordered pairs $(a, b)$ of real numbers with
> $$(a, b) + (c, d) = (a + c,\ b + d),$$
> $$(a, b) \cdot (c, d) = (ac - bd,\ ad + bc).$$
> We identify the real number $a$ with $(a, 0)$ and write $i = (0, 1)$.

**Checks.**
- The reals sit inside: $(a, 0) + (c, 0) = (a + c, 0)$ and $(a, 0)(c, 0) = (ac - 0,\ 0 + 0) = (ac, 0)$. So the old arithmetic is unchanged.
- $i^2 = (0, 1)(0, 1) = (0 \cdot 0 - 1 \cdot 1,\ 0 \cdot 1 + 1 \cdot 0) = (-1, 0) = -1$. The defect is repaired.
- Every pair can be written $(a, b) = (a, 0) + (b, 0)(0, 1) = a + bi$, which recovers the familiar notation. With it, the multiplication rule is just "expand and use $i^2 = -1$":
  $$(a + bi)(c + di) = ac + adi + bci + bd\,i^2 = (ac - bd) + (ad + bc)i.$$
- **Inverses.** Define the **conjugate** $\overline{a + bi} = a - bi$ and note
  $$(a + bi)(a - bi) = a^2 + b^2,$$
  a nonnegative *real* number, zero only for $a = b = 0$. So for $z = a + bi \neq 0$,
  $$z^{-1} = \frac{a - bi}{a^2 + b^2} = \left(\frac{a}{a^2 + b^2},\ \frac{-b}{a^2 + b^2}\right).$$
- Commutativity, associativity, and distributivity follow from the formulas by direct (if tedious) expansion.

> **Theorem.** ℂ with these operations is a field containing ℝ as a subfield, and $i^2 = -1$.

So the construction succeeds. The skeptic who called $i$ "imaginary" is answered: $i$ is the pair $(0, 1)$, and the whole of ℂ is built from ℝ with no new assumptions.

### 3. The real idea: multiplication is rotation and scaling

Pairs of reals are points in the plane. So what does multiplication *do* to the plane?

Start with $i$. Multiplying any $z = a + bi$ by $i$:
$$i(a + bi) = ai + b\,i^2 = -b + ai,$$
i.e. $(a, b) \mapsto (-b, a)$. That is exactly a counterclockwise rotation by 90° about the origin. Do it twice and you rotate by 180°, sending $(a, b)$ to $(-a, -b)$: multiplying by $i^2$ is multiplying by $-1$. **"$i^2 = -1$" just says that two quarter turns make a half turn.** "Negative" was always "turned around," and $i$ is halfway there.

For a general complex number, use polar coordinates.

> **Definition (modulus and argument).** For $z = a + bi$, the **modulus** is $|z| = \sqrt{a^2 + b^2}$ (its distance from 0), and an **argument** is any angle $\theta$ with $z = |z|(\cos\theta + i\sin\theta)$ (its direction). The argument is defined for $z \neq 0$, up to multiples of $2\pi$.

> **Theorem (multiplication = scale and rotate).** If $z = r(\cos\alpha + i\sin\alpha)$ and $w = s(\cos\beta + i\sin\beta)$, then
> $$zw = rs\,\big(\cos(\alpha + \beta) + i\sin(\alpha + \beta)\big).$$
> In words: lengths multiply and angles add.

**Proof.** Expand using the multiplication rule:
$$zw = rs\,\big[(\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\cos\alpha\sin\beta + \sin\alpha\cos\beta)\big].$$
By the angle-addition formulas, $\cos\alpha\cos\beta - \sin\alpha\sin\beta = \cos(\alpha + \beta)$ and $\sin\alpha\cos\beta + \cos\alpha\sin\beta = \sin(\alpha + \beta)$. ∎

So the strange rule $(ac - bd,\ ad + bc)$ is not arbitrary at all. It is *the* rule that makes multiplication mean "scale by $|w|$ and rotate by $\arg w$." In particular, $|zw| = |z|\,|w|$, and multiplication by a number on the unit circle ($|w| = 1$) is a pure rotation.

**A shorthand.** Writing $e^{i\theta}$ for $\cos\theta + i\sin\theta$ (Euler's formula, which can be justified with power series), the theorem becomes $r e^{i\alpha} \cdot s e^{i\beta} = rs\,e^{i(\alpha + \beta)}$, the law of exponents. Taking $\theta = \pi$ gives the famous $e^{i\pi} = -1$: a half turn.

**The linear-algebra view (seed for Season 2).** Multiplication by $w = c + di$ sends $(x, y)$ to $(cx - dy,\ dx + cy)$. That is a *linear map* of the plane, with matrix
$$\begin{pmatrix} c & -d \\ d & c \end{pmatrix} = |w| \begin{pmatrix} \cos\beta & -\sin\beta \\ \sin\beta & \cos\beta \end{pmatrix}.$$
A complex number *is* a rotation-and-scaling of the plane. Now look at multiplication by $i$, the matrix $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$. Does it have a real eigenvector, a direction it leaves on its own line? No: it turns every direction by 90°. Over ℝ this map has no eigenvalues; over ℂ it has eigenvalues $\pm i$. That is why eigenvalue theory in ↪ S2E12 needs complex numbers.

### 4. What we gained: the Fundamental Theorem of Algebra

We built ℂ to solve one equation, $x^2 + 1 = 0$. We get every polynomial equation for free.

> **Theorem (Fundamental Theorem of Algebra).** Every non-constant polynomial $p(z) = a_n z^n + \cdots + a_1 z + a_0$ with complex coefficients has at least one root in ℂ. Consequently, $p$ factors completely as $a_n(z - r_1)(z - r_2)\cdots(z - r_n)$.

A field with this property is called **algebraically closed**. ℂ is the *algebraic closure* of ℝ: the smallest algebraically closed field containing it.

**Proof sketch (the winding picture).** Let $p(z) = z^n + \cdots + a_0$ (divide by $a_n$), and suppose $a_0 \neq 0$ (otherwise 0 is a root). Watch where $p$ sends a circle $|z| = R$ as $R$ grows from 0:
- For tiny $R$, $p(z) \approx a_0$, so the image is a small loop near $a_0$ that does not go around 0.
- For huge $R$, $p(z) \approx z^n$, and $z^n$ winds around 0 exactly $n$ times as $z$ goes once around the circle (angles multiply by $n$: our rotation theorem!).

As $R$ increases continuously, the image loop deforms continuously from "winding 0 times" to "winding $n$ times" around the origin. The winding number can only change when the loop passes *through* 0. So for some $R$, some point $z$ with $|z| = R$ has $p(z) = 0$. ∎ (Making "winding number" and "continuous deformation" rigorous is a job for topology or complex analysis, but the picture is the proof.)

The factorization then follows by induction: a root $r_1$ lets you divide $p(z)$ by $(z - r_1)$, leaving a polynomial of degree $n - 1$.

This is the payoff of the whole of Act II. ℕ couldn't subtract; ℤ couldn't divide; ℚ had holes; ℝ couldn't take square roots of negatives. ℂ has **no algebraic defect left**: every polynomial equation you can write over ℂ already has its solutions in ℂ. There is nothing left to fix algebraically.

### 5. What we lost: order

Every extension has a cost. In ℝ we could compare: $x < y$ or $y < x$ or $x = y$, with rules that fit the arithmetic. In ℂ that is gone, and not because nobody found the right ordering.

> **Theorem.** There is no way to make ℂ an ordered field. That is, there is no total order $<$ on ℂ satisfying (i) $x < y \Rightarrow x + z < y + z$ and (ii) $0 < x,\ 0 < y \Rightarrow 0 < xy$.

**Proof.** First, in any ordered field, every nonzero square is positive. Indeed, let $x \neq 0$. By totality, either $0 < x$ or $x < 0$. If $0 < x$, then $0 < x \cdot x$ by (ii). If $x < 0$, add $-x$ to both sides using (i): $0 < -x$, and then $0 < (-x)(-x) = x^2$ by (ii). Either way $x^2 > 0$.

In particular $1 = 1^2 > 0$, so (adding $-1$ to both sides) $-1 < 0$.

Now suppose ℂ had such an order. Since $i \neq 0$, $i^2 > 0$. But $i^2 = -1 < 0$. Contradiction. ∎

The proof says something sharp: *any* field in which $-1$ is a square cannot be ordered. The very thing we built ℂ to do is exactly what kills order. This goes on the **"What did we lose?" ledger**:

| Extension | Gained | Lost |
|---|---|---|
| ℕ → ℤ | subtraction | every nonempty set having a least element |
| ℤ → ℚ | division | "next number" (discreteness) |
| ℚ → ℝ | completeness (no holes) | countability (↪ S1E12), and a finite name for every number |
| ℝ → ℂ | every polynomial has a root | order |

Keep doubling past ℂ and the ledger keeps growing: the quaternions ℍ lose commutativity, the octonions 𝕆 lose associativity. (See the *Cayley–Dickson* side quest, which attaches here.) A theorem of Frobenius (1877) says that the only finite-dimensional associative division algebras over ℝ are ℝ, ℂ, and ℍ, and the only *commutative* ones are ℝ and ℂ. In that sense ℂ is where the tower of fields over ℝ stops.

### 6. Zoom out: build vs. describe, once more

We built ℂ as pairs. Here are three other ways to meet the same object:
- **As matrices:** the set of $2 \times 2$ real matrices $\begin{pmatrix} a & -b \\ b & a \end{pmatrix}$ is closed under $+$ and $\times$ and behaves exactly like ℂ.
- **As a quotient ring:** polynomials with real coefficients, where we declare $x^2 + 1$ to be zero. In ↪ S1E18 we will see that this quotient ring, ℝ[x]/(x² + 1), *is* ℂ, with $x$ playing the role of $i$.
- **As a description:** "the algebraic closure of ℝ," which pins it down up to isomorphism.

Three constructions, one description. And the rotation picture is the thread to Season 2 and beyond: the unit circle $\{e^{i\theta}\}$ is a group under multiplication (↪ S1E16), the "circle of phases" U(1) of ↪ S2E15, and the simplest example of a Lie group in ↪ S3E11.

## Worked examples

### Example 1: Multiply, then check with the geometry

Compute $(3 + 4i)(1 + 2i)$.

**Algebraically:**
$$(3 + 4i)(1 + 2i) = 3 + 6i + 4i + 8i^2 = 3 + 10i - 8 = -5 + 10i.$$

**Geometric check (lengths multiply):** $|3 + 4i| = \sqrt{9 + 16} = 5$, $|1 + 2i| = \sqrt{1 + 4} = \sqrt5$, so the product should have length $5\sqrt5$. Indeed $|-5 + 10i| = \sqrt{25 + 100} = \sqrt{125} = 5\sqrt5$. ✓

**Angles add:** $\arg(3 + 4i) = \arctan(4/3) \approx 53.13°$ and $\arg(1 + 2i) = \arctan 2 \approx 63.43°$, which sum to about $116.57°$. The product $-5 + 10i$ is in the second quadrant with $\arg = 180° - \arctan(10/5) = 180° - 63.43° = 116.57°$. ✓

**Division:** $\dfrac{1}{3 + 4i} = \dfrac{3 - 4i}{(3 + 4i)(3 - 4i)} = \dfrac{3 - 4i}{9 + 16} = \dfrac{3}{25} - \dfrac{4}{25}i$. Check: $(3 + 4i)(3 - 4i)/25 = 25/25 = 1$. ✓ Geometrically, the inverse has length $1/5$ and the opposite angle.

### Example 2: Angles add, so arctangents add

Compute $(2 + i)(3 + i)$:
$$(2 + i)(3 + i) = 6 + 2i + 3i + i^2 = 6 + 5i - 1 = 5 + 5i.$$
Now $5 + 5i$ points at exactly 45°, so its argument is $\pi/4$. Since arguments add,
$$\arctan\tfrac12 + \arctan\tfrac13 = \frac{\pi}{4}.$$
(Both arctangents are between 0 and $\pi/2$, so their sum is in $(0, \pi)$, and there is no $2\pi$ ambiguity.) Numerically: $26.565° + 18.435° = 45.000°$. ✓

A real-number identity, proved by multiplying two complex numbers. Formulas of this type (Machin's formula $\frac{\pi}{4} = 4\arctan\frac15 - \arctan\frac1{239}$ is the famous one) were used for centuries to compute digits of π.

### Example 3: Bombelli's cubic, the cold-open calculation

Solve $x^3 = 15x + 4$ with Cardano's formula. For $x^3 = px + q$, the formula reads
$$x = \sqrt[3]{\frac q2 + \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}} + \sqrt[3]{\frac q2 - \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}}.$$
Here $p = 15$, $q = 4$:
$$\frac{q^2}{4} = 4,\qquad \frac{p^3}{27} = \frac{3375}{27} = 125,\qquad \sqrt{4 - 125} = \sqrt{-121} = 11i.$$
So $x = \sqrt[3]{2 + 11i} + \sqrt[3]{2 - 11i}$.

Bombelli's insight: guess that $\sqrt[3]{2 + 11i} = 2 + i$. Check by cubing:
$$(2 + i)^2 = 4 + 4i + i^2 = 3 + 4i,\qquad (2 + i)^3 = (3 + 4i)(2 + i) = 6 + 3i + 8i + 4i^2 = 2 + 11i. \checkmark$$
Similarly $(2 - i)^3 = 2 - 11i$. Therefore
$$x = (2 + i) + (2 - i) = 4,$$
and indeed $4^3 = 64 = 15 \cdot 4 + 4$. ✓ The imaginary parts cancel and a real root appears. (Cube roots in ℂ are not unique; each nonzero number has three. Choosing the conjugate pair $2 \pm i$ is what makes the sum real. The other two conjugate pairs of cube roots give the other two real roots, $-2 \pm \sqrt3$.)

Check the other roots: $x^3 - 15x - 4 = (x - 4)(x^2 + 4x + 1)$, and $x^2 + 4x + 1 = 0$ gives $x = -2 \pm \sqrt3$. ✓ All three roots are real, yet the formula *must* pass through ℂ to reach them. (Whenever a cubic has three distinct real roots, the square root inside Cardano's formula is the square root of a negative number, so the detour through ℂ is unavoidable for the formula. In the so-called *casus irreducibilis*, a cubic that is irreducible over ℚ with three real roots, it is a theorem that no expression using only *real* radicals can give the roots at all.)

### Example 4: Square roots and roots of unity by rotation

**Square root of $i$.** We want $z$ with $z^2 = i$. Since $i$ has length 1 and angle 90°, and squaring doubles angles and squares lengths, $z$ has length 1 and angle 45° (or 225°):
$$z = \pm\left(\cos 45° + i \sin 45°\right) = \pm\frac{1 + i}{\sqrt2}.$$
Check: $\left(\frac{1 + i}{\sqrt2}\right)^2 = \frac{1 + 2i + i^2}{2} = \frac{2i}{2} = i$. ✓

**Powers of $1 + i$.** $1 + i$ has length $\sqrt2$ and angle 45°. So $(1 + i)^8$ has length $(\sqrt2)^8 = 16$ and angle $8 \times 45° = 360°$:
$$(1 + i)^8 = 16.$$
Check by repeated squaring: $(1 + i)^2 = 2i$, $(2i)^2 = -4$, $(-4)^2 = 16$. ✓

**Cube roots of $-1$.** Let $\omega = \frac{1 + \sqrt3\, i}{2}$, which has length $\sqrt{1/4 + 3/4} = 1$ and angle 60°. Cubing triples the angle to 180°, so $\omega^3 = -1$. Check: $\omega^2 = \frac{1 + 2\sqrt3 i + 3i^2}{4} = \frac{-2 + 2\sqrt3 i}{4} = \frac{-1 + \sqrt3 i}{2}$, and $\omega^3 = \omega^2 \omega = \frac{(-1 + \sqrt3 i)(1 + \sqrt3 i)}{4} = \frac{-1 - \sqrt3 i + \sqrt3 i + 3i^2}{4} = \frac{-4}{4} = -1$. ✓ The three cube roots of $-1$ are at angles 60°, 180°, 300°: an equilateral triangle on the unit circle.

## Visual and animation notes
1. **Cold open:** a page of Bombelli-style algebra; the term $\sqrt{-121}$ glows red. The calculation proceeds, the red parts cancel, and "4" drops out. Cut to the graph of $y = x^3 - 15x - 4$ crossing the axis three times.
2. **The tower:** the number tower ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ gains a new floor, which is not taller but *wider*: the real line swings out into a plane.
3. **Pairs:** a grid of points labeled $(a, b)$; the real line highlighted as the horizontal axis $(a, 0)$.
4. **The key visual: multiplication by $i$.** The whole plane, with a picture on it (an arrow or a small house), rotates 90° counterclockwise. Repeat: 180°, landing on $-1$ times the picture. Caption: "$i \cdot i = -1$: two quarter turns make a half turn."
5. **General multiplication:** an arrow $z$ and a multiplier $w$. The plane scales by $|w|$ and rotates by $\arg w$; a protractor badge shows angles adding, a ruler badge shows lengths multiplying (Example 1's numbers).
6. **Linear map:** the grid transforms smoothly under multiplication by $w$ (production notes' "linear map" motif: gridlines stay straight and parallel). Point out that no line through the origin stays on itself for $w = i$: "no real eigenvector" (↪ S2E12).
7. **Fundamental Theorem of Algebra:** a circle $|z| = R$ on the left; its image under $p$ on the right. As $R$ grows, the image loop grows and starts winding around 0; at the moment the loop sweeps across 0, flash the root on the left.
8. **No order:** try to arrange ℂ on a line. Points $1$, $i$, $-1$, $-i$ get placed; the arithmetic rules fire and $i^2$ lands on the wrong side of 0; the line cracks.
9. **"What did we lose?" ledger:** the side panel adds "order." Then a teaser of the Cayley–Dickson doubling: ℍ (commutativity lost), 𝕆 (associativity lost).

## Common misconceptions
- **Misconception:** "Imaginary numbers don't really exist; they're a trick." **Reality:** ℂ is constructed from ℝ as pairs with explicit operations, just as rigorously as ℚ from ℤ. The name "imaginary" is a historical accident (and was meant dismissively).
- **Misconception:** "$\sqrt{ab} = \sqrt a\sqrt b$ still holds, so $-1 = i \cdot i = \sqrt{-1}\sqrt{-1} = \sqrt{(-1)(-1)} = \sqrt1 = 1$." **Reality:** the rule $\sqrt{ab} = \sqrt a\sqrt b$ is a theorem about *nonnegative reals*. In ℂ every nonzero number has two square roots, and no choice of "principal" root makes the product rule hold in general.
- **Misconception:** "We could order ℂ by comparing moduli, or lexicographically." **Reality:** you can certainly define *orders* on ℂ (lexicographic order is a total order), but none of them is compatible with the arithmetic in the sense of an ordered field. The theorem in Section 5 rules out every such order.
- **Misconception:** "To solve $x^3 + \cdots = 0$ we'd need to extend ℂ again, and so on forever." **Reality:** the Fundamental Theorem of Algebra says no. ℂ is algebraically closed: polynomials with complex coefficients already have all their roots in ℂ.
- **Misconception:** "$i$ is 'the' square root of $-1$." **Reality:** $-i$ is an equally good one, and conjugation $a + bi \mapsto a - bi$ swaps them while preserving all arithmetic. Algebraically, $i$ and $-i$ are indistinguishable; choosing which is "counterclockwise" is a convention.

## Exercises
- **Warm-up (computational):** Compute $(1 - 2i)(4 + 3i)$ and $\dfrac{5}{1 - 2i}$. Then find $|(1 - 2i)^{6}|$ without expanding.
- **Core (conceptual):** Using only "lengths multiply, angles add," explain why the solutions of $z^n = 1$ form the corners of a regular $n$-gon, and find all solutions of $z^4 = 1$.
- **Stretch (proof):** Prove that the set of matrices $\left\{\begin{pmatrix} a & -b \\ b & a \end{pmatrix} : a, b \in \mathbb{R}\right\}$ is closed under matrix multiplication, and that the map $a + bi \mapsto \begin{pmatrix} a & -b \\ b & a \end{pmatrix}$ preserves sums and products. Conclude that this set of matrices is a field isomorphic to ℂ.

<details><summary>Hints and answers</summary>

- **Warm-up:** $(1 - 2i)(4 + 3i) = 4 + 3i - 8i - 6i^2 = 10 - 5i$. $\dfrac{5}{1 - 2i} = \dfrac{5(1 + 2i)}{1 + 4} = 1 + 2i$. $|1 - 2i| = \sqrt5$, so $|(1 - 2i)^6| = (\sqrt5)^6 = 125$.
- **Core:** if $z^n = 1$ then $|z|^n = 1$, so $|z| = 1$, and $n \cdot \arg z$ is a multiple of $360°$, so $\arg z \in \{0°, 360°/n, 2 \cdot 360°/n, \ldots\}$: $n$ equally spaced points on the unit circle. For $n = 4$: $1, i, -1, -i$.
- **Stretch:** $\begin{pmatrix} a & -b \\ b & a \end{pmatrix}\begin{pmatrix} c & -d \\ d & c \end{pmatrix} = \begin{pmatrix} ac - bd & -(ad + bc) \\ ad + bc & ac - bd \end{pmatrix}$, which has the same form and matches $(ac - bd) + (ad + bc)i$. Sums are clear. Inverses exist because the determinant is $a^2 + b^2 \neq 0$ for nonzero elements.

</details>

## Historical note
Square roots of negative numbers first forced their way into mathematics through *cubic* equations, not quadratics. (For a quadratic like $x^2 + 1 = 0$, one could simply say "no solution.") The formula for cubics, found by Scipione del Ferro and Niccolò Tartaglia, was published by Gerolamo Cardano in his *Ars Magna* (1545). Cardano noticed the appearance of square roots of negatives but called such manipulations useless subtleties. Rafael Bombelli's *L'Algebra* (1572) took the step of computing with them systematically, as in Example 3.

For two more centuries complex numbers were used but distrusted; Descartes's word "imaginary" stuck. Euler used them fluently in the 18th century. The geometric picture of complex numbers as points in a plane appeared in work by Caspar Wessel (presented to the Royal Danish Academy in 1797, published 1799) and Jean-Robert Argand (1806), and became widely accepted after Gauss adopted it. Gauss's 1799 doctoral dissertation gave a proof of the Fundamental Theorem of Algebra (with a gap that was filled much later), and he returned to the theorem with further proofs over his career. William Rowan Hamilton, in the 1830s, defined complex numbers as ordered pairs of reals with exactly the multiplication rule used in this episode, removing the last mystery. Hamilton then spent years trying to extend the idea to triples, and in 1843 found the quaternions instead (see the Cayley–Dickson side quest).

## Connections
- **Callbacks:** ↩ S1E06 (building new numbers as pairs; ℤ and ℚ), ↩ S1E08 (ℝ, the complete ordered field, which ℂ extends at the cost of order)
- **Sets up:** ↪ S1E16 (the unit circle as a group under multiplication), ↪ S1E18 (ℂ ≅ ℝ[x]/(x² + 1) as a quotient ring), ↪ S1E19 (ℂ as a field extension of ℝ of degree 2), ↪ S1E20 (finale montage: "ℂ, the algebraic closure of ℝ"), ↪ S2E12 (a rotation has no real eigenvectors; eigenvalues $e^{\pm i\theta}$ over ℂ), ↪ S2E15 (unitary spaces; U(1) as the circle of phases), ↪ S3E11 (Lie groups: the circle group)
- **Side quests:** *Cayley–Dickson: ℍ, 𝕆 and beyond* (attaches here: keep doubling and keep losing properties; Hurwitz's theorem)

## References
- **Primary / historical**
  - Gerolamo Cardano, *Ars Magna* (1545); English translation by T. Richard Witmer, *The Great Art, or the Rules of Algebra* (1968).
  - Rafael Bombelli, *L'Algebra* (1572).
  - William Rowan Hamilton, "Theory of Conjugate Functions, or Algebraic Couples; with a Preliminary and Elementary Essay on Algebra as the Science of Pure Time," *Transactions of the Royal Irish Academy* 17 (1837).
- **Textbooks**
  - Tristan Needham, *Visual Complex Analysis* (1997), Chapter 1 (geometry and complex arithmetic; multiplication as rotation and scaling; Bombelli's cubic) and Chapter 7 (winding numbers, with a proof of the Fundamental Theorem of Algebra).
  - Lars Ahlfors, *Complex Analysis*, 3rd ed. (1979), Chapter 1 (complex numbers and their geometric representation).
  - Michael Artin, *Algebra*, 2nd ed. (2011), the chapter on fields (field extensions; ℂ as an extension of ℝ).
- **Accessible**
  - Paul J. Nahin, *An Imaginary Tale: The Story of √−1* (1998).
  - H.-D. Ebbinghaus et al., *Numbers* (Graduate Texts in Mathematics 123, 1991): chapters on ℂ, the Fundamental Theorem of Algebra, and the theorems of Frobenius and Hurwitz.
