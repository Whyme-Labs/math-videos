# S2E11: Alternating Forms, Exterior Algebra, and the Determinant

> **Season / Act:** Season 2, Part A, Act III (Multilinear Algebra) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E03 (kernels, injectivity), ↩ S2E08 (dual maps), ↩ S2E09 (alternating bilinear forms), ↩ S2E10 (multilinear maps, tensor products, universal properties), ↩ S1E16 (permutations and their sign) ·
> **Builds toward:** ↪ S2E12 (the characteristic polynomial), ↪ S2E16 (the Hodge star needs an inner product), ↪ S2E19 (|det| as the product of singular values), ↪ S3E07 (differential forms), ↪ S3E08 (Stokes' theorem)

## Learning objectives
By the end of this lesson the viewer can:
1. Define alternating multilinear forms and the wedge product, compute in $\Lambda^kV$, and explain why $\dim\Lambda^kV = \binom nk$.
2. Define the determinant of a linear map coordinate-free as the scalar by which it acts on the one-dimensional space $\Lambda^nV$, and derive the Leibniz formula from that definition.
3. Prove $\det(ST) = \det S\cdot\det T$ and "$\det T\neq0\iff T$ invertible" from the definition, and interpret $|\det|$ as volume scaling and the sign as orientation.
4. Explain Cramer's rule as a ratio of volumes, and identify the 3D cross product as the bivector $u\wedge v$ converted to a vector by the Hodge star.

## Cold open
Here is the formula for the determinant of a $3\times 3$ matrix that generations of students have memorized:
$$aei + bfg + cdh - ceg - bdi - afh.$$
Six terms, three plus, three minus, a diagonal mnemonic that only works for $3\times3$. For $4\times4$ you get 24 terms. For $10\times10$, over three million. The textbook gives you "cofactor expansion" to manage the mess, and a list of rules: swapping two rows flips the sign, a repeated row gives zero, and, as if by miracle, $\det(AB) = \det A\cdot\det B$.

Why on earth would that last one be true? Multiply two matrices, a storm of sums and products, then take a formula with millions of terms, and it factors perfectly?

Here's a different question. Take a unit square and push it through a linear map. It becomes a parallelogram. How much area does it have now? Take a unit cube and push it through a 3D map: it becomes a slanted box. What's its volume? And if the map flips the box inside out, like turning a glove, can we record that too, with a minus sign?

That number, "by what factor does this map scale volumes, and does it flip orientation," is the determinant. Today we're going to define it by exactly that sentence. Then we'll watch the scary formula fall out on its own, and the product rule will become so obvious it's almost a joke: scale by 2, then by 3, and you've scaled by 6.

## The story

### 1. What should a "signed volume" do?

Let's not start with a formula. Let's start with a wish list. Suppose $D(v_1,\dots,v_n)$ is the signed volume of the parallelepiped spanned by $n$ vectors in an $n$-dimensional space $V$. What properties must it have?

1. **Multilinear.** Stretch one edge by a factor $c$, and the volume scales by $c$. Shear one edge in the direction of another, and the volume (Cavalieri) doesn't change; more generally, $D(\dots, u + u', \dots) = D(\dots, u,\dots) + D(\dots, u', \dots)$. This is a multilinear map in the sense of ↩ S2E10.
2. **Alternating.** If two edges are equal, the box is flat: $D(\dots, v, \dots, v, \dots) = 0$.

As in ↩ S2E09, alternating implies **skew-symmetric**: swapping two inputs flips the sign. Proof for two slots (the others fixed): $0 = D(u+v, u+v) = D(u,u) + D(u,v) + D(v,u) + D(v,v) = D(u,v) + D(v,u)$. The sign is the *orientation*: $(e_1, e_2)$ is counterclockwise and $(e_2, e_1)$ clockwise.

> **Definition.** A **$k$-form** (alternating $k$-linear form) on $V$ is a $k$-linear map $V\times\dots\times V\to F$ that vanishes whenever two inputs are equal. They form a vector space $\operatorname{Alt}^k(V)$.

$k = 1$: covectors (↩ S2E06). $k = 2$: alternating bilinear forms, like the symplectic form $\omega(u,v) = u_1v_2 - u_2v_1$ of ↩ S2E09, which is signed area. $k = n$: candidates for signed volume.

### 2. The crisis, and the surprise: there is only one volume, up to scale

How many signed volumes are there on an $n$-dimensional space? The amazing answer is: essentially one.

> **Theorem 1.** If $\dim V = n$, then $\dim\operatorname{Alt}^n(V) = 1$. Explicitly, for a basis $e_1,\dots,e_n$ and $v_j = \sum_ia_{ij}e_i$,
> $$D(v_1,\dots,v_n) = \Big(\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)\,a_{\sigma(1)1}a_{\sigma(2)2}\cdots a_{\sigma(n)n}\Big)\,D(e_1,\dots,e_n)$$
> for every $D\in\operatorname{Alt}^n(V)$, and there is a nonzero $D$ with $D(e_1,\dots,e_n) = 1$.

