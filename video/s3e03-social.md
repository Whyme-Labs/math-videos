# S3E03 posting kit: Representations: Groups Acting by Matrices / 表示论：群用矩阵来作用

Season 3, episode 3 of *Where the Roads Meet* (《殊途同归》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s3e03-representations.mp4` (4:12, 16:9)
- Chinese edition: `out/s3e03-zh-biao-shi-lun.mp4` (4:35, 16:9). It has a scene the English edition
  doesn't: the 四斜毬文 lattice from 李诫's 《营造法式》 (1103) and its eight
  symmetries.
- Thumbnails: `thumbnails/png/S3E03-EN.png` and `S3E03-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S3E03-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S3E03-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 3 playlist on YouTube and the Season 3 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S3E02 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. How Chemists Read a Molecule With One Number | Where the Roads Meet S3E03
2. Representations: Groups Acting by Matrices | Where the Roads Meet S3E03
3. The Trace Is a Fingerprint | Where the Roads Meet S3E03

**Description**

```
A water molecule has three atoms and nine ways to move. Three slide it, three spin it, three really vibrate, and chemists sort those three before solving a single equation: two keep the mirror symmetry, one flips it. They read it off a small grid of 1s and −1s. Every group has such a grid, and it is made of one number per symmetry: the trace of a matrix.

Season 3, episode 3 of Whyme Labs' math series. A square's 8 symmetries are linear maps of the plane: a quarter turn r = [0 −1; 1 0], a flip s = [1 0; 0 −1], and doing one after another multiplies matrices. A representation sends each group element to a matrix with ρ(gh) = ρ(g)ρ(h). S₃ permuting three axes is a 3 × 3 representation, but the line through (1, 1, 1) never moves and the plane x + y + z = 0 is carried to itself, so every matrix splits into blocks 1 + 2. Maschke: average any inner product over the group and its unit ball becomes a circle no symmetry disturbs; then the perpendicular to an invariant subspace is invariant, so every representation of a finite group splits into irreducibles. Schur: a map that commutes with the group is zero or an isomorphism between irreducibles, and only a scalar λI from one to itself. Matrices change with the basis but traces don't, so the character χ(g) = tr ρ(g) is a fingerprint. The irreducible characters of S₃ form an orthogonal 3 × 3 table, and projecting the permutation character (3, 1, 0) gives 1, 0, 1. Back to water: count the atoms each symmetry leaves in place, remove slides and spins, project on the rows, and out come two symmetric vibrations and one that is not.

0:00 A molecule's fingerprint
0:53 Symmetries become matrices
1:22 S₃ on three axes splits 1 + 2
1:57 Maschke: average the inner product
2:26 Schur's lemma
2:50 Characters and the table
3:25 Water's three vibrations
3:54 Next: Fourier is duality

Previous episode: Modules: One Theorem, Two Classifications <S3E02 link>
Next: The shifts of a circle: Fourier is duality.

Also in Chinese (中文版): <YouTube ZH link>

Sources: G. Frobenius (1896) on characters; H. Maschke (1898); I. Schur (1905); J.-P. Serre, Linear Representations of Finite Groups; F. A. Cotton, Chemical Applications of Group Theory.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #grouptheory #linearalgebra
```

**Tags:** representation theory, group representation, character, trace, character table, Maschke theorem, Schur lemma, irreducible representation, S3, water molecule, vibrational modes, C2v, symmetry, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 化学家怎样用一个数读懂分子 | 殊途同归 S3E03
2. 表示论：群用矩阵来作用 | 殊途同归 S3E03
3. 迹是群的指纹 | 殊途同归 S3E03

**简介**

```
一个水分子有三个原子、九种运动方式：三种是平移，三种是转动，三种是真振动。化学家不解任何方程，就能先把这三种振动分好类：两种保持镜面对称，一种把它翻过来。他们看的是一张写满 1 和 −1 的小表。每个群都有这样一张表，每个对称只记一个数：矩阵的迹。

Whyme Labs 数学系列第三季第 3 集。正方形的 8 个对称都是平面的线性变换：转四分之一圈 r = [0 −1; 1 0]，翻转 s = [1 0; 0 −1]，对称接着对称做就是矩阵相乘。表示就是把每个群元变成矩阵，满足 ρ(gh) = ρ(g)ρ(h)。S₃ 置换三根坐标轴是一个 3 × 3 表示，可过 (1, 1, 1) 的线不动，平面 x + y + z = 0 也被带回自己，于是每个矩阵分成 1 + 2 两块。马施克：把任意内积在群上平均，单位球变成一个圆，任何对称都动不了它；于是不变子空间的垂直补也不变，有限群的表示总能拆成不可约的块。舒尔：和群交换的映射，在不可约表示之间要么是零要么是同构，从自己到自己只能是 λI。矩阵随基而变，迹不变，所以特征标 χ(g) = tr ρ(g) 就是指纹。S₃ 的不可约特征标排成一张正交的 3 × 3 表，置换表示 (3, 1, 0) 投影到各行得 1、0、1。回到水分子：数每个对称下不动的原子，减去平移和转动，投影到各行，就得到两种对称振动、一种不对称振动。中文版另加《营造法式》四斜毬文格眼。

0:00 分子的指纹
0:53 对称变成矩阵
1:22 S₃ 置换三根轴
1:57 马施克：把内积平均
2:26 舒尔引理
2:50 特征标和特征标表
3:25 《营造法式》格子门
3:48 水分子的三种振动
4:17 下一集：傅里叶就是对偶

上一集：模：一个定理，两种分类 <S3E02 链接>
下一集：圆上的平移：傅里叶就是对偶。

English version: <YouTube EN link>

出处：李诫《营造法式》(1103) 小木作制度·格子门；弗罗贝尼乌斯 (1896)；马施克 (1898)；舒尔 (1905)；塞尔《有限群的线性表示》。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #群论 #线性代数
```

---

## X (x.com), English

**Single post** (with a clip of the water molecule's three vibrations beside the table of ±1s):

```
Chemists sort a molecule's vibrations before solving any equation.

Count the atoms each symmetry leaves in place, project on a small table of ±1s, and the vibration types fall out. It's all traces.

<YouTube link>
```

**Thread** (4 posts):

1. `Representation theory: groups acting by matrices 🧵`
2. `A square's symmetries are 2 × 2 matrices; composing symmetries multiplies them.`
3. `Maschke: average an inner product over the group and everything splits into irreducible pieces.`
4. `Traces don't change with the basis, so χ(g) = tr ρ(g) fingerprints each piece. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Season 3, Episode 3 of Where the Roads Meet: representation theory.

The episode turns a square's symmetries into matrices, splits the permutation representation of S₃ into 1 + 2, proves Maschke's theorem by averaging an inner product, states Schur's lemma, builds the character table of S₃, and uses characters to classify the vibrations of a water molecule.

The Chinese edition adds the 四斜毬文 lattice from the Song building manual 《营造法式》 (1103).

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `How chemists read a molecule with one number`

**Caption:**

```
Count fixed atoms, project on the character table, and the vibration types fall out. Season 3, part 3.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `The trace is a fingerprint`

---

## bilibili（中文）

**标题**（任选其一）

1. 【殊途同归 S3E03】表示论：群用矩阵来作用
2. 【线性代数·第三季第3集】迹是群的指纹
3. 【S3E03】《营造法式》里的 D₄

**简介**

```
Whyme Labs 数学系列第三季第 3 集。
第三季第 3 集：表示论。
对称变成矩阵、S₃ 的置换表示拆成 1 + 2、马施克定理（平均内积）、舒尔引理、特征标与特征标表、用迹给水分子的振动分类。
中文版另加《营造法式》四斜毬文格眼。

00:00 分子的指纹
00:53 对称变成矩阵
01:22 S₃ 置换三根轴
01:57 马施克：把内积平均
02:26 舒尔引理
02:50 特征标和特征标表
03:25 《营造法式》格子门
03:48 水分子的三种振动
04:17 下一集：傅里叶就是对偶

上一集：模：一个定理，两种分类 <B 站 S3E02 链接>
下一集：傅里叶就是对偶

出处：李诫《营造法式》(1103) 小木作制度·格子门；弗罗贝尼乌斯 (1896)；马施克 (1898)；舒尔 (1905)；塞尔《有限群的线性表示》。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 群论, 线性代数, 表示论, 特征标, 迹, 马施克定理, 舒尔引理, 水分子, 分子振动, 营造法式, 殊途同归

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 殊途同归（第三季，第 3 集）
**封面：** `thumbnails/png/S3E03-ZH.png`（一个水分子下面一张 1 和 −1 的小表，大字“每个对称 只记一个数”）

**动态：** `第三季第 3 集：表示论。化学家不解方程，怎么知道水分子怎样振动？答案是迹。`

---

## 抖音

**画面首秒文字：** `化学家怎样用一个数读懂分子`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S3E03-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S3E03-ZH.png`

**标题 / 文案**（任选其一）

1. `一个数读懂分子振动 #数学 #涨知识 #化学`
2. `迹是群的指纹 #数学 #科普 #线性代数`
3. `营造法式里的对称群 #数学 #传统文化 #知识科普`

**合集：** 殊途同归（第三季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
