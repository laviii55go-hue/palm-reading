# DESIGN.md - 手のひらの予言者（palm-reading）

## Project Overview

| 項目 | 内容 |
|------|------|
| プロジェクト名 | 手のひらの予言者 |
| URL | https://uranai-tenohira.jp |
| 説明 | 手相・夢占い・動物占い・数秘術・タロットなど多彩な占いが無料で楽しめる総合占いサイト |
| フレームワーク | Next.js 16.1.6 (App Router) |
| スタイリング | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| フォント | Geist / Geist Mono (Google Fonts via `next/font`) |
| ホスティング | Netlify (`@netlify/plugin-nextjs`) |
| AI連携 | Anthropic Claude SDK, Google Generative AI, OpenAI |

---

## Design Tokens

### Colors

Tailwind CSS v4 のユーティリティクラスを直接使用。カスタムカラー定義はなく、Tailwind 標準パレットで統一。

#### Primary（紫系 - ブランドカラー）

| 用途 | クラス | 参考HEX |
|------|--------|---------|
| メインタイトル | `text-purple-900` | #581c87 |
| 見出し・強調 | `text-purple-800` | #6b21a8 |
| テキスト | `text-purple-700` | #7e22ce |
| ステップ完了 | `bg-purple-600` | #9333ea |
| ステップ現在 | `bg-purple-400` | #c084fc |
| ボーダー | `border-purple-300` | #d8b4fe |
| ページ背景 | `from-purple-50` | #faf5ff |

#### Secondary（violet系 - ナビゲーション）

| 用途 | クラス | 参考HEX |
|------|--------|---------|
| アクティブテキスト | `text-violet-600` | #7c3aed |
| ホバー背景 | `bg-violet-100` | #ede9fe |
| アクティブ押下 | `bg-violet-200` | #ddd6fe |

#### Accent（各占いページ別テーマカラー）

| 占いページ | テーマカラー | 背景グラデーション |
|-----------|------------|-------------------|
| トップ / AI手相 | purple | `from-purple-50 to-white` |
| 今日の運勢 | rose | `from-rose-50 via-pink-50 to-fuchsia-50` |
| 血液型占い | rose | `from-rose-50 to-white` |
| 夢占い | indigo | `from-indigo-50 to-white` |
| 動物占い | green | `from-green-50 to-white` |
| 数秘術コラム | violet | `from-violet-50 to-white` |
| 性格診断コラム | teal | `from-teal-50 to-white` |
| タロットコラム | purple | `from-purple-50 via-violet-50 to-white` |

#### Fortune Section Colors（鑑定結果カード）

| セクション | グラデーション | ボーダー | テキスト |
|-----------|--------------|---------|---------|
| 健康運（lifeLine） | `from-emerald-50 to-green-100` | `border-emerald-200` | `text-emerald-700` |
| 恋愛運（heartLine） | `from-rose-50 to-pink-100` | `border-rose-200` | `text-rose-700` |
| 知性（headLine） | `from-sky-50 to-blue-100` | `border-sky-200` | `text-sky-700` |
| 仕事運（fateLine） | `from-violet-50 to-purple-100` | `border-violet-200` | `text-violet-700` |
| 総合アドバイス | `from-amber-50 to-yellow-100` | `border-amber-200` | `text-amber-700` |
| 辛口鑑定 | `from-red-50 to-orange-50` | `border-red-200` | `text-red-700` |

#### Neutral

| 用途 | クラス |
|------|--------|
| 本文テキスト | `text-gray-600` |
| サブテキスト | `text-gray-500` |
| 薄いテキスト | `text-gray-400` |
| ナビ非アクティブ | `text-slate-500` |
| 見出し（メニュー等） | `text-slate-800` |
| カテゴリラベル | `text-slate-500` |
| ボーダー | `border-slate-200` |
| 非アクティブ背景 | `bg-gray-200` |

#### Background

| 用途 | クラス / CSS変数 |
|------|-----------------|
| ライトモード | `--background: #ffffff` |
| ダークモード | `--background: #0a0a0a` |
| ページ全体 | `bg-gradient-to-b from-{color}-50 to-white`（ページ別） |
| メインカード | `bg-white` |
| ナビバー | `bg-white/95 backdrop-blur` |

### Typography

#### Font Family

```css
/* プライマリ */
--font-sans: var(--font-geist-sans);  /* Geist Sans */

/* モノスペース */
--font-mono: var(--font-geist-mono);  /* Geist Mono */

/* フォールバック */
body { font-family: Arial, Helvetica, sans-serif; }
```

