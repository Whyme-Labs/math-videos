# S3E05: Manifolds: Spaces That Are Flat Up Close

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved), opening episode · **Target runtime:** 20–24 min ·
> **Prerequisites:** S1E05 (equivalence classes and quotients), S1E16–S1E17 (groups, quotient groups), S2E01–S2E04 (vector spaces, linear maps, matrices), S2E05 (quotient spaces); outside knowledge: multivariable calculus (partial derivatives, the Jacobian matrix), and the words "open set," "continuous," "compact" at an intuitive level ·
> **Builds toward:** S3E06 (tangent and cotangent spaces), S3E07–S3E09 (forms, Stokes, de Rham cohomology), S3E10 (curvature: why no map of the Earth is perfect), S3E11 (Lie groups)

## Learning objectives
By the end of this lesson the viewer can:
1. Define charts, atlases, smooth transition maps and smooth manifolds, and explain why calculus on a manifold is well-defined even though it is done in coordinates.
2. Prove that the sphere cannot be covered by a single chart, and build a two-chart smooth atlas for $S^1$ and $S^2$ using stereographic projection, computing the transition maps explicitly.
3. Construct manifolds as quotients (the torus $\mathbb{R}^2/\mathbb{Z}^2$, the projective plane as a sphere with antipodes identified) and as level sets, and recognize the configuration space of a double pendulum and the rotation group $SO(3)$ as manifolds.
4. Contrast embedded and abstract manifolds ("build vs. describe") and state Whitney's embedding theorem.

## Cold open
*(Narrator. A hiker stands in a wheat field that stretches flat to the horizon. The camera rises: the field, the county, the coastline, until the Earth curves away.)*

From where you're standing, the Earth is flat. Not approximately, not "flat-ish": for every practical purpose, the ground under your feet is a plane. You can lay a sheet of graph paper on it and do geometry. Surveyors did, for centuries.

And yet you can never make a flat map of the whole Earth that's perfect. Mercator makes Greenland look as big as Africa. Other projections squash the poles, or tear the oceans apart, or bend the meridians. Every world map you've ever seen is lying to you somewhere.

So here is the puzzle. If the Earth is flat everywhere you stand, why can't you flatten all of it? And the bigger question behind it: we want to do calculus, velocities, gradients, integrals, on curved things. On the surface of a planet. On the space of all positions of a robot arm. On the four-dimensional spacetime we live in, which has no "outside" to step into. Calculus was built for flat $\mathbb{R}^n$.

The answer is already in your bookshelf. It's a book of maps, each page flat, each page overlapping its neighbors, with little notes saying "continued on page 37." Mathematicians kept the name. It's called an **atlas**.

## The story

### 1. The naive attempt: surfaces in space, and one big map
The first idea is to treat a curved space as a subset of a flat one. The unit sphere is $S^2 = \{(x,y,z)\in\mathbb{R}^3 : x^2 + y^2 + z^2 = 1\}$, and we parametrize it with latitude and longitude:
$$(\theta, \varphi)\mapsto(\cos\theta\cos\varphi,\ \cos\theta\sin\varphi,\ \sin\theta).$$
Two things go wrong.

**This one map is broken somewhere.** At the poles $\theta = \pm\pi/2$, every longitude $\varphi$ gives the same point: the map is not one-to-one, and its derivative has rank 1 instead of 2 (the columns of the Jacobian become dependent, ↩ S2E03). Along the date line, $\varphi = \pi$ and $\varphi = -\pi$ are the same meridian, so either the map is not one-to-one or its domain is not open. These are not accidents of a bad choice.

**Some spaces have no obvious "outside."** The positions of a double pendulum are described by two angles $(\theta_1, \theta_2)$, each defined only up to $2\pi$. The orientations of a rigid body form the rotation group $SO(3)$ (↩ S1E16). The universe of general relativity is not sitting inside anything. We want a definition of "curved space" that does not require an ambient $\mathbb{R}^N$.

### 2. The crisis: one chart can never be enough
> **Proposition.** There is no homeomorphism from $S^2$ onto an open subset of $\mathbb{R}^2$. In other words, the sphere cannot be covered by a single chart.

