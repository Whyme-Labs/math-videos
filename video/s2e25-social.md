# S2E25 posting kit: The Hahn–Banach Theorem / 哈恩–巴拿赫定理

Season 2, episode 25 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e25-hahn-banach.mp4` (4:09, 16:9)
- Chinese edition: `out/s2e25-zh-ha-en-ba-na-he.mp4` (4:28, 16:9). It has a scene the English edition
  doesn't: the Hong Canal between Chu and Han, from 《史记·项羽本纪》.
- Thumbnails: `thumbnails/png/S2E25-EN.png` and `S2E25-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E25-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E25-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E24 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. The Hahn–Banach Theorem: There Are Enough Measurements | Spaces, Maps, and Measurements S2E25
2. What Is the Limit of 1, 0, 1, 0, …? | Spaces, Maps, and Measurements S2E25
3. Separating Convex Sets: From Hahn–Banach to SVMs | Spaces, Maps, and Measurements S2E25

**Description**

```
What is the limit of 1, 0, 1, 0, 1, 0, …? Calculus says there isn't one. But if you had to pick a number you'd say ½, and for 1, 0, 0, 1, 0, 0, … you'd say ⅓. Banach proved in 1932 that this can be made official for every bounded sequence. Nobody has ever written such a limit down, and nobody will.

Season 2, episode 25 of Whyme Labs' math series. We start with a measurement f on a subspace M and try to extend it to the whole space. Extending by a basis works in finite dimensions, but in infinite dimensions a Hamel basis builds discontinuous monsters. Hahn–Banach says f always extends with the same norm. Adding one direction z, the only choice is c = F(z), and the rules squeeze c between a sup and an inf; the triangle inequality keeps the gap open. On the ℓ¹ diamond every c in [−1, 1] works, on the disc only c = 0. Zorn's lemma, the Axiom of Choice in disguise, takes care of endless directions. The payoff: for x₀ = (3, −4) there's a norm-1 functional reading its full length (5 in ℓ², 7 in ℓ¹), the norm is the best reading, and measurements separate points. The geometric form separates a convex set from a point, fails for a circle and its centre, and underlies SVMs and LP duality. Last, the Banach limit gives ½ for 1, 0, 1, 0, … and ⅓ for 1, 0, 0, …, with no formula.

0:00 The limit of 1, 0, 1, 0, …
0:44 Extending by a basis
1:18 The one-step extension
1:51 Zorn's lemma
2:12 Norming functionals
2:43 Separating convex sets, SVMs and LP
3:21 The Banach limit
3:53 Next: the big three theorems

Previous episode: The continuous dual <S2E24 link>
Next: the big three theorems of Banach spaces.

Also in Chinese (中文版): <YouTube ZH link>

Sources: H. Hahn (1927); S. Banach, Sur les fonctionnelles linéaires (1929) and Théorie des opérations linéaires (1932); M. Foreman and F. Wehrung (1991); H. Brezis, Functional Analysis, ch. 1; S. Boyd and L. Vandenberghe, Convex Optimization, §2.5 and ch. 5.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #functionalanalysis #convexity
```

**Tags:** Hahn-Banach theorem, extension of functionals, sublinear functional, Zorn's lemma, axiom of choice, norming functional, separation theorem, convex sets, supporting hyperplane, support vector machine, linear programming duality, Banach limit, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 哈恩–巴拿赫定理：测量永远够用 | 空间、映射与度量 S2E25
2. 1, 0, 1, 0, … 的极限是多少？ | 空间、映射与度量 S2E25
3. 分离凸集：从哈恩–巴拿赫到支持向量机 | 空间、映射与度量 S2E25

**简介**

```
1, 0, 1, 0, 1, 0, … 的极限是多少？微积分说：没有。可要是非得给一个数，你会说 ½；1, 0, 0, 1, 0, 0, … 你会说 ⅓。巴拿赫在 1932 年证明，这件事对每个有界数列都能正式做到。可没人写出过这样的极限，以后也不会有。

Whyme Labs 数学系列第二季第 25 集。从子空间 M 上的测量 f 出发，想把它延拓到整个空间。在有限维里用基来延拓就行，可在无限维里，哈默尔基造出来的是不连续的怪物。哈恩–巴拿赫说：f 总能保持范数不变地延拓。加一个方向 z，要选的只有 c = F(z)，条件把 c 夹在一个上确界和一个下确界之间，三角不等式保证空隙不合上。在 ℓ¹ 的菱形上 [−1, 1] 里的 c 都行，在圆盘上只有 c = 0。方向无穷无尽，就交给佐恩引理，也就是换了装的选择公理。收获：x₀ = (3, −4) 有范数为 1、读出全长的泛函（ℓ² 里读 5，ℓ¹ 里读 7），范数就是最好的读数，测量能分开不同的点。几何形式能把凸集和外面的点分开，对圆周和圆心却不行，它也是支持向量机和线性规划对偶的根。最后，巴拿赫极限给 1, 0, 1, 0, … 算出 ½，给 1, 0, 0, … 算出 ⅓，却没有公式。中文版另加楚汉鸿沟。

0:00 1, 0, 1, 0, … 的极限
0:44 用基来延拓
1:17 一步延拓
1:50 佐恩引理
2:11 赋范泛函
2:42 分离凸集、支持向量机与线性规划
3:20 鸿沟
3:41 巴拿赫极限
4:13 下一集：三大定理

上一集：连续对偶 <S2E24 链接>
下一集：巴拿赫空间的三大定理。

English version: <YouTube EN link>

出处：《史记·项羽本纪》“中分天下，割鸿沟以西者为汉，鸿沟而东者为楚”；哈恩 (1927)；巴拿赫 (1929, 1932)；福尔曼、韦尔朗 (1991)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #泛函分析 #凸分析
```

