# S2E12 posting kit: Eigenvectors / 特征向量

Season 2, episode 12 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e12-eigenvectors.mp4` (1:45, 16:9)
- Chinese edition: `out/s2e12-zh-te-zheng-xiang-liang.mp4` (1:45, 16:9). It has a scene the English edition
  doesn't: 杨辉三角 (贾宪's table, recorded by 杨辉 in 1261), whose shallow
  diagonals sum to the Fibonacci numbers.
- Thumbnails: `thumbnails/png/S2E12-EN.png` and `S2E12-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E12-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E12-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E11 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. The Golden Ratio Is an Eigenvalue | Spaces, Maps, and Measurements S2E12
2. Eigenvectors: A Map's Own Coordinates | Spaces, Maps, and Measurements S2E12
3. Where Binet's Fibonacci Formula Comes From | Spaces, Maps, and Measurements S2E12

**Description**

```
Pisa, 1202. In his book of calculation, Leonardo of Pisa asks how many pairs of rabbits there will be after a year, if every grown pair breeds a new pair each month. The answer is 1, 1, 2, 3, 5, 8, 13: each number the sum of the two before. In 1843 Jacques Binet wrote a formula that jumps straight to any term. It's full of square roots of five, and it always lands on a whole number.

Season 2, episode 12 of Whyme Labs' math series. Where could it come from? Watch the map [[4, 1], [2, 3]] act on arrows: almost every arrow is knocked off its line, but arrows on two lines only stretch, by 5 and by 2. Those are eigenvectors; use them as the basis and the map is just diag(5, 2). To find them, ask when A − λ can crush an arrow: when det(A − λ) = 0, a polynomial with roots 5 and 2, whose trace 7 and determinant 10 are their sum and product. A rotation has no real eigenvector, but over the complex numbers it has two, and every map on a complex space has at least one. The payoff: adding the last two numbers is a linear map with eigenvalues 1.618 (the golden ratio) and −0.618. One part grows, the other shrinks to nothing: that's Binet's formula, and why the ratios close in on the golden ratio.

0:00 Pisa, 1202
0:31 Two lines that only stretch
0:49 The characteristic polynomial
1:04 A rotation, and the complex numbers
1:16 Fibonacci and the golden ratio
1:33 Next: when diagonalization fails

Previous episode: Exterior Algebra and the Determinant <S2E11 link>
Next: shear a deck of cards and there's only one eigen-direction. What then?

Also in Chinese (中文版): <YouTube ZH link>

Sources: Leonardo of Pisa, Liber Abaci (1202); J. Binet (1843); A.-L. Cauchy (1829); D. Hilbert on Eigenwerte (1904); S. Axler, Linear Algebra Done Right, ch. 5.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #linearalgebra #fibonacci
```

**Tags:** eigenvector, eigenvalue, characteristic polynomial, diagonalization, Fibonacci, golden ratio, Binet formula, trace, determinant, rotation, complex eigenvalues, linear algebra, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 黄金比是个特征值 | 空间、映射与度量 S2E12
2. 特征向量：映射自己的坐标 | 空间、映射与度量 S2E12
3. 比内的斐波那契公式从哪儿来 | 空间、映射与度量 S2E12

**简介**

```
1202 年，比萨。列奥纳多在《算盘书》里问：每对成年兔子每月生一对小兔，一年后有多少对？答案是 1、1、2、3、5、8、13，每个数是前两个之和。1843 年，比内写出一个直接跳到任何一项的公式，里面全是根号五，结果却总是整数。

Whyme Labs 数学系列第二季第 12 集。它从哪儿来？看映射 [[4, 1], [2, 3]] 作用在箭头上：几乎每支箭头都被拨离原来的直线，只有两条直线上的箭头只拉伸，5 倍和 2 倍。这就是特征向量；用它们当基，映射就是 diag(5, 2)。怎么找？问 A − λ 什么时候压扁箭头：det(A − λ) = 0，根是 5 和 2；迹 7 是它们的和，行列式 10 是它们的积。旋转没有实特征向量，到了复数里有两个；复空间上每个映射至少有一个。压轴：“前两个相加”是一个线性映射，特征值是黄金比 1.618 和负 0.618；一部分增长，一部分缩到消失：这就是比内公式，也是相邻两项之比逼近黄金比的原因。中文版另加杨辉三角。

0:00 1202 年，比萨
0:24 只拉伸的两条直线
0:41 特征多项式
0:53 旋转与复数
1:02 杨辉三角
1:20 斐波那契与黄金比
1:36 下一集：对角化失灵的时候

上一集：外代数与行列式 <S2E11 链接>
下一集：推一叠纸牌，只得到一个特征方向，那怎么办？

English version: <YouTube EN link>

出处：杨辉《详解九章算法》(1261)；列奥纳多《算盘书》(1202)；比内 (1843)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #线性代数 #斐波那契
```

