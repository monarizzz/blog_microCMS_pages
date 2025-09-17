import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import TagMain from "@/features/blog/tag/components/TagMain/TagMain";
import { getBlogCategoryList } from "@/features/blog/tag/services/getBlogCategoryList";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/infra/microCMS/schema/Category/category";
import { GetStaticProps, NextPage } from "next";

type Props = {
  categoryWithBlogList: CategoryWithBlogList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getBlogCategoryList();

  return {
    props: {
      category: categoryData.contents,
      categoryWithBlogList: blogCategoryListData,
    },
    revalidate: 86400,
  };
};

const ArticleRecentTagPage: NextPage<Props> = ({
  category,
  categoryWithBlogList,
}) => {
  return (
    <Commonlayout>
      <TagMain
        category={category}
        categoryWithBlogList={categoryWithBlogList}
      />
    </Commonlayout>
  );
};

export default ArticleRecentTagPage;
