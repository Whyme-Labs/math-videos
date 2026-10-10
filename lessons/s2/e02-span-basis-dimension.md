# S2E02: Span, Independence, Basis, Dimension

> **Season / Act:** Season 2, Part A, Act I: What Is Linear? · **Target runtime:** 18–25 min ·
> **Prerequisites:** S2E01 (vector spaces); S1E11–12 (countable vs. uncountable) and S1E15 (Axiom of Choice) for the infinite-dimensional teaser ·
> **Builds toward:** S2E03 (rank–nullity), S2E04 (matrices and change of basis), S2E06 (dual basis), S2E20 (Hamel bases are useless), S3E01 (degree of a field extension)

## Learning objectives
By the end of this lesson the viewer can:
1. Define span, linear independence, basis, and dimension, and test a finite list of vectors for each property.
2. State and prove the Steinitz exchange lemma, and deduce that every basis of a finite-dimensional space has the same size.
3. Compute the coordinates of a vector in a given basis, and explain why coordinates are a *language* rather than a property of the vector.
4. Explain why $\mathcal{P}(\mathbb{R})$ is infinite-dimensional, and why $\mathbb{R}$ as a vector space over $\mathbb{Q}$ has uncountable dimension and needs the Axiom of Choice for a basis.

## Cold open
"A painter's palette. Red, yellow, blue. Mix them in different amounts and you get orange, green, purple, brown, and a thousand shades in between.

"Now someone hands you a fourth tube: green. Did you gain anything? No. You could already mix green from yellow and blue. That tube is *redundant*.

"Throw away blue instead, and keep red, yellow, green. Can you still make everything? Blue is not a mix of red, yellow, and green in this toy model, so no. You've lost something.

"So here's the question: what's the smallest set of ingredients that can make *everything*, with nothing wasted? And here's the deeper question. Two painters choose different ingredients. One picks red, yellow, blue. Another picks some exotic trio: magenta, lime, teal. Can they disagree about *how many* ingredients you need?

"For paint, the honest answer is messy. For vector spaces, the answer is clean and surprising: every minimal recipe has exactly the same number of ingredients. That number is called the **dimension**, and proving that it's well defined takes one beautiful swapping argument. Today we'll do it, and then we'll see the number go off to infinity, so far that even writing down the ingredients requires an axiom of set theory."

## The story

### 1. Ingredients and recipes: linear combinations and span

Throughout, $V$ is a vector space over a field $F$ (↩ S2E01).

> **Definition (linear combination, span).** A **linear combination** of vectors $v_1, \dots, v_k \in V$ is a vector of the form $c_1 v_1 + \dots + c_k v_k$ with $c_i \in F$. The **span** of a set $S \subseteq V$, written $\operatorname{span}(S)$, is the set of all linear combinations of finitely many vectors from $S$. (By convention $\operatorname{span}(\varnothing) = \lbrace 0\rbrace$.) We say $S$ **spans** $V$ if $\operatorname{span}(S) = V$.

Two facts make span the right notion of "everything you can cook":
- $\operatorname{span}(S)$ is a subspace: sums and scalar multiples of linear combinations are again linear combinations.
- It is the *smallest* subspace containing $S$: any subspace containing $S$ is closed under linear combinations, so it contains all of $\operatorname{span}(S)$.

Note the word *finitely*. Linear algebra, without any notion of limit, can only add finitely many things. Infinite sums need a notion of convergence, which arrives in Part B (↪ S2E20).

> **Definition.** $V$ is **finite-dimensional** if some finite list of vectors spans it. Otherwise it is **infinite-dimensional**.

### 2. The naive attempt: just pick a spanning set

Spanning sets are easy to find: the whole space spans itself. But spanning sets can be wasteful. In $\mathbb{R}^2$, the list $(1,0), (0,1), (1,1)$ spans, but $(1,1) = (1,0) + (0,1)$ is redundant. Worse, redundancy makes recipes ambiguous:
$$(2, 3) = 2(1,0) + 3(0,1) + 0(1,1) = 1(1,0) + 2(0,1) + 1(1,1).$$
If we want to *name* vectors by their recipes, we need recipes to be unique.

