import ArticleRow from "@/commons/article/components/ArticleRow/ArticleRow";
import CategorySectionHeader from "@/commons/article/components/CategorySectionHeader/CategorySectionHeader";
import FilterBtn from "@/commons/layout/components/FilterBtn/FilterBtn";
import PageHeader from "@/commons/layout/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/layout/components/SeeAllRight/SeeAllRight";

//TODO:仮置き
const totalCount = 38;
const filters = ["Next.js", "設計", "TypeScript", "テスト"];
const sections = [
  { name: "Next.js", count: 12, shown: 3 },
  { name: "設計", count: 11, shown: 3 },
  { name: "TypeScript", count: 8, shown: 2 },
];

type Props = {
  activeTag?: string;
};

const TagsPageMain = ({ activeTag }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-16 pt-[150px] pr-10 pb-24 pl-[47px]">
      <PageHeader
        title="Tags"
        count={`${totalCount} 記事 / ${sections.length + 1} カテゴリ`}
      />
      <div className="flex items-center gap-2 border-b border-outline-variant pb-6">
        <FilterBtn
          text="すべて"
          link="/tags"
          size="md"
          solid
          active={!activeTag}
        />
        {filters.map((name) => (
          <FilterBtn
            key={name}
            text={`#${name}`}
            link={`/tags?tag=${encodeURIComponent(name)}`}
            size="md"
            solid
            active={activeTag === name}
          />
        ))}
      </div>
      <div className="flex flex-col gap-16">
        {sections.map((section, index) => (
          <section key={section.name} className="flex flex-col gap-2">
            <CategorySectionHeader
              name={section.name}
              count={`${section.count} 記事`}
              anchor={index === 0}
            />
            <div className="flex w-full flex-col">
              {Array.from({ length: section.shown }, (_, i) => (
                <ArticleRow key={i} />
              ))}
            </div>
            <div className="flex justify-end pt-5 pb-1">
              <SeeAllRight
                href={`/article?tag=${encodeURIComponent(section.name)}`}
                tag={{
                  name: section.name,
                  count: section.count - section.shown,
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TagsPageMain;
