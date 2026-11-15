# S2E32 posting kit: Measure-Preserving Systems / 保测系统

Season 2, episode 32 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e32-measure-preserving.mp4` (4:46, 16:9)
- Chinese edition: `out/s2e32-zh-bao-ce-xi-tong.mp4` (5:09, 16:9). It has a scene the English edition
  doesn't: the 19-year cycle of the old calendar, 《周髀算经》“十九岁为一章”.
- Thumbnails: `thumbnails/png/S2E32-EN.png` and `S2E32-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E32-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E32-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E31 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Chaos, Made Linear: Measure-Preserving Systems | Spaces, Maps, and Measurements S2E32
2. Why the Cream Comes Back: Poincaré Recurrence | Spaces, Maps, and Measurements S2E32
3. Koopman's Trick: Study Chaos Through Measurements | Spaces, Maps, and Measurements S2E32

**Description**

```
Stir cream into coffee and the swirl is chaos: two drops a hair apart end up across the cup. But stirring never creates or destroys coffee, and from that one fact come two predictions. Almost every drop comes back near its start, and the cream can spread out perfectly evenly. The proof stops following drops and follows measurements instead.

Season 2, episode 32 of Whyme Labs' math series. The doubling map x ↦ 2x mod 1 deletes a binary digit each step, so points agreeing to 50 digits split after 50 steps: deterministic but unpredictable. So ask about averages. A map preserves measure if μ(T⁻¹A) = μ(A): rotations, the doubling map (an arc's preimage is two half-arcs) and the cat map (det 1, stretching by 2.618 and squeezing by 0.382). Poincaré recurrence: the points of A that never return have disjoint preimages of equal size, so their measure is 0. Koopman's operator Uf = f ∘ T is linear however wild T is, and an isometry of L²; for the doubling map it sends eₖ to e₂ₖ, so it is the right shift from Episode 31 in disguise. Dynamics becomes spectrum: ergodic means the eigenvalue 1 is simple, irrational rotations have pure point spectrum, and mixing leaves only continuous spectrum. Von Neumann's mean ergodic theorem is a projection: averages of Uⁿf converge to the invariant part of f, which telescoping proves in a few lines. Weyl: the points nα mod 1 fill the circle evenly.

0:00 Stirring coffee
0:49 The doubling map
1:21 Measure-preserving maps
1:56 Poincaré recurrence
2:26 The Koopman operator
3:00 Ergodicity and mixing as spectrum
3:35 The mean ergodic theorem
4:05 Weyl equidistribution
4:28 Next: distributions

Previous episode: Spectrum and quantum mechanics <S2E31 link>
Next: The finale: distributions.

Also in Chinese (中文版): <YouTube ZH link>

Sources: H. Poincaré (1890); B. O. Koopman, Hamiltonian systems and transformations in Hilbert space (1931); J. von Neumann (1932); G. D. Birkhoff (1931); H. Weyl (1916); P. Walters, An Introduction to Ergodic Theory.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #chaos #ergodictheory
```

**Tags:** measure-preserving system, ergodic theory, chaos, doubling map, cat map, Poincaré recurrence, Koopman operator, isometry, ergodic, mixing, spectrum, mean ergodic theorem, von Neumann, Weyl equidistribution, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 混沌变成线性：保测系统 | 空间、映射与度量 S2E32
2. 奶滴为什么会回来：庞加莱回归 | 空间、映射与度量 S2E32
3. 库普曼的妙招：通过测量研究混沌 | 空间、映射与度量 S2E32

**简介**

