# S1E20: Galois and the Symmetry of Roots (Season Finale)

> **Season / Act:** Season 1, Act IV (Forget What It Is, Keep What It Does), season finale · **Target runtime:** 22–25 min ·
> **Prerequisites:** S1E10 (ℂ, roots of unity, the Fundamental Theorem of Algebra), S1E16–S1E17 (groups, Sₙ, normal subgroups, quotients), S1E18 (rings, ideals), S1E19 (fields, degree, tower law, irreducibility). Outside knowledge: the quadratic formula ·
> **Builds toward:** S2E01 (vector spaces over a field), S3E01 (field extensions as vector spaces), S3E03 (groups acting linearly), S3E12 (category theory and "structure is everything")

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why the quadratic formula comes from the symmetry of swapping two roots, and define the Galois group of a polynomial as the group of permutations of its roots that respect every rational relation among them.
2. Compute small Galois groups ($x^4 - 10x^2 + 1$, $x^3 - 2$) and match subgroups with intermediate fields.
3. Define a solvable group, show that $S_3$ and $S_4$ are solvable, and prove that $S_5$ is not.
4. State Galois's theorem (solvable by radicals ⟺ solvable Galois group) and use it to explain why $x^5 - 4x + 2 = 0$ has no solution in radicals.
5. Label every floor of the number tower by its structure, and say what Season 2 will build on top of fields.

## Cold open
*Narrator:*

"Babylonian scribes, almost four thousand years ago, could solve quadratic equations. The formula you learned in school is its modern form: minus b, plus or minus the square root of b squared minus four a c, all over 2a.

For three thousand years, nobody could do the same for cubics. Then, in sixteenth-century Italy, it happened, amid secret notebooks, public problem-solving contests, and a broken promise. Scipione del Ferro found a method and kept it secret. Niccolò Tartaglia rediscovered it and confided it to Gerolamo Cardano, who swore to keep it secret, and then published it in 1545, together with his student Lodovico Ferrari's formula for the quartic. Cube roots inside square roots inside cube roots, but formulas nonetheless.

Then: degree five. The best mathematicians of the next 250 years attacked the quintic. Euler. Lagrange. Nothing.

The answer came from a teenager. Évariste Galois, in Paris, around 1830, saw that the question isn't about formulas at all. It's about *symmetry*: the hidden ways the roots of an equation can be shuffled without anyone noticing. He wrote it all down, was rejected, was imprisoned, and was shot in a duel at twenty. Tonight we follow his idea to the end of our first season: there is no formula for degree five, and the reason is a group."

## The story

### 1. The naive attempt: look for a formula
A **formula in radicals** builds the roots from the coefficients using $+, -, \times, \div$ and $n$-th roots $\sqrt[n]{\ }$. The quadratic formula is one. So are Cardano's and Ferrari's. The naive plan is to keep inventing cleverer formulas.

