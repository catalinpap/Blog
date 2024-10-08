import Link from "next/link";
import { Article } from "@/types";
import { CategoryTag } from "../common";

export const ArticleBanner:React.FC<{data: Article}> = ({data}) => {
    const {category, title, url} = data;
    return (
      <Link href={`/article/${url}`} className="cursor-pointer mb-4">
          <CategoryTag>{category}</CategoryTag>
          <p className="text-base font-light ">{title}</p>
      </Link>
    );
  };