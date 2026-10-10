# S1E17: Maps Between Groups and Quotient Groups

> **Season / Act:** Season 1, Act IV (Forget What It Is, Keep What It Does) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E05 (equivalence classes, quotient sets), S1E06 (well-definedness), S1E11 (bijections), S1E16 (group axioms, D₄, Sₙ, ℤ/n) ·
> **Builds toward:** S1E18 (ring homomorphisms, ideals, quotient rings), S1E20 (normal subgroups and solvable groups), S2E03 (rank–nullity), S2E05 (quotient spaces V/W), S3E12 (category theory)

## Learning objectives
By the end of this lesson the viewer can:
1. Define homomorphism, isomorphism, kernel and image, and prove that a homomorphism is injective exactly when its kernel is trivial.
2. Compute the left and right cosets of a subgroup, prove Lagrange's theorem, and use it (for example to prove Fermat's little theorem).
3. Explain why a quotient group G/N needs N to be normal, check normality in examples, and compute small quotient groups.
4. State and prove the First Isomorphism Theorem, and state Cayley's theorem.

## Cold open
*Narrator:*

"Three objects. The four rotations of a square. A clock with only four hours. And the four complex numbers 1, i, −1, −i, under multiplication.

Watch them move. Rotate the square a quarter turn, twice: half a turn. Move the 4-hour clock forward 1, twice: 2. Multiply by i, twice: −1. Rotate three times; add 3; multiply by i three times. Rotate four times and you're back where you started; add 4 and you're at 0; i to the fourth is 1.

If I covered up the labels and showed you only the *pattern* of how these things combine, you couldn't tell which was which. The pictures are different. The pattern is identical.

Last episode we met groups. Today's question is the one every mathematician eventually asks about any structure: **when are two of them really the same?** And its twin: what happens when you deliberately make a group *forget* something, the way a clock forgets which day it is? We'll find that the answers are two halves of one theorem. And that theorem will come back, nearly word for word, in the middle of Season 2."

## The story

### 1. The naive attempt: same size means same group?
The first guess is to compare sizes. But S1E16 already showed it fails. Both $\mathbb{Z}/4$ and $U(12) = \{1, 5, 7, 11\}$ (under multiplication mod 12) have four elements. In $\mathbb{Z}/4$, the element 1 needs four steps to return to 0. In $U(12)$, every element squared is 1. No relabeling can turn one table into the other.

So "same" must mean: **there is a relabeling of the elements that turns one multiplication table into the other.** That is a bijection (↩ S1E11) that respects the operation.

### 2. Maps that respect structure
> **Definition (homomorphism).** Let $G$ and $H$ be groups. A function $\varphi: G \to H$ is a **homomorphism** if
> $$\varphi(ab) = \varphi(a)\varphi(b) \quad \text{for all } a, b \in G.$$
> An **isomorphism** is a bijective homomorphism; if one exists we write $G \cong H$. The **kernel** is $\ker\varphi = \{g \in G : \varphi(g) = e_H\}$ and the **image** is $\operatorname{im}\varphi = \{\varphi(g) : g \in G\}$.

The condition says: combine then translate = translate then combine. Notice we only demanded one equation, yet more comes for free.

> **Proposition.** For a homomorphism $\varphi: G \to H$:
> 1. $\varphi(e_G) = e_H$ and $\varphi(g^{-1}) = \varphi(g)^{-1}$.
> 2. $\ker\varphi$ is a subgroup of $G$ and $\operatorname{im}\varphi$ is a subgroup of $H$.
> 3. $\varphi$ is injective if and only if $\ker\varphi = \{e_G\}$.

*Proof.* (1) $\varphi(e) = \varphi(ee) = \varphi(e)\varphi(e)$; cancel one $\varphi(e)$ to get $e_H = \varphi(e)$. Then $\varphi(g)\varphi(g^{-1}) = \varphi(gg^{-1}) = \varphi(e) = e_H$, so $\varphi(g^{-1})$ is the inverse of $\varphi(g)$.

(2) If $a, b \in \ker\varphi$ then $\varphi(ab^{-1}) = \varphi(a)\varphi(b)^{-1} = e$, so $ab^{-1} \in \ker\varphi$; together with $e \in \ker\varphi$, this gives closure under products and inverses. The image is similar.

