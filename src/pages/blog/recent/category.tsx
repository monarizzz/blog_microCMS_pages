import { getCategoriesList } from "@/infra/microCMS/repositories/contents/getCategoriesList";
import {
  CategoryList,
  BlogsByCategory,
} from "@/libs/schema/contents/Category/category";
import { GetStaticProps, NextPage } from "next";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { useSession } from "next-auth/react";
import { getCategoryWithBlogList } from "@/features/blog/utils/getCategoryWithBlogList";
import CategoryMain from "@/features/blog/components/CategoryMain/CategoryMain";

type Props = {
  categoryWithBlogList: BlogsByCategory[];
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
