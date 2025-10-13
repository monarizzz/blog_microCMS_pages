import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { getCategoryWithBlogList } from "@/libs/blog/getCategoryWithBlogList";
import TagMain from "@/features/tag/components/TagMain/TagMain";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";

type Props = {
  categoryWithBlogList: CategoryWithBlogList;
  category: CategoryList;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categoryData = await getCategoriesList({
    queries: { limit: 10, fields: ["id", "name"] },
  });
  const blogCategoryListData = await getCategoryWithBlogList();

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
  const { data: session } = useSession();

  return (
    <Commonlayout session={session}>
      <TagMain
        category={category}
        categoryWithBlogList={categoryWithBlogList}
      />
    </Commonlayout>
  );
};

export default ArticleRecentTagPage;
