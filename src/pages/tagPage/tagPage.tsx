import { client } from "../../../libs/client";
import styles from "./tagPage.module.css";
import { useRouter } from "next/router";
import TagButton from "@/commons/tag/TagButton/TagButton";
import BlogCard from "@/commons/blog/BlogCard/BlogCard";
import { resolve } from "path";
import { useEffect } from "react";
import { Blog } from "@/infra/microCMS/schema/blog";

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

export default function TagPage({ category, blogListObject }) {
  console.log(category);
  return (
    <div className={styles.container}>
      <div className={styles.title}>タグページ</div>
      <div className={styles.tagButton}>{TagButton({ category })}</div>
      {/* {useRouter().query["id"] ? <div>filter</div> : null} */}

      {/* 後でここを「features/blog/BlogListByCategories/ BlogListByCategories.tsx」に記述する */}
      {blogListObject.map((categories, index: string) => (
        <>
          <div key={index}>
            <div>{categories.name}</div>
            {categories.blogList.contents.map((blog) => BlogCard({ blog }))}
          </div>
        </>
      ))}
    </div>
  );
}

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

// API のフィルター
// const data = await client.get({
//   endpoint: "blog",
//   queries: { limit: 3, filters: "categories[contains]" + categoryData.id },
// });
// return {
//   props: {
//     blog: data.contents
//   },
// };
// }
