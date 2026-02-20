import HomeMain from "@/features/home/components/HomePageMain/HomePageMain";
import { getBlogList } from "@/infra/microCMS/repositories/contents/getBlogList";
import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import getPlainText from "@/features/blog/utils/getPlainText";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infra/auth/authOptions";

// TODO:revalidateの設定
const HomePage = async () => {
  const data = await getBlogList({ queries: { limit: 15 } });
  const categoryData = await getCategoriesList({ queries: { limit: 10 } });

  const blogsWithPlainText = data.contents.map((blog) => ({
    ...blog,
    plainTextBody: getPlainText(blog.body),
  }));

  const session = await getServerSession(authOptions);

  return (
    <LayoutMain session={session}>
      <HomeMain
        blogsWithPlainText={blogsWithPlainText}
        category={categoryData.contents}
      />
    </LayoutMain>
  );
};

export default HomePage;

// テスト