> **Definition (linear independence).** A list $v_1, \dots, v_k$ is **linearly independent** if the only solution of $c_1 v_1 + \dots + c_k v_k = 0$ is $c_1 = \dots = c_k = 0$. Otherwise it is **linearly dependent**. An infinite set is linearly independent if every finite subset is.

> **Lemma (three faces of dependence).** For a list $v_1, \dots, v_k$ the following are equivalent:
> 1. The list is linearly dependent.
> 2. Some $v_j$ is a linear combination of the others (an ingredient is redundant).
> 3. Some vector in the span has two different recipes.
>
> Moreover, if the list is dependent and $v_1 \neq 0$, then some $v_j$ with $j \ge 2$ lies in $\operatorname{span}(v_1, \dots, v_{j-1})$, and removing it does not change the span.

*Proof sketch.* (1⇒2): if $\sum c_i v_i = 0$ with some $c_j \ne 0$, divide by $c_j$ (we are in a field!) and solve for $v_j$. (2⇒3): if $v_j = \sum_{i\ne j} a_i v_i$, then $v_j$ has the recipe "$1 \cdot v_j$" and the recipe "$\sum a_i v_i$." (3⇒1): subtract two recipes for the same vector. For the "moreover," take the *largest* $j$ with $c_j \ne 0$ in a dependence relation; $j \geq 2$ because $c_1 v_1 = 0$ with $c_1 \neq 0$ would force $v_1 = 0$. $\blacksquare$

### 3. The construction: a basis, and why its size is well defined

> **Definition (basis).** A **basis** of $V$ is a linearly independent spanning set. Equivalently: a list $b_1, \dots, b_n$ such that every $v \in V$ can be written as $v = c_1 b_1 + \dots + c_n b_n$ in **exactly one** way. The scalars $(c_1, \dots, c_n)$ are the **coordinates** of $v$ in the basis $\mathcal{B} = (b_1, \dots, b_n)$, written $[v]_{\mathcal{B}}$.

Existence: every finite spanning list contains a basis. Repeatedly delete a vector that lies in the span of the earlier ones (the "moreover" of the lemma); the span never changes, and when nothing can be deleted the list is independent. (If $V = \lbrace 0\rbrace$, the basis is empty.)

Now the crucial worry from the cold open: could one basis of $V$ have 3 vectors and another have 4? The following lemma rules this out.

> **Steinitz exchange lemma.** Let $u_1, \dots, u_m$ be linearly independent in $V$, and let $w_1, \dots, w_n$ span $V$. Then $m \le n$. Moreover, after reordering the $w$'s, the list $u_1, \dots, u_m, w_{m+1}, \dots, w_n$ spans $V$.

*Proof.* We swap the $u$'s in one at a time, keeping a spanning list of length $n$ at every stage.

*Claim:* for each $k = 0, 1, \dots, m$, we have $k \le n$ and, after reordering the $w$'s, the list $L_k = (u_1, \dots, u_k, w_{k+1}, \dots, w_n)$ spans $V$.

For $k = 0$, $L_0 = (w_1, \dots, w_n)$ spans by hypothesis.