Let's instead look at *why* the quadratic formula works. Write $x^2 + bx + c = (x - r_1)(x - r_2)$. Expanding,
$$r_1 + r_2 = -b, \qquad r_1 r_2 = c.$$
These expressions are **symmetric**: swapping $r_1 \leftrightarrow r_2$ doesn't change them, and that's why they are known (they're coefficients). The difference $r_1 - r_2$ is *not* symmetric: the swap turns it into $-(r_1 - r_2)$. But its square is symmetric:
$$(r_1 - r_2)^2 = (r_1 + r_2)^2 - 4r_1r_2 = b^2 - 4c.$$
So $r_1 - r_2 = \pm\sqrt{b^2 - 4c}$, and adding $r_1 + r_2 = -b$ gives $r_1 = \frac{-b + \sqrt{b^2 - 4c}}{2}$.

The square root appears *exactly* because of the swap symmetry. A quantity that the symmetry flips by a sign has a square that the symmetry fixes, and fixed quantities are computable from the coefficients. Lagrange (1770–71) showed that the cubic and quartic formulas work the same way, using cleverer expressions in the roots. But for degree five his method produced auxiliary equations of degree six, not smaller. Something about five roots was different.

### 2. The crisis: no general formula, and no explanation
Paolo Ruffini (1799) and Niels Henrik Abel (1824, with a complete proof) showed that **no formula in radicals solves every quintic.** But this left two questions:
- *Why?* Abel's proof showed impossibility, but not the structural reason.
- *Which* quintics can be solved? Some obviously can: $x^5 - 2 = 0$ has the root $\sqrt[5]{2}$. Others, like $x^5 - 4x + 2 = 0$, don't. What tells them apart?

Galois answered both with one invariant.

### 3. The idea: the group of symmetries of the roots
Let $f \in \mathbb{Q}[x]$ have distinct roots $r_1, \dots, r_n$ in ℂ (they exist by the Fundamental Theorem of Algebra, ↩ S1E10). Its **splitting field** is $K = \mathbb{Q}(r_1, \dots, r_n)$, the smallest field containing all the roots.

> **Definition (Galois group).** The **Galois group** $\operatorname{Gal}(f) = \operatorname{Gal}(K/\mathbb{Q})$ is the group of field automorphisms of $K$: bijections $\sigma: K \to K$ with $\sigma(a + b) = \sigma(a) + \sigma(b)$ and $\sigma(ab) = \sigma(a)\sigma(b)$.

Every such σ fixes every rational number (it fixes 1, hence every integer and fraction). If $f(r) = 0$ then $f(\sigma(r)) = \sigma(f(r)) = 0$, because $f$ has rational coefficients. So **σ permutes the roots**, and since $K$ is generated by the roots, σ is determined by that permutation. Thus $\operatorname{Gal}(f)$ is a subgroup of $S_n$.

Equivalently, in Galois's own spirit: $\operatorname{Gal}(f)$ consists of the permutations of the roots that **preserve every polynomial relation with rational coefficients** among them. If $r_1^2 = 2$, then any allowed permutation must send $r_1$ to something whose square is also 2. The Galois group measures how indistinguishable the roots are, from the point of view of ℚ.

Two key facts (stated without proof):
- $|\operatorname{Gal}(K/\mathbb{Q})| = [K : \mathbb{Q}]$: the size of the group equals the degree (dimension) of the splitting field (↩ S1E19).
- **Fundamental Theorem of Galois Theory.** There is an inclusion-reversing bijection between subgroups $H \le \operatorname{Gal}(K/\mathbb{Q})$ and intermediate fields $\mathbb{Q} \subseteq E \subseteq K$: $H$ corresponds to the field of elements fixed by every $\sigma \in H$. Under it, $H$ is a *normal* subgroup exactly when the corresponding $E$ is itself a splitting field over ℚ, and then $\operatorname{Gal}(E/\mathbb{Q}) \cong \operatorname{Gal}(K/\mathbb{Q})/H$.

The second fact is a dictionary: **fields ↔ groups, bigger field ↔ smaller group, normal subgroups ↔ "self-contained" steps, quotient groups ↔ the symmetry of each step.** Worked Examples 1 and 2 show it in action.

### 4. Radicals and solvable groups
What does adjoining a radical look like on the group side? Suppose the field already contains the $n$-th roots of unity, and we adjoin a root $\sqrt[n]{a}$. The other roots of $x^n - a$ are $\zeta^k\sqrt[n]{a}$ for the roots of unity $\zeta^k$, so every symmetry multiplies $\sqrt[n]{a}$ by some root of unity. Composing such symmetries multiplies those roots of unity, which commute: **adjoining a radical is a step with an abelian (indeed cyclic) Galois group.** Adjoining the roots of unity themselves is also an abelian step. So a formula in radicals is a tower of fields in which each step has abelian symmetry, and the dictionary translates that tower into a chain of subgroups.

> **Definition (solvable group).** A finite group $G$ is **solvable** if there is a chain of subgroups
> $$G = G_0 \trianglerighteq G_1 \trianglerighteq G_2 \trianglerighteq \dots \trianglerighteq G_k = \{e\}$$
> with each $G_{i+1}$ normal in $G_i$ and each quotient $G_i/G_{i+1}$ abelian.

The name comes from the theorem.

> **Galois's Theorem.** A polynomial $f \in \mathbb{Q}[x]$ is solvable by radicals if and only if its Galois group is solvable.

(We present this at the story level: the forward direction is the argument above, made rigorous with the Fundamental Theorem; the converse uses "Lagrange resolvents" to show each abelian step can be climbed with a radical. Complete proofs are in the references.)

**Degrees 2, 3, 4.** The Galois group of a polynomial of degree $n$ sits inside $S_n$, and subgroups of solvable groups are solvable. So it's enough that $S_2, S_3, S_4$ are solvable:
- $S_2 \trianglerighteq \{e\}$, quotient $\mathbb{Z}/2$. (The quadratic formula: one square root.)
- $S_3 \trianglerighteq A_3 \trianglerighteq \{e\}$, quotients $\mathbb{Z}/2$ and $\mathbb{Z}/3$. (Cardano: a square root, then a cube root.)
- $S_4 \trianglerighteq A_4 \trianglerighteq V_4 \trianglerighteq \{e\}$, quotients $\mathbb{Z}/2$, $\mathbb{Z}/3$, $V_4$ (Worked Example 3). (Ferrari: the quartic reduces to a "resolvent cubic.")

That is *why* the formulas exist.

### 5. The payoff: $S_5$ is not solvable
> **Theorem.** $S_5$ is not solvable. (The same holds for $S_n$, $n \ge 5$.)

*Proof.* **Lemma.** Let $H \le S_5$ contain every 3-cycle, and let $N \trianglelefteq H$ with $H/N$ abelian. Then $N$ contains every 3-cycle.

*Proof of the lemma.* Since $H/N$ is abelian, for any $x, y \in H$ we have $xNyN = yNxN$, i.e. $xyx^{-1}y^{-1} \in N$: every commutator of elements of $H$ lies in $N$. Now take any 3-cycle $(a\,b\,c)$. Because there are five symbols, we can choose two more, $d$ and $e$, distinct from $a, b, c$ and each other. Then (composing right to left)
$$(a\,b\,c) = (a\,b\,d)\,(a\,c\,e)\,(a\,b\,d)^{-1}\,(a\,c\,e)^{-1}.$$
Check by following each symbol through $(a\,c\,e)^{-1} = (a\,e\,c)$, then $(a\,b\,d)^{-1} = (a\,d\,b)$, then $(a\,c\,e)$, then $(a\,b\,d)$:
- $a \to e \to e \to a \to b$
- $b \to b \to a \to c \to c$
- $c \to a \to d \to d \to a$
- $d \to d \to b \to b \to d$
- $e \to c \to c \to e \to e$

So $a \mapsto b$, $b \mapsto c$, $c \mapsto a$, and $d, e$ are fixed: it is $(a\,b\,c)$. ✓ Both $(a\,b\,d)$ and $(a\,c\,e)$ are 3-cycles, so they lie in $H$, so their commutator $(a\,b\,c)$ lies in $N$. ∎

*Proof of the theorem.* Suppose $S_5 = G_0 \trianglerighteq G_1 \trianglerighteq \dots \trianglerighteq G_k = \{e\}$ with abelian quotients. $G_0 = S_5$ contains all 3-cycles. By the lemma, $G_1$ does; by the lemma again, $G_2$ does; and so on, so $G_k$ contains all 3-cycles. But $G_k = \{e\}$. Contradiction. ∎

(Computationally: the commutator subgroup of $S_5$ is $A_5$, and the commutator subgroup of $A_5$ is $A_5$ again; the chain gets stuck at order 60. In fact $A_5$ is **simple**: its conjugacy classes have sizes 1, 12, 12, 15, 20, and no sum of these that includes the 1 divides 60 except 1 and 60 itself, so it has no normal subgroups besides $\{e\}$ and $A_5$.)

**A quintic you can't solve.** Worked Example 4 shows that $f(x) = x^5 - 4x + 2$ has Galois group $S_5$. By Galois's theorem, **its roots cannot be expressed in radicals**. That settles the cold open: since this one quintic has no radical formula, no *general* quintic formula can exist. And Galois tells us exactly which quintics are solvable: those whose group is one of the solvable subgroups of $S_5$ (such as $x^5 - 2$, whose group has order 20).

### 6. Season finale: the number tower, relabeled
We began the season with a tower $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$ covered in question marks (↩ S1E01). Every floor has now been *built*: from the empty set (S1E04), from pairs (S1E06), from cuts and Cauchy sequences (S1E08), from pairs of reals or from $\mathbb{R}[x]/(x^2+1)$ (S1E10, S1E18). And every floor can now be *described*:

| Floor | Built as | Described as |
|---|---|---|
| ℕ | von Neumann ordinals ∅, {∅}, … | a commutative monoid under +, characterized by Peano's axioms (↩ S1E02) |
| ℤ | pairs of naturals mod ~ | a commutative ring; the ring every other ring receives a unique map from (↩ S1E06, S1E18) |
| ℚ | pairs of integers mod ~ | the smallest field containing ℤ: its field of fractions (↩ S1E06, S1E19) |
| ℝ | Dedekind cuts or Cauchy classes | the complete ordered field, unique up to isomorphism (↩ S1E08) |
| ℂ | pairs of reals, or $\mathbb{R}[x]/(x^2+1)$ | the algebraic closure of ℝ (↩ S1E10) |

The left column fades. The building materials (sets, pairs, cuts) were scaffolding; any construction with the right behavior would do, which was Benacerraf's point in S1E04. What survives is the right column: structure. **A number is whatever behaves like one.** That's the season's answer to "What is a number?"

Galois's idea is the purest form of it. He solved a problem about *numbers* (roots) by ignoring the numbers and studying how they can be permuted. The roots of $x^5 - 4x + 2$ are perfectly good complex numbers; what makes them unreachable by radicals is the shape of their symmetry group.

**Handoff to Season 2.** Last episode, the decisive tool was quietly linear algebra: a field extension is a vector space over the smaller field, and its degree is a dimension. Season 2 takes that seriously. *"Now that we know what fields are, let's see what you can build on top of them."* Next season opens with **a vector space over a field** (↪ S2E01): anything you can add and scale, where the scalars can be ℝ, ℂ, ℚ, or even $\mathbb{F}_2$.

## Worked examples

### Example 1: The Galois group of $x^4 - 10x^2 + 1$
From S1E19, this is the minimal polynomial of $\sqrt2 + \sqrt3$. Its roots are $\pm\sqrt2 \pm\sqrt3$ (check: $x^2 = 5 \pm 2\sqrt6$, and $(5 \pm 2\sqrt6)^2 - 10(5 \pm 2\sqrt6) + 1 = 25 \pm 20\sqrt6 + 24 - 50 \mp 20\sqrt6 + 1 = 0$ ✓). The splitting field is $K = \mathbb{Q}(\sqrt2, \sqrt3)$, of degree 4, so $|\operatorname{Gal}| = 4$.

An automorphism must send $\sqrt2$ to a root of $x^2 - 2$, so to $\pm\sqrt2$, and $\sqrt3$ to $\pm\sqrt3$. That gives at most four options, and since the group has order 4, all four occur:

| σ | $\sqrt2 \mapsto$ | $\sqrt3 \mapsto$ | $\sqrt6 \mapsto$ | Fixed field |
|---|---|---|---|---|
| $e$ | $\sqrt2$ | $\sqrt3$ | $\sqrt6$ | $K$ |
| $\sigma$ | $-\sqrt2$ | $\sqrt3$ | $-\sqrt6$ | $\mathbb{Q}(\sqrt3)$ |
| $\tau$ | $\sqrt2$ | $-\sqrt3$ | $-\sqrt6$ | $\mathbb{Q}(\sqrt2)$ |
| $\sigma\tau$ | $-\sqrt2$ | $-\sqrt3$ | $\sqrt6$ | $\mathbb{Q}(\sqrt6)$ |

Each non-identity element has order 2 ($\sigma^2$ sends $\sqrt2 \mapsto -\sqrt2 \mapsto \sqrt2$), so $\operatorname{Gal} \cong V_4$ (↩ S1E17). As permutations of the roots $r_1 = \sqrt2 + \sqrt3$, $r_2 = -\sqrt2 + \sqrt3$, $r_3 = \sqrt2 - \sqrt3$, $r_4 = -\sqrt2 - \sqrt3$: $\sigma = (r_1\,r_2)(r_3\,r_4)$, $\tau = (r_1\,r_3)(r_2\,r_4)$, $\sigma\tau = (r_1\,r_4)(r_2\,r_3)$. Only 4 of the 24 permutations in $S_4$ are allowed; e.g. swapping only $r_1$ and $r_2$ is forbidden, because it would break the rational relation $r_1 + r_4 = 0$ (it would give $r_2 + r_4 = -2\sqrt2 \neq 0$).

**Galois correspondence.** $V_4$ has three subgroups of order 2: $\{e, \sigma\}$, $\{e, \tau\}$, $\{e, \sigma\tau\}$. They match the three intermediate fields of degree 2: $\mathbb{Q}(\sqrt3)$, $\mathbb{Q}(\sqrt2)$, $\mathbb{Q}(\sqrt6)$. The whole group matches ℚ, the trivial subgroup matches $K$. Bigger group, smaller field. ✓

### Example 2: The Galois group of $x^3 - 2$
**Roots.** Let $\gamma = \sqrt[3]{2}$ and $\omega = e^{2\pi i/3} = \frac{-1 + \sqrt{-3}}{2}$, a root of $x^2 + x + 1$. The roots are $\gamma$, $\gamma\omega$, $\gamma\omega^2$.

**Degree of the splitting field.** $K = \mathbb{Q}(\gamma, \omega)$. By S1E19, $[\mathbb{Q}(\gamma) : \mathbb{Q}] = 3$. Now $\mathbb{Q}(\gamma) \subset \mathbb{R}$ but $\omega \notin \mathbb{R}$, so $\omega \notin \mathbb{Q}(\gamma)$, and $x^2 + x + 1$ is irreducible over $\mathbb{Q}(\gamma)$ (a quadratic with no root in the field). So $[K : \mathbb{Q}(\gamma)] = 2$, and the tower law gives $[K : \mathbb{Q}] = 3 \cdot 2 = 6$.

**The group.** $\operatorname{Gal}$ has order 6 and sits inside $S_3$ (which has order 6), so $\operatorname{Gal}(x^3 - 2) = S_3$: *every* permutation of the three roots is allowed. Concretely: $\rho$: $\gamma \mapsto \gamma\omega$, $\omega \mapsto \omega$ (cycles the roots, order 3), and complex conjugation $\kappa$: $\gamma \mapsto \gamma$, $\omega \mapsto \omega^2$ (swaps $\gamma\omega \leftrightarrow \gamma\omega^2$, order 2).

**Solvability matches the formula.** The chain $S_3 \trianglerighteq A_3 = \{e, \rho, \rho^2\} \trianglerighteq \{e\}$ corresponds to the tower $\mathbb{Q} \subset \mathbb{Q}(\omega) \subset \mathbb{Q}(\omega, \gamma)$:
- $\mathbb{Q}(\omega) = \mathbb{Q}(\sqrt{-3})$: adjoin a square root; symmetry $S_3/A_3 \cong \mathbb{Z}/2$.
- $\mathbb{Q}(\omega)(\gamma)$: adjoin a cube root (the cube roots of unity are already present); symmetry $A_3 \cong \mathbb{Z}/3$.

A square root, then a cube root: the shape of Cardano's formula.

### Example 3: $S_4$ is solvable
**The chain.** $S_4 \trianglerighteq A_4 \trianglerighteq V_4 \trianglerighteq \{e\}$, where $V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$.

**Orders:** 24, 12, 4, 1.

**Normality.**
- $A_4 \trianglelefteq S_4$: it is the kernel of the sign homomorphism (↩ S1E17), or: it has index 2.
- $V_4 \trianglelefteq A_4$ (indeed in $S_4$): conjugation preserves cycle type, $g(1\,2)(3\,4)g^{-1} = (g(1)\,g(2))(g(3)\,g(4))$, and $V_4$ contains *all three* products of two disjoint transpositions, so conjugating keeps you inside $V_4$.

**Quotients.**
- $S_4/A_4$ has order 2, so it is $\mathbb{Z}/2$: abelian.
- $A_4/V_4$ has order 3, so it is $\mathbb{Z}/3$ (prime order ⇒ cyclic, ↩ S1E17): abelian.
- $V_4/\{e\} \cong V_4$: check one product, $(1\,2)(3\,4) \cdot (1\,3)(2\,4)$. Right to left: $1 \to 3 \to 4$, $4 \to 2 \to 1$, $2 \to 4 \to 3$, $3 \to 1 \to 2$. Result: $(1\,4)(2\,3)$. In the other order, $(1\,3)(2\,4)\cdot(1\,2)(3\,4)$: $1 \to 2 \to 4$, $4 \to 3 \to 1$, $2 \to 1 \to 3$, $3 \to 4 \to 2$: also $(1\,4)(2\,3)$. They commute, and $V_4$ is abelian.

All quotients abelian, so $S_4$ is solvable, and every quartic is solvable by radicals. ✓

### Example 4: $x^5 - 4x + 2$ has Galois group $S_5$
**Step 1: irreducible.** Eisenstein's criterion at $p = 2$: the prime 2 divides every coefficient except the leading one (coefficients $1, 0, 0, 0, -4, 2$), and $2^2 = 4$ does not divide the constant term 2. So $f$ is irreducible over ℚ.

**Step 2: the group contains a 5-cycle.** Irreducible ⇒ $[\mathbb{Q}(r) : \mathbb{Q}] = 5$ for any root $r$, so by the tower law 5 divides $[K : \mathbb{Q}] = |G|$. By Cauchy's theorem (a prime dividing $|G|$ is the order of some element), $G$ has an element of order 5; in $S_5$ the only elements of order 5 are 5-cycles.

**Step 3: exactly three real roots.** $f'(x) = 5x^4 - 4 = 0$ at $x = \pm(4/5)^{1/4} \approx \pm 0.9457$. So $f$ has only two turning points and at most three real roots. Sign table:
- $f(-2) = -32 + 8 + 2 = -22$
- $f(-1) = -1 + 4 + 2 = 5$
- $f(0) = 2$
- $f(1) = 1 - 4 + 2 = -1$
- $f(2) = 32 - 8 + 2 = 26$

Sign changes on $(-2, -1)$, $(0, 1)$, $(1, 2)$: exactly three real roots (≈ −1.519, 0.509, 1.244), and so two non-real roots, which are complex conjugates.

**Step 4: the group contains a transposition.** Complex conjugation $z \mapsto \bar z$ maps $K$ to itself (it permutes the roots) and is a field automorphism. It fixes the three real roots and swaps the two complex ones: a transposition.

**Step 5: generate everything.** A fact about $S_p$ for a prime $p$: a $p$-cycle and any transposition together generate all of $S_p$. Hence $G = S_5$, which is not solvable (Section 5). So **the roots of $x^5 - 4x + 2$ cannot be written using $+, -, \times, \div$ and radicals**, even though they are explicit real numbers that a computer finds to any precision.

## Visual and animation notes
1. **Cold open:** a timeline scroll: Babylonian clay tablet (quadratic), a Renaissance contest scene with sealed envelopes (cubic, 1545 book cover "Ars Magna"), then a long empty stretch labeled "degree 5" with famous names fading in and out, ending on a quill and a candle: Paris, 1832.
2. **Quadratic symmetry:** two roots as glowing points on the complex plane; a "swap" button exchanges them. $r_1 + r_2$ and $r_1r_2$ stay fixed (invariant badges); $r_1 - r_2$ flips sign; $(r_1 - r_2)^2$ stays fixed. A square-root symbol "unlocks" the flip.
3. **Galois group as allowed shuffles:** the four roots $\pm\sqrt2\pm\sqrt3$ on the real line. All 24 permutations try to act; the 20 that break a relation (e.g. $r_1 + r_4 = 0$, drawn as a rubber band) are shown snapping and grayed out. Four survive.
4. **Galois correspondence:** two Hasse diagrams side by side, subgroups of $V_4$ and subfields of $\mathbb{Q}(\sqrt2,\sqrt3)$, connected by threads (isomorphism motif) and drawn upside-down relative to each other.
5. **x³ − 2:** the three roots as a triangle in ℂ; ρ rotates the triangle, complex conjugation reflects it: the triangle's symmetry group $S_3 \cong D_3$ (↩ S1E16).
6. **Solvable chain as a staircase:** each step down a chain of subgroups is a stair labeled by its abelian quotient (ℤ/2, ℤ/3, V₄); each stair corresponds to a radical sign appearing in the formula. For $S_5$, the staircase drops from 120 to 60 and then the stair at $A_5$ is a smooth wall labeled "simple: no way down."
7. **The 3-cycle commutator:** five dots labeled $a$–$e$; the four 3-cycles of the lemma animate in sequence, and only $a, b, c$ end up moved. Caption: "five symbols give room for this trick; four don't."
8. **x⁵ − 4x + 2:** its graph crossing the x-axis three times, two more roots floating off-axis as a conjugate pair; complex conjugation is a mirror across the real axis swapping them.
9. **Finale montage:** the number tower from S1E01 returns. Floor by floor, scaffolding (sets, pairs, cuts) fades away and structure labels light up: "commutative monoid (Peano)," "ring," "field of fractions," "complete ordered field," "algebraic closure." The question marks from Episode 1 dissolve.
10. **Handoff:** the vector grid from S1E19 rises out of the field floor, a "vector space" stamp lands on it, and the title card for Season 2 appears: "Spaces, Maps, and Measurements."

## Common misconceptions
- **Misconception:** the quintic can't be solved, so its roots don't exist or can't be computed. **Reality:** every quintic has five complex roots (Fundamental Theorem of Algebra), and they can be computed numerically to any precision. What's impossible is a formula using only arithmetic and radicals.
- **Misconception:** no quintic is solvable by radicals. **Reality:** many are, such as $x^5 - 2$ or $(x - 1)^5$. Galois's theorem says exactly which: those whose Galois group is solvable.
- **Misconception:** the Galois group is all permutations of the roots. **Reality:** it's only those that preserve every rational relation among the roots. For $x^4 - 10x^2 + 1$ it has 4 elements, not 24.
- **Misconception:** "solvable group" means a group you can solve. **Reality:** the name comes from equations: a group is solvable when it can be broken down through a chain with abelian quotients, which is what solvability by radicals requires.
- **Misconception:** Galois proved the impossibility of the quintic formula first. **Reality:** Ruffini (1799, with gaps) and Abel (1824) did. Galois's achievement was the criterion for *which* equations are solvable, and the group-theoretic reason behind it.

## Exercises
- **Warm-up (computational):** Find the Galois group of $x^2 - 3$ and of $(x^2 - 2)(x^2 - 3)$, and list each group's elements as permutations of the roots.
- **Core (conceptual):** Explain why every subgroup of a solvable group is solvable (use the chain $H \cap G_i$), and deduce that every polynomial of degree at most 4 is solvable by radicals.
- **Stretch (proof):** Show that in the Lemma of Section 5, five symbols are really needed: find a chain for $S_4$ in which the lemma's conclusion fails (that is, a normal subgroup $N$ of $A_4$ with abelian quotient that doesn't contain all 3-cycles). Where does the proof of the lemma break for four symbols?

