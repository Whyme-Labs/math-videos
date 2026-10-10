# S2E03: Linear Maps Are the Real Characters

> **Season / Act:** Season 2, Part A, Act I: What Is Linear? · **Target runtime:** 18–25 min ·
> **Prerequisites:** S2E01–02 (vector spaces, bases, dimension); S1E17 (homomorphisms, kernels, the First Isomorphism Theorem) ·
> **Builds toward:** S2E04 (matrices), S2E05 (quotients, $V/\ker T \cong \operatorname{im} T$), S2E06 (functionals), S2E12 (eigenvectors), S2E20 (the shift on sequences)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a linear map, recognize linear and non-linear processes, and verify linearity for rotation, projection, differentiation, shifts, and evaluation.
2. Prove that a linear map is completely determined by its values on a basis, and that any choice of values on a basis extends to a unique linear map.
3. Compute the kernel and image of a linear map, and prove that injectivity is equivalent to a trivial kernel.
4. State and prove the rank–nullity theorem, and use it to show that a linear map from a finite-dimensional space to itself is injective if and only if it is surjective.
5. Explain why two finite-dimensional spaces over the same field are isomorphic exactly when they have the same dimension.

## Cold open
"Five machines. Watch what they do.

"Machine one rotates every arrow in the plane by 90 degrees. Machine two takes every point in space and drops it straight down onto the floor, its shadow at noon. Machine three takes a polynomial and differentiates it. Machine four takes an infinite sequence of numbers and shoves everything one slot to the right, putting a zero in front. Machine five takes a polynomial and tells you its value at 2.

"Geometry. Calculus. A conveyor belt. A calculator. What could they possibly share?

"Here's a test. Feed machine three the sum of two polynomials: the derivative of a sum is the sum of the derivatives. Feed it three times a polynomial: you get three times the derivative. Try the same test on the rotation: rotating a sum of arrows is the sum of the rotated arrows. On the shadow: same. On the shift: same. On 'value at 2': same.

"All five machines *respect adding and scaling*. And here's the claim of this episode: that one property is so strong that once you know what such a machine does to a handful of vectors, a basis, you know everything it will ever do. Last episode, vectors were the stars. From now on, the stars are the machines."

## The story

### 1. The definition, and the test

> **Definition (linear map).** Let $V$ and $W$ be vector spaces over the same field $F$. A function $T : V \to W$ is **linear** if for all $u, v \in V$ and $c \in F$:
> $$T(u + v) = T(u) + T(v), \qquad T(c\,v) = c\,T(v).$$
> Equivalently, $T(a u + b v) = a\,T(u) + b\,T(v)$ for all $a, b \in F$. The set of linear maps $V \to W$ is written $\mathcal{L}(V, W)$ or $\operatorname{Hom}(V, W)$. A linear map $V \to V$ is called an **operator** on $V$.

Immediate consequences: $T(0) = T(0 \cdot 0) = 0 \cdot T(0) = 0$, and $T(-v) = -T(v)$. In Season 1 language, a linear map is a **group homomorphism** $(V, +) \to (W, +)$ that also commutes with scaling (↩ S1E17).

**The cold-open machines are all linear.**
- *Rotation* $R_\theta$ of $\mathbb{R}^2$: rotating a parallelogram gives a parallelogram, so $R_\theta(u + v) = R_\theta u + R_\theta v$; rotating a stretched arrow is stretching the rotated arrow.
- *Projection* $P(x, y, z) = (x, y, 0)$: $P$ acts coordinatewise, so linearity is immediate.
- *Differentiation* $D : \mathcal{P}(\mathbb{R}) \to \mathcal{P}(\mathbb{R})$: $(p + q)' = p' + q'$ and $(cp)' = c\,p'$ are the sum and constant-multiple rules from calculus. Those two rules *are* the statement that $D$ is linear.
- *Right shift* $S(a_1, a_2, a_3, \dots) = (0, a_1, a_2, \dots)$ on sequences: shifting a sum is summing the shifts.
- *Evaluation* $\operatorname{ev}_2(p) = p(2)$, a map $\mathcal{P}(\mathbb{R}) \to \mathbb{R}$: $(p+q)(2) = p(2) + q(2)$ and $(cp)(2) = c\,p(2)$.