(3) If $\varphi$ is injective, only $e$ maps to $e$. Conversely, suppose the kernel is trivial and $\varphi(a) = \varphi(b)$. Then $\varphi(a b^{-1}) = \varphi(a)\varphi(b)^{-1} = e$, so $ab^{-1} \in \ker\varphi = \{e\}$, so $a = b$. ∎

Part 3 is worth pausing on: to check injectivity everywhere, you only have to look at what gets sent to the identity. The kernel measures *exactly* how much information the map destroys.

> **Definition (subgroup).** A subset $H \subseteq G$ is a **subgroup** ($H \le G$) if it contains $e$ and is closed under products and inverses.

Examples of homomorphisms:
- $\exp: (\mathbb{R}, +) \to (\mathbb{R}_{>0}, \times)$, since $e^{a+b} = e^a e^b$. It is a bijection with inverse $\ln$, so adding reals and multiplying positive reals are *the same group*. Slide rules worked because of this isomorphism.
- $\det: GL_2(\mathbb{R}) \to (\mathbb{R}\setminus\{0\}, \times)$, since $\det(AB) = \det A \det B$. Kernel: $SL_2(\mathbb{R})$, the matrices of determinant 1.
- $\operatorname{sgn}: S_n \to \{+1, -1\}$, the sign of a permutation (+1 for even, −1 for odd). Kernel: the **alternating group** $A_n$.
- The reduction map $\mathbb{Z} \to \mathbb{Z}/n$, $a \mapsto a \bmod n$. Kernel: $n\mathbb{Z}$, the multiples of n.
- For any $g$ in any group, $n \mapsto g^n$ from ℤ (↩ S1E16, the universal property of ℤ).

### 3. Cosets and Lagrange's theorem
A subgroup slices the whole group into equal pieces.

> **Definition (cosets).** For $H \le G$ and $g \in G$, the **left coset** is $gH = \{gh : h \in H\}$ and the **right coset** is $Hg = \{hg : h \in H\}$. The number of left cosets is the **index** $[G : H]$.

> **Lagrange's Theorem.** If $G$ is finite and $H \le G$, then $|H|$ divides $|G|$, and $|G| = [G : H]\cdot|H|$.

*Proof.* Define $a \sim b$ iff $a^{-1}b \in H$. This is an equivalence relation (↩ S1E05): reflexive since $a^{-1}a = e \in H$; symmetric since $(a^{-1}b)^{-1} = b^{-1}a$ and $H$ is closed under inverses; transitive since $a^{-1}c = (a^{-1}b)(b^{-1}c)$ and $H$ is closed under products. The class of $a$ is $\{b : a^{-1}b \in H\} = \{ah : h \in H\} = aH$. So the left cosets **partition** $G$.

Each coset has exactly $|H|$ elements: the map $H \to gH$, $h \mapsto gh$, is surjective by definition and injective by cancellation, so it's a bijection (↩ S1E11). Therefore $G$ is split into $[G : H]$ disjoint pieces, each of size $|H|$, and $|G| = [G:H]\cdot|H|$. ∎

**Corollaries.**
- The order of any element divides $|G|$. (Apply Lagrange to the subgroup $\{e, g, g^2, \dots\}$, whose size is the order of $g$.) Hence $g^{|G|} = e$.
- A group of prime order $p$ is cyclic, so isomorphic to $\mathbb{Z}/p$: any $g \ne e$ has order dividing $p$, hence equal to $p$, so $g$ generates everything.
- **Fermat's little theorem:** if $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod p$. (Apply the first corollary to the group $(\mathbb{Z}/p)^\times$ of nonzero residues under multiplication, which has order $p - 1$.)

Warning: the converse fails. The alternating group $A_4$ has order 12 but no subgroup of order 6.

### 4. The crisis: when can we multiply cosets?
Ep. 5's machine says: declare things equal, and get a new set. ℤ/12 is ℤ with "differ by a multiple of 12" declared equal. The classes are the cosets $a + 12\mathbb{Z}$, and we add them by adding representatives. Can we do that with *any* subgroup?

Try it: define $(aH)(bH) = abH$. The hidden trap from S1E06 is back: is this **well-defined**? If $aH = a'H$ and $bH = b'H$, do we get $abH = a'b'H$? Worked Example 2 shows that for the subgroup $H = \{e, s\}$ of $D_4$, the answer is no. The fix is exactly the right extra condition.