**Proof.** Suppose $\varphi: S^2 \to U$ is a homeomorphism onto an open set $U\subseteq\mathbb{R}^2$. The sphere is compact (closed and bounded in $\mathbb{R}^3$), and continuous images of compact sets are compact, so $U$ is compact, hence closed and bounded in $\mathbb{R}^2$. Now $U$ is nonempty, open, and closed. Since $\mathbb{R}^2$ is connected, its only subsets that are both open and closed are $\varnothing$ and $\mathbb{R}^2$. So $U = \mathbb{R}^2$, which is unbounded, contradicting compactness. $\blacksquare$

This is the first half of the cold-open answer: **no single flat map can even show the whole Earth faithfully, for purely topological reasons.** (The second half, that no map, even of a small region, can preserve all distances, is about curvature and is Gauss's Theorema Egregium, ↪ S3E10.)

So we must use several maps, and we must say precisely how they fit together.

### 3. The construction: charts, atlases, transition maps
> **Definition (chart, atlas).** Let $M$ be a topological space. An **$n$-dimensional chart** is a pair $(U, \varphi)$ where $U\subseteq M$ is open and $\varphi: U\to\varphi(U)\subseteq\mathbb{R}^n$ is a homeomorphism onto an open set. The components of $\varphi = (x^1, \dots, x^n)$ are **local coordinates**. An **atlas** is a collection of charts whose domains cover $M$.

> **Definition (transition map).** For two charts $(U_\alpha,\varphi_\alpha)$ and $(U_\beta,\varphi_\beta)$, the **transition map** is
> $$\varphi_\beta\circ\varphi_\alpha^{-1}:\ \varphi_\alpha(U_\alpha\cap U_\beta)\ \longrightarrow\ \varphi_\beta(U_\alpha\cap U_\beta),$$
> a map between open subsets of $\mathbb{R}^n$. It is the "continued on page 37" note: it converts one page's coordinates into the other's on the overlap.

> **Definition (smooth manifold).** A **topological $n$-manifold** is a Hausdorff, second-countable topological space that admits an atlas of $n$-dimensional charts. A **smooth atlas** is one whose transition maps are all $C^\infty$ (infinitely differentiable). A **smooth manifold** is a topological manifold with a (maximal) smooth atlas.

The two technical conditions rule out pathologies: **Hausdorff** (distinct points have disjoint neighborhoods) forbids the "line with two origins," and **second countable** (a countable base of open sets) forbids spaces that are too large to embed or to integrate over.

**The key idea: calculus is done in charts, and transition maps keep it honest.** A function $f: M\to\mathbb{R}$ is **smooth** if $f\circ\varphi_\alpha^{-1}$ is smooth on $\varphi_\alpha(U_\alpha)\subseteq\mathbb{R}^n$ for every chart. This does not depend on the chart: on an overlap,
$$f\circ\varphi_\beta^{-1} = (f\circ\varphi_\alpha^{-1})\circ(\varphi_\alpha\circ\varphi_\beta^{-1}),$$
a composition of smooth maps, hence smooth (chain rule). Likewise a map $F: M\to N$ between manifolds is smooth if it is smooth in charts on both ends. **Every notion of calculus on a manifold is defined in some chart and then shown to be independent of the chart, using the smoothness of the transition maps.** That one sentence is the operating manual for Act II.

Two more facts about dimension. (1) The dimension $n$ is well defined: by Brouwer's invariance of domain, a nonempty open subset of $\mathbb{R}^n$ is not homeomorphic to one of $\mathbb{R}^m$ for $m\ne n$. (2) In the smooth case it is easier: the Jacobian of a transition map is an invertible $n\times n$ matrix with an $m\times m$ inverse, and invertible matrices are square (↩ S2E03, rank–nullity).

### 4. A zoo, built two ways
**Build or Describe?** There are two ways to get a manifold.

**(A) Describe it inside $\mathbb{R}^N$ (embedded manifolds).** If $f:\mathbb{R}^N\to\mathbb{R}^k$ is smooth and $c$ is a *regular value* (the Jacobian $Df(p)$ has rank $k$ at every $p\in f^{-1}(c)$), then $f^{-1}(c)$ is a smooth manifold of dimension $N - k$. This is the implicit function theorem, and it is linear algebra in disguise: near each point, the level set looks like the kernel of $Df(p)$, which has dimension $N - k$ by rank–nullity (↩ S2E03). Examples:
- the sphere $S^{n} = f^{-1}(1)$ for $f = x_1^2 + \dots + x_{n+1}^2$, since $Df = 2(x_1,\dots,x_{n+1})\ne0$ on the sphere;
- the orthogonal group $O(n) = \{A : A^{\mathsf T}A = I\}$, of dimension $n(n-1)/2$, and its component $SO(3)$, of dimension 3;
- any open subset of $\mathbb{R}^N$, e.g. $GL(n,\mathbb{R}) = \{\det\ne0\}\subseteq\mathbb{R}^{n^2}$ (↩ S2E11).

**(B) Build it by gluing or by quotients (abstract manifolds).** Season 1's master tool returns (↩ S1E05): declare points equal and get a new space.
- **The torus** $T^2 = \mathbb{R}^2/\mathbb{Z}^2$: identify $(x, y)\sim(x + m, y + n)$ for integers $m,n$. This is the quotient of the group $\mathbb{R}^2$ by the subgroup $\mathbb{Z}^2$ (↩ S1E17). Equivalently, a square with opposite edges glued. The double pendulum's configuration space $\{(\theta_1,\theta_2)\}$ with both angles mod $2\pi$ is exactly this torus: $S^1\times S^1$.
- **The real projective plane** $\mathbb{RP}^2 = S^2/(p\sim -p)$: the sphere with antipodal points identified. Equivalently, the set of lines through the origin in $\mathbb{R}^3$ (a "projective geometry" side quest, attaching after S2E05). It cannot be embedded in $\mathbb{R}^3$ at all, so the abstract definition is not optional.
- **The rotation group** $SO(3)$: each rotation is "an axis and an angle $\theta\in[0,\pi]$," i.e. a point of the solid ball of radius $\pi$, where antipodal points on the boundary sphere (rotation by $\pi$ about $v$ and about $-v$) are the same rotation. This glued ball is $\mathbb{RP}^3$, a 3-manifold (↪ S3E11).

> **Theorem (Whitney, stated).** Every smooth $n$-manifold (Hausdorff, second countable) can be smoothly embedded in $\mathbb{R}^{2n}$.

So the abstract definition does not produce anything new in principle: every manifold *can* be placed inside some $\mathbb{R}^N$. But the embedding is a construction, not part of the object, and it is almost never the natural way to think. The torus "is" $\mathbb{R}^2/\mathbb{Z}^2$; the doughnut in $\mathbb{R}^3$ is one picture of it, and a misleading one: it suggests the torus is curved, while $\mathbb{R}^2/\mathbb{Z}^2$ inherits a perfectly flat geometry (↪ S3E10). Spacetime does not come with an ambient space. **A manifold is defined by what you can do with it (charts that agree on overlaps), not by what it is made of.** This is the series thesis, applied to space itself.

### 5. Payoff: the Earth, answered
The cold-open puzzle splits in two:
1. *Why can't one flat map cover the Earth?* Topology: $S^2$ is compact and $\mathbb{R}^2$ has no compact open subsets (§2). Two stereographic charts suffice (Example 2).
2. *Why does every map distort?* Even a small chart cannot preserve distances, because the sphere has positive curvature. That is Gauss's Theorema Egregium, the payoff of S3E10.

And the bigger question, "how do we do calculus without stepping outside?" has its answer in §3: do it on the pages, and check that the transition maps carry it from page to page. Next episode we do exactly that with derivatives, and discover that the derivative at a point lives in a vector space that the manifold builds for itself.

## Worked examples

### Example 1: the circle with two stereographic charts
Let $S^1 = \{(x, y): x^2 + y^2 = 1\}$, $N = (0, 1)$, $S = (0, -1)$.

**Chart from the north pole.** For $p = (x, y)\ne N$, the line from $N$ through $p$ hits the $x$-axis at
$$\varphi_N(x, y) = \frac{x}{1 - y}.$$
**Its inverse.** Given $t\in\mathbb{R}$, the point is $\varphi_N^{-1}(t) = \left(\dfrac{2t}{t^2+1},\ \dfrac{t^2-1}{t^2+1}\right)$. Check it lies on the circle: $\frac{4t^2 + (t^2-1)^2}{(t^2+1)^2} = \frac{(t^2+1)^2}{(t^2+1)^2} = 1$. ✓ Check it inverts $\varphi_N$: $1 - y = \frac{2}{t^2+1}$, so $\frac{x}{1-y} = \frac{2t}{t^2+1}\cdot\frac{t^2+1}{2} = t$. ✓

**Chart from the south pole.** $\varphi_S(x, y) = \dfrac{x}{1+y}$, defined for $p\ne S$.

**Transition map.** On the overlap $S^1\setminus\{N,S\}$, $\varphi_N$ takes values in $\mathbb{R}\setminus\{0\}$, and with $1 + y = \frac{2t^2}{t^2+1}$,
$$\varphi_S\circ\varphi_N^{-1}(t) = \frac{2t}{t^2+1}\cdot\frac{t^2+1}{2t^2} = \frac{1}{t}.$$
This is $C^\infty$ on $\mathbb{R}\setminus\{0\}$, with smooth inverse $s\mapsto1/s$. So $\{\varphi_N, \varphi_S\}$ is a smooth atlas, and $S^1$ is a smooth 1-manifold. (Checked symbolically with `sympy`.)

### Example 2: the sphere with two stereographic charts (a complete chart computation)
Let $N = (0,0,1)$, $S = (0,0,-1)$, and define for $p = (x, y, z)$
$$\varphi_N(x,y,z) = \left(\frac{x}{1-z},\ \frac{y}{1-z}\right)\ (p\ne N),\qquad \varphi_S(x,y,z) = \left(\frac{x}{1+z},\ \frac{y}{1+z}\right)\ (p\ne S).$$
**Step 1 (inverse of $\varphi_N$).** For $(u, v)\in\mathbb{R}^2$, put $r^2 = u^2 + v^2$. Then
$$\varphi_N^{-1}(u, v) = \left(\frac{2u}{r^2+1},\ \frac{2v}{r^2+1},\ \frac{r^2-1}{r^2+1}\right).$$
On the sphere: $\frac{4u^2 + 4v^2 + (r^2-1)^2}{(r^2+1)^2} = \frac{4r^2 + r^4 - 2r^2 + 1}{(r^2+1)^2} = \frac{(r^2+1)^2}{(r^2+1)^2} = 1$. ✓ Inverse: $1 - z = \frac{2}{r^2+1}$, so $\frac{x}{1-z} = u$ and $\frac{y}{1-z} = v$. ✓ Both $\varphi_N$ and its inverse are continuous, so $\varphi_N$ is a homeomorphism $S^2\setminus\{N\}\to\mathbb{R}^2$. Likewise for $\varphi_S$.

**Step 2 (the overlap).** $U_N\cap U_S = S^2\setminus\{N, S\}$, and $\varphi_N$ maps it onto $\mathbb{R}^2\setminus\{0\}$ (only $S$ maps to the origin).

**Step 3 (transition map).** With $1 + z = \frac{2r^2}{r^2+1}$,
$$\varphi_S\circ\varphi_N^{-1}(u, v) = \left(\frac{2u}{r^2+1}\cdot\frac{r^2+1}{2r^2},\ \frac{2v}{r^2+1}\cdot\frac{r^2+1}{2r^2}\right) = \left(\frac{u}{u^2+v^2},\ \frac{v}{u^2+v^2}\right).$$
This is **inversion in the unit circle**. It is $C^\infty$ on $\mathbb{R}^2\setminus\{0\}$ (a rational function with nonvanishing denominator), and it is its own inverse: applying it twice gives $\frac{u/r^2}{1/r^2} = u$. So the atlas is smooth and $S^2$ is a smooth 2-manifold.

**Step 4 (its Jacobian).** Differentiating,
$$D(\varphi_S\circ\varphi_N^{-1}) = \frac{1}{(u^2+v^2)^2}\begin{pmatrix} v^2 - u^2 & -2uv\\ -2uv & u^2 - v^2\end{pmatrix},\qquad \det = -\frac{1}{(u^2+v^2)^2}.$$
The determinant is never zero (as it must be for a diffeomorphism), and it is *negative*: the two charts induce opposite orientations, because looking at the plane from the north pole versus the south pole is like looking at it from above versus below. Composing $\varphi_S$ with $(u,v)\mapsto(u,-v)$ fixes this. Orientation is the subject of S3E07. (All of Steps 1–4 were verified with `sympy`.)

### Example 3: the torus and the double pendulum
Let $T^2 = \mathbb{R}^2/\mathbb{Z}^2$ with quotient map $\pi:\mathbb{R}^2\to T^2$.

**Charts.** For any point $a\in\mathbb{R}^2$, the open square $Q_a = a + (-\tfrac12,\tfrac12)^2$ contains no two points that differ by a nonzero integer vector (their coordinates differ by less than 1). So $\pi$ restricted to $Q_a$ is one-to-one, and its inverse $\varphi_a = (\pi|_{Q_a})^{-1}: \pi(Q_a)\to Q_a$ is a chart.

**Transition maps.** If $\pi(Q_a)$ and $\pi(Q_b)$ overlap, then a point with coordinates $q\in Q_a$ has coordinates $q + k$ in $Q_b$ for an integer vector $k$, which is locally constant on the overlap. So $\varphi_b\circ\varphi_a^{-1}(q) = q + k$: **translations**, whose Jacobian is the identity matrix. This atlas is smooth, and even better, every transition map preserves distances and angles. That is why the torus carries a flat geometry.

**The double pendulum.** The state of a double pendulum (ignoring velocities) is the pair of angles $(\theta_1,\theta_2)$, each defined mod $2\pi$. Rescaling $(\theta_1,\theta_2)\mapsto\frac{1}{2\pi}(\theta_1,\theta_2)$ identifies the configuration space with $\mathbb{R}^2/\mathbb{Z}^2 = T^2$. A motion of the pendulum is a curve on the torus; a motion where the lower arm spins all the way around once while the upper arm returns to its start is a loop going once around one of the torus's two circles.

### Example 4: the projective plane and its affine charts
Write points of $\mathbb{RP}^2$ as $[x_0:x_1:x_2]$, a nonzero vector up to nonzero scaling (a line through the origin; for unit vectors, the scaling by $-1$ is the antipodal identification). Let $U_i = \{x_i\ne0\}$.

**Charts.** $\varphi_0[x_0:x_1:x_2] = \left(\frac{x_1}{x_0},\frac{x_2}{x_0}\right)$ on $U_0$, and $\varphi_1[x_0:x_1:x_2] = \left(\frac{x_0}{x_1},\frac{x_2}{x_1}\right)$ on $U_1$. Each is well defined (scaling cancels) and a bijection onto $\mathbb{R}^2$, with inverse $(u,v)\mapsto[1:u:v]$, resp. $[u:1:v]$. The three sets $U_0, U_1, U_2$ cover $\mathbb{RP}^2$, since a nonzero vector has some nonzero coordinate.

**Transition map.** On $U_0\cap U_1$ (where $u\ne0$), $\varphi_0^{-1}(u, v) = [1:u:v]$, so
$$\varphi_1\circ\varphi_0^{-1}(u, v) = \left(\frac1u,\ \frac vu\right).$$
**Jacobian.** $\begin{pmatrix} -1/u^2 & 0\\ -v/u^2 & 1/u\end{pmatrix}$, with determinant $-\dfrac{1}{u^3}$. It is smooth and nonvanishing on $u\ne0$, so the atlas is smooth. Notice that the sign of the determinant is $-\operatorname{sign}(u)$: it is positive on half the overlap and negative on the other half. No re-choice of these charts can make all transition Jacobians positive; this is the first sign that $\mathbb{RP}^2$ is **non-orientable** (↪ S3E07).

## Visual and animation notes
1. **Cold open:** the hiker in a flat field; camera rises to reveal curvature. Then a parade of world-map projections (Mercator, equal-area, interrupted), each with a red "distortion" heat map.
2. **The atlas:** an actual atlas book; pages flip; each page is a flat sheet with a small "continued on page 37" arrow at its edge. The pages lift off and wrap onto a globe as overlapping curved patches. (Motif: *manifold / charts*, overlapping curved patches peeling off onto flat sheets.)
3. **Latitude–longitude failure:** the coordinate grid pinched at the poles; the Jacobian's two columns visibly collapse onto one line there (linear-map grid motif, with a crushed direction glowing).
4. **One chart is impossible:** the sphere tries to unroll onto one sheet; the sheet must stretch to infinity, and a "compact" badge on the sphere refuses to follow.
5. **Stereographic projection:** a light at the north pole casting the shadow of the sphere onto the plane; then a light at the south pole; the two shadows of the same point related by inversion in the unit circle, drawn as the overlap animation.
6. **Transition maps as overlaps:** two patches overlap in a band; the band appears on both flat sheets, connected by threads (bijection motif) showing $u\mapsto u/|u|^2$.
7. **Quotients make manifolds:** the plane's integer lattice; all points in one equivalence class blur into a glowing blob (*quotient* motif from S1E05); the unit square's edges glue into a cylinder and then a torus. A double pendulum swings beside it while a dot traces its path on the torus.
8. **$\mathbb{RP}^2$:** antipodal points on a sphere pairing up and blurring into blobs; then the three affine charts as three planes $x_i = 1$ seen from the origin.
9. **Whitney:** a torus drawn as $\mathbb{R}^2/\mathbb{Z}^2$ on the left and as a doughnut in $\mathbb{R}^3$ on the right, with a "Build or Describe?" card.

## Common misconceptions
- **Misconception:** "A manifold is a surface sitting inside $\mathbb{R}^3$." **Reality:** a manifold is defined intrinsically by an atlas. Surfaces in $\mathbb{R}^3$ are examples, but $\mathbb{RP}^2$ and the Klein bottle cannot sit inside $\mathbb{R}^3$ at all, and spacetime has no ambient space.
- **Misconception:** "Locally Euclidean is enough." **Reality:** the "line with two origins" (two copies of $\mathbb{R}$ glued everywhere except at $0$) is locally Euclidean but not Hausdorff: sequences can converge to two different limits. The Hausdorff and second-countability conditions are part of the definition.
- **Misconception:** "The sphere needs two charts because stereographic projection misses a point; a cleverer map would cover everything." **Reality:** no chart can cover all of $S^2$, by compactness (§2).
- **Misconception:** "Coordinates on a manifold are the manifold." **Reality:** coordinates are a language spoken on one page of the atlas (↩ S2E02: "coordinates are a language a basis lets you speak"). Only statements that survive every transition map are statements about the manifold.
- **Misconception:** "The torus is curved because the doughnut is." **Reality:** $\mathbb{R}^2/\mathbb{Z}^2$ has transition maps that are translations; it carries a flat metric. The doughnut picture is just one embedding.

## Exercises
- **Warm-up (computational):** For the circle, let $\psi_1$ be the angle chart $\theta\in(0, 2\pi)$ on $S^1\setminus\{(1,0)\}$ and $\psi_2$ the angle chart $\theta\in(-\pi,\pi)$ on $S^1\setminus\{(-1,0)\}$. Compute the transition map $\psi_2\circ\psi_1^{-1}$ on each of the two components of the overlap.
- **Core (conceptual):** Show that $SO(3)$ is a manifold of dimension 3 using the regular-value criterion: consider $f(A) = A^{\mathsf T}A$ as a map from $3\times3$ matrices to symmetric $3\times3$ matrices. What are the dimensions of the domain and target? Why is $I$ a regular value?
- **Stretch (proof or exploration):** Show that $\mathbb{RP}^1$ (lines through the origin in $\mathbb{R}^2$) is diffeomorphic to the circle $S^1$. Then explore: the configuration space of a *triple* pendulum is $T^3 = \mathbb{R}^3/\mathbb{Z}^3$. What are its transition maps?

<details><summary>Hints and answers</summary>

- **Warm-up:** The overlap is $S^1$ minus two points: the upper half ($\theta_1\in(0,\pi)$), where $\psi_2\circ\psi_1^{-1}(\theta) = \theta$, and the lower half ($\theta_1\in(\pi, 2\pi)$), where $\psi_2\circ\psi_1^{-1}(\theta) = \theta - 2\pi$. Both are smooth, with derivative 1.
- **Core:** Domain $\mathbb{R}^9$; target symmetric matrices $\cong\mathbb{R}^6$. The derivative at $A$ is $H\mapsto H^{\mathsf T}A + A^{\mathsf T}H$; for $A\in O(3)$ and any symmetric $S$, take $H = \frac12AS$ to get $\frac12(SA^{\mathsf T}A + A^{\mathsf T}AS) = S$, so the derivative is onto (rank 6). Hence $O(3)$ has dimension $9 - 6 = 3$, and $SO(3) = O(3)\cap\{\det = 1\}$ is an open and closed piece of it.
- **Stretch:** Map a line at angle $\alpha\in[0,\pi)$ to the point $(\cos2\alpha,\sin2\alpha)$; doubling the angle makes the antipodal identification disappear. In charts this is smooth with smooth inverse. For $T^3$, transition maps are translations by integer vectors, as in Example 3.

</details>

## Historical note
The word "manifold" comes from Bernhard Riemann's habilitation lecture *Über die Hypothesen, welche der Geometrie zu Grunde liegen* ("On the hypotheses which lie at the foundations of geometry"), delivered in Göttingen on 10 June 1854. Riemann had proposed three topics, and Gauss, then 77, chose the one Riemann had least prepared: the foundations of geometry. Riemann spoke of "$n$-fold extended manifolds" (*mehrfach ausgedehnte Mannigfaltigkeiten*) described locally by $n$ coordinates, and of measuring lengths by a quadratic form varying from point to point, ideas that would become the language of general relativity sixty years later. The lecture was published only in 1868, two years after Riemann's death, by Dedekind. Riemann's notion was intuitive; the modern definition with charts and atlases was first made precise by Hermann Weyl in *Die Idee der Riemannschen Fläche* (1913) for complex one-dimensional manifolds, and in general by Hassler Whitney, whose 1936 paper "Differentiable manifolds" defined abstract smooth manifolds and proved that they embed in Euclidean space. Whitney improved the dimension to $2n$ in 1944.

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes: the torus and $\mathbb{RP}^2$ as quotients), ↩ S1E16 (rotation groups), ↩ S1E17 (the quotient group $\mathbb{R}^2/\mathbb{Z}^2$), ↩ S2E01 ("calculus is local linearization": the promise this act keeps), ↩ S2E02 (coordinates are a language), ↩ S2E03 (rank–nullity: level sets and dimension), ↩ S2E04 (Jacobian matrices), ↩ S2E05 (quotients; lines through the origin), ↩ S2E11 (determinant: $GL(n)$ is open; orientation sign).
- **Sets up:** ↪ S3E06 (the tangent space at each point, and derivatives of smooth maps), ↪ S3E07 (orientation and the sign of transition Jacobians), ↪ S3E09 (the torus and $\mathbb{RP}^2$ as test cases for cohomology), ↪ S3E10 (curvature: why no chart preserves distances; flat torus), ↪ S3E11 ($SO(3)\cong\mathbb{RP}^3$ as a Lie group).
- **Side quests:** "Projective geometry" (lines through the origin; parallel lines meeting at infinity); "General relativity" (spacetime as a 4-manifold); history interlude "Riemann's 1854 lecture that invented manifolds."