---

## X (x.com), English

**Single post** (with a clip of the arrow fan where only two lines' arrows stay on their lines):

```
Binet's Fibonacci formula is full of √5 and always gives a whole number.

The reason: "add the last two" is a linear map, and its eigenvalues are the golden ratio 1.618 and −0.618. One part grows; the other dies away.

<YouTube link>
```

**Thread** (4 posts):

1. `Where does the golden ratio in the Fibonacci numbers come from? 🧵`
2. `A linear map knocks most arrows off their lines. Eigenvectors are the arrows it only stretches. In that basis the map is diagonal.`
3. `Fibonacci: (a, b) → (a + b, a) is linear, with eigenvalues φ = 1.618 and ψ = −0.618.`
4. `Each step multiplies one coordinate by φ and the other by ψ, which shrinks to 0. That's Binet's formula, and why Fₙ₊₁/Fₙ → φ. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 12 of Season 2, Spaces, Maps, and Measurements: eigenvectors.

Eigenvectors are the directions a linear map doesn't turn, only stretches. In those coordinates any diagonalizable map becomes simple multiplication. The episode finds them with the characteristic polynomial, explains why trace and determinant are the sum and product of eigenvalues, and shows why rotations need complex numbers.

The payoff is the Fibonacci sequence: its growth rate, the golden ratio, is an eigenvalue, which is where Binet's formula comes from. The Chinese edition adds Yang Hui's triangle (1261), whose diagonals sum to the Fibonacci numbers.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `The golden ratio is an eigenvalue`

**Caption:**

```
Fibonacci's rabbits, Binet's formula and the golden ratio: all one eigenvector. Season 2, part 12.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `A formula full of √5 that always gives whole numbers`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E12】特征向量：黄金比是个特征值
2. 【线性代数·第二季第12集】比内公式从哪儿来
3. 【S2E12】杨辉三角的斜线里，藏着斐波那契数

**简介**

```
Whyme Labs 数学系列第二季第 12 集。
1202 年斐波那契的兔子；1843 年比内公式，满是根号五却总是整数。
只拉伸的两条直线：特征向量，5 倍和 2 倍，在这组基下映射就是 diag(5, 2)。特征多项式：det(A − λ) = 0，迹是和、行列式是积。旋转：没有实特征向量，复数里有两个。压轴：斐波那契的特征值是黄金比 1.618 和负 0.618，一部分增长、一部分消失。
中文版另加南宋杨辉《详解九章算法》(1261) 记载的贾宪“开方作法本源图”：斜线之和正是 1、1、2、3、5、8、13。

00:00 1202 年，比萨
00:24 只拉伸的两条直线
00:41 特征多项式
00:53 旋转与复数
01:02 杨辉三角
01:20 斐波那契与黄金比
01:36 下一集：对角化失灵的时候

上一集：外代数与行列式 <B 站 S2E11 链接>
下一集：对角化失灵的时候

出处：杨辉《详解九章算法》(1261)；列奥纳多《算盘书》(1202)；比内 (1843)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 线性代数, 特征向量, 特征值, 特征多项式, 对角化, 斐波那契, 黄金比, 杨辉三角, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 12 集）
**封面：** `thumbnails/png/S2E12-ZH.png`（一条黄金比直线上排着斐波那契点，大字“黄金比 是个特征值”）

**动态：** `第二季第 12 集：特征向量。比内公式为什么满是根号五却总是整数？顺带看杨辉三角里的斐波那契数。`

---

## 抖音

**画面首秒文字：** `黄金比是个特征值`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E12-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E12-ZH.png`

**标题 / 文案**（任选其一）

1. `满是根号五，结果却总是整数 #数学 #涨知识 #线性代数`
2. `斐波那契的兔子与黄金比 #数学 #科普`
3. `杨辉三角的斜线里藏着斐波那契数 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
