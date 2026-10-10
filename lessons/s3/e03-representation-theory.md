# S3E03: Groups Acting Linearly: Representation Theory

> **Season / Act:** Season 3, Act I (Algebra Meets Linear Algebra) · **Target runtime:** 22–25 min ·
> **Prerequisites:** S1E16–S1E17 (groups, homomorphisms, conjugacy, Cayley's theorem), S2E04 (matrices, similarity), S2E12 (eigenvalues, trace), S2E13 (invariant subspaces), S2E15 (unitary spaces), S3E02 (modules) ·
> **Builds toward:** S3E04 (characters of abelian groups are Fourier analysis), S3E11 (Lie groups; particles as representations), S3E12 (functors)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a representation of a group, write down concrete representations of $S_3$ and of the dihedral group $D_4$ (symmetries of a square), and decide when two representations are equivalent.
2. State and prove Schur's lemma and Maschke's theorem, and explain why every representation of a finite group splits into irreducible pieces.
3. Define the character of a representation as a trace, prove the orthogonality of irreducible characters, and use it to decompose representations by computing inner products.
4. Build the character tables of $S_3$ and $D_4$ and describe how they are used in chemistry and physics.

## Cold open
*(Narrator. A water molecule jiggles on screen, its three atoms blurring with motion.)*

A water molecule has three atoms, so it has nine ways to move: each atom can go in three directions. Three of those motions just slide the whole molecule. Three more spin it. That leaves three genuine vibrations, three musical notes the molecule can hum, and chemists measure them with infrared light every day.

Here's the strange part. Long before you solve a single equation of motion, a chemist can tell you how those three vibrations are organized: two of them keep the molecule's mirror symmetry exactly, and one of them breaks it in a specific way. They read this off from a small table of numbers, a grid of $1$s and $-1$s, that depends only on the molecule's *symmetry group*.

That table is the fingerprint of a group. Every group has one. It tells you every way the group can act on any vector space, and it's made of a single number per symmetry: the **trace** of a matrix, the same humble trace from Season 2 that adds up the diagonal.

How can one number per symmetry possibly know that much? Today, the group theory of Season 1 and the linear algebra of Season 2 stop being separate subjects.

## The story

### 1. The naive attempt: groups as abstract tables
In S1E16 a group was a set with an operation, and in S1E17 Cayley's theorem told us every group is a group of permutations (↩ S1E16, S1E17). Both views are faithful but clumsy. The Cayley table of a group of order 1000 has a million entries, and permutations of 1000 objects are hard to compute with.

Season 2 offers a better medium. A square's symmetries are *already* linear maps of the plane. With the square centered at the origin, the rotation $r$ by $90^\circ$ and the reflection $s$ across the $x$-axis are
$$r = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad s = \begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix},$$
and the 8 symmetries are the 8 matrices $r^k$ and $r^ks$ for $k = 0, 1, 2, 3$. Composing symmetries is multiplying matrices (↩ S2E04).

> **Definition (representation).** A **representation** of a group $G$ on a finite-dimensional complex vector space $V$ is a group homomorphism
> $$\rho : G \to GL(V),$$
> so $\rho(gh) = \rho(g)\rho(h)$ and $\rho(e) = I$. Its **degree** is $\dim V$. Choosing a basis turns each $\rho(g)$ into an invertible matrix.