#### Font Sizes（Tailwindクラス）

| 用途 | クラス | 実サイズ |
|------|--------|---------|
| ページタイトル（h1） | `text-2xl font-bold` / `font-black` | 1.5rem (24px) |
| セクション見出し（h2） | `text-2xl font-bold` | 1.5rem (24px) |
| グループ見出し（h3） | `text-lg font-black` | 1.125rem (18px) |
| カテゴリラベル | `text-base font-black` | 1rem (16px) |
| カード見出し | `text-sm font-bold` | 0.875rem (14px) |
| 本文 | `text-sm` | 0.875rem (14px) |
| サブテキスト・説明 | `text-xs` | 0.75rem (12px) |
| ナビラベル・極小 | `text-[10px]` | 10px |

#### Font Weights

| 用途 | クラス |
|------|--------|
| 最太字（ページタイトル・ランキング） | `font-black` (900) |
| 太字（見出し・ボタン） | `font-bold` (700) |
| やや太（アクティブナビ） | `font-semibold` (600) |
| 中太（カードラベル） | `font-medium` (500) |
| 通常 | デフォルト (400) |

### Spacing

Tailwind 標準スケール使用。主要パターン：

| 用途 | クラス | 値 |
|------|--------|-----|
| ページ横パディング | `px-4` | 1rem (16px) |
| ページ縦パディング | `py-6` | 1.5rem (24px) |
| カード内パディング | `p-4` ~ `p-6` | 1rem ~ 1.5rem |
| セクション間スペース | `space-y-6` ~ `space-y-8` | 1.5rem ~ 2rem |
| カード間スペース | `space-y-3` ~ `space-y-4` | 0.75rem ~ 1rem |
| 要素間小スペース | `gap-2` ~ `gap-3` | 0.5rem ~ 0.75rem |
| ボトムナビ高さ | `h-14` | 3.5rem (56px) |
| ボトムナビ分余白 | `pb-16` | 4rem (64px) |

### Border Radius

| 用途 | クラス | 値 |
|------|--------|-----|
| メインカード | `rounded-3xl` | 1.5rem (24px) |
| セクションカード | `rounded-2xl` | 1rem (16px) |
| ボタン | `rounded-xl` | 0.75rem (12px) |
| ナビアイテム | `rounded-lg` | 0.5rem (8px) |
| ピルボタン | `rounded-full` | 9999px |
| ステップインジケータ | `rounded-full` | 9999px |

---

## Component Patterns

### Page Layout（各占いページ共通）

```
min-h-screen bg-gradient-to-b from-{theme}-50 to-white
  └─ max-w-lg mx-auto px-4 py-6 space-y-6
      ├─ Header: TopBannerLink + ガイドリンク
      ├─ Hero: emoji + h1 + description
      ├─ Content Cards
      ├─ AdBanner（楽天・A8等）
      ├─ RakutenWidget
      ├─ FooterLinks
      └─ (BottomHeader: 固定ナビ - LayoutClientで配置)
```

最大幅は `max-w-lg` (512px) でモバイルファースト。一部ページは `max-w-md` (448px)。

### Card（カード）

**メインカード（トップページ）**
```
bg-white rounded-3xl shadow-lg p-6
```

**コンテンツカード（白背景・影なし）**
```
bg-white rounded-3xl shadow-sm p-5 space-y-3
```

**Fortune Link カード**
```
relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left
transition-all {panelGradient} {panelBorder}
hover:shadow-md hover:scale-[1.01]
```
- 左にemoji(text-3xl)または画像(48x48)
- 右端に矢印テキスト `→`
- ホバーで微拡大 + シャドウ

**結果セクションカード**
```
rounded-2xl border-2 p-4 bg-gradient-to-br {gradient} {border}
```
- グリッド配置: `grid grid-cols-2 gap-3`

### Button（ボタン）

**プライマリ（シェアボタン等）**
```
py-3 rounded-xl bg-black text-white font-semibold text-sm
hover:bg-gray-800 transition-colors
```

**LINEシェア**
```
py-3 rounded-xl bg-green-500 text-white font-semibold text-sm
hover:bg-green-600 transition-colors
```

**セカンダリ（もう一度占う）**
```
w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700
font-semibold hover:bg-purple-50 transition-colors
```

**ガイドリンクボタン**
```
text-xs text-{theme}-600 border border-{theme}-300 rounded-full
px-3 py-1 hover:bg-{theme}-50 transition-colors
```

**ピルナビボタン（ColumnNavPills）**
```
inline-flex items-center rounded-full border px-3 py-1
text-xs font-medium transition-colors
border-{color}-300 bg-{color}-50 text-{color}-700 hover:bg-{color}-100
```