**Non-examples.** $f(x) = x + 1$ on $\mathbb{R}$ fails ($f(0) = 1 \ne 0$): it's *affine*, a linear map followed by a translation. $f(x) = x^2$ fails ($f(1 + 1) = 4 \ne f(1) + f(1) = 2$). The map $\mathbb{C} \to \mathbb{C}$, $z \mapsto \bar z$, is linear over $\mathbb{R}$ but not over $\mathbb{C}$: $\overline{i \cdot 1} = -i \ne i \cdot \bar 1 = i$. Linearity depends on the field (↩ S1E10).

**Geometric picture.** In the plane or in space, a map is linear exactly when it keeps the origin fixed and sends the grid of a coordinate system to a grid whose lines stay straight, parallel, and evenly spaced. That's the visual motif of the season.

### 2. A linear map is determined by a basis

The naive way to describe a function $V \to W$ is to list its value at every input: infinitely much information. For a linear map, far less is needed.

> **Theorem (linear extension).** Let $b_1, \dots, b_n$ be a basis of $V$ and let $w_1, \dots, w_n$ be *any* vectors in $W$. There is exactly one linear map $T : V \to W$ with $T(b_j) = w_j$ for all $j$.

*Proof.* *Uniqueness:* each $v \in V$ is $v = c_1 b_1 + \dots + c_n b_n$, and linearity forces
$$T(v) = c_1 T(b_1) + \dots + c_n T(b_n) = c_1 w_1 + \dots + c_n w_n.$$
*Existence:* define $T$ by that formula. It is well defined because the coordinates $c_j$ are unique. It is linear because coordinates add and scale: if $u = \sum a_j b_j$ and $v = \sum c_j b_j$, then $u + v = \sum (a_j + c_j) b_j$ and $T(u + v) = \sum (a_j + c_j) w_j = T(u) + T(v)$; scaling is similar. And $T(b_j) = w_j$ since $b_j$ has coordinates $(0, \dots, 1, \dots, 0)$. $\blacksquare$

So a linear map from an $n$-dimensional space is an *arbitrary* list of $n$ output vectors, nothing more and nothing less. Two important features: the outputs $w_j$ need *not* be independent or distinct, and the theorem works equally well for infinite bases (with finite linear combinations). This theorem is the seed of matrices: record the coordinates of $w_1, \dots, w_n$ and you have a grid of numbers (↪ S2E04).

### 3. What gets crushed and what can be reached

> **Definition (kernel and image).** For linear $T : V \to W$:
> - the **kernel** (null space) is $\ker T = \lbrace v \in V : T(v) = 0\rbrace$;
> - the **image** (range) is $\operatorname{im} T = \lbrace T(v) : v \in V\rbrace$.
>
> Both are subspaces (of $V$ and $W$ respectively). Their dimensions are the **nullity** and the **rank** of $T$.

*Subspace check for the kernel:* $T(0) = 0$; if $T(u) = T(v) = 0$ then $T(u + v) = 0 + 0 = 0$; and $T(cv) = c\cdot 0 = 0$. For the image: $0 = T(0)$; $T(u) + T(v) = T(u+v)$; $c\,T(v) = T(cv)$.

The kernel measures how much information $T$ destroys. The image measures how much of $W$ it reaches.

> **Proposition.** $T$ is injective if and only if $\ker T = \lbrace 0\rbrace$.

*Proof.* If $T$ is injective and $T(v) = 0 = T(0)$, then $v = 0$. Conversely, if $\ker T = \lbrace 0\rbrace$ and $T(u) = T(v)$, then $T(u - v) = T(u) - T(v) = 0$, so $u - v \in \ker T$, so $u = v$. $\blacksquare$