> **Definition (normal subgroup).** $N \le G$ is **normal**, written $N \trianglelefteq G$, if $gNg^{-1} = N$ for all $g \in G$; equivalently, $gN = Ng$ for all $g$ (left and right cosets agree).

> **Theorem (quotient group).** If $N \trianglelefteq G$, then the cosets of $N$ form a group $G/N$ under $(aN)(bN) = abN$, with identity $N$ and inverses $(aN)^{-1} = a^{-1}N$. The map $\pi: G \to G/N$, $\pi(g) = gN$, is a surjective homomorphism with kernel $N$.

*Proof of well-definedness.* Suppose $a' = an_1$ and $b' = bn_2$ with $n_1, n_2 \in N$. Then
$$a'b' = a n_1 b n_2 = ab\,(b^{-1} n_1 b)\, n_2.$$
By normality $b^{-1}n_1 b \in N$, so $a'b' \in abN$, i.e. $a'b'N = abN$. The group axioms are inherited from $G$. ∎

Every kernel is normal: if $\varphi(n) = e$ then $\varphi(gng^{-1}) = \varphi(g)\,e\,\varphi(g)^{-1} = e$. And by the theorem, every normal subgroup is a kernel (of $\pi$). **Normal subgroups are exactly the kernels of homomorphisms.**

In abelian groups every subgroup is normal, which is why the trap never sprang for ℤ/n: $\mathbb{Z}/n = \mathbb{Z}/n\mathbb{Z}$ is the quotient of ℤ by the normal subgroup $n\mathbb{Z}$.

### 5. The payoff: the First Isomorphism Theorem
Now the two halves of the cold-open question meet. "When are two groups the same?" (isomorphism) and "what happens when we forget?" (quotients) are linked by one statement.

> **First Isomorphism Theorem.** If $\varphi: G \to H$ is a homomorphism, then
> $$G/\ker\varphi \;\cong\; \operatorname{im}\varphi, \qquad g\ker\varphi \mapsto \varphi(g).$$

