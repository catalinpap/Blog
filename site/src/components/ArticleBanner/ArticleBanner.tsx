import Link from "next/link";
import { Article } from "@/types";
import { CategoryTag } from "../common";
import Image from "next/image";

export const ArticleBanner:React.FC<{data: Article}> = ({data}) => {
    return (
      <Link href={`/article/${data.url}`} className="cursor-pointer p-2 flex flex-col gap-1 text-black">
        {/* <p className="text-xs font-thin">{data.category}</p> */}
        <CategoryTag className="text-xs font-thin py-1 w-fit">{data.category}</CategoryTag>
        <p className="text-base font-bold">{data.title}</p>
        {/* <p className="w-fit text-xs font-thin left-full -translate-x-full relative">{data.author.name}</p> */}
      </Link>
    );
  };