<details><summary>Hints and answers</summary>

- **Warm-up:** $x^2 - 3$: roots $\pm\sqrt3$; group $\{e, (\sqrt3\ {-\sqrt3})\} \cong \mathbb{Z}/2$. $(x^2 - 2)(x^2 - 3)$: splitting field $\mathbb{Q}(\sqrt2, \sqrt3)$, group $V_4$ = $\{e, \sigma, \tau, \sigma\tau\}$ as in Example 1, where now σ swaps $\pm\sqrt2$ and fixes $\pm\sqrt3$, and τ does the reverse.
- **Core:** If $G = G_0 \trianglerighteq \dots \trianglerighteq G_k = \{e\}$, set $H_i = H \cap G_i$. Then $H_{i+1} \trianglelefteq H_i$, and $H_i/H_{i+1}$ embeds into $G_i/G_{i+1}$ (Second Isomorphism Theorem), so it's abelian. Galois groups of degree-$n$ polynomials are subgroups of $S_n$, and $S_1, \dots, S_4$ are solvable.
- **Stretch:** $N = V_4 \trianglelefteq A_4$ has $A_4/V_4 \cong \mathbb{Z}/3$ abelian, but $V_4$ contains no 3-cycles. The proof needs two symbols $d, e$ outside $\{a, b, c\}$; with only four symbols there is just one.

