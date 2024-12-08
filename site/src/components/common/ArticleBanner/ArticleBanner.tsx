import Link from "next/link";
import { Article } from "@/types";
import { CategoryTag } from "..";
import Image from "next/image";

export const ArticleBanner:React.FC<{data: Article}> = ({data}) => {
    return (
        <Link href={`/article/${data.url}`} className="w-full cursor-pointer p-2 flex flex-row gap-2 text-black">
          <Image
            src={
              data.thumbnail ||
              "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
            alt=""
            width={4 * 70}
            height={3 * 70}
            className="max-w-[160px] aspect-[4/3] object-cover p-2"
          />
          <div className="flex flex-col gap-1">
            <CategoryTag href={data.category} className="text-xs font-thin py-1 w-fit">{data.category}</CategoryTag>
            <p className="hover:underline">{data.title}</p>
            {/* <p className="w-fit text-xs font-thin left-full -translate-x-full relative">{data.author.name}</p> */}
          </div>
        </Link>
    );
  };