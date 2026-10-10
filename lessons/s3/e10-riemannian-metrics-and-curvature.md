# S3E10: Riemannian Metrics and Curvature

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E09 (bilinear forms, signature), S2E14 (inner products: length is a choice), S2E16 (Riesz: vectors ↔ covectors), S3E05 (manifolds), S3E06 (tangent spaces), S3E07 (area forms, pullback), S3E09 (Euler characteristic) ·
> **Builds toward:** S3E11 (invariant metrics on Lie groups; $SO(3)$ and $S^3$), S3E12 (the finale's build-vs-describe table); side quests on general relativity and information geometry

## Learning objectives
By the end of this lesson the viewer can:
1. Define a Riemannian metric as an inner product on each tangent space, and use it to compute lengths, angles, areas, and the gradient vector field.
2. Explain the difference between extrinsic and intrinsic curvature, and state Gauss's Theorema Egregium.
3. Compute Gaussian curvature from a metric for the sphere, cylinder, and torus, and recover it from circumferences of small circles.
4. Prove that the area of a geodesic triangle on the unit sphere equals its angle excess, and derive the global Gauss–Bonnet theorem $\int_M K\,dA=2\pi\chi(M)$ from the local version.
5. Describe how a Lorentzian metric turns this geometry into spacetime.

## Cold open
*Narration draft.*

Imagine an ant that lives on a surface. Not *on* it the way we stand on the ground, looking up at the sky. *In* it. The ant's whole universe is two-dimensional. It can't look up, can't look down, can't step outside to see whether its world is a flat sheet, a sphere, or a saddle.

Here's the question. Can the ant still tell whether its world is curved?

Let's give the ant a task. Start at the North Pole. Walk straight "south" for about ten thousand kilometers until you hit the equator. Turn left by exactly ninety degrees. Walk straight along the equator for another ten thousand kilometers. Turn left again by ninety degrees. Walk straight. You'll arrive back exactly where you started, at the pole, and you'll have to turn ninety degrees one more time to face your original direction.

Three straight sides. Three right angles. A triangle whose angles add up to two hundred seventy degrees.

On a flat sheet of paper that is impossible: every triangle's angles add up to one hundred eighty. So the ant, without ever leaving its world, without ever seeing it from outside, has just *measured* that its world is curved.

Two centuries ago, Carl Friedrich Gauss proved that this isn't a trick. Curvature is something you can measure from the inside, and he was so pleased with the result that he called it the *Theorema Egregium*: the "remarkable theorem."

## The story

### 1. A metric: an inner product at every point

A manifold, as built in S3E05–S3E09, has no notion of length. Forms can be integrated, but "how long is this curve?" has no answer: the arc-length integral of S3E07 needed $|\gamma'(t)|$, and a bare tangent space has no norm. S2E14 taught us that length is a choice: a vector space doesn't know what "perpendicular" means until you choose an inner product. A manifold needs that choice at every point.

> **Definition (Riemannian metric).** A **Riemannian metric** $g$ on a smooth manifold $M$ assigns to each point $p$ an inner product $g_p$ (symmetric, positive definite bilinear form, ↩ S2E09, S2E14) on $T_pM$, varying smoothly with $p$. In local coordinates,
> $$g=\sum_{i,j}g_{ij}(x)\,dx^i\,dx^j,\qquad g_{ij}=g(\partial_i,\partial_j),$$
> where $(g_{ij})$ is a symmetric positive definite matrix at each point. On a surface, Gauss wrote $g=E\,du^2+2F\,du\,dv+G\,dv^2$ (the **first fundamental form**).

Every smooth manifold admits a Riemannian metric (glue local Euclidean ones with a partition of unity). A surface in $\mathbb{R}^3$ inherits one: $g_p(v,w)=v\cdot w$ for tangent vectors $v,w$. That is the "build" option. The abstract definition is the "describe" option, and Gauss's theorem will say that the ant only ever needs the second.

**What a metric gives you.**
- **Length** of a curve: $L(\gamma)=\int_a^b\sqrt{g(\gamma'(t),\gamma'(t))}\,dt$. **Distance**: $d(p,q)=\inf L(\gamma)$ over curves from $p$ to $q$.
- **Angles** between tangent vectors: $\cos\angle(v,w)=g(v,w)/\sqrt{g(v,v)g(w,w)}$.
- **Area / volume form** (on an oriented manifold): $dA=\sqrt{\det(g_{ij})}\,dx^1\wedge\cdots\wedge dx^n$; on a surface, $\sqrt{EG-F^2}\,du\wedge dv$. This is how the unsigned "$\int f\,dA$" finally becomes the integral of a form.
- **The gradient vector field** (↩ S2E16): $df$ is a covector field (S3E06). The metric turns it into a vector field $\nabla f$ by Riesz: $g(\nabla f,v)=df(v)$ for all $v$, so in coordinates $(\nabla f)^i=\sum_j g^{ij}\partial_jf$ with $(g^{ij})=(g_{ij})^{-1}$.
- **Geodesics**: curves that are locally length-minimizing, equivalently curves with zero acceleration as measured inside the surface ("straightest" paths). On the sphere they are great circles; on the plane, straight lines.

### 2. The naive attempt: curvature as bending in space

The first idea of curvature is extrinsic: how fast does the surface turn away from its tangent plane? At each point of a surface in $\mathbb{R}^3$, slice it with planes containing the normal; the slices are curves with curvatures, and the maximum and minimum are the **principal curvatures** $\kappa_1,\kappa_2$. Their product is the **Gaussian curvature** $K=\kappa_1\kappa_2$, and their average is the mean curvature $H$.

For a sphere of radius $R$, $\kappa_1=\kappa_2=1/R$, so $K=1/R^2$ and $H=1/R$. For a cylinder of radius $R$, $\kappa_1=1/R$ (around) and $\kappa_2=0$ (along), so $K=0$ but $H=1/(2R)$.

**The crisis.** The cylinder is obviously bent. Yet roll up a sheet of paper into a cylinder: no stretching, no tearing. Every triangle drawn on the paper keeps its side lengths and angles. The ant cannot tell a cylinder from a plane. So "bending" (the mean curvature $H$) is *not* something the ant can measure. Is anything?

### 3. The Theorema Egregium

> **Theorem (Gauss, 1827).** The Gaussian curvature $K$ of a surface depends only on its metric $g$ (the coefficients $E,F,G$ and their first and second derivatives). Consequently, if two surfaces are locally isometric (there is a map between them preserving lengths of all curves), they have the same Gaussian curvature at corresponding points.

Although $K$ was defined as a product of two extrinsic quantities, the product happens to be intrinsic, even though neither factor is. In **orthogonal coordinates** ($F=0$) the formula is
$$K=-\frac{1}{2\sqrt{EG}}\left[\frac{\partial}{\partial u}\!\left(\frac{G_u}{\sqrt{EG}}\right)+\frac{\partial}{\partial v}\!\left(\frac{E_v}{\sqrt{EG}}\right)\right].$$
In **geodesic polar coordinates** around a point, $g=dr^2+G(r,\theta)\,d\theta^2$, it simplifies to
$$K=-\frac{\big(\sqrt{G}\big)_{rr}}{\sqrt G}.$$

*Proof sketch.* Write the second derivatives of the embedding $X(u,v)$ in terms of the tangent frame $X_u,X_v$ and the normal $n$ (the Gauss formulas). The tangential coefficients (Christoffel symbols) are computable from $E,F,G$ alone. Comparing $(X_{uu})_v$ with $(X_{uv})_u$ and taking the tangential component yields an equation in which $LN-M^2$ (the determinant of the second fundamental form) equals an expression in $E,F,G$ and their derivatives; dividing by $EG-F^2$ gives $K$. Every extrinsic quantity cancels. $\square$

**How the ant measures $K$.** In geodesic polar coordinates, $\sqrt{G}=r-\tfrac{K}{6}r^3+O(r^4)$ (this follows from the formula above with $\sqrt G(0)=0$ and $(\sqrt G)_r(0)=1$). So the circumference of the geodesic circle of radius $r$ is
$$C(r)=2\pi r-\frac{\pi}{3}K\,r^3+O(r^4),\qquad\text{so}\qquad K=\lim_{r\to0}\frac{3}{\pi}\,\frac{2\pi r-C(r)}{r^3}$$
(the Bertrand–Diguet–Puiseux formula, 1848). The ant can pace out a circle with a rope and count. Or it can use triangles, as we now show.

> **Corollary (why every map of the Earth distorts).** There is no map from any open region of a sphere to the plane that preserves all distances.

*Proof.* Such a map would be a local isometry, so it would preserve $K$. But the sphere has $K=1/R^2>0$ everywhere and the plane has $K=0$. $\blacksquare$

Mercator preserves angles but blows up areas near the poles; equal-area projections preserve area but distort angles. Gauss guarantees you cannot have everything.

### 4. Gauss–Bonnet: geometry integrates to topology

Triangles detect curvature, and the precise statement is beautiful. We prove it on the unit sphere, where everything is explicit.

> **Theorem (Girard, 1629; local Gauss–Bonnet on the sphere).** A geodesic triangle on the unit sphere with interior angles $\alpha,\beta,\gamma$ has area
> $$\text{Area}(T)=\alpha+\beta+\gamma-\pi .$$

**Proof.** A **lune** is a region between two great half-circles meeting at antipodal points with angle $\theta$. Lunes of angle $\theta$ make up the fraction $\theta/2\pi$ of the sphere, so a lune of angle $\theta$ has area $\frac{\theta}{2\pi}\cdot4\pi=2\theta$.

The three great circles through the sides of $T$ define, at each vertex, a lune containing $T$ (at $A$, the lune of angle $\alpha$ bounded by the great circles through $AB$ and $AC$) and the antipodal lune containing the antipodal triangle $T'$. These six lunes cover the sphere. Points of $T$ and of $T'$ are covered three times each; every other point (off a set of measure zero) is covered exactly once. Adding areas:
$$2\,(2\alpha+2\beta+2\gamma)=4\pi+2\,\text{Area}(T)+2\,\text{Area}(T').$$
Since $\text{Area}(T')=\text{Area}(T)$ (the antipodal map is an isometry), $4(\alpha+\beta+\gamma)=4\pi+4\,\text{Area}(T)$, i.e. $\text{Area}(T)=\alpha+\beta+\gamma-\pi$. $\blacksquare$

On a sphere of radius $R$, areas scale by $R^2$ and $K=1/R^2$, so the statement becomes $\alpha+\beta+\gamma-\pi=\int_T K\,dA$. That is the general **local Gauss–Bonnet theorem**: for any geodesic triangle on any surface,
$$\alpha+\beta+\gamma-\pi=\iint_T K\,dA .$$
Angle sums exceed $\pi$ where $K>0$ (sphere), equal $\pi$ where $K=0$ (plane, cylinder), and fall short where $K<0$ (saddle).

> **Theorem (global Gauss–Bonnet).** For a compact surface $M$ without boundary and any Riemannian metric on it,
> $$\iint_M K\,dA=2\pi\,\chi(M).$$

*Proof from the local version.* Triangulate $M$ by geodesic triangles, with $V$ vertices, $E$ edges, and $F$ faces. Summing the local theorem over all faces,
$$\iint_M K\,dA=\sum_{\text{faces}}(\text{angle sum})-\pi F .$$
The angles around each vertex fill a full turn, so the total angle sum is $2\pi V$. Each face has three edges and each edge borders two faces, so $3F=2E$, i.e. $\pi F=2\pi E-2\pi F$. Therefore
$$\iint_M K\,dA=2\pi V-2\pi E+2\pi F=2\pi(V-E+F)=2\pi\chi(M). \qquad\blacksquare$$

Dent a sphere, stretch it into an egg, inflate a bump: the local curvature changes everywhere, but the total stays $4\pi$. **Geometry integrates to topology** (↩ S3E09). Behind the scenes this is a Stokes argument: the area form times $K$ is locally $d$ of a "connection 1-form," but that 1-form is not globally defined, and the obstruction is the Euler characteristic.

### 5. Higher dimensions and spacetime

Riemann's 1854 lecture took Gauss's idea to $n$ dimensions: a manifold is given a metric $g_{ij}$ at every point, and curvature is the **Riemann curvature tensor**, which assigns to each 2-plane in $T_pM$ a **sectional curvature** (the $K$ of the surface swept out by geodesics in that plane). As with $K$, it is computable from $g$ alone.

**Extrapolation: spacetime.** Replace the positive definite inner product by a symmetric form of signature $(+,-,-,-)$ (or, equivalently, $(-,+,+,+)$; both conventions are common, and S3E09 used the second), as in S2E09. Sylvester's law says this signature is the only invariant. A manifold with such a metric at every point is a **Lorentzian manifold**. Special relativity is flat Minkowski space. In general relativity, spacetime is curved, freely falling bodies follow geodesics, and Einstein's field equations $G_{\mu\nu}=8\pi G\,T_{\mu\nu}$ (with $c=1$) say that a contraction of the curvature tensor equals the energy–momentum content: "curvature = matter." GPS satellites must correct for this curvature (and for velocity effects) to stay accurate.

### 6. Payoff and zoom-out

The ant's question is answered: yes, curvature is intrinsic. Pace out triangles and compare their angle sums to $\pi$, or pace out circles and compare their circumferences to $2\pi r$. Total curvature even reveals the topology of the whole world: an ant that measures $\iint K\,dA=4\pi$ knows it lives on a sphere-like world, without ever seeing it.

**Build or Describe?** *Build:* a surface sitting in $\mathbb{R}^3$, with its metric induced from the dot product. *Describe:* an abstract manifold with a metric $g$. The Theorema Egregium says curvature belongs to the description, not the building. This is S3E05's "build vs. describe" (embedded vs. abstract manifolds) with geometry added.

**Thread: invariants.** $K$ is a badge that survives every isometry, as the determinant survives every change of basis. $\iint K\,dA$ survives even more: every change of metric.

**Teaser.** The rotations of space form a group (S1E16). They also form a 3-dimensional manifold (S3E05). What happens when a group is also a smooth space, and both structures cooperate? (↪ S3E11)

## Worked examples

### Example 1: The sphere of radius $R$, two ways
Parametrize $X(\phi,\theta)=(R\sin\phi\cos\theta,R\sin\phi\sin\theta,R\cos\phi)$.

**Step 1 (metric).** $X_\phi=R(\cos\phi\cos\theta,\cos\phi\sin\theta,-\sin\phi)$, $X_\theta=R(-\sin\phi\sin\theta,\sin\phi\cos\theta,0)$. Then $E=X_\phi\cdot X_\phi=R^2$, $F=X_\phi\cdot X_\theta=0$, $G=X_\theta\cdot X_\theta=R^2\sin^2\phi$. So $g=R^2\,d\phi^2+R^2\sin^2\phi\,d\theta^2$.

**Step 2 (curvature from the metric alone).** $\sqrt{EG}=R^2\sin\phi$. $E_\theta=0$. $G_\phi=2R^2\sin\phi\cos\phi$, so $G_\phi/\sqrt{EG}=2\cos\phi$, whose $\phi$-derivative is $-2\sin\phi$. Hence
$$K=-\frac{1}{2R^2\sin\phi}\,(-2\sin\phi+0)=\frac1{R^2}.$$

**Step 3 (curvature from circles).** A geodesic circle of radius $r$ (measured along the surface from the pole) sits at $\phi=r/R$ and has circumference $C(r)=2\pi R\sin(r/R)=2\pi r-\frac{\pi r^3}{3R^2}+O(r^5)$. Then $\frac3\pi\cdot\frac{2\pi r-C(r)}{r^3}\to\frac1{R^2}$. Equivalently, in geodesic polar coordinates $\sqrt G=R\sin(r/R)$ and $-(\sqrt G)_{rr}/\sqrt G=1/R^2$.

**Step 4 (total).** $dA=\sqrt{EG}\,d\phi\wedge d\theta=R^2\sin\phi\,d\phi\wedge d\theta$, so $\iint K\,dA=\int_0^{2\pi}\!\int_0^\pi\sin\phi\,d\phi\,d\theta=4\pi=2\pi\cdot\chi(S^2)$. (All steps checked with sympy, including the extrinsic computation $K=(LN-M^2)/(EG-F^2)=1/R^2$.) As a contrast, the metric $dr^2+\sinh^2r\,d\theta^2$ gives $K=-(\sinh r)''/\sinh r=-1$: the hyperbolic plane.

### Example 2: The gradient in polar coordinates
On the plane in polar coordinates, $g=dr^2+r^2\,d\theta^2$, so $(g_{ij})=\operatorname{diag}(1,r^2)$ and $(g^{ij})=\operatorname{diag}(1,1/r^2)$. Take $f=x=r\cos\theta$.

**Step 1.** $df=\cos\theta\,dr-r\sin\theta\,d\theta$. Its components are $(\cos\theta,\,-r\sin\theta)$.

**Step 2 (raise the index).** $\nabla f=g^{rr}\partial_rf\,\partial_r+g^{\theta\theta}\partial_\theta f\,\partial_\theta=\cos\theta\,\partial_r-\frac{\sin\theta}{r}\,\partial_\theta$.

**Step 3 (check).** The constant field $\partial_x$, written in polar coordinates, is $\cos\theta\,\partial_r-\frac{\sin\theta}{r}\partial_\theta$, and indeed $\nabla x=\partial_x$. The naive answer "$\nabla f=(\cos\theta,-r\sin\theta)$ in the $(\partial_r,\partial_\theta)$ basis" is wrong: at $r=2$, $\theta=\pi/2$ it would give $-2\,\partial_\theta$, a vector of length $|{-2}|\cdot r=4$, while the true gradient of $x$ has length 1. Covector components and vector components agree only in an orthonormal basis (↩ S2E16).

### Example 3: Triangles on the unit sphere
**(a) The octant triangle** with vertices $(1,0,0)$, $(0,1,0)$, $(0,0,1)$: each angle is $90^\circ$, so the excess is $\frac{3\pi}2-\pi=\frac\pi2$, and the triangle is one eighth of the sphere: $\frac{4\pi}8=\frac\pi2$. ✓ (This is the ant's walk from the cold open.)

**(b) A "pizza slice" from the pole:** vertices $N$, and two equator points with longitudes $0$ and $\lambda$. Angles: $\pi/2$, $\pi/2$, and $\lambda$ at the pole. Excess $=\lambda$. Area: the slice is half of a lune of angle $\lambda$, so $\frac12\cdot2\lambda=\lambda$. ✓

**(c) Random triangles.** For two randomly chosen triangles, we computed the angles numerically and estimated the area by Monte Carlo (4 million random points): angles $(6.48^\circ,22.59^\circ,154.85^\circ)$ give excess $0.0684$ vs. area $\approx0.0682$; angles $(166.44^\circ,164.17^\circ,172.30^\circ)$ give excess $5.636$ vs. area $\approx5.638$. Agreement to Monte Carlo accuracy.

### Example 4: The torus has total curvature zero
Parametrize $X(u,v)=\big((a+b\cos u)\cos v,(a+b\cos u)\sin v,b\sin u\big)$ with $a>b>0$.

**Step 1.** $E=b^2$, $F=0$, $G=(a+b\cos u)^2$, $\sqrt{EG}=b(a+b\cos u)$.

**Step 2.** $E_v=0$; $G_u=-2b\sin u\,(a+b\cos u)$, so $G_u/\sqrt{EG}=-2\sin u$, with $u$-derivative $-2\cos u$. Thus
$$K=-\frac{1}{2b(a+b\cos u)}(-2\cos u)=\frac{\cos u}{b(a+b\cos u)} .$$
$K>0$ on the outer half ($\cos u>0$, sphere-like), $K<0$ on the inner half (saddle-like).

**Step 3.** $\iint K\,dA=\int_0^{2\pi}\!\int_0^{2\pi}\frac{\cos u}{b(a+b\cos u)}\,b(a+b\cos u)\,du\,dv=\int_0^{2\pi}\!\int_0^{2\pi}\cos u\,du\,dv=0=2\pi\chi(T^2)$, matching $\chi(T^2)=0$ from S3E09.

### Example 5 (conceptual): The cylinder and the pizza
The cylinder $X(\theta,z)=(R\cos\theta,R\sin\theta,z)$ has $E=R^2$, $F=0$, $G=1$, all constant, so the formula gives $K=0$: it is locally isometric to the plane (unroll it). Gauss also explains the pizza trick: fold a slice along its length (making it curve one way), and $K=0$ forces the other principal curvature to vanish, so the tip can't droop.

## Visual and animation notes
1. **Cold open:** an ant (stylized, flat) walking on a globe: pole → equator, turn, along the equator, turn, back to the pole. Each turn leaves a glowing $90^\circ$ wedge; a counter sums to $270^\circ$.
2. **Metric:** **tangent spaces motif**: little translucent planes over a surface, each carrying its own unit circle (an ellipse in coordinates), ↩ S2E14's "different unit circles." The ellipses vary from point to point.
3. **Gradient:** a blue arrow $\nabla f$ rising perpendicular to orange level curves of $f$; the metric is shown as the "translator" between orange stacks and blue arrows (↩ S2E16).
4. **Extrinsic vs. intrinsic:** a sheet of paper with a triangle drawn on it rolls into a cylinder; the triangle's angles and side lengths are shown as **invariant badges** that do not change. Then the same sheet tries to wrap a ball and wrinkles.
5. **Key visual:** three triangles side by side on a sphere, a plane, and a saddle, with angle sums $>180^\circ$, $=180^\circ$, $<180^\circ$.
6. **Girard's proof:** three great circles on a translucent sphere; the six lunes light up in pairs of colors; the triangle and its antipode glow brighter, showing triple coverage.
7. **Global Gauss–Bonnet:** a sphere is dented and stretched into a potato; a color map of $K$ churns, but the "$\iint K\,dA=4\pi$" badge stays fixed. Then a torus: red (positive) outer half, blue (negative) inner half, cancelling to zero.
8. **Maps of the Earth:** the globe's chart patches (**manifold/charts motif**, ↩ S3E05) peel onto flat sheets and visibly tear or stretch; Mercator's Greenland swells.
9. **Spacetime teaser:** a grid of light cones tilting near a massive body; a satellite's orbit drawn as a geodesic.

## Common misconceptions
- **Misconception:** "A cylinder is curved, so its Gaussian curvature is nonzero." **Reality:** $K=\kappa_1\kappa_2=\frac1R\cdot0=0$. The cylinder is bent in space (extrinsically) but intrinsically flat.
- **Misconception:** "Geodesics are always the shortest paths." **Reality:** they are *locally* shortest. Going the long way around a great circle is a geodesic but not the shortest path between its endpoints.
- **Misconception:** "The gradient's components are the partial derivatives." **Reality:** that is $df$. The vector $\nabla f$ uses the inverse metric; components agree only in orthonormal coordinates.
- **Misconception:** "Curvature needs a surrounding space to curve into." **Reality:** that is the content of the Theorema Egregium: $K$ is computed from $g$ alone. Riemann's abstract manifolds never sit in any bigger space.
- **Misconception:** "Gauss–Bonnet says the curvature is constant." **Reality:** only the *total* is fixed by topology; the local curvature can be anything consistent with that total.

## Exercises
- **Warm-up:** (a) Find the area of a geodesic triangle on a sphere of radius $2$ with angles $80^\circ,70^\circ,60^\circ$. (b) Compute $K$ for the metric $g=du^2+\cosh^2u\,dv^2$. (c) What is the circumference of a circle of geodesic radius $\pi R/2$ on a sphere of radius $R$?
- **Core:** (a) Explain why no triangle on the sphere has angle sum exactly $180^\circ$, and why the ant can only detect curvature on large enough triangles in practice. (b) In the hyperbolic plane ($K=-1$), use local Gauss–Bonnet to show that every geodesic triangle has area less than $\pi$. (c) A surface has total curvature $-4\pi$. What is its Euler characteristic, and what orientable surface could it be?
- **Stretch:** (a) Use the geodesic-polar formula $K=-(\sqrt G)_{rr}/\sqrt G$ with $\sqrt G(0)=0$, $(\sqrt G)_r(0)=1$ to derive $C(r)=2\pi r-\frac\pi3Kr^3+O(r^4)$. (b) Prove that $3F=2E$ and the vertex-angle count in the global Gauss–Bonnet proof, and adapt the proof to a surface with geodesic boundary. (c) Show that there is no isometry from a region of the sphere to a region of the cylinder.

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) Excess $=210^\circ-180^\circ=30^\circ=\pi/6$; area $=R^2\cdot\pi/6=4\pi/6=2\pi/3$. (b) $\sqrt G=\cosh u$, $K=-(\cosh u)''/\cosh u=-1$. (c) $2\pi R\sin(\pi/2)=2\pi R$, the equator (versus $\pi^2R$ in the plane).
- **Core:** (a) Every triangle has positive area, and area $=$ excess; tiny triangles have tiny excess (proportional to area), below measurement error. (b) Angle sum $=\pi-\text{Area}$ and angle sums are positive, so area $<\pi$; triangles with vertices pushed off to infinity (ideal triangles) approach area exactly $\pi$. (c) $\chi=-2$; the genus-2 surface ($\chi=2-2g$).
- **Stretch:** (a) Taylor-expand $\sqrt G$ to third order: $(\sqrt G)_{rr}(0)=0$ because $\sqrt G$ is odd in $r$ for a smooth metric, and $(\sqrt G)_{rrr}(0)=-K(p)$ by differentiating $(\sqrt G)_{rr}=-K\sqrt G$; then $C(r)=\int_0^{2\pi}\sqrt G\,d\theta$. (b) Count (face, edge) incidences two ways; for a smooth geodesic boundary, angles at boundary vertices sum to $\pi$, not $2\pi$, and $3F=2E_{\text{int}}+E_{\text{bdry}}$; using $V_{\text{bdry}}=E_{\text{bdry}}$ on boundary circles, the count still gives $\iint K\,dA=2\pi\chi$ (with corners, add the exterior turning angles). (c) Isometries preserve $K$; $1/R^2\neq0$.
</details>

## Historical note
From 1818 to the mid-1820s, Gauss directed the geodetic survey of the Kingdom of Hanover, spending summers in the field measuring large triangles with a heliotrope he invented. His theoretical response was *Disquisitiones generales circa superficies curvas* (presented in 1827), which introduced the intrinsic viewpoint, the first fundamental form, and the Theorema Egregium, and proved the angle-excess theorem for geodesic triangles. (The popular story that Gauss used the Hohenhagen–Brocken–Inselsberg triangle to test whether *space* is Euclidean is disputed by historians.) The spherical excess formula for spherical triangles was known much earlier: Thomas Harriot found it around 1603 without publishing, and Albert Girard published it in 1629. Pierre Ossian Bonnet extended Gauss's theorem to regions with curved boundary in 1848. Bernhard Riemann's 1854 habilitation lecture, "Über die Hypothesen, welche der Geometrie zu Grunde liegen" (published 1868), generalized Gauss's intrinsic geometry to $n$ dimensions, the framework Einstein used for general relativity in 1915.

## Connections
- **Callbacks:** ↩ S2E09 (symmetric bilinear forms, Sylvester's signature), ↩ S2E14 (inner products: length is a choice), ↩ S2E16 (Riesz: gradient as a vector via the metric), ↩ S3E05 (charts; maps of the Earth; embedded vs. abstract), ↩ S3E06 (tangent spaces, $df$), ↩ S3E07 (area form, pullback), ↩ S3E09 (Euler characteristic).
- **Sets up:** ↪ S3E11 (invariant metrics on Lie groups: $SU(2)$ is the round 3-sphere), ↪ S3E12 (build vs. describe, final edition).
- **Side quests:** General relativity ("curvature = energy"; GPS), Information geometry (the Fisher metric on families of probability distributions), Fiber bundles and gauge theory (curvature of a connection).

## References
- **Primary / historical:** Carl Friedrich Gauss, *Disquisitiones generales circa superficies curvas* (Göttingen, 1827/1828); English translation *General Investigations of Curved Surfaces*, trans. J. C. Morehead and A. M. Hiltebeitel (1902; Dover reprint).
- **Primary / historical:** Bernhard Riemann, "Über die Hypothesen, welche der Geometrie zu Grunde liegen" (lecture 1854, published 1868).
- **Textbook:** Manfredo P. do Carmo, *Differential Geometry of Curves and Surfaces* (Prentice-Hall, 1976; 2nd ed. Dover, 2016), Ch. 4 "The Intrinsic Geometry of Surfaces," especially §4-3 (Gauss's theorem) and §4-5 (the Gauss–Bonnet theorem).
- **Textbook:** John M. Lee, *Introduction to Riemannian Manifolds*, 2nd ed. (Springer GTM 176, 2018), Ch. 2 "Riemannian Metrics" and Ch. 9 "The Gauss–Bonnet Theorem."
- **Accessible:** Tristan Needham, *Visual Differential Geometry and Forms* (Princeton, 2021), Acts II–III (the metric, curvature, and the global Gauss–Bonnet theorem).
- **Accessible:** David Hilbert and Stephan Cohn-Vossen, *Geometry and the Imagination* (Chelsea, 1952; translation of *Anschauliche Geometrie*, 1932), chapter on differential geometry.
- **Accessible:** Jeffrey R. Weeks, *The Shape of Space*, 2nd ed. (Marcel Dekker, 2002).
