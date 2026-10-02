import type { Metadata } from "next";
import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import ArticleDetailMain from "@/features/article/components/ArticleDetailMain/ArticleDetailMain";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import { getArticle } from "@/infra/microCMS/api/getArticle";
import { getArticleDetail } from "@/infra/microCMS/api/getArticleDetail";

type Props = {
  params: Promise<{ id: string }>;
};

/** microCMS の 1 リクエストあたりの上限 */
const MICROCMS_MAX_LIMIT = 100;

/**
 * ビルド時に生成する記事の id を全件辿って集める。
 *
 * 取得に失敗しても空配列を返す。ここで throw すると記事ページが
 * 1 枚も生成できずビルドが落ちるため、生成をリクエスト時へ委ねる。
 * 未知の id はリクエスト時に生成される（`dynamicParams` の既定は true）。
 */
export const generateStaticParams = async () => {
  try {
    const ids: { id: string }[] = [];

    for (let offset = 0; ; offset += MICROCMS_MAX_LIMIT) {
      const { contents, totalCount } = await getArticle({
        limit: MICROCMS_MAX_LIMIT,
        offset,
        fields: "id",
        orders: "-publishedAt",
      });

      ids.push(...contents.map(({ id }) => ({ id })));

      if (ids.length >= totalCount || contents.length === 0) {
        return ids;
      }
    }
  } catch {
    return [];
  }
};

/** description の最大長。OGP の実効表示長からこちらで決めた値 */
const DESCRIPTION_MAX_LENGTH = 120;

/**
 * ブロック要素と `<br>`。タグを単に除去すると
 * `<p>一段目</p><p>二段目</p>` が `一段目二段目` に繋がるため、
 * これらの境界だけは空白に置き換える。
 */
const BLOCK_TAG_PATTERN =
  /<\/?(?:p|div|br|hr|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|blockquote|pre|figure|figcaption|section|article)\b[^>]*>/gi;

/** 名前付き文字参照。microCMS のリッチテキストに出るものだけ手当てする */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Unicode のスカラー値か（範囲内で、かつサロゲート単体でない） */
const isValidCodePoint = (codePoint: number) =>
  Number.isInteger(codePoint) &&
  codePoint >= 0 &&
  codePoint <= 0x10ffff &&
  !(codePoint >= 0xd800 && codePoint <= 0xdfff);

/**
 * 文字参照をデコードする。`&amp;lt;` が `<` にならないよう、
 * 実体参照は 1 度しか展開しない（再帰的に走らせない）。
 */
const decodeEntities = (text: string) =>
  text.replace(
    /&(#\d+|#[xX][0-9a-fA-F]+|[a-zA-Z]+);/g,
    (match, ref: string) => {
      if (ref.startsWith("#")) {
        const codePoint =
          ref.startsWith("#x") || ref.startsWith("#X")
            ? Number.parseInt(ref.slice(2), 16)
            : Number.parseInt(ref.slice(1), 10);

        // 本文は外部 CMS の入力なので、Unicode の範囲外
        // （`&#1114112;` など）やサロゲート単体が来ても
        // String.fromCodePoint で RangeError / 不正な文字列にならないよう、
        // 呼ぶ前に弾いて元の文字列のまま残す
        return isValidCodePoint(codePoint)
          ? String.fromCodePoint(codePoint)
          : match;
      }

      return NAMED_ENTITIES[ref.toLowerCase()] ?? match;
    },
  );

/** リッチテキストの HTML から og:description 用の平文を作る */
const toDescription = (html: string) => {
  const text = decodeEntities(
    html
      // 中身が本文でないタグは、タグごと落とさないと中のコードが混ざる
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(BLOCK_TAG_PATTERN, " ")
      .replace(/<[^>]*>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();

  return text.length > DESCRIPTION_MAX_LENGTH
    ? `${text.slice(0, DESCRIPTION_MAX_LENGTH)}…`
    : text;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  // 存在しない ID では microCMS が 404 を投げる。ここで落とすと
  // ページ本体より先にメタデータ生成で 500 になるため、既定値に退避する
  const article = await getArticleDetail(id).catch(() => null);

  if (!article) {
    return buildPageMetadata({
      title: "記事",
      description: "記事ページです。",
      path: `/article/${id}`,
      type: "article",
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: toDescription(article.content),
    path: `/article/${id}`,
    type: "article",
  });
};

const ArticleDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <LayoutMain>
      <ArticleDetailMain id={id} />
    </LayoutMain>
  );
};

export default ArticleDetailPage;
