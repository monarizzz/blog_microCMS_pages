import HomeMain from "@/features/home/components/HomePageMain/HomePageMain";
import { GetStaticProps, NextPage } from "next";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import * as cheerio from "cheerio";
import { CategoryList } from "@/libs/schema/Category/category";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { BlogWithPlainTextList } from "@/libs/schema/Blog/blog";
import { useSession } from "next-auth/react";

type Props = {
  blogsWithPlainText: BlogWithPlainTextList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getBlogList({ queries: { limit: 15 } });
  const categoryData = await getCategoriesList({ queries: { limit: 10 } });

  const blogsWithPlainText = data.contents.map((blog) => {
    const $ = cheerio.load(blog.body);
    // brタグを改行文字に置換
    $("br").replaceWith("\n");
    // ブロック要素の末尾に改行文字を追加
    $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append("\n");
    const plainText = $.text().trim().slice(0, 150);
    return {
      ...blog,
      plainTextBody: plainText,
    };
  });

  return {
    props: {
      blogsWithPlainText: blogsWithPlainText,
      category: categoryData.contents,
    },
    revalidate: 86400,
  };
};

const HomePage: NextPage<Props> = ({ blogsWithPlainText, category }) => {
  const { data: session } = useSession();

  return (
    <Commonlayout session={session}>
      <HomeMain blogsWithPlainText={blogsWithPlainText} category={category} />
    </Commonlayout>
  );
};

export default HomePage;
