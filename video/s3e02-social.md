# S3E02 posting kit: Modules: One Theorem, Two Classifications / 模：一个定理，两种分类

Season 3, episode 2 of *Where the Roads Meet* (《殊途同归》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s3e02-modules.mp4` (4:46, 16:9)
- Chinese edition: `out/s3e02-zh-mo.mp4` (5:09, 16:9). It has a scene the English edition
  doesn't: 更相减损 from 《九章算术·方田》, the Euclidean algorithm that drives the
  Smith normal form.
- Thumbnails: `thumbnails/png/S3E02-EN.png` and `S3E02-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S3E02-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S3E02-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 3 playlist on YouTube and the Season 3 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S3E01 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Jordan Form Is Secretly Group Theory | Where the Roads Meet S3E02
2. Modules: One Theorem, Two Classifications | Where the Roads Meet S3E02
3. Why ℤ/2 Has No Basis | Where the Roads Meet S3E02

**Description**

```
Two puzzles from two seasons. How many abelian groups have 144 elements? And how many genuinely different 3 × 3 matrices have 2 as their only eigenvalue? One is about symmetry, one is about stretching space, and they turn out to be the same question, answered by the same algorithm. To see it, the scalars have to stop being a field.

Season 3, episode 2 of Whyme Labs' math series. Warm-up over 𝔽₂: the Hamming(7,4) code is the kernel of three parity checks, and when one bit flips, the failed checks spell out its address. A module is a vector space whose scalars only form a ring. Over ℤ a module is exactly an abelian group; over F[x] it is a vector space with one operator T, and an isomorphism is a change of basis. The first casualty is the basis: in ℤ/2, 2 · 1 = 0, a nonzero scalar killing a nonzero vector, so ℤ/2 has no basis at all. What survives is the structure theorem, computed by the Smith normal form: row and column moves driven by the Euclidean algorithm turn a relation matrix into diag(2, 6, 12), so the group is ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12. Over ℤ it says there are exactly 10 abelian groups of order 144 (5 ways to split 2⁴ times 2 ways to split 3²). Over F[x] the same theorem gives Jordan blocks, and the partitions of 3 give exactly three matrices with only eigenvalue 2. Prime p ↔ x − λ: Jordan form is the classification of abelian groups.

0:00 Two puzzles, two seasons
0:53 Warm-up: the Hamming code
1:28 Modules
1:57 Torsion: ℤ/2 has no basis
2:32 Smith normal form
3:07 Ten groups of order 144
3:31 Jordan blocks
4:00 The dictionary
4:29 Next: representations

Previous episode: Fields Are Vector Spaces <S3E01 link>
Next: Groups acting by matrices: representation theory.

Also in Chinese (中文版): <YouTube ZH link>

Sources: R. Hamming (1950); H. J. S. Smith (1861); L. Kronecker (1870); G. Frobenius and L. Stickelberger (1879); C. Jordan, Traité des substitutions (1870); B. L. van der Waerden, Moderne Algebra (1930–31); D. Dummit and R. Foote, Abstract Algebra, ch. 12.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #algebra #linearalgebra
```

**Tags:** module, ring, abelian group, Hamming code, torsion, basis, Smith normal form, structure theorem, PID, Jordan form, invariant factors, elementary divisors, Chinese remainder theorem, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 若尔当标准形其实是群论 | 殊途同归 S3E02
2. 模：一个定理，两种分类 | 殊途同归 S3E02
3. 为什么 ℤ/2 没有基 | 殊途同归 S3E02

**简介**

```
两季的两道题：144 个元素的交换群有几种？唯一特征值是 2 的 3 × 3 矩阵，本质上有几种？一个讲对称，一个讲拉伸空间，结果是同一个问题，用同一个算法回答。要看清这一点，标量就不能再是域。

Whyme Labs 数学系列第三季第 2 集。先在 𝔽₂ 上热身：汉明码是三个奇偶校验的核，翻错一位时，报错的校验直接写出出错的位置。模就是标量只来自一个环的向量空间。在 ℤ 上，模恰好是交换群；在 F[x] 上，模是向量空间加一个算子 T，同构就是换基。最先丢掉的是基：在 ℤ/2 里 2 · 1 = 0，非零标量消灭了非零向量，所以 ℤ/2 根本没有基。留下来的是结构定理，用史密斯标准形来算：靠辗转相除做行列变换，把关系矩阵化成 diag(2, 6, 12)，群就是 ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12。在 ℤ 上，144 阶交换群恰好十种（2⁴ 拆法 5 种，3² 拆法 2 种）；在 F[x] 上，同一个定理给出若尔当块，3 的三种拆分给出恰好三种矩阵。素数 p ↔ x − λ：若尔当标准形就是交换群的分类。中文版另加《九章算术》更相减损术。

0:00 两季的两道题
0:53 热身：汉明码
1:28 模
1:57 挠：ℤ/2 没有基
2:32 史密斯标准形
3:07 更相减损
3:31 144 阶交换群有十种
3:54 若尔当块
4:23 对照表
4:53 下一集：表示论

上一集：域是向量空间 <S3E01 链接>
下一集：群用矩阵来作用：表示论。

English version: <YouTube EN link>

出处：《九章算术·方田》“可半者半之，不可半者，副置分母子之数，以少减多，更相减损，求其等也”；汉明 (1950)；史密斯 (1861)；若尔当 (1870)；范德瓦尔登《近世代数》(1930–31)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #抽象代数 #线性代数
```

---

## X (x.com), English

**Single post** (with a clip of the relation matrix reducing to diag(2, 6, 12)):

```
There are exactly 10 abelian groups of order 144.

144 = 2⁴ · 3². Split the 4 five ways, the 2 two ways: 5 × 2 = 10. Same theorem gives Jordan form.

<YouTube link>
```

**Thread** (4 posts):

1. `Jordan form is the classification of abelian groups 🧵`
2. `A module is a vector space whose scalars can't divide. Over ℤ: abelian groups. Over F[x]: a space with one operator.`
3. `The Smith normal form turns relations into a diagonal: 2 | 6 | 12, so ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12.`
4. `Swap the prime p for x − λ and ℤ/pᵏ becomes a Jordan block. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Season 3, Episode 2 of Where the Roads Meet: modules.

The episode starts with the Hamming(7,4) code over 𝔽₂, defines modules over a ring, shows why torsion destroys bases, computes a Smith normal form, and reads the structure theorem for modules over a PID twice: as the classification of finite abelian groups (ten of order 144) and as Jordan normal form.

The Chinese edition adds 更相减损 from the Nine Chapters, the Euclidean algorithm that runs the Smith form.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Jordan form is secretly group theory`

**Caption:**

```
Swap the prime p for x − λ and the classification of abelian groups becomes Jordan form. Season 3, part 2.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Why ℤ/2 has no basis`

---

## bilibili（中文）

**标题**（任选其一）

1. 【殊途同归 S3E02】模：一个定理，两种分类
2. 【线性代数·第三季第2集】若尔当标准形其实是群论
3. 【S3E02】更相减损与史密斯标准形

**简介**

```
Whyme Labs 数学系列第三季第 2 集。
第三季第 2 集：模。
汉明码、模的定义、挠与基的丢失、史密斯标准形、结构定理在 ℤ 上（144 阶交换群十种）和在 F[x] 上（若尔当块）的两种读法。
中文版另加《九章算术》更相减损术。

00:00 两季的两道题
00:53 热身：汉明码
01:28 模
01:57 挠：ℤ/2 没有基
02:32 史密斯标准形
03:07 更相减损
03:31 144 阶交换群有十种
03:54 若尔当块
04:23 对照表
04:53 下一集：表示论

上一集：域是向量空间 <B 站 S3E01 链接>
下一集：表示论

出处：《九章算术·方田》“可半者半之，不可半者，副置分母子之数，以少减多，更相减损，求其等也”；汉明 (1950)；史密斯 (1861)；若尔当 (1870)；范德瓦尔登《近世代数》(1930–31)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 抽象代数, 线性代数, 模, 交换群, 汉明码, 史密斯标准形, 若尔当标准形, 结构定理, 更相减损, 殊途同归

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 殊途同归（第三季，第 2 集）
**封面：** `thumbnails/png/S3E02-ZH.png`（一个对角矩阵写着 2、6、12，下方三个大小不同的钟面，大字“两道题 一个定理”）

**动态：** `第三季第 2 集：模。144 阶交换群有几种？唯一特征值是 2 的矩阵有几种？同一个定理。`

---

## 抖音

**画面首秒文字：** `若尔当标准形其实是群论`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S3E02-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S3E02-ZH.png`

**标题 / 文案**（任选其一）

1. `144 阶交换群恰好十种 #数学 #涨知识 #代数`
2. `若尔当标准形是群论 #数学 #科普 #线性代数`
3. `更相减损和史密斯标准形 #数学 #传统文化 #知识科普`

**合集：** 殊途同归（第三季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