## References
- **Primary / historical:** B. Riemann, "Über die Hypothesen, welche der Geometrie zu Grunde liegen," habilitation lecture, Göttingen, 1854; published in *Abhandlungen der Königlichen Gesellschaft der Wissenschaften zu Göttingen* 13 (1868); English translation by W. K. Clifford, "On the Hypotheses which lie at the Bases of Geometry," *Nature* 8 (1873). H. Weyl, *Die Idee der Riemannschen Fläche* (Teubner, 1913). H. Whitney, "Differentiable Manifolds," *Annals of Mathematics* 37 (1936).
- **Textbooks:** J. M. Lee, *Introduction to Smooth Manifolds*, 2nd ed., Graduate Texts in Mathematics 218 (Springer, 2013), Ch. 1 "Smooth Manifolds" (charts, atlases, stereographic projection, projective spaces) and Ch. 5 "Submanifolds" (level sets). L. W. Tu, *An Introduction to Manifolds*, 2nd ed., Universitext (Springer, 2011), the chapters on manifolds and quotients (including $\mathbb{RP}^n$). M. Spivak, *Calculus on Manifolds* (W. A. Benjamin, 1965), Ch. 2 (implicit function theorem) and Ch. 5 (manifolds in $\mathbb{R}^n$).
- **Accessible:** J. Milnor, *Topology from the Differentiable Viewpoint* (University Press of Virginia, 1965), a short, beautifully written introduction. J. R. Weeks, *The Shape of Space*, 2nd ed. (Marcel Dekker, 2002), for building intuition about tori, projective planes, and "spaces without an outside."
