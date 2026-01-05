import { getCategoryWithBlogList } from "@/libs/blog/getCategoryWithBlogList";
import CategoryMain from "@/features/tag/components/CategoryMain/CategoryMain";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";
import {
  CategoryList,
  CategoryWithBlogList,
} from "@/libs/schema/Category/category";
import { GetStaticProps, NextPage } from "next";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
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

const CategoryPage: NextPage<Props> = ({ category, categoryWithBlogList }) => {
  const { data: session } = useSession();

  return (
    <LayoutMain session={session}>
      <CategoryMain
        category={category}
        categoryWithBlogList={categoryWithBlogList}
      />
    </LayoutMain>
  );
};

export default CategoryPage;
