# Season 1: What Is a Number?

**Arc:** We start from nothing, build counting, repair it again and again
until we reach ℝ and ℂ, find that infinity comes in sizes, and end by
realizing the building materials never mattered. Only the structure does.

**Season hook (cold open of Ep. 1):** three questions that sound easy but
aren't:
- Is 0.999… equal to 1? (answered in Ep. 9)
- Is √2 a number, or just a name for something we can't write down?
  (Eps. 7–8)
- Are there more fractions than whole numbers? (Ep. 11, where the surprising
  answer is no)

Each episode below lists: **Hook**, **Core ideas**, **Key visual**, and
**Payoff / callback**.

---

## Act I: Counting from Nothing

### Ep. 1: What Do We Mean by "Number"?
- **Hook:** the three questions above. A child "knows" what 3 is, but can
  anyone define it?
- **Core ideas:** the difference between *using* numbers and *defining* them.
  The goal of the season: build everything from as little as possible. A
  first look at "build vs. describe."
- **Key visual:** the number tower ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ shown as scaffolding
  with question marks on every floor.
- **Payoff:** a promise that by the end of the season every floor is built
  and every question is answered.

### Ep. 2: Peano: Zero and "Next"
- **Hook:** what is the *least* you need to know to count forever?
- **Core ideas:** the Peano axioms: 0 exists; every n has a successor S(n);
  0 is nobody's successor; S is injective; induction. Remove each axiom in
  turn and show the "broken" models that appear (a loop, a chain that
  merges, a stray second chain that induction rules out). Dedekind's
  theorem: with full (second-order) induction, every model looks like ℕ.
- **Key visual:** dominoes for induction; the stray chains as "ghost
  numbers" that induction deletes.
- **Payoff:** ℕ is pinned down by its *behavior*. That is the first time
  characterization beats construction.
- **Extension note:** first-order Peano arithmetic *does* allow non-standard
  models. Plant this in a sentence and come back to it in Ep. 13.

### Ep. 3: Arithmetic from Scratch
- **Hook:** if all you have is "next," where do + and × come from?
- **Core ideas:** recursive definitions: a + 0 = a, a + S(b) = S(a + b);
  multiplication as repeated addition; prove 2 + 2 = 4 by unwinding; prove
  commutativity of + by induction (the proof is harder than viewers expect,
  and that's the point). Order: a ≤ b iff some c has a + c = b.
- **Key visual:** a "recursion machine" unrolling S(S(0)) + S(S(0)).
- **Payoff:** every fact about whole-number arithmetic follows from five
  axioms.

### Ep. 4: Sets: The Universal Building Material
- **Hook:** can numbers themselves be built out of something simpler?
- **Core ideas:** naive sets; Russell's paradox (the set of all sets that
  don't contain themselves; the barber who shaves everyone who doesn't shave
  himself) and why we need rules (ZF, explained in plain language). Mention
  that Russell had his *own* fix (types), and that the full story is Ep. 14. The von Neumann construction: 0 = ∅, 1 = {∅}, 2 = {∅, {∅}},
  n + 1 = n ∪ {n}. It satisfies Peano.
- **Twist:** Zermelo built them differently (n + 1 = {n}), and that version
  also satisfies Peano. So which one is the "real" 2? This is Benacerraf's
  problem: the question doesn't matter, and that observation becomes the
  thesis of Act IV.
- **Key visual:** nested boxes growing like Russian dolls.
- **Payoff:** we can build ℕ from nothing. The empty set is enough.

---

## Act II: Repairing the Defects

### Ep. 5: The Master Tool: Equivalence Classes
- **Hook:** 1/2 and 2/4 are "the same," but written differently. What does
  "the same" mean?
- **Core ideas:** relations; reflexive, symmetric, transitive; partitions;
  the quotient set. Examples outside math first: same birthday, same
  remainder mod 12 (clocks).
- **Key visual:** points that blur together into "blobs"; each blob becomes
  a single new point. Reuse this visual every time a quotient appears in
  any season.
- **Payoff:** a machine for making new objects by declaring things equal.

### Ep. 6: Subtraction and Division: ℤ and ℚ
- **Hook:** 3 − 5 has no answer in ℕ. Instead of inventing "negative," we
  build it.
