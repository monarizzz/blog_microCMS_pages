import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import { toArticleShelf, toServiceShelf } from "@/features/home/toShelfItems";
import { getArticle } from "@/infra/microCMS/api/getArticle";
import { getExperiences } from "@/infra/microCMS/api/getExperiences";
import { isNotFoundError } from "@/infra/microCMS/isNotFoundError";

// metadata は定義しない。`src/app/layout.tsx` が title の default・og:url・
// canonical をいずれも "/" 向けに持っているため、ここで buildPageMetadata を
// 使うと title が「Home | Monelog」になってサイト名が出なくなる

/**
 * 1 段に並べる本の上限。棚は横スクロールなので pen の冊数（5 / 4）より多く載せ、
 * 残りは各段の「〜をすべて見る」に任せる
 */
const SHELF_BOOK_LIMIT = 10;

/**
 * 新しい記事から取得する。
 *
 * articles API が無い（404）ときだけ空の棚にする。記事の移行は最終フェーズで、
 * それまで microCMS には旧 blog しか無いため、ここで落とすと Home 全体が
 * 表示できない。404 以外（認証エラーや 5xx）は握り潰さない。Home は
 * ビルド時に静的生成されるので、投げればビルドが失敗して前のデプロイが残り、
 * 記事の段が欠けた Home を黙って公開せずに済む
 */
const fetchArticleShelf = async () => {
  try {
    const { contents } = await getArticle({
      limit: SHELF_BOOK_LIMIT,
      // 同じ publishedAt の順序を固定するため createdAt を第 2 キーにする（記事一覧と同じ）
      orders: "-publishedAt,-createdAt",
      fields: "id,title,publishedAt,createdAt,tags.name",
    });
    return toArticleShelf(contents);
  } catch (error) {
    if (isNotFoundError(error)) {
      console.warn(
        "articles API が見つからないため、Home の記事の棚を出しません",
      );
      return [];
    }
    throw error;
  }
};

const fetchServiceShelf = async () => {
  const { contents } = await getExperiences({
    limit: SHELF_BOOK_LIMIT,
    filters: "hasDetailPage[equals]true",
    orders: "-startDate",
    fields: "id,title,kind,hasDetailPage,heroImage,startDate",
  });
  return toServiceShelf(contents);
};

const Home = async () => {
  const [blogShelf, serviceShelf] = await Promise.all([
    fetchArticleShelf(),
    fetchServiceShelf(),
  ]);

  return <HomePageMain blogShelf={blogShelf} serviceShelf={serviceShelf} />;
};

export default Home;