</details>

## Historical note
Évariste Galois was born on 25 October 1811 near Paris. He failed the entrance examination of the École Polytechnique twice, published his first paper at 17, and submitted memoirs on the solvability of equations to the Paris Academy: one was lost after Fourier, who was to report on it, died in 1830; a revised memoir of 1831 was returned by Siméon Denis Poisson, who wrote that he could not follow the arguments and asked for a fuller treatment. Galois was an ardent republican, was expelled from the École Normale, and spent months of 1831–32 in prison. On 30 May 1832 he was wounded in a duel, whose exact circumstances remain uncertain, and he died the next day, aged 20. The night before the duel he wrote a long letter to his friend Auguste Chevalier summarizing his discoveries and asking that they be shown to Jacobi and Gauss.

His work remained largely unknown until Joseph Liouville studied the manuscripts and published them in his *Journal de Mathématiques Pures et Appliquées* in 1846. Camille Jordan's *Traité des substitutions* (1870) made Galois theory widely accessible, and the modern formulation in terms of field automorphisms and the Fundamental Theorem owes much to Dedekind and to Emil Artin in the twentieth century. Many popular retellings embellish the story (the "whole theory written the night before the duel" is an exaggeration); the article by Rothman in the references separates documented fact from legend.

The earlier history: Cardano published the cubic and quartic solutions in *Ars Magna* (1545); Lagrange's 1770–71 memoir analyzed why those methods work; Ruffini (1799) gave an impossibility proof for the quintic with gaps; Abel (1824, and in fuller form in Crelle's journal in 1826) gave the first complete proof.

