import Link from "next/link";
import { Article } from "@/types";
import { TopicTag } from "..";
import Image from "next/image";
import { config } from "@/config";

export const ArticleBanner:React.FC<{data: Article}> = ({data}) => {
    return (
        <Link href={`/article/${data.url}`} className="w-full cursor-pointer p-2 flex flex-row gap-2 text-black">
          <Image
            src={
              data.thumbnail ||
              config.defaultThumbnail}
            alt=""
            width={4 * 70}
            height={3 * 70}
            className="max-w-[160px] aspect-[4/3] object-cover p-2"
          />
          <div className="flex flex-col gap-1">
            <TopicTag href={data.category} className="text-xs font-thin py-1 w-fit">{data.category}</TopicTag>
            <p className="hover:underline">{data.title}</p>
            {/* <p className="w-fit text-xs font-thin left-full -translate-x-full relative">{data.author.name}</p> */}
          </div>
        </Link>
    );
  };