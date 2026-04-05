# 恐竜占い — 画像素材チェックリスト

作成・差し替え用。透過 PNG 推奨（トレカ上で重ねるため）。

---

## 1. 恐竜キャラ画像（ライフパス → タイプ）

**配置先:** `public/dinosaur/`  
**命名:** `{ライフパス番号}.png`（`dinosaurData.ts` の `image` と一致）

| ファイル | タイプ名 | コード上の指定 | 現状 |
|----------|----------|----------------|------|
| `1.png` | ティラノサウルス | `/dinosaur/1.png` | あり |
| `2.png` | マイアサウラ | （未設定・追加推奨） | **要作成** |
| `3.png` | プテラノドン | `/dinosaur/3.png` | あり |
| `4.png` | アンキロサウルス | `/dinosaur/4.png` | あり |
| `5.png` | ヴェロキラプトル | （未設定・追加推奨） | **要作成** |
| `6.png` | トリケラトプス | `/dinosaur/6.png` | あり |
| `7.png` | ステゴサウルス | `/dinosaur/7.png` | あり |
| `8.png` | スピノサウルス | `/dinosaur/8.png` | あり |
| `9.png` | ブラキオサウルス | `/dinosaur/9.png` | あり |
| `11.png` | パラサウロロフス | （未設定・追加推奨） | **要作成** |
| `22.png` | アルゼンチノサウルス | （未設定・追加推奨） | **要作成** |
| `33.png` | オヴィラプトル | （未設定・追加推奨） | **要作成** |

**足りない枚数（恐竜ドット絵）: 5 ファイル**（2, 5, 11, 22, 33）

配置後は `app/data/dinosaurData.ts` の該当 `DinosaurEntry` に  
`image: "/dinosaur/2.png"` のように追記する。

---

## 2. 属性アイコン（バースデーナンバー）

**配置先（想定）:** `public/dinosaur/elements/`  
**用途:** 図鑑・将来のトレカ装飾・一覧表示（`dinosaurElementData.ts` の `image` にパスを入れる想定）

| ファイル名（例） | 属性 | `key` | 備考 |
|------------------|------|-------|------|
| `icon-fire.png` または `icon-1.png` | 炎 | fire | |
| `icon-water.png` / `icon-2.png` | 水 | water | |
| `icon-wind.png` / `icon-3.png` | 風 | wind | |
| `icon-earth.png` / `icon-4.png` | 大地 | earth | |
| `icon-thunder.png` / `icon-5.png` | 雷 | thunder | |
| `icon-forest.png` / `icon-6.png` | 森 | forest | |
| `icon-ice.png` / `icon-7.png` | 氷 | ice | |
| `icon-metal.png` / `icon-8.png` | 鉄 | metal | |
| `icon-light.png` / `icon-9.png` | 光 | light | |
| `icon-star.png` / `icon-11.png` | 星 | star | |
| `icon-rainbow.png` / `icon-22.png` | 虹 | rainbow | |

**枚数: 11 ファイル（未配置・コード未接続）**

---

## 3. 属性背景（任意）

**配置先（想定）:** `public/dinosaur/elements/`  
**用途:** 診断カード上部の背景差し替え（`DinosaurElement.bgImage` 用）

| ファイル名（例） | 属性 |
|------------------|------|
| `bg-fire.png` … `bg-rainbow.png` | 各属性1枚 |

**枚数: 最大 11 ファイル（未配置・現状は CSS グラデのみ）**

---

## 4. まとめ

| カテゴリ | 必要数（目安） | 状態 |
|----------|----------------|------|
| 恐竜 `*.png`（2,5,11,22,33） | 5 | **未ファイル** |
| 属性アイコン | 11 | 未作成・未配線 |
| 属性背景 | 0〜11 | 任意 |

画像がなくてもアプリは絵文字・グラデで動作する。
