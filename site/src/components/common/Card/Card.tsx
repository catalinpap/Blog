import Image from "next/image";
import "./Card.css";
import Link from "next/link";
import { TopicTag } from "..";
import { Article } from "@/types";
import { format_date, limit_string } from "@/utils/helpers";
import { config } from "@/config";
import { ArrowFrontIcon, CommentIcon, HeartEmptyIcon, UserIcon } from "@/components/icons";

export const Card: React.FC<{data: Article}> = ({data}) => {
    return (
        <section className="w-full relative card-wrapper overflow-clip group">
            {/* <TopicTag href={data.topic} className="absolute top-3 right-3 z-10">{data.topic}</TopicTag> */}
            <Link href={`/article/${data.url}`} className="w-full">
                <Image src={data.thumbnail || config.defaultThumbnail} 
                    alt={data.title || "Article thumbnail image"}
                    width={960}
                    height={600}
                    className="card-thumbnail"
                />
                <div className="flex flex-col justify-between px-5 pt-2 pb-3">
                    <div className="flex justify-between items-center">
                        <TopicTag href={data.topic} className="w-fit !text-xs leading-normal !font-light">{data.topic}</TopicTag>
                        <div className="flex items-center text-xs gap-1">
                            <HeartEmptyIcon/> {data.likes}
                            <CommentIcon /> {data.comments.length}
                        </div>
                    </div>
                    
                    {/* <span className="w-fit text-xs text-black/60 font-thin border-b leading-normal capitalize">{data.topic}</span> */}
                    <h2 className="card-title">{data.title}</h2>
                    {/* <p className="card-description">{data.content?.substring(0,50) + '...'}</p> */}
                    <div className="card-info">
                        <div className="flex items-center gap-2">
                            <p className="flex items-center gap-1">
                                <UserIcon />
                                <span className="font-semibold">{data.author?.name}</span>
                            </p>
                            <span className="divider-bullet"/>
                            <time dateTime={data.creationDate}>{format_date(data.creationDate)}</time>
                        </div>
                    </div>
                    <span className="text-sm mt-2 flex items-center gap-1 font-light text-[#97989F]">Read More <ArrowFrontIcon/></span>
                </div>
                
            </Link>
        </section>
    );
};
