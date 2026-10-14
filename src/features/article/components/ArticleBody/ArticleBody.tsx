import ArticleSectionHeading from "@/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading";
import ArticleH3 from "@/commons/contentsDetail/components/ArticleH3/ArticleH3";
import BulletItem from "@/commons/contentsDetail/components/BulletItem/BulletItem";
import CodeBlock from "@/commons/contentsDetail/components/CodeBlock/CodeBlock";
import NumberItem from "@/commons/contentsDetail/components/NumberItem/NumberItem";
import Paragraph from "@/commons/contentsDetail/components/Paragraph/Paragraph";
import Quote from "@/commons/contentsDetail/components/Quote/Quote";
import Table from "@/commons/contentsDetail/components/Table/Table";
import Divider from "@/commons/other/components/Divider/Divider";

import type { ArticleBlock, ArticleListItem } from "../../types/articleBlock";
import ArticleInlineText from "../ArticleInlineText/ArticleInlineText";

type Props = {
  blocks: ArticleBlock[];
};

/** 項目の下にぶら下がるブロック。項目の文字の頭に揃えて字下げする */
const ListItemChildren = ({ item }: { item: ArticleListItem }) =>
  item.children && item.children.length > 0 ? (
    <div className="flex w-full flex-col gap-4 pt-4 pl-8">
      <Blocks blocks={item.children} />
    </div>
  ) : null;

const Blocks = ({ blocks }: Props) =>
  blocks.map((block, index) => {
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

      case "heading3":
        return (
          <div key={block.id} id={block.id} className="scroll-mt-44">
            <ArticleH3>{block.text}</ArticleH3>
          </div>
        );

      case "bulletList":
        return (
          <ul key={index} className="flex w-full flex-col gap-4">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.content.length > 0 && (
                  <BulletItem>
                    <ArticleInlineText inlines={item.content} />
                  </BulletItem>
                )}
                <ListItemChildren item={item} />
              </li>
            ))}
          </ul>
        );

      case "numberedList": {
        const start = block.start ?? 1;
        return (
          <ol key={index} start={start} className="flex w-full flex-col gap-4">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.content.length > 0 && (
                  <NumberItem number={start + itemIndex}>
                    <ArticleInlineText inlines={item.content} />
                  </NumberItem>
                )}
                <ListItemChildren item={item} />
              </li>
            ))}
          </ol>
        );
      }

      case "code":
        // CodeBlock のヘッダは 1 枠だけ。pen (qvMsD) はファイル名を出しているので、
        // ファイル名が付いていればそちらを優先し、無ければ言語名を出す
        return (
          <CodeBlock key={index} language={block.filename ?? block.language}>
            {block.code}
          </CodeBlock>
        );

      case "table":
        return (
          <Table key={index}>
            {block.headers.length > 0 && (
              <thead>
                <tr>
                  {block.headers.map((header, headerIndex) => (
                    <th key={headerIndex}>
                      <ArticleInlineText inlines={header} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
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

      case "quote":
        return (
          <Quote key={index}>
            <ArticleInlineText inlines={block.content} />
          </Quote>
        );

      case "image":
        return (
          <figure
            key={index}
            className="flex w-full flex-col items-center gap-2"
          >
            {/* next/image は width / height が必須で、リッチエディタの画像には
                寸法が付かないことがある。microCMS の画像 API が ?w= で縮小済みの
                URL を返すので、最適化は任せず img で出す */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              loading="lazy"
              decoding="async"
              className="h-auto max-w-full rounded-lg"
            />
            {block.caption && (
              <figcaption className="w-full text-center text-sm text-on-surface-variant">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case "divider":
        return <Divider key={index} />;
    }
  });

const ArticleBody = ({ blocks }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Blocks blocks={blocks} />
    </div>
  );
};

export default ArticleBody;