**タブ切替**
```
flex rounded-2xl bg-white/80 p-1 gap-1 border border-{theme}-100
```

### Bottom Navigation（固定ボトムナビ）

```
fixed bottom-0 left-0 right-0 z-[80]
border-t border-slate-200 bg-white/95 backdrop-blur
supports-[backdrop-filter]:bg-white/80
```
- 5項目: トップ / 今日の運勢 / 占い(シート) / 基本知識 / 記事
- アイコン: 32x32 PNG画像
- ラベル: `text-[10px]`
- アクティブ: `text-violet-600 font-semibold bg-violet-100`
- 非アクティブ: `text-slate-500 hover:text-slate-700`

### Fortune Menu Sheet（占い一覧ドロップダウン）

```
fixed left-1/2 -translate-x-1/2 z-[70]
w-[min(320px,calc(100vw-32px))] max-h-[70vh]
bg-white rounded-2xl shadow-xl overflow-hidden
```
- オーバーレイ: `bg-black/20`
- グループ別に分類（毎日チェック / 自分を診断 / 気になったら / その他）
- ESCキーで閉じる対応

### Header（各ページ上部）

```
flex items-center justify-between
```
- 左: TopBannerLink（サイトロゴバナー画像 h-12）
- 右: ガイドリンク（rounded-full ピルボタン）

### Footer（FooterLinks）

```
text-center mt-4
```
- リンク: `text-gray-400 text-xs hover:underline`
- セパレータ: `text-gray-300 mx-2` (`|`)
- 項目: 基本知識まとめ / 記事一覧 / サイトマップ / プライバシーポリシー / 更新履歴

### Step Indicator（AI手相診断ステップ）

```
flex items-center justify-center gap-2
```
- 完了: `bg-purple-600 text-white` + チェックマーク
- 現在: `bg-purple-400 text-white ring-2 ring-purple-300`
- 未達: `bg-gray-200 text-gray-400`
- 接続線: `w-6 h-0.5 bg-purple-600`（完了）/ `bg-gray-200`（未完了）

### Star Rating（星評価）

```
flex gap-0.5
```
- 絵文字 `⭐` text-lg
- アクティブ: `opacity-100`
- 非アクティブ: `opacity-20`

### Dinosaur Trading Card（恐竜トレカ）

特殊コンポーネント。キラキラボーダー + 属性別カラースキーム:
- 外枠: `.dinosaur-tcard-border` (CSS animation shimmer)
- 上半分: 恐竜画像 + 属性グラデ背景 + sparkle/glint/aurora エフェクト
- 下半分: ステータスバー + 才能テキスト
- CSS変数で属性色を切替: `--d-shimmer-1`, `--d-shimmer-2`, `--d-glow-rgb`

---

## Layout

### Container

```
max-w-lg mx-auto px-4
```
- `max-w-lg` = 512px（メインコンテンツ幅）
- 一部コンポーネントは `max-w-md` (448px)

### Grid System

- 鑑定結果: `grid grid-cols-2 gap-3`
- 基本はフレックスボックスベースの1カラムレイアウト
- `space-y-*` による垂直スタック

### Breakpoints

Tailwind v4 デフォルト:

| ブレークポイント | 幅 | 使用箇所 |
|----------------|-----|---------|
| `sm` | 640px | ステップラベル表示 (`hidden sm:block`) |

実質モバイルファーストの1カラム設計。`max-w-lg` でデスクトップも中央寄せ。レスポンシブ分岐は最小限。

### Z-Index Management

| レイヤー | z-index | 用途 |
|---------|---------|------|
| オーバーレイ | `z-[60]` | メニューシート背景 |
| メニューシート | `z-[70]` | 占い一覧ドロップダウン |
| ボトムナビ | `z-[80]` | 固定ナビゲーションバー |

---

## Animation & Interaction

### トランジション（全コンポーネント共通）

```
transition-colors       /* 色変化（ホバー・アクティブ） */
transition-all          /* カードホバー（シャドウ+スケール） */
hover:scale-[1.01]      /* カードの微拡大 */
active:scale-[0.99]     /* プレスフィードバック */
```

### CSS Keyframe Animations（globals.css）

