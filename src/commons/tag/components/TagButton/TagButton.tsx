"use client";

import { Category } from "@/libs/schema/contents/Category/category";
import { useSearchParams } from "next/navigation";
import TagButtonText from "../TagButtonText/TagButtonText";

export type Props = {
  category: Category[];
  maxLength?: number;
};

const TagButton = ({ category, maxLength }: Props) => {
  const query = useSearchParams()?.get("cat");
  return (
    <div>
      {category.slice().map((category) => (
        <TagButtonText
          key={category.id}
          name={category.name}
          maxLength={maxLength}
          isSelected={category.id === query}
          categoryId={category.id}
        />
      ))}
    </div>
  );
};

export default TagButton;