- **Core ideas:** ℤ as pairs (a, b) meaning "a − b," with (a, b) ~ (c, d) iff
  a + d = b + c. ℚ as pairs (p, q) with q ≠ 0, with (p, q) ~ (r, s) iff
  ps = qr. Check that operations don't depend on the representative ("well-
  definedness," the hidden trap). Note quietly that ℤ is a *ring* and ℚ is a
  *field*.
- **Key visual:** a lattice of pairs in the plane; the equivalence classes
  are diagonal lines (for ℤ) and lines through the origin (for ℚ).
- **Payoff:** negative numbers and fractions are no longer invented. They
  are constructed.

### Ep. 7: The Holes in ℚ
- **Hook:** the Pythagoreans' crisis: the diagonal of a unit square.
- **Core ideas:** proof that √2 is irrational. ℚ is *dense* (there's a
  fraction between any two) but full of holes: the set {q : q² < 2} has no
  least upper bound in ℚ. Sequences that "should" converge but have nowhere
  to go.
- **Key visual:** zoom into the rational number line forever and keep
  finding gaps. It looks continuous but isn't.
- **Payoff:** we need a new floor, and it requires a new idea (limits).

### Ep. 8: Building ℝ, Twice
- **Hook:** how do you fill a hole you can't point to?
- **Core ideas:** Dedekind cuts (a real number *is* the hole, described by
  what lies to its left) and Cauchy sequences (a real number *is* the class
  of sequences homing in on it; Ep. 5's tool again). Two very different
  constructions give the same thing: the unique **complete ordered field**.
  Completeness (the least upper bound property) is the axiom that matters.
- **Key visual:** split screen: a knife cutting the line vs. a swarm of
  points converging.
- **Payoff:** "build vs. describe" again: two constructions, one
  description.
- **Seed for Season 2 Part B:** the Cauchy-sequence construction works for
  *any* space with a distance. Applied to spaces of functions, it produces
  Banach and Hilbert spaces (S2 Ep. 23).

### Ep. 9: 0.999… = 1, and What Decimals Really Are
- **Hook:** the internet's favorite argument.
- **Core ideas:** decimals are *names* for real numbers (limits of
  sequences), and some numbers have two names. Archimedean property; no
  infinitesimals in ℝ.
- **Payoff:** answers the cold-open question. Teaser: there *are* number
  systems with infinitesimals (hyperreals, surreals; see side quests).

### Ep. 10: ℂ: Numbers as Rotations
- **Hook:** x² + 1 = 0 has no solution. Fix it the same way we fixed
  everything else.
- **Core ideas:** ℂ as pairs of reals with a clever multiplication;
  multiplication by i is a quarter turn; multiplying complex numbers =
  scaling and rotating. What we gain: the Fundamental Theorem of Algebra
  (every polynomial has a root). What we lose: ordering. ℂ can't be an
  ordered field.
- **Key visual:** the plane spinning under multiplication by i.
- **Payoff:** the tower is complete, and there's nothing left to fix
  *algebraically*. Every extension cost something; keep a ledger of "what
  we lost," which returns in the Cayley–Dickson side quest.
- **Seed for Season 2:** "multiplication by a complex number is a linear
  map of the plane." A rotation has no real eigenvector, which is why
  eigenvalues need ℂ.

---

## Act III: Infinity and the Foundations Crisis (Cantor, Russell, Gödel)

*(Placement note: Act III can go before Ep. 10 if you want ℂ next to the
algebra in Act IV. Keeping it here gives a "palate cleanser" between the
construction acts.)*

### Ep. 11: Hilbert's Hotel: Counting Without Numbers
- **Hook:** are there more even numbers than whole numbers?
- **Core ideas:** "same size" = there is a bijection. ℕ ~ evens ~ ℤ ~ ℕ×ℕ
  (the Cantor pairing function) ~ ℚ (the Calkin–Wilf tree lists every
  positive rational exactly once).
- **Key visual:** hotel guests shuffling rooms; the zig-zag through the
  grid ℕ×ℕ.
- **Payoff:** answers the cold-open question: there are exactly as many
  fractions as whole numbers.

### Ep. 12: The Diagonal Argument
- **Hook:** so is *everything* countable?
- **Core ideas:** Cantor's diagonal argument: ℝ is uncountable. Cantor's
  theorem: |P(S)| > |S| for any set, so there's an endless ladder of
  infinities. The same trick, in different settings: Russell's paradox,
  the Liar, Gödel's incompleteness, the halting problem.
- **Key visual:** the diagonal of an infinite table lighting up and
  flipping.
- **Payoff:** almost every real number can't be described, computed, or
  named. There are only countably many descriptions.

### Ep. 13: Counting Past Infinity: Ordinals
- **Hook:** what comes after 0, 1, 2, …?
- **Core ideas:** ordinals as "positions in line" vs. cardinals as "how
  many." ω, ω+1, ω·2, ω², ω^ω, ε₀. The von Neumann construction from Ep. 4
  continues naturally past ℕ. **Goodstein's theorem:** a sequence that
  explodes in size but always comes back to 0. It is true, yet *unprovable
  in Peano arithmetic*; the proof needs ordinals up to ε₀.
- **Key visual:** the "matchstick" picture of ordinals spiraling toward ε₀.
- **Payoff:** a full-circle callback to Ep. 2. Peano's axioms pin down ℕ,
  but they can't prove everything that's true about it. (Non-standard
  models, mentioned in Ep. 2, explain why: in some of them the Goodstein
  sequence never reaches 0.)

### Ep. 14: Russell's Dream: Is Mathematics Just Logic?
- **Hook:** June 1902. Frege is about to publish the second volume of his
  life's work, which reduces arithmetic to pure logic. A letter arrives
  from a 29-year-old Bertrand Russell. Frege replies that "arithmetic
  totters."
- **Core ideas:**
  - **Logicism:** the program (Frege, then Russell) of deriving all of
    mathematics from logic alone, with no special mathematical axioms.
  - **The Frege–Russell definition of number:** two collections have the
    same number if they can be matched one-to-one (cups and saucers;
    Hume's principle). The number 2 *is* the class of all pairs, and 3 is
    the class of all triples. This is a *third* answer to "what is 2?",
    next to von Neumann's and Zermelo's from Ep. 4, and it previews Cantor's
    bijections from Ep. 11.
  - **How the paradox breaks it:** Frege's logic let any property define a
    set (unrestricted comprehension); "doesn't contain itself" breaks it.
    Russell found related paradoxes, such as the Berry paradox: "the smallest
    number not definable in under sixty letters" (a cousin of Ep. 12's
    diagonal argument).
  - **Russell's fix, the theory of types:** sets come in levels, and a set
    can only contain things from lower levels, so "a set containing itself"
    can't even be written. The *vicious circle principle*: nothing may be
    defined in terms of a totality that includes itself.
  - ***Principia Mathematica*** (Russell & Whitehead, 1910–13): three huge
    volumes. The proof that 1 + 1 = 2 is completed hundreds of pages in,
    with the comment "the above proposition is occasionally useful." The
    weak points: the axioms of infinity and reducibility don't look like
    pure logic.
  - **The three schools** of the foundations crisis: logicism (Frege,
    Russell): math is logic. Formalism (Hilbert): math is a game with
    symbols, and we must prove the game is consistent. Intuitionism
    (Brouwer): only what can be constructed exists, and the law of
    excluded middle is suspect.
- **Extrapolation:** Russell's types live on in computer science. Type
  systems in programming languages, the Curry–Howard correspondence
  ("proofs are programs"), and proof assistants like Lean and Coq, where
  mathematicians today write proofs a computer checks, Principia-style.
- **Key visual:** a tower of levels (individuals, sets of individuals, sets
  of sets, …), with an arrow trying to loop back to its own level and being
  blocked.
- **Payoff:** Russell's dream sets up the question for the next episode:
  can *any* system of rules capture all of mathematics?
- **Quote for the end card:** Russell: "Mathematics may be defined as the
  subject in which we never know what we are talking about, nor whether
  what we are saying is true." It fits the series' thesis that structure
  matters, not substance.

### Ep. 15: The Limits of the Axioms
- **Hook:** is there an infinity between ℕ and ℝ?
- **Core ideas:**
  - **Gödel's incompleteness theorems (1931):** any consistent system strong
    enough for arithmetic has true statements it can't prove (the diagonal
    trick from Ep. 12 applied to proofs), and it can't prove its own
    consistency. This ends the full ambitions of both Principia and
    Hilbert's program (Ep. 14), and explains Goodstein (Ep. 13).
  - **The Continuum Hypothesis:** Gödel (1940) and Cohen (1963) showed it
    can be neither proved nor disproved from ZFC.
  - **The Axiom of Choice:** obvious for finite sets, strange for infinite
    ones. Russell's own illustration: from infinitely many pairs of shoes
    you can pick one from each pair ("take the left one"), but from
    infinitely many pairs of socks you need Choice. Then Banach–Tarski as a
    teaser, and a well-ordering of ℝ that nobody can write down.
