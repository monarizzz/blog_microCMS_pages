# DB設計（microCMS コンテンツモデル）

デザイン `design/New-ui.pen` の各画面から必要なデータを起こしたもの。

## API（エンドポイント）一覧

| API | 形式 | 用途 | 対応画面 |
|---|---|---|---|
| `articles` | リスト | ブログ記事 | Article List / Search / 記事詳細 |
| `tags` | リスト | トピック・技術の共通マスタ（`type`で区別） | 記事のタグ、実績の技術スタック、Profileの技術 |
| `experiences` | リスト | 制作物・インターン・ハッカソン等の実績 | Service Detail / ServiceCard / Profile のTimeline |
| `profile` | **単一オブジェクト** | Profile上部（名前・Bio・技術スタック） | Profile Page |

## 設計思想

### tags（トピックと技術を1マスタに統合）
トピック（`備忘録` `設計` `デザイン`など）と技術（`Next.js` `React`など）を**2つに分けず、1つの `tags` マスタ**にまとめ、各レコードの `type`（`トピック` / `技術`）で仕分ける。

- 同じ語が2箇所に存在しないので**重複・二重管理が原理的に起きない**
- 記事・実績・プロフィールすべてが**同じマスタを複数参照**するので、`Next.js` で横断検索できる
- 「技術だけ」「トピックだけ」の絞り込みは `type` でフィルタ
- 各APIの参照フィールドは「登録済みレコードから選択」になるため、入稿時に自由入力で変な値を紛れ込ませることはできない（マスタ管理のみ運用で担保）

### experiences（制作物・インターン・ハッカソン等を統合）
制作物・インターン・ハッカソンなど各種の実績を1つのAPIにまとめ、`kind`（種別）で区別する。

- `kind`（セレクト） … それが何か（`制作物` / `インターン` / `ハッカソン` …）。ラベルや詳細表示に使う。
- **Profile** … 公開済みの `experiences` を全件、`startDate` 昇順でTimeline表示（`hasDetailPage` は問わない）
- **Service一覧・Home本棚** … `experiences` を並べる
- **詳細ページ** … `hasDetailPage = true` のものだけ生成する

| `hasDetailPage` | 一覧カード | 詳細ページ | 
|:---:|---|:---:|
| `true` | 押下時に詳細ページへ遷移 | ○ | 
| `false` | 非リンク | × | 

- 初期値は`false`にし、本文を用意しないうちに空の詳細ページが生成される事故を防ぐ

#### 日付の持ち方（startDate と periodLabel）

- `startDate`（date・必須） … **開始日。並び替えの基準**。基本はこれでソートする。
- `endDate`（date・任意） … 終了日。`startDate 〜 endDate` の期間表示に使う。入れるかは任意（単に終了日を記録しないだけ）。進行中を示したいときは `periodLabel` に `（開発中）` などと書く。
- `periodLabel`（text・任意／空欄可） … 上記の日付の**隣に添える一言の補足**。日付そのものの代わりではない（例：`約2週間` / `（開発中）`）。不要なら空欄でよい。

→ 並び順は `startDate`（date）が担保し、期間は `startDate`/`endDate`、補足は `periodLabel` で添える。

### 本棚（ShelfBook / ShelfNote） - HomePage
`articles` や `experiences`（`hasDetailPage=true`のみ）を並べて見せる**ビュー**なので、専用データは持たない。

## ER図

エンティティ・関連・主要フィールドのみを示す。型・必須などの詳細は後述の「フィールド定義」を参照。

```mermaid
erDiagram
    articles     }o--o{ tags : "参照(トピック/技術)"
    experiences  }o--o{ tags : "参照(技術)"
    profile      }o--o{ tags : "参照(技術)"

    articles {
        string   id PK
        string   title
        richtext content
        ref      tags
    }

    tags {
        string id PK
        string name
        string type
    }

    experiences {
        string   id PK
        string   title
        string   kind
        boolean  hasDetailPage
        image    heroImage
        text     summary
        text     description
        ref      tags
        date     startDate
        date     endDate
        text     periodLabel
        string   role
        string   url
    }

    profile {
        string id PK
        string name
        text   bio
        ref    tags
    }
```