| アニメーション名 | 用途 | 時間 |
|----------------|------|------|
| `dinosaur-shimmer` | トレカ枠キラキラ | 3s linear infinite |
| `bounce-in` | バウンス登場 | - |
| `fade-in` | フェードイン | - |
| `slide-in-left/right` | スライドイン | - |
| `confetti-fall` | 紙吹雪 | - |
| `roulette-scroll` | ルーレット | - |
| `battle-shake` | バトル振動 | - |
| `charge-left/right` | 恐竜突進 | - |
| `winner-bounce` | 勝者バウンス | - |
| `victory-rotate` | 勝利回転 | - |
| `sparkle` | キラキラ点滅 | - |
| `victory-ring` | 拡大リング | - |
| `smoke-drift-1/2/3` | 煙エフェクト | - |

### DinosaurTradingCard 内 CSS-in-JS アニメーション

| アニメーション名 | 用途 | 時間 |
|----------------|------|------|
| `dinoSway` | 恐竜ゆらゆら | 3.2s ease-in-out infinite |
| `sparkleTwinkle` | 星キラキラ | 2.1s ease-in-out infinite |
| `glintSweep` | 光沢スイープ | 2.8s / 3.8s linear infinite |
| `auroraFloatA/B` | オーロラ揺らぎ | 4.6s / 5.1s ease-in-out infinite |
| `starPulse` | 星パルス | 1.8s ease-in-out infinite |
| `ringPulse` | リング明滅 | 2.7s ease-in-out infinite |
| `statGradientShift` | バーグラデシフト | 3.4s ease-in-out infinite |
| `statSparkleSweep` | バー光沢 | 1.9s linear infinite |

### Reduced Motion 対応

```css
@media (prefers-reduced-motion: reduce) {
  .dino-sway, .glint, .aurora, .shine-ring,
  .stat-bar-fill, .stat-bar-fill::after { animation: none; }
  .sparkle { animation: none; opacity: 0.3; }
  .sparkle-star { animation: none; opacity: 0.45; }
}
```

---

## Accessibility

### 実装済み

- `lang="ja"` をhtml要素に設定
- `aria-label` をナビゲーション要素に付与（"メインナビゲーション"、"占い一覧を開く/閉じる"、"閉じる"）
- ESCキーでメニューシート閉じる対応
- `focus-visible:bg-violet-100 focus-visible:outline-none` によるフォーカスインジケータ
- `touch-manipulation` によるタッチ操作最適化
- 画像に `alt` 属性（装飾画像は `alt=""`）
- `prefers-reduced-motion` でアニメーション無効化
- `prefers-color-scheme: dark` でダークモード対応（CSS変数レベル）
- セマンティックHTML: `<nav>`, `<section>`, `<h1>`〜`<h3>`

### 推奨改善事項

- ダークモード時のTailwindクラス対応（現在CSS変数のみ）
- フォーカスリング（`focus-visible:outline`）の視認性向上
- スクリーンリーダー向け `sr-only` テキストの追加検討

---

## Do's and Don'ts

### Do's

- ページ背景は `bg-gradient-to-b from-{theme}-50 to-white` のパターンを使う
- コンテンツ幅は `max-w-lg mx-auto px-4` で統一する
- カードは `rounded-2xl border-2 p-4` + グラデーション背景を基本とする
- ボタンは `rounded-xl py-3 font-semibold text-sm transition-colors` を基本とする
- 各占いページにテーマカラーを割り当て、背景・ボーダー・テキストで一貫して使う
- 絵文字を見出しやカードのアイコンとして積極的に使用する
- `transition-colors` / `transition-all` でインタラクションに滑らかさを持たせる
- `hover:shadow-md hover:scale-[1.01]` でカードのホバーフィードバックを入れる
- 新しい占いページを追加する場合は `CATEGORY_STYLES` のカラーパターンに沿って配色する
- フッターリンクは `FooterLinks` コンポーネントを再利用する
- 広告は `AdBanner` コンポーネントでセクション間に配置する

### Don'ts

- `tailwind.config.js` は使わない（Tailwind v4 は `@theme inline` + `postcss` 構成）
- カスタムカラーを CSS変数や設定ファイルに追加しない（Tailwind標準パレットで統一）
- ページ幅を `max-w-lg` 以上にしない（モバイルファースト設計の維持）
- 独自のCSS frameworkやUIライブラリを追加しない（Tailwindユーティリティのみ）
- ダークモード専用のデザインを新規作成しない（現時点ではライトモード中心）
- z-index を `z-[80]` より高くしない（ボトムナビが最上位レイヤー）
- `rounded-3xl` はメインカード・結果表示カードのみに使用し、乱用しない
- アニメーションを `globals.css` 以外のグローバルスコープに追加しない（コンポーネントスコープの styled-jsx を使う）
- `font-black` を本文テキストに使わない（見出し・ランキング数字のみ）