- **Payoff:** mathematics has *choices* built into its foundations. Seed
  for Season 2: every vector space has a basis, *if you accept Choice*.

---

## Act IV: Forget What It Is, Keep What It Does (Abstract Algebra)

### Ep. 16: Groups: The Mathematics of Symmetry
- **Hook:** a square has 8 symmetries; a clock has 12 positions. Same kind
  of structure?
- **Core ideas:** the group axioms (closure, associativity, identity,
  inverses) discovered by looking at examples (rotations, ℤ under +, ℚ\{0}
  under ×, permutations, Rubik's cube moves). Abelian vs. non-abelian.
- **Key visual:** a square flipping and turning; a Cayley table as a sudoku.
- **Payoff:** ℤ under + is "the group freely generated by one element."
  Counting itself is a group-theoretic idea.

### Ep. 17: Maps Between Groups and Quotient Groups
- **Hook:** when are two groups "really the same"?
- **Core ideas:** homomorphisms and isomorphisms; subgroups and cosets;
  Lagrange's theorem; normal subgroups; quotient groups (ℤ/nℤ, using Ep. 5's
  tool again); the First Isomorphism Theorem (G/ker φ ≅ im φ). Cayley's
  theorem: every group is a group of permutations.
- **Payoff:** the isomorphism theorem comes back unchanged as rank–nullity
  in Season 2.