*Proof.* Write $K = \ker\varphi$ and define $\bar\varphi(gK) = \varphi(g)$.
- *Well-defined and injective:* $gK = g'K \iff g^{-1}g' \in K \iff \varphi(g^{-1}g') = e \iff \varphi(g) = \varphi(g')$. Reading the arrows left to right gives well-definedness; right to left gives injectivity.
- *Homomorphism:* $\bar\varphi(gK \cdot g'K) = \bar\varphi(gg'K) = \varphi(gg') = \varphi(g)\varphi(g') = \bar\varphi(gK)\bar\varphi(g'K)$.
- *Surjective onto the image:* every $\varphi(g)$ equals $\bar\varphi(gK)$. ∎

In words: **every homomorphism is a quotient followed by an isomorphism.** Whatever a map does, it does by collapsing its kernel to a point (the "blob" motif) and then relabeling faithfully. For finite groups, counting gives
$$|G| = |\ker\varphi| \cdot |\operatorname{im}\varphi|.$$
Keep this equation in mind. In S2E03, with vector spaces and dimensions in place of groups and orders, it returns as **rank–nullity**: $\dim V = \dim\ker T + \dim\operatorname{im} T$.

### 6. Cayley's theorem: every group is a permutation group
> **Cayley's Theorem.** Every group $G$ is isomorphic to a subgroup of the group $\operatorname{Sym}(G)$ of permutations of the set $G$. If $|G| = n$, then $G$ is isomorphic to a subgroup of $S_n$.

*Proof sketch.* For $g \in G$, let $\lambda_g: G \to G$ be $\lambda_g(x) = gx$. It is a permutation (its inverse is $\lambda_{g^{-1}}$). The map $g \mapsto \lambda_g$ is a homomorphism, since $\lambda_{gh}(x) = ghx = \lambda_g(\lambda_h(x))$. Its kernel is trivial: if $\lambda_g$ is the identity then $g = ge = e$. By Part 3 of the Proposition it is injective, so $G \cong$ its image. ∎

So abstraction didn't take us anywhere new. Every abstract group is concretely a group of rearrangements, the very thing Lagrange and Galois studied. The abstract definition is just the cleanest way to talk about all of them at once.

**Zoom out.** This episode is thread 7 of the series: *structure-preserving maps matter more than objects.* An isomorphism is the "two objects connected by threads, then sliding onto each other" motif; a quotient is the "blur into blobs" motif; the First Isomorphism Theorem says these two motifs together describe every homomorphism. The same three ideas (structure-preserving map, kernel, quotient) will be repeated for rings next episode, and for vector spaces in Season 2.

## Worked examples

### Example 1: Same group, different costumes (and a non-example)
**(a) Rotations of the square ≅ ℤ/4 ≅ {1, i, −1, −i}.** Define $\varphi: \mathbb{Z}/4 \to \{e, r, r^2, r^3\}$ by $\varphi(k) = r^k$ and $\psi: \mathbb{Z}/4 \to \{1, i, -1, -i\}$ by $\psi(k) = i^k$.
- Well-defined: if $k \equiv k' \pmod 4$ then $k' = k + 4m$ and $r^{k'} = r^k (r^4)^m = r^k$; likewise $i^4 = 1$.
- Homomorphism: $\varphi(k + l) = r^{k+l} = r^k r^l$ and $\psi(k + l) = i^{k+l} = i^k i^l$. Check one case: $\psi(3 + 2) = \psi(1) = i$ and $\psi(3)\psi(2) = (-i)(-1) = i$. ✓
- Bijective: both lists have 4 distinct entries.

So all three are isomorphic. Multiplying by i really *is* a quarter turn (↩ S1E10), and now we can say so precisely.

**(b) ℤ/4 ≇ U(12).** An isomorphism preserves the order of each element: if $\varphi(g)^k = \varphi(g^k)$, then $g^k = e \iff \varphi(g)^k = e$ (using injectivity). In $\mathbb{Z}/4$ the element 1 has order 4: $1, 2, 3, 0$. In $U(12)$: $1^1 = 1$, and $5^2 = 25 \equiv 1$, $7^2 = 49 \equiv 1$, $11^2 = 121 \equiv 1 \pmod{12}$, so no element has order 4. Hence no isomorphism exists. ($U(12)$ is the **Klein four-group** $V_4 \cong \mathbb{Z}/2 \times \mathbb{Z}/2$.)

### Example 2: Cosets in D₄: a non-normal and a normal subgroup
Use $D_4 = \{e, r, r^2, r^3, s, rs, r^2s, r^3s\}$ with $r^4 = s^2 = e$ and $sr^k = r^{-k}s$ (↩ S1E16).

**(a) $H = \{e, s\}$.** Left cosets $gH = \{g, gs\}$:
- $eH = \{e, s\}$
- $rH = \{r, rs\}$
- $r^2H = \{r^2, r^2s\}$
- $r^3H = \{r^3, r^3s\}$

Right cosets $Hg = \{g, sg\}$, using $sr = r^3s$, $sr^2 = r^2s$, $sr^3 = rs$:
- $He = \{e, s\}$
- $Hr = \{r, r^3s\}$
- $Hr^2 = \{r^2, r^2s\}$
- $Hr^3 = \{r^3, rs\}$

Four cosets of size 2: $8 = 4 \times 2$, as Lagrange says. But $rH = \{r, rs\} \neq \{r, r^3 s\} = Hr$, so **H is not normal**. Watch the multiplication break: $rH = (rs)H$ (same coset) and $r^3H = r^3H$. Multiplying representatives, $r \cdot r^3 = e$ lands in $eH$, but $rs \cdot r^3 = r(sr^3) = r \cdot rs = r^2s$ lands in $r^2H$. Same input cosets, different output cosets: the product is not well-defined.

**(b) $N = \{e, r^2\}$ (the center).** $r^2$ commutes with everything: $s r^2 = r^{-2}s = r^2 s$. So $gN = Ng$ for all $g$, and $N$ is normal. Cosets:
$$N = \{e, r^2\},\quad rN = \{r, r^3\},\quad sN = \{s, r^2s\},\quad rsN = \{rs, r^3s\}.$$
Multiply in $D_4/N$:
- $(rN)^2 = r^2N = N$
- $(sN)^2 = s^2N = N$
- $(rsN)^2 = (rs)^2 N = N$ (reflections have order 2)
- $(rN)(sN) = rsN$, and $(sN)(rN) = srN = r^3sN$. Since $r^3s \in \{rs, r^3s\} = rsN$, the coset $r^3sN$ equals $rsN$. So $(sN)(rN) = (rN)(sN)$. ✓

Every non-identity element has order 2 and the group is abelian: $D_4/N \cong V_4$. Forgetting "the difference between a rotation and the opposite rotation" turns a non-abelian group of order 8 into an abelian group of order 4.

### Example 3: The First Isomorphism Theorem three ways
**(a) $\varphi: \mathbb{Z}/12 \to \mathbb{Z}/4$, $\varphi(a \bmod 12) = a \bmod 4$.** Well-defined: if $a \equiv a' \pmod{12}$ then $12 \mid a - a'$, so $4 \mid a - a'$. Homomorphism: reduction respects addition. Image: all of $\mathbb{Z}/4$ (since $\varphi(0), \varphi(1), \varphi(2), \varphi(3)$ are $0, 1, 2, 3$). Kernel: $\{a \in \mathbb{Z}/12 : 4 \mid a\} = \{0, 4, 8\}$. Check the counting: $|\ker| \cdot |\operatorname{im}| = 3 \cdot 4 = 12 = |\mathbb{Z}/12|$. ✓ Conclusion: $(\mathbb{Z}/12)/\{0, 4, 8\} \cong \mathbb{Z}/4$. The cosets are $\{0,4,8\}, \{1,5,9\}, \{2,6,10\}, \{3,7,11\}$: a 12-hour clock viewed by someone who only cares about the hour mod 4.

**(b) $\operatorname{sgn}: S_3 \to \{\pm 1\}$.** The even permutations in $S_3$ are $e, (1\,2\,3), (1\,3\,2)$ (a 3-cycle is a product of two transpositions: $(1\,2\,3) = (1\,3)(1\,2)$); the odd ones are the three transpositions. Kernel: $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$, order 3. Image: $\{\pm1\}$, order 2. Check: $3 \cdot 2 = 6 = |S_3|$. ✓ So $S_3/A_3 \cong \mathbb{Z}/2$; and $A_3$, being a kernel, is normal.

**(c) $\det: GL_2(\mathbb{R}) \to \mathbb{R}\setminus\{0\}$.** Surjective: $\det\begin{pmatrix} t & 0 \\ 0 & 1 \end{pmatrix} = t$. Kernel: $SL_2(\mathbb{R})$. So $GL_2(\mathbb{R})/SL_2(\mathbb{R}) \cong \mathbb{R}\setminus\{0\}$: once you forget everything about a matrix except its determinant, what's left is just a nonzero number. Two matrices lie in the same coset iff they have the same determinant: e.g. $A = \begin{pmatrix} 2 & 0 \\ 0 & 1\end{pmatrix}$ and $B = \begin{pmatrix} 1 & 1 \\ -1 & 1\end{pmatrix}$ both have determinant 2, and $A^{-1}B = \begin{pmatrix} 1/2 & 1/2 \\ -1 & 1 \end{pmatrix}$ has determinant $\tfrac12 + \tfrac12 = 1$. ✓

### Example 4: Fermat's little theorem from Lagrange
Take $p = 7$. The group $(\mathbb{Z}/7)^\times = \{1, 2, 3, 4, 5, 6\}$ under multiplication has order 6, so every element satisfies $a^6 \equiv 1$. Check $a = 3$ directly:
$$3^2 = 9 \equiv 2,\quad 3^3 \equiv 2 \cdot 3 = 6,\quad 3^4 \equiv 6 \cdot 3 = 18 \equiv 4,\quad 3^5 \equiv 4 \cdot 3 = 12 \equiv 5,\quad 3^6 \equiv 5 \cdot 3 = 15 \equiv 1. \ ✓$$
Here 3 has order exactly 6, so it generates the whole group: $(\mathbb{Z}/7)^\times \cong \mathbb{Z}/6$. For $a = 2$: $2^3 = 8 \equiv 1$, so 2 has order 3, which divides 6, as Lagrange requires, and $2^6 = (2^3)^2 \equiv 1$. ✓

### Example 5: Cayley's theorem for ℤ/3
$G = \mathbb{Z}/3 = \{0, 1, 2\}$. The permutations $\lambda_g(x) = g + x$:
- $\lambda_0$: $0 \mapsto 0, 1 \mapsto 1, 2 \mapsto 2$ (identity)
- $\lambda_1$: $0 \mapsto 1, 1 \mapsto 2, 2 \mapsto 0$, the 3-cycle $(0\,1\,2)$
- $\lambda_2$: $0 \mapsto 2, 1 \mapsto 0, 2 \mapsto 1$, the 3-cycle $(0\,2\,1)$

These form the subgroup $A_3$ of $S_3$, and $\lambda_1 \circ \lambda_1 = \lambda_2$ mirrors $1 + 1 = 2$. ✓

## Visual and animation notes
1. **Cold open:** three panels (square rotating, 4-hour clock, points 1, i, −1, −i on the unit circle). Each animates "do it once, twice, three, four times." Then the labels fade and three identical Cayley tables remain; the panels are joined by threads and slide onto each other (isomorphism motif).
2. **The non-example:** $\mathbb{Z}/4$ and $U(12)$ tables side by side. Highlight the diagonal (squares): $\mathbb{Z}/4$'s diagonal is 0, 2, 0, 2; $U(12)$'s is all 1s. The threads try to connect and snap.
3. **Homomorphism as a translator:** two machines, "combine in G" and "combine in H," connected by φ-arrows; a commuting square animates "combine then translate = translate then combine."
4. **Kernel:** elements of G flow through φ; those landing on $e_H$ glow. Then the whole group is shown as stripes (cosets of the kernel), each stripe landing on one point.
5. **Lagrange:** D₄'s 8 elements as tiles; the subgroup $\{e, s\}$ is colored, then copied by left multiplication into 4 equal-sized colored pairs that tile the whole board.
6. **Left ≠ right:** the same board tiled by left cosets and by right cosets; the tilings differ for $\{e, s\}$ but agree for $\{e, r^2\}$. A "normal" badge appears only in the second case.
7. **Quotient (blob motif):** the cosets of $\{e, r^2\}$ blur into 4 glowing blobs; their multiplication table appears, matching $V_4$.
8. **First Isomorphism Theorem:** the triangle $G \xrightarrow{\pi} G/K \xrightarrow{\bar\varphi} \operatorname{im}\varphi$: first the blobs form, then threads connect each blob to its image point. Caption: "every map = collapse, then relabel."
9. **Rank–nullity seed:** the same triangle with "|G| = |ker| · |im|" morphs into "dim V = dim ker + dim im" with a tag "↪ S2E03."
10. **Cayley:** each element of ℤ/3 becomes an arrow diagram on three dots, turning the abstract group into shuffles.

## Common misconceptions
- **Misconception:** two groups of the same order are isomorphic. **Reality:** $\mathbb{Z}/4 \not\cong V_4$ and $\mathbb{Z}/6 \not\cong S_3$. Isomorphism preserves element orders, commutativity, and much more.
- **Misconception:** any subgroup can be used to form a quotient group. **Reality:** only normal subgroups. For $\{e, s\} \le D_4$, multiplying cosets via representatives is not well-defined.
- **Misconception:** Lagrange's theorem says a subgroup of every order dividing $|G|$ exists. **Reality:** it says only the converse direction. $A_4$ (order 12) has no subgroup of order 6.
- **Misconception:** a homomorphism must be injective or surjective. **Reality:** neither is required. The kernel measures failure of injectivity; the image measures failure of surjectivity. The trivial map $g \mapsto e$ is a homomorphism.
- **Misconception:** a normal subgroup must commute with every element, $gn = ng$. **Reality:** normality says $gN = Ng$ as *sets*: $gn = n'g$ for some possibly different $n' \in N$. The rotations in $D_4$ are normal although $sr \ne rs$.

## Exercises
- **Warm-up (computational):** List the cosets of $\langle 4 \rangle = \{0, 4, 8, 12, 16\}$ in $\mathbb{Z}/20$, and identify the quotient group. In $(\mathbb{Z}/11)^\times$, what are the possible orders of elements? Compute the order of 2.
- **Core (conceptual):** Show that every subgroup of index 2 is normal. Deduce that the rotation subgroup $\{e, r, r^2, r^3\}$ of $D_4$ and $A_n$ in $S_n$ are normal.
- **Stretch (proof):** Prove that if $G/Z(G)$ is cyclic, where $Z(G)$ is the center, then $G$ is abelian. Use it to show $D_4/Z(D_4)$ could not have been $\mathbb{Z}/4$.

<details><summary>Hints and answers</summary>

- **Warm-up:** Cosets $a + \langle 4 \rangle$ for $a = 0, 1, 2, 3$: $\{0,4,8,12,16\}$, $\{1,5,9,13,17\}$, $\{2,6,10,14,18\}$, $\{3,7,11,15,19\}$. The quotient has 4 elements and is generated by $1 + \langle 4\rangle$, so it is $\cong \mathbb{Z}/4$. $(\mathbb{Z}/11)^\times$ has order 10, so orders are 1, 2, 5, 10. Powers of 2 mod 11: 2, 4, 8, 5, 10, 9, 7, 3, 6, 1, so 2 has order 10 (it generates the group).
- **Core:** If $[G : H] = 2$, the left cosets are $H$ and $G \setminus H$, and so are the right cosets. So for $g \notin H$, $gH = G \setminus H = Hg$; for $g \in H$, $gH = H = Hg$.
- **Stretch:** If $G/Z$ is generated by $gZ$, every element is $g^k z$ with $z \in Z$. Then $(g^k z)(g^l z') = g^{k+l} z z' = (g^l z')(g^k z)$ since $z, z'$ are central. For $D_4$: $|D_4/Z| = 4$; if it were cyclic, $D_4$ would be abelian, which it isn't. So it must be $V_4$, matching Example 2.

</details>

## Historical note
Lagrange's 1770–71 memoir *Réflexions sur la résolution algébrique des équations* studied how many different values a function of the roots of a polynomial takes when the roots are permuted. The theorem now named after him is a later abstraction of his counting; the general group-theoretic statement came with the nineteenth-century development of permutation groups by Cauchy and others. Galois (around 1830) introduced the idea we now call a normal subgroup, and recognized it as the key to solving equations (↪ S1E20). Cayley's 1854 paper gave an abstract definition of a group and observed that every group can be represented by permutations. Camille Jordan's *Traité des substitutions et des équations algébriques* (1870) systematized permutation groups and Galois's ideas, and Otto Hölder in the late 1880s studied quotient ("factor") groups explicitly. In the 1920s Emmy Noether and her school made homomorphisms and isomorphism theorems the organizing principle of algebra, the viewpoint popularized by van der Waerden's *Moderne Algebra* (1930–31).

## Connections
- **Callbacks:** ↩ S1E05 (equivalence relations and quotient sets: cosets are equivalence classes), ↩ S1E06 (well-definedness, the hidden trap), ↩ S1E10 (multiplication by i as a quarter turn), ↩ S1E11 (bijections; each coset is in bijection with H), ↩ S1E16 (groups, D₄, the universal property of ℤ)
- **Sets up:** ↪ S1E18 (ring homomorphisms, ideals = kernels, quotient rings), ↪ S1E20 (normal subgroups and solvable groups; $A_5$), ↪ S2E03 (rank–nullity is the First Isomorphism Theorem for vector spaces), ↪ S2E05 (quotient spaces V/W and V/ker T ≅ im T), ↪ S3E02 (modules: quotients of ℤʳ classify abelian groups), ↪ S3E12 (isomorphism as the only meaningful sameness; universal properties)
- **Side quests:** "Emmy Noether and the birth of abstract algebra" (history interlude)

## References
- **Primary / historical**
  - Joseph-Louis Lagrange, "Réflexions sur la résolution algébrique des équations," *Nouveaux Mémoires de l'Académie royale des sciences et belles-lettres de Berlin* (1770–1771).
  - Arthur Cayley, "On the theory of groups, as depending on the symbolic equation θⁿ = 1," *Philosophical Magazine* (1854).
  - Camille Jordan, *Traité des substitutions et des équations algébriques* (Gauthier-Villars, 1870).
- **Textbooks**
  - David S. Dummit and Richard M. Foote, *Abstract Algebra* (3rd ed., Wiley, 2004), Chapter 3 (quotient groups and homomorphisms, Lagrange, the isomorphism theorems) and Section 4.2 (Cayley's theorem).
  - Charles C. Pinter, *A Book of Abstract Algebra* (2nd ed., 1990; Dover 2010), Chapters 9 (isomorphism), 13 (counting cosets), 14–16 (homomorphisms, quotient groups, the fundamental homomorphism theorem).
  - Michael Artin, *Algebra* (2nd ed., Pearson, 2011), Chapter 2 (homomorphisms, cosets, quotient groups).
  - B. L. van der Waerden, *Moderne Algebra* (Springer, 1930–31); English translation *Algebra*.
- **Accessible**
  - Nathan Carter, *Visual Group Theory* (Mathematical Association of America, 2009), chapters on homomorphisms and quotients.
  - Stanford Encyclopedia of Philosophy, "Structuralism in the Philosophy of Mathematics" (for "sameness up to isomorphism" as a philosophical thesis; ↩ S1E04's Benacerraf).