*Proof (uniqueness).* Expand by multilinearity in each slot:
$$D(v_1,\dots,v_n) = \sum_{i_1,\dots,i_n}a_{i_11}a_{i_22}\cdots a_{i_nn}\,D(e_{i_1},\dots,e_{i_n}).$$
There are $n^n$ terms, but any term where two indices coincide has a repeated input, so it vanishes. The surviving index tuples are exactly the permutations $\sigma$ of $\{1,\dots,n\}$ (with $i_j = \sigma(j)$). For each one, sort the inputs back into the order $e_1,\dots,e_n$ by swaps; each swap flips the sign, and the parity of the number of swaps is the sign of the permutation (↩ S1E16). So $D(e_{\sigma(1)},\dots,e_{\sigma(n)}) = \operatorname{sgn}(\sigma)D(e_1,\dots,e_n)$, which gives the formula. So $D$ is determined by the single number $D(e_1,\dots,e_n)$, and $\dim\operatorname{Alt}^n(V)\le1$.

*(Existence, sketch.)* Define $D$ by the formula with $D(e_1,\dots,e_n) = 1$. Each term is multilinear, so $D$ is. If $v_k = v_l$ with $k\neq l$, pair each permutation $\sigma$ with $\sigma\circ(k\ l)$: the two terms have equal products and opposite signs, so they cancel. $\blacksquare$

The Leibniz formula was never a definition to memorize. It is *forced* by two wishes: linear in each edge, zero for flat boxes. Everything about it, including the alternating signs and the $n!$ terms, is the bookkeeping of those two wishes.

### 3. The exterior algebra: oriented area and volume elements

Theorem 1 talks about forms (measurements). There is a dual object made of "oriented pieces of space" that the forms measure. It comes from the tensor product machinery of ↩ S2E10.

> **Definition (exterior power).** $\Lambda^kV$ is a vector space with an alternating $k$-linear map $(v_1,\dots,v_k)\mapsto v_1\wedge\dots\wedge v_k$ that is **universal**: every alternating $k$-linear map $V^k\to U$ factors uniquely through a linear map $\Lambda^kV\to U$. Concretely, $\Lambda^kV = V^{\otimes k}/\langle\text{tensors with a repeated factor } \cdots\otimes v\otimes\cdots\otimes v\otimes\cdots\rangle$.

As with $\otimes$, the universal property makes it unique up to unique isomorphism. Rules of computation:
- $v\wedge v = 0$, hence $v\wedge w = -\,w\wedge v$.
- $\wedge$ is linear in each factor.
- If $e_1,\dots,e_n$ is a basis of $V$, then $\{e_{i_1}\wedge\dots\wedge e_{i_k} : i_1<\dots<i_k\}$ is a basis of $\Lambda^kV$, so
$$\dim\Lambda^kV = \binom nk.$$
(Spanning: expand and reorder, as in Theorem 1. Independence: for each increasing index set there is an alternating form, a $k\times k$ minor, that is $1$ on that basis element and $0$ on the others.)

