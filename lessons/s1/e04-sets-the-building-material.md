# S1E04: Sets: The Universal Building Material

> **Season / Act:** Season 1 ("What Is a Number?"), Act I: Counting from Nothing · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E02 (Peano axioms, isomorphism, Dedekind's theorem), S1E03 (arithmetic from "next"); basic set notation ($\in$, $\subseteq$, $\cup$) ·
> **Builds toward:** S1E05–S1E06 (relations and pairs, built from sets), S1E11–S1E13 (Cantor, ordinals), S1E14 (Russell's types), S1E15 (the Axiom of Choice), S1E20 (structure over substance)

## Learning objectives
By the end of this lesson the viewer can:
1. State the naive comprehension principle and derive Russell's paradox from it, in full.
2. Describe the axioms of ZF in plain language, and explain how the Separation axiom avoids Russell's paradox.
3. Build the von Neumann natural numbers $0 = \varnothing$, $n + 1 = n \cup \lbrace n \rbrace$, compute the first few explicitly, and prove that they satisfy the Peano axioms.
4. Build the Zermelo natural numbers ($n + 1 = \lbrace n \rbrace$), and explain Benacerraf's problem: which of the two is "really" the number 2?
5. Explain why that question doesn't matter for doing mathematics (Dedekind's categoricity theorem, ↩ S1E02).

## Cold open
We've described the natural numbers by how they behave: a zero, a "next," and induction. But a description isn't a thing. If someone asks "fine, but what *is* the number 2?", we still have nothing to hand them.

So let's try to build numbers out of something simpler. What's the simplest thing there is?

How about: nothing. An empty bag. Call it zero.

Now put that empty bag inside another bag. That bag isn't empty: it contains one thing, the empty bag. Call it one. Now make a bag containing both of those: the empty bag, and the bag-with-the-empty-bag. It has two things in it. Call it two.

Keep going, bags inside bags like Russian dolls, and you can build every natural number from literally nothing.

But there's a catch, and it nearly brought down mathematics. When you allow "bags of anything," you can describe a bag that can't exist, a bag that contains itself exactly when it doesn't. To build safely, we first need rules for what bags are allowed.

And once we've built our numbers, a second surprise is waiting. There's another, equally good way to stack the dolls. Which one is the *real* number 2?

## The story

### 1. Naive sets

Georg Cantor, who created set theory in the 1870s–1890s, described a set as a gathering of definite, distinct objects into a whole. Two principles capture the naive idea.

> **Extensionality.** Two sets are equal if and only if they have the same elements:
> $$A = B \iff \forall x\,(x \in A \leftrightarrow x \in B).$$

> **Naive comprehension.** For any property $P(x)$, there is a set $\lbrace x : P(x) \rbrace$ whose elements are exactly the things with property $P$.

Extensionality says a set *is* nothing more than its members: $\lbrace 1, 2 \rbrace = \lbrace 2, 1 \rbrace = \lbrace 1, 1, 2 \rbrace$. Comprehension says every property defines a set: the set of even numbers, the set of red things, the set of all sets.

These seem harmless. They're not.

### 2. The crisis: Russell's paradox

Some sets are members of themselves (if there is a set of all sets, it's a set, so it contains itself). Most aren't: the set of all teacups is not a teacup. Apply naive comprehension to the property "is not a member of itself."

> **Theorem (Russell's paradox).** Naive comprehension is inconsistent.

*Proof.* By naive comprehension, there is a set
$$R = \lbrace x : x \notin x \rbrace .$$
By definition of $R$, for every $x$: $x \in R \iff x \notin x$. This holds for *every* $x$, so in particular for $x = R$:
$$R \in R \iff R \notin R .$$
If $R \in R$, then the right side says $R \notin R$; if $R \notin R$, then the left side says $R \in R$. Either way we have a contradiction. ∎

The proof uses nothing but the definition of $R$. There's no way around it while keeping naive comprehension.

**The barber.** A popular version: in a village, the barber shaves exactly those men who do not shave themselves. Does the barber shave himself? If he does, he doesn't; if he doesn't, he does. But notice the difference. For the barber, the conclusion is simply *there is no such barber*. Nobody promised us he existed. Naive comprehension *does* promise that $R$ exists. That promise is what has to go.

**Why it mattered.** Frege had built arithmetic on a logical system containing a principle equivalent to naive comprehension. Russell's discovery, communicated in a letter of 1902, showed that system to be inconsistent (the full story is ↪ S1E14). Russell's own repair was the **theory of types**, in which sets come in levels and "$x \in x$" can't even be written. Mainstream mathematics went a different way: Zermelo's axioms.

### 3. The fix: rules for building sets (ZF in plain language)

The modern foundation is **ZF**, Zermelo–Fraenkel set theory (with the Axiom of Choice added, **ZFC**). The key idea: you may not form "the set of *all* things with property $P$." You may only **carve a subset out of a set you already have**, or build new sets from old ones in a few specified ways. Here are the axioms, informally.

1. **Extensionality.** Sets with the same elements are equal.
2. **Empty set.** There is a set with no elements, $\varnothing$. (By extensionality, there's only one.)
3. **Pairing.** For any $a, b$, there's a set $\lbrace a, b\rbrace$. (With $a = b$, this gives $\lbrace a \rbrace$.)
4. **Union.** For any set $A$, there's a set $\bigcup A$ whose elements are the elements of elements of $A$. (With pairing, this gives $A \cup B$.)
5. **Power set.** For any set $A$, there's a set $\mathcal{P}(A)$ of all subsets of $A$.
6. **Separation.** For any set $A$ and property $P$, there's a set $\lbrace x \in A : P(x) \rbrace$.
7. **Infinity.** There is an **inductive** set: one containing $\varnothing$ and closed under $x \mapsto x \cup \lbrace x \rbrace$.
8. **Replacement.** The image of a set under a definable operation is a set.
9. **Foundation (Regularity).** Every nonempty set $A$ has an element $y$ with $y \cap A = \varnothing$. (Consequences: no set is a member of itself, and there are no loops $a \in b \in a$.)
10. **Choice** (the "C" in ZFC). Every collection of nonempty sets has a function choosing one element from each. (Discussed in ↪ S1E15.)

Separation is the safe replacement for comprehension, and it turns Russell's argument from a paradox into a theorem.

> **Theorem.** For every set $A$, the set $R_A = \lbrace x \in A : x \notin x \rbrace$ is not an element of $A$. Consequently, **there is no set of all sets.**

*Proof.* Suppose $R_A \in A$. Then by definition of $R_A$, $R_A \in R_A \iff (R_A \in A \text{ and } R_A \notin R_A) \iff R_A \notin R_A$, a contradiction. So $R_A \notin A$. If $V$ were a set containing every set, then $R_V \in V$, contradicting what we just proved. ∎

So Russell's argument survives, but now it proves something harmless: no set contains everything.

In ZF, *everything is a set*, and every set is ultimately built from $\varnothing$ by these operations. Numbers, pairs, functions, and later ℤ, ℚ, ℝ will all be particular sets.

### 4. The construction: von Neumann's numbers

Here is the "Russian doll" construction, due to John von Neumann (1923).

> **Definition (von Neumann numerals).** Define the **successor** of a set $x$ to be $x^+ = x \cup \lbrace x \rbrace$. Then
> $$0 = \varnothing,\quad 1 = 0^+ = \lbrace 0 \rbrace,\quad 2 = 1^+ = \lbrace 0, 1 \rbrace,\quad 3 = 2^+ = \lbrace 0, 1, 2 \rbrace,\ \dots$$

Each number is **the set of all the numbers before it**: $n = \lbrace 0, 1, \dots, n-1 \rbrace$. So $n$ has exactly $n$ elements, which is a pleasing sanity check.

To collect *all* of them into one set we need the Axiom of Infinity. Call a set $I$ **inductive** if $\varnothing \in I$ and $x \in I \Rightarrow x^+ \in I$. Infinity says an inductive set exists. Take one, $I_0$, and define
$$\omega = \lbrace x \in I_0 : x \text{ belongs to every inductive set} \rbrace,$$
which is a set by Separation. Then $\omega$ is inductive, and it's contained in every inductive set: it's the **smallest** inductive set. Its elements are the von Neumann natural numbers.

> **Theorem.** $(\omega, \varnothing, x \mapsto x^+)$ is a Peano structure.

*Proof.*
- **(P1), (P2):** $\varnothing \in \omega$, and $\omega$ is closed under $^+$, because $\omega$ is inductive.
- **(P3):** $n^+ = n \cup \lbrace n \rbrace$ contains $n$, so it is nonempty; hence $n^+ \ne \varnothing$.
- **(P5):** let $A \subseteq \omega$ with $\varnothing \in A$ and $A$ closed under $^+$. Then $A$ is inductive, so $\omega \subseteq A$ (since $\omega$ is contained in every inductive set). Hence $A = \omega$. Induction is built into the very definition of $\omega$.
- **(P4):** suppose $n^+ = m^+$. Since $n \in n^+ = m^+ = m \cup \lbrace m \rbrace$, either $n = m$ or $n \in m$. Likewise, either $m = n$ or $m \in n$. If $n \ne m$, then $n \in m$ and $m \in n$, which the Axiom of Foundation forbids (apply it to the set $\lbrace n, m \rbrace$: one of its elements must be disjoint from it, but $m \in n \cap \lbrace n, m\rbrace$ and $n \in m \cap \lbrace n, m\rbrace$). So $n = m$. ∎

(Foundation can be avoided here, at the cost of a slightly longer induction showing that each $n \in \omega$ is a transitive set with $n \notin n$.)

By Dedekind's theorem (↩ S1E02), this structure *is* ℕ, up to isomorphism. All of ↩ S1E03's arithmetic now runs on sets. We have built the natural numbers from nothing.

The von Neumann numbers have lovely extra features:
- **Order is membership:** $m < n \iff m \in n \iff m \subsetneq n$.
- **The successor of $n$ has one more element than $n$.**
- **The construction keeps going.** The set $\omega$ itself is the first infinite "number," and $\omega^+ = \omega \cup \lbrace \omega \rbrace$ comes after it. That's where ordinals come from (↪ S1E13).

### 5. The twist: Zermelo's numbers, and Benacerraf's problem

In his 1908 axioms, Ernst Zermelo used a different successor:

> **Definition (Zermelo numerals).** $0 = \varnothing$ and $n + 1 = \lbrace n \rbrace$. So
> $$0 = \varnothing,\quad 1 = \lbrace \varnothing \rbrace,\quad 2 = \lbrace\lbrace \varnothing \rbrace\rbrace,\quad 3 = \lbrace\lbrace\lbrace \varnothing \rbrace\rbrace\rbrace,\ \dots$$

These also satisfy the Peano axioms. (P3): $\lbrace n \rbrace$ is never empty. (P4): if $\lbrace n \rbrace = \lbrace m \rbrace$ then $n = m$ by extensionality. (P5) holds for the smallest set closed under the operation, just as before.

So now we have two perfectly good constructions of ℕ. They agree on $0$ and $1$ and disagree from $2$ on. Ask a "factual" question:

> **Is $1 \in 3$?**
> - Von Neumann: $3 = \lbrace 0, 1, 2 \rbrace$. Yes.
> - Zermelo: $3 = \lbrace 2 \rbrace$. No.

If numbers really *were* sets, this would be a fact about the number 3 with a definite answer. In 1965 the philosopher Paul Benacerraf pressed exactly this point in "What Numbers Could Not Be." Nothing in arithmetic favors one construction over the other. Both give the same arithmetic, because by Dedekind's theorem they are isomorphic. Benacerraf concluded that numbers can't be identified with any particular sets at all. What matters about 3 is its *position* in the structure: it comes after 2 and before 4, and $3 + 1 = 4$, and so on.

This is a sharp form of the series' thesis: **an object is defined by what you can do with it, not by what it is made of.** For doing mathematics, the question "which set is 2?" is like asking which piece of wood is "the real" chess knight. We'll meet a third answer to "what is 2?" (Frege and Russell: the class of all pairs) in ↪ S1E14, and the thesis becomes the whole point of Act IV (↪ S1E16–S1E20).

### 6. Payoff
We started with the empty set and nothing else. Using a handful of safe building rules, we constructed a set $\omega$ satisfying all of Peano's axioms. So ℕ, and with it all of the arithmetic from ↩ S1E03, can be built from nothing. And the construction method (sets) is powerful enough to build everything else in this season: pairs, relations, ℤ, ℚ, ℝ, ℂ.

**Build or describe?** Peano's axioms *describe* ℕ. Von Neumann and Zermelo *build* it, in two incompatible ways. Dedekind's theorem says both builds match the description. The description is what we actually use.

## Worked examples

### Example 1: building von Neumann's 0 through 4
Apply $x^+ = x \cup \lbrace x \rbrace$ repeatedly, writing everything in terms of $\varnothing$ alone:
- $0 = \varnothing$.
- $1 = 0 \cup \lbrace 0 \rbrace = \varnothing \cup \lbrace \varnothing \rbrace = \lbrace \varnothing \rbrace$.
- $2 = 1 \cup \lbrace 1 \rbrace = \lbrace \varnothing \rbrace \cup \lbrace \lbrace \varnothing \rbrace \rbrace = \lbrace \varnothing, \lbrace\varnothing\rbrace \rbrace$.
- $3 = 2 \cup \lbrace 2 \rbrace = \lbrace \varnothing, \lbrace\varnothing\rbrace, \lbrace \varnothing, \lbrace\varnothing\rbrace\rbrace \rbrace$.
- $4 = 3 \cup \lbrace 3 \rbrace = \lbrace 0, 1, 2, 3 \rbrace$: its four elements are exactly the four sets above.

**Counting elements:** $|0| = 0$, $|1| = 1$, $|2| = 2$, $|3| = 3$, $|4| = 4$. ✓

**Checking order as membership and as inclusion,** for $2$ and $3$:
- $2 \in 3$? The elements of 3 are $\varnothing$, $\lbrace \varnothing\rbrace$, and $\lbrace \varnothing, \lbrace\varnothing\rbrace\rbrace = 2$. Yes. ✓
- $2 \subseteq 3$? The elements of 2 are $\varnothing$ and $\lbrace \varnothing \rbrace$, both elements of 3. Yes, and $3 \ne 2$, so $2 \subsetneq 3$. ✓
- $3 \in 2$? The elements of 2 are $\varnothing$ and $\lbrace\varnothing\rbrace$, neither of which equals 3 (they have 0 and 1 elements; 3 has 3). No. ✓

**Bonus:** $\bigcup 3 = 0 \cup 1 \cup 2 = \varnothing \cup \lbrace 0 \rbrace \cup \lbrace 0, 1\rbrace = \lbrace 0, 1 \rbrace = 2$. Taking the union "steps back" one: $\bigcup (n^+) = n$.

(These set computations were checked with a short Python script using `frozenset`, which also confirmed $m \in n \iff m < n \iff m \subsetneq n$ for all $m, n \le 5$.)

### Example 2: Zermelo versus von Neumann, side by side
| $n$ | von Neumann | elements | Zermelo | elements |
|---|---|---|---|---|
| 0 | $\varnothing$ | 0 | $\varnothing$ | 0 |
| 1 | $\lbrace \varnothing \rbrace$ | 1 | $\lbrace\varnothing\rbrace$ | 1 |
| 2 | $\lbrace \varnothing, \lbrace\varnothing\rbrace \rbrace$ | 2 | $\lbrace\lbrace\varnothing\rbrace\rbrace$ | 1 |
| 3 | $\lbrace \varnothing, \lbrace\varnothing\rbrace, \lbrace\varnothing,\lbrace\varnothing\rbrace\rbrace \rbrace$ | 3 | $\lbrace\lbrace\lbrace\varnothing\rbrace\rbrace\rbrace$ | 1 |

**Questions that get different answers:**
- "Does $n$ have $n$ elements?" Von Neumann: always. Zermelo: only for $n = 0, 1$; every Zermelo number from 1 on has exactly one element.
- "Is $1 \in 3$?" Von Neumann: yes. Zermelo: $3 = \lbrace 2 \rbrace$, whose only element is $2 \ne 1$. No.
- "Is $\varnothing \in 2$?" Von Neumann: yes. Zermelo: $2 = \lbrace 1 \rbrace = \lbrace\lbrace\varnothing\rbrace\rbrace$, and $\lbrace\varnothing\rbrace \ne \varnothing$. No.

**The isomorphism between them.** Define $h$ from von Neumann's $\omega$ to Zermelo's numbers by recursion: $h(\varnothing) = \varnothing$ and $h(n \cup \lbrace n\rbrace) = \lbrace h(n) \rbrace$. So $h$ sends von Neumann's 2 to Zermelo's 2, and so on. It's a bijection that respects 0 and successor, exactly as Dedekind's theorem promises. Every *arithmetic* statement, such as $2 + 2 = 4$, is true in one exactly when it's true in the other. Only the "set-theoretic gossip" (like $1 \in 3$) differs.

### Example 3: Separation defeats Russell, on a small set
Let $A = \lbrace \varnothing, \lbrace\varnothing\rbrace, \lbrace\lbrace\varnothing\rbrace\rbrace \rbrace$ (that's $0$, $1$, and Zermelo's $2$).

**Compute $R_A = \lbrace x \in A : x \notin x \rbrace$.** Check each element:
- $x = \varnothing$: is $\varnothing \in \varnothing$? No (the empty set has no elements). So $\varnothing \in R_A$.
- $x = \lbrace\varnothing\rbrace$: its only element is $\varnothing \ne \lbrace\varnothing\rbrace$. So $x \notin x$, and $x \in R_A$.
- $x = \lbrace\lbrace\varnothing\rbrace\rbrace$: its only element is $\lbrace\varnothing\rbrace \ne x$. So $x \in R_A$.

So $R_A = A$.

**Is $R_A \in A$?** That would mean $A \in A$, i.e. $A$ is one of $\varnothing$, $\lbrace\varnothing\rbrace$, $\lbrace\lbrace\varnothing\rbrace\rbrace$. But $A$ has three elements and those have 0, 1, and 1. So $R_A \notin A$, exactly as the theorem in §3 predicts. Russell's set always lives *outside* the set you carved it from. There's no contradiction, just a new set.

### Example 4: pairs from sets (preparing for S1E05–S1E06)
Next episode we'll need **ordered pairs** $(a, b)$, where order matters: $(1, 2) \ne (2, 1)$. Sets don't care about order, so how can we build pairs? Kuratowski's definition (1921):
$$(a, b) := \lbrace \lbrace a \rbrace, \lbrace a, b \rbrace \rbrace.$$

**Compute $(0, 1)$ with von Neumann numerals:** $(0,1) = \lbrace \lbrace 0 \rbrace, \lbrace 0, 1 \rbrace \rbrace = \lbrace 1, 2 \rbrace$, since $\lbrace 0 \rbrace = 1$ and $\lbrace 0, 1 \rbrace = 2$. A cute coincidence: the pair $(0, 1)$ *is* the set $\lbrace 1, 2\rbrace$.

**Compute $(1, 0)$:** $\lbrace \lbrace 1 \rbrace, \lbrace 1, 0 \rbrace \rbrace = \lbrace \lbrace 1 \rbrace, 2 \rbrace$. Since $\lbrace 1 \rbrace = \lbrace\lbrace\varnothing\rbrace\rbrace$ is not $1 = \lbrace\varnothing\rbrace$, we get $(1, 0) \ne (0, 1)$. ✓

**The key property:** $(a, b) = (c, d) \iff a = c$ and $b = d$. *Sketch:* the intersection of the elements of $(a, b)$ is $\lbrace a \rbrace \cap \lbrace a, b \rbrace = \lbrace a \rbrace$, which recovers $a$; then $b$ is the element of $\lbrace a, b\rbrace$ that isn't $a$ (or $b = a$ if $\lbrace a, b \rbrace$ is a singleton). Once again: what matters is the *property*, not the particular sets used to build it.

## Visual and animation notes
1. **Cold open:** an empty translucent box labeled 0. A second box swallows it (1). A third box swallows both (2). Russian dolls grow, but each new doll contains *all* the earlier ones side by side, not just the last (key visual: nested boxes).
2. **Russell's paradox:** a giant box labeled "all sets that don't contain themselves" trying to decide whether to step inside itself. It flickers in and out, then shatters.
3. **The barber** (10 s): a barber chair with a question mark; a stamp "No such barber," contrasted with "Naive comprehension: R exists," which cracks.
4. **ZF as a builder's toolkit:** each axiom as a tool on a pegboard (pairing tongs, union funnel, power-set copier, separation sieve, infinity conveyor). The Separation sieve is highlighted: it only filters sets you already have.
5. **"No set of all sets":** the sieve applied to any box $A$ produces $R_A$, which pops out *beside* $A$, never inside.
6. **von Neumann's ω:** the conveyor belt of $x \mapsto x \cup \lbrace x\rbrace$ producing dolls 0, 1, 2, 3, …; a bracket closes around all of them, labeled ω.
7. **Zermelo's version:** a second conveyor wrapping each box in exactly one new box (a single tall stack). Split screen with von Neumann's.
8. **Benacerraf's question:** "Is 1 ∈ 3?" Left screen lights up "yes," right screen "no." Then **threads** connect the two chains (recurring motif **Bijection / isomorphism**) and they slide onto each other; the "1 ∈ 3?" label fades as irrelevant.
9. **"Build or Describe?" segment:** left, two different builds; right, the five Peano axioms; both builds get a checkmark against the description.
10. **Teaser:** two fractions, $\tfrac12$ and $\tfrac24$, glowing with "same?" between them.

## Common misconceptions
- **Misconception:** "Russell's paradox shows set theory is inconsistent." **Reality:** It shows *naive comprehension* is inconsistent. ZF replaces it with Separation, and no contradiction is known in ZF (although, by Gödel, ZF can't prove its own consistency; ↪ S1E15).
- **Misconception:** "The barber paradox is a genuine paradox." **Reality:** It just proves no such barber exists. Russell's paradox is sharper because naive comprehension *guarantees* the set exists.
- **Misconception:** "Mathematicians believe 2 really is $\lbrace \varnothing, \lbrace \varnothing \rbrace\rbrace$." **Reality:** The von Neumann construction is a convenient standard *model*. Most mathematicians care only that some model exists and that all models are isomorphic.
- **Misconception:** "$\varnothing$ and $\lbrace\varnothing\rbrace$ are the same, since both are 'empty'." **Reality:** $\varnothing$ has no elements; $\lbrace\varnothing\rbrace$ has one element (the empty set). That difference is exactly what lets us build 1 from 0.
- **Misconception:** "Russell's types are what fixed set theory." **Reality:** Type theory was Russell's own fix, and it lives on in logic and computer science (↪ S1E14). Mainstream mathematics adopted Zermelo's axioms instead.

## Exercises
- **Warm-up (computational):** Write von Neumann's 4 using only $\varnothing$ and braces, and count how many times the symbol $\varnothing$ appears. Then write Zermelo's 4.
- **Core (conceptual):** (a) Show that "$n$ has exactly $n$ elements" is true for every von Neumann numeral, by induction. (b) Using the Zermelo numerals, what would be the most natural definition of "$m < n$" in terms of sets? Is it as simple as von Neumann's "$m \in n$"?
- **Stretch (proof):** Prove that the Axiom of Foundation implies no set is a member of itself. Then prove, *without* Foundation, that for every von Neumann natural number $n$, $n \notin n$. (Hint: induction; show first that every $n \in \omega$ is **transitive**, meaning $x \in n \Rightarrow x \subseteq n$.)

<details><summary>Hints and answers</summary>

- **Warm-up:** von Neumann $4 = \lbrace \varnothing, \lbrace\varnothing\rbrace, \lbrace\varnothing,\lbrace\varnothing\rbrace\rbrace, \lbrace\varnothing, \lbrace\varnothing\rbrace, \lbrace\varnothing,\lbrace\varnothing\rbrace\rbrace\rbrace \rbrace$. The symbol $\varnothing$ appears $1 + 1 + 2 + 4 = 8$ times (the count doubles: writing out $n$ needs $2^{n-1}$ copies for $n \ge 1$). Zermelo $4 = \lbrace\lbrace\lbrace\lbrace\varnothing\rbrace\rbrace\rbrace\rbrace$, with one $\varnothing$.
- **Core:** (a) $|0| = 0$; and $n^+ = n \cup \lbrace n \rbrace$ with $n \notin n$ (Stretch), so $|n^+| = |n| + 1$. (b) $m < n$ iff $m$ is obtained from $n$ by "unwrapping" one or more times, i.e. $m$ appears somewhere inside the nesting of $n$. Formally one needs the transitive closure of $\in$, which is less convenient than von Neumann's plain $\in$.
- **Stretch:** If $x \in x$, apply Foundation to $\lbrace x \rbrace$: its only element $x$ must satisfy $x \cap \lbrace x\rbrace = \varnothing$, but $x \in x \cap \lbrace x \rbrace$. Without Foundation: show by induction that each $n$ is transitive (if $y \in n^+$ then $y \in n$, so $y \subseteq n \subseteq n^+$, or $y = n \subseteq n^+$). Then show $n \notin n$ by induction: $0 \notin 0$; if $n^+ \in n^+$ then $n^+ \in n$ or $n^+ = n$; in the first case, transitivity gives $n^+ \subseteq n$, so $n \in n$; in the second, $n \in n^+ = n$. Either way $n \in n$, contradicting the hypothesis.

</details>

## Historical note
Georg Cantor developed set theory between the 1870s and 1890s, to study infinite sets of real numbers. Around 1901 Bertrand Russell found the paradox that bears his name (Ernst Zermelo seems to have found it independently a little earlier but didn't publish it). In June 1902 Russell wrote to Gottlob Frege, whose *Grundgesetze der Arithmetik* depended on a principle that let every concept determine a set; Frege replied that his foundation for arithmetic had been shaken (↪ S1E14).

Zermelo published the first axiomatization of set theory in 1908, partly to put his proof of the well-ordering theorem on a firm footing. His Axiom of Infinity used the successor $a \mapsto \lbrace a \rbrace$. In 1922 Abraham Fraenkel and Thoralf Skolem independently proposed the Replacement axiom, giving what we now call ZF. John von Neumann introduced his definition of ordinals, with $n + 1 = n \cup \lbrace n \rbrace$, in 1923; it became the standard because it extends so smoothly to infinite ordinals. Kuratowski's definition of the ordered pair dates from 1921.

Paul Benacerraf's article "What Numbers Could Not Be" (*The Philosophical Review*, 1965) turned the existence of rival constructions into a philosophical argument. It became a founding text of **structuralism** in the philosophy of mathematics, the view that mathematical objects are positions in structures.

## Connections
- **Callbacks:** ↩ S1E01 (build vs. describe); ↩ S1E02 (the Peano axioms, Dedekind's categoricity theorem); ↩ S1E03 (arithmetic, which now runs on sets)
- **Sets up:**
  - ↪ S1E05: relations as sets of ordered pairs; equivalence classes as sets
  - ↪ S1E06: ℤ and ℚ built as sets of pairs
  - ↪ S1E08: real numbers as sets (Dedekind cuts) and as sets of sequences
  - ↪ S1E11, S1E12: Cantor's sizes of infinity; the power set axiom makes $\mathcal P(\mathbb N)$ available
  - ↪ S1E13: the von Neumann construction continues past ω into the ordinals
  - ↪ S1E14: Russell's letter to Frege, the theory of types, and the Frege–Russell "third answer" to what 2 is
  - ↪ S1E15: the Axiom of Choice and the limits of ZFC
  - ↪ S1E16–S1E20: "forget what it is, keep what it does," the thesis Benacerraf's problem motivates
- **Side quests:** Surreal numbers (after S1E13) build numbers from sets in yet another way; Proof assistants (after S1E14) use types rather than sets as their foundation.

## References
- **Primary / historical**
  - Ernst Zermelo, "Untersuchungen über die Grundlagen der Mengenlehre I," *Mathematische Annalen* 65 (1908). English translation in van Heijenoort (ed.), *From Frege to Gödel* (1967).
  - John von Neumann, "Zur Einführung der transfiniten Zahlen" (1923). English translation "On the introduction of transfinite numbers" in van Heijenoort (ed.), *From Frege to Gödel* (1967).
  - Bertrand Russell, letter to Frege (1902), and Frege's reply; both in van Heijenoort (ed.), *From Frege to Gödel* (1967).
  - Paul Benacerraf, "What Numbers Could Not Be," *The Philosophical Review* 74 (1965).
- **Textbooks**
  - Paul R. Halmos, *Naive Set Theory* (1960), §§1–5 (the axioms of extension, specification, pairing, unions, powers) and §11 ("Numbers"), which uses the von Neumann construction.
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 2 (axioms) and Chapter 4 ("Natural Numbers").
  - Terence Tao, *Analysis I* (3rd ed., 2016), Chapter 3 ("Set theory"), including the discussion of Russell's paradox.
- **Accessible**
  - Stanford Encyclopedia of Philosophy, entries "Russell's Paradox" and "Zermelo's Axiomatization of Set Theory."
  - Stanford Encyclopedia of Philosophy, entry "Structuralism in the Philosophy of Mathematics," for Benacerraf's problem and its aftermath.
