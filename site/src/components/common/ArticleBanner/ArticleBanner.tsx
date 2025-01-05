import Link from "next/link";
import { Article } from "@/types";
import { ArticleInteractControls, TopicTag } from "..";
import Image from "next/image";
import { config } from "@/config";
import { format_date } from "@/utils/helpers";

export const ArticleBanner:React.FC<{data: Article}> = ({data}) => {
    // console.log("----------", WebConfig.defaultThumbnail);
    return (
        <Link href={`/article/${data.url}`} className="w-full cursor-pointer p-2 flex flex-row gap-2 text-black hover:bg-light-gray/40">
          <Image
            src={
              data.thumbnail ||
              config.default_thumbnail}
            alt=""
            width={4 * 70}
            height={3 * 70}
            className="w-[10%] aspect-square object-cover flex-[1]"
          />
          <article className="flex flex-col gap-1 w-full justify-between flex-[3]">
            <section>
              <div className="flex flex-row items-center justify-between leading-none">
                <p className="w-fit text-xs font-thin relative">{data.author.name}</p>
                <TopicTag href={data.topic} className="text-xs font-thin py-1 w-fit">{data.topic}</TopicTag>
              </div>
              <p className="hover:underline">{data.title}</p>
              
            </section>

            <section className="flex bottom-0 gap-2 relative w-full">
              <ArticleInteractControls articleId={data.id} size={20} />
              <p className="text-xs font-thin left-full">{format_date(data.creationDate)}</p>
            </section>
            
          </article>
        </Link>
    );
  };