**Picture.** $v\wedge w$ is an **oriented area element**: the parallelogram spanned by $v$ and $w$, remembered only up to its plane, its area, and its orientation. Shearing $w$ along $v$ doesn't change it ($v\wedge(w + cv) = v\wedge w$), and reversing the order reverses the orientation. Similarly $u\wedge v\wedge w$ is an oriented volume element. The direct sum $\Lambda V = \bigoplus_k\Lambda^kV$ with the product $\wedge$ is the **exterior algebra** (Grassmann algebra); its dimension is $\sum_k\binom nk = 2^n$.

Not every element of $\Lambda^2V$ is a single parallelogram $v\wedge w$; as with tensors (↩ S2E10), most are sums (Worked Example 5).

The key case is the top one: $k = n$. Then $\binom nn = 1$, so **$\Lambda^nV$ is one-dimensional**, spanned by $e_1\wedge\dots\wedge e_n$. Every oriented $n$-volume in $V$ is a multiple of a single one. (And $\operatorname{Alt}^n(V)\cong(\Lambda^nV)^*$ by the universal property, which is Theorem 1 again.)

### 4. The determinant, defined

A linear map $T: V\to V$ moves parallelepipeds to parallelepipeds. So it acts on $\Lambda^nV$:
$$\Lambda^nT:\ v_1\wedge\dots\wedge v_n\ \longmapsto\ Tv_1\wedge\dots\wedge Tv_n.$$
(Well-defined by the universal property: $(v_1,\dots,v_n)\mapsto Tv_1\wedge\dots\wedge Tv_n$ is alternating and $n$-linear.) A linear map from a one-dimensional space to itself is multiplication by a single scalar.

> **Definition.** The **determinant** of $T: V\to V$ is the unique scalar $\det T$ with
> $$Tv_1\wedge\dots\wedge Tv_n = (\det T)\,v_1\wedge\dots\wedge v_n\quad\text{for all } v_1,\dots,v_n\in V.$$

No basis appears. Taking $v_j = e_j$ and using Theorem 1 with $Te_j = \sum_ia_{ij}e_i$ recovers the Leibniz formula $\det T = \sum_\sigma\operatorname{sgn}(\sigma)\prod_ja_{\sigma(j)j}$. So the matrix formula computes the map's determinant, and in particular **similar matrices have the same determinant**, since they are the same map in two bases.

Equivalently, in terms of forms: for any nonzero $D\in\operatorname{Alt}^n(V)$, $D(Tv_1,\dots,Tv_n) = \det T\cdot D(v_1,\dots,v_n)$. The pullback $D\mapsto D\circ(T\times\dots\times T)$ is the dual map of $\Lambda^nT$ (↩ S2E08), so it is multiplication by the same scalar.

### 5. The payoff: properties that used to be miracles

> **Theorem 2 (product rule).** $\det(ST) = \det S\cdot\det T$.

*Proof.* For any $v_1,\dots,v_n$:
$$STv_1\wedge\dots\wedge STv_n = (\det S)\,Tv_1\wedge\dots\wedge Tv_n = (\det S)(\det T)\,v_1\wedge\dots\wedge v_n.$$
The first step applies the definition to $S$ with inputs $Tv_j$; the second applies it to $T$. By definition the left side is $\det(ST)\,v_1\wedge\dots\wedge v_n$. Choosing a basis, $v_1\wedge\dots\wedge v_n\neq0$, so $\det(ST) = \det S\det T$. $\blacksquare$

Scale by $\det T$, then by $\det S$. That's the whole proof. In matrix language it's a page of index gymnastics; here it's one line, because we're working with the object instead of its coordinates.

> **Theorem 3.** $T$ is invertible if and only if $\det T\neq0$.

*Proof.* If $T$ is invertible, $\det T\cdot\det T^{-1} = \det(TT^{-1}) = \det I = 1$, so $\det T\ne0$. If $T$ is not invertible, it is not injective (↩ S2E03, finite dimensions), so pick $v_1\ne0$ with $Tv_1 = 0$ and extend to a basis $v_1,\dots,v_n$. Then $Tv_1\wedge\dots\wedge Tv_n = 0\wedge\dots = 0$, while $v_1\wedge\dots\wedge v_n\ne0$, so $\det T = 0$. $\blacksquare$