Suppose the claim holds for some $k < m$. Since $L_k$ spans $V$, we can write
$$u_{k+1} = a_1 u_1 + \dots + a_k u_k + b_{k+1} w_{k+1} + \dots + b_n w_n.$$
If all of $b_{k+1}, \dots, b_n$ were zero (which includes the case $k = n$, where there are no $w$'s left), then $u_{k+1} - a_1 u_1 - \dots - a_k u_k = 0$ would be a nontrivial dependence among the $u$'s, contradicting their independence. So some $b_j \ne 0$, which in particular forces $k + 1 \le n$. Reorder the remaining $w$'s so that $b_{k+1} \ne 0$. Solve for $w_{k+1}$:
$$w_{k+1} = \frac{1}{b_{k+1}}\Big(u_{k+1} - a_1 u_1 - \dots - a_k u_k - b_{k+2} w_{k+2} - \dots - b_n w_n\Big).$$
So $w_{k+1} \in \operatorname{span}(L_{k+1})$, where $L_{k+1} = (u_1, \dots, u_{k+1}, w_{k+2}, \dots, w_n)$. Every vector of $L_k$ is therefore in $\operatorname{span}(L_{k+1})$, so $V = \operatorname{span}(L_k) \subseteq \operatorname{span}(L_{k+1})$, and $L_{k+1}$ spans $V$.

By induction the claim holds for $k = m$, giving $m \le n$ and the spanning list. $\blacksquare$

The picture: each independent vector *evicts* one spanning vector and takes its seat. Independence guarantees there is always someone left to evict.

> **Theorem (dimension is well defined).** If $V$ is finite-dimensional, all bases of $V$ have the same number of elements. This number is the **dimension** $\dim V$.

*Proof.* Let $\mathcal{B}$ and $\mathcal{C}$ be bases with $m$ and $n$ elements. $\mathcal{B}$ is independent and $\mathcal{C}$ spans, so $m \le n$ by Steinitz. Swap roles: $n \le m$. $\blacksquare$

**Consequences** (each a two-line corollary of Steinitz, worth stating on screen). Let $\dim V = n$.
1. Any independent list has at most $n$ vectors; any spanning list has at least $n$.
2. Any independent list of exactly $n$ vectors is a basis; so is any spanning list of exactly $n$ vectors. (So for $n$ vectors in an $n$-dimensional space, *checking one property gives the other for free*.)
3. Every independent list can be **extended** to a basis (Steinitz's "moreover" does exactly this).
4. If $U \subseteq V$ is a subspace, then $\dim U \le \dim V$, with equality only if $U = V$.

### 4. Coordinates are a language

A basis $\mathcal{B} = (b_1, \dots, b_n)$ gives a perfect dictionary
$$V \longleftrightarrow F^n, \qquad v \longmapsto [v]_{\mathcal{B}}.$$
It is a bijection (by uniqueness of recipes), and it respects adding and scaling: $[u + v]_{\mathcal{B}} = [u]_{\mathcal{B}} + [v]_{\mathcal{B}}$ and $[cv]_{\mathcal{B}} = c[v]_{\mathcal{B}}$. So every $n$-dimensional space over $F$ "is" $F^n$. But the dictionary depends on the basis, and in an abstract vector space **no basis is preferred**. In $\mathcal{P}_2$ (polynomials of degree $\le 2$), the monomials $1, x, x^2$ feel natural, but the basis $1, (x-1), (x-1)^2$ is just as good, and in S2E07 we'll see that the Lagrange basis is better for some jobs. The same vector, two different coordinate lists, like the same sentence in two languages.

This is the season's stance in miniature: *the vector is the thing; coordinates are a description of it in a chosen language.* Statements that are true in every language (like "these three vectors are dependent," or "the space has dimension 3") are facts about the space. Statements that hold only in one language (like "the second coordinate is 5") are facts about the description.

### 5. Payoff and teaser: infinite dimension

**Polynomials.** $\mathcal{P}(\mathbb{R})$, all real polynomials, is infinite-dimensional. Proof: any finite list of polynomials has a maximum degree $d$, and its span contains only polynomials of degree $\le d$, so it misses $x^{d+1}$. Yet $\mathcal{P}(\mathbb{R})$ has a perfectly concrete basis, the infinite set $\lbrace 1, x, x^2, \dots\rbrace$: every polynomial is a *finite* combination of monomials, uniquely.

**$\mathbb{R}$ over $\mathbb{Q}$.** The real numbers form a vector space over the field $\mathbb{Q}$: add reals, scale them by rationals. Its dimension is not just infinite but **uncountable** (↩ S1E12). Proof: suppose $S \subset \mathbb{R}$ were a countable spanning set. Every real number would be $q_1 s_1 + \dots + q_k s_k$ for some finite $k$, rationals $q_i$, and $s_i \in S$. For each $k$, the set of such expressions is a countable union of copies of $\mathbb{Q}^k \times S^k$, which is countable; and a countable union over $k$ of countable sets is countable. So $\mathbb{R}$ would be countable, contradicting Cantor's diagonal argument. $\blacksquare$

Does $\mathbb{R}$ over $\mathbb{Q}$ even *have* a basis (a so-called **Hamel basis**)? With the Axiom of Choice (↩ S1E15), yes: Zorn's lemma shows that every vector space has a basis, by taking a maximal independent set. Without some form of Choice, it can't be proved: there are models of set theory without Choice (in which, for example, every set of reals is Lebesgue measurable) where $\mathbb{R}$ has no basis over $\mathbb{Q}$. Nobody has ever written one down.

So we plant the question: *is a basis whose existence is a matter of axioms, and which no one can exhibit, actually useful?* For function spaces, Part B answers: usually not. We'll replace "finite combinations of basis vectors" with *convergent infinite sums*, like Fourier series (↪ S2E20, ↪ S2E29).

**Zoom out (thread: bijections are the real way to count).** Dimension counts the ingredients, and Steinitz is a matching argument: it pairs each independent vector with a spanning vector it evicts. That's the same move as Cantor's bijections (↩ S1E11). Two finite-dimensional spaces over the same field are "the same" (isomorphic) exactly when they have the same dimension, which we'll prove in ↪ S2E03.

**Teaser.** We now have a dictionary $V \leftrightarrow F^n$ for each basis. What happens to a *process* that transforms vectors, like rotation or differentiation, when we translate it into a dictionary? Next: linear maps.

## Worked examples

### Example 1: Testing independence, finding a relation, and describing the span

Are $v_1 = (1,2,3)$, $v_2 = (4,5,6)$, $v_3 = (7,8,9)$ linearly independent in $\mathbb{R}^3$?

Solve $c_1 v_1 + c_2 v_2 + c_3 v_3 = 0$, i.e.
$$c_1 + 4c_2 + 7c_3 = 0,\quad 2c_1 + 5c_2 + 8c_3 = 0,\quad 3c_1 + 6c_2 + 9c_3 = 0.$$
Subtract the first equation from the second: $c_1 + c_2 + c_3 = 0$. Subtract the second from the third: $c_1 + c_2 + c_3 = 0$ again. So the system is equivalent to $c_1 + 4c_2 + 7c_3 = 0$ and $c_1 + c_2 + c_3 = 0$. Subtracting these gives $3c_2 + 6c_3 = 0$, so $c_2 = -2c_3$, and then $c_1 = -c_2 - c_3 = 2c_3 - c_3 = c_3$. Taking $c_3 = 1$:
$$1\cdot(1,2,3) - 2\cdot(4,5,6) + 1\cdot(7,8,9) = (1 - 8 + 7,\; 2 - 10 + 8,\; 3 - 12 + 9) = (0,0,0).$$
So the list is **dependent**, and $v_3 = 2v_2 - v_1$ is redundant.

The span is $\operatorname{span}(v_1, v_2)$, and $v_1, v_2$ are independent (neither is a multiple of the other), so the span is a plane. To find its equation, look for $(a,b,c)$ with $a x + b y + c z = 0$ for both: $a + 2b + 3c = 0$ and $4a + 5b + 6c = 0$. Subtracting four times the first from the second: $-3b - 6c = 0$, so $b = -2c$, and $a = -2b - 3c = 4c - 3c = c$. With $c = 1$: $(a,b,c) = (1,-2,1)$. So
$$\operatorname{span}(v_1,v_2,v_3) = \lbrace (x,y,z) : x - 2y + z = 0\rbrace.$$
Check: $1 - 4 + 3 = 0$, $4 - 10 + 6 = 0$, $7 - 16 + 9 = 0$. ✓ The dimension of the span is 2.

### Example 2: The same vector in two languages

In $\mathbb{R}^2$, let $\mathcal{E} = (e_1, e_2)$ be the standard basis and $\mathcal{B} = (b_1, b_2)$ with $b_1 = (1,1)$, $b_2 = (1,-1)$.

First, $\mathcal{B}$ is a basis: two vectors in a 2-dimensional space, and independent since $c_1(1,1) + c_2(1,-1) = (c_1 + c_2, c_1 - c_2) = (0,0)$ forces $c_1 = c_2 = 0$. (By consequence 2 we don't need to check spanning separately.)

Take $v = (3,1)$, so $[v]_{\mathcal{E}} = (3,1)$. To find $[v]_{\mathcal{B}}$, solve $c_1(1,1) + c_2(1,-1) = (3,1)$:
$$c_1 + c_2 = 3, \qquad c_1 - c_2 = 1.$$
Adding: $2c_1 = 4$, so $c_1 = 2$; then $c_2 = 1$. Hence $[v]_{\mathcal{B}} = (2, 1)$. Check: $2(1,1) + 1(1,-1) = (3, 1)$. ✓

Same arrow, two coordinate lists: $(3,1)$ in one language, $(2,1)$ in the other. Neither list *is* the vector.

### Example 3: A polynomial in two bases of $\mathcal{P}_2$

Let $p(x) = 3x^2 - x + 2$ (the polynomial from the season's cold open). In the monomial basis $\mathcal{M} = (1, x, x^2)$, $[p]_{\mathcal{M}} = (2, -1, 3)$.

Now use $\mathcal{T} = (1, (x-1), (x-1)^2)$. It is a basis of $\mathcal{P}_2$: three polynomials of degrees $0, 1, 2$ in a 3-dimensional space, and independent because in $a + b(x-1) + c(x-1)^2 = 0$ the $x^2$ coefficient gives $c = 0$, then the $x$ coefficient gives $b = 0$, then $a = 0$.

To find $[p]_{\mathcal{T}}$, write $p = a + b(x-1) + c(x-1)^2$. Method 1 (Taylor at 1): $a = p(1) = 3 - 1 + 2 = 4$; $p'(x) = 6x - 1$, so $b = p'(1) = 5$; $p''(x) = 6$, so $c = p''(1)/2 = 3$. Method 2 (substitution): put $x = t + 1$, so
$p = 3(t+1)^2 - (t+1) + 2 = 3t^2 + 6t + 3 - t - 1 + 2 = 3t^2 + 5t + 4.$
Both give $[p]_{\mathcal{T}} = (4, 5, 3)$. Check by expanding: $4 + 5(x-1) + 3(x^2 - 2x + 1) = 4 + 5x - 5 + 3x^2 - 6x + 3 = 3x^2 - x + 2$. ✓

### Example 4: Dimension of the solution space of $y'' + y = 0$

From S2E01, $S = \lbrace y : y'' + y = 0\rbrace$ is a vector space containing $\cos$ and $\sin$.

*Independence:* suppose $a\cos x + b\sin x = 0$ for **all** $x$ (the zero vector of a function space is the zero function). At $x = 0$: $a\cdot 1 + b \cdot 0 = 0$, so $a = 0$. At $x = \pi/2$: $a \cdot 0 + b\cdot 1 = 0$, so $b = 0$. Independent.

*Spanning:* let $y \in S$ and set $u = y - y(0)\cos x - y'(0)\sin x$. Then $u \in S$, $u(0) = y(0) - y(0) = 0$, and $u'(0) = y'(0) - y'(0) = 0$. The energy $E = u^2 + (u')^2$ has $E' = 2uu' + 2u'u'' = 2u'(u + u'') = 0$, so $E$ is constant, and $E(0) = 0$. Hence $u = 0$ everywhere, and $y = y(0)\cos x + y'(0)\sin x$.

So $(\cos, \sin)$ is a basis and $\dim S = 2$. The coordinates of a solution are its **initial conditions** $(y(0), y'(0))$: a physical meaning for a coordinate system.

### Example 5 (conceptual): Why $\mathbb{F}_2^3$ has dimension 3, by counting

A basis of $V$ over $\mathbb{F}_2$ with $n$ elements gives a bijection $V \leftrightarrow \mathbb{F}_2^n$, so $|V| = 2^n$. Since $|\mathbb{F}_2^3| = 8 = 2^3$, every basis of $\mathbb{F}_2^3$ has exactly 3 vectors; here dimension is literally $\log_2$ of the number of elements. The even-parity code $E$ of S2E01 has 4 elements, so $\dim E = 2$; a basis is $110, 011$ (independent, and $110 + 011 = 101$ recovers the third nonzero codeword). This counting is why a finite field must have prime-power size (↪ S3E01).

## Visual and animation notes
1. **Cold open:** a palette with paint blobs; a "mixing" animation shows green arising from yellow + blue; the green tube fades as "redundant."
2. **Span:** two blue arrows in 3D; all their combinations sweep out a translucent plane. Add a third arrow lying in the plane: nothing new. Tilt it out of the plane: the span inflates to fill space.
3. **Ambiguous recipes:** $(2,3)$ reached by two different paths of tip-to-tail arrows (Section 2), the paths flashing alternately.
4. **Steinitz as musical chairs:** $n$ chairs labeled $w_1, \dots, w_n$; each $u_k$ walks in and evicts one $w$ whose coefficient $b_j$ is nonzero (highlight the nonzero coefficient as the "key" that unlocks the chair). The banner "span unchanged" stays lit throughout. End: if there were more $u$'s than chairs, the last $u$ finds no $w$ to evict, and the contradiction lights up red.
5. **Coordinates as language (basis/camera motif):** a fixed blue arrow $v$; a grid overlay (the basis) morphs from the square grid to the skewed $(1,1),(1,-1)$ grid; the coordinate readout changes from $(3,1)$ to $(2,1)$ while the arrow does not move. Subtitles in two languages ("three, one" / "two, one").
6. **Polynomial in two bases:** the graph of $3x^2 - x + 2$ stays fixed; the coefficient display re-centers from $x = 0$ to $x = 1$, changing to $(4, 5, 3)$.
7. **Infinite dimension:** a tower of monomials $1, x, x^2, \dots$ climbing off screen. Then $\mathbb{R}$ over $\mathbb{Q}$: a countable list of "ingredients" with their rational spans as a dust of points on the real line, and the diagonal motif (↩ S1E12) flashing to show most reals are missed.
8. **Choice:** the sock drawer from S1E15 reappears, captioned "a basis of $\mathbb{R}$ over $\mathbb{Q}$ exists, but nobody can show you one."

## Common misconceptions
- **Misconception:** A basis is unique, and $\mathbb{R}^n$ has "the" basis. **Reality:** every nonzero space over $\mathbb{R}$ has infinitely many bases. The standard basis of $\mathbb{R}^n$ is convenient, but abstract spaces have no standard basis at all.
- **Misconception:** Dimension is "the number of coordinates." **Reality:** it is the number of vectors in any basis. That this equals the coordinate count in *every* basis is the content of the Steinitz lemma, a theorem, not a definition.
- **Misconception:** Vectors that are pairwise non-parallel are independent. **Reality:** $(1,2,3), (4,5,6), (7,8,9)$ are pairwise non-parallel but dependent. Independence is a property of the whole list.
- **Misconception:** An infinite basis means infinite sums are allowed. **Reality:** span uses finite combinations only. $\sum_{k} x^k/k!$ is not in the span of the monomials inside $\mathcal{P}(\mathbb{R})$ (it isn't a polynomial).
- **Misconception:** Dimension depends only on the set. **Reality:** it depends on the field. $\mathbb{C}$ has dimension 1 over $\mathbb{C}$, 2 over $\mathbb{R}$, and uncountable dimension over $\mathbb{Q}$.

## Exercises
- **Warm-up (computational):** (a) Find the coordinates of $(5, 4)$ in the basis $(1,2), (3,1)$ of $\mathbb{R}^2$. (b) Write $x^2$ in the basis $1, (x+1), (x+1)^2$ of $\mathcal{P}_2$.
- **Core (conceptual):** (a) Find the dimension of the space of $2\times 2$ symmetric real matrices, and of the space of polynomials $p \in \mathcal{P}_3$ with $p(1) = 0$. (b) Explain why four vectors in $\mathbb{R}^3$ are always dependent, using Steinitz rather than row reduction.
- **Stretch (proof):** (a) Show that if $U$ and $W$ are subspaces of a finite-dimensional space and $U \subseteq W$ with $\dim U = \dim W$, then $U = W$. (b) How many ordered bases does $\mathbb{F}_2^2$ have? $\mathbb{F}_2^3$? Find the general formula for $\mathbb{F}_q^n$.

<details><summary>Hints and answers</summary>

**Warm-up.** (a) Solve $a + 3b = 5$, $2a + b = 4$: from the second, $b = 4 - 2a$; then $a + 12 - 6a = 5$, so $a = 7/5$, $b = 6/5$. Check: $\tfrac75(1,2) + \tfrac65(3,1) = (\tfrac{7+18}{5}, \tfrac{14+6}{5}) = (5,4)$. (b) With $t = x + 1$: $x^2 = (t-1)^2 = t^2 - 2t + 1$, so $x^2 = 1 - 2(x+1) + (x+1)^2$, coordinates $(1, -2, 1)$.

**Core.** (a) Symmetric matrices $\begin{pmatrix} a & b \\ b & c\end{pmatrix}$ have basis $\begin{pmatrix}1&0\\0&0\end{pmatrix}, \begin{pmatrix}0&1\\1&0\end{pmatrix}, \begin{pmatrix}0&0\\0&1\end{pmatrix}$: dimension 3. Polynomials in $\mathcal{P}_3$ vanishing at 1 are $(x-1)q(x)$ with $q \in \mathcal{P}_2$, with basis $(x-1), x(x-1), x^2(x-1)$: dimension 3. (b) The standard basis is a spanning list of length 3; an independent list has length $\le 3$.

**Stretch.** (a) Extend a basis of $U$ to a basis of $W$ (consequence 3); the extension has $\dim W = \dim U$ vectors, so nothing was added and the basis of $U$ spans $W$. (b) $\mathbb{F}_2^2$: first vector any of $4 - 1 = 3$ nonzero vectors, second any of $4 - 2 = 2$ vectors outside the span of the first: $6$. $\mathbb{F}_2^3$: $(8-1)(8-2)(8-4) = 7 \cdot 6 \cdot 4 = 168$. In general $(q^n - 1)(q^n - q)\cdots(q^n - q^{n-1})$, the order of the group $GL_n(\mathbb{F}_q)$.
</details>

## Historical note
The idea of dimension as "the number of independent directions" is old, but its careful treatment came with abstraction. Grassmann's *Ausdehnungslehre* (1844, revised 1862) already contains the notions of linear combination, independent quantities, and the number of independent directions of an "extensive magnitude." Peano's 1888 axiomatic definition included a definition of dimension as the maximum number of independent elements. The exchange lemma is named after Ernst Steinitz, who stated and used it in his 1913 paper "Bedingt konvergente Reihen und konvexe Systeme" in *Journal für die reine und angewandte Mathematik*; Steinitz is also famous for his 1910 paper founding the abstract theory of fields, where an exchange argument gives a well-defined *transcendence degree*. The basis of $\mathbb{R}$ over $\mathbb{Q}$ is due to Georg Hamel (1905), who used Zermelo's then-brand-new well-ordering theorem (1904) to construct one, and used it to build discontinuous solutions of Cauchy's equation $f(x + y) = f(x) + f(y)$. That Hamel bases require Choice is part of why the Axiom of Choice was so controversial in the early twentieth century.

## Connections
- **Callbacks:** ↩ S2E01 (vector spaces), ↩ S1E11 (bijections as counting), ↩ S1E12 (uncountability via the diagonal), ↩ S1E15 (Axiom of Choice), ↩ S1E19 (finite fields).
- **Sets up:** ↪ S2E03 (rank–nullity uses "extend a basis"; isomorphism classified by dimension), ↪ S2E04 (change of basis, coordinates of maps), ↪ S2E06 (the dual basis, coordinates as measurements), ↪ S2E07 (the Lagrange basis), ↪ S2E08 (the algebraic dual of an infinite-dimensional space is bigger), ↪ S2E20 (Hamel bases are useless; infinite sums need limits), ↪ S2E29 (Fourier bases), ↪ S3E01 (degree of a field extension as a dimension; $|\mathbb{F}_q| = p^n$).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$: codes and puzzles" (attaches after S2E03).

## References
- **Primary / historical**
  - Georg Hamel, "Eine Basis aller Zahlen und die unstetigen Lösungen der Funktionalgleichung: f(x+y) = f(x) + f(y)," *Mathematische Annalen* 60 (1905).
  - Ernst Steinitz, "Bedingt konvergente Reihen und konvexe Systeme," *Journal für die reine und angewandte Mathematik* 143 (1913).
  - Giuseppe Peano, *Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann*, Turin, 1888.
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 2 (2A Span and Linear Independence, 2B Bases, 2C Dimension). Axler's proof of "length of independent list ≤ length of spanning list" is the exchange argument.
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., 1958, Chapter I (linear dependence, bases, dimension).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 2 (§2.3 Bases and Dimension, §2.4 Coordinates).
  - Gilbert Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016, Chapter 3 (vector spaces and subspaces; independence, basis, and dimension); companion course MIT OCW 18.06.
- **Accessible**
  - 3Blue1Brown, *Essence of Linear Algebra*, 2016: "Linear combinations, span, and basis vectors" and "Change of basis."
  - Sergei Treil, *Linear Algebra Done Wrong*, Chapter 1 (§2 Linear combinations, bases) and Chapter 2 (dimension).