## Connections
- **Callbacks:** ↩ S1E01 (the number tower and the question "What is a number?"), ↩ S1E02 (Peano characterizes ℕ), ↩ S1E04 (Benacerraf: the construction doesn't matter), ↩ S1E06, S1E08, S1E10 (constructing ℤ, ℚ, ℝ, ℂ), ↩ S1E16 (symmetric groups; symmetries of a triangle), ↩ S1E17 (normal subgroups, quotients, sign homomorphism, $V_4$), ↩ S1E18 (ℂ as $\mathbb{R}[x]/(x^2+1)$), ↩ S1E19 (degree, tower law, irreducibility)
- **Sets up:** ↪ S2E01 (a vector space over a field; Season 2 begins), ↪ S2E12 (eigenvalues need algebraically closed fields), ↪ S3E01 (field extensions as vector spaces; norm and trace), ↪ S3E03 (groups acting linearly; character tables), ↪ S3E12 (category theory: Galois correspondence as an early example of a structure-reversing dictionary)
- **Side quests:** "Galois's last night" (history interlude); "Emmy Noether and the birth of abstract algebra" (history interlude)

## References
- **Primary / historical**
  - Évariste Galois, "Mémoire sur les conditions de résolubilité des équations par radicaux" (written 1830–31), published by Joseph Liouville in *Journal de Mathématiques Pures et Appliquées* 11 (1846). English translation and critical edition in Peter M. Neumann, *The Mathematical Writings of Évariste Galois* (European Mathematical Society, 2011).
  - Niels Henrik Abel, "Beweis der Unmöglichkeit, algebraische Gleichungen von höheren Graden als dem vierten allgemein aufzulösen," *Journal für die reine und angewandte Mathematik* 1 (1826).
  - Gerolamo Cardano, *Ars Magna* (1545).
  - Camille Jordan, *Traité des substitutions et des équations algébriques* (Gauthier-Villars, 1870).
- **Textbooks**
  - Ian Stewart, *Galois Theory* (4th ed., CRC Press, 2015): the full story, including solvability by radicals and the insolubility of the quintic, with historical chapters.
  - David S. Dummit and Richard M. Foote, *Abstract Algebra* (3rd ed., Wiley, 2004), Chapter 14 (Galois theory; Section 14.7 on solvable and radical extensions) and Section 3.4 / Chapter 6 on solvable groups.
  - Michael Artin, *Algebra* (2nd ed., Pearson, 2011), Chapter 16 (Galois theory, including quintic equations).
  - Charles C. Pinter, *A Book of Abstract Algebra* (2nd ed., 1990; Dover 2010), Chapters 31–33 (Galois theory: preamble, the heart of the matter, solving equations by radicals).
- **Accessible**
  - Mario Livio, *The Equation That Couldn't Be Solved: How Mathematical Genius Discovered the Language of Symmetry* (Simon & Schuster, 2005).
  - Tony Rothman, "Genius and Biographers: The Fictionalization of Évariste Galois," *American Mathematical Monthly* 89 (1982).
  - Jean-Pierre Tignol, *Galois' Theory of Algebraic Equations* (World Scientific, 2001): the historical development from Cardano to Galois.