## フィールド定義

必須/任意・型はER図ではなくこの表に集約する（表に載っている＝仕様が確定している）。

### articles

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `title` | text | ✓ | 記事タイトル |
| `content` | richtext | ✓ | 本文 |
| `tags` | 複数参照(tags) | ✓ | トピック＋技術。`#` 表示 |

※ microCMS標準の `id` / `publishedAt` / `updatedAt` は自動付与のため上表には含めない。並び順や「新着」表示は `publishedAt` を利用。
※ 一覧カード・検索・SEO用に **`eyecatch`（image）/ `description`（text 抜粋）/ `slug`（text）** の追加を要検討（デザインの一覧・検索画面で必要になる想定）。

### tags
| フィールド | 型 | 必須 | 説明 |
|---|---|:---:|---|
| `name` | text | ✓ | 使用する名称 |
| `type` | select(`技術` / `トピック`) | ✓ | 仕分け用。未設定だと横断検索から漏れるため必須 |

### experiences
| フィールド | 型 | 必須 | 説明 |
|---|---|:---:|---|
| `title` | text | ✓ | 実績のタイトル |
| `kind` | select(`制作物` / `インターン` / `ハッカソン` …) | ✓ | 経験の種類。ラベル・詳細表示に使う。表示制御には使わない |
| `hasDetailPage` | boolean | | 詳細ページ（Service Detail）を生成するか。初期値OFF。一覧表示はMicroCMS標準の下書き/公開で制御するため本フラグとは無関係 |
| `summary` | text | | 一言解説（カード・冒頭に出す短い説明）。`description`とは別 |
| `description` | text | | 開発の詳細（本文） |
| `heroImage` | image | | 詳細ページ上部のメインビジュアル画像 |
| `tags` | 複数参照(tags) | | 技術スタック |
| `startDate` | date | ✓ | 開始日。並び替えの基準 |
| `endDate` | date | | 終了日。期間表示に使う |
| `periodLabel` | text | | 上記の日付の隣に添える一言（`約2週間` / `（現在開発中）` など・空欄可） |
| `role` | text | | 役割 |
| `url` | text | | 外部リンク |

### profile（単一オブジェクト・1件のみ）
| フィールド | 型 | 必須 | 説明 |
|---|---|:---:|---|
| `name` | text | ✓ | |
| `bio` | text | ✓ | |
| `tags` | 複数参照(tags) | | 技術スタック |

## microCMS実装メモ
- 多対多はすべて**複数参照フィールド**で表現（`articles→tags`、`experiences→tags`、`profile→tags`）。中間テーブルは作らない。
- `tags.type` はセレクトフィールド（`技術` / `トピック`）。**必須**にしてtype無しタグの混入を防ぐ。
  - 記事タグ表示 … `articles.tags` をそのまま `#` 表示（トピック・技術どちらも）
  - 記事の技術横断検索 … `tags`（`type=技術`）で `articles` と `experiences` を横断
  - 実績・プロフィールの技術表示 … 参照した `tags` のうち `type=技術` を表示
- `tags` 参照は「登録済みから選択」のため記事側の自由入力は不可。マスタへの不正な語の登録だけ運用ルールで防ぐ。
- `experiences.kind` はセレクトフィールド（`制作物` / `インターン` / `ハッカソン` など）。種類はラベル・詳細表示に使い、**表示制御には使わない**。
- 一覧の出し分け（Service一覧・Home本棚）は microCMS の**下書き/公開ステータス**に任せ、専用フィールドは持たない。
- 詳細ページ生成は `experiences.hasDetailPage`（boolean・初期値OFF）で制御。
- `experiences` の日付は `startDate`（date・必須／並び替え基準）と `endDate`（date・任意／空でも進行中の意味ではない）で期間を表し、`periodLabel`（text・任意）はその隣に添える一言の補足（進行中は `〜現在` などと記す）。
- `profile` は「オブジェクト形式」で作成（リストにしない）。
