import { client } from "../../../libs/client";
import { Blog } from "@/infra/microCMS/schema/blog";
import TagMain from "@/commons/tag/TagMain/TagMain";

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

  const blogListObject = categoryData.contents.map((category, index) => {
    return {
      name: category.name,
      blogList: blogListByCategory[index],
    };
  });
  return {
    props: {
      category: categoryData.contents,
      blogListObject,
    },
  };
};

const TagPage = ({ category, blogListObject }) => {
  return TagMain({ category, blogListObject });
};
export default TagPage;

{
  /* <div key={category.id}>
<Link
  href={`./tag/?id=${category.id}`}
  className={styles.tag}
  key={category.name}
>
  {category.name}
</Link>
{console.log(blog.categories)}
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