```
往咖啡里倒奶，搅一下，漩涡一片混乱：挨得极近的两滴奶最后跑到杯子两头。可搅拌不会凭空多出或少掉咖啡。从这一点出发，能推出两件事：几乎每滴奶都会回到起点附近，奶还可能散得均匀无比。证明的办法是：别追着奶滴跑，去追测量值。

Whyme Labs 数学系列第二季第 32 集。倍增映射 x ↦ 2x mod 1 每一步删掉一位二进制数字，前 50 位相同的两个点，50 步后就分道扬镳：完全确定，却无法预测，所以只能问平均。保测是指 μ(T⁻¹A) = μ(A)：转动、倍增（弧的原像是两段半弧）、猫映射（行列式 1，一边拉长 2.618 倍、一边压到 0.382）。庞加莱回归：永不回来的点，它们的各次原像两两不交又一样大，所以测度是 0。库普曼算子 Uf = f ∘ T 不管 T 多狂野都是线性的，而且是 L² 上的等距；对倍增映射，它把 eₖ 送到 e₂ₖ，正是第 31 集的右移。动力学变成谱：遍历等价于特征值 1 单重，无理转动是纯点谱，混合只剩连续谱。冯·诺依曼平均遍历定理就是一个投影：Uⁿf 的平均收敛到 f 的不变部分，用求和相消几行就证完。外尔：点 nα mod 1 均匀铺满圆周。中文版另加古历“十九岁为一章”。

0:00 搅咖啡
0:49 倍增映射
1:21 保测映射
1:56 庞加莱回归
2:26 十九岁为一章
2:50 库普曼算子
3:24 遍历与混合即谱
3:59 平均遍历定理
4:29 外尔等分布
4:52 下一集：广义函数

上一集：谱与量子力学 <S2E31 链接>
下一集：季终：广义函数。

English version: <YouTube EN link>

出处：《周髀算经》“十九岁为一章”；庞加莱 (1890)；库普曼 (1931)；冯·诺依曼 (1932)；伯克霍夫 (1931)；外尔 (1916)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #混沌 #遍历论
```

---

## X (x.com), English

**Single post** (with a clip of cream being stirred into filaments):

```
Poincaré recurrence in one line: let B be the points of A that never come back. B, T⁻¹B, T⁻²B, … are disjoint and all the same size.

Infinitely many equal pieces fit in measure 1 only if each is 0. So the cream comes back.

<YouTube link>
```

**Thread** (4 posts):

1. `Chaos, made linear 🧵`
2. `Stirring is chaotic on points but never makes or destroys coffee: it preserves measure.`
3. `Koopman: look at measurements instead. Uf = f ∘ T is linear, and an isometry of L².`
4. `Ergodic ⟺ eigenvalue 1 is simple. Mixing ⟺ continuous spectrum. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 32 of Season 2, Spaces, Maps, and Measurements: measure-preserving systems.

The episode starts from the doubling map's sensitive dependence, defines measure-preserving maps with rotations, the doubling map and the cat map, proves Poincaré recurrence, introduces the Koopman operator as an isometry of L², reads ergodicity and mixing off its spectrum, proves von Neumann's mean ergodic theorem as a projection, and ends with Weyl equidistribution.

The Chinese edition adds the old calendar's 19-year cycle as a rotation that nearly returns.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Chaos, made linear`

**Caption:**

```
Stirring is chaos on points, but a linear isometry on measurements. Season 2, part 32.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Why the cream comes back`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E32】保测系统：混沌变成线性
2. 【线性代数·第二季第32集】奶滴为什么会回来
3. 【S2E32】十九年七闰与庞加莱回归

**简介**

```
Whyme Labs 数学系列第二季第 32 集。
搅拌是混沌，作用在函数上却是线性的等距。
倍增映射、保测映射、猫映射、庞加莱回归、库普曼算子、遍历与混合的谱刻画、冯·诺依曼平均遍历定理、外尔等分布。
中文版另加古历“十九岁为一章”。

00:00 搅咖啡
00:49 倍增映射
01:21 保测映射
01:56 庞加莱回归
02:26 十九岁为一章
02:50 库普曼算子
03:24 遍历与混合即谱
03:59 平均遍历定理
04:29 外尔等分布
04:52 下一集：广义函数

上一集：谱与量子力学 <B 站 S2E31 链接>
下一集：广义函数

出处：《周髀算经》“十九岁为一章”；庞加莱 (1890)；库普曼 (1931)；冯·诺依曼 (1932)；伯克霍夫 (1931)；外尔 (1916)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 遍历论, 混沌, 保测映射, 庞加莱回归, 库普曼算子, 遍历, 混合, 谱, 外尔等分布, 古历, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 32 集）
**封面：** `thumbnails/png/S2E32-ZH.png`（一杯咖啡里奶被搅成细丝，旁边一个发光的圆环，大字“混沌 变成线性”）

**动态：** `第二季第 32 集：保测系统。混沌的搅拌，作用在测量上却是线性的。顺带看古历十九年七闰。`

---

## 抖音

**画面首秒文字：** `混沌变成线性`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E32-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E32-ZH.png`

**标题 / 文案**（任选其一）

1. `奶滴一定会回来 #数学 #涨知识 #混沌`
2. `混沌也能用线性代数研究 #数学 #科普 #遍历论`
3. `十九年七闰里的数学 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