$\det = 0$ means **the map crushes a dimension**: every box is flattened to zero volume.

More consequences, each a line:
- **Transpose:** $\det T^* = \det T$, because $\Lambda^n(T^*)$ is the dual of $\Lambda^nT$ on a 1-dimensional space, and the dual of "multiply by $c$" is "multiply by $c$." Hence $\det A^{\mathsf T} = \det A$, and every rule about columns holds for rows.
- **Volume:** in $\mathbb R^n$, take $D$ = the standard signed volume (the unique $n$-form with $D(e_1,\dots,e_n) = 1$). Then the parallelepiped spanned by $Te_1,\dots,Te_n$, the columns of $A$, has signed volume $\det A$. And every region's volume scales by $|\det A|$ (approximate the region by small cubes).
- **Orientation:** $\det T > 0$ means $T$ preserves orientation (a right hand stays a right hand); $\det T < 0$ means it turns the box inside out, like a mirror.

### 6. Cramer's rule and the cross product, unmasked

**Cramer's rule as a ratio of volumes.** Solve $Ax = b$ with $A$ invertible, columns $a_1,\dots,a_n$. Then $b = x_1a_1 + \dots + x_na_n$. Replace column $k$ of $A$ by $b$ and wedge:
$$a_1\wedge\dots\wedge\underbrace{b}_{k}\wedge\dots\wedge a_n = \sum_jx_j\,a_1\wedge\dots\wedge\underbrace{a_j}_{k}\wedge\dots\wedge a_n = x_k\,a_1\wedge\dots\wedge a_n,$$
since every term with $j\ne k$ repeats $a_j$ and vanishes. Comparing coefficients of $e_1\wedge\dots\wedge e_n$:
$$x_k = \frac{\det A_k}{\det A},\qquad A_k = A\text{ with column }k\text{ replaced by }b.$$
Geometrically: $x_k$ is the ratio of the volume of the box with edge $a_k$ swapped for $b$ to the volume of the original box. (Cramer's rule is a beautiful *explanation* and a terrible *algorithm*: elimination is far faster for large $n$.)

**The cross product is a bivector in disguise.** In $\mathbb R^3$, $\Lambda^2\mathbb R^3$ has dimension $\binom32 = 3$, with basis $e_2\wedge e_3$, $e_3\wedge e_1$, $e_1\wedge e_2$. Expanding,
$$u\wedge v = (u_2v_3 - u_3v_2)\,e_2\wedge e_3 + (u_3v_1 - u_1v_3)\,e_3\wedge e_1 + (u_1v_2 - u_2v_1)\,e_1\wedge e_2.$$
The three coefficients are exactly the components of $u\times v$. The cross product is $u\wedge v$ followed by the **Hodge star** $\star: \Lambda^2\mathbb R^3\to\mathbb R^3$, $e_2\wedge e_3\mapsto e_1$, $e_3\wedge e_1\mapsto e_2$, $e_1\wedge e_2\mapsto e_3$, which sends an oriented area element to the vector perpendicular to its plane, with length equal to its area, pointing by the right-hand rule. The star needs two extra choices: an inner product (to say "perpendicular" and "length," ↪ S2E14, S2E16) and an orientation (to choose between the two perpendicular directions). That's why the cross product flips sign in a mirror (it's a "pseudovector"), and why it exists only in 3D: $\dim\Lambda^2\mathbb R^n = n(n-1)/2$ equals $n$ only when $n = 3$. In 4D, $u\wedge v$ lives in a 6-dimensional space, and there is no single perpendicular direction to point to. The wedge product works in every dimension; the cross product is its 3D shadow.

**Seed for Season 3.** Put an alternating form on every tangent space of a curved space, varying smoothly, and you get a **differential form** (↪ S3E07). The "$dx\,dy$" in a double integral is really $dx\wedge dy$, and the change-of-variables formula's Jacobian determinant is just $\Lambda^n$ of the derivative.

## Worked examples

