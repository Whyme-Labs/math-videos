# S1E01: What Do We Mean by "Number"?

> **Season / Act:** Season 1 ("What Is a Number?"), Act I: Counting from Nothing · **Target runtime:** 15–20 min ·
> **Prerequisites:** none beyond school arithmetic (fractions, decimals, square roots) ·
> **Builds toward:** S1E02 (Peano), S1E04 (sets), S1E07–S1E09 (√2, ℝ, 0.999…), S1E11 (counting infinite sets), S1E20 (the finale's "structure only" answer)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain the difference between *using* a number, *naming* a number (a numeral), and *defining* a number.
2. State and prove that every positive whole number has exactly one base-$b$ representation, and use this to explain why "345", "CCCXLV", and "101011001₂" name the same number.
3. Describe the number tower ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ in terms of the equation each floor was built to solve.
4. Distinguish a **construction** of a mathematical object ("what it is made of") from a **characterization** ("what it does"), and give one example of each.
5. Say precisely why each of the season's three opening questions cannot be answered until we have definitions.

## Cold open
Here are three questions. Each one sounds like it belongs on a primary-school worksheet.

One: is 0.999…, with nines going on forever, equal to 1? Half the internet says obviously yes. The other half says obviously not: it's always a little bit short.

Two: is √2 a number? You can draw it: it's the diagonal of a square with side 1. But you can't write it down. Its decimals never end and never repeat. Is it a *number*, or just a name for something we can't reach?

Three: are there more fractions than whole numbers? Between 0 and 1 alone there are infinitely many fractions. Surely that's more than 1, 2, 3, …?

Here's the uncomfortable part. A five-year-old can hold up three fingers and tell you what three is. But ask the world's best mathematicians in 1850 to *define* the number 3, and they would have struggled. Nobody had written down what a number actually *is*.

This season we fix that. We'll start with almost nothing, and build, floor by floor, every number you've ever used. By the end, all three questions will have answers, and some of those answers will surprise you.

## The story

### 1. Using numbers versus defining them

Everyone *uses* numbers fluently. We count, measure, compare, and calculate. Using a thing doesn't mean you can define it. You use the word "red" correctly every day, but try defining it without pointing at something red.

Here are some natural attempts to define "3", and what goes wrong with each.

- **"3 is the symbol 3."** But the Romans wrote III and the number didn't change. The symbol is a *name*. A number can have many names; the number itself is something the names point to.
- **"3 is what all collections of three things have in common."** This is close to a good idea (we'll meet a precise version of it in ↪ S1E14). As stated, though, it is circular: to say what "collections of three things" are, we already need to know what three is.
- **"3 is a point on the number line."** This assumes we already have a number line, with its points labeled. Where does the line come from, and what are its points?
- **"3 is 2 + 1."** Then what are 2, 1, and +?

None of these is silly. Each is the seed of a real answer in a later episode. But none of them is a definition yet. That gap, between fluent use and precise definition, is what this season is about.

### 2. Numerals are names, not numbers

The first step is to separate the number from its name.

> **Definition (numeral).** A **numeral** is a written or spoken expression that names a number. "Seven", "7", "VII", and "111₂" are four numerals for one number.

Our everyday numerals use **place value** in base 10: the string $d_k d_{k-1} \dots d_1 d_0$ names the number
$$d_k \cdot 10^k + d_{k-1}\cdot 10^{k-1} + \dots + d_1 \cdot 10 + d_0 .$$
Nothing is special about 10. Any whole number $b \ge 2$ works as a base, and the following theorem says every base gives every number exactly one name.

> **Theorem (base-$b$ representation).** Let $b \ge 2$ be a whole number. Every whole number $n \ge 1$ can be written as
> $$n = d_k b^k + d_{k-1} b^{k-1} + \dots + d_1 b + d_0,$$
> with digits $0 \le d_i \le b-1$ and leading digit $d_k \ne 0$, and this representation is unique.

*Proof.* We use the **division algorithm**: for any whole number $n$ and $b \ge 1$ there are unique whole numbers $q, r$ with $n = qb + r$ and $0 \le r < b$.

*Existence,* by strong induction on $n$. If $1 \le n < b$, then $n$ is itself a single digit ($k = 0$, $d_0 = n$). If $n \ge b$, divide: $n = qb + r$ with $0 \le r < b$. Then $q \ge 1$, and $q < n$ because $q \le qb/2 < qb \le n$ when $b \ge 2$. By the induction hypothesis, $q = e_j b^j + \dots + e_0$ with $e_j \ne 0$. Then
$$n = qb + r = e_j b^{j+1} + \dots + e_0 b + r,$$
which is a base-$b$ representation of $n$ with last digit $r$.

*Uniqueness,* also by strong induction on $n$. Suppose $n = \sum_{i=0}^{k} d_i b^i = \sum_{i=0}^{m} d'_i b^i$ are two representations. Rewrite them as
$$n = \Big(\sum_{i=1}^{k} d_i b^{i-1}\Big) b + d_0 = \Big(\sum_{i=1}^{m} d'_i b^{i-1}\Big) b + d'_0 .$$
Both $d_0$ and $d'_0$ lie between $0$ and $b-1$, so by the uniqueness part of the division algorithm, $d_0 = d'_0$ and the two quotients are equal. If that quotient is $0$, both representations are the single digit $n$. Otherwise the quotient is a whole number smaller than $n$ with the two representations $d_k \dots d_1$ and $d'_m \dots d'_1$, so by the induction hypothesis these agree digit by digit (and $k = m$). ∎

The theorem tells us something philosophical in disguise: **a number is not its numeral**. The same number has one name in base 10, another in base 2, another in Roman numerals. All the names point at one thing. So what is the thing?

Notice also what the proof *used*: the division algorithm, induction, and the rules of arithmetic. We used numbers to prove a fact about naming numbers. If we want to define numbers from scratch, we're not allowed to lean on those facts. We'll have to earn them, which is the job of ↪ S1E02 and ↪ S1E03.

### 3. Why the three questions are hard

Each cold-open question turns out to be a question about **definitions**, disguised as a question about facts.

**0.999… = 1?** A finite decimal like 0.999 is a sum of finitely many fractions: $\tfrac{9}{10} + \tfrac{9}{100} + \tfrac{9}{1000}$. An *infinite* decimal is an infinite sum. But "add infinitely many things" is not an operation anyone ever taught you. Until we say what an infinite decimal *means*, the question has no answer, only opinions. (Answered in ↪ S1E09.)

**Is √2 a number?** It is certainly a *length*: the diagonal of the unit square, by Pythagoras. Whether it is a *number* depends on which numbers you have. If "number" means "fraction", then no: there is no fraction whose square is 2 (proved in ↪ S1E07). To call √2 a number, we'll have to build a larger system that contains it (↪ S1E08).

**More fractions than whole numbers?** For finite collections, "more" has an obvious meaning. For infinite ones we need a *definition* of "same size". The definition that works, matching things one-to-one, gives the surprising answer that there are exactly as many fractions as whole numbers (↪ S1E11).

In all three cases the "obvious" answer comes from intuition built on finite things. Infinite things need definitions, and the definitions decide the answers.

### 4. The number tower and its defects

Here is the tower of number systems we will build:
$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}.$$

- **ℕ, the natural numbers:** $0, 1, 2, 3, \dots$ (In this series ℕ includes 0, as is common in logic and set theory.)
- **ℤ, the integers:** $\dots, -2, -1, 0, 1, 2, \dots$ (from German *Zahlen*, "numbers").
- **ℚ, the rationals:** fractions $p/q$ with $q \ne 0$ (Q for *quotient*).
- **ℝ, the reals:** everything on the "number line," including √2 and π.
- **ℂ, the complex numbers:** $a + bi$ with $i^2 = -1$.

A clean way to see why each floor exists is to ask which simple equation the floor below **cannot** solve:

| Floor | Equation it can't solve | Repaired by |
|---|---|---|
| ℕ | $x + 5 = 3$ | ℤ (↪ S1E06) |
| ℤ | $2x = 3$ | ℚ (↪ S1E06) |
| ℚ | $x^2 = 2$ | ℝ (↪ S1E07, S1E08) |
| ℝ | $x^2 = -1$ | ℂ (↪ S1E10) |

This is the first recurring thread of the series: **extend to repair a defect.** Each new floor fixes one defect of the floor below, and each one costs something. Every time, we'll keep a ledger of "what did we lose?" (For instance, ℂ has no sensible ordering compatible with its arithmetic; see ↪ S1E10.)

Right now the tower is scaffolding. We've written the names on the floors, but we haven't *built* any of them. Each floor gets a question mark until we construct it.

### 5. Build or describe?

There are two fundamentally different ways to say what a mathematical object is.

> **Construction ("build it").** Say what the object is *made of*, starting from things you already have.
>
> **Characterization ("describe it").** List the *properties* the object must have, and show that those properties pin it down.

An everyday analogy: you can specify a chess knight by its material (a carved piece of wood shaped like a horse) or by its rules (it moves in an L-shape). The rules are what make it a knight. A bottle cap moving in L-shapes is a perfectly good knight.

In this season we'll see both approaches for the very same objects:

- **The natural numbers.** *Described* in ↪ S1E02 by five axioms about zero and "next" (Peano). *Built* in ↪ S1E04 out of the empty set (von Neumann: $0 = \varnothing$, $1 = \lbrace\varnothing\rbrace$, $2 = \lbrace\varnothing, \lbrace\varnothing\rbrace\rbrace$, …).
- **The real numbers.** *Built* twice in ↪ S1E08 (Dedekind cuts and Cauchy sequences), and *described* once as "the complete ordered field."

The season's long-term answer is that, for doing mathematics, **description wins**: two constructions that satisfy the same description are interchangeable. We'll even see two different constructions of the number 2 (↪ S1E04) and have to ask which is the "real" one. By the finale (↪ S1E20), the building materials fade away and only the structure is left.

### 6. The plan: build everything from as little as possible

The season's program, which mathematicians carried out between roughly 1860 and 1930:

1. **Count.** Write down the minimum you need to count forever (↪ S1E02).
2. **Calculate.** Define + and × from "next" alone and prove the familiar rules (↪ S1E03).
3. **Ground it.** Build the counting numbers from sets, and sets from nothing but rules (↪ S1E04).
4. **Repair.** Use one master tool, equivalence classes (↪ S1E05), to build ℤ and ℚ (↪ S1E06), then fill the holes in ℚ to get ℝ (↪ S1E07, S1E08), then add $i$ (↪ S1E10).

At the end of Act II every floor is built, and every question mark is gone.

## Worked examples

### Example 1: one number, many names
**Problem.** Write the number we call "45" in base 2, in base 7, and in Roman numerals, and check each.

**Base 2.** Repeatedly divide by 2 and record remainders:
- $45 = 22 \cdot 2 + 1$
- $22 = 11 \cdot 2 + 0$
- $11 = 5 \cdot 2 + 1$
- $5 = 2 \cdot 2 + 1$
- $2 = 1 \cdot 2 + 0$
- $1 = 0 \cdot 2 + 1$

Reading the remainders from bottom to top: $45 = 101101_2$.
*Check:* $1\cdot 32 + 0 \cdot 16 + 1 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1 = 32 + 8 + 4 + 1 = 45$. ✓

**Base 7.**
- $45 = 6 \cdot 7 + 3$
- $6 = 0 \cdot 7 + 6$

So $45 = 63_7$. *Check:* $6 \cdot 7 + 3 = 42 + 3 = 45$. ✓

**Roman numerals.** $45 = 40 + 5$; 40 is written XL (10 before 50) and 5 is V, so $45 = \text{XLV}$. Roman numerals are not a place-value system, which is why the theorem above doesn't apply to them. (The "subtractive" convention XL = 40 is just a convention.)

**Moral.** "45", "101101₂", "63₇", and "XLV" are four numerals. They name one number. The base-$b$ theorem guarantees that, within one base, there's no ambiguity.

### Example 2: which floor solves which equation?
**Problem.** For each equation, find the smallest floor of the tower that contains a solution.

1. $x + 5 = 3$. If $x$ is a natural number, then $x + 5 \ge 5 > 3$, so there's no solution in ℕ. In ℤ, $x = 3 - 5 = -2$. *Check:* $-2 + 5 = 3$. ✓ Smallest floor: **ℤ**.
2. $2x = 3$. In ℤ: if $x \le 1$ then $2x \le 2 < 3$; if $x \ge 2$ then $2x \ge 4 > 3$. No integer works. In ℚ, $x = \tfrac{3}{2}$. *Check:* $2 \cdot \tfrac32 = 3$. ✓ Smallest floor: **ℚ**.
3. $x^2 = 2$. There's no rational solution (a short proof is the centerpiece of ↪ S1E07). Numerically, $1.4^2 = 1.96$ and $1.5^2 = 2.25$, so a solution, if there is one, lies between 1.4 and 1.5. Smallest floor: **ℝ**, once we've built it.
4. $x^2 = -1$. For every real $x$, $x^2 \ge 0 > -1$, so there is no real solution. Smallest floor: **ℂ**, with $x = \pm i$.
5. $x^2 = 4$. Already solvable in ℕ: $x = 2$. (And in ℤ also $x = -2$.) Not every equation forces a new floor.

### Example 3: dissecting a "proof" that 0.999… = 1
Here's the classic argument, with each step labeled by what it secretly assumes.

Let $x = 0.999\ldots$

1. $10x = 9.999\ldots$
   *Assumes:* multiplying an infinite decimal by 10 shifts the digits left, as it does for finite decimals.
2. $10x - x = 9.999\ldots - 0.999\ldots = 9$
   *Assumes:* you can subtract infinite decimals digit by digit, and the infinitely many trailing nines cancel exactly.
3. $9x = 9$, so $x = 1$.
   *Assumes:* $x$ is a number that obeys the ordinary rules of algebra (so $10x - x = 9x$, and we can divide by 9).

Every assumption is reasonable, and the conclusion is in fact correct. But notice: the argument never says what $0.999\ldots$ **is**. A skeptic can reject step 1 or 2 ("infinite decimals don't behave like finite ones") and the argument has no reply. The honest answer requires (a) building ℝ, and (b) defining an infinite decimal as the **limit** of its finite truncations $0.9,\ 0.99,\ 0.999, \dots$. With those definitions in hand, the equation becomes a theorem with a two-line proof (↪ S1E09).

For comparison, look at the finite truncations: $1 - 0.9 = 0.1$, $1 - 0.99 = 0.01$, $1 - 0.999 = 0.001$. The gap after $n$ nines is exactly $10^{-n}$. The gap shrinks below any positive size you name, which is the hint that "limit" is the right concept.

### Example 4: same number without counting
**Problem.** A café has a tray of cups and a tray of saucers. Without counting either, decide whether there are equally many.

**Solution.** Put one cup on each saucer. If every cup has a saucer and every saucer has a cup, there are equally many. If cups are left over, there are more cups; if saucers are left over, there are more saucers.

This **matching** procedure decides "same number" without using any numbers at all. Counting itself is a special case: to count five apples, you match them with the words "one, two, three, four, five". This idea defines "same size" for *infinite* collections in ↪ S1E11, and it is the core of the Frege–Russell definition of number in ↪ S1E14.

## Visual and animation notes
1. **Cold open:** three cards slide in, one per question: "0.999… = 1?", "√2: a number?", "more fractions than whole numbers?". Each gets a pulsing question mark that will stay in the corner of the screen as a season-long "open questions" tray.
2. **A child's hand** holding up three fingers, next to a blank dictionary entry "three (n.): ___". The cursor blinks.
3. **Numeral carousel:** the same glowing dot labeled in turn "45", "101101₂", "63₇", "XLV", "forty-five". The dot never moves; only its label changes. This previews the series motif "**Basis / coordinates**: a language overlay that changes while the object stays fixed."
4. **Division-algorithm ladder:** the base-2 conversion of 45 as a stack of divisions, remainders lighting up and then reading upward.
5. **The number tower** (recurring motif): a building with five floors, ℕ at the bottom, ℂ at the top, drawn as scaffolding. Each floor shows its "unsolvable equation" from the table on a placard, plus a question mark. A blank "What did we lose?" ledger hangs on the side and stays empty for now.
6. **Build vs. describe split screen:** left half, a carpenter carving a chess knight; right half, an L-shaped move arrow. Then a bottle cap slides onto the board and moves in an L. Caption: "It's a knight because of what it does."
7. **Roadmap:** the scaffolding floors light up one at a time with the episode numbers that build them (E02–E04 under ℕ, E06 for ℤ and ℚ, E07–E08 for ℝ, E10 for ℂ).
8. **End card teaser:** the word "next" alone on screen, with an arrow looping forward: "What's the least you need to count forever?"

## Common misconceptions
- **Misconception:** "A number is the symbol you write." **Reality:** Symbols are numerals: names for numbers. One number has many names (Example 1).
- **Misconception:** "0.999… is obviously less than 1, because it never 'gets there'." **Reality:** This treats an infinite decimal as a process rather than as a number. Once infinite decimals are defined as limits, 0.999… and 1 are two names for the same real number (↪ S1E09).
- **Misconception:** "√2 isn't a real number because its decimals never end." **Reality:** It isn't a *rational* number; that's the precise fact. Never-ending decimals are perfectly good names for real numbers (1/3 = 0.333… never ends either).
- **Misconception:** "There are obviously more fractions than whole numbers, since the whole numbers are a part of the fractions." **Reality:** For infinite sets, "a proper part" and "smaller" come apart. The evens are a proper part of ℕ, yet they can be matched one-to-one with ℕ (↪ S1E11).
- **Misconception:** "Defining numbers is pointless, since everyone knows what they are." **Reality:** Intuition handles finite whole numbers well and fails on exactly the questions above. Precise definitions are what let us settle them.

## Exercises
- **Warm-up (computational):** Write 100 in base 2, base 3, and base 8, and check each answer by expanding it back.
- **Core (conceptual):** For each of these equations, name the smallest floor of the tower where it has a solution: (a) $x + 7 = 7$; (b) $3x = -6$; (c) $5x = 2$; (d) $x^2 = 9/4$; (e) $x^3 = 2$; (f) $x^2 + 4 = 0$.
- **Stretch (proof):** Prove that every whole number $n \ge 1$ can be written as a sum of *distinct* powers of 2 in exactly one way. (Hint: relate this to base 2.) Then explain why the analogous statement for powers of 3 with "distinct" is false, and what replaces it.

<details><summary>Hints and answers</summary>

- **Warm-up:** $100 = 1100100_2$ ($64 + 32 + 4$); $100 = 10201_3$ ($81 + 2\cdot 9 + 1$); $100 = 144_8$ ($64 + 4 \cdot 8 + 4$).
- **Core:** (a) ℕ ($x = 0$); (b) ℤ ($x = -2$); (c) ℚ ($x = 2/5$); (d) ℚ ($x = 3/2$); (e) ℝ (the real cube root of 2 is irrational, by an argument like the one for √2 in S1E07); (f) ℂ ($x = \pm 2i$).
- **Stretch:** A sum of distinct powers of 2 is exactly a base-2 representation (each digit is 0 or 1), so existence and uniqueness follow from the theorem with $b = 2$. With powers of 3 and only digits 0 and 1, some numbers are missed: $2$ is not a sum of distinct powers of 3 (the only powers below 2 are $1$). Base 3 needs the digits 0, 1, 2. (A fun variant: with digits $-1, 0, 1$, "balanced ternary," every integer, positive or negative, has a unique representation.)

</details>

## Historical note
The numbers grew up in roughly the order of the tower, but they were *justified* in the reverse of the order they were used. Egyptian scribes worked with fractions (the Rhind papyrus, c. 1550 BCE, is full of them). The Greeks discovered that the diagonal of a square is incommensurable with its side (↪ S1E07). Brahmagupta, in 628 CE, gave rules for computing with zero and negative numbers. Complex numbers appeared in Cardano's *Ars Magna* (1545), as awkward by-products of the formula for cubic equations.

For centuries, all of these were used without definitions. In the nineteenth century that changed. Analysts such as Cauchy and Weierstrass were making calculus rigorous, and they needed to know exactly what a real number was. Richard Dedekind published a construction of the real numbers in 1872 and then, in 1888, a small book whose title asks the question of this episode: *Was sind und was sollen die Zahlen?* ("What are numbers and what should they be?"). In its preface he called numbers "free creations of the human mind." Gottlob Frege, in *Die Grundlagen der Arithmetik* (1884), argued that numbers are logical objects and attacked many earlier attempts at definition. Leopold Kronecker took a very different line; he is reported to have said that "God made the integers, all else is the work of man." Giuseppe Peano's axioms (1889) completed the picture for the counting numbers. Within a few decades, all five floors of the tower had been built from the natural numbers, and the natural numbers had been built from sets.

## Connections
- **Callbacks:** none. This is the series opener.
- **Sets up:**
  - ↪ S1E02: the least you need to count forever (Peano's axioms)
  - ↪ S1E04: building the natural numbers from the empty set; two rival "2"s
  - ↪ S1E06: ℤ and ℚ, built rather than invented
  - ↪ S1E07, S1E08: √2 and the construction of ℝ
  - ↪ S1E09: the answer to "0.999… = 1?"
  - ↪ S1E10: ℂ and the first entry in the "what did we lose?" ledger
  - ↪ S1E11: the answer to "more fractions than whole numbers?"
  - ↪ S1E14: the Frege–Russell definition of number by matching
  - ↪ S1E20: the finale's answer, "a number is whatever behaves like one"
  - ↪ S2E04: the numeral/number distinction returns as the matrix/linear-map distinction ("a picture of the map taken in one basis")
- **Side quests:** Cayley–Dickson (ℍ, 𝕆 and beyond), after S1E10, extends the tower past ℂ; the history interlude "Pythagoras and the irrationality crisis" (S1 Act II).

## References
- **Primary / historical**
  - Richard Dedekind, *Was sind und was sollen die Zahlen?* (1888). English translation "The Nature and Meaning of Numbers" in *Essays on the Theory of Numbers*, trans. W. W. Beman (1901). See the preface.
  - Gottlob Frege, *Die Grundlagen der Arithmetik* (1884). English translation *The Foundations of Arithmetic* by J. L. Austin (1950).
  - Bertrand Russell, *Introduction to Mathematical Philosophy* (1919), Chapter 1 ("The Series of Natural Numbers") and Chapter 2 ("Definition of Number").
- **Textbooks**
  - Richard Courant and Herbert Robbins, *What Is Mathematics?* (1941; 2nd ed. revised by Ian Stewart, 1996), Chapter I ("The Natural Numbers") and Chapter II ("The Number System of Mathematics").
  - Terence Tao, *Analysis I* (3rd ed., 2016), Chapter 1 ("Introduction") and the opening of Chapter 2, on why one builds numbers from scratch.
- **Accessible**
  - Timothy Gowers, *Mathematics: A Very Short Introduction* (2002), Chapter 2 ("Numbers and abstraction"), on the "what it does, not what it is" view of numbers.
  - Stanford Encyclopedia of Philosophy, entry "Philosophy of Mathematics."