---

## X (x.com), English

**Single post** (with a clip of the supporting line rocking on the corner of the ℓ¹ diamond):

```
What's the limit of 1, 0, 1, 0, …? There is a linear "limit" on every bounded sequence that ignores shifts, and it must give ½: L(x) + L(Sx) = L(1, 1, 1, …) = 1.

It exists by Hahn–Banach. Nobody can write one down.

<YouTube link>
```

**Thread** (4 posts):

1. `Are there enough continuous measurements? 🧵`
2. `Hahn–Banach: a functional on a subspace extends to the whole space without growing its norm.`
3. `So every vector has a measurement that reads its full length, and any two vectors can be told apart.`
4. `Geometrically: a convex set and a point outside can always be split by a hyperplane. That's SVMs and LP duality. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 25 of Season 2, Spaces, Maps, and Measurements: the Hahn–Banach theorem.

The episode explains why extending a functional by a basis fails, proves the one-step extension with its sup ≤ c ≤ inf interval, shows when the extension is unique (round balls) and when it isn't (corners), and where Zorn's lemma comes in. It then derives norming functionals, the separation of convex sets, and the links to support vector machines and LP duality, and ends with Banach limits.

The Chinese edition adds the Hong Canal that split Chu and Han, from the Records of the Grand Historian.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `1, 0, 1, 0, … has a limit after all`

**Caption:**

```
Its Banach limit is ½. It exists, and no one can write it down. Season 2, part 25.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Every line through the centre cuts the circle`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E25】哈恩–巴拿赫定理：测量永远够用
2. 【线性代数·第二季第25集】1, 0, 1, 0, … 的极限是多少？
3. 【S2E25】楚河汉界与分离定理

**简介**

```
Whyme Labs 数学系列第二季第 25 集。
1, 0, 1, 0, … 没有极限，可巴拿赫极限说它是 ½，而且没人写得出这个极限。
用基延拓为什么不行、一步延拓、菱形与圆盘、佐恩引理、赋范泛函、分离凸集、支持向量机、线性规划对偶、巴拿赫极限。
中文版另加楚汉以鸿沟为界。

00:00 1, 0, 1, 0, … 的极限
00:44 用基来延拓
01:17 一步延拓
01:50 佐恩引理
02:11 赋范泛函
02:42 分离凸集、支持向量机与线性规划
03:20 鸿沟
03:41 巴拿赫极限
04:13 下一集：三大定理

上一集：连续对偶 <B 站 S2E24 链接>
下一集：三大定理

出处：《史记·项羽本纪》“中分天下，割鸿沟以西者为汉，鸿沟而东者为楚”；哈恩 (1927)；巴拿赫 (1929, 1932)；福尔曼、韦尔朗 (1991)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 哈恩巴拿赫定理, 延拓定理, 佐恩引理, 选择公理, 分离定理, 凸集, 支持向量机, 线性规划, 巴拿赫极限, 鸿沟, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 25 集）
**封面：** `thumbnails/png/S2E25-ZH.png`（1, 0, 1, 0 的柱子和收向 ½ 的平均线，大字“1, 0, 1, 0, … 也有极限”）

**动态：** `第二季第 25 集：哈恩–巴拿赫定理。1, 0, 1, 0, … 的极限为什么是 ½？顺带看楚汉鸿沟。`

---

## 抖音

**画面首秒文字：** `1, 0, 1, 0, … 也有极限`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E25-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E25-ZH.png`

**标题 / 文案**（任选其一）

1. `1, 0, 1, 0 的极限是 ½ #数学 #涨知识 #泛函分析`
2. `圆周和圆心分不开 #数学 #科普 #凸集`
3. `楚河汉界和分离定理 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