Examples for any group: the **trivial** representation $\rho(g) = 1$ on $\mathbb{C}$. For $S_n$: the **sign** representation $\rho(\sigma) = \operatorname{sgn}(\sigma)$ on $\mathbb{C}$, and the **permutation representation** on $\mathbb{C}^n$, where $\sigma$ sends $e_i \mapsto e_{\sigma(i)}$. For any finite group: the **regular representation** on $\mathbb{C}^{|G|}$ with basis $\{e_h\}_{h\in G}$, where $g$ sends $e_h \mapsto e_{gh}$ (Cayley's theorem, linearized).

### 2. The crisis: too many representations
Representations are easy to make, and that is the problem.

- **Basis artifacts.** Conjugating every $\rho(g)$ by a fixed invertible $P$ gives "new" matrices for the same action seen through a different camera (↩ S2E04). We declare $\rho$ and $\rho'$ **equivalent** if there is an invertible $P$ with $\rho'(g) = P\rho(g)P^{-1}$ for all $g$.
- **Sums.** Given $\rho_1$ on $V_1$ and $\rho_2$ on $V_2$, the block-diagonal $\rho_1 \oplus \rho_2$ on $V_1 \oplus V_2$ is a representation. It adds nothing new.

So the right question is the one Season 2 asked of a single matrix (↩ S2E12, S2E13): **find the basis in which all the $\rho(g)$ become as block-diagonal as possible.**

> **Definition.** A subspace $W \subseteq V$ is **invariant** if $\rho(g)W \subseteq W$ for all $g$. A representation $V \ne 0$ is **irreducible** if its only invariant subspaces are $0$ and $V$.

The 2-dimensional representation of $D_4$ above is irreducible: an invariant line would have to be an eigenline of $r$. A quarter turn has no real eigenvector, and over $\mathbb{C}$ its two eigenlines are spanned by $(1, -i)$ (eigenvalue $i$) and $(1, i)$ (eigenvalue $-i$). But $s(1, -i) = (1, i)$: the reflection swaps the two eigenlines, so no line is invariant under both. The permutation representation of $S_3$ on $\mathbb{C}^3$ is not irreducible: the line spanned by $(1,1,1)$ is fixed by everything, and so is the plane $x_1 + x_2 + x_3 = 0$.

In module language (↩ S3E02): a representation of $G$ is a module over the **group algebra** $\mathbb{C}[G]$, and an invariant subspace is a submodule. S3E02 warned us that submodules need not have complements. For finite groups over $\mathbb{C}$, they always do.

### 3. The construction: Maschke and Schur
> **Theorem (Maschke).** Let $G$ be finite and $V$ a representation over $\mathbb{C}$. Every invariant subspace $W$ has an invariant complement. Hence $V$ is a direct sum of irreducible representations.

**Proof.** Start with any inner product $\langle\cdot,\cdot\rangle$ on $V$ (↩ S2E15) and **average it over the group**:
$$\langle u, v\rangle_G = \sum_{g \in G} \langle \rho(g)u, \rho(g)v\rangle.$$
This is again an inner product (a sum of positive definite Hermitian forms is positive definite), and it is invariant: for $h \in G$, $\langle \rho(h)u, \rho(h)v\rangle_G = \sum_g \langle \rho(gh)u, \rho(gh)v\rangle = \langle u, v\rangle_G$, since $g \mapsto gh$ just reorders the sum. So every $\rho(h)$ is unitary for $\langle\cdot,\cdot\rangle_G$. Let $W^\perp$ be the orthogonal complement of $W$ for this inner product. If $v \in W^\perp$ and $w \in W$, then $\langle \rho(h)v, w\rangle_G = \langle v, \rho(h)^{-1}w\rangle_G = 0$ because $\rho(h)^{-1}w = \rho(h^{-1})w \in W$. So $W^\perp$ is invariant and $V = W \oplus W^\perp$. Induct on dimension. $\blacksquare$

The averaging trick, "sum over the group to make anything invariant," is the single most important move in the subject. It needs $|G|$ to be finite (or, for compact groups like the circle, an integral replacing the sum).

> **Theorem (Schur's lemma).** Let $V, W$ be irreducible representations of $G$ over $\mathbb{C}$ and $\varphi: V \to W$ a linear map with $\varphi\rho_V(g) = \rho_W(g)\varphi$ for all $g$ (an **intertwiner**).
> (a) Either $\varphi = 0$ or $\varphi$ is an isomorphism.
> (b) If $V = W$, then $\varphi = \lambda I$ for some $\lambda \in \mathbb{C}$.

**Proof.** (a) $\ker\varphi$ is invariant: if $\varphi v = 0$ then $\varphi\rho_V(g)v = \rho_W(g)\varphi v = 0$. Similarly $\operatorname{im}\varphi$ is invariant. By irreducibility, $\ker\varphi$ is $0$ or $V$ and $\operatorname{im}\varphi$ is $0$ or $W$. If $\varphi \ne 0$ then $\ker\varphi = 0$ and $\operatorname{im}\varphi = W$. (b) Over $\mathbb{C}$, $\varphi$ has an eigenvalue $\lambda$ (↩ S2E12: algebraic closure guarantees it). Then $\varphi - \lambda I$ is also an intertwiner and is not invertible, so by (a) it is $0$. $\blacksquare$

### 4. Characters: the trace as a fingerprint
A representation is a whole list of matrices. We want a coordinate-free summary. Season 2 handed us one (↩ S2E12): the trace is invariant under change of basis, $\operatorname{tr}(P A P^{-1}) = \operatorname{tr}A$.

> **Definition (character).** The **character** of $\rho$ is $\chi_\rho : G \to \mathbb{C}$, $\chi_\rho(g) = \operatorname{tr}\rho(g)$.

Immediate properties:
- **Equivalent representations have equal characters** (trace is similarity-invariant).
- $\chi(e) = \operatorname{tr} I = \dim V$.
- **Class function:** $\chi(hgh^{-1}) = \operatorname{tr}(\rho(h)\rho(g)\rho(h)^{-1}) = \chi(g)$, so $\chi$ is constant on conjugacy classes.
- $\chi_{V\oplus W} = \chi_V + \chi_W$ (trace of a block-diagonal matrix).
- $\chi(g^{-1}) = \overline{\chi(g)}$: $g$ has finite order $m$, so $\rho(g)^m = I$, $\rho(g)$ is diagonalizable with eigenvalues $m$-th roots of unity $\zeta_i$, and $\rho(g^{-1})$ has eigenvalues $\zeta_i^{-1} = \overline{\zeta_i}$.

On the space of class functions define the inner product
$$\langle \chi, \psi\rangle = \frac{1}{|G|}\sum_{g\in G}\chi(g)\overline{\psi(g)}.$$

> **Theorem (orthogonality of characters).** If $\chi_V$ and $\chi_W$ are characters of irreducible representations, then $\langle\chi_V, \chi_W\rangle = 1$ if $V \cong W$ and $0$ otherwise.

**Proof.** Fix bases and write $\rho_V(g)$, $\rho_W(g)$ as matrices, of sizes $d_V$ and $d_W$. For any $d_W \times d_V$ matrix $A$, apply the averaging trick:
$$\tilde A = \frac{1}{|G|}\sum_{g\in G}\rho_W(g)\,A\,\rho_V(g^{-1}).$$
For $h\in G$, $\rho_W(h)\tilde A\rho_V(h^{-1}) = \frac1{|G|}\sum_g \rho_W(hg)A\rho_V((hg)^{-1}) = \tilde A$ (reindex $g \mapsto hg$), so $\tilde A$ is an intertwiner.

*If $V \not\cong W$:* Schur (a) gives $\tilde A = 0$. Take $A = E_{jk}$ (a single $1$ in position $(j,k)$). The $(i,l)$ entry of $\tilde A$ is $\frac1{|G|}\sum_g \rho_W(g)_{ij}\,\rho_V(g^{-1})_{kl} = 0$. Put $i = j$, $l = k$ and sum over $j$ and $k$: $\frac1{|G|}\sum_g \chi_W(g)\chi_V(g^{-1}) = 0$.

*If $V = W$ (same $\rho$):* Schur (b) gives $\tilde A = \lambda I$. Taking traces, $d\lambda = \operatorname{tr}\tilde A = \frac{1}{|G|}\sum_g \operatorname{tr}(\rho(g)A\rho(g)^{-1}) = \operatorname{tr}A$. For $A = E_{jk}$, $\operatorname{tr}A = \delta_{jk}$, so $\frac1{|G|}\sum_g \rho(g)_{ij}\rho(g^{-1})_{kl} = \frac{\delta_{jk}\delta_{il}}{d}$. Put $i = j$, $l = k$ and sum: $\frac1{|G|}\sum_g\chi(g)\chi(g^{-1}) = \frac1d\sum_{j,k}\delta_{jk} = \frac{d}{d} = 1$.

Finally $\chi_V(g^{-1}) = \overline{\chi_V(g)}$ turns both sums into $\langle\chi_W,\chi_V\rangle$. (Equivalent representations have equal characters, so the case $V\cong W$ reduces to $V = W$.) $\blacksquare$

**Consequences.** Let $V_1, \dots, V_k$ be the distinct irreducibles with characters $\chi_1, \dots, \chi_k$, and write any representation as $V \cong m_1V_1 \oplus \dots \oplus m_kV_k$ (Maschke). Then:
1. **Multiplicities are inner products:** $m_i = \langle \chi_V, \chi_i\rangle$. So **a representation is determined up to equivalence by its character.**
2. **Irreducibility test:** $\langle\chi_V,\chi_V\rangle = \sum m_i^2$, which equals $1$ exactly when $V$ is irreducible.
3. **Regular representation:** $\chi_{\text{reg}}(e) = |G|$ and $\chi_{\text{reg}}(g) = 0$ for $g\ne e$ (no $e_h$ is fixed). So $m_i = \frac{1}{|G|}|G|\cdot d_i = d_i$: each irreducible appears $\dim V_i$ times, and comparing dimensions, $\sum_i d_i^2 = |G|$.
4. **Counting** (stated; proof in Serre, §2.5): the number of irreducible representations equals the number of conjugacy classes, and the irreducible characters form an orthonormal basis of the class functions.

A **character table** lists $\chi_i$ on each conjugacy class. It is square, its rows are orthonormal for the weighted inner product, and it is the fingerprint promised in the cold open. (Fingerprints can collide: the quaternion group $Q_8$ has the same character table as $D_4$, though the groups are not isomorphic. The table is a superb summary, not a complete invariant.)

### 5. Payoff: why the chemist's table works, and where this leads
Back to water. Its symmetry group $C_{2v}$ has 4 elements (identity, a $180^\circ$ rotation, two mirror reflections), it is abelian, and so it has 4 irreducible representations, all 1-dimensional. The 9 displacement coordinates of the three atoms form a 9-dimensional representation whose character a chemist computes by counting which atoms stay put under each symmetry. Subtract the characters of the 3 translations and 3 rotations, take inner products with the 4 rows of the character table, and out come the symmetry types of the 3 vibrations: two symmetric under every operation (the symmetric stretch and the bend) and one that flips sign under the rotation and under one of the mirrors (the asymmetric stretch). The vibration equations commute with the symmetries, so by Schur's lemma each symmetry type is a separate block of the problem. This is how infrared and Raman selection rules are derived.

In physics, the same logic organizes particles. The rotation group's double cover $SU(2)$ has exactly one irreducible representation of each dimension $2j+1$, and "spin $j$" *means* "transforms in that representation." In 1961 Gell-Mann and Ne'eman sorted hadrons into representations of $SU(3)$ of dimensions 8 and 10 (the "eightfold way"); a gap in the 10-dimensional one predicted the $\Omega^-$ particle, found in 1964. These are infinite compact groups, where sums over $G$ become integrals (↪ S3E11).

And for abelian groups every irreducible representation is 1-dimensional (Exercise), so characters are homomorphisms $G \to \mathbb{C}^\times$. For $G = \mathbb{Z}/n$ those characters are the discrete Fourier basis. That is the next episode.

## Worked examples

### Example 1: the character table of $S_3$
**Conjugacy classes.** In $S_n$, conjugacy classes are cycle types. For $S_3$: $\{e\}$ (size 1), the transpositions $\{(12),(13),(23)\}$ (size 3), the 3-cycles $\{(123),(132)\}$ (size 2). So there are 3 irreducibles, with $d_1^2 + d_2^2 + d_3^2 = 6$, forcing degrees $1, 1, 2$.

**The 1-dimensional ones.** Trivial $\chi_1 = (1, 1, 1)$; sign $\chi_2 = (1, -1, 1)$ (transpositions are odd, 3-cycles even).

**The permutation character.** $\chi_{\text{perm}}(\sigma) = \operatorname{tr}(\text{permutation matrix}) = $ number of fixed points: $3$ at $e$, $1$ at a transposition, $0$ at a 3-cycle. So $\chi_{\text{perm}} = (3, 1, 0)$.

**The standard one.** $\chi_3 = \chi_{\text{perm}} - \chi_1 = (2, 0, -1)$, the character of the plane $x_1 + x_2 + x_3 = 0$.

| | $e$ (1) | $(12)$ (3) | $(123)$ (2) |
|---|---|---|---|
| $\chi_1$ trivial | 1 | 1 | 1 |
| $\chi_2$ sign | 1 | −1 | 1 |
| $\chi_3$ standard | 2 | 0 | −1 |

**Check orthonormality** (class sizes in parentheses are the weights):
- $\langle\chi_3,\chi_3\rangle = \frac16(1\cdot 4 + 3\cdot 0 + 2\cdot 1) = 1$, so the standard representation is irreducible.
- $\langle\chi_1,\chi_3\rangle = \frac16(2 + 0 - 2) = 0$.
- $\langle\chi_2,\chi_3\rangle = \frac16(2 + 0 - 2) = 0$.
- $\langle\chi_1,\chi_2\rangle = \frac16(1 - 3 + 2) = 0$; $\langle\chi_1,\chi_1\rangle = \langle\chi_2,\chi_2\rangle = \frac16(1 + 3 + 2) = 1$.

All checked in Python by generating the six $3\times3$ permutation matrices.

### Example 2: decomposing representations of $S_3$ by inner products
**(a) The permutation representation.** $\chi = (3, 1, 0)$.
- $m_1 = \frac16(3 + 3\cdot1 + 0) = 1$
- $m_2 = \frac16(3 - 3\cdot 1 + 0) = 0$
- $m_3 = \frac16(3\cdot 2 + 0 + 0) = 1$

So $\mathbb{C}^3 \cong \text{trivial} \oplus \text{standard}$, realized concretely by $\operatorname{span}(1,1,1) \oplus \{x_1+x_2+x_3 = 0\}$.

**(b) The regular representation.** $\chi_{\text{reg}} = (6, 0, 0)$. Then $m_i = \frac{6 d_i}{6} = d_i$: $\mathbb{C}^6 \cong \chi_1 \oplus \chi_2 \oplus 2\chi_3$, and $1 + 1 + 2\cdot 2 = 6$. ✓

**(c) A tensor product.** The character of $V\otimes W$ is $\chi_V\chi_W$ (↩ S2E10: eigenvalues of $A\otimes B$ are products). For $\text{std}\otimes\text{std}$, $\chi = (4, 0, 1)$:
- $m_1 = \frac16(4 + 0 + 2) = 1$, $m_2 = \frac16(4 + 0 + 2) = 1$, $m_3 = \frac16(8 + 0 - 2) = 1$.

So $\text{std}\otimes\text{std} \cong \text{triv}\oplus\text{sgn}\oplus\text{std}$, dimensions $1 + 1 + 2 = 4$. ✓ (This is a baby version of how physicists "add angular momenta.")

### Example 3: the square group $D_4$ and its vertices
**Matrices and traces.** The eight matrices $r^k$, $r^ks$ (verified in Python):

| element | matrix | trace | det |
|---|---|---|---|
| $e$ | $\begin{pmatrix}1&0\\0&1\end{pmatrix}$ | 2 | 1 |
| $r, r^3$ | $\begin{pmatrix}0&\mp1\\\pm1&0\end{pmatrix}$ | 0 | 1 |
| $r^2$ | $\begin{pmatrix}-1&0\\0&-1\end{pmatrix}$ | −2 | 1 |
| $s, r^2s$ (axis reflections) | $\begin{pmatrix}\pm1&0\\0&\mp1\end{pmatrix}$ | 0 | −1 |
| $rs, r^3s$ (diagonal reflections) | $\begin{pmatrix}0&\pm1\\\pm1&0\end{pmatrix}$ | 0 | −1 |

**Conjugacy classes:** $\{e\}, \{r^2\}, \{r, r^3\}, \{s, r^2s\}, \{rs, r^3s\}$, sizes $1,1,2,2,2$. Five classes, so five irreducibles, with $\sum d_i^2 = 8$: degrees $1,1,1,1,2$.

**Character table.** The four 1-dimensional characters send $r \mapsto \pm1$ and $s \mapsto \pm1$ (they factor through $D_4/\{e, r^2\}$, which has order 4 and every element of order $\le 2$). The 2-dimensional one is the trace column above.

| | $e$ (1) | $r^2$ (1) | $r$ (2) | $s$ (2) | $rs$ (2) |
|---|---|---|---|---|---|
| $\chi_1$ | 1 | 1 | 1 | 1 | 1 |
| $\chi_2 = \det$ | 1 | 1 | 1 | −1 | −1 |
| $\chi_3$ | 1 | 1 | −1 | 1 | −1 |
| $\chi_4$ | 1 | 1 | −1 | −1 | 1 |
| $\chi_5$ | 2 | −2 | 0 | 0 | 0 |

$\langle\chi_5,\chi_5\rangle = \frac18(4 + 4 + 0 + 0 + 0) = 1$: the plane representation is irreducible, confirming §2.

**Permuting the four vertices.** Label the vertices $(1,1), (-1,1), (-1,-1), (1,-1)$. The permutation character counts fixed vertices: $e$ fixes 4; $r^2$, $r$, $r^3$ fix none; an axis reflection such as $s$ (the $x$-axis) passes through edge midpoints and fixes no vertex; a diagonal reflection fixes the 2 vertices on its diagonal. So $\chi = (4, 0, 0, 0, 2)$. Decompose:
- $m_1 = \frac18(4 + 2\cdot 2) = 1$
- $m_2 = \frac18(4 - 2\cdot 2) = 0$
- $m_3 = \frac18(4 - 2\cdot2) = 0$
- $m_4 = \frac18(4 + 2\cdot 2) = 1$
- $m_5 = \frac18(8 + 0) = 1$

So $\mathbb{C}^4 \cong \chi_1 \oplus \chi_4 \oplus \chi_5$ ($1 + 1 + 2 = 4$ ✓). Concretely: $\chi_1$ is spanned by $(1,1,1,1)$; $\chi_4$ by the alternating vector $(1,-1,1,-1)$ (a quarter turn moves each vertex to its neighbor and flips the sign; an axis reflection swaps adjacent vertices, flipping the sign; a diagonal reflection swaps the two vertices off its diagonal, which carry equal entries, so it fixes the vector); and $\chi_5$ is the remaining plane, a copy of the original geometric representation.

## Visual and animation notes
1. **Cold open:** a water molecule vibrating in three modes, each in a different color; a $4\times4$ grid of $\pm1$s fades in beside it and the three modes snap to rows.
2. **Groups become matrices:** the square from S1E16 flipping and turning; beside it, the grid of the plane transforming by $r$ and $s$ (linear-map grid motif), with the $2\times2$ matrices printed underneath. Isomorphism "threads" connect each symmetry to its matrix.
3. **Equivalence:** the same 8 matrices viewed through a moving basis "camera"; the entries churn, the traces sit still in an **invariant badge**.
4. **Maschke's averaging:** a lopsided ellipse (a random inner product) is copied 8 times by the symmetries and averaged into a perfect circle; an invariant line and its perpendicular complement light up.
5. **Schur's lemma:** an intertwiner arrow between two irreducible "rooms" either collapses to nothing or becomes a perfect bridge (isomorphism threads).
6. **Character table:** rows as vectors in a 3-dimensional (for $S_3$) "class function" space, shown as mutually perpendicular arrows; the permutation character arrow is projected onto them, and the shadows have lengths 1, 0, 1.
7. **Vertex representation of $D_4$:** four lamps on the square's corners; the vectors $(1,1,1,1)$ and $(1,-1,1,-1)$ shown as lamp patterns that are preserved (or sign-flipped) by each symmetry.
8. **Teaser:** the circle group spinning; its characters $e^{in\theta}$ appear as waves, setting up S3E04.

## Common misconceptions
- **Misconception:** "A representation is a set of matrices." **Reality:** it is a homomorphism into $GL(V)$; matrices are one basis's picture of it, and equivalent representations are the same object seen through different cameras.
- **Misconception:** "The character only records traces, so it loses information." **Reality:** for finite groups over $\mathbb{C}$, the character determines the representation up to equivalence, because multiplicities are inner products of characters.
- **Misconception:** "Every invariant subspace has an invariant complement, for any group and any field." **Reality:** Maschke needs $|G|$ invertible in the field. Over $\mathbb{F}_2$, the group $\mathbb{Z}/2$ acting on $\mathbb{F}_2^2$ by swapping coordinates fixes the line spanned by $(1,1)$, and that line has no invariant complement. The infinite group $\mathbb{Z}$ acting on $\mathbb{C}^2$ by powers of the shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ fails too (↩ S2E13).
- **Misconception:** "The character table determines the group." **Reality:** $D_4$ and $Q_8$ have identical character tables but are not isomorphic.
- **Misconception:** "Irreducible means 1-dimensional." **Reality:** that is true only for abelian groups. $S_3$ and $D_4$ each have a 2-dimensional irreducible representation.

## Exercises
- **Warm-up (computational):** Compute the character of the representation of $S_3$ on $\mathbb{C}^3$ given by $\sigma \mapsto \operatorname{sgn}(\sigma)P_\sigma$ (sign times the permutation matrix), and decompose it.
- **Core (conceptual):** Use Schur's lemma to prove that every irreducible representation of a finite *abelian* group over $\mathbb{C}$ is 1-dimensional. Then show that $\mathbb{Z}/n$ has exactly $n$ irreducible representations and write them down.
- **Stretch (proof or exploration):** The quaternion group $Q_8 = \{\pm1, \pm i, \pm j, \pm k\}$ has the same character table as $D_4$. Find its conjugacy classes, its four 1-dimensional characters, and its 2-dimensional representation (hint: $i \mapsto \begin{pmatrix} i & 0\\0&-i\end{pmatrix}$, $j \mapsto \begin{pmatrix}0&1\\-1&0\end{pmatrix}$). What property distinguishes $Q_8$ from $D_4$?

<details><summary>Hints and answers</summary>

- **Warm-up:** $\chi = \chi_2\cdot\chi_{\text{perm}} = (3, -1, 0)$. Then $m_1 = \frac16(3 - 3) = 0$, $m_2 = \frac16(3 + 3) = 1$, $m_3 = \frac16(6) = 1$: the representation is $\text{sgn}\oplus\text{std}$. (Explanation: it is $\text{sgn}\otimes(\text{triv}\oplus\text{std}) = \text{sgn}\oplus(\text{sgn}\otimes\text{std})$, and $\text{sgn}\otimes\text{std}$ has character $(2, 0, -1)$, so it is the standard representation again.)
- **Core:** If $G$ is abelian, each $\rho(h)$ commutes with every $\rho(g)$, so $\rho(h)$ is an intertwiner of the irreducible $V$ with itself; by Schur (b) it is a scalar. Then every subspace is invariant, so irreducibility forces $\dim V = 1$. For $\mathbb{Z}/n$, a homomorphism $\chi: \mathbb{Z}/n\to\mathbb{C}^\times$ is fixed by $\chi(1) = \zeta$ with $\zeta^n = 1$: the $n$ choices $\zeta = e^{2\pi i k/n}$ give $\chi_k(j) = e^{2\pi i jk/n}$.
- **Stretch:** Classes $\{1\},\{-1\},\{\pm i\},\{\pm j\},\{\pm k\}$. The 1-dimensional characters factor through $Q_8/\{\pm1\}\cong\mathbb{Z}/2\times\mathbb{Z}/2$. The 2-dimensional character is $(2,-2,0,0,0)$. $D_4$ has five elements of order 2 ($r^2$ and four reflections); $Q_8$ has only one ($-1$). So they are not isomorphic despite equal tables.

</details>

## Historical note
Representation theory was born in a correspondence. In 1896 Richard Dedekind wrote to Ferdinand Georg Frobenius about the "group determinant," the determinant of the $|G|\times|G|$ matrix with entries $x_{gh^{-1}}$, which Dedekind had noticed factors in interesting ways for small groups. Trying to explain the factorization, Frobenius invented group characters in the same year ("Über Gruppencharaktere," 1896) and only afterward realized that they were traces of matrix representations. Theodor Molien obtained related results independently, Heinrich Maschke proved his complete-reducibility theorem in 1898–99, and Issai Schur gave a streamlined foundation of the theory in 1905, built on the lemma now named after him. William Burnside used characters to prove deep results about finite groups, including his $p^aq^b$ theorem (1904). Within a generation the subject moved into physics: Hermann Weyl's *Gruppentheorie und Quantenmechanik* (1928) and Eugene Wigner's 1931 book on atomic spectra made representations the language of quantum symmetry.

## Connections
- **Callbacks:** ↩ S1E16 (groups, the symmetries of a square), ↩ S1E17 (homomorphisms, conjugacy, Cayley's theorem), ↩ S2E04 (similarity, change of basis), ↩ S2E10 (tensor products), ↩ S2E12 (trace as an invariant; eigenvalues exist over $\mathbb{C}$), ↩ S2E13 (invariant subspaces; the shear), ↩ S2E15 (unitary maps and Hermitian inner products), ↩ S3E02 (modules; complements may fail).
- **Sets up:** ↪ S3E04 (characters of $\mathbb{Z}/n$, the circle and $\mathbb{R}$: Fourier analysis), ↪ S3E11 (Lie groups $SO(3)$, $SU(2)$, $SU(3)$; particles as representations; Noether), ↪ S3E12 (representations as functors from a one-object category).
- **Side quests:** "Quantum computing" (qubits as representations of $SU(2)$, tensor products); "Graphs as matrices" (symmetry of a graph block-diagonalizes its adjacency matrix).

## References
- **Primary / historical:** F. G. Frobenius, "Über Gruppencharaktere," *Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften zu Berlin* (1896). I. Schur, "Neue Begründung der Theorie der Gruppencharaktere," *Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften zu Berlin* (1905). H. Weyl, *Gruppentheorie und Quantenmechanik* (Hirzel, 1928; English translation *The Theory of Groups and Quantum Mechanics*, 1931).
- **Textbooks:** J.-P. Serre, *Linear Representations of Finite Groups*, Graduate Texts in Mathematics 42 (Springer, 1977), Part I, Ch. 1–2 (representations, characters, orthogonality, decomposition of the regular representation). W. Fulton and J. Harris, *Representation Theory: A First Course*, Graduate Texts in Mathematics 129 (Springer, 1991), Lectures 1–2 (the symmetric group $S_3$ worked in detail; characters). G. James and M. Liebeck, *Representations and Characters of Groups*, 2nd ed. (Cambridge University Press, 2001), the chapters on Maschke's theorem, Schur's lemma, and character tables (with $D_4$ and $Q_8$). D. S. Dummit and R. M. Foote, *Abstract Algebra*, 3rd ed. (Wiley, 2004), Ch. 18 "Representation Theory and Character Theory" and Ch. 19. M. Artin, *Algebra*, 2nd ed. (Pearson, 2011), Ch. 10 "Group Representations."
- **Accessible / applied:** F. A. Cotton, *Chemical Applications of Group Theory*, 3rd ed. (Wiley, 1990), for character tables of point groups and molecular vibrations. M. Gell-Mann and Y. Ne'eman, *The Eightfold Way* (W. A. Benjamin, 1964), the reprint collection on $SU(3)$ classification of hadrons.