### Example 1: The $2\times2$ formula, forced
Let $T$ have matrix $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, so $Te_1 = ae_1 + ce_2$ and $Te_2 = be_1 + de_2$. Then
$$Te_1\wedge Te_2 = (ae_1 + ce_2)\wedge(be_1 + de_2) = ab\,e_1\wedge e_1 + ad\,e_1\wedge e_2 + cb\,e_2\wedge e_1 + cd\,e_2\wedge e_2.$$
Use $e_i\wedge e_i = 0$ and $e_2\wedge e_1 = -e_1\wedge e_2$:
$$Te_1\wedge Te_2 = (ad - bc)\,e_1\wedge e_2,\qquad\det T = ad - bc.$$
**Numbers.** Columns $(3,1)$ and $(1,2)$: $\det = 3\cdot2 - 1\cdot1 = 5$, so the parallelogram with these edges has area 5, counterclockwise orientation. Swap the columns: $1\cdot1 - 3\cdot2 = -5$, same area, opposite orientation.

### Example 2: A $3\times3$ determinant via the wedge expansion, and a flat box
Let $A = \begin{pmatrix}2&0&1\\1&3&2\\1&1&2\end{pmatrix}$ (columns $a_1 = (2,1,1)$, $a_2 = (0,3,1)$, $a_3 = (1,2,2)$). Leibniz: the six permutations, writing $a_{\sigma(1)1}a_{\sigma(2)2}a_{\sigma(3)3}$:

| $\sigma$ (as $\sigma(1)\sigma(2)\sigma(3)$) | sign | product | contribution |
|---|---|---|---|
| 123 | $+$ | $a_{11}a_{22}a_{33} = 2\cdot3\cdot2 = 12$ | $+12$ |
| 132 | $-$ | $a_{11}a_{32}a_{23} = 2\cdot1\cdot2 = 4$ | $-4$ |
| 213 | $-$ | $a_{21}a_{12}a_{33} = 1\cdot0\cdot2 = 0$ | $0$ |
| 231 | $+$ | $a_{21}a_{32}a_{13} = 1\cdot1\cdot1 = 1$ | $+1$ |
| 312 | $+$ | $a_{31}a_{12}a_{23} = 1\cdot0\cdot2 = 0$ | $0$ |
| 321 | $-$ | $a_{31}a_{22}a_{13} = 1\cdot3\cdot1 = 3$ | $-3$ |

Total: $12 - 4 + 0 + 1 + 0 - 3 = 6$. Cross-check by expansion along the first row: $2(3\cdot2 - 2\cdot1) - 0 + 1(1\cdot1 - 3\cdot1) = 2\cdot4 - 2 = 6$. ✓ So $A$ maps the unit cube to a slanted box of volume 6, preserving orientation.

**Now change one entry:** $A' = \begin{pmatrix}2&0&1\\1&3&2\\1&1&1\end{pmatrix}$. First-row expansion: $2(3 - 2) - 0 + 1(1 - 3) = 2 - 2 = 0$. The box is flat. Indeed, the third column is the average of the first two: $\tfrac12\big((2,1,1) + (0,3,1)\big) = (1,2,1)$. So $a'_3 = \tfrac12a_1 + \tfrac12a_2$, and $a_1\wedge a_2\wedge a'_3 = \tfrac12a_1\wedge a_2\wedge a_1 + \tfrac12a_1\wedge a_2\wedge a_2 = 0$. The map crushes the direction $(1,1,-2)$: $A'(1,1,-2) = (2 + 0 - 2,\ 1 + 3 - 4,\ 1 + 1 - 2) = (0,0,0)$. ✓

### Example 3: Cramer's rule as a ratio of areas
Solve $2x + y = 5$, $x + 3y = 10$. Columns $a_1 = (2,1)$, $a_2 = (1,3)$, $b = (5,10)$.
- $\det A = 2\cdot3 - 1\cdot1 = 5$.
- $x = \dfrac{\det(b, a_2)}{\det A} = \dfrac{5\cdot3 - 1\cdot10}{5} = \dfrac{5}{5} = 1.$
- $y = \dfrac{\det(a_1, b)}{\det A} = \dfrac{2\cdot10 - 5\cdot1}{5} = \dfrac{15}{5} = 3.$
- Check: $2(1) + 3 = 5$ ✓ and $1 + 3(3) = 10$ ✓.