This is a superpower of linearity: to check that *no two* inputs collide, it suffices to check that *nothing nonzero* collides with $0$. More precisely, $T(u) = T(v)$ exactly when $u - v \in \ker T$: the preimage of any reachable point is a translate $v + \ker T$ of the kernel. Each "fiber" of $T$ is a parallel copy of $\ker T$. (We'll turn the set of fibers into a vector space in ↪ S2E05.)

### 4. The payoff: rank–nullity, conservation of dimension

When $T$ squashes 3D space onto a plane, one dimension is crushed (a line goes to $0$) and two survive (the image is a plane). $3 = 1 + 2$. That is no coincidence.

> **Rank–nullity theorem.** If $V$ is finite-dimensional and $T : V \to W$ is linear, then $\operatorname{im} T$ is finite-dimensional and
> $$\dim V = \dim \ker T + \dim \operatorname{im} T.$$

*Proof.* $\ker T$ is a subspace of the finite-dimensional space $V$, so it has a basis $u_1, \dots, u_k$ (with $k = \dim\ker T$). By the Steinitz extension property (↩ S2E02), extend it to a basis $u_1, \dots, u_k, v_1, \dots, v_r$ of $V$, so $\dim V = k + r$. We claim that $T(v_1), \dots, T(v_r)$ is a basis of $\operatorname{im} T$; then $\dim \operatorname{im} T = r$ and we're done.

*Spanning.* Any element of $\operatorname{im} T$ is $T(v)$ for some $v = a_1 u_1 + \dots + a_k u_k + c_1 v_1 + \dots + c_r v_r$. Since $T(u_i) = 0$,
$$T(v) = c_1 T(v_1) + \dots + c_r T(v_r).$$
*Independence.* Suppose $c_1 T(v_1) + \dots + c_r T(v_r) = 0$. Then $T(c_1 v_1 + \dots + c_r v_r) = 0$, so $c_1 v_1 + \dots + c_r v_r \in \ker T$, so it equals $a_1 u_1 + \dots + a_k u_k$ for some scalars $a_i$. Then
$$a_1 u_1 + \dots + a_k u_k - c_1 v_1 - \dots - c_r v_r = 0,$$
and since $u_1, \dots, v_r$ is a basis of $V$, all coefficients vanish; in particular every $c_j = 0$. $\blacksquare$

Read it as a **conservation law**: every input dimension is either crushed (counted in the kernel) or survives (counted in the image). None is created and none disappears without a trace.

**Callback: the First Isomorphism Theorem (↩ S1E17).** For a group homomorphism $\varphi : G \to H$, $G/\ker\varphi \cong \operatorname{im}\varphi$, and for finite groups this gives $|G| = |\ker\varphi|\cdot|\operatorname{im}\varphi|$. Rank–nullity is the same theorem with dimension in place of order (sizes multiply, dimensions add). In ↪ S2E05 we'll prove the vector-space version $V/\ker T \cong \operatorname{im} T$ literally.

**Consequences.**
1. *Pigeonhole for dimensions.* If $\dim V > \dim W$, no linear map $V \to W$ is injective ($\dim\ker T = \dim V - \dim\operatorname{im}T \ge \dim V - \dim W > 0$). If $\dim V < \dim W$, none is surjective. In particular, a homogeneous system with more unknowns than equations always has a nonzero solution.
2. *Injective ⟺ surjective, in finite dimensions.* If $T : V \to V$ and $\dim V = n < \infty$, then $T$ injective $\Leftrightarrow$ $\dim\ker T = 0$ $\Leftrightarrow$ $\dim\operatorname{im}T = n$ $\Leftrightarrow$ $\operatorname{im}T = V$ $\Leftrightarrow$ $T$ surjective. (The third equivalence uses "a subspace of full dimension is everything," ↩ S2E02.)
3. *Isomorphism is dimension.* An **isomorphism** is a bijective linear map; its inverse is automatically linear. If $\dim V = \dim W = n$, pick bases and send one to the other (Theorem of §2): that's an isomorphism. Conversely, an isomorphism has kernel $0$ and image $W$, so $\dim V = 0 + \dim W$. Hence **finite-dimensional spaces over $F$ are classified up to isomorphism by one number.** Every $n$-dimensional space is isomorphic to $F^n$, but *not canonically*: the isomorphism depends on a choice of basis.

### 5. Seed for Part B: the shift

Consequence 2 fails without finite dimension. The right shift $S$ on the space of sequences is injective: if $(0, a_1, a_2, \dots) = 0$ then all $a_i = 0$. But it is not surjective: $(1, 0, 0, \dots)$ is not a shift of anything, since every output starts with $0$. Its partner, the left shift $L(a_1, a_2, a_3, \dots) = (a_2, a_3, \dots)$, is surjective but not injective (its kernel is spanned by $(1, 0, 0, \dots)$). And $L S = I$ but $S L \ne I$: a "one-sided inverse" that cannot happen for matrices. This is Hilbert's Hotel (↩ S1E11) in linear-algebra costume: shift every guest one room down, and room 1 is free. It's the first item on Part B's list of things that break (↪ S2E20).

**Zoom out (thread: structure-preserving maps matter more than objects).** Season 1 learned to study groups through homomorphisms. Here, the slogan becomes literal: a vector space of dimension $n$ has no features at all besides $n$. All the interesting structure (rotation vs. shear vs. projection) lives in the *maps*. The rest of Part A is a study of linear maps: their pictures (matrices), their measurements (functionals), and their invariants (eigenvalues).

**Teaser.** A linear map on $\mathbb{R}^n$ is determined by $n$ output vectors, each described by $n$ coordinates. Arrange those $n^2$ numbers in a square... and suddenly matrix multiplication's strange "row times column" rule will explain itself.

## Worked examples

### Example 1: Differentiation on $\mathcal{P}_3$

Let $D : \mathcal{P}_3 \to \mathcal{P}_3$, $D(p) = p'$, where $\mathcal{P}_3$ is polynomials of degree $\le 3$ ($\dim \mathcal{P}_3 = 4$, basis $1, x, x^2, x^3$).

*Values on the basis:* $D(1) = 0$, $D(x) = 1$, $D(x^2) = 2x$, $D(x^3) = 3x^2$. By the extension theorem these determine $D$: for $p = a_0 + a_1 x + a_2 x^2 + a_3 x^3$, $D(p) = a_1 + 2a_2 x + 3a_3 x^2$.

*Kernel:* $D(p) = 0$ iff $a_1 = 2a_2 = 3a_3 = 0$, iff $p = a_0$ is constant. So $\ker D = \operatorname{span}(1)$, nullity 1.

*Image:* $D(p) = a_1 + 2a_2 x + 3 a_3 x^2$ ranges over all of $\mathcal{P}_2$ (given $b_0 + b_1 x + b_2 x^2$, take $a_1 = b_0$, $a_2 = b_1/2$, $a_3 = b_2/3$). So $\operatorname{im} D = \mathcal{P}_2$, rank 3.

*Rank–nullity:* $4 = 1 + 3$. ✓ As an operator on $\mathcal{P}_3$, $D$ is neither injective nor surjective (it misses $x^3$), consistent with Consequence 2: in finite dimensions, failing one means failing the other.

### Example 2: A map on $\mathbb{R}^3$, kernel and image by hand

Let $T(x, y, z) = (x + y,\; y + z,\; x - z)$.

*Linearity:* each output coordinate is a linear expression in $x, y, z$ (no constants, no products), so $T$ is linear.

*Kernel:* solve $x + y = 0$, $y + z = 0$, $x - z = 0$. From the first, $y = -x$; from the second, $z = -y = x$; the third, $x - z = x - x = 0$, holds automatically. So $\ker T = \lbrace (x, -x, x)\rbrace = \operatorname{span}\big((1,-1,1)\big)$. Check: $T(1,-1,1) = (0, 0, 0)$. ✓ Nullity 1.

*Image:* by rank–nullity, $\dim\operatorname{im} T = 3 - 1 = 2$, a plane. To find its equation, call the output $(a, b, c) = (x + y, y + z, x - z)$. Then $a - b = x - z = c$, so every output satisfies $a - b - c = 0$. The plane $\lbrace a - b - c = 0\rbrace$ is 2-dimensional, contains $\operatorname{im}T$, and has the same dimension, so
$$\operatorname{im} T = \lbrace (a, b, c) : a - b - c = 0\rbrace.$$
Check with basis images: $T(1,0,0) = (1, 0, 1)$: $1 - 0 - 1 = 0$ ✓. $T(0,1,0) = (1,1,0)$: $1 - 1 - 0 = 0$ ✓. $T(0,0,1) = (0, 1, -1)$: $0 - 1 + 1 = 0$ ✓. Note $T(0,0,1) = T(0,1,0) - T(1,0,0)$, reflecting the kernel vector $(1,-1,1)$: $T(1,0,0) - T(0,1,0) + T(0,0,1) = 0$.

Consequence: $T(x,y,z) = (1, 2, 3)$ has **no** solution, since $1 - 2 - 3 = -4 \ne 0$; but $T(x,y,z) = (3, 2, 1)$ does ($3 - 2 - 1 = 0$), and its solutions form a line parallel to $(1,-1,1)$. For instance $(1, 2, 0)$ works: $T(1,2,0) = (3, 2, 1)$ ✓, and so does $(1,2,0) + t(1,-1,1)$ for every $t$.

### Example 3: Evaluation at 2

Let $\operatorname{ev}_2 : \mathcal{P}_2 \to \mathbb{R}$, $p \mapsto p(2)$. It is linear (§1). Its image is all of $\mathbb{R}$ (the constant polynomial $c$ maps to $c$), so rank 1. By rank–nullity, $\dim \ker \operatorname{ev}_2 = 3 - 1 = 2$.

Find the kernel explicitly: $p(2) = 0$ iff $(x - 2)$ divides $p$ (factor theorem), iff $p = (x-2)(\alpha + \beta x)$. So $\ker\operatorname{ev}_2 = \operatorname{span}(x - 2,\; x^2 - 2x)$. These two are independent (different degrees), confirming nullity 2. Check: $(2 - 2) = 0$ and $4 - 4 = 0$. ✓

This map has a one-dimensional target: it is a **linear functional**, a measuring device. Its kernel, a "hyperplane" of dimension $3 - 1$, is the set of polynomials that the measurement can't see. Functionals get their own act starting with ↪ S2E06.

### Example 4 (conceptual): Building a map from basis data

Is there a linear map $T : \mathbb{R}^2 \to \mathbb{R}^2$ with $T(1,1) = (2, 0)$ and $T(1,-1) = (0, 4)$? Yes, and exactly one, because $(1,1), (1,-1)$ is a basis (↩ S2E02, Example 2). To compute $T(3, 1)$: write $(3,1) = 2(1,1) + 1(1,-1)$, so $T(3,1) = 2(2,0) + 1(0,4) = (4, 4)$. In general, $(x, y) = \tfrac{x+y}{2}(1,1) + \tfrac{x-y}{2}(1,-1)$, giving
$$T(x, y) = (x + y)\,(1, 0) + 2(x - y)\,(0, 1) = \big(x + y,\; 2x - 2y\big).$$
Check: $T(1,1) = (2, 0)$ ✓, $T(1,-1) = (0, 4)$ ✓, $T(3,1) = (4, 4)$ ✓.

By contrast, there is **no** linear map with $T(1,0) = (1,0)$, $T(2,0) = (0,1)$: since $(2,0) = 2(1,0)$, linearity would force $T(2,0) = (2, 0)$. Values may be prescribed freely only on an *independent* set.

## Visual and animation notes
1. **Cold open:** five machines on a conveyor, each with an input hopper and output chute (rotation, noon shadow, $d/dx$, sequence shift, "value at 2"). Each machine receives "$u$", "$v$", and "$u+v$"; the outputs arrange themselves to show $T(u+v) = T(u) + T(v)$.
2. **Linear map motif:** a plane grid transforms smoothly under a rotation, then a shear, then a projection; gridlines stay straight, parallel, evenly spaced; origin pinned (highlight the pin). Contrast: $x \mapsto x + 1$ slides the origin away (pin breaks), $x \mapsto x^2$ bends gridlines.
3. **Basis determines everything:** only the images of $e_1, e_2$ are shown (two blue arrows land somewhere); then the entire grid "fills in" from them.
4. **Key visual (from storyline):** 3D space squashed onto a plane; the crushed line ($\ker$) glows as it collapses to the origin; the plane ($\operatorname{im}$) lights up. A "dimension ledger" shows $3 = 1 + 2$.
5. **Fibers:** parallel lines (translates of the kernel) each collapse to a single point of the image; preview of the S2E05 quotient blob motif.
6. **Rank–nullity proof:** basis vectors colored two ways: kernel basis $u_i$ (glowing, fading to zero under $T$) and extension $v_j$ (whose images become a basis of the image).
7. **First Isomorphism Theorem callback:** split screen with S1E17's group diagram $G \to G/\ker \varphi \cong \operatorname{im}\varphi$ morphing into $V \to V/\ker T \cong \operatorname{im} T$; callback stamp "↩ S1E17."
8. **Shift seed:** an infinite row of boxes; all contents slide right; the first box is empty forever. Hilbert's Hotel callback stamp "↩ S1E11."

## Common misconceptions
- **Misconception:** "Linear" means "its graph is a straight line," so $f(x) = 2x + 3$ is linear. **Reality:** in linear algebra, linear maps must send $0$ to $0$. $2x + 3$ is affine.
- **Misconception:** A linear map is a matrix. **Reality:** a matrix is a description of a linear map in chosen bases (S2E04). Differentiation is linear whether or not you write a matrix for it.
- **Misconception:** To check injectivity, compare every pair of inputs. **Reality:** for linear maps, it suffices to check that only $0$ maps to $0$.
- **Misconception:** Injective implies surjective for every linear map $V \to V$. **Reality:** only in finite dimensions; the shift on sequences is a counterexample.
- **Misconception:** Rank–nullity says $\dim W = \dim\ker + \dim\operatorname{im}$. **Reality:** it's the dimension of the *domain*. The codomain can be bigger than the image.

## Exercises
- **Warm-up (computational):** Find the kernel, image, rank, and nullity of $T : \mathbb{R}^4 \to \mathbb{R}^2$, $T(x_1, x_2, x_3, x_4) = (x_1 + x_2,\; x_3 + x_4)$, and verify rank–nullity.
- **Core (conceptual):** (a) Is $T : \mathcal{P}_2 \to \mathbb{R}^3$, $T(p) = (p(0), p(1), p(2))$, an isomorphism? (b) Can a linear map $\mathbb{R}^5 \to \mathbb{R}^3$ have a 1-dimensional kernel? (c) Show that $p \mapsto x\,p(x)$ on $\mathcal{P}(\mathbb{R})$ is injective but not surjective.
- **Stretch (proof):** Show that for linear $S : U \to V$ and $T : V \to W$ with all spaces finite-dimensional, $\operatorname{rank}(TS) \le \min(\operatorname{rank} T, \operatorname{rank} S)$, and $\dim\ker(TS) \le \dim\ker S + \dim\ker T$.

<details><summary>Hints and answers</summary>

**Warm-up.** $\ker T = \lbrace x_2 = -x_1,\ x_4 = -x_3\rbrace = \operatorname{span}\big((1,-1,0,0), (0,0,1,-1)\big)$, nullity 2. The image is all of $\mathbb{R}^2$ ($T(a,0,b,0) = (a,b)$), rank 2. $4 = 2 + 2$. ✓

**Core.** (a) Yes. Kernel: $p(0) = p(1) = p(2) = 0$ means a degree-$\le 2$ polynomial has 3 roots, so $p = 0$. Injective between 3-dimensional spaces, hence bijective. (This is Lagrange interpolation, S2E07.) (b) No: the image has dimension $\le 3$, so the kernel has dimension $\ge 5 - 3 = 2$. (c) $x\,p(x) = 0$ forces $p = 0$; but the constant $1$ is not $x$ times a polynomial.

**Stretch.** $\operatorname{im}(TS) = T(\operatorname{im} S) \subseteq \operatorname{im} T$ gives $\le \operatorname{rank} T$; and $T$ restricted to $\operatorname{im} S$ has image $\operatorname{im}(TS)$, so by rank–nullity for that restriction, $\operatorname{rank}(TS) \le \dim\operatorname{im} S$. For the kernel: $S$ restricted to $\ker(TS)$ maps into $\ker T$, with kernel $\ker S$; rank–nullity for this restriction gives $\dim\ker(TS) \le \dim\ker S + \dim\ker T$.
</details>

## Historical note
Linear substitutions of variables appear throughout eighteenth- and nineteenth-century algebra: Lagrange and Gauss studied how quadratic forms change under them, and Cayley's 1858 "A memoir on the theory of matrices" treated them as objects you can add, multiply, and invert. But the idea of a linear map between *abstract* spaces, defined by the two rules $T(u+v) = Tu + Tv$ and $T(cv) = cTv$, came with Peano's axiomatization (1888), where he also defined linear transformations of his "linear systems." The notion of rank of a system of linear equations, and the relation "number of free unknowns = number of unknowns − rank," was developed by Frobenius and others in the 1870s, well before the abstract framework. The modern operator viewpoint grew from functional analysis: Fredholm's work on integral equations (1903) and the Fredholm alternative, which is a version of rank–nullity for certain infinite-dimensional operators, and then Banach's *Théorie des opérations linéaires* (1932).

## Connections
- **Callbacks:** ↩ S1E17 (homomorphisms, kernels, First Isomorphism Theorem), ↩ S1E11 (Hilbert's Hotel and the shift), ↩ S1E10 (complex conjugation: linearity depends on the field), ↩ S2E01 (superposition), ↩ S2E02 (bases, extension to a basis).
- **Sets up:** ↪ S2E04 (matrices as coordinates of maps), ↪ S2E05 (quotients; $V/\ker T \cong \operatorname{im}T$; $\operatorname{Hom}(V,W)$ as a space), ↪ S2E06 (functionals: linear maps to $F$), ↪ S2E08 (row rank = column rank), ↪ S2E12 (eigenvectors: $\ker(T - \lambda I)$), ↪ S2E20 (injective but not surjective in infinite dimensions), ↪ S2E26 (bounded inverses).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$: codes and puzzles" (Lights Out as solving $Ax = b$ over $\mathbb{F}_2$; attaches here).

## References
- **Primary / historical**
  - Arthur Cayley, "A memoir on the theory of matrices," *Philosophical Transactions of the Royal Society of London* 148 (1858).
  - Giuseppe Peano, *Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann*, Turin, 1888 (linear systems and their transformations).
  - Stefan Banach, *Théorie des opérations linéaires*, Warsaw, 1932.
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 3, sections 3A (the vector space of linear maps), 3B (null spaces and ranges; the fundamental theorem of linear maps, Axler's name for rank–nullity), 3D (invertibility and isomorphisms).
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., 1958, Chapter II (transformations; rank and nullity).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 3 (§3.1 Linear Transformations, including the rank–nullity theorem; §3.3 Isomorphism).
  - Sergei Treil, *Linear Algebra Done Wrong*, Chapter 1 (§3 Linear transformations, §6 Invertible transformations) and Chapter 2 (rank theorem).
- **Accessible**
  - 3Blue1Brown, *Essence of Linear Algebra*, 2016: "Linear transformations and matrices" and "Inverse matrices, column space and null space."
  - Gilbert Strang, MIT OpenCourseWare 18.06 *Linear Algebra* (Spring 2010 video lectures), lectures on the null space and column space; and Strang, "The Fundamental Theorem of Linear Algebra," *American Mathematical Monthly* 100 (1993).
