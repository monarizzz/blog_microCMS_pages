import { client } from "../../libs/client";
import Link from "next/link";
import styles from "./index.module.css";
import { microCMSRichEditorHandler } from "microcms-rich-editor-handler";
import type { Transformer } from "microcms-rich-editor-handler";

export async function getStaticProps() {
  const data = await client.get({ endpoint: "blog" });
  return {
    props: {
      blog: data.contents,
    },
  };
}

// export const disableMediaTransformer: Transformer = ($) => {
//   $("img").remove();
// };

// export async function disableMediaHTML() {
//   const html = blog.body;
//   const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
//     transformers: [disableMediaTransformer],
//   });
//   console.log(transformedHtml);
// }

export function daysAgo(blog) {
  const today = new Date();
  const createDay = new Date(blog.createdAt);
}

export default function Home({ blog }) {
  return (
    <div className={styles.container}>
      {blog.map((blog) => (
        <div className={styles.card}>
          <Link href={`blog/${blog.id}`}>
            <span className={styles.title}>{blog.title}</span>
            <span className={styles.date}>
              {new Date(blog.createdAt).toLocaleDateString()}{" "}
              {blog.createdAt != blog.revisedAt ? "・編集済み" : null}
            </span>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: blog.body,
              }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
