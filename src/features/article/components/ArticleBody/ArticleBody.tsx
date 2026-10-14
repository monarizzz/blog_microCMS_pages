import ArticleSectionHeading from "@/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading";
import BulletItem from "@/commons/contentsDetail/components/BulletItem/BulletItem";
import CodeBlock from "@/commons/contentsDetail/components/CodeBlock/CodeBlock";
import Paragraph from "@/commons/contentsDetail/components/Paragraph/Paragraph";
import Table from "@/commons/contentsDetail/components/Table/Table";

import type { ArticleBlock } from "../../types/articleBlock";
import ArticleInlineText from "../ArticleInlineText/ArticleInlineText";

type Props = {
  blocks: ArticleBlock[];
};

const ArticleBody = ({ blocks }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Paragraph key={index}>
                <ArticleInlineText inlines={block.content} />
              </Paragraph>
            );

          case "heading2":
            // 目次からのアンカー先。Header の下に隠れないよう
            // スクロール位置を Header の高さぶん手前で止める
            return (
              <div key={block.id} id={block.id} className="scroll-mt-44">
                <ArticleSectionHeading title={block.text} />
              </div>
            );

          case "bulletList":
            return (
              <ul key={index} className="flex w-full flex-col gap-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <BulletItem>
                      <ArticleInlineText inlines={item.content} />
                    </BulletItem>
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <CodeBlock key={index} language={block.language}>
                {block.code}
              </CodeBlock>
            );

          case "table":
            return (
              <Table key={index}>
                <thead>
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={headerIndex}>
                        <ArticleInlineText inlines={header} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          <ArticleInlineText inlines={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            );

          case "infoCard":
            return (
              <div
                key={index}
                className="w-full border border-outline-variant bg-on-primary p-8"
              >
                <p className="text-md/relaxed">
                  <ArticleInlineText inlines={block.content} />
                </p>
              </div>
            );
        }
      })}
    </div>
  );
};

export default ArticleBody;