Geometrically: the parallelogram on $(b, a_2)$ has area 5, the same as the one on $(a_1, a_2)$, because $b = 1\cdot a_1 + 3a_2$ and the $3a_2$ part shears along $a_2$ without changing area. So $x = 5/5 = 1$.

### Example 4: The cross product from the wedge
$u = (1,2,3)$, $v = (4,5,6)$. Coefficients of $u\wedge v$:
- $e_2\wedge e_3$: $u_2v_3 - u_3v_2 = 2\cdot6 - 3\cdot5 = 12 - 15 = -3$;
- $e_3\wedge e_1$: $u_3v_1 - u_1v_3 = 3\cdot4 - 1\cdot6 = 12 - 6 = 6$;
- $e_1\wedge e_2$: $u_1v_2 - u_2v_1 = 1\cdot5 - 2\cdot4 = 5 - 8 = -3$.

Applying $\star$: $u\times v = (-3, 6, -3)$, matching the usual formula. Check perpendicularity: $(1,2,3)\cdot(-3,6,-3) = -3 + 12 - 9 = 0$ and $(4,5,6)\cdot(-3,6,-3) = -12 + 30 - 18 = 0$. ✓ Area of the parallelogram: $|u\times v| = \sqrt{9 + 36 + 9} = \sqrt{54} = 3\sqrt6$.

### Example 5: A bivector that is not a parallelogram
In $\mathbb R^4$, $\dim\Lambda^2 = \binom42 = 6$. Is $\omega = e_1\wedge e_2 + e_3\wedge e_4$ equal to a single $u\wedge v$? If it were, then $\omega\wedge\omega = u\wedge v\wedge u\wedge v = 0$ (a repeated factor). But
$$\omega\wedge\omega = e_1\wedge e_2\wedge e_3\wedge e_4 + e_3\wedge e_4\wedge e_1\wedge e_2 = 2\,e_1\wedge e_2\wedge e_3\wedge e_4\ne0,$$
using $e_3\wedge e_4\wedge e_1\wedge e_2 = e_1\wedge e_2\wedge e_3\wedge e_4$ (moving $e_1$ then $e_2$ past two factors each: four swaps, sign $+$), and the cross terms $e_1\wedge e_2\wedge e_1\wedge e_2 = 0$, $e_3\wedge e_4\wedge e_3\wedge e_4 = 0$. So $\omega$ is a sum of two parallelograms in "completely different" planes and can't be combined into one. (This $\omega$ is the symplectic form of ↩ S2E09 in two degrees of freedom.) In $\mathbb R^3$ this never happens: every bivector is a single $u\wedge v$, which is why the cross product can represent all of them.

