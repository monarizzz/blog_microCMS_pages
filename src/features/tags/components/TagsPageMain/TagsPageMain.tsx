import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import CategorySectionHeader from "@/commons/contents/components/CategorySectionHeader/CategorySectionHeader";
import FilterBtn from "@/commons/button/components/FilterBtn/FilterBtn";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/other/components/SeeAllRight/SeeAllRight";
import { Tags } from "@/infra/microCMS/schema/tags";

type Props = {
  tags: Tags[];
  // articleList: articleList[];
  activeTag: string | null;
};

const TagsPageMain = ({ tags, activeTag }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-16 pt-37.5 pr-10 pb-24 pl-11.75">
      <PageHeader title="Tags" />
      <div className="flex items-center gap-2 border-b border-outline-variant pb-6">
        <FilterBtn
          text="すべて"
          link="/tags"
          size="md"
          solid
          active={!activeTag}
        />
        {tags.map((tag, i) => (
          <FilterBtn
            key={i}
            text={`#${tag.name}`}
            link={`/tags?tag=${encodeURIComponent(tag.name)}`}
            size="md"
            solid
            // active={activeTag === name}
          />
        ))}
      </div>
      <div className="flex flex-col gap-16">
        {tags.map((tag) => (
          <section key={tag.name} className="flex flex-col gap-2">
            <CategorySectionHeader name={tag.name} count={` 記事`} />
            <div className="flex w-full flex-col">
              {/* {tag.articles.map((article) => (
                <ContentsRow
                  key={article.id}
                  // セクション見出し (CategorySectionHeader) が h2 なので、
                  // その下に並ぶ記事タイトルは h3 にする
                  headingLevel={3}
                  title={article.title}
                  summary={article.summary}
                  publishedAt={article.publishedAt}
                  tags={article.tags}
                  href={`/article/${article.id}`}
                />
              ))} */}
            </div>
            <div className="flex justify-end pt-5 pb-1">
              {/* <SeeAllRight
                href={`/article?tag=${encodeURIComponent(tag.name)}`}
                tag={{
                  name: tag.name,
                  count: Math.max(0, tag.count - tag.articles.length),
                }}
              /> */}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TagsPageMain;
