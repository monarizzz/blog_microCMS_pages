import { client } from "../../../libs/microCMS/utils/client";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import TagMain from "@/commons/tag/TagButton/TagMain/TagMain";
import { NextPage } from "next";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: Blog;
  category: CategoryList;
  blogCategoryList: any;
};

export const getServerSideProps = async () => {
  const categoryData = await client.getList({ endpoint: "categories" });
  const categoryIds = categoryData.contents.map((category) => {
    return category.id;
  });

  const promises = categoryIds.map((categoryId) => {
    return client.getList({
      endpoint: "blog",
      queries: { limit: 3, filters: `categories[contains]${categoryId}` },
    });
  });

  const blogListByCategory = await Promise.all(promises);

  const blogCategoryList = categoryData.contents.map((category, index) => {
    return {
      name: category.name,
      blogList: blogListByCategory[index],
    };
  });
  return {
    props: {
      category: categoryData.contents,
      blogCategoryList,
    },
  };
};

const ArticleRecentTagPage: NextPage<Props> = ({
  category,
  blogCategoryList,
}) => {
  return <TagMain category={category} blogCategoryList={blogCategoryList} />;
};
export default ArticleRecentTagPage;

{
  /* <div key={category.id}>
<Link
  href={`./tag/?id=${category.id}`}
  className={styles.tag}
  key={category.name}
>
  {category.name}
</Link>

{blog.categories ? <div>tag</div> : <div>none</div>}
</div> */
}

//  "blog.map((blog) => blogContents({ blog }))"
// export function BlogListGroup({ blog, category }) {
//   return blog.map((blog) => (
//     <div>
//       {blog.categories.length > 0 ? (
//         blogContents({ blog })
//       ) : (
//         <>
//           <div>タグ未設定</div>
//           {blogContents({ blog })}
//         </>
//       )}
//     </div>
//   ));
// }