### Ep. 18: Rings: Adding *and* Multiplying
- **Hook:** ℤ, polynomials, matrices, and clock arithmetic all let you add
  and multiply. What do they share?
- **Core ideas:** ring axioms; zero divisors (in ℤ/6ℤ, 2 · 3 = 0); units;
  ideals as "generalized multiples"; quotient rings. The story of unique
  factorization: in ℤ[√−5], 6 = 2 · 3 = (1 + √−5)(1 − √−5). Kummer and
  Dedekind invented ideals to rescue it.
- **Payoff:** ℤ/nℤ and ℝ[x]/(x² + 1) are both quotient rings, and the
  second one is ℂ. Ep. 10's construction, seen again from a new angle.

### Ep. 19: Fields, and the Impossible Constructions
- **Hook:** for 2,000 years, nobody could trisect an angle with straightedge
  and compass. Why not?
- **Core ideas:** fields: ℚ, ℝ, ℂ, ℤ/pℤ = 𝔽ₚ, and finite fields 𝔽_{p^n}
  (exactly one of each prime-power size). Field extensions; the degree
  [K : F] *is the dimension of K as a vector space over F*. Constructible
  numbers live in extensions of degree 2^k; cos 20° satisfies an
  irreducible cubic, so a 60° angle can't be trisected. The same argument
  rules out doubling the cube.
- **Payoff:** a brief appearance of linear algebra inside number theory,
  used deliberately as a bridge to Season 2.

### Ep. 20: Season Finale: Galois and the Symmetry of Roots
- **Hook:** there's a formula for quadratics, cubics, and quartics. Why
  none for degree 5?
- **Core ideas (at a story level, not a full proof):** permuting the roots
  of a polynomial gives a group; "solvable by radicals" ↔ "solvable group";
  S₅ isn't solvable. Galois's story (dead at 20).
- **Finale montage:** go back up the number tower and label every floor
  with its structure: ℕ (a commutative monoid; characterized by Peano), ℤ
  (a ring), ℚ (the smallest field containing ℤ), ℝ (the complete ordered
  field), ℂ (the algebraic closure of ℝ). The building materials (sets,
  pairs, cuts) have faded away. Only the structure is left.
- **Payoff:** "A number is whatever behaves like one." Hand off to Season 2:
  *"Now that we know what fields are, let's see what you can build on top of
  them."*