## Visual and animation notes
1. **Cold open.** The $3\times3$ formula's six terms fly onto the screen as the "rule of Sarrus" diagonals, then multiply into a $4\times4$ (24 terms) and a $10\times10$ (a waterfall of 3,628,800 terms) that buries the screen.
2. **Wish list.** A unit square (and later a cube) with edges as blue arrows (motif: *Vectors*); one edge stretches and an area counter scales; one edge shears and the counter doesn't move; two edges merge and the counter hits 0.
3. **Only one volume.** A dial labeled "$D(e_1,\dots,e_n)$" is the only knob; turning it rescales every volume reading on screen simultaneously. Caption: $\dim\operatorname{Alt}^n = 1$.
4. **Wedge as oriented area.** $v\wedge w$ drawn as a translucent parallelogram with a circular orientation arrow; sliding $w$ along $v$ changes the shape but not the area or orientation; swapping $v, w$ reverses the arrow.
5. **The determinant.** The key visual from the storyline: a unit cube deforms under a linear map (motif: *Linear map*, gridlines straight and parallel) into a parallelepiped, a volume counter ticks to $\det A$; a second map flips the cube inside out (the faces' colors invert) and the counter goes negative. A badge reading "$\det$" stays fixed while a camera overlay changes the matrix entries underneath (motif: *Invariants*).
6. **Product rule.** Two scalings in sequence: the cube grows by $\det T$, then by $\det S$; the counters multiply.
7. **Crushing.** For $A'$ of Example 2 the cube flattens into a plane; the crushed direction $(1,1,-2)$ glows (callback to the S2E03 "crushed line" visual).
8. **Cramer.** Parallelogram on $(a_1,a_2)$ and parallelogram on $(b, a_2)$; the second shears into the first, area unchanged.
9. **Cross product.** A bivector parallelogram in 3D; the Hodge star raises a perpendicular arrow of length equal to its area. Then a mirror reflects the scene: the parallelogram's orientation arrow reverses, and the cross-product arrow flips.
10. **S3 teaser.** A curved surface covered by tiny oriented parallelograms (motif: *Differential forms*).
11. **Callback stamps:** ↩ S1E16 at the permutation sign, ↩ S2E10 at the universal property, ↩ S2E09 at Example 5.

## Common misconceptions
- **Misconception:** The determinant is defined by the cofactor (or Leibniz) formula. **Reality:** The formula is a *consequence* of "multilinear, alternating, $\det I = 1$." The determinant is a property of the map; the formula just computes it in a basis.
- **Misconception:** $\det(A + B) = \det A + \det B$. **Reality:** $\det$ is multilinear in the *columns*, not linear in the matrix. Already $\det(2I) = 2^n$, not $2$.
- **Misconception:** A negative determinant means negative volume. **Reality:** Volume is $|\det|$; the sign records orientation (a reflection).
- **Misconception:** The cross product is a vector like any other and generalizes to $\mathbb R^n$. **Reality:** It is a bivector converted to a vector using an inner product and an orientation, a trick that only works because $\binom32 = 3$. The wedge product is the version that generalizes.
- **Misconception:** Every element of $\Lambda^2V$ is some $u\wedge v$. **Reality:** True in dimension $\le3$, false from dimension 4 on (Example 5).

## Exercises
- **Warm-up (computational).** Compute $\det\begin{pmatrix}1&2&0\\0&1&3\\2&0&1\end{pmatrix}$ by the Leibniz formula, and use Cramer's rule to solve the system with this coefficient matrix and right-hand side $(3,4,3)$.
- **Core (conceptual).** Show from the definition that $\det(cT) = c^n\det T$, that $\det T^{-1} = 1/\det T$, and that the determinant of an upper triangular matrix is the product of its diagonal entries. (Hint for the last: use the flag $e_1$, $e_1\wedge e_2$, ….)
- **Stretch (proof).** Show that a linear map $T$ induces $\Lambda^kT$ on each $\Lambda^kV$, that the matrix entries of $\Lambda^kT$ in the basis $e_I = e_{i_1}\wedge\dots\wedge e_{i_k}$ are the $k\times k$ minors of $A$, and deduce the Cauchy–Binet formula for $\det(AB)$ where $A$ is $k\times n$ and $B$ is $n\times k$.

<details><summary>Hints and answers</summary>

- **Warm-up.** First-row expansion: $1(1\cdot1 - 3\cdot0) - 2(0\cdot1 - 3\cdot2) + 0 = 1 + 12 = 13$. Cramer: $x = \det\begin{pmatrix}3&2&0\\4&1&3\\3&0&1\end{pmatrix}/13 = (3(1) - 2(4 - 9))/13 = 13/13 = 1$; $y = \det\begin{pmatrix}1&3&0\\0&4&3\\2&3&1\end{pmatrix}/13 = (1(4 - 9) - 3(0 - 6))/13 = 13/13 = 1$; $z = \det\begin{pmatrix}1&2&3\\0&1&4\\2&0&3\end{pmatrix}/13 = (1(3) - 2(0 - 8) + 3(0 - 2))/13 = 13/13 = 1$. Check: $(1 + 2,\ 1 + 3,\ 2 + 1) = (3,4,3)$. ✓
- **Core.** $cTv_1\wedge\dots\wedge cTv_n = c^n\,Tv_1\wedge\dots$. Product rule with $TT^{-1} = I$. For triangular $A$, $Te_j = a_{jj}e_j + (\text{earlier } e_i)$; wedge in order and every "earlier" term repeats a factor.
- **Stretch.** $(\Lambda^kT)(e_J) = \sum_I\det(A_{I,J})\,e_I$, where $A_{I,J}$ is the submatrix with rows $I$ and columns $J$. For $\Lambda^k$ of a composite, apply functoriality: $\Lambda^k(ST) = \Lambda^kS\circ\Lambda^kT$, and read off the $(\{1..k\},\{1..k\})$ entry.

</details>

## Historical note
Determinants are older than matrices. Seki Takakazu in Japan (1683) and Gottfried Wilhelm Leibniz in Germany (in a 1693 letter to L'Hôpital) independently used determinant-like expressions to decide when systems of linear equations have solutions. Gabriel Cramer published his rule in 1750, in a book on algebraic curves. In 1812 Augustin-Louis Cauchy, and independently Jacques Binet, proved the product theorem, and Cauchy gave the theory much of its modern form, including the name "determinant" in its current sense. The geometric meaning had to wait for Hermann Grassmann, a Stettin schoolteacher whose *Die lineale Ausdehnungslehre* (1844) introduced the exterior product, vector spaces of any dimension, and much of linear algebra, in a style so unfamiliar that the book was almost entirely ignored; Grassmann later turned to Sanskrit studies and won recognition for his work on the Rigveda. Élie Cartan revived Grassmann's algebra around 1899 as the calculus of differential forms (↪ S3E07). The cross product came separately, from Josiah Willard Gibbs and Oliver Heaviside's vector analysis of the 1880s, which extracted it from Hamilton's quaternions.

## Connections
- **Callbacks:** ↩ S1E16 (permutations and the sign homomorphism), ↩ S2E03 (non-injective maps crush a direction), ↩ S2E08 ($\det T^* = \det T$ via the dual map), ↩ S2E09 (alternating bilinear forms, symplectic form), ↩ S2E10 (universal properties, $V^{\otimes k}$ and quotients)
- **Sets up:** ↪ S2E12 (characteristic polynomial $\det(T - \lambda I)$, coordinate-free), ↪ S2E14 and ↪ S2E16 (the Hodge star needs an inner product), ↪ S2E19 ($|\det A|$ = product of singular values), ↪ S3E01 (field norm as a determinant), ↪ S3E07 (differential forms), ↪ S3E08 (Stokes' theorem)
- **Side quests:** Geometric algebra (attaches after S2E11: Clifford algebras combine dot and wedge); Symplectic geometry (attaches after S3E08)

## References
- **Primary / historical:** Hermann Grassmann, *Die lineale Ausdehnungslehre, ein neuer Zweig der Mathematik* (1844); English translation of the 1844 and 1862 works by Lloyd C. Kannenberg, *A New Branch of Mathematics* (Open Court, 1995) and *Extension Theory* (AMS, 2000).
- **Primary / historical:** Gabriel Cramer, *Introduction à l'analyse des lignes courbes algébriques* (1750), appendix (Cramer's rule).
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Sections 9B "Alternating Multilinear Forms" and 9C "Determinants" (the determinant defined via the one-dimensional space of alternating $n$-forms).
- **Textbook:** Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall (1971), Chapter 5 "Determinants" (including multilinear functions and the Grassmann ring).
- **Textbook:** David S. Dummit and Richard M. Foote, *Abstract Algebra*, 3rd ed., Wiley (2004), Section 11.4 "Determinants" and Section 11.5 "Tensor Algebras. Symmetric and Exterior Algebras."
- **Textbook:** Michael Spivak, *Calculus on Manifolds*, W. A. Benjamin (1965), Chapter 4 (multilinear algebra, alternating tensors, determinants, and forms).
- **Accessible:** 3Blue1Brown (Grant Sanderson), *Essence of Linear Algebra* (2016), chapter 6 "The determinant," chapters 10–11 on cross products, and "Cramer's rule, explained geometrically" (2019).
- **Accessible:** Gilbert Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press (2016), Chapter 5 "Determinants"; MIT OpenCourseWare 18.06 (Spring 2010) lectures on determinants and Cramer's rule